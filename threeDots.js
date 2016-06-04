data = [{cellID:1,x:1,y:1}, {cellID:2,x:2,y:2}, {cellID:3,x:3,y:3}, {cellID:4,x:4,y:4}];
width = 400;
height = 300;

// Defining the Scales of the graph
var xScale = d3.scale.linear().domain([0,5]).range([0,width]);
var yScale = d3.scale.linear().domain([0,5]).range([height,0]);

// Creating svg elements within the selected div-container
var divdots = d3.select(".divdots");
var dots = divdots.append("svg:svg")
              .attr("class","dots")
              .attr("width",width)
              .attr("height", height);

// =============================================================================
// Defining BRUSH functions
var brush = d3.svg.brush()
	.x(d3.scale.identity().domain([0, width]))
	.y(d3.scale.identity().domain([0, height]))
	.on("brush", brushmove)
	.on("brushend", brushend);

function brushmove() {
            //alert("Brush: MOVED");

            // assign class:"selected" to the cells that are contained inside Brush-Area.
            var e = brush.extent();
            dots.selectAll(".g_cell").classed("selected", function(d) {
                        return !( e[0][0] > xScale(d.x) || xScale(d.x)> e[1][0] || e[0][1] > yScale(d.y) || yScale(d.y) > e[1][1]);
                        });

        }

// If the brush is empty, select all circles.
function brushend() {
          if (brush.empty()) { // When NO AREA is selected!
            //alert("Brush: EMPTY");

            // update class attribute of the cells.
            dots.selectAll(".selected").classed("selected", false);

            }
      }

// assign classname "brush" to the g_svg_element contained in divdots
dots.classed("brush",true).call(brush);

// =============================================================================
// Defining and creating CIRCLES
var clicked_dots = []; // array to collect all clicked-cells

var dot = dots.selectAll(".g_cell").data(data);
dot.enter()
      .append("svg:g")
        .attr("class","g_cell")
        .append("circle")
          .attr("class","cell")
          .attr("cx", function(d) { return xScale(d.x); })
          .attr("cy", function(d) { return yScale(d.y); })
          .attr("r",5)
          .attr("pointer-events", "all") // activate on-click/ pointer events
              .on("click", function(d){
                  alert("Clicked Me!");
                  // append into array data-contained in the g_cell elements for each clicked cell.
                  clicked_dots.push(this.__data__);

              })
      		//.attr('fill', 'red')
          .attr("fill",function(d){return "url(#gradient_"+d.cellID+")"; }); // APPLY GRADIENT to element.



// =============================================================================
// Defining Gradient colors for the cells.
var cell_grad = dots.selectAll("defs").data(data);
cell_grad.enter()
	.append("defs") // cellData[i]: is associated with each <defs>
		.append("radialGradient")
			.attr("id",function(d){return "gradient_"+d.cellID;}) // IMP: accesses data attached to parent <svg:defs>
			.attr("cx", "0.5").attr("cy", "0.5").attr("fx", "0.5").attr("fy", "0.5")
			.attr("r","0.5");


var radial_gradients = d3.selectAll("radialGradient");
radial_gradients.append("stop").attr("offset", "0%").style("stop-color", "red");
radial_gradients.append("stop").attr("offset", "100%").style("stop-color", "white");


radial_gradients.transition().duration(1000)
  .attr("r", function(d){return Math.random();});

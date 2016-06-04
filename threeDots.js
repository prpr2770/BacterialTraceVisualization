data = [{x:1,y:1}, {x:2,y:2}, {x:3,y:3}, {x:4,y:4}];
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
            alert("Brush: MOVED");
        }

// If the brush is empty, select all circles.
function brushend() {
          if (brush.empty()) { // When NO AREA is selected!
            alert("Brush: EMPTY");

            }
      }

// assign classname "brush" to the g_svg_element contained in divdots
dots.classed("brush",true).call(brush);

// =============================================================================
// Defining and creating CIRCLES
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
              .on("click", function(d){ alert("Clicked Me!");
              })
      		.attr('fill', 'red');

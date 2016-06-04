function plotMultiLine(cellData) {

var cellIDs = [];
for (var i = 0, len = cellData.length; i < len; i++) {
  cellIDs.push(cellData[i].cellID);
};

var color = d3.scale.category10().domain(cellIDs);

var margin = {top: 20, right: 80, bottom: 30, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

  // create a line function that can convert data[] into x and y points
  var linePlot = d3.svg.line()
    .x(function(datum,indx) {  return xScale(indx); })
    .y(function(datum) { return yScale(datum);})


    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Add an SVG element with the desired dimensions and margin.
var graph_width = width + margin.left + margin.right;
var graph_height = height + margin.top + margin.bottom;
var graph = d3.select("#multilineplot").append("svg:svg")
      .attr("class","aGraph")
      .attr("width", graph_width)
      .attr("height", graph_height)
      .append("svg:g") // what does this do?
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class","aLinePlot");


graph.data(function(){

  //--------------------------------------------------------------------------
  // update the Scales!

  xScale.domain([0, cellData[0].voltSig.length]);
  yScale.domain([
    d3.min(cellData,function(c){return d3.min(c.voltSig);}),
    d3.max(cellData,function(c){return d3.max(c.voltSig);})
  ]);

//--------------------------------------------------------------------------
   // associate Data_set to the graph!
  return cellData; // assosciate subset of cellData to the plot_graph.
});

//--------------------------------------------------------------------------
// set the axis
// create a line function that can convert data[] into x and y points
var linePlot = d3.svg.line()
  .x(function(datum,indx) {  return xScale(indx); })
  .y(function(datum) { return yScale(datum);})

  // create yAxis
  var xAxis = d3.svg.axis().scale(xScale).tickSize(-height).tickSubdivide(true);
  // Add the x-axis.
  graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height+ ")")
        .call(xAxis);


  // create left yAxis
  var yAxisLeft = d3.svg.axis().scale(yScale).ticks(4).orient("left");
  // Add the y-axis to the left
  graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-10,0)")
        .call(yAxisLeft);



        //----------------------------------------------------------------------------
        // plot the voltage signals
var sig = graph.selectAll(".sig")
      .data(cellData)
    .enter().append("g")
      .attr("class", "sig");

  sig.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return linePlot(d.voltSig); })
      .style("stroke", function(d) { return color(d.cellID); });

};

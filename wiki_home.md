Welcome to the BacterialTraceVisualization wiki!

Basic design approach:
  1. Create the html element layout for incorporating the following visual elements:
    + Petridish - spatial distribution of cells from which cells may be explored either by clicking individual cells, or selecting a group of cells using a brush.
    + SingleLinePlot - Shall plot time-traces correspdonding to each clicked-cell.
    + MultiLinePlot - Shall plot time-traces corresponding to group of cells selected from petridish via brush
  2. Design of data-structure in json format. We shall use the following sample-dataset.
  3. Use d3.js to create the sub-components based on the sample-dataset.

Detailed approach for each sub-component:
  1. HTML Element Structure defining visual elements.
  ```html
  <!DOCTYPE html>
  <meta charset="utf-8">

  <div class="volt">
    <!-- Dynamcially create svg elements for each of following sub-components -->
  <div id="petridish"><!-- Petridish: Spatial distribution of cells  --></div>
  <div id="multiline"><!-- Multi-line Plot  --> </div>
  <div id="singleline"><!-- Single-line Plot   --> </div>
  <div id="tl_div"> <!-- Timelapse indicator bar  --> <svg class="timelapse"></svg> </div>
  </div>

  <script src="https://d3js.org/d3.v3.min.js"  charset="utf-8"></script>
  <script src="./threeDots.js"  charset="utf-8"></script>

  <style>
  // define css styling for the elements that are dynamically generated.

  </style>

  ```
2. Defining sample data-set to be used for building application.
  ```javascript

var cellData = [
{cellID: 1, voltSig : [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], caSig: [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], xPos: 1, yPos: 1 },
{cellID: 2, voltSig : [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], caSig: [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], xPos: 2, yPos: 2 },
{cellID: 3, voltSig : [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], caSig: [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], xPos: 3, yPos: 3 },
{cellID: 4, voltSig : [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], caSig: [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], xPos: 4, yPos: 4 },
{cellID: 5, voltSig : [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], caSig: [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,], xPos: 5, yPos: 5 }];


var linkData = [{src:1, dest:2, value:0.8},{src:3, dest:4, value:0.2},{src:1, dest:5, value:0.1}];

  ```
  3. Use d3.js to build/create sub-components based on sample-dataset.

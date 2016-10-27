
var filteredData = [];
var options = {
  category: 'number_prison_rating',
  filter: 'regular'

}

var chart=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);


var margin = { top: 5, right: 15, bottom: 5, left: 15 } ; 

var width = 600 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;




/*DATA SOURCES*/


d3.json("data/state_squares.geojson", function(error1, jsonResults) {
    d3.csv("data/state_data.csv", function(error2, csvResults) { 
      csvResults.forEach(function(csvState){
        var state = csvState.state
        jsonState = jsonResults.features.filter(function(d){
          return d.properties.abbr == state
        })
        if(typeof(jsonState[0]) != "undefined"){
          jsonState[0].properties.number_prison_rating = csvState.number_prison_rating;
          jsonState[0].properties.number_prison_ct_rating = csvState.number_prison_ct_rating;
          jsonState[0].properties.arrests_rating = csvState.arrests_rating;
          jsonState[0].properties.probation_rating = csvState.probation_rating;
          jsonState[0].properties.parole_rating = csvState.parole_rating;
          jsonState[0].properties.compliance_rating = csvState.compliance_rating;
          jsonState[0].properties.number_prison_frequency = csvState.number_prison_frequency;
          jsonState[0].properties.number_prison_ct_frequency = csvState.number_prison_ct_frequency;
          jsonState[0].properties.arrests_frequency = csvState.arrests_frequency;
          jsonState[0].properties.probation_frequency = csvState.probation_frequency;
          jsonState[0].properties.parole_frequency = csvState.parole_frequency;
          jsonState[0].properties.compliance_frequency = csvState.compliance_frequency;
          jsonState[0].properties.hispanic = csvState.hispanic;

        }
      })
      filteredData = jsonResults.features

      grid = new Grid(jsonResults)
	});
});

function Grid(states) { //https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

//var filteredData = states.features.properties.filter(function(d) {return d.hispanic>900000})



 //states = states.properties.filter(function(d) {return d.state='NJ'})


  function gridData(states) {
      var data = new Array();
      var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
      var ypos = 1;
      var width = 35;
      var height = 35;

      // iterate for rows 
      for (var row = 0; row < 10; row++) {
          data.push( new Array() );

          // iterate for cells/columns inside rows
          for (var column = 0; column < 5; column++) {
              data[row].push({
                  x: xpos,
                  y: ypos,
                  width: width,
                  height: height
              })
              // increment the x position. I.e. move it over by 50 (width variable)
              xpos += width + 7;
          }
          // reset the x position after a row is complete
          xpos = 1;
          // increment the y position for the next row. Move it down 50 (height variable)
          ypos += height + 7; 
      }
      return data;
  }



  chart.svg = d3.select("#grid")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  chart.row = chart.svg.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");
console.log(states.features)

  chart.column = chart.row.selectAll(".square")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("id", "groupofSquares")
    .attr("class","square")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("stroke", "#222");

  // console.log(states.features)
var filteredData = states.features.filter(function(d){
    return parseFloat(d.properties.hispanic.replace(/\,/g,"")) > 900000
  })



var parseHispanic = function(i) {
  return parseFloat(i.properties.hispanic.replace(/\,/g,""))
  };

var filteredData = filteredData.sort(function(a,b) {
    return d3.descending(parseHispanic(a),parseHispanic(b));
    });

console.log

var group = document.querySelector('#grid');
console.log(group)
var rectNodes = group.getElementsByTagName('rect');

console.log(filteredData)

var column1 = d3.selectAll(rectNodes)
  .filter(function(d, i) { return i % 5 == 0;})
  .attr("fill", "red")
  .data(filteredData, function(d) {return d.properties.hispanic})




  // chart.squares = chart.squares
  //   .filter(function(d) {return d.hispanic< '900,000';}) 
  //   .remove("rect")

  //   console.log(chart.squares)


    
   

} 

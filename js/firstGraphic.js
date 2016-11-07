var filteredData = [];
var options = {
  selectedData: 'num_crime_cat_2'

}

var chart=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



var $firstGraphic = $("#firstGraphic");
var aspect_width = 20;
var aspect_height = 15;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($firstGraphic.width() - margin.left - margin.right); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 

var getFilter1 = function(){
  return options.selectedData;
}
Filter1 = getFilter1();
console.log(Filter1)


//EVENT HANDLERS

//TOGGLES
d3.selectAll(".step1_button").classed("active", false);
d3.select("#step1-regular").classed("active", true)
d3.select("#mobile-text").text("")
d3.selectAll('.step1_button')
  .on('click', function() {
    d3.selectAll(".step1_button.active").classed("active", false);
    d3.select(this).classed("active", true);
    options.selectedData = d3.select(this).attr("value");
    firstGraphic.update(states);
    console.log(options.selectedData);

}) 

console.log(options.selectedData);
/*DATA SOURCES*/


d3.json("data/state_squares.geojson", function(error1, jsonResults) {
    d3.csv("data/state_data.csv", function(error2, csvResults) { 
      csvResults.forEach(function(csvState){
        var state = csvState.state
        jsonState = jsonResults.features.filter(function(d){
          return d.properties.abbr == state
        })
        if(typeof(jsonState[0]) != "undefined"){
          jsonState[0].properties.num_crime_cat_all = csvState.num_crime_cat_all;
          jsonState[0].properties.num_crime_cat_2 = csvState.num_crime_cat_2;

        }
      })
    

      firstGraphic = new FirstGraphic(jsonResults)
      firstGraphic.update(jsonResults)
	});
});

function FirstGraphic(states) { 



  chart.svg = d3.select("#firstGraphic")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  chart.group = chart.svg.append('g')
      .data(states.features)
      console.log(states.features)

 chart.states = states;

}



FirstGraphic.prototype.update = function(states) {


Filter1 = getFilter1();  //***If i remove this line, then it works because the data is no longer "undefined"
console.log(Filter1)



  console.log(options.selectedData)
  console.log(Filter1)
    //ADDING GROUPS
  yBase = 400
  for(var j = 0; j < 6; j++){
  //0 measures
  var data = states.features.filter(function(d) {return d.properties[Filter1]== String(j)})
  console.log(data)

  column = chart.group.selectAll("cell")
      .data(data)
  columnEnter = column
      .enter()
      .append("rect")
      .style("fill", "#9d9d9d")
      .attr("class","cell")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d,i) {
        if (i%2 !== 0) {
          return 40 + j*100;
        } else {
          return j*100;
        }
      })
      .attr("y", function(d,i) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", function(d,i) {
        if (i%2 !== 0) {
          return "odd group0"
        } else {
          return "even group0"
        }
      })
    column.merge(columnEnter)

    }
} 




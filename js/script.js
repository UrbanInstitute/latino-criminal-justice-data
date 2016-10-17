//map is forked from a combination of https://github.com/githamm/us-state-squares and https://github.com/lvonlanthen/data-map-d3

var filteredData = [];
var options = {
  category: 'number_prison_rating',
  filter: 'regular'

}

var chart=this;

var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", "#848081", "#a2d4ec", "#1696d2", "#0a4c6a"]);


var margin = { top: 5, right: 15, bottom: 5, left: 15 } ; 

var width = 500 - margin.right - margin.left;
var height = 700 - margin.top - margin.bottom;

var projection = d3.geoEquirectangular()
  .scale(2000)
  .center([-96.03542,41.69553])
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var getCat = function(){
  return d3.select(".btn.btn-link.active").attr("value");
}

var getFilter = function(){
  return d3.select(".btn.btn-link.active").attr("id");
}

//EVENT HANDLERS
//TOGGLES
d3.selectAll('#toggle-wrapper .btn').on('click', function() {
    d3.select(".btn-secondary.active").classed("active",false);
    d3.select(this).classed("active", true);
    options.filter = d3.select(this).attr("id");

    choropleth.update();
    console.log(options.filter);

})

//CATEGORIES
d3.selectAll('#button-wrapper .btn').on('click', function() {
    d3.select(".btn-link.active").classed("active",false);
    d3.select(this).classed("active", true);
    options.category = d3.select(this).attr("value");
    d3.select(".btn-secondary.active").classed("active",false);
    options.filter = 'regular';

    choropleth.update();
    console.log(options.category);

})


/*DATA SOURCES*/


d3.json("/data/state_squares.geojson", function(error1, jsonResults) {
    d3.csv("/data/state_data.csv", function(error2, csvResults) { 
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

        }
      })
      filteredData = jsonResults.features
      choropleth = new Choropleth(jsonResults)
      choropleth.update(jsonResults)
	});
});





function Choropleth(states) {

  chart.svg = d3.select("#map")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

   //   .attr("preserveAspectRatio", "xMinYMin meet")
   //   .attr("viewBox", "-70 0 700 700")
    //  .classed("svg-content-responsive", true);
   // .attr('width', width + margin.left + margin.right)
   // .attr('height', height + margin.top + margin.bottom);


  chart.map = chart.svg.append('g')
  	.selectAll('path')
  	.data(states.features)
  	.enter().append('path')
  	.attr('d', path)

}

Choropleth.prototype.update = function() {

  var Cat = getCat();
      Filter = getFilter();
      frequency = "_frequency"

   chart.map
      .transition()
      .style("fill", function(d) {
        return color(d.properties[Cat]);
      })
      .style("stroke", function(d) {
        if (d.properties[Cat] == 0) {
          return '#848081'
        }
      })
      .style("stroke-width", function(d) {
        if (d.properties[Cat] == 0) {
          return '2px'
        }
      }) 
      .style("opacity", function(d) {
        if (options.filter == 'regular') {
          if (d.properties[Filter + frequency] == 2){
            return '0';
          }
        }
      })
     

  /*  newData = filteredData.slice(); 
    console.log(Filter)
    if (options.filter == 'regular') {
      newData = filteredData.filter(function(d) {
 //         return d.properties.parole_frequency == 2;
        return d.properties[Filter + frequency] == 2;
      }) 
    } 
   
    console.log(filteredData)
 

  var squares = d3.selectAll('path')
      .data(newData)
      .style("fill", function(d) {
        return color(d.properties[Cat]);
      })
      .style("stroke", function(d) {
        if (d.properties[Cat] == 0) {
          return '#848081'
        }
      })
      .style("stroke-width", function(d) {
        if (d.properties[Cat] == 0) {
          return '2px'
        };
      })  */

    // squares.enter().append('path')
    //   .attr('class', 'square')
    // squares.exit().remove();
    // console.log(squares)


}



//LEGEND

chart.legendSvg= d3.select("#legend")
  .append('svg')

chart.g = chart.legendSvg.append('g')
  .attr("class", "legend")
  .attr("transform", "translate(" + 20 + "," + 50 + ")");





//map is forked from a combination of https://github.com/githamm/us-state-squares and https://github.com/lvonlanthen/data-map-d3

var options = {
  filtered: 'number_prison_rating'
}


var color = d3.scaleThreshold()
    .domain([0, 1, 2, 3, 4])
    .range(["#ffffff", " #5c5859", "#a2d4ec", "#1696d2", "#fdbf11"]);


var margin = { top: 5, right: 15, bottom: 5, left: 15 } ; 

var width = 800 - margin.right - margin.left;
var height = 700 - margin.top - margin.bottom;

var projection = d3.geoEquirectangular()
  .scale(2000)
  .center([-96.03542,41.69553])
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

//EVENT HANDLERS


d3.selectAll('#button-wrapper .btn').on('click', function() {
    options.filtered = d3.select(this).attr("value");
    choropleth.update();
    console.log(options.filtered)
    d3.select(options.filtered).classed('active', true); 
})




/*DATA SOURCES*/


d3.json("../data/state_squares.geojson", function(error1, jsonResults) {
    d3.csv("../data/state_data.csv", function(error2, csvResults) { 
      csvResults.forEach(function(csvState){
        var state = csvState.state
        jsonState = jsonResults.features.filter(function(d){
          return d.properties.abbr == state
        })
        if(typeof(jsonState[0]) != "undefined"){
          jsonState[0].properties.foo = csvState.arrests_rating;
          jsonState[0].properties.number_prison_rating = csvState.number_prison_rating;
          jsonState[0].properties.number_prison_ct_rating = csvState.number_prison_ct_rating;
          jsonState[0].properties.arrests_rating = csvState.arrests_rating;
          jsonState[0].properties.probation_rating = csvState.probation_rating;
          jsonState[0].properties.parole_rating = csvState.parole_rating;
          jsonState[0].properties.compliance_rating = csvState.compliance_rating;

        }
      })
      choropleth = new Choropleth(jsonResults)
      choropleth.update()
	});
});





function Choropleth(states) {
  var chart = this;

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
  var chart = this;

  chart.map
    .transition()
    .attr('fill', function(d) {
      return color(getRating(d)); 
    }) 
}

function getRating(d) {
  if (options.filtered === 'number_prison_rating') {
    return d.properties.number_prison_rating;
  }   
  
}




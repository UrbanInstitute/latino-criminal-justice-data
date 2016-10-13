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


d3.json("../data/state_squares.geojson", function(error1, results1) {
    d3.csv("../data/state_data.csv", function(error2, results2) { 
    	console.log(results1, error1)
  


      for (var i = 0; i < results2.length; i++) {
        var state = results2[i].state;
        var number_prison_rating = results2[i].number_prison_rating;
    		var number_prison_ct_rating = results2[i].number_prison_ct_rating;
    		var arrests_rating = results2[i].arrests_rating;
    		var probation_rating = results2[i].probation_rating;
    		var parole_rating = results2[i].parole_rating;
    		var compliance_rating = results2[i].compliance_rating;


	      for (var j = 0; j < results1.features.length; j++) {

	        if (state == results1.features[j].properties.abbr) {
  	        results1.features[j].properties.number_prison_rating = number_prison_rating;
      			results1.features[j].properties.number_prison_ct_rating = number_prison_ct_rating;
      			results1.features[j].properties.arrests_rating = arrests_rating;
      			results1.features[j].properties.probation_rating = probation_rating;
      			results1.features[j].properties.parole_rating = parole_rating;
      			results1.features[j].properties.compliance_rating = compliance_rating;
          }

	          break; 
	        }
	      }
    	 


    choropleth = new Choropleth(results1);
    choropleth.update();
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
    console.log(d.properties.abbr)
    return d.properties.number_prison_rating;
  }   
  
}




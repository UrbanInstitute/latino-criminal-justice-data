//map is forked from a combination of https://github.com/githamm/us-state-squares and https://github.com/lvonlanthen/data-map-d3
var LABELS= {
  no_data: 'No data on race or ethnicity',
  data_no_cat: 'Data, but no Latino category',
  combined: 'Race/Ethnicity combined',
  separate: 'Race/Ethnicity separate',
  cross_tabbed: 'Race/Ethnicity cross-tabbed'
}

var filteredData = [];
var options = {
  category: 'number_prison_rating',
  filter: 'regular'

}

var chart=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);


//var margin = { top: 5, right: 15, bottom: 5, left: 15 } ; 

//var width = 500 - margin.right - margin.left;
//var height = 500 - margin.top - margin.bottom;

var $map = $("#map");
var aspect_width = 30;
var aspect_height = 8;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($map.width() - margin.left - margin.right); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 


var projection = d3.geoEquirectangular()
  .scale(2000)
  .center([-96.03542,41.69553])
  .translate([width / 2, height / .9]);

var path = d3.geoPath()
  .projection(projection);

var getCat = function(){
  return d3.select(".measure_type").attr("value");
}

var getFilter = function(){
  return d3.select(".measure_type").attr("id");
}

var Cat = getCat();
Filter = getFilter();
frequency = "_frequency";
console.log(Filter)
   

 //EVENT HANDLERS

//TOGGLES
d3.selectAll(".step_button").classed("active", false);
d3.selectAll("#regular").classed("active", true)
d3.select("#mobile-text").text("")
d3.selectAll('.step_button')
  .on('click', function() {
    d3.selectAll(".step_button.active").classed("active", false);
    d3.select(this).classed("active", true);
    options.filter = d3.select(this).attr("id");
    choropleth.update(states);
    console.log(options.filter);

}) 

  //DROPDOWN
$("#measures").selectmenu({
  change: function(event, d){
  options.category = this.value;
  choropleth.update(states);
  console.log(options.category);
  }
});




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
          jsonState[0].properties.hispanic = csvState.compliance_hispanic;


        }
      })


      filteredData = jsonResults.features;
      choropleth = new Choropleth(jsonResults);
      choropleth.update(jsonResults);

	});

});




  function Choropleth(states) {

    var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
    var IS_PHONE = d3.select("#isPhone").style("display") == "block"



    var height_scale = (IS_MOBILE) ? 1.4 : 1;
      if(IS_PHONE) height_scale = 3;



  chart.svg = d3.select("#map")
      .append("div")
      .classed("map-container", true)
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

  chart.svg
    .selectAll(".place-label")
    .data(states.features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".5em")
    .attr("dx", "-.7em")
    .text(function(d) { 
      return d.properties.abbr;
    });

  //LEGEND

    chart.svg
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", "7em")
      .attr("y", "24em")
      .attr("width", 15)
      .attr("height", 15)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "11em")
      .attr("y", "33em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["no_data"];
      });

    chart.svg
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", "7em")
      .attr("y", "25.5em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "11em")
      .attr("y", "35em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["data_no_cat"];
      });

    chart.svg
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "24em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "33em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["combined"];
      });

    chart.svg
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "25.5em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "35em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["separate"];
      });

    chart.svg
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "27em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "37em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["cross_tabbed"];
      });
  
  chart.states = states;


  window.onresize = function(){
    IS_MOBILE = $("#isMobile").css("display") == "block"
  }

}




Choropleth.prototype.update = function(states) {
  console.log('hello')

var Cat = getCat();
  Filter = getFilter();
  frequency = "_frequency";

   chart.map
   		.transition()
      	.delay(function(d,i) { return i * 10; })
    	.duration(1250)
       	.style("opacity", function(d) {
       		if (options.filter == 'regular') {
         		if (d.properties[Filter + frequency] == 2){
	            return '1';
	        	} else {
	        		return '0';
	        	}
	     	} 
		 }) 
       	.style("stroke-opacity", function(d) {
       		if (options.filter == 'regular') {
         		if (d.properties[Filter + frequency] == 2){
	            return '0'; 
	        	}
	     	   }
		     })
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
	          return '1px'
	        }
	     }); 
 console.log('hello')
  chart.svg
      .selectAll(".place-label")
      .transition()
        .delay(function(d,i) { return i * 10; })
      .duration(1250)
     /* .style("opacity", function(d) { 
        if (options.filter !== 'all') {
          if (d.properties[Filter + frequency] == 2) {
            return 1;
          } else { 
              return "0";
            }    
        } return 1;
      }) */
      .style("fill", function(d) { 
        if (options.filter !== 'all') {
          if (d.properties[Filter + frequency] == 2) {
            if (d.properties[Cat] == 4 | d.properties[Cat] == 3) {
              return "#cfe8f3"
            } else {
                return "#000000";
              } 
          } else {
              return "#d2d2d2";
            }  
        } return "#000000";
      })
 /*     .style("fill", function(d) { 
        if (d.properties[Cat] == 4 | d.properties[Cat] == 3) {
          return "#cfe8f3"
        } else {
          return "#000000";
        } 
      }); */

   

	   


  }










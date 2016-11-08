var DATA_QUALITY_LABELS= {
  no_data: 'No data on race or ethnicity',
  data_no_cat: 'Data, but no Latino category',
  combined: 'Race/Ethnicity combined',
  separate: 'Race/Ethnicity separate',
  cross_tabbed: 'Race/Ethnicity cross-tabbed'
}


function drawMap(){
//map is forked from a combination of https://github.com/githamm/us-state-squares and https://github.com/lvonlanthen/data-map-d3


var filteredData = [];
var options = {
  category: 'number_prison',
  filter: 'step2-regular'

}

var chartMap=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);


//var margin = { top: 5, right: 15, bottom: 5, left: 15 } ; 

//var width = 500 - margin.right - margin.left;
//var height = 500 - margin.top - margin.bottom;

var $map = $("#map");
var aspect_width = 30;
var aspect_height = 25;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($map.width() - margin.left - margin.right); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 
console.log(height)

var projection = d3.geoEquirectangular()
  .scale(2000)
  .center([-96.03542,41.69553])
  .translate([width / 2, height / 3]);

var path = d3.geoPath()
  .projection(projection);

var getCat = function(){  
  return options.category;
}


var Cat = getCat();

var frequency = "_frequency";

   

 //EVENT HANDLERS

//TOGGLES
d3.selectAll(".step2_button").classed("active", false);
d3.select("#step2-regular").classed("active", true)
d3.select("#mobile-text").text("")
d3.selectAll('.step2_button')
  .on('click', function() {
    d3.selectAll(".step2_button.active").classed("active", false);
    d3.select(this).classed("active", true);
    options.filter = d3.select(this).attr("id");
    choropleth.update(mapStates);
    console.log(options.filter);

}) 

  //DROPDOWN
$("#measures").selectmenu({
  change: function(event, d){
  options.category = this.value;
  choropleth.update(mapStates);
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




  function Choropleth(mapStates) {

    var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
    var IS_PHONE = d3.select("#isPhone").style("display") == "block"



    var height_scale = (IS_MOBILE) ? 1.4 : 1;
      if(IS_PHONE) height_scale = 3;



  chartMap.svg = d3.select("#map")
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


  chartMap.map = chartMap.svg.append('g')
  	.selectAll('path')
  	.data(mapStates.features)
  	.enter().append('path')
  	.attr('d', path)
    .style("opacity", 0)


  chartMap.svg
    .selectAll(".place-label")
    .data(mapStates.features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".5em")
    .attr("dx", "-.7em")
    .text(function(d) { 
      return d.properties.abbr;
    });

    

  //LEGEND

    chartMap.svg
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", "7em")
      .attr("y", "24em")
      .attr("width", 15)
      .attr("height", 15)
    chartMap.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "11em")
      .attr("y", "33em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS["no_data"];
      });

    chartMap.svg
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", "7em")
      .attr("y", "25.5em")
      .attr("width", 16)
      .attr("height", 16)
    chartMap.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "11em")
      .attr("y", "35em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS["data_no_cat"];
      });

    chartMap.svg
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "24em")
      .attr("width", 16)
      .attr("height", 16)
    chartMap.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "33em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS["combined"];
      });

    chartMap.svg
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "25.5em")
      .attr("width", 16)
      .attr("height", 16)
    chartMap.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "35em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS["separate"];
      });

    chartMap.svg
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "27em")
      .attr("width", 16)
      .attr("height", 16)
    chartMap.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "37em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS["cross_tabbed"];
      });
  
  chartMap.mapStates = mapStates;



  window.onresize = function(){
    IS_MOBILE = $("#isMobile").css("display") == "block"
  }

}




Choropleth.prototype.update = function(mapStates) {
  console.log('hello')

  var Cat = getCat();

  frequency = "_frequency";
  rating = "_rating";


   chartMap.map
   		.transition()
      	.delay(function(d,i) { return i * 10; })
    	.duration(1250)
       	.style("opacity", function(d) {
       		if (options.filter == 'step2-regular') {
         		if (d.properties[Cat + frequency] == 2){
              console.log(Cat + frequency);
	            return '1';
	        	} else {
              console.log(Cat + frequency);
	        		return '0';
	        	}
	     	} 
		 }) 
       	.style("stroke-opacity", function(d) {
       		if (options.filter == 'step2-regular') {
         		if (d.properties[Cat + frequency] == 2){
	            return '0'; 
	        	}
	     	   }
		     })
	    .style("fill", function(d) {
	        return color(d.properties[Cat + rating]);
	    })
	    .style("stroke", function(d) {
	       if (d.properties[Cat + rating] == 0) {
	         return '#848081'
	       }
	     })
	    .style("stroke-width", function(d) {
	        if (d.properties[Cat + rating] == 0) {
	          return '1px'
	        }
	     }); 
 console.log('hello', chartMap.svg.node())
 
 d3.select(".map-container")
      .selectAll(".place-label")
      .transition()
        .delay(function(d,i) {return i * 10; })
      .duration(1250)
     /* .style("opacity", function(d) { 
        if (options.filter !== 'all') {
          if (d.properties[Cat + frequency] == 2) {
            return 1;
          } else { 
              return "0";
            }    
        } return 1;
      }) */
      .style("fill", function(d) { 
        if (options.filter !== 'all') {
          if (d.properties[Cat + frequency] == 2) {
            if (d.properties[Cat + rating] == 4 | d.properties[Cat + rating] == 3) {
              return "#cfe8f3"
            } else {
                return "#000000";
              } 
          } else {
              return "#d2d2d2";
            }  
        } else 
        if (options.filter == 'all') {
          if (d.properties[Cat + frequency] == 2) {
            if (d.properties[Cat + rating] == 4 | d.properties[Cat + rating] == 3) {
              return "#cfe8f3"
            } else {
                return "#000000";
              } 
          } else {
              return "#000000";
            }  
        } return "#000000";
      })
 /*     .style("fill", function(d) { 
        if (d.properties[Cat + rating] == 4 | d.properties[Cat + rating] == 3) {
          return "#cfe8f3"
        } else {
          return "#000000";
        } 
      }); */

   

	   


  }





}
drawMap();




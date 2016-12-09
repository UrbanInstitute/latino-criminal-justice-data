//FOR WRAPPING TEXT IN LEGEND
//THINGS TO DO: 

//TITLE-OVERFLOWING
//EXPAND LANGUAGE OPTIONS

function wrapText(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}


function drawMap(){
  $("#firstGraphic").empty();
  $("#container1 .tooltip-div-left").empty();
  $("#container1 .tooltip-div-right").empty();
  $("#container1 #xlabel-div").empty();
  $("#map").empty();
  $("#container2 #legend").empty();
  $("#grid").empty();
  $("#legend3-mobile").empty();
  $("#legend3-nonmobile").empty();
//map is forked from a combination of https://github.com/githamm/us-state-squares and https://github.com/lvonlanthen/data-map-d3
cell_scale = (IS_PHONE) ? .6 : 1;
// var IS_PHONE = d3.select("#isPhone").style("display") == "block"
// var IS_MOBILE = d3.select("#isMobile").style("display") == "block"



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
var margin = { top: 5, right: 0, bottom: 10, left: 32 };
var width= ($map.width()); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 


if (IS_PHONE) {
  var projection = d3.geoEquirectangular()
      .scale(4.5*width)
      .center([-96.03542,41.69553])
      .translate([(width / 2.05), (height / 2.5)]);
} else if (IS_MOBILE) {
  var projection = d3.geoEquirectangular()
      .scale(4.5*width)
      .center([-96.03542,41.69553])
      .translate([(width / 2), (height / 2.5)]);
} 

else {
      var projection = d3.geoEquirectangular()
      .scale(4.1*width)
      .center([-96.03542,41.69553])
      .translate([(width / 2.1), (height / 2.3)]);
}




var path = d3.geoPath()
  .projection(projection);

var getCat = function(){  
  return options.category;
}


var Cat = getCat();

var frequency = "_frequency";

   

 //EVENT HANDLERS



 // d3.select("#step1-regular")
 //    .on('click', function() {
 //    //  d3.selectAll(".step1_button.active").classed("active", false);
 //    //  d3.select(this).classed("active", true);
 //    options.filter = d3.select(this).attr("id");
 //      if(d3.select(this).classed("on")){
 //        d3.select(this).classed("on", false)
 //        d3.select(this).classed("off", true)
 //        selectedData = "num_crime_cat_all";
 //        firstGraphic.update(states);
 //      }
 //      else {
 //        d3.select(this).classed("on", true)
 //        d3.select(this).classed("off", false)
 //        selectedData = "num_crime_cat_2";
 //        firstGraphic.update(states);
 //      }

 //    }) 

//TOGGLES
d3.select("#step2-regular").classed("on", true)
//d3.select("#mobile-text").text("")
d3.select("#step2-regular")
  .on('click', function() {
      if(d3.select(this).classed("on")){
        d3.select(this).classed("on", false)
        d3.select(this).classed("off", true)
        options.filter = "step2-all";
        choropleth.update(mapStates)
      }
      else {
        d3.select(this).classed("on", true)
        d3.select(this).classed("off", false)
        options.filter = d3.select(this).attr("id");
        choropleth.update(mapStates)

      }


    // d3.selectAll(".step2_button.active").classed("active", false);
    // d3.select(this).classed("active", true);
    // options.filter = d3.select(this).attr("id");
    // choropleth.update(mapStates);
    // console.log(options.filter);

}) 

  //DROPDOWN
$("#measures").selectmenu({
  change: function(event, d){
  options.category = this.value;
  choropleth.update(mapStates);
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

    $("#map").empty();
    $("#container2 #legend").empty();
      filteredData = jsonResults.features;
    while( true ){
      if($("#map").contents().length != 0 || $("#container2 #legend").contents().length != 0){
        continue;
      }else{
        choropleth = new Choropleth(jsonResults);
        break;
      }
    }
      
      choropleth.update(jsonResults);

	});

});




  function Choropleth(mapStates) {

    // var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
    // var IS_PHONE = d3.select("#isPhone").style("display") == "block"



    var height_scale = (IS_PHONE) ? .9 : 1;
    cell_scale = (IS_PHONE) ? .6 : 1;


  chartMap.svg = d3.select("#map")
      .append("div")
      .classed("map-container", true)
      .append("svg")
      .attr("width", function(){
          if (IS_PHONE) {
            return width
          } else {
            return width}
        })
      .attr("height", function(){
          if (IS_PHONE) {
            return height*height_scale
          } else {
            return height-35}
        })


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
    .attr("class",function(d){
          return d.properties.abbr;
    })
    .style("opacity", 0)

  chartMap.map
    .select(".place-label")
    .data(mapStates.features)
    .enter().append("text")
    .attr("class",function(d){
          return "place-label " + d.properties.abbr;
    })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .attr("dy", ".5em")
  //  .attr("dx", "-.7em")
    .text(function(d) { 
      return d.properties.abbr;
    });


  //HOVERING

  chartMap.svg.selectAll('path')
   .on("mouseover", function(mystate) {
            d3.select(this)         
              .style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
              .classed("hover", true ) // should then accept fill from CSS
            tooltip(mystate)
            selectedState = d3.select(this).attr('class').split(' ')[0]
            // if(IS_PHONE) {
            //    d3.selectAll('.cell-text-mobile.' + selectedState)
            //   .style('fill', '#ffffff')
            // } else {
            d3.selectAll('.place-label.' + selectedState)
              .style('fill', '#ffffff')
            // }
            d3.select('.rating-' + tooltipRating)
              .style('font-weight', '900')
    })

    .on("mouseout",  function() {
          d3.select(this)
           .classed("hover", false)
           .style("fill", function(d){
            return squareColor(d)
           })
           .style("stroke", function(d) {
            return strokeColor(d);
          })
          // if(IS_PHONE) {
          //   d3.selectAll('.cell-text-mobile.' + selectedState)
          //   .style('fill', '#000000')
          // } else {
          d3.selectAll('.place-label')
           .style("fill", function(d) { 
            return squareText(d);
          })
          
          // }
  
        d3.select('.rating-' + tooltipRating)
              .style('font-weight', '400')
        })


 // chartMap.tooltipMapsvg= d3.select(".tooltip-map")
 //    .append("svg")
 //    .attr("width", width*(tooltip_phone_width)*tooltip_mobile_width)
 //    .attr("height", height/5 - (tooltip_mobile_height/2) + (tooltip_phone_height/1.4))
 //  chartMap.tooltipMap= chartMap.tooltipMapsvg.append("g")
 //    .attr("transform", "translate("+ (.1*width)+ ",0)");


  
  function tooltip(mystate) {

    var getCat = function(){  
      return options.category;
    }

    var Cat = getCat();


    tooltipRatingSwitch = function() {
      if (options.filter == 'step2-regular') {
         if (mystate.properties[Cat + frequency] == "2") {
             return mystate.properties[Cat + rating];
            } return "0"
      } else if (options.filter == 'step2-all') {
          return mystate.properties[Cat + rating];     
        } 
    }
    tooltipRating = tooltipRatingSwitch()
            
//           chartMap.tooltipMap
//             .append("text")
//             .attr("class", "tooltip-map-text")
//             .attr("dy", 0)
//             .attr("y", "2em")
//             .attr("x", function() {
//               if (IS_PHONE) {
//                 return "0em"
//             } else return "-1em"
//             })
//             .attr("text-anchor", "start")
//             .text(function() {
//               if (tooltipRating == "0") {
//                 return mystate.properties.name + "  does not report race or ethnicity in its " + $('.ui-selectmenu-text').text() + " data";//mystate.properties.name;
//               } else  if (tooltipRating == "1"){
//                 return mystate.properties.name + " reports race but not ethnicity in its " + $('.ui-selectmenu-text').text() + " data";
//               } else  if (tooltipRating == "2"){
//                 return mystate.properties.name + " combines race and ethnicity into one category in its " + $('.ui-selectmenu-text').text() + " data";
//               } else  if (tooltipRating == "3"){
//                 return mystate.properties.name + " reports both race and ethnicity in it " + $('.ui-selectmenu-text').text() + " data";
//               }  else  if (tooltipRating == "4"){
//                 return mystate.properties.name + " collects both race and ethnicity and reports combined racial-ethnic categories in its " + $('.ui-selectmenu-text').text() + " data";
//               }

//             });

//              chartMap.tooltipMap.selectAll('.tooltip-map-text').call(wrapText,500)
       

//             // var width = $tooltip.width() - margin.left - margin.right,
//             // height = height/2 - margin.top - margin.bottom;
 }



  //LEGEND


legend_scale_x = (IS_PHONE) || (IS_MOBILE) ? 0 : 1;
legend_scale_y = (IS_PHONE) ? 1.8 : 1;
legend_height_mobile = (IS_MOBILE) && !(IS_PHONE) ? .8 : 1;
legend_mobile_scale_y = (IS_MOBILE) ? 2 : 1;
legendSquareX = "1em"
legendTextX = "4em"



  chartMap.legendSVG = d3.select("#legend")
      .append("div")
      .classed("map-legend", true)
      .append("svg")
      .attr("width", width)
      .attr("height", (height/1.8) * legend_height_mobile);


  chartMap.legend = chartMap.legendSVG
      .append("g")
      .attr("transform", function(){
        if (IS_PHONE) {
          return  "translate(-15 ,0)"
        }  else 
          return "translate(0 ,0)"
      })

/*FIRST*/
    chartMap.legend
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", legendSquareX)
      .attr("y", "2em")
      .attr("width", 16)
      .attr("height", 16)
    chartMap.legend
      .append("text")
      .attr("class",function(d){
        if ((IS_PHONE) || (IS_MOBILE)) {
          return "legend-text-mobile rating-0"
        } else {
          return "legend-text rating-0"
        }
      })
      .attr("dy", 0)
      .attr("y",function(d){
        if (IS_PHONE){
          return 2.2*legend_scale_y + "em"
        } else {
          return "3.6em"
        }
      })
      .attr("x",legendTextX)
      .attr("text-anchor", "start")
      .text(function (d, i) {
         return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][0][1]
      });

/*SECOND*/   
    chartMap.legend
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", legendSquareX)
      .attr("y",function(d){
        if (IS_PHONE) {
          return 2*legend_scale_y + "em"
        } else  if (IS_MOBILE) {
            return 2*legend_mobile_scale_y + "em"
          } return "4em"
      })
      .attr("width", 16)
      .attr("height", 16)
    chartMap.legend.append("text")
      .attr("class",function(d){
        if ((IS_PHONE) || (IS_MOBILE))  {
          return "legend-text-mobile rating-1"
        } else {
          return "legend-text rating-1"
        }
      })
      .attr("dy", 0)
      .attr("x", legendTextX)

      .attr("y",function(d){
       if (IS_PHONE) {
          return 3.5*legend_scale_y + "em"
        } else if (IS_MOBILE) {
          return 3.5*legend_mobile_scale_y + "em"
        } return "6.3em"
      })
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][1][1];
      });

/*THIRD*/
    chartMap.legend
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", legendSquareX)
      .attr("y",function(d){
         if (IS_PHONE) {
          return 3*legend_scale_y + "em"
        } else if (IS_MOBILE) {
          return 3*legend_mobile_scale_y + "em"
        } return "6em"
      })
      .attr("width", 16)
      .attr("height", 16)
    chartMap.legend.append("text")
      .attr("class",function(d){
        if ((IS_PHONE) || (IS_MOBILE))  {
          return "legend-text-mobile rating-2"
        } else {
          return "legend-text rating-2"
        }
      })
      .attr("dy", 0)
      .attr("x", legendTextX)
      .attr("y",function(d){
        if (IS_PHONE)  {
          return 4.9*legend_scale_y+ "em"
        } else if (IS_MOBILE) {
          return 4.9*legend_mobile_scale_y + "em"
        } return "9em"
      })
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][2][1];
      });

/*FOURTH*/
    chartMap.legend
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", legendSquareX)
      .attr("y",function(d){
        if (IS_PHONE) {
          return 4*legend_scale_y+ "em"
        } else if (IS_MOBILE) {
          return 4*legend_mobile_scale_y + "em"
        } return "8em"
      })
      .attr("width", 16)
      .attr("height", 16)
    chartMap.legend.append("text")
      .attr("class",function(d){
        if ((IS_PHONE) || (IS_MOBILE))  {
          return "legend-text-mobile rating-3"
        } else {
          return "legend-text rating-3"
        }
      })
      .attr("dy", 0)
      .attr("x", legendTextX)
      .attr("y",function(d){
        if (IS_PHONE)  {
          return 6.4*legend_scale_y + "em"
        } else if (IS_MOBILE) {
          return 6.4*legend_mobile_scale_y + "em"
        } return "11.7em"
      })
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][3][1];
      });

/*FIFTH*/
    chartMap.legend
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", legendSquareX)
      .attr("y",function(d){
        if (IS_PHONE) {
          return 5*legend_scale_y+ "em"
        } else if (IS_MOBILE) {
          return 5*legend_mobile_scale_y + "em"
        } return "10em"
      })
      .attr("width", 16)
      .attr("height", 16)
    chartMap.legend.append("text")
      .attr("class",function(d){
        if ((IS_PHONE) || (IS_MOBILE))  {
          return "legend-text-mobile rating-4"
        } else {
          return "legend-text rating-4"
        }
      })
      .attr("dy", 0)
      .attr("x", legendTextX)
       .attr("y",function(d){
       if (IS_PHONE) {
          return 7.9*legend_scale_y + "em"
        } else if (IS_MOBILE) {
          return 7.9*legend_mobile_scale_y + "em"
        } return "14.4em"
      })
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][4][1];
      });

  
  chartMap.mapStates = mapStates;


}




Choropleth.prototype.update = function(mapStates) {

  var getCat = function(){  
  return options.category;
}

  var Cat = getCat();


  frequency = "_frequency";
  rating = "_rating";

  squareColor = function(d) {
          if (options.filter == 'step2-regular') {
          if (d.properties[Cat + frequency] == 2) {
           return color(d.properties[Cat + rating]);

          } 
        } else if (options.filter == 'step2-all') {
            return color(d.properties[Cat + rating]);
            
        } return "#ffffff"
  }

  strokeColor = function(d) {
         if (options.filter == 'step2-regular' && d.properties[Cat+frequency] != 2) {
            return '#9d9d9d'
          } else if (options.filter == 'step2-all' && d.properties[Cat + rating] == 0) {
           return '#9d9d9d'
         }
  }

  squareText = function(d) {  
      if (options.filter == 'step2-regular') {
        if (d.properties[Cat + frequency] == 2) {
          if (d.properties[Cat + rating] == 4 | d.properties[Cat + rating] == 3) {
            return "#cfe8f3"
          } else if (d.properties[Cat + rating] == 2 | d.properties[Cat + rating] == 1) {
              return "#000000";
            } 
        } return "#d2d2d2";
            
      } else if (options.filter == 'step2-all') {
          if (d.properties[Cat + rating] == 4 | d.properties[Cat + rating] == 3) {
            return "#cfe8f3"
          } else if (d.properties[Cat + rating] == 2 | d.properties[Cat + rating] == 1) {
              return "#000000";
            } 
        } return "#d2d2d2";
  }
  // console.log(this.datum())
  // var getSquareColor = squareColor(this);

   chartMap.map
   		.transition()
      	.delay(function(d,i) { return i * 10; })
    	.duration(1250)
     	.style("opacity", "1")
		   // }) 
     	// .style("stroke-opacity", function(d) {
     	// 	if (options.filter == 'step2-regular') {
      //  		if (d.properties[Cat + frequency] == 2){
      //       return '0'; 
      //   	} 
     	//    }
	     // })
	    .style("fill", function(d) {
        return squareColor(d);
	    })

	    .style("stroke", function(d) {
        return strokeColor(d);
	     })
	    .style("stroke-width", function(d) {
	        if (d.properties[Cat + rating] == 0) {
	          return '1px'
	        }
	     }); 
 
 var stateText = d3.select(".map-container")
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
        return squareText(d);
      });
      
 //     stateText.style("text-anchor", "start")

  }



}


drawMap();




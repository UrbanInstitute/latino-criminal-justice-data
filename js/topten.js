
function drawTopten(){

var cellWidth= 39

var options = {
  filter: 'step3-regular'
}
var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
var IS_PHONE = d3.select("#isPhone").style("display") == "block"

var chartTen=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



var $grid = $("#grid");
var aspect_width = 23;
var aspect_height = 40;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($grid.width())
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 





//TOGGLE
d3.select("#step3-regular").classed("on", true)
d3.select("#mobile-text").text("")
d3.select("#step3-regular")
  .on('click', function() {
      if(d3.select(this).classed("on")){
        d3.select(this).classed("on", false)
        d3.select(this).classed("off", true)
        options.filter = "step3-all";
        grid.update(gridStates);
        console.log(options.filter)
      }
      else {
        d3.select(this).classed("on", true)
        d3.select(this).classed("off", false)
        options.filter = d3.select(this).attr("id");
        grid.update(gridStates);
        console.log(options.filter)

      }

}) 

// //TOGGLES
// d3.selectAll(".step3_button").classed("active", false);
// d3.select("#step3-regular").classed("active", true)
// d3.select("#mobile-text").text("")
// d3.selectAll('.step3_button')
//   .on('click', function() {
//     d3.selectAll(".step3_button.active").classed("active", false);
//     d3.select(this).classed("active", true);
//     options.filter = d3.select(this).attr("id");
//     grid.update(gridStates);
//     console.log(options.filter);

// }) 

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
      grid.update(jsonResults);
	});
});

function Grid(gridStates) { //https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

//var filteredData = states.features.properties.filter(function(d) {return d.hispanic>900000})



var frequency = "_frequency"
var rating = "_rating"

cell_scale_phone = (IS_PHONE) ? .7 : 1;
width_phone = (IS_PHONE)? 2 : 1;
height_mobile = (IS_MOBILE)? .9 : 1;
height_phone= (IS_PHONE)? .8 : 1;


chartTen.svg = d3.select("#grid")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("width", width*width_phone)
    .attr("height", height*height_mobile*height_phone)


var filteredData_unsorted = gridStates.features.filter(function(d){
    return parseFloat(d.properties.hispanic.replace(/\,/g,"")) > 900000
  })

var parseHispanic = function(i) {
  return parseFloat(i.properties.hispanic.replace(/\,/g,""))
};


filteredData = filteredData_unsorted.sort(function(a,b) {
    return d3.descending(parseHispanic(a),parseHispanic(b));
});
console.log(filteredData)

  chartTen.row = chartTen.svg.selectAll(".row")
    .data(filteredData)
    .enter().append("g")
    .attr("class", "row")
    .attr("width", 500)
    .attr("height", 49)
    .attr("transform", function(d, i){ return "translate(" + cellWidth +" ," + (i*49)*cell_scale_phone + ")"})

  
gridColumns = ["number_prison", "number_prison_ct", "arrests", "probation", "parole"]
  for(var i = 0; i < gridColumns.length; i++){
    var gridColumn = gridColumns[i]; 
    chartTen.row
      .append("rect")
      .attr("width",cellWidth *cell_scale_phone)
      .attr("height",cellWidth * cell_scale_phone)
      .attr("x", function() {
        if (IS_PHONE) {
          return "x", (i*49)*cell_scale_phone
        } else {
        return (40+i*49)
       }
      })
      .attr("y", 0)
      .attr("class",function(d){
        return "gridSquare " + d["properties"]["abbr"] + " gridSquare" + "_"+ gridColumn
      })
      .style("opacity", 0)
  }
 





label_side_phone = (IS_PHONE) ? -25.2 : 1;

//ADD DATA_QUALITY_LABELS

    chartTen.svg.selectAll(".row")
      .data(filteredData)
      .append("text")
      .attr("class", "grid-state-labels")
      .attr("transform", function(d, i){
        if (IS_PHONE) {
          return  "translate(" + label_side_phone +" ,"+ 2 + i + ")"
        } else {
          return "translate(" + 15 +" ,"+ 2 + i + ")"
        }
      })

      .attr("text-anchor", "start")
      .text(function (d) {
          return d["properties"]["abbr"];
      });



  last_row = chartTen.svg.selectAll('.row')
    .filter(function(d, i) { return i == 9;})
    .attr("class", "last_row");


  last_row = chartTen.svg.selectAll(".last_row")
    // .data(MEASURES);
  
    last_row.selectAll("rect").each(function(d, i) {
      last_row.append("text")
      .attr("class", "grid-cat-labels")
      .attr("transform", "translate(" + (i*52+ 70*cell_scale_phone)*cell_scale_phone+ ","+55*cell_scale_phone+") rotate(-45)" )
      .attr("text-anchor", "end")

      .text(function () { 
           return MEASURES_GRID[GLOBAL_LANGUAGE][i][1] 

       });
    })



//LEGEND

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


legend_scale_x = (IS_PHONE) ? 2 : 0;
legend_scale_y = (IS_PHONE) ? .9 : 1;
legend_height_mobile = (IS_MOBILE) ? .3 : 1;
legend_height_phone = (IS_PHONE) ? .3 : 1;

  chartTen.legend = d3.select("#legend3")
      .append("div")
      .classed("grid-legend", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height/2.5*legend_height_mobile*legend_height_phone);

    chartTen.legend
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", 1 + legend_scale_x + "em")
      .attr("y", "0em")
      .attr("width", 15)
      .attr("height", 15)
    chartTen.legend.append("text")
       .attr("class",function(d){
        if (IS_PHONE) {
          return "grid-legend-text-mobile rating-0"
        } else {
          return "grid-legend-text rating-0"
        }
      })
      .attr("x", 3.5 + legend_scale_x*1.5 + "em")
      .attr("y", 1*legend_scale_y + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["no_data"];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", 1 + legend_scale_x + "em")
      .attr("y", 2.2*legend_scale_y + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_PHONE) {
          return "grid-legend-text-mobile rating-1"
        } else {
          return "grid-legend-text rating-1"
        }
      })
      .attr("x", 3.5 + legend_scale_x*1.5 + "em")
      .attr("y", 4*legend_scale_y + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["data_no_cat"];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", 1 + legend_scale_x + "em")
      .attr("y", 4.4*legend_scale_y + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_PHONE) {
          return "grid-legend-text-mobile rating-2"
        } else {
          return "grid-legend-text rating-2"
        }
      })
      .attr("x", 3.5 + legend_scale_x*1.5 + "em")
      .attr("y", 7*legend_scale_y + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["combined"];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", 1 + legend_scale_x + "em")
      .attr("y", 6.6*legend_scale_y + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_PHONE) {
          return "grid-legend-text-mobile rating-3"
        } else {
          return "grid-legend-text rating-3"
        }
      })
      .attr("x", 3.5 + legend_scale_x*1.5 + "em")
      .attr("y", 10*legend_scale_y + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["separate"];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", 1 + legend_scale_x + "em")
      .attr("y", 8.8*legend_scale_y + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_PHONE) {
          return "grid-legend-text-mobile rating-4"
        } else {
          return "grid-legend-text rating-4"
        }
      })
      .attr("x", 3.5 + legend_scale_x*1.5 + "em")
      .attr("y", 13*legend_scale_y + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["cross_tabbed"];
      });

      chartTen.legend.selectAll('.grid-legend-text-mobile').call(wrapText,80)

    chartTen.gridStates = gridStates



   chartTen.tooltipGridsvg= d3.select(".tooltip-grid")
    .append("svg")
    .attr("width", width*(tooltip_phone_width)*tooltip_mobile_width)
    .attr("height", height/2 - (tooltip_mobile_height/2) + (tooltip_phone_height/1.4))
  chartTen.tooltipGrid= chartTen.tooltipGridsvg.append("g")
    .attr("transform", "translate("+ (.1*width)+ ",0)");


  //HOVERING
    d3.selectAll(".gridSquare")
      .on("mouseover", function(mystate) {
            d3.select(this)         
              .style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
              .classed("hover", true ) // should then accept fill from CSS
            tooltip(mystate)
            selectedState = d3.select(this).attr('class').split(' ')[1]
            selectedColumn = d3.select(this).attr('class').split('gridSquare_')[1].split(" ")[0]
            console.log(selectedState, selectedColumn)
            d3.select('.rating-' + tooltipRating)
              .style('font-weight', '900')
    })


   function tooltip(mystate) {


    tooltipRatingSwitch = function() {
    for(var i = 0; i < gridColumns.length; i++){


      console.log(mystate)
      if (options.filter == 'step3-regular') {
        console.log(gridColumn)
         console.log(mystate.properties[gridColumn + rating])
         if (mystate.properties[gridColumn + frequency] == 2) {
          console.log(options.filter)
             return mystate.properties[gridColumn + rating];
            } return "0"
      } else if (options.filter == 'step3-all') {
           console.log(mystate.properties[gridColumn + frequency])
          return mystate.properties[gridColumn + rating];     
        } 
    }
  }

     tooltipRating = tooltipRatingSwitch()
            
          // chartTen.tooltipGrid
          //   .append("text")
          //   .attr("class", "tooltip-map-text")
          //   .attr("dy", 0)
          //   .attr("y", "2em")
          //   .attr("x", function() {
          //     if (IS_PHONE) {
          //       return "0em"
          //   } else return "-1em"
          //   })
          //   .attr("text-anchor", "start")
          //   .text(function() {
          //     if (tooltipRating == "0") {
          //       return mystate.properties.name + "  does not report race or ethnicity in its " + $('.ui-selectmenu-text').text() + " data";//mystate.properties.name;
          //     } else  if (tooltipRating == "1"){
          //       return mystate.properties.name + " reports race but not ethnicity in its " + $('.ui-selectmenu-text').text() + " data";
          //     } else  if (tooltipRating == "2"){
          //       return mystate.properties.name + " combines race and ethnicity into one category in its " + $('.ui-selectmenu-text').text() + " data";
          //     } else  if (tooltipRating == "3"){
          //       return mystate.properties.name + " reports both race and ethnicity in it " + $('.ui-selectmenu-text').text() + " data";
          //     }  else  if (tooltipRating == "4"){
          //       return mystate.properties.name + " collects both race and ethnicity and reports combined racial-ethnic categories in its " + $('.ui-selectmenu-text').text() + " data";
          //     }

          //   });

          //    chartMap.tooltipMap.selectAll('.tooltip-map-text').call(wrapText,500)
       

            // var width = $tooltip.width() - margin.left - margin.right,
            // height = height/2 - margin.top - margin.bottom;
   }


}


Grid.prototype.update = function(gridStates) {

  var frequency = "_frequency"
  var rating = "_rating"


  for(var i = 0; i < gridColumns.length; i++){
  var gridColumn = gridColumns[i]; 
  var eachColumn = d3.selectAll(".gridSquare_" + gridColumn);
   // .data(filteredData)
   eachColumn
    .transition() 
    .duration(1500)
    .style("opacity", function(d) {
      if (options.filter == 'step3-regular') {
        if (d.properties[gridColumn + frequency] == 2){
          return '1';
        } else {
          return '1';
        }
      } 
    }) 
   //  .style("stroke-opacity", function(d) {
   //  if (options.filter == 'step3-regular') {
   //    if (d.properties[gridColumn + frequency] == 2){
   //      return '0'; 
   //    }
   //   }
   // })
    .delay(function(d,i) { return i * 50; })
    .style("fill", function(d) {
        if (options.filter == 'step3-regular') {
          if (d.properties[gridColumn + frequency] == 2) {
           return color(d.properties[gridColumn + rating]);
          } return "#ffffff"
        } else if (options.filter == 'step3-all') {
            return color(d.properties[gridColumn + rating]);
        }
    })
    // .style("fill", function(d) {
    //   return color(d["properties"][gridColumn + rating]);
    // })
    // .style("stroke", function(d) {
    //   if (d["properties"][gridColumn + rating] == 0) {
    //     return "#9d9d9d";
    //   }
    // })
     .delay(function(d,i) { return i * 50; })
    .style("stroke", function(d) {
       if (options.filter == 'step3-regular' && d.properties[gridColumn+frequency] != 2) {
          return '#9d9d9d'
        } else if (options.filter == 'step3-all' && d.properties[gridColumn + rating] == 0) {
         return '#9d9d9d'
       }
     })
    .style("stroke-width", function(d) {
       if (options.filter == 'step3-regular' && d.properties[gridColumn+frequency] != 2) {
        return '1px'
       } else if (d.properties[gridColumn + rating] == 0) {
        return '1px'
      }
    })

  }     


 }

}

drawTopten()
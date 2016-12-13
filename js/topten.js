

function drawTopten(){
  $("#firstGraphic").empty();
  $("#container1 .tooltip-div-left").empty();
  $("#container1 .tooltip-div-right").empty();
  $("#container1 #xlabel-div").empty();
  $("#map").empty();
  $("#container2 #legend").empty();
  $("#grid").empty();
  $("#legend3-mobile").empty();
  $("#legend3-nonmobile").empty();
cellScale = (IS_MOBILE) && !(IS_PHONE)? .1 : .14


gridWidthFunction = function() {
  if ($('#grid').width() > 220) {
  return $('#grid').width(); 
} else {
    return 220;
  }
}


gridWidth = gridWidthFunction();
var cellWidth= cellScale*gridWidth
var cellGap = .17*cellWidth

var options = {
  filter: 'step3-regular'
}


var chartTen=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);


var $grid = $("#grid");
var aspect_width = 23;
var aspect_height = 40;
var margin = { top: 0, right: 0, bottom: -22, left: 32 };
var width= gridWidth
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 

var gridColumns = ["number_prison", "number_prison_ct", "arrests", "probation", "parole"]




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
      }
      else {
        d3.select(this).classed("on", true)
        d3.select(this).classed("off", false)
        options.filter = d3.select(this).attr("id");
        grid.update(gridStates);

      }

}) 


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
      $("#grid").empty();
      $("#legend3-mobile").empty();
      $("#legend3-nonmobile").empty();
      grid = new Grid(jsonResults)
      grid.update(jsonResults);
	});
});

function Grid(gridStates) { //https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

//var filteredData = states.features.properties.filter(function(d) {return d.hispanic>900000})



var frequency = "_frequency"
var rating = "_rating"

cell_scale_phone = (IS_PHONE) ? .95 : 1;
cell_scale_mobile = (IS_MOBILE) && !(IS_PHONE) ? 1.2 : 1;
width_phone = (IS_MOBILE)? 1.3 : 1;
row_x_phone = (IS_PHONE)? 25.5: 1;
row_x_mobile = (IS_MOBILE) && !(IS_PHONE) ? 60: 1;
grid_height_mobile = (IS_MOBILE) && !(IS_PHONE) ? .86: 1;
grid_translateX = (IS_MOBILE) ? 30 : 0;


chartTen.svg = d3.select("#grid")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("width", width)
    .attr("height", height*1.1*grid_height_mobile)


var filteredData_unsorted = gridStates.features.filter(function(d){
    return parseFloat(d.properties.hispanic.replace(/\,/g,"")) > 900000
  })

var parseHispanic = function(i) {
  return parseFloat(i.properties.hispanic.replace(/\,/g,""))
};


filteredData = filteredData_unsorted.sort(function(a,b) {
    return d3.descending(parseHispanic(a),parseHispanic(b));
});

  chartTen.row = chartTen.svg.selectAll(".row")
    .data(filteredData)
    .enter().append("g")
    .attr("class", "row")
    .attr("width", 500)
    .attr("height", cellWidth + cellGap)
    .attr("transform", function(d, i){ return "translate(" + grid_translateX+ " ," + (i*(cellWidth + cellGap))*cell_scale_phone*cell_scale_mobile + ")"})
  
  for(var i = 0; i < gridColumns.length; i++){
    var gridColumn = gridColumns[i]; 
    chartTen.row
      .append("rect")
      .attr("width",cellWidth *cell_scale_phone*cell_scale_mobile)
      .attr("height",cellWidth * cell_scale_phone*cell_scale_mobile)
      .attr("x", function() {
        if (IS_MOBILE) {
          return "x", (i*(cellWidth + cellGap))*cell_scale_phone*cell_scale_mobile
        } else {
        return (40+(i*(cellWidth+ cellGap)))
       }
      })
      .attr("y", 0)
      .attr("class",function(d){
        return "gridSquare " + d["properties"]["abbr"] + " gridSquare" + "_"+ gridColumn
      })
      .style("opacity", 0)
  }
 



cell_mobile_start = (IS_MOBILE) ? .5 : 1

label_side_phone = (IS_PHONE) ? -25.2 : 1;

//ADD DATA_QUALITY_LABELS

    chartTen.svg.selectAll(".row")
      .data(filteredData)
      .append("text")
      .attr("class", function(d) {
        return "grid-state-labels " + d["properties"]["abbr"]
      })
      .attr("transform", function(d, i){
        if (IS_PHONE) {
          return  "translate(" + label_side_phone +" ,"+ 2 + i + ")"
        } else  if (IS_MOBILE) {
          return  "translate(" + -27 +" ,"+ 2 + i + ")"
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
      .attr("class", "grid-cat-labels " + MEASURES_GRID[GLOBAL_LANGUAGE][i][0])
      .attr("transform", "translate(" + (i*(cellWidth + cellGap) + 70*cell_mobile_start)*cell_scale_phone*cell_scale_mobile + ","+.1*height+") rotate(-45)" )
      .attr("text-anchor", "end")

      .html(function () { 
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


legend_height_phone = (IS_PHONE) ? .5: 1;
legend_width_phone=(IS_PHONE)?1.5: 1;
legendX_rect = ".1em"
legendX_text = 2.5
legendY_mobile_text = (IS_MOBILE) && !(IS_PHONE) ? 1.1 : 1
legendY_mobile_rect = (IS_MOBILE) && !(IS_PHONE) ? 1.03 : 1
legendY_phone_rect = (IS_PHONE) ? .6 : 1
legendY_phone_text = (IS_PHONE) ? 1 : 1
legendY_phone_text = (IS_PHONE) ? 1 : 1
legendY_phone_text2 = (IS_PHONE) ? .67 : 1



legend3 =  (IS_PHONE)? ('#legend3-mobile') : ('#legend3-nonmobile')

  chartTen.legendSVG = d3.select(legend3)
      .append("div")
      .classed("grid-legend", true)
      .append("svg")
      .attr("width", width/1.3 *legend_width_phone)
      .attr("height", (width*1.2) *legend_height_phone);
  chartTen.legend = chartTen.legendSVG
      .append('g')
      // .attr("transform", function(){
      //   if (IS_PHONE) {
      //     return  "translate(0 ,0)"
      //   }  else 
      //     return "translate(-2 ,0)"
      // })



    chartTen.legend
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", legendX_rect)
      .attr("y", "0em")
      .attr("width", 15)
      .attr("height", 15)
    chartTen.legend.append("text")
       .attr("class",function(d){
        if (IS_MOBILE) {
          return "grid-legend-text-mobile rating-0"
        } else {
          return "grid-legend-text rating-0"
        }
      })
      .attr("x", legendX_text  + "em")
      .attr("y", .8 * legendY_phone_text + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .html(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][0][1];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", legendX_rect)
      .attr("y",3.2*legendY_phone_rect*legendY_mobile_rect + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_MOBILE) {
          return "grid-legend-text-mobile rating-1"
        } else {
          return "grid-legend-text rating-1"
        }
      })
      .attr("x", legendX_text  + "em")
      .attr("y", 5*legendY_phone_text2*legendY_mobile_text+ "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .html(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][1][1];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", legendX_rect)
      .attr("y",7.1*legendY_phone_rect*legendY_mobile_rect + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_MOBILE) {
          return "grid-legend-text-mobile rating-2"
        } else {
          return "grid-legend-text rating-2"
        }
      })
      .attr("x", legendX_text  + "em")
      .attr("y", (10.1*legendY_phone_text2)*legendY_mobile_text + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .html(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][2][1];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", legendX_rect)
      .attr("y",10.2*legendY_phone_rect*legendY_mobile_rect  + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_MOBILE) {
          return "grid-legend-text-mobile rating-3"
        } else {
          return "grid-legend-text rating-3"
        }
      })
      .attr("x", legendX_text  + "em")
      .attr("y", 14.2*legendY_phone_text2*legendY_mobile_text + "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .html(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][3][1];
      });

    chartTen.legend
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", legendX_rect)
      .attr("y",13.2*legendY_phone_rect*legendY_mobile_rect  + "em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.legend.append("text")
      .attr("class",function(d){
        if (IS_MOBILE) {
          return "grid-legend-text-mobile rating-4"
        } else {
          return "grid-legend-text rating-4"
        }
      })
      .attr("x", legendX_text  + "em")
      .attr("y", 18.3*legendY_phone_text2*legendY_mobile_text+ "em")
      .attr("dy", 0)
      .attr("text-anchor", "start")
      .html(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][4][1];
      });

      var grid_legend_text = (IS_MOBILE)? ('.grid-legend-text-mobile') : ('.grid-legend-text')
      var legend_wrap = (IS_PHONE) ? 190 : 140;

      chartTen.legend.selectAll(grid_legend_text).call(wrapText,legend_wrap)





    chartTen.gridStates = gridStates


  var grid_legend_text = (IS_MOBILE)? ('.grid-legend-text-mobile') : ('.grid-legend-text')


  //HOVERING
    d3.selectAll(".gridSquare")
      .on("mouseover", function(mystate) {
            d3.select(this)         
            //  .style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
              .classed("hover", true ) // should then accept fill from CSS
            // tooltip(mystate)
            var selectedState = d3.select(this).attr('class').split(' ')[1]
            var selectedColumn = d3.select(this).attr('class').split('gridSquare_')[1].split(" ")[0]
            tooltip(mystate, selectedState, selectedColumn)
            d3.select(grid_legend_text + '.rating-' + tooltipRating)
              .style('font-weight', '900')
            d3.select('.grid-state-labels.' + selectedState)
              .style('font-weight', '900')
            d3.select('.grid-cat-labels.' + selectedColumn)
              .style('font-weight', '900')
    })
    .on("mouseout",  function() {
      var selectedState = d3.select(this).attr('class').split(' ')[1]
      var selectedColumn = d3.select(this).attr('class').split('gridSquare_')[1].split(" ")[0]

      d3.select(this)
       .classed("hover", false)

      d3.select('.place-label.' + selectedState)
       .style("fill", function(d) { 
        return squareText(d);
        })
      
      
      // }
      d3.select(grid_legend_text + '.rating-' + tooltipRating)
              .style('font-weight', '400')
      d3.select('.grid-state-labels.' + selectedState)
              .style('font-weight', '400')
      d3.select('.grid-cat-labels.' + selectedColumn)
              .style('font-weight', '400')
    })


   function tooltip(mystate, selectedState, selectedColumn) {

    tooltipRatingSwitch = function() {
      if (options.filter == 'step3-regular') {
         if (mystate.properties[selectedColumn + frequency] == "2") {
          return mystate.properties[selectedColumn + rating]; 
        } return "0"; 
      //    return mystate.properties[selectedColumn + rating];     
        }
  }




    tooltipRating = tooltipRatingSwitch();

    }


}


  var frequency = "_frequency"
  var rating = "_rating"


 ttSquareColor = function(d, column) {
        if (options.filter == 'step3-regular') {
          if (d.properties[column + frequency] == 2) {
           return color(d.properties[column + rating]);
          }  
        } else if (options.filter == 'step3-all') {
            return color(d.properties[column + rating]);
         } return "#ffffff"
  }

  ttStrokeColor = function(d, column) {
       if (options.filter == 'step3-regular' && d.properties[column+frequency] != 2) {
          return '#9d9d9d'
        } else if (options.filter == 'step3-all' && d.properties[column + rating] == 0) {
         return '#9d9d9d'
       }
  }

  ttStrokeWidth = function(d, column) {
      if (options.filter == 'step3-regular' && d.properties[column+frequency] != 2) {
        return '1px'
       } else if (d.properties[column + rating] == 0) {
        return '1px'
      }
  }


Grid.prototype.update = function(gridStates, mystate, selectedColumn) {

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
    .delay(function(d,i) { return i * 50; })
   .style("fill", function(d) {
      return ttSquareColor(d, gridColumn);
    })

     .delay(function(d,i) { return i * 50; })
    .style("stroke", function(d) { 
      return ttStrokeColor(d, gridColumn);
     })
    .style("stroke-width", function(d) { 
      return ttStrokeWidth(d, gridColumn);
    })

  }     


 }

}


drawTopten();
function removeElements(callback){
  $("#firstGraphic").empty();
  $("#container1 .tooltip-div-left").empty();
  $("#container1 .tooltip-div-right").empty();
  $("#container1 #xlabel-div").empty();
  $("#map").empty();
  $("#container2 #legend").empty();
  $("#grid").empty();
  $("#legend3-mobile").empty();
  $("#legend3-nonmobile").empty();
  callback();
}

function redrawElements(){
  drawFirstGraphic();
  drawMap();
  drawTopten();
}

window.onresize = function(){ removeElements(redrawElements) };

function drawTopten(){

var options = {
  filter: 'step3-regular'
}


var chartTen=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



var $grid = $("#grid");
var aspect_width = 20;
var aspect_height = 18.5;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($grid.width() - margin.left - margin.right); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 



//EVENT HANDLERS

//TOGGLES
d3.selectAll(".step3_button").classed("active", false);
d3.select("#step3-regular").classed("active", true)
d3.select("#mobile-text").text("")
d3.selectAll('.step3_button')
  .on('click', function() {
    d3.selectAll(".step3_button.active").classed("active", false);
    d3.select(this).classed("active", true);
    options.filter = d3.select(this).attr("id");
    grid.update(gridStates);
    console.log(options.filter);

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

      grid = new Grid(jsonResults)
      grid.update(jsonResults);
	});
});

function Grid(gridStates) { //https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

//var filteredData = states.features.properties.filter(function(d) {return d.hispanic>900000})



 //states = states.properties.filter(function(d) {return d.state='NJ'})




chartTen.svg = d3.select("#grid")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var filteredData = gridStates.features.filter(function(d){
    return parseFloat(d.properties.hispanic.replace(/\,/g,"")) > 900000
  })


  chartTen.row = chartTen.svg.selectAll(".row")
    .data(filteredData)
    .enter().append("g")
    .attr("class", "row")
    .attr("width", 500)
    .attr("height", 45)
    .attr("transform", function(d, i){ return "translate(" + 100 +" ," + (i*45 + 25) + ")"})

  
gridColumns = ["number_prison", "number_prison_ct", "arrests", "probation", "parole"]
  for(var i = 0; i < gridColumns.length; i++){
    var gridColumn = gridColumns[i]; 
    chartTen.row
      .append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", i*45)
      .attr("y", 0)
      .attr("class",function(d){
        return "gridSquare " + "gridSquare" + "_"+ gridColumn
      })
      .style("opacity", 0)
  }


var parseHispanic = function(i) {
  return parseFloat(i.properties.hispanic.replace(/\,/g,""))
};

filteredData = filteredData.sort(function(a,b) {
    return d3.descending(parseHispanic(a),parseHispanic(b));
});




//ADD DATA_QUALITY_LABELS

    chartTen.svg.selectAll(".row")
      .data(filteredData)
      .append("text")
      .attr("class", "grid-state-labels")
      .attr("transform", function(d, i){ console.log('hi');return "translate(" + -30 +" ,"+ 2 + i + ")"})
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
      .attr("transform", "translate(" + (i*45 -7) + ",85) rotate(-45)" )
      .attr("text-anchor", "start")

      .text(function () { 
           return MEASURES[GLOBAL_LANGUAGE][i][1] 

       });
    })



//LEGEND

    chartTen.svg
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", "23.5em")
      .attr("y", "20em")
      .attr("width", 15)
      .attr("height", 15)
    chartTen.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "33.5em")
      .attr("y", "27.7em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["no_data"];
      });

    chartTen.svg
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", "23.5em")
      .attr("y", "21.5em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "33.5em")
      .attr("y", "29.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["data_no_cat"];
      });

    chartTen.svg
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", "23.5em")
      .attr("y", "23em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "33.5em")
      .attr("y", "31.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["combined"];
      });

    chartTen.svg
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", "23.5em")
      .attr("y", "24.5em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "33.5em")
      .attr("y", "33.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["separate"];
      });

    chartTen.svg
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", "23.5em")
      .attr("y", "26em")
      .attr("width", 16)
      .attr("height", 16)
    chartTen.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "33.5em")
      .attr("y", "35.6em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return DATA_QUALITY_LABELS[GLOBAL_LANGUAGE]["cross_tabbed"];
      });

    chartTen.gridStates = gridStates

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
    .delay(function(d,i) { return i * 10; })
    .duration(1500)
    .style("opacity", function(d) {
      if (options.filter == 'step3-regular') {
        if (d.properties[gridColumn + frequency] == 2){
          return '1';
        } else {
          return '0';
        }
      } 
    }) 
    .style("stroke-opacity", function(d) {
    if (options.filter == 'step3-regular') {
      if (d.properties[gridColumn + frequency] == 2){
        return '0'; 
      }
     }
   })
    .style("fill", function(d) {
      return color(d["properties"][gridColumn + rating]);
    })
    .style("stroke", function(d) {
      if (d["properties"][gridColumn + rating] == 0) {
        return "#9d9d9d";
      }
    })
    .style("stroke-width", function(d) {
      if (d.properties[gridColumn + rating] == 0) {
        return '1px'
      }
    }); 

  }     


 }

}

drawTopten()
var STATES_LABELS= ["CA", "TX","FL","NY","IL","AZ","NJ","CO"]
var filteredData = [];
var options = {
  category: 'number_prison_rating',
  filter: 'regular'

}

var chart=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



var $grid = $("#grid");
var aspect_width = 20;
var aspect_height = 15;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($map.width() - margin.left - margin.right); 
var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 





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
	});
});

function Grid(states) { //https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

//var filteredData = states.features.properties.filter(function(d) {return d.hispanic>900000})



 //states = states.properties.filter(function(d) {return d.state='NJ'})




  chart.svg = d3.select("#grid")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


var filteredData = states.features.filter(function(d){
    return parseFloat(d.properties.hispanic.replace(/\,/g,"")) > 900000
  })


  chart.row = chart.svg.selectAll(".row")
    .data(filteredData)
    .enter().append("g")
    .attr("class", "row")
    .attr("width", 500)
    .attr("height", 45)
    .attr("transform", function(d, i){ return "translate(" + 60 +" ," + i *45 + ")"})
    .on("click", function(d){ console.log(d)});

  
var gridColumns = ["number_prison_rating", "number_prison_ct_rating", "arrests_rating", "probation_rating", "parole_rating"]
  for(var i = 0; i < gridColumns.length; i++){
    var gridColumn = gridColumns[i]
    chart.row
      .append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", i*45)
      .attr("y", 0)
      .attr("class",function(d){
        return "gridSquare " + "gridSquare" + "_"+ gridColumn
      })
  }


var parseHispanic = function(i) {
  return parseFloat(i.properties.hispanic.replace(/\,/g,""))
  };

var filteredData = filteredData.sort(function(a,b) {
    return d3.descending(parseHispanic(a),parseHispanic(b));
    });

console.log

var group = document.querySelector('#grid');
console.log(group)
var rectNodes = group.getElementsByTagName('rect');

console.log(filteredData)

var column1 = d3.selectAll(".gridSquare_number_prison_rating")
//  .filter(function(d, i) { return i % 5 == 0;})
  .data(filteredData)
  .style("fill", function(d) {
    return color(d["properties"]["number_prison_rating"]);
  })
  .style("stroke", function(d) {
    if (d["properties"]["number_prison_rating"] == 0) {
      return "#9d9d9d";
    }
  })

var column2 = d3.selectAll(".gridSquare_number_prison_ct_rating")
//  .filter(function(d, i) { return i % 5 == 0;})
  .data(filteredData)
  .style("fill", function(d) {
    return color(d["properties"]["number_prison_ct_rating"]);
  })
  .style("stroke", function(d) {
    if (d["properties"]["number_prison_ct_rating"] == 0) {
      return "#9d9d9d";
    }
  })

var column3 = d3.selectAll(".gridSquare_arrests_rating")
//  .filter(function(d, i) { return i % 5 == 0;})
  .data(filteredData)
  .style("fill", function(d) {
    return color(d["properties"]["arrests_rating"]);
  })
  .style("stroke", function(d) {
    if (d["properties"]["arrests_rating"] == 0) {
      return "#9d9d9d";
    }
  })

var column4 = d3.selectAll(".gridSquare_probation_rating")
//  .filter(function(d, i) { return i % 5 == 0;})
  .data(filteredData)
  .style("fill", function(d) {
    return color(d["properties"]["probation_rating"]);
  })
  .style("stroke", function(d) {
    if (d["properties"]["probation_rating"] == 0) {
      return "#9d9d9d";
    }
  })

var column5 = d3.selectAll(".gridSquare_parole_rating")
//  .filter(function(d, i) { return i % 5 == 0;})
  .data(filteredData)
  .style("fill", function(d) {
    return color(d["properties"]["parole_rating"]);
  })
  .style("stroke", function(d) {
    if (d["properties"]["parole_rating"] == 0) {
      return "#9d9d9d";
    }
  })

//ADD LABELS

var STATE_LABELS= ["CA", "TX","FL","NY","IL","AZ","NJ","CO","NM","GA"]
  for(var i = 0; i < STATE_LABELS.length; i++){
    var STATE_LABELS = STATE_LABELS[i]
    chart.svg.selectAll(".row")
      .data(filteredData)
      .append("text")
      .attr("class", "grid-state-labels")
      .attr("transform", function(d, i){ console.log('hi');return "translate(" + -30 +" ,"+ 2 + i + ")"})
      .attr("text-anchor", "start")
      .text(function (d) {
          return d["properties"]["abbr"];
      });

  }


//LEGEND

    chart.svg
      .append("rect")
      .attr("id", "no-data")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "20em")
      .attr("width", 15)
      .attr("height", 15)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "27.7em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["no_data"];
      });

    chart.svg
      .append("rect")
      .attr("id", "data-no-cat")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "21.5em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "29.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["data_no_cat"];
      });

    chart.svg
      .append("rect")
      .attr("id", "combined")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "23em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "31.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["combined"];
      });

    chart.svg
      .append("rect")
      .attr("id", "separate")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "24.5em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "33.8em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["separate"];
      });

    chart.svg
      .append("rect")
      .attr("id", "cross-tabbed")
      .attr("class", "legend-icon")
      .attr("x", "19.5em")
      .attr("y", "26em")
      .attr("width", 16)
      .attr("height", 16)
    chart.svg.append("text")
      .attr("class", "legend-text")
      .attr("x", "27.5em")
      .attr("y", "35.6em")
      .attr("text-anchor", "start")
      .text(function (d, i) {
          return LABELS["cross_tabbed"];
      });




    
   

} 

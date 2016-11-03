var filteredData = [];
var options = {
  category: 'number_prison_rating',
  filter: 'regular'

}

var chart=this;


var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4])
    .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



var $firstGraphic = $("#firstGraphic");
var aspect_width = 20;
var aspect_height = 15;
var margin = { top: 0, right: 0, bottom: 10, left: 32 };
var width= ($firstGraphic.width() - margin.left - margin.right); 
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
          jsonState[0].properties.num_crime_cat_all = csvState.num_crime_cat_all;
          jsonState[0].properties.num_crime_cat_2 = csvState.num_crime_cat_2;

        }
      })
      filteredData = jsonResults.features

      firstGraphic = new firstGraphic(jsonResults)
	});
});

function firstGraphic(states) { 
  console.log('3')

  chart.svg = d3.select("#firstGraphic")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  /*DEFINING EACH MEASURE-ALL*/
  var allData_0 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '0';
    });

  var allData_1 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '1';
    });

  var allData_2 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '2';
    });

  var allData_3 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '3';
    });

  var allData_4 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '4';
    });

  var allData_5 = states.features.filter(function(d){
      return d.properties.num_crime_cat_all == '5';
    });

  /*DEFINING EACH MEASURE-FILTERED*/
  var filteredData_0 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '0';
    });

  var filteredData_1 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '1';
    });

  var filteredData_2 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '2';
    });

  var filteredData_3 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '3';
    });

  var filteredData_4 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '4';
    });

  var filteredData_5 = states.features.filter(function(d){
      return d.properties.num_crime_cat_2 == '5';
    });

  console.log(allData_2)

//ADDING GROUPS
yBase = 400
//0 measures

group0 = chart.svg.append('g')
    .data(allData_0)
    .attr("fill", "#000")

  for (var i = 0; i <allData_0.length; i++) {
rect0 = group0.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 40;
        } else {
          return 0;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group0")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }

//1 measure
group1 = chart.svg.append('g')
    .data(allData_1)
    .attr("fill", "#000")

  for (var i = 0; i <allData_1.length; i++) {
rect1 = group1.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 140;
        } else {
          return 100;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group1")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }


//2 measures
group2 = chart.svg.append('g')
    .data(allData_2)
    .attr("fill", "#000")

  for (var i = 0; i <allData_2.length; i++) {
rect2 = group2.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 240;
        } else {
          return 200;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group2")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }

//3measures
group3 = chart.svg.append('g')
    .data(allData_3)
    .attr("fill", "#000")

  for (var i = 0; i <allData_3.length; i++) {
rect3 = group3.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 340;
        } else {
          return 300;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group3")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }


//4 measures
group4 = chart.svg.append('g')
    .data(allData_4)
    .attr("fill", "#000")

  for (var i = 0; i <allData_4.length; i++) {
rect4 = group4.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 440;
        } else {
          return 400;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group4")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }


  //5 measures
group5 = chart.svg.append('g')
    .data(allData_5)
    .attr("fill", "#000")

  for (var i = 0; i <allData_5.length; i++) {
rect5 = group5.append("rect")
      .attr("width",35)
      .attr("height",35)
      .attr("x", function(d) {
        if (i%2 !== 0) {
          return 540;
        } else {
          return 500;
        }
      })
      .attr("y", function(d) {
        if (i%2 == 0){
          return yBase - ((i/2)*40);
        } else if (i == 1) {
          return yBase;
        } else{
          return yBase - (((i-1)/2)*40);
        }
      }) //so that all columns start from the bottom up
      .attr("class", "group5")
      .attr("class", function(d) {
        if (i%2 !== 0) {
          return "odd"
        } else {
          return "even"
        }
      })
  }


} 

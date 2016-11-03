var filteredData = [];
var options = {
  selectedData: 'step1-regular'

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


var getFilter1 = function(){
  return d3.select(".step1_button").attr("value");
}
Filter1 = getFilter1();

//EVENT HANDLERS

//TOGGLES
d3.selectAll(".step1_button").classed("active", false);
d3.selectAll("#step1-regular").classed("active", true)
d3.select("#mobile-text").text("")
d3.selectAll('.step1_button')
  .on('click', function() {
    d3.selectAll(".step1_button.active").classed("active", false);
    d3.select(this).classed("step1_button.active", true);
    options.selectedData = d3.select(this).attr("id");
    firstGraphic.update(states);
    console.log(options.selectedData);

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
          jsonState[0].properties.num_crime_cat_all = csvState.num_crime_cat_all;
          jsonState[0].properties.num_crime_cat_2 = csvState.num_crime_cat_2;

        }
      })
    

      firstGraphic = new FirstGraphic(jsonResults)
      firstGraphic.update(jsonResults)
	});
});

function FirstGraphic(states) { 
  console.log('3')

  console.log(Filter1)

  chart.svg = d3.select("#firstGraphic")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


 chart.states = states;

}



FirstGraphic.prototype.update = function(states) {



  data0 = states.features.filter(function(d) {return d.properties[Filter1]=='0'})
  data1 = states.features.filter(function(d) {return d.properties[Filter1]=='1'})
  data2 = states.features.filter(function(d) {return d.properties[Filter1]=='2'})
  data3 = states.features.filter(function(d) {return d.properties[Filter1]=='3'})
  data4 = states.features.filter(function(d) {return d.properties[Filter1]=='4'})
  data5 = states.features.filter(function(d) {return d.properties[Filter1]=='5'})


    //ADDING GROUPS
  yBase = 400

  //0 measures
  group0 = chart.svg.append('g')
      .data(data0)
      console.log(states.features)

  for (var i = 0; i <data0.length; i++) {
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
      .data(data1)
      .attr("fill", "#000")

    for (var i = 0; i <data1.length; i++) {
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
      .data(data2)
      .attr("fill", "#000")

    for (var i = 0; i <data2.length; i++) {
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
    .data(data3)
    .attr("fill", "#000")

  for (var i = 0; i <data3.length; i++) {
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
    .data(data4)
    .attr("fill", "#000")

  for (var i = 0; i <data4.length; i++) {
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
    .data(data5)
    .attr("fill", "#000")

  for (var i = 0; i <data5.length; i++) {
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




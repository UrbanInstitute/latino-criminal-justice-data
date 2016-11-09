
function drawFirstGraphic() {
  var selectedData = 'num_crime_cat_2'



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
    return selectedData;
  }
  Filter1 = getFilter1();
  console.log(Filter1)


  //EVENT HANDLERS

  //TOGGLES
  d3.selectAll(".step1_button").classed("active", false);
  d3.select("#step1-regular").classed("active", true)
  d3.select("#mobile-text").text("")
  d3.selectAll('.step1_button')
    .on('click', function() {
      d3.selectAll(".step1_button.active").classed("active", false);
      d3.select(this).classed("active", true);
      selectedData = d3.select(this).attr("value");
      firstGraphic.update(states);
      console.log(selectedData);

  }) 

  console.log(selectedData);
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
        // firstGraphic.update(jsonResults)
  	});
  });

  function FirstGraphic(states) { 



    chart.svg = d3.select("#firstGraphic")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    chart.group = chart.svg.append('g')


      //ADDING GROUPS
    yBase = 400
    yBase2 = 425
    for(var j = 0; j < 6; j++){
    //0 measures
    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})
    cells = chart.group.selectAll("cell")
        .data(data)
        .enter()

        cells.append("rect")
        .style("fill", "#9d9d9d")
        .attr("class",function(d){
          return "cell " + d.properties.abbr
        })
        .attr("width",35)
        .attr("height",35)
       
        .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return 40 + j*100;
          } else {
            return j*100;
          }
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return yBase - ((i/2)*40);
          } else if (i == 1) {
            return yBase;
          } else{
            return yBase - (((i-1)/2)*40);
          }
         }) //so that all columns start from the bottom up
    

    cells.append("text")
     .attr("class",function(d){
          return "cell-text " + d.properties.abbr
        })
  //  .attr("class", "cell-label")
   // .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
       .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
       .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return (46 + j*100);
          } else {
            return 6 + j*100;
          }
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return yBase2 - ((i/2)*40);
          } else if (i == 1) {
            return yBase2;
          } else{
            return yBase2 - (((i-1)/2)*40);
          }
         }) //so that all columns start from the bottom up
        .text(function(d) { 
          return d.properties.abbr;
        });      
      }
   var CATEGORY_LABELS = ["0", "1", "2", "3", "4", "5"]

//ADDING COLUMN LABELS

   chart.bottomRow = chart.svg.selectAll(".bottomRow")
    .data(CATEGORY_LABELS)
    .enter().append("g")
    .attr("class", "bottomRow")
    .attr("width", 300)
    .attr("height", 45)
    .attr("transform", function(d, i){ return "translate(" + (i*100 + 20) +" ,460)"})



    chart.bottomRow.each(function(d, i) {
      chart.bottomRow.append("text")
       .attr("class", "firstGraphic-column-text")
    //   .attr("transform", "translate("+ (i*40) +" ,10)")
       .attr("text-anchor", "start")
       .text(function (i) {
          return CATEGORY_LABELS[i];
      });

  })
   //  chart.bottomRow.append("text")
   //    .attr("class", "firstGraphic-column-text")
   //    .attr("transform", function(d, i){ return "translate("+ (i*4 + 2) +" ,10)"})
   //    .attr("text-anchor", "start")
   //     .text(function (d) {
   //        return CATEGORY_LABELS[i];
   //    });
   //  }



   chart.states = states;
   

  }



 FirstGraphic.prototype.update = function(states) {
    //chart.states = states
   
    yBase = 400
    for(var j = 0; j < 6; j++){


    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})
    // console.log(states.features.length)
    // console.log(data)
      for(var i = 0; i < data.length; i++){
      chart.group.select(".cell." + data[i].properties.abbr)
  //      .data(data)
        .transition()
        .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return 40 + j*100;
            } else {
              return j*100;
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return yBase - ((i/2)*40);
            } else if (i == 1) {
              return yBase;
            } else{
              return yBase - (((i-1)/2)*40);
            }
          }) //so that all columns start from the bottom up
        
        chart.group.select(".cell-text." + data[i].properties.abbr)

          .transition()
          .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return (46 + j*100);
            } else {
              return 6 + j*100;
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return yBase2 - ((i/2)*40);
            } else if (i == 1) {
              return yBase2;
            } else{
              return yBase2 - (((i-1)/2)*40);
            }
           }) //so that all columns start from the bottom up  
       }
      }

   

  } 
}

drawFirstGraphic();



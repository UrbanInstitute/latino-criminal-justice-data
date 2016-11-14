
function drawFirstGraphic() {

    var IS_MOBILE = d3.select("#isMobile").style("display") == "block"


  var selectTooltip = d3.select('.tooltip-div')
  var selectedData = 'num_crime_cat_2'

  tooltipCatNames = ["all_number_prison", "all_number_prison_ct", "all_arrests", "all_probation", "all_parole"]

  $tooltip = $("tooltip")
  yBase = 350
  ybaseCell = 372
  squareDim = 43
  xEvencell= 60
  xOddcell= 19

  var chart=this;


  var color = d3.scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



  var $firstGraphic = $("#firstGraphic");

  var aspect_width = 30;
  var aspect_height = 23;
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
            jsonState[0].properties.all_number_prison = csvState.all_number_prison;
            jsonState[0].properties.all_number_prison_ct = csvState.all_number_prison_ct;
            jsonState[0].properties.all_arrests = csvState.all_arrests;
            jsonState[0].properties.all_probation = csvState.all_probation;
            jsonState[0].properties.all_parole = csvState.all_parole;
            jsonState[0].properties.reg_number_prison = csvState.reg_number_prison;
            jsonState[0].properties.reg_number_prison_ct = csvState.reg_number_prison_ct;
            jsonState[0].properties.reg_arrests = csvState.reg_arrests;
            jsonState[0].properties.reg_probation = csvState.reg_probation;
            jsonState[0].properties.reg_parole = csvState.reg_parole;
          }
        })
      

        firstGraphic = new FirstGraphic(jsonResults)
        // firstGraphic.update(jsonResults)
  	});
  });

  function FirstGraphic(states) { 



    chart.svg = d3.select("#firstGraphic")
        .append("div")
        .classed("step-container", true)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    chart.group = chart.svg.append('g')
                  .attr("class", "g")



      //ADDING GROUPS

    
    for(var j = 0; j < 6; j++){

    var cell_scale = (IS_MOBILE) ? .6 : 1;
    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})
    cells = chart.group.selectAll("cell")
        .data(data)
        .enter()

    cells.append("rect")
        .style("fill", "#1696d2")
        .attr("class",function(d){
          return "cell " + d.properties.abbr
        })
        .attr("width",38*cell_scale)
        .attr("height",38*cell_scale)
        .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return (squareDim + j*100) *cell_scale;
          } else {
            return (j*100) *cell_scale
          }
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (yBase - ((i/2)*squareDim)) * cell_scale;
          } else if (i == 1) {
            return yBase * cell_scale;
          } else{
            return (yBase - (((i-1)/2)*squareDim)) * cell_scale;
          }
         }) //so that all columns start from the bottom up
    
      cells.append("text")
        .attr("class",function(d){
          return "cell-text " + d.properties.abbr
        })
  //  .attr("class", "cell-label")
   // .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return (xEvencell + j*100)*cell_scale;
          } else {
            return (xOddcell + j*100)*cell_scale;
          }
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (ybaseCell - ((i/2)*squareDim))*cell_scale;
          } else if (i == 1) {
            return ybaseCell*cell_scale;
          } else{
            return (ybaseCell - (((i-1)/2)*squareDim))*cell_scale;
          }
         }) //so that all columns start from the bottom up
        .text(function(d) { 
          return d.properties.abbr;
        })      
        .attr("text-anchor", "middle");
      

      }

      chart.group.selectAll(".cell")
          .on("mouseover", function(mystate) {
            d3.select(this)         
              .style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
              .classed("hover", true ) // should then accept fill from CSS
            tooltip(mystate)
            selectedState = d3.select(this).attr('class').split(' ')[1]
            d3.selectAll('.cell-text.' + selectedState)
              .style('fill', '#ffffff')

        })
        .on("mouseout",  function() {
          d3.select(this)
           .classed("hover", false)
           .style('fill', "#1696d2") // Re-sets the "explicit" fill
         d3.selectAll('.cell-text.' + selectedState)
            .style('fill', '#000000')
        chart.tooltipLeft.selectAll('text')
            .remove()
        chart.tooltipRight.selectAll('text')
            .remove()
        chart.tooltipRight.selectAll('.checkbox')
            .remove()


        })
      
   var CATEGORY_LABELS = ["0", "1", "2", "3", "4", "5"]

//ADDING COLUMN LABELS

   chart.bottomRow = chart.svg.selectAll(".bottomRow")
    .data(CATEGORY_LABELS)
    .enter().append("g")
    .attr("class", "bottomRow")
    .attr("width", 300)
    .attr("height", 45)
    .attr("transform", function(d, i){ return "translate(" + (i*100 + 20) +" ,410)"})



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

  chart.tooltip = d3.select("#tooltip")
    .append("div")
    .classed("tooltip-div", true)
    .append("svg")
    .attr("width", width)
    .attr("height", height/2.3)

  chart.tooltipRight = chart.tooltip
    .append("g")
    .attr("width", width/2.3)
    .attr("height", height)
    .attr("transform", "translate("+ width/6 +", 0)");

  chart.tooltipLeft = chart.tooltip
    .append("g")
    .attr("width", width/1.7)
    .attr("height", height/2)
    .attr("transform", "translate("+ .05*width + ",0)");

chart.states = states


function tooltip(mystate) {

   
   for(var i = 0; i < MEASURES_TOOLTIP[GLOBAL_LANGUAGE].length; i++){
        chart.tooltipRight
          .append("text")
          .attr("class", "tooltip-text")
          .attr("dy", 0)
          .attr("y", 3.8+ 2.3*i +"em")
          .attr("x","18em")
          .attr("text-anchor", "start")
          .text(function () {
              return MEASURES_TOOLTIP[GLOBAL_LANGUAGE][i][1]
            });
    }

    for (var i = 0; i < tooltipCatNames.length; i++) {
      
        tooltipCatName = tooltipCatNames[i]
        var imgs = chart.tooltipRight.selectAll("img").data([0]);
          imgs.enter()
         .append("svg:image")
          .attr("xlink:href", function(d, j) {
            if (mystate.properties[tooltipCatName] == "1") { 
              console.log(tooltipCatName)
              return "images/checkbox.svg";
            }
            else {
            return "images/uncheckedbox.svg"
          }
          }) 
          .attr('class', 'checkbox')
          .attr("x", "10em")
          .attr("y",  2 + 1.7*i + "em")
          .attr("width", "20")
          .attr("height", "20");
      }
          
        chart.tooltipRight
          .append("text")
          .attr("class", "tooltip-header")
          .attr("dy", 0)
          .attr("y", "1em")
          .attr("x","12em")
          .attr("text-anchor", "start")
          .text("data on latinos has been reported for");
  
  
        chart.tooltipLeft
          .append("text")
          .attr("class", "tooltip-text-state")
          .attr("dy", 0)
          .attr("y", "2em")
          .attr("x","-1em")
          .attr("text-anchor", "start")
          .text(function() {
            return mystate.properties.name;
          });
        chart.tooltipLeft
          .append("text")
          .attr("class", "tooltip-header")
          .attr("dy", 0)
          .attr("y", "1em")
          .attr("x","-2.3em")
          .attr("text-anchor", "start")
          .text("state");
     

          var width = $tooltip.width() - margin.left - margin.right,
          height = height/2 - margin.top - margin.bottom;
   }



 


   chart.states = states;
   

  }




 FirstGraphic.prototype.update = function(states) {
    //chart.states = states



    for(var j = 0; j < 6; j++){


    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})
    // console.log(states.features.length)
    // console.log(data)
      for(var i = 0; i < data.length; i++){
      chart.group.selectAll(".cell." + data[i].properties.abbr)
  //      .data(data)
        .transition()
        .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return squareDim + j*100;
            } else {
              return j*100;
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return yBase - ((i/2)*squareDim);
            } else if (i == 1) {
              return yBase;
            } else{
              return yBase - (((i-1)/2)*squareDim);
            }
          }) //so that all columns start from the bottom up
        
        chart.group.select(".cell-text." + data[i].properties.abbr)

          .transition()
          .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return (xEvencell + j*100);
            } else {
              return xOddcell + j*100;
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return ybaseCell - ((i/2)*squareDim);
            } else if (i == 1) {
              return ybaseCell;
            } else{
              return ybaseCell - (((i-1)/2)*squareDim);
            }
           }) //so that all columns start from the bottom up  
       }
      }


    
   

  } 
}

drawFirstGraphic();
 window.onresize = drawFirstGraphic



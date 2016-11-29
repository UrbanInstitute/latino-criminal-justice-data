
function drawFirstGraphic() {

  var options = {
  filter: 'step1-regular'

}

  cell_scale_phone = (IS_PHONE) ? .56 : 1;
  cell_scale_mobile = (IS_MOBILE) ? .66 : 1;

    var IS_PHONE = d3.select("#isPhone").style("display") == "block"
    var IS_MOBILE = d3.select("#isMobile").style("display") == "block"


  var selectTooltip = d3.select('.tooltip-div')
  var selectedData = 'num_crime_cat_2'

  tooltipCatNames_all = ["all_number_prison", "all_number_prison_ct", "all_arrests", "all_probation", "all_parole"]
  tooltipCatNames_reg = ["reg_number_prison", "reg_number_prison_ct", "reg_arrests", "reg_probation", "reg_parole"]

  $tooltip = $("tooltip")
  yBase = 350
  ybaseCell = 373
  squareDim = 43
  xEvencell= 19
  xOddcell= 60

  var chart=this;


  var color = d3.scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



  var $firstGraphic = $("#firstGraphic");

  var aspect_width = 30;
  var aspect_height = 28;
  var margin = { top: 0, right: 0, bottom: 10, left: 32 };
  var width= ($firstGraphic.width() - margin.left - margin.right); 
  var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 
  console.log(height)
  var getFilter1 = function(){
    return selectedData;
  }
  Filter1 = getFilter1();
  console.log(Filter1)


  //EVENT HANDLERS
 



 // d3.selectAll(".step1_button").classed("active", false);
 // d3.select("#step1-regular").classed("active", true)

  d3.select("#step1-regular").classed("on", true)
  d3.select("#mobile-text").text("")
 // d3.selectAll('.step1_button')
 d3.select("#step1-regular")
    .on('click', function() {
    //  d3.selectAll(".step1_button.active").classed("active", false);
    //  d3.select(this).classed("active", true);
      if(d3.select(this).classed("on")){
        d3.select(this).classed("on", false)
        d3.select(this).classed("off", true)
        selectedData = "num_crime_cat_all";
        firstGraphic.update(states);
        options.filter = "#step1-all";
      }
      else {
        d3.select(this).classed("on", true)
        d3.select(this).classed("off", false)
        selectedData = "num_crime_cat_2";
        options.filter = d3.select(this).attr("id");
        firstGraphic.update(states);
      }

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
    cell_scale_phone = (IS_PHONE) ? .56 : 1;
    cell_scale_mobile = (IS_MOBILE) ? .7 : 1;
    phone_height = (IS_PHONE) ? 0: 0;
    phone_width = (IS_PHONE) ? 38 : 0;
    mobile_width = (IS_MOBILE) ? 32 : 0;
    mobile_height = (IS_MOBILE) ? 70 : 0;



    chart.svg = d3.select("#firstGraphic")
        .append("div")
        .classed("step-container", true)
        .append("svg")
        .attr("width", function(){
          if ((IS_PHONE) || (IS_MOBILE)) {
            return width + phone_width + mobile_width
          } else {
            return width}
        })
        .attr("height", function(){
          if ((IS_PHONE) || (IS_MOBILE))  {
            return height + mobile_height + phone_height
            console.log('hi')
          } else {
            return height}
        })

    chart.group = chart.svg.append('g')
                  .attr("class", "g")
                  .attr("transform", "translate(0,0)")

    xLabel = chart.svg.append("g")
      .attr("transform", "translate(20,0)")

    xLabel
      .append('text')
        .attr("text-anchor", "start")
        .attr('class', 'xlabel')
        .attr('x', function() {
          if (IS_PHONE)  {
            return '2em'
          } else { 
            if (IS_MOBILE) {
              console.log('hi')
              return '1.5em'
              } return '6.5em'
          }
        })
        .attr('y', function() {
          if (IS_PHONE) {
            return '20.5em'
          } else { 
            if (IS_MOBILE) {
              return '19.5em'
            }
            return '27em'
          }
        })
        .text('Number of Categories with Data Reported')
        .style('fill', "#9d9d9d")

      //ADDING GROUPS

    
    for(var j = 0; j < 6; j++){



    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})

    cells = chart.group.selectAll("cell")
        .data(data.sort(function (a,b) {return d3.descending(a.properties.abbr, b.properties.abbr); }))
        .enter()
    cells.append("rect")
        .style("fill", "#1696d2")
        .attr("class",function(d){
          return "cell " + d.properties.abbr;
        })
        .attr("width",38*cell_scale_phone*cell_scale_mobile)
        .attr("height",38*cell_scale_phone*cell_scale_mobile)
   // cells.selectAll(".cell ")
   //     .sort(function(a, b) {return d3.descending(a.d["properties"][])})
        .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return (squareDim + j*100) *cell_scale_phone*cell_scale_mobile;
          } else {
            return (j*100) *cell_scale_phone*cell_scale_mobile;
          }
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (yBase - ((i/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
          } else if (i == 1) {
            return yBase * cell_scale_phone*cell_scale_mobile;
          } else{
            return (yBase - (((i-1)/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
          }
         }) //so that all columns start from the bottom up
     
      cells.append("text")
        .attr("class",function(d){
          if (IS_PHONE) {
            return "cell-text-mobile " + d.properties.abbr;
          }
              return "cell-text " + d.properties.abbr;
          })
  //  .attr("class", "cell-label")
   // .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("x", function(d,i) {
          if (i== data.length && i%2 !== 0) {
            return (10)}
          else if (i%2 !== 0) {
            return (xOddcell + j*100)*cell_scale_phone*cell_scale_mobile;
          } 
            return (xEvencell + j*100)*cell_scale_phone*cell_scale_mobile;
        })
        .transition()
        .duration(800)
        .delay(function(d, i) { return i*15; })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (ybaseCell - ((i/2)*squareDim))*cell_scale_phone*cell_scale_mobile;
          } else if (i == 1) {
            return ybaseCell*cell_scale_phone*cell_scale_mobile;
          } else{
            return (ybaseCell - (((i-1)/2)*squareDim))*cell_scale_phone*cell_scale_mobile;
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
            if(IS_PHONE) {
               d3.selectAll('.cell-text-mobile.' + selectedState)
              .style('fill', '#ffffff')
            } else {
            d3.selectAll('.cell-text.' + selectedState)
              .style('fill', '#ffffff')
            }

        })
        .on("mouseout",  function() {
          d3.select(this)
           .classed("hover", false)
           .style('fill', "#1696d2") // Re-sets the "explicit" fill
          if(IS_PHONE) {
            d3.selectAll('.cell-text-mobile.' + selectedState)
            .style('fill', '#000000')
          } else {
          d3.selectAll('.cell-text.' + selectedState)
            .style('fill', '#000000')
          }
          
        chart.tooltipLeft.selectAll('text')
            .remove()
        chart.tooltipRight.selectAll('text')
            .remove()
        chart.tooltipRight.selectAll('.checkbox')
            .remove()
        addHeaders();
        addMeasures();


        })
      
   var CATEGORY_LABELS = ["0", "1", "2", "3", "4", "5"]

//ADDING COLUMN LABELS

   chart.bottomRow = chart.svg.selectAll(".bottomRow")
    .data(CATEGORY_LABELS)
    .enter().append("g")
    .attr("class",function(d){
      if (IS_PHONE) {
      return "bottomRow-mobile"
      } else {
          return "bottomRow"
      }
    })
    .attr("width", 300)
    .attr("height", 45)
    .attr("transform", function(d, i){ 
      if (i == 5) {
        if ((IS_PHONE) || (IS_MOBILE)){
        return "translate(" + (i*100 + 15*cell_scale_phone*cell_scale_mobile*1.7)*cell_scale_phone*cell_scale_mobile +" , " + 410*cell_scale_phone*cell_scale_mobile +")"; //label 5 needs to  be aligned under one cell
      } return "translate(" + (i*100 + 15) +" , " + 410 +")"; //label 5 needs to  be aligned under one cell
    } else { 
      if ((IS_PHONE)|| (IS_MOBILE)){
        return "translate(" + (i*100 + 36*cell_scale_phone*cell_scale_mobile*1.6)*cell_scale_phone*cell_scale_mobile +" ," + 410*cell_scale_phone*cell_scale_mobile +")"
      }
        return "translate(" + (i*100 + 36)+" ," + 410+")"
      }
    })
   



    chart.bottomRow.each(function(d, i) {
      chart.bottomRow.append("text")
       .attr("class", "firstGraphic-column-text-"+ i)
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

  tooltip_phone_width = (IS_PHONE) ? 1.5 : 1;
   tooltip_phone_height = (IS_PHONE) ? 40 : 0;
   tooltip_right_phone_width = (IS_PHONE) ? 0 : 1;
   tooltip_mobile_width = (IS_MOBILE) ? 1.7 : 1;
   tooltip_mobile_height = (IS_MOBILE) ? 80 : 0;
   tooltip_right_mobile_width = (IS_MOBILE) ? 0 : 1;
  // chart.tooltip = d3.select("#tooltip")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height/2.3 + tooltip_phone_height*2)

  chart.tooltipLeft = d3.select(".tooltip-div-left")
    .append("svg")
    .attr("width", width/2.5 *(tooltip_phone_width*1.2)*tooltip_mobile_width)
    .attr("height", height/2.4 - (tooltip_mobile_height/2) + (tooltip_phone_height/1.4))
  chart.tooltipLeft= chart.tooltipLeft.append("g")
    .attr("transform", "translate("+ (.1*width)/tooltip_phone_width + ",0)");

  chart.tooltipRight = d3.select(".tooltip-div-right")
    .append("svg")
    .attr("width", width/2*(tooltip_phone_width)*tooltip_mobile_width)
    .attr("height", height/2.4 + tooltip_phone_height + tooltip_mobile_height)
  chart.tooltipRight = chart.tooltipRight.append("g")
    .attr("transform", "translate("+ -140*(tooltip_right_phone_width) +", " + 0 +")");
  
  


  for (var i = 0; i < 5; i++) { 
   var imgs = chart.tooltipRight.selectAll("img").data([0]);
    imgs.enter()
    .append("svg:image")
    .attr("xlink:href", "images/uncheckedbox.svg") 
    .attr('class', 'checkbox_initial')
    .attr("x", function() {
        if (IS_PHONE) {
          return "0em"
        } else return "10em"
      })
    .attr("y",  2 + 1.7*i + "em")
    .attr("width","20")
    .attr("height", "20");
    
  }


  function addMeasures() {
    for(var i = 0; i < MEASURES_TOOLTIP[GLOBAL_LANGUAGE].length; i++){
      chart.tooltipRight
        .append("text")
        .attr("class", "tooltip-text")
        .attr("dy", 0)
        .attr("y", 3.8+ 2.3*i +"em")
        .attr("x", function() {
          if (IS_PHONE) {
            return "2em"
          } else return "18em"
        })
        .attr("text-anchor", "start")
        .text(function () {
            return MEASURES_TOOLTIP[GLOBAL_LANGUAGE][i][1]
          });
      }
  }
  addMeasures();

  function addHeaders() {
  chart.tooltipRight
    .append("text")
    .attr("class", "tooltip-header")
    .attr("dy", 0)
    .attr("y", "1em")
    .attr("x", function() {
        if (IS_PHONE) {
          return "0em"
        } else return "12em"
      })
    .attr("text-anchor", "start")
    .text("data on latinos has been reported for");
  chart.tooltipLeft
    .append("text")
    .attr("class", "tooltip-header")
    .attr("dy", 0)
    .attr("y", "1em")
    .attr("x", function() {
      if (IS_PHONE) {
        return "0em"
    } else return "-2.3em"
    })
    .attr("text-anchor", "start")
    .text("state");

  }
  addHeaders()


chart.states = states


function tooltip(mystate) {

    tooltipCatNames_switch = function() {
    if (options.filter== 'step1-regular') {
      return tooltipCatNames_reg;
    } return tooltipCatNames_all;
  }

  var tooltipCatNames = tooltipCatNames_switch()

    for (var i = 0; i < tooltipCatNames.length; i++) {
      
        tooltipCatName = tooltipCatNames[i]
        var imgs = chart.tooltipRight.selectAll("img").data([0]);
          imgs.enter()
         .append("svg:image")
          .attr("xlink:href", function(d, j) {
            if (mystate.properties[tooltipCatName] == "1") { 
              return "images/checkbox.svg";
            }
            else {
            return "images/uncheckedbox.svg"
          }
          }) 
          .attr('class', 'checkbox')
          .attr("x", function() {
            if (IS_PHONE) {
              return "0em"
            } else return "10em"
          })
          .attr("y",  2 + 1.7*i + "em")
          .attr("width", "20")
          .attr("height", "20");
      }
          
        chart.tooltipLeft
          .append("text")
          .attr("class", "tooltip-text-state")
          .attr("dy", 0)
          .attr("y", "2em")
          .attr("x", function() {
            if (IS_PHONE) {
              return "0em"
          } else return "-1em"
          })
          .attr("text-anchor", "start")
          .text(function() {
            return mystate.properties.name;
          });
     

          var width = $tooltip.width() - margin.left - margin.right,
          height = height/2 - margin.top - margin.bottom;
   }



 


   chart.states = states;
   

  }




 FirstGraphic.prototype.update = function(states) {

    cell_scale_phone = (IS_PHONE) ? .56 : 1;
    cell_scale_mobile = (IS_MOBILE) ? .7 : 1;
    phone_height = (IS_PHONE) ? 0: 0;
    phone_width = (IS_PHONE) ? 38 : 0;
    mobile_width = (IS_MOBILE) ? 32 : 0;
    mobile_height = (IS_MOBILE) ? 70 : 0;


    //chart.states = states



    for(var j = 0; j < 6; j++){


    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})
                              .sort(function (a,b) {return d3.descending(a.properties.abbr, b.properties.abbr); });



    // console.log(states.features.length)
    // console.log(data)
      for(var i = 0; i < data.length; i++){


      chart.group.selectAll(".cell." + data[i].properties.abbr)
        .transition()
        .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return (squareDim + j*100) *cell_scale_phone*cell_scale_mobile
            } else {
              return (j*100) *cell_scale_phone*cell_scale_mobile
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return (yBase - ((i/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
            } else if (i == 1) {
              return yBase*cell_scale_phone*cell_scale_mobile;
            } else{
              return (yBase - (((i-1)/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
            }
          }) //so that all columns start from the bottom up
        
        if(IS_PHONE) {
          chart.group.select(".cell-text-mobile." + data[i].properties.abbr)
          .transition()
          .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              return (xOddcell + j*100)*cell_scale_phone;
            } 
              return (xEvencell + j*100)*cell_scale_phone;
          })
          .attr("y", function() {
            if (i%2 == 0){
              return (ybaseCell - ((i/2)*squareDim))*cell_scale_phone;
            } else if (i == 1) {
              return ybaseCell*cell_scale_phone;
            } else{
              return (ybaseCell - (((i-1)/2)*squareDim))*cell_scale_phone;

            }
           }) //so that all columns start from the bottom up  

        } else {
                  chart.group.select(".cell-text." + data[i].properties.abbr)
          .transition()
          .duration(2000)
          .attr("x", function() {
            if (i%2 !== 0) {
              console.log('hi')
             return (xOddcell + j*100)*cell_scale_mobile;
            } else {
              return (xEvencell + j*100)*cell_scale_mobile;
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return (ybaseCell - ((i/2)*squareDim))*cell_scale_mobile;
            } else if (i == 1) {
              return ybaseCell*cell_scale_mobile;
            } else{
              return (ybaseCell - (((i-1)/2)*squareDim))*cell_scale_mobile;
            }
           }) //so that all columns start from the bottom up  

          }


        
       }
      }


    
   

  } 
}

drawFirstGraphic();
 window.onresize = drawFirstGraphic



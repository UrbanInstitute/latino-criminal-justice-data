STATESELECT= null;
var IS_PHONE, IS_MOBILE, IS_990; 

function drawFirstGraphic() {



  var options = {
  filter: 'step1-regular'

}


    IS_PHONE = d3.select("#isPhone").style("display") == "block"
    IS_MOBILE = d3.select("#isMobile").style("display") == "block"
   // IS_990 = d3.select("#is990").style("display") == "block"


  var selectTooltip = d3.select('.tooltip-div')
  var selectedData = 'num_crime_cat_2'

  tooltipCatNames_all = ["all_number_prison", "all_number_prison_ct", "all_arrests", "all_probation", "all_parole"]
  tooltipCatNames_reg = ["reg_number_prison", "reg_number_prison_ct", "reg_arrests", "reg_probation", "reg_parole"]

  $tooltip = $("tooltip")
  





  var chart=this;


  var color = d3.scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(["#ffffff", " #cfe8f3", "#46abdb", "#12719e", "#0a4c6a"]);



  var $firstGraphic = $("#firstGraphic");


  var aspect_width = 30;
  var aspect_height = 25;
  var bottomMargin = (IS_PHONE) ? 20 : 10
  var margin = { top: 0, right: 0, bottom: bottomMargin, left: 32 };
  var width= $firstGraphic.width(); 
  var height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom; 

  yBase = .795*height
  squareDim = .077*width
  squareGap = .00875*width
  columnGap = .178*width

  var getFilter1 = function(){
    return selectedData;
  }
  Filter1 = getFilter1();


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
      
  $("#firstGraphic").empty();
  $("#container1 .tooltip-div-left").empty();
  $("#container1 .tooltip-div-right").empty();
    $("#container1 #xlabel-div").empty();

        firstGraphic = new FirstGraphic(jsonResults)
        // firstGraphic.update(jsonResults)
  	});
  });

  function FirstGraphic(states) { 
    phone_height = (IS_PHONE) ? 35: 0;
    phone_width = (IS_PHONE) ? 40 : 0;
    mobile_width = (IS_MOBILE) ? 42 : 0;
    mobile_height = (IS_MOBILE) ? 30 : 0;



    chart.svg = d3.select("#firstGraphic")
        .append("div")
        .classed("step-container", true)
        .append("svg")
        .attr("width", width)
        .attr("height", function(){
          if (IS_PHONE) {
            return height + phone_height
          }  else if (IS_MOBILE) {
            return height + mobile_height 
          }
          else {
            return .81*width}
        })

    chart.group = chart.svg.append('g')
                  .attr("class", "g")
                  .attr("transform", "translate(5, " + (.05*height)+ ")")
    xLabel = chart.d3.select("#xlabel-div")
                  // .append("svg")
                  // .attr("width", width) 
                  // .attr("height", width/10)


  //wrapText_mobile = (IS_PHONE) || (IS_MOBILE) ? 300: 1000;
    xLabel
      // .append('text')
      //   .attr("text-anchor", "start")
      //   .attr('class', 'xlabel')
      //   .attr('x', '.2em')
      //   .attr('y', '2em')

        .text(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
        .style('fill', "#000000")
     // if (IS_PHONE) {
     //        chart.d3.select('.xLabel').call(wrapText,100)
     //        } else {
     //        chart.d3.select('.xLabel').call(wrapText,1000)
     //        }
///NOT WORKING
      //ADDING GROUPS

    
    for(var j = 0; j < 6; j++){



    var data = states.features.filter(function(d) {return d.properties[selectedData]== String(j)})

    cells = chart.group.selectAll("cell")
        .data(data.sort(function (a,b) {return d3.descending(a.properties.abbr, b.properties.abbr); }))
        .enter()
    cells.append("rect")
        .attr("class",function(d){
          return "cell " + d.properties.abbr;
        })
        .attr("width",(squareDim-squareGap))
        .attr("height",(squareDim-squareGap))
        .attr("x", function(d,i) {
          if (i%2 !== 0) {
            return (squareDim + j*columnGap)
          } else {
            return (j*columnGap)
          }
        })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (yBase - ((i/2)*squareDim))
          } else if (i == 1) {
            return yBase 
          } else{
            return (yBase - (((i-1)/2)*squareDim)) 
          }
         }) //so that all columns start from the bottom up
         d3.selectAll(".cell")
         .on("click", function (d) {
            dispatch.call("clickState", this, (d3.select(this).attr('class').split(' ')[1]));
        })
        .on("mouseover", function (d) {
           dispatch.call("hoverState", this, (d3.select(this).attr('class').split(' ')[1]))
        })
        .on("mouseout", function (d) {
            dispatch.call("dehoverState");
        })
        // .on("click", function(d){
        //     dispatch.clickState(d3.select(this).attr('class').split(' ')[1])
        //     console.log('hi')
        // })

     
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
          if (i%2 !== 0) {
            return (squareDim + j*columnGap) + squareDim*.45;
          } else {
            return (j*columnGap) + squareDim*.45;
          }
        })
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (yBase - ((i/2)*squareDim)) + squareDim*.55;
          } else if (i == 1) {
            return yBase + squareDim*.55;
          } else{
            return (yBase - (((i-1)/2)*squareDim)) + squareDim*.55;
          }
         }) //so that all columns start from the bottom up
        .text(function(d) { 
          return d.properties.abbr;
        })      
        .attr("text-anchor", "middle");

      

      }

      function selectState(selectedState) {
      var cellText = (IS_PHONE) ? ('.cell-text-mobile') : ('.cell-text')
        d3.selectAll(".cell")
          .classed('deselected', true)
          .classed('selected', false)
        d3.select(".cell." + selectedState)
          .classed('selected', true)
          .classed("deselected", false)
        d3.selectAll(cellText)
          .classed('deselected-text', true)
          .classed('selected-text', false)
        d3.select(cellText + "." + selectedState)
          .classed('selected-text', true)
          .classed("deselected-text", false)

      }

       var dispatch = d3.dispatch("clickState", "hoverState", "dehoverState");

       dispatch.on("clickState", function (selectedState) {
        if (STATESELECT != selectedState) {
            STATESELECT = selectedState;
            selectState(selectedState);
            tooltip(d3.select(this).datum()) //, selectedState)
        } else {
            //deselect the state
            STATESELECT = null;
            d3.selectAll(".selected")
                .classed("selected", false);
            d3.selectAll(".deselected")
                .classed("deselected", false);
        }
      });
      dispatch.on("hoverState", function (selectedState) {
      var cellText = (IS_PHONE) ? ('.cell-text-mobile') : ('.cell-text')
        d3.select(".cell." + selectedState)
            .classed("highlight", true)
        d3.select(cellText + "." + selectedState)
            .classed("highlight-text", true)
        chart.tooltipLeft.selectAll('.tooltip-text-state')
             .remove()
        chart.tooltipLeft.selectAll('.tooltip-text-state-mobile')
             .remove()
            tooltip(d3.select(this).datum())
        
      });
      dispatch.on("dehoverState", function () {
        //no lowlighting
        d3.selectAll(".highlight")
            .classed("highlight", false);
        d3.selectAll(".highlight-text")
            .classed("highlight-text", false)

        if(d3.selectAll("#firstGraphic .selected").nodes().length > 0){
          d3.selectAll(".tooltip-text-state").remove()
          d3.selectAll(".tooltip-text-state-mobile").remove()
          tooltip(d3.select("#firstGraphic .selected").datum())
        }else{
          d3.selectAll(".tooltip-text-state").text(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE])
          d3.selectAll(".tooltip-text-state-mobile").text(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE])
          d3.selectAll("#firstGraphic .selected-text").classed("selected-text", false).classed("deselected-text", true)

          d3.selectAll("image.checkbox")
            .attr("xlink:href", function() {
              return "images/uncheckedbox.svg"
            }) 
        }

            // if (STATESELECT == null) {
            //     $tooltipgraph.empty();
            // } else {
            //     tooltip(STATESELECT)
            // }
      });

       
             
  

             // d3.select(this)         
             //    .style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
             //  tooltip(mystate)
             //  selectedState = d3.select(this).attr('class').split(' ')[1]
             //  if(IS_PHONE) {
             //     d3.selectAll('.cell-text-mobile.' + selectedState)
             //    .style('fill', '#ffffff')
             //  } else {
             //  d3.selectAll('.cell-text.' + selectedState)
             //    .style('fill', '#ffffff')
             //  }
       

        // chart.group.selectAll(".cell")
        //   .on("mouseover", function(selectedState) {
  
        //     d3.select(this)         
        //       //.style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
        //       .classed("hover", true ) // should then accept fill from CSS
        //     chart.tooltipLeft.selectAll('.tooltip-text-state')
        //     .remove()
        //     chart.tooltipLeft.selectAll('.tooltip-text-state-mobile')
        //     .remove()
        //     tooltip(selectedState) //, selectedState)
        //     var selectedState = d3.select(this).attr('class').split(' ')[1]
        //     if(IS_PHONE) {
        //        d3.selectAll('.cell-text-mobile.' + selectedState)
        //       .style('fill', '#ffffff')
        //     } else {
        //     d3.selectAll('.cell-text.' + selectedState)
        //       .style('fill', '#ffffff')
        //     }

        // })
        // .on("mouseout",  function() {
        //  var selectedState = d3.select(this).attr('class').split(' ')[1]

          // d3.select(this)
          //  .classed("hover", false)
          //  .style('fill', "#1696d2") // Re-sets the "explicit" fill
          // if(IS_PHONE) {
          //   d3.selectAll('.cell-text-mobile')
          //   .style('fill', '#000000')
          // } else {
          // d3.selectAll('.cell-text')
          //   .style('fill', '#000000')
          // }

          
        // chart.tooltipLeft.selectAll('text')
        //     .remove()
        // chart.tooltipRight.selectAll('text')
        //     .remove()
        // chart.tooltipRight.selectAll('.checkbox')
        //     .remove()
        // addHeaders();
        // addMeasures();


        // })
      
   var CATEGORY_LABELS = ["0", "1", "2", "3", "4", "5"]

//ADDING COLUMN LABELS
  var label_width_scale = .1775*width

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
    .attr("transform", function(d, i){ 
      if (i == 5) {
        return "translate(" + (i*label_width_scale + label_width_scale/3)+" , " + (.98*height)+ ")"; // + label_5_x_phone + label_5_x_mobile)+" , " + label_height*label_y_phone*label_y_mobile  +")"; //label 5 needs to  be aligned under one cell
    //   return "translate(" + (i*100 + 30) +" , " + label_height +")"; //label 5 needs to  be aligned under one cell
    } else { 
    
        return "translate(" + (i*label_width_scale + (width/13)) +" ," + (.98*height) +")"
      }
    })
   

    chart.bottomRow.each(function(d, i) {
      chart.bottomRow.append("text")
       .attr("class", "firstGraphic-column-text-"+ i)
    //   .attr("transform", "translate("+ (i*40) +" ,10)")
       .attr("text-anchor", "start")
       .style("font-size", "12px")
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


  tooltipLeft_phone_width = (IS_PHONE) ? 1.5 : 1;
   tooltipRight_mobile_height = (IS_MOBILE&& !IS_PHONE) ? .72 : 1;
   tooltipLeft_mobile_height = (IS_MOBILE&& !IS_PHONE)? .8: 1;
   tooltipLeft_phone_height = (IS_PHONE)? .5: 1;

  // chart.tooltip = d3.select("#tooltip")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height/2.3 + tooltip_phone_height*2)

  chart.tooltipLeft = d3.select(".tooltip-div-left")
    .append("svg")
    .attr("width", (width/2.3)*tooltipLeft_phone_width)
    .attr("height", (height/2.7)*tooltipLeft_mobile_height*tooltipLeft_phone_height)
  chart.tooltipLeft= chart.tooltipLeft.append("g")
    .attr("transform", "translate(3, " + 0 +")");



  chart.tooltipRight = d3.select(".tooltip-div-right")
    .append("svg")
    .attr("width", width/1.9)

  chart.tooltipRight = chart.tooltipRight.append("g")
    .attr("transform", "translate(2, " + 0 +")");
  
  


  for (var i = 0; i < 5; i++) { 
   var imgs = chart.tooltipRight.selectAll("img").data([0]);
    imgs.enter()
    .append("svg:image")
    .attr("xlink:href", "images/uncheckedbox.svg") 
    .attr('class', 'checkbox_initial')
    .attr("x", ".5em")
    .attr("y",  2 + 1.7*i + "em")
    .attr("width","20")
    .attr("height", "20");
    
  }


  function addMeasures() {
    for(var i = 0; i < MEASURES_DROPDOWN[GLOBAL_LANGUAGE].length; i++){
      chart.tooltipRight
        .append("text")
        .attr("class", "tooltip-text num" + i)
        .attr("dy", 0)
        .attr("y", 3.8+ 2.3*i +"em")
        .attr("x", "2.7em")
        .attr("text-anchor", "start")
        .text(function () {
            return MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1]
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
    .attr("x", ".8em")
    .attr("text-anchor", "start")
    .text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][1][1])
  chart.tooltipLeft
    .append("text")
    .attr("class", "tooltip-header")
    .attr("dy", 0)
    .attr("y", "1em")
    .attr("x", ".8em")
    .attr("text-anchor", "start")
    .text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][0][1]);

  }
  addHeaders()
  d3.select(".tooltip-div-right")
    .style("height",function(){
      return Math.abs(d3.select(".tooltip-header").node().getBoundingClientRect().top - d3.select(".tooltip-text.num4").node().getBoundingClientRect().bottom) + "px"
    })
  d3.select(".tooltip-div-right svg")
    .attr("height",function(){
      return Math.abs(d3.select(".tooltip-header").node().getBoundingClientRect().top - d3.select(".tooltip-text.num4").node().getBoundingClientRect().bottom)
    })
  // d3.select(".tooltip-div-left")
  //   .style("height",function(){
  //     return Math.abs(d3.select(".tooltip-header").node().getBoundingClientRect().top - d3.select(".tooltip-text-state").node().getBoundingClientRect().bottom) + "px"
  //   })
  // d3.select(".tooltip-div-left svg")
  //   .attr("height",function(){
  //     return Math.abs(d3.select(".tooltip-header").node().getBoundingClientRect().top - d3.select(".tooltip-text.state").node().getBoundingClientRect().bottom)
  //   })
  chart.tooltipLeft
      .append("text")
      .attr("class", function() {
        if (IS_MOBILE) {
          return "tooltip-text-state-mobile" 
        } else {
          return "tooltip-text-state"
        }
      })
      .attr("dy", 0)
      .attr("y", "2em")
      .attr("x", ".45em")
        .attr("text-anchor", "start")
        .text(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE])


chart.states = states


function tooltip(mystate) {
  d3.selectAll(".checkbox").remove()
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
          .attr("xlink:href", function() {
            if (mystate.properties[tooltipCatName] == "1") { 
              return "images/checkbox.svg";
            }
            else {
            return "images/uncheckedbox.svg"
          }
          }) 
          .attr('class', 'checkbox')
          .attr("x", ".5em")
          .attr("y",  2 + 1.7*i + "em")
          .attr("width", "20")
          .attr("height", "20");
      }
          
        var wrapWidth = (IS_PHONE) ? 1000 : 190;
        chart.tooltipLeft
          .append("text")
           .attr("class", function() {
            if (IS_MOBILE) {
              return "tooltip-text-state-mobile" 
            } else {
              return "tooltip-text-state"
            }
          })
          .attr("dy", 0)
          .attr("y", "2em")
          .attr("x", ".2em")
          .attr("text-anchor", "start")
          .text(function() {
            return mystate.properties.name;
          })
          .call(wrapText,wrapWidth)




     
       //   var width = $tooltip.width() - margin.left - margin.right,
        //  height = height/2 - margin.top - margin.bottom;
   }



 


   chart.states = states;
   

  }




 FirstGraphic.prototype.update = function(states) {

    phone_height = (IS_PHONE) ? 0: 0;
    phone_width = (IS_PHONE) ? 38 : 0;
    mobile_width = (IS_MOBILE && !IS_PHONE) ? 32 : 0;
    mobile_height = (IS_MOBILE && !IS_PHONE) ? 70 : 0;


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
              return (squareDim + j*columnGap) 
            } else {
              return (j*columnGap) 
            }
          })
          .attr("y", function() {
            if (i%2 == 0){
              return (yBase - ((i/2)*squareDim)) 
            } else if (i == 1) {
              return yBase
            } else{
              return (yBase - (((i-1)/2)*squareDim)) 
            }
          }) //so that all columns start from the bottom up
        
        // if(IS_PHONE) {
        //   chart.group.select(".cell-text-mobile." + data[i].properties.abbr)
        //   .transition()
        //   .duration(2000)
        //   .attr("x", function() {
        //     if (i%2 !== 0) {
        //       return (squareDim + j*columnGap) + squareDim*.45;
        //   } else {
        //     return (j*columnGap) + squareDim*.45;
        //   }
        //   })
        //   .attr("y", function() {
        //     if (i%2 == 0){
        //       return (yBase - (i/2))
        //     } else if (i == 1) {
        //       return yBase
        //     } else{
        //       return (yBase - (((i-1)/2)*squareDim))

        //     }
        //    }) //so that all columns start from the bottom up  

        // } else {
                  chart.group.select(".cell-text." + data[i].properties.abbr)
          .transition()
          .duration(2000)
            .attr("x", function() {
            if (i%2 !== 0) {
              return (squareDim + j*columnGap) + squareDim*.45;
          } else {
            return (j*columnGap) + squareDim*.45;
          }
        })
          .attr("y", function() {
            if (i%2 == 0){
              return yBase - (i/2)*squareDim + squareDim*.55
            } else if (i == 1) {
              return yBase + squareDim *.55
            } else{
              return (yBase - (((i-1)/2)*squareDim)) + squareDim*.55;
            }
           }) //so that all columns start from the bottom up  

          // }


        
       }
      }


    
   

  } 
}

drawFirstGraphic();



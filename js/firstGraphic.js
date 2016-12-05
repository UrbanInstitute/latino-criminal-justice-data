STATESELECT= null;

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
  var aspect_height = 24;
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
    phone_height = (IS_PHONE) ? 35: 0;
    phone_width = (IS_PHONE) ? 40 : 0;
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
            return width*1.1}
        })
        .attr("height", function(){
          if (IS_PHONE) {
            return height + phone_height
          }  else if (IS_MOBILE) {
            return height + mobile_height 
          }
          else {
            return height}
        })

    chart.group = chart.svg.append('g')
                  .attr("class", "g")
                  .attr("transform", "translate(15, 12)")
    xLabel = chart.d3.select("#xlabel-div")
                  .append("svg")
                  .attr("width", function(){
                      if ((IS_PHONE) || (IS_MOBILE)) {
                        console.log(width + phone_width + mobile_width);
                        return width + phone_width + mobile_width
                        console.log(width + phone_width + mobile_width)
                      } else {
                                                console.log(width + phone_width + mobile_width);

                        return width*1.1}
                  })
                  .attr("height", height/8)


  //wrapText_mobile = (IS_PHONE) || (IS_MOBILE) ? 300: 1000;
    xLabel
      .append('text')
        .attr("text-anchor", "start")
        .attr('class', 'xlabel')
        .attr('x', function() {
          if (IS_PHONE)  {
            return '.7em'
          } else { 
            if (IS_MOBILE) {
              console.log('hello')
              return '1em'
              } return '.5em'
          }
        })
        .attr('y', function() {
          if (IS_PHONE) {
            return '1em'
          } else { 
            if (IS_MOBILE) {
              return '1em'
            }
            return '2.5em'
          }
        })
        .text(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
        .style('fill', "#000000")
    //  xLabel.selectAll('.xlabel').call(wrapText, wrapText_mobile)

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
        .attr("y", function(d,i) {
          if (i%2 == 0){
            return (yBase - ((i/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
          } else if (i == 1) {
            return yBase * cell_scale_phone*cell_scale_mobile;
          } else{
            return (yBase - (((i-1)/2)*squareDim)) * cell_scale_phone*cell_scale_mobile;
          }
         }) //so that all columns start from the bottom up
    d3.selectAll("rect")
         .on("click", function (d) {
            dispatch.call("clickState", this, (d3.select(this).attr('class').split(' ')[1]));
        })
     
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

      function clickState(selectedState) {
        d3.selectAll(".cell." + selectedState)
         .classed('deselected', true)
          .classed('selected', false)
        d3.select(".cell." + selectedState)
          .classed('selected', true)
          .classed("deselected", false)

      }

       var dispatch = d3.dispatch("clickState");
       dispatch
        .on("clickState", function (selectedState) {
          console.log(STATESELECT)
        if (STATESELECT != selectedState) {
          console.log('hi')
            STATESELECT = selectedState;
            clickState(selectedState);
            if (!isMobile) {
                tooltip(selectedState, selectedState)
            }
        } else {
            //deselect the state
            STATESELECT = null;
            d3.selectAll(".selected")
                .classed("selected", false);
            d3.selectAll(".deselected")
                .classed("deselected", false);
        }
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
       

        chart.group.selectAll(".cell")
          .on("mouseover", function(mystate) {
            d3.select(this)         
              //.style('fill', '#231f20') // Un-sets the "explicit" fill (might need to be null instead of '')
              .classed("hover", true ) // should then accept fill from CSS
            chart.tooltipLeft.selectAll('.tooltip-text-state')
            .remove()
            chart.tooltipLeft.selectAll('.tooltip-text-state-mobile')
            .remove()
            tooltip(mystate, selectedState)
            var selectedState = d3.select(this).attr('class').split(' ')[1]
            if(IS_PHONE) {
               d3.selectAll('.cell-text-mobile.' + selectedState)
              .style('fill', '#ffffff')
            } else {
            d3.selectAll('.cell-text.' + selectedState)
              .style('fill', '#ffffff')
            }

        })
        .on("mouseout",  function() {
         var selectedState = d3.select(this).attr('class').split(' ')[1]

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
  var label_height = 416
  var label_5_x_phone = (IS_PHONE) ? -227: 0;
  var label_y_phone = (IS_PHONE) ? .58: 1;
  var label_x_phone_start = (IS_PHONE) ? 9: 0;
  var label_x_phone = (IS_PHONE) ? .56: 1;

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
        return "translate(" + (i*100 + 30 + label_5_x_phone)+" , " + label_height*label_y_phone  +")"; //label 5 needs to  be aligned under one cell
    //   return "translate(" + (i*100 + 30) +" , " + label_height +")"; //label 5 needs to  be aligned under one cell
    } else { 
    
        return "translate(" + (i*100 + 51 + label_x_phone_start)*label_x_phone+" ," + label_height*label_y_phone +")"
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

  tooltipLeft_phone_width = (IS_PHONE) ? 3 : 1;
   tooltipRight_phone_width = (IS_PHONE) ? 2.3 : 1;
   tooltip_mobile_width = (IS_MOBILE) ? 1.7 : 1;
   tooltip_phone_height = (IS_PHONE)? 80: 0;
   tooltipRight_mobile_height = (IS_MOBILE) ? 80 : 0;
   tooltipLeft_mobile_height = (IS_MOBILE)? 40: 0;
   tooltipRight_x = (IS_MOBILE) || (IS_PHONE) ? 0 : 1;
  // chart.tooltip = d3.select("#tooltip")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height/2.3 + tooltip_phone_height*2)
  console.log(width)

  chart.tooltipLeft = d3.select(".tooltip-div-left")
    .append("svg")
    .attr("width", width/2.3 *(tooltipLeft_phone_width)*tooltip_mobile_width)
    .attr("height", height/2.4 - (tooltipLeft_mobile_height/2)-tooltip_phone_height/3)
  chart.tooltipLeft= chart.tooltipLeft.append("g")
    .attr("transform", "translate("+ (.1*width)/tooltipLeft_phone_width + ",0)");


  chart.tooltipRight = d3.select(".tooltip-div-right")
    .append("svg")
    .attr("width", width/1.7*(tooltipRight_phone_width)*tooltip_mobile_width)
    .attr("height", height/2.7 + tooltipRight_mobile_height + tooltip_phone_height)
  chart.tooltipRight = chart.tooltipRight.append("g")
    .attr("transform", "translate("+ -140*(tooltipRight_x) +", " + 0 +")");
  
  


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
    for(var i = 0; i < MEASURES_DROPDOWN[GLOBAL_LANGUAGE].length; i++){
      chart.tooltipRight
        .append("text")
        .attr("class", "tooltip-text")
        .attr("dy", 0)
        .attr("y", 3.8+ 2.3*i +"em")
        .attr("x", function() {
          if (IS_PHONE) {
            return "2em"
          } else return "16em"
        })
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
    .attr("x", function() {
        if (IS_PHONE) {
          return "0em"
        } else return "13.1em"
      })
    .attr("text-anchor", "start")
    .text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][1][1])
  chart.tooltipLeft
    .append("text")
    .attr("class", "tooltip-header")
    .attr("dy", 0)
    .attr("y", "1em")
    .attr("x", function() {
      if (IS_PHONE) {
        return "0em"
    } else return "-3.2em"
    })
    .attr("text-anchor", "start")
    .text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][0][1]);

  }
  addHeaders()

  chart.tooltipLeft
      .append("text")
      .attr("class", function() {
        if ((IS_MOBILE) || (IS_PHONE)) {
          return "tooltip-text-state-mobile" 
        } else {
          return "tooltip-text-state"
        }
      })
      .attr("dy", 0)
      .attr("y", "2em")
      .attr("x", function() {
          if (IS_PHONE) {
            return "0em"
        } else return "-1.4em"
        })
        .attr("text-anchor", "start")
        .text(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE])


chart.states = states


function tooltip(mystate, selectedState) {

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
           .attr("class", function() {
            if ((IS_MOBILE) || (IS_PHONE)) {
              return "tooltip-text-state-mobile" 
            } else {
              return "tooltip-text-state"
            }
          })
          .attr("dy", 0)
          .attr("y", "2em")
          .attr("x", function() {
            if (IS_PHONE) {
              return "0em"
          } else return "-1.4em"
          })
          .attr("text-anchor", "start")
          .text(function() {
            return mystate.properties.name;
          })
          chart.tooltipLeft.selectAll('.tooltip-text-state').call(wrapText,190)



     
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



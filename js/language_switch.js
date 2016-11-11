var GLOBAL_LANGUAGE = "english";

var BUTTON_NAMES= {
    english: {
    regular: "Regularly and Recently Reported Data",
    all: "All Data Reported"
    },
    spanish: {
    regular: "spanish-version-regular",
    all: "spanish-version-all"
    }
}


var DATA_QUALITY_LABELS= {
  english: {
    no_data: 'No data on race or ethnicity',
    data_no_cat: 'Data, but no Latino category',
    combined: 'Race/Ethnicity combined',
    separate: 'Race/Ethnicity separate',
    cross_tabbed: 'Race/Ethnicity cross-tabbed'
  },
  spanish: {
    no_data: 'No data- spanish',
    data_no_cat: 'Data, no latino- spanish',
    combined: 'Race/Ethnicity combined - spanish',
    separate: 'Race/Ethnicity separate- spanish',
    cross_tabbed: 'Race/Ethnicity cross-tabbed- spanish'
  }
}

var MEASURES = {
  english: [
    ["prison","Prison"], 
    ["prison_pop","Prison Pop"], 
    ["arrests","Arrests"], 
    ["probation","Probation"], 
    ["parole","Parole"]
  ],
  spanish: [
    ["prison","Prison"], 
    ["prison_pop","Prison Pop"], 
    ["arrests","Arrests"], 
    ["probation","Probation"], 
    ["parole","Parole"]
  ]
}

var MEASURES_DROPDOWN = {
  english: [
    ["prison","the prison population"], 
    ["prison_pop","the prison population by office"], 
    ["arrests","arrests"], 
    ["probation","the probation population"], 
    ["parole","the parole population"]
  ],
  spanish: [
    ["prison","the prison population-spanish"], 
    ["prison_pop","the prison population by office-spanish"], 
    ["arrests","arrests-spanish"], 
    ["probation","the probation population-spanish"], 
    ["parole","the parole population-spanish"]
  ]
}

var MEASURES_TOOLTIP = {
  english: [
    ["prison","The Prison Population"], 
    ["prison_pop","The Prison Population by office"], 
    ["arrests","Arrest records"], 
    ["probation","The Probation Population"], 
    ["parole","The Parole Population"]
  ],
  spanish: [
    ["prison","the prison population-spanish"], 
    ["prison_pop","the prison population by office-spanish"], 
    ["arrests","arrests-spanish"], 
    ["probation","the probation population-spanish"], 
    ["parole","the parole population-spanish"]
  ]
}





$("#spanish")
.on("click", function() {
  GLOBAL_LANGUAGE = "spanish";
  console.log(GLOBAL_LANGUAGE)
  d3.select(this).classed("active", true)
  if ($(".reg_button").text() == $(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"])) {
    $(".reg_button").text($(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"]));
  } else {
    $(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"], $(".reg_button").text());
    $(".reg_button").text(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"])
   d3.select(".reg_button").classed(".step1_button", "true")
  }
})

$("#spanish")
.on("click", function() {
   GLOBAL_LANGUAGE = "spanish";
  d3.select(this).classed("active", true)
  if ($(".all_button").text() == $(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"])) {
    console.log('hi')
    $(".all_button").text($(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"]));
  } else {
    console.log('hi')
    $(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"], $(".all_button").text());
    $(".all_button").text(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"])
   d3.select(".all_button").classed(".step1_button", "true")
  }
})

$("#spanish")
.on("click", function() {
    GLOBAL_LANGUAGE = "spanish";
 
  d3.select(this).classed("active", true)
  d3.selectAll(".measure_type").each(function(d, i) {
    if ($(".measure_type").text() == $(".measure_type").data(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])) {
      $(".measure_type").text($(".measure_type").data(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1]));
    } else {
      $(".measure_type").data(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1], $(".measure_type").text());
      $(".measure_type").text(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
  }


  })

})

// $("#spanish")
// .on("click", function() {
//   selectLegend = d3.select("#legend")
//   legendText = selectLegend.selectAll(".legend-text")
 
//   d3.select(this).classed("active", true)
//  d3.selectAll.each(function(d, i) {
//     if ($(".legend-text").text() == $(".legend-text").data(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])) {
//       $(".legend-text").text($(".legend-text").data(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1]));
//     } else {
//       $(".legend-text").data(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1], $(".legend-text").text());
//       $(".legend-text").text(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])
//   }


//   })

// })



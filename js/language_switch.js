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
    no_data: '',
    data_no_cat: '',
    combined: '',
    separate: '',
    cross_tabbed: ''
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



$("#spanish")
.on("click", function() {
 
  d3.select(this).classed("active", true)
  if ($(".reg_button").text() == $(".reg_button").data(BUTTON_NAMES["spanish"]["regular"])) {
    console.log('hi')
    $(".reg_button").text($(".reg_button").data(BUTTON_NAMES["english"]["regular"]));
  } else {
    console.log('hi')
    $(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"], $(".reg_button").text());
    $(".reg_button").text(BUTTON_NAMES["spanish"]["regular"])
   d3.select(".reg_button").classed(".step1_button", "true")
  }
})

$("#spanish")
.on("click", function() {
 
  d3.select(this).classed("active", true)
  if ($(".all_button").text() == $(".all_button").data(BUTTON_NAMES["spanish"]["all"])) {
    console.log('hi')
    $(".all_button").text($(".all_button").data(BUTTON_NAMES["english"]["all"]));
  } else {
    console.log('hi')
    $(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"], $(".all_button").text());
    $(".all_button").text(BUTTON_NAMES["spanish"]["all"])
   d3.select(".all_button").classed(".step1_button", "true")
  }
})


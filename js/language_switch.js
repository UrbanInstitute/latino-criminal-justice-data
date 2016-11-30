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
    ["prison","The Prison Population"], 
    ["prison_pop","The Prison Population by Office"], 
    ["arrests","Arrests"], 
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

var TITLE = {
  english: ["The Lack of Race and Ethnicity Data in Criminal Justice is Dangerous"],
  spanish: ["Spanish title"]
}

var HEADERTEXT = {
  english:  ["<p><strong>No one knows exactly how many Latinos are in prison, on probation or parole, or being arrested.</strong> In this nation that will soon be “majority minority,” there is a serious lack of information \
  on how many Latinos are involved in the criminal justice system. While 40 states report race (e.g. White, Black, Other) in their arrest records, only 15 states report data on ethnicity - and just 12 do it with the frequency \
  needed for it to be significant. </p> <p>Criminal justice system data are used to develop policies that affect <a href=\"http:\/\/www.urban.org\/research-area\/courts-and-sentencing\" target=\"_blank\">sentencing</a>,\
   <a href=\"http:\/\/www.urban.org\/urban-wire\/prison\-programming-works-so-why-do-we-have-so-little\" target=\"_blank\">prison</a> and <a href=\"http:\/\/www.urban.org\/urban-wire\/prison-programming-works-so-why-do-we-have-so-\
   little\" target=\"_blank\">jail programming</a>, and <a href=\"http:\/\/apps.urban.org\/features\/safer-return\/\" target=\"_blank\">reentry services</a>. Without an accurate picture of who is in our justice systems, we cannot make \
   policy that is appropriate for each state’s population. Community members and advocates cannot know how much of a problem mass incarceration is for Latinos, and ethnic disparities cannot be accurately tracked.</p>  <p>A state’s failure \
   to report ethnicity in addition to race can even mask racial disparities in the criminal justice system. A state that only counts people as \“black\” or \“white\” <a href=\"http:\/\/www.sentencingproject.org\/wp-content\/uploads\/2016\/06\/The-Color-of-Justice-Racial-and-Ethnic-Disparity-in-State-Prisons.pdf\" \
   target=\"_blank\">would likely label most of their Latino prison population as \"white.\”</a> Artificially inflating the number of \“white\” people in prison would make white\/black disparities appear less extreme than they actually are. Comprehensive \
   data around ethnicity doesn’t just affect Latinos.  </p><p>The most informative – and therefore the most useful – data should be: <ul><li><strong>Publicly available:</strong> For data to be useful to policymakers, the general public, \
   and advocates, it must be publicly accessible.</li><li><strong>Regular and recent:</strong> Data reported regularly (monthly, annually or biannually) are most valuable, as they provide up-to-date counts and demonstrate changes in populations.</li>\
   <li><strong>Reports race and ethnicity: </strong> At a minimum, demographic data should include a category for Latinos. Ideally, all states would track both race and ethnicity as is done by the <a href=\"http:\/\/www.census.gov\/prod\/cen2010\/briefs\/c2010br-02.pdf\" \
   target=\"_blank\">US Census</a>, and report them as a combined category (e.g. ‘Hispanic white’ and ‘non-Hispanic black’). </li> </ul></p><p>While our research does not consider how data is collected, race and ethnicity data should be self-reported, \
   not determined by state employees (e.g. intake workers, police officers, and corrections officials).</p>"],
  spanish: ["Spanish header text"]

}

var FIRSTSECTION = {
  english:[],
  spanish:["first section- spanish text"]
}





// $("#spanish")
// .on("click", function() {
//   GLOBAL_LANGUAGE = "spanish";
//   console.log(GLOBAL_LANGUAGE)
//   d3.select(this).classed("active", true)
//   if ($(".reg_button").text() == $(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"])) {
//     $(".reg_button").text($(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"]));
//   } else {
//     $(".reg_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"], $(".reg_button").text());
//     $(".reg_button").text(BUTTON_NAMES[GLOBAL_LANGUAGE]["regular"])
//    d3.select(".reg_button").classed(".step1_button", "true")
//   }
// })

// $("#spanish")
// .on("click", function() {
//    GLOBAL_LANGUAGE = "spanish";
//   d3.select(this).classed("active", true)
//   if ($(".all_button").text() == $(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"])) {
//     console.log('hi')
//     $(".all_button").text($(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"]));
//   } else {
//     console.log('hi')
//     $(".all_button").data(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"], $(".all_button").text());
//     $(".all_button").text(BUTTON_NAMES[GLOBAL_LANGUAGE]["all"])
//    d3.select(".all_button").classed(".step1_button", "true")
//   }
// })


$(".language_option")
.on("click", function() {
    GLOBAL_LANGUAGE = d3.select(this).select("a").attr("id");
    console.log(GLOBAL_LANGUAGE)

  var measures = $('.measure_type')
  d3.select(this).classed("active", true)
 // d3.selectAll(".measure_type").each(function(d, i) {
  for (var i=0; i<measures.length; i++){
      console.log(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
      console.log(measures.eq(i).text())
       if (measures.eq(i).text() == (MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])) {
        
        console.log('1')
    //   } else {
    //     $(".measure_type").data(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1], $(".measure_type").text());
    //     $(".measure_type").text(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
    //     console.log(  $(".measure_type").text())
    }
    else {
      measures.eq(i).data(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1]), measures.eq(i).text();
      measures.eq(i).text(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
    }
  } 
  $('#heroimage').find('h1').html(TITLE[GLOBAL_LANGUAGE])
   $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])

console.log(TITLE[GLOBAL_LANGUAGE])
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



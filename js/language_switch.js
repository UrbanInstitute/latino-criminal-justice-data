function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " ")).toLowerCase();
}

console.log("URL = " + window.location.href)
var GLOBAL_LANGUAGE = getParameterByName("language", window.location.href)
console.log(GLOBAL_LANGUAGE)
if (GLOBAL_LANGUAGE != "spanish" && GLOBAL_LANGUAGE != "english") {
  GLOBAL_LANGUAGE = "english";
}
var IS_PHONE = d3.select("#isPhone").style("display") == "block"
var IS_MOBILE = d3.select("#isMobile").style("display") == "block"


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
    no_data: 'No race/ethnicity data',
    data_no_cat: 'Race data only, no Latino category',
    combined: 'Race data only, with Latino category',
    separate: 'Data on race and ethnicity',
    cross_tabbed: 'Data by racial-ethnic groups'
  },
  spanish: {
    no_data: 'No data- spanish',
    data_no_cat: 'Data, no latino- spanish',
    combined: 'Race/Ethnicity combined - spanish',
    separate: 'Race/Ethnicity separate- spanish',
    cross_tabbed: 'Race/Ethnicity cross-tabbed- spanish'
  }
}

var DATA_QUALITY_LABELS2= {
  english: [
    ['no_data', 'No race/ethnicity data'],
    ['data_no_cat', 'Race data only, no Latino category'],
    ['combined', 'Race data only, with Latino category'],
    ['separate',  'Data on race and ethnicity'],
    ['cross_tabbed', 'Data by racial-ethnic groups']
  ],
  spanish: [
   ['no_data', 'No data on race or ethnicity-spanish'],
    ['data_no_cat', 'Data, but no Latino category-spanish'],
    ['combined', 'Race/Ethnicity combined-spanish'],
    ['separate', 'Race/Ethnicity separate-spanish'],
    ['cross_tabbed', 'Race/Ethnicity cross-tabbed-spanish']
  ]
}

var MEASURES_GRID= {
  english: [
    ["prison","Prison"], 
    ["prison_pop","By offense"], 
    ["arrests","Arrests"], 
    ["probation","Probation"], 
    ["parole","Parole"]
  ],
  spanish: [
    ["prison","Prison-spanish"], 
    ["prison_pop","By offense-spanish"], 
    ["arrests","Arrests-spanish"], 
    ["probation","Probation-spanish"], 
    ["parole","Parole-spanish"]
  ]
}

var MEASURES_DROPDOWN = {
  english: [
    ["prison","Prison population"], 
    ["prison_pop","Prison population by offense"], 
    ["arrests","Arrests"], 
    ["probation","Probation opulation"], 
    ["parole","Parole population"]
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
  english:  ["<p><strong>No one knows exactly how many Latinos are in prison, on probation or parole, or being arrested. </strong> \
  While 40 states report race (e.g. white, black, other) in their arrest records, only # states report ethnicity. Although ethnicity encompasses populations other than Latinos, in a country that will be <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">24% Latino by 2065 </a>, Latinos are the group mostly likely to be missed when states ignore ethnicity. Oonly 15 states include a category for Latinos in reported criminal justice data and just 12 states report these data regularly. </p>\
  Criminal justice system data are used to inform  <a href=\"http:\/\/www.urban.org\/research-area\/courts-and-sentencing\" target=\"_blank\">sentencing policies</a>,\
   <a href=\"http:\/\/www.urban.org\/urban-wire\/prison\-programming-works-so-why-do-we-have-so-little\" target=\"_blank\">prison and jail programming,</a> and <a href=\"http:\/\/apps.urban.org\/features\/safer-return\/\" target=\"_blank\">reentry services</a>. There is considerable <a href=\"http:\/\/www.urban.org\/sites\/default\/files\/alfresco\/publication-pdfs\/413174-Examining-Racial-and-Ethnic-Disparities-in-Probation-Revocation.PDF\" target=\"_blank\">evidence</a>\
   that our current criminal justice system has a <a href=\"http:\/\/www.sentencingproject.org\/wp-content\/uploads\/2016\/06\/The-Color-of-Justice-Racial-and-Ethnic-Disparity-in-State-Prisons.pdf\"target=\"_blank\">disproportionate impact</a> on communities of color, producing high incarcerating people of \
   color at highon rates with questionable positive effects on public safety. But wWithout accurate data on who is imprisoned or supervised by the system, appropriate policy interventions unique to Latino populations cannot be devised.\
   Without an accurate picture of who is in our justice systems, we cannot make \
   policy that is appropriate for each state’s population. Community members and advocates cannot know how much of a problem mass incarceration is for Latinos, and ethnic disparities cannot be accurately tracked.</p>  <p>A state’s failure \
   to report ethnicity in addition to race can even mask racial disparities in the criminal justice system. A state that only counts people as \“black\” or \“white\”\
   would likely label most of their Latino prison population as \"white\”</a>, artificially inflating the number of “white” people in prison and making white/black disparities appear less extreme than they actually are. The lack of comprehensive ethnicity data doesn’t just affect Latinos; it affects the entire criminal justice system. \
</p>"],
  spanish: ["Spanish header text"]

}

var FIRSTSECTION ={
  english:["<h1>Few states included Latinos in most criminal justice data</h1> <p>WWe tracked all the race and ethnicity information we could find through publically and readily accessible online sources for each state and D.C. across five categories: prison population; prison population by offense; arrest; probation population; and parole population. \
  </p> <p>Only one state—Alaska—consistently included data on Latinos in regularly and recently released reports on prison, arrest, probation, and parole populations. Although it is possible that more states collect these data routinely, we only considered those that make it publicly accessible. 75 percent of states regularly and recently reported data\
   by ethnicity on at least one of the five measures we tracked, but only 39 percent did so for two or more measures. This means that while most states reported some ethnicity data routinely, they do not make a habit of reporting ethnicity on multiple measures.\
</p><p>That a given state might collect ethnicity data for arrests but not probation reflects the fact that these data are collected by a variety of state agencies, which may not be well coordinated. To ensure that Latinos are counted across the criminal justice system, states will have to make sure all the relevant agencies – from law enforcement,\
 to the department of corrections, to the parole board – are collecting the same data. These systems are connected and policy decisions in one affect another. If states are not collecting accurate and complete data across the criminal justice system, it is impossible to design public policy that responds to the particular needs of all populations and meets public safety concerns.\
</p>"],
  spanish:["<h1>FIRST SECTION SPANISH HEADER</h1><p>first section- spanish text</p>"]
}

var SECONDSECTION = {
  english: ["<p>We also looked at the quality of states’ ethnicity data. There is disagreement on the best way to collect data on race and ethnicity, or whether those should be <a href=\"http:\/\/www.usccr.gov\/pubs\/RC2010Web_Version.pdf\" target=\"_blank\">separate categories</a>. In fact, <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">many Latinos</a> think of their race as \“Hispanic\” or \“Latin American\”, as opposed to self-identifying their race as “white” or “black” and their ethnicity as “Latino” or “Hispanic.” For this project, we followed the current federal policy and censusas opposed to self-identifying their race as \“White\” or \“Black\” and their ethnicity as \“Latino\” or \“Hispanic.\” \
  For this project, though, we followed the current federal policy and census <a href=\"https:\/\/www.census.gov\/quickfacts\/meta\/long_RHI425215.htm\" target=\"_blank\">definitions</a> of race and ethnicity when assessing states’ demographic data quality. \
  The agencies with the most thorough collection and reporting of race and ethnicity data collected race and ethnicity separately, but reported them as combined categories, such as non-Hispanic white or Hispanic black. Some agencies asked about race and ethnicity separately but did not combine them in reporting. With these data, we can determine how many people are reported as Hispanic separately from how many are\
  black or white, but not whether Hispanic people are black or white. Other states combined everything into one category, so a person could be counted as Hispanic or white, but not both. Still others don’t include a category for Latinos in their publically available data, or didn’t publish accessible race and ethnicity data at all. \
</p><p>States include Latinos in their prison population data far more than other data categories we tracked. Thirty-eight states report data on Latinos in prison, while only 20 report data on Latinos among the parole population, 18 report data on Latinos among the probation population, 15 report data on Latinos who are arrested, and just 1 reports data on Latinos in prison by offense. \
</p><p> Hardly any states report data on Latinos in combined categories (e.g. Hispanic white, non-Hispanic black). Only three states—North Carolina, New Hampshire, and Vermont—track both race and ethnicity, and then report them in combination in any category (prison population in North Carolina, arrests in New Hampshire and Vermont).</p>"],
  spanish: ["second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text"]
}

var SECOND_HEADER = {
  english: ["How do states include Latinos in data on:"],
  spanish: ["Spanish header 2"]
}

var THIRDSECTION = {
  english:["<h1>The states with large Latino populations don’t necessarily have better data</h1> \
      <p>Seventy-five percent of Latinos in the United States live in just ten states. Many of these states have significant gaps in ethnicity data reporting, despite having large numbers of Latino residents. Florida, New Mexico, and California, for example, all report ethnicity data in fewer categories than the average state. \
      </p> <p>Data reporting in these states is especially important, as states with a larger numbers of Latinos residents are likely to have a larger numbers of Latinos in the criminal justice system. The impact affects of criminal justice policies on Latinos can go unseen by the public and policymakers in those states where agencies are not reporting data on ethnicity. </p>"],
  spanish: ["<h1>Third section header-spanish</h1> \
      <p>spanish text\
      </p>"]
}

var CONCLUSION ={
  english: ["<h1 class=\"last-header\">Establishing a higher standard for data</h1>\
    <p>Data matter because they impact policy. We’ve seen this across the United States, where increased tracking of police killings of citizens, fueled in part by the 2014 shooting of Michael Brown in Ferguson, MO, have in part led to significant data tracking of police shootings and a \
    national conversation around community-police relations. Having numbers to illustrate issues can change conversation, policy and practice.</p>\
    <p>Leaving justice-system involved Latinos out of data leaves them out of policy as well. Right now, there is inconsistent and incomplete reporting. 34 states do not report data from three or more sections of the justice system on Latinos at all, while 11 states report useful data in \
    some years and not others. Reporting varies in quality as well – some states count \“Latino\” as a unique racial category, which doesn’t allow for the possibility of someone being both \“Black\” and \“Latino.\” Without these critical data, we have no real information about how many Latinos \
    are impact by the criminal justice system.</p>\
    <p>In an ideal world, every state would collect and regularly report data on Latinos at every point in the criminal justice system. It is possible that states would like to report these data, but are not able to easily capture ethnicity. For instance, in one of these states, a Minority \
    Overrepresentation Committee recommended separating race and ethnicity in data collection on arrests, but then realized it was too difficult to do.  For now, the state continues to report arrest data by race and ethnicity as a combined category: individuals are listed as White, African American, \
    Hispanic or one of a few other categories.</p>\
    <p>However, as United States demographics become increasingly racially and ethnically diverse, it is critical that all people are considered when policy is developed. This helps ensure just treatment within the criminal justice system, and is inclusive of all populations. As has happened since data \
    on police shootings and educational inequities was highlighted, an increase in information on Latinos in the criminal justice system could lead to increased awareness and policy change. But before data can be reported, it must be collected. Here, we note some important components of high-quality, \
    representative data:\
      <ul>"],
  spanish:["<h1 class=\"last-header\">Conclusion header- spanish</h1> <p>Conclusion- spanish text</p>"]
}

//DATA VIZ

var TOGGLE_TEXT = {
  english: ["Show only regularly and recently reported data?"],
  spanish: ["Show only regularly and recently reported data?- spanish"]
}

var FIRSTGRAPHIC_XLABEL = {
  english: ["Number of criminal justice data categories that include Latinos"],
  spanish: ["Number of criminal justice data categories that include Latinos- spanish"]
}

var FIRSTGRAPHIC_TOOLTIPHEADER = {
  english: [
  ["header1","state"],
  ["header2","data on latinos has been reported for"]
  ],
  spanish:[
  ["header1","state-spanish"],
  ["header2","data on latinos has been reported for-spanish"]
  ]
}


//FOOTER

var FOOTER_TEXT = {
  english: ["<h2>About the data</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"],
  spanish: ["<h2>About the data- spanish</h2><p>Footer text-spanish</p>"]
}

var PROJECT_CREDITS = {
  english: ["<h2>Project credits</h2><div class=\"urbanstatement\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>\
                    <h3 class=\"job\">Research</h3>\
                    Sarah Eppler-Epstein and Annie Gurvis\
                    <h3 class=\"job\">Design and Development</h3>\
                    Vivian Hou and John Wehmann\
                    <h3 class=\"job\">Photography</h3>  \<a href=\"http:\/\/www.urban.org\/author\/matthew-johnson\">Lydia Thompson</a>\
                    <h3 class=\"job\">Editorial</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/???\">???</a>\
                    <div class=\"credits\">Copyright &copy; <a href=\"http:\/\/www.urban.org/\">Urban Institute</a> 2016. <a href=\"https:\/\/github.com\/UrbanInstitute\/race_ethnicity\" target=\"_blank\">View this project on Github.</a></div>"],
  spanish: ["<h2>Project credits-spanish</h2><div class=\"urbanstatement\">Spanish text </div>\
                    <h3 class=\"job\">Research- spanish</h3>\
                    Sarah Eppler-Epstein and Annie Gurvis\
                    <h3 class=\"job\">Design and Development- spanish</h3>\
                    Vivian Hou and John Wehmann\
                    <h3 class=\"job\">Photography- spanish</h3>  \
                    <a href=\"http:\/\/www.urban.org\/author\/matthew-johnson\">Lydia Thompson</a>\
                    <h3 class=\"job\">Editorial- spanish</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/???\">???</a>\
                    <div class=\"credits\">Copyright &copy; <a href=\"http:\/\/www.urban.org/\">Urban Institute</a> 2016. <a href=\"https:\/\/github.com\/UrbanInstitute\/race_ethnicity\" target=\"_blank\">View this project on Github-spanish.</a></div>"]
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


//WHEN PAGE LOADS, USE ENGLISH TEXT
$(window).load(function() { 
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])
  $('#first-section-text').html(FIRSTSECTION[GLOBAL_LANGUAGE])
  $('#heroimage').find('h1').html(TITLE[GLOBAL_LANGUAGE])
  $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])
  if ((IS_MOBILE) || (IS_PHONE)) {
    $('.mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  } else {
    $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
    console.log(GLOBAL_LANGUAGE)
  }
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#third-section-text').html(THIRDSECTION[GLOBAL_LANGUAGE])
  $('#conclusion-text').html(CONCLUSION[GLOBAL_LANGUAGE])
  $('#left').html(FOOTER_TEXT[GLOBAL_LANGUAGE])
  $('#right').html(PROJECT_CREDITS[GLOBAL_LANGUAGE])




})


//WHEN CLICKING ON A LANGUAGE OPTION
$(".language_option")
.on("click", function() {
    GLOBAL_LANGUAGE = d3.select(this).select("a").attr("id");
    console.log(GLOBAL_LANGUAGE)


  //MAIN TEXT CONTAINERS//
  $('#heroimage').find('h1').html(TITLE[GLOBAL_LANGUAGE])
  $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])
  $('#first-section-text').html(FIRSTSECTION[GLOBAL_LANGUAGE])
  if ((IS_MOBILE) || (IS_PHONE)) {
    $('.mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  } else {
    $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
    console.log(GLOBAL_LANGUAGE)
  }
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#third-section-text').html(THIRDSECTION[GLOBAL_LANGUAGE])
  $('#conclusion-text').html(CONCLUSION[GLOBAL_LANGUAGE])
  $('#left').html(FOOTER_TEXT[GLOBAL_LANGUAGE])
  $('#right').html(PROJECT_CREDITS[GLOBAL_LANGUAGE])


  //ALL DATA VIZ TEXT
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])

  //FIRST DATA VIZ TEXT
  $('.xlabel').html(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
  var tooltip_header = $('.tooltip-header')
  for (var i=0; i<tooltip_header.length; i++) {
      tooltip_header.eq(i).data(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1]), tooltip_header.eq(i).text();
      tooltip_header.eq(i).text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1])
      console.log(GLOBAL_LANGUAGE)
      console.log(tooltip_header.text())

  }
  var tooltip_text = $('.tooltip-text')
  console.log(tooltip)
   for (var i=0; i<tooltip_text.length; i++) {
      tooltip_text.eq(i).data(MEASURES_TOOLTIP[GLOBAL_LANGUAGE][i][1]), tooltip_text.eq(i).text();
      tooltip_text.eq(i).text(MEASURES_TOOLTIP[GLOBAL_LANGUAGE][i][1])

  }
  //SECOND DATA VIZ    ******DROPDOWN TEXT NOT WORKING EVERYTIME
  var measures = $('.measure_type')
  d3.select(this).classed("active", true)
  for (var i=0; i<measures.length; i++){

    if (measures.eq(i).text() == (MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])) {
      console.log('1')
    } else {
      measures.eq(i).html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
      console.log(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
    }
  } 
  var legend_text = $('.legend-text')
    //for (var i=0; i<legend_text.length; i++){
    //     console.log(DATA_QUALITY_LABELS2[GLOBAL_LANGUAGE][i][1]) //**********WHY IS THIS PRODUCING AN ERROR?
    // if (legend_text.eq(i).text() == (DATA_QUALITY_LABELS2[GLOBAL_LANGUAGE][i][1])) {
    //    console.log(legend_text.eq(i).text())
    // } else {
    //   legend_text.eq(i).html(DATA_QUALITY_LABELS2[GLOBAL_LANGUAGE][i][1])



    // }
  //} 

  //THIRD DATA VIZ

  var grid_legend_text = $('.grid-legend-text')
  for (var i=0; i<grid_legend_text.length; i++){
    if (grid_legend_text.eq(i).text() == (DATA_QUALITY_LABELS2[GLOBAL_LANGUAGE][i][1])) {
      console.log(grid_legend_text.eq(i).text())
    } else {
      grid_legend_text.eq(i).html(DATA_QUALITY_LABELS2[GLOBAL_LANGUAGE][i][1])

    }
  }



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



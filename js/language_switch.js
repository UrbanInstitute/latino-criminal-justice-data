var GLOBAL_LANGUAGE = "english";
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

var FIRSTSECTION ={
  english:["<h1>The Number of Categories with Data on Latinos <strong>by State</strong></h1> <p>We tracked all the race and ethnicity information we could find online for each state and D.C., across five categories: prison population; prison \
  population by offense; arrest; probation population; and parole population. We only found one state that regularly reported data on Latinos in all five categories. While 75 percent of states regularly report data on any of the five measures we tracked, \
  nearly half of states (24) have no ethnicity data or only report ethnicity in one category.</p> <p>Most states collect and report data on Latinos for some, but not all, of the categories we measured. States’ lack of consistency across the criminal justice \
  system illustrates the fact that these data are collected by a variety of state agencies, which may not be well-coordinated. To ensure that Latinos are counted across the criminal justice system, states will have to make sure all of the relevant agencies \
  – from law enforcement, to the department of corrections, to the parole board – are collecting the same data.  These systems are connected and policy decisions in one affect another; so, if states are not collecting accurate and complete data, it is \
  impossible to design effective and responsive public policy.</p>"],
  spanish:["<h1>FIRST SECTION SPANISH HEADER</h1><p>first section- spanish text</p>"]
}

var SECONDSECTION = {
  english: ["<p>In addition to whether or not a state publishes data on Latinos, we also looked at the quality of state-published race and ethnicity categories. There is not universal agreement on the best way to collect data on \“race\” and \“ethnicity,\” \
  or whether those should even be <a href=\"http:\/\/www.usccr.gov\/pubs\/RC2010Web_Version.pdf\" target=\"_blank\">separate categories</a>. In fact, <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">many Latinos</a> think of their race as \“Hispanic\” or \“Latin American,\” as opposed to self-identifying their race as \“White\” or \“Black\” and their ethnicity as \“Latino\” or \“Hispanic.\” For this project, though, we followed the current federal policy \
  and census <a href=\"https:\/\/www.census.gov\/quickfacts\/meta\/long_RHI425215.htm\" target=\"_blank\">definitions</a> of race and ethnicity when rating states’ demographic data quality.<ul> </p><p>Although Alaska reports data on Latinos in all five categories we examined, none \
  of the data are at the highest standard. Alaska combines race and ethnicity in this way, precluding Latino people from being counted in more than one racial or ethnic group. </p><p>States report data on Latinos in their prison population far more than in the other categories we tracked \
  – 38 states report data on Latinos in prison, while 20 report ethnicity of parole population, 18 report ethnicity of probation population, 15 report ethnicity of arrested individuals and just 1 reports on ethnicity of prison population by offense. Even for prison and data, though, \
  hardly any states report at our highest standard. North Carolina reports data at our highest standard, tracking both race and ethnicity, and then reporting them in combination (e.g. Hispanic white, non-Hispanic black) for prison population. Only New Hampshire and Vermont match this \
  highest standard, both for their reported data on arrests.</p>"],
  spanish: ["second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text"]
}

var SECOND_HEADER = {
  english: ["How Well Do States Report Data On Latinos In"],
  spanish: ["Spanish header 2"]
}

var THIRDSECTION = {
  english:["<h1>Top 10 States with Highest Hispanic Population</h1> \
      <p>75 percent of the total U.S. Hispanic population lives in the ten states with the largest Latino populations. While we might expect the states with the largest Latino populations to be better at reporting ethnicity in their criminal justice data, many of them have significant gaps \
      in data reporting. Florida, New Mexico and California all report less ethnicity data than the average state. Data reporting in these states is especially important, as states with larger numbers of Latinos in the general population are statistically likely to have larger numbers of Latinos \
      in the criminal justice system. Latinos in the justice system in states that do not report data may have unique needs that are not being considered in policy development, because states do not know how many Latinos their policies may impact. We see this pattern repeat across policy issues; \
      as <a href=\"http:\/\/www.nytimes.com\/2015\/09\/23\/business\/economy\/education-gap-between-rich-and-poor-is-growing-wider.html\" target=\"_blank\">inequities in educational outcomes by race</a> were revealed, <a href=\"http:\/\/www.ncsl.org\/research\/human-services\/child-care-and-early-education-legislation-databas.aspx\" \
      target=\"_blank\">more bills focused on early childhood and kindergarten each year</a> from 2009-2013, with the goal of supporting students who were less likely to come into school highly prepared.\
      </p>"],
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
  english: ["Regularly and Recently Reported Data"],
  spanish: ["Reguarly and Recently Reported Data- spanish"]
}

var FIRSTGRAPHIC_XLABEL = {
  english: ["Number of Categories with Data Reported"],
  spanish: ["Number of Categories with Data Reported- spanish"]
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
  //SECOND DATA VIZ DROPDOWN TEXT NOT WORKING
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
  var legend_text = $('.legend_text')
  console.log(legend_text.find('tspan').text())
  for (var i=0; i<legend_text; i++){

    if (legend_text.eq(i).text() == (DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])) {
      console.log('1')
    } else {
      legend_text.eq(i).html(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])
      console.log(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])
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



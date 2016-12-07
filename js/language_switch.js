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

var LANGUAGE_OPTIONS_HEADER= {
  english: [ "LANGUAGE OPTIONS"],
  spanish: ["LANGUAGE OPTIONS-spanish"]
}

var LANGUAGE_ENGLISH= {
  english: [ "English"],
  spanish: ["English (spanish)"]
}

var LANGUAGE_SPANISH= {
  english: [ "Spanish"],
  spanish: ["Spanish (spanish)"]
}




var DATA_QUALITY_LABELS= {
  english: [
    ['no_data', 'No race/ethnicity data'],
    ['data_no_cat', 'Race data only, no Latino/Hispanic category'],
    ['combined', 'Latino/Hispanic included as a race'],
    ['separate',  'Latino/Hispanic ethnicity reported in addition to race'],
    ['cross_tabbed', 'Race broken into subgroups by ethnicity']
  ],
  spanish: [
    ['no_data', 'No race/ethnicity data-SPANISH'],
    ['data_no_cat', 'Race data only, no Latino/Hispanic category-SPANISH'],
    ['combined', 'Latino/Hispanic included as a race-SPANISH'],
    ['separate',  'Latino/Hispanic ethnicity reported in addition to race-SPANISH'],
    ['cross_tabbed', 'Race broken into subgroups by ethnicity-SPANISH']
  ]
}

var MEASURES_GRID= {
  english: [
    ["number_prison","Prison"], 
    ["number_prison_ct","By offense"], 
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
  english: ["The Alarming Lack of Data on Latinos in the Criminal Justice"],
  spanish: ["Spanish title"]
}

var HEADERTEXT = {
  english:  ["<p class=\"full-width-col\"><strong>No one knows exactly how many Latinos are arrested each year or how many are in prison, on probation, or on parole. </strong> \
  Forty states reported race (e.g., “white,” “black,” “other”) in their arrest records, but only 15 states reported ethnicity. Although Latinos are just one of many ethnic groups in the United States, the population is projected to be <a href=\"http:\/\/www.census.gov/content\/dam\/Census\/library\/publications\/2015\/demo\25-1143.pdf\" \
   target=\"_blank\">28.6% Latino by 2060</a>, and Latinos are the group most affected when states ignore ethnicity. </p>\
   Considerable <a href=\"http:\/\/www.urban.org\/sites\/default\/files\/alfresco\/publication-pdfs\/413174-Examining-Racial-and-Ethnic-Disparities-in-Probation-Revocation.PDF\" target=\"_blank\">evidence</a> shows that our criminal justice system has \
   <a href=\"http:\/\/www.sentencingproject.org\/issues\/racial-disparity\/\"target=\"_blank\">significant disproportionate rates</a>. But without comprehensive data, policymakers, community members, and advocates cannot know how mass incarceration affects Latinos specifically, and ethnic disparities cannot be accurately tracked. </p>\
   <p>A state’s failure to collect and report ethnicity data affects not only Latinos but the entire criminal justice system. States that only count people as “black” or “white” <a href=\"http:\/\/www.sentencingproject.org\/wp-content\/uploads\/2016\/06\/The-Color-of-Justice-Racial-and-Ethnic-Disparity-in-State-Prisons.pdf\"target=\"_blank\"> likely label most of their Latino prison population \"white\"</a>,\
   artificially inflating the number of “white” people in prison and masking the white/black disparity in the criminal justice system.</p>"],
  spanish: ["Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text\
  Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text\
  Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text-Spanish header text- Spanish header text- Spanish header text- Spanish header text- Spanish header text"]

}

var FIRSTSECTION ={
  english:["<h1>Few states include Latinos in most criminal justice data</h1> <p>We tracked all race and ethnicity information we could find through publicly and readily accessible online sources for each state and Washington, DC, across five categories: prison population, prison population by offense, arrests, probation population, and parole population. \
  </p> <p> Only one state—Alaska—consistently included data on Latinos in regularly and recently released reports on arrests and prison, probation, and parole populations. Although it is possible that more states collected these data routinely, we only considered data that states made publicly accessible. Seventy-five percent of states regularly and recently reported data by ethnicity on at least one of our five measures, \
  but only 39 percent did so for two or more measures.\
  </p> <p>States collect criminal justice data through several agencies, and these agencies may not coordinate their efforts. To ensure that Latinos are accurately counted across the criminal justice system, states must make sure all relevant agencies—including law enforcement, the department of corrections, and the parole board—collect the same ethnicity data. \
  If states do not collect accurate and complete data across all agencies, it is impossible to assess how the system affects Latinos.</p>"],
  spanish:["<h1>FIRST SECTION SPANISH HEADER</h1><p>first section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text</p>"]
}

var SECONDSECTION = {
  english: ["<p>We also looked at the <em>quality</em> of states’ ethnicity data. There is disagreement within the field on how to collect data on race and ethnicity and whether those should be <a href=\"http:\/\/www.usccr.gov\/pubs\/RC2010Web_Version.pdf\" target=\"_blank\">separate categories</a>. <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">Many Latinos</a> consider their race as \“Hispanic\” or \“Latin American\”, as opposed to identifying racially as white or black and ethnically as Latino or Hispanic. When assessing demographic data quality, we followed current federal policy and Census Bureau definitions of \
  <a href=\"https:\/\/www.census.gov\/quickfacts\/meta\/long_RHI425215.htm\" target=\"_blank\">race</a> and <a href=\"http:\/\/www.census.gov\/topics\/population\/hispanic-origin\/about.html\">ethnicity</a>, which allow Latinos to identify both as Hispanic and as a particular race.</p>\
  <p>State agencies that collected and reported the most thorough race and ethnicity data followed Census guidelines: they collected race and ethnicity data separately but reported them as combined categories, such as “non-Hispanic white” or “Hispanic black.” Some agencies asked about race and ethnicity separately but did not combine them in reporting. With these data, we can determine how many people are reported \
  as “Hispanic” separately from how many are reported as “black” or “white” but not whether “Hispanic” people are also “black” or “white.” Other agencies combined race and ethnicity into one category: a person can be counted as “Hispanic” or “white” but not both. Still others did not include a category for Latinos in their publicly available data or did not publish accessible race and ethnicity data at all. </p>\
  <p>States included Latinos in their prison population data far more than in the other data categories we tracked. Thirty-eight states reported data on Latinos in prison compared with only 20 that reported data on Latinos in the parole population, 18 that reported data on Latinos in the probation population, 15 that reported data on Latinos in arrest records, and just 1 that reported data on Latinos in prison by offense.</p>\
  <p>Hardly any states reported data on Latinos in combined categories (e.g., “Hispanic white,” “non-Hispanic black”). Only three—North Carolina, New Hampshire, and Vermont—tracked both race and ethnicity and reported them in combination in any data category (prison population in North Carolina and arrests in New Hampshire and Vermont).</p>"],
  spanish: ["second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text\
  second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text second section- spanish text"]
}

var SECONDSECTION_DROPDOWN_SIDE = {
  english: ["Data on:"],
  spanish: ["Data on-spanish: "]

}

var SECOND_HEADER = {
  english: ["The quality of ethnicity data varies across states and agencies"],
  spanish: ["Spanish header 2"]
}

var THIRDSECTION = {
  english:["<h1>States with large Latino populations do not necessarily have better data</h1> \
      <p>Seventy-five percent of Latinos in the United States live in just 10 states. Many of these states have significant gaps in reported ethnicity data despite their large Latino populations. California, Florida, and New Mexico, for example, all reported ethnicity data in fewer categories than the average state. \
      </p> <p>Data reporting in these states is especially important because states with more Latino residents are likely to have more Latinos in their criminal justice systems. The effects of criminal justice policies on Latinos can go unseen by the public and policymakers in states where agencies do not report ethnicity data. </p>"],
  spanish: ["<h1>Third section header-spanish</h1> \
      <p>spanish text\
      </p>"]
}

var CONCLUSION ={
  english: ["<h1 class=\"last-header\">Establishing a higher standard for data</h1>\
    <p>Data matter because they impact policy. We’ve seen this across the United States, where increased <a href=\"http:\/\/www.washingtonpost.com\/sf\/investigative\/2015\/12\/26\/a-year-of-reckoning-police-fatally-shoot-nearly-1000\" target=\"_blank\">tracking of police shootings</a>,\
    fueled in part by the <a href\"http://www.nytimes.com/interactive/2014/08/13/us/ferguson-missouri-town-under-siege-after-police-shooting.html\" target=\"_blank\">2014 shooting of Michael Brown in Ferguson, MO</a>, sparked a national conversation around <a href=\"http://www.iacp.org/CommunityPoliceRelations\" target=\"_blank\">community-police relations</a>.\
    Having numbers to illustrate issues can change conversation, policy, and practice. Leaving justice-system involved Latinos out of data leaves them out of policy.</p>\
    <p>Right now, there is inconsistent and incomplete data collection and reporting. Our recommendations to improve the quality—and utility—of race and ethnicity data in the criminal justice system include:\
    <ul class=\"inside\"><li>States should, at the very least, meet the current U.S. Census standards by collecting data separately by race and ethnicity, and then combining it. This results in more descriptive and accurate sub-categories, such as \“non-Hispanic white\” and \“Hispanic black.\”</li>\
    <li>Data should be collected and publicly reported frequently, on a biannual basis at least. This provides information on demographic changes, which is especially important for Latinos, one of the nation’s fastest growing demographic groups.</li>\
    <li>Race and ethnicity data should be self-reported, not determined by state employees. This is important because it allows people to self-identify and not be boxed into identities they do not claim as their own. Self-reporting is also consistent with the data collection standards used for the U.S. Census.</li>\
    </ul>\
    </p>If states follow the federal government’s <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2016\/10\/04\/federal-officials-may-revamp-how-americans-identify-race-ethnicity-on-census-and-other-forms/\">proposed 2020 Census changes by combining race and ethnicity in one question</a>, \
    people in the justice system must be allowed to check off more than one box. In addition, while states should, at a minimum, include a category for \“Hispanic\” or \“Latino\” people, Latinos are not a monolith. \
    <a href=\"http:\/\/www.pewsocialtrends.org\/2015\/06\/11\/chapter-7-the-many-dimensions-of-hispanic-racial-identity\" target=\"_blank\">Many Latinos identify</a> as “mixed race,” “indigenous,” and “Afro-Latino.” Hispanic or Latino ethnicities can be split out further \
    <a href=\"http:\/\/www.pewhispanic.org/2012\/04/04\/when-labels-dont-fit-hispanics-and-their-views-of-identity/\" target=\"_blank\">country of origin</a> (e.g. \“Mexican\” or \“Cuban\”).</p>\
    <p>It is possible that states would like to include a category for Latinos in their data, but are not able to easily capture ethnicity due to funding issues, time limits or other constraints. Still, it is critical that states work toward such solutions. As the United States becomes more racially and ethnically diverse, it is increasingly important that all people are counted and considered when policy is developed.</p>"],
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

var FIRSTGRAPHIC_SELECTSTATE = {
  english:["Select a State"],
  spanish: ["Select a State-spanish"]
}



//FOOTER

var FOOTER_TEXT = {
  english: ["<h2>About the data</h2><p>The data used in this feature are from a range of publicly available state-level sources, across 50 states and Washington, D.C. In addition to conducting a scan of state-level agency websites, we reviewed Google search results for each data category for each state, using search terms that focused on annual reporting, statistics, race and ethnicity.</p>\
  <p>We created a database of the most recent and complete data available for each data category within the criminal justice system, for each state and DC. Data collection occurred between June and September 2016; all sources used in this feature were available as of September 2016.  The data found using our search protocol may not reflect all data collected or reported by each state, agency or department.</p>\
  <p>States are classified as including Latinos in their data reporting when they have categories including the terms ‘Hispanic,’ ‘Latino,’ or other similar terms, reported as part of racial or ethnic demographics. Latinos may be reported as a distinct ethnic or racial group, or combined with a racial group (e.g., Hispanic Black, Non-Hispanic White). While ‘Hispanic’ and ‘Latino’ have different meanings, in this feature we use the term ‘Latino’ when referring to people, communities, or populations. We use the term ‘Hispanic’ when referring to data, because that is the term most states use when reporting data</p>\
  <p>We define regularly and recently reported data as data that has been publicly reported at least twice, at least every other year, and at least as recently as 2014.</p>\
  <p>Please contact xxxxx@urban.org with any quesitons about this project or associated data.</p>"],
  spanish: ["<h2>About the data- spanish</h2><p>Footer text-spanish</p>"]
}

var PROJECT_CREDITS = {
  english: ["<h2>Project credits</h2><div class=\"urbanstatement\">As an organization, the Urban Institute does not take positions on issues, but it does empower and support its experts in sharing their own evidence-based views and policy recommendations that have been shaped by scholarship.</div>\
                    <h3 class=\"job\">Research</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/ryan-king\">Ryan King</a>, <a href=\"http:\/\/www.urban.org\/author\/sarah-eppler-epstein\">Sarah Epstein</a> and <a href=\"http:\/\/www.urban.org\/author\/annie-gurvis\">Annie Gurvis</a>\
                    <h3 class=\"job\">Design and Development</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/john-wehmann\">John Wehmann</a> and <a href=\"http:\/\/www.urban.org\/author\/vivian-hou\">Vivian Hou</a>\
                    <h3 class=\"job\">Photography</h3>  \
                    <a href=\"http:\/\/www.urban.org\/author\/lydia-thompson\">Lydia Thompson</a>\
                    <h3 class=\"job\">Editorial</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/alexandra-tilsley\">Alex Tilsley</a> and <a href=\"http:\/\/www.urban.org\/author\/daniel-matos\">Daniel Matos</a> \
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
  $('#language_option_header').html(LANGUAGE_OPTIONS_HEADER[GLOBAL_LANGUAGE])
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])
  $('#first-section-text').html(FIRSTSECTION[GLOBAL_LANGUAGE])
  $('#heroimage').find('h1').html(TITLE[GLOBAL_LANGUAGE])
  $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])
  $ ('#english').html(LANGUAGE_ENGLISH[GLOBAL_LANGUAGE])
  $('#spanish').html(LANGUAGE_SPANISH[GLOBAL_LANGUAGE])
  if (IS_PHONE) {
    $('.mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  } else {
    $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
    console.log(GLOBAL_LANGUAGE)
  }
  $('.ui-selectmenu-text').html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][0][1])
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#dropdown-side-label').html(SECONDSECTION_DROPDOWN_SIDE[GLOBAL_LANGUAGE])
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
  $('#language_option_header').html(LANGUAGE_OPTIONS_HEADER[GLOBAL_LANGUAGE])
  $ ('#english').html(LANGUAGE_ENGLISH[GLOBAL_LANGUAGE])
  $('#spanish').html(LANGUAGE_SPANISH[GLOBAL_LANGUAGE])
  $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])
  $('#first-section-text').html(FIRSTSECTION[GLOBAL_LANGUAGE])
  for (var i=0; i<MEASURES_DROPDOWN[GLOBAL_LANGUAGE].length; i++) {
    $('.tooltip-text').html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
  }
  $('.ui-selectmenu-text').html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][0][1])
  $('.xlabel').html(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])

  if (IS_PHONE) {
    $('.mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  } else {
    $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
    console.log(GLOBAL_LANGUAGE)
  }
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#dropdown-side-label').html(SECONDSECTION_DROPDOWN_SIDE[GLOBAL_LANGUAGE])
  $('#third-section-text').html(THIRDSECTION[GLOBAL_LANGUAGE])
  $('.grid-cat-labels').html(MEASURES_GRID[GLOBAL_LANGUAGE])
  $('#conclusion-text').html(CONCLUSION[GLOBAL_LANGUAGE])
  $('#left').html(FOOTER_TEXT[GLOBAL_LANGUAGE])
  $('#right').html(PROJECT_CREDITS[GLOBAL_LANGUAGE])


  //ALL DATA VIZ TEXT
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])

  //FIRST DATA VIZ TEXT
  console.log(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
  $('.xlabel').html(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
  $('.tooltip-text-state').html(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE])
  var tooltip_header = $('.tooltip-header')
  for (var i=0; i<tooltip_header.length; i++) {
      tooltip_header.eq(i).data(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1]), tooltip_header.eq(i).text();
      tooltip_header.eq(i).text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1])
      console.log(GLOBAL_LANGUAGE)
      console.log(tooltip_header.text())

  }

  for (var i=0; i<MEASURES_DROPDOWN[GLOBAL_LANGUAGE].length; i++) {
    $('.tooltip-text').html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
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

  var grid_legend_text = ((IS_MOBILE) || (IS_PHONE))? $('.grid-legend-text-mobile') : $('.grid-legend-text')
  for (var i=0; i<grid_legend_text.length; i++){
    if (grid_legend_text.eq(i).text() == (DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])) {
    } else {
      grid_legend_text.eq(i).html(DATA_QUALITY_LABELS[GLOBAL_LANGUAGE][i][1])

    }
  }
  d3.selectAll(grid_legend_text).call(wrapText,80)





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



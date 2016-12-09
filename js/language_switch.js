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



var GLOBAL_LANGUAGE = getParameterByName("language", window.location.href)
if (GLOBAL_LANGUAGE != "spanish" && GLOBAL_LANGUAGE != "english") {
  GLOBAL_LANGUAGE = "english";
}
 // $("#" + GLOBAL_LANGUAGE).on("click", function() {
 //      if (history.pushState) {
 //        console.log(GLOBAL_LANGUAGE)
 //          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?language=' + [GLOBAL_LANGUAGE];
 //          window.history.pushState({path:newurl},'page 2',newurl);
 //      }
 //    })





var IS_PHONE = d3.select("#isPhone").style("display") == "block"
var IS_MOBILE = d3.select("#isMobile").style("display") == "block"

var LINKBACKTEXT = {
  english:{
    home: "Features",
    title: "The Alarming Lack of Data on Latinos in the Criminal Justice System"
  },
  spanish:{
    home: "Presenta",
    title: "La alarmante falta de información sobre latinos en el sistema de justicia penal"

  }
}
var METATEXT = {
  english: "No one knows exactly how many Latinos are arrested each year or how many are in prison, on probation, or on parole.",
  spanish: "fake text"
}

var BUTTON_NAMES= {
    english: {
    regular: "Regularly and Recently Reported Data",
    all: "All Data Reported"
    },
    spanish: {
    regular: "Información reportada recientemente y en forma regular.",
    all: "Toda la información reportada."
    }
}

var LANGUAGE_OPTIONS_HEADER= {
  english: [ "LANGUAGE OPTIONS"],
  spanish: ["OPCIONES DE IDIOMA"]
}

var LANGUAGE_ENGLISH= {
  english: [ "English"],
  spanish: ["English"]
}

var LANGUAGE_SPANISH= {
  english: [ "Español"],
  spanish: ["Español"]
}




var DATA_QUALITY_LABELS= {
  english: [
    ['no_data', 'No race or ethnicity data'],
    ['data_no_cat', 'Race data only, no Latino/Hispanic category'],
    ['combined', 'Latino/Hispanic included as a race'],
    ['separate',  'Latino/Hispanic ethnicity reported in addition to race'],
    ['cross_tabbed', 'Race broken into subgroups by ethnicity']
  ],
  spanish: [
    ['no_data', 'No hay información sobre raza u origen étnico.'],
    ['data_no_cat', 'Únicamente información sobre raza, no hay una categoría para latino/hispano.'],
    ['combined', 'Latino/hispano incluido como una raza.'],
    ['separate',  'El origen étnico latino/hispano se reporta además de raza.'],
    ['cross_tabbed', 'Raza dividida en subgrupos por origen étnico.']
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
    ["prison","Prisión"], 
    ["prison_pop","Por delito"], 
    ["arrests","Arrestos"], 
    ["probation","Libertad condicional"], 
    ["parole","Libertad bajo palabra"]
  ]
}

var MEASURES_DROPDOWN = {
  english: [
    ["prison","Prison population"], 
    ["prison_pop","Prison population by offense"], 
    ["arrests","Arrests"], 
    ["probation","Probation population"], 
    ["parole","Parole population"]
  ],
  spanish: [
    ["prison","Población penitenciaria"], 
    ["prison_pop","Población penitenciaria por delito"], 
    ["arrests","Arrestos"], 
    ["probation","Población en libertad condicional"], 
    ["parole","Población en libertad bajo palabra"]
  ]
}



var TITLE = {
  english: ["The Alarming Lack of Data on Latinos in the Criminal Justice System"],
  spanish: ["La alarmante falta de información sobre latinos en el sistema de justicia penal"]
}

var HEADERTEXT = {
  english:  ["<p><strong>No one knows exactly how many Latinos are arrested each year or how many are in prison, on probation, or on parole. </strong></p> \
  <p>A survey of state criminal justice data showed that 40 states reported race (e.g., &ldquo;white,&rdquo; &ldquo;black,&rdquo; &ldquo;other&rdquo;) in their arrest records, but only 15 states reported ethnicity. Although Latinos are just one of many ethnic groups in the United States, the population is projected to be <a href=\"http:\/\/www.census.gov\/content\/dam\/Census\/library\/publications\/2015\/demo\/p25-1143.pdf\" \
   target=\"_blank\">28.6 percent Latino by 2060</a>, and Latinos are the group most affected when states ignore ethnicity. </p>\
   <a href=\"http:\/\/www.urban.org\/sites\/default\/files\/alfresco\/publication-pdfs\/413174-Examining-Racial-and-Ethnic-Disparities-in-Probation-Revocation.PDF\" target=\"_blank\">Evidence</a> shows that our criminal justice system has \
   <a href=\"http:\/\/www.sentencingproject.org\/issues\/racial-disparity\/\"target=\"_blank\">significant racial disparities</a>. But without comprehensive data, policymakers, community members, and advocates cannot know how mass incarceration affects Latinos specifically and ethnic disparities cannot be accurately tracked. </p>\
   <p>A state’s failure to collect and report ethnicity data affects not only Latinos but the entire criminal justice system. States that only count people as &ldquo;black\" or &ldquo;white&rdquo; <a href=\"http:\/\/www.sentencingproject.org\/wp-content\/uploads\/2016\/06\/The-Color-of-Justice-Racial-and-Ethnic-Disparity-in-State-Prisons.pdf\"target=\"_blank\"> likely label most of their Latino prison population &ldquo;white,\&rdquo;</a>\
   artificially inflating the number of &ldquo;white&rdquo; people in prison and masking the white/black disparity in the criminal justice system.</p>"],
  spanish: ["<p><strong>Nadie sabe exactamente cuántos latinos son arrestados cada año o cuántos se encuentran en prisión, en libertad condicional o libertad bajo palabra. </strong></p> \
  <p>Una encuesta de información de justicia penal del estado indicó que 40 estados reportaban raza (\por ejemplo, &ldquo;blanca&rdquo;, &ldquo;negra&rdquo;, &ldquo;otra&rdquo;) en sus registros de arresto, pero solo 15 estados reportaban el origen étnico. Aunque los latinos son tan solo uno de los muchos grupos étnicos en los Estados Unidos, se proyecta que la población será latinoamericana en un <a href=\"http:\/\/www.census.gov\/content\/dam\/Census\/library\/publications\/2015\/demo\/p25-1143.pdf\" \
   target=\"_blank\">28,6 por ciento para el 2060</a> y que los latinos son el grupo más afectado cuando los estados ignoran el origen étnico. </p>\
   <a href=\"http:\/\/www.urban.org\/sites\/default\/files\/alfresco\/publication-pdfs\/413174-Examining-Racial-and-Ethnic-Disparities-in-Probation-Revocation.PDF\" target=\"_blank\">Evidencia</a> muestra que nuestro sistema de justicia penal tiene \
   <a href=\"http:\/\/www.sentencingproject.org\/issues\/racial-disparity\/\"target=\"_blank\">considerables discrepancias raciales</a>. Pero, sin información integral, los legisladores, los miembros de la comunidad y los defensores no pueden saber cómo es que los encarcelamientos en masa afectan específicamente a los latinos y no puede hacerse un seguimiento en forma precisa de las discrepancias de origen étnico. </p>\
   <p>El incumplimiento del estado de recoger y reportar información sobre el origen étnico no solo afecta a los latinos, sino a todo el sistema de justicia penal. Los estados solo cuentan a las personas como \"negra\" o \"blanca\", <a href=\"http:\/\/www.sentencingproject.org\/wp-content\/uploads\/2016\/06\/The-Color-of-Justice-Racial-and-Ethnic-Disparity-in-State-Prisons.pdf\"target=\"_blank\"> probablemente etiquetando a la mayor parte de su población penitenciaria latinoamericana como \"blanca\"</a>\
   , inflando artificialmente la cantidad de personas \&rdquo;blancas\" en prisión y enmascarando la discrepancia blanca/negra en el sistema de justicia penal.</p>"]

}

var FIRSTSECTION ={
  english:["<h1>Few states include Latinos in most criminal justice data</h1> <p>We tracked all race and ethnicity information we could find through publicly and readily accessible online sources for each state and Washington, DC, across five categories: prison population, prison population by offense, arrests, probation population, and parole population. \
  </p> <p> Only one state—Alaska—consistently included data on Latinos in regularly and recently released reports on arrests and prison, probation, and parole populations. Although it is possible that more states collected these data routinely, we only considered data that states made publicly accessible. Seventy-five percent of states regularly and recently reported data by ethnicity on at least one of our five measures, \
  but only 39 percent did so for two or more measures.\
  </p> <p>States collect criminal justice data through several agencies, and these agencies may not coordinate their efforts. To ensure that Latinos are accurately counted across the criminal justice system, states must make sure all relevant agencies—including law enforcement, the department of corrections, and the parole board—collect the same ethnicity data. \
  If states do not collect accurate and complete data across all agencies, it is impossible to assess how the system affects Latinos.</p>"],
  spanish:["<h1>Pocos estados incluyen a los latinos en la mayor parte de su información de justicia penal.</h1> <p>Hemos hecho seguimiento a toda la información sobre raza y origen étnico que pudimos encontrar a través de fuentes en línea de fácil acceso para cada estado y Washington, DC, en las cinco categorías: población penitenciaria, población penitenciaria por delito, arrestos, población en libertad condicional y población en libertad bajo palabra. \
  </p> <p> Solo un estado, Alaska, incluía información en forma consistente sobre latinos en reportes recientes y regulares sobre arrestos y prisión, libertad condicional y libertad bajo palabra. Aunque es posible que más estados recopilen esta información en forma rutinaria, solo consideramos información que los estados ponen al acceso del público. Setenta y cinco por ciento de los estados reportaron información recientemente y en forma regular, por origen étnico en por lo menos una de nuestras cinco medidas, \
  pero solo el 39 por ciento lo hicieron en dos o más medidas.\
  </p> <p>Los estados recogen información de justicia penal a través de varias agencias y estas no pueden coordinar sus esfuerzos. Para asegurar que los latinos sean contabilizados en forma precisa en el sistema de justicia penal, los estados deben asegurarse que todas las agencias relevantes, incluyendo las fuerzas del orden, el departamento de correccionales y la junta de libertad condicional, recojan la misma información sobre origen étnico. \
  Si los estados no recogen información precisa e íntegra a través de todas las agencias, es imposible evaluar cómo es que el sistema afecta a los latinos.</p>"]
}

var SECONDSECTION = {
  english: ["<p>We also looked at the <em>quality</em> of states’ ethnicity data. There is disagreement within the field on how to collect data on race and ethnicity and whether those should be <a href=\"http:\/\/www.usccr.gov\/pubs\/RC2010Web_Version.pdf\" target=\"_blank\">separate categories</a>. <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">Many Latinos</a> consider their race to be Hispanic or Latin American, as opposed to identifying racially as white or black and ethnically as Latino or Hispanic. When assessing demographic data quality, we followed current federal policy and Census Bureau definitions of \
  <a href=\"https:\/\/www.census.gov\/quickfacts\/meta\/long_RHI425215.htm\" target=\"_blank\">race</a> and <a href=\"http:\/\/www.census.gov\/topics\/population\/hispanic-origin\/about.html\">ethnicity</a>, which allow Latinos to identify both as Hispanic and as a particular race.</p>\
  <p>State agencies that collected and reported the most thorough race and ethnicity data followed Census Bureau guidelines: they collected race and ethnicity data separately but reported them as combined categories, such as &ldquo;non-Hispanic white&rdquo; or &ldquo;Hispanic black.&rdquo; Some agencies asked about race and ethnicity separately but did not combine them in reporting. With these data, we can determine how many people are reported \
  as &ldquo;Hispanic&rdquo; separately from how many are reported as &ldquo;black&rdquo; or &ldquo;white&rdquo; but not whether &ldquo;Hispanic&rdquo; people are also &ldquo;black&rdquo; or &ldquo;white.&rdquo; Other agencies combined race and ethnicity into one category: a person can be counted as &ldquo;Hispanic&rdquo; or &ldquo;white&rdquo; but not both. Still others did not include a category for Latinos in their publicly available data or did not publish accessible race and ethnicity data at all. </p>\
  <p>States included Latinos in their prison population data far more than in the other data categories we tracked. Thirty-eight states reported data on Latinos in prison compared with only 20 that reported data on Latinos in the parole population, 18 that reported data on Latinos in the probation population, 15 that reported data on Latinos in arrest records, and just 1 that reported data on Latinos in prison by offense.</p>\
  <p>Hardly any states reported data on Latinos in combined categories (e.g., &ldquo;Hispanic white&rdquo; or &ldquo;non-Hispanic black&rdquo;). Only three—New Hampshire, North Carolina, and Vermont—tracked both race and ethnicity and reported them in combination in any data category (prison population in North Carolina and arrests in New Hampshire and Vermont).</p>"],
  spanish: ["<p>También vimos la <em>calidad</em> de la información sobre origen étnico de los estados. Existe un desacuerdo en esta esfera sobre cómo reunir información de raza y origen étnico, así como si esas deben ser <a href=\"http:\/\/www.usccr.gov\/pubs\/RC2010Web_Version.pdf\" target=\"_blank\">categorías separadas</a>. <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2015\/06\/15\/is-being-hispanic-a-matter-of-race-ethnicity-or-both\/\" \
  target=\"_blank\">Muchos latinos</a> consideran su raza hispana o latina, en lugar de identificarse racialmente como blanco o negro, y étnicamente como latino o hispano. Cuando evaluamos la calidad de la información demográfica, seguimos la política federal actual y las definiciones de la Oficina del Censo en relación a \
  <a href=\"https:\/\/www.census.gov\/quickfacts\/meta\/long_RHI425215.htm\" target=\"_blank\">raza</a> y <a href=\"http:\/\/www.census.gov\/topics\/population\/hispanic-origin\/about.html\">origen étnico</a>, lo que les permite a los latinos identificarse tanto como hispanos y como de una raza en particular.</p>\
  <p>Las agencias estatales que recogieron y reportaron la información más detallada sobre raza y origen étnico siguieron las pautas de la Oficina del Censo: ellos recogieron información sobre raza y origen étnico por separado, pero la reportaron como categorías combinadas, como &ldquo;no hispano blanco&rdquo; o &ldquo;hispano negro&rdquo;. Algunas agencias preguntaron sobre raza y origen étnico por separado, pero no combinaron la información en el reporte. Con esta información, podemos determinar cuántas personas son reportadas \
  como &ldquo;hispanas&rdquo; aparte de cuántas son reportadas como &ldquo;negras&rdquo; o &ldquo;blancas&rdquo;, pero no si las personas &ldquo;hispanas&rdquo; también eran &ldquo;negras&rdquo; o &ldquo;blancas&rdquo;. Otras agencias combinaron la raza y el origen étnico en una categoría: una persona puede ser contada como &ldquo;hispana&rdquo; o &ldquo;blanca&rdquo; pero no como ambas. Aun así, otros no incluyeron una categoría para latinos en su información a disposición del público y no publicaron información accesible sobre raza y origen étnico en absoluto. </p>\
  <p>Los estados incluyeron latinos en su información de población penitenciaria mucho más que en las otras categorías de información a la que hicimos seguimiento. Treinta y ocho estados reportaron información sobre latinos en prisión, en comparación con tan solo 20 que reportaron información sobre latinos en la población con libertad bajo palabra, 18 reportaron información sobre latinos en la población con libertad condicional, 15 que reportaron información sobre latinos en registros de arresto y tan solo 1 que reportó información sobre latinos en prisión por delito.</p>\
  <p>Casi ningún estado reportó información sobre latinos en categorías combinadas (por ejemplo, &ldquo;hispano blanco&rdquo; o &ldquo;no hispano negro&rdquo;). Solo tres, New Hampshire, Carolina del Norte y Vermont, hicieron seguimiento tanto a la raza como al origen étnico y lo reportaron en combinación con cualquier otra categoría de información (población penitenciaria en Carolina del Norte y arrestos en Nuevo Hampshire y Vermont).</p>"]
}

var SECONDSECTION_DROPDOWN_SIDE = {
  english: ["Data on:"],
  spanish: ["Información sobre:"]

}

var SECOND_HEADER = {
  english: ["The quality of ethnicity data varies across states and agencies"],
  spanish: ["La calidad de la información sobre origen étnico varía en todos los estados y agencias."]
}

var THIRDSECTION = {
  english:["<h1>States with large Latino populations do not necessarily have better data</h1> \
      <p>Seventy-five percent of Latinos in the United States live in just 10 states. Many of these states have significant gaps in reported ethnicity data despite their large Latino populations. California, Florida, and New Mexico, for example, all reported ethnicity data in fewer categories than the average state. \
      </p> <p>Data reporting in these states is especially important because states with more Latino residents are likely to have more Latinos in their criminal justice systems. The effects of criminal justice policies on Latinos can go unseen by the public and policymakers in states where agencies do not report ethnicity data. </p>"],
  spanish: ["<h1>Los estados con grandes poblaciones latinoamericanas no necesariamente tienen mejor información.</h1> \
      <p>Setenta y cinco por ciento de latinos en Estados Unidos viven en tan solo 10 estados. Muchos de estos estados tienen considerables brechas en la información reportada sobre origen étnico, a pesar de sus grandes poblaciones latinoamericanas. California, Florida y Nuevo México, por ejemplo, todos reportaron información sobre origen étnico en menos categorías que el estado promedio. \
      </p> <p>El reporte de los datos en estos estados es especialmente importante, ya que es probable que los estados con más residentes latinoamericanos tengan más latinos en sus sistemas de justicia penal. Los efectos de las políticas del sistema de justicia penal sobre los latinos pueden pasar desapercibidos por el público y por los legisladores en los estados en los que las agencias no reportan información sobre origen étnico. </p>"]
}

var CONCLUSION ={
  english: ["<h1 class=\"last-header\">Establishing a higher standard for data</h1>\
    <p>Data matter because they affect policy. We have seen this across the country as increased <a href=\"http:\/\/www.washingtonpost.com\/sf\/investigative\/2015\/12\/26\/a-year-of-reckoning-police-fatally-shoot-nearly-1000\" target=\"_blank\">tracking of police shootings</a>,\
    fueled in part by the <a href=\"http://www.nytimes.com/interactive/2014/08/13/us/ferguson-missouri-town-under-siege-after-police-shooting.html\" target=\"_blank\">2014 shooting of Michael Brown</a> in Ferguson, Missouri, sparked a national conversation about <a href=\"http://www.iacp.org/CommunityPoliceRelations\" target=\"_blank\">community-police relations</a>.\
    Using data to illustrate issues can change the conversation and influence policy and practice. Excluding justice system–involved Latinos from data excludes them from policy. </p>\
    <p>Data collection and reporting in the criminal justice system is inconsistent and incomplete. We present the following recommendations to improve the quality and utility of race and ethnicity data:\
    <ul class=\"inside\"><li>States should, at the very least, meet current Census Bureau standards and collect race and ethnicity data separately before combining them. This would result in more descriptive and accurate subcategories, such as &ldquo;non-Hispanic white&rdquo; and &ldquo;Hispanic black.&rdquo;</li>\
    <li>Data should be collected and publicly reported at least once every two years. This would provide more frequent data on Latinos, one of the nation’s fastest-growing demographic groups.</li>\
    <li>Race and ethnicity data should be self-reported, not determined by state employees. Self-identification would prevent people from being boxed into identities they do not claim as their own and is consistent with Census Bureau data collection standards.</li>\
    </ul>\
    </p>If states follow the federal government’s <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2016\/10\/04\/federal-officials-may-revamp-how-americans-identify-race-ethnicity-on-census-and-other-forms/\" target=\"_blank\">proposed 2020 Census changes</a> and combine race and \
    ethnicity in one question, justice system–involved people must be allowed to check more than one box. And although states should, at a minimum, include a &ldquo;Hispanic&rdquo; or &ldquo;Latino&rdquo; category, Latinos are not a monolith. \
    <a href=\"http:\/\/www.pewsocialtrends.org\/2015\/06\/11\/chapter-7-the-many-dimensions-of-hispanic-racial-identity\" target=\"_blank\">Many Latinos identify</a> as mixed race, indigenous, or Afro-Latino. Hispanic or Latino ethnicities can be split further \
    <a href=\"http:\/\/www.pewhispanic.org/2012\/04/04\/when-labels-dont-fit-hispanics-and-their-views-of-identity/\" target=\"_blank\">by country of origin</a> (e.g., Mexican or Cuban).</p>\
    <p>Some states may want to capture ethnicity data but cannot easily do so because of funding issues, time limits, or other constraints. But as the United States becomes more racially and ethnically diverse, states must work to ensure that all people are counted and considered when developing policy.</p>"],
  spanish:["<h1 class=\"last-header\">Estableciendo un estándar de información más alto</h1>\
    <p>La información importa porque afecta las políticas. Hemos visto esto en todo el país ya que el incremento del <a href=\"http:\/\/www.washingtonpost.com\/sf\/investigative\/2015\/12\/26\/a-year-of-reckoning-police-fatally-shoot-nearly-1000\" target=\"_blank\">seguimiento de los disparos de la policía</a>,\
    avivado en parte por la <a href=\"http://www.nytimes.com/interactive/2014/08/13/us/ferguson-missouri-town-under-siege-after-police-shooting.html\" target=\"_blank\">muerte de Michael Brown en el 2014</a> en Ferguson, Missouri, provocó un discurso nacional acerca de las <a href=\"http://www.iacp.org/CommunityPoliceRelations\" target=\"_blank\">relaciones entre la comunidad y la policía</a>.\
    El uso de los datos para ilustrar los problemas puede cambiar el discurso e influir en las políticas y en la práctica. Excluir de los datos a los latinos involucrados en el sistema de justicia, los excluye de las políticas. </p>\
    <p>La recopilación y el reporte de información en el sistema de justicia penal es inconsistente e incompleto. Presentamos las siguientes recomendaciones para mejorar la calidad y la utilidad de la información sobre raza y origen étnico:\
    <ul class=\"inside\"><li>Los estados deben, por lo menos, cumplir los estándares actuales de la Oficina del Censo y recoger información sobre raza y origen étnico por separado antes de combinarla. Esto daría como resultado subcategorías más descriptivas y precisas, como \&ldquo;no hispano blanco&rdquo;\ e &ldquo;hispano negro&rdquo;\.</li>\
    <li>La información debe recogerse y reportarse públicamente por lo menos cada dos años. Esto ofrecería información más frecuente sobre latinos, uno de los grupos demográficos de más rápido crecimiento en el país.</li>\
    <li>La información sobre raza y origen étnico debe ser auto reportada, no determinada por empleados estatales. La auto identificación evitaría que las personas sean encasilladas en identidades que no indiquen como propias y es consistente con los estándares de recopilación de información de la Oficina del Censo.</li>\
    </ul>\
    </p>Si los estados siguen los <a href=\"http:\/\/www.pewresearch.org\/fact-tank\/2016\/10\/04\/federal-officials-may-revamp-how-americans-identify-race-ethnicity-on-census-and-other-forms/\" target=\"_blank\">cambios censales para el 2020, propuestos por el gobierno federal </a>y combinan raza y \
    origen étnico en una pregunta, a las personas involucradas en el sistema de justicia se les debe permitir marcar más de una casilla. Y, aunque los estados deberían por lo menos incluir una categoría de &ldquo;hispano&rdquo; o &ldquo;latino&rdquo;, los latinos no son un monolito. \
    <a href=\"http:\/\/www.pewsocialtrends.org\/2015\/06\/11\/chapter-7-the-many-dimensions-of-hispanic-racial-identity\" target=\"_blank\">Muchos latinos se identifican</a> como de raza mixta, indígenas o afrolatinos. El origen étnico hispano o latino puede dividirse aún más \
    <a href=\"http:\/\/www.pewhispanic.org/2012\/04/04\/when-labels-dont-fit-hispanics-and-their-views-of-identity/\" target=\"_blank\">por país de origen</a> (por ejemplo, mexicano o cubano).</p>\
    <p>Algunos estados pueden desear recopilar información sobre origen étnico, pero no pueden hacerlo fácilmente debido a problemas de financiamiento, límites de tiempo u otras restricciones. Pero, a medida que Estados Unidos se hace más diverso racial y étnicamente, los estados deben trabajar para asegurar que todas las personas sean contabilizadas y consideradas cuando desarrollen una política.</p>"]
}

//DATA VIZ

var TOGGLE_TEXT = {
  english: ["Show only regularly and recently reported data?"],
  spanish: ["¿Mostrar solo información reportada recientemente y en forma regular?"]
}

var FIRSTGRAPHIC_XLABEL = {
  english: ["Number of criminal justice data categories that include Latinos"],
  spanish: ["Cantidad de categorías de información de justicia penal que incluye latinos"]
}

var FIRSTGRAPHIC_TOOLTIPHEADER = {
  english: [
  ["header1","state"],
  ["header2","data on latinos reported"]
  ],
  spanish:[
  ["header1","estado"],
  ["header2","información reportada sobre latinos"]
  ]
}

var FIRSTGRAPHIC_SELECTSTATE = {
  english:["Select a State"],
  spanish: ["Seleccione un estado"]
}



//FOOTER

var FOOTER_TEXT = {
  english: ["<h2>About the data</h2><p>We collected the data used in this feature from publicly available state-level sources in all 50 states and Washington, DC. In addition to a scan of state agency websites, we reviewed Google search results for each data category and each state using search terms focused on annual reporting, statistics, race, and ethnicity. From this, we created a database of the most recent and \
  complete data available. Data collection occurred between June and September 2016, and all sources used in this feature were available during that period. The data found using our search protocol may not reflect all data collected or reported by each state, agency, or department.</p>\
  <p>States are considered to include Latinos in their data reporting when their racial or ethnic demographic reporting includes categories such as &ldquo;Hispanic&rdquo; or &ldquo;Latino.&rdquo; Latinos may be reported as a distinct ethnic or racial group or combined with a racial group (e.g., &ldquo;Hispanic black&rdquo; or &ldquo;non-Hispanic white&rdquo;). We recognize that &ldquo;Hispanic&rdquo; and &ldquo;Latino&rdquo; have different meanings. This feature uses &ldquo;Latino&rdquo; when \
  referring to people, communities, or populations and &ldquo;Hispanic&rdquo; when referring to data because that is the term most states use when reporting data.</p>\
  <p>We define regularly and recently reported data as data that has been publicly reported at least twice, at least every other year, and at least as recently as 2014.</p> \
  <p>Please contact <a href=\"mailto:agurvis@urban.org\">agurvis@urban.org</a> and <a href=\"mailto:seppler-epstein@urban.org\">seppler-epstein@urban.org</a> with any questions about this project or the associated data.</p>"],
  spanish: ["<h2>Acerca de la información</h2><p>Recopilamos la información utilizada en esta presentación de fuentes a nivel estatal disponible para el público en los 50 estados y Washington, DC. Además de un análisis de los sitios web de agencias estatales, revisamos los resultados de búsqueda de Google para cada categoría de información y cada estado, utilizando términos de búsqueda enfocados en reportes anuales, estadísticas, raza y origen étnico. A partir de ahí, creamos una base de datos de la información más reciente y \
  completa disponible. La recopilación de información se realizó entre junio y septiembre del 2016 y todas las fuentes utilizadas en esta presentación estaban disponibles durante ese periodo. La información encontrada utilizando nuestro protocolo de búsqueda no puede reflejar toda la información recopilada o reportada por cada estado, agencia o departamento.</p>\
  <p>Se considera que los estados incluyen a los latinos en su reporte de datos cuando su reporte demográfico racial o étnico incluye categorías como &ldquo;hispano&rdquo; o &ldquo;latino&rdquo;. Puede reportarse a los latinos como un origen étnico o un grupo racial distinto o combinado con un grupo racial (por ejemplo, &ldquo;hispano negro&rdquo; o &ldquo;no hispano blanco&rdquo;). Reconocemos que &ldquo;hispano&rdquo; y &ldquo;latino&rdquo; tienen significados distintos. Esta presentación utiliza &ldquo;latino&rdquo; cuando \
  se refiere a personas, comunidades o poblaciones e &ldquo;hispano&rdquo; cuando se refiere a información, ya que es el término que la mayoría de estados utiliza al reportar información.</p>\
  <p>Definimos la información reportada recientemente y en forma regular como información reportada públicamente por lo menos dos veces, por lo menos cada dos años y por lo menos en el 2014.</p> \
  <p>Por favor comuníquese con <a href=\"mailto:agurvis@urban.org\">agurvis@urban.org</a> y <a href=\"mailto:seppler-epstein@urban.org\">seppler-epstein@urban.org</a> si tiene alguna pregunta sobre este proyecto o la información asociada.</p>"]
}

var PROJECT_CREDITS = {
  english: ["<h2>Project credits</h2><div class=\"urbanstatement\">As an organization, the Urban Institute does not take positions on issues, but it does empower and support its experts in sharing their own evidence-based views and policy recommendations that have been shaped by scholarship.</div>\
                    <h3 class=\"job\">Research</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/sarah-eppler-epstein\" target=\"_blank\">Sarah Eppler-Epstein</a>, <a href=\"http:\/\/www.urban.org\/author\/annie-gurvis\" target=\"_blank\">Annie Gurvis</a> and <a href=\"http:\/\/www.urban.org\/author\/ryan-king\" target=\"_blank\">Ryan King</a>\
                    <h3 class=\"job\">Design and Development</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/john-wehmann\" target=\"_blank\">John Wehmann</a> and <a href=\"http:\/\/www.urban.org\/author\/vivian-hou\" target=\"_blank\">Vivian Hou</a>\
                    <h3 class=\"job\">Editorial</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/alexandra-tilsley\" target=\"_blank\">Alex Tilsley</a> and <a href=\"http:\/\/www.urban.org\/author\/daniel-matos\" target=\"_blank\">Daniel Matos</a> \
                    <div>&nbsp;</div>\
                    <p><em>Photo via Shutterstock</em></p>\
                    <div class=\"credits\">Copyright &copy; <a href=\"http:\/\/www.urban.org/\">Urban Institute</a> 2016. <a href=\"https:\/\/github.com\/UrbanInstitute\/race_ethnicity\" target=\"_blank\">View this project on Github.</a></div>"],
  spanish: ["<h2>Créditos del proyecto</h2><div class=\"urbanstatement\">Como organización, el Urban Institute no toma posición en los temas, pero sí faculta y apoya a sus expertos para que compartan sus propias opiniones y recomendaciones sobre políticas, las cuales se basan en la evidencia y se enmarcan en trabajos académicos.</div>\
                    <h3 class=\"job\">Investigación</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/sarah-eppler-epstein\" target=\"_blank\">Sarah Eppler-Epstein</a>, <a href=\"http:\/\/www.urban.org\/author\/annie-gurvis\" target=\"_blank\">Annie Gurvis</a> y <a href=\"http:\/\/www.urban.org\/author\/ryan-king\" target=\"_blank\">Ryan King</a>\
                    <h3 class=\"job\">Diseño y desarrollo</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/john-wehmann\" target=\"_blank\">John Wehmann</a> y <a href=\"http:\/\/www.urban.org\/author\/vivian-hou\" target=\"_blank\">Vivian Hou</a>\
                    <h3 class=\"job\">Editorial</h3>\
                    <a href=\"http:\/\/www.urban.org\/author\/alexandra-tilsley\" target=\"_blank\">Alex Tilsley</a> y <a href=\"http:\/\/www.urban.org\/author\/daniel-matos\" target=\"_blank\">Daniel Matos</a> \
                    <div>&nbsp;</div>\
                    <p><em>Fotografía a través de Shutterstock</em></p>\
                    <div class=\"credits\">Derechos de autor &copy; <a href=\"http:\/\/www.urban.org/\">Urban Institute</a> 2016. <a href=\"https:\/\/github.com\/UrbanInstitute\/race_ethnicity\" target=\"_blank\">Vea este proyecto en Github.</a></div>"]
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
var wrapWidth = (IS_PHONE) ? 1000 : 190;

//WHEN PAGE LOADS, USE ENGLISH TEXT
$(window).load(function() { 
  var other_lang = (GLOBAL_LANGUAGE == "english") ? "spanish" : "english"
  d3.selectAll('.switch.large').style('background-image', 'url(images/yes-no-' + GLOBAL_LANGUAGE + '.png)').classed(GLOBAL_LANGUAGE,true).classed(other_lang, false)

  $('#language_option_header').html(LANGUAGE_OPTIONS_HEADER[GLOBAL_LANGUAGE])
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])
  $('#first-section-text').html(FIRSTSECTION[GLOBAL_LANGUAGE])
  $('#heroimage').find('h1').html(TITLE[GLOBAL_LANGUAGE])
  $('#header_text').html(HEADERTEXT[GLOBAL_LANGUAGE])
  $ ('#english').html(LANGUAGE_ENGLISH[GLOBAL_LANGUAGE])
  $('#spanish').html(LANGUAGE_SPANISH[GLOBAL_LANGUAGE])
  $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  $('.ui-selectmenu-text').html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][0][1])
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#dropdown-side-label-text').html(SECONDSECTION_DROPDOWN_SIDE[GLOBAL_LANGUAGE])
  $('#third-section-text').html(THIRDSECTION[GLOBAL_LANGUAGE])
  $('#conclusion-text').html(CONCLUSION[GLOBAL_LANGUAGE])
  $('#left').html(FOOTER_TEXT[GLOBAL_LANGUAGE])
  $('#right').html(PROJECT_CREDITS[GLOBAL_LANGUAGE])
  $(".linkback-home").html(LINKBACKTEXT[GLOBAL_LANGUAGE]["home"])
  $(".linkback-title").html(LINKBACKTEXT[GLOBAL_LANGUAGE]["title"])
  d3.select('.tooltip-text-state').html(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE]).call(wrapText, wrapWidth)
  $('title').html(LINKBACKTEXT[GLOBAL_LANGUAGE]["title"])
  var fig3togglemargin = (GLOBAL_LANGUAGE == "english") ? "-40px" : "0px";
  d3.select(".fig3-toggle").style("margin-top", fig3togglemargin)
  d3.select("#header-pinned .share-icons." + GLOBAL_LANGUAGE).style("display","block")
  d3.select("#header-pinned .share-icons." + other_lang).style("display","none")
  d3.select("meta[name=description]").attr("content", METATEXT[GLOBAL_LANGUAGE])

})


//WHEN CLICKING ON A LANGUAGE OPTION
$(".language_option")
.on("click", function() {
    GLOBAL_LANGUAGE = d3.select(this).select("span").attr("id");
  var other_lang = (GLOBAL_LANGUAGE == "english") ? "spanish" : "english"

  history.pushState({}, "", "?language=" + GLOBAL_LANGUAGE);

  //MAIN TEXT CONTAINERS//
  d3.selectAll('.switch.large').style('background-image', 'url(images/yes-no-' + GLOBAL_LANGUAGE + '.png)').classed(GLOBAL_LANGUAGE,true).classed(other_lang, false)
  $(".linkback-home").html(LINKBACKTEXT[GLOBAL_LANGUAGE]["home"])
  $(".linkback-title").html(LINKBACKTEXT[GLOBAL_LANGUAGE]["title"])
  $('title').html(LINKBACKTEXT[GLOBAL_LANGUAGE]["title"])
  var fig3togglemargin = (GLOBAL_LANGUAGE == "english") ? "-40px" : "0px";
  d3.select(".fig3-toggle").style("margin-top", fig3togglemargin)

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
  $('.non-mobile-text').html(SECONDSECTION[GLOBAL_LANGUAGE]);
  $('#second-header').html(SECOND_HEADER[GLOBAL_LANGUAGE])
  $('#dropdown-side-label').html(SECONDSECTION_DROPDOWN_SIDE[GLOBAL_LANGUAGE])
  $('#third-section-text').html(THIRDSECTION[GLOBAL_LANGUAGE])
  //$('.grid-cat-labels').html(MEASURES_GRID[GLOBAL_LANGUAGE])
  $('#conclusion-text').html(CONCLUSION[GLOBAL_LANGUAGE])
  $('#left').html(FOOTER_TEXT[GLOBAL_LANGUAGE])
  $('#right').html(PROJECT_CREDITS[GLOBAL_LANGUAGE])
  d3.select("#header-pinned .share-icons." + GLOBAL_LANGUAGE).style("display","block")
  d3.select("#header-pinned .share-icons." + other_lang).style("display","none")
  d3.select("meta[name=description]").attr("content", METATEXT[GLOBAL_LANGUAGE])
  //ALL DATA VIZ TEXT
  $('.toggle_text').html(TOGGLE_TEXT[GLOBAL_LANGUAGE])

  //FIRST DATA VIZ TEXT
  $('.xlabel').html(FIRSTGRAPHIC_XLABEL[GLOBAL_LANGUAGE])
  d3.select('.tooltip-text-state').html(FIRSTGRAPHIC_SELECTSTATE[GLOBAL_LANGUAGE]).call(wrapText, wrapWidth);
  var tooltip_header = $('.tooltip-header')
  for (var i=0; i<tooltip_header.length; i++) {
      tooltip_header.eq(i).data(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1]), tooltip_header.eq(i).text();
      tooltip_header.eq(i).text(FIRSTGRAPHIC_TOOLTIPHEADER[GLOBAL_LANGUAGE][i][1])


  }

  for (var i=0; i<MEASURES_DROPDOWN[GLOBAL_LANGUAGE].length; i++) {
        if ($('.tooltip-text').eq(i).text() == (MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])) {
    } else {
      $('.tooltip-text').eq(i).html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
    }
  }
  //SECOND DATA VIZ    ******DROPDOWN TEXT NOT WORKING EVERYTIME
  var measures = $('.measure_type')
  d3.select(this).classed("active", true)
  for (var i=0; i<measures.length; i++){

    if (measures.eq(i).text() == (MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])) {
    } else {
      measures.eq(i).html(MEASURES_DROPDOWN[GLOBAL_LANGUAGE][i][1])
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

  for (var i=0; i< $('.grid-cat-labels').length; i++){
    if ($('.grid-cat-labels').eq(i).text() == (MEASURES_GRID[GLOBAL_LANGUAGE][i][1])) {
    } else {
      $('.grid-cat-labels').eq(i).html(MEASURES_GRID[GLOBAL_LANGUAGE][i][1])

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



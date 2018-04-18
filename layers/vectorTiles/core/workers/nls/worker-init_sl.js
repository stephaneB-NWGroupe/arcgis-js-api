// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define("esri/layers/vectorTiles/core/workers/nls/worker-init_sl",{"dojo/cldr/nls/number":{scientificFormat:"#E0","currencySpacing-afterCurrency-currencyMatch":"[:^S:]",infinity:"∞",superscriptingExponent:"×",list:";",percentSign:"%",minusSign:"-","currencySpacing-beforeCurrency-surroundingMatch":"[:digit:]","decimalFormat-short":"000 bil'.'","currencySpacing-afterCurrency-insertBetween":" ",nan:"NaN",plusSign:"+","currencySpacing-afterCurrency-surroundingMatch":"[:digit:]","currencySpacing-beforeCurrency-currencyMatch":"[:^S:]",currencyFormat:"#,##0.00 ¤;(#,##0.00 ¤)",perMille:"‰",group:".",percentFormat:"#,##0%","decimalFormat-long":"000 bilijonov",decimalFormat:"#,##0.###",decimal:",","currencySpacing-beforeCurrency-insertBetween":" ",exponential:"e",_localized:{}},"dojo/cldr/nls/gregorian":{"dateFormatItem-Ehm":"E h:mm a","days-standAlone-short":["ned.","pon.","tor.","sre.","čet.","pet.","sob."],"months-format-narrow":["j","f","m","a","m","j","j","a","s","o","n","d"],"field-second-relative+0":"zdaj","quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Dan v tednu","dateFormatItem-yQQQ":"QQQ y","dateFormatItem-yMEd":"E, d. M. y","field-wed-relative+0":"To sredo","field-wed-relative+1":"Naslednjo sredo","dateFormatItem-GyMMMEd":"E, d. MMM y G","dateFormatItem-MMMEd":"E, d. MMM",eraNarrow:["pr. n. št.","po Kr.","po n. št."],"field-tue-relative+-1":"Prejšnji torek","days-format-short":["ned.","pon.","tor.","sre.","čet.","pet.","sob."],"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"dd. MMMM y","field-fri-relative+-1":"Prejšnji petek","field-wed-relative+-1":"Prejšnjo sredo","months-format-wide":["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"pop.","dateFormat-full":"EEEE, dd. MMMM y","field-thu-relative+-1":"Prejšnji četrtek","dateFormatItem-Md":"d. M.","dayPeriods-format-abbr-am":"AM","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dayPeriods-format-wide-noon":"noon","dateFormatItem-yMd":"d. M. y","field-era":"Doba","dateFormatItem-yM":"M/y","months-standAlone-wide":["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],"timeFormat-short":"HH:mm","quarters-format-wide":["1. četrtletje","2. četrtletje","3. četrtletje","4. četrtletje"],"dateFormatItem-yQQQQ":"QQQQ y","timeFormat-long":"HH:mm:ss z","field-year":"Leto","dateFormatItem-yMMM":"MMM y","dateTimeFormats-appendItem-Era":"{1} {0}","field-hour":"Ura","months-format-abbr":["jan.","feb.","mar.","apr.","maj","jun.","jul.","avg.","sep.","okt.","nov.","dec."],"field-sat-relative+0":"To soboto","field-sat-relative+1":"Naslednjo soboto","timeFormat-full":"HH:mm:ss zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"danes","field-thu-relative+0":"Ta četrtek","field-day-relative+1":"jutri","field-thu-relative+1":"Naslednji četrtek","dateFormatItem-GyMMMd":"d. MMM y G","dateFormatItem-H":"HH","months-standAlone-abbr":["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec"],"quarters-format-abbr":["Q1","Q2","Q3","Q4"],"quarters-standAlone-wide":["1. četrtletje","2. četrtletje","3. četrtletje","4. četrtletje"],"dateFormatItem-Gy":"y G","dateFormatItem-M":"L","days-standAlone-wide":["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],"dayPeriods-format-abbr-noon":"noon","timeFormat-medium":"HH:mm:ss","field-sun-relative+0":"to nedeljo","dateFormatItem-Hm":"HH:mm","field-sun-relative+1":"naslednjo nedeljo","quarters-standAlone-abbr":["Q1","Q2","Q3","Q4"],eraAbbr:["pr. n. št.","po Kr.","po n. št."],"field-minute":"Minuta","field-dayperiod":"Čas dneva","days-standAlone-abbr":["ned","pon","tor","sre","čet","pet","sob"],"dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"včeraj","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","dateFormatItem-h":"h a","dateFormatItem-MMMd":"d. MMM","dateFormatItem-MEd":"E, d. MM.","dateTimeFormat-full":"{1} {0}","field-fri-relative+0":"Ta petek","field-fri-relative+1":"Naslednji petek","field-day":"Dan","days-format-wide":["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],"field-zone":"Časovni pas","months-standAlone-narrow":["j","f","m","a","m","j","j","a","s","o","n","d"],"dateFormatItem-y":"y","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","field-year-relative+-1":"lani","field-month-relative+-1":"prejšnji mesec","dateTimeFormats-appendItem-Year":"{1} {0}","dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["ned.","pon.","tor.","sre.","čet.","pet.","sob."],eraNames:["pred našim štetjem","naše štetje","po n. št."],"dateFormatItem-yMMMd":"d. MMM y","days-format-narrow":["n","p","t","s","č","p","s"],"field-month":"Mesec","days-standAlone-narrow":["n","p","t","s","č","p","s"],"dateFormatItem-MMM":"LLL","field-tue-relative+0":"Ta torek","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","field-tue-relative+1":"Naslednji torek","dayPeriods-format-wide-am":"dop.","dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormatItem-EHm":"E HH:mm","field-mon-relative+0":"ta ponedeljek","field-mon-relative+1":"naslednji ponedeljek","dateFormat-short":"d. MM. yy","dateFormatItem-EHms":"E HH:mm:ss","dateFormatItem-Ehms":"E h:mm:ss a","dayPeriods-format-narrow-noon":"n","field-second":"Sekunda","field-sat-relative+-1":"Prejšnjo soboto","dateFormatItem-yMMMEd":"E, d. MMM y","field-sun-relative+-1":"prejšnjo nedeljo","field-month-relative+0":"ta mesec","field-month-relative+1":"naslednji mesec","dateTimeFormats-appendItem-Timezone":"{0} {1}","dateFormatItem-Ed":"E, d.","field-week":"Teden","dateFormat-medium":"d. MMM y","field-week-relative+-1":"prejšnji teden","field-year-relative+0":"letos","field-year-relative+1":"naslednje leto","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM y G","field-mon-relative+-1":"prejšnji ponedeljek","field-week-relative+0":"ta teden","field-week-relative+1":"naslednji teden","field-day-relative+2":"pojutrišnjem","field-day-relative+-2":"predvčerajšnjim","dateFormatItem-yMMMM":"MMMM y","dateFormatItem-GyM":"M/y G",_localized:{}},"esri/layers/vectorTiles/nls/common":{_localized:{}}});
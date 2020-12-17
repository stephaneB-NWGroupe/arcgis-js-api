// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define("esri/layers/vectorTiles/core/workers/nls/worker-init_ru",{"dojo/cldr/nls/number":{scientificFormat:"#E0","currencySpacing-afterCurrency-currencyMatch":"[:^S:]",infinity:"∞",superscriptingExponent:"×",list:";",percentSign:"%",minusSign:"-","currencySpacing-beforeCurrency-surroundingMatch":"[:digit:]","decimalFormat-short":"000 трлн","currencySpacing-afterCurrency-insertBetween":" ",nan:"не число",plusSign:"+","currencySpacing-afterCurrency-surroundingMatch":"[:digit:]","currencySpacing-beforeCurrency-currencyMatch":"[:^S:]",currencyFormat:"#,##0.00 ¤",perMille:"‰",group:" ",percentFormat:"#,##0 %","decimalFormat-long":"000 триллиона",decimalFormat:"#,##0.###",decimal:",","currencySpacing-beforeCurrency-insertBetween":" ",exponential:"E",_localized:{}},"dojo/cldr/nls/gregorian":{"dateFormatItem-Ehm":"E h:mm a","days-standAlone-short":["вс","пн","вт","ср","чт","пт","сб"],"months-format-narrow":["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"],"field-second-relative+0":"сейчас","quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"День недели","dateFormatItem-yQQQ":"QQQ y 'г'.","dateFormatItem-yMEd":"ccc, d.MM.y 'г'.","field-wed-relative+0":"в эту среду","field-wed-relative+1":"в следующую среду","dateFormatItem-GyMMMEd":"E, d MMM y 'г'. G","dateFormatItem-MMMEd":"ccc, d MMM",eraNarrow:["до н.э.","н.э."],"field-tue-relative+-1":"в прошлый вторник","days-format-short":["вс","пн","вт","ср","чт","пт","сб"],"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"d MMMM y 'г'.","field-fri-relative+-1":"в прошлую пятницу","field-wed-relative+-1":"в прошлую среду","months-format-wide":["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],"dateTimeFormat-medium":"{1}, {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, d MMMM y 'г'.","field-thu-relative+-1":"в прошлый четверг","dateFormatItem-Md":"dd.MM","dayPeriods-format-abbr-am":"AM","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dayPeriods-format-wide-noon":"noon","dateFormatItem-yMd":"dd.MM.y","field-era":"Эра","dateFormatItem-yM":"MM.y","months-standAlone-wide":["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],"timeFormat-short":"H:mm","quarters-format-wide":["1-й квартал","2-й квартал","3-й квартал","4-й квартал"],"dateFormatItem-yQQQQ":"QQQQ y 'г'.","timeFormat-long":"H:mm:ss z","field-year":"Год","dateFormatItem-yMMM":"LLL y","dateTimeFormats-appendItem-Era":"{1} {0}","field-hour":"Час","months-format-abbr":["янв.","февр.","марта","апр.","мая","июня","июля","авг.","сент.","окт.","нояб.","дек."],"field-sat-relative+0":"в эту субботу","field-sat-relative+1":"в следующую субботу","timeFormat-full":"H:mm:ss zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"сегодня","field-thu-relative+0":"в этот четверг","field-day-relative+1":"завтра","field-thu-relative+1":"в следующий четверг","dateFormatItem-GyMMMd":"d MMM y 'г'. G","dateFormatItem-H":"H","months-standAlone-abbr":["янв.","февр.","март","апр.","май","июнь","июль","авг.","сент.","окт.","нояб.","дек."],"quarters-format-abbr":["1-й кв.","2-й кв.","3-й кв.","4-й кв."],"quarters-standAlone-wide":["1-й квартал","2-й квартал","3-й квартал","4-й квартал"],"dateFormatItem-Gy":"y G","dateFormatItem-M":"L","days-standAlone-wide":["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],"dayPeriods-format-abbr-noon":"noon","timeFormat-medium":"H:mm:ss","field-sun-relative+0":"в это воскресенье","dateFormatItem-Hm":"H:mm","field-sun-relative+1":"в следующее воскресенье","quarters-standAlone-abbr":["1-й кв.","2-й кв.","3-й кв.","4-й кв."],eraAbbr:["до н. э.","н. э."],"field-minute":"Минута","field-dayperiod":"ДП/ПП","days-standAlone-abbr":["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],"dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"вчера","dateTimeFormat-long":"{1}, {0}","dayPeriods-format-narrow-am":"AM","dateFormatItem-h":"h a","dateFormatItem-MMMd":"d MMM","dateFormatItem-MEd":"E, dd.MM","dateTimeFormat-full":"{1}, {0}","field-fri-relative+0":"в эту пятницу","field-fri-relative+1":"в следующую пятницу","field-day":"День","days-format-wide":["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],"field-zone":"Часовой пояс","months-standAlone-narrow":["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"],"dateFormatItem-y":"y","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","field-year-relative+-1":"в прошлом году","field-month-relative+-1":"в прошлом месяце","dateTimeFormats-appendItem-Year":"{1} {0}","dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["вс","пн","вт","ср","чт","пт","сб"],eraNames:["до н. э.","н. э."],"dateFormatItem-yMMMd":"d MMM y 'г'.","days-format-narrow":["вс","пн","вт","ср","чт","пт","сб"],"field-month":"Месяц","days-standAlone-narrow":["В","П","В","С","Ч","П","С"],"dateFormatItem-MMM":"LLL","field-tue-relative+0":"в этот вторник","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","field-tue-relative+1":"в следующий вторник","dayPeriods-format-wide-am":"AM","dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormatItem-EHm":"E HH:mm","field-mon-relative+0":"в этот понедельник","field-mon-relative+1":"в следующий понедельник","dateFormat-short":"dd.MM.yy","dateFormatItem-EHms":"E HH:mm:ss","dateFormatItem-Ehms":"E h:mm:ss a","dayPeriods-format-narrow-noon":"n","field-second":"Секунда","field-sat-relative+-1":"в прошлую субботу","dateFormatItem-yMMMEd":"E, d MMM y 'г'.","field-sun-relative+-1":"в прошлое воскресенье","field-month-relative+0":"в этом месяце","field-month-relative+1":"в следующем месяце","dateTimeFormats-appendItem-Timezone":"{0} {1}","dateFormatItem-Ed":"ccc, d","field-week":"Неделя","dateFormat-medium":"d MMM y 'г'.","field-week-relative+-1":"на прошлой неделе","field-year-relative+0":"в этому году","field-year-relative+1":"в следующем году","dayPeriods-format-narrow-pm":"PM","dateTimeFormat-short":"{1}, {0}","dateFormatItem-Hms":"H:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"LLL y G","field-mon-relative+-1":"в прошлый понедельник","field-week-relative+0":"на этой неделе","field-week-relative+1":"на следующей неделе","dateFormatItem-yMM":"MM.y","dateFormatItem-MMdd":"dd.MM","dateFormatItem-E":"ccc","field-day-relative+2":"послезавтра","dateFormatItem-yLLLL":"LLLL y","field-day-relative+-2":"позавчера","dateFormatItem-yMMMM":"LLLL y",_localized:{}},"esri/layers/vectorTiles/nls/common":{_localized:{}}});
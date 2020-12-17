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

define(["esri/dijit/geoenrichment/ReportPlayer/config","./prizm5_2020","dojo/i18n!esri/nls/jsapi"],(function(e,n,a){a=a.geoenrichment.dijit.Prizm5;var i="Urban",t="Suburban",r="Rural",l="Upscale",m="Upper‐Middle",o="Middle",u="Lower‐Middle",h="Older Families & Empty Nests",g="Mature Singles & Couples",c="School‐Age Families",b="Large Diverse Families",s="Middle‐Age Families",S="Very Young Singles & Couples",y="Younger Singles & Couples",f={"01":{name:"The A‐List",urbanity:i,hhIncome:"Very Wealthy",lifeStage:h},"02":{name:"Wealthy & Wise",urbanity:i,hhIncome:"Wealthy",lifeStage:h},"03":{name:"Asian Sophisticates",urbanity:"Urban Fringe",hhIncome:l,lifeStage:b},"04":{name:"Turbo Burbs",urbanity:t,hhIncome:l,lifeStage:s},"05":{name:"First‐Class Families",urbanity:t,hhIncome:l,lifeStage:b},"06":{name:"Downtown Verve",urbanity:i,hhIncome:l,lifeStage:c},"07":{name:"Mature & Secure",urbanity:"Urban Fringe",hhIncome:l,lifeStage:h},"08":{name:"Multiculture‐ish",urbanity:t,hhIncome:l,lifeStage:b},"09":{name:"Boomer Bliss",urbanity:t,hhIncome:m,lifeStage:h},10:{name:"Asian Achievement",urbanity:"Urban Fringe",hhIncome:m,lifeStage:b},11:{name:"Modern Suburbia",urbanity:t,hhIncome:m,lifeStage:"Young Families"},12:{name:"Eat, Play, Love",urbanity:i,hhIncome:m,lifeStage:S},13:{name:"Vie de Rêve",urbanity:t,hhIncome:l,lifeStage:b},14:{name:"Kick‐Back Country",urbanity:r,hhIncome:l,lifeStage:s},15:{name:"South Asian Enterprise",urbanity:i,hhIncome:m,lifeStage:b},16:{name:"Savvy Seniors",urbanity:i,hhIncome:m,lifeStage:h},17:{name:"Asian Avenues",urbanity:i,hhIncome:o,lifeStage:s},18:{name:"Multicultural Corners",urbanity:"Urban Fringe",hhIncome:m,lifeStage:b},19:{name:"Family Mode",urbanity:t,hhIncome:l,lifeStage:s},20:{name:"New Asian Heights",urbanity:"Urban Fringe",hhIncome:u,lifeStage:y},21:{name:"Scenic Retirement",urbanity:t,hhIncome:o,lifeStage:g},22:{name:"Indieville",urbanity:i,hhIncome:o,lifeStage:y},23:{name:"Mid‐City Mellow",urbanity:i,hhIncome:m,lifeStage:h},24:{name:"All‐Terrain Families",urbanity:t,hhIncome:m,lifeStage:"Young Families"},25:{name:"Suburban Sports",urbanity:t,hhIncome:m,lifeStage:s},26:{name:"Country Traditions",urbanity:r,hhIncome:m,lifeStage:s},27:{name:"Diversité Nouvelle",urbanity:"Urban Fringe",hhIncome:o,lifeStage:s},28:{name:"Latte Life",urbanity:i,hhIncome:o,lifeStage:S},29:{name:"C'est Tiguidou",urbanity:t,hhIncome:m,lifeStage:s},30:{name:"South Asian Society",urbanity:"Urban Fringe",hhIncome:o,lifeStage:b},31:{name:"Metro Melting Pot",urbanity:"Urban Fringe",hhIncome:o,lifeStage:s},32:{name:"Diverse & Determined",urbanity:"Urban Fringe",hhIncome:o,lifeStage:c},33:{name:"New Country",urbanity:r,hhIncome:o,lifeStage:s},34:{name:"Familles Typiques",urbanity:t,hhIncome:o,lifeStage:s},35:{name:"Vie Dynamique",urbanity:t,hhIncome:o,lifeStage:h},36:{name:"Middle‐Class Mosaic",urbanity:i,hhIncome:o,lifeStage:s},37:{name:"Keep on Trucking",urbanity:"Town",hhIncome:m,lifeStage:c},38:{name:"Stressed in Suburbia",urbanity:t,hhIncome:o,lifeStage:s},39:{name:"Évolution Urbaine",urbanity:i,hhIncome:o,lifeStage:c},40:{name:"Les Énerjeunes",urbanity:i,hhIncome:u,lifeStage:S},41:{name:"Down to Earth",urbanity:r,hhIncome:o,lifeStage:h},42:{name:"Banlieues Tranquilles",urbanity:t,hhIncome:o,lifeStage:c},43:{name:"Happy Medium",urbanity:t,hhIncome:o,lifeStage:s},44:{name:"Un Grand Cru",urbanity:i,hhIncome:o,lifeStage:g},45:{name:"Slow‐Lane Suburbs",urbanity:t,hhIncome:o,lifeStage:h},46:{name:"Patrimoine Rustique",urbanity:r,hhIncome:o,lifeStage:h},47:{name:"Social Networkers",urbanity:i,hhIncome:"Low",lifeStage:S},48:{name:"Agri‐Biz",urbanity:r,hhIncome:o,lifeStage:s},49:{name:"Backcountry Boomers",urbanity:r,hhIncome:u,lifeStage:g},50:{name:"Country & Western",urbanity:r,hhIncome:o,lifeStage:g},51:{name:"On Their Own Again",urbanity:i,hhIncome:"Downscale",lifeStage:g},52:{name:"Friends & Roomies",urbanity:i,hhIncome:u,lifeStage:y},53:{name:"Silver Flats",urbanity:t,hhIncome:"Downscale",lifeStage:g},54:{name:"Vie au Village",urbanity:r,hhIncome:u,lifeStage:s},55:{name:"Enclaves Multiethniques",urbanity:i,hhIncome:"Downscale",lifeStage:c},56:{name:"Jeunes Biculturels",urbanity:i,hhIncome:"Downscale",lifeStage:y},57:{name:"Juggling Acts",urbanity:i,hhIncome:u,lifeStage:y},58:{name:"Old Town Roads",urbanity:"Town",hhIncome:u,lifeStage:h},59:{name:"La Vie Simple",urbanity:t,hhIncome:u,lifeStage:c},60:{name:"Value Villagers",urbanity:i,hhIncome:u,lifeStage:c},61:{name:"Came From Away",urbanity:i,hhIncome:"Downscale",lifeStage:s},62:{name:"Suburban Recliners",urbanity:t,hhIncome:"Downscale",lifeStage:g},63:{name:"Amants de la Nature",urbanity:r,hhIncome:u,lifeStage:h},64:{name:"Midtown Movers",urbanity:i,hhIncome:u,lifeStage:s},65:{name:"Âgés & Traditionnels",urbanity:i,hhIncome:"Low",lifeStage:g},66:{name:"Indigenous Families",urbanity:"Town",hhIncome:u,lifeStage:b},67:{name:"Just Getting By",urbanity:i,hhIncome:"Low",lifeStage:y}},I={};function d(e,n){for(var a in e)if(n.test(a))return a;return null}function F(e){return 1===(e=e+1+"").length&&(e="0"+e),e}return I.Urban="#DE332B",I["Urban Fringe"]="#E6AB21",I.Suburban="#F37A1FFF",I.Town="#A4BB39",I.Rural="#0D8482",{getFieldNameByIndex:function(n,a){var i=F(n);return e.isPlayerOnServer?d(a,new RegExp("PZMD"+i+"_?HHD$")):"PZMD"+i+"_HHD"},getTotalFieldName:function(n){return e.isPlayerOnServer?d(n,/PZMD70_?HHD$/):"PZMD70_HHD"},getNumClassifiedSegments:function(){return 67},getSegmentInfoByIndex:function(e){var i=F(e),t=f[i];return{code:i,alias:t.name,color:I[t.urbanity],fields:[{label:a.hhIncome,value:t.hhIncome},{label:a.urbanity,value:t.urbanity},{label:a.lifeStage,value:t.lifeStage}],imageUrl:n[i]}},getUrl:function(e){return"http://downloads.esri.com/esri_content_doc/dbl/int/canada_prizm/"+(e+1)+".pdf"}}}));
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

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ObjectUtil"],function(o,r,t){function e(o){return r.isLightColor(o)?"#666666":"#BBBBBB"}function l(o){var t=r.isLightColor(o);return r.transform(o,{dv:t?-7:7}).toHex()}var a={getPanelTitleColor:function(o){var t=r.isLightColor(o);return r.transform(o,{dv:t?-50:50}).toHex()},getChartElementBackgroundColor:function(o){var t=r.isLightColor(o);return r.transform(o,{dv:t?-13:13}).toHex()}},n={};return n.getThemeColors=function(o){return[o.document.backgroundColor,o.infographic.staticInfographic.icon.backgroundColor,o.infographic.staticInfographic.highlightedIcon.backgroundColor]},n._generateChartColors=function(o,t){var e=[t,r.transform(t,{dv:-20}).toHex(),r.transform(t,{dv:-40}).toHex(),r.transform(t,{dv:-50}).toHex(),r.transform(t,{dv:-55}).toHex(),r.transform(t,{dv:-60}).toHex(),r.transform(t,{dv:-65}).toHex(),r.transform(t,{dv:-70}).toHex()];return o!==t&&e.unshift(o),e},n.applyThemeColorsToTheme=function(o,i,c,g){var d=i[0],s=i[1],C=i[2],u=r.getContrastColor(d).toHex(),b="#FFFFFF"===d.toUpperCase()?"#4C4C4C":u,h=r.isLightColor(d),f=a.getChartElementBackgroundColor(d),p=a.getPanelTitleColor(d),m={document:{color:b,backgroundColor:d},table:{overrideStyles:{Default:{color:b,backgroundColor:"transparent"},ReportTitle:{color:C,backgroundColor:"transparent"},TableHeader:{color:r.getContrastColor(s,void 0,void 0,200).toHex(),backgroundColor:s},GreyText:{color:r.transform(d,{dv:h?-33:33}).toHex(),backgroundColor:"transparent"},BlueText:{color:"#56A5D8",backgroundColor:"transparent"},AlternatingRow:{color:b,backgroundColor:r.transform(d,{dv:h?-7:7}).toHex()}}},chart:{backgroundColor:"transparent",titleStyle:{color:p},dataLabelsStyle:{color:u},xAxis:{lineColor:u,gridLinesColor:u,gridStripesColor:l(d),gridStripesColorAlt:"transparent",axisStyle:{color:u},titleStyle:{color:u}},yAxis:{lineColor:u,gridLinesColor:u,gridStripesColor:l(d),gridStripesColorAlt:"transparent",baseLineColor:u,axisStyle:{color:u},titleStyle:{color:u}},legendStyle:{color:u,backgroundColor:d},minMaxLegend:{titleStyle:{color:u}},ring:{ringBackground:{backgroundColor:f}},gauge:{dataLabelStyle:{color:s},othersColor:f,arrowIndicator:{lineColor:p,backgroundColor:p}},icon:{backgroundColor:s},columnBarBackground:{backgroundColor:f},comparisonInfo:{lineColor:e(d)}},infographic:{backgroundColor:"transparent",agePyramid:{theme:h?"light":"common",male:{backgroundColor:s},female:{backgroundColor:C}},staticInfographic:{backgroundColor:"transparent",icon:{backgroundColor:s},highlightedIcon:{backgroundColor:C},iconBarBackground:{},titleLine:{color:r.transform(d,{dv:h?-40:40}).toHex()},titleStyle:{color:p},variableLabelStyle:{color:s},variableLabelStyleHighlighted:{color:C},variableLabelStyleContrast:{color:d},variableDescriptionStyle:{color:r.transform(d,{dv:h?-50:50}).toHex()}}}};g&&g(m),t.populateObject(o,m,!0),o&&o.chart&&(o.chart.colors=c&&c.length?c:n._generateChartColors(s,C))},n.applyTextStyleToTheme=function(r,e){function l(r){var t=o.mixin({},e);return r&&delete t.color,t}var a={document:l(),table:{overrideStyles:{Default:{color:e.color},ReportTitle:{color:e.color},TableHeader:{color:e.color},AlternatingRow:{color:e.color}}},chart:{titleStyle:l(),dataLabelsStyle:l(),xAxis:{axisStyle:l(),titleStyle:l()},yAxis:{axisStyle:l(),titleStyle:l()},legendStyle:l(),minMaxLegend:{titleStyle:l(),minVariableLabelStyle:l(!0),maxVariableLabelStyle:l(!0)}},infographic:{staticInfographic:{titleStyle:l(),variableLabelStyle:l(),variableDescriptionStyle:l(),variableLabelStyleHighlighted:l(),variableLabelStyleContrast:l()}}};t.populateObject(r,a,!0)},n.removeBackgroundFromThemeElements=function(o,r){if(o&&(o.chart.backgroundColor="transparent",o.infographic.backgroundColor="transparent",o.infographic.staticInfographic=o.infographic.staticInfographic||{},o.infographic.staticInfographic.backgroundColor="transparent",r))for(var t in o.table.overrideStyles)o.table.overrideStyles[t].backgroundColor="transparent"},n});
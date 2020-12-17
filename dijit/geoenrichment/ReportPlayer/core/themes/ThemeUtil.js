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

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ObjectUtil"],(function(o,r,e){var t=function(o){var e=r.isLightColor(o);return r.transform(o,{dv:e?-50:50}).toHex()},l=function(o){var e=r.isLightColor(o);return r.transform(o,{dv:e?-13:13}).toHex()};function a(o){return r.isLightColor(o)?"#666666":"#BBBBBB"}function n(o){var e=r.isLightColor(o);return r.transform(o,{dv:e?-7:7}).toHex()}var i={getThemeColors:function(o){return[o.document.backgroundColor,o.icon.backgroundColor,o.highlightedIcon.backgroundColor]},generateChartColors:function(o,e,t){var l=(t=t||{}).gradientFactor||1,a=[e,r.transform(e,{dv:-20*l}).toHex(),r.transform(e,{dv:-40*l}).toHex(),r.transform(e,{dv:-50*l}).toHex(),r.transform(e,{dv:-55*l}).toHex(),r.transform(e,{dv:-60*l}).toHex(),r.transform(e,{dv:-65*l}).toHex(),r.transform(e,{dv:-70*l}).toHex()];if(t.numLighterColors)for(var n=0;n<t.numLighterColors;n++)a.unshift(r.transform(e,{dv:20*l*(n+1),ds:-20*(n+1)}).toHex());o&&o!==e&&a.unshift(o);var i={};return a.filter((function(o){return!i[o]&&(i[o]=!0,!0)}))},applyThemeColorsToTheme:function(o){var c=o.theme,d=o.colors,s=o.preserveForegroundColor,g=o.chartColors,u=o.colors3series,C=o.preprocessGeneratedThemeFunc,b=d[0],f=d[1],h=d[2],y=s&&c.chart&&c.chart.dataLabelsStyle&&c.chart.dataLabelsStyle.color||r.getContrastColor(b).toHex(),S=s&&c.document.color||("#FFFFFF"===b.toUpperCase()?"#4C4C4C":y),v=r.isLightColor(b),m=l(b),x=t(b),p=r.transform(b,{dv:v?-33:33}).toHex(),L={document:{color:S,backgroundColor:b,border:{color:p}},icon:{backgroundColor:f},highlightedIcon:{backgroundColor:h},table:{overrideStyles:{Default:{color:S,backgroundColor:"transparent"},TableHeader:{color:r.getContrastColor(f,void 0,void 0,200).toHex(),backgroundColor:f},AlternatingRow:{color:S,backgroundColor:r.transform(b,{dv:v?-7:7}).toHex()},ReportTitle:{color:h,backgroundColor:"transparent"},GreyText:{color:p,backgroundColor:"transparent"},BlueText:{color:"#56A5D8",backgroundColor:"transparent"}}},chart:{backgroundColor:"transparent",outlineColor:void 0,titleStyle:{color:x},dataLabelsAltColor:y,dataLabelsStyle:{color:y},xAxis:{lineColor:y,gridLinesColor:y,gridStripesColor:n(b),gridStripesColorAlt:"transparent",axisStyle:{color:y},titleStyle:{color:y}},yAxis:{lineColor:y,gridLinesColor:y,gridStripesColor:n(b),gridStripesColorAlt:"transparent",baseLineColor:y,axisStyle:{color:y},titleStyle:{color:y}},legendStyle:{color:y,backgroundColor:"transparent"},minMaxLegend:{titleStyle:{color:y}},comparisonInfo:{lineColor:a(b)},icon:{backgroundColor:f},ring:{ringBackground:{backgroundColor:m}},gauge:{dataLabelStyle:{color:f},othersColor:m,arrowIndicator:{lineColor:x,backgroundColor:x}},waffle:{dataValueStyle:{color:f},dataLabelStyle:{color:f},othersColor:m},columnBarBackground:{backgroundColor:m}},infographic:{backgroundColor:"transparent",agePyramid:{theme:v?"light":"common",male:{backgroundColor:f},female:{backgroundColor:h}},staticInfographic:{backgroundColor:"transparent",icon:{backgroundColor:f},highlightedIcon:{backgroundColor:h},iconBarBackground:{},titleLine:{color:r.transform(b,{dv:v?-40:40}).toHex()},titleStyle:{color:x},variableLabelStyle:{color:f},variableLabelStyleHighlighted:{color:h},variableLabelStyleContrast:{color:b},variableDescriptionStyle:{color:r.transform(b,{dv:v?-50:50}).toHex()}}}};C&&C(L),e.populateObject(c,L,!0),c.chart.colors=g&&g.length?g:i.generateChartColors(f,h),c.chart.colors3series=u},applyTextStyleToTheme:function(r,t){function l(r,e){var l=o.mixin({},t);return r&&delete l.color,e||delete l.fontSize,l}t=i.filterTextStyles(t);var a={document:l(!1,!0),table:{overrideStyles:{Default:l(!1,!0),TableHeader:l(!1,!0),AlternatingRow:l(!1,!0),ReportTitle:l(!1,!0),GreyText:l(!1,!0),BlueText:l(!1,!0)}},chart:{titleStyle:l(),dataLabelsStyle:l(),xAxis:{axisStyle:l(),titleStyle:l()},yAxis:{axisStyle:l(),titleStyle:l()},legendStyle:l(),minMaxLegend:{titleStyle:l(),minVariableLabelStyle:l(!0),maxVariableLabelStyle:l(!0)},gauge:{dataLabelStyle:l()},waffle:{dataValueStyle:l(),dataLabelStyle:l()}},infographic:{staticInfographic:{titleStyle:l(),variableLabelStyle:l(),variableLabelStyleHighlighted:l(),variableLabelStyleContrast:l(),variableDescriptionStyle:l()}}};e.populateObject(r,a,!0)}},c={fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,textDecoration:1,color:1};return i.filterTextStyles=function(o){var r={};for(var e in c){var t=o[e];void 0!==t&&(r[e]=t)}return r},i}));
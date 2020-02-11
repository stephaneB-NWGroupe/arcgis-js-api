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
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ImageUtil","esri/dijit/geoenrichment/utils/JsonXmlConverter","../../ConversionUtil","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartJsonUtil","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartTypes","esri/dijit/geoenrichment/ReportPlayer/core/charts/legends/ChartLegendTypes","esri/dijit/geoenrichment/ReportPlayer/core/charts/legends/ChartLegendPlacements","esri/dijit/geoenrichment/ReportPlayer/core/charts/legends/ChartLegendSymbols","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartDataLabelsTypes","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartBarThickness","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartSorting","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartLineStyles","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartLineMarkers","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/supportClasses/GaugeLabelPlacements","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/supportClasses/WaffleLabelPlacements","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/supportClasses/WaffleDirections","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/supportClasses/WaffleFlowStyles","./_FieldInfoBuilder","dojo/i18n!esri/nls/jsapi"],function(e,t,i,a,r,l,o,n,s,u,c,g,d,p,b,f,y,h,S,m,L){function C(e,t){var i=Number(e);return isNaN(i)?void 0:t?t(i):i}function v(e,t){return C(e,t.revisionVersion>=1.7?r.ptToPx:null)}function w(e){return r.ptToPxObj(r.parseStyleString(e))}function P(e,t,i){return a.queryJson(e,"series",!0)[0].tags.map(function(i){if(!i.tags)return null;i.attributes=i.attributes||{};var n={_originalAttrs:i.attributes,label:i.attributes.Text||"",color:x(i.attributes.color),points:i.tags.map(function(r,n){r.attributes=r.attributes||{};var s=(e.attributes.type===o.GAUGE||e.attributes.type===o.WAFFLE)&&n===i.tags.length-1,u=r.tags&&r.tags[0],c=u&&u.attributes&&u.attributes.f,g=c&&m.getCalculatorOrScriptFieldInfo(c,t);if(g||s){if(s&&(g=null),g&&g.isMissing){var d=r.attributes.Text;if(!d&&t.variableProvider.isPlayerOnly){var p=t.variableProvider.toCalculator(g.templateName);d=p&&p.variable.alias}g.alias=d?d+" ("+L.missingVariable+")":L.missingVariable}var b=r.attributes.CaptionField,f=b&&m.getCalculatorOrScriptFieldInfo(b,t),y=a.queryJson(r,"pointIcon")[0],h=y&&t.parsers.getParser("field").parseField(y.tags[0],y,null,t);return l.createChartPoint(g,r.attributes.Text||"",x(r.attributes.color),h,f)}}).filter(function(e){return!!e})};if(o.isLineLike(e.attributes.type)){n.lineStyle=p.isSupported(i.attributes.lineStyle)?i.attributes.lineStyle:void 0,n.lineMarker=b.isSupported(i.attributes.lineMarker)?i.attributes.lineMarker:void 0,n.lineMarkerColor=x(i.attributes.lineMarkerColor),n.lineMarkerSize=C(i.attributes.lineMarkerSize,r.ptToPx),n.lineMarkerFillColor=x(i.attributes.lineMarkerFillColor),n.fillColor=x(i.attributes.fillColor);var s=a.queryJson(i,"multiFeatureLineStyles")[0];s&&(n.multiFeatureLineStyles=[],s.tags.forEach(function(e){var t={};e.attributes&&(t.color=x(e.attributes.color),t.lineStyle=p.isSupported(e.attributes.lineStyle)?e.attributes.lineStyle:void 0,t.lineMarker=b.isSupported(e.attributes.lineMarker)?e.attributes.lineMarker:void 0,t.lineMarkerColor=x(e.attributes.lineMarkerColor),t.lineMarkerSize=C(e.attributes.lineMarkerSize,r.ptToPx),t.lineMarkerFillColor=x(e.attributes.lineMarkerFillColor),t.lineThickness=C(e.attributes.lineThickness,r.ptToPx),t.fillColor=x(e.attributes.fillColor)),n.multiFeatureLineStyles.push(t)}))}return n}).filter(function(e){return e&&e.points&&!!e.points.length})}function k(t,i,a){var r={gridLines:t.gridlines,gridLinesCentered:t.gridlinesCentered,gridLinesOpacity:C(t.gridlinesOpacity),gridLinesColor:x(t.gridlinesColor),gridLinesThickness:v(t.gridlinesThickness,a),gridLinesStyle:p.isSupported(t.gridlinesStyle)?t.gridlinesStyle:void 0,gridStripes:t.gridStripes,gridStripesColor:x(t.gridStripesColor),gridStripesColorAlt:x(t.gridStripesColorAlt)};return i&&e.mixin(r,{hideBaseLine:void 0!==t.baseLine?!t.baseLine:t.hideBaseLine,baseLineColor:x(t.baseLineColor),baseLineOpacity:C(t.baseLineOpacity),baseLineThickness:v(t.baseLineThickness,a),baseLineStyle:p.isSupported(t.baseLineStyle)?t.baseLineStyle:void 0,baseLineValue:C(t.baseLineValue)}),r}function A(e){return{dataLabels:c.toSupportedValue(e.dataLabels),dataLabelsShowLabelUnder:e.dataLabelsShowLabelUnder,dataLabelsDecimals:T(e.CustomPercentFormat||e.CustomValueFormat),dataLabelsStyle:w(e.dataLabelsStyle),dataLabelsLabelStyle:w(e.dataLabelsLabelStyle?e.dataLabelsLabelStyle:e.dataLabelsStyle),dataLabelsAltColor:x(e.dataLabelsAltColor),dataLabelsEnableAltColor:e.dataLabelsEnableAltColor,dataLabelsInside:e.dataLabelsInside,dataLabelsStackedInColumns:e.dataLabelsStackedInColumns,dataLabelsHorizontalAlign:e.dataLabelsHorizontalAlign,dataLabelsVerticalAlign:e.dataLabelsVerticalAlign,dataLabelsShowValuePercentSymbol:e.dataLabelsShowValuePercentSymbol,dataLabelsShowValueCurrencySymbol:e.dataLabelsShowValueCurrencySymbol,dataLabelsAngle:C(e.dataLabelsAngle),dataLabelsMaxWidth:C(e.dataLabelsMaxWidth,r.ptToPx)}}function O(e){var t=a.queryJson(e,"BackImage")[0];return t&&t.tags&&t.tags[0].text?i.base64DataToDataURL(t.tags[0].text):null}function T(e){return"string"!=typeof e?0:(e=e.replace("%",""),"0"===e?0:e.replace("0.","").length)}function x(e){return e&&"string"==typeof e&&(e=6===e.length&&-1===e.indexOf("#")?"#"+e:t.toCSSColor(e)),e}L=L.geoenrichment.dijit.ReportPlayer.ReportPlayer;var M={};return M.portalToEditor=function(t,i,c){if(!o.isSupported(t.attributes.type))throw new Error("Chart type is not supported.");var m,L=a.queryJson(t,"comparisonInfo")[0];if(L){var T=L.attributes,M=T.name,B=c.templateJson.metadata.comparisonCalculatorsHash[M];B&&(m={calculatorName:M,chartType:T.chartType,color:x(T.color),lineThickness:v(T.lineThickness,c),lineStyle:p.isSupported(T.lineStyle)?T.lineStyle:void 0,lineMarker:b.isSupported(T.lineMarker)?T.lineMarker:void 0,lineMarkerColor:x(T.lineMarkerColor),lineMarkerSize:C(T.lineMarkerSize,r.ptToPx),lineMarkerFillColor:x(T.lineMarkerFillColor),levels:B.levels,defaultLevel:T.defaultLevel})}var I=P(t,c,m);if(!I.length)return null;var F=t.attributes,V=a.queryJson(t,"chartTitle")[0],R=a.queryJson(t,"legend")[0],j=a.queryJson(t,"xAxis")[0],J=a.queryJson(t,"yAxis")[0],W=a.queryJson(t,"chartIcon"),D=a.queryJson(t,"floatingIcon"),G=a.queryJson(t,"floatingText"),q=a.queryJson(t,"trigger"),N=a.queryJson(t,"filter")[0];V.attributes=V.attributes||{};var E=j&&j.attributes,H=J&&J.attributes,U=E,_=H;c.isGraphicReport&&c.revisionVersion<1.3&&(U=H,_=E);var z=j&&j.tags&&j.tags[0].attributes&&j.tags[0].attributes,X=J&&J.tags&&J.tags[0].attributes&&J.tags[0].attributes,Z=O(t),K={isChart:!0,type:F._type||F.type,isMultiFeatureChart:!!F.isMultiFeatureChart,seriesItems:I,visualProperties:e.mixin({barBorders:F.barBorders,view3D:!!F.view3D,origin:C(F.origin),width:r.ptToPx(F.width),height:r.ptToPx(F.height),marginTop:C(F.marginTop,r.ptToPx),marginRight:C(F.marginRight,r.ptToPx),marginBottom:C(F.marginBottom,r.ptToPx),marginLeft:C(F.marginLeft,r.ptToPx),backgroundColor:x(F.backColor),backgroundColorOpacity:C(F.backgroundColorOpacity),plotAreaOutlineColor:x(F.plotAreaOutlineColor),plotAreaOutlineOpacity:C(F.plotAreaOutlineOpacity),plotAreaOutlineThickness:C(F.plotAreaOutlineThickness,r.ptToPx),plotAreaOutlineStyle:p.isSupported(F.plotAreaOutlineStyle)?F.plotAreaOutlineStyle:void 0,panelBackgroundColor:x(F.panelBackgroundColor),backgroundImageData:Z,title:{text:V.attributes.text,align:V.attributes.align&&V.attributes.align.toLowerCase(),style:w(V.attributes.style),verticalShift:C(V.attributes.verticalShift,r.ptToPx)},xAxis:E&&e.mixin({show:"None"!==E.placement,hideLine:void 0!==E.line?!E.line:E.hideLine,showTicks:E.ticks,ticksInside:E.ticksInside||void 0,hideLabels:E.hideLabels||void 0,placement:"OtherSide"===E.placement?"OtherSide":void 0,title:z&&z.text,titleStyle:z&&w(z.style),style:w(E.style),labelsAngle:C(E.labelsAngle),lineColor:x(E.lineColor)},k(U,!1,c)),yAxis:H&&e.mixin({show:"None"!==H.placement,hideLine:void 0!==H.line?!H.line:H.hideLine,showTicks:H.ticks,ticksInside:H.ticksInside,hideLabels:H.hideLabels||void 0,placement:"OtherSide"===H.placement?"OtherSide":void 0,title:X&&X.text,titleStyle:X&&w(X.style),style:w(H.style),labelsAngle:C(H.labelsAngle),lineColor:x(H.lineColor),showPercentSymbol:H.showPercentSymbol,showCurrencySymbol:H.showCurrencySymbol,showSymbolForAllLabels:H.showSymbolForAllLabels,showValuesAsWeightsInSeries:H.showValuesAsWeightsInSeries,nonZeroInclusive:H.nonZeroInclusive},k(_,!0,c)),isStacked:F.isStacked,showValuesAsWeightInStack:F.showValuesAsWeightInStack,columnBarGap:C(F.columnBarGap,r.ptToPx),columnBarOpacity:C(F.columnBarOpacity),renderColumnBarsInOppositeDirections:F.renderColumnBarsInOppositeDirections,showColumnBarBackground:F.showColumnBarBackground,columnBarBackgroundColor:x(F.columnBarBackgroundColor),columnBarBackgroundOpacity:C(F.columnBarBackgroundOpacity),fillOpacity:C(F.fillOpacity),outlineOpacity:C(void 0!==F.columnBarLineOpacity?F.columnBarLineOpacity:F.outlineOpacity),outlineColor:x(void 0!==F.columnBarLineColor?F.columnBarLineColor:F.outlineColor),outlineThickness:C(void 0!==F.columnBarLineThickness?F.columnBarLineThickness:F.outlineThickness,r.ptToPx),outlineStyle:void 0!==F.columnBarLineStyle?p.isSupported(F.columnBarLineStyle)?F.columnBarLineStyle:void 0:p.isSupported(F.outlineStyle)?F.outlineStyle:void 0,lineOpacity:C(void 0!==F.lineOpacity?F.lineOpacity:F.lineAreaOpacity),fillLineMarkers:void 0!==F.fillLineMarkers?F.fillLineMarkers:F.fillLineArea,lineMarkersFillOpacity:C(void 0!==F.lineMarkersFillOpacity?F.lineMarkersFillOpacity:F.lineAreaOpacity),fillLineArea:F.fillLineArea,lineAreaOpacity:C(F.lineAreaOpacity),donutHolePercent:C(F.donutHolePercent),donutGap:C(F.donutGap),donutArcPercent:C(F.donutArcPercent),gaugeHolePercent:C(F.gaugeHolePercent),gaugeRangeMin:C(F.gaugeRangeMin),gaugeRangeMax:C(F.gaugeRangeMax),gaugeGap:C(F.gaugeGap),gaugeStartAngle:C(F.gaugeStartAngle),gaugeArcPercent:C(F.gaugeArcPercent),gaugeLabelStyle:w(F.gaugeLabelStyle),gaugeLabelPlacement:F.gaugeLabelPlacement?f.toSupportedValue(F.gaugeLabelPlacement):void 0,gaugeShowArrow:F.gaugeShowArrow||void 0,gaugeArrowLineColor:x(F.gaugeArrowLineColor),gaugeArrowFillColor:x(F.gaugeArrowFillColor),gaugeConditionalStylingOthers:void 0!==F.gaugeConditionalStylingIgnoreOthers?F.gaugeConditionalStylingIgnoreOthers:F.gaugeConditionalStylingOthers||void 0,gaugeConditionalStylingLabel:F.gaugeConditionalStylingLabel||void 0,gaugeShowFromToLabels:F.gaugeShowFromToLabels||void 0,gaugeFromLabelStyle:w(F.gaugeFromLabelStyle),gaugeToLabelStyle:w(F.gaugeToLabelStyle),waffleDirection:F.waffleDirection?h.toSupportedValue(F.waffleDirection):void 0,waffleFlowStyle:S.isSupported(F.waffleFlowStyle)?F.waffleFlowStyle:void 0,waffleShowWholePictures:F.waffleShowWholePictures||void 0,waffleStretchIconsToFill:F.waffleStretchIconsToFill||void 0,waffleRangeMin:C(F.waffleRangeMin),waffleRangeMax:C(F.waffleRangeMax),waffleLabelPlacement:F.waffleLabelPlacement?y.toSupportedValue(F.waffleLabelPlacement):void 0,waffleLabelOffset:C(F.waffleLabelOffset,r.ptToPx),waffleHideValue:F.waffleHideValue||void 0,waffleHideLabel:F.waffleHideLabel||void 0,waffleShowLabelAbove:F.waffleShowLabelAbove||void 0,waffleValueStyle:w(F.waffleValueStyle),waffleLabelStyle:w(F.waffleLabelStyle),waffleColumnSpace:C(F.waffleColumnSpace,r.ptToPx),waffleRowSpace:C(F.waffleRowSpace,r.ptToPx),waffleConditionalStylingOthers:void 0!==F.waffleConditionalStylingIgnoreOthers?F.waffleConditionalStylingIgnoreOthers:F.waffleConditionalStylingOthers||void 0,waffleConditionalStylingValue:F.waffleConditionalStylingValue||void 0,waffleConditionalStylingLabel:F.waffleConditionalStylingLabel||void 0,waffleNumIcons:C(F.waffleNumIcons),waffleNumRows:C(F.waffleNumRows),waffleNumColumns:C(F.waffleNumColumns),ringBackgroundColor:x(F.ringBackgroundColor),ringBackgroundOpacity:C(F.ringBackgroundOpacity),columnBarShowWholePictures:void 0!==F.showWholePictures?F.showWholePictures:F.columnBarShowWholePictures,showAxisIcons:F.showAxisIcons,showChartIcons:F.showChartIcons,sorting:d.isSupported(F.sorting)?F.sorting:void 0},A(F))},Q=C(I[0]._originalAttrs.thickness);if(o.isColumnBarLike(F.type)?K.visualProperties.columnThickness=Q>1?g.LARGE:Q<1?g.SMALL:g.MEDIUM:o.isLineLike(F.type)&&(K.visualProperties.lineThickness=v(Q,c),I.forEach(function(e){e._originalAttrs.thickness!==Q&&(e.lineThickness=C(e._originalAttrs.thickness,r.ptToPx))})),I.forEach(function(e){delete e._originalAttrs}),R){var Y=R&&R.attributes||{};K.visualProperties.legend={type:n.toSupportedValue(Y.type)},K.visualProperties.legend.type===n.MIN_MAX?e.mixin(K.visualProperties.legend,{minMax:{placement:s.toSupportedValue(Y.placement),placementOffset:C(Y.placementOffset),titleStyle:w(Y.titleStyle),minVariableLabelStyle:w(Y.minVariableLabelStyle),maxVariableLabelStyle:w(Y.maxVariableLabelStyle)}}):e.mixin(K.visualProperties.legend,{series:{placement:s.toSupportedValue(Y.placement),placementOffset:C(Y.placementOffset),hasBorder:Y.hasBorder,labelParts:Y.labelParts,style:w(Y.style),symbol:u.isSupported(Y.symbol)?Y.symbol:void 0,hideOthers:Y.hideOthers||void 0,showComparison:Y.showComparison||void 0}})}c.revisionVersion<1.2&&(void 0!==K.visualProperties.donutGap&&(K.visualProperties.donutGap/=2*Math.PI),void 0!==K.visualProperties.gaugeGap&&(K.visualProperties.gaugeGap/=2*Math.PI)),W&&W.length&&(K.visualProperties.chartIcons=W.map(function(e){return e.tags&&e.tags[0]?c.parsers.getParser("field").parseField(e.tags[0],e,null,c):null})),D&&D.length&&(K.visualProperties.floatingIcons=D.map(function(e){return c.parsers.getParser("section").parseTable(e.tags[0],c)})),G&&G.length&&(K.visualProperties.floatingTexts=G.map(function(e){return c.parsers.getParser("section").parseTable(e.tags[0],c)})),q&&q.length&&(K.visualProperties.conditionalStyling=c.parsers.getParser("field").parseFieldTrigger(q[0])),N&&(K.visualProperties.filter=c.parsers.getParser("filter").getFilter(N)),K.comparisonInfo=m;var $={};return i.attributes&&i.attributes.style&&e.mixin($,r.parseStyleString(i.attributes.style)),r.ptToPxObj($),l.provideDefaultValueForMissing(K,{font:$}),c.postProcessChartJson(t,K),K},M});
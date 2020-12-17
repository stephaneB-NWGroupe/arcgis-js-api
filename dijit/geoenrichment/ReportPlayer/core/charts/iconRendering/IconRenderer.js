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

define(["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dijit/Destroyable","../utils/ChartTypes","../utils/builder/ChartPlots","../utils/plots/supportClasses/GaugeLabelPlacements","../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder","../../supportClasses/tableJson/TableJsonUtil","../../infographics/utils/InfographicThemeUtil","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/DomUtil"],(function(e,t,i,o,n,r,s,a,c,l,h,d,u,p){var f=e(o,{renderIcons:function(e){this._destroyIcons();var t=this._getRenderFunction(e.chartType);t&&this[t](e),this._renderFloatingIcons(e)},_getRenderFunction:function(e){switch(e){case n.GAUGE:case n.DONUT:return"_renderDonutIcons";case n.RING:return"_renderRingIcons";case n.COLUMN:return"_renderColumnIcons";case n.BAR:return"_renderBarIcons"}return null},_renderDonutIcons:function(e){if(e.visualProperties.showChartIcons){var o=e.chart.getPlot(r.PRIMARY).getRenderResults();if(o){var a=t.create("div",{class:"chartContainer_chartIcon"},e.iconNode),c=o.radiusInner,l=0,h=1;e.chartType===n.GAUGE&&(h=Math.max(.6,o.ryMultiplier),e.visualProperties.gaugeLabelPlacement===s.INSIDE&&(l=o.chartIconOffset,c=Math.min(c,o.maxIconSize)));var d=(e.chartH/h-c+l)/2+(o.chartShiftY||0);d=Math.min(d,e.chartH-c-10),i.set(a,{width:c+"px",height:c+"px",left:(e.chartW-c)/2+(o.chartShiftX||0)+"px",top:d+"px"});var u=e.visualProperties.chartIcons&&e.visualProperties.chartIcons[0];this._createIconSection(e,u||this._getDefaultIcon(),c,a)}}},_renderRingIcons:function(e){if(e.visualProperties.showChartIcons){var o=e.chart.getPlot(r.PRIMARY).getRenderResults();if(o){o.slicePies.sort((function(e,t){return e.r-t.r}));var n=o.slicePies[0],s=o.slicePies[o.slicePies.length-1],a=t.create("div",{class:"chartContainer_chartIcon"},e.iconNode),c=0;o.labels?(c=Math.max(50,.8*Math.min(2*n.r,Math.min(o.maxLabelWidth,e.chartW-(s.cx+s.r)))),i.set(a,{width:c+"px",height:c+"px",left:Math.max(s.cx+s.r+15,s.cx+s.r+o.maxLabelWidth/2-c/2)+"px",top:s.cy-c/2+"px"})):(c=1.4*n.r,i.set(a,{width:c+"px",height:c+"px",left:n.cx-c/2+"px",top:n.cy-c/2+"px"}));var l=e.visualProperties.chartIcons&&e.visualProperties.chartIcons[0];this._createIconSection(e,l||this._getDefaultIcon(),c,a)}}},_renderColumnIcons:function(e){this._renderAxisIcons(e,!0)},_renderBarIcons:function(e){this._renderAxisIcons(e,!1)},_renderAxisIcons:function(e,o){if(e.visualProperties.showAxisIcons){var n=this,s=e.chart.calculateGeometry(),a=e.chart.getPlot(r.PRIMARY).getMainShapes();if(a&&a.length){var c={};a.forEach((function(e){(c[e.value.x]=c[e.value.x]||[]).push(e.rawNode)}));var l=Object.keys(c).map((function(e){return Number(e)}));l.sort();var h,d,f=l.map((function(e){return p.uniteNodeBoxes(c[e])}));s.series[0].data.forEach((function(e,t){var i,o="number"==typeof e.originalIndex?e.originalIndex:e.unsortedIndex;void 0!==o&&((h=h||{})[t]=o),d=d||{},s.series.some((function(e){var o=e.data[t];if(o&&o.fill&&!u.isTransparent(o.fill))return i=o.fill,!0})),d[t]=i}));var I=p.noTransformPosition(e.iconNode);f.forEach((function(r,a){var c=h?h[a]:a,l=e.visualProperties.chartIcons&&e.visualProperties.chartIcons[c]||n._getDefaultIcon();if(l){var u=(l.imageJson||l.shapeJson).style.zoom||1,p=t.create("div",{class:"chartContainer_chartIcon"},e.iconNode),g=Math.min(50,.7*(o?s.plotArea.width:s.plotArea.height)/f.length),_=g*u;i.set(p,{width:_+"px",height:_+"px"});var m=e.visualProperties.xAxis.show?0:g/(o?2:3.5),v=-(_-g)/2;o?i.set(p,{left:r.x-I.x+(1*r.w-g)/2+v+"px",bottom:-g+m+v+"px"}):i.set(p,{top:r.y-I.y+(1*r.h-g)/2+v+"px",left:-g+m+v+"px"}),n._createIconSection(e,l,_,p,c,d&&d[a],g)}}))}}},_floatingIconsSection:null,_renderFloatingIcons:function(e){var t=e.visualProperties.floatingIcons;if(t&&t.length){t.forEach((function(t){var i=t.data.data[0].fieldInfos[t.data.columns[0].field].shapeJson,o=e.viewModel.getChartDefaultStyles(e.theme);l.applyThemeSettingsToShapeJson(i,o)}));var i={class:"chartContainer_floatingIconSection"};i.initialWidth=e.chartW,i.initialHeight=e.chartH,i.json={type:h.DETAILS,stack:t},i.viewModel=e.viewModel,i.theme=e.theme,i.tableClass="chartContainerFloatingIconTable",i.parentWidget=e.parentWidget,i.initialViewMode=this._viewMode||d.EDIT,this._provideParamsForFloatingIconSection(i,e),this._floatingIconsSection=e.viewModel.layoutBuilder.createElement("section",i,e.iconNode)}},_provideParamsForFloatingIconSection:function(e,t){},_getDefaultIcon:function(){},_iconSections:null,_createIconSection:function(e,t,i,o,n,r,s){if(t&&(t.imageJson||t.shapeJson)){if(t.shapeJson){var u=e.viewModel.getChartDefaultStyles(e.theme);l.applyThemeSettingsToShapeJson(t.shapeJson,u),t.shapeJson.themeStyle&&r&&(t.shapeJson.themeStyle.borderColor=r,t.shapeJson.themeStyle.fillColor=r)}var p=c.createSingleCellTable({width:i,height:i,fieldInfo:t.imageJson?a.createFieldInfoFromImage(t.imageJson):a.createFieldInfoFromShape(t.shapeJson),cellStyle:{backgroundColor:"transparent"}}),f={};f.initialWidth=i,f.initialHeight=i,f.json={type:h.DETAILS,stack:[p]},f.viewModel=e.viewModel,f.theme=e.theme,f.tableClass="chartContainerIconTable",f.parentWidget=e.parentWidget,f.initialViewMode=this._viewMode||d.EDIT,this._provideParamsForIconSection(f,e);var I=e.viewModel.layoutBuilder.createElement("section",f,o);I.__originalIndex=n,I.__noZoomIconSize=s,this._iconSections.push(I)}},_getSectionInitialSettings:function(e){return{originalIndex:e&&void 0!==e.__originalIndex?e.__originalIndex:-1,noZoomIconSize:e&&e.__noZoomIconSize}},_provideParamsForIconSection:function(e,t,i,o){},_viewMode:null,setViewMode:function(e){this._viewMode!==e&&(this._viewMode=e,this._iconSections&&this._iconSections.forEach((function(t){t.setViewMode(e)})),this._floatingIconsSection&&this._floatingIconsSection.setViewMode(e))},_destroyIcons:function(){this._iconSections=this._iconSections||[],this._iconSections.forEach((function(e){var i=e.domNode&&e.domNode.parentNode;e.destroy(),i&&t.destroy(i)})),this._iconSections.length=0,this._floatingIconsSection&&this._floatingIconsSection.destroy(),this._floatingIconsSection=null},destroy:function(){this._destroyIcons(),this.inherited(arguments)}});return f.AXIS_ICON_MAX_SIZE=50,f}));
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

define(["dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dijit/registry","dijit/_WidgetBase","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/_base/Color","dojox/charting/Chart","dojox/charting/plot2d/Grid","dojox/charting/plot2d/Markers","dojox/charting/themes/ThreeD","dojox/charting/SimpleTheme","dojox/charting/widget/SelectableLegend","dojox/charting/action2d/Magnify","dojox/charting/action2d/Highlight","dojox/charting/action2d/Tooltip","../../request","../../graphic","../../TimeExtent","../../layers/DimensionalDefinition","../../layers/RasterFunction","dojo/i18n!../../nls/jsapi","dojo/text!./templates/DimensionalProfile.html","xstyle/css!./css/MultiDimensionalProfile.css"],function(t,i,e,r,s,o,n,a,l,h,c,_,m,u,d,f,p,g,x,y,R,S,C,M,v,b){return i([o,n,a,l],{declaredClass:"esri.dijit.MultiDimensionalProfile",baseClass:"esriMultiDimensionalChart",templateString:b,SERIES_NAME_DIMENSIONS:"Dimensions",SERIES_NAME_LEGEND:"Point",_samplingDataCount:50,_reduceDataPoints:!0,_chartRenderingOptions:null,_defaultXAxisRange:{min:Number.MAX_VALUE,max:Number.MIN_VALUE},_defaultYAxisRange:{min:0,max:100},_xAxisRange:null,_yAxisRange:null,_profileResults:[],_maxResultCount:4,_map:null,_layers:[],_dimension:null,_variable:null,_chart:null,_valueIndicator:[],_drawProfileGeometry:!0,_mapGraphics:[],_chartLocationGraphic:null,_posIndicator:null,_negIndicator:null,_chartLocationGraphicsLayer:null,_defaultMapSymbol:{type:"esriSMS",style:"esriSMSCross",color:[0,0,0,0],size:13,angle:0,xoffset:0,yoffset:0,outline:{type:"esriSLS",style:"esriSLSSolid",color:[0,0,0,255],width:3}},_profileSeries:[{stroke:"#ff00a9",fill:""},{stroke:"#00ff00",fill:""},{stroke:"#ff5722",fill:""},{stroke:"#0900ff",fill:""},{stroke:"#845422",fill:""},{stroke:"#6C618D",fill:""}],_highlightColor:"#ffff00",_highlightSeriesName:"Current Selection",constructor:function(t){this._layers=[],this._i18n=v,t.hasOwnProperty("map")&&(this._map=t.map),t.hasOwnProperty("layers")&&t.layers.forEach(function(t){t.options=this._updateLayerOptions(t),this._layers.push(t)},this),this._layers.length>1&&(this._maxResultCount=this._layers.length),t.hasOwnProperty("dimension")&&(this._dimension=t.dimension),t.hasOwnProperty("variable")&&(this._variable=t.variable),this._chartRenderingOptions=e.mixin({xAxisTitle:"X",yAxisTitle:"Y",chartFontFamily:"verdana",chartTitleFontSize:13,axisTitleFontSize:11,axisLabelFontSize:9,indicatorFontColor:"#eee",indicatorFillColor:"#666",titleFontColor:"#eee",axisFontColor:"#ccc",axisMajorTickColor:"#333",profileBackgroundTopColor:[250,250,250,.8],profileBackgroundBottomColor:[229,230,235,.7],profileLineColor:"#D2B48C",profileTopColor:"#8B4513",profileBottomColor:"#CD853F",indicatorMarkerStrokeColor:"#FF0000",indicatorMarkerSymbol:"m -6 -6, l 12 12, m 0 -12, l -12 12",profileGeometrySymbol:this._defaultMapSymbol},t.chartOptions||{})},postCreate:function(){this.inherited(arguments),null!==s.getEnclosingWidget(this.domNode)&&this.own(t.after(s.getEnclosingWidget(this.domNode),"resize",e.hitch(this,this.resize),!0))},startup:function(){this.inherited(arguments),this._map&&this._layers.length&&this._dimension?this.map.loaded?this._initProfile():this.map.on("load",e.hitch(this,this._initProfile)):(this.emit("error",new Error(this._i18n.widgets.DimensionalProfile.errors.MissingInputParameters)),this.destroy())},clear:function(){this._clearProfileGeometriesOnMap(),this._resetProfileResults(),this._clearIndicators(),this._clearChart(),this.emit("clear")},refresh:function(){this.emit("refresh")},update:function(t){if(!t)return void this.emit(new Error(this._i18n.widgets.DimensionalProfile.errors.InvalidProfileResults));var i=this._reduceProfileResults(e.mixin({},t));this._updateProfileResults(i),this._updateChart(i),this._updateGraphic(i),this._updateIndicators(),this.emit("update",i)},resize:function(){this.inherited(arguments),this._chart&&this._chart.resize()},destroy:function(){this._chart&&this._chart.destroy(),this.inherited(arguments)},_updateLayerOptions:function(t){if(!t||!t.options)return{};var i=e.mixin({},t.options),r=t.options.renderingRule;if(r){var s=new M(r);s.functionName=r,i.renderingRule=s}return i},_setProfileGeometryAttr:function(t){t?(this._map.setMapCursor("progress"),this._clearMapTime(),this._layers.forEach(e.hitch(this,function(i){var r=this._createNewMapGraphic(t);this._drawProfileGeometryOnMap(r),this._getProfile(i,r).then(e.hitch(this,function(t){this._map.setMapCursor("default"),this.update(t)}),e.hitch(this,function(t){this._map.setMapCursor("default"),this.emit("error",t)}))}))):this.emit("error",new Error(this._i18n.widgets.DimensionalProfile.errors.NullGeometry))},_setTitleAttr:function(t){this._chart&&(this._chart.title=t,this._chart.dirty=!0,this._chart.render(),this.emit("title-changed"))},_resetProfileResults:function(){this._xAxisRange=e.mixin({},this._defaultXAxisRange),this._yAxisRange=e.mixin({},this._defaultYAxisRange),this._profileResults=[]},_initProfile:function(){this._buildProfileSeries(),this._getDefaultDimensionalRange().then(e.hitch(this,function(t){this._defaultXAxisRange=t,this._resetProfileResults(),this._buildChart(),this.emit("load")}))},_buildProfileSeries:function(){var t,i,e,r,s,o,n=0,a=2===this._layers.length,l=this._layers[0].options;if(t=i=l&&l.legendLabel,r=s=l&&l.seriesColor,a){var h=this._layers[1].options;e=h&&h.legendLabel,o=h&&h.seriesColor}var c;for(n;n<this._maxResultCount;n++)n<this._profileSeries.length&&a?(t=0===Math.abs(n%2)?i:e,r=0===Math.abs(n%2)?s:o):n<this._profileSeries.length&&!a&&i?t=i+" "+n:n>=this._profileSeries.length&&(c="#"+Math.floor(16777215*Math.random()).toString(16),this._profileSeries.push({stroke:c,fill:""})),r&&(this._profileSeries[n].stroke=r),this._profileSeries[n].name=this.SERIES_NAME_DIMENSIONS+"_"+n,this._profileSeries[n].legend=t||this.SERIES_NAME_LEGEND+" "+n},_buildChart:function(){var t=new c(this._chartNode,{title:this._chartRenderingOptions.title,titlePos:"top",titleGap:10,titleFont:e.replace("normal normal bold {chartTitleFontSize}pt {chartFontFamily}",this._chartRenderingOptions),titleFontColor:this._chartRenderingOptions.titleFontColor});if(2===this._layers.length){var i=new d({markers:{CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z"}});t.setTheme(i)}else t.setTheme(u);t.fill="transparent",t.theme.axis.stroke.width=2,t.theme.axis.majorTick.color=h.named.white.concat(.5),t.theme.axis.majorTick.width=1,t.theme.plotarea.fill={type:"linear",space:"plot",x1:50,y1:100,x2:50,y2:0,colors:[{offset:0,color:this._chartRenderingOptions.profileBackgroundTopColor},{offset:1,color:this._chartRenderingOptions.profileBackgroundBottomColor}]},t.addAxis("y",{min:this._yAxisRange.min,max:this._yAxisRange.max,fontColor:this._chartRenderingOptions.axisFontColor,font:e.replace("normal normal bold {axisLabelFontSize}pt {chartFontFamily}",this._chartRenderingOptions),vertical:!0,natural:!0,fixed:!0,includeZero:!1,majorLabels:!0,minorLabels:!0,majorTicks:!0,minorTicks:!0,majorTick:{color:this._chartRenderingOptions.axisMajorTickColor,length:6},title:this._chartRenderingOptions.yAxisTitle,titleGap:30,titleFont:e.replace("normal normal bold {axisTitleFontSize}pt {chartFontFamily}",this._chartRenderingOptions),titleFontColor:this._chartRenderingOptions.titleFontColor,titleOrientation:"axis"}),t.addAxis("x",{min:this._xAxisRange.min,max:this._xAxisRange.max,fontColor:this._chartRenderingOptions.axisFontColor,font:e.replace("normal normal bold {axisLabelFontSize}pt {chartFontFamily}",this._chartRenderingOptions),natural:!0,fixed:!0,includeZero:!1,majorLabels:!0,minorLabels:!0,majorTicks:!0,minorTicks:!0,majorTick:{color:this._chartRenderingOptions.axisMajorTickColor,length:6},title:this._chartRenderingOptions.xAxisTitle,titleGap:5,titleFont:e.replace("normal normal bold {axisTitleFontSize}pt {chartFontFamily}",this._chartRenderingOptions),titleFontColor:this._chartRenderingOptions.titleFontColor,titleOrientation:"away",labelFunc:e.hitch(this,this._formatChartValues)}),t.addPlot("grid",{type:_,hMajorLines:!0,hMinorLines:!1,vMajorLines:!1,vMinorLines:!1}),t.addPlot("default",{type:m,tension:"X"});var r={plot:"default",stroke:{width:1.5,color:this._chartRenderingOptions.profileLineColor},fill:this._chartRenderingOptions.profileTopColor},s=e.clone(r);s.stroke.width=5,s.stroke.color=this._highlightColor,s.fill=this._highlightColor,t.addSeries(this._highlightSeriesName,[],s);var o,n=0;for(n;n<this._maxResultCount;n++)o=e.clone(r),o.stroke.color=this._profileSeries[n].stroke,o.fill=this._profileSeries[n].stroke,o.legend=this._profileSeries[n].legend,t.addSeries(this._profileSeries[n].name,[],o);new p(t,"default",{scale:3}),new g(t,"default"),new x(t,"default");t.render(),t.connectToPlot("default",e.hitch(this,function(t){if("onclick"===t.type){var i=t.run.data[t.index]||t;this._chart.updateSeries(this._highlightSeriesName,[i]),this._chart.render();var e=i?new Date(i.closestXValue||i.x):new Date(t.x);this._setMapTime(e,e)}}));var a=new f({chart:t,autoScale:!0},this._chartLegendNode);this._chart=t,this._chartLegend=a},_formatChartValues:function(t,i){return this._dimension&&"stdtime"===this._dimension.toLowerCase()?new Date(i).toUTCString().substring(5,16):i},_chartTooltipForX:function(t){if(t){var i=t.x||t;return this._dimension&&"stdtime"===this._dimension.toLowerCase()&&(i=new Date(i).toUTCString().substring(5,16)),this._chartRenderingOptions.xAxisTitle+": "+i}},_chartTooltipForY:function(t){if(t){var i=t.y||t;return i="string"==typeof i?parseFloat(i):i,this._chartRenderingOptions.yAxisTitle+": "+i.toFixed(3)}},_getProfile:function(t,i){var s=t.layer,o=i&&i.geometry;if(!s||!i||!o)return new Error(this.strings.errors.UnableToProcessResults);var n={f:"json",geometry:JSON.stringify(o.toJson()),geometryType:"esriGeometryPoint",returnGeometry:!1,returnCatalogItems:!0},a=t.options,l=s.mosaicRule||s.defaultMosaicRule;if(a.variable&&l){var h=e.clone(l);h.multidimensionalDefinition.push(new C({variableName:a.variable})),n.mosaicRule=JSON.stringify(h.toJson())}var c=["value"],_=a&&a.renderingRule||s.renderingRule;return _&&(c.push(_.functionName.toLowerCase()),n.renderingRule=JSON.stringify(_.toJson())),(a&&a.hasOwnProperty("useMapTime")?a.useMapTime:s.useMapTime)&&this._map.timeExtent&&(n.time=this._map.timeExtent.toJson().join(",")),y({url:s.url+"/identify",handleAs:"json",content:n}).then(e.hitch(this,function(t){if(t&&!(t.catalogItems.length<1)){var e=t.catalogItems.features,o=[],n=this._getLayerVariable(s);return r.forEach(e,function(i,e){var r=t.properties.Values[e],s=i.attributes;if(r&&"nodata"!==r.toLowerCase()&&(!n||s.Variable.toLowerCase()===n.toLowerCase())){var a={x:s[this.dimension],y:r,tooltip:this._chartTooltipForX(s[this.dimension])+" , "+this._chartTooltipForY(r)};o.push(a)}},this),{values:o,graphic:i}}}),e.hitch(this,function(){return new Error(this.strings.errors.UnableToProcessResults)}))},_updateProfileResults:function(t){if(t){this._profileResults.length===this._profileSeries.length?(t.series=this._profileResults[0].series,this._profileResults.shift()):t.series=this._profileSeries[this._profileResults.length],t.values.sort(function(t,i){return t.x-i.x}),this._profileResults.push(t);var i,s,o={min:Number.MAX_VALUE,max:Number.MIN_VALUE};i=e.mixin({},o),s=e.mixin({},o),r.forEach(this._profileResults,function(t){var e=this._getArrayMin(t.values,"x"),r=this._getArrayMax(t.values,"x"),o=this._getArrayMin(t.values,"y"),n=this._getArrayMax(t.values,"y");i.min=e<i.min?e:i.min,i.max=r>i.max?r:i.max,s.min=o<s.min?o:s.min,s.max=n>s.max?n:s.max},this),this._xAxisRange=i,this._yAxisRange=s,this._yAxisRange.min=s.min-.03*s.min,this._yAxisRange.max=s.max+.03*s.max}},_updateChart:function(t){if(this._chart){if(this._chart.getAxis("x").opt.min=this._xAxisRange.min,this._chart.getAxis("x").opt.max=this._xAxisRange.max,this._chart.getAxis("y").opt.min=this._yAxisRange.min,this._chart.getAxis("y").opt.max=this._yAxisRange.max,this._chart.dirty=!0,t){var i=t.series.name;this._chart.updateSeries(i,t.values)}this._chart.render(),this._chartLegend.refresh()}},_clearChart:function(){if(this._chart){var t;for(t=0;t<this._chart.series.length;t++)this._chart.updateSeries(this._chart.series[t].name,[]);this._chart.render(),this._chartLegend.refresh(),this._clearMapTime()}},_clearIndicators:function(){this._valueIndicator&&(r.forEach(this._valueIndicator,function(t){t.destroy(),t=null}),this._valueIndicator=[])},_updateIndicators:function(){if(this._chart){this._clearIndicators();var t,i,r,s={mouseOver:!0,font:"normal normal bold 8pt Tahoma",fontColor:this._chartRenderingOptions.indicatorFontColor,fill:this._chartRenderingOptions.indicatorFillColor,markerFill:"none",markerStroke:{color:this._chartRenderingOptions.indicatorMarkerStrokeColor,width:3},markerSymbol:this._chartRenderingOptions.indicatorMarkerSymbol},o=0;for(o;o<this._profileResults.length;o++)t=this._getSeriesLegend(this.SERIES_NAME_DIMENSIONS+"_"+o),i={label:t||this._chartRenderingOptions.yAxisTitle},r={labelFunc:e.hitch(i,this._chartTooltipForY)},e.mixin({series:this.SERIES_NAME_DIMENSIONS+"_"+o,offset:{x:10,y:20*(o+1)}},r,s);this._chart.fullRender()}},_getSeriesLegend:function(t){var i=this._chart.getSeries(t);return i?i.legend:""},_createNewMapGraphic:function(t){if(this._map&&t){var i=this._chartRenderingOptions.profileGeometrySymbol,e=i.hasOwnProperty("type")?i:i.toJson();return"esriSMS"!==e.type&&"esriPMS"!==e.type&&(e=this._defaultMapSymbol),new R({geometry:t,symbol:e})}},_drawProfileGeometryOnMap:function(t){if(this._map&&t&&this._drawProfileGeometry){if(this._mapGraphics.length===this._maxResultCount){var i=this._mapGraphics[0];this._map.graphics.remove(i),this._mapGraphics.shift()}this._mapGraphics.push(t),this._map.graphics.add(t)}},_updateGraphic:function(t){if(t&&t.graphic){var i=t.graphic,e=t.series;e&&(i.symbol.color=new h(e.stroke),i.symbol.outline.color=new h(e.stroke),i.draw())}},_clearProfileGeometriesOnMap:function(){this._mapGraphics&&(r.forEach(this._mapGraphics,function(t){this._map.graphics.remove(t)},this),this._mapGraphics=[])},_reduceProfileResults:function(t){var i=t.values;if(!this._reduceDataPoints||i.length<3*this._samplingDataCount)return t;var e,r,s,o,n,a,l,h,c,_,m=[],u=this._samplingDataCount/3,d=Math.ceil(i.length/u),f=[];for(e=0;e<d;e++)r=0===e?e*u:e*u+1,s=(e+1)*u,f=i.slice(r,s),o=this._getArrayMin(f,"x"),a=this._getArrayMax(f,"x"),n=this._getArrayMin(f,"y"),l=this._getArrayMax(f,"y"),h=(o+a)/2,c=(n+l)/2,_=this._findClosestValue(h,f,"x"),m.push({x:h,y:c,tooltip:this._chartTooltipForX(h)+" , "+this._chartTooltipForY(c),closestXValue:_});return t.values=m,t},_getArrayMax:function(t,i){var e=r.map(t,function(t){return t[i]});return Math.max.apply(Math,e)},_getArrayMin:function(t,i){var e=r.map(t,function(t){return t[i]});return Math.min.apply(Math,e)},_getLayerVariable:function(t){var i=null;return t&&t.mosaicRule&&t.mosaicRule.multidimensionalDefinition&&t.mosaicRule.multidimensionalDefinition.length&&(i=t.mosaicRule.multidimensionalDefinition[0].variableName),i},_getDefaultDimensionalRange:function(){var t=this._layers[0].layer;if(t){var i=this._getLayerVariable(t),s={min:0,max:100};return t.getMultidimensionalInfo().then(e.hitch(this,function(t){var e=t;return e&&e.variables&&e.variables.length&&i&&r.forEach(e.variables,function(t){t.name.toLowerCase()===i.toLowerCase()&&r.forEach(t.dimensions,function(t){t.name.toLowerCase()===this.dimension.toLowerCase()&&t.extent&&2===t.extent.length&&(s.min=t.extent[0],s.max=t.extent[1])},this)},this),s}),function(t){return console.log(t),s})}},_setMapTime:function(t,i){var e=new S;e.startTime=t,e.endTime=i,this.map.setTimeExtent(e)},_clearMapTime:function(){this.map.setTimeExtent(this.map.timeSlider?this.map.timeSlider.getCurrentTimeExtent():null)},_findClosestValue:function(t,i,e){var r=i[0][e],s=Math.abs(t-r);return i.forEach(function(i){var o=Math.abs(t-i[e]);o<s&&(s=o,r=i[e])}),r}})});
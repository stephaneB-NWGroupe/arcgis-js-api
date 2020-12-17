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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/on","dojo/Evented","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/layout/AccordionContainer","dijit/TitlePane","dojox/widget/TitleGroup","../../kernel","../../lang","./AnalysisToolItem","./utils","./AnalysisRegistry","dojo/i18n!../../nls/jsapi","dojo/text!./templates/Analysis.html"],(function(e,o,t,n,i,s,l,a,c,h,r,d,T,p,m,u,g,S,v,w,_,I,y,C,L,f,b,R,A,D,M,P){var j=[D.Modes.Feature,D.Modes.Raster],F=o([g,S,v,w,_,u],{declaredClass:"esri.dijit.analysis.Analysis",templateString:P,widgetsInTemplate:!0,i18n:null,helpFileName:"Analysis",analysisMode:j[0],showBigData:!1,constructor:function(e,o){this._titlePanes=[],this.isSingleTenant=e&&e.isPortal,this.helpBase=e&&e.helpBase},postMixInProperties:function(){this.inherited(arguments),this.i18n={},t.mixin(this.i18n,M.common),t.mixin(this.i18n,M.tocPanel),t.mixin(this.i18n,M.analysisTools),this.own(this.watch("analysisMode",t.hitch(this,this._handleAnalysisModeChange)),this.watch("showBigData",t.hitch(this,this._updateHelp)))},startup:function(){this.inherited(arguments),this._handleAnalysisModeChange()},destroy:function(){this.inherited(arguments)},_connect:function(e,o,t){e._handle||(e._handle=m.pausable(e,o,t),this.own(e._handle))},_setSummarizeToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.aggregatePoints,helpTopic:"AggregatePointsTool",toolIcon:"aggregateIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect"));var n=new R({name:this.i18n.buildMultiVariableGrid,helpTopic:"BuildMultiVariableGridTool",toolIcon:"buildMultiVariableGridIcon"},d.create("div",null,e));h.set(n.optionsDiv,"margin-top","0"),n.set("showComingSoonLabel",!1),h.set(n.domNode,"display","none"),this._connect(n,"tool-select",t.hitch(this,"onToolSelect"));var i=new R({name:this.i18n.describeDataset,helpTopic:"DescribeDatasetTool",toolIcon:"describeDatasetIcon"},d.create("div",null,e));i.set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect"));var s=new R({name:this.i18n.joinFeatures,helpTopic:"JoinFeaturesTool",toolIcon:"joinFeaturesIcon"},d.create("div",null,e));s.set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect"));var l=new R({name:this.i18n.reconstructTracks,helpTopic:"ReconstructTracksTool",toolIcon:"reconstructIcon"},d.create("div",null,e));h.set(l.optionsDiv,"margin-top","0"),l.set("showComingSoonLabel",!1),h.set(l.domNode,"display","none"),this._connect(l,"tool-select",t.hitch(this,"onToolSelect"));var a=new R({name:this.i18n.summarizeAttributes,helpTopic:"SummarizeAttributesTool",toolIcon:"sumAttributesIcon"},d.create("div",null,e));s.set("showComingSoonLabel",!1),h.set(a.domNode,"display","none"),this._connect(a,"tool-select",t.hitch(this,"onToolSelect"));var c=new R({name:this.i18n.summarizeNearby,helpTopic:"SummarizeNearbyTool",toolIcon:"sumNearbyIcon"},d.create("div",null,e));c.set("showComingSoonLabel",!1),this._connect(c,"tool-select",t.hitch(this,"onToolSelect"));var r=new R({name:this.i18n.summarizeWithin,helpTopic:"SummarizeWithinTool",toolIcon:"sumWithinIcon"},d.create("div",null,e));r.set("showComingSoonLabel",!1),this._connect(r,"tool-select",t.hitch(this,"onToolSelect"));var T=new R({name:this.i18n.summarizeCenterAndDispersion,helpTopic:"SummarizeCenterAndDispersionTool",toolIcon:"summarizeCenterAndDispersionIcon"},d.create("div",null,e));T.set("showComingSoonLabel",!1),this._connect(T,"tool-select",t.hitch(this,"onToolSelect"));var p=new R({name:this.i18n.createPanel,helpTopic:"CreatePanelTool",toolIcon:"createInterpolatedSurfaceIcon"},d.create("div",null,e));p.set("showComingSoonLabel",!1),h.set(p.domNode,"display","none"),this._connect(p,"tool-select",t.hitch(this,"onToolSelect")),this._summarizeTools.set("content",e)},_setLocationToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.findExistingLocations,helpTopic:"FindExistingLocationsTool",toolIcon:"findLocationsIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect"));var n=new R({name:this.i18n.deriveNewLocations,helpTopic:"DeriveNewLocationsTool",toolIcon:"findNewLocationsIcon"},d.create("div",null,e));n.set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect"));var i=new R({name:this.i18n.detectTrackIncidents,helpTopic:"DetectIncidentsTool",toolIcon:"detectTrackIncidentsIcon"},d.create("div",null,e));i.set("showComingSoonLabel",!1),h.set(i.domNode,"display","none"),this._connect(i,"tool-select",t.hitch(this,"onToolSelect"));var s=new R({name:this.i18n.findCentroids,helpTopic:"FindCentroidsTool",toolIcon:"findCentroidsIcon"},d.create("div",null,e));s.set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect"));var l=new R({name:this.i18n.findDwellLocations,helpTopic:"FindDwellLocationsTool",toolIcon:"findDwellLocationsIcon"},d.create("div",null,e));l.set("showComingSoonLabel",!1),this._connect(l,"tool-select",t.hitch(this,"onToolSelect"));var a=new R({name:this.i18n.findSimilarLocations,helpTopic:"FindSimilarLocationsTool",toolIcon:"findSimilarLocationsIcon"},d.create("div",null,e));a.set("showComingSoonLabel",!1),this._connect(a,"tool-select",t.hitch(this,"onToolSelect"));var c=new R({name:this.i18n.geocodeLocations,helpTopic:"GeocodeLocationsfromTableTool",toolIcon:"geocodeLocationsIcon"},d.create("div",null,e));c.set("showComingSoonLabel",!1),this._connect(c,"tool-select",t.hitch(this,"onToolSelect"));var r=new R({name:this.i18n.chooseBestFacilities,helpTopic:"ChooseBestFacilitiesTool",toolIcon:"chooseBestFacilitiesIcon"},d.create("div",null,e));r.set("showComingSoonLabel",!1),this._connect(r,"tool-select",t.hitch(this,"onToolSelect"));var T=new R({name:this.i18n.createViewshed,helpTopic:"CreateViewshedTool",toolIcon:"createViewshedIcon"},d.create("div",null,e));T.set("showComingSoonLabel",!1),this._connect(T,"tool-select",t.hitch(this,"onToolSelect"));var p=new R({name:this.i18n.createWatershed,helpTopic:"CreateWatershedsTool",toolIcon:"createWatershedIcon"},d.create("div",null,e));p.set("showComingSoonLabel",!1),this._connect(p,"tool-select",t.hitch(this,"onToolSelect"));var m=new R({name:this.i18n.traceDownstream,helpTopic:"TraceDownstreamTool",toolIcon:"traceDownstreamIcon"},d.create("div",null,e));m.set("showComingSoonLabel",!1),this._connect(m,"tool-select",t.hitch(this,"onToolSelect")),this._locationTools.set("content",e)},_setGeoenrichToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.enrichLayer,helpTopic:"EnrichLayerTool",toolIcon:"geoenrichLayerIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect"));var n=new R({name:this.i18n.enrichMultiVariableGrid,helpTopic:"EnrichFromMultiVariableGridTool",toolIcon:"enrichMVGridIcon"},d.create("div",null,e));h.set(n.optionsDiv,"margin-top","0"),n.set("showComingSoonLabel",!1),h.set(n.domNode,"display","none"),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),this._geoenrichTools.set("content",e)},_setProximityToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.createBuffers,helpTopic:"CreateBuffersTool",toolIcon:"buffersIcon"},d.create("div",null,e));this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),o.set("showComingSoonLabel",!1);var n=new R({name:this.i18n.createDriveTimeAreas,helpTopic:"CreateDriveTimeAreasTool",toolIcon:"driveIcon"},d.create("div",null,e));h.set(n.optionsDiv,"margin-top","0"),n.set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect"));var i=new R({name:this.i18n.findNearest,helpTopic:"FindNearestTool",toolIcon:"findClosestFacilityIcon"},d.create("div",null,e));i.set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect"));var s=new R({name:this.i18n.planRoutes,helpTopic:"PlanRoutesTool",toolIcon:"planRoutesIcon"},d.create("div",null,e));h.set(s.optionsDiv,"margin-top","0"),s.set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect"));var l=new R({name:this.i18n.connectOriginsToDestinations,helpTopic:"ConnectOriginsToDestinationsTool",toolIcon:"connectODIcon"},d.create("div",null,e));h.set(l.optionsDiv,"margin-top","0"),l.set("showComingSoonLabel",!1),this._connect(l,"tool-select",t.hitch(this,"onToolSelect")),this._proximityTools.set("content",e)},_setAnalyzePatternsAttr:function(){var e,o,n,i,s,l,a,c,r;e=d.create("div"),(i=new R({name:this.i18n.calculateDensity,helpTopic:"CalculateDensityTool",toolIcon:"createDensitySurfaceIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect"));var T=new R({name:this.i18n.createSpaceTimeCube,helpTopic:"CreateSpaceTimeCubeTool",toolIcon:"createSpaceTimeCubeIcon"},d.create("div",null,e));T.set("showComingSoonLabel",!1),h.set(T.domNode,"display","none"),this._connect(T,"tool-select",t.hitch(this,"onToolSelect")),(o=new R({name:this.i18n.findHotSpots,helpTopic:"FindHotSpotsTool",toolIcon:"findHotSpotsIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),s=new R({name:this.i18n.findOutliers,helpTopic:"FindOutliersTool",toolIcon:"findOutliersIcon"},d.create("div",null,e)),this._connect(s,"tool-select",t.hitch(this,"onToolSelect")),l=new R({name:this.i18n.findPointClusters,helpTopic:"FindPointClustersTool",toolIcon:"findPointClustersIcon"},d.create("div",null,e)),this._connect(l,"tool-select",t.hitch(this,"onToolSelect")),c=new R({name:this.i18n.forestBasedClassificationAndRegression,helpTopic:"ForestBasedClassificationAndRegressionTool",toolIcon:"forestBasedClassificationAndRegressionIcon"},d.create("div",null,e)),this._connect(c,"tool-select",t.hitch(this,"onToolSelect")),a=new R({name:this.i18n.generalizedLinearRegression,helpTopic:"GeneralizedLinearRegressionTool",toolIcon:"generalizedLinearRegressionIcon"},d.create("div",null,e)),this._connect(a,"tool-select",t.hitch(this,"onToolSelect")),r=new R({name:this.i18n.geographicallyWeightedRegression,helpTopic:"GeographicallyWeightedRegressionTool",toolIcon:"geographicallyWeightedRegressionIcon"},d.create("div",null,e)),this._connect(r,"tool-select",t.hitch(this,"onToolSelect")),(n=new R({name:this.i18n.interpolatePoints,helpTopic:"InterpolatePointsTool",toolIcon:"createInterpolatedSurfaceIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),this._analyzePatTools.set("content",e)},_setInterpolateToolsAttr:function(){var e;e=d.create("div"),new R({name:this.i18n.createInterpolatedSurface,helpTopic:"SummarizeWithinTool",toolIcon:"createInterpolatedSurfaceIcon"},d.create("div",null,e)),this._interpolateTools.set("content",e)},_setManageDataToolsAttr:function(){var e,o,n,i,s,l,a,c,h,r;e=d.create("div"),(c=new R({name:this.i18n.appendData,helpTopic:"AppendDataTool",toolIcon:"appendDataIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(c,"tool-select",t.hitch(this,"onToolSelect")),(a=new R({name:this.i18n.calculateField,helpTopic:"CalculateFieldTool",toolIcon:"calculateFieldIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(a,"tool-select",t.hitch(this,"onToolSelect")),(h=new R({name:this.i18n.clipLayer,helpTopic:"ClipLayerTool",toolIcon:"clipLayerIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(h,"tool-select",t.hitch(this,"onToolSelect")),(l=new R({name:this.i18n.copytoDatastore,helpTopic:"CopyToDataStoreTool",toolIcon:"extractDataIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(l,"tool-select",t.hitch(this,"onToolSelect")),(o=new R({name:this.i18n.dissolveBoundaries,helpTopic:"DissolveBoundariesTool",toolIcon:"dissolveBoundariesIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),(n=new R({name:this.i18n.extractData,helpTopic:"ExtractDataTool",toolIcon:"extractDataIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),(r=new R({name:this.i18n.generateTessellations,helpTopic:"GenerateTessellationsTool",toolIcon:"generateTessellationsIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(r,"tool-select",t.hitch(this,"onToolSelect")),(i=new R({name:this.i18n.mergeLayers,helpTopic:"MergeLayersTool",toolIcon:"mergeLayersIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect")),(s=new R({name:this.i18n.overlayLayers,helpTopic:"OverlayLayersTool",toolIcon:"overlayLayersIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect")),this._managedataTools.set("content",e)},_setSummarizeRasterToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.summarizeRasterWithin,helpTopic:"SummarizeRasterWithinTool",toolIcon:"sumRasterWithinIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),this._summarizeRasterTools.set("content",e)},_setLocationRasterToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.findSuitableLocations,helpTopic:"FindSuitableLocationsTool",toolIcon:"findLocationsIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect"));var n=new R({name:this.i18n.filterLocations,helpTopic:"FilterLocationsTool",toolIcon:"findNewLocationsIcon"},d.create("div",null,e));n.set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),this._locationRasterTools.set("content",e)},_setAnalyzeImageRasterToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.monitorVegetation,helpTopic:"MonitorVegetationTool",toolIcon:"monitorVegetationIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),this._analyzeImageRasterTools.set("content",e)},_setProximityRasterToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.calculateDistance,helpTopic:"CalculateDistanceTool",toolIcon:"calculateDistanceIcon"},d.create("div",null,e));this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),o.set("showComingSoonLabel",!1);var n=new R({name:this.i18n.determineOptimumTravelCostNetwork,helpTopic:"DetermineOptimumTravelCostNetworkTool",toolIcon:"travelCostNetworkIcon"},d.create("div",null,e));n.set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect"));var i=new R({name:this.i18n.determineTravelCostPathAsPolyline,helpTopic:"DetermineTravelCostPathAsPolylineTool",toolIcon:"determineTravelCostPathAsPolylineIcon"},d.create("div",null,e));i.set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect")),this._proximityRasterTools.set("content",e)},_setAnalyzeTerrainRasterToolsAttr:function(){var e=d.create("div"),o=new R({name:this.i18n.calculateSlope,helpTopic:"CalculateSlopeTool",toolIcon:"calculateSlopeIcon"},d.create("div",null,e));o.set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect"));var n=new R({name:this.i18n.deriveAspect,helpTopic:"DeriveAspectTool",toolIcon:"deriveAspectIcon"},d.create("div",null,e));n.set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect"));var i=new R({name:this.i18n.createViewshed,helpTopic:"CreateViewshedRasterTool",toolIcon:"createViewshedRasterIcon"},d.create("div",null,e));i.set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect"));var s=new R({name:this.i18n.watershed,helpTopic:"WatershedTool",toolIcon:"watershedIcon"},d.create("div",null,e));s.set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect")),this._analyzeTerrainRasterTools.set("content",e)},_setAnalyzePatternsRasterAttr:function(){var e,o,n;e=d.create("div"),(n=new R({name:this.i18n.calculateDensity,helpTopic:"CalculateDensityRasterTool",toolIcon:"createDensityRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),(o=new R({name:this.i18n.interpolatePoints,helpTopic:"InterpolatePointsEBKTool",toolIcon:"createInterpolatedRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),this._analyzePatRasterTools.set("content",e)},_setManageDataRasterToolsAttr:function(){var e,o,n,i,s,l;e=d.create("div"),(n=new R({name:this.i18n.extractRaster,helpTopic:"ExtractRasterTool",toolIcon:"extractRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),(o=new R({name:this.i18n.remapValues,helpTopic:"RemapValuesTool",toolIcon:"remapIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),(s=new R({name:this.i18n.convertFeatureToRaster,helpTopic:"ConvertFeatureToRasterTool",toolIcon:"convertFeatureToRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect")),(i=new R({name:this.i18n.convertRasterToFeature,helpTopic:"ConvertRasterToFeatureTool",toolIcon:"convertRasterToFeatureIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect")),(l=new R({name:this.i18n.sample,helpTopic:"SampleTool",toolIcon:"sampleIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(l,"tool-select",t.hitch(this,"onToolSelect")),this._managedataRasterTools.set("content",e)},_setDeepLearningRasterToolsAttr:function(){var e,o,n,i;e=d.create("div"),(i=new R({name:this.i18n.classifyObjectsUsingDeepLearning,helpTopic:"ClassifyObjectsUsingDeepLearningTool",toolIcon:"classifyObjectsUsingDeepLearningIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect")),(n=new R({name:this.i18n.classifyPixelsUsingDeepLearning,helpTopic:"ClassifyPixelsUsingDeepLearningTool",toolIcon:"classifyPixelsUsingDeepLearningIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),(o=new R({name:this.i18n.detectObjectsUsingDeepLearning,helpTopic:"DetectObjectsUsingDeepLearningTool",toolIcon:"detectObjectsUsingDeepLearningIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),this._deepLearningRasterTools.set("content",e)},_setMultidimensionAnalysisRasterToolsAttr:function(){var e,o,n,i,s,l;e=d.create("div"),(o=new R({name:this.i18n.aggregateMultidimensionalRaster,helpTopic:"AggregateMultidimensionalRasterTool",toolIcon:"aggregateMultidimensionalRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(o,"tool-select",t.hitch(this,"onToolSelect")),(l=new R({name:this.i18n.findArgumentStatistics,helpTopic:"FindArgumentStatisticsTool",toolIcon:"findArgumentStatisticsIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(l,"tool-select",t.hitch(this,"onToolSelect")),(n=new R({name:this.i18n.generateMultidimensionalAnomaly,helpTopic:"GenerateMultidimensionalAnomalyTool",toolIcon:"generateMultidimensionalAnomalyIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(n,"tool-select",t.hitch(this,"onToolSelect")),(i=new R({name:this.i18n.generateTrendRaster,helpTopic:"GenerateTrendRasterTool",toolIcon:"generateTrendRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(i,"tool-select",t.hitch(this,"onToolSelect")),(s=new R({name:this.i18n.predictUsingTrendRaster,helpTopic:"PredictUsingTrendRasterTool",toolIcon:"predictUsingTrendRasterIcon"},d.create("div",null,e))).set("showComingSoonLabel",!1),this._connect(s,"tool-select",t.hitch(this,"onToolSelect")),this._multidimensionAnalysisRasterTools.set("content",e)},_getSelectedCategoryAttr:function(){var e;if(e=n.filter(this._titlePanes,(function(e,o){return e.open}))[0])return e.get("data-esrihelptopic")},_getSelectedPaneAttr:function(){return n.filter(this._titlePanes,(function(e,o){return e.open}))[0]},_setSelectedCategoryAttr:function(e){n.forEach(this._titlePanes,(function(o){o.get("data-esrihelptopic")===e&&o.set("open",!0)}),this)},_setAnalysisModeAttr:function(e){e&&-1!==n.indexOf(j,e)?this._set("analysisMode",e):console.log("Invalid value for analysisMode property")},_handleAnalysisModeChange:function(){if(this.analysisMode!==j[0]||this._featureAccordionCreated){if(this.analysisMode===j[1]&&!this._rasterAccordionCreated){var e=[this._summarizeRasterTools,this._analyzePatRasterTools,this._proximityRasterTools,this._managedataRasterTools,this._analyzeImageRasterTools,this._analyzeTerrainRasterTools,this._deepLearningRasterTools,this._multidimensionAnalysisRasterTools];this._fixHelpIDs(e),this._titlePanes=this._titlePanes.concat(e),this.set("summarizeRasterTools"),this.set("analyzePatternsRaster"),this.set("proximityRasterTools"),this.set("manageDataRasterTools"),this.set("analyzeImageRasterTools"),this.set("analyzeTerrainRasterTools"),this.set("deepLearningRasterTools"),this.set("multidimensionAnalysisRasterTools"),n.forEach(["HistogramRasterWithinTool","FilterLocationsTool","FindSuitableLocationsTool","FindShortestPathTool","SegmentImageTool","ClassifyImageTool","DetectDifferencesTool"],(function(e){this.disable(e,!0)}),this),this._rasterAccordion.startup(),this._rasterAccordionCreated=!0}}else{var o=[this._summarizeTools,this._locationTools,this._geoenrichTools,this._analyzePatTools,this._proximityTools,this._managedataTools];this._fixHelpIDs(o),this._titlePanes=this._titlePanes.concat(o),this.set("summarizeTools"),this.set("locationTools"),this.set("geoenrichTools"),this.set("analyzePatterns"),this.set("proximityTools"),this.set("manageDataTools"),this._featureAccordion.startup(),A.initHelpLinks(this.domNode,!0,{analysisMode:this._getAnalysisMode(),isSingleTenant:this.isSingleTenant}),this._featureAccordionCreated=!0}h.set(this._featureAccordion.domNode,"display",this.analysisMode===j[0]?"block":"none"),h.set(this._rasterAccordion.domNode,"display",this.analysisMode===j[1]?"block":"none"),this._updateHelp()},_getAnalysisMode:function(){return"feature"===this.analysisMode&&this.showBigData?D.Modes.Bigdata:"feature"===this.analysisMode?D.Modes.Feature:D.Modes.Raster},_setCustomCategoryAttr:function(e){var o=d.create("div"),i=new C({open:!b.isDefined(e.open)||e.open,toggleable:!0,title:e.title});e.analysisMode===D.Modes.Feature||e.analysisMode===D.Modes.Standard||e.analysisMode===D.Modes.Bigdata?this._featureAccordion.addChild(i):e.analysisMode===D.Modes.Raster&&this._rasterAccordion.addChild(i),n.forEach(e.tasks,(function(n){var i=new R({name:n.title,toolIcon:"GPWidgetIcon"},d.create("div",null,o));i.set("showComingSoonLabel",!1),i.task=n,i.toolName=e.toolName,this._connect(i,"tool-select",t.hitch(this,"onToolSelect",i))}),this),i.set("data-esrihelptopic",e.title),i.set("content",o),this._titlePanes.push(i)},_updateHelp:function(){A.initHelpLinks(this.domNode,!0,{analysisMode:this._getAnalysisMode(),isSingleTenant:this.isSingleTenant,helpBase:this.helpBase})},_fixHelpIDs:function(e){n.forEach(e,(function(e){r.set(e.titleNode,"innerHTML","<span class='esriFloatTrailing helpIcon' esriHelpTopic='"+(e.get("data-esrihelptopic")?e.get("data-esrihelptopic"):e.get("data-esriHelpTopic"))+"' data-dojo-attach-point='_helpIconNode'></span>"+e.titleNode.innerHTML)}),this)},_getNodes:function(e){var o=T("div[data-esrihelptopic ='"+e+"']");return 0===o.length&&(o=T("a[esrihelptopic ='"+e+"']")),o},openApplyRFxTool:function(e,o){var t,n;t=d.create("div"),this.set("analysisMode",j[1]),(n=new R({name:this.i18n.applyRFxTemplate,helpTopic:"ApplyRFxTemplate",toolIcon:"",rfxTemplateItem:o?null:e,rasterFunction:o?e:null,analysisMode:this.analysisMode},d.create("div",null,t))).set("showComingSoonLabel",!1),this.onToolSelect(n)},hide:function(e){var o=this._getNodes(e);o.length>0&&o.forEach((function(e){e&&I.getEnclosingWidget(e)&&h.set(I.getEnclosingWidget(e).domNode,"display","none")}))},show:function(e){var o=this._getNodes(e);o.length>0&&o.forEach((function(e){e&&I.getEnclosingWidget(e)&&h.set(I.getEnclosingWidget(e).domNode,"display","block")}))},showTool:function(e,o){o?this.show(e):this.hide(e)},disable:function(e,o){var t=this._getNodes(e);t.length>0&&t.forEach((function(e){if(e&&I.getEnclosingWidget(e)){var t=I.getEnclosingWidget(e);t.set("showComingSoonLabel",o),h.set(t.optionsDiv,"display","none"),t._handle&&(o?t._handle.pause():t._handle.resume())}}),this)},onToolSelect:function(e){}});return l("extend-esri")&&t.setObject("dijit.analysis.Analysis",F,f),F}));
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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/has","dojo/json","dojo/Stateful","./storeUtils","./SpatialReferences","./JobsViewModel","../../kernel","../../lang"],function(t,s,e,o,i,n,r,a,l,h,c,u){var S=t([r],{declaredClass:"esri.dijit.analysis.SettingsViewModel",showHelp:!0,showOverwriteResultOption:!0,showCloseAnalysisOption:!0,showStoreAnalysisOption:!0,showCoordinateSystems:!0,showOutSR:!0,showProcessSR:!0,showExtent:!0,showRasterSettings:!0,showGeoAnalyticsSettings:!0,showCloseIcon:!0,showHeader:!0,showOkCancel:!0,showJobsHistory:!1,isCustomExtent:!1,layers:null,viewProps:null,closeAnalysisWidget:!0,returnFeaturCollection:!1,jobsViewModel:null,spatialRefStore:a.createHierarchicalStore({data:l}),spatialRefData:l,constructor:function(t){var e=this.get("saveModel");e&&e.layers&&t.layers?(this._arrayUnique(t.layers.concat(e.layers),"name"),delete e.layers,s.mixin(t,e)):s.mixin(t,e),this.watch("showJobsHistory",s.hitch(this,this.updateJobsVM)),this.watch("portalUrl",s.hitch(this,this.updateJobsVM)),this.watch("jobsHistoryItem",s.hitch(this,this.updateJobsVM))},_showCloseIconSetter:function(t){this.showCloseIcon=t},_showHelpSetter:function(t){this.showHelp=t},_showOverwriteResultOptionSetter:function(t){this.showOverwriteResultOption=t},_showCloseAnalysisOptionSetter:function(t){this.showCloseAnalysisOption=t},_showStoreAnalysisOptionSetter:function(t){this.showStoreAnalysisOption=t},_showCoordinateSystemsSetter:function(t){this.showCoordinateSystems=t},_showExtentSetter:function(t){this.showExtent=t},_showRasterSettingsSetter:function(t){this.showRasterSettings=t},_returnFeatureCollectionSetter:function(t){this.returnFeatureCollection=t},_closeAnalysisWidgetSetter:function(t){this.closeAnalysisWidget=t},_overwriteResultSetter:function(t){this.overwriteResult=t},_outSRSetter:function(t){this.outSR=t},_processSRSetter:function(t){this.processSR=t},_extentSetter:function(t){this.extent=t},_snapRasterSetter:function(t){this.snapRaster=t},_cellSizeSetter:function(t){this.cellSize=t},_maskSetter:function(t){this.mask=t},_layersSetter:function(t){this.layers=t},_showHeaderSetter:function(t){this.showHeader=t},_showOutSRSetter:function(t){this.showOutSR=t,this.set("outSR",t?this.outSR:void 0)},_showProcessSRSetter:function(t){this.showProcessSR=t,this.set("processSR",t?this.processSR:void 0)},_showOkCancelSetter:function(t){this.showOkCancel=!0},_isCustomExtentSetter:function(t){this.isCustomExtent=t},_isCustomOutSRSetter:function(t){this.isCustomOutSR=t},_isCustomProcessSRSetter:function(t){this.isCustomProcessSR=t},_isCustomCellSizeSetter:function(t){this.isCustomCellSize=t},_showGeoAnalyticsSettingsSetter:function(t){this.showGeoAnalyticsSettings=t},_datastoreSetter:function(t){this.datastore=t},_portalUrlSetter:function(t){this.portalUrl=t},_jobsHistoryItemSetter:function(t){this.jobsHistoryItem=t},_viewPropsSetter:function(t){this.viewProps=t},_saveModelGetter:function(){var t;return window.localStorage&&(t=window.localStorage.getItem("esri_analysis_settings"))&&(t=n.parse(t)),t},_saveModelSetter:function(t){t||(t={isCustomExtent:this.isCustomExtent,isCustomOutSR:this.isCustomOutSR,isCustomProcessSR:this.isCustomProcessSR,isCustomCellSize:this.isCustomCellSize,outSR:this.outSR,processSR:this.processSR,extent:this.extent,cellSize:this.cellSize,snapRaster:this.snapRaster,mask:this.mask,datastore:this.datastore,viewProps:this.viewProps,closeAnalysisWidget:this.closeAnalysisWidget,returnFeatureCollection:this.returnFeatureCollection},this.layers&&this.layers.length>0&&(t.layers=e.map(this.layers,function(t){return{name:t.name,url:t.url,fullExtent:t.fullExtent,type:t.type,format:t.format}}))),window.localStorage&&t&&window.localStorage.setItem("esri_analysis_settings",n.stringify(t))},save:function(){this.set("saveModel")},reset:function(){s.mixin(this,this.get("saveModel"))},updateJobsVM:function(){this.showJobsHistory&&this.portalUrl&&this.jobsHistoryItem&&(this.jobsViewModel||(this.jobsViewModel=new h({portalUrl:this.portalUrl,item:this.jobsHistoryItem}),this.watch("jobsHistoryItem",s.hitch(this,function(){this.jobsViewModel.set("item",this.jobsHistoryItem)})),this.watch("portalUrl",s.hitch(this,function(){this.jobsViewModel.set("portalUrl",this.portalUrl)}))))},_arrayUnique:function(t,s){for(var e=t.concat(),o=0;o<e.length;++o)for(var i=o+1;i<e.length;++i)(!s&&e[o]===e[i]||s&&e[o][s]===e[i][s])&&e.splice(i--,1);return e}});return i("extend-esri")&&s.setObject("dijit.analysis.SettingsViewModel",S,c),S});
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

define(["require","module","../../declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/Deferred","../_EventedWidget","./DataProvider","./Geoenrichment","./config","dojo/on","../../tasks/geoenrichment/GeoenrichmentTask","../../tasks/geoenrichment/RingBuffer","dojo/dom-class","./_Invoke","./utils"],function(t,e,i,s,o,n,r,a,h,d,u,l,_,c,p,v,f){function g(t,e){var i=new r,s=new _(u.server);s.token=u.token;var o=e[0].split(".");return s.getDataCollections(null,o[0]).then(function(e){if("OneVar"==t)if("*"==o[1])i.resolve(e[0].variables[0].alias);else{for(var s=e[0].variables,n=0;n<s.length;n++)if(s[n].id==o[1])return void i.resolve(s[n].alias);i.reject(new Error("Variable was not found within the data collection: "+s[0]))}else i.resolve(e[0].metadata.title)},function(t){i.reject(t)}),i.promise}var m=i(h,{_data:null,constructor:function(t,e){this._data=t,s.mixin(this.metadata,e)},getData:function(){return this._data}});return i("esri.dijit.geoenrichment.Infographic",[a,v],{countryID:null,levels:u.levels,highestLevel:u.highestLevel,title:null,subtitle:"<div>${address}</div><div>${name}</div>",type:null,variables:null,studyArea:null,studyAreaOptions:null,outSR:null,expanded:!0,returnGeometry:!1,dataProvider:null,autoTitle:!0,_data:null,_ge:null,_autoTitle:null,_autoTitlePromise:null,_eventMap:{resize:["size"],"data-request":!0,"data-ready":["provider"],"data-load":!0,"data-error":["error"]},constructor:function(){this.studyAreaOptions=new c},postMixInProperties:function(){this.type&&(this.invoke("_updateAutoTitle"),this._updateReport())},_provideGeoenrichment:function(t){this._ge&&!t||(t=t||new d,this._removeEventHandlers(),this.dataProvider=this._ge=t,this._eventHandlers=[t.on("start",s.hitch(this,this._onDataRequest)),t.on("data",s.hitch(this,this._onDataReady)),t.on("end",s.hitch(this,this._onDataLoad)),t.on("error",s.hitch(this,this._onDataError))])},_removeEventHandlers:function(){this._eventHandlers&&o.forEach(this._eventHandlers,function(t){t.remove()})},setGeoenrichment:function(t){this._provideGeoenrichment(t)},buildRendering:function(){this.inherited(arguments),this.domNode=n.create("div"),this.expanded||p.add(this.domNode,"Collapsed")},destroy:function(){this._destroyReportWidget(),this._ge&&this._ge.stop(),this._removeEventHandlers(),this.inherited(arguments)},_setReturnGeometryAttr:function(t){this._provideGeoenrichment(),this._set("returnGeometry",t),this._ge.returnGeometry=t},_setTitleAttr:function(t){this._set("title",t),this._widget&&(this._widget.title=t)},_setSubtitleAttr:function(t){this._provideGeoenrichment(),this._set("subtitle",t),this._ge.setReturnAddress&&this._ge.setReturnAddress(/\$\{address\}/.test(t)),this._widget&&(this._widget.subtitle=t)},_setTypeAttr:function(t){this._set("type",t),this._widget&&(this._widget.setDataProvider(null),this._destroyReportWidget()),this.invoke("_updateAutoTitle"),this._updateReport()},_updateReport:function(){this._updateLevels(),this.invoke("_requireReport")},_getAbsMid:function(i){return t.toAbsMid?t.toAbsMid(i):e.id.replace(/\/[^\/]*$/gi,"/")+i},_requireReport:function(){this.type&&t([this._getAbsMid("./"+this.type)],s.hitch(this,this._createReportWidget,this.type))},_updateAutoTitle:function(){if("string"!=typeof this.title&&this.autoTitle&&this.type&&this.variables){var t=this;this._autoTitlePromise=g(this.type,this.variables),this._autoTitlePromise.then(function(e){t._autoTitle=e},function(e){t._onDataError(e)}),this._autoTitlePromise.always(function(){t._autoTitlePromise=null})}},_setCountryIDAttr:function(t){this._provideGeoenrichment(),this._set("countryID",t),this._ge.country=t},_setVariablesAttr:function(t){var e=!0;if(s.isArray(t)){for(var i=0;i<t.length;i++)if(t[i].indexOf(".")<=0){e=!1;break}}else null!=t&&(e=!1);if(!e)throw new Error("Invalid value for variables");this._provideGeoenrichment(),this._set("variables",t),this._ge.setVariables(t),this.invoke("_updateAutoTitle")},_setStudyAreaAttr:function(t){this._provideGeoenrichment(),this._set("studyArea",t),this._ge.setStudyArea(t)},_setOutSRAttr:function(t){this._set("outSR",t),this._ge.outSR=t},_setStudyAreaOptionsAttr:function(t){this._provideGeoenrichment(),this._set("studyAreaOptions",t),this._ge.setBuffer&&this._ge.setBuffer(t)},_setExpandedAttr:function(t){this.expanded!=t&&(this._destroyReportWidget(),this._set("expanded",t),t?p.remove(this.domNode,"Collapsed"):p.add(this.domNode,"Collapsed"),this._updateReport())},_setCacheLimitAttr:function(t){this._provideGeoenrichment(),this._ge.setCacheLimit&&this._ge.setCacheLimit(t)},setData:function(t,e){this.set("dataProvider",new m(t,e))},_setDataProviderAttr:function(t){this.dataProvider!==t&&(this._set("dataProvider",t),this._ge&&(this._ge.stop(),this._ge=null),this._widget&&this._widget.setDataProvider(t))},_updateLevels:function(){this._provideGeoenrichment(),f.supportsComparison(this.type,this.expanded)?this._ge.setGeoLevels(this.levels,this.highestLevel):this._ge.setGeoLevels(null,null)},_widget:null,_createReportWidget:function(t,e){if(!this._destroyed&&this.type==t){if(this._ge&&this._ge.isBusy())return void l.once(this._ge,"end",s.hitch(this,this._createReportWidget,this.type,e));if(this._autoTitlePromise)return void this._autoTitlePromise.then(s.hitch(this,this._createReportWidget,this.type,e));if(this.type){var i=this._widget=new e(this.domNode);i.title="string"==typeof this.title?this.title:this._autoTitle,i.subtitle=this.subtitle,i.expanded=this.expanded,i.on("resize",s.hitch(this,this._onResize)),isNaN(this._lastSelectedComparison)||i.setState({selectedComparison:this._lastSelectedComparison}),i.setDataProvider(this.dataProvider)}}},resize:function(){this._widget&&this._widget.resize()},_destroyReportWidget:function(){this._widget&&(this._lastSelectedComparison=this._widget.getState("selectedComparison"),this._widget.destroy(),this._widget=null)},_onResize:function(t){this.onResize(t)},onResize:function(t){},_onDataRequest:function(){this.onDataRequest()},onDataRequest:function(){},_onDataReady:function(){this.onDataReady(this._ge)},onDataReady:function(t){},_onDataLoad:function(){this.onDataLoad()},onDataLoad:function(){},_onDataError:function(t){this.onDataError(t)},onDataError:function(t){}})});
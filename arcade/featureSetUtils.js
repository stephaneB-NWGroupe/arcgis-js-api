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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}(),__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},__spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var a=Array(e),n=0;for(t=0;t<r;t++)for(var i=arguments[t],l=0,o=i.length;l<o;l++,n++)a[n]=i[l];return a};define(["require","exports","../IdentityManager","../request","./featureSetCollection","./featureset/actions/AttributeFilter","./featureset/actions/GroupBy","./featureset/actions/OrderBy","./featureset/actions/SpatialFilter","./featureset/actions/Top","./featureset/sources/FeatureLayerDynamic","./featureset/sources/FeatureLayerDynamicMap","./featureset/sources/FeatureLayerMemoryMap","./featureset/sources/FeatureSetRelated","./featureset/support/cache","./featureset/support/shared","./polyfill/promiseUtils","./polyfill/sql/WhereClause","../arcgis/Portal","../layers/FeatureLayer"],(function(e,t,r,a,n,i,l,o,s,u,c,f,d,h,m,p,y,v,_,g){"use strict";function S(e){if(null!==m.applicationCache){var t=m.applicationCache.getLayerInfo(e);if(null!==t)return t}var r=a({url:e,content:{f:"json"},callbackParamName:"callback",handleAs:"json"}).then((function(e){if(e){var t=e;return t.layers||(t.layers=[]),t.tables||(t.tables=[]),y.resolve(t)}return y.resolve({layers:[],tables:[]})}));return null!==m.applicationCache&&(m.applicationCache.setLayerInfo(e,r),r=r.catch((function(t){throw m.applicationCache.clearLayerInfo(e),t}))),r}function L(e,t,r,a,n){return void 0===r&&(r=null),void 0===a&&(a=!0),void 0===n&&(n=null),null===r&&(r=["*"]),new c({url:e,outFields:r,spatialReference:t,includeGeometry:a,lrucache:n})}function F(e,t,r,a,n){return void 0===r&&(r=null),void 0===a&&(a=!0),void 0===n&&(n=null),y.resolve(L(e,t,r,a,n))}function I(e,t,r,a,n){if(void 0===t&&(t=null),void 0===r&&(r=null),void 0===a&&(a=!0),void 0===n&&(n=null),!e.getMap()){if(e.url)return L(e.url,t,r,a,n);throw new Error("FeatureSets can only be used once the layer is added to a Map")}if(e.mode===g.MODE_SNAPSHOT&&!e.url)return new d({layer:e,spatialReference:t,outFields:r,includeGeometry:a});if(e.mode===g.MODE_SNAPSHOT||e.mode===g.MODE_ONDEMAND||e.mode===g.MODE_AUTO)return new f({layer:e,spatialReference:t,outFields:r,includeGeometry:a,lrucache:n});throw new Error("FeatureSets only support for Snapshot or OnDemand FeatureSet")}Object.defineProperty(t,"__esModule",{value:!0}),t.lookupUser=t.constructAssociationMetaDataFeatureSetFromUrl=t.constructFeatureSetFromRelationship=t.constructFeatureSetFromPortalItem=t.getPortal=t.createFeatureSetCollectionFromService=t.createFeatureSetCollectionFromMap=t.constructFeatureSet=t.constructFeatureSetFromUrl=t.constructFeatureSetFromUrlRaw=t.initialiseMetaDataCache=void 0,i.registerAction(),l.registerAction(),o.registerAction(),s.registerAction(),u.registerAction(),t.initialiseMetaDataCache=function(){null===m.applicationCache&&(m.applicationCache=new m)},t.constructFeatureSetFromUrlRaw=L,t.constructFeatureSetFromUrl=F,t.constructFeatureSet=I;var N=function(e){function t(t,r,a){void 0===r&&(r=null),void 0===a&&(a=null);var n=e.call(this)||this;return n._map=t,n._overridespref=r,n.lrucache=a,n._instantLayers=[],n}return __extends(t,e),t.prototype.makeAndAddFeatureSet=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null);var a=I(e,this._overridespref,null===r?["*"]:r,t,this.lrucache);return this._instantLayers.push({featureset:a,opitem:e,includeGeometry:t,outFields:JSON.stringify(r)}),a},t.prototype.makeAndAddFeatureSetTable=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null);var a=L(e.url,this._overridespref,r,t,this.lrucache);return this._instantLayers.push({featureset:a,opitem:{name:e.title,id:e.id},includeGeometry:t,outFields:JSON.stringify(r)}),a},t.prototype.featureSetByName=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null),null===r&&(r=["*"]),r=(r=r.slice(0)).sort();for(var a=JSON.stringify(r),n=0;n<this._instantLayers.length;n++){var i=this._instantLayers[n];if(i.opitem.name===e&&i.includeGeometry===t&&i.outFields===a)return this.resolvePromise(this._instantLayers[n].featureset)}for(var l=null,o=0,s=this._map.graphicsLayerIds;o<s.length;o++){var u=s[o],c=this._map.getLayer(u);if(c instanceof g&&c.name===e){l=c;break}}if(l)return this.resolvePromise(this.makeAndAddFeatureSet(l,t,r));if(this._map.tables){var f=this._map.tables.find((function(t){return!!(t.title&&t.title===e||t.title&&t.title===e)}));if(f)return this.resolvePromise(this.makeAndAddFeatureSetTable(f,t,r))}return this.resolvePromise(null)},t.prototype.featureSetById=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=["*"]),null===r&&(r=["*"]),r=(r=r.slice(0)).sort();for(var a=JSON.stringify(r),n=0;n<this._instantLayers.length;n++){var i=this._instantLayers[n];if(i.opitem.id===e&&i.includeGeometry===t&&i.outFields===a)return this.resolvePromise(this._instantLayers[n].featureset)}for(var l=null,o=0,s=this._map.graphicsLayerIds;o<s.length;o++){var u=s[o],c=this._map.getLayer(u);if(c instanceof g&&c.id===e){l=c;break}}if(l)return this.resolvePromise(this.makeAndAddFeatureSet(l,t,r));if(this._map.tables){var f=this._map.tables.find((function(t){return!!(t.id&&t.id===e||t.id&&t.id===e)}));if(f)return this.resolvePromise(this.makeAndAddFeatureSetTable(f,t,r))}return this.resolvePromise(null)},t}(n);t.createFeatureSetCollectionFromMap=function(e,t,r){return void 0===r&&(r=null),new N(e,t,r)};var A=function(e){function t(t,r,a){void 0===r&&(r=null),void 0===a&&(a=null);var n=e.call(this)||this;return n._url=t,n._overridespref=r,n.lrucache=a,n.metadata=null,n._instantLayers=[],n}return __extends(t,e),Object.defineProperty(t.prototype,"url",{get:function(){return this._url},enumerable:!1,configurable:!0}),t.prototype._loadMetaData=function(){var e=this;return S(this._url).then((function(t){return e.metadata=t,t}))},t.prototype.makeAndAddFeatureSet=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null);var a=I(e,this._overridespref,null===r?["*"]:r,t,this.lrucache);return this._instantLayers.push({featureset:a,opitem:e,includeGeometry:t,outFields:JSON.stringify(r)}),a},t.prototype.load=function(){return this._loadMetaData()},t.prototype.clone=function(){return new t(this._url,this._overridespref,this.lrucache)},t.prototype.featureSetByName=function(e,t,r){var a=this;void 0===t&&(t=!0),void 0===r&&(r=null),null===r&&(r=["*"]),r=(r=r.slice(0)).sort();for(var n=JSON.stringify(r),i=0;i<this._instantLayers.length;i++){var l=this._instantLayers[i];if(l.opitem.name===e&&l.includeGeometry===t&&l.outFields===n)return this.resolvePromise(this._instantLayers[i].featureset)}return this._loadMetaData().then((function(n){for(var i=null,l=0,o=n.layers?n.layers:[];l<o.length;l++){(c=o[l]).name===e&&(i=c)}if(!i)for(var s=0,u=n.tables?n.tables:[];s<u.length;s++){var c;(c=u[s]).name===e&&(i=c)}return i?a.resolvePromise(L(a._url+"/"+i.id,a._overridespref,r,t,a.lrucache)):a.resolvePromise(null)}))},t.prototype.featureSetById=function(e,t,r){var a=this;void 0===t&&(t=!0),void 0===r&&(r=["*"]),null===r&&(r=["*"]),r=(r=r.slice(0)).sort();var n=JSON.stringify(r);e=null!=e?e.toString():"";for(var i=0;i<this._instantLayers.length;i++){var l=this._instantLayers[i];if(l.opitem.id===e&&l.includeGeometry===t&&l.outFields===n)return this.resolvePromise(this._instantLayers[i].featureset)}return this._loadMetaData().then((function(n){for(var i=null,l=0,o=n.layers?n.layers:[];l<o.length;l++){null!==(c=o[l]).id&&void 0!==c.id&&c.id.toString()===e&&(i=c)}if(!i)for(var s=0,u=n.tables?n.tables:[];s<u.length;s++){var c;null!==(c=u[s]).id&&void 0!==c.id&&c.id.toString()===e&&(i=c)}return i?a.resolvePromise(L(a._url+"/"+i.id,a._overridespref,r,t,a.lrucache)):a.resolvePromise(null)}))},t}(n);t.createFeatureSetCollectionFromService=function(e,t,r){return void 0===r&&(r=null),new A(e,t,r)},t.getPortal=function(e,t){return null===e?t:new _.Portal(e.field("url"))},t.constructFeatureSetFromPortalItem=function(e,t,r,n,i,l,o){return y.create((function(s,u){if(m.applicationCache){var c=m.applicationCache.getLayerInfo(e+":"+l.url);if(c)return void c.then((function(e){try{var a=F(p.extractServiceUrl(e.item.url)+"/"+t,r,n,i,o);s(a)}catch(e){u(e)}}),(function(e){u(e)}))}var f=function(e,t){var r=t.portalUrl+(t.portalUrl.match(/\/$/)?"":"/")+"content/items/"+e;return y.create((function(e,t){return a({url:r,content:{f:"json"},callbackParamName:"callback",load:function(t){e({item:t})},error:function(e){t(e)}})}))}(e,l);m.applicationCache&&m.applicationCache.setLayerInfo(e+":"+l.url,f),f.then((function(e){try{var a=F(p.extractServiceUrl(e.item.url)+"/"+t,r,n,i,o);s(a)}catch(e){u(e)}}),(function(t){m.applicationCache&&m.applicationCache.clearLayerInfo(e+":"+l.url),u(t)}))}))},t.constructFeatureSetFromRelationship=function(e,t,r,a,n,i,l){void 0===a&&(a=null),void 0===n&&(n=null),void 0===i&&(i=!0),void 0===l&&(l=null);var o=e.serviceUrl();return o?F(o="/"===o.charAt(o.length-1)?o+t.relatedTableId.toString():o+"/"+t.relatedTableId.toString(),a,n,i,l).then((function(o){return new h({layer:e,relatedLayer:o,relationship:t,objectId:r,spatialReference:a,outFields:n,includeGeometry:i,lrucache:l})})):null},t.constructAssociationMetaDataFeatureSetFromUrl=function(e,t){var r={metadata:null,networkId:-1,terminals:[],unVersion:3,queryelem:null,layerNameLkp:{},lkp:null};return S(e).then((function(n){if(r.metadata=n,n.controllerDatasetLayers&&void 0!==n.controllerDatasetLayers.utilityNetworkLayerId&&null!==n.controllerDatasetLayers.utilityNetworkLayerId){if(n.layers)for(var i=0,l=n.layers;i<l.length;i++){var o=l[i];r.layerNameLkp[o.id]=o.name}if(n.tables)for(var s=0,u=n.tables;s<u.length;s++){o=u[s];r.layerNameLkp[o.id]=o.name}var c=n.controllerDatasetLayers.utilityNetworkLayerId;return r.networkId=c,function(e,t){var r="QUERYDATAELEMTS:"+t.toString()+":"+e;if(null!==m.applicationCache){var n=m.applicationCache.getLayerInfo(r);if(null!==n)return n}var i=a({url:e+"/queryDataElements",usePost:!0,handleAs:"json",content:{layers:JSON.stringify([t.toString()]),f:"json"}}).then((function(e){if(e){var t=e;if(t.layerDataElements&&t.layerDataElements[0])return t.layerDataElements[0]}throw new Error("Not Found")}));return null!==m.applicationCache&&(m.applicationCache.setLayerInfo(r,i),i=i.catch((function(e){throw m.applicationCache.clearLayerInfo(r),e}))),i}(e,c).then((function(n){if(n){r.queryelem=n,r.queryelem&&r.queryelem.dataElement&&void 0!==r.queryelem.dataElement.schemaGeneration&&(r.unVersion=r.queryelem.dataElement.schemaGeneration),r.lkp={},r.queryelem.dataElement.domainNetworks||(r.queryelem.dataElement.domainNetworks=[]);for(var i=0,l=r.queryelem.dataElement.domainNetworks;i<l.length;i++){for(var o=l[i],s=0,u=o.edgeSources?o.edgeSources:[];s<u.length;s++){(p={layerId:(h=u[s]).layerId,sourceId:h.sourceId,className:r.layerNameLkp[h.layerId]?r.layerNameLkp[h.layerId]:null}).className&&(r.lkp[p.className]=p)}for(var f=0,d=o.junctionSources?o.junctionSources:[];f<d.length;f++){var h,p;(p={layerId:(h=d[f]).layerId,sourceId:h.sourceId,className:r.layerNameLkp[h.layerId]?r.layerNameLkp[h.layerId]:null}).className&&(r.lkp[p.className]=p)}}if(r.queryelem.dataElement.terminalConfigurations)for(var _=0,g=r.queryelem.dataElement.terminalConfigurations;_<g.length;_++)for(var S=0,L=g[_].terminals;S<L.length;S++){var I=L[S];r.terminals.push({terminalId:I.terminalId,terminalName:I.terminalName})}return function(e){if(null!==m.applicationCache){var t=m.applicationCache.getLayerInfo(e);if(null!==t)return t}var r=a({url:e,content:{f:"json"},callbackParamName:"callback",handleAs:"json"}).then((function(e){if(e){var t=e;return y.resolve(t)}return y.resolve(null)}));return null!==m.applicationCache&&(m.applicationCache.setLayerInfo(e,r),r=r.catch((function(t){throw m.applicationCache.clearLayerInfo(e),t}))),r}(e+"/"+c).then((function(a){if(a.systemLayers&&void 0!==a.systemLayers.associationsTableId&&null!==a.systemLayers.associationsTableId){var n=[];return r.unVersion>=4&&(n.push("STATUS"),n.push("PERCENTALONG")),F(e+"/"+a.systemLayers.associationsTableId.toString(),t,__spreadArrays(["OBJECTID","FROMNETWORKSOURCEID","TONETWORKSOURCEID","FROMGLOBALID","TOGLOBALID","TOTERMINALID","FROMTERMINALID","ASSOCIATIONTYPE","ISCONTENTVISIBLE","GLOBALID"],n),!1,null).then((function(e){return e.load()})).then((function(e){return r.unVersion>=4?(e=e.filter(v.WhereClause.create("STATUS NOT IN (1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 49, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62,63)",e.getFieldsIndex()))).load():e})).then((function(e){return{lkp:r.lkp,associations:e,unVersion:r.unVersion,terminals:r.terminals}}))}return{associations:null,unVersion:r.unVersion,lkp:null,terminals:[]}}))}return{associations:null,unVersion:r.unVersion,lkp:null,terminals:[]}}))}return{associations:null,unVersion:r.unVersion,lkp:null,terminals:[]}}))},t.lookupUser=function(e,t,n){if(!r.findCredential(e.portalUrl))return y.resolve(null);if(e.getPortalUser()&&""===t){var i=e.getPortalUser();if(i&&!1===n){for(var l={},o=0,s=["username","id","fullName","availableCredits","assignedCredits","firstName","lastName","preferredView","description","email","idpUsername","favGroupId","lastLogin","mfaEnabled","access","storageUsage","storageQuota","orgId","role","privileges"];o<s.length;o++){var u=s[o];void 0!==i[u]&&(l[u]=i[u])}return y.resolve(l)}}return""===t?y.create((function(t,r){return a({url:e.portalUrl+"community/self",content:__assign({f:"json"},!1===n?{}:{returnUserLicenseTypeExtensions:!0}),callbackParamName:"callback",load:function(e){e&&e.username?t(e):t(null)},error:function(e){r(e)}})})):y.create((function(r,n){return a({url:e.portalUrl+"community/users/"+t,content:{f:"json"},callbackParamName:"callback",load:function(e){e.error?r(null):r(e)},error:function(e){n(e)}})}))}}));
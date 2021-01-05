/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/maybe","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/subclass","../../../core/Error","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../../../core/promiseUtils","../../../geometry/SpatialReference","../../../geometry/Extent","../../../geometry/support/typeUtils","../../../geometry","../../../core/Loadable","../../ogc/ogcFeatureUtils"],(function(e,t,o,r,n,i,l,c,u,a,s,p,y,d,f,g,S,h,m,O){"use strict";e.OGCFeatureSource=function(e){function o(){var t;return(t=e.apply(this,arguments)||this).collection=null,t.conformance=null,t.landingPage=null,t.layerDefinition=null,t.type="ogc-feature",t}t._inheritsLoose(o,e);var r=o.prototype;return r.load=function(e){const t=n.isSome(e)?e.signal:null,{collectionId:o,fields:r,geometryType:i,hasZ:l,objectIdField:c,spatialReference:u,timeInfo:s,url:p}=this.layer,y={fields:null==r?void 0:r.map((e=>e.toJSON())),geometryType:S.typeKebabDictionary.toJSON(i),hasZ:l,objectIdField:c,spatialReference:null==u?void 0:u.toJSON(),timeInfo:null==s?void 0:s.toJSON()};return this.addResolvingPromise(d.all([O.getServerLandingPage(p,t),O.getServerConformance(p,t),O.getServerCollection(p,o,t),O.getCollectionDefinition(p,o,y,t)]).then((e=>{const[t,o,r,n]=e;this.set({landingPage:t,conformance:o,collection:r,layerDefinition:n});const i="www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson";if(!(-1!==(null==o?void 0:o.conformsTo.indexOf(`http://${i}`))||-1!==(null==o?void 0:o.conformsTo.indexOf(`https://${i}`))))throw new a("ogc-feature-layer:no-geojson-support","Server does not support geojson")}))),this.when()},r.queryExtent=function(e,t={}){return null},r.queryFeatureCount=function(e,t={}){return null},r.queryFeatures=function(e,t={}){const o=this._getFeatureDefinition();return this.load(t).then((()=>O.queryFeatureSet(o,e,t)))},r.queryFeaturesJSON=function(e,t={}){const o=this._getFeatureDefinition();return this.load(t).then((()=>O.queryFeatureSetJSON(o,e,t)))},r.queryObjectIds=function(e,t={}){return null},r._getFeatureDefinition=function(){const{layer:{capabilities:e,collectionId:t,url:o},layerDefinition:r}=this;return{capabilities:e,collectionId:t,layerDefinition:r,url:o}},t._createClass(o,[{key:"fullExtent",get:function(){var e,t;const o=null==(e=this.collection)||null==(t=e.extent)?void 0:t.spatial;if(!o)return null;const r=o.bbox[0],n=4===r.length,i=r[0],l=r[1],c=n?void 0:r[2],u=n?r[2]:r[3],a=n?r[3]:r[4],s=n?void 0:r[5],p=f.WGS84;return new g({xmin:i,ymin:l,xmax:u,ymax:a,zmin:c,zmax:s,spatialReference:p})}}]),o}(m),o.__decorate([c.property()],e.OGCFeatureSource.prototype,"collection",void 0),o.__decorate([c.property()],e.OGCFeatureSource.prototype,"conformance",void 0),o.__decorate([c.property({dependsOn:["collection"],readOnly:!0,type:g})],e.OGCFeatureSource.prototype,"fullExtent",null),o.__decorate([c.property()],e.OGCFeatureSource.prototype,"landingPage",void 0),o.__decorate([c.property({constructOnly:!0})],e.OGCFeatureSource.prototype,"layer",void 0),o.__decorate([c.property()],e.OGCFeatureSource.prototype,"layerDefinition",void 0),o.__decorate([c.property()],e.OGCFeatureSource.prototype,"type",void 0),e.OGCFeatureSource=o.__decorate([u.subclass("esri.layers.graphics.sources.OGCFeatureSource")],e.OGCFeatureSource);var v=e.OGCFeatureSource;e.default=v,Object.defineProperty(e,"__esModule",{value:!0})}));
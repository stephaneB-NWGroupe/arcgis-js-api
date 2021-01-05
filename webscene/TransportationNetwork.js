/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/JSONSupport"],(function(e,r,t,o,s,p,n,c,i,u,a){"use strict";var l;let h=l=function(r){function t(e){return r.call(this,e)||this}return e._inheritsLoose(t,r),t.prototype.clone=function(){return new l({name:this.name,path:this.path,title:this.title})},t}(a.JSONSupport);return r.__decorate([p.property({type:String,json:{write:!0}})],h.prototype,"name",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],h.prototype,"path",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],h.prototype,"title",void 0),h=l=r.__decorate([n.subclass("esri.webscene.TransportationNetwork")],h),h}));
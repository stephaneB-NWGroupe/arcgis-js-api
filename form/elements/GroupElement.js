/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/lang","../../core/Logger","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/cast","../../core/accessorSupport/decorators/reader","../../core/accessorSupport/decorators/subclass","../../core/accessorSupport/decorators/writer","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","./Element","../support/elements"],(function(e,t,r,o,s,n,i,l,c,p,a,u,d,m,y){"use strict";var _;let E=_=function(t){function r(e){var r;return(r=t.call(this,e)||this).elements=null,r.initialState="expanded",r.type="group",r}e._inheritsLoose(r,t);var s=r.prototype;return s.castElements=function(e){return y.ensureType(e,f,!1)},s.readElements=function(e,t){return y.fromJSON(t.formElements,f,!1)},s.writeElements=function(e,t){t.formElements=y.toJSON(e,f,!1)},s.clone=function(){return new _({description:this.description,elements:o.clone(this.elements),initialState:this.initialState,label:this.label,visibilityExpression:this.visibilityExpression})},r}(m.Element);t.__decorate([n.property({json:{write:!0}})],E.prototype,"elements",void 0),t.__decorate([i.cast("elements")],E.prototype,"castElements",null),t.__decorate([l.reader("elements",["formElements"])],E.prototype,"readElements",null),t.__decorate([p.writer("elements")],E.prototype,"writeElements",null),t.__decorate([n.property({type:["collapsed","expanded"],json:{default:"expanded",write:!0}})],E.prototype,"initialState",void 0),t.__decorate([n.property({type:String,json:{read:!1,write:!0}})],E.prototype,"type",void 0),E=_=t.__decorate([c.subclass("esri.form.elements.GroupElement")],E);const f=y.buildTypeMaps(E);return E}));
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/subclass","../../../core/Error","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../../../core/promiseUtils","../../../tasks/support/generateRendererUtils","../utils","../../statistics/support/utils","./support/utils","./FeatureLayerAdapter"],(function(e,t,r,s,i,a,n,o,l,u,c,p,d,f,h,y,m){"use strict";function g(e){return"esri.tasks.support.ClassBreaksDefinition"===e.declaredClass}function F(e){return"esri.tasks.support.UniqueValueDefinition"===e.declaredClass}let w=function(t){function r(e){return t.call(this,e)||this}e._inheritsLoose(r,t);var s=r.prototype;return s._createGenerateRendererResult=async function(e,t,r,s,i){const a=e&&e.features;if(!(a&&a.length))throw new o("csv-layer-adapter:insufficient-data","No features are available to calculate statistics");let n=null;if("percent-of-total"===s){if(n=(await y.calculateStatsFromMemory({field:t},a)).sum,null==n)throw new o("csv-layer-adapter:invalid","invalid normalizationTotal")}if(g(i)){const e=(await y.getDataValues({field:t,normalizationType:s,normalizationField:r,normalizationTotal:n},a)).filter((e=>null!=e&&y.isValidNumber(e)));return d.createGenerateRendererClassBreaks({definition:i,values:e,normalizationTotal:n})}if(F(i)){const e=(await y.getDataValues({field:t},a)).filter((e=>null!=e&&"string"==typeof e&&""!==e.trim()));return d.createGenerateRendererUniqueValues(e)}},s.generateRenderer=function(e,t){const r=e.classificationDefinition;let s=null,i=null,a=null;g(r)?(s=r.classificationField,i=r.normalizationField,a=r.normalizationType):F(r)&&(s=r.attributeField);const n=this.layer;return f.getFieldsList({field:s,normalizationField:i}).then((o=>{const l=n.createQuery();return l.returnGeometry=!1,l.outFields=o,l.where=h.mergeWhereClauses(l.where,e.where),n.queryFeatures(l,{signal:t}).then((e=>this._createGenerateRendererResult(e,s,i,a,r)))}))},s.load=function(e){const t=this.layer.load(e).then((e=>{this.geometryType=e.geometryType,this.objectIdField=e.objectIdField,this.supportsSQLExpression=!0,this._hasLocalSource=!1,this.hasQueryEngine=!0}));return this.addResolvingPromise(t),p.resolve(this)},r}(m);return w=t.__decorate([n.subclass("esri.smartMapping.support.adapters.CSVLayerAdapter")],w),w}));
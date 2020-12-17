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

define(["require","exports","./FunctionWrapper","./ImmutableArray","./ImmutablePathArray","./ImmutablePointArray","./polyfill/promiseUtils","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline","dojo/number"],(function(e,t,n,r,i,a,o,u,l,f,s,c,m,g){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.binaryOperator=t.MomentLibrary=t.tick=t.toStringArray=t.autoCastArrayOfPointsToMultiPoint=t.autoCastArrayOfPointsToPolyline=t.autoCastArrayOfPointsToPolygon=t.autoCastFeatureToGeometry=t.stableStringify=t.getDomain=t.getDomainCode=t.getDomainValue=t.fixNullGeometry=t.fixSpatialReference=t.toBoolean=t.toDateM=t.toDate=t.toNumber=t.toStringExplicit=t.toNumberArray=t.toString=t.equalityTest=t.greaterThanLessThan=t.standardiseDateFormat=t.formatDate=t.formatNumber=t.generateUUID=t.pcCheck=t.isDate=t.isImmutableArray=t.isFeatureSetCollection=t.isFeatureSet=t.isArray=t.isInteger=t.isNumber=t.isBoolean=t.isString=t.defaultUndefined=t.isSimpleType=t.isFunctionParameter=t.multiReplace=t.continueResult=t.breakResult=t.voidOperation=t.SizzleFunction=t.ReturnResult=t.ImplicitResult=t.NativeFunction=t.SizzleFunctionE=t.NativeFunctionE=t.ImplicitResultE=t.ReturnResultE=void 0;var d=function(e){this.value=e};t.ReturnResultE=d;var y=function(e){this.value=e};t.ImplicitResultE=y;var p=function(e){this.fn=e};t.NativeFunctionE=p;var h=function(e){this.fn=e};function v(e,t,n){return""===t?e:null===t?e:void 0===t?e:t===n?e:t===n?e:e=e.split(t).join(n)}function x(e){return e instanceof p||e instanceof n||e instanceof h}function S(e){return!!T(e)||(!!R(e)||(!!O(e)||(!!b(e)||(null===e||(e===t.voidOperation||"number"==typeof e)))))}function T(e){return"string"==typeof e||e instanceof String}function b(e){return"boolean"==typeof e}function R(e){return"number"==typeof e}function N(e){return e instanceof Array}function M(e){return e instanceof r}function O(e){return e instanceof Date}function C(e,t){return!1===isNaN(e)?null==t||""===t?e.toString():(t=v(t,"‰",""),t=v(t,"¤",""),g.format(e,{pattern:t})):e.toString()}function F(e,n){var r=t.MomentLibrary.Moment(e);return null==n||""===n?r.format():r.format(_(n))}function _(e){return e.replace(/(LTS)|L|l/g,(function(e){return"["+e+"]"}))}function A(e,t,n){switch(n){case">":return e>t;case"<":return e<t;case">=":return e>=t;case"<=":return e<=t}return!1}function I(e,n){if(e===n)return!0;if(null===e&&n===t.voidOperation||null===n&&e===t.voidOperation)return!0;if(O(e)&&O(n))return e.getTime()===n.getTime();if(e instanceof i)return e.equalityTest(n);if(e instanceof a)return e.equalityTest(n);if(e instanceof s&&n instanceof s){var r,o;if(r=e.getCacheValue("_arcadeCacheId"),o=n.getCacheValue("_arcadeCacheId"),null!=r)return r===o}if(void 0!==e&&void 0!==n&&null!==e&&null!==n&&"object"==typeof e&&"object"==typeof n){if(e._arcadeCacheId===n._arcadeCacheId&&void 0!==e._arcadeCacheId&&null!==e._arcadeCacheId)return!0;if(e._underlyingGraphic===n._underlyingGraphic&&void 0!==e._underlyingGraphic&&null!==e._underlyingGraphic)return!0}return!1}function w(e,n){if(T(e))return e;if(null===e)return"";if(R(e))return C(e,n);if(b(e))return e.toString();if(O(e))return F(e,n);if(e instanceof l)return JSON.stringify(e.toJson());if(N(e)){for(var i=[],a=0;a<e.length;a++)i[a]=P(e[a]);return"["+i.join(",")+"]"}if(e instanceof r){for(i=[],a=0;a<e.length();a++)i[a]=P(e.get(a));return"["+i.join(",")+"]"}return null!==e&&"object"==typeof e&&void 0!==e.castToText?e.castToText():x(e)?"object, Function":(t.voidOperation,"")}function D(e,n){if(T(e))return e;if(null===e)return"";if(R(e))return C(e,n);if(b(e))return e.toString();if(O(e))return F(e,n);if(e instanceof l)return e instanceof u?'{"xmin":'+e.xmin.toString()+',"ymin":'+e.ymin.toString()+","+(e.hasZ?'"zmin":'+e.zmin.toString()+",":"")+(e.hasM?'"mmin":'+e.mmin.toString()+",":"")+'"xmax":'+e.xmax.toString()+',"ymax":'+e.ymax.toString()+","+(e.hasZ?'"zmax":'+e.zmax.toString()+",":"")+(e.hasM?'"mmax":'+e.mmax.toString()+",":"")+'"spatialReference":'+j(e.spatialReference)+"}":j(e.toJson(),(function(e,t){return e.key===t.key?0:"spatialReference"===e.key?1:"spatialReference"===t.key?-1:e.key<t.key?-1:e.key>t.key?1:0}));if(N(e)){for(var i=[],a=0;a<e.length;a++)i[a]=P(e[a]);return"["+i.join(",")+"]"}if(e instanceof r){for(i=[],a=0;a<e.length();a++)i[a]=P(e.get(a));return"["+i.join(",")+"]"}return null!==e&&"object"==typeof e&&void 0!==e.castToText?e.castToText():x(e)?"object, Function":(t.voidOperation,"")}function P(e){if(null===e)return"null";if(b(e)||R(e)||T(e))return JSON.stringify(e);if(e instanceof l)return D(e);if(e instanceof r)return D(e);if(e instanceof Array)return D(e);if(e instanceof Date)return JSON.stringify(F(e,""));if(null!==e&&"object"==typeof e){if(void 0!==e.castToText)return e.castToText()}else if(e===t.voidOperation)return"null";return"null"}function k(e,n){return R(e)?e:null===e?0:""===e?0:O(e)?NaN:b(e)?e?1:0:N(e)?NaN:""===e?NaN:void 0===e?NaN:void 0!==n&&T(e)?(n=v(n,"‰",""),n=v(n,"¤",""),g.parse(e,{pattern:n})):e===t.voidOperation?0:Number(e)}function E(e,t){var n;return t.fields.some((function(t){return t.name===e&&(n=t.domain),!!n})),n}function j(e,t){t||(t={}),"function"==typeof t&&(t={cmp:t});var n,r="boolean"==typeof t.cycles&&t.cycles,i=t.cmp&&(n=t.cmp,function(e){return function(t,r){var i={key:t,value:e[t]},a={key:r,value:e[r]};return n(i,a)}}),a=[];return function e(t){if(t&&t.toJson&&"function"==typeof t.toJson&&(t=t.toJson()),void 0!==t){if("number"==typeof t)return isFinite(t)?""+t:"null";if("object"!=typeof t)return JSON.stringify(t);var n,o;if(Array.isArray(t)){for(o="[",n=0;n<t.length;n++)n&&(o+=","),o+=e(t[n])||"null";return o+"]"}if(null===t)return"null";if(-1!==a.indexOf(t)){if(r)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var u=a.push(t)-1,l=Object.keys(t).sort(i&&i(t));for(o="",n=0;n<l.length;n++){var f=l[n],s=e(t[f]);s&&(o&&(o+=","),o+=JSON.stringify(f)+":"+s)}return a.splice(u,1),"{"+o+"}"}}(e)}function L(e,t){if(!(t instanceof s))throw new Error("Invalid Argument");e.push([t.x,t.y])}t.SizzleFunctionE=h,t.NativeFunction=p,t.ImplicitResult=y,t.ReturnResult=d,t.SizzleFunction=h,t.voidOperation={type:"VOID"},t.breakResult={type:"BREAK"},t.continueResult={type:"CONTINUE"},t.multiReplace=v,t.isFunctionParameter=x,t.isSimpleType=S,t.defaultUndefined=function(e,t){return void 0===e?t:e},t.isString=T,t.isBoolean=b,t.isNumber=R,t.isInteger=function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},t.isArray=N,t.isFeatureSet=function(e){return!0===(e&&e.declaredRootClass&&"esri.arcade.featureset.support.FeatureSet"===e.declaredRootClass)},t.isFeatureSetCollection=function(e){return!0===(e&&e.declaredRootClass&&"esri.arcade.featureSetCollection"===e.declaredRootClass)},t.isImmutableArray=M,t.isDate=O,t.pcCheck=function(e,t,n){if(e.length<t||e.length>n)throw new Error("Function called with wrong number of Parameters")},t.generateUUID=function(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)}))},t.formatNumber=C,t.formatDate=F,t.standardiseDateFormat=_,t.greaterThanLessThan=function(e,n,r){if(null===e){if(null===n||n===t.voidOperation)return A(null,null,r);if(R(n))return A(0,n,r);if(T(n))return A(0,k(n),r);if(b(n))return A(0,k(n),r);if(O(n))return A(0,n.getTime(),r)}if(e===t.voidOperation){if(null===n||n===t.voidOperation)return A(null,null,r);if(R(n))return A(0,n,r);if(T(n))return A(0,k(n),r);if(b(n))return A(0,k(n),r);if(O(n))return A(0,n.getTime(),r)}else if(R(e)){if(R(n))return A(e,n,r);if(b(n))return A(e,k(n),r);if(null===n||n===t.voidOperation)return A(e,0,r);if(T(n))return A(e,k(n),r);if(O(n))return A(e,n.getTime(),r)}else if(T(e)){if(T(n))return A(w(e),w(n),r);if(O(n))return A(k(e),n.getTime(),r);if(R(n))return A(k(e),n,r);if(null===n||n===t.voidOperation)return A(k(e),0,r);if(b(n))return A(k(e),k(n),r)}else if(O(e)){if(O(n))return A(e,n,r);if(null===n||n===t.voidOperation)return A(e.getTime(),0,r);if(R(n))return A(e.getTime(),n,r);if(b(n))return A(e.getTime(),k(n),r);if(T(n))return A(e.getTime(),k(n),r)}else if(b(e)){if(b(n))return A(e,n,r);if(R(n))return A(k(e),k(n),r);if(O(n))return A(k(e),n.getTime(),r);if(null===n||n===t.voidOperation)return A(k(e),0,r);if(T(n))return A(k(e),k(n),r)}return!!I(e,n)&&("<="===r||">="===r)},t.equalityTest=I,t.toString=w,t.toNumberArray=function(e){var t=[];if(!1===N(e))return null;if(e instanceof r){for(var n=0;n<e.length();n++)t[n]=k(e.get(n));return t}for(n=0;n<e.length;n++)t[n]=k(e[n]);return t},t.toStringExplicit=D,t.toNumber=k,t.toDate=function(e,n){if(O(e))return e;if(T(e)){var r=t.MomentLibrary.Moment(e,[null==n||""===n?t.MomentLibrary.Moment.ISO_8601:n]);if(r.isValid())return r.toDate()}return null},t.toDateM=function(e,n){if(O(e))return t.MomentLibrary.Moment(e);if(T(e)){var r=t.MomentLibrary.Moment(e,[null==n||""===n?t.MomentLibrary.Moment.ISO_8601:n]);if(r.isValid())return r}return null},t.toBoolean=function(e){return b(e)?e:T(e)?"true"===(e=e.toLowerCase()):!!R(e)&&(0!==e&&!isNaN(e))},t.fixSpatialReference=function(e,t){return null==e?null:(null!==e.spatialReference&&void 0!==e.spatialReference||(e.spatialReference=t),e)},t.fixNullGeometry=function(e){if(null===e)return null;if(e instanceof s)return"NaN"===e.x||null===e.x||isNaN(e.x)?null:e;if(e instanceof c){if(0===e.rings.length)return null;for(var t=0,n=e.rings;t<n.length;t++){if(n[t].length>0)return e}return null}if(e instanceof m){if(0===e.paths.length)return null;for(var r=0,i=e.paths;r<i.length;r++){if(i[r].length>0)return e}return null}return e instanceof f?0===e.points.length?null:e:e instanceof u?"NaN"===e.xmin||null===e.xmin||isNaN(e.xmin)?null:e:null},t.getDomainValue=function(e,t){if(!e)return t;if(!e.domain)return t;var n=null;if("string"===e.field.type||"esriFieldTypeString"===e.field.type)t=w(t);else{if(null==t)return null;if(""===t)return t;t=k(t)}for(var r=0;r<e.domain.codedValues.length;r++){var i=e.domain.codedValues[r];i.code===t&&(n=i)}return null===n?t:n.name},t.getDomainCode=function(e,t){if(!e)return t;if(!e.domain)return t;var n=null;t=w(t);for(var r=0;r<e.domain.codedValues.length;r++){var i=e.domain.codedValues[r];i.name===t&&(n=i)}return null===n?t:n.code},t.getDomain=function(e,t,n,r){if(void 0===n&&(n=null),!t)return null;if(!t.fields)return null;for(var i,a,o=null,u=0;u<t.fields.length;u++){var l=t.fields[u];l.name.toLowerCase()===e.toString().toLowerCase()&&(o=l)}if(null===o)throw new Error("Field not found");return r||(r=n&&t.typeIdField&&n._field(t.typeIdField)),null!=r&&t.types.some((function(e){return e.id===r&&((i=e.domains&&e.domains[o.name])&&"inherited"===i.type&&(i=E(o.name,t),a=!0),!0)})),a||i||(i=E(e,t)),{field:o,domain:i}},t.stableStringify=j,t.autoCastFeatureToGeometry=function(e){if(null===e)return null;for(var t=[],n=0,r=e;n<r.length;n++){var i=r[n];i&&(i.declaredClass&&"esri.arcade.Feature"===i.declaredClass||"FeatureSetReader"===i.type)?t.push(i.geometry()):t.push(i)}return t},t.autoCastArrayOfPointsToPolygon=function(e,t){if(N(e)||M(e)){var n=!1,r=!1,i=[],o=t;if(N(e)){for(var u=0,l=e;u<l.length;u++){L(i,l[u])}i.length>0&&(o=e[0].spatialReference,n=e[0].hasZ,r=e[0].hasM)}else if(e instanceof a)(i=e._elements).length>0&&(n=e._hasZ,r=e._hasM,o=e.get(0).spatialReference);else{if(!M(e))throw new Error("Invalid Argument");for(var f=0,s=e.toArray();f<s.length;f++){L(i,s[f])}i.length>0&&(o=e.get(0).spatialReference,n=!0===e.get(0).hasZ,r=!0===e.get(0).hasM)}return 0===i.length?null:(!1===new c({rings:[],spatialReference:{wkid:4326}}).isClockwise(i)&&(i=i.slice(0).reverse()),new c({rings:[i],spatialReference:o,hasZ:n,hasM:r}))}return e},t.autoCastArrayOfPointsToPolyline=function(e,t){if(N(e)||M(e)){var n=!1,r=!1,i=[],o=t;if(N(e)){for(var u=0,l=e;u<l.length;u++){L(i,l[u])}i.length>0&&(o=e[0].spatialReference,n=!0===e[0].hasZ,r=!0===e[0].hasM)}else if(e instanceof a)(i=e._elements).length>0&&(n=e._hasZ,r=e._hasM,o=e.get(0).spatialReference);else if(M(e)){for(var f=0,s=e.toArray();f<s.length;f++){L(i,s[f])}i.length>0&&(o=e.get(0).spatialReference,n=!0===e.get(0).hasZ,r=!0===e.get(0).hasM)}return 0===i.length?null:new m({paths:[i],spatialReference:o,hasZ:n,hasM:r})}return e},t.autoCastArrayOfPointsToMultiPoint=function(e,t){if(N(e)||M(e)){var n=!1,r=!1,i=[],o=t;if(N(e)){for(var u=0,l=e;u<l.length;u++){L(i,l[u])}i.length>0&&(o=e[0].spatialReference,n=!0===e[0].hasZ,r=!0===e[0].hasM)}else if(e instanceof a)(i=e._elements).length>0&&(n=e._hasZ,r=e._hasM,o=e.get(0).spatialReference);else if(M(e)){for(var s=0,c=e.toArray();s<c.length;s++){L(i,c[s])}i.length>0&&(o=e.get(0).spatialReference,n=!0===e.get(0).hasZ,r=!0===e.get(0).hasM)}return 0===i.length?null:new f({points:i,spatialReference:o,hasZ:n,hasM:r})}return e},t.toStringArray=function(e,t){void 0===t&&(t=!1);var n=[];if(null===e)return n;if(!0===N(e)){for(var i=0;i<e.length;i++){""===(a=w(e[i]))&&!0!==t||n.push(a)}return n}if(e instanceof r){for(i=0;i<e.length();i++){var a;""===(a=w(e.get(i)))&&!0!==t||n.push(a)}return n}return S(e)?(""===(a=w(e))&&!0!==t||n.push(a),n):[]};var Z=0;t.tick=function(e){return++Z%100==0?(Z=0,o.create((function(t){setTimeout((function(){t(e)}),0)}))):e},t.MomentLibrary={Moment:null},t.binaryOperator=function(e,t,n){switch(n){case"&":return e&t;case"|":return e|t;case"^":return e^t;case"<<":return e<<t;case">>":return e>>t;case">>>":return e>>>t}}}));
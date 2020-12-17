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

define(["require","exports","../../../../renderers/support/utils","../graphics/graphicUtils","../../lib/glMatrix"],(function(e,o,t,i,r){Object.defineProperty(o,"__esModule",{value:!0});var n;function l(e){return null!=e}function s(e){return"number"==typeof e}function a(e){return"string"==typeof e}function u(e,o){e&&e.push(o),c(o)}function f(e){0}function c(e){0}function v(e,o,i,r,n){var a=e.minSize,f=e.maxSize;if(e.expression)return u(n,"Could not convert size info: expression not supported"),!1;if(e.useSymbolValue){var c=r.symbolSize[i];return o.minSize[i]=c,o.maxSize[i]=c,o.offset[i]=o.minSize[i],o.factor[i]=0,o.type[i]=1,!0}if(l(e.field))return l(e.stops)?2===e.stops.length&&s(e.stops[0].size)&&s(e.stops[1].size)?(d(e.stops[0].size,e.stops[1].size,e.stops[0].value,e.stops[1].value,o,i),o.type[i]=1,!0):(u(n,"Could not convert size info: stops only supported with 2 elements"),!1):s(a)&&s(f)&&l(e.minDataValue)&&l(e.maxDataValue)?(d(a,f,e.minDataValue,e.maxDataValue,o,i),o.type[i]=1,!0):null!=t.meterIn[e.valueUnit]?(o.minSize[i]=-1/0,o.maxSize[i]=1/0,o.offset[i]=0,o.factor[i]=1/t.meterIn[e.valueUnit],o.type[i]=1,!0):"unknown"===e.valueUnit?(u(n,"Could not convert size info: proportional size not supported"),!1):(u(n,"Could not convert size info: scale-dependent size not supported"),!1);if(!l(e.field)){if(e.stops&&e.stops[0]&&s(e.stops[0].size))return o.minSize[i]=e.stops[0].size,o.maxSize[i]=e.stops[0].size,o.offset[i]=o.minSize[i],o.factor[i]=0,o.type[i]=1,!0;if(s(a))return o.minSize[i]=a,o.maxSize[i]=a,o.offset[i]=a,o.factor[i]=0,o.type[i]=1,!0}return u(n,"Could not convert size info: unsupported variant of sizeInfo"),!1}function d(e,o,t,i,r,n){var l=Math.abs(i-t)>0?(o-e)/(i-t):0;r.minSize[n]=l>0?e:o,r.maxSize[n]=l>0?o:e,r.offset[n]=e-t*l,r.factor[n]=l}function p(e,o,t,i){if(e.normalizationField||e.valueRepresentation)return u(i,"Could not convert size info: unsupported property"),null;if(null!=(r=e.field)&&!a(r))return u(i,"Could not convert size info: field is not a string"),null;var r,n;if(o.size){if(e.field)if(o.size.field){if(e.field!==o.size.field)return u(i,"Could not convert size info: multiple fields in use"),null}else o.size.field=e.field}else o.size={field:e.field,minSize:[0,0,0],maxSize:[0,0,0],offset:[0,0,0],factor:[0,0,0],type:[0,0,0]};switch(e.axis){case"width":return(n=v(e,o.size,0,t,i))?o:null;case"height":return(n=v(e,o.size,2,t,i))?o:null;case"depth":return(n=v(e,o.size,1,t,i))?o:null;case"width-and-depth":return(n=v(e,o.size,0,t,i))&&v(e,o.size,1,t,i),n?o:null;case null:case void 0:case"all":return(n=(n=(n=v(e,o.size,0,t,i))&&v(e,o.size,1,t,i))&&v(e,o.size,2,t,i))?o:null;default:return u(i,'Could not convert size info: unknown axis "'+e.axis+'""'),null}}function z(e,o,t){e[4*o+0]=t.r/255,e[4*o+1]=t.g/255,e[4*o+2]=t.b/255,e[4*o+3]=t.a}function m(e,o,t,i){var r=2===t&&"arithmetic"===e.rotationType;o.offset[t]=r?90:0,o.factor[t]=r?-1:1,o.type[t]=1}function S(e,o,t){if(!e)return null;var i=!o.supportedTypes||!!o.supportedTypes.size,r=!o.supportedTypes||!!o.supportedTypes.color,n=!o.supportedTypes||!!o.supportedTypes.rotation;var s=e.reduce((function(e,s){if(!e)return e;if(s.valueExpression)return u(t,"Could not convert visual variables: arcade expressions not supported"),null;switch(s.type){case"size":return i?p(s,e,o,t):e;case"color":return r?function(e,o,t){if(e.normalizationField)return u(t,"Could not convert color info: unsupported property"),null;if(a(e.field))if(e.stops){if(e.stops.length>8)return u(t,"Could not convert color info: too many color stops"),null;o.color={field:e.field,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(var i=e.stops,r=0;r<8;++r){var n=i[Math.min(r,i.length-1)];o.color.values[r]=n.value,z(o.color.colors,r,n.color)}}else{if(!e.colors)return u(t,"Could not convert color info: missing stops or colors"),null;if(!l(e.minDataValue)||!l(e.maxDataValue))return u(t,"Could not convert color info: missing data values"),null;if(2!==e.colors.length)return u(t,"Could not convert color info: invalid colors array"),null;o.color={field:e.field,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},o.color.values[0]=e.minDataValue,z(o.color.colors,0,e.colors[0]),o.color.values[1]=e.maxDataValue,z(o.color.colors,1,e.colors[1]);for(r=2;r<8;++r)o.color.values[r]=e.maxDataValue,z(o.color.colors,r,e.colors[1])}else{if(!(e.stops&&e.stops.length>=0||e.colors&&e.colors.length>=0))return u(t,"Could not convert color info: no field and no colors/stops"),null;var s=e.stops&&e.stops.length>=0?e.stops[0].color:e.colors[0];o.color={field:null,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(r=0;r<8;r++)o.color.values[r]=1/0,z(o.color.colors,r,s)}return o}(s,e,t):e;case"rotation":return n?function(e,o,t){if(!a(e.field))return u(t,"Could not convert rotation info: field is not a string"),null;if(o.rotation){if(e.field)if(o.rotation.field){if(e.field!==o.rotation.field)return u(t,"Could not convert rotation info: multiple fields in use"),null}else o.rotation.field=e.field}else o.rotation={field:e.field,offset:[0,0,0],factor:[1,1,1],type:[0,0,0]};switch(e.axis){case"tilt":return m(e,o.rotation,0),o;case"roll":return m(e,o.rotation,1),o;case null:case void 0:case"heading":return m(e,o.rotation,2),o;default:return u(t,'Could not convert rotation info: unknown axis "'+e.axis+'""'),null}}(s,e,t):e;default:return u(t,"Could not convert visual variables: unsupported type "+s.type),null}}),{size:null,color:null,rotation:null});return s&&s.size&&!function(e,o,t){for(var i=0;i<3;++i){var r=o.unitInMeters;1===e.type[i]&&(r*=o.modelSize[i],e.type[i]=2),e.minSize[i]=e.minSize[i]/r,e.maxSize[i]=e.maxSize[i]/r,e.offset[i]=e.offset[i]/r,e.factor[i]=e.factor[i]/r}var n;if(0!==e.type[0])n=0;else if(0!==e.type[1])n=1;else{if(0===e.type[2])return u(t,"No size axis contains a valid size or scale"),!1;n=2}for(i=0;i<3;++i)0===e.type[i]&&(e.minSize[i]=e.minSize[n],e.maxSize[i]=e.maxSize[n],e.offset[i]=e.offset[n],e.factor[i]=e.factor[n],e.type[i]=e.type[n]);return!0}(s.size,o,t)?null:s}function y(e){return e&&null!=e.size}function b(e,o,t){if(!!e!=!!o)return f(),!1;if(e&&e.field!==o.field)return f(),!1;if(e&&"rotation"===t)for(var i=e,r=o,n=0;n<3;n++)if(i.type[n]!==r.type[n]||i.offset[n]!==r.offset[n]||i.factor[n]!==r.factor[n])return!1;return!0}function x(e,o){var t={vvSizeEnabled:!1,vvSizeMinSize:null,vvSizeMaxSize:null,vvSizeOffset:null,vvSizeFactor:null,vvSizeValue:null,vvColorEnabled:!1,vvColorValues:null,vvColorColors:null,vvSymbolAnchor:null,vvSymbolRotation:null},i=y(e);return e&&e.size?(t.vvSizeEnabled=!0,t.vvSizeMinSize=e.size.minSize,t.vvSizeMaxSize=e.size.maxSize,t.vvSizeOffset=e.size.offset,t.vvSizeFactor=e.size.factor):e&&i&&(t.vvSizeValue=o.transformation.scale),e&&i&&(t.vvSymbolAnchor=o.transformation.anchor,t.vvSymbolRotation=o.transformation.rotation),e&&e.color&&(t.vvColorEnabled=!0,t.vvColorValues=e.color.values,t.vvColorColors=e.color.colors),t}o.convertVisualVariables=S,o.initFastSymbolUpdatesState=function(e,o,t){if(!o)return f(),{enabled:!1};if(!e)return f(),{enabled:!1};if(e.disableFastUpdates)return f(),{enabled:!1};var i=S(e.visualVariables,t);return i?(c(),{enabled:!0,visualVariables:i,materialParameters:x(i,t),customTransformation:y(i)}):(f(),{enabled:!1})},o.updateFastSymbolUpdatesState=function(e,o,t){if(!o||!e.enabled)return!1;var i=e.visualVariables,r=S(o.visualVariables,t);return r?!!(b(i.size,r.size,"size")&&b(i.color,r.color,"color")&&b(i.rotation,r.rotation,"rotation"))&&(e.visualVariables=r,e.materialParameters=x(r,t),e.customTransformation=y(r),c(),!0):(f(),!1)},o.getMaterialParams=x,function(e){var o=r.mat4d,t=r.vec3,n=o.create(),l=t.create();e.evaluateModelTransform=function(e,t,r){var s,a,u;if(!e.vvSizeEnabled)return r;if(o.set(r,n),i.computeObjectRotation(e.vvSymbolRotation[2],e.vvSymbolRotation[0],e.vvSymbolRotation[1],n),e.vvSizeEnabled){for(var f=0;f<3;++f){var c=e.vvSizeOffset[f]+t[0]*e.vvSizeFactor[f];l[f]=(s=c,a=e.vvSizeMinSize[f],u=e.vvSizeMaxSize[f],s<a?a:s>u?u:s)}o.scale(n,l,n)}else o.scale(n,e.vvSizeValue,n);return o.translate(n,e.vvSymbolAnchor,n),n}}(n||(n={})),o.evaluateModelTransform=n.evaluateModelTransform}));
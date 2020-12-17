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

define(["require","exports","./ArcadePortal","./Attachment","./Dictionary","./Feature","./FunctionWrapper","./ImmutablePathArray","./ImmutablePointArray","./languageUtils","./treeAnalysis","./featureset/support/shared","./functions/array","./functions/date","./functions/geomasync","./functions/geometry","./functions/maths","./functions/stats","./functions/string","./polyfill/promiseUtils","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline","../SpatialReference"],(function(e,r,t,n,o,a,i,c,u,s,l,f,d,h,p,v,g,m,E,y,N,w,b,I,R,S,O){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.findFunctionCalls=r.referencesFunction=r.referencesMember=r.validateScript=r.extractFieldLiterals=r.executeScript=r.extend=r.functionHelper=void 0;function T(e){return e instanceof Error?y.reject(e):y.reject(new Error(e))}function M(e){return y.resolve(e)}function F(e,r){for(var t=[],n=0;n<r.arguments.length;n++)t.push(U(e,r.arguments[n]));return y.all(t)}function A(e,r,t){return y.create((function(n,o){F(e,r).then((function(a){try{n(t(e,r,a))}catch(e){o(e)}}),o)}))}function C(e,r,t){try{return F(e,r).then((function(n){try{var o=t(e,r,n);return(a=o)&&"function"==typeof a.then?o:y.resolve(o)}catch(e){return T(e)}var a}))}catch(e){return T(e)}}function U(e,r){try{switch(r.type){case"VariableDeclarator":return function(e,r){try{var t=null;return t=null===r.init?y.resolve(null):U(e,r.init),null!==e.localScope?t.then((function(t){return y.create((function(n){if(t===s.voidOperation&&(t=null),"Identifier"!==r.id.type)throw new Error("Can only assign a regular variable");var o=r.id.name.toLowerCase();e.localScope[o]={value:t,valueset:!0,node:r.init},n(s.voidOperation)}))})):t.then((function(t){return y.create((function(n){if("Identifier"!==r.id.type)throw new Error("Can only assign a regular variable");var o=r.id.name.toLowerCase();t===s.voidOperation&&(t=null),e.globalScope[o]={value:t,valueset:!0,node:r.init},n(s.voidOperation)}))}))}catch(e){return T(e)}}(e,r);case"VariableDeclaration":return function e(r,t,n){return y.create((function(o,a){n>=t.declarations.length?o(s.voidOperation):U(r,t.declarations[n]).then((function(){n===t.declarations.length-1?o(s.voidOperation):e(r,t,n+1).then((function(){o(s.voidOperation)}),a)}),a)}))}(e,r,0);case"BlockStatement":return function(e,r){try{return function e(r,t,n){try{return n>=t.body.length?y.resolve(s.voidOperation):y.create((function(o,a){U(r,t.body[n]).then((function(i){try{i instanceof s.ReturnResult||i===s.breakResult||i===s.continueResult?o(i):n===t.body.length-1?o(i):e(r,t,n+1).then(o,a)}catch(e){a(e)}}),a)}))}catch(e){return T(e)}}(e,r,0)}catch(e){return T(e)}}(e,r);case"FunctionDeclaration":return function(e,r){try{var t=r.id.name.toLowerCase();return e.globalScope[t]={valueset:!0,node:null,value:new i(r,e)},y.resolve(s.voidOperation)}catch(e){return T(e)}}(e,r);case"ReturnStatement":return function(e,r){return y.create((function(t,n){null===r.argument?t(new s.ReturnResult(s.voidOperation)):U(e,r.argument).then((function(e){try{t(new s.ReturnResult(e))}catch(e){n(e)}}),n)}))}(e,r);case"IfStatement":return function(e,r){return y.create((function(t,n){"AssignmentExpression"!==r.test.type&&"UpdateExpression"!==r.test.type?U(e,r.test).then((function(o){try{!0===o?U(e,r.consequent).then(t,n):!1===o?null!==r.alternate?U(e,r.alternate).then(t,n):t(s.voidOperation):n(new Error(l.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION")))}catch(e){n(e)}}),n):n(new Error(l.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION")))}))}(e,r);case"ExpressionStatement":return function(e,r){try{return"AssignmentExpression"===r.expression.type?U(e,r.expression):(r.expression.type,U(e,r.expression).then((function(e){return y.create((function(r){e===s.voidOperation?r(s.voidOperation):r(new s.ImplicitResult(e))}))})))}catch(e){return y.reject(e)}}(e,r);case"UpdateExpression":return function(e,r){try{var t=r.argument;if("MemberExpression"===t.type){var n={t:null};return U(e,t.object).then((function(r){var o=null;return n.t=r,!0===t.computed?o=U(e,t.property):"Identifier"===t.property.type&&(o=y.resolve(t.property.name)),o})).then((function(e){return y.create((function(t){var i,c=n.t;if(s.isArray(c)){if(!s.isNumber(e))throw new Error("Invalid Parameter");if(e<0&&(e=c.length+e),e<0||e>=c.length)throw new Error("Assignment outside of array bounds");i=s.toNumber(c[e]),c[e]="++"===r.operator?i+1:i-1}else if(c instanceof o){if(!1===s.isString(e))throw new Error("Dictionary accessor must be a string");if(!0!==c.hasField(e))throw new Error("Invalid Parameter");i=s.toNumber(c.field(e)),c.setField(e,"++"===r.operator?i+1:i-1)}else{if(!(c instanceof a))throw s.isImmutableArray(c)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===s.isString(e))throw new Error("Feature accessor must be a string");if(!0!==c.hasField(e))throw new Error("Invalid Parameter");i=s.toNumber(c.field(e)),c.setField(e,"++"===r.operator?i+1:i-1)}!1===r.prefix?t(i):t("++"===r.operator?i+1:i-1)}))}))}return y.create((function(t,n){var o,a="Identifier"===r.argument.type?r.argument.name.toLowerCase():"";if(!a)throw new Error("Invalid identifier");return null!==e.localScope&&void 0!==e.localScope[a]?(o=s.toNumber(e.localScope[a].value),e.localScope[a]={value:"++"===r.operator?o+1:o-1,valueset:!0,node:r},void(!1===r.prefix?t(o):t("++"===r.operator?o+1:o-1))):void 0!==e.globalScope[a]?(o=s.toNumber(e.globalScope[a].value),e.globalScope[a]={value:"++"===r.operator?o+1:o-1,valueset:!0,node:r},void(!1===r.prefix?t(o):t("++"===r.operator?o+1:o-1))):void n(new Error("Variable not recognised"))}))}catch(e){return y.reject(e)}}(e,r);case"AssignmentExpression":return function(e,r){return y.create((function(t,n){var i=r.left;if("MemberExpression"===i.type)U(e,r.right).then((function(c){try{U(e,i.object).then((function(u){try{var l=null;if(!0===i.computed)l=U(e,i.property);else{if("Identifier"!==i.property.type)throw new Error("Expected computed or identifier for assignemnt target");l=y.resolve(i.property.name)}l.then((function(e){try{if(s.isArray(u)){if(!s.isNumber(e))throw new Error("Invalid Parameter");if(e<0&&(e=u.length+e),e<0||e>u.length)throw new Error("Assignment outside of array bounds");if(e===u.length){if("="!==r.operator)throw new Error("Invalid Parameter");u[e]=k(c,r.operator,u[e],r)}else u[e]=k(c,r.operator,u[e],r)}else if(u instanceof o){if(!1===s.isString(e))throw new Error("Dictionary accessor must be a string");if(!0===u.hasField(e))u.setField(e,k(c,r.operator,u.field(e),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");u.setField(e,k(c,r.operator,null,r))}}else{if(!(u instanceof a))throw s.isImmutableArray(u)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===s.isString(e))throw new Error("Feature accessor must be a string");if(!0===u.hasField(e))u.setField(e,k(c,r.operator,u.field(e),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");u.setField(e,k(c,r.operator,null,r))}}t(s.voidOperation)}catch(e){n(e)}}),n)}catch(e){n(e)}}),n)}catch(e){n(e)}}),n);else{var c=i.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[c])return void U(e,r.right).then((function(o){try{e.localScope[c]={value:k(o,r.operator,e.localScope[c].value,r),valueset:!0,node:r.right},t(s.voidOperation)}catch(e){n(e)}}),n);void 0!==e.globalScope[c]?U(e,r.right).then((function(o){try{e.globalScope[c]={value:k(o,r.operator,e.globalScope[c].value,r),valueset:!0,node:r.right},t(s.voidOperation)}catch(e){n(e)}}),n):n(new Error("Cannot assign undeclared variable"))}}))}(e,r);case"ForStatement":return function(e,r){try{return null!==r.init?U(e,r.init).then((function(){return y.create((function(t,n){var o={testResult:!0,lastAction:s.voidOperation};P(e,r,o,(function(e){t(e)}),(function(e){n(e)}),0)}))})):y.create((function(t,n){var o={testResult:!0,lastAction:s.voidOperation};P(e,r,o,(function(e){t(e)}),(function(e){n(e)}),0)}))}catch(e){return y.reject(e)}}(e,r);case"ForInStatement":return function(e,r){return y.create((function(t,n){U(e,r.right).then((function(i){try{("VariableDeclaration"===r.left.type?U(e,r.left):y.resolve()).then((function(){try{var c="";if("VariableDeclaration"===r.left.type){var u=r.left.declarations[0].id;"Identifier"===u.type&&(c=u.name)}else"Identifier"===r.left.type&&(c=r.left.name);if(!c)throw new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDVARIABLE"));c=c.toLowerCase();var f=null;if(null!==e.localScope&&void 0!==e.localScope[c]&&(f=e.localScope[c]),null===f&&void 0!==e.globalScope[c]&&(f=e.globalScope[c]),null===f)return void n(new Error(l.nodeErrorMessage(r,"RUNTIME","VARIABLENOTDECLARED")));s.isArray(i)||s.isString(i)?D(e,r,i,{reject:n,resolve:t},f):s.isImmutableArray(i)?function(e,r,t,n,o,a){try{if(void 0===a&&(a="i"),0===t.length)return void n.resolve(s.voidOperation);!function e(r,t,n,o,a,i,c,u,l){try{if(n.length()<=a)return void c(s.voidOperation);o.value="k"===i?n.get(a):a,U(r,t.body).then((function(f){f instanceof s.ReturnResult?c(f):f===s.breakResult?c(s.voidOperation):++l>100?(l=0,setTimeout((function(){e(r,t,n,o,a+1,i,c,u,l)}),0)):e(r,t,n,o,a+1,i,c,u,l)}),(function(e){u(e)}))}catch(e){u(e)}}(e,r,t,o,0,a,(function(e){n.resolve(e)}),(function(e){n.reject(e)}),0)}catch(e){n.reject(e)}}(e,r,i,{reject:n,resolve:t},f):i instanceof o||i instanceof a?function(e,r,t,n,o){try{var a=t.keys();D(e,r,a,n,o,"k")}catch(e){n.reject(e)}}(e,r,i,{reject:n,resolve:t},f):s.isFeatureSet(i)?function e(r,t,n,o,i,c,u,l){try{r.next().then((function(f){try{if(null===f)c(s.voidOperation);else{var d=a.createFromGraphicLikeObject(f.geometry,f.attributes,o);d._underlyingGraphic=f,i.value=d,U(t,n.body).then((function(a){try{a===s.breakResult?c(s.voidOperation):a instanceof s.ReturnResult?c(a):++l>100?(l=0,setTimeout((function(){e(r,t,n,o,i,c,u,l)}),0)):e(r,t,n,o,i,c,u,l)}catch(e){u(e)}}),(function(e){u(e)}))}}catch(e){u(e)}}),(function(e){u(e)}))}catch(e){u(e)}}(i.iterator(e.abortSignal),e,r,i,f,(function(e){t(e)}),(function(e){n(e)}),0):D(e,r,[],{reject:n,resolve:t},f)}catch(e){n(e)}}),n)}catch(e){n(e)}}),n)}))}(e,r);case"BreakStatement":return y.resolve(s.breakResult);case"EmptyStatement":return y.resolve(s.voidOperation);case"ContinueStatement":return y.resolve(s.continueResult);case"TemplateElement":return function(e,r){return y.resolve(r.value?r.value.cooked:"")}(0,r);case"TemplateLiteral":return function(e,r){return y.create((function(t){var n=[];f.reduceArrayWithPromises(r.expressions,(function(r,t,o,a){return U(e,t).then((function(e){n[o]=s.toString(e)}))})).then((function(){for(var e="",o=0,a=0,i=r.quasis;a<i.length;a++){var c=i[a];if(e+=c.value?c.value.cooked:"",!1===c.tail)e+=n[o]?n[o]:"",o++}t(e)}))}))}(e,r);case"Identifier":return _(e,r);case"MemberExpression":return function(e,r){try{return U(e,r.object).then((function(t){try{return null===t?y.reject(new Error(l.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))):!1===r.computed?"Identifier"===r.property.type?t instanceof o||t instanceof a?y.resolve(t.field(r.property.name)):t instanceof w?y.resolve(j(t,r.property.name,e,r)):y.reject(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))):y.reject(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))):U(e,r.property).then((function(n){return y.create((function(i,c){if(t instanceof o||t instanceof a)s.isString(n)?i(t.field(n)):c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(t instanceof w)s.isString(n)?i(j(t,n,e,r)):c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(s.isArray(t))if(s.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length+n),n>=t.length||n<0)throw new Error(l.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(t[n])}else c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(s.isImmutableArray(t))if(s.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length()+n),n>=t.length()||n<0)throw new Error(l.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(t.get(n))}else c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(s.isString(t))if(s.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length+n),n>=t.length||n<0)throw new Error(l.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(t[n])}else c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else c(new Error(l.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")))}))}))}catch(e){return T(e)}}))}catch(e){return T(e)}}(e,r);case"Literal":return M(r.value);case"CallExpression":return function(e,r){try{if("Identifier"!==r.callee.type)return T(l.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));var t;if(null!==e.localScope)if(void 0!==e.localScope[r.callee.name.toLowerCase()])return(t=e.localScope[r.callee.name.toLowerCase()]).value instanceof s.NativeFunction?t.value.fn(e,r):t.value instanceof i?z(e,r,t.value.definition):T(l.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"));return void 0!==e.globalScope[r.callee.name.toLowerCase()]?(t=e.globalScope[r.callee.name.toLowerCase()]).value instanceof s.NativeFunction?t.value.fn(e,r):t.value instanceof i?z(e,r,t.value.definition):T(l.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION")):T(l.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(e){return T(e)}}(e,r);case"UnaryExpression":return function(e,r){try{return U(e,r.argument).then((function(e){return y.create((function(t,n){s.isBoolean(e)&&"!"===r.operator?t(!e):"-"===r.operator?t(-1*s.toNumber(e)):"+"===r.operator?t(1*s.toNumber(e)):"~"===r.operator?t(~s.toNumber(e)):n(new Error(l.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR")))}))}))}catch(e){return T(e)}}(e,r);case"BinaryExpression":return function(e,r){try{return y.all([U(e,r.left),U(e,r.right)]).then((function(e){return y.create((function(t,n){var o=e[0],a=e[1];switch(r.operator){case"|":case"<<":case">>":case">>>":case"^":case"&":t(s.binaryOperator(s.toNumber(o),s.toNumber(a),r.operator));case"==":t(s.equalityTest(o,a));break;case"!=":t(!s.equalityTest(o,a));break;case"<":case">":case"<=":case">=":t(s.greaterThanLessThan(o,a,r.operator));break;case"+":s.isString(o)||s.isString(a)?t(s.toString(o)+s.toString(a)):t(s.toNumber(o)+s.toNumber(a));break;case"-":t(s.toNumber(o)-s.toNumber(a));break;case"*":t(s.toNumber(o)*s.toNumber(a));break;case"/":t(s.toNumber(o)/s.toNumber(a));break;case"%":t(s.toNumber(o)%s.toNumber(a));break;default:n(new Error(l.nodeErrorMessage(r,"RUNTIME","OPERATORNOTRECOGNISED")))}}))}))}catch(e){return T(e)}}(e,r);case"LogicalExpression":return function(e,r){return y.create((function(t,n){"AssignmentExpression"!==r.left.type&&"UpdateExpression"!==r.left.type?"AssignmentExpression"!==r.right.type&&"UpdateExpression"!==r.right.type?U(e,r.left).then((function(o){try{if(!s.isBoolean(o))throw new Error(l.nodeErrorMessage(r,"RUNTIME","ONLYBOOLEAN"));switch(r.operator){case"||":!0===o?t(o):U(e,r.right).then((function(e){try{if(!s.isBoolean(e))throw new Error(l.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));t(e)}catch(e){n(e)}}),n);break;case"&&":!1===o?t(o):U(e,r.right).then((function(e){try{if(!s.isBoolean(e))throw new Error(l.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));t(e)}catch(e){n(e)}}),n);break;default:throw new Error(l.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}}catch(e){n(e)}}),n):n(new Error(l.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"))):n(new Error(l.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION")))}))}(e,r);case"ConditionalExpression":return T(l.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return function(e,r){try{for(var t=[],n=0;n<r.elements.length;n++)t.push(U(e,r.elements[n]));return y.all(t).then((function(e){return y.create((function(t,n){for(var o=0;o<e.length;o++){if(s.isFunctionParameter(e[o]))return void n(new Error(l.nodeErrorMessage(r,"RUNTIME","FUNCTIONCONTEXTILLEGAL")));e[o]===s.voidOperation&&(e[o]=null)}t(e)}))}))}catch(e){return T(e)}}(e,r);case"ObjectExpression":return function(e,r){try{for(var t=[],n=0;n<r.properties.length;n++)t.push(U(e,r.properties[n]));return y.all(t).then((function(e){return y.create((function(r){for(var t={},n=0;n<e.length;n++){var a=e[n];if(s.isFunctionParameter(a.value))throw new Error("Illegal Argument");if(!1===s.isString(a.key))throw new Error("Illegal Argument");a.value===s.voidOperation?t[a.key.toString()]=null:t[a.key.toString()]=a.value}var i=new o(t);i.immutable=!1,r(i)}))}))}catch(e){return T(e)}}(e,r);case"Property":return function(e,r){try{return U(e,r.value).then((function(t){return y.create((function(n){"Identifier"===r.key.type?n({key:r.key.name,value:t}):U(e,r.key).then((function(e){n({key:e,value:t})}))}))}))}catch(e){return y.reject(e)}}(e,r);default:return T(l.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(e){return T(e)}}function x(e,r,t){try{return U(e,r.body).then((function(n){try{return t.lastAction=n,t.lastAction===s.breakResult?(t.testResult=!1,y.resolve(t)):t.lastAction instanceof s.ReturnResult?(t.testResult=!1,y.resolve(t)):null!==r.update?U(e,r.update).then((function(){return y.resolve(t)})):y.resolve(t)}catch(e){return y.reject(e)}}))}catch(e){return y.reject(e)}}function P(e,r,t,n,o,a){try{(function(e,r,t){try{return null!==r.test?U(e,r.test).then((function(n){try{return!0===e.abortSignal.aborted?y.reject(new Error("Cancelled")):(t.testResult=n,!1===t.testResult?y.resolve(t):!0!==t.testResult?y.reject(new Error(l.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))):x(e,r,t))}catch(e){return y.reject(e)}})):x(e,r,t)}catch(e){return y.reject(e)}})(e,r,t).then((function(){try{!0===t.testResult?++a>100?(a=0,setTimeout((function(){P(e,r,t,n,o,a)}),0)):P(e,r,t,n,o,a):t.lastAction instanceof s.ReturnResult?n(t.lastAction):n(s.voidOperation)}catch(e){o(e)}}),(function(e){o(e)}))}catch(e){o(e)}}function D(e,r,t,n,o,a){try{if(void 0===a&&(a="i"),0===t.length)return void n.resolve(s.voidOperation);!function e(r,t,n,o,a,i,c,u,l,f){try{if(o<=i)return void u(s.voidOperation);a.value="k"===c?n[i]:i,U(r,t.body).then((function(d){try{d instanceof s.ReturnResult?u(d):d===s.breakResult?u(s.voidOperation):++f>100?(f=0,setTimeout((function(){e(r,t,n,o,a,i+1,c,u,l,f)}),0)):e(r,t,n,o,a,i+1,c,u,l,f)}catch(e){l(e)}}),(function(e){l(e)}))}catch(e){l(e)}}(e,r,t,t.length,o,0,a,(function(e){n.resolve(e)}),(function(e){n.reject(e)}),0)}catch(e){n.reject(e)}}function k(e,r,t,n){switch(r){case"=":return e===s.voidOperation?null:e;case"/=":return s.toNumber(t)/s.toNumber(e);case"*=":return s.toNumber(t)*s.toNumber(e);case"-=":return s.toNumber(t)-s.toNumber(e);case"+=":return s.isString(t)||s.isString(e)?s.toString(t)+s.toString(e):s.toNumber(t)+s.toNumber(e);case"%=":return s.toNumber(t)%s.toNumber(e);default:throw new Error(l.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}}var L=0;function j(e,r,t,n){var a;switch(r=r.toLowerCase()){case"hasz":var i=e.hasZ;return void 0!==i&&i;case"hasm":var s=e.hasM;return void 0!==s&&s;case"spatialreference":var f=e.spatialReference._arcadeCacheId;if(void 0===f){var d=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(d=!1),d&&(L++,e.spatialReference._arcadeCacheId=L,f=L)}var h=new o({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==f&&(h._arcadeCacheId="SPREF"+f.toString()),h}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":var p=e[r];return void 0!==p?p:null;case"type":return"Extent"}break;case"polygon":switch(r){case"rings":return void 0===(a=e.getCacheValue("_arcadeCacheId"))&&(a=++L,e.setCacheValue("_arcadeCacheId",a)),new c(e.rings,e.spatialReference,!0===e.hasZ,!0===e.hasM,a);case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":return void 0===(a=e.getCacheValue("_arcadeCacheId"))&&(a=++L,e.setCacheValue("_arcadeCacheId",a)),new c(e.paths,e.spatialReference,!0===e.hasZ,!0===e.hasM,a);case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":return void 0===(a=e.getCacheValue("_arcadeCacheId"))&&(a=++L,e.setCacheValue("_arcadeCacheId",a)),new u(e.points,e.spatialReference,!0===e.hasZ,!0===e.hasM,a,1);case"type":return"Multipoint"}}throw new Error(l.nodeErrorMessage(n,"RUNTIME","PROPERTYNOTFOUND"))}function _(e,r){return y.create((function(t,n){var o=r.name.toLowerCase();if(null===e.localScope||void 0===e.localScope[o])if(void 0===e.globalScope[o])n(new Error(l.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND")));else{var a=e.globalScope[o];!0===a.valueset?t(a.value):null!==a.d?a.d.then(t,n):(a.d=U(e,a.node),a.d.then((function(e){try{a.value=e,a.valueset=!0,t(e)}catch(e){n(e)}}),n))}else{var i=e.localScope[o];!0===i.valueset?t(i.value):null!==i.d?i.d.then(t,n):(i.d=U(e,i.node),i.d.then((function(e){try{i.value=e,i.valueset=!0,t(e)}catch(e){n(e)}}),n))}}))}var B={};function V(e){return null===e?"":s.isArray(e)?"Array":s.isImmutableArray(e)?"Array":s.isDate(e)?"Date":s.isString(e)?"String":s.isBoolean(e)?"Boolean":s.isNumber(e)?"Number":e instanceof n?"Attachment":e instanceof t?"Portal":e instanceof o?"Dictionary":e instanceof a?"Feature":e instanceof I?"Point":e instanceof R?"Polygon":e instanceof S?"Polyline":e instanceof b?"Multipoint":e instanceof N?"Extent":s.isFunctionParameter(e)?"Function":s.isFeatureSet(e)?"FeatureSet":s.isFeatureSetCollection(e)?"FeatureSetCollection":e===s.voidOperation?"":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function Y(e,r){try{var t=e.length,n=Math.floor(t/2);return 0===t?y.resolve([]):1===t?y.resolve([e[0]]):y.create((function(o,a){var i=[Y(e.slice(0,n),r),Y(e.slice(n,t),r)];y.all(i).then((function(e){try{(function e(r,t,n,o){return y.create((function(a,i){var c=o;r.length>0||t.length>0?r.length>0&&t.length>0?n(r[0],t[0]).then((function(u){try{isNaN(u)&&(u=1),u<=0?(c.push(r[0]),r=r.slice(1)):(c.push(t[0]),t=t.slice(1)),e(r,t,n,o).then(a,i)}catch(e){i(e)}}),i):r.length>0?(c.push(r[0]),r=r.slice(1),e(r,t,n,o).then(a,i)):t.length>0&&(c.push(t[0]),t=t.slice(1),e(r,t,n,o).then(a,i)):a(o)}))})(e[0],e[1],r,[]).then(o,a)}catch(e){a(e)}}),a)}))}catch(e){return T(e)}}function G(e,r){var t=e.length,n=Math.floor(t/2);return r||(r=function(e,r){return e<r?-1:e===r?0:1}),0===t?[]:1===t?[e[0]]:function(e,r,t){var n=[];for(;e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=t(e[0],r[0]);isNaN(o)&&(o=1),o<=0?(n.push(e[0]),e=e.slice(1)):(n.push(r[0]),r=r.slice(1))}else e.length>0?(n.push(e[0]),e=e.slice(1)):r.length>0&&(n.push(r[0]),r=r.slice(1));return n}(G(e.slice(0,n),r),G(e.slice(n,t),r),r)}function q(e,r,t){try{var n=e.body;if(t.length!==e.params.length)return T(new Error("Invalid Parameter calls to function."));for(var o=0;o<t.length;o++){var a=e.params[o];"Identifier"===a.type&&(r.localScope[a.name.toLowerCase()]={d:null,value:t[o],valueset:!0,node:null})}return U(r,n).then((function(e){return y.create((function(r,t){e instanceof s.ReturnResult?r(e.value):e!==s.breakResult?e!==s.continueResult?e instanceof s.ImplicitResult?r(e.value):r(e):t(new Error("Cannot Continue from a Function")):t(new Error("Cannot Break from a Function"))}))}))}catch(e){return y.reject(e)}}function z(e,r,t){return C(e,r,(function(r,n,o){var a={spatialReference:e.spatialReference,services:e.services,console:e.console,lrucache:e.lrucache,localScope:{},abortSignal:e.abortSignal,globalScope:e.globalScope,depthCounter:e.depthCounter+1};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return q(t,a,o)}))}function H(e){return function(){var r={abortSignal:e.context.abortSignal,spatialReference:e.context.spatialReference,console:e.context.console,lrucache:e.context.lrucache,services:e.context.services,localScope:{},globalScope:e.context.globalScope,depthCounter:e.context.depthCounter+1};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return q(e.definition,r,arguments)}}d.registerFunctions(B,A),h.registerFunctions(B,A),E.registerFunctions(B,A),g.registerFunctions(B,A),v.registerFunctions(B,A),m.registerFunctions(B,A),p.registerFunctions({functions:B,compiled:!1,signatures:null,failDefferred:null,evaluateIdentifier:null,arcadeCustomFunctionHandler:null,mode:"async",standardFunction:A,standardFunctionAsync:C}),B.typeof=function(e,r){return A(e,r,(function(e,r,t){s.pcCheck(t,1,1);var n=V(t[0]);if("Unrecognised Type"===n)throw new Error("Unrecognised Type");return n}))},B.iif=function(e,r){return y.create((function(t,n){s.pcCheck(null===r.arguments?[]:r.arguments,3,3),U(e,r.arguments[0]).then((function(o){try{if(!1===s.isBoolean(o))return void n(new Error("IF Function must have a boolean test condition"));y.all([U(e,r.arguments[1]),U(e,r.arguments[2])]).then((function(e){t(o?e[0]:e[1])}),n)}catch(e){n(e)}}),n)}))},B.decode=function(e,r){return y.create((function(t,n){r.arguments.length<2?n(new Error("Missing Parameters")):2!==r.arguments.length?(r.arguments.length-1)%2!=0?U(e,r.arguments[0]).then((function(o){try{(function e(r,t,n,o){return y.create((function(a,i){U(r,t.arguments[n]).then((function(c){try{if(s.equalityTest(c,o))return void U(r,t.arguments[n+1]).then(a,i);var u=t.arguments.length-n;return 1===u?void U(r,t.arguments[n]).then(a,i):(2===u&&a(null),3===u?void U(r,t.arguments[n+2]).then(a,i):void e(r,t,n+2,o).then(a,i))}catch(e){i(e)}}),i)}))})(e,r,1,o).then(t,n)}catch(e){n(e)}}),n):n(new Error("Must have a default value result.")):U(e,r.arguments[1]).then(t,n)}))},B.when=function(e,r){try{return r.arguments.length<3?T("Missing Parameters"):r.arguments.length%2==0?T("Must have a default value result."):U(e,r.arguments[0]).then((function(t){return y.create((function(n,o){if(!1!==s.isBoolean(t)){(function e(r,t,n,o){return y.create((function(a,i){!0===o?U(r,t.arguments[n+1]).then(a,i):3===t.arguments.length-n?U(r,t.arguments[n+2]).then(a,i):U(r,t.arguments[n+2]).then((function(o){try{if(!1===s.isBoolean(o))return void i(new Error("WHEN needs boolean test conditions"));e(r,t,n+2,o).then(a,i)}catch(e){i(e)}}))}))})(e,r,0,t).then(n,o)}else o(new Error("WHEN needs boolean test conditions"))}))}))}catch(e){return T(e)}},B.sort=function(e,r){return C(e,r,(function(e,r,t){s.pcCheck(t,1,2);var n,o=t[0];if(s.isImmutableArray(o)&&(o=o.toArray()),!1===s.isArray(o))return T(Error("Illegal Argument"));if(t.length>1)return!1===s.isFunctionParameter(t[1])?T(Error("Illegal Argument")):Y(n=o,H(t[1]));if(0===(n=o).length)return y.resolve([]);for(var a={},i=0;i<n.length;i++){var c=V(n[i]);""!==c&&(a[c]=!0)}if(!0===a.Array||!0===a.Dictionary||!0===a.Feature||!0===a.Point||!0===a.Polygon||!0===a.Polyline||!0===a.Multipoint||!0===a.Extent||!0===a.Function)return y.resolve(n.slice(0));var u=0,l="";for(var f in a)u++,l=f;return u>1||"String"===l?n=G(n,(function(e,r){if(null==e||e===s.voidOperation)return null==r||r===s.voidOperation?0:1;if(null==r||r===s.voidOperation)return-1;var t=s.toString(e),n=s.toString(r);return t<n?-1:t===n?0:1})):"Number"===l?n=G(n,(function(e,r){return e-r})):"Boolean"===l?n=G(n,(function(e,r){return e===r?0:r?-1:1})):"Date"===l&&(n=G(n,(function(e,r){return r-e}))),y.resolve(n)}))};var W={failDefferred:T,resolveDeffered:M,fixSpatialReference:s.fixSpatialReference,parseArguments:F,standardFunction:A,standardFunctionAsync:C,evaluateIdentifier:_,arcadeCustomFunction:H};for(var Z in B)B[Z]={value:new s.NativeFunction(B[Z]),valueset:!0,node:null};var K=function(){};function X(e){console.log(e)}(K.prototype=B).infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},K.prototype.pi={value:Math.PI,valueset:!0,node:null},r.functionHelper=W,r.extend=function(e){for(var r={mode:"async",compiled:!1,functions:{},signatures:[],standardFunction:A,standardFunctionAsync:C,failDefferred:T,evaluateIdentifier:_,arcadeCustomFunctionHandler:H},t=0;t<e.length;t++)e[t].registerFunctions(r);for(var n in r.functions)B[n]={value:new s.NativeFunction(r.functions[n]),valueset:!0,node:null},K.prototype[n]=B[n];for(t=0;t<r.signatures.length;t++)l.addFunctionDeclaration(r.signatures[t],"async")},r.executeScript=function(e,r){var t=r.spatialReference;null==t&&(t=new O({wkid:102100}));var n=function(e,r){var t=new K;null==e&&(e={}),null==r&&(r={});var n=new o({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});for(var i in n.immutable=!1,t.textformatting={value:n,valueset:!0,node:null},r)t[i]={value:new s.NativeFunction(r[i]),native:!0,valueset:!0,node:null};for(var i in e)e[i]&&"esri.Graphic"===e[i].declaredClass?t[i]={value:a.createFromGraphic(e[i]),valueset:!0,node:null}:t[i]={value:e[i],valueset:!0,node:null};return t}(r.vars,r.customfunctions);return U({spatialReference:t,services:r.services,abortSignal:void 0===r.abortSignal||null===r.abortSignal?{aborted:!1}:r.abortSignal,globalScope:n,console:r.console?r.console:X,lrucache:r.lrucache,localScope:null,depthCounter:1},e.body[0].body).then((function(e){return y.create((function(r,t){e instanceof s.ReturnResult&&(e=e.value),e instanceof s.ImplicitResult&&(e=e.value),e===s.voidOperation&&(e=null),e!==s.breakResult?e!==s.continueResult?e instanceof s.NativeFunction?t(new Error("Cannot return FUNCTION")):e instanceof i?t(new Error("Cannot return FUNCTION")):r(e):t(new Error("Cannot return CONTINUE")):t(new Error("Cannot return BREAK"))}))}))},r.extractFieldLiterals=function(e,r){return void 0===r&&(r=!1),l.findFieldLiterals(e)},r.validateScript=function(e,r){return l.validateScript(e,r,"full")},r.referencesMember=function(e,r){return l.referencesMember(e,r)},r.referencesFunction=function(e,r){return l.referencesFunction(e,r)},r.findFunctionCalls=function(e){return l.findFunctionCalls(e)}}));
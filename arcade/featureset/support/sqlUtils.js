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

define(["require","exports","../../languageUtils","./shared","../../polyfill/sql/WhereClause"],(function(e,r,a,t,n){"use strict";function s(e,r){return o(e.parseTree,r,e.parameters)}function o(e,r,a,t,n){var s,l,f,p;switch(void 0===t&&(t=null),void 0===n&&(n=null),e.type){case"interval":return d(o(e.value,r,a,t,n),e.qualifier,e.op);case"case_expression":var g=" CASE ";"simple"===e.format&&(g+=o(e.operand,r,a,t,n));for(var h=0;h<e.clauses.length;h++)g+=" WHEN "+o(e.clauses[h].operand,r,a,t,n)+" THEN "+o(e.clauses[h].value,r,a,t,n);return null!==e.else&&(g+=" ELSE "+o(e.else,r,a,t,n)),g+=" END ";case"param":var v=a[e.value.toLowerCase()];if("string"==typeof v)return"'"+a[e.value.toLowerCase()].toString().replace(/'/g,"''")+"'";if(v instanceof Date)return i(v,r);if(v instanceof Array){var T=[];for(h=0;h<v.length;h++)"string"==typeof v[h]?T.push("'"+v[h].toString().replace(/'/g,"''")+"'"):v[h]instanceof Date?T.push(i(v[h],r)):T.push(v[h].toString());return T}return v.toString();case"expr_list":l=[];for(var S=0,E=e.value;S<E.length;S++){var m=E[S];l.push(o(m,r,a,t,n))}return l;case"unary_expr":return" ( NOT "+o(e.expr,r,a,t,n)+" ) ";case"binary_expr":switch(e.operator){case"AND":return" ("+o(e.left,r,a,t,n)+" AND "+o(e.right,r,a,t,n)+") ";case"OR":return" ("+o(e.left,r,a,t,n)+" OR "+o(e.right,r,a,t,n)+") ";case"IS":if("null"!==e.right.type)throw new Error("Unsupported RHS for IS");return" ("+o(e.left,r,a,t,n)+" IS NULL )";case"ISNOT":if("null"!==e.right.type)throw new Error("Unsupported RHS for IS");return" ("+o(e.left,r,a,t,n)+" IS NOT NULL )";case"IN":return s=[],"expr_list"===e.right.type?(s=o(e.right,r,a,t,n)," ("+o(e.left,r,a,t,n)+" IN ("+s.join(",")+")) "):(p=o(e.right,r,a,t,n))instanceof Array?" ("+o(e.left,r,a,t,n)+" IN ("+p.join(",")+")) ":" ("+o(e.left,r,a,t,n)+" IN ("+p+")) ";case"NOT IN":return s=[],"expr_list"===e.right.type?(s=o(e.right,r,a,t,n)," ("+o(e.left,r,a,t,n)+" NOT IN ("+s.join(",")+")) "):(p=o(e.right,r,a,t,n))instanceof Array?" ("+o(e.left,r,a,t,n)+" NOT IN ("+p.join(",")+")) ":" ("+o(e.left,r,a,t,n)+" NOT IN ("+p+")) ";case"BETWEEN":return f=o(e.right,r,a,t,n)," ("+o(e.left,r,a,t,n)+" BETWEEN "+f[0]+" AND "+f[1]+" ) ";case"NOTBETWEEN":return f=o(e.right,r,a,t,n)," ("+o(e.left,r,a,t,n)+" NOT BETWEEN "+f[0]+" AND "+f[1]+" ) ";case"LIKE":return""!==e.escape?" ("+o(e.left,r,a,t,n)+" LIKE "+o(e.right,r,a,t,n)+" ESCAPE '"+e.escape+"') ":" ("+o(e.left,r,a,t,n)+" LIKE "+o(e.right,r,a,t,n)+") ";case"NOT LIKE":return""!==e.escape?" ("+o(e.left,r,a,t,n)+" NOT LIKE "+o(e.right,r,a,t,n)+" ESCAPE '"+e.escape+"') ":" ("+o(e.left,r,a,t,n)+" NOT LIKE "+o(e.right,r,a,t,n)+") ";case"<>":case"<":case">":case">=":case"<=":case"=":case"*":case"-":case"+":case"/":return" ("+o(e.left,r,a,t,n)+" "+e.operator+" "+o(e.right,r,a,t,n)+") "}throw new Error("Not Supported Operator "+e.operator);case"null":return"null";case"bool":return!0===e.value?"1":"0";case"string":return"'"+e.value.toString().replace(/'/g,"''")+"'";case"timestamp":case"date":return i(e.value,r);case"number":return e.value.toString();case"current_time":return u("date"===e.mode,r);case"column_ref":return t&&t.toLowerCase()===e.column.toLowerCase()?"("+n+")":e.column;case"function":var D=o(e.args,r,a,t,n);return c(e.name,D,r)}throw new Error("Unsupported sql syntax "+e.type)}function c(e,r,a){switch(e.toLowerCase().trim()){case"abs":if(1!==r.length)throw new Error("Invalid Parameter for call to ABS");return"abs("+r[0]+")";case"ceiling":case"ceil":if(1!==r.length)throw new Error("Invalid Parameter for call to CEILING");switch(a){case t.FeatureServiceDatabaseType.Standardised:case t.FeatureServiceDatabaseType.StandardisedNoInterval:default:return"CEILING("+r[0]+")"}case"floor":if(1!==r.length)throw new Error("Invalid Parameter for call to Floor");return"FLOOR("+r[0]+")";case"log":if(1!==r.length)throw new Error("Invalid Parameter for call to LOG");return"LOG("+r[0]+")";case"log10":if(1!==r.length)throw new Error("Invalid Parameter for call to LOG10");return"LOG10("+r[0]+")";case"power":if(2!==r.length)throw new Error("Invalid Parameter for call to POWER");return"POWER("+r[0]+","+r[1]+")";case"round":if(2===r.length)return"ROUND("+r[0]+","+r[1]+")";if(1===r.length)return"ROUND("+r[0]+")";throw new Error("Invalid Parameter for call to ROUND");case"truncate":if(r.length<1||r.length>2)throw new Error("Invalid Parameter for TRUNCATE function");switch(a){case t.FeatureServiceDatabaseType.SqlServer:return"ROUND("+r[0]+(1===r.length?"0":","+r[1])+",1)";default:return"TRUNCATE("+r[0]+(1===r.length?")":","+r[1]+")")}case"char_length":case"len":if(1!==r.length)throw new Error("Invalid Parameter for CHAR_LENGTH function");switch(a){case t.FeatureServiceDatabaseType.SqlServer:return"LEN("+r[0]+")";case t.FeatureServiceDatabaseType.Oracle:return"LENGTH("+r[0]+")";default:return"CHAR_LENGTH("+r[0]+")"}case"concat":if(r.length<1)throw new Error("Invalid Parameter for CONCAT function");for(var n="CONCAT(",s=0;s<r.length;s++)0!==s&&(n+=","),n+=r[s];return n+=")";case"lower":case"lcase":if(1!==r.length)throw new Error("Invalid Parameter for Lower function");return"LOWER("+r[0]+")";case"upper":case"ucase":if(1!==r.length)throw new Error("Invalid Parameter for Upper function");return"UPPER("+r[0]+")";case"substring":var o="";switch(a){case t.FeatureServiceDatabaseType.Oracle:return o="SUBSTR("+r[0]+","+r[1],3===r.length&&(o+=","+r[2]),o+=")";case t.FeatureServiceDatabaseType.SqlServer:return o=3===r.length?"SUBSTRING("+r[0]+","+r[1]+","+r[2]+")":"SUBSTRING("+r[0]+",  "+r[1]+", LEN("+r[0]+") - "+r[1]+")";default:return o="SUBSTRING("+r[0]+" FROM "+r[1],3===r.length&&(o+=" FOR "+r[2]),o+=")"}case"extract":return"EXTRACT("+r[0].replace(/\'/g,"")+" FROM "+r[1]+")"}throw new Error("Function Not Recognised")}function i(e,r){var n=a.MomentLibrary.Moment(e),s=0===n.minute()&&0===n.hour()&&0===n.second()&&0===n.millisecond();switch(r){case t.FeatureServiceDatabaseType.FILEGDB:case t.FeatureServiceDatabaseType.Standardised:case t.FeatureServiceDatabaseType.StandardisedNoInterval:return s?"date '"+n.format("YYYY-MM-DD")+"'":"date '"+n.format("YYYY-MM-DD HH:mm:ss")+"'";case t.FeatureServiceDatabaseType.Oracle:return s?"TO_DATE('"+n.format("YYYY-MM-DD")+"','YYYY-MM-DD')":"TO_DATE('"+n.format("YYYY-MM-DD HH:mm:ss")+"','YYYY-MM-DD HH24:MI:SS')";case t.FeatureServiceDatabaseType.SqlServer:return"'"+n.format(s?"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss")+"'";case t.FeatureServiceDatabaseType.PGDB:return"#"+n.format(s?"MM-DD-YYYY":"MM-DD-YYYY HH:mm:ss")+"#";case t.FeatureServiceDatabaseType.Postgres:return"TIMESTAMP '"+n.format(s?"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss")+"'";default:return"date '"+n.format("YYYY-MM-DD HH:mm:ss")+"'"}}function u(e,r){switch(r){case t.FeatureServiceDatabaseType.FILEGDB:case t.FeatureServiceDatabaseType.Standardised:case t.FeatureServiceDatabaseType.StandardisedNoInterval:case t.FeatureServiceDatabaseType.Oracle:return e?"CURRENT_DATE":"CURRENT_TIMESTAMP";case t.FeatureServiceDatabaseType.SqlServer:return e?"CAST(GETDATE() AS DATE)":"GETDATE()";case t.FeatureServiceDatabaseType.PGDB:case t.FeatureServiceDatabaseType.Postgres:default:return e?"CURRENT_DATE":"CURRENT_TIMESTAMP"}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertIntervalToSql=r.isSingleField=r.scanForField=r.predictType=r.makeToday=r.makeDateString=r.translateFunctionToDatabaseSpecific=r.combine=r.reformulateWithoutField=r.toWhereClauseFromTree=r.toWhereClause=void 0,r.toWhereClause=s,r.toWhereClauseFromTree=function(e,r,a){return o(e,r,a)},r.reformulateWithoutField=function(e,r,a,s){return n.WhereClause.create(o(e.parseTree,t.FeatureServiceDatabaseType.Standardised,e.parameters,r,a),s)},r.combine=function(e,r,a){return void 0===a&&(a="AND"),n.WhereClause.create("(("+s(e,t.FeatureServiceDatabaseType.Standardised)+")"+a+"("+s(r,t.FeatureServiceDatabaseType.Standardised)+"))",e.fieldsIndex)},r.translateFunctionToDatabaseSpecific=c,r.makeDateString=i,r.makeToday=u,r.predictType=function(e,r,a){void 0===a&&(a={});for(var t={},n={},s={esriFieldTypeSmallInteger:"integer",esriFieldTypeInteger:"integer",esriFieldTypeSingle:"double",esriFieldTypeDouble:"double",esriFieldTypeString:"string",esriFieldTypeDate:"date",esriFieldTypeOID:"integer",oid:"integer",long:"integer","small-integer":"integer",integer:"integer",single:"double",double:"double",date:"date",string:"string"},o=0,c=r;o<c.length;o++){var i=s[(u=c[o]).type];t[u.name.toLowerCase()]=void 0===i?"":i}for(var u in a){i=s[a[u]];n[u.toLowerCase()]=void 0===i?"":i}switch(function e(r,a,t,n){var s;switch(a.type){case"interval":return"integer";case"case_expression":var o=[];if("simple"===a.format){for(var c=0;c<a.clauses.length;c++)o.push(e(r,a.clauses[c].value,t,n));null!==a.else&&o.push(e(r,a.else,t,n))}else{for(c=0;c<a.clauses.length;c++)o.push(e(r,a.else,t,n));null!==a.else&&o.push(e(r,a.else,t,n))}return f(o);case"param":var i=n[a.value.toLowerCase()];if(void 0===i&&t){var u=t[a.value.toLowerCase()];if(void 0===u)return"";if(null===u)return"";if("string"==typeof u||u instanceof String)return"string";if("boolean"==typeof u)return"boolean";if(u instanceof Date)return"date";if("number"==typeof u)return u%1==0?"integer":"double"}return void 0===i?"":i;case"expr_list":for(var l=[],p=0,d=a.value;p<d.length;p++){var g=d[p];l.push(e(r,g,t,n))}return l;case"unary_expr":return"boolean";case"binary_expr":switch(a.operator){case"AND":case"OR":return"boolean";case"IS":case"ISNOT":if("null"!==a.right.type)throw new Error("Unsupported RHS for IS");return"boolean";case"IN":case"NOT IN":case"BETWEEN":case"NOTBETWEEN":case"LIKE":case"NOT LIKE":return"boolean";case"<>":case"<":case">":case">=":case"<=":case"=":return"boolean";case"*":case"-":case"+":case"/":return f([e(r,a.left,t,n),e(r,a.right,t,n)]);default:throw new Error("Not Supported Operator "+a.operator)}case"null":return"";case"bool":return"boolean";case"string":return"string";case"number":return null===a.value?"":a.value%1==0?"integer":"double";case"date":case"timestamp":case"current_time":return"date";case"column_ref":var h=r[a.column.toLowerCase()];return void 0===h?"":h;case"function":switch(a.name.toLowerCase()){case"position":case"extract":case"char_length":return"integer";case"round":return(s=e(r,a.args,t,n))instanceof Array?s.length>0?s[0]:"":s;case"sign":return(s=e(r,a.args,t,n))instanceof Array&&(s=f(s)),"integer"===s||"double"===s?s:"double";case"ceiling":case"floor":case"abs":var v=e(r,a.args,t,n);return v instanceof Array?f(v):v;case"area":case"length":case"log":case"log10":case"sin":case"cos":case"tan":case"asin":case"acos":case"atan":case"power":return"double";case"substring":case"trim":case"concat":case"lower":case"upper":return"string";case"truncate":return"double";case"round":return(s=e(r,a.args,t,n))instanceof Array?s.length>0?s[0]:"":s}return""}throw new Error("Unsupported sql syntax "+a.type)}(t,e.parseTree,e.parameters,n)){case"double":return"double";case"integer":return"integer";case"double":return"double";case"date":return"date";case"string":return"string"}return""};var l={boolean:1,string:2,integer:3,double:4,date:5};function f(e){if(e){for(var r="",a=0,t=e;a<t.length;a++){var n=t[a];""!==n&&(r=""===r?n:l[r]<l[n]?n:r)}return r}return""}function p(e){var r="";return r+=e.period.toUpperCase()}function d(e,r,a){return"INTERVAL "+a+" "+e+" "+("interval-period"===r.type?p(r):p(r.start)+" TO "+p(r.end))}r.scanForField=function(e,r){return function e(r,a){if(null==r)return!1;switch(r.type){case"when_clause":return e(r.operand,a)||e(r.value,a);case"case_expression":for(var t=0,n=r.clauses;t<n.length;t++){var s=n[t];if(e(s,a))return!0}return!("simple"!==r.format||!e(r.operand,a))||!(null===r.else||!e(r.else,a));case"param":return!1;case"expr_list":for(var o=0,c=r.value;o<c.length;o++){s=c[o];if(e(s,a))return!0}return!1;case"unary_expr":return e(r.expr,a);case"binary_expr":return e(r.left,a)||e(r.right,a);case"null":case"bool":case"date":case"timestamp":case"string":case"number":return!1;case"column_ref":return a.toLowerCase()===r.column.toLowerCase();case"function":return e(r.args,a)}return!1}(e.parseTree,r)},r.isSingleField=function(e){return"column_ref"===e.parseTree.type},r.convertIntervalToSql=d}));
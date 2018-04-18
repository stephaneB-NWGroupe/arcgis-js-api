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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/i18n","dojo/has","dojo/Deferred","dojo/sniff","dojo/promise/all","dojox/html/entities","./lang","./kernel","./request","./promiseList","./tasks/query","./tasks/QueryTask","./tasks/RelationshipQuery","./tasks/StatisticDefinition","./support/expressionUtils","./layers/support/attributeUtils","dojo/i18n!dojo/cldr/nls/number"],function(e,t,i,r,s,a,n,o,l,d,f,u,h,c,p,m,y,_,F,g,I){var L=e(null,{declaredClass:"esri.PopupInfo",_reExprField:/^\s*expression\//i,_exprPrefix:"expression/",_relatedFieldPrefix:"relationships/",initialize:function(e,r){if(e){t.mixin(this,r),this.info=e,this.title=this.getTitle,this.content=this.getContent,this._exprCache=this._compileExpressions(this.info.expressionInfos);var s=this._fieldLabels={},a=this._fieldsMap={};this.info.fieldInfos&&i.forEach(this.info.fieldInfos,function(e){var t=e.fieldName.toLowerCase(),i=this._isExpressionField(t)?this.getExpressionInfo(t):null;s[t]=i?i.title:e.label,a[t]=e},this),this.titleHasRelatedFields=!(!this.info.title||-1===this.info.title.indexOf("{"+this._relatedFieldPrefix))}},toJson:function(){return r.fromJson(r.toJson(this.info))},getTitle:function(){},getContent:function(){},getFieldInfo:function(e){var t,r=this.info&&this.info.fieldInfos;return i.some(r,function(i){return i.fieldName===e&&(t=i),!!t}),t},getExpressionInfo:function(e){if(this._isExpressionField(e)){e=e.replace(this._reExprField,""),e=e.toLowerCase();var t;return i.some(this.info.expressionInfos,function(i){return i.name.toLowerCase()===e&&(t=i),!!t}),t}},hasGeometryOperations:function(){return i.some(this.info.expressionInfos,function(e){return F.hasGeometryOperations(e.expression)})},getComponents:function(e){var r=this.info,s={};if(r.fieldInfos){var a=i.filter(r.fieldInfos,function(e){return-1!==e.fieldName.indexOf(this._relatedFieldPrefix)},this);a&&a.length>0&&(s.relatedInfo=this._getRelatedRecords({graphic:e,fieldsInfo:a}))}return this._needFullResolutionFeature(e)&&(s.fullResolutionFeature=this._getFullResolutionFeature(e)),c(s).then(t.hitch(this,function(t){return this._getPopupValues(e,t.fullResolutionFeature)}))},getAttachments:function(e){var t=e.getSourceLayer(),i=e.attributes;if(this.info.showAttachments&&t&&t.hasAttachments&&t.objectIdField){var r=i&&i[t.objectIdField];if(r)return t.queryAttachmentInfos(r)}},_needFullResolutionFeature:function(e){var t=e.getSourceLayer();return!!t&&("esriGeometryPoint"!==t.geometryType&&"function"==typeof t.getMaxAllowableOffset&&t.getMaxAllowableOffset()>0&&this.hasGeometryOperations())},_getFullResolutionFeature:function(e){var t=e.getSourceLayer(),i=t.objectIdField,r=e.attributes,s=r&&i&&r[i];if(null==s)return null;var a=new p;return a.objectIds=[s],a.maxAllowableOffset=0,a.outFields=[i],t.queryFeatures(a).then(function(e){return e.features&&e.features[0]})},_isExpressionField:function(e){return this._reExprField.test(e)},_compileExpressions:function(e){var t={};return i.forEach(e,function(e){var i=e.returnType&&e.returnType.toLowerCase();t[e.name]=g.createAttributeCache({valueExpression:e.expression},"number"!==i)}),t},_fetchAttributes:function(e,r){var s=t.clone(e.attributes)||{},a=r&&r.geometry,n=this._exprPrefix,o=this._exprCache;return i.forEach(this.info.expressionInfos,function(t){var i=n+t.name,r=o[t.name],l=r?e._getDataValue(r.attributeInfo,r,F,null,a):null;"string"==typeof l&&(l=d.encode(l)),s[i]=l}),s},_getPopupValues:function(e,r,s){var a,n,o,l,d,u=this.info,h=e.getSourceLayer(),c=this._fetchAttributes(e,r),p=t.clone(c),m=u.fieldInfos,y="",_="",F=h&&h._getDateOpts&&h._getDateOpts().properties;F=F&&F.slice(0);var g={dateFormat:{properties:F,formatter:"DateFormat"+this._insertOffset(this._dateFormats.shortDateShortTime)}};if(this._relatedInfo)for(l in this._relatedInfo)if(this._relatedInfo.hasOwnProperty(l)){var I=this._relatedInfo[l],L=this._relatedLayersInfo[l];I&&(i.forEach(I.relatedFeatures,function(e){for(d in e.attributes)if(e.attributes.hasOwnProperty(d)&&"esriRelCardinalityOneToOne"===L.relation.cardinality){var t=this._toRelatedFieldName([L.relation.id,d]);c[t]=p[t]=e.attributes[d]}},this),i.forEach(I.relatedStatsFeatures,function(e){for(d in e.attributes)if(e.attributes.hasOwnProperty(d)){var t=this._toRelatedFieldName([L.relation.id,d]);c[t]=p[t]=e.attributes[d]}},this))}if(m&&i.forEach(m,function(e){n=e.fieldName;var t=this._getLayerFieldInfo(h,n);t&&(n=e.fieldName=t.name);var r=p[n];if(p[n]=this._formatValue(r,n,g),F&&e.format&&e.format.dateFormat){var s=i.indexOf(F,n);s>-1&&F.splice(s,1)}},this),h){var b=h.types,v=h.typeIdField,x=v&&c[v];for(n in c)if(c.hasOwnProperty(n)&&-1===n.indexOf(this._relatedFieldPrefix)&&(o=c[n],f.isDefined(o))){var P=this._getDomainName(h,e,b,x,n,o);if(f.isDefined(P))p[n]=P;else if(n===v){var R=this._getTypeName(h,e,o);f.isDefined(R)&&(p[n]=R)}}}if(u.title&&(y=this._processFieldsInLinks(this._fixTokens(u.title,h),c),y=t.trim(f.substitute(p,y,g)||"")),s)return{title:y};u.description&&(_=this._processFieldsInLinks(this._fixTokens(u.description,h),c),_=t.trim(f.substitute(p,_,g)||"")),m&&(a=[],i.forEach(m,function(e){(n=e.fieldName)&&e.visible&&a.push([this._fieldLabels[n.toLowerCase()]||n,f.substitute(p,"${"+n+"}",g)||""])},this));var T,O;return u.mediaInfos&&(T=[],i.forEach(u.mediaInfos,function(e){switch(O=0,o=e.value,e.type){case"image":var r=o.sourceURL;r=r&&t.trim(f.substitute(c,this._fixTokens(r,h))),O=!!r;break;case"piechart":case"linechart":case"columnchart":case"barchart":var s,a=o.normalizeField;o.fields=i.map(o.fields,function(e){return s=this._getLayerFieldInfo(h,e),s?s.name:e},this),a&&(s=this._getLayerFieldInfo(h,a),o.normalizeField=s?s.name:a),O=i.some(o.fields,function(e){return f.isDefined(c[e])||-1!==e.indexOf(this._relatedFieldPrefix)&&this._relatedInfo},this);break;default:return}if(O){e=t.clone(e),o=e.value;var n=e.title?this._processFieldsInLinks(this._fixTokens(e.title,h),c):"",l=e.caption?this._processFieldsInLinks(this._fixTokens(e.caption,h),c):"";if(e.title=n?t.trim(f.substitute(p,n,g)||""):"",e.caption=l?t.trim(f.substitute(p,l,g)||""):"","image"===e.type)o.sourceURL=f.substitute(c,this._fixTokens(o.sourceURL,h)),o.linkURL&&(o.linkURL=t.trim(f.substitute(c,this._fixTokens(o.linkURL,h))||""));else{var d,u;i.forEach(o.fields,function(e,t){if(-1!==e.indexOf(this._relatedFieldPrefix))u=this._getRelatedChartInfos(e,o,c,g),u instanceof Array?o.fields=u:o.fields[t]=u;else{var i=c[e];i=void 0===i?null:i,d=c[o.normalizeField]||0,i&&d&&(i/=d),o.fields[t]={y:i,tooltip:(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(i,e,g,!!d)}}},this)}T.push(e)}},this)),{title:y,description:_,hasDescription:!!u.description,fields:a&&a.length?a:null,mediaInfos:T&&T.length?T:null,formatted:p,editSummary:h&&h.getEditSummary?h.getEditSummary(e):""}},_getRelatedChartInfos:function(e,t,r,s){var a,n,o,l,d,u,h;return a=[],h=this._fromRelatedFieldName(e),d=h[0],n=this._relatedInfo[d],u=this._relatedLayersInfo[d],n&&i.forEach(n.relatedFeatures,function(i){var n,d,u=i.attributes;for(d in u)if(u.hasOwnProperty(d)&&d===h[1]){if(n={},l=u[d],t.normalizeField&&(o=-1!==t.normalizeField.indexOf(this._relatedFieldPrefix)?u[this._fromRelatedFieldName(t.normalizeField)[1]]:r[t.normalizeField]),l&&o&&(l/=o),t.tooltipField)if(-1!==t.tooltipField.indexOf(this._relatedFieldPrefix)){var c=this._fromRelatedFieldName(t.tooltipField)[1],p=f.isDefined(u[c])?this._formatValue(u[c],t.tooltipField,s,!!o):c;n.tooltip=p+":<br/>"+this._formatValue(l,c,s,!!o)}else n.tooltip=(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(l,t.tooltipField,s,!!o);else n.tooltip=l;n.y=l,a.push(n)}},this),"esriRelCardinalityOneToMany"===u.relation.cardinality||"esriRelCardinalityManyToMany"===u.relation.cardinality?a:a[0]},_dateFormats:{shortDate:"(datePattern: 'M/d/y', selector: 'date')",shortDateLE:"(datePattern: 'd/M/y', selector: 'date')",longMonthDayYear:"(datePattern: 'MMMM d, y', selector: 'date')",dayShortMonthYear:"(datePattern: 'd MMM y', selector: 'date')",longDate:"(datePattern: 'EEEE, MMMM d, y', selector: 'date')",shortDateShortTime:"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateLEShortTime:"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateShortTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLEShortTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLongTime:"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLELongTime:"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLongTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')",shortDateLELongTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthYear:"(datePattern: 'MMMM y', selector: 'date')",shortMonthYear:"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},_reHref:/href\s*=\s*\"([^\"]+)\"/gi,_reHrefApos:/href\s*=\s*\'([^\']+)\'/gi,_reEmptyHref:/^href\s*=\s*"\s*"$/i,_reEmptyHrefApos:/^href\s*=\s*'\s*'$/i,_fixTokens:function(e,t){var i=this;return e.replace(/(\{([^\{\r\n]+)\})/g,function(e,r,s){var a=i._getLayerFieldInfo(t,s);return"$"+(a?"{"+a.name+"}":r)})},_encodeAttributes:function(e){var i,r,s,a=t.clone(e)||{};for(i in a)(r=a[i])&&"string"==typeof r&&(s=encodeURIComponent(r).replace(/\'/g,"&apos;"),a[i]=s);return a},_processFieldsInLinks:function(e,i){var r=this._encodeAttributes(i),s=t.hitch(this,this._addValuesToHref,i,r);return e&&(e=e.replace(this._reHref,s).replace(this._reHrefApos,s)),e},_addValuesToHref:function(e,i,r,s){return s=s&&t.trim(s),r=f.substitute(s&&0===s.indexOf("${")?e:i,r),this._reEmptyHref.test(r)?r='href="about:blank"':this._reEmptyHrefApos.test(r)&&(r="href='about:blank'"),r},_getLayerFieldInfo:function(e,t){return e&&e.getField?e.getField(t):null},_formatValue:function(e,r,s,a){var n=this._fieldsMap[r.toLowerCase()],o=n&&n.format,l=-1!==i.indexOf(s.dateFormat.properties,r),d=!("number"!=typeof e||l||o&&o.dateFormat);if(!f.isDefined(e)||!n||!f.isDefined(o))return d?this._forceLTR(e):e;var u="",h=[],c=o.hasOwnProperty("places")||o.hasOwnProperty("digitSeparator"),p=!o.hasOwnProperty("digitSeparator")||o.digitSeparator;if(c&&!l)u="NumberFormat",h.push("places: "+(f.isDefined(o.places)&&(!a||o.places>0)?Number(o.places):"Infinity")),h.length&&(u+="("+h.join(",")+")");else{if(!o.dateFormat)return d?this._forceLTR(e):e;u="DateFormat"+this._insertOffset(this._dateFormats[o.dateFormat]||this._dateFormats.shortDateShortTime)}var m=this._applyFormatting(e,u,s);return c&&e.constructor.toString().indexOf("Array")>-1&&(m="",i.forEach(e,t.hitch(this,function(e,t){t&&(m+=" "),m+=this._applyFormatting(e,u,s)}))),c&&!p&&I.group&&(m=m.replace(new RegExp("\\"+I.group,"g"),"")),l&&(m='<span class="esriDateValue">'+m+"</span>"),d?this._forceLTR(m):m},_applyFormatting:function(e,t,i){return f.substitute({myKey:e},"${myKey:"+t+"}",i)||""},_forceLTR:function(e){var t=o("ie");return t&&t<=10?e:"<span class='esriNumericValue'>"+e+"</span>"},_insertOffset:function(e){return e&&(e=f.isDefined(this.utcOffset)?e.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):e),e},_getDomainName:function(e,t,i,r,s,a){var n=e.getDomain&&e.getDomain(s,{feature:t});return n&&n.codedValues?n.getName(a):null},_getTypeName:function(e,t,i){var r=e.getType&&e.getType(t);return r&&r.name},_getRelatedRecords:function(e){var i,r=e.graphic;return this._relatedLayersInfoPromise||(this._relatedLayersInfoPromise=this._getRelatedLayersInfo(e).then(t.hitch(this,function(e){for(i in e)e.hasOwnProperty(i)&&e[i]&&(this._relatedLayersInfo[i].relatedLayerInfo=e[i])}))),this._relatedLayersInfoPromise.then(t.hitch(this,function(){return this._queryRelatedLayers(r)})).then(t.hitch(this,function(e){return this._setRelatedRecords(r,e),e}))},_getRelatedLayersInfo:function(e){var t,r,s=e.graphic,a=e.fieldsInfo,n={};t=s.getSourceLayer(),this._relatedLayersInfo||(this._relatedLayersInfo={}),i.forEach(a,function(e){var r,s,a,n,o;r=this._fromRelatedFieldName(e.fieldName),s=r[0],a=r[1],s&&(!this._relatedLayersInfo[s]&&t&&t.relationships&&(i.some(t.relationships,function(e){if(e.id==s)return o=e,!0}),o&&(this._relatedLayersInfo[s]={relation:o,relatedFields:[],outStatistics:[]})),this._relatedLayersInfo[s]&&(this._relatedLayersInfo[s].relatedFields.push(a),e.statisticType&&(n=new _,n.statisticType=e.statisticType,n.onStatisticField=a,n.outStatisticFieldName=a,this._relatedLayersInfo[s].outStatistics.push(n))))},this);for(r in this._relatedLayersInfo)if(this._relatedLayersInfo.hasOwnProperty(r)){var o,d;this._relatedLayersInfo[r]&&(o=this._relatedLayersInfo[r].relation,d=t.url.replace(/[0-9]+$/,o.relatedTableId),this._relatedLayersInfo[r].relatedLayerUrl=d,n[r]=h({url:d,content:{f:"json"},callbackParamName:"callback"}))}return l(n)},_queryRelatedLayers:function(e){var t,i={};for(t in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(t)&&(i[t]=this._queryRelatedLayer({graphic:e,relatedInfo:this._relatedLayersInfo[t]}));return l(i)},_queryRelatedLayer:function(e){var r,s,a,o,d,f,u,h,c,y,_,F,g,I,L;return r=e.graphic,s=r.getSourceLayer(),a=s.url.match(/[0-9]+$/g)[0],F=e.relatedInfo,y=F.relatedLayerInfo,g=F.relatedLayerUrl,I=F.relation,i.some(y.relationships,function(e){if(e.relatedTableId===parseInt(a,10))return o=e,!0},this),o&&(d=new p,i.some(y.fields,function(e){if(e.name===o.keyField)return h=-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)?"number":"string",!0}),o.relationshipTableId&&o.keyFieldInRelationshipTable?(L=new n,this._queryRelatedRecords(r,o).then(t.hitch(this,function(e){var a,n;if(!(a=e[r.attributes[s.objectIdField]]))return void L.resolve();n=i.map(a.features,function(e){return e.attributes[y.objectIdField]},this),F.outStatistics&&F.outStatistics.length>0&&y.supportsStatistics&&(c=new p,c.objectIds=n,c.outFields=d.outFields,c.outStatistics=F.outStatistics),c&&(f=new m(g),f.execute(c).then(t.hitch(this,function(e){var t=[];t.push(a),t.push(e),L.resolve(t)})))}))):(u="string"===h?o.keyField+"='"+r.attributes[I.keyField]+"'":o.keyField+"="+r.attributes[I.keyField],d.where=u,d.outFields=F.relatedFields,F.outStatistics&&F.outStatistics.length>0&&y.supportsStatistics&&(c=new p,c.where=d.where,c.outFields=d.outFields,c.outStatistics=F.outStatistics),f=new m(g),_=[],_.push(f.execute(d)),c&&_.push(f.execute(c)))),_?l(_):L?L.promise:void 0},_setRelatedRecords:function(e,t){this._relatedInfo=[];var i;for(i in t)if(t.hasOwnProperty(i)&&t[i]){var r=t[i];this._relatedInfo[i]={},this._relatedInfo[i].relatedFeatures=r[0].features,f.isDefined(r[1])&&(this._relatedInfo[i].relatedStatsFeatures=r[1].features)}},_handlerErrorResponse:function(e,t){e.reject(t)},_fromRelatedFieldName:function(e){var t,i=[];return-1!==e.indexOf(this._relatedFieldPrefix)&&(t=e.split("/"),i=t.slice(1)),i},_toRelatedFieldName:function(e){var t="";return e&&e.length>0&&(t=this._relatedFieldPrefix+e[0]+"/"+e[1]),t},_queryRelatedRecords:function(e,t){var i=e.getSourceLayer(),r=new y;return r.outFields=["*"],r.relationshipId=t.id,r.objectIds=[e.attributes[i.objectIdField]],i.queryRelatedFeatures(r)}});return a("extend-esri")&&(u.PopupInfo=u.PopupInfoTemplate=L),L});
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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/number","dojo/_base/json","dojo/_base/Deferred","dojo/has","../kernel","../request","../deferredUtils","../urlUtils","../renderers/jsonUtils","./StatisticDefinition","./Task","./QueryTask","./query","dojo/has!extend-esri?./GenerateRendererParameters","dojo/has!extend-esri?./ClassificationDefinition","dojo/has!extend-esri?./ClassBreaksDefinition","dojo/has!extend-esri?./UniqueValueDefinition","dojo/has!extend-esri?./ColorRamp","dojo/has!extend-esri?./AlgorithmicColorRamp","dojo/has!extend-esri?./MultipartColorRamp"],function(e,i,s,r,a,t,n,l,o,d,c,u,f,h,_,b,m){var p=i(_,{declaredClass:"esri.tasks.GenerateRendererTask",_eventMap:{complete:["renderer"]},constructor:function(e,i){if(!s.isObject(e)||"esri.layers.FeatureLayer"!==e.declaredClass&&"esri.layers.CSVLayer"!==e.declaredClass)this.url=e,this._url.path+="/generateRenderer";else{var r=e;r.url&&s.isString(r.url)&&"esri.layers.CSVLayer"!==r.declaredClass?(this.url=r.url,this._url=u.urlToObject(this.url),this._url.path+="/generateRenderer"):this._features=r.graphics}this._handler=s.hitch(this,this._handler),this.source=i&&i.source,this.gdbVersion=i&&i.gdbVersion,this.checkValueRange=i&&i.checkValueRange,this.registerConnectEvents()},_handler:function(e,i,r,a,t){try{var n;if("esri.renderer.ClassBreaksRenderer"===e.declaredClass||"esri.renderer.UniqueValueRenderer"===e.declaredClass?n=e:(n=f.fromJson(e),"classBreaks"===e.type&&n.setMaxInclusive(!0)),this.checkValueRange){var l=new b(this.url),o=new m,d=new h;d.statisticType="min",d.onStatisticField=this._field;var c=new h;c.statisticType="max",c.onStatisticField=this._field,o.outStatistics=[d,c],l.execute(o).then(s.hitch(this,function(e){var i=e.features[0].attributes;for(var s in i)if(0===s.toLowerCase().indexOf("min"))var a=i[s];else var l=i[s];n=this._processRenderer(n,this._prefix,this._unitLabel,this._formatLabel,this._precision,a,l),this._successHandler([n],"onComplete",r,t)}))}else n=this._processRenderer(n,this._prefix,this._unitLabel,this._formatLabel,this._precision),this._successHandler([n],"onComplete",r,t)}catch(e){this._errorHandler(e,a,t)}},_processRenderer:function(e,i,s,t,n,l,o){return"esri.renderer.ClassBreaksRenderer"===e.declaredClass?r.forEach(e.infos,function(r,d){0===d&&void 0!==l&&null!==l&&(r.minValue=l),d===e.infos.length-1&&void 0!==o&&null!==o&&(r.classMaxValue=r.maxValue=o),n&&(r.classMaxValue=r.maxValue=Math.round(r.maxValue/n)*n,r.minValue=Math.round(r.minValue/n)*n),t&&(r.label=a.format(r.minValue)+" - "+a.format(r.maxValue)),i&&(r.label=i+" "+r.label),s&&(r.label=r.label+" "+s)}):r.forEach(e.infos,function(r,n){0===n&&void 0!==l&&null!==l&&(r.value=l),n===e.infos.length-1&&void 0!==o&&null!==o&&(r.value=o),t&&(r.label=a.format(r.value)),i&&(r.label=i+" "+r.label),s&&(r.label=r.label+" "+s)}),e},execute:function(i,r,a){var l,o=this._handler,u=this._errorHandler;if(this._precision=i.precision,this._prefix=i.prefix,this._unitLabel=i.unitLabel,this._formatLabel=i.formatLabel,this._features=i.features||this._features,this._features){l=new n;var f=this._features;e(["./generateRenderer"],function(e){var s;"esri.tasks.ClassBreaksDefinition"===i.classificationDefinition.declaredClass?s=e.createClassBreaksRenderer({features:f,definition:i.classificationDefinition}):"esri.tasks.UniqueValueDefinition"===i.classificationDefinition.declaredClass&&(s=e.createUniqueValueRenderer({features:f,definition:i.classificationDefinition})),s?o(s,null,r,a,l):u(null,a,l)})}else{var h=s.mixin(i.toJson(),{f:"json"});if("esri.tasks.ClassBreaksDefinition"===i.classificationDefinition.declaredClass?this._field=i.classificationDefinition.classificationField:this._field=i.classificationDefinition.attributeField,this.source){var _={source:this.source.toJson()};h.layer=t.toJson(_)}this.gdbVersion&&(h.gdbVersion=this.gdbVersion),l=new n(c._dfdCanceller),l._pendingDfd=d({url:this._url.path,content:h,callbackParamName:"callback",load:function(e,i){o(e,i,r,a,l)},error:function(e){u(e,a,l)}})}return l},onComplete:function(){}});return l("extend-esri")&&s.setObject("tasks.GenerateRendererTask",p,o),p});
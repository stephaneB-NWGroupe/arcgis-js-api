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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/Error","../../../../../../core/Logger","../../../../../../symbols/SimpleLineSymbol","../../definitions","../../enums","../../MaterialInfo","../../Utils","../../visualVariablesUtils","../../WGLDisplayObject","../VertexVector","../templates/meshTemplateUtils","../templates/WGLLabelTemplate","../templates/WGLLineTemplate","../templates/WGLMarkerTemplate","../../util/Matcher","../../util/serializationUtils","../../util/vvFlagUtils","../../util/Writer"],(function(e,t,r,a,i,n,s,l,o,u,p,h,c,f,y,m,v,_,g,d,b){Object.defineProperty(t,"__esModule",{value:!0});var V=i.getLogger("esri.views.2d.engine.webgl.WGLMeshFactory"),L={esriGeometryPoint:["above-center","above-left","above-right","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:null,esriGeometryMultipoint:null,esriGeometryEnvelope:null},T=function(){function e(){this._materials=[],this._materialsIndex=new Map}return e.prototype.insert=function(e){var t=this._materials.length;return this._materials.push(e),t},e.prototype._hashGlyph=function(e,t,r){return"G-"+t+"-"+r+"-"+e.page},e.prototype._hashSprite=function(e,t,r){return"S-"+t+"-"+r+"-"+(e?e.page:-1)+"-"+(!!e&&e.sdf)},e.prototype.createSpriteMaterial=function(e,t,r){var a=this._hashSprite(e,t,r);if(this._materialsIndex.has(a))return this._materialsIndex.get(a);var i=this._materials.length,n=o.default.fromSprite(e,t,r);return this._materials.push(n),this._materialsIndex.set(a,i),i},e.prototype.createGlyphMaterial=function(e,t,r){var a=this._hashGlyph(e,t,r);if(this._materialsIndex.has(a))return this._materialsIndex.get(a);var i=this._materials.length,n=o.default.fromGlyph(e,t,r);return this._materials.push(n),this._materialsIndex.set(a,i),i},e.prototype.get=function(e){return this._materials[e]},e.prototype.serialize=function(e){return g.serializeList(e,this._materials),e},e.deserialize=function(t){var r=new e;return r._materials=g.deserializeList(t,o.default),r},e}();t.MaterialStore=T;var M=function(){function e(e){this._bucketSize=e,this._rowsLength=s.TILE_SIZE/e,this._colsLength=s.TILE_SIZE/e,this._grid=this._initGrid()}return e.prototype.checkOverlap=function(e,t){var r=Math.floor(e/this._bucketSize),a=Math.floor(t/this._bucketSize);return r<0||r>=this._rowsLength||a<0||a>=this._colsLength||(!!this._grid[a][r]||(this._grid[a][r]=!0,!1))},e.prototype.reset=function(){this._grid=this._initGrid()},e.prototype._initGrid=function(){for(var e=[],t=0;t<this._rowsLength;t++)e.push(new Array(this._colsLength));return e},e}(),w=function(){function e(e,t,r){this.displayObjects=e,this.vertexVectorsMap=t,this._materials=r,this.grid=new M(s.COLLISION_EARLY_REJECT_BUCKET_SIZE)}return e.prototype.get=function(e){return this.vertexVectorsMap[e]},e.prototype.pushDisplayObject=function(e){this.displayObjects.push(e)},e.prototype.encode=function(e,t){var r=g.serializeList(new b.default(Uint32Array,this._guessSize()),this.displayObjects).buffer(),a=this._materials.serialize(new b.default(Uint32Array)).buffer(),i={};t.push(r),t.push(a);for(var n=0;n<this.vertexVectorsMap.length;n++){var s=this.vertexVectorsMap[n];i[n]={},s.transfer(i[n],t)}e.displayObjects=r,e.materialStore=a,e.vertexBuffersMap=i,this.destroy()},e.prototype.destroy=function(){this.vertexVectorsMap=null,this.displayObjects=null},e.prototype._guessSize=function(){for(var e=this.displayObjects,t=Math.min(e.length,4),r=0,a=0;a<t;a++)r=Math.max(r,e[a].displayRecords.length);return 2*(12*e.length+e.length*r*40)},e}(),G=function(){function e(){this._vvMap=new Map}return e.prototype.set=function(e,t){this._vvMap.set(e,t)},e.prototype.getValue=function(e,t,r){return this._vvMap.has(e)?this._vvMap.get(e)(t,r):0},e}(),I=function(){function e(e,t,r,i,n,s,l,o,u,p){var h=this;this._labelsDebugTemplate=null,this._matcher=e,this._materials=r,this._geometryType=i,this._idField=n,this._pixelRatio=u,this._vvMap=null,this._vvFlags=l,this._vvBuf=new ArrayBuffer(16),this._vvBufU32=new Uint32Array(this._vvBuf),this._vvBufF32=new Float32Array(this._vvBuf),this._createVVFunctionMap(s,t,o),p&&(this._validateLabelingInfo(p)?this._labelTemplates=p.map((function(e){return y.default.fromText(h._materials,0,e.symbol,u,e.labelPlacement)})):V.error(new a("mapview-labeling:unsupported-geometry","LabelingInfo failed validation - unable to create labels for layer.")))}return e.from=function(t,r,i,n,s,l,o,u){switch(t.type){case"simple":return e._fromSimpleRenderer(t,r,i,n,s,l,o,u);case"unique-value":case"uniqueValue":return e._fromUniqueValueRenderer(t,r,i,n,s,l,o,u);case"class-breaks":case"classBreaks":return e._fromClassBreaksRenderer(t,r,i,n,s,l,o,u);default:return V.error(new a("mapview-mesh:invalid-renderer","Unable to handle unknown renderer type")),null}},Object.defineProperty(e.prototype,"materials",{get:function(){return this._materials},enumerable:!0,configurable:!0}),e.prototype.createMeshData=function(e){var t=new Array(5),r=this._matcher.getDefault(),a=new Array,i=!!d.getMarkerVVFlags(this._vvFlags),n=!!d.getFillVVFlags(this._vvFlags),s=!!d.getLineVVFlags(this._vvFlags,"esriGeometryPolyline"!==this._geometryType),o=!!d.getTextVVFlags(this._vvFlags);return!this._labelTemplates&&r&&1===r.length&&r[0]instanceof v.default?(t[l.WGLGeometryType.MARKER]=new c.VertexVectors(l.WGLGeometryType.MARKER,i,e),t[l.WGLGeometryType.FILL]=new c.VertexVectors(l.WGLGeometryType.FILL,n,0),t[l.WGLGeometryType.LINE]=new c.VertexVectors(l.WGLGeometryType.LINE,s,0),t[l.WGLGeometryType.TEXT]=new c.VertexVectors(l.WGLGeometryType.TEXT,o,0),t[l.WGLGeometryType.LABEL]=new c.VertexVectors(l.WGLGeometryType.LABEL,!1,0)):(t[l.WGLGeometryType.MARKER]=new c.VertexVectors(l.WGLGeometryType.MARKER,i,e),t[l.WGLGeometryType.FILL]=new c.VertexVectors(l.WGLGeometryType.FILL,n,e),t[l.WGLGeometryType.LINE]=new c.VertexVectors(l.WGLGeometryType.LINE,s,e),t[l.WGLGeometryType.TEXT]=new c.VertexVectors(l.WGLGeometryType.TEXT,o,e),t[l.WGLGeometryType.LABEL]=new c.VertexVectors(l.WGLGeometryType.LABEL,!1,this._labelTemplates&&this._labelTemplates.length>0?e:0)),new w(a,t,this._materials)},e.prototype.write=function(e,t,r,a,i){var n=e,s=1===this._matcher.size()&&this._matcher.getDefault()||this._matcher.match(t,r),l=t.attributes[this._idField],o=new h(l),u=!!a&&!!this._labelTemplates;if(this._computeVV(t,r),s&&(t.geometry||t.centroid)){for(var p=o.displayRecords,c=0,f=s;c<f.length;c++){var y=f[c],m=n.get(y.geometryType);y.writeMesh(p,m,this._geometryType,l,t,this._pixelRatio,this._vvBufU32)}if(u){var v=this._getLabelReference(s);this._writeLabelMesh(o,n,l,t,i,a.get(l),v)}n.pushDisplayObject(o)}},e.prototype._hasBadLabelClass=function(e,t){var r=e.labelPlacement,i=L[t];if(!i)return V.error(new a("mapview-labeling:unsupported-geometry-type","Unable to create labels for WebGL Feature Layer, "+t+" is not supported")),!0;if(!i.some((function(e){return e===r}))){var n=i[0];V.warn("Found invalid label placement type "+r+" for "+t+". Defaulting to "+n),e.labelPlacement=n}return!1},e.prototype._validateLabelingInfo=function(e){var t=this;return!e.some((function(e){return t._hasBadLabelClass(e,t._geometryType)}))},e.prototype._getLabelReference=function(e){for(var t=0,r=e;t<r.length;t++){var a=r[t];if(a instanceof v.default)return a}return null},e.prototype._writeLabelMesh=function(e,t,r,a,i,n,l){for(var o=e.displayRecords,u=0,p=0,h=-1,c=-1,f=0;f<n.labelingInfo.length;f++){var y=n.labelingInfo[f],m=n.text[f],v=this._labelTemplates[y],_=t.get(v.geometryType),g=i.get(v.symbolId).glyphMosaicItems,d=o.length;if(v.bindReferenceTemplate(l),!v.computeGlyphs(g,m)){var b=v.computeAnchor(this._geometryType,a),V=v.bounds;if(-1===h)if(h=Math.floor(b[0]/s.COLLISION_BUCKET_SIZE),c=Math.floor(b[1]/s.COLLISION_BUCKET_SIZE),t.grid.checkOverlap(b[0],b[1]))return;v.writeMesh(o,_,this._geometryType,r,a,this._pixelRatio,this._vvBufU32),e.anchor=b,e.addMetric(V,d,o.length-d,y);var L=V.center;u=Math.max(V.halfWidth+Math.abs(L[0]),u),p=Math.max(V.halfHeight+Math.abs(L[1]),p)}}if(-1!==h){var T=2.5*Math.max(u,p),M=T-e.anchor[0]%s.COLLISION_BUCKET_SIZE,w=T-e.anchor[1]%s.COLLISION_BUCKET_SIZE,G=Math.ceil(Math.abs(M/s.COLLISION_BUCKET_SIZE)),I=Math.ceil(Math.abs(w/s.COLLISION_BUCKET_SIZE));e.xBucket=h,e.yBucket=c,e.xOverflow=G,e.yOverflow=I}},e.prototype._debugLabels=function(e,t,r,a,i){var n=a[0]+i.center[0],s=a[1]+i.center[1],l={geometry:{paths:[[[n-i.width/2,s+i.height/2],[0,-i.height],[i.width,0],[0,i.height],[-i.width,0]]]},attributes:{}},o=this._getLabelDebugTemplate(),u=t.get(o.geometryType);o.writeMesh(e,u,"esriGeometryPolyline",r,l,this._pixelRatio,this._vvBufU32)},e.prototype._getLabelDebugTemplate=function(){return this._labelsDebugTemplate||(this._labelsDebugTemplate=this._createLabelsDebugTemplate()),this._labelsDebugTemplate},e.prototype._createLabelsDebugTemplate=function(){var e=new n({style:"solid",width:1,color:[255,0,0,1]});return m.default.fromSimpleLine(this._materials,0,e,null,this._pixelRatio)},e.prototype._isErrorVV=function(e){return null===e||isNaN(e)||e===1/0},e.prototype._computeVV=function(e,t){if(!this._vvMap)return 0;var r=this._vvMap.getValue(l.VVType.SIZE,e,t),a=this._vvMap.getValue(l.VVType.COLOR,e,t),i=this._vvMap.getValue(l.VVType.OPACITY,e,t),n=this._vvMap.getValue(l.VVType.ROTATION,e,t);return this._vvBufF32[l.VVType.SIZE]=this._isErrorVV(r)?NaN:r,this._vvBufF32[l.VVType.COLOR]=this._isErrorVV(a)?NaN:a,this._vvBufF32[l.VVType.OPACITY]=this._isErrorVV(i)?NaN:i,this._vvBufF32[l.VVType.ROTATION]=this._isErrorVV(n)?NaN:n,0},e.prototype._createVVFunctionMap=function(e,t,r){if(e&&e.length)for(var a=0,i=e;a<i.length;a++){var n=i[a],s=u.getVVType(n.type),l=this._createGetValueFunction(n,t,r);l&&(this._vvMap||(this._vvMap=new G),this._vvMap.set(s,l))}},e.prototype._createGetValueFunction=function(e,t,r){if(u.getVVType(e.type)===l.VVType.SIZE){var a=e,i=p.getTypeOfSizeVisualVariable(a);if(i===l.WGLVVFlag.SIZE_SCALE_STOPS)return null;var n=i===l.WGLVVFlag.SIZE_UNIT_VALUE&&function(e){return p.getVisualVariableSizeValueRepresentationRatio(e,a.valueRepresentation)};return this._createNormalizedFunction(e,t,r,n)}return this._createNormalizedFunction(e,t,r)},e.prototype._createNormalizedFunction=function(e,t,r,i){var n=e.field;if(n){if("string"==typeof n){var s=e.normalizationField;return s?function(e){if(e.attributes[n]&&e.attributes[s]){var t=e.attributes[n]/e.attributes[s];return i?i(t):t}}:i?function(e){return i(e.attributes[n])}:function(e){return e.attributes[n]}}return"function"==typeof n?(V.error(new a("mapview-rendering:unsupported-feature","Function field types are not currently supported. Please use a valueExpression instead")),function(e){}):(V.error(new a("mapview-rendering:invalid-type","The field for a vv must be a string or a number, but got "+typeof n)),function(e){})}if(e.valueExpression&&"$view.scale"!==e.valueExpression){var l={valueExpression:e.valueExpression,spatialReference:r,layer:t};return u.createArcadeFunction(l,i)}return V.error("Unable to create a normalized function for visual variable: "+e),function(e){}},e._fromSimpleRenderer=function(t,r,a,i,n,s,l,o){var u=t.getSymbols(),p=t.visualVariables,h=d.getVVFlags(p),c=new _.default,y=new T;if(u.length){var m=u[0];c.setDefault(f.createMeshTemplates([],y,m,a,h,l))}return new e(c,r,y,i,n,p,h,s,l,o)},e._fromUniqueValueRenderer=function(t,r,a,i,n,s,l,o){var u=t.uniqueValueInfos,p=t.visualVariables,h=d.getVVFlags(p),c=[t.field];t.field2&&c.push(t.field2),t.field3&&c.push(t.field3);for(var y=t.valueExpression,m=y?{valueExpression:y,spatialReference:s,layer:r}:null,v=new _.MapMatcher(c,t.fieldDelimiter,m),g=new T,b=t.backgroundFillSymbol,V=b&&f.createMeshTemplates([],g,b,a,h,l),L=0,M=u;L<M.length;L++){var w=M[L],G=f.createMeshTemplates([],g,w.symbol,a,h,l);v.add(w.value,V?V.concat(G):G)}var I=t.defaultSymbol;if(I){var E=f.createMeshTemplates([],g,I,a,h,l);v.setDefault(V?V.concat(E):E)}return new e(v,r,g,i,n,p,h,s,l,o)},e._fromClassBreaksRenderer=function(t,r,a,i,n,s,l,o){for(var u=t.isMaxInclusive,p=t.visualVariables,h=t.valueExpression,c=t.normalizationField,y=t.normalizationTotal,m=t.normalizationType,v=d.getVVFlags(p),g=t.field,b=h?{valueExpression:h,spatialReference:s,layer:r}:null,V={normalizationField:c,normalizationTotal:y,normalizationType:m},L=new _.IntervalMatcher(g,u,b,V),M=new T,w=t.backgroundFillSymbol,G=w&&f.createMeshTemplates([],M,w,a,v,l,!0),I=0,E=t.classBreakInfos;I<E.length;I++){var x=E[I],S=x.symbol,F=f.createMeshTemplates([],M,S,a,v,l),O={min:x.minValue,max:x.maxValue};L.add(O,G?G.concat(F):F)}var R=t.defaultSymbol;if(R){var B=f.createMeshTemplates([],M,R,a,v,l);L.setDefault(G?G.concat(B):B)}return new e(L,r,M,i,n,p,v,s,l,o)},e}();t.default=I}));
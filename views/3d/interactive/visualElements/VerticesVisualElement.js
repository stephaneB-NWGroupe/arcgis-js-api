/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../chunks/vec4","../../webgl-engine/lib/GeometryUtil","../../layers/graphics/ElevationContext","../../webgl-engine/lib/Geometry","../../layers/graphics/pointUtils","./Object3DVisualElement","../../webgl-engine/shaders/ShadedColorMaterialTechnique","../../webgl-engine/materials/ShadedColorMaterial","../editingTools/settings"],(function(e,t,r,i,n,s,a,o,l,u,c,h,d,f){"use strict";let v=function(e){function i(t){var r;return(r=e.call(this,t)||this).view=null,r._renderOccluded=4,r._vertices=null,r._spatialReference=null,r._color=f.settings.colorToVec4(f.settings.reshapeManipulators.vertex.color),r._size=f.settings.reshapeManipulators.vertex.size,r._outlineColor=f.settings.colorToVec4(f.settings.reshapeManipulators.vertex.outlineColor),r._outlineSize=f.settings.reshapeManipulators.vertex.outlineSize,r._elevationInfo=null,r.applyProps(t),r}t._inheritsLoose(i,e);var a=i.prototype;return a.updateMaterial=function(){this.attached&&this.vertexMaterial.setParameterValues(this.vertexMaterialParameters)},a.updateOutlineMaterial=function(){this.attached&&this.vertexOutlineMaterial.setParameterValues(this.vertexOutlineMaterialParameters)},a.createRenderGeometries=function(){const e=this.vertices;if(r.isNone(e)||0===e.length)return[];const t=u.geometryToRenderInfo(e,this.spatialReference,this.view.elevationProvider,this.view.renderCoordsHelper,o.ElevationContext.fromElevationInfo(this.elevationInfo)),i=[],s=t.numVertices,a=t.position;for(let e=0;e<s;++e){const t=n.set(p,a[3*e+0],a[3*e+1],a[3*e+2]),r=new l(x(.5,16,16,t),"VerticesVisualElement-vertex"),s=new l(x(.5,16,16,t),"VerticesVisualElement-vertexOutline");i.push({vertexGeometry:r,vertexOutlineGeometry:s})}return i},a.createGeometries=function(e){const t=this.createRenderGeometries();for(const{vertexGeometry:r,vertexOutlineGeometry:i}of t)e.addGeometry(r,this.vertexMaterial),e.addGeometry(i,this.vertexOutlineMaterial)},a.createExternalResources=function(){this.vertexMaterial=new d.ShadedColorMaterial({...this.vertexMaterialParameters,writeDepth:!0,cullFace:2,screenSizeEnabled:!0},"manipulator"),this.vertexOutlineMaterial=new d.ShadedColorMaterial({...this.vertexOutlineMaterialParameters,transparent:!0,writeDepth:!0,cullFace:1,screenSizeEnabled:!0,shadingEnabled:!1},"manipulator-outline")},a.destroyExternalResources=function(){this.vertexMaterial=null,this.vertexOutlineMaterial=null},a.forEachExternalResource=function(e){e(this.vertexMaterial),e(this.vertexOutlineMaterial)},t._createClass(i,[{key:"renderOccluded",get:function(){return this._renderOccluded},set:function(e){e!==this._renderOccluded&&(this._renderOccluded=e,this.updateMaterial(),this.updateOutlineMaterial())}},{key:"vertices",get:function(){return this._vertices},set:function(e){this._vertices=e,this.recreateGeometry()}},{key:"spatialReference",get:function(){return this._spatialReference},set:function(e){this._spatialReference=e,this.recreateGeometry()}},{key:"color",get:function(){return this._color},set:function(e){s.exactEquals(e,this._color)||(s.copy(this._color,e),this.updateMaterial())}},{key:"size",get:function(){return this._size},set:function(e){e!==this._size&&(this._size=e,this.updateMaterial())}},{key:"outlineColor",get:function(){return this._outlineColor},set:function(e){s.exactEquals(e,this._outlineColor)||(s.copy(this._outlineColor,e),this.updateOutlineMaterial())}},{key:"outlineSize",get:function(){return this._outlineSize},set:function(e){e!==this._outlineSize&&(this._outlineSize=e,this.updateOutlineMaterial())}},{key:"elevationInfo",get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this.recreateGeometry()}},{key:"vertexMaterialParameters",get:function(){return{color:this._color,transparent:this._color[3]<1,screenSize:this.size,renderOccluded:this._renderOccluded}}},{key:"vertexOutlineMaterialParameters",get:function(){return{color:this._outlineColor,transparent:this._outlineColor[3]<1,screenSize:this.size+2*this.outlineSize,renderOccluded:this._renderOccluded}}}]),i}(c.Object3DVisualElement);const p=i.create();function x(e,t,r,i){const n=a.createSphereGeometry(e,t,r,{attributes:{position:h.ShadedColorMaterialVertexAttrConstants.OFFSET,uv:null}});return n.indices[h.ShadedColorMaterialVertexAttrConstants.POSITION]=new Uint32Array(n.indexCount),n.vertexAttributes[h.ShadedColorMaterialVertexAttrConstants.POSITION]={size:3,data:Float64Array.from(i),offsetIdx:0,strideIdx:3},n}e.VerticesVisualElement=v,Object.defineProperty(e,"__esModule",{value:!0})}));
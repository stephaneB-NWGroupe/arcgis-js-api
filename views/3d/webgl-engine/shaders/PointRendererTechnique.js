/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["require","exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/DefaultVertexAttributeLocations","../../../webgl/Program","../../../webgl/renderState","../lib/StencilUtils","../../../../chunks/PointRenderer.glsl"],(function(e,r,t,n,i,a,o,l,c,s,u,d){"use strict";let h=function(e){function r(r,t){return e.call(this,r,t)||this}t._inheritsLoose(r,e);var n=r.prototype;return n.initializeProgram=function(e){const t=r.shader.get(),n=this.configuration,i=t.build({output:n.output,slicePlaneEnabled:n.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!0,drawScreenSize:n.drawScreenSize});return new c(e.rctx,i.generateSource("vertex"),i.generateSource("fragment"),l.Default3D)},n.initializePipeline=function(){return s.makePipelineState({depthTest:{func:513},depthWrite:s.defaultDepthWriteParams,colorWrite:s.defaultColorWriteParams,stencilWrite:this.configuration.sceneHasOcludees?u.stencilWriteMaskOn:null,stencilTest:this.configuration.sceneHasOcludees?u.stencilBaseAllZerosParams:null})},r}(a.ShaderTechnique);h.shader=new i.ReloadableShaderModule(d.PointRendererShader,(()=>new Promise((function(r,t){e(["./PointRenderer.glsl"],r,t)}))));let p=function(e){function r(){var r;return(r=e.apply(this,arguments)||this).output=0,r.slicePlaneEnabled=!1,r.drawScreenSize=!1,r.sceneHasOcludees=!1,r}return t._inheritsLoose(r,e),r}(o.ShaderTechniqueConfiguration);n.__decorate([o.parameter({count:8})],p.prototype,"output",void 0),n.__decorate([o.parameter()],p.prototype,"slicePlaneEnabled",void 0),n.__decorate([o.parameter()],p.prototype,"drawScreenSize",void 0),n.__decorate([o.parameter()],p.prototype,"sceneHasOcludees",void 0),r.PointRendererTechnique=h,r.PointRendererTechniqueConfiguration=p,Object.defineProperty(r,"__esModule",{value:!0})}));
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["require","exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../webgl-engine/core/shaderTechnique/ReloadableShaderModule","../webgl-engine/core/shaderTechnique/ShaderTechnique","../webgl-engine/core/shaderTechnique/ShaderTechniqueConfiguration","../webgl-engine/lib/DefaultVertexAttributeLocations","../../webgl/Program","../../webgl/renderState","../../../chunks/BlendLayers.glsl"],(function(e,n,r,i,t,o,a,l,u,s,c){"use strict";let d=function(e){function n(){return e.apply(this,arguments)||this}r._inheritsLoose(n,e);var i=n.prototype;return i.initializeProgram=function(e){const r=n.shader.get().build();return new u(e.rctx,r.generateSource("vertex"),r.generateSource("fragment"),l.Default3D)},i.initializePipeline=function(){const e=2===this.configuration.mode?s.simpleBlendingParams(1,771):1===this.configuration.mode?s.simpleBlendingParams(0,770):null;return s.makePipelineState({blending:e,colorWrite:s.defaultColorWriteParams})},n}(o.ShaderTechnique);d.shader=new t.ReloadableShaderModule(c.BlendLayersShader,(()=>new Promise((function(n,r){e(["../webgl-engine/core/shaderLibrary/util/BlendLayers.glsl"],n,r)}))));let h=function(e){function n(){var n;return(n=e.apply(this,arguments)||this).mode=0,n}return r._inheritsLoose(n,e),n}(a.ShaderTechniqueConfiguration);i.__decorate([a.parameter({count:3})],h.prototype,"mode",void 0),n.BlendLayersTechnique=d,n.BlendLayersTechniqueConfiguration=h,Object.defineProperty(n,"__esModule",{value:!0})}));
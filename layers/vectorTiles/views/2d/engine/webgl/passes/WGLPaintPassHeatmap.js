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

define(["require","exports","dojo/text!../shaders/heatmapShaders.xml","../../../../webgl/BufferObject","../../../../webgl/FramebufferObject","../../../../webgl/Program","../../../../webgl/ShaderSnippets","../../../../webgl/Texture","../../../../webgl/VertexArrayObject"],(function(e,t,i,r,n,a,o,s,h){Object.defineProperty(t,"__esModule",{value:!0});var d=function(){function e(){this._initialized=!1,this._initWGLExtensions=!1}return e.prototype.dispose=function(){this._program&&(this._program.dispose(),this._program=null),this._vertexArrayObject&&(this._vertexArrayObject.dispose(),this._vertexArrayObject=null),this._intensityFBO&&(this._intensityFBO.dispose(),this._intensityFBO=null),this._gradientTex&&(this._gradientTex.dispose(),this._gradientTex=null),this._boundFBO=null},e.prototype.preRender=function(e,t){console.log("Heatmap: Running prerender");var i=e.context,r=i.getViewport(),n=r.width,a=r.height;this._bindHeatmapSurface(i,n,a)},e.prototype.postRender=function(e,t){console.log("Heatmap: Running postrender");var i=e.context,r=e.rendererInfo;this._drawHeatmap(i,r,1)},e.prototype._bindHeatmapSurface=function(e,t,i){if(!this._initWGLExtensions){var r=e.gl.getSupportedExtensions();if(-1===r.indexOf("OES_texture_float_linear")||-1===r.indexOf("WEBGL_color_buffer_float"))throw Error("Required WebGL extensions needed for the heatmap drawing are not available!");e.gl.getExtension("OES_texture_float_linear"),e.gl.getExtension("WEBGL_color_buffer_float"),this._initWGLExtensions=!0}var a=Math.round(t/4),o=Math.round(i/4);if(!this._intensityFBO||this._intensityFBO.width!==a||this._intensityFBO.height!==o){this._intensityFBO&&this._intensityFBO.dispose();var h=new s(e,{target:3553,internalFormat:34836,pixelFormat:6408,dataType:5126,samplingMode:9729,wrapMode:33071,width:a,height:o});this._intensityFBO=n.createWithAttachments(e,h,{colorTarget:0,depthStencilTarget:3,width:a,height:o,multisampled:!1})}this._boundFBO=e.getBoundFramebufferObject(),e.bindFramebuffer(this._intensityFBO),this._prevVP=e.getViewport(),e.setViewport(0,0,a,o),e.setStencilWriteMask(255),e.setClearColor(0,0,0,0),e.setClearStencil(0),e.clear(e.gl.COLOR_BUFFER_BIT|e.gl.STENCIL_BUFFER_BIT)},e.prototype._drawHeatmap=function(e,t,i){e.bindFramebuffer(this._boundFBO),this._boundFBO=null,e.setViewport(this._prevVP.x,this._prevVP.y,this._prevVP.width,this._prevVP.height),this._initialized||(this._initialized=this._initialize(e)),e.setBlendFunctionSeparate(1,771,1,771),e.setBlendingEnabled(!0),e.bindVAO(this._vertexArrayObject),e.bindProgram(this._program),e.bindTexture(this._intensityFBO.colorTexture,2),this._program.setUniform1i("u_texture",2),this._program.setUniform1f("u_opacity",i);var r=t.heatmapParameters;this._updateGradient(e,r),this._program.setUniform2f("u_minmax",r.minPixelIntensity,r.maxPixelIntensity),e.setActiveTexture(5),e.bindTexture(this._gradientTex,5),this._program.setUniform1i("u_gradient",5),e.drawArrays(5,0,4),e.bindVAO()},e.prototype._initialize=function(e){if(this._initialized)return!0;var t={a_pos:0,a_tex:1};this._shaderSnippets=new o,o.parse(i,this._shaderSnippets);var n=new a(e,this._shaderSnippets.heatmapVS,this._shaderSnippets.heatmapFS,t);if(!n)return!1;var s=new Int8Array(16);s[0]=-1,s[1]=-1,s[2]=0,s[3]=0,s[4]=1,s[5]=-1,s[6]=1,s[7]=0,s[8]=-1,s[9]=1,s[10]=0,s[11]=1,s[12]=1,s[13]=1,s[14]=1,s[15]=1;var d=new h(e,t,{geometry:[{name:"a_pos",count:2,type:5120,offset:0,stride:4,normalized:!1,divisor:0},{name:"a_tex",count:2,type:5120,offset:2,stride:4,normalized:!1,divisor:0}]},{geometry:r.createVertex(e,35044,s)});return this._program=n,this._vertexArrayObject=d,this._initialized=!0,!0},e.prototype._updateGradient=function(e,t){if(!this._gradientTex||t.color.refreshColorRamp){this._gradientTex&&(this._gradientTex.dispose(),this._gradientTex=null),this._gradientTex=new s(e,{target:3553,internalFormat:6408,pixelFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:1,height:512});var i=document.createElement("CANVAS");i.width=1,i.height=512;for(var r=i.getContext("2d"),n=function(e){for(var t=[],i=0;i<e.values.length;++i){var r=e.values[i],n=Math.floor(255*e.colors[4*i+0]),a=Math.floor(255*e.colors[4*i+1]),o=Math.floor(255*e.colors[4*i+2]),s=e.colors[4*i+3];t.push({ratio:r,color:"rgba("+n+", "+a+", "+o+", "+s+")"})}return t}(t.color),a=r.createLinearGradient(0,0,0,512),o=0;o<n.length;o++){var h=n[o];a.addColorStop(h.ratio,h.color)}r.fillStyle=a,r.fillRect(0,0,1,512),this._gradientTex.setData(i),t.color.refreshColorRamp=!1}},e}();t.default=d}));
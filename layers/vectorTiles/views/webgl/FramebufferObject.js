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

define(["require","exports","dojo/has","./Renderbuffer","./Texture"],(function(t,e,i,r,n){return function(){function t(e,h,s,o){if(this._context=null,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachment=null,this._initialized=!1,this._context=e,this._desc={colorTarget:h.colorTarget,depthStencilTarget:h.depthStencilTarget,width:h.width,height:h.height,multisampled:h.multisampled},this._id=t._nextId++,i("esri-webgl-debug")&&e.instanceCounter.incrementCount(4),s){var c=void 0;s instanceof n?(this._colorAttachment=s,c=s.descriptor):(c=s,this._colorAttachment=new n(this._context,c)),0!==this._desc.colorTarget&&console.error("Framebuffer is initialized with a texture however the descriptor indicates using a renderbuffer color attachment!"),t._validateTextureDimensions(c,this._desc)}if(o instanceof r)2===h.depthStencilTarget?this._stencilAttachment=o:1===h.depthStencilTarget||3===h.depthStencilTarget?this._depthAttachment=o:console.error('If a Renderbuffer is provided, "depthStencilTarget" must be one of STENCIL_RENDER_BUFFER, DEPTH_RENDER_BUFFER or DEPTH_STENCIL_RENDER_BUFFER'),t._validateBufferDimensions(o.descriptor,this._desc);else if(o){this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var a=void 0;o instanceof n?(this._depthStencilTexture=o,a=this._depthStencilTexture.descriptor):(a=o,this._depthStencilTexture=new n(this._context,a)),t._validateTextureDimensions(a,this._desc)}}return t.create=function(e,i){return new t(e,i)},t.createWithAttachments=function(e,i,r,n){return new t(e,r,i,n)},Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"descriptor",{get:function(){return this._desc},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"colorTexture",{get:function(){return this._colorAttachment instanceof n?this._colorAttachment:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"depthStencilTexture",{get:function(){return this._depthStencilTexture},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._desc.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._desc.height},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){if(this._context){if(this._disposeColorAttachment(),this._disposeDepthStencilAttachments(),this._glName)this._context.gl.deleteFramebuffer(this._glName),this._glName=null;i("esri-webgl-debug")&&this._context.instanceCounter.decrementCount(4),this._context=null}},t.prototype.attachColorTexture=function(e){if(e){var i=e.descriptor;if(t._validateTextureDimensions(i,this._desc),this._disposeColorAttachment(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e.glName,0)}this._colorAttachment=e}},t.prototype.detachColorTexture=function(){var t=void 0;if(this._colorAttachment instanceof n){if(t=this._colorAttachment,this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;this._context.gl.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0)}this._colorAttachment=null}return t},t.prototype.attachDepthStencilTexture=function(e){if(e){var i=e.descriptor;if(34041!==i.pixelFormat&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),34042!==i.dataType&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8_WEBGL!"),this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),t._validateTextureDimensions(i,this._desc),4!==this._desc.depthStencilTarget&&(this._desc.depthStencilTarget=4),this._disposeDepthStencilAttachments(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,e.glName,0)}this._depthStencilTexture=e}},t.prototype.detachDepthStencilTexture=function(){var t=this._depthStencilTexture;if(t&&this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;this._context.gl.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,null,0)}return this._depthStencilTexture=null,t},t.prototype.attachDepthStencilBuffer=function(e){if(e){var i=e.descriptor;if(34041!==i.internalFormat&&33189!==i.internalFormat&&console.error("Depth/Stencil buffer must have correct internalFormat"),t._validateBufferDimensions(i,this._desc),this._disposeDepthStencilAttachments(),this._desc.depthStencilTarget=34041===i.internalFormat?3:1,this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl,n=1===this._desc.depthStencilTarget?r.DEPTH_ATTACHMENT:r.DEPTH_STENCIL_ATTACHMENT;r.framebufferRenderbuffer(r.FRAMEBUFFER,n,r.RENDERBUFFER,e.glName)}this._depthAttachment=e}},t.prototype.detachDepthStencilBuffer=function(){var t=this._context.gl,e=this._depthAttachment;if(e&&this._initialized){this._context.bindFramebuffer(this);var i=1===this._desc.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,i,t.RENDERBUFFER,null)}return this._depthAttachment=null,e},t.prototype.copyToTexture=function(t,e,i,r,n,h,s){(t<0||e<0||n<0||h<0)&&console.error("Offsets cannot be negative!"),(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!");var o=this._desc,c=s.descriptor;3553!==s.descriptor.target&&console.error("Texture target must be TEXTURE_2D!"),(t+i>o.width||e+r>o.height||n+i>c.width||h+r>c.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");var a=this._context;a.bindTexture(s),a.bindFramebuffer(this),a.gl.copyTexSubImage2D(3553,0,n,h,t,e,i,r)},t.prototype.readPixels=function(t,e,i,r,n,h,s){(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!"),s||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this),this._context.gl.readPixels(t,e,i,r,n,h,s)},t.prototype.resize=function(e,i){var r=this._desc;if(r.width!==e||r.height!==i)if(this._initialized){var h;if(r.width=e,r.height=i,this._colorAttachment instanceof n)(h=(s=this._colorAttachment).descriptor).width=e,h.height=i,this._colorAttachment.dispose(),this._colorAttachment=new n(this._context,h),t._validateTextureDimensions(s.descriptor,this._desc);else this._colorAttachment&&this._disposeColorAttachment();if(null!=this._depthStencilTexture)(h=this._depthStencilTexture.descriptor).width=e,h.height=i,this._depthStencilTexture.dispose(),this._depthStencilTexture=new n(this._context,h);else(this._depthAttachment||this._stencilAttachment)&&this._disposeDepthStencilAttachments();this._context.getBoundFramebufferObject()===this&&this._context.bindFramebuffer(null),this._initialized=!1}else{var s;r.width=e,r.height=i,this._colorAttachment instanceof n&&(s=this._colorAttachment).resize(e,i),this._depthStencilTexture&&this._depthStencilTexture.resize(e,i)}},t.prototype.initialize=function(){if(this._initialized)return!1;var t=this._context.gl;this._glName&&t.deleteFramebuffer(this._glName);var e=t.createFramebuffer(),i=this._desc;if(t.bindFramebuffer(t.FRAMEBUFFER,e),!this._colorAttachment)if(0===i.colorTarget){var h={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:i.width,height:i.height};this._colorAttachment=new n(this._context,h)}else{var s=new r(this._context,{internalFormat:32854,width:i.width,height:i.height});t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,s.glName),this._colorAttachment=s}if(this._colorAttachment instanceof n){var o=this._colorAttachment;t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o.glName,0)}switch(i.depthStencilTarget){case 1:case 3:this._depthAttachment||(this._depthAttachment=new r(this._context,{internalFormat:1===i.depthStencilTarget?33189:34041,width:i.width,height:i.height}));var c=1===i.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,c,t.RENDERBUFFER,this._depthAttachment.glName);break;case 2:this._stencilAttachment||(this._stencilAttachment=new r(this._context,{internalFormat:36168,width:i.width,height:i.height})),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,this._stencilAttachment.glName);break;case 4:if(!this._depthStencilTexture){this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var a={target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:i.width,height:i.height};this._depthStencilTexture=new n(this._context,a)}t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,this._depthStencilTexture.glName,0)}return t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=e,this._initialized=!0,!0},t.prototype._disposeColorAttachment=function(){if(this._colorAttachment instanceof n){var t=this._colorAttachment;if(this._initialized)this._context.bindFramebuffer(this),(i=this._context.gl).framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,null,0);t.dispose()}else if(this._colorAttachment instanceof WebGLRenderbuffer){var e=this._colorAttachment,i=this._context.gl;this._initialized&&(this._context.bindFramebuffer(this),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,null)),this._context.gl.deleteRenderbuffer(e)}this._colorAttachment=null},t.prototype._disposeDepthStencilAttachments=function(){var t=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);var e=1===this._desc.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,e,t.RENDERBUFFER,null)}this._depthAttachment.dispose(),this._depthAttachment=null}this._stencilAttachment&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,null)),this._stencilAttachment.dispose(),this._stencilAttachment=null),this._depthStencilTexture&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,null,0)),this._depthStencilTexture.dispose(),this._depthStencilTexture=null)},t._validateBufferDimensions=function(t,e){console.assert(t.width>=0&&t.height>=0),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Renderbuffer dimensions must match the framebuffer's!"):(e.width=t.width,e.height=t.height)},t._validateTextureDimensions=function(t,e){console.assert(t.width>=0&&t.height>=0),3553!==t.target&&console.error("Texture type must be TEXTURE_2D!"),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Color attachment texture must match the framebuffer's!"):(e.width=t.width,e.height=t.height)},t._nextId=0,t}()}));
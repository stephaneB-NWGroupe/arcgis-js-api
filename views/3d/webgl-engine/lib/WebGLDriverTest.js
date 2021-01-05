/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../core/mathUtils","../../../../chunks/vec3f64","../../../webgl/Program","./Util","../../../webgl/BufferObject","../../../webgl/VertexArrayObject","./doublePrecisionUtils","../../../webgl/FramebufferObject","../../../webgl/RenderingContext"],(function(e,n,t,o,i,r,c,a,s,l,u,f){"use strict";let v=function(){function e(e){this.context=e,this._doublePrecisionRequiresObfuscation=null}return n._createClass(e,[{key:"doublePrecisionRequiresObfuscation",get:function(){if(t.isNone(this._doublePrecisionRequiresObfuscation)){const e=h(this.context,!1),n=h(this.context,!0);this._doublePrecisionRequiresObfuscation=0!==e&&(0===n||e/n>5)}return this._doublePrecisionRequiresObfuscation}}]),e}(),d=null;function h(e,n){const t=new u(e,{colorTarget:0,depthStencilTarget:0},{target:3553,wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1});const o=a.createVertex(e,35044,new Uint16Array([0,0,1,0,0,1,1,1])),f=new s(e,{a_pos:0},{geometry:[{name:"a_pos",count:2,type:5123,offset:0,stride:4,normalized:!1}]},{geometry:o}),v=i.fromValues(5633261.287538229,2626832.878767164,1434988.0495278358),d=i.fromValues(5633271.46742708,2626873.6381334523,1434963.231608387),h=function(t,o){const i=new r(e,`\n\n  precision highp float;\n\n  attribute vec2 a_pos;\n\n  uniform vec3 u_highA;\n  uniform vec3 u_lowA;\n  uniform vec3 u_highB;\n  uniform vec3 u_lowB;\n\n  varying vec4 v_color;\n\n  ${n?"#define DOUBLE_PRECISION_REQUIRES_OBFUSCATION":""}\n\n  #ifdef DOUBLE_PRECISION_REQUIRES_OBFUSCATION\n\n  vec3 dpPlusFrc(vec3 a, vec3 b) {\n    return mix(a, a + b, vec3(notEqual(b, vec3(0))));\n  }\n\n  vec3 dpMinusFrc(vec3 a, vec3 b) {\n    return mix(vec3(0), a - b, vec3(notEqual(a, b)));\n  }\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = dpPlusFrc(hiA, hiB);\n    vec3 e = dpMinusFrc(t1, hiA);\n    vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;\n    return t1 + t2;\n  }\n\n  #else\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = hiA + hiB;\n    vec3 e = t1 - hiA;\n    vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;\n    return t1 + t2;\n  }\n\n  #endif\n\n  const float MAX_RGBA_FLOAT =\n    255.0 / 256.0 +\n    255.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 / 256.0;\n\n  const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\n\n  vec4 float2rgba(const float value) {\n    // Make sure value is in the domain we can represent\n    float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);\n\n    // Decompose value in 32bit fixed point parts represented as\n    // uint8 rgba components. Decomposition uses the fractional part after multiplying\n    // by a power of 256 (this removes the bits that are represented in the previous\n    // component) and then converts the fractional part to 8bits.\n    vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);\n\n    // Convert uint8 values (from 0 to 255) to floating point representation for\n    // the shader\n    const float toU8AsFloat = 1.0 / 255.0;\n\n    return fixedPointU8 * toU8AsFloat;\n  }\n\n  void main() {\n    vec3 val = dpAdd(u_highA, u_lowA, -u_highB, -u_lowB);\n\n    v_color = float2rgba(val.z / 25.0);\n\n    gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);\n  }\n  `,"\n  precision highp float;\n\n  varying vec4 v_color;\n\n  void main() {\n    gl_FragColor = v_color;\n  }\n  ",{a_pos:0}),c=new Float32Array(6);l.encodeDoubleArray(t,c,3);const a=new Float32Array(6);return l.encodeDoubleArray(o,a,3),e.bindProgram(i),i.setUniform3f("u_highA",c[0],c[2],c[4]),i.setUniform3f("u_lowA",c[1],c[3],c[5]),i.setUniform3f("u_highB",a[0],a[2],a[4]),i.setUniform3f("u_lowB",a[1],a[3],a[5]),i}(v,d),p=e.getBoundFramebufferObject(),{x:b,y:_,width:A,height:m}=e.getViewport();e.bindFramebuffer(t),e.setViewport(0,0,1,1),e.bindVAO(f),e.drawArrays(5,0,4);const g=new Uint8Array(4);t.readPixels(0,0,1,1,6408,5121,g),h.dispose(),f.dispose(!1),o.dispose(),t.dispose(),e.setViewport(b,_,A,m),e.bindFramebuffer(p);const w=(v[2]-d[2])/25,B=c.unpackFloatRGBA(g);return Math.abs(w-B)}e.clearTestWebGLDriver=function(e){t.isSome(d)&&d.context===e&&(d=null)},e.testWebGLDriver=function(e){return(t.isNone(d)||d.context!==e)&&(d=new v(e)),d},Object.defineProperty(e,"__esModule",{value:!0})}));
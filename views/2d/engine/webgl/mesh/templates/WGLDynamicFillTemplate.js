/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../../../../../chunks/_rollupPluginBabelHelpers","../../../../../../core/mathUtils","../../../../../../core/screenUtils","../../definitions","../../number","../../materialKey/MaterialKey","../../color","../../GeometryUtils","../../util/Result","./util","./WGLBaseFillTemplate","./WGLDynamicMeshTemplate"],(function(t,e,i,s,o,n,l,r,a,c,h,f){"use strict";const u=128;return function(h){function f(t){var e;if(e=h.call(this,t)||this,c.isFunction(t.color)){const i=(e,i,s)=>{const o=t.color(e,i,s);return o&&l.premultiplyAlphaRGBA(o)||0};e._dynamicPropertyMap.set("_fillColor",i)}else{const i=t.color;e.fillColor=i&&l.premultiplyAlphaRGBA(i)||0}let s=0;c.isFunction(t.height)||(s=t.height||0);e._dynamicPropertyMap.set("_height",((e,i,o)=>c.isFunction(t.height)?t.height(e,i,o):s));let o=0;c.isFunction(t.offsetX)||(o=i.pt2px(t.offsetX||0)+u,o>255&&(o=255));e._dynamicPropertyMap.set("_offsetX",((e,s,n)=>{if(c.isFunction(t.offsetX)){let o=i.pt2px(t.offsetX(e,s,n))+u;return o>255&&(o=255),o}return o}));let a=1;c.isFunction(t.scaleX)||(a=t.scaleX||1);e._dynamicPropertyMap.set("_scaleX",((e,i,s)=>c.isFunction(t.scaleX)?t.scaleX(e,i,s):a));let f=0;c.isFunction(t.offsetY)||(f=i.pt2px(-t.offsetY||0)+u,f>255&&(f=255));e._dynamicPropertyMap.set("_offsetY",((e,s,o)=>{if(c.isFunction(t.offsetY)){let n=i.pt2px(-t.offsetY(e,s,o))+u;return n>255&&(n=255),n}return f}));let p=0;c.isFunction(t.angle)||(p=r.radToByte(t.angle)||0);return e._dynamicPropertyMap.set("_angle",((e,i,s)=>c.isFunction(t.angle)?r.radToByte(t.angle(e,i,s)):p)),e.effects=t.effects,e._cimFillLayer=t,e._fillMaterialKey=n.FillMaterialKey.load(t.materialKey),e}return t._inheritsLoose(f,h),f.fromCIMFill=function(t){return new f(t)},f.prototype.bindFeature=function(t,n,l){const r=t.readLegacyFeature();this._dynamicPropertyMap.forEach(((t,e)=>{this[e]=t(r,n,l)}));const c=this._fillMaterialKey,h=this._materialCache,f=this._cimFillLayer;this.aux3=o.i8888to32(0,0,this._angle,f.colorLocked?1:0);const p=(0,f.materialHash)(r,n,l),y=h.get(p);let _=null;if(y&&a.ok(y.spriteMosaicItem)&&(_=y.spriteMosaicItem),_){const{rect:t,width:n,height:l}=_,r=t.x+s.SPRITE_PADDING,a=t.y+s.SPRITE_PADDING,h=r+n,f=a+l;let p=e.nextHighestPowerOfTwo(i.pt2px(this._height));p>255?p=255:p<=0&&(p=e.nextHighestPowerOfTwo(f-a));let y=e.nextHighestPowerOfTwo(i.pt2px(this._height/l*n||0));y>255?y=255:y<=0&&(y=e.nextHighestPowerOfTwo(h-r));const m=this._scaleX,g=1;this.tl=o.i1616to32(r,a),this.br=o.i1616to32(h,f),this.aux1=o.i8888to32(y,p,this._offsetX,this._offsetY),this.aux2=o.i1616to32(u*m,u*g),c.sdf=_.sdf,c.pattern=!0,c.textureBinding=_.textureBinding}else this.tl=0,this.br=0,this.aux1=0,this.aux2=0,c.sdf=!1,c.pattern=!1,c.textureBinding=0;this._materialKey=c.data},f}(h(f))}));
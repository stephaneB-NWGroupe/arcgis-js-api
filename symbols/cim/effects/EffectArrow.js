/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../CIMCursor","../CurveHelper"],(function(t,e,n,r){"use strict";const o=1.7320508075688772;let s=function(){function t(){}return t.local=function(){return null===t.instance&&(t.instance=new t),t.instance},t.prototype.execute=function(t,e,n){return new i(t,e,n)},t}();s.instance=null;let i=function(t){function s(e,n,o){var s;return(s=t.call(this,e,!1,!0)||this)._curveHelper=new r.CurveHelper,s._width=(void 0!==n.width?n.width:5)*o,s._arrowType=void 0!==n.geometricEffectArrowType?n.geometricEffectArrowType:"OpenEnded",s._offsetFlattenError=r.PIXEL_TOLERANCE*o,s}e._inheritsLoose(s,t);var i=s.prototype;return i.processPath=function(t){switch(this._arrowType){case"OpenEnded":default:return this._constructSimpleArrow(t,!0);case"Block":return this._constructSimpleArrow(t,!1);case"Crossed":return this._constructCrossedArrow(t)}},i._constructSimpleArrow=function(t,e){const n=this._curveHelper.calculatePathLength(t);let o=this._width;n<2*o&&(o=n/2);const s=this._curveHelper.getSubCurve(t,0,n-o);if(!s)return null;const i=o/2;if(this._curveHelper.isEmpty(s,!1))return null;const l=this._constructOffset(s,-i);if(!l)return null;const u=this._constructOffset(s,i);if(!u)return null;const c=this._constructArrowBasePoint(l,-i/2);if(!c)return null;const h=this._constructArrowBasePoint(u,i/2);if(!h)return null;const a=t[t.length-1];e||(this._makeControlPoint(u,!0),this._makeControlPoint(l,!0));const f=new r.PathHelper;return f.addPath(u,!0),f.lineTo(h),this._makeControlPoint(f.path()),f.lineTo(a),this._makeControlPoint(f.path()),f.lineTo(c),this._makeControlPoint(f.path()),f.addPath(l,!1),e?{paths:[f.path()]}:(f.close(),{rings:[f.path()]})},i._constructCrossedArrow=function(t){const e=this._curveHelper.calculatePathLength(t);let n=this._width;e<n*(1+o+1)&&(n=e/(1+o+1));const s=this._curveHelper.getSubCurve(t,0,e-n*(1+o));if(!s)return null;const i=n/2;if(this._curveHelper.isEmpty(s,!1))return null;const l=this._constructOffset(s,i);if(!l)return null;const u=this._constructOffset(s,-i);if(!u)return null;const c=this._curveHelper.getSubCurve(t,0,e-n);if(!c)return null;if(this._curveHelper.isEmpty(c,!1))return null;const h=this._constructOffset(c,i);if(!h)return null;const a=this._constructOffset(c,-i);if(!a)return null;const f=h[h.length-1],_=this._constructArrowBasePoint(h,i/2);if(!_)return null;const p=a[a.length-1],P=this._constructArrowBasePoint(a,-i/2);if(!P)return null;const d=t[t.length-1];this._makeControlPoint(l,!1),this._makeControlPoint(u,!1);const w=new r.PathHelper;return w.addPath(l,!0),this._makeControlPoint(w.path()),w.lineTo(p),w.lineTo(P),this._makeControlPoint(w.path()),w.lineTo(d),this._makeControlPoint(w.path()),w.lineTo(_),this._makeControlPoint(w.path()),w.lineTo(f),this._makeControlPoint(w.path()),w.addPath(u,!1),{paths:[w.path()]}},i._constructOffset=function(t,e){return this._curveHelper.offset(t,e,"Rounded",4,this._offsetFlattenError)},i._constructArrowBasePoint=function(t,e){if(!t||t.length<2)return null;const n=t[t.length-2],r=t[t.length-1],o=[r[0]-n[0],r[1]-n[1]];return this._curveHelper.normalize(o),[r[0]+o[1]*e,r[1]-o[0]*e]},i._makeControlPoint=function(t,e=!1){e?n.setId(t[0],1):n.setId(t[t.length-1],1)},s}(n.PathGeometryCursor);t.EffectArrow=s,Object.defineProperty(t,"__esModule",{value:!0})}));
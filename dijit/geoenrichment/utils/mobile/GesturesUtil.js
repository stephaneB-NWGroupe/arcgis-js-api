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

define(["dojo/on","../DnDUtil","../animation/Animator","dojo/domReady!"],(function(e,t,n){var o={},i=window._dev_emulateMultiTouch,c=window._dev_logTouch,u={_animation:null,_measures:null,start:function(){this._animation&&this._animation.stop(),this._animation=null,this._measures=[],this._addMeasurePoint(0,0)},_addMeasurePoint:function(e,t){for(;this._measures.length>9;)this._measures.shift();var n={time:(new Date).getTime(),dx:e,dy:t},o=this._measures[this._measures.length-1];this._measures.push(n),o&&(n.vx=e/(n.time-o.time),n.vy=t/(n.time-o.time))},notifyScrolled:function(e,t){this._addMeasurePoint(e,t)},flyScroll:function(e){if(!(this._measures.length<2)){var t=(new Date).getTime(),o=0,i=0,c=0;if(this._measures.forEach((function(e,n){"number"==typeof e.vx&&(t-e.time>100||(o+=e.vx,i+=e.vy,c++))})),c){var u=o/=c,a=i/=c;this._animation=n.animateProperty({duration:750,properties:{p:{start:0,end:1,easing:"sineOut"}},progressFunction:function(n,c,r){var l=(new Date).getTime(),s=l-t;t=l,e(u*s,a*s),u=o*(1-r),a=i*(1-r)}})}}}};return o.preventDefaultSiteBehavior=function(){document.body.style.touchAction="none"},o.preventDefaultOverflow=function(t){return t&&e(t,"touchmove",(function(e){e.preventDefault()}))},o.preventDoubleTapZoom=function(t){var n,o=(new Date).getTime();return n=e(t,"touchstart",(function(e){var t=(new Date).getTime();t-o<300&&e.preventDefault(),o=t})),{remove:function(){n.remove()}}},o.enableGesturesOnNode=function(t,n){if(t){o.preventDefaultSiteBehavior();var a={},r=0,l=n.zoomTolerance||50;if(i)o.dev_addMultiTouchEmulation(t,m,g,p);else var s=e(t,"touchstart",m),d=e(t,"touchmove",g),h=e(t,"touchend",p);return c&&(n.logDiv=o.dev_createLogLabel()),{remove:function(){a=null,s.remove(),d.remove(),h.remove()}}}function f(e,t){n.logDiv&&((n.logDiv.innerHTML.length>1e3||t)&&(n.logDiv.innerHTML=""),n.logDiv.innerHTML+=e+"<br/>")}function v(e,t){var n=e.x-t.x,o=e.y-t.y;return Math.sqrt(n*n+o*o)}function m(e){n.enableFlyingScroll&&u.start();for(var t=0;t<e.changedTouches.length;t++){var o=e.changedTouches[t];a[o.identifier]={x:o.clientX,y:o.clientY}}if(f("Num touches "+e.touches.length),2===e.touches.length){if(n.canZoom&&!n.canZoom(e))return void f("Can't zoom");var i=a[e.touches[0].identifier],c=a[e.touches[1].identifier];i&&c?(r=v(i,c),f("Start distance: "+Math.round(r))):a={}}}function g(e){if(2===e.touches.length){e.preventDefault();var t=e.touches[0],o=e.touches[1],i=a[t.identifier],c=a[o.identifier];if(i&&c&&r){i.x=t.clientX,i.y=t.clientY,c.x=o.clientX,c.y=o.clientY;var s=v(i,c),d=Math.abs(r-s);f("Diff: "+Math.round(d),!0),d>l&&(f("Zoom"),r<s?n.onZoomIn():n.onZoomOut(),r=s)}else a={}}else if(1===e.touches.length){n.canScroll&&!n.canScroll(e)||e.preventDefault();t=e.touches[0];if(i=a[t.identifier]){var h=i.x-t.clientX,m=i.y-t.clientY;i.x=t.clientX,i.y=t.clientY,n.canScroll&&!n.canScroll(e)||(n.onScrollChanged(h,m),n.enableFlyingScroll&&u.notifyScrolled(h,m))}else a={}}}function p(e){for(var t=0;t<e.changedTouches.length;t++){var o=e.changedTouches[t];delete a[o.identifier]}r=0,f("Num touches "+e.touches.length,!e.touches.length),n.enableFlyingScroll&&u.flyScroll(n.onScrollChanged)}},o.dev_addMultiTouchEmulation=function(n,o,i,c){function u(e,t,n){var u={type:e,clientX:n&&n.clientX,clientY:n&&n.clientY,changedTouches:[t.getTouch()],touches:[],preventDefault:function(){n&&n.preventDefault()}};switch(r.isOn&&u.touches.push(r.getTouch()),l.isOn&&u.touches.push(l.getTouch()),e){case"touchstart":o(u);break;case"touchmove":i(u);break;case"touchend":c(u)}}var a=function(n,o,i){var c=this;c.x=o,c.y=i,c.isOn=!1,c.node=document.createElement("div"),c.node.style.width="50px",c.node.style.height="50px",c.node.style.borderRadius="50%",c.node.style.cursor="pointer",c.node.style.position="absolute",c.node.style.zIndex="10000",document.body.appendChild(c.node),t.addNoDragClickHandler(c.node,(function(){c.isOn=!c.isOn,c._updateStateColor(),u(c.isOn?"touchstart":"touchend",c,null)}),{tolerance:5});var a,r;e(c.node,"touchstart",(function(t){!0,a=t.clientX,r=t.clientY,e.once(document.body,"touchend",(function(){!1,a=void 0}))})),e(c.node,"touchmove",(function(e){if(void 0!==a){e.preventDefault();var t=e.clientX-a,n=e.clientY-r;a=e.clientX,r=e.clientY,c.x+=t,c.y+=n,c._updateNodePosition(),c.isOn&&u("touchmove",c,e)}})),c._updateStateColor=function(){c.node.style.backgroundColor=c.isOn?"#00FF00":"#CCCCCC"},c._updateNodePosition=function(){c.node.style.left=c.x-c.node.clientWidth/2+"px",c.node.style.top=c.y-c.node.clientHeight/2+"px"},c._updateStateColor(),c._updateNodePosition(),c.getTouch=function(){return{identifier:n,clientX:c.x,clientY:c.y}}},r=new a("touch_0",100,100),l=new a("touch_1",200,200)},o.dev_createLogLabel=function(){var e=document.createElement("div");document.body.appendChild(e);var t=e.style;return t.position="absolute",t.zIndex="10000",t.right="0px",t.bottom="0px",t.width="150px",t.height="100px",t.backgroundColor="gray",t.color="white",t.overflow="auto",t.padding="3px",e},o}));
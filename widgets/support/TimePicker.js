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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","dojo/i18n!./nls/TimePicker","../../intl","../../moment","../../core/events","../../core/accessorSupport/decorators","../Widget","./TimePickerViewModel","./widget"],(function(e,t,i,r,a,n,o,s,u,l,h,p){var c="esri-time-picker esri-widget",d="esri-time-picker__input",v="esri-input",f={hour:"numeric",minute:"numeric"},m=["ArrowDown","ArrowLeft","ArrowRight","ArrowUp","Tab"];function _(e){return n.formatDate(e.valueOf(),f).indexOf(" ")>-1}return function(e){function t(t){var i=e.call(this,t)||this;return i._activeTime=null,i.value=null,i.viewModel=new h,i}return r(t,e),t.prototype.render=function(){var e=this._activeTime||this.viewModel.value;return p.tsx("div",{class:c},p.tsx("input",{afterUpdate:this._handleInputUpdate,"aria-label":a.inputTitle,bind:this,class:this.classes(d,v),onblur:this._handleInputBlur,onfocus:this._handleInputFocus,onkeydown:this._handleInputKeydown,onclick:this._handleInputClick,onpaste:this._handleInputPaste,onwheel:this._handleInputWheel,value:n.formatDate(e.valueOf(),f)}))},t.prototype._handleInputBlur=function(){this._activeTime.isValid()&&(this.viewModel.value=this._activeTime),this._activeTime=null,this._activePart=null},t.prototype._handleInputUpdate=function(e){this._selectPart(e,this._activePart)},t.prototype._selectPart=function(e,t){var i=this._activeTime;if(i){var r=n.formatDate(i.valueOf(),f),a=r.indexOf(":");if("hours"!==t){var o=a+1,s=o+2;if("minutes"!==t){var u=s+1,l=r.length;"meridiem"!==t||e.setSelectionRange(u,l)}else e.setSelectionRange(o,s)}else e.setSelectionRange(0,a)}},t.prototype._handleInputFocus=function(e){this._activePart="hours",this._activeTime=this.viewModel.value.clone().startOf("minute"),this._selectPart(e.target,"hours")},t.prototype._caretIndexToPartName=function(e){var t=this._activeTime.format("LT"),i=t.indexOf(":"),r=t.indexOf(" ");return e<=i?"hours":e>i&&e<=r?"minutes":"meridiem"},t.prototype._handleInputKeydown=function(e){var t=e.ctrlKey,i=e.metaKey,r=e.shiftKey,a=s.eventKey(e),n=this._activeTime,o=this._activePart,u=/\d/.test(a),l=/^a|p$/i.test(a),h=i||t;if(m.indexOf(a)>-1||u||"meridiem"===o&&l&&!h){if("ArrowLeft"===a)this._activePart=this._prevPart();else if("ArrowRight"===a)this._activePart=this._nextPart();else if("Tab"===a){var p=r?this._prevPart():this._nextPart();if(p===this._activePart)return;this._activePart=p}else if("ArrowUp"===a)this._shift("up",n,o);else if("ArrowDown"===a)this._shift("down",n,o);else if(u)this._setTime(n,o,Number(a));else if(l){var c=a.toLowerCase(),d=n.hour();("a"===c&&d>=12||"p"===c&&d<12)&&this._shift("up",n,o)}e.preventDefault(),e.stopImmediatePropagation()}else h||(e.preventDefault(),e.stopImmediatePropagation())},t.prototype._handleInputClick=function(e){var t=e.target;this._activePart=null,this.renderNow(),this._activePart=this._caretIndexToPartName(t.selectionStart)},t.prototype._getOrderedParts=function(){return _(this._activeTime)?["hours","minutes","meridiem"]:["hours","minutes"]},t.prototype._prevPart=function(){var e=this._getOrderedParts(),t=e.indexOf(this._activePart)-1;return e[Math.max(t,0)]},t.prototype._nextPart=function(){var e=this._getOrderedParts(),t=e.indexOf(this._activePart)+1;return e[Math.min(t,e.length-1)]},t.prototype._setTime=function(e,t,i){if("hours"===t){var r=_(e)?12:24,a=""+e.hour()%r,n=i,o=Number(""+a+i);2===a.length||o>r?e.hour(n):o<=r&&e.hour(o)}else if("minutes"===t){var s=""+e.minute(),u=i,l=Number(""+s+i);2===s.length||l>59?e.minute(u):l<59&&e.minute(l)}},t.prototype._handleInputPaste=function(e){var t=e.clipboardData.getData("text/plain"),i=o(t);i.isValid()&&(this._activeTime=i),e.preventDefault(),e.stopImmediatePropagation()},t.prototype._handleInputWheel=function(e){var t=e.deltaY<0?"up":"down";this._shift(t,this._activeTime,this._activePart)},t.prototype._shift=function(e,t,i){if(e&&t&&i){var r="meridiem"===i?12:1,a="hours"===i?"hour":"minutes"===i?"minute":"hours";t["up"===e?"add":"subtract"](r,a)}},i([u.aliasOf("viewModel.value")],t.prototype,"value",void 0),i([u.property({type:h}),p.renderable("viewModel.value")],t.prototype,"viewModel",void 0),t=i([u.subclass("esri.widgets.support.TimePicker")],t)}(u.declared(l))}));
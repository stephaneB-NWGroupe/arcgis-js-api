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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","../etc/docUtil","../etc/matchTopNodeUtil","./XmlFlattener","./xmlUtil","../../../../kernel","dojo/sniff"],(function(e,t,i,n,o,a,r,s,u){var l=e(null,{constructor:function(e){t.mixin(this,e)},importDocument:function(e,t,i){var n=e.rootElement,o={asTemplate:i,considerGML3andGML32:!0,gxeDocument:e,xmlDocument:t,gxeData:{nsUrisByPrefix:s.makeGxeUrisByPrefix(e.getNamespaces()),nsPrefixesByUri:s.makeGxePrefixesByUri(e.getNamespaces())}};this._walk(o,n,null)},_findMatchingDomAttribute:function(e,t,n){var o=null;return i.some(n.attributes,(function(i){if(this._isMatching(e,t,i))return o=i,!0}),this),o},_findMatchingDomElements:function(e,t,n){var o=null,a=s.nodeTypes.ELEMENT_NODE;return i.forEach(n.childNodes,(function(i){i.nodeType===a&&this._isMatching(e,t,i)&&(null===o&&(o=[]),o.push(i))}),this),o},_findMatchingSubTarget:function(e,t,n){var o=null,a=s.nodeTypes.ELEMENT_NODE;return i.some(n.childNodes,(function(n){if(n.nodeType===a)if("TopicCatCd@value"===t){if(this._isMatching(e,"TopicCatCd",n)&&i.some(n.attributes,(function(t){if(this._isMatching(e,"value",t))return o=t,!0}),this))return!0}else if(this._isMatching(e,t,n))return o=n,!0}),this),o},_isMatching:function(e,t,i){var o,a,r=!1,s=null,u=e.gxeData.nsUrisByPrefix,l=t;-1!==l.indexOf(":")&&(a=(o=l.split(":"))[0],l=o[1],a in u?s=u[a]:0===t.indexOf("xml:")?s="http://www.w3.org/XML/1998/namespace":console.log("Warning: namespace prefix was not configured: "+t)),n("ie")<=8&&(s="");var c=e.considerGML3andGML32,h=i.namespaceURI===s;return!h&&c&&("http://www.opengis.net/gml/3.2"===s?h="http://www.opengis.net/gml"===i.namespaceURI:"http://www.opengis.net/gml"===s&&(h="http://www.opengis.net/gml/3.2"===i.namespaceURI)),h&&l===i.localName&&(r=!0),r},_getDomNodeText:function(e){return s.getNodeText(e)},_getDomNodeTextValues:function(e,t,n){var o,a,r=[];return i.forEach(t,(function(t){o=null,n?(a=this._findMatchingSubTarget(e,n,t))&&(o=this._getDomNodeText(a)):o=this._getDomNodeText(t),null!=o&&r.push(o)}),this),r},_printGxeReferences:function(e){var t,n="";for(t=0;t<e.depth;t++)n+="  ";console.log(n+e.widget.target),i.forEach(e.attributeRefs,(function(e){console.log(n+"    @"+e.widget.target)})),i.forEach(e.elementRefs,(function(e){this._printGxeReferences(e)}),this)},_repairChoices:function(e,t){var n,o,a;t&&t.length>0&&"attrdomv"===e.target&&(n="attrdomv",o="edom",a=[],i.forEach(t,(function(e){var t=!0;i.forEach(e.childNodes,(function(e){if(e.localName===o)if(t)t=!1;else{var i=document.createElement(n);i.appendChild(e.cloneNode(!0)),a.push(i)}}))})),i.forEach(a,(function(e){t.push(e)})))},_updateAttribute:function(e,t,i){if(!t.fixed){var n,o=this._findMatchingDomAttribute(e,t.target,i);o&&(n=this._getDomNodeText(o),this._updateXNode(e,t,o,n))}},_updateElementText:function(e,t,i){if(!t.fixed){var n=this._getDomNodeText(i);this._updateXNode(e,t,i,n)}},_updateXNode:function(e,t,i,n){null!==n&&t.inputWidget&&(t.isDocumentTitle&&(e.gxeDocument.originalTitle=n,e.asTemplate)||(t.inputWidget.importValue({domNode:i,asTemplate:e.asTemplate},n),!t.hide&&t.toggleContent&&t.toggleContent(!0)))},_walk:function(e,n,o){if(!n.fixed){var r,s,u,l,c=!0,h=null;if(o)n._isGxeElement?(h=this._findMatchingDomElements(e,n.target,o))||(c=!1):n._isGxeAttribute&&(c=!1,this._updateAttribute(e,n,o));else{if(o=e.xmlDocument.documentElement,!this._isMatching(e,n.target,o))throw new Error("The XML root element does not match the editor definition.");h=[o]}h&&h.length>0&&(h=a.evaluateDomMatch(n,h,e.gxeData.nsPrefixesByUri))&&h.length>0&&this._repairChoices(n,h);var d=n.inputWidget&&n.inputWidget._supportsMultipleValues,f=n.multiplicityHeader;h&&h.length>0&&(n.toggleContent&&n.toggleContent(!0),(r=n.getParent())&&r._isGxeElementChoice?r.ensureActiveTab(n):r&&((s=r.getParent())&&s._isGxeElementChoice?s.ensureActiveTab(r):s&&(u=s.getParent())&&u._isGxeElementChoice&&u.ensureActiveTab(s)),d?(c=!1,l=this._getDomNodeTextValues(e,h,n.inputWidget.subTarget),n.inputWidget.importValues({domNodes:h},l)):1===h.length?(o=h[0],this._updateElementText(e,n,o)):f?(o=h[0],this._updateElementText(e,n,h[0]),i.forEach(h,(function(o,a){if(a>0){if("unbounded"!==n.maxOccurs&&a===n.maxOccurs)return;f.repeatElement(n,!1).then(t.hitch(this,(function(t){t&&(this._updateElementText(e,t,o),i.forEach(t.getChildren(),(function(t){this._walk(e,t,o)}),this))})),(function(e){console.error(e)}))}}),this)):(o=h[0],this._updateElementText(e,n,o))),c&&i.forEach(n.getChildren(),(function(t){this._walk(e,t,o)}),this)}}});return n("extend-esri")&&t.setObject("dijit.metadata.base.xml.XmlImporter",l,u),l}));
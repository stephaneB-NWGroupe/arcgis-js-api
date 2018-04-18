// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/_base/array","dojo/_base/url","dojo/io-query","./kernel","./lang","./config","./sniff","dojo/i18n!./nls/jsapi"],function(e,r,t,o,n,i,a,s,l){var u=function(){return this}(),c={},h=a.defaults.io,f=/^[a-z][a-z0-9\+\-\.]*:/i,p=/^\s*http:/i,g=/^\s*https:/i,x=/^https?:\/\/[^\/]+\.arcgis.com\/sharing(\/|$)/i;return c.isHTTP=function(e){var r=u.location.protocol;return null==e?"http:"===r||"https:"===r:e?"https:"===r:"http:"===r},c.getProtocolForWebResource=function(e){return c.isHTTP()?u.location.protocol:e?"https:":"http:"},c.urlToObject=function(e){var r={},n=new t(e),i=e.indexOf("?");return null===n.query?r={path:e,query:null}:(r.path=e.substring(0,i),r.query=o.queryToObject(n.query)),n.fragment&&(r.hash=n.fragment,null===n.query&&(r.path=r.path.substring(0,r.path.length-(n.fragment.length+1)))),r},c.getProxyUrl=function(r,t){var o,n,i,a,s=e.isString(r)?0===e.trim(r).toLowerCase().indexOf("https:"):r,f=h.proxyUrl,p=l.io.proxyNotSet;if(e.isString(r)&&(a=c.getProxyRule(r))&&(f=a.proxyUrl),!f)throw console.log(p),new Error(p);return s&&!1!==t&&0!==u.location.href.toLowerCase().indexOf("https:")&&(n=f,0!==n.toLowerCase().indexOf("http")&&(n=c.getAbsoluteUrl(n)),n=n.replace(/^http:/i,"https:"),c.canUseXhr(n)&&(f=n,i=1)),o=c.urlToObject(f),o._xo=i,o},c.addProxy=function(r){var t,n,i,a=c.getProxyRule(r);return a?t=c.urlToObject(a.proxyUrl):h.alwaysUseProxy&&(t=c.getProxyUrl()),t&&(n=c.urlToObject(r),r=t.path+"?"+n.path,(i=o.objectToQuery(e.mixin(t.query||{},n.query)))&&(r+="?"+i)),r},c.addProxyRule=function(e){var r,t,o=e.urlPrefix=c.urlToObject(e.urlPrefix).path.replace(/([^\/])$/,"$1/").replace(/^https?:\/\//gi,"").toLowerCase(),n=h.proxyRules,i=n.length,a=i;for(r=0;r<i;r++){if(t=n[r].urlPrefix,0===o.indexOf(t)){if(o.length===t)return-1;a=r;break}0===t.indexOf(o)&&(a=r+1)}return n.splice(a,0,e),a},c.getProxyRule=function(e){var r,t,o=h.proxyRules,n=o.length,i=c.urlToObject(e).path.replace(/([^\/])$/,"$1/").replace(/^https?:\/\//gi,"").toLowerCase();for(r=0;r<n;r++)if(0===i.indexOf(o[r].urlPrefix)){t=o[r];break}return t},c.hasSameOrigin=function(r,o,n){r=r.toLowerCase(),o=o.toLowerCase();var i=u.location.href.toLowerCase();return r=0===r.indexOf("http")?new t(r):i=new t(i),o=0===o.indexOf("http")?new t(o):e.isString(i)?new t(i):i,(n||r.scheme===o.scheme)&&r.host===o.host&&r.port===o.port},c.canUseXhr=function(t,o){var n,i=!!s("esri-phonegap"),a=c.hasSameOrigin,l=h.corsEnabledServers,u=-1;return!i&&s("esri-cors")&&l&&l.length&&(i=r.some(l,function(r,o){var i=r&&"object"==typeof r?r.host:r;return!!(i&&(n=0!==e.trim(i).toLowerCase().indexOf("http"),a(t,n?"http://"+i:i)||n&&a(t,"https://"+i)))&&(u=o,!0)})),o?u:i},c.getAbsoluteUrl=function(r){var t=c.getProtocolForWebResource();return e.isString(r)&&!f.test(r)?0===r.indexOf("//")?t+r:0===r.indexOf("/")?t+"//"+u.location.host+r:n._appBaseUrl+r:r},c.fixUrl=function(r){return r=e.trim(r),r=c.getAbsoluteUrl(r),r=c.normalizeSlashes(r),r=c.downgradeToHTTP(r),r=c.upgradeToHTTPS(r),r=r.replace(/^(https?:\/\/)(arcgis\.com)/i,"$1www.$2")},c.normalize=function(e){return c.fixUrl(e)},c.normalizeSlashes=function(e){if(/^https?:\/\//i.test(e)){var r,t,o=e.indexOf("?");o>-1?(r=e.slice(0,o),t=e.slice(o+1)):r=e,e=r.replace(/\/{2,}/g,"/"),e=e.replace("/","//"),t&&(e+="?"+t)}return e},c.downgradeToHTTP=function(e){return c.isHTTP(!1)&&g.test(e)&&c.hasSameOrigin(u.location.href,e,!0)&&!c.canUseXhr(e)?e.replace(g,"http:"):e},c.upgradeToHTTPS=function(r){var t=a.defaults.io.httpsDomains,o=c.isHTTP(!1),n=c.isHTTP(!0);if(!p.test(r))return r;r=e.trim(r);var s,l=r.indexOf("/",7);if(s=-1===l?r:r.slice(0,l),s=s.toLowerCase().slice(7),o&&s===u.location.host&&(!x.test(r)||!c.canUseXhr(r)))return r;var h=!1;if(n&&s===u.location.host)h=!0;else if(t)for(var f=0;f<t.length;f++){var g=t[f];if(s===g||i.endsWith(s,"."+g)){h=!0;break}}return h&&(r=r.replace(p,"https:")),r},s("extend-esri")&&(e.mixin(n,c),n._getProxyUrl=c.getProxyUrl,n._getProxiedUrl=c.addProxy,n._hasSameOrigin=c.hasSameOrigin,n._canDoXOXHR=c.canUseXhr,n._getAbsoluteUrl=c.getAbsoluteUrl,n.fixUrl=c.fixUrl),c});
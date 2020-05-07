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

define(["require","exports","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/pbf","../../../../core/promiseUtils","./BackgroundBucket","./CircleBucket","./Feature","./FillBucket","./LineBucket","./SourceLayerData","./SymbolBucket","../webgl/TileClipper","../../tiling/enums"],(function(e,t,r,i,n,l,s,a,u,o,c,f,p,h,_){return function(){function e(e,t,r){this._pbfTiles={},this._tileClippers={},this._client=r,this._tile=t,this._layers=t.getLayers();var i=t.tileKey.split("/").map(parseFloat),l=i[0],s=i[1],a=i[2];this._level=l;for(var u=Math.max(8,Math.round(1*this._level)-8),o=0,c=Object.keys(e);o<c.length;o++){var f=c[o],p=e[f];if(this._pbfTiles[f]=new n(new Uint8Array(p.protobuff),new DataView(p.protobuff)),p.refKey){var _=l-p.refKey.split("/").map(parseFloat)[0];if(_>0){var y=(1<<_)-1,v=s&y,B=a&y;this._tileClippers[f]=new h.TileClipper(_,v,B,8,u)}}this._tileClippers[f]||(this._tileClippers[f]=new h.SimpleBuilder)}}return e.prototype.parse=function(e){return i(this,void 0,void 0,(function(){var t,i,n,s,a,o,c,f,p,h,y,v,B,x,g,d,k,D,m,w,b,I,C,V,F,L,S,T,z,O,j,H,K,M,A,E,U,W,q,G,N,R,J,P,Q,X,Y,Z,$,ee,te,re,ie,ne,le,se,ae,ue;return r(this,(function(r){for(t=e&&e.signal,i=this._parseTileData(this._pbfTiles),n=this._layers,s=this._level,o=[],c=this._tileClippers,f={},p={},h=n.length-1;h>=0;h--)(a=n[h]).minzoom&&s<a.minzoom||a.maxzoom&&s>=a.maxzoom||a.layout&&a.layout.visibility&&"none"===a.layout.visibility||0!==a.type&&i[a.source]&&c[a.source]&&(z=i[a.source],y=c[a.source],Q=a.sourceLayer,(O=z[Q])&&((v=p[a.source])||(v=p[a.source]=new Set),v.add(a.sourceLayer),(te=this._createBucket(a))&&(te.layerIndex=h,te.layerExtent=O.extent,te.tileClipper=y,(j=f[a.source])||(j=f[a.source]={}),(B=j[Q])||(B=j[Q]=[]),B.push(te))));for(x=10*this._level,g=10*(this._level+1),d=[],k=[],D=[],m=[],w=new Set,b={},I=[],C=[],V=function(e){p[e].forEach((function(t){I.push(t),C.push(e)}))},F=0,L=Object.keys(p);F<L.length;F++)J=L[F],V(J);for(S=0;S<I.length&&(J=C[S],T=I[S],i[J]&&f[J])&&(z=i[J],O=z[T],j=f[J],(X=j[T])&&0!==X.length);S++){if(l.isAborted(t))return[2,void 0];for(H=O.getData();H.next(2);){if(K=H.getMessage(),M=new u(K,O),K.release(),A=M.values){if((E=A._minzoom)&&E>=g)continue;if((U=A._maxzoom)&&U<=x)continue}for(W=0,q=X;W<q.length;W++)(te=q[W]).pushFeature(M)}}for(G=this._tile,N=0,R=Object.keys(f);N<R.length;N++)for(Q in J=R[N],P=f[J])for(X=P[Q],Y=0,Z=X;Y<Z.length;Y++)(te=Z[Y]).hasFeatures()&&(3===te.layer.type?(d.push(te),G.addBucket(te)):te.layer.refLayerId?D.push(te):(k.push(te),m[te.layer.id]=te));for($=0,ee=d;$<ee.length;$++)te=ee[$],(re=te).getResources(re.tileClipper,w,b);if(this._tile.status===_.TileStatus.INVALID)return[2,l.resolve([])];for(ae in ie=[],ne=this._tile.getWorkerTileHandler(),w.size>0&&(le=ne.fetchSprites(w,this._client,e),ie.push(le)),b)(ue=b[ae]).size>0&&(se=ne.fetchGlyphs(this._tile.tileKey,ae,ue,this._client,e),ie.push(se));return[2,l.all(ie).then((function(){for(var e=0,t=k;e<t.length;e++){var r=t[e];r.processFeatures(r.tileClipper),o.push(r)}for(var i=0,n=D;i<n.length;i++){var l=n[i],s=m[l.layer.refLayerId];s&&(s.assignBufferInfo(l),o.push(l))}for(var a=0,u=d;a<u.length;a++){var c=u[a];c.processFeatures(c.tileClipper),o.push(c)}return o.sort((function(e,t){return e.layerIndex-t.layerIndex})),o}))]}))}))},e.prototype._parseTileData=function(e){for(var t={},r=0,i=Object.keys(e);r<i.length;r++){for(var n=i[r],l=e[n],s={};l.next();)switch(l.tag()){case 3:var a=l.getMessage(),u=new f(a);a.release(),s[u.name]=u;break;default:l.skip()}t[n]=s}return t},e.prototype._createBucket=function(e){switch(e.type){case 0:return this._createBackgroundBucket(e);case 1:return this._createFillBucket(e);case 2:return this._createLineBucket(e);case 4:return this._createCircleBucket(e);case 3:return this._createSymbolBucket(e)}},e.prototype._createBackgroundBucket=function(e){return new s(e,this._level)},e.prototype._createFillBucket=function(e){var t=this._tile;return new o(e,this._level,e.hasDataDrivenFill?t.fillDDVertexBuffer:t.fillVertexBuffer,t.fillIndexBuffer,e.hasDataDrivenOutline?t.outlineDDVertexBuffer:t.outlineVertexBuffer,t.outlineIndexBuffer)},e.prototype._createLineBucket=function(e){var t=this._tile;return new c(e,this._level,e.hasDataDrivenLine?t.lineDDVertexBuffer:t.lineVertexBuffer,t.lineIndexBuffer)},e.prototype._createCircleBucket=function(e){var t=this._tile;return new a(e,this._level,t.circleVertexBuffer,t.circleIndexBuffer)},e.prototype._createSymbolBucket=function(e){var t=this._tile;return new p(e,this._level,e.hasDataDrivenIcon?t.iconDDVertexBuffer:t.iconVertexBuffer,t.iconIndexBuffer,e.hasDataDrivenText?t.textDDVertexBuffer:t.textVertexBuffer,t.textIndexBuffer,t.placementEngine,t.getWorkerTileHandler())},e}()}));
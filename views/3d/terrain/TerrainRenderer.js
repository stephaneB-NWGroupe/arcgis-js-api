// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/assignHelper","../../../Color","../../../core/maybe","../../../core/ObjectPool","../../../core/PooledArray","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec2f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingBox","../support/imageUtils","./ResourceCounter","./TerrainConst","./TileGeometryFactory","./TileRenderData","./TileRenderer","./tileUtils","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/intersectorUtils","../webgl-engine/lib/screenSizePerspectiveUtils","../webgl-engine/lib/tracer","../webgl-engine/lib/Util","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/shaders/TerrainRendererPrograms","../../webgl/renderState","../../webgl/Util"],function(e,t,i,r,n,s,a,l,o,d,h,c,u,p,f,g,v,m,b,y,T,R,x,P,_,S,O,w,D,E,I,U){function k(e,t,i){return 0===e.tiles.length?-i:0===t.tiles.length?i:x.compareTiles(e.tiles.data[0],t.tiles.data[0],i)}function L(e,t,i){var r=e[0]*t[2]+t[0],n=e[1]*t[3]+t[1],s=e[2]*t[2],a=e[3]*t[3];p.vec4.set(i,r,n,s,a)}var N=w.assert,M=d.mat4f64.create(),B=u.vec3f64.create(),z=h.vec2f64.create(),A=g.create(),C=f.vec4f64.create(),Q=f.vec4f64.create(),V=f.vec4f64.create(),j=function(){function e(){this.extent=f.vec4f64.create(),this.minLevel=0,this.maxLevel=0,this.callback=null}return e}(),q=function(){function e(e,t){this._memCache=t,this.tileSize=256,this.initialized=!1,this.rctx=null,this.renderDataPool=new a(T.TileRenderData),this.perOriginTileData=new l({allocator:function(e){return e||{root:null,origin:null,tiles:new l}},deallocator:function(e){return e.root=null,e.origin=null,e.tiles.clear(),e}}),this.perOriginTileDataDirty=!0,this.perOriginTileDataMap=new Map,this.tileIterator=new x.IteratorPreorder,this._highestVisibleLODTile=null,this.visible=!0,this.debugScreenSizePerspective=!1,this.wireframe=D.copyParameters(H),this._opaque=!0,this._skirtScale=1,this._drawBorders=!1,this._disableRendering=!1,this._cullBackFaces=!1,this._renderOrder=b.RenderOrder.FRONT_TO_BACK,this._velvetOverground=!0,this._hasOverlays=!1,this._slicePlaneEnabled=!1,this.castShadows=!0,this.receiveShadows=!1,this.emptyTex=null,this.tileRenderer=null,this.backgroundPromise=null,this.tileBackgroundInitialized=!1,this.stencilEnabledLayerExtents=[],this.numTrianglesRendered=0,this.numTilesRendered=0,this.numTilesCulled=0,this.numOriginsRendered=0,this.resourceCounter=new m,this.clippingExtent=null,this.loaded=null,this._loaded=!1,this.needsRender=!0,this.didRender=!1,this.needsHighlight=!1,this.visibleScaleRangeQueries=new l({initialSize:10}),this.visibleScaleRangeQueriesInvPtr=0,this.visibleScaleRangeQueryQueue=new l({initialSize:30}),this.visibleScaleRangeQueryPool=new a(j,!1),this.manifold=e}return e.prototype.destroy=function(e){this.uninstall(e),this.backgroundPromise&&(this.backgroundPromise.cancel(),this.backgroundPromise=null),y.clearCaches()},e.prototype.install=function(e){e.addRenderPlugin([3,8],this),this.drapedRenderer=e.getDrapedRenderer()},e.prototype.uninstall=function(e){e.removeRenderPlugin(this)},Object.defineProperty(e.prototype,"disableRendering",{set:function(e){this._disableRendering=!!e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"opaque",{set:function(e){this._opaque=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"skirtScale",{set:function(e){this._skirtScale=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"drawBorders",{set:function(e){this._drawBorders!==e&&(this._drawBorders=e,this._updatePrograms())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"cullBackFaces",{set:function(e){this._cullBackFaces=e,this._updatePrograms(),this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderOrder",{get:function(){return this._renderOrder},set:function(e){this._renderOrder=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"velvetOverground",{set:function(e){this._velvetOverground!==e&&(this._velvetOverground=e,this._updatePrograms())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectionHandlerId",{get:function(){return _.TERRAIN_ID},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"slicePlaneEnabled",{get:function(){return this._slicePlaneEnabled},set:function(e){this._slicePlaneEnabled!==e&&(this._slicePlaneEnabled=e,this._updatePrograms())},enumerable:!0,configurable:!0}),e.prototype.setRootTiles=function(e){this.rootTiles=e,this.setNeedsRender()},e.prototype.setNeedsHighlight=function(e){this.needsHighlight=e,this.setNeedsRender()},e.prototype.setStencilEnabledLayerExtents=function(e){this.stencilEnabledLayerExtents=e,this.setNeedsRender()},e.prototype.setTileSize=function(e){this.tileSize=e,this.tileRenderer&&(this.tileRenderer.tileSize=e),this.setNeedsRender()},e.prototype.loadCachedElevationData=function(e){N(null===e.renderData);var t=x.tile2str(e),i=this._memCache.pop(t);if(i){e.renderData=i.renderData,e.renderData.tile=e,e.renderData.localOrigin=this._getLocalOriginOfTile(e);for(var r in i.upsampleLIJs){var n=i.upsampleLIJs[r],s=x.findParentByLIJ(e,n);e.layerInfo[b.LayerClass.ELEVATION][r].setUpsampleInfo(e,s)}}return null!=i},e.prototype.loadTile=function(e){e.renderData||(e.renderData=this.renderDataPool.acquire(),e.renderData.init(e),e.renderData.localOrigin=this._getLocalOriginOfTile(e),this.updateTileGeometry(e)),this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(e)},e.prototype.queryVisibleLevelRange=function(e,t,i,r){var n=this.visibleScaleRangeQueryPool.acquire();p.vec4.copy(n.extent,e),n.minLevel=t||-Number.MAX_VALUE,n.maxLevel=null!=i?i:Number.MAX_VALUE,n.callback=r,this.visibleScaleRangeQueryQueue.push(n),this.setNeedsRender()},e.prototype.updateTileTexture=function(e){this.tileRenderer&&this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(e)},e.prototype.updateTileGeometry=function(e){for(var t=0,i=e.layerInfo[b.LayerClass.ELEVATION];t<i.length;t++){i[t].pendingUpdates&=~b.TileUpdate.GEOMETRY}e.renderData.updateGeometry(this.rctx,"debug"===this.wireframe.mode)&&this.setNeedsRender()},e.prototype.unloadTile=function(e,t){if(e.renderData){if(e.renderData.releaseTexture(),t){for(var i={renderData:e.renderData,upsampleLIJs:[]},r=0,n=e.layerInfo[b.LayerClass.ELEVATION];r<n.length;r++){var s=n[r],a=s.upsampleFromTile.tile.lij;i.upsampleLIJs.push([a[0],a[1],a[2]])}this._memCache.put(x.tile2str(e),i,e.renderData.estimatedGeometryMemoryUsage)}else this.releaseTileGeometry(e.renderData);e.renderData=null,e.updateMemoryUsed()}},e.prototype._getLocalOriginOfTile=function(e){var t=Math.max(0,7*Math.floor((e.lij[0]-3)/7));if("spherical"===this.manifold&&0===t)return B;for(;e.parent&&e.lij[0]>t;)e=e.parent;return e.centerAtSeaLevel},e.prototype.setVisibility=function(e){this.visible=e,this.setNeedsRender()},e.prototype.getStats=function(){return{numTilesRendered:this.numTilesRendered,numTilesCulled:this.numTilesCulled,numTrianglesRendered:this.numTrianglesRendered,numOriginsRendered:this.numOriginsRendered}},e.prototype.getWireframeEnabled=function(){return"shader"===this.wireframe.mode},e.prototype.setDebugScreenSizePerspective=function(e){e!==this.debugScreenSizePerspective&&(this.debugScreenSizePerspective=e,this._updatePrograms())},e.prototype.setWireframe=function(e){var t=this;!1!==e&&!0!==e||(e={mode:e?"shader":"none"});var i=this.wireframe;if(void 0!==e.mode&&i.mode!==e.mode){var r="debug"===i.mode,n="debug"===e.mode;i.mode=e.mode,this._updatePrograms(),r!==n&&this.rootTiles&&(x.traverseTilesPreorder(this.rootTiles,function(e){e.renderData&&e.renderData.updateGeometry(t.rctx,n)}),this.setNeedsRender())}for(var s in e)i.hasOwnProperty(s)&&(i[s]=e[s]),this.setNeedsRender();i.resolution&&(i.resolution=Math.min(i.resolution,this.tileSize),i.resolution=1<<Math.round(Math.log(i.resolution)/Math.LN2))},e.prototype.setNeedsRender=function(){this.needsRender=!0,this.didRender=!1,this.perOriginTileDataDirty=!0},e.prototype.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==this.visibleScaleRangeQueryQueue.length,this.didRender=!1)},e.prototype.isOpaqueExcludingSlice=function(){var e=this.wireframe,t="shader"===e.mode&&(e.wireOpacity<1||e.surfaceOpacity<1);return this._opaque&&!t},e.prototype.isOpaque=function(){return this.isOpaqueExcludingSlice()&&!this._slicePlaneEnabled},e.prototype.updateTileBackground=function(e){this.backgroundPromise&&this.backgroundPromise.cancel(),this.backgroundPromise="string"==typeof e?v.requestImage(e).catch(function(){return null}):null!=e?o.resolve(n.toUnitRGBA(e)):o.resolve(null),this._renderTileBackground()},e.prototype.initializeRenderContext=function(e){var t=this,i=this.rctx=e.rctx,r=this.programRep=e.programRep,n=function(e){o.when(e).then(function(){t.initialized=!0,t.setNeedsRender()}).catch(n)};n(this._renderTileBackground()),this._updatePrograms(),this.tileRenderer=new R(i,this.tileSize,r,this.resourceCounter,function(){return t.setNeedsRender()}),this._renderTileBackground(),this.emptyTex=P.createEmptyTexture(i)},e.prototype.uninitializeRenderContext=function(e){null!=this.emptyTex&&(this.emptyTex.dispose(),this.emptyTex=null),this.tileRenderer&&(this.tileRenderer.dispose(),this.tileRenderer=null)},e.prototype.render=function(e){var t=e.rctx;if(!this.initialized||this._disableRendering||!this.visible||!this.rootTiles||!this.tileBackgroundInitialized)return!1;var i=this.isOpaque()?3:8;if(e.slot!==i)return!1;O.trace("# BEGIN RENDER TERRAIN");var r=e.pass,n=1===e.lightingData.helper.globalFactor;return 0===r?this._renderMaterialPass(e,this._updatePerOriginTileData()):3===r&&this.castShadows&&n?this._renderDepthPass(e,this.programs.depthShadowMap,this._updatePerOriginTileData()):1===r?this._renderDepthPass(e,this.programs.depth,this._updatePerOriginTileData()):2===r?this._renderNormalPass(e,this._updatePerOriginTileData()):4===r&&this.needsHighlight&&(this._renderHighlightPass(e,this._updatePerOriginTileData()),t.clearSafe(256)),O.trace("# END RENDER TERRAIN"),!0},e.prototype.intersect=function(e,t,i,r,n){if(this.rootTiles&&(!e.enable.selectOpaqueTerrainOnly||!e.enable.selectionMode||this.isOpaqueExcludingSlice())){var a=G,l=W;c.vec3.subtract(a,r,i),c.vec3.set(l,1/a[0],1/a[1],1/a[2]);var o=e.results.min,d=e.results.max,h=e.results.terrain,u=null,p=this.clippingExtent,f=this.tileIterator;f.reset(this.rootTiles);for(var v=this;!f.done;)!function(){var n=f.next();if(null===n.renderData)return"continue";if(e.enable.invisibleTerrain){if(!n.visible&&p&&!n.intersectsExtent(p))return"continue"}else if(!n.visible)return"continue";var m=n.renderData.geometryInfo,y=-v._skirtScale*m.skirtLength;if(0!==y){var T=n.tileUp;g.offset(m.boundingBox,y*T[0],y*T[1],y*T[2],A),g.expandWithBuffer(A,m.boundingBox,0,2)}var R=0===y?m.boundingBox:A,P=n.renderData.localOrigin;if(c.vec3.subtract(J,i,P),!D.intersectAabbInvDir(R,J,l,e.tolerance))return"continue";var S=function(e,t,i,r){e.set(void 0,x.tile2str(t),i,r,M,void 0),e.intersector=X,e.target=K},O=function(l,p,f){if(l>=0&&(e.enable.backfacesTerrain||c.vec3.dot(p,a)<0)&&(e.enable.invisibleTerrain||!e.enable.selectionMode||null==t||t(i,r,l))){if((null==h.dist||l<h.dist)&&S(h,n,l,p),!e.enable.storeTerrainResults)return;e.enable.storeAll&&(s.isNone(u)?(u=new _.IntersectorResult(e.ray),S(u,n,l,p),e.results.all.push(u)):l<u.dist&&S(u,n,l,p)),(null==o.dist||l<o.dist)&&S(o,n,l,p),(null==d.dist||l>d.dist)&&S(d,n,l,p)}},w=Y;c.vec3.subtract(w,r,P);var E=m.indices,I={data:m.vertexAttributes,size:3,offsetIdx:0,strideIdx:b.GEOMETRY_VERTEX_STRIDE},U=m.numWithoutSkirtIndices/3;if(D.intersectTriangles(J,w,0,U,E,I,null,O),0!==y){var k="spherical"===v.manifold?function(e){return c.vec3.scale(e,e,y/c.vec3.length(e))}:function(e){return c.vec3.set(e,0,0,y)},L=E.length/3;x.intersectSkirts(J,w,U,L,E,I,null,k,O)}}()}},e.prototype._renderTileBackground=function(){var e=this;if(this.rctx&&this.backgroundPromise&&this.tileRenderer)return this.backgroundPromise.then(function(t){e.tileRenderer&&(e.tileBackgroundInitialized=!0,e.tileRenderer.setBackground(t),e.rootTiles&&x.traverseTilesPreorder(e.rootTiles,function(t){return e.tileRenderer.updateTileTexture(t)}))})},e.prototype._updatePrograms=function(){var e="spherical"===this.manifold,t="shader"===this.wireframe.mode,i=this.programRep;this.programs={color:i.getProgram(E.colorPass,{mode:t||this._drawBorders?"wireframe":"normal",overlay:this._hasOverlays,atmosphere:e&&this._velvetOverground,wireframeTexture:t,tileBorders:this._drawBorders,receiveShadows:this.receiveShadows,screenSizePerspective:this.debugScreenSizePerspective,slice:this._slicePlaneEnabled}),normal:i.getProgram(E.normalPass,{alphaZero:!0}),depth:i.getProgram(E.depthPass,{shadowMap:!1}),depthShadowMap:i.getProgram(E.depthPass,{shadowMap:!0}),highlight:i.getProgram(E.highlightPass,{})},this.defaultPipelineState=I.makePipelineState({culling:this._cullBackFaces&&I.backFaceCullingParams,depthTest:{func:513},depthWrite:I.defaultDepthWriteParams,colorWrite:I.defaultColorWriteParams}),this.stencilPipelineState=I.makePipelineState(r({},this.defaultPipelineState,{stencilTest:{function:{func:517,ref:1,mask:255},operation:{fail:7680,zFail:7680,zPass:7680}}})),this.setNeedsRender()},e.prototype._renderMaterialPass=function(e,t){var i=this,r=e.shadowMap&&e.shadowMap.enabled,n=e.rctx;this.receiveShadows!==r&&(this.receiveShadows=r,this._updatePrograms());var s=!this.drapedRenderer.isEmpty();s!==this._hasOverlays&&(this._hasOverlays=s,this._updatePrograms());var a=e.camera,l=this.wireframe,o=this.programs.color;n.bindProgram(o),("shader"===l.mode||this._drawBorders)&&(o.setUniform1f("wireframe.width",this.wireframe.width),o.setUniform1f("wireframe.falloff",Math.min(l.width,l.falloff)),o.setUniform1f("wireframe.wireOpacity",l.wireOpacity),o.setUniform1f("wireframe.surfaceOpacity",l.surfaceOpacity),o.setUniform4fv("wireframe.color",l.color)),e.shadowMap&&e.shadowMap.bind(o),e.ssaoHelper&&e.ssaoHelper.setUniforms(o),o.setUniform1i("tex",0),o.setUniform1i("overlay0Tex",1),o.setUniform1i("overlay1Tex",2),o.setUniformMatrix4fv("viewNormal",a.viewInverseTransposeMatrix),o.setUniformMatrix4fv("proj",a.projectionMatrix),e.lightingData.helper.setUniforms(o,!0);var d=a.viewMatrix;c.vec3.set(F,d[12],d[13],d[14]),c.vec3.normalize(F,F),o.setUniform3fv("viewDirection",F),this.numTilesRendered=0,this.numTilesCulled=0,this.numTrianglesRendered=0,this.numOriginsRendered=0,this._prepareScaleRangeQueries(),this.isOpaque()?this._renderTiles(e,o,t):e.offscreenRenderingHelper.renderToTargets(function(){return i._renderTiles(e,o,t)},e.offscreenRenderingHelper.tmpColor,e.offscreenRenderingHelper.mainDepth,[0,0,0,0]),this._processScaleRangeQueries(),this.numTilesRendered>0&&!this._loaded&&(this._loaded=!0,this.loaded&&this.loaded())},e.prototype._renderDepthPass=function(e,t,i){var r=e.rctx,n=e.camera;r.bindProgram(t),t.setUniformMatrix4fv("model",M),t.setUniformMatrix4fv("viewNormal",n.viewInverseTransposeMatrix),z[0]=n.near,z[1]=n.far,t.setUniform2fv("nearFar",z),this._renderTilesAuxiliary(e,t,i,!1)},e.prototype._renderNormalPass=function(e,t){var i=e.rctx,r=e.camera,n=this.programs.normal;i.bindProgram(n),n.setUniformMatrix4fv("viewNormal",r.viewInverseTransposeMatrix),this._renderTilesAuxiliary(e,n,t,!1)},e.prototype._renderHighlightPass=function(e,t){var i=e.rctx,r=this.programs.highlight;i.bindProgram(r);var n=e.offscreenRenderingHelper;i.bindTexture(n.depthTexture,3),r.setUniform1i("depthTex",3),r.setUniform4f("highlightViewportPixelSz",0,0,1/n.width,1/n.height),this._renderTilesAuxiliary(e,r,t,!0)},e.prototype._updatePerOriginTileData=function(){var e=this,t=this.perOriginTileData;if(!this.perOriginTileDataDirty)return t;if(this._highestVisibleLODTile=null,t.clear(),this._renderCollectOrigins(t),this._renderOrder!==b.RenderOrder.NONE){for(var i=0;i<t.length;i++)x.sortTiles(this._renderOrder,t.data[i].tiles);t.sort(function(t,i){return k(t,i,e._renderOrder)})}return this.perOriginTileDataDirty=!1,t},e.prototype._renderCollectOrigins=function(e){var t=this.rootTiles,i="spherical"===this.manifold;e.clear();for(var r=0,n=t;r<n.length;r++){var s=n[r],a=e.pushNew();a.root=s,a.origin=i?B:s.centerAtSeaLevel,a.tiles.clear(),this._renderCollectOriginsForRoot(e,a)}},e.prototype._renderCollectOriginsForRoot=function(e,t){var i=this.tileIterator;i.resetOne(t.root);var r=this.perOriginTileDataMap;for(r.clear(),r.set(t.origin,t);!i.done;){var n=i.next(),s=n.renderData;if(!s||n.visible){if(n.lij[0]%7==0){var a=e.pushNew();a.root=n,a.origin=n.centerAtSeaLevel,r.set(n.centerAtSeaLevel,a),a.tiles.clear()}if(s){var l=r.get(n.renderData.localOrigin);l&&l.tiles.push(n),(!this._highestVisibleLODTile||n.vlevel>this._highestVisibleLODTile.vlevel)&&(this._highestVisibleLODTile=n),i.skipSubtree()}}else this.numTilesCulled++,i.skipSubtree()}},e.prototype._scaleQueriesForTile=function(e){for(var t=e.extent,i=e.lij[0],r=0;r<this.visibleScaleRangeQueriesInvPtr;){var n=this.visibleScaleRangeQueries.data[r],s=n.extent;i>=n.minLevel&&i<=n.maxLevel&&s[0]<=t[2]&&s[2]>=t[0]&&s[1]<=t[3]&&s[3]>=t[1]?(this.visibleScaleRangeQueries.swapElements(r,this.visibleScaleRangeQueriesInvPtr-1),this.visibleScaleRangeQueriesInvPtr--):r++}},e.prototype._tileIntersectsStencilEnabledLayer=function(e){for(var t=this.stencilEnabledLayerExtents,i=0;i<t.length;i++)if(e.intersectsExtent(t[i]))return!0;return!1},e.prototype._renderTilesAuxiliary=function(e,t,i,r){var n=e.rctx,s=e.camera,a=s.viewMatrix;n.setPipelineState(this.defaultPipelineState);var l=this.stencilEnabledLayerExtents.length>0;t.setUniformMatrix4fv("proj",s.projectionMatrix),t.setUniform1f("skirtScale",this._skirtScale),r&&(t.setUniform1i("overlay0Tex",1),t.setUniform1i("overlay1Tex",2));for(var o=0;o<i.length;o++){var d=i.data[o];t.setUniform3fv("origin",d.origin),D.bindView(d.origin,a,t);for(var h=0;h<d.tiles.length;h++){var c=d.tiles.data[h],u=c.renderData;r&&(this._bindOverlayTextures(t,u.overlays,!0),t.setUniform1f("overlayOpacity",u.overlayOpacity)),l&&n.setPipelineState(this._tileIntersectsStencilEnabledLayer(c)?this.stencilPipelineState:this.defaultPipelineState),n.bindVAO(u.vao),U.assertCompatibleVertexAttributeLocations(u.vao,t);var p=0===this._skirtScale?u.geometryInfo.numWithoutSkirtIndices:u.vao.indexBuffer.size;n.drawElements(4,p,u.vao.indexBuffer.indexType,0)}}n.bindVAO(null)},e.prototype._renderTiles=function(e,t,i){var r=e.rctx,n=e.camera,s=n.viewMatrix;if(r.setPipelineState(this.defaultPipelineState),this.debugScreenSizePerspective&&this.pointsOfInterest){var a=S.getSettings("spherical"===this.manifold?"global":"local"),l=this.pointsOfInterest.centerOnSurfaceFrequent.distance;a.update({distance:l,fovY:n.fovY}),D.bindScreenSizePerspective(a,t,"screenSizePerspective")}var o=this.stencilEnabledLayerExtents.length>0;t.setUniform1f("skirtScale",this._skirtScale);for(var d=0;d<i.length;d++){var h=i.data[d],c=h.tiles;if(0!==c.length){t.setUniform3fv("origin",h.origin),D.bindView(h.origin,s,t);var u=e.sliceHelper&&e.sliceHelper.plane;u&&D.bindSlicePlane(h.origin,u,t),e.shadowMap&&e.shadowMap.bindView(t,h.origin),this.numOriginsRendered++;var p="debug"===this.wireframe.mode?1:4,f=this._highestVisibleLODTile,g=void 0,v=void 0;f?(g=f.vlevel,v=this.tileSize/this.wireframe.resolution):(g=16,v=this.tileSize/64);for(var m=0;m<c.length;m++){var b=c.data[m],y=b.renderData;if(o&&r.setPipelineState(this._tileIntersectsStencilEnabledLayer(b)?this.stencilPipelineState:this.defaultPipelineState),O.trace("# RENDER TILE "+x.tile2str(b)+", screenDepth:"+b.screenDepth),L(y.geometryInfo.uvOffsetAndScale,y.texOffsetAndScale,V),t.setUniform4fv("texOffsetAndScale",V),r.bindTexture(y.textureReference,0),t.setUniform1f("opacity",y.opacity),this._bindOverlayTextures(t,y.overlays,!1),t.setUniform1f("overlayOpacity",y.overlayOpacity),"shader"===this.wireframe.mode||this._drawBorders){var T=v*(1<<g-b.vlevel);t.setUniform1f("wireframe.subdivision",T)}var R=0===this._skirtScale?y.geometryInfo.numWithoutSkirtIndices:y.vao.indexBuffer.size;r.bindVAO(y.vao),U.assertCompatibleVertexAttributeLocations(y.vao,t),r.drawElements(p,R,y.vao.indexBuffer.indexType,0),b.renderOrder=this.numTilesRendered,this.numTilesRendered++,this.numTrianglesRendered+=R/3,this._scaleQueriesForTile(b)}}}r.bindVAO(null)},e.prototype._bindOverlayTextures=function(e,t,i){for(var r=0;r<2;r++){var n=2*r,s=t[r],a=i?s.highlightRenderTargetId:s.renderTargetId;if(a){var l=this.drapedRenderer.getRenderTargetTexture(a);C[n]=s.texOffset[0],C[n+1]=s.texOffset[1],Q[n]=s.texScale[0],Q[n+1]=s.texScale[1],this.rctx.bindTexture(l,1+r)}else C[n]=0,C[n+1]=0,Q[n]=0,Q[n+1]=0,this.rctx.bindTexture(this.emptyTex,1+r)}e.setUniform4fv("overlayTexOffset",C),e.setUniform4fv("overlayTexScale",Q)},e.prototype.releaseTileGeometry=function(e){e.releaseGeometry()&&this.setNeedsRender(),this.renderDataPool.release(e)},e.prototype._prepareScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryQueue;e.length<e.data.length&&t.length>0;){var i=t.pop();e.push(i)}this.visibleScaleRangeQueriesInvPtr=e.length},e.prototype._processScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryPool,i=0;i<e.length;i++){var r=e.data[i];t.release(r),r.callback(i>=this.visibleScaleRangeQueriesInvPtr),r.callback=null}e.clear()},e}(),H={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],resolution:64},F=u.vec3f64.create(),G=u.vec3f64.create(),W=u.vec3f64.create(),J=u.vec3f64.create(),Y=u.vec3f64.create(),X="TerrainRenderer",K={type:"external"};return q});
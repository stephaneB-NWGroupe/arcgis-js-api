/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../geometry/support/aaBoundingRect","./webgl/enums","./brushes","./webgl/TileContainer","./RasterTile"],(function(e,t,r,s,i,n,a){"use strict";let o=function(e){function n(){return e.apply(this,arguments)||this}t._inheritsLoose(n,e);var o=n.prototype;return o.createTile=function(e){const t=this._tileInfoView.getTileBounds(r.create(),e);return new a.RasterTile(e,t,this._tileInfoView.tileInfo.size)},o.destroyTile=function(){},o.prepareRenderPasses=function(t){const r=t.registerRenderPass({name:"bitmap (tile)",brushes:[i.brushes.raster],target:()=>this.children.map((e=>e.bitmap)),drawPhase:s.WGLDrawPhase.MAP});return[...e.prototype.prepareRenderPasses.call(this,t),r]},o.doRender=function(t){this.visible&&t.drawPhase===s.WGLDrawPhase.MAP&&e.prototype.doRender.call(this,t)},n}(n.default);e.RasterTileContainer=o,Object.defineProperty(e,"__esModule",{value:!0})}));
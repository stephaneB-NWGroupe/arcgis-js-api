/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../../core/maybe","../layers/support/MemoryManagedLayerView","../terrain/terrainUtils","./LayerPerformanceInfo"],(function(e,r,o,t){"use strict";return function(s){this.totalMemory=0,this.usedMemory=0,this.quality=1,this.load=0,this.terrainMemory=0,this.edgesMemory=0,this.layerPerformanceInfos=new Array;const a=s.resourceController.memoryController;this.totalMemory=1024*a.maxMemory*1024,this.usedMemory=Math.round(a.usedMemory*this.totalMemory),this.quality=a.memoryFactor,this.load=s.resourceController.scheduler.load,this.terrainMemory=s.basemapTerrain?s.basemapTerrain.getUsedMemory():0;const i=s._stage&&s._stage.renderView&&s._stage.renderView.edgeView;this.edgesMemory=e.isSome(i)?i.getUsedMemory():0,s.allLayerViews.items.forEach((e=>{(r.isMemoryManagedLayerView(e)||o.isSurfaceLayerView(e))&&this.layerPerformanceInfos.push(new t(e,s))})),this.layerPerformanceInfos.sort(((e,r)=>r.memory-e.memory))}}));
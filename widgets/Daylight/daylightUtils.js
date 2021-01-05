/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../intl/date","../../intl","../../chunks/SunCalc"],(function(e,n,a,t){"use strict";function m(e,n){const a=new Date(n);return a.setUTCFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),a}function i(e,n){return new Date(e.getTime()+36e5*n)}var o;(o=e.Hemisphere||(e.Hemisphere={}))[o.NORTHERN=0]="NORTHERN",o[o.SOUTHERN=1]="SOUTHERN";const T={spring:{dayOfMonth:20,month:2},summer:{dayOfMonth:21,month:5},fall:{dayOfMonth:23,month:8},winter:{dayOfMonth:21,month:11}},b=["spring","summer","fall","winter"];function l(e,n,a){const t=new Date(e.getTime()),m=r(n,a),{dayOfMonth:i,month:o}=T[m];return t.setMonth(o),t.setDate(i),t}function r(n,a){return a===e.Hemisphere.NORTHERN?n:z(n)}function z(e){const n=b.indexOf(e);return b[(n+2)%4]}e.ORDERED_SEASONS=b,e.calculatePlaySpeed=function(e,n,a){const t=12e5,m=3e5,i=18e5,o=2e5;if(isNaN(e.getTime())&&isNaN(n.getTime()))return m;const T=a.getTime(),b=e.getTime(),l=n.getTime(),r=b-36e5,z=b+36e5,C=l-48e5,U=l+24e5;let s=m;return T>=r&&T<=z?s=T-r<=t?i-(T-r)/t*16e5:z-T<=6e5?m-(z-T)/t*2*1e5:o:T>=C&&T<=U?s=T-C<=6e5?m-(T-C)/t*2*1e5:U-T<=t?i-(U-T)/t*16e5:o:(T<b||T>l)&&(s=i),s},e.dateAddHours=i,e.dateTimeToLocalDate=function(e){const n=new Date(0);return n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),n.setFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),n},e.dateTimeToSliderPos=function(e){return 60*e.getUTCHours()+e.getUTCMinutes()+e.getUTCSeconds()/60+e.getUTCMilliseconds()/6e4},e.flipSeasonHemisphere=z,e.formatSliderLabel=function(e,a){let t=new Date(36e5*Math.round(e/60));"tick"!==a&&(t=new Date(6e4*e));let m=n.formatDate(t,{hour:"2-digit",minute:"2-digit",timeZone:"UTC"});return"tick"===a&&-1!==m.indexOf(" ")&&(m=n.formatDate(t,{hour:"numeric",timeZone:"UTC"}),m=m.replace(":00","")),m},e.getGMTOffsets=function(e){const n=[{name:"UTC-12",abbr:-12,label:["UTC-12",e.timezoneDateline]},{name:"UTC-11",abbr:-11,label:["UTC-11",e.timezoneSamoa]},{name:e.timezoneHAST,abbr:-10,label:["UTC-10 ("+e.timezoneHAST+")",e.timezoneHawaii]},{name:e.timezoneAKST,abbr:-9,label:["UTC-9 ("+e.timezoneAKST+")",e.timezoneAlaska]},{name:e.timezonePST,abbr:-8,label:["UTC-8 ("+e.timezonePST+")",e.timezoneBaja]},{name:e.timezoneMST,abbr:-7,label:["UTC-7 ("+e.timezoneMST+")",e.timezoneMountain]},{name:e.timezoneMST,abbr:-7,label:["UTC-7 ("+e.timezoneMST+")",e.timezoneLaPaz]},{name:e.timezoneMST,abbr:-7,label:["UTC-7 ("+e.timezoneMST+")",e.timezoneArizona]},{name:e.timezoneCST,abbr:-6,label:["UTC-6 ("+e.timezoneCST+")",e.timezoneSaskatchewan]},{name:e.timezoneCST,abbr:-6,label:["UTC-6 ("+e.timezoneCST+")",e.timezoneCentralAmerica]},{name:e.timezoneCST,abbr:-6,label:["UTC-6 ("+e.timezoneCST+")",e.timezoneCentralTime]},{name:e.timezoneCST,abbr:-6,label:["UTC-6 ("+e.timezoneCST+")",e.timezoneMexico]},{name:e.timezoneEST,abbr:-5,label:["UTC-5 ("+e.timezoneEST+")",e.timezoneEasternUS]},{name:e.timezoneEST,abbr:-5,label:["UTC-5 ("+e.timezoneEST+")",e.timezoneLima]},{name:e.timezoneEST,abbr:-5,label:["UTC-5 ("+e.timezoneEST+")",e.timezoneIndiana]},{name:"UTC-4",abbr:-4,label:["UTC-4",e.timezoneAtlantic]},{name:"UTC-4",abbr:-4,label:["UTC-4",e.timezoneCuiaba]},{name:"UTC-4",abbr:-4,label:["UTC-4",e.timezoneSantiago]},{name:"UTC-4",abbr:-4,label:["UTC-4",e.timezoneManaus]},{name:"UTC-4",abbr:-4,label:["UTC-4",e.timezoneAsuncion]},{name:"UTC-3",abbr:-3,label:["UTC-3",e.timezoneBrasilia]},{name:"UTC-3",abbr:-3,label:["UTC-3",e.timezoneGreenland]},{name:"UTC-3",abbr:-3,label:["UTC-3",e.timezoneMontevideo]},{name:"UTC-3",abbr:-3,label:["UTC-3",e.timezoneCayenne]},{name:"UTC-3",abbr:-3,label:["UTC-3",e.timezoneBuenosAires]},{name:"UTC-2",abbr:-2,label:["UTC-2",e.timezoneMidAtlantic]},{name:"UTC-1",abbr:-1,label:["UTC-1",e.timezoneAzores]},{name:"UTC-1",abbr:-1,label:["UTC-1",e.timezoneCaboVerde]},{name:"GMT",abbr:0,label:["UTC (GMT)",e.timezoneDublin]},{name:"GMT",abbr:0,label:["UTC (GMT)",e.timezoneReykjavik]},{name:"GMT",abbr:0,label:["UTC (GMT)",e.timezoneCasablanca]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneBelgrade]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneSarajevo]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneBrussels]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneWCAfrica]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneAmsterdam]},{name:e.timezoneCET,abbr:1,label:["UTC+1 ("+e.timezoneCET+")",e.timezoneWindhoek]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneMinsk]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneCairo]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneHelsinki]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneAthens]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneJerusalem]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneAmman]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneBeirut]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneHarare]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneDamascus]},{name:e.timezoneEET,abbr:2,label:["UTC+2 ("+e.timezoneEET+")",e.timezoneIstanbul]},{name:e.timezoneMSK,abbr:3,label:["UTC+3 ("+e.timezoneMSK+")",e.timezoneKuwait]},{name:e.timezoneMSK,abbr:3,label:["UTC+3 ("+e.timezoneMSK+")",e.timezoneBaghdad]},{name:e.timezoneMSK,abbr:3,label:["UTC+3 ("+e.timezoneMSK+")",e.timezoneNairobi]},{name:e.timezoneMSK,abbr:3,label:["UTC+3 ("+e.timezoneMSK+")",e.timezoneKaliningrad]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezoneMoscow]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezoneMuscat]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezoneBaku]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezoneYerevan]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezoneTbilisi]},{name:e.timezoneGST,abbr:4,label:["UTC+4 ("+e.timezoneGST+")",e.timezonePortLouis]},{name:"UTC+5",abbr:5,label:["UTC+5",e.timezoneTashkent]},{name:"UTC+5",abbr:5,label:["UTC+5",e.timezoneIslamabad]},{name:"UTC+6",abbr:6,label:["UTC+6",e.timezoneEkaterinburg]},{name:"UTC+6",abbr:6,label:["UTC+6",e.timezoneAstana]},{name:"UTC+6",abbr:6,label:["UTC+6",e.timezoneDhaka]},{name:e.timezoneICT,abbr:7,label:["UTC+7 ("+e.timezoneICT+")",e.timezoneNovosibirsk]},{name:e.timezoneICT,abbr:7,label:["UTC+7 ("+e.timezoneICT+")",e.timezoneBangkok]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezoneKrasnoyarsk]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezoneBeijing]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezoneSingapore]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezoneTaipei]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezonePerth]},{name:e.timezoneCCT,abbr:8,label:["UTC+8 ("+e.timezoneCCT+")",e.timezoneUlaanbaatar]},{name:e.timezoneJST,abbr:9,label:["UTC+9 ("+e.timezoneJST+")",e.timezoneIrkutsk]},{name:e.timezoneJST,abbr:9,label:["UTC+9 ("+e.timezoneJST+")",e.timezoneSeoul]},{name:e.timezoneJST,abbr:9,label:["UTC+9 ("+e.timezoneJST+")",e.timezoneOsaka]},{name:e.timezoneAEST,abbr:10,label:["UTC+10 ("+e.timezoneAEST+")",e.timezoneYakutsk]},{name:e.timezoneAEST,abbr:10,label:["UTC+10 ("+e.timezoneAEST+")",e.timezoneCanberra]},{name:e.timezoneAEST,abbr:10,label:["UTC+10 ("+e.timezoneAEST+")",e.timezoneBrisbane]},{name:e.timezoneAEST,abbr:10,label:["UTC+10 ("+e.timezoneAEST+")",e.timezoneHobart]},{name:e.timezoneAEST,abbr:10,label:["UTC+10 ("+e.timezoneAEST+")",e.timezoneGuam]},{name:"UTC+11",abbr:11,label:["UTC+11",e.timezoneVladivostok]},{name:"UTC+11",abbr:11,label:["UTC+11",e.timezoneSolomon]},{name:e.timezoneNZST,abbr:12,label:["UTC+12 ("+e.timezoneNZST+")",e.timezoneMagadan]},{name:e.timezoneNZST,abbr:12,label:["UTC+12 ("+e.timezoneNZST+")",e.timezoneFiji]},{name:e.timezoneNZST,abbr:12,label:["UTC+12 ("+e.timezoneNZST+")",e.timezoneAuckland]},{name:e.timezoneNZST,abbr:12,label:["UTC+12 ("+e.timezoneNZST+")",e.timezoneNukualofa]}];return n.sort(((e,n)=>e.abbr<n.abbr?-1:e.abbr>n.abbr?1:0)),n},e.getNorthernHemisphereSeason=r,e.getSeasonDate=l,e.getSeasonFromDate=function(n,a){return r(function(n){const a=n.getTime(),t=l(n,"spring",e.Hemisphere.NORTHERN).getTime(),m=l(n,"summer",e.Hemisphere.NORTHERN).getTime(),i=l(n,"fall",e.Hemisphere.NORTHERN).getTime(),o=l(n,"winter",e.Hemisphere.NORTHERN).getTime();return a>=t&&a<m?"spring":a>=m&&a<i?"summer":a>=i&&a<o?"fall":"winter"}(n),a)},e.getSunriseAndSunsetTimes=function(e,n,a,m){const o=t.SunCalc.getTimes(e,n,a),T=o.sunrise,b=o.sunset,l=i(e,m),r=i(T,m),z=i(b,m);if(l.getUTCDate()!==r.getUTCDate()||l.getUTCDate()!==z.getUTCDate()){const e=l.getTime()-r.getTime()>0?1:-1;T.setUTCDate(T.getUTCDate()+e),b.setUTCDate(b.getUTCDate()+e)}return{sunrise:T,sunset:b}},e.localDateToDateTime=function(e,n){const a=new Date(e.getTime());return a.setUTCFullYear(n.getFullYear(),n.getMonth(),n.getDate()),a},e.makeTime=m,e.sliderPosToDateTime=function(e,n){return m(e,60*n*1e3)},Object.defineProperty(e,"__esModule",{value:!0})}));
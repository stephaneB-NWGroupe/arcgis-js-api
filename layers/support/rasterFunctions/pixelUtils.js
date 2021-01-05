/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../PixelBlock"],(function(t,e){"use strict";const n=function(t){return t&&"esri.layers.support.PixelBlock"===t.declaredClass&&t.pixels&&t.pixels.length>0};function i(t,e){const n=Math.min(Math.max(t,-100),100),i=Math.min(Math.max(e,-100),100),l=255;let o,r;const a=new Uint8Array(256);for(o=0;o<256;o++)n>0&&n<100?r=(200*o-25500+510*i)/(2*(100-n))+128:n<=0&&n>-100?r=(200*o-25500+510*i)*(100+n)/2e4+128:100===n?(r=200*o-25500+256*(100-n)+510*i,r=r>0?l:0):-100===n&&(r=128),a[o]=r>l?l:r<0?0:r;return a}function l(t,e,n,i,l,o,r,a){return{xmin:l<=n*t?0:l<n*t+t?l-n*t:t,ymin:o<=i*e?0:o<i*e+e?o-i*e:e,xmax:l+r<=n*t?0:l+r<n*t+t?l+r-n*t:t,ymax:o+a<=i*e?0:o+a<i*e+e?o+a-i*e:e}}function o(t,i,o,r){const a=t.filter((t=>n(t)))[0];if(null==a)return null;const s=r?r.width:i.width,h=r?r.height:i.height,f=a.width,u=a.height,c=i.width/f,p=i.height/u,x=o?o.x:0,m=o?o.y:0,d=a.pixelType,y=e.getPixelArrayConstructor(d),w=a.pixels.length,g=[];let M,k,A,U,C,T,v,B,S,O,P;for(T=0;T<w;T++){for(k=new y(s*h),v=0;v<p;v++)for(B=0;B<c;B++)if(A=t[v*c+B],A)for(M=A.pixels[T],P=l(f,u,B,v,x,m,s,h),S=P.ymin;S<P.ymax;S++)for(U=(v*u+S-m)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)k[U+O]=M[C+O];g.push(k)}let b,j;if(t.some((t=>null==t||t.mask&&t.mask.length>0)))for(b=new Uint8Array(s*h),v=0;v<p;v++)for(B=0;B<c;B++)if(A=t[v*c+B],j=A?A.mask:null,P=l(f,u,B,v,x,m,s,h),j)for(S=P.ymin;S<P.ymax;S++)for(U=(v*u+S-m)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)b[U+O]=j[C+O];else if(A)for(S=P.ymin;S<P.ymax;S++)for(U=(v*u+S-m)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)b[U+O]=1;else for(S=P.ymin;S<P.ymax;S++)for(U=(v*u+S-m)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)b[U+O]=0;const z=new e({width:s,height:h,pixels:g,pixelType:d,mask:b});return z.updateStatistics(),z}function r(t){if(!n(t))return null;const e=t.clone(),{width:i,height:l,pixels:o,mask:r}=t,f=o[0],u=e.pixels[0];for(let t=2;t<l-1;t++){const e=new Map;for(let n=t-2;n<t+2;n++)for(let t=0;t<4;t++){const l=n*i+t;h(e,f[l],r?r[l]:1)}u[t*i]=a(e),u[t*i+1]=u[t*i+2]=u[t*i];let n=3;for(;n<i-1;n++){let l=(t-2)*i+n+1;h(e,f[l],r?r[l]:1),l=(t-1)*i+n+1,h(e,f[l],r?r[l]:1),l=t*i+n+1,h(e,f[l],r?r[l]:1),l=(t+1)*i+n+1,h(e,f[l],r?r[l]:1),l=(t-2)*i+n-3,s(e,f[l],r?r[l]:1),l=(t-1)*i+n-3,s(e,f[l],r?r[l]:1),l=t*i+n-3,s(e,f[l],r?r[l]:1),l=(t+1)*i+n-3,s(e,f[l],r?r[l]:1),u[t*i+n]=a(e)}u[t*i+n+1]=u[t*i+n]}for(let t=0;t<i;t++)u[t]=u[i+t]=u[2*i+t],u[(l-1)*i+t]=u[(l-2)*i+t];return e.updateStatistics(),e}function a(t){if(0===t.size)return 0;let e=0,n=-1,i=0;const l=t.keys();let o=l.next();for(;!o.done;)i=t.get(o.value),i>e&&(n=o.value,e=i),o=l.next();return n}function s(t,e,n){if(0===n)return;const i=t.get(e);1===i?t.delete(e):t.set(e,i-1)}function h(t,e,n){0!==n&&t.set(e,t.has(e)?t.get(e)+1:1)}function f(t,i,l){let{x:o,y:r}=i;const{width:a,height:s}=l;if(0===o&&0===r&&s===t.height&&a===t.width)return t;const{width:h,height:f}=t,u=Math.max(0,r),c=Math.max(0,o),p=Math.min(o+a,h),x=Math.min(r+s,f);if(p<0||x<0||!n(t))return null;o=Math.max(0,-o),r=Math.max(0,-r);const{pixels:m,mask:d}=t,y=a*s,w=m.length,g=[];for(let n=0;n<w;n++){const i=m[n],l=e.createEmptyBand(t.pixelType,y);for(let t=u;t<x;t++){const e=t*h;let n=(t+r-u)*a+o;for(let t=c;t<p;t++)l[n++]=i[e+t]}g.push(l)}const M=new Uint8Array(y);for(let t=u;t<x;t++){const e=t*h;let n=(t+r-u)*a+o;for(let t=c;t<p;t++)M[n++]=d?d[e+t]:1}const k=new e({width:l.width,height:l.height,pixelType:t.pixelType,pixels:g,mask:M});return k.updateStatistics(),k}function u(t,i=!0){if(!n(t))return null;const{pixels:l,width:o,height:r,mask:a,pixelType:s}=t,h=[],f=Math.round(o/2),u=Math.round(r/2),c=r-1,p=o-1;for(let t=0;t<l.length;t++){const n=l[t],a=e.createEmptyBand(s,f*u);let x=0;for(let t=0;t<r;t+=2)for(let e=0;e<o;e+=2){const l=n[t*o+e];if(i){const i=e===p?l:n[t*o+e+1],r=t===c?l:n[t*o+e+o],s=e===p?r:t===c?i:n[t*o+e+o+1];a[x++]=(l+i+r+s)/4}else a[x++]=l}h.push(a)}let x=null;if(a){x=new Uint8Array(f*u);let t=0;for(let e=0;e<r;e+=2)for(let n=0;n<o;n+=2){const l=a[e*o+n];if(i){const i=n===p?l:a[e*o+n+1],r=e===c?l:a[e*o+n+o],s=n===p?r:e===c?i:a[e*o+n+o+1];x[t++]=l*i*r*s?1:0}else x[t++]=l}}return new e({width:f,height:u,pixelType:s,pixels:h,mask:x})}t.approximateTransform=function(t,i,l,o,a="nearest"){if(!n(t))return null;"majority"===a&&(t=r(t));const{pixels:s,mask:h,pixelType:f}=t,u=t.width,c=t.height,p=e.getPixelArrayConstructor(f),x=s.length,{width:m,height:d}=i,y=o.cols,w=o.rows,g=Math.ceil(m/y),M=Math.ceil(d/w);let k,A,U,C,T,v,B,S=!1;for(let t=0;t<l.length;t+=3)-1===l[t]&&-1===l[t+1]&&-1===l[t+2]&&(S=!0);const O=new Float32Array(m*d),P=new Float32Array(m*d);let b,j,z=0;const D="majority"===a?0:.5;for(let t=0;t<M;t++)for(let e=0;e<g;e++){k=12*(t*g+e),A=l[k],U=l[k+1],C=l[k+2],T=l[k+3],v=l[k+4],B=l[k+5];for(let n=0;n<w;n++){z=(t*w+n)*m+e*y,j=(n+.5)/w;for(let t=0;t<n;t++)b=(t+.5)/y,O[z+t]=Math.round((A*b+U*j+C)*u-D),P[z+t]=Math.round((T*b+v*j+B)*c-D)}k+=6,A=l[k],U=l[k+1],C=l[k+2],T=l[k+3],v=l[k+4],B=l[k+5];for(let n=0;n<w;n++){z=(t*w+n)*m+e*y,j=(n+.5)/w;for(let t=n;t<y;t++)b=(t+.5)/y,O[z+t]=Math.round((A*b+U*j+C)*u-D),P[z+t]=Math.round((T*b+v*j+B)*c-D)}}const I=(t,e)=>{for(let n=0;n<d;n++){k=n*m;for(let n=0;n<m;n++)O[k]<0||P[k]<0?t[k]=0:t[k]=e[O[k]+P[k]*u],k++}},E=[];let F;for(let t=0;t<x;t++)F=new p(m*d),I(F,s[t]),E.push(F);const L=new e({width:m,height:d,pixelType:f,pixels:E});if(h)L.mask=new Uint8Array(m*d),I(L.mask,h);else if(S){L.mask=new Uint8Array(m*d);for(let t=0;t<m*d;t++)L.mask[t]=O[t]<0||P[t]<0?0:1}return L.updateStatistics(),L},t.clip=f,t.colorize=function(t,e){if(!n(t))return t;if(!e&&(e.indexedColormap||e.indexed2DColormap))return t;const i=t.clone(),l=i.pixels;let o=i.mask;const r=i.width*i.height;if(1!==l.length)return t;const{indexedColormap:a,indexed2DColormap:s,offset:h,alphaSpecified:f}=e,u=a.length-1;let c=0;const p=l[0],x=new Uint8Array(p.length),m=new Uint8Array(p.length),d=new Uint8Array(p.length);let y,w=0;if(a)if(o)for(c=0;c<r;c++)o[c]&&(w=4*(p[c]-h),w<h||w>u?o[c]=0:(x[c]=a[w],m[c]=a[w+1],d[c]=a[w+2],o[c]=a[w+3]));else{for(o=new Uint8Array(r),c=0;c<r;c++)w=4*(p[c]-h),w<h||w>u?o[c]=0:(x[c]=a[w],m[c]=a[w+1],d[c]=a[w+2],o[c]=a[w+3]);i.mask=o}else if(o)for(c=0;c<r;c++)o[c]&&(y=s[p[c]],x[c]=y[0],m[c]=y[1],d[c]=y[2],o[c]=y[3]);else{for(o=new Uint8Array(r),c=0;c<r;c++)y=s[p[c]],x[c]=y[0],m[c]=y[1],d[c]=y[2],o[c]=y[3];i.mask=o}return i.pixels=[x,m,d],i.statistics=null,i.pixelType="u8",i.maskIsAlpha=f,i},t.createColormapLUT=function(t){if(!t)return;const e=t.colormap;if(!e||0===e.length)return;const n=e.sort(((t,e)=>t[0]-e[0]));let i=0;n[0][0]<0&&(i=n[0][0]);const l=Math.max(256,n[n.length-1][0]-i+1),o=new Uint8Array(4*l),r=[];let a,s=0,h=0;const f=5===n[0].length;if(l>65536)return n.forEach((t=>{r[t[0]-i]=f?t.slice(1):t.slice(1).concat([255])})),{indexed2DColormap:r,offset:i,alphaSpecified:f};if(t.fillUnspecified)for(a=n[h],s=a[0]-i;s<l;s++)o[4*s]=a[1],o[4*s+1]=a[2],o[4*s+2]=a[3],o[4*s+3]=f?a[4]:255,s===a[0]-i&&(a=h===n.length-1?a:n[++h]);else for(s=0;s<n.length;s++)a=n[s],h=4*(a[0]-i),o[h]=a[1],o[h+1]=a[2],o[h+2]=a[3],o[h+3]=f?a[4]:255;return{indexedColormap:o,offset:i,alphaSpecified:f}},t.createContrastBrightnessLUT=i,t.createStretchLUT=function(t){const{minCutOff:e,maxCutOff:n,gamma:l,pixelType:o}=t,r=t.outMin||0,a=t.outMax||255;if(-1===["u8","u16","s8","s16"].indexOf(o))return null;const s=e.length;let h,f,u=0;"s8"===o?u=-127:"s16"===o&&(u=-32767);let c=256;["u16","s16"].indexOf(o)>-1&&(c=65536);const p=[],x=[],m=a-r;for(h=0;h<s;h++)x[h]=n[h]-e[h],p[h]=m/(n[h]-e[h]);const d=l&&l.length>=s,y=[];if(d)for(h=0;h<s;h++)l[h]>1?l[h]>2?y[h]=6.5+Math.pow(l[h]-2,2.5):y[h]=6.5+100*Math.pow(2-l[h],4):y[h]=1;let w;const g=[];let M,k,A;if(d)for(h=0;h<s;h++){for(A=[],f=0;f<c;f++)M=f+u,w=(M-e[h])/x[h],k=1,l[h]>1&&(k-=Math.pow(1/m,w*y[h])),M<n[h]&&M>e[h]?A[f]=Math.floor(k*m*Math.pow(w,1/l[h]))+r:M>=n[h]?A[f]=a:A[f]=r;g[h]=A}else for(h=0;h<s;h++){for(A=[],f=0;f<c;f++)M=f+u,M<=e[h]?A[f]=r:M>=n[h]?A[f]=a:A[f]=Math.floor((M-e[h])/x[h]*m)+r;g[h]=A}if(null!=t.contrastOffset){const e=i(t.contrastOffset,t.brightnessOffset);for(h=0;h<s;h++)for(A=g[h],f=0;f<c;f++)A[f]=e[A[f]]}return{lut:g,offset:u}},t.estimateStatisticsFromHistograms=function(t){const e=[];for(let n=0;n<t.length;n++){const{min:i,max:l,size:o,counts:r}=t[n];let a=0,s=0;for(let t=0;t<o;t++)a+=r[t],s+=t*r[t];const h=s/a;let f=0;for(let t=0;t<o;t++)f+=r[t]*Math.pow(t-h,2);const u=(l-i)/o,c=(h+.5)*u+i,p=Math.sqrt(f/(a-1))*u;e.push({min:i,max:l,avg:c,stddev:p})}return e},t.estimateStatisticsHistograms=function(t){if(!n(t))return null;t.statistics||t.updateStatistics();const{pixels:e,mask:i,pixelType:l,statistics:o}=t,r=t.width*t.height,a=e.length;let s,h,f,u,c;const p=[],x=[];let m,d,y,w,g,M,k,A,U,C;const T=256;for(u=0;u<a;u++){if(m=new Uint32Array(T),y=e[u],"u8"===l)if(s=-.5,h=255.5,i)for(c=0;c<r;c++)i[c]&&m[y[c]]++;else for(c=0;c<r;c++)m[y[c]]++;else{if(s=o[u].minValue,h=o[u].maxValue,f=(h-s)/T,d=new Uint32Array(257),i)for(c=0;c<r;c++)i[c]&&d[Math.floor((y[c]-s)/f)]++;else for(c=0;c<r;c++)d[Math.floor((y[c]-s)/f)]++;for(c=0;c<255;c++)m[c]=d[c];m[255]=d[255]+d[256]}for(p.push({min:s,max:h,size:T,counts:m}),w=0,g=0,A=0,c=0;c<T;c++)w+=m[c],g+=c*m[c];for(U=g/w,c=0;c<T;c++)A+=m[c]*Math.pow(c-U,2);C=Math.sqrt(A/(w-1)),f=(h-s)/T,M=(U+.5)*f+s,k=C*f,x.push({min:s,max:h,avg:M,stddev:k})}return{statistics:x,histograms:p}},t.extractBands=function(t,i){if(!i||!n(t))return t;const l=t.pixels.length;return i&&i.some((t=>t>=l))||1===l&&1===i.length&&0===i[0]?t:l!==i.length||i.some(((t,e)=>t!==e))?new e({pixelType:t.pixelType,width:t.width,height:t.height,mask:t.mask,validPixelCount:t.validPixelCount,maskIsAlpha:t.maskIsAlpha,pixels:i.map((e=>t.pixels[e])),statistics:t.statistics&&i.map((e=>t.statistics[e]))}):t},t.getClipBounds=l,t.lookupPixels=function(t,i){if(!n(t))return null;const{pixels:l,mask:o}=t,r=t.width*t.height,a=l.length;let s=i.lut;const{offset:h}=i;let f,u;s&&1===s[0].length&&(s=l.map((()=>s)));const c=[];let p,x,m;if(h)if(null==o)for(f=0;f<a;f++){for(p=l[f],x=s[f],m=new Uint8Array(r),u=0;u<r;u++)m[u]=x[p[u]-h];c.push(m)}else for(f=0;f<a;f++){for(p=l[f],x=s[f],m=new Uint8Array(r),u=0;u<r;u++)o[u]&&(m[u]=x[p[u]-h]);c.push(m)}else if(null==o)for(f=0;f<a;f++){for(p=l[f],x=s[f],m=new Uint8Array(r),u=0;u<r;u++)m[u]=x[p[u]];c.push(m)}else for(f=0;f<a;f++){for(p=l[f],x=s[f],m=new Uint8Array(r),u=0;u<r;u++)o[u]&&(m[u]=x[p[u]]);c.push(m)}const d=new e({width:t.width,height:t.height,pixels:c,mask:o,pixelType:"u8"});return d.updateStatistics(),d},t.mosaic=o,t.mosaicPixelData=function(t,e){if(!t||0===t.length)return null;const n=t.filter((t=>t.pixelBlock))[0];if(!n)return null;const i=(n.extent.xmax-n.extent.xmin)/n.pixelBlock.width,l=(n.extent.ymax-n.extent.ymin)/n.pixelBlock.height,r=.01*Math.min(i,l),a=t.sort(((t,e)=>Math.abs(t.extent.ymax-e.extent.ymax)>r?e.extent.ymax-t.extent.ymax:Math.abs(t.extent.xmin-e.extent.xmin)>r?t.extent.xmin-e.extent.xmin:0)),s=Math.min.apply(null,a.map((t=>t.extent.xmin))),h=Math.min.apply(null,a.map((t=>t.extent.ymin))),f=Math.max.apply(null,a.map((t=>t.extent.xmax))),u=Math.max.apply(null,a.map((t=>t.extent.ymax))),c={x:Math.round((e.xmin-s)/i),y:Math.round((u-e.ymax)/l)},p={width:Math.round((f-s)/i),height:Math.round((u-h)/l)},x={width:Math.round((e.xmax-e.xmin)/i),height:Math.round((e.ymax-e.ymin)/l)};return Math.round(p.width/n.pixelBlock.width)*Math.round(p.height/n.pixelBlock.height)!==a.length||c.x<0||c.y<0||p.width<x.width||p.height<x.height?null:{extent:e,pixelBlock:o(a.map((t=>t.pixelBlock)),p,c,x)}},t.remapColor=function(t,e){if(!n(t))return null;const i=t.clone(),{pixels:l}=i,o=i.width*i.height,r=e.length,a=Math.floor(r/2),s=e[Math.floor(a)],h=l[0];let f,u,c,p,x,m,d=!1;const y=new Uint8Array(o),w=new Uint8Array(o),g=new Uint8Array(o);let M=i.mask;const k=4===e[0].mappedColor.length;for(M||(M=new Uint8Array(o),M.fill(k?255:1),i.mask=M),x=0;x<o;x++)if(M[x]){for(f=h[x],d=!1,m=a,u=s,c=0,p=r-1;p-c>1;){if(f===u.value){d=!0;break}f>u.value?c=m:p=m,m=Math.floor((c+p)/2),u=e[Math.floor(m)]}d||(f===e[c].value?(u=e[c],d=!0):f===e[p].value?(u=e[p],d=!0):f<e[c].value?(d=!1,u=null):f>e[c].value&&(f<e[p].value?(u=e[c],d=!0):p===r-1?(d=!1,u=null):(u=e[p],d=!0))),d?(y[x]=u.mappedColor[0],w[x]=u.mappedColor[1],g[x]=u.mappedColor[2],M[x]=u.mappedColor[3]):y[x]=w[x]=g[x]=M[x]=0}return i.pixels=[y,w,g],i.mask=M,i.pixelType="u8",i.maskIsAlpha=k,i},t.resampleByMajority=r,t.setValidBoundary=function(t,e,i){if(!n(t))return null;const{width:l,height:o}=t,r=e.x,a=e.y,s=i.width+r,h=i.height+a;if(r<0||a<0||s>l||h>o)return t;if(0===r&&0===a&&s===l&&h===o)return t;t.mask||(t.mask=new Uint8Array(l*o));const f=t.mask;for(let t=0;t<o;t++){const e=t*l;for(let n=0;n<l;n++)f[e+n]=t<a||t>=h||n<r||n>=s?0:1}return t.updateStatistics(),t},t.split=function(t,e,i){if(!n(t))return null;const{width:l,height:o}=e;let{width:r,height:a}=t;const s=new Map,h={x:0,y:0},c=null==i?1:1+i;let p=t;for(let t=0;t<c;t++){const n=Math.ceil(r/l),i=Math.ceil(a/o);for(let r=0;r<i;r++){h.y=r*o;for(let i=0;i<n;i++){h.x=i*l;const n=f(p,h,e);s.set(`${t}/${r}/${i}`,n)}}t<c-1&&(p=u(p)),r=Math.round(r/2),a=Math.round(a/2)}return s},t.stretch=function(t,e){if(!n(t))return null;const i=t.clone(),{pixels:l,mask:o}=i,{minCutOff:r,maxCutOff:a,gamma:s}=e,h=e.outMin||0,f=e.outMax||255,u=i.width*i.height,c=l.length;let p,x,m,d,y;const w=f-h,g=[],M=[];for(p=0;p<c;p++)M[p]=a[p]-r[p],g[p]=w/(a[p]-r[p]);const k=s&&s.length>=c,A=[];if(k)for(p=0;p<c;p++)s[p]>1?s[p]>2?A[p]=6.5+Math.pow(s[p]-2,2.5):A[p]=6.5+100*Math.pow(2-s[p],4):A[p]=1;if(k)if(null!=o){for(x=0;x<u;x++)if(o[x])for(p=0;p<c;p++)m=l[p][x],y=(m-r[p])/M[p],d=1,s[p]>1&&(d-=Math.pow(1/w,y*A[p])),m<a[p]&&m>r[p]?l[p][x]=Math.floor(d*w*Math.pow(y,1/s[p]))+h:m>=a[p]?l[p][x]=f:l[p][x]=h}else for(x=0;x<u;x++)for(p=0;p<c;p++)m=l[p][x],y=(m-r[p])/M[p],d=1,s[p]>1&&(d-=Math.pow(1/w,y*A[p])),m<a[p]&&m>r[p]?l[p][x]=Math.floor(d*w*Math.pow(y,1/s[p]))+h:m>=a[p]?l[p][x]=f:l[p][x]=h;else if(null!=o){for(x=0;x<u;x++)if(o[x])for(p=0;p<c;p++)m=l[p][x],m<a[p]&&m>r[p]?l[p][x]=Math.floor((m-r[p])/M[p]*w)+h:m>=a[p]?l[p][x]=f:l[p][x]=h}else for(x=0;x<u;x++)for(p=0;p<c;p++)m=l[p][x],m<a[p]&&m>r[p]?l[p][x]=Math.floor((m-r[p])/M[p]*w)+h:m>=a[p]?l[p][x]=f:l[p][x]=h;return i.pixelType="u8",i.updateStatistics(),i},Object.defineProperty(t,"__esModule",{value:!0})}));
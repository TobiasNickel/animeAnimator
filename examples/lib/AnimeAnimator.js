var AnimeAnimator=(()=>{var $=Object.defineProperty;var Nt=Object.getOwnPropertyDescriptor;var Ut=Object.getOwnPropertyNames,pt=Object.getOwnPropertySymbols;var yt=Object.prototype.hasOwnProperty,qt=Object.prototype.propertyIsEnumerable;var mt=(t,r,n)=>r in t?$(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,bt=(t,r)=>{for(var n in r||(r={}))yt.call(r,n)&&mt(t,n,r[n]);if(pt)for(var n of pt(r))qt.call(r,n)&&mt(t,n,r[n]);return t};var Jt=(t,r)=>{for(var n in r)$(t,n,{get:r[n],enumerable:!0})},Qt=(t,r,n,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let e of Ut(r))!yt.call(t,e)&&e!==n&&$(t,e,{get:()=>r[e],enumerable:!(i=Nt(r,e))||i.enumerable});return t};var Zt=t=>Qt($({},"__esModule",{value:!0}),t);var Er={};Jt(Er,{AnimeAnimator:()=>lt,createHTMLElement:()=>B});var At={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},tt={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},Kt=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],N={CSS:{},springs:{}};function I(t,r,n){return Math.min(Math.max(t,r),n)}function j(t,r){return t.indexOf(r)>-1}function Y(t,r){return t.apply(null,r)}var f={arr:function(t){return Array.isArray(t)},obj:function(t){return j(Object.prototype.toString.call(t),"Object")},pth:function(t){return f.obj(t)&&t.hasOwnProperty("totalLength")},svg:function(t){return t instanceof SVGElement},inp:function(t){return t instanceof HTMLInputElement},dom:function(t){return t.nodeType||f.svg(t)},str:function(t){return typeof t=="string"},fnc:function(t){return typeof t=="function"},und:function(t){return typeof t>"u"},nil:function(t){return f.und(t)||t===null},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return f.hex(t)||f.rgb(t)||f.hsl(t)},key:function(t){return!At.hasOwnProperty(t)&&!tt.hasOwnProperty(t)&&t!=="targets"&&t!=="keyframes"}};function Ct(t){var r=/\(([^)]+)\)/.exec(t);return r?r[1].split(",").map(function(n){return parseFloat(n)}):[]}function Dt(t,r){var n=Ct(t),i=I(f.und(n[0])?1:n[0],.1,100),e=I(f.und(n[1])?100:n[1],.1,100),o=I(f.und(n[2])?10:n[2],.1,100),s=I(f.und(n[3])?0:n[3],.1,100),c=Math.sqrt(e/i),a=o/(2*Math.sqrt(e*i)),v=a<1?c*Math.sqrt(1-a*a):0,u=1,l=a<1?(a*c+-s)/v:-s+c;function h(m){var p=r?r*m/1e3:m;return a<1?p=Math.exp(-p*a*c)*(u*Math.cos(v*p)+l*Math.sin(v*p)):p=(u+l*p)*Math.exp(-p*c),m===0||m===1?m:1-p}function w(){var m=N.springs[t];if(m)return m;for(var p=1/6,y=0,M=0;;)if(y+=p,h(y)===1){if(M++,M>=16)break}else M=0;var A=y*p*1e3;return N.springs[t]=A,A}return r?h:w}function Yt(t){return t===void 0&&(t=10),function(r){return Math.ceil(I(r,1e-6,1)*t)*(1/t)}}var Gt=function(){var t=11,r=1/(t-1);function n(u,l){return 1-3*l+3*u}function i(u,l){return 3*l-6*u}function e(u){return 3*u}function o(u,l,h){return((n(l,h)*u+i(l,h))*u+e(l))*u}function s(u,l,h){return 3*n(l,h)*u*u+2*i(l,h)*u+e(l)}function c(u,l,h,w,m){var p,y,M=0;do y=l+(h-l)/2,p=o(y,w,m)-u,p>0?h=y:l=y;while(Math.abs(p)>1e-7&&++M<10);return y}function a(u,l,h,w){for(var m=0;m<4;++m){var p=s(l,h,w);if(p===0)return l;var y=o(l,h,w)-u;l-=y/p}return l}function v(u,l,h,w){if(!(0<=u&&u<=1&&0<=h&&h<=1))return;var m=new Float32Array(t);if(u!==l||h!==w)for(var p=0;p<t;++p)m[p]=o(p*r,u,h);function y(M){for(var A=0,d=1,g=t-1;d!==g&&m[d]<=M;++d)A+=r;--d;var E=(M-m[d])/(m[d+1]-m[d]),D=A+E*r,x=s(D,u,h);return x>=.001?a(M,D,u,h):x===0?D:c(M,A,A+r,u,h)}return function(M){return u===l&&h===w||M===0||M===1?M:o(y(M),l,w)}}return v}(),It=function(){var t={linear:function(){return function(i){return i}}},r={Sine:function(){return function(i){return 1-Math.cos(i*Math.PI/2)}},Circ:function(){return function(i){return 1-Math.sqrt(1-i*i)}},Back:function(){return function(i){return i*i*(3*i-2)}},Bounce:function(){return function(i){for(var e,o=4;i<((e=Math.pow(2,--o))-1)/11;);return 1/Math.pow(4,3-o)-7.5625*Math.pow((e*3-2)/22-i,2)}},Elastic:function(i,e){i===void 0&&(i=1),e===void 0&&(e=.5);var o=I(i,1,10),s=I(e,.1,2);return function(c){return c===0||c===1?c:-o*Math.pow(2,10*(c-1))*Math.sin((c-1-s/(Math.PI*2)*Math.asin(1/o))*(Math.PI*2)/s)}}},n=["Quad","Cubic","Quart","Quint","Expo"];return n.forEach(function(i,e){r[i]=function(){return function(o){return Math.pow(o,e+2)}}}),Object.keys(r).forEach(function(i){var e=r[i];t["easeIn"+i]=e,t["easeOut"+i]=function(o,s){return function(c){return 1-e(o,s)(1-c)}},t["easeInOut"+i]=function(o,s){return function(c){return c<.5?e(o,s)(c*2)/2:1-e(o,s)(c*-2+2)/2}},t["easeOutIn"+i]=function(o,s){return function(c){return c<.5?(1-e(o,s)(1-c*2))/2:(e(o,s)(c*2-1)+1)/2}}}),t}();function rt(t,r){if(f.fnc(t))return t;var n=t.split("(")[0],i=It[n],e=Ct(t);switch(n){case"spring":return Dt(t,r);case"cubicBezier":return Y(Gt,e);case"steps":return Y(Yt,e);default:return Y(i,e)}}function Lt(t){try{var r=document.querySelectorAll(t);return r}catch(n){return}}function U(t,r){for(var n=t.length,i=arguments.length>=2?arguments[1]:void 0,e=[],o=0;o<n;o++)if(o in t){var s=t[o];r.call(i,s,o,t)&&e.push(s)}return e}function q(t){return t.reduce(function(r,n){return r.concat(f.arr(n)?q(n):n)},[])}function xt(t){return f.arr(t)?t:(f.str(t)&&(t=Lt(t)||t),t instanceof NodeList||t instanceof HTMLCollection?[].slice.call(t):[t])}function nt(t,r){return t.some(function(n){return n===r})}function et(t){var r={};for(var n in t)r[n]=t[n];return r}function G(t,r){var n=et(t);for(var i in t)n[i]=r.hasOwnProperty(i)?r[i]:t[i];return n}function J(t,r){var n=et(t);for(var i in r)n[i]=f.und(t[i])?r[i]:t[i];return n}function Xt(t){var r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);return r?"rgba("+r[1]+",1)":t}function tr(t){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,n=t.replace(r,function(c,a,v,u){return a+a+v+v+u+u}),i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),e=parseInt(i[1],16),o=parseInt(i[2],16),s=parseInt(i[3],16);return"rgba("+e+","+o+","+s+",1)"}function rr(t){var r=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),n=parseInt(r[1],10)/360,i=parseInt(r[2],10)/100,e=parseInt(r[3],10)/100,o=r[4]||1;function s(h,w,m){return m<0&&(m+=1),m>1&&(m-=1),m<1/6?h+(w-h)*6*m:m<1/2?w:m<2/3?h+(w-h)*(2/3-m)*6:h}var c,a,v;if(i==0)c=a=v=e;else{var u=e<.5?e*(1+i):e+i-e*i,l=2*e-u;c=s(l,u,n+1/3),a=s(l,u,n),v=s(l,u,n-1/3)}return"rgba("+c*255+","+a*255+","+v*255+","+o+")"}function nr(t){if(f.rgb(t))return Xt(t);if(f.hex(t))return tr(t);if(f.hsl(t))return rr(t)}function S(t){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);if(r)return r[1]}function er(t){if(j(t,"translate")||t==="perspective")return"px";if(j(t,"rotate")||j(t,"skew"))return"deg"}function X(t,r){return f.fnc(t)?t(r.target,r.id,r.total):t}function L(t,r){return t.getAttribute(r)}function it(t,r,n){var i=S(r);if(nt([n,"deg","rad","turn"],i))return r;var e=N.CSS[r+n];if(!f.und(e))return e;var o=100,s=document.createElement(t.tagName),c=t.parentNode&&t.parentNode!==document?t.parentNode:document.body;c.appendChild(s),s.style.position="absolute",s.style.width=o+n;var a=o/s.offsetWidth;c.removeChild(s);var v=a*parseFloat(r);return N.CSS[r+n]=v,v}function Pt(t,r,n){if(r in t.style){var i=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),e=t.style[r]||getComputedStyle(t).getPropertyValue(i)||"0";return n?it(t,e,n):e}}function at(t,r){if(f.dom(t)&&!f.inp(t)&&(!f.nil(L(t,r))||f.svg(t)&&t[r]))return"attribute";if(f.dom(t)&&nt(Kt,r))return"transform";if(f.dom(t)&&r!=="transform"&&Pt(t,r))return"css";if(t[r]!=null)return"object"}function St(t){if(!!f.dom(t)){for(var r=t.style.transform||"",n=/(\w+)\(([^)]*)\)/g,i=new Map,e;e=n.exec(r);)i.set(e[1],e[2]);return i}}function ir(t,r,n,i){var e=j(r,"scale")?1:0+er(r),o=St(t).get(r)||e;return n&&(n.transforms.list.set(r,o),n.transforms.last=r),i?it(t,o,i):o}function ot(t,r,n,i){switch(at(t,r)){case"transform":return ir(t,r,i,n);case"css":return Pt(t,r,n);case"attribute":return L(t,r);default:return t[r]||0}}function st(t,r){var n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;var i=S(t)||0,e=parseFloat(r),o=parseFloat(t.replace(n[0],""));switch(n[0][0]){case"+":return e+o+i;case"-":return e-o+i;case"*":return e*o+i}}function kt(t,r){if(f.col(t))return nr(t);if(/\s/g.test(t))return t;var n=S(t),i=n?t.substr(0,t.length-n.length):t;return r?i+r:i}function ut(t,r){return Math.sqrt(Math.pow(r.x-t.x,2)+Math.pow(r.y-t.y,2))}function ar(t){return Math.PI*2*L(t,"r")}function or(t){return L(t,"width")*2+L(t,"height")*2}function sr(t){return ut({x:L(t,"x1"),y:L(t,"y1")},{x:L(t,"x2"),y:L(t,"y2")})}function Bt(t){for(var r=t.points,n=0,i,e=0;e<r.numberOfItems;e++){var o=r.getItem(e);e>0&&(n+=ut(i,o)),i=o}return n}function ur(t){var r=t.points;return Bt(t)+ut(r.getItem(r.numberOfItems-1),r.getItem(0))}function Ot(t){if(t.getTotalLength)return t.getTotalLength();switch(t.tagName.toLowerCase()){case"circle":return ar(t);case"rect":return or(t);case"line":return sr(t);case"polyline":return Bt(t);case"polygon":return ur(t)}}function cr(t){var r=Ot(t);return t.setAttribute("stroke-dasharray",r),r}function fr(t){for(var r=t.parentNode;f.svg(r)&&f.svg(r.parentNode);)r=r.parentNode;return r}function Ft(t,r){var n=r||{},i=n.el||fr(t),e=i.getBoundingClientRect(),o=L(i,"viewBox"),s=e.width,c=e.height,a=n.viewBox||(o?o.split(" "):[0,0,s,c]);return{el:i,viewBox:a,x:a[0]/1,y:a[1]/1,w:s,h:c,vW:a[2],vH:a[3]}}function lr(t,r){var n=f.str(t)?Lt(t)[0]:t,i=r||100;return function(e){return{property:e,el:n,svg:Ft(n),totalLength:Ot(n)*(i/100)}}}function dr(t,r,n){function i(u){u===void 0&&(u=0);var l=r+u>=1?r+u:0;return t.el.getPointAtLength(l)}var e=Ft(t.el,t.svg),o=i(),s=i(-1),c=i(1),a=n?1:e.w/e.vW,v=n?1:e.h/e.vH;switch(t.property){case"x":return(o.x-e.x)*a;case"y":return(o.y-e.y)*v;case"angle":return Math.atan2(c.y-s.y,c.x-s.x)*180/Math.PI}}function Tt(t,r){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,i=kt(f.pth(t)?t.totalLength:t,r)+"";return{original:i,numbers:i.match(n)?i.match(n).map(Number):[0],strings:f.str(t)||r?i.split(n):[]}}function ct(t){var r=t?q(f.arr(t)?t.map(xt):xt(t)):[];return U(r,function(n,i,e){return e.indexOf(n)===i})}function Ht(t){var r=ct(t);return r.map(function(n,i){return{target:n,id:i,total:r.length,transforms:{list:St(n)}}})}function hr(t,r){var n=et(r);if(/^spring/.test(n.easing)&&(n.duration=Dt(n.easing)),f.arr(t)){var i=t.length,e=i===2&&!f.obj(t[0]);e?t={value:t}:f.fnc(r.duration)||(n.duration=r.duration/i)}var o=f.arr(t)?t:[t];return o.map(function(s,c){var a=f.obj(s)&&!f.pth(s)?s:{value:s};return f.und(a.delay)&&(a.delay=c?0:r.delay),f.und(a.endDelay)&&(a.endDelay=c===o.length-1?r.endDelay:0),a}).map(function(s){return J(s,n)})}function vr(t){for(var r=U(q(t.map(function(o){return Object.keys(o)})),function(o){return f.key(o)}).reduce(function(o,s){return o.indexOf(s)<0&&o.push(s),o},[]),n={},i=function(o){var s=r[o];n[s]=t.map(function(c){var a={};for(var v in c)f.key(v)?v==s&&(a.value=c[v]):a[v]=c[v];return a})},e=0;e<r.length;e++)i(e);return n}function gr(t,r){var n=[],i=r.keyframes;i&&(r=J(vr(i),r));for(var e in r)f.key(e)&&n.push({name:e,tweens:hr(r[e],t)});return n}function pr(t,r){var n={};for(var i in t){var e=X(t[i],r);f.arr(e)&&(e=e.map(function(o){return X(o,r)}),e.length===1&&(e=e[0])),n[i]=e}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}function mr(t,r){var n;return t.tweens.map(function(i){var e=pr(i,r),o=e.value,s=f.arr(o)?o[1]:o,c=S(s),a=ot(r.target,t.name,c,r),v=n?n.to.original:a,u=f.arr(o)?o[0]:v,l=S(u)||S(a),h=c||l;return f.und(s)&&(s=v),e.from=Tt(u,h),e.to=Tt(st(s,u),h),e.start=n?n.end:0,e.end=e.start+e.delay+e.duration+e.endDelay,e.easing=rt(e.easing,e.duration),e.isPath=f.pth(o),e.isPathTargetInsideSVG=e.isPath&&f.svg(r.target),e.isColor=f.col(e.from.original),e.isColor&&(e.round=1),n=e,e})}var zt={css:function(t,r,n){return t.style[r]=n},attribute:function(t,r,n){return t.setAttribute(r,n)},object:function(t,r,n){return t[r]=n},transform:function(t,r,n,i,e){if(i.list.set(r,n),r===i.last||e){var o="";i.list.forEach(function(s,c){o+=c+"("+s+") "}),t.style.transform=o}}};function Vt(t,r){var n=Ht(t);n.forEach(function(i){for(var e in r){var o=X(r[e],i),s=i.target,c=S(o),a=ot(s,e,c,i),v=c||S(a),u=st(kt(o,v),a),l=at(s,e);zt[l](s,e,u,i.transforms,!0)}})}function yr(t,r){var n=at(t.target,r.name);if(n){var i=mr(r,t),e=i[i.length-1];return{type:n,property:r.name,animatable:t,tweens:i,duration:e.end,delay:i[0].delay,endDelay:e.endDelay}}}function br(t,r){return U(q(t.map(function(n){return r.map(function(i){return yr(n,i)})})),function(n){return!f.und(n)})}function jt(t,r){var n=t.length,i=function(o){return o.timelineOffset?o.timelineOffset:0},e={};return e.duration=n?Math.max.apply(Math,t.map(function(o){return i(o)+o.duration})):r.duration,e.delay=n?Math.min.apply(Math,t.map(function(o){return i(o)+o.delay})):r.delay,e.endDelay=n?e.duration-Math.max.apply(Math,t.map(function(o){return i(o)+o.duration-o.endDelay})):r.endDelay,e}var wt=0;function xr(t){var r=G(At,t),n=G(tt,t),i=gr(n,t),e=Ht(t.targets),o=br(e,i),s=jt(o,n),c=wt;return wt++,J(r,{id:c,children:[],animatables:e,animations:o,duration:s.duration,delay:s.delay,endDelay:s.endDelay})}var C=[],_t=function(){var t;function r(){!t&&(!Mt()||!b.suspendWhenDocumentHidden)&&C.length>0&&(t=requestAnimationFrame(n))}function n(e){for(var o=C.length,s=0;s<o;){var c=C[s];c.paused?(C.splice(s,1),o--):(c.tick(e),s++)}t=s>0?requestAnimationFrame(n):void 0}function i(){!b.suspendWhenDocumentHidden||(Mt()?t=cancelAnimationFrame(t):(C.forEach(function(e){return e._onDocumentVisibility()}),_t()))}return typeof document<"u"&&document.addEventListener("visibilitychange",i),r}();function Mt(){return!!document&&document.hidden}function b(t){t===void 0&&(t={});var r=0,n=0,i=0,e,o=0,s=null;function c(d){var g=window.Promise&&new Promise(function(E){return s=E});return d.finished=g,g}var a=xr(t),v=c(a);function u(){var d=a.direction;d!=="alternate"&&(a.direction=d!=="normal"?"normal":"reverse"),a.reversed=!a.reversed,e.forEach(function(g){return g.reversed=a.reversed})}function l(d){return a.reversed?a.duration-d:d}function h(){r=0,n=l(a.currentTime)*(1/b.speed)}function w(d,g){g&&g.seek(d-g.timelineOffset)}function m(d){if(a.reversePlayback)for(var E=o;E--;)w(d,e[E]);else for(var g=0;g<o;g++)w(d,e[g])}function p(d){for(var g=0,E=a.animations,D=E.length;g<D;){var x=E[g],_=x.animatable,k=x.tweens,O=k.length-1,T=k[O];O&&(T=U(k,function($t){return d<$t.end})[0]||T);for(var W=I(d-T.start-T.delay,0,T.duration)/T.duration,P=isNaN(W)?1:T.easing(W),R=T.to.strings,Q=T.round,Z=[],Rt=T.to.numbers.length,F=void 0,H=0;H<Rt;H++){var z=void 0,dt=T.to.numbers[H],ht=T.from.numbers[H]||0;T.isPath?z=dr(T.value,P*dt,T.isPathTargetInsideSVG):z=ht+P*(dt-ht),Q&&(T.isColor&&H>2||(z=Math.round(z*Q)/Q)),Z.push(z)}var vt=R.length;if(!vt)F=Z[0];else{F=R[0];for(var V=0;V<vt;V++){var Ar=R[V],gt=R[V+1],K=Z[V];isNaN(K)||(gt?F+=K+gt:F+=K+" ")}}zt[x.type](_.target,x.property,F,_.transforms),x.currentValue=F,g++}}function y(d){a[d]&&!a.passThrough&&a[d](a)}function M(){a.remaining&&a.remaining!==!0&&a.remaining--}function A(d){var g=a.duration,E=a.delay,D=g-a.endDelay,x=l(d);a.progress=I(x/g*100,0,100),a.reversePlayback=x<a.currentTime,e&&m(x),!a.began&&a.currentTime>0&&(a.began=!0,y("begin")),!a.loopBegan&&a.currentTime>0&&(a.loopBegan=!0,y("loopBegin")),x<=E&&a.currentTime!==0&&p(0),(x>=D&&a.currentTime!==g||!g)&&p(g),x>E&&x<D?(a.changeBegan||(a.changeBegan=!0,a.changeCompleted=!1,y("changeBegin")),y("change"),p(x)):a.changeBegan&&(a.changeCompleted=!0,a.changeBegan=!1,y("changeComplete")),a.currentTime=I(x,0,g),a.began&&y("update"),d>=g&&(n=0,M(),a.remaining?(r=i,y("loopComplete"),a.loopBegan=!1,a.direction==="alternate"&&u()):(a.paused=!0,a.completed||(a.completed=!0,y("loopComplete"),y("complete"),!a.passThrough&&"Promise"in window&&(s(),v=c(a)))))}return a.reset=function(){var d=a.direction;a.passThrough=!1,a.currentTime=0,a.progress=0,a.paused=!0,a.began=!1,a.loopBegan=!1,a.changeBegan=!1,a.completed=!1,a.changeCompleted=!1,a.reversePlayback=!1,a.reversed=d==="reverse",a.remaining=a.loop,e=a.children,o=e.length;for(var g=o;g--;)a.children[g].reset();(a.reversed&&a.loop!==!0||d==="alternate"&&a.loop===1)&&a.remaining++,p(a.reversed?a.duration:0)},a._onDocumentVisibility=h,a.set=function(d,g){return Vt(d,g),a},a.tick=function(d){i=d,r||(r=i),A((i+(n-r))*b.speed)},a.seek=function(d){A(l(d))},a.pause=function(){a.paused=!0,h()},a.play=function(){!a.paused||(a.completed&&a.reset(),a.paused=!1,C.push(a),h(),_t())},a.reverse=function(){u(),a.completed=!a.reversed,h()},a.restart=function(){a.reset(),a.play()},a.remove=function(d){var g=ct(d);Wt(g,a)},a.reset(),a.autoplay&&a.play(),a}function Et(t,r){for(var n=r.length;n--;)nt(t,r[n].animatable.target)&&r.splice(n,1)}function Wt(t,r){var n=r.animations,i=r.children;Et(t,n);for(var e=i.length;e--;){var o=i[e],s=o.animations;Et(t,s),!s.length&&!o.children.length&&i.splice(e,1)}!n.length&&!i.length&&r.pause()}function Tr(t){for(var r=ct(t),n=C.length;n--;){var i=C[n];Wt(r,i)}}function wr(t,r){r===void 0&&(r={});var n=r.direction||"normal",i=r.easing?rt(r.easing):null,e=r.grid,o=r.axis,s=r.from||0,c=s==="first",a=s==="center",v=s==="last",u=f.arr(t),l=parseFloat(u?t[0]:t),h=u?parseFloat(t[1]):0,w=S(u?t[1]:t)||0,m=r.start||0+(u?l:0),p=[],y=0;return function(M,A,d){if(c&&(s=0),a&&(s=(d-1)/2),v&&(s=d-1),!p.length){for(var g=0;g<d;g++){if(!e)p.push(Math.abs(s-g));else{var E=a?(e[0]-1)/2:s%e[0],D=a?(e[1]-1)/2:Math.floor(s/e[0]),x=g%e[0],_=Math.floor(g/e[0]),k=E-x,O=D-_,T=Math.sqrt(k*k+O*O);o==="x"&&(T=-k),o==="y"&&(T=-O),p.push(T)}y=Math.max.apply(Math,p)}i&&(p=p.map(function(P){return i(P/y)*y})),n==="reverse"&&(p=p.map(function(P){return o?P<0?P*-1:-P:Math.abs(y-P)}))}var W=u?(h-l)/y:l;return m+W*(Math.round(p[A]*100)/100)+w}}function Mr(t){t===void 0&&(t={});var r=b(t);return r.duration=0,r.add=function(n,i){var e=C.indexOf(r),o=r.children;e>-1&&C.splice(e,1);function s(h){h.passThrough=!0}for(var c=0;c<o.length;c++)s(o[c]);var a=J(n,G(tt,t));a.targets=a.targets||t.targets;var v=r.duration;a.autoplay=!1,a.direction=r.direction,a.timelineOffset=f.und(i)?v:st(i,v),s(r),r.seek(a.timelineOffset);var u=b(a);s(u),o.push(u);var l=jt(o,t);return r.delay=l.delay,r.endDelay=l.endDelay,r.duration=l.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r}b.version="3.2.1";b.speed=1;b.suspendWhenDocumentHidden=!0;b.running=C;b.remove=Tr;b.get=ot;b.set=Vt;b.convertPx=it;b.path=lr;b.setDashoffset=cr;b.stagger=wr;b.timeline=Mr;b.easing=rt;b.penner=It;b.random=function(t,r){return Math.floor(Math.random()*(r-t+1))+t};var ft=b;var lt=class{constructor(r,n){this.container=r,r.style.position,this.originalAnimationDescription=JSON.parse(JSON.stringify(n)),this.animationDescription=this._scale(),window.getComputedStyle(r).position==="static"&&(r.style.position="relative"),r.classList.add("animeAnimatorContainer"),this.initTimeline(),this.animationDescription=this._scale(),this.createControls(),this.initElements(),this._addAnimations(this.animationDescription.animations),this.timeline.pause(),this.container.append(this.controls);var i=0;window.addEventListener("resize",()=>{let e=Date.now();e-i>100&&(this.resize(),i=e)})}initElements(){let r=ft.timeline({easing:"linear",duration:0});this.elementsById={},this._createElements(this.animationDescription.elements,this.container,r)}initTimeline(){this.timeline=ft.timeline({easing:"easeInOutQuad",update:()=>{this.rangeSlider.value=this.timeline.progress/100,this.timeDisplay.innerText=`${Math.round(this.timeline.progress/1e4*this.timeline.duration)/10} / ${Math.round(this.timeline.duration/100)/10}`},complete:()=>{this.playButton.innerText="play"},duration:0})}init(){}resize(){let r=this.timeline.progress*this.timeline.duration*.01;Array.from(this.container.children).forEach(n=>n.remove()),this.initTimeline(),this.animationDescription=this._scale(),this.initElements(),this._addAnimations(this.animationDescription.animations),this.container.appendChild(this.controls),this.timeline.pause(),setTimeout(()=>{this.timeline.seek(r),console.log({progress:r}),this.playButton.innerText==="pause"&&this.timeline.play()},10)}createControls(){this.controls=B(`<div class='control'>
        </div>`);let r=B("<div id='resetButton' class='button'>|&lt;</div>"),n=B("<div id='playButton' class='button'>play</div>"),i=B(`<input type='range' min='0' max='1' step="0.001" value='0' id='position'>`),e=B(`<div id='controlDisplay'>${this.timeline.duration}</div>`);this.rangeSlider=i,this.timeDisplay=e,this.playButton=n,this.controls.appendChild(r),this.controls.appendChild(n),this.controls.appendChild(i),this.controls.appendChild(e),n.addEventListener("click",()=>{n.innerText==="play"?(this.timeline.play(),n.innerText="pause"):(this.timeline.pause(),n.innerText="play")}),r.addEventListener("click",()=>{this.timeline.pause(),this.timeline.seek(0)}),e.innerHTML=`${Math.round(this.timeline.progress/1e4*this.timeline.duration)/10} / ${Math.round(this.timeline.duration/100)/10}`,i.addEventListener("input",()=>{this.timeline.seek(this.rangeSlider.value*this.timeline.duration)})}play(){this.timeline.play()}_createElements(r,n,i){r.forEach(e=>{let o=document.createElement(e.tagName||"div");o.style.position="absolute",e.$=o,this.elementsById[e.id]=o,n.appendChild(o);let s=e.children;delete e.children;let c=e.content;delete e.content,i.add(bt({targets:o},e)),s&&this._createElements(s,o,i),c&&o.append(c)})}_addAnimations(r,n=0){return r.forEach(i=>{if(Array.isArray(i)){let e=n,o=i.map(c=>Array.isArray(c)?this._addAnimations(c,e):this._addAnimation(c,e));n+=Math.max(...o)-e}else n+=this._addAnimation(i,n)}),n}_addAnimation(r,n){return r.id&&(r.targets=this.elementsById[r.id],this.timeline.add(r,n),console.log("animation added")),r.duration||0}_scale(){let r=JSON.parse(JSON.stringify(this.originalAnimationDescription)),n={width:this.container.offsetWidth,height:this.container.offsetHeight},i=r.size,e=n.width/i.width,o=n.height/i.height,s=Math.min(e,o),c={width:i.width*s,height:i.height*s},a={left:(n.width-c.width)/2,top:(n.height-c.height)/2};v(r.elements,!0),v(r.animations,!0);function v(u,l=!1){Array.isArray(u)&&u.forEach(h=>v(h,l)),typeof u=="object"&&(u.children&&v(u.children),typeof u.top<"u"&&(typeof u.top=="string"?u.top.startsWith("+=")?u.top="+="+parseFloat(u.top.substr(2))*s:u.top.startsWith("-=")&&(u.top="-="+parseFloat(u.top.substr(2))*s):typeof u.top=="number"&&(u.top=u.top*s+(l?a.top:0))),typeof u.left<"u"&&(typeof u.left=="string"?u.left.startsWith("+=")?u.left="+="+parseFloat(u.left.substr(2))*s:u.left.startsWith("-=")&&(u.left="-="+parseFloat(u.left.substr(2))*s):typeof u.left=="number"&&(u.left=u.left*s+(l?a.left:0))),typeof u.width<"u"&&(typeof u.width=="string"?u.width.startsWith("+=")?u.width="+="+parseFloat(u.width.substr(2))*s:u.width.startsWith("-=")&&(u.width="-="+parseFloat(u.width.substr(2))*s):typeof u.width=="number"&&(u.width=u.width*s)),typeof u.height<"u"&&(typeof u.height=="string"?u.height.startsWith("+=")?u.height="+="+parseFloat(u.height.substr(2))*s:u.height.startsWith("-=")&&(u.height="-="+parseFloat(u.height.substr(2))*s):typeof u.height=="number"&&(u.height=u.height*s)))}return console.log({widthRatio:e,heightRatio:o,minRatio:s,offsets:a,newAnimationSize:c,clone:r}),r}};function B(t){let r=document.createElement("div");return r.innerHTML=t,r.children[0]}document.head.appendChild(B(`<style>
.animeAnimatorContainer{
    user-select: none;
}
    .animeAnimatorContainer .control{
        display: none;
    }
    .animeAnimatorContainer:hover .control{
        display: block;
    }
    .animeAnimatorContainer .control{
        position: absolute;
        bottom:10px;
        right: 10px;
    }
    .animeAnimatorContainer .control .button, .control div{
        width: 100px;
        text-align: center;
        float: left;
        border: 1px solid blue;
        border-width: 1px 1px 1px 1px;
    }
    .animeAnimatorContainer .control .button:hover{
        background-color: rgb(243, 252, 255);
    }
    .animeAnimatorContainer .control #position{
        width:400px;
    }
</style>`));return Zt(Er);})();
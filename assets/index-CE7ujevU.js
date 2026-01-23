(function(){const T=document.createElement("link").relList;if(T&&T.supports&&T.supports("modulepreload"))return;for(const N of document.querySelectorAll('link[rel="modulepreload"]'))c(N);new MutationObserver(N=>{for(const U of N)if(U.type==="childList")for(const F of U.addedNodes)F.tagName==="LINK"&&F.rel==="modulepreload"&&c(F)}).observe(document,{childList:!0,subtree:!0});function E(N){const U={};return N.integrity&&(U.integrity=N.integrity),N.referrerPolicy&&(U.referrerPolicy=N.referrerPolicy),N.crossOrigin==="use-credentials"?U.credentials="include":N.crossOrigin==="anonymous"?U.credentials="omit":U.credentials="same-origin",U}function c(N){if(N.ep)return;N.ep=!0;const U=E(N);fetch(N.href,U)}})();var ps={exports:{}},Ti={};var xf;function ph(){if(xf)return Ti;xf=1;var p=Symbol.for("react.transitional.element"),T=Symbol.for("react.fragment");function E(c,N,U){var F=null;if(U!==void 0&&(F=""+U),N.key!==void 0&&(F=""+N.key),"key"in N){U={};for(var se in N)se!=="key"&&(U[se]=N[se])}else U=N;return N=U.ref,{$$typeof:p,type:c,key:F,ref:N!==void 0?N:null,props:U}}return Ti.Fragment=T,Ti.jsx=E,Ti.jsxs=E,Ti}var Tf;function mh(){return Tf||(Tf=1,ps.exports=ph()),ps.exports}var y=mh(),ms={exports:{}},I={};var Ef;function hh(){if(Ef)return I;Ef=1;var p=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),E=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),N=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),F=Symbol.for("react.context"),se=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),Y=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),ce=Symbol.iterator;function j(d){return d===null||typeof d!="object"?null:(d=ce&&d[ce]||d["@@iterator"],typeof d=="function"?d:null)}var je={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},we=Object.assign,wt={};function Ve(d,x,k){this.props=d,this.context=x,this.refs=wt,this.updater=k||je}Ve.prototype.isReactComponent={},Ve.prototype.setState=function(d,x){if(typeof d!="object"&&typeof d!="function"&&d!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,d,x,"setState")},Ve.prototype.forceUpdate=function(d){this.updater.enqueueForceUpdate(this,d,"forceUpdate")};function Nt(){}Nt.prototype=Ve.prototype;function De(d,x,k){this.props=d,this.context=x,this.refs=wt,this.updater=k||je}var Ge=De.prototype=new Nt;Ge.constructor=De,we(Ge,Ve.prototype),Ge.isPureReactComponent=!0;var ct=Array.isArray;function O(){}var M={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function Te(d,x,k){var z=k.ref;return{$$typeof:p,type:d,key:x,ref:z!==void 0?z:null,props:k}}function Zt(d,x){return Te(d.type,x,d.props)}function ut(d){return typeof d=="object"&&d!==null&&d.$$typeof===p}function Fe(d){var x={"=":"=0",":":"=2"};return"$"+d.replace(/[=:]/g,function(k){return x[k]})}var Ta=/\/+/g;function Ut(d,x){return typeof d=="object"&&d!==null&&d.key!=null?Fe(""+d.key):x.toString(36)}function At(d){switch(d.status){case"fulfilled":return d.value;case"rejected":throw d.reason;default:switch(typeof d.status=="string"?d.then(O,O):(d.status="pending",d.then(function(x){d.status==="pending"&&(d.status="fulfilled",d.value=x)},function(x){d.status==="pending"&&(d.status="rejected",d.reason=x)})),d.status){case"fulfilled":return d.value;case"rejected":throw d.reason}}throw d}function S(d,x,k,z,P){var Q=typeof d;(Q==="undefined"||Q==="boolean")&&(d=null);var ie=!1;if(d===null)ie=!0;else switch(Q){case"bigint":case"string":case"number":ie=!0;break;case"object":switch(d.$$typeof){case p:case T:ie=!0;break;case Y:return ie=d._init,S(ie(d._payload),x,k,z,P)}}if(ie)return P=P(d),ie=z===""?"."+Ut(d,0):z,ct(P)?(k="",ie!=null&&(k=ie.replace(Ta,"$&/")+"/"),S(P,x,k,"",function(Un){return Un})):P!=null&&(ut(P)&&(P=Zt(P,k+(P.key==null||d&&d.key===P.key?"":(""+P.key).replace(Ta,"$&/")+"/")+ie)),x.push(P)),1;ie=0;var Ie=z===""?".":z+":";if(ct(d))for(var Ae=0;Ae<d.length;Ae++)z=d[Ae],Q=Ie+Ut(z,Ae),ie+=S(z,x,k,Q,P);else if(Ae=j(d),typeof Ae=="function")for(d=Ae.call(d),Ae=0;!(z=d.next()).done;)z=z.value,Q=Ie+Ut(z,Ae++),ie+=S(z,x,k,Q,P);else if(Q==="object"){if(typeof d.then=="function")return S(At(d),x,k,z,P);throw x=String(d),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(d).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return ie}function R(d,x,k){if(d==null)return d;var z=[],P=0;return S(d,z,"","",function(Q){return x.call(k,Q,P++)}),z}function V(d){if(d._status===-1){var x=d._result;x=x(),x.then(function(k){(d._status===0||d._status===-1)&&(d._status=1,d._result=k)},function(k){(d._status===0||d._status===-1)&&(d._status=2,d._result=k)}),d._status===-1&&(d._status=0,d._result=x)}if(d._status===1)return d._result.default;throw d._result}var ue=typeof reportError=="function"?reportError:function(d){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d),error:d});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",d);return}console.error(d)},me={map:R,forEach:function(d,x,k){R(d,function(){x.apply(this,arguments)},k)},count:function(d){var x=0;return R(d,function(){x++}),x},toArray:function(d){return R(d,function(x){return x})||[]},only:function(d){if(!ut(d))throw Error("React.Children.only expected to receive a single React element child.");return d}};return I.Activity=L,I.Children=me,I.Component=Ve,I.Fragment=E,I.Profiler=N,I.PureComponent=De,I.StrictMode=c,I.Suspense=D,I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=M,I.__COMPILER_RUNTIME={__proto__:null,c:function(d){return M.H.useMemoCache(d)}},I.cache=function(d){return function(){return d.apply(null,arguments)}},I.cacheSignal=function(){return null},I.cloneElement=function(d,x,k){if(d==null)throw Error("The argument must be a React element, but you passed "+d+".");var z=we({},d.props),P=d.key;if(x!=null)for(Q in x.key!==void 0&&(P=""+x.key),x)!ee.call(x,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&x.ref===void 0||(z[Q]=x[Q]);var Q=arguments.length-2;if(Q===1)z.children=k;else if(1<Q){for(var ie=Array(Q),Ie=0;Ie<Q;Ie++)ie[Ie]=arguments[Ie+2];z.children=ie}return Te(d.type,P,z)},I.createContext=function(d){return d={$$typeof:F,_currentValue:d,_currentValue2:d,_threadCount:0,Provider:null,Consumer:null},d.Provider=d,d.Consumer={$$typeof:U,_context:d},d},I.createElement=function(d,x,k){var z,P={},Q=null;if(x!=null)for(z in x.key!==void 0&&(Q=""+x.key),x)ee.call(x,z)&&z!=="key"&&z!=="__self"&&z!=="__source"&&(P[z]=x[z]);var ie=arguments.length-2;if(ie===1)P.children=k;else if(1<ie){for(var Ie=Array(ie),Ae=0;Ae<ie;Ae++)Ie[Ae]=arguments[Ae+2];P.children=Ie}if(d&&d.defaultProps)for(z in ie=d.defaultProps,ie)P[z]===void 0&&(P[z]=ie[z]);return Te(d,Q,P)},I.createRef=function(){return{current:null}},I.forwardRef=function(d){return{$$typeof:se,render:d}},I.isValidElement=ut,I.lazy=function(d){return{$$typeof:Y,_payload:{_status:-1,_result:d},_init:V}},I.memo=function(d,x){return{$$typeof:C,type:d,compare:x===void 0?null:x}},I.startTransition=function(d){var x=M.T,k={};M.T=k;try{var z=d(),P=M.S;P!==null&&P(k,z),typeof z=="object"&&z!==null&&typeof z.then=="function"&&z.then(O,ue)}catch(Q){ue(Q)}finally{x!==null&&k.types!==null&&(x.types=k.types),M.T=x}},I.unstable_useCacheRefresh=function(){return M.H.useCacheRefresh()},I.use=function(d){return M.H.use(d)},I.useActionState=function(d,x,k){return M.H.useActionState(d,x,k)},I.useCallback=function(d,x){return M.H.useCallback(d,x)},I.useContext=function(d){return M.H.useContext(d)},I.useDebugValue=function(){},I.useDeferredValue=function(d,x){return M.H.useDeferredValue(d,x)},I.useEffect=function(d,x){return M.H.useEffect(d,x)},I.useEffectEvent=function(d){return M.H.useEffectEvent(d)},I.useId=function(){return M.H.useId()},I.useImperativeHandle=function(d,x,k){return M.H.useImperativeHandle(d,x,k)},I.useInsertionEffect=function(d,x){return M.H.useInsertionEffect(d,x)},I.useLayoutEffect=function(d,x){return M.H.useLayoutEffect(d,x)},I.useMemo=function(d,x){return M.H.useMemo(d,x)},I.useOptimistic=function(d,x){return M.H.useOptimistic(d,x)},I.useReducer=function(d,x,k){return M.H.useReducer(d,x,k)},I.useRef=function(d){return M.H.useRef(d)},I.useState=function(d){return M.H.useState(d)},I.useSyncExternalStore=function(d,x,k){return M.H.useSyncExternalStore(d,x,k)},I.useTransition=function(){return M.H.useTransition()},I.version="19.2.3",I}var Nf;function Ss(){return Nf||(Nf=1,ms.exports=hh()),ms.exports}var oe=Ss(),hs={exports:{}},Ei={},gs={exports:{}},ys={};var Mf;function gh(){return Mf||(Mf=1,(function(p){function T(S,R){var V=S.length;S.push(R);e:for(;0<V;){var ue=V-1>>>1,me=S[ue];if(0<N(me,R))S[ue]=R,S[V]=me,V=ue;else break e}}function E(S){return S.length===0?null:S[0]}function c(S){if(S.length===0)return null;var R=S[0],V=S.pop();if(V!==R){S[0]=V;e:for(var ue=0,me=S.length,d=me>>>1;ue<d;){var x=2*(ue+1)-1,k=S[x],z=x+1,P=S[z];if(0>N(k,V))z<me&&0>N(P,k)?(S[ue]=P,S[z]=V,ue=z):(S[ue]=k,S[x]=V,ue=x);else if(z<me&&0>N(P,V))S[ue]=P,S[z]=V,ue=z;else break e}}return R}function N(S,R){var V=S.sortIndex-R.sortIndex;return V!==0?V:S.id-R.id}if(p.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var U=performance;p.unstable_now=function(){return U.now()}}else{var F=Date,se=F.now();p.unstable_now=function(){return F.now()-se}}var D=[],C=[],Y=1,L=null,ce=3,j=!1,je=!1,we=!1,wt=!1,Ve=typeof setTimeout=="function"?setTimeout:null,Nt=typeof clearTimeout=="function"?clearTimeout:null,De=typeof setImmediate<"u"?setImmediate:null;function Ge(S){for(var R=E(C);R!==null;){if(R.callback===null)c(C);else if(R.startTime<=S)c(C),R.sortIndex=R.expirationTime,T(D,R);else break;R=E(C)}}function ct(S){if(we=!1,Ge(S),!je)if(E(D)!==null)je=!0,O||(O=!0,Fe());else{var R=E(C);R!==null&&At(ct,R.startTime-S)}}var O=!1,M=-1,ee=5,Te=-1;function Zt(){return wt?!0:!(p.unstable_now()-Te<ee)}function ut(){if(wt=!1,O){var S=p.unstable_now();Te=S;var R=!0;try{e:{je=!1,we&&(we=!1,Nt(M),M=-1),j=!0;var V=ce;try{t:{for(Ge(S),L=E(D);L!==null&&!(L.expirationTime>S&&Zt());){var ue=L.callback;if(typeof ue=="function"){L.callback=null,ce=L.priorityLevel;var me=ue(L.expirationTime<=S);if(S=p.unstable_now(),typeof me=="function"){L.callback=me,Ge(S),R=!0;break t}L===E(D)&&c(D),Ge(S)}else c(D);L=E(D)}if(L!==null)R=!0;else{var d=E(C);d!==null&&At(ct,d.startTime-S),R=!1}}break e}finally{L=null,ce=V,j=!1}R=void 0}}finally{R?Fe():O=!1}}}var Fe;if(typeof De=="function")Fe=function(){De(ut)};else if(typeof MessageChannel<"u"){var Ta=new MessageChannel,Ut=Ta.port2;Ta.port1.onmessage=ut,Fe=function(){Ut.postMessage(null)}}else Fe=function(){Ve(ut,0)};function At(S,R){M=Ve(function(){S(p.unstable_now())},R)}p.unstable_IdlePriority=5,p.unstable_ImmediatePriority=1,p.unstable_LowPriority=4,p.unstable_NormalPriority=3,p.unstable_Profiling=null,p.unstable_UserBlockingPriority=2,p.unstable_cancelCallback=function(S){S.callback=null},p.unstable_forceFrameRate=function(S){0>S||125<S?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ee=0<S?Math.floor(1e3/S):5},p.unstable_getCurrentPriorityLevel=function(){return ce},p.unstable_next=function(S){switch(ce){case 1:case 2:case 3:var R=3;break;default:R=ce}var V=ce;ce=R;try{return S()}finally{ce=V}},p.unstable_requestPaint=function(){wt=!0},p.unstable_runWithPriority=function(S,R){switch(S){case 1:case 2:case 3:case 4:case 5:break;default:S=3}var V=ce;ce=S;try{return R()}finally{ce=V}},p.unstable_scheduleCallback=function(S,R,V){var ue=p.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?ue+V:ue):V=ue,S){case 1:var me=-1;break;case 2:me=250;break;case 5:me=1073741823;break;case 4:me=1e4;break;default:me=5e3}return me=V+me,S={id:Y++,callback:R,priorityLevel:S,startTime:V,expirationTime:me,sortIndex:-1},V>ue?(S.sortIndex=V,T(C,S),E(D)===null&&S===E(C)&&(we?(Nt(M),M=-1):we=!0,At(ct,V-ue))):(S.sortIndex=me,T(D,S),je||j||(je=!0,O||(O=!0,Fe()))),S},p.unstable_shouldYield=Zt,p.unstable_wrapCallback=function(S){var R=ce;return function(){var V=ce;ce=R;try{return S.apply(this,arguments)}finally{ce=V}}}})(ys)),ys}var Rf;function yh(){return Rf||(Rf=1,gs.exports=gh()),gs.exports}var vs={exports:{}},qe={};var kf;function vh(){if(kf)return qe;kf=1;var p=Ss();function T(D){var C="https://react.dev/errors/"+D;if(1<arguments.length){C+="?args[]="+encodeURIComponent(arguments[1]);for(var Y=2;Y<arguments.length;Y++)C+="&args[]="+encodeURIComponent(arguments[Y])}return"Minified React error #"+D+"; visit "+C+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function E(){}var c={d:{f:E,r:function(){throw Error(T(522))},D:E,C:E,L:E,m:E,X:E,S:E,M:E},p:0,findDOMNode:null},N=Symbol.for("react.portal");function U(D,C,Y){var L=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:N,key:L==null?null:""+L,children:D,containerInfo:C,implementation:Y}}var F=p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function se(D,C){if(D==="font")return"";if(typeof C=="string")return C==="use-credentials"?C:""}return qe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,qe.createPortal=function(D,C){var Y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!C||C.nodeType!==1&&C.nodeType!==9&&C.nodeType!==11)throw Error(T(299));return U(D,C,null,Y)},qe.flushSync=function(D){var C=F.T,Y=c.p;try{if(F.T=null,c.p=2,D)return D()}finally{F.T=C,c.p=Y,c.d.f()}},qe.preconnect=function(D,C){typeof D=="string"&&(C?(C=C.crossOrigin,C=typeof C=="string"?C==="use-credentials"?C:"":void 0):C=null,c.d.C(D,C))},qe.prefetchDNS=function(D){typeof D=="string"&&c.d.D(D)},qe.preinit=function(D,C){if(typeof D=="string"&&C&&typeof C.as=="string"){var Y=C.as,L=se(Y,C.crossOrigin),ce=typeof C.integrity=="string"?C.integrity:void 0,j=typeof C.fetchPriority=="string"?C.fetchPriority:void 0;Y==="style"?c.d.S(D,typeof C.precedence=="string"?C.precedence:void 0,{crossOrigin:L,integrity:ce,fetchPriority:j}):Y==="script"&&c.d.X(D,{crossOrigin:L,integrity:ce,fetchPriority:j,nonce:typeof C.nonce=="string"?C.nonce:void 0})}},qe.preinitModule=function(D,C){if(typeof D=="string")if(typeof C=="object"&&C!==null){if(C.as==null||C.as==="script"){var Y=se(C.as,C.crossOrigin);c.d.M(D,{crossOrigin:Y,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0})}}else C==null&&c.d.M(D)},qe.preload=function(D,C){if(typeof D=="string"&&typeof C=="object"&&C!==null&&typeof C.as=="string"){var Y=C.as,L=se(Y,C.crossOrigin);c.d.L(D,Y,{crossOrigin:L,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0,type:typeof C.type=="string"?C.type:void 0,fetchPriority:typeof C.fetchPriority=="string"?C.fetchPriority:void 0,referrerPolicy:typeof C.referrerPolicy=="string"?C.referrerPolicy:void 0,imageSrcSet:typeof C.imageSrcSet=="string"?C.imageSrcSet:void 0,imageSizes:typeof C.imageSizes=="string"?C.imageSizes:void 0,media:typeof C.media=="string"?C.media:void 0})}},qe.preloadModule=function(D,C){if(typeof D=="string")if(C){var Y=se(C.as,C.crossOrigin);c.d.m(D,{as:typeof C.as=="string"&&C.as!=="script"?C.as:void 0,crossOrigin:Y,integrity:typeof C.integrity=="string"?C.integrity:void 0})}else c.d.m(D)},qe.requestFormReset=function(D){c.d.r(D)},qe.unstable_batchedUpdates=function(D,C){return D(C)},qe.useFormState=function(D,C,Y){return F.H.useFormState(D,C,Y)},qe.useFormStatus=function(){return F.H.useHostTransitionStatus()},qe.version="19.2.3",qe}var Df;function bh(){if(Df)return vs.exports;Df=1;function p(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p)}catch(T){console.error(T)}}return p(),vs.exports=vh(),vs.exports}var Uf;function Sh(){if(Uf)return Ei;Uf=1;var p=yh(),T=Ss(),E=bh();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function N(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function U(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function F(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function se(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function D(e){if(U(e)!==e)throw Error(c(188))}function C(e){var t=e.alternate;if(!t){if(t=U(e),t===null)throw Error(c(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var o=i.alternate;if(o===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===a)return D(i),e;if(o===n)return D(i),t;o=o.sibling}throw Error(c(188))}if(a.return!==n.return)a=i,n=o;else{for(var l=!1,r=i.child;r;){if(r===a){l=!0,a=i,n=o;break}if(r===n){l=!0,n=i,a=o;break}r=r.sibling}if(!l){for(r=o.child;r;){if(r===a){l=!0,a=o,n=i;break}if(r===n){l=!0,n=o,a=i;break}r=r.sibling}if(!l)throw Error(c(189))}}if(a.alternate!==n)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?e:t}function Y(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Y(e),t!==null)return t;e=e.sibling}return null}var L=Object.assign,ce=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),je=Symbol.for("react.portal"),we=Symbol.for("react.fragment"),wt=Symbol.for("react.strict_mode"),Ve=Symbol.for("react.profiler"),Nt=Symbol.for("react.consumer"),De=Symbol.for("react.context"),Ge=Symbol.for("react.forward_ref"),ct=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),M=Symbol.for("react.memo"),ee=Symbol.for("react.lazy"),Te=Symbol.for("react.activity"),Zt=Symbol.for("react.memo_cache_sentinel"),ut=Symbol.iterator;function Fe(e){return e===null||typeof e!="object"?null:(e=ut&&e[ut]||e["@@iterator"],typeof e=="function"?e:null)}var Ta=Symbol.for("react.client.reference");function Ut(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ta?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case we:return"Fragment";case Ve:return"Profiler";case wt:return"StrictMode";case ct:return"Suspense";case O:return"SuspenseList";case Te:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case je:return"Portal";case De:return e.displayName||"Context";case Nt:return(e._context.displayName||"Context")+".Consumer";case Ge:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case M:return t=e.displayName||null,t!==null?t:Ut(e.type)||"Memo";case ee:t=e._payload,e=e._init;try{return Ut(e(t))}catch{}}return null}var At=Array.isArray,S=T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=E.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},ue=[],me=-1;function d(e){return{current:e}}function x(e){0>me||(e.current=ue[me],ue[me]=null,me--)}function k(e,t){me++,ue[me]=e.current,e.current=t}var z=d(null),P=d(null),Q=d(null),ie=d(null);function Ie(e,t){switch(k(Q,t),k(P,e),k(z,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Jd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Jd(t),e=Yd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}x(z),k(z,e)}function Ae(){x(z),x(P),x(Q)}function Un(e){e.memoizedState!==null&&k(ie,e);var t=z.current,a=Yd(t,e.type);t!==a&&(k(P,e),k(z,a))}function Ri(e){P.current===e&&(x(z),x(P)),ie.current===e&&(x(ie),wi._currentValue=V)}var Ko,As;function Ea(e){if(Ko===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Ko=t&&t[1]||"",As=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ko+e+As}var Xo=!1;function Zo(e,t){if(!e||Xo)return"";Xo=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var A=function(){throw Error()};if(Object.defineProperty(A.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(A,[])}catch(v){var g=v}Reflect.construct(e,[],A)}else{try{A.call()}catch(v){g=v}e.call(A.prototype)}}else{try{throw Error()}catch(v){g=v}(A=e())&&typeof A.catch=="function"&&A.catch(function(){})}}catch(v){if(v&&g&&typeof v.stack=="string")return[v.stack,g.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=n.DetermineComponentFrameRoot(),l=o[0],r=o[1];if(l&&r){var s=l.split(`
`),h=r.split(`
`);for(i=n=0;n<s.length&&!s[n].includes("DetermineComponentFrameRoot");)n++;for(;i<h.length&&!h[i].includes("DetermineComponentFrameRoot");)i++;if(n===s.length||i===h.length)for(n=s.length-1,i=h.length-1;1<=n&&0<=i&&s[n]!==h[i];)i--;for(;1<=n&&0<=i;n--,i--)if(s[n]!==h[i]){if(n!==1||i!==1)do if(n--,i--,0>i||s[n]!==h[i]){var b=`
`+s[n].replace(" at new "," at ");return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),b}while(1<=n&&0<=i);break}}}finally{Xo=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Ea(a):""}function Gf(e,t){switch(e.tag){case 26:case 27:case 5:return Ea(e.type);case 16:return Ea("Lazy");case 13:return e.child!==t&&t!==null?Ea("Suspense Fallback"):Ea("Suspense");case 19:return Ea("SuspenseList");case 0:case 15:return Zo(e.type,!1);case 11:return Zo(e.type.render,!1);case 1:return Zo(e.type,!0);case 31:return Ea("Activity");default:return""}}function Cs(e){try{var t="",a=null;do t+=Gf(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Wo=Object.prototype.hasOwnProperty,$o=p.unstable_scheduleCallback,el=p.unstable_cancelCallback,Ff=p.unstable_shouldYield,Jf=p.unstable_requestPaint,$e=p.unstable_now,Yf=p.unstable_getCurrentPriorityLevel,xs=p.unstable_ImmediatePriority,Ts=p.unstable_UserBlockingPriority,ki=p.unstable_NormalPriority,Qf=p.unstable_LowPriority,Es=p.unstable_IdlePriority,Kf=p.log,Xf=p.unstable_setDisableYieldValue,On=null,et=null;function Wt(e){if(typeof Kf=="function"&&Xf(e),et&&typeof et.setStrictMode=="function")try{et.setStrictMode(On,e)}catch{}}var tt=Math.clz32?Math.clz32:$f,Zf=Math.log,Wf=Math.LN2;function $f(e){return e>>>=0,e===0?32:31-(Zf(e)/Wf|0)|0}var Di=256,Ui=262144,Oi=4194304;function Na(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _i(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,o=e.suspendedLanes,l=e.pingedLanes;e=e.warmLanes;var r=n&134217727;return r!==0?(n=r&~o,n!==0?i=Na(n):(l&=r,l!==0?i=Na(l):a||(a=r&~e,a!==0&&(i=Na(a))))):(r=n&~o,r!==0?i=Na(r):l!==0?i=Na(l):a||(a=n&~e,a!==0&&(i=Na(a)))),i===0?0:t!==0&&t!==i&&(t&o)===0&&(o=i&-i,a=t&-t,o>=a||o===32&&(a&4194048)!==0)?t:i}function _n(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ep(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ns(){var e=Oi;return Oi<<=1,(Oi&62914560)===0&&(Oi=4194304),e}function tl(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function zn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tp(e,t,a,n,i,o){var l=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var r=e.entanglements,s=e.expirationTimes,h=e.hiddenUpdates;for(a=l&~a;0<a;){var b=31-tt(a),A=1<<b;r[b]=0,s[b]=-1;var g=h[b];if(g!==null)for(h[b]=null,b=0;b<g.length;b++){var v=g[b];v!==null&&(v.lane&=-536870913)}a&=~A}n!==0&&Ms(e,n,0),o!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=o&~(l&~t))}function Ms(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-tt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Rs(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-tt(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function ks(e,t){var a=t&-t;return a=(a&42)!==0?1:al(a),(a&(e.suspendedLanes|t))!==0?0:a}function al(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nl(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ds(){var e=R.p;return e!==0?e:(e=window.event,e===void 0?32:yf(e.type))}function Us(e,t){var a=R.p;try{return R.p=e,t()}finally{R.p=a}}var $t=Math.random().toString(36).slice(2),_e="__reactFiber$"+$t,Je="__reactProps$"+$t,Ya="__reactContainer$"+$t,il="__reactEvents$"+$t,ap="__reactListeners$"+$t,np="__reactHandles$"+$t,Os="__reactResources$"+$t,Bn="__reactMarker$"+$t;function ol(e){delete e[_e],delete e[Je],delete e[il],delete e[ap],delete e[np]}function Qa(e){var t=e[_e];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ya]||a[_e]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=ef(e);e!==null;){if(a=e[_e])return a;e=ef(e)}return t}e=a,a=e.parentNode}return null}function Ka(e){if(e=e[_e]||e[Ya]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Hn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function Xa(e){var t=e[Os];return t||(t=e[Os]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ue(e){e[Bn]=!0}var _s=new Set,zs={};function Ma(e,t){Za(e,t),Za(e+"Capture",t)}function Za(e,t){for(zs[e]=t,e=0;e<t.length;e++)_s.add(t[e])}var ip=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Bs={},Hs={};function op(e){return Wo.call(Hs,e)?!0:Wo.call(Bs,e)?!1:ip.test(e)?Hs[e]=!0:(Bs[e]=!0,!1)}function zi(e,t,a){if(op(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Bi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ot(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function dt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ls(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function lp(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){a=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ll(e){if(!e._valueTracker){var t=Ls(e)?"checked":"value";e._valueTracker=lp(e,t,""+e[t])}}function js(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Ls(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function Hi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var rp=/[\n"\\]/g;function ft(e){return e.replace(rp,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function rl(e,t,a,n,i,o,l,r){e.name="",l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.type=l:e.removeAttribute("type"),t!=null?l==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+dt(t)):e.value!==""+dt(t)&&(e.value=""+dt(t)):l!=="submit"&&l!=="reset"||e.removeAttribute("value"),t!=null?sl(e,l,dt(t)):a!=null?sl(e,l,dt(a)):n!=null&&e.removeAttribute("value"),i==null&&o!=null&&(e.defaultChecked=!!o),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+dt(r):e.removeAttribute("name")}function qs(e,t,a,n,i,o,l,r){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.type=o),t!=null||a!=null){if(!(o!=="submit"&&o!=="reset"||t!=null)){ll(e);return}a=a!=null?""+dt(a):"",t=t!=null?""+dt(t):a,r||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=r?e.checked:!!n,e.defaultChecked=!!n,l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.name=l),ll(e)}function sl(e,t,a){t==="number"&&Hi(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Wa(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+dt(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Vs(e,t,a){if(t!=null&&(t=""+dt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+dt(a):""}function Is(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(c(92));if(At(n)){if(1<n.length)throw Error(c(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=dt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),ll(e)}function $a(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var sp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ps(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||sp.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Gs(e,t,a){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&Ps(e,i,n)}else for(var o in t)t.hasOwnProperty(o)&&Ps(e,o,t[o])}function cl(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),up=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Li(e){return up.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function _t(){}var ul=null;function dl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var en=null,tn=null;function Fs(e){var t=Ka(e);if(t&&(e=t.stateNode)){var a=e[Je]||null;e:switch(e=t.stateNode,t.type){case"input":if(rl(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ft(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[Je]||null;if(!i)throw Error(c(90));rl(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&js(n)}break e;case"textarea":Vs(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&Wa(e,!!a.multiple,t,!1)}}}var fl=!1;function Js(e,t,a){if(fl)return e(t,a);fl=!0;try{var n=e(t);return n}finally{if(fl=!1,(en!==null||tn!==null)&&(Eo(),en&&(t=en,e=tn,tn=en=null,Fs(t),e)))for(t=0;t<e.length;t++)Fs(e[t])}}function Ln(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Je]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(c(231,t,typeof a));return a}var zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pl=!1;if(zt)try{var jn={};Object.defineProperty(jn,"passive",{get:function(){pl=!0}}),window.addEventListener("test",jn,jn),window.removeEventListener("test",jn,jn)}catch{pl=!1}var ea=null,ml=null,ji=null;function Ys(){if(ji)return ji;var e,t=ml,a=t.length,n,i="value"in ea?ea.value:ea.textContent,o=i.length;for(e=0;e<a&&t[e]===i[e];e++);var l=a-e;for(n=1;n<=l&&t[a-n]===i[o-n];n++);return ji=i.slice(e,1<n?1-n:void 0)}function qi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vi(){return!0}function Qs(){return!1}function Ye(e){function t(a,n,i,o,l){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(a=e[r],this[r]=a?a(o):o[r]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vi:Qs,this.isPropagationStopped=Qs,this}return L(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Vi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Vi)},persist:function(){},isPersistent:Vi}),t}var Ra={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ii=Ye(Ra),qn=L({},Ra,{view:0,detail:0}),dp=Ye(qn),hl,gl,Vn,Pi=L({},qn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Vn&&(Vn&&e.type==="mousemove"?(hl=e.screenX-Vn.screenX,gl=e.screenY-Vn.screenY):gl=hl=0,Vn=e),hl)},movementY:function(e){return"movementY"in e?e.movementY:gl}}),Ks=Ye(Pi),fp=L({},Pi,{dataTransfer:0}),pp=Ye(fp),mp=L({},qn,{relatedTarget:0}),yl=Ye(mp),hp=L({},Ra,{animationName:0,elapsedTime:0,pseudoElement:0}),gp=Ye(hp),yp=L({},Ra,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vp=Ye(yp),bp=L({},Ra,{data:0}),Xs=Ye(bp),Sp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ap={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ap[e])?!!t[e]:!1}function vl(){return Cp}var xp=L({},qn,{key:function(e){if(e.key){var t=Sp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?wp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vl,charCode:function(e){return e.type==="keypress"?qi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tp=Ye(xp),Ep=L({},Pi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zs=Ye(Ep),Np=L({},qn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vl}),Mp=Ye(Np),Rp=L({},Ra,{propertyName:0,elapsedTime:0,pseudoElement:0}),kp=Ye(Rp),Dp=L({},Pi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Up=Ye(Dp),Op=L({},Ra,{newState:0,oldState:0}),_p=Ye(Op),zp=[9,13,27,32],bl=zt&&"CompositionEvent"in window,In=null;zt&&"documentMode"in document&&(In=document.documentMode);var Bp=zt&&"TextEvent"in window&&!In,Ws=zt&&(!bl||In&&8<In&&11>=In),$s=" ",ec=!1;function tc(e,t){switch(e){case"keyup":return zp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ac(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var an=!1;function Hp(e,t){switch(e){case"compositionend":return ac(t);case"keypress":return t.which!==32?null:(ec=!0,$s);case"textInput":return e=t.data,e===$s&&ec?null:e;default:return null}}function Lp(e,t){if(an)return e==="compositionend"||!bl&&tc(e,t)?(e=Ys(),ji=ml=ea=null,an=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ws&&t.locale!=="ko"?null:t.data;default:return null}}var jp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!jp[e.type]:t==="textarea"}function ic(e,t,a,n){en?tn?tn.push(n):tn=[n]:en=n,t=Oo(t,"onChange"),0<t.length&&(a=new Ii("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var Pn=null,Gn=null;function qp(e){qd(e,0)}function Gi(e){var t=Hn(e);if(js(t))return e}function oc(e,t){if(e==="change")return t}var lc=!1;if(zt){var Sl;if(zt){var wl="oninput"in document;if(!wl){var rc=document.createElement("div");rc.setAttribute("oninput","return;"),wl=typeof rc.oninput=="function"}Sl=wl}else Sl=!1;lc=Sl&&(!document.documentMode||9<document.documentMode)}function sc(){Pn&&(Pn.detachEvent("onpropertychange",cc),Gn=Pn=null)}function cc(e){if(e.propertyName==="value"&&Gi(Gn)){var t=[];ic(t,Gn,e,dl(e)),Js(qp,t)}}function Vp(e,t,a){e==="focusin"?(sc(),Pn=t,Gn=a,Pn.attachEvent("onpropertychange",cc)):e==="focusout"&&sc()}function Ip(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gi(Gn)}function Pp(e,t){if(e==="click")return Gi(t)}function Gp(e,t){if(e==="input"||e==="change")return Gi(t)}function Fp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var at=typeof Object.is=="function"?Object.is:Fp;function Fn(e,t){if(at(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!Wo.call(t,i)||!at(e[i],t[i]))return!1}return!0}function uc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dc(e,t){var a=uc(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=uc(a)}}function fc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?fc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function pc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Hi(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Hi(e.document)}return t}function Al(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Jp=zt&&"documentMode"in document&&11>=document.documentMode,nn=null,Cl=null,Jn=null,xl=!1;function mc(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;xl||nn==null||nn!==Hi(n)||(n=nn,"selectionStart"in n&&Al(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Jn&&Fn(Jn,n)||(Jn=n,n=Oo(Cl,"onSelect"),0<n.length&&(t=new Ii("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=nn)))}function ka(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var on={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionrun:ka("Transition","TransitionRun"),transitionstart:ka("Transition","TransitionStart"),transitioncancel:ka("Transition","TransitionCancel"),transitionend:ka("Transition","TransitionEnd")},Tl={},hc={};zt&&(hc=document.createElement("div").style,"AnimationEvent"in window||(delete on.animationend.animation,delete on.animationiteration.animation,delete on.animationstart.animation),"TransitionEvent"in window||delete on.transitionend.transition);function Da(e){if(Tl[e])return Tl[e];if(!on[e])return e;var t=on[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in hc)return Tl[e]=t[a];return e}var gc=Da("animationend"),yc=Da("animationiteration"),vc=Da("animationstart"),Yp=Da("transitionrun"),Qp=Da("transitionstart"),Kp=Da("transitioncancel"),bc=Da("transitionend"),Sc=new Map,El="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");El.push("scrollEnd");function Ct(e,t){Sc.set(e,t),Ma(t,[e])}var Fi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pt=[],ln=0,Nl=0;function Ji(){for(var e=ln,t=Nl=ln=0;t<e;){var a=pt[t];pt[t++]=null;var n=pt[t];pt[t++]=null;var i=pt[t];pt[t++]=null;var o=pt[t];if(pt[t++]=null,n!==null&&i!==null){var l=n.pending;l===null?i.next=i:(i.next=l.next,l.next=i),n.pending=i}o!==0&&wc(a,i,o)}}function Yi(e,t,a,n){pt[ln++]=e,pt[ln++]=t,pt[ln++]=a,pt[ln++]=n,Nl|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function Ml(e,t,a,n){return Yi(e,t,a,n),Qi(e)}function Ua(e,t){return Yi(e,null,null,t),Qi(e)}function wc(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,o=e.return;o!==null;)o.childLanes|=a,n=o.alternate,n!==null&&(n.childLanes|=a),o.tag===22&&(e=o.stateNode,e===null||e._visibility&1||(i=!0)),e=o,o=o.return;return e.tag===3?(o=e.stateNode,i&&t!==null&&(i=31-tt(a),e=o.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),o):null}function Qi(e){if(50<mi)throw mi=0,Hr=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var rn={};function Xp(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nt(e,t,a,n){return new Xp(e,t,a,n)}function Rl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bt(e,t){var a=e.alternate;return a===null?(a=nt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Ac(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ki(e,t,a,n,i,o){var l=0;if(n=e,typeof e=="function")Rl(e)&&(l=1);else if(typeof e=="string")l=th(e,a,z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Te:return e=nt(31,a,t,i),e.elementType=Te,e.lanes=o,e;case we:return Oa(a.children,i,o,t);case wt:l=8,i|=24;break;case Ve:return e=nt(12,a,t,i|2),e.elementType=Ve,e.lanes=o,e;case ct:return e=nt(13,a,t,i),e.elementType=ct,e.lanes=o,e;case O:return e=nt(19,a,t,i),e.elementType=O,e.lanes=o,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case De:l=10;break e;case Nt:l=9;break e;case Ge:l=11;break e;case M:l=14;break e;case ee:l=16,n=null;break e}l=29,a=Error(c(130,e===null?"null":typeof e,"")),n=null}return t=nt(l,a,t,i),t.elementType=e,t.type=n,t.lanes=o,t}function Oa(e,t,a,n){return e=nt(7,e,n,t),e.lanes=a,e}function kl(e,t,a){return e=nt(6,e,null,t),e.lanes=a,e}function Cc(e){var t=nt(18,null,null,0);return t.stateNode=e,t}function Dl(e,t,a){return t=nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xc=new WeakMap;function mt(e,t){if(typeof e=="object"&&e!==null){var a=xc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Cs(t)},xc.set(e,t),t)}return{value:e,source:t,stack:Cs(t)}}var sn=[],cn=0,Xi=null,Yn=0,ht=[],gt=0,ta=null,Mt=1,Rt="";function Ht(e,t){sn[cn++]=Yn,sn[cn++]=Xi,Xi=e,Yn=t}function Tc(e,t,a){ht[gt++]=Mt,ht[gt++]=Rt,ht[gt++]=ta,ta=e;var n=Mt;e=Rt;var i=32-tt(n)-1;n&=~(1<<i),a+=1;var o=32-tt(t)+i;if(30<o){var l=i-i%5;o=(n&(1<<l)-1).toString(32),n>>=l,i-=l,Mt=1<<32-tt(t)+i|a<<i|n,Rt=o+e}else Mt=1<<o|a<<i|n,Rt=e}function Ul(e){e.return!==null&&(Ht(e,1),Tc(e,1,0))}function Ol(e){for(;e===Xi;)Xi=sn[--cn],sn[cn]=null,Yn=sn[--cn],sn[cn]=null;for(;e===ta;)ta=ht[--gt],ht[gt]=null,Rt=ht[--gt],ht[gt]=null,Mt=ht[--gt],ht[gt]=null}function Ec(e,t){ht[gt++]=Mt,ht[gt++]=Rt,ht[gt++]=ta,Mt=t.id,Rt=t.overflow,ta=e}var ze=null,ge=null,$=!1,aa=null,yt=!1,_l=Error(c(519));function na(e){var t=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Qn(mt(t,e)),_l}function Nc(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[_e]=e,t[Je]=n,a){case"dialog":X("cancel",t),X("close",t);break;case"iframe":case"object":case"embed":X("load",t);break;case"video":case"audio":for(a=0;a<gi.length;a++)X(gi[a],t);break;case"source":X("error",t);break;case"img":case"image":case"link":X("error",t),X("load",t);break;case"details":X("toggle",t);break;case"input":X("invalid",t),qs(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":X("invalid",t);break;case"textarea":X("invalid",t),Is(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Gd(t.textContent,a)?(n.popover!=null&&(X("beforetoggle",t),X("toggle",t)),n.onScroll!=null&&X("scroll",t),n.onScrollEnd!=null&&X("scrollend",t),n.onClick!=null&&(t.onclick=_t),t=!0):t=!1,t||na(e,!0)}function Mc(e){for(ze=e.return;ze;)switch(ze.tag){case 5:case 31:case 13:yt=!1;return;case 27:case 3:yt=!0;return;default:ze=ze.return}}function un(e){if(e!==ze)return!1;if(!$)return Mc(e),$=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Wr(e.type,e.memoizedProps)),a=!a),a&&ge&&na(e),Mc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));ge=$d(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));ge=$d(e)}else t===27?(t=ge,ya(e.type)?(e=ns,ns=null,ge=e):ge=t):ge=ze?bt(e.stateNode.nextSibling):null;return!0}function _a(){ge=ze=null,$=!1}function zl(){var e=aa;return e!==null&&(Ze===null?Ze=e:Ze.push.apply(Ze,e),aa=null),e}function Qn(e){aa===null?aa=[e]:aa.push(e)}var Bl=d(null),za=null,Lt=null;function ia(e,t,a){k(Bl,t._currentValue),t._currentValue=a}function jt(e){e._currentValue=Bl.current,x(Bl)}function Hl(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function Ll(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var o=i.dependencies;if(o!==null){var l=i.child;o=o.firstContext;e:for(;o!==null;){var r=o;o=i;for(var s=0;s<t.length;s++)if(r.context===t[s]){o.lanes|=a,r=o.alternate,r!==null&&(r.lanes|=a),Hl(o.return,a,e),n||(l=null);break e}o=r.next}}else if(i.tag===18){if(l=i.return,l===null)throw Error(c(341));l.lanes|=a,o=l.alternate,o!==null&&(o.lanes|=a),Hl(l,a,e),l=null}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===e){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}}function dn(e,t,a,n){e=null;for(var i=t,o=!1;i!==null;){if(!o){if((i.flags&524288)!==0)o=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var l=i.alternate;if(l===null)throw Error(c(387));if(l=l.memoizedProps,l!==null){var r=i.type;at(i.pendingProps.value,l.value)||(e!==null?e.push(r):e=[r])}}else if(i===ie.current){if(l=i.alternate,l===null)throw Error(c(387));l.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(wi):e=[wi])}i=i.return}e!==null&&Ll(t,e,a,n),t.flags|=262144}function Zi(e){for(e=e.firstContext;e!==null;){if(!at(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ba(e){za=e,Lt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Be(e){return Rc(za,e)}function Wi(e,t){return za===null&&Ba(e),Rc(e,t)}function Rc(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Lt===null){if(e===null)throw Error(c(308));Lt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Lt=Lt.next=t;return a}var Zp=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Wp=p.unstable_scheduleCallback,$p=p.unstable_NormalPriority,Ee={$$typeof:De,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function jl(){return{controller:new Zp,data:new Map,refCount:0}}function Kn(e){e.refCount--,e.refCount===0&&Wp($p,function(){e.controller.abort()})}var Xn=null,ql=0,fn=0,pn=null;function em(e,t){if(Xn===null){var a=Xn=[];ql=0,fn=Pr(),pn={status:"pending",value:void 0,then:function(n){a.push(n)}}}return ql++,t.then(kc,kc),t}function kc(){if(--ql===0&&Xn!==null){pn!==null&&(pn.status="fulfilled");var e=Xn;Xn=null,fn=0,pn=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function tm(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var Dc=S.S;S.S=function(e,t){md=$e(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&em(e,t),Dc!==null&&Dc(e,t)};var Ha=d(null);function Vl(){var e=Ha.current;return e!==null?e:he.pooledCache}function $i(e,t){t===null?k(Ha,Ha.current):k(Ha,t.pool)}function Uc(){var e=Vl();return e===null?null:{parent:Ee._currentValue,pool:e}}var mn=Error(c(460)),Il=Error(c(474)),eo=Error(c(542)),to={then:function(){}};function Oc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function _c(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(_t,_t),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bc(e),e;default:if(typeof t.status=="string")t.then(_t,_t);else{if(e=he,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bc(e),e}throw ja=t,mn}}function La(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ja=a,mn):a}}var ja=null;function zc(){if(ja===null)throw Error(c(459));var e=ja;return ja=null,e}function Bc(e){if(e===mn||e===eo)throw Error(c(483))}var hn=null,Zn=0;function ao(e){var t=Zn;return Zn+=1,hn===null&&(hn=[]),_c(hn,e,t)}function Wn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function no(e,t){throw t.$$typeof===ce?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Hc(e){function t(f,u){if(e){var m=f.deletions;m===null?(f.deletions=[u],f.flags|=16):m.push(u)}}function a(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function n(f){for(var u=new Map;f!==null;)f.key!==null?u.set(f.key,f):u.set(f.index,f),f=f.sibling;return u}function i(f,u){return f=Bt(f,u),f.index=0,f.sibling=null,f}function o(f,u,m){return f.index=m,e?(m=f.alternate,m!==null?(m=m.index,m<u?(f.flags|=67108866,u):m):(f.flags|=67108866,u)):(f.flags|=1048576,u)}function l(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function r(f,u,m,w){return u===null||u.tag!==6?(u=kl(m,f.mode,w),u.return=f,u):(u=i(u,m),u.return=f,u)}function s(f,u,m,w){var H=m.type;return H===we?b(f,u,m.props.children,w,m.key):u!==null&&(u.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===ee&&La(H)===u.type)?(u=i(u,m.props),Wn(u,m),u.return=f,u):(u=Ki(m.type,m.key,m.props,null,f.mode,w),Wn(u,m),u.return=f,u)}function h(f,u,m,w){return u===null||u.tag!==4||u.stateNode.containerInfo!==m.containerInfo||u.stateNode.implementation!==m.implementation?(u=Dl(m,f.mode,w),u.return=f,u):(u=i(u,m.children||[]),u.return=f,u)}function b(f,u,m,w,H){return u===null||u.tag!==7?(u=Oa(m,f.mode,w,H),u.return=f,u):(u=i(u,m),u.return=f,u)}function A(f,u,m){if(typeof u=="string"&&u!==""||typeof u=="number"||typeof u=="bigint")return u=kl(""+u,f.mode,m),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case j:return m=Ki(u.type,u.key,u.props,null,f.mode,m),Wn(m,u),m.return=f,m;case je:return u=Dl(u,f.mode,m),u.return=f,u;case ee:return u=La(u),A(f,u,m)}if(At(u)||Fe(u))return u=Oa(u,f.mode,m,null),u.return=f,u;if(typeof u.then=="function")return A(f,ao(u),m);if(u.$$typeof===De)return A(f,Wi(f,u),m);no(f,u)}return null}function g(f,u,m,w){var H=u!==null?u.key:null;if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return H!==null?null:r(f,u,""+m,w);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case j:return m.key===H?s(f,u,m,w):null;case je:return m.key===H?h(f,u,m,w):null;case ee:return m=La(m),g(f,u,m,w)}if(At(m)||Fe(m))return H!==null?null:b(f,u,m,w,null);if(typeof m.then=="function")return g(f,u,ao(m),w);if(m.$$typeof===De)return g(f,u,Wi(f,m),w);no(f,m)}return null}function v(f,u,m,w,H){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return f=f.get(m)||null,r(u,f,""+w,H);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case j:return f=f.get(w.key===null?m:w.key)||null,s(u,f,w,H);case je:return f=f.get(w.key===null?m:w.key)||null,h(u,f,w,H);case ee:return w=La(w),v(f,u,m,w,H)}if(At(w)||Fe(w))return f=f.get(m)||null,b(u,f,w,H,null);if(typeof w.then=="function")return v(f,u,m,ao(w),H);if(w.$$typeof===De)return v(f,u,m,Wi(u,w),H);no(u,w)}return null}function _(f,u,m,w){for(var H=null,te=null,B=u,J=u=0,W=null;B!==null&&J<m.length;J++){B.index>J?(W=B,B=null):W=B.sibling;var ae=g(f,B,m[J],w);if(ae===null){B===null&&(B=W);break}e&&B&&ae.alternate===null&&t(f,B),u=o(ae,u,J),te===null?H=ae:te.sibling=ae,te=ae,B=W}if(J===m.length)return a(f,B),$&&Ht(f,J),H;if(B===null){for(;J<m.length;J++)B=A(f,m[J],w),B!==null&&(u=o(B,u,J),te===null?H=B:te.sibling=B,te=B);return $&&Ht(f,J),H}for(B=n(B);J<m.length;J++)W=v(B,f,J,m[J],w),W!==null&&(e&&W.alternate!==null&&B.delete(W.key===null?J:W.key),u=o(W,u,J),te===null?H=W:te.sibling=W,te=W);return e&&B.forEach(function(Aa){return t(f,Aa)}),$&&Ht(f,J),H}function q(f,u,m,w){if(m==null)throw Error(c(151));for(var H=null,te=null,B=u,J=u=0,W=null,ae=m.next();B!==null&&!ae.done;J++,ae=m.next()){B.index>J?(W=B,B=null):W=B.sibling;var Aa=g(f,B,ae.value,w);if(Aa===null){B===null&&(B=W);break}e&&B&&Aa.alternate===null&&t(f,B),u=o(Aa,u,J),te===null?H=Aa:te.sibling=Aa,te=Aa,B=W}if(ae.done)return a(f,B),$&&Ht(f,J),H;if(B===null){for(;!ae.done;J++,ae=m.next())ae=A(f,ae.value,w),ae!==null&&(u=o(ae,u,J),te===null?H=ae:te.sibling=ae,te=ae);return $&&Ht(f,J),H}for(B=n(B);!ae.done;J++,ae=m.next())ae=v(B,f,J,ae.value,w),ae!==null&&(e&&ae.alternate!==null&&B.delete(ae.key===null?J:ae.key),u=o(ae,u,J),te===null?H=ae:te.sibling=ae,te=ae);return e&&B.forEach(function(fh){return t(f,fh)}),$&&Ht(f,J),H}function pe(f,u,m,w){if(typeof m=="object"&&m!==null&&m.type===we&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case j:e:{for(var H=m.key;u!==null;){if(u.key===H){if(H=m.type,H===we){if(u.tag===7){a(f,u.sibling),w=i(u,m.props.children),w.return=f,f=w;break e}}else if(u.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===ee&&La(H)===u.type){a(f,u.sibling),w=i(u,m.props),Wn(w,m),w.return=f,f=w;break e}a(f,u);break}else t(f,u);u=u.sibling}m.type===we?(w=Oa(m.props.children,f.mode,w,m.key),w.return=f,f=w):(w=Ki(m.type,m.key,m.props,null,f.mode,w),Wn(w,m),w.return=f,f=w)}return l(f);case je:e:{for(H=m.key;u!==null;){if(u.key===H)if(u.tag===4&&u.stateNode.containerInfo===m.containerInfo&&u.stateNode.implementation===m.implementation){a(f,u.sibling),w=i(u,m.children||[]),w.return=f,f=w;break e}else{a(f,u);break}else t(f,u);u=u.sibling}w=Dl(m,f.mode,w),w.return=f,f=w}return l(f);case ee:return m=La(m),pe(f,u,m,w)}if(At(m))return _(f,u,m,w);if(Fe(m)){if(H=Fe(m),typeof H!="function")throw Error(c(150));return m=H.call(m),q(f,u,m,w)}if(typeof m.then=="function")return pe(f,u,ao(m),w);if(m.$$typeof===De)return pe(f,u,Wi(f,m),w);no(f,m)}return typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint"?(m=""+m,u!==null&&u.tag===6?(a(f,u.sibling),w=i(u,m),w.return=f,f=w):(a(f,u),w=kl(m,f.mode,w),w.return=f,f=w),l(f)):a(f,u)}return function(f,u,m,w){try{Zn=0;var H=pe(f,u,m,w);return hn=null,H}catch(B){if(B===mn||B===eo)throw B;var te=nt(29,B,null,f.mode);return te.lanes=w,te.return=f,te}}}var qa=Hc(!0),Lc=Hc(!1),oa=!1;function Pl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Gl(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function la(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ra(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(ne&2)!==0){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Qi(e),wc(e,null,a),t}return Yi(e,n,t,a),Qi(e)}function $n(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Rs(e,a)}}function Fl(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,o=null;if(a=a.firstBaseUpdate,a!==null){do{var l={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};o===null?i=o=l:o=o.next=l,a=a.next}while(a!==null);o===null?i=o=t:o=o.next=t}else i=o=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Jl=!1;function ei(){if(Jl){var e=pn;if(e!==null)throw e}}function ti(e,t,a,n){Jl=!1;var i=e.updateQueue;oa=!1;var o=i.firstBaseUpdate,l=i.lastBaseUpdate,r=i.shared.pending;if(r!==null){i.shared.pending=null;var s=r,h=s.next;s.next=null,l===null?o=h:l.next=h,l=s;var b=e.alternate;b!==null&&(b=b.updateQueue,r=b.lastBaseUpdate,r!==l&&(r===null?b.firstBaseUpdate=h:r.next=h,b.lastBaseUpdate=s))}if(o!==null){var A=i.baseState;l=0,b=h=s=null,r=o;do{var g=r.lane&-536870913,v=g!==r.lane;if(v?(Z&g)===g:(n&g)===g){g!==0&&g===fn&&(Jl=!0),b!==null&&(b=b.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var _=e,q=r;g=t;var pe=a;switch(q.tag){case 1:if(_=q.payload,typeof _=="function"){A=_.call(pe,A,g);break e}A=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=q.payload,g=typeof _=="function"?_.call(pe,A,g):_,g==null)break e;A=L({},A,g);break e;case 2:oa=!0}}g=r.callback,g!==null&&(e.flags|=64,v&&(e.flags|=8192),v=i.callbacks,v===null?i.callbacks=[g]:v.push(g))}else v={lane:g,tag:r.tag,payload:r.payload,callback:r.callback,next:null},b===null?(h=b=v,s=A):b=b.next=v,l|=g;if(r=r.next,r===null){if(r=i.shared.pending,r===null)break;v=r,r=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);b===null&&(s=A),i.baseState=s,i.firstBaseUpdate=h,i.lastBaseUpdate=b,o===null&&(i.shared.lanes=0),fa|=l,e.lanes=l,e.memoizedState=A}}function jc(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function qc(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)jc(a[e],t)}var gn=d(null),io=d(0);function Vc(e,t){e=Qt,k(io,e),k(gn,t),Qt=e|t.baseLanes}function Yl(){k(io,Qt),k(gn,gn.current)}function Ql(){Qt=io.current,x(gn),x(io)}var it=d(null),vt=null;function sa(e){var t=e.alternate;k(Ce,Ce.current&1),k(it,e),vt===null&&(t===null||gn.current!==null||t.memoizedState!==null)&&(vt=e)}function Kl(e){k(Ce,Ce.current),k(it,e),vt===null&&(vt=e)}function Ic(e){e.tag===22?(k(Ce,Ce.current),k(it,e),vt===null&&(vt=e)):ca()}function ca(){k(Ce,Ce.current),k(it,it.current)}function ot(e){x(it),vt===e&&(vt=null),x(Ce)}var Ce=d(0);function oo(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ts(a)||as(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qt=0,G=null,de=null,Ne=null,lo=!1,yn=!1,Va=!1,ro=0,ai=0,vn=null,am=0;function be(){throw Error(c(321))}function Xl(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!at(e[a],t[a]))return!1;return!0}function Zl(e,t,a,n,i,o){return qt=o,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,S.H=e===null||e.memoizedState===null?Tu:fr,Va=!1,o=a(n,i),Va=!1,yn&&(o=Gc(t,a,n,i)),Pc(e),o}function Pc(e){S.H=oi;var t=de!==null&&de.next!==null;if(qt=0,Ne=de=G=null,lo=!1,ai=0,vn=null,t)throw Error(c(300));e===null||Me||(e=e.dependencies,e!==null&&Zi(e)&&(Me=!0))}function Gc(e,t,a,n){G=e;var i=0;do{if(yn&&(vn=null),ai=0,yn=!1,25<=i)throw Error(c(301));if(i+=1,Ne=de=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}S.H=Eu,o=t(a,n)}while(yn);return o}function nm(){var e=S.H,t=e.useState()[0];return t=typeof t.then=="function"?ni(t):t,e=e.useState()[0],(de!==null?de.memoizedState:null)!==e&&(G.flags|=1024),t}function Wl(){var e=ro!==0;return ro=0,e}function $l(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function er(e){if(lo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}lo=!1}qt=0,Ne=de=G=null,yn=!1,ai=ro=0,vn=null}function Pe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?G.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function xe(){if(de===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=de.next;var t=Ne===null?G.memoizedState:Ne.next;if(t!==null)Ne=t,de=e;else{if(e===null)throw G.alternate===null?Error(c(467)):Error(c(310));de=e,e={memoizedState:de.memoizedState,baseState:de.baseState,baseQueue:de.baseQueue,queue:de.queue,next:null},Ne===null?G.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function so(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ni(e){var t=ai;return ai+=1,vn===null&&(vn=[]),e=_c(vn,e,t),t=G,(Ne===null?t.memoizedState:Ne.next)===null&&(t=t.alternate,S.H=t===null||t.memoizedState===null?Tu:fr),e}function co(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ni(e);if(e.$$typeof===De)return Be(e)}throw Error(c(438,String(e)))}function tr(e){var t=null,a=G.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=G.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=so(),G.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=Zt;return t.index++,a}function Vt(e,t){return typeof t=="function"?t(e):t}function uo(e){var t=xe();return ar(t,de,e)}function ar(e,t,a){var n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=a;var i=e.baseQueue,o=n.pending;if(o!==null){if(i!==null){var l=i.next;i.next=o.next,o.next=l}t.baseQueue=i=o,n.pending=null}if(o=e.baseState,i===null)e.memoizedState=o;else{t=i.next;var r=l=null,s=null,h=t,b=!1;do{var A=h.lane&-536870913;if(A!==h.lane?(Z&A)===A:(qt&A)===A){var g=h.revertLane;if(g===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),A===fn&&(b=!0);else if((qt&g)===g){h=h.next,g===fn&&(b=!0);continue}else A={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},s===null?(r=s=A,l=o):s=s.next=A,G.lanes|=g,fa|=g;A=h.action,Va&&a(o,A),o=h.hasEagerState?h.eagerState:a(o,A)}else g={lane:A,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},s===null?(r=s=g,l=o):s=s.next=g,G.lanes|=A,fa|=A;h=h.next}while(h!==null&&h!==t);if(s===null?l=o:s.next=r,!at(o,e.memoizedState)&&(Me=!0,b&&(a=pn,a!==null)))throw a;e.memoizedState=o,e.baseState=l,e.baseQueue=s,n.lastRenderedState=o}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function nr(e){var t=xe(),a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,o=t.memoizedState;if(i!==null){a.pending=null;var l=i=i.next;do o=e(o,l.action),l=l.next;while(l!==i);at(o,t.memoizedState)||(Me=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),a.lastRenderedState=o}return[o,n]}function Fc(e,t,a){var n=G,i=xe(),o=$;if(o){if(a===void 0)throw Error(c(407));a=a()}else a=t();var l=!at((de||i).memoizedState,a);if(l&&(i.memoizedState=a,Me=!0),i=i.queue,lr(Qc.bind(null,n,i,e),[e]),i.getSnapshot!==t||l||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,bn(9,{destroy:void 0},Yc.bind(null,n,i,a,t),null),he===null)throw Error(c(349));o||(qt&127)!==0||Jc(n,t,a)}return a}function Jc(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=G.updateQueue,t===null?(t=so(),G.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Yc(e,t,a,n){t.value=a,t.getSnapshot=n,Kc(t)&&Xc(e)}function Qc(e,t,a){return a(function(){Kc(t)&&Xc(e)})}function Kc(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!at(e,a)}catch{return!0}}function Xc(e){var t=Ua(e,2);t!==null&&We(t,e,2)}function ir(e){var t=Pe();if(typeof e=="function"){var a=e;if(e=a(),Va){Wt(!0);try{a()}finally{Wt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:e},t}function Zc(e,t,a,n){return e.baseState=a,ar(e,de,typeof n=="function"?n:Vt)}function im(e,t,a,n,i){if(mo(e))throw Error(c(485));if(e=t.action,e!==null){var o={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(l){o.listeners.push(l)}};S.T!==null?a(!0):o.isTransition=!1,n(o),a=t.pending,a===null?(o.next=t.pending=o,Wc(t,o)):(o.next=a.next,t.pending=a.next=o)}}function Wc(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var o=S.T,l={};S.T=l;try{var r=a(i,n),s=S.S;s!==null&&s(l,r),$c(e,t,r)}catch(h){or(e,t,h)}finally{o!==null&&l.types!==null&&(o.types=l.types),S.T=o}}else try{o=a(i,n),$c(e,t,o)}catch(h){or(e,t,h)}}function $c(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){eu(e,t,n)},function(n){return or(e,t,n)}):eu(e,t,a)}function eu(e,t,a){t.status="fulfilled",t.value=a,tu(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Wc(e,a)))}function or(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,tu(t),t=t.next;while(t!==n)}e.action=null}function tu(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function au(e,t){return t}function nu(e,t){if($){var a=he.formState;if(a!==null){e:{var n=G;if($){if(ge){t:{for(var i=ge,o=yt;i.nodeType!==8;){if(!o){i=null;break t}if(i=bt(i.nextSibling),i===null){i=null;break t}}o=i.data,i=o==="F!"||o==="F"?i:null}if(i){ge=bt(i.nextSibling),n=i.data==="F!";break e}}na(n)}n=!1}n&&(t=a[0])}}return a=Pe(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:au,lastRenderedState:t},a.queue=n,a=Au.bind(null,G,n),n.dispatch=a,n=ir(!1),o=dr.bind(null,G,!1,n.queue),n=Pe(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=im.bind(null,G,i,o,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function iu(e){var t=xe();return ou(t,de,e)}function ou(e,t,a){if(t=ar(e,t,au)[0],e=uo(Vt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=ni(t)}catch(l){throw l===mn?eo:l}else n=t;t=xe();var i=t.queue,o=i.dispatch;return a!==t.memoizedState&&(G.flags|=2048,bn(9,{destroy:void 0},om.bind(null,i,a),null)),[n,o,e]}function om(e,t){e.action=t}function lu(e){var t=xe(),a=de;if(a!==null)return ou(t,a,e);xe(),t=t.memoizedState,a=xe();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function bn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=G.updateQueue,t===null&&(t=so(),G.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function ru(){return xe().memoizedState}function fo(e,t,a,n){var i=Pe();G.flags|=e,i.memoizedState=bn(1|t,{destroy:void 0},a,n===void 0?null:n)}function po(e,t,a,n){var i=xe();n=n===void 0?null:n;var o=i.memoizedState.inst;de!==null&&n!==null&&Xl(n,de.memoizedState.deps)?i.memoizedState=bn(t,o,a,n):(G.flags|=e,i.memoizedState=bn(1|t,o,a,n))}function su(e,t){fo(8390656,8,e,t)}function lr(e,t){po(2048,8,e,t)}function lm(e){G.flags|=4;var t=G.updateQueue;if(t===null)t=so(),G.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function cu(e){var t=xe().memoizedState;return lm({ref:t,nextImpl:e}),function(){if((ne&2)!==0)throw Error(c(440));return t.impl.apply(void 0,arguments)}}function uu(e,t){return po(4,2,e,t)}function du(e,t){return po(4,4,e,t)}function fu(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function pu(e,t,a){a=a!=null?a.concat([e]):null,po(4,4,fu.bind(null,t,e),a)}function rr(){}function mu(e,t){var a=xe();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&Xl(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function hu(e,t){var a=xe();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&Xl(t,n[1]))return n[0];if(n=e(),Va){Wt(!0);try{e()}finally{Wt(!1)}}return a.memoizedState=[n,t],n}function sr(e,t,a){return a===void 0||(qt&1073741824)!==0&&(Z&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=gd(),G.lanes|=e,fa|=e,a)}function gu(e,t,a,n){return at(a,t)?a:gn.current!==null?(e=sr(e,a,n),at(e,t)||(Me=!0),e):(qt&42)===0||(qt&1073741824)!==0&&(Z&261930)===0?(Me=!0,e.memoizedState=a):(e=gd(),G.lanes|=e,fa|=e,t)}function yu(e,t,a,n,i){var o=R.p;R.p=o!==0&&8>o?o:8;var l=S.T,r={};S.T=r,dr(e,!1,t,a);try{var s=i(),h=S.S;if(h!==null&&h(r,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var b=tm(s,n);ii(e,t,b,st(e))}else ii(e,t,n,st(e))}catch(A){ii(e,t,{then:function(){},status:"rejected",reason:A},st())}finally{R.p=o,l!==null&&r.types!==null&&(l.types=r.types),S.T=l}}function rm(){}function cr(e,t,a,n){if(e.tag!==5)throw Error(c(476));var i=vu(e).queue;yu(e,i,t,V,a===null?rm:function(){return bu(e),a(n)})}function vu(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:V},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bu(e){var t=vu(e);t.next===null&&(t=e.alternate.memoizedState),ii(e,t.next.queue,{},st())}function ur(){return Be(wi)}function Su(){return xe().memoizedState}function wu(){return xe().memoizedState}function sm(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=st();e=la(a);var n=ra(t,e,a);n!==null&&(We(n,t,a),$n(n,t,a)),t={cache:jl()},e.payload=t;return}t=t.return}}function cm(e,t,a){var n=st();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},mo(e)?Cu(t,a):(a=Ml(e,t,a,n),a!==null&&(We(a,e,n),xu(a,t,n)))}function Au(e,t,a){var n=st();ii(e,t,a,n)}function ii(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(mo(e))Cu(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,r=o(l,a);if(i.hasEagerState=!0,i.eagerState=r,at(r,l))return Yi(e,t,i,0),he===null&&Ji(),!1}catch{}if(a=Ml(e,t,i,n),a!==null)return We(a,e,n),xu(a,t,n),!0}return!1}function dr(e,t,a,n){if(n={lane:2,revertLane:Pr(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mo(e)){if(t)throw Error(c(479))}else t=Ml(e,a,n,2),t!==null&&We(t,e,2)}function mo(e){var t=e.alternate;return e===G||t!==null&&t===G}function Cu(e,t){yn=lo=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function xu(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Rs(e,a)}}var oi={readContext:Be,use:co,useCallback:be,useContext:be,useEffect:be,useImperativeHandle:be,useLayoutEffect:be,useInsertionEffect:be,useMemo:be,useReducer:be,useRef:be,useState:be,useDebugValue:be,useDeferredValue:be,useTransition:be,useSyncExternalStore:be,useId:be,useHostTransitionStatus:be,useFormState:be,useActionState:be,useOptimistic:be,useMemoCache:be,useCacheRefresh:be};oi.useEffectEvent=be;var Tu={readContext:Be,use:co,useCallback:function(e,t){return Pe().memoizedState=[e,t===void 0?null:t],e},useContext:Be,useEffect:su,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,fo(4194308,4,fu.bind(null,t,e),a)},useLayoutEffect:function(e,t){return fo(4194308,4,e,t)},useInsertionEffect:function(e,t){fo(4,2,e,t)},useMemo:function(e,t){var a=Pe();t=t===void 0?null:t;var n=e();if(Va){Wt(!0);try{e()}finally{Wt(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=Pe();if(a!==void 0){var i=a(t);if(Va){Wt(!0);try{a(t)}finally{Wt(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=cm.bind(null,G,e),[n.memoizedState,e]},useRef:function(e){var t=Pe();return e={current:e},t.memoizedState=e},useState:function(e){e=ir(e);var t=e.queue,a=Au.bind(null,G,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:rr,useDeferredValue:function(e,t){var a=Pe();return sr(a,e,t)},useTransition:function(){var e=ir(!1);return e=yu.bind(null,G,e.queue,!0,!1),Pe().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=G,i=Pe();if($){if(a===void 0)throw Error(c(407));a=a()}else{if(a=t(),he===null)throw Error(c(349));(Z&127)!==0||Jc(n,t,a)}i.memoizedState=a;var o={value:a,getSnapshot:t};return i.queue=o,su(Qc.bind(null,n,o,e),[e]),n.flags|=2048,bn(9,{destroy:void 0},Yc.bind(null,n,o,a,t),null),a},useId:function(){var e=Pe(),t=he.identifierPrefix;if($){var a=Rt,n=Mt;a=(n&~(1<<32-tt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ro++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=am++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:ur,useFormState:nu,useActionState:nu,useOptimistic:function(e){var t=Pe();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=dr.bind(null,G,!0,a),a.dispatch=t,[e,t]},useMemoCache:tr,useCacheRefresh:function(){return Pe().memoizedState=sm.bind(null,G)},useEffectEvent:function(e){var t=Pe(),a={impl:e};return t.memoizedState=a,function(){if((ne&2)!==0)throw Error(c(440));return a.impl.apply(void 0,arguments)}}},fr={readContext:Be,use:co,useCallback:mu,useContext:Be,useEffect:lr,useImperativeHandle:pu,useInsertionEffect:uu,useLayoutEffect:du,useMemo:hu,useReducer:uo,useRef:ru,useState:function(){return uo(Vt)},useDebugValue:rr,useDeferredValue:function(e,t){var a=xe();return gu(a,de.memoizedState,e,t)},useTransition:function(){var e=uo(Vt)[0],t=xe().memoizedState;return[typeof e=="boolean"?e:ni(e),t]},useSyncExternalStore:Fc,useId:Su,useHostTransitionStatus:ur,useFormState:iu,useActionState:iu,useOptimistic:function(e,t){var a=xe();return Zc(a,de,e,t)},useMemoCache:tr,useCacheRefresh:wu};fr.useEffectEvent=cu;var Eu={readContext:Be,use:co,useCallback:mu,useContext:Be,useEffect:lr,useImperativeHandle:pu,useInsertionEffect:uu,useLayoutEffect:du,useMemo:hu,useReducer:nr,useRef:ru,useState:function(){return nr(Vt)},useDebugValue:rr,useDeferredValue:function(e,t){var a=xe();return de===null?sr(a,e,t):gu(a,de.memoizedState,e,t)},useTransition:function(){var e=nr(Vt)[0],t=xe().memoizedState;return[typeof e=="boolean"?e:ni(e),t]},useSyncExternalStore:Fc,useId:Su,useHostTransitionStatus:ur,useFormState:lu,useActionState:lu,useOptimistic:function(e,t){var a=xe();return de!==null?Zc(a,de,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:tr,useCacheRefresh:wu};Eu.useEffectEvent=cu;function pr(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:L({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var mr={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=st(),i=la(n);i.payload=t,a!=null&&(i.callback=a),t=ra(e,i,n),t!==null&&(We(t,e,n),$n(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=st(),i=la(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=ra(e,i,n),t!==null&&(We(t,e,n),$n(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=st(),n=la(a);n.tag=2,t!=null&&(n.callback=t),t=ra(e,n,a),t!==null&&(We(t,e,a),$n(t,e,a))}};function Nu(e,t,a,n,i,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,o,l):t.prototype&&t.prototype.isPureReactComponent?!Fn(a,n)||!Fn(i,o):!0}function Mu(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&mr.enqueueReplaceState(t,t.state,null)}function Ia(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=L({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function Ru(e){Fi(e)}function ku(e){console.error(e)}function Du(e){Fi(e)}function ho(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Uu(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function hr(e,t,a){return a=la(a),a.tag=3,a.payload={element:null},a.callback=function(){ho(e,t)},a}function Ou(e){return e=la(e),e.tag=3,e}function _u(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var o=n.value;e.payload=function(){return i(o)},e.callback=function(){Uu(t,a,n)}}var l=a.stateNode;l!==null&&typeof l.componentDidCatch=="function"&&(e.callback=function(){Uu(t,a,n),typeof i!="function"&&(pa===null?pa=new Set([this]):pa.add(this));var r=n.stack;this.componentDidCatch(n.value,{componentStack:r!==null?r:""})})}function um(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&dn(t,a,i,!0),a=it.current,a!==null){switch(a.tag){case 31:case 13:return vt===null?No():a.alternate===null&&Se===0&&(Se=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===to?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),qr(e,n,i)),!1;case 22:return a.flags|=65536,n===to?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),qr(e,n,i)),!1}throw Error(c(435,a.tag))}return qr(e,n,i),No(),!1}if($)return t=it.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==_l&&(e=Error(c(422),{cause:n}),Qn(mt(e,a)))):(n!==_l&&(t=Error(c(423),{cause:n}),Qn(mt(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=mt(n,a),i=hr(e.stateNode,n,i),Fl(e,i),Se!==4&&(Se=2)),!1;var o=Error(c(520),{cause:n});if(o=mt(o,a),pi===null?pi=[o]:pi.push(o),Se!==4&&(Se=2),t===null)return!0;n=mt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=hr(a.stateNode,n,e),Fl(a,e),!1;case 1:if(t=a.type,o=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(pa===null||!pa.has(o))))return a.flags|=65536,i&=-i,a.lanes|=i,i=Ou(i),_u(i,e,a,n),Fl(a,i),!1}a=a.return}while(a!==null);return!1}var gr=Error(c(461)),Me=!1;function He(e,t,a,n){t.child=e===null?Lc(t,null,a,n):qa(t,e.child,a,n)}function zu(e,t,a,n,i){a=a.render;var o=t.ref;if("ref"in n){var l={};for(var r in n)r!=="ref"&&(l[r]=n[r])}else l=n;return Ba(t),n=Zl(e,t,a,l,o,i),r=Wl(),e!==null&&!Me?($l(e,t,i),It(e,t,i)):($&&r&&Ul(t),t.flags|=1,He(e,t,n,i),t.child)}function Bu(e,t,a,n,i){if(e===null){var o=a.type;return typeof o=="function"&&!Rl(o)&&o.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=o,Hu(e,t,o,n,i)):(e=Ki(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!xr(e,i)){var l=o.memoizedProps;if(a=a.compare,a=a!==null?a:Fn,a(l,n)&&e.ref===t.ref)return It(e,t,i)}return t.flags|=1,e=Bt(o,n),e.ref=t.ref,e.return=t,t.child=e}function Hu(e,t,a,n,i){if(e!==null){var o=e.memoizedProps;if(Fn(o,n)&&e.ref===t.ref)if(Me=!1,t.pendingProps=n=o,xr(e,i))(e.flags&131072)!==0&&(Me=!0);else return t.lanes=e.lanes,It(e,t,i)}return yr(e,t,a,n,i)}function Lu(e,t,a,n){var i=n.children,o=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(o=o!==null?o.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~o}else n=0,t.child=null;return ju(e,t,o,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&$i(t,o!==null?o.cachePool:null),o!==null?Vc(t,o):Yl(),Ic(t);else return n=t.lanes=536870912,ju(e,t,o!==null?o.baseLanes|a:a,a,n)}else o!==null?($i(t,o.cachePool),Vc(t,o),ca(),t.memoizedState=null):(e!==null&&$i(t,null),Yl(),ca());return He(e,t,i,a),t.child}function li(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ju(e,t,a,n,i){var o=Vl();return o=o===null?null:{parent:Ee._currentValue,pool:o},t.memoizedState={baseLanes:a,cachePool:o},e!==null&&$i(t,null),Yl(),Ic(t),e!==null&&dn(e,t,n,!0),t.childLanes=i,null}function go(e,t){return t=vo({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function qu(e,t,a){return qa(t,e.child,null,a),e=go(t,t.pendingProps),e.flags|=2,ot(t),t.memoizedState=null,e}function dm(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if($){if(n.mode==="hidden")return e=go(t,n),t.lanes=536870912,li(null,e);if(Kl(t),(e=ge)?(e=Wd(e,yt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta!==null?{id:Mt,overflow:Rt}:null,retryLane:536870912,hydrationErrors:null},a=Cc(e),a.return=t,t.child=a,ze=t,ge=null)):e=null,e===null)throw na(t);return t.lanes=536870912,null}return go(t,n)}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(Kl(t),i)if(t.flags&256)t.flags&=-257,t=qu(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(c(558));else if(Me||dn(e,t,a,!1),i=(a&e.childLanes)!==0,Me||i){if(n=he,n!==null&&(l=ks(n,a),l!==0&&l!==o.retryLane))throw o.retryLane=l,Ua(e,l),We(n,e,l),gr;No(),t=qu(e,t,a)}else e=o.treeContext,ge=bt(l.nextSibling),ze=t,$=!0,aa=null,yt=!1,e!==null&&Ec(t,e),t=go(t,n),t.flags|=4096;return t}return e=Bt(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function yo(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function yr(e,t,a,n,i){return Ba(t),a=Zl(e,t,a,n,void 0,i),n=Wl(),e!==null&&!Me?($l(e,t,i),It(e,t,i)):($&&n&&Ul(t),t.flags|=1,He(e,t,a,i),t.child)}function Vu(e,t,a,n,i,o){return Ba(t),t.updateQueue=null,a=Gc(t,n,a,i),Pc(e),n=Wl(),e!==null&&!Me?($l(e,t,o),It(e,t,o)):($&&n&&Ul(t),t.flags|=1,He(e,t,a,o),t.child)}function Iu(e,t,a,n,i){if(Ba(t),t.stateNode===null){var o=rn,l=a.contextType;typeof l=="object"&&l!==null&&(o=Be(l)),o=new a(n,o),t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=mr,t.stateNode=o,o._reactInternals=t,o=t.stateNode,o.props=n,o.state=t.memoizedState,o.refs={},Pl(t),l=a.contextType,o.context=typeof l=="object"&&l!==null?Be(l):rn,o.state=t.memoizedState,l=a.getDerivedStateFromProps,typeof l=="function"&&(pr(t,a,l,n),o.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(l=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),l!==o.state&&mr.enqueueReplaceState(o,o.state,null),ti(t,n,o,i),ei(),o.state=t.memoizedState),typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){o=t.stateNode;var r=t.memoizedProps,s=Ia(a,r);o.props=s;var h=o.context,b=a.contextType;l=rn,typeof b=="object"&&b!==null&&(l=Be(b));var A=a.getDerivedStateFromProps;b=typeof A=="function"||typeof o.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,b||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(r||h!==l)&&Mu(t,o,n,l),oa=!1;var g=t.memoizedState;o.state=g,ti(t,n,o,i),ei(),h=t.memoizedState,r||g!==h||oa?(typeof A=="function"&&(pr(t,a,A,n),h=t.memoizedState),(s=oa||Nu(t,a,s,n,g,h,l))?(b||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=h),o.props=n,o.state=h,o.context=l,n=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{o=t.stateNode,Gl(e,t),l=t.memoizedProps,b=Ia(a,l),o.props=b,A=t.pendingProps,g=o.context,h=a.contextType,s=rn,typeof h=="object"&&h!==null&&(s=Be(h)),r=a.getDerivedStateFromProps,(h=typeof r=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==A||g!==s)&&Mu(t,o,n,s),oa=!1,g=t.memoizedState,o.state=g,ti(t,n,o,i),ei();var v=t.memoizedState;l!==A||g!==v||oa||e!==null&&e.dependencies!==null&&Zi(e.dependencies)?(typeof r=="function"&&(pr(t,a,r,n),v=t.memoizedState),(b=oa||Nu(t,a,b,n,g,v,s)||e!==null&&e.dependencies!==null&&Zi(e.dependencies))?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,v,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,v,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=v),o.props=n,o.state=v,o.context=s,n=b):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),n=!1)}return o=n,yo(e,t),n=(t.flags&128)!==0,o||n?(o=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:o.render(),t.flags|=1,e!==null&&n?(t.child=qa(t,e.child,null,i),t.child=qa(t,null,a,i)):He(e,t,a,i),t.memoizedState=o.state,e=t.child):e=It(e,t,i),e}function Pu(e,t,a,n){return _a(),t.flags|=256,He(e,t,a,n),t.child}var vr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function br(e){return{baseLanes:e,cachePool:Uc()}}function Sr(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=rt),e}function Gu(e,t,a){var n=t.pendingProps,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(Ce.current&2)!==0),l&&(i=!0,t.flags&=-129),l=(t.flags&32)!==0,t.flags&=-33,e===null){if($){if(i?sa(t):ca(),(e=ge)?(e=Wd(e,yt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta!==null?{id:Mt,overflow:Rt}:null,retryLane:536870912,hydrationErrors:null},a=Cc(e),a.return=t,t.child=a,ze=t,ge=null)):e=null,e===null)throw na(t);return as(e)?t.lanes=32:t.lanes=536870912,null}var r=n.children;return n=n.fallback,i?(ca(),i=t.mode,r=vo({mode:"hidden",children:r},i),n=Oa(n,i,a,null),r.return=t,n.return=t,r.sibling=n,t.child=r,n=t.child,n.memoizedState=br(a),n.childLanes=Sr(e,l,a),t.memoizedState=vr,li(null,n)):(sa(t),wr(t,r))}var s=e.memoizedState;if(s!==null&&(r=s.dehydrated,r!==null)){if(o)t.flags&256?(sa(t),t.flags&=-257,t=Ar(e,t,a)):t.memoizedState!==null?(ca(),t.child=e.child,t.flags|=128,t=null):(ca(),r=n.fallback,i=t.mode,n=vo({mode:"visible",children:n.children},i),r=Oa(r,i,a,null),r.flags|=2,n.return=t,r.return=t,n.sibling=r,t.child=n,qa(t,e.child,null,a),n=t.child,n.memoizedState=br(a),n.childLanes=Sr(e,l,a),t.memoizedState=vr,t=li(null,n));else if(sa(t),as(r)){if(l=r.nextSibling&&r.nextSibling.dataset,l)var h=l.dgst;l=h,n=Error(c(419)),n.stack="",n.digest=l,Qn({value:n,source:null,stack:null}),t=Ar(e,t,a)}else if(Me||dn(e,t,a,!1),l=(a&e.childLanes)!==0,Me||l){if(l=he,l!==null&&(n=ks(l,a),n!==0&&n!==s.retryLane))throw s.retryLane=n,Ua(e,n),We(l,e,n),gr;ts(r)||No(),t=Ar(e,t,a)}else ts(r)?(t.flags|=192,t.child=e.child,t=null):(e=s.treeContext,ge=bt(r.nextSibling),ze=t,$=!0,aa=null,yt=!1,e!==null&&Ec(t,e),t=wr(t,n.children),t.flags|=4096);return t}return i?(ca(),r=n.fallback,i=t.mode,s=e.child,h=s.sibling,n=Bt(s,{mode:"hidden",children:n.children}),n.subtreeFlags=s.subtreeFlags&65011712,h!==null?r=Bt(h,r):(r=Oa(r,i,a,null),r.flags|=2),r.return=t,n.return=t,n.sibling=r,t.child=n,li(null,n),n=t.child,r=e.child.memoizedState,r===null?r=br(a):(i=r.cachePool,i!==null?(s=Ee._currentValue,i=i.parent!==s?{parent:s,pool:s}:i):i=Uc(),r={baseLanes:r.baseLanes|a,cachePool:i}),n.memoizedState=r,n.childLanes=Sr(e,l,a),t.memoizedState=vr,li(e.child,n)):(sa(t),a=e.child,e=a.sibling,a=Bt(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(l=t.deletions,l===null?(t.deletions=[e],t.flags|=16):l.push(e)),t.child=a,t.memoizedState=null,a)}function wr(e,t){return t=vo({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function vo(e,t){return e=nt(22,e,null,t),e.lanes=0,e}function Ar(e,t,a){return qa(t,e.child,null,a),e=wr(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fu(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Hl(e.return,t,a)}function Cr(e,t,a,n,i,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=a,l.tailMode=i,l.treeForkCount=o)}function Ju(e,t,a){var n=t.pendingProps,i=n.revealOrder,o=n.tail;n=n.children;var l=Ce.current,r=(l&2)!==0;if(r?(l=l&1|2,t.flags|=128):l&=1,k(Ce,l),He(e,t,n,a),n=$?Yn:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Fu(e,a,t);else if(e.tag===19)Fu(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&oo(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),Cr(t,!1,i,a,o,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&oo(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}Cr(t,!0,a,null,o,n);break;case"together":Cr(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function It(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),fa|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(dn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,a=Bt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Bt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function xr(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Zi(e)))}function fm(e,t,a){switch(t.tag){case 3:Ie(t,t.stateNode.containerInfo),ia(t,Ee,e.memoizedState.cache),_a();break;case 27:case 5:Un(t);break;case 4:Ie(t,t.stateNode.containerInfo);break;case 10:ia(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Kl(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(sa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Gu(e,t,a):(sa(t),e=It(e,t,a),e!==null?e.sibling:null);sa(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(dn(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return Ju(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(Ce,Ce.current),n)break;return null;case 22:return t.lanes=0,Lu(e,t,a,t.pendingProps);case 24:ia(t,Ee,e.memoizedState.cache)}return It(e,t,a)}function Yu(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Me=!0;else{if(!xr(e,a)&&(t.flags&128)===0)return Me=!1,fm(e,t,a);Me=(e.flags&131072)!==0}else Me=!1,$&&(t.flags&1048576)!==0&&Tc(t,Yn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=La(t.elementType),t.type=e,typeof e=="function")Rl(e)?(n=Ia(e,n),t.tag=1,t=Iu(null,t,e,n,a)):(t.tag=0,t=yr(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===Ge){t.tag=11,t=zu(null,t,e,n,a);break e}else if(i===M){t.tag=14,t=Bu(null,t,e,n,a);break e}}throw t=Ut(e)||e,Error(c(306,t,""))}}return t;case 0:return yr(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=Ia(n,t.pendingProps),Iu(e,t,n,i,a);case 3:e:{if(Ie(t,t.stateNode.containerInfo),e===null)throw Error(c(387));n=t.pendingProps;var o=t.memoizedState;i=o.element,Gl(e,t),ti(t,n,null,a);var l=t.memoizedState;if(n=l.cache,ia(t,Ee,n),n!==o.cache&&Ll(t,[Ee],a,!0),ei(),n=l.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:l.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Pu(e,t,n,a);break e}else if(n!==i){i=mt(Error(c(424)),t),Qn(i),t=Pu(e,t,n,a);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,ge=bt(e.firstChild),ze=t,$=!0,aa=null,yt=!0,a=Lc(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(_a(),n===i){t=It(e,t,a);break e}He(e,t,n,a)}t=t.child}return t;case 26:return yo(e,t),e===null?(a=of(t.type,null,t.pendingProps,null))?t.memoizedState=a:$||(a=t.type,e=t.pendingProps,n=_o(Q.current).createElement(a),n[_e]=t,n[Je]=e,Le(n,a,e),Ue(n),t.stateNode=n):t.memoizedState=of(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Un(t),e===null&&$&&(n=t.stateNode=tf(t.type,t.pendingProps,Q.current),ze=t,yt=!0,i=ge,ya(t.type)?(ns=i,ge=bt(n.firstChild)):ge=i),He(e,t,t.pendingProps.children,a),yo(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&$&&((i=n=ge)&&(n=Im(n,t.type,t.pendingProps,yt),n!==null?(t.stateNode=n,ze=t,ge=bt(n.firstChild),yt=!1,i=!0):i=!1),i||na(t)),Un(t),i=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,n=o.children,Wr(i,o)?n=null:l!==null&&Wr(i,l)&&(t.flags|=32),t.memoizedState!==null&&(i=Zl(e,t,nm,null,null,a),wi._currentValue=i),yo(e,t),He(e,t,n,a),t.child;case 6:return e===null&&$&&((e=a=ge)&&(a=Pm(a,t.pendingProps,yt),a!==null?(t.stateNode=a,ze=t,ge=null,e=!0):e=!1),e||na(t)),null;case 13:return Gu(e,t,a);case 4:return Ie(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=qa(t,null,n,a):He(e,t,n,a),t.child;case 11:return zu(e,t,t.type,t.pendingProps,a);case 7:return He(e,t,t.pendingProps,a),t.child;case 8:return He(e,t,t.pendingProps.children,a),t.child;case 12:return He(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,ia(t,t.type,n.value),He(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,Ba(t),i=Be(i),n=n(i),t.flags|=1,He(e,t,n,a),t.child;case 14:return Bu(e,t,t.type,t.pendingProps,a);case 15:return Hu(e,t,t.type,t.pendingProps,a);case 19:return Ju(e,t,a);case 31:return dm(e,t,a);case 22:return Lu(e,t,a,t.pendingProps);case 24:return Ba(t),n=Be(Ee),e===null?(i=Vl(),i===null&&(i=he,o=jl(),i.pooledCache=o,o.refCount++,o!==null&&(i.pooledCacheLanes|=a),i=o),t.memoizedState={parent:n,cache:i},Pl(t),ia(t,Ee,i)):((e.lanes&a)!==0&&(Gl(e,t),ti(t,null,null,a),ei()),i=e.memoizedState,o=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),ia(t,Ee,n)):(n=o.cache,ia(t,Ee,n),n!==i.cache&&Ll(t,[Ee],a,!0))),He(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function Pt(e){e.flags|=4}function Tr(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Sd())e.flags|=8192;else throw ja=to,Il}else e.flags&=-16777217}function Qu(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!uf(t))if(Sd())e.flags|=8192;else throw ja=to,Il}function bo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Ns():536870912,e.lanes|=t,Cn|=t)}function ri(e,t){if(!$)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function pm(e,t,a){var n=t.pendingProps;switch(Ol(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(t),null;case 1:return ye(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),jt(Ee),Ae(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(un(t)?Pt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,zl())),ye(t),null;case 26:var i=t.type,o=t.memoizedState;return e===null?(Pt(t),o!==null?(ye(t),Qu(t,o)):(ye(t),Tr(t,i,null,n,a))):o?o!==e.memoizedState?(Pt(t),ye(t),Qu(t,o)):(ye(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Pt(t),ye(t),Tr(t,i,e,n,a)),null;case 27:if(Ri(t),a=Q.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Pt(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return ye(t),null}e=z.current,un(t)?Nc(t):(e=tf(i,n,a),t.stateNode=e,Pt(t))}return ye(t),null;case 5:if(Ri(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Pt(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return ye(t),null}if(o=z.current,un(t))Nc(t);else{var l=_o(Q.current);switch(o){case 1:o=l.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:o=l.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":o=l.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":o=l.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":o=l.createElement("div"),o.innerHTML="<script><\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof n.is=="string"?l.createElement("select",{is:n.is}):l.createElement("select"),n.multiple?o.multiple=!0:n.size&&(o.size=n.size);break;default:o=typeof n.is=="string"?l.createElement(i,{is:n.is}):l.createElement(i)}}o[_e]=t,o[Je]=n;e:for(l=t.child;l!==null;){if(l.tag===5||l.tag===6)o.appendChild(l.stateNode);else if(l.tag!==4&&l.tag!==27&&l.child!==null){l.child.return=l,l=l.child;continue}if(l===t)break e;for(;l.sibling===null;){if(l.return===null||l.return===t)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}t.stateNode=o;e:switch(Le(o,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Pt(t)}}return ye(t),Tr(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Pt(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(c(166));if(e=Q.current,un(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=ze,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[_e]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Gd(e.nodeValue,a)),e||na(t,!0)}else e=_o(e).createTextNode(n),e[_e]=t,t.stateNode=e}return ye(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=un(t),a!==null){if(e===null){if(!n)throw Error(c(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(557));e[_e]=t}else _a(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ye(t),e=!1}else a=zl(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ot(t),t):(ot(t),null);if((t.flags&128)!==0)throw Error(c(558))}return ye(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=un(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(c(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(c(317));i[_e]=t}else _a(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ye(t),i=!1}else i=zl(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ot(t),t):(ot(t),null)}return ot(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),bo(t,t.updateQueue),ye(t),null);case 4:return Ae(),e===null&&Yr(t.stateNode.containerInfo),ye(t),null;case 10:return jt(t.type),ye(t),null;case 19:if(x(Ce),n=t.memoizedState,n===null)return ye(t),null;if(i=(t.flags&128)!==0,o=n.rendering,o===null)if(i)ri(n,!1);else{if(Se!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=oo(e),o!==null){for(t.flags|=128,ri(n,!1),e=o.updateQueue,t.updateQueue=e,bo(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Ac(a,e),a=a.sibling;return k(Ce,Ce.current&1|2),$&&Ht(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&$e()>xo&&(t.flags|=128,i=!0,ri(n,!1),t.lanes=4194304)}else{if(!i)if(e=oo(o),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,bo(t,e),ri(n,!0),n.tail===null&&n.tailMode==="hidden"&&!o.alternate&&!$)return ye(t),null}else 2*$e()-n.renderingStartTime>xo&&a!==536870912&&(t.flags|=128,i=!0,ri(n,!1),t.lanes=4194304);n.isBackwards?(o.sibling=t.child,t.child=o):(e=n.last,e!==null?e.sibling=o:t.child=o,n.last=o)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=$e(),e.sibling=null,a=Ce.current,k(Ce,i?a&1|2:a&1),$&&Ht(t,n.treeForkCount),e):(ye(t),null);case 22:case 23:return ot(t),Ql(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(ye(t),t.subtreeFlags&6&&(t.flags|=8192)):ye(t),a=t.updateQueue,a!==null&&bo(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&x(Ha),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),jt(Ee),ye(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function mm(e,t){switch(Ol(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return jt(Ee),Ae(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ri(t),null;case 31:if(t.memoizedState!==null){if(ot(t),t.alternate===null)throw Error(c(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ot(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return x(Ce),null;case 4:return Ae(),null;case 10:return jt(t.type),null;case 22:case 23:return ot(t),Ql(),e!==null&&x(Ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return jt(Ee),null;case 25:return null;default:return null}}function Ku(e,t){switch(Ol(t),t.tag){case 3:jt(Ee),Ae();break;case 26:case 27:case 5:Ri(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&ot(t);break;case 13:ot(t);break;case 19:x(Ce);break;case 10:jt(t.type);break;case 22:case 23:ot(t),Ql(),e!==null&&x(Ha);break;case 24:jt(Ee)}}function si(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var o=a.create,l=a.inst;n=o(),l.destroy=n}a=a.next}while(a!==i)}}catch(r){re(t,t.return,r)}}function ua(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var o=i.next;n=o;do{if((n.tag&e)===e){var l=n.inst,r=l.destroy;if(r!==void 0){l.destroy=void 0,i=t;var s=a,h=r;try{h()}catch(b){re(i,s,b)}}}n=n.next}while(n!==o)}}catch(b){re(t,t.return,b)}}function Xu(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{qc(t,a)}catch(n){re(e,e.return,n)}}}function Zu(e,t,a){a.props=Ia(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){re(e,t,n)}}function ci(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){re(e,t,i)}}function kt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){re(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){re(e,t,i)}else a.current=null}function Wu(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){re(e,e.return,i)}}function Er(e,t,a){try{var n=e.stateNode;Bm(n,e.type,a,t),n[Je]=t}catch(i){re(e,e.return,i)}}function $u(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ya(e.type)||e.tag===4}function Nr(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||$u(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ya(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Mr(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=_t));else if(n!==4&&(n===27&&ya(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Mr(e,t,a),e=e.sibling;e!==null;)Mr(e,t,a),e=e.sibling}function So(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&ya(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(So(e,t,a),e=e.sibling;e!==null;)So(e,t,a),e=e.sibling}function ed(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Le(t,n,a),t[_e]=e,t[Je]=a}catch(o){re(e,e.return,o)}}var Gt=!1,Re=!1,Rr=!1,td=typeof WeakSet=="function"?WeakSet:Set,Oe=null;function hm(e,t){if(e=e.containerInfo,Xr=Vo,e=pc(e),Al(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{a.nodeType,o.nodeType}catch{a=null;break e}var l=0,r=-1,s=-1,h=0,b=0,A=e,g=null;t:for(;;){for(var v;A!==a||i!==0&&A.nodeType!==3||(r=l+i),A!==o||n!==0&&A.nodeType!==3||(s=l+n),A.nodeType===3&&(l+=A.nodeValue.length),(v=A.firstChild)!==null;)g=A,A=v;for(;;){if(A===e)break t;if(g===a&&++h===i&&(r=l),g===o&&++b===n&&(s=l),(v=A.nextSibling)!==null)break;A=g,g=A.parentNode}A=v}a=r===-1||s===-1?null:{start:r,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for(Zr={focusedElem:e,selectionRange:a},Vo=!1,Oe=t;Oe!==null;)if(t=Oe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Oe=e;else for(;Oe!==null;){switch(t=Oe,o=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&o!==null){e=void 0,a=t,i=o.memoizedProps,o=o.memoizedState,n=a.stateNode;try{var _=Ia(a.type,i);e=n.getSnapshotBeforeUpdate(_,o),n.__reactInternalSnapshotBeforeUpdate=e}catch(q){re(a,a.return,q)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)es(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":es(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,Oe=e;break}Oe=t.return}}function ad(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Jt(e,a),n&4&&si(5,a);break;case 1:if(Jt(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(l){re(a,a.return,l)}else{var i=Ia(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(l){re(a,a.return,l)}}n&64&&Xu(a),n&512&&ci(a,a.return);break;case 3:if(Jt(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{qc(e,t)}catch(l){re(a,a.return,l)}}break;case 27:t===null&&n&4&&ed(a);case 26:case 5:Jt(e,a),t===null&&n&4&&Wu(a),n&512&&ci(a,a.return);break;case 12:Jt(e,a);break;case 31:Jt(e,a),n&4&&od(e,a);break;case 13:Jt(e,a),n&4&&ld(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=xm.bind(null,a),Gm(e,a))));break;case 22:if(n=a.memoizedState!==null||Gt,!n){t=t!==null&&t.memoizedState!==null||Re,i=Gt;var o=Re;Gt=n,(Re=t)&&!o?Yt(e,a,(a.subtreeFlags&8772)!==0):Jt(e,a),Gt=i,Re=o}break;case 30:break;default:Jt(e,a)}}function nd(e){var t=e.alternate;t!==null&&(e.alternate=null,nd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ol(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ve=null,Qe=!1;function Ft(e,t,a){for(a=a.child;a!==null;)id(e,t,a),a=a.sibling}function id(e,t,a){if(et&&typeof et.onCommitFiberUnmount=="function")try{et.onCommitFiberUnmount(On,a)}catch{}switch(a.tag){case 26:Re||kt(a,t),Ft(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Re||kt(a,t);var n=ve,i=Qe;ya(a.type)&&(ve=a.stateNode,Qe=!1),Ft(e,t,a),vi(a.stateNode),ve=n,Qe=i;break;case 5:Re||kt(a,t);case 6:if(n=ve,i=Qe,ve=null,Ft(e,t,a),ve=n,Qe=i,ve!==null)if(Qe)try{(ve.nodeType===9?ve.body:ve.nodeName==="HTML"?ve.ownerDocument.body:ve).removeChild(a.stateNode)}catch(o){re(a,t,o)}else try{ve.removeChild(a.stateNode)}catch(o){re(a,t,o)}break;case 18:ve!==null&&(Qe?(e=ve,Xd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Dn(e)):Xd(ve,a.stateNode));break;case 4:n=ve,i=Qe,ve=a.stateNode.containerInfo,Qe=!0,Ft(e,t,a),ve=n,Qe=i;break;case 0:case 11:case 14:case 15:ua(2,a,t),Re||ua(4,a,t),Ft(e,t,a);break;case 1:Re||(kt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&Zu(a,t,n)),Ft(e,t,a);break;case 21:Ft(e,t,a);break;case 22:Re=(n=Re)||a.memoizedState!==null,Ft(e,t,a),Re=n;break;default:Ft(e,t,a)}}function od(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Dn(e)}catch(a){re(t,t.return,a)}}}function ld(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Dn(e)}catch(a){re(t,t.return,a)}}function gm(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new td),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new td),t;default:throw Error(c(435,e.tag))}}function wo(e,t){var a=gm(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=Tm.bind(null,e,n);n.then(i,i)}})}function Ke(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],o=e,l=t,r=l;e:for(;r!==null;){switch(r.tag){case 27:if(ya(r.type)){ve=r.stateNode,Qe=!1;break e}break;case 5:ve=r.stateNode,Qe=!1;break e;case 3:case 4:ve=r.stateNode.containerInfo,Qe=!0;break e}r=r.return}if(ve===null)throw Error(c(160));id(o,l,i),ve=null,Qe=!1,o=i.alternate,o!==null&&(o.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)rd(t,e),t=t.sibling}var xt=null;function rd(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ke(t,e),Xe(e),n&4&&(ua(3,e,e.return),si(3,e),ua(5,e,e.return));break;case 1:Ke(t,e),Xe(e),n&512&&(Re||a===null||kt(a,a.return)),n&64&&Gt&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=xt;if(Ke(t,e),Xe(e),n&512&&(Re||a===null||kt(a,a.return)),n&4){var o=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":o=i.getElementsByTagName("title")[0],(!o||o[Bn]||o[_e]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=i.createElement(n),i.head.insertBefore(o,i.querySelector("head > title"))),Le(o,n,a),o[_e]=e,Ue(o),n=o;break e;case"link":var l=sf("link","href",i).get(n+(a.href||""));if(l){for(var r=0;r<l.length;r++)if(o=l[r],o.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&o.getAttribute("rel")===(a.rel==null?null:a.rel)&&o.getAttribute("title")===(a.title==null?null:a.title)&&o.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){l.splice(r,1);break t}}o=i.createElement(n),Le(o,n,a),i.head.appendChild(o);break;case"meta":if(l=sf("meta","content",i).get(n+(a.content||""))){for(r=0;r<l.length;r++)if(o=l[r],o.getAttribute("content")===(a.content==null?null:""+a.content)&&o.getAttribute("name")===(a.name==null?null:a.name)&&o.getAttribute("property")===(a.property==null?null:a.property)&&o.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&o.getAttribute("charset")===(a.charSet==null?null:a.charSet)){l.splice(r,1);break t}}o=i.createElement(n),Le(o,n,a),i.head.appendChild(o);break;default:throw Error(c(468,n))}o[_e]=e,Ue(o),n=o}e.stateNode=n}else cf(i,e.type,e.stateNode);else e.stateNode=rf(i,n,e.memoizedProps);else o!==n?(o===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):o.count--,n===null?cf(i,e.type,e.stateNode):rf(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Er(e,e.memoizedProps,a.memoizedProps)}break;case 27:Ke(t,e),Xe(e),n&512&&(Re||a===null||kt(a,a.return)),a!==null&&n&4&&Er(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Ke(t,e),Xe(e),n&512&&(Re||a===null||kt(a,a.return)),e.flags&32){i=e.stateNode;try{$a(i,"")}catch(_){re(e,e.return,_)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,Er(e,i,a!==null?a.memoizedProps:i)),n&1024&&(Rr=!0);break;case 6:if(Ke(t,e),Xe(e),n&4){if(e.stateNode===null)throw Error(c(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(_){re(e,e.return,_)}}break;case 3:if(Ho=null,i=xt,xt=zo(t.containerInfo),Ke(t,e),xt=i,Xe(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{Dn(t.containerInfo)}catch(_){re(e,e.return,_)}Rr&&(Rr=!1,sd(e));break;case 4:n=xt,xt=zo(e.stateNode.containerInfo),Ke(t,e),Xe(e),xt=n;break;case 12:Ke(t,e),Xe(e);break;case 31:Ke(t,e),Xe(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,wo(e,n)));break;case 13:Ke(t,e),Xe(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Co=$e()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,wo(e,n)));break;case 22:i=e.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,h=Gt,b=Re;if(Gt=h||i,Re=b||s,Ke(t,e),Re=b,Gt=h,Xe(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||s||Gt||Re||Pa(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){s=a=t;try{if(o=s.stateNode,i)l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none";else{r=s.stateNode;var A=s.memoizedProps.style,g=A!=null&&A.hasOwnProperty("display")?A.display:null;r.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(_){re(s,s.return,_)}}}else if(t.tag===6){if(a===null){s=t;try{s.stateNode.nodeValue=i?"":s.memoizedProps}catch(_){re(s,s.return,_)}}}else if(t.tag===18){if(a===null){s=t;try{var v=s.stateNode;i?Zd(v,!0):Zd(s.stateNode,!1)}catch(_){re(s,s.return,_)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,wo(e,a))));break;case 19:Ke(t,e),Xe(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,wo(e,n)));break;case 30:break;case 21:break;default:Ke(t,e),Xe(e)}}function Xe(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if($u(n)){a=n;break}n=n.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var i=a.stateNode,o=Nr(e);So(e,o,i);break;case 5:var l=a.stateNode;a.flags&32&&($a(l,""),a.flags&=-33);var r=Nr(e);So(e,r,l);break;case 3:case 4:var s=a.stateNode.containerInfo,h=Nr(e);Mr(e,h,s);break;default:throw Error(c(161))}}catch(b){re(e,e.return,b)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function sd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;sd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Jt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ad(e,t.alternate,t),t=t.sibling}function Pa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ua(4,t,t.return),Pa(t);break;case 1:kt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Zu(t,t.return,a),Pa(t);break;case 27:vi(t.stateNode);case 26:case 5:kt(t,t.return),Pa(t);break;case 22:t.memoizedState===null&&Pa(t);break;case 30:Pa(t);break;default:Pa(t)}e=e.sibling}}function Yt(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,o=t,l=o.flags;switch(o.tag){case 0:case 11:case 15:Yt(i,o,a),si(4,o);break;case 1:if(Yt(i,o,a),n=o,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(h){re(n,n.return,h)}if(n=o,i=n.updateQueue,i!==null){var r=n.stateNode;try{var s=i.shared.hiddenCallbacks;if(s!==null)for(i.shared.hiddenCallbacks=null,i=0;i<s.length;i++)jc(s[i],r)}catch(h){re(n,n.return,h)}}a&&l&64&&Xu(o),ci(o,o.return);break;case 27:ed(o);case 26:case 5:Yt(i,o,a),a&&n===null&&l&4&&Wu(o),ci(o,o.return);break;case 12:Yt(i,o,a);break;case 31:Yt(i,o,a),a&&l&4&&od(i,o);break;case 13:Yt(i,o,a),a&&l&4&&ld(i,o);break;case 22:o.memoizedState===null&&Yt(i,o,a),ci(o,o.return);break;case 30:break;default:Yt(i,o,a)}t=t.sibling}}function kr(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Kn(a))}function Dr(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Kn(e))}function Tt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)cd(e,t,a,n),t=t.sibling}function cd(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tt(e,t,a,n),i&2048&&si(9,t);break;case 1:Tt(e,t,a,n);break;case 3:Tt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Kn(e)));break;case 12:if(i&2048){Tt(e,t,a,n),e=t.stateNode;try{var o=t.memoizedProps,l=o.id,r=o.onPostCommit;typeof r=="function"&&r(l,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(s){re(t,t.return,s)}}else Tt(e,t,a,n);break;case 31:Tt(e,t,a,n);break;case 13:Tt(e,t,a,n);break;case 23:break;case 22:o=t.stateNode,l=t.alternate,t.memoizedState!==null?o._visibility&2?Tt(e,t,a,n):ui(e,t):o._visibility&2?Tt(e,t,a,n):(o._visibility|=2,Sn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&kr(l,t);break;case 24:Tt(e,t,a,n),i&2048&&Dr(t.alternate,t);break;default:Tt(e,t,a,n)}}function Sn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var o=e,l=t,r=a,s=n,h=l.flags;switch(l.tag){case 0:case 11:case 15:Sn(o,l,r,s,i),si(8,l);break;case 23:break;case 22:var b=l.stateNode;l.memoizedState!==null?b._visibility&2?Sn(o,l,r,s,i):ui(o,l):(b._visibility|=2,Sn(o,l,r,s,i)),i&&h&2048&&kr(l.alternate,l);break;case 24:Sn(o,l,r,s,i),i&&h&2048&&Dr(l.alternate,l);break;default:Sn(o,l,r,s,i)}t=t.sibling}}function ui(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:ui(a,n),i&2048&&kr(n.alternate,n);break;case 24:ui(a,n),i&2048&&Dr(n.alternate,n);break;default:ui(a,n)}t=t.sibling}}var di=8192;function wn(e,t,a){if(e.subtreeFlags&di)for(e=e.child;e!==null;)ud(e,t,a),e=e.sibling}function ud(e,t,a){switch(e.tag){case 26:wn(e,t,a),e.flags&di&&e.memoizedState!==null&&ah(a,xt,e.memoizedState,e.memoizedProps);break;case 5:wn(e,t,a);break;case 3:case 4:var n=xt;xt=zo(e.stateNode.containerInfo),wn(e,t,a),xt=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=di,di=16777216,wn(e,t,a),di=n):wn(e,t,a));break;default:wn(e,t,a)}}function dd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function fi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Oe=n,pd(n,e)}dd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)fd(e),e=e.sibling}function fd(e){switch(e.tag){case 0:case 11:case 15:fi(e),e.flags&2048&&ua(9,e,e.return);break;case 3:fi(e);break;case 12:fi(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ao(e)):fi(e);break;default:fi(e)}}function Ao(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Oe=n,pd(n,e)}dd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ua(8,t,t.return),Ao(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Ao(t));break;default:Ao(t)}e=e.sibling}}function pd(e,t){for(;Oe!==null;){var a=Oe;switch(a.tag){case 0:case 11:case 15:ua(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:Kn(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,Oe=n;else e:for(a=e;Oe!==null;){n=Oe;var i=n.sibling,o=n.return;if(nd(n),n===a){Oe=null;break e}if(i!==null){i.return=o,Oe=i;break e}Oe=o}}}var ym={getCacheForType:function(e){var t=Be(Ee),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return Be(Ee).controller.signal}},vm=typeof WeakMap=="function"?WeakMap:Map,ne=0,he=null,K=null,Z=0,le=0,lt=null,da=!1,An=!1,Ur=!1,Qt=0,Se=0,fa=0,Ga=0,Or=0,rt=0,Cn=0,pi=null,Ze=null,_r=!1,Co=0,md=0,xo=1/0,To=null,pa=null,ke=0,ma=null,xn=null,Kt=0,zr=0,Br=null,hd=null,mi=0,Hr=null;function st(){return(ne&2)!==0&&Z!==0?Z&-Z:S.T!==null?Pr():Ds()}function gd(){if(rt===0)if((Z&536870912)===0||$){var e=Ui;Ui<<=1,(Ui&3932160)===0&&(Ui=262144),rt=e}else rt=536870912;return e=it.current,e!==null&&(e.flags|=32),rt}function We(e,t,a){(e===he&&(le===2||le===9)||e.cancelPendingCommit!==null)&&(Tn(e,0),ha(e,Z,rt,!1)),zn(e,a),((ne&2)===0||e!==he)&&(e===he&&((ne&2)===0&&(Ga|=a),Se===4&&ha(e,Z,rt,!1)),Dt(e))}function yd(e,t,a){if((ne&6)!==0)throw Error(c(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||_n(e,t),i=n?wm(e,t):jr(e,t,!0),o=n;do{if(i===0){An&&!n&&ha(e,t,0,!1);break}else{if(a=e.current.alternate,o&&!bm(a)){i=jr(e,t,!1),o=!1;continue}if(i===2){if(o=t,e.errorRecoveryDisabledLanes&o)var l=0;else l=e.pendingLanes&-536870913,l=l!==0?l:l&536870912?536870912:0;if(l!==0){t=l;e:{var r=e;i=pi;var s=r.current.memoizedState.isDehydrated;if(s&&(Tn(r,l).flags|=256),l=jr(r,l,!1),l!==2){if(Ur&&!s){r.errorRecoveryDisabledLanes|=o,Ga|=o,i=4;break e}o=Ze,Ze=i,o!==null&&(Ze===null?Ze=o:Ze.push.apply(Ze,o))}i=l}if(o=!1,i!==2)continue}}if(i===1){Tn(e,0),ha(e,t,0,!0);break}e:{switch(n=e,o=i,o){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:ha(n,t,rt,!da);break e;case 2:Ze=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(i=Co+300-$e(),10<i)){if(ha(n,t,rt,!da),_i(n,0,!0)!==0)break e;Kt=t,n.timeoutHandle=Qd(vd.bind(null,n,a,Ze,To,_r,t,rt,Ga,Cn,da,o,"Throttled",-0,0),i);break e}vd(n,a,Ze,To,_r,t,rt,Ga,Cn,da,o,null,-0,0)}}break}while(!0);Dt(e)}function vd(e,t,a,n,i,o,l,r,s,h,b,A,g,v){if(e.timeoutHandle=-1,A=t.subtreeFlags,A&8192||(A&16785408)===16785408){A={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:_t},ud(t,o,A);var _=(o&62914560)===o?Co-$e():(o&4194048)===o?md-$e():0;if(_=nh(A,_),_!==null){Kt=o,e.cancelPendingCommit=_(Ed.bind(null,e,t,o,a,n,i,l,r,s,b,A,null,g,v)),ha(e,o,l,!h);return}}Ed(e,t,o,a,n,i,l,r,s)}function bm(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],o=i.getSnapshot;i=i.value;try{if(!at(o(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ha(e,t,a,n){t&=~Or,t&=~Ga,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var o=31-tt(i),l=1<<o;n[o]=-1,i&=~l}a!==0&&Ms(e,a,t)}function Eo(){return(ne&6)===0?(hi(0),!1):!0}function Lr(){if(K!==null){if(le===0)var e=K.return;else e=K,Lt=za=null,er(e),hn=null,Zn=0,e=K;for(;e!==null;)Ku(e.alternate,e),e=e.return;K=null}}function Tn(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,jm(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Kt=0,Lr(),he=e,K=a=Bt(e.current,null),Z=t,le=0,lt=null,da=!1,An=_n(e,t),Ur=!1,Cn=rt=Or=Ga=fa=Se=0,Ze=pi=null,_r=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-tt(n),o=1<<i;t|=e[i],n&=~o}return Qt=t,Ji(),a}function bd(e,t){G=null,S.H=oi,t===mn||t===eo?(t=zc(),le=3):t===Il?(t=zc(),le=4):le=t===gr?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,lt=t,K===null&&(Se=1,ho(e,mt(t,e.current)))}function Sd(){var e=it.current;return e===null?!0:(Z&4194048)===Z?vt===null:(Z&62914560)===Z||(Z&536870912)!==0?e===vt:!1}function wd(){var e=S.H;return S.H=oi,e===null?oi:e}function Ad(){var e=S.A;return S.A=ym,e}function No(){Se=4,da||(Z&4194048)!==Z&&it.current!==null||(An=!0),(fa&134217727)===0&&(Ga&134217727)===0||he===null||ha(he,Z,rt,!1)}function jr(e,t,a){var n=ne;ne|=2;var i=wd(),o=Ad();(he!==e||Z!==t)&&(To=null,Tn(e,t)),t=!1;var l=Se;e:do try{if(le!==0&&K!==null){var r=K,s=lt;switch(le){case 8:Lr(),l=6;break e;case 3:case 2:case 9:case 6:it.current===null&&(t=!0);var h=le;if(le=0,lt=null,En(e,r,s,h),a&&An){l=0;break e}break;default:h=le,le=0,lt=null,En(e,r,s,h)}}Sm(),l=Se;break}catch(b){bd(e,b)}while(!0);return t&&e.shellSuspendCounter++,Lt=za=null,ne=n,S.H=i,S.A=o,K===null&&(he=null,Z=0,Ji()),l}function Sm(){for(;K!==null;)Cd(K)}function wm(e,t){var a=ne;ne|=2;var n=wd(),i=Ad();he!==e||Z!==t?(To=null,xo=$e()+500,Tn(e,t)):An=_n(e,t);e:do try{if(le!==0&&K!==null){t=K;var o=lt;t:switch(le){case 1:le=0,lt=null,En(e,t,o,1);break;case 2:case 9:if(Oc(o)){le=0,lt=null,xd(t);break}t=function(){le!==2&&le!==9||he!==e||(le=7),Dt(e)},o.then(t,t);break e;case 3:le=7;break e;case 4:le=5;break e;case 7:Oc(o)?(le=0,lt=null,xd(t)):(le=0,lt=null,En(e,t,o,7));break;case 5:var l=null;switch(K.tag){case 26:l=K.memoizedState;case 5:case 27:var r=K;if(l?uf(l):r.stateNode.complete){le=0,lt=null;var s=r.sibling;if(s!==null)K=s;else{var h=r.return;h!==null?(K=h,Mo(h)):K=null}break t}}le=0,lt=null,En(e,t,o,5);break;case 6:le=0,lt=null,En(e,t,o,6);break;case 8:Lr(),Se=6;break e;default:throw Error(c(462))}}Am();break}catch(b){bd(e,b)}while(!0);return Lt=za=null,S.H=n,S.A=i,ne=a,K!==null?0:(he=null,Z=0,Ji(),Se)}function Am(){for(;K!==null&&!Ff();)Cd(K)}function Cd(e){var t=Yu(e.alternate,e,Qt);e.memoizedProps=e.pendingProps,t===null?Mo(e):K=t}function xd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Vu(a,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=Vu(a,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:er(t);default:Ku(a,t),t=K=Ac(t,Qt),t=Yu(a,t,Qt)}e.memoizedProps=e.pendingProps,t===null?Mo(e):K=t}function En(e,t,a,n){Lt=za=null,er(t),hn=null,Zn=0;var i=t.return;try{if(um(e,i,t,a,Z)){Se=1,ho(e,mt(a,e.current)),K=null;return}}catch(o){if(i!==null)throw K=i,o;Se=1,ho(e,mt(a,e.current)),K=null;return}t.flags&32768?($||n===1?e=!0:An||(Z&536870912)!==0?e=!1:(da=e=!0,(n===2||n===9||n===3||n===6)&&(n=it.current,n!==null&&n.tag===13&&(n.flags|=16384))),Td(t,e)):Mo(t)}function Mo(e){var t=e;do{if((t.flags&32768)!==0){Td(t,da);return}e=t.return;var a=pm(t.alternate,t,Qt);if(a!==null){K=a;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Se===0&&(Se=5)}function Td(e,t){do{var a=mm(e.alternate,e);if(a!==null){a.flags&=32767,K=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=a}while(e!==null);Se=6,K=null}function Ed(e,t,a,n,i,o,l,r,s){e.cancelPendingCommit=null;do Ro();while(ke!==0);if((ne&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(o=t.lanes|t.childLanes,o|=Nl,tp(e,a,o,l,r,s),e===he&&(K=he=null,Z=0),xn=t,ma=e,Kt=a,zr=o,Br=i,hd=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Em(ki,function(){return Dd(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=S.T,S.T=null,i=R.p,R.p=2,l=ne,ne|=4;try{hm(e,t,a)}finally{ne=l,R.p=i,S.T=n}}ke=1,Nd(),Md(),Rd()}}function Nd(){if(ke===1){ke=0;var e=ma,t=xn,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=S.T,S.T=null;var n=R.p;R.p=2;var i=ne;ne|=4;try{rd(t,e);var o=Zr,l=pc(e.containerInfo),r=o.focusedElem,s=o.selectionRange;if(l!==r&&r&&r.ownerDocument&&fc(r.ownerDocument.documentElement,r)){if(s!==null&&Al(r)){var h=s.start,b=s.end;if(b===void 0&&(b=h),"selectionStart"in r)r.selectionStart=h,r.selectionEnd=Math.min(b,r.value.length);else{var A=r.ownerDocument||document,g=A&&A.defaultView||window;if(g.getSelection){var v=g.getSelection(),_=r.textContent.length,q=Math.min(s.start,_),pe=s.end===void 0?q:Math.min(s.end,_);!v.extend&&q>pe&&(l=pe,pe=q,q=l);var f=dc(r,q),u=dc(r,pe);if(f&&u&&(v.rangeCount!==1||v.anchorNode!==f.node||v.anchorOffset!==f.offset||v.focusNode!==u.node||v.focusOffset!==u.offset)){var m=A.createRange();m.setStart(f.node,f.offset),v.removeAllRanges(),q>pe?(v.addRange(m),v.extend(u.node,u.offset)):(m.setEnd(u.node,u.offset),v.addRange(m))}}}}for(A=[],v=r;v=v.parentNode;)v.nodeType===1&&A.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<A.length;r++){var w=A[r];w.element.scrollLeft=w.left,w.element.scrollTop=w.top}}Vo=!!Xr,Zr=Xr=null}finally{ne=i,R.p=n,S.T=a}}e.current=t,ke=2}}function Md(){if(ke===2){ke=0;var e=ma,t=xn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=S.T,S.T=null;var n=R.p;R.p=2;var i=ne;ne|=4;try{ad(e,t.alternate,t)}finally{ne=i,R.p=n,S.T=a}}ke=3}}function Rd(){if(ke===4||ke===3){ke=0,Jf();var e=ma,t=xn,a=Kt,n=hd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?ke=5:(ke=0,xn=ma=null,kd(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(pa=null),nl(a),t=t.stateNode,et&&typeof et.onCommitFiberRoot=="function")try{et.onCommitFiberRoot(On,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=S.T,i=R.p,R.p=2,S.T=null;try{for(var o=e.onRecoverableError,l=0;l<n.length;l++){var r=n[l];o(r.value,{componentStack:r.stack})}}finally{S.T=t,R.p=i}}(Kt&3)!==0&&Ro(),Dt(e),i=e.pendingLanes,(a&261930)!==0&&(i&42)!==0?e===Hr?mi++:(mi=0,Hr=e):mi=0,hi(0)}}function kd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Kn(t)))}function Ro(){return Nd(),Md(),Rd(),Dd()}function Dd(){if(ke!==5)return!1;var e=ma,t=zr;zr=0;var a=nl(Kt),n=S.T,i=R.p;try{R.p=32>a?32:a,S.T=null,a=Br,Br=null;var o=ma,l=Kt;if(ke=0,xn=ma=null,Kt=0,(ne&6)!==0)throw Error(c(331));var r=ne;if(ne|=4,fd(o.current),cd(o,o.current,l,a),ne=r,hi(0,!1),et&&typeof et.onPostCommitFiberRoot=="function")try{et.onPostCommitFiberRoot(On,o)}catch{}return!0}finally{R.p=i,S.T=n,kd(e,t)}}function Ud(e,t,a){t=mt(a,t),t=hr(e.stateNode,t,2),e=ra(e,t,2),e!==null&&(zn(e,2),Dt(e))}function re(e,t,a){if(e.tag===3)Ud(e,e,a);else for(;t!==null;){if(t.tag===3){Ud(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(pa===null||!pa.has(n))){e=mt(a,e),a=Ou(2),n=ra(t,a,2),n!==null&&(_u(a,n,t,e),zn(n,2),Dt(n));break}}t=t.return}}function qr(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new vm;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(Ur=!0,i.add(a),e=Cm.bind(null,e,t,a),t.then(e,e))}function Cm(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,he===e&&(Z&a)===a&&(Se===4||Se===3&&(Z&62914560)===Z&&300>$e()-Co?(ne&2)===0&&Tn(e,0):Or|=a,Cn===Z&&(Cn=0)),Dt(e)}function Od(e,t){t===0&&(t=Ns()),e=Ua(e,t),e!==null&&(zn(e,t),Dt(e))}function xm(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Od(e,a)}function Tm(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(c(314))}n!==null&&n.delete(t),Od(e,a)}function Em(e,t){return $o(e,t)}var ko=null,Nn=null,Vr=!1,Do=!1,Ir=!1,ga=0;function Dt(e){e!==Nn&&e.next===null&&(Nn===null?ko=Nn=e:Nn=Nn.next=e),Do=!0,Vr||(Vr=!0,Mm())}function hi(e,t){if(!Ir&&Do){Ir=!0;do for(var a=!1,n=ko;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var o=0;else{var l=n.suspendedLanes,r=n.pingedLanes;o=(1<<31-tt(42|e)+1)-1,o&=i&~(l&~r),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(a=!0,Hd(n,o))}else o=Z,o=_i(n,n===he?o:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(o&3)===0||_n(n,o)||(a=!0,Hd(n,o));n=n.next}while(a);Ir=!1}}function Nm(){_d()}function _d(){Do=Vr=!1;var e=0;ga!==0&&Lm()&&(e=ga);for(var t=$e(),a=null,n=ko;n!==null;){var i=n.next,o=zd(n,t);o===0?(n.next=null,a===null?ko=i:a.next=i,i===null&&(Nn=a)):(a=n,(e!==0||(o&3)!==0)&&(Do=!0)),n=i}ke!==0&&ke!==5||hi(e),ga!==0&&(ga=0)}function zd(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes&-62914561;0<o;){var l=31-tt(o),r=1<<l,s=i[l];s===-1?((r&a)===0||(r&n)!==0)&&(i[l]=ep(r,t)):s<=t&&(e.expiredLanes|=r),o&=~r}if(t=he,a=Z,a=_i(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(le===2||le===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&el(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||_n(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&el(n),nl(a)){case 2:case 8:a=Ts;break;case 32:a=ki;break;case 268435456:a=Es;break;default:a=ki}return n=Bd.bind(null,e),a=$o(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&el(n),e.callbackPriority=2,e.callbackNode=null,2}function Bd(e,t){if(ke!==0&&ke!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Ro()&&e.callbackNode!==a)return null;var n=Z;return n=_i(e,e===he?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(yd(e,n,t),zd(e,$e()),e.callbackNode!=null&&e.callbackNode===a?Bd.bind(null,e):null)}function Hd(e,t){if(Ro())return null;yd(e,t,!0)}function Mm(){qm(function(){(ne&6)!==0?$o(xs,Nm):_d()})}function Pr(){if(ga===0){var e=fn;e===0&&(e=Di,Di<<=1,(Di&261888)===0&&(Di=256)),ga=e}return ga}function Ld(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Li(""+e)}function jd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Rm(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var o=Ld((i[Je]||null).action),l=n.submitter;l&&(t=(t=l[Je]||null)?Ld(t.formAction):l.getAttribute("formAction"),t!==null&&(o=t,l=null));var r=new Ii("action","action",null,n,i);e.push({event:r,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(ga!==0){var s=l?jd(i,l):new FormData(i);cr(a,{pending:!0,data:s,method:i.method,action:o},null,s)}}else typeof o=="function"&&(r.preventDefault(),s=l?jd(i,l):new FormData(i),cr(a,{pending:!0,data:s,method:i.method,action:o},o,s))},currentTarget:i}]})}}for(var Gr=0;Gr<El.length;Gr++){var Fr=El[Gr],km=Fr.toLowerCase(),Dm=Fr[0].toUpperCase()+Fr.slice(1);Ct(km,"on"+Dm)}Ct(gc,"onAnimationEnd"),Ct(yc,"onAnimationIteration"),Ct(vc,"onAnimationStart"),Ct("dblclick","onDoubleClick"),Ct("focusin","onFocus"),Ct("focusout","onBlur"),Ct(Yp,"onTransitionRun"),Ct(Qp,"onTransitionStart"),Ct(Kp,"onTransitionCancel"),Ct(bc,"onTransitionEnd"),Za("onMouseEnter",["mouseout","mouseover"]),Za("onMouseLeave",["mouseout","mouseover"]),Za("onPointerEnter",["pointerout","pointerover"]),Za("onPointerLeave",["pointerout","pointerover"]),Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var gi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Um=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gi));function qd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var o=void 0;if(t)for(var l=n.length-1;0<=l;l--){var r=n[l],s=r.instance,h=r.currentTarget;if(r=r.listener,s!==o&&i.isPropagationStopped())break e;o=r,i.currentTarget=h;try{o(i)}catch(b){Fi(b)}i.currentTarget=null,o=s}else for(l=0;l<n.length;l++){if(r=n[l],s=r.instance,h=r.currentTarget,r=r.listener,s!==o&&i.isPropagationStopped())break e;o=r,i.currentTarget=h;try{o(i)}catch(b){Fi(b)}i.currentTarget=null,o=s}}}}function X(e,t){var a=t[il];a===void 0&&(a=t[il]=new Set);var n=e+"__bubble";a.has(n)||(Vd(t,e,2,!1),a.add(n))}function Jr(e,t,a){var n=0;t&&(n|=4),Vd(a,e,n,t)}var Uo="_reactListening"+Math.random().toString(36).slice(2);function Yr(e){if(!e[Uo]){e[Uo]=!0,_s.forEach(function(a){a!=="selectionchange"&&(Um.has(a)||Jr(a,!1,e),Jr(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uo]||(t[Uo]=!0,Jr("selectionchange",!1,t))}}function Vd(e,t,a,n){switch(yf(t)){case 2:var i=lh;break;case 8:i=rh;break;default:i=ss}a=i.bind(null,t,a,e),i=void 0,!pl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function Qr(e,t,a,n,i){var o=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var l=n.tag;if(l===3||l===4){var r=n.stateNode.containerInfo;if(r===i)break;if(l===4)for(l=n.return;l!==null;){var s=l.tag;if((s===3||s===4)&&l.stateNode.containerInfo===i)return;l=l.return}for(;r!==null;){if(l=Qa(r),l===null)return;if(s=l.tag,s===5||s===6||s===26||s===27){n=o=l;continue e}r=r.parentNode}}n=n.return}Js(function(){var h=o,b=dl(a),A=[];e:{var g=Sc.get(e);if(g!==void 0){var v=Ii,_=e;switch(e){case"keypress":if(qi(a)===0)break e;case"keydown":case"keyup":v=Tp;break;case"focusin":_="focus",v=yl;break;case"focusout":_="blur",v=yl;break;case"beforeblur":case"afterblur":v=yl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Ks;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=pp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Mp;break;case gc:case yc:case vc:v=gp;break;case bc:v=kp;break;case"scroll":case"scrollend":v=dp;break;case"wheel":v=Up;break;case"copy":case"cut":case"paste":v=vp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Zs;break;case"toggle":case"beforetoggle":v=_p}var q=(t&4)!==0,pe=!q&&(e==="scroll"||e==="scrollend"),f=q?g!==null?g+"Capture":null:g;q=[];for(var u=h,m;u!==null;){var w=u;if(m=w.stateNode,w=w.tag,w!==5&&w!==26&&w!==27||m===null||f===null||(w=Ln(u,f),w!=null&&q.push(yi(u,w,m))),pe)break;u=u.return}0<q.length&&(g=new v(g,_,null,a,b),A.push({event:g,listeners:q}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",g&&a!==ul&&(_=a.relatedTarget||a.fromElement)&&(Qa(_)||_[Ya]))break e;if((v||g)&&(g=b.window===b?b:(g=b.ownerDocument)?g.defaultView||g.parentWindow:window,v?(_=a.relatedTarget||a.toElement,v=h,_=_?Qa(_):null,_!==null&&(pe=U(_),q=_.tag,_!==pe||q!==5&&q!==27&&q!==6)&&(_=null)):(v=null,_=h),v!==_)){if(q=Ks,w="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(q=Zs,w="onPointerLeave",f="onPointerEnter",u="pointer"),pe=v==null?g:Hn(v),m=_==null?g:Hn(_),g=new q(w,u+"leave",v,a,b),g.target=pe,g.relatedTarget=m,w=null,Qa(b)===h&&(q=new q(f,u+"enter",_,a,b),q.target=m,q.relatedTarget=pe,w=q),pe=w,v&&_)t:{for(q=Om,f=v,u=_,m=0,w=f;w;w=q(w))m++;w=0;for(var H=u;H;H=q(H))w++;for(;0<m-w;)f=q(f),m--;for(;0<w-m;)u=q(u),w--;for(;m--;){if(f===u||u!==null&&f===u.alternate){q=f;break t}f=q(f),u=q(u)}q=null}else q=null;v!==null&&Id(A,g,v,q,!1),_!==null&&pe!==null&&Id(A,pe,_,q,!0)}}e:{if(g=h?Hn(h):window,v=g.nodeName&&g.nodeName.toLowerCase(),v==="select"||v==="input"&&g.type==="file")var te=oc;else if(nc(g))if(lc)te=Gp;else{te=Ip;var B=Vp}else v=g.nodeName,!v||v.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&cl(h.elementType)&&(te=oc):te=Pp;if(te&&(te=te(e,h))){ic(A,te,a,b);break e}B&&B(e,g,h),e==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&sl(g,"number",g.value)}switch(B=h?Hn(h):window,e){case"focusin":(nc(B)||B.contentEditable==="true")&&(nn=B,Cl=h,Jn=null);break;case"focusout":Jn=Cl=nn=null;break;case"mousedown":xl=!0;break;case"contextmenu":case"mouseup":case"dragend":xl=!1,mc(A,a,b);break;case"selectionchange":if(Jp)break;case"keydown":case"keyup":mc(A,a,b)}var J;if(bl)e:{switch(e){case"compositionstart":var W="onCompositionStart";break e;case"compositionend":W="onCompositionEnd";break e;case"compositionupdate":W="onCompositionUpdate";break e}W=void 0}else an?tc(e,a)&&(W="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(W="onCompositionStart");W&&(Ws&&a.locale!=="ko"&&(an||W!=="onCompositionStart"?W==="onCompositionEnd"&&an&&(J=Ys()):(ea=b,ml="value"in ea?ea.value:ea.textContent,an=!0)),B=Oo(h,W),0<B.length&&(W=new Xs(W,e,null,a,b),A.push({event:W,listeners:B}),J?W.data=J:(J=ac(a),J!==null&&(W.data=J)))),(J=Bp?Hp(e,a):Lp(e,a))&&(W=Oo(h,"onBeforeInput"),0<W.length&&(B=new Xs("onBeforeInput","beforeinput",null,a,b),A.push({event:B,listeners:W}),B.data=J)),Rm(A,e,h,a,b)}qd(A,t)})}function yi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Oo(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,o=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||o===null||(i=Ln(e,a),i!=null&&n.unshift(yi(e,i,o)),i=Ln(e,t),i!=null&&n.push(yi(e,i,o))),e.tag===3)return n;e=e.return}return[]}function Om(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Id(e,t,a,n,i){for(var o=t._reactName,l=[];a!==null&&a!==n;){var r=a,s=r.alternate,h=r.stateNode;if(r=r.tag,s!==null&&s===n)break;r!==5&&r!==26&&r!==27||h===null||(s=h,i?(h=Ln(a,o),h!=null&&l.unshift(yi(a,h,s))):i||(h=Ln(a,o),h!=null&&l.push(yi(a,h,s)))),a=a.return}l.length!==0&&e.push({event:t,listeners:l})}var _m=/\r\n?/g,zm=/\u0000|\uFFFD/g;function Pd(e){return(typeof e=="string"?e:""+e).replace(_m,`
`).replace(zm,"")}function Gd(e,t){return t=Pd(t),Pd(e)===t}function fe(e,t,a,n,i,o){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||$a(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&$a(e,""+n);break;case"className":Bi(e,"class",n);break;case"tabIndex":Bi(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Bi(e,a,n);break;case"style":Gs(e,n,o);break;case"data":if(t!=="object"){Bi(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Li(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof o=="function"&&(a==="formAction"?(t!=="input"&&fe(e,t,"name",i.name,i,null),fe(e,t,"formEncType",i.formEncType,i,null),fe(e,t,"formMethod",i.formMethod,i,null),fe(e,t,"formTarget",i.formTarget,i,null)):(fe(e,t,"encType",i.encType,i,null),fe(e,t,"method",i.method,i,null),fe(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Li(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=_t);break;case"onScroll":n!=null&&X("scroll",e);break;case"onScrollEnd":n!=null&&X("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Li(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":X("beforetoggle",e),X("toggle",e),zi(e,"popover",n);break;case"xlinkActuate":Ot(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Ot(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Ot(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Ot(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Ot(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Ot(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Ot(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Ot(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Ot(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":zi(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=cp.get(a)||a,zi(e,a,n))}}function Kr(e,t,a,n,i,o){switch(a){case"style":Gs(e,n,o);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"children":typeof n=="string"?$a(e,n):(typeof n=="number"||typeof n=="bigint")&&$a(e,""+n);break;case"onScroll":n!=null&&X("scroll",e);break;case"onScrollEnd":n!=null&&X("scrollend",e);break;case"onClick":n!=null&&(e.onclick=_t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!zs.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),o=e[Je]||null,o=o!=null?o[a]:null,typeof o=="function"&&e.removeEventListener(t,o,i),typeof n=="function")){typeof o!="function"&&o!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):zi(e,a,n)}}}function Le(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":X("error",e),X("load",e);var n=!1,i=!1,o;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];if(l!=null)switch(o){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:fe(e,t,o,l,a,null)}}i&&fe(e,t,"srcSet",a.srcSet,a,null),n&&fe(e,t,"src",a.src,a,null);return;case"input":X("invalid",e);var r=o=l=i=null,s=null,h=null;for(n in a)if(a.hasOwnProperty(n)){var b=a[n];if(b!=null)switch(n){case"name":i=b;break;case"type":l=b;break;case"checked":s=b;break;case"defaultChecked":h=b;break;case"value":o=b;break;case"defaultValue":r=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(c(137,t));break;default:fe(e,t,n,b,a,null)}}qs(e,o,r,s,h,l,i,!1);return;case"select":X("invalid",e),n=l=o=null;for(i in a)if(a.hasOwnProperty(i)&&(r=a[i],r!=null))switch(i){case"value":o=r;break;case"defaultValue":l=r;break;case"multiple":n=r;default:fe(e,t,i,r,a,null)}t=o,a=l,e.multiple=!!n,t!=null?Wa(e,!!n,t,!1):a!=null&&Wa(e,!!n,a,!0);return;case"textarea":X("invalid",e),o=i=n=null;for(l in a)if(a.hasOwnProperty(l)&&(r=a[l],r!=null))switch(l){case"value":n=r;break;case"defaultValue":i=r;break;case"children":o=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(c(91));break;default:fe(e,t,l,r,a,null)}Is(e,n,i,o);return;case"option":for(s in a)a.hasOwnProperty(s)&&(n=a[s],n!=null)&&(s==="selected"?e.selected=n&&typeof n!="function"&&typeof n!="symbol":fe(e,t,s,n,a,null));return;case"dialog":X("beforetoggle",e),X("toggle",e),X("cancel",e),X("close",e);break;case"iframe":case"object":X("load",e);break;case"video":case"audio":for(n=0;n<gi.length;n++)X(gi[n],e);break;case"image":X("error",e),X("load",e);break;case"details":X("toggle",e);break;case"embed":case"source":case"link":X("error",e),X("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in a)if(a.hasOwnProperty(h)&&(n=a[h],n!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:fe(e,t,h,n,a,null)}return;default:if(cl(t)){for(b in a)a.hasOwnProperty(b)&&(n=a[b],n!==void 0&&Kr(e,t,b,n,a,void 0));return}}for(r in a)a.hasOwnProperty(r)&&(n=a[r],n!=null&&fe(e,t,r,n,a,null))}function Bm(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,o=null,l=null,r=null,s=null,h=null,b=null;for(v in a){var A=a[v];if(a.hasOwnProperty(v)&&A!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":s=A;default:n.hasOwnProperty(v)||fe(e,t,v,null,n,A)}}for(var g in n){var v=n[g];if(A=a[g],n.hasOwnProperty(g)&&(v!=null||A!=null))switch(g){case"type":o=v;break;case"name":i=v;break;case"checked":h=v;break;case"defaultChecked":b=v;break;case"value":l=v;break;case"defaultValue":r=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(c(137,t));break;default:v!==A&&fe(e,t,g,v,n,A)}}rl(e,l,r,s,h,b,o,i);return;case"select":v=l=r=g=null;for(o in a)if(s=a[o],a.hasOwnProperty(o)&&s!=null)switch(o){case"value":break;case"multiple":v=s;default:n.hasOwnProperty(o)||fe(e,t,o,null,n,s)}for(i in n)if(o=n[i],s=a[i],n.hasOwnProperty(i)&&(o!=null||s!=null))switch(i){case"value":g=o;break;case"defaultValue":r=o;break;case"multiple":l=o;default:o!==s&&fe(e,t,i,o,n,s)}t=r,a=l,n=v,g!=null?Wa(e,!!a,g,!1):!!n!=!!a&&(t!=null?Wa(e,!!a,t,!0):Wa(e,!!a,a?[]:"",!1));return;case"textarea":v=g=null;for(r in a)if(i=a[r],a.hasOwnProperty(r)&&i!=null&&!n.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:fe(e,t,r,null,n,i)}for(l in n)if(i=n[l],o=a[l],n.hasOwnProperty(l)&&(i!=null||o!=null))switch(l){case"value":g=i;break;case"defaultValue":v=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(c(91));break;default:i!==o&&fe(e,t,l,i,n,o)}Vs(e,g,v);return;case"option":for(var _ in a)g=a[_],a.hasOwnProperty(_)&&g!=null&&!n.hasOwnProperty(_)&&(_==="selected"?e.selected=!1:fe(e,t,_,null,n,g));for(s in n)g=n[s],v=a[s],n.hasOwnProperty(s)&&g!==v&&(g!=null||v!=null)&&(s==="selected"?e.selected=g&&typeof g!="function"&&typeof g!="symbol":fe(e,t,s,g,n,v));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var q in a)g=a[q],a.hasOwnProperty(q)&&g!=null&&!n.hasOwnProperty(q)&&fe(e,t,q,null,n,g);for(h in n)if(g=n[h],v=a[h],n.hasOwnProperty(h)&&g!==v&&(g!=null||v!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(c(137,t));break;default:fe(e,t,h,g,n,v)}return;default:if(cl(t)){for(var pe in a)g=a[pe],a.hasOwnProperty(pe)&&g!==void 0&&!n.hasOwnProperty(pe)&&Kr(e,t,pe,void 0,n,g);for(b in n)g=n[b],v=a[b],!n.hasOwnProperty(b)||g===v||g===void 0&&v===void 0||Kr(e,t,b,g,n,v);return}}for(var f in a)g=a[f],a.hasOwnProperty(f)&&g!=null&&!n.hasOwnProperty(f)&&fe(e,t,f,null,n,g);for(A in n)g=n[A],v=a[A],!n.hasOwnProperty(A)||g===v||g==null&&v==null||fe(e,t,A,g,n,v)}function Fd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Hm(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],o=i.transferSize,l=i.initiatorType,r=i.duration;if(o&&r&&Fd(l)){for(l=0,r=i.responseEnd,n+=1;n<a.length;n++){var s=a[n],h=s.startTime;if(h>r)break;var b=s.transferSize,A=s.initiatorType;b&&Fd(A)&&(s=s.responseEnd,l+=b*(s<r?1:(r-h)/(s-h)))}if(--n,t+=8*(o+l)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Xr=null,Zr=null;function _o(e){return e.nodeType===9?e:e.ownerDocument}function Jd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Wr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $r=null;function Lm(){var e=window.event;return e&&e.type==="popstate"?e===$r?!1:($r=e,!0):($r=null,!1)}var Qd=typeof setTimeout=="function"?setTimeout:void 0,jm=typeof clearTimeout=="function"?clearTimeout:void 0,Kd=typeof Promise=="function"?Promise:void 0,qm=typeof queueMicrotask=="function"?queueMicrotask:typeof Kd<"u"?function(e){return Kd.resolve(null).then(e).catch(Vm)}:Qd;function Vm(e){setTimeout(function(){throw e})}function ya(e){return e==="head"}function Xd(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),Dn(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")vi(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,vi(a);for(var o=a.firstChild;o;){var l=o.nextSibling,r=o.nodeName;o[Bn]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&o.rel.toLowerCase()==="stylesheet"||a.removeChild(o),o=l}}else a==="body"&&vi(e.ownerDocument.body);a=i}while(a);Dn(t)}function Zd(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function es(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":es(a),ol(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Im(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Bn])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(o=e.getAttribute("rel"),o==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(o!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(o=e.getAttribute("src"),(o!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var o=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===o)return e}else return e;if(e=bt(e.nextSibling),e===null)break}return null}function Pm(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=bt(e.nextSibling),e===null))return null;return e}function Wd(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=bt(e.nextSibling),e===null))return null;return e}function ts(e){return e.data==="$?"||e.data==="$~"}function as(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Gm(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var ns=null;function $d(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return bt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function ef(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function tf(e,t,a){switch(t=_o(a),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function vi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ol(e)}var St=new Map,af=new Set;function zo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Xt=R.d;R.d={f:Fm,r:Jm,D:Ym,C:Qm,L:Km,m:Xm,X:Wm,S:Zm,M:$m};function Fm(){var e=Xt.f(),t=Eo();return e||t}function Jm(e){var t=Ka(e);t!==null&&t.tag===5&&t.type==="form"?bu(t):Xt.r(e)}var Mn=typeof document>"u"?null:document;function nf(e,t,a){var n=Mn;if(n&&typeof t=="string"&&t){var i=ft(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),af.has(i)||(af.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),Le(t,"link",e),Ue(t),n.head.appendChild(t)))}}function Ym(e){Xt.D(e),nf("dns-prefetch",e,null)}function Qm(e,t){Xt.C(e,t),nf("preconnect",e,t)}function Km(e,t,a){Xt.L(e,t,a);var n=Mn;if(n&&e&&t){var i='link[rel="preload"][as="'+ft(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+ft(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+ft(a.imageSizes)+'"]')):i+='[href="'+ft(e)+'"]';var o=i;switch(t){case"style":o=Rn(e);break;case"script":o=kn(e)}St.has(o)||(e=L({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),St.set(o,e),n.querySelector(i)!==null||t==="style"&&n.querySelector(bi(o))||t==="script"&&n.querySelector(Si(o))||(t=n.createElement("link"),Le(t,"link",e),Ue(t),n.head.appendChild(t)))}}function Xm(e,t){Xt.m(e,t);var a=Mn;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+ft(n)+'"][href="'+ft(e)+'"]',o=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=kn(e)}if(!St.has(o)&&(e=L({rel:"modulepreload",href:e},t),St.set(o,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Si(o)))return}n=a.createElement("link"),Le(n,"link",e),Ue(n),a.head.appendChild(n)}}}function Zm(e,t,a){Xt.S(e,t,a);var n=Mn;if(n&&e){var i=Xa(n).hoistableStyles,o=Rn(e);t=t||"default";var l=i.get(o);if(!l){var r={loading:0,preload:null};if(l=n.querySelector(bi(o)))r.loading=5;else{e=L({rel:"stylesheet",href:e,"data-precedence":t},a),(a=St.get(o))&&is(e,a);var s=l=n.createElement("link");Ue(s),Le(s,"link",e),s._p=new Promise(function(h,b){s.onload=h,s.onerror=b}),s.addEventListener("load",function(){r.loading|=1}),s.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Bo(l,t,n)}l={type:"stylesheet",instance:l,count:1,state:r},i.set(o,l)}}}function Wm(e,t){Xt.X(e,t);var a=Mn;if(a&&e){var n=Xa(a).hoistableScripts,i=kn(e),o=n.get(i);o||(o=a.querySelector(Si(i)),o||(e=L({src:e,async:!0},t),(t=St.get(i))&&os(e,t),o=a.createElement("script"),Ue(o),Le(o,"link",e),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(i,o))}}function $m(e,t){Xt.M(e,t);var a=Mn;if(a&&e){var n=Xa(a).hoistableScripts,i=kn(e),o=n.get(i);o||(o=a.querySelector(Si(i)),o||(e=L({src:e,async:!0,type:"module"},t),(t=St.get(i))&&os(e,t),o=a.createElement("script"),Ue(o),Le(o,"link",e),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(i,o))}}function of(e,t,a,n){var i=(i=Q.current)?zo(i):null;if(!i)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Rn(a.href),a=Xa(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Rn(a.href);var o=Xa(i).hoistableStyles,l=o.get(e);if(l||(i=i.ownerDocument||i,l={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},o.set(e,l),(o=i.querySelector(bi(e)))&&!o._p&&(l.instance=o,l.state.loading=5),St.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},St.set(e,a),o||eh(i,e,a,l.state))),t&&n===null)throw Error(c(528,""));return l}if(t&&n!==null)throw Error(c(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=kn(a),a=Xa(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function Rn(e){return'href="'+ft(e)+'"'}function bi(e){return'link[rel="stylesheet"]['+e+"]"}function lf(e){return L({},e,{"data-precedence":e.precedence,precedence:null})}function eh(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),Le(t,"link",a),Ue(t),e.head.appendChild(t))}function kn(e){return'[src="'+ft(e)+'"]'}function Si(e){return"script[async]"+e}function rf(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+ft(a.href)+'"]');if(n)return t.instance=n,Ue(n),n;var i=L({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Ue(n),Le(n,"style",i),Bo(n,a.precedence,e),t.instance=n;case"stylesheet":i=Rn(a.href);var o=e.querySelector(bi(i));if(o)return t.state.loading|=4,t.instance=o,Ue(o),o;n=lf(a),(i=St.get(i))&&is(n,i),o=(e.ownerDocument||e).createElement("link"),Ue(o);var l=o;return l._p=new Promise(function(r,s){l.onload=r,l.onerror=s}),Le(o,"link",n),t.state.loading|=4,Bo(o,a.precedence,e),t.instance=o;case"script":return o=kn(a.src),(i=e.querySelector(Si(o)))?(t.instance=i,Ue(i),i):(n=a,(i=St.get(o))&&(n=L({},a),os(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),Ue(i),Le(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,Bo(n,a.precedence,e));return t.instance}function Bo(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,o=i,l=0;l<n.length;l++){var r=n[l];if(r.dataset.precedence===t)o=r;else if(o!==i)break}o?o.parentNode.insertBefore(e,o.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function is(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function os(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ho=null;function sf(e,t,a){if(Ho===null){var n=new Map,i=Ho=new Map;i.set(a,n)}else i=Ho,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var o=a[i];if(!(o[Bn]||o[_e]||e==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!=="http://www.w3.org/2000/svg"){var l=o.getAttribute(t)||"";l=e+l;var r=n.get(l);r?r.push(o):n.set(l,[o])}}return n}function cf(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function th(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function uf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ah(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var i=Rn(n.href),o=t.querySelector(bi(i));if(o){t=o._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Lo.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=o,Ue(o);return}o=t.ownerDocument||t,n=lf(n),(i=St.get(i))&&is(n,i),o=o.createElement("link"),Ue(o);var l=o;l._p=new Promise(function(r,s){l.onload=r,l.onerror=s}),Le(o,"link",n),a.instance=o}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Lo.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var ls=0;function nh(e,t){return e.stylesheets&&e.count===0&&qo(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&qo(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},6e4+t);0<e.imgBytes&&ls===0&&(ls=62500*Hm());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&qo(e,e.stylesheets),e.unsuspend)){var o=e.unsuspend;e.unsuspend=null,o()}},(e.imgBytes>ls?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function Lo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)qo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var jo=null;function qo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,jo=new Map,t.forEach(ih,e),jo=null,Lo.call(e))}function ih(e,t){if(!(t.state.loading&4)){var a=jo.get(e);if(a)var n=a.get(null);else{a=new Map,jo.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<i.length;o++){var l=i[o];(l.nodeName==="LINK"||l.getAttribute("media")!=="not all")&&(a.set(l.dataset.precedence,l),n=l)}n&&a.set(null,n)}i=t.instance,l=i.getAttribute("data-precedence"),o=a.get(l)||n,o===n&&a.set(null,i),a.set(l,i),this.count++,n=Lo.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),o?o.parentNode.insertBefore(i,o.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var wi={$$typeof:De,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function oh(e,t,a,n,i,o,l,r,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tl(0),this.hiddenUpdates=tl(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=o,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function df(e,t,a,n,i,o,l,r,s,h,b,A){return e=new oh(e,t,a,l,s,h,b,A,r),t=1,o===!0&&(t|=24),o=nt(3,null,null,t),e.current=o,o.stateNode=e,t=jl(),t.refCount++,e.pooledCache=t,t.refCount++,o.memoizedState={element:n,isDehydrated:a,cache:t},Pl(o),e}function ff(e){return e?(e=rn,e):rn}function pf(e,t,a,n,i,o){i=ff(i),n.context===null?n.context=i:n.pendingContext=i,n=la(t),n.payload={element:a},o=o===void 0?null:o,o!==null&&(n.callback=o),a=ra(e,n,t),a!==null&&(We(a,e,t),$n(a,e,t))}function mf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function rs(e,t){mf(e,t),(e=e.alternate)&&mf(e,t)}function hf(e){if(e.tag===13||e.tag===31){var t=Ua(e,67108864);t!==null&&We(t,e,67108864),rs(e,67108864)}}function gf(e){if(e.tag===13||e.tag===31){var t=st();t=al(t);var a=Ua(e,t);a!==null&&We(a,e,t),rs(e,t)}}var Vo=!0;function lh(e,t,a,n){var i=S.T;S.T=null;var o=R.p;try{R.p=2,ss(e,t,a,n)}finally{R.p=o,S.T=i}}function rh(e,t,a,n){var i=S.T;S.T=null;var o=R.p;try{R.p=8,ss(e,t,a,n)}finally{R.p=o,S.T=i}}function ss(e,t,a,n){if(Vo){var i=cs(n);if(i===null)Qr(e,t,n,Io,a),vf(e,n);else if(ch(i,e,t,a,n))n.stopPropagation();else if(vf(e,n),t&4&&-1<sh.indexOf(e)){for(;i!==null;){var o=Ka(i);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var l=Na(o.pendingLanes);if(l!==0){var r=o;for(r.pendingLanes|=2,r.entangledLanes|=2;l;){var s=1<<31-tt(l);r.entanglements[1]|=s,l&=~s}Dt(o),(ne&6)===0&&(xo=$e()+500,hi(0))}}break;case 31:case 13:r=Ua(o,2),r!==null&&We(r,o,2),Eo(),rs(o,2)}if(o=cs(n),o===null&&Qr(e,t,n,Io,a),o===i)break;i=o}i!==null&&n.stopPropagation()}else Qr(e,t,n,null,a)}}function cs(e){return e=dl(e),us(e)}var Io=null;function us(e){if(Io=null,e=Qa(e),e!==null){var t=U(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=F(t),e!==null)return e;e=null}else if(a===31){if(e=se(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Io=e,null}function yf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Yf()){case xs:return 2;case Ts:return 8;case ki:case Qf:return 32;case Es:return 268435456;default:return 32}default:return 32}}var ds=!1,va=null,ba=null,Sa=null,Ai=new Map,Ci=new Map,wa=[],sh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function vf(e,t){switch(e){case"focusin":case"focusout":va=null;break;case"dragenter":case"dragleave":ba=null;break;case"mouseover":case"mouseout":Sa=null;break;case"pointerover":case"pointerout":Ai.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ci.delete(t.pointerId)}}function xi(e,t,a,n,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Ka(t),t!==null&&hf(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function ch(e,t,a,n,i){switch(t){case"focusin":return va=xi(va,e,t,a,n,i),!0;case"dragenter":return ba=xi(ba,e,t,a,n,i),!0;case"mouseover":return Sa=xi(Sa,e,t,a,n,i),!0;case"pointerover":var o=i.pointerId;return Ai.set(o,xi(Ai.get(o)||null,e,t,a,n,i)),!0;case"gotpointercapture":return o=i.pointerId,Ci.set(o,xi(Ci.get(o)||null,e,t,a,n,i)),!0}return!1}function bf(e){var t=Qa(e.target);if(t!==null){var a=U(t);if(a!==null){if(t=a.tag,t===13){if(t=F(a),t!==null){e.blockedOn=t,Us(e.priority,function(){gf(a)});return}}else if(t===31){if(t=se(a),t!==null){e.blockedOn=t,Us(e.priority,function(){gf(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Po(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=cs(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);ul=n,a.target.dispatchEvent(n),ul=null}else return t=Ka(a),t!==null&&hf(t),e.blockedOn=a,!1;t.shift()}return!0}function Sf(e,t,a){Po(e)&&a.delete(t)}function uh(){ds=!1,va!==null&&Po(va)&&(va=null),ba!==null&&Po(ba)&&(ba=null),Sa!==null&&Po(Sa)&&(Sa=null),Ai.forEach(Sf),Ci.forEach(Sf)}function Go(e,t){e.blockedOn===t&&(e.blockedOn=null,ds||(ds=!0,p.unstable_scheduleCallback(p.unstable_NormalPriority,uh)))}var Fo=null;function wf(e){Fo!==e&&(Fo=e,p.unstable_scheduleCallback(p.unstable_NormalPriority,function(){Fo===e&&(Fo=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(us(n||a)===null)continue;break}var o=Ka(a);o!==null&&(e.splice(t,3),t-=3,cr(o,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function Dn(e){function t(s){return Go(s,e)}va!==null&&Go(va,e),ba!==null&&Go(ba,e),Sa!==null&&Go(Sa,e),Ai.forEach(t),Ci.forEach(t);for(var a=0;a<wa.length;a++){var n=wa[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<wa.length&&(a=wa[0],a.blockedOn===null);)bf(a),a.blockedOn===null&&wa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],o=a[n+1],l=i[Je]||null;if(typeof o=="function")l||wf(a);else if(l){var r=null;if(o&&o.hasAttribute("formAction")){if(i=o,l=o[Je]||null)r=l.formAction;else if(us(i)!==null)continue}else r=l.action;typeof r=="function"?a[n+1]=r:(a.splice(n,3),n-=3),wf(a)}}}function Af(){function e(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(l){return i=l})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function fs(e){this._internalRoot=e}Jo.prototype.render=fs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var a=t.current,n=st();pf(a,n,e,t,null,null)},Jo.prototype.unmount=fs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pf(e.current,2,null,e,null,null),Eo(),t[Ya]=null}};function Jo(e){this._internalRoot=e}Jo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ds();e={blockedOn:null,target:e,priority:t};for(var a=0;a<wa.length&&t!==0&&t<wa[a].priority;a++);wa.splice(a,0,e),a===0&&bf(e)}};var Cf=T.version;if(Cf!=="19.2.3")throw Error(c(527,Cf,"19.2.3"));R.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=C(t),e=e!==null?Y(e):null,e=e===null?null:e.stateNode,e};var dh={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:S,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yo.isDisabled&&Yo.supportsFiber)try{On=Yo.inject(dh),et=Yo}catch{}}return Ei.createRoot=function(e,t){if(!N(e))throw Error(c(299));var a=!1,n="",i=Ru,o=ku,l=Du;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(o=t.onCaughtError),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=df(e,1,!1,null,null,a,n,null,i,o,l,Af),e[Ya]=t.current,Yr(e),new fs(t)},Ei.hydrateRoot=function(e,t,a){if(!N(e))throw Error(c(299));var n=!1,i="",o=Ru,l=ku,r=Du,s=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(o=a.onUncaughtError),a.onCaughtError!==void 0&&(l=a.onCaughtError),a.onRecoverableError!==void 0&&(r=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),t=df(e,1,!0,t,a??null,n,i,s,o,l,r,Af),t.context=ff(null),a=t.current,n=st(),n=al(n),i=la(n),i.callback=null,ra(a,i,n),a=n,t.current.lanes=a,zn(t,a),Dt(t),e[Ya]=t.current,Yr(e),new Jo(t)},Ei.version="19.2.3",Ei}var Of;function wh(){if(Of)return hs.exports;Of=1;function p(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p)}catch(T){console.error(T)}}return p(),hs.exports=Sh(),hs.exports}var Ah=wh();const Ca=[{id:1,category:"Core React Native",icon:"⚛️",question:"Explain the difference between React Native and React.js. How does React Native render components?",difficulty:"beginner",seniority:"junior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>This is often the first question in RN interviews. Interviewers want to verify you understand the fundamental architecture and aren't just treating RN as "React for mobile."</p>

            <h4>Key Differences</h4>
            <table>
                <tr><td><strong>Aspect</strong></td><td><strong>React.js</strong></td><td><strong>React Native</strong></td></tr>
                <tr><td>Render Target</td><td>Browser DOM (HTML elements)</td><td>Native platform views</td></tr>
                <tr><td>Styling</td><td>CSS files, CSS-in-JS</td><td>JavaScript StyleSheet objects</td></tr>
                <tr><td>Layout</td><td>CSS (Flexbox, Grid, etc.)</td><td>Yoga (Flexbox only)</td></tr>
                <tr><td>Components</td><td>&lt;div&gt;, &lt;span&gt;, &lt;input&gt;</td><td>&lt;View&gt;, &lt;Text&gt;, &lt;TextInput&gt;</td></tr>
                <tr><td>Navigation</td><td>React Router (URL-based)</td><td>React Navigation (stack-based)</td></tr>
                <tr><td>Execution</td><td>Browser JS engine</td><td>Hermes/JSC + Native runtime</td></tr>
            </table>

            <h4>React Native Rendering Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────┐
│                     JavaScript Thread                        │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Your React  │ →  │    React     │ →  │  Virtual DOM  │  │
│  │    Code     │    │  Reconciler  │    │    (Fiber)    │  │
│  └─────────────┘    └──────────────┘    └───────┬───────┘  │
└─────────────────────────────────────────────────┼───────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────┐
                    │         Bridge / JSI        ▼             │
                    │    (Serialization & Communication)        │
                    └─────────────────────────────┬─────────────┘
                                                  │
┌─────────────────────────────────────────────────┼───────────┐
│                      Native Thread              ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   UIView    │ ←  │   Shadow     │ ←  │    Native     │  │
│  │  Hierarchy  │    │    Tree      │    │   Commands    │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
└─────────────────────────────────────────────────────────────┘</code></pre>

            <h4>Rendering Process Step by Step</h4>
            <ol>
                <li><strong>JS Execution:</strong> Your JavaScript code runs in Hermes (default) or JavaScriptCore engine</li>
                <li><strong>Reconciliation:</strong> React's Fiber reconciler computes what changed in the virtual DOM</li>
                <li><strong>Serialization:</strong> UI operations are serialized and sent across the bridge (JSON in old arch, direct calls in new arch)</li>
                <li><strong>Shadow Tree:</strong> Native side builds a shadow tree for layout calculation using Yoga</li>
                <li><strong>Layout:</strong> Yoga calculates exact positions and dimensions using Flexbox algorithm</li>
                <li><strong>Native Rendering:</strong> Platform-specific views are created and displayed</li>
            </ol>

            <h4>Component Mapping Examples</h4>
            <pre><code>// React Native → Native Components
┌──────────────────┬─────────────────────┬────────────────────────┐
│  React Native    │       iOS           │        Android         │
├──────────────────┼─────────────────────┼────────────────────────┤
│  &lt;View&gt;          │  UIView             │  android.view.View     │
│  &lt;Text&gt;          │  UITextView         │  TextView              │
│  &lt;Image&gt;         │  UIImageView        │  ImageView             │
│  &lt;ScrollView&gt;    │  UIScrollView       │  ScrollView            │
│  &lt;TextInput&gt;     │  UITextField        │  EditText              │
│  &lt;Switch&gt;        │  UISwitch           │  Switch                │
│  &lt;FlatList&gt;      │  UITableView        │  RecyclerView          │
└──────────────────┴─────────────────────┴────────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Mention the <strong>New Architecture</strong> (Fabric + TurboModules) that replaces the bridge with JSI for synchronous, direct calls</li>
                <li>Explain why RN is <strong>not a WebView</strong> - it renders actual native components</li>
                <li>Discuss trade-offs: truly native performance vs. write-once flexibility</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "React Native is a WebView wrapper like Cordova"</li>
                <li><strong>Wrong:</strong> "React Native compiles to native code"</li>
                <li><strong>Correct:</strong> "React Native bridges JavaScript to native platform APIs and renders native views"</li>
            </ul>
        `},{id:2,category:"Core React Native",icon:"⚛️",question:"What is the Virtual DOM and how does React Native's reconciliation work?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding reconciliation is crucial for writing performant React Native apps. Interviewers ask this to gauge your depth of knowledge about React's internals and your ability to optimize applications.</p>

            <h4>Virtual DOM Concept</h4>
            <p>The Virtual DOM is a lightweight JavaScript object tree that mirrors the structure of the actual UI. Instead of directly manipulating native views (which is expensive), React:</p>
            <ol>
                <li>Maintains an in-memory representation of the UI</li>
                <li>When state changes, creates a new virtual tree</li>
                <li>Compares (diffs) the new tree with the previous one</li>
                <li>Calculates the minimum set of changes needed</li>
                <li>Applies only those changes to the actual native views</li>
            </ol>

            <h4>React Fiber Architecture</h4>
            <p>React 16+ uses "Fiber" - a complete rewrite of the reconciliation algorithm:</p>
            <pre><code>// Fiber Node Structure (simplified)
{
    type: 'View',           // Component type
    key: 'unique-key',      // For list reconciliation
    props: { style: {...} },// Component props
    stateNode: nativeView,  // Reference to native view
    child: fiberNode,       // First child
    sibling: fiberNode,     // Next sibling
    return: fiberNode,      // Parent node
    effectTag: 'UPDATE',    // What operation to perform
    alternate: prevFiber,   // Previous version for diffing
}</code></pre>

            <h4>Reconciliation Process Deep Dive</h4>
            <pre><code>// Phase 1: Render Phase (can be interrupted)
┌─────────────────────────────────────────────────────────┐
│  1. Start from root, traverse tree                      │
│  2. For each fiber:                                     │
│     - Call render() or function component               │
│     - Compare with previous fiber (diffing)             │
│     - Mark with effect tag (Placement/Update/Deletion)  │
│  3. Build "work-in-progress" tree                       │
└─────────────────────────────────────────────────────────┘
                          ↓
// Phase 2: Commit Phase (synchronous, can't be interrupted)
┌─────────────────────────────────────────────────────────┐
│  1. Apply all DOM/Native mutations                      │
│  2. Call lifecycle methods (componentDidMount, etc.)    │
│  3. Call useEffect callbacks                            │
│  4. Swap current tree with work-in-progress tree        │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Diffing Algorithm Heuristics</h4>
            <p>React uses O(n) heuristics instead of O(n³) tree comparison:</p>
            <ul>
                <li><strong>Different types = rebuild:</strong> If element type changes (View → Text), React destroys old tree and builds new</li>
                <li><strong>Same type = update:</strong> React keeps the instance and updates props</li>
                <li><strong>Keys for lists:</strong> Keys help React identify which items moved, were added, or removed</li>
            </ul>

            <h4>Keys: Why They Matter</h4>
            <pre><code>// ❌ BAD: Using index as key
{items.map((item, index) => (
    &lt;Item key={index} data={item} /&gt;  // Problems when list reorders!
))}

// What happens when you delete item at index 0:
// Before: [A(key=0), B(key=1), C(key=2)]
// After:  [B(key=0), C(key=1)]
// React thinks: A→B (update), B→C (update), delete C
// Actually: A deleted, B and C should stay!

// ✅ GOOD: Using stable unique ID
{items.map((item) => (
    &lt;Item key={item.id} data={item} /&gt;  // Correct behavior
))}

// What happens when you delete item with id='a':
// Before: [A(key=a), B(key=b), C(key=c)]
// After:  [B(key=b), C(key=c)]
// React correctly: delete A, keep B and C</code></pre>

            <h4>Optimization Strategies</h4>
            <pre><code>// 1. React.memo - prevent re-render if props unchanged
const MemoizedItem = React.memo(({ item, onPress }) => {
    console.log('Rendering item:', item.id);
    return &lt;TouchableOpacity onPress={onPress}&gt;...&lt;/TouchableOpacity&gt;;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.item.id === nextProps.item.id &&
           prevProps.item.updatedAt === nextProps.item.updatedAt;
});

// 2. useMemo - memoize expensive calculations
const sortedItems = useMemo(() => {
    console.log('Sorting items...');  // Only runs when items change
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// 3. useCallback - stable function references
const handlePress = useCallback((id) => {
    setSelectedId(id);
}, []); // Function reference stays same across renders</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Mention <strong>Fiber</strong> and how it enables concurrent features (Suspense, transitions)</li>
                <li>Explain the two-phase commit (render phase is interruptible, commit phase is not)</li>
                <li>Discuss how this differs in the <strong>New Architecture</strong> with synchronous rendering via Fabric</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Using array index as key in dynamic lists</li>
                <li>Creating new objects/functions inline in render (breaks memoization)</li>
                <li>Over-using useMemo/useCallback (premature optimization adds complexity)</li>
            </ul>
        `},{id:3,category:"Core React Native",icon:"⚛️",question:"Explain the component lifecycle in React Native. How do hooks relate to lifecycle methods?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding lifecycle is essential for managing side effects, subscriptions, and cleanup. This question reveals whether you can prevent memory leaks and handle async operations properly.</p>

            <h4>Component Lifecycle Visual</h4>
            <pre><code>
┌─────────────────── MOUNTING ───────────────────┐
│                                                │
│  constructor(props)                            │
│       ↓                                        │
│  static getDerivedStateFromProps(props, state) │
│       ↓                                        │
│  render()                                      │
│       ↓                                        │
│  componentDidMount() ← API calls, subscriptions│
│                                                │
└────────────────────────────────────────────────┘
                      ↓
┌─────────────────── UPDATING ───────────────────┐
│  (triggered by: new props, setState, forceUpdate)
│                                                │
│  static getDerivedStateFromProps(props, state) │
│       ↓                                        │
│  shouldComponentUpdate(nextProps, nextState)   │
│       ↓ (return false to skip render)          │
│  render()                                      │
│       ↓                                        │
│  getSnapshotBeforeUpdate(prevProps, prevState) │
│       ↓                                        │
│  componentDidUpdate(prevProps, prevState, snap)│
│                                                │
└────────────────────────────────────────────────┘
                      ↓
┌─────────────────── UNMOUNTING ─────────────────┐
│                                                │
│  componentWillUnmount() ← cleanup, unsubscribe │
│                                                │
└────────────────────────────────────────────────┘</code></pre>

            <h4>Hooks Equivalents (Modern Approach)</h4>
            <pre><code>function MyComponent({ userId }) {
    // ══════════════════════════════════════════
    // constructor equivalent: useState initialization
    // ══════════════════════════════════════════
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ══════════════════════════════════════════
    // componentDidMount equivalent
    // Empty dependency array = runs once on mount
    // ══════════════════════════════════════════
    useEffect(() => {
        console.log('Component mounted');

        // Setup subscriptions
        const subscription = eventEmitter.subscribe(handleEvent);

        // Cleanup function = componentWillUnmount
        return () => {
            console.log('Component will unmount');
            subscription.unsubscribe();
        };
    }, []);

    // ══════════════════════════════════════════
    // componentDidUpdate equivalent
    // Runs when userId changes
    // ══════════════════════════════════════════
    useEffect(() => {
        console.log('userId changed, fetching user...');

        let isMounted = true;  // Prevent state update after unmount
        const controller = new AbortController();

        async function fetchUser() {
            setLoading(true);
            try {
                const data = await api.getUser(userId, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setUser(data);
                }
            } catch (error) {
                if (error.name !== 'AbortError' && isMounted) {
                    console.error(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchUser();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [userId]);  // Dependency array

    // ══════════════════════════════════════════
    // getDerivedStateFromProps equivalent
    // useMemo recalculates when props change
    // ══════════════════════════════════════════
    const fullName = useMemo(() => {
        return user ? \`\${user.firstName} \${user.lastName}\` : '';
    }, [user]);

    // ══════════════════════════════════════════
    // shouldComponentUpdate equivalent
    // Use React.memo() at component level
    // ══════════════════════════════════════════

    return loading ? &lt;ActivityIndicator /&gt; : &lt;Text&gt;{fullName}&lt;/Text&gt;;
}</code></pre>

            <h4>useEffect Execution Order</h4>
            <pre><code>function Parent() {
    useEffect(() => {
        console.log('1. Parent effect');
        return () => console.log('4. Parent cleanup');
    }, []);

    return &lt;Child /&gt;;
}

function Child() {
    useEffect(() => {
        console.log('2. Child effect');
        return () => console.log('3. Child cleanup');
    }, []);

    return &lt;Text&gt;Child&lt;/Text&gt;;
}

// Mount order:  Child effect → Parent effect
// Unmount order: Child cleanup → Parent cleanup
// Update order: All cleanups first, then all effects</code></pre>

            <h4>useLayoutEffect vs useEffect</h4>
            <pre><code>// useEffect: Runs AFTER paint (async, non-blocking)
// Good for: API calls, subscriptions, logging
useEffect(() => {
    fetchData();
}, []);

// useLayoutEffect: Runs BEFORE paint (sync, blocking)
// Good for: DOM measurements, preventing flicker
useLayoutEffect(() => {
    // Measure element and update state before user sees
    const { height } = ref.current.getBoundingClientRect();
    setHeight(height);
}, []);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always mention <strong>cleanup functions</strong> to prevent memory leaks</li>
                <li>Discuss <strong>dependency arrays</strong> and why incorrect deps cause bugs</li>
                <li>Know when to use <strong>useLayoutEffect</strong> (DOM measurements, preventing visual flicker)</li>
                <li>Explain the <strong>closure trap</strong> and how to avoid stale state in effects</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <pre><code>// ❌ Missing cleanup - memory leak!
useEffect(() => {
    const subscription = eventEmitter.subscribe(handler);
    // No cleanup function!
}, []);

// ❌ Missing dependency - stale closure
useEffect(() => {
    const interval = setInterval(() => {
        setCount(count + 1);  // count is stale!
    }, 1000);
    return () => clearInterval(interval);
}, []);  // count missing from deps

// ✅ Correct - use functional update
useEffect(() => {
    const interval = setInterval(() => {
        setCount(c => c + 1);  // Always uses latest value
    }, 1000);
    return () => clearInterval(interval);
}, []);</code></pre>
        `},{id:4,category:"Core React Native",icon:"⚛️",question:"What are the differences between FlatList and ScrollView? When would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>List performance is one of the most common pain points in React Native apps. This question tests your understanding of virtualization and your ability to build smooth, performant scrolling experiences.</p>

            <h4>Comparison Table</h4>
            <table>
                <tr><td><strong>Feature</strong></td><td><strong>ScrollView</strong></td><td><strong>FlatList</strong></td></tr>
                <tr><td>Rendering</td><td>All children at once</td><td>Only visible items (virtualized)</td></tr>
                <tr><td>Memory</td><td>High (all items in memory)</td><td>Low (recycles views)</td></tr>
                <tr><td>Initial render</td><td>Slow for large lists</td><td>Fast (renders few items)</td></tr>
                <tr><td>Scroll perf</td><td>Good (already rendered)</td><td>Can be janky if not optimized</td></tr>
                <tr><td>Pull to refresh</td><td>Manual implementation</td><td>Built-in</td></tr>
                <tr><td>Infinite scroll</td><td>Manual implementation</td><td>Built-in (onEndReached)</td></tr>
                <tr><td>Item separators</td><td>Manual</td><td>Built-in (ItemSeparatorComponent)</td></tr>
            </table>

            <h4>How FlatList Virtualization Works</h4>
            <pre><code>
┌──────────────────────────────────────────────────┐
│                Off-screen (top)                   │
│  Items recycled and removed from memory           │
├──────────────────────────────────────────────────┤ ← windowSize start
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           Rendered but not visible           │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  ╔═════════════════════════════════════════════╗ │ ← Viewport
│  ║                                             ║ │
│  ║              VISIBLE ITEMS                  ║ │
│  ║           (what user sees)                  ║ │
│  ║                                             ║ │
│  ╚═════════════════════════════════════════════╝ │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           Rendered but not visible           │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
├──────────────────────────────────────────────────┤ ← windowSize end
│                Off-screen (bottom)                │
│  Items recycled and removed from memory           │
└──────────────────────────────────────────────────┘</code></pre>

            <h4>FlatList Complete Optimization Guide</h4>
            <pre><code>const ITEM_HEIGHT = 80;

function OptimizedList({ items }) {
    // 1. Memoize renderItem to prevent recreation
    const renderItem = useCallback(({ item, index }) => (
        &lt;MemoizedListItem item={item} onPress={handlePress} /&gt;
    ), [handlePress]);

    // 2. Stable keyExtractor
    const keyExtractor = useCallback((item) => item.id, []);

    // 3. getItemLayout for fixed-height items (HUGE perf win)
    const getItemLayout = useCallback((data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    return (
        &lt;FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}

            // ═══════════════════════════════════
            // CRITICAL: Layout optimization
            // ═══════════════════════════════════
            getItemLayout={getItemLayout}  // Skip measurement

            // ═══════════════════════════════════
            // Virtualization tuning
            // ═══════════════════════════════════
            windowSize={5}           // 5 viewport heights (2 above, 2 below)
            initialNumToRender={10}  // Initial items to render
            maxToRenderPerBatch={5}  // Items per scroll batch
            updateCellsBatchingPeriod={50}  // Batch update interval

            // ═══════════════════════════════════
            // Memory optimization
            // ═══════════════════════════════════
            removeClippedSubviews={Platform.OS === 'android'}  // Android only!

            // ═══════════════════════════════════
            // Features
            // ═══════════════════════════════════
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}  // Trigger at 50% from bottom
            refreshControl={&lt;RefreshControl refreshing={refreshing} onRefresh={onRefresh} /&gt;}

            // ═══════════════════════════════════
            // UI Components
            // ═══════════════════════════════════
            ListHeaderComponent={Header}
            ListFooterComponent={loading ? &lt;ActivityIndicator /&gt; : null}
            ListEmptyComponent={&lt;EmptyState /&gt;}
            ItemSeparatorComponent={() => &lt;View style={styles.separator} /&gt;}
        /&gt;
    );
}

// 4. Memoized list item component
const MemoizedListItem = React.memo(({ item, onPress }) => (
    &lt;TouchableOpacity onPress={() => onPress(item.id)} style={styles.item}&gt;
        &lt;FastImage source={{ uri: item.avatar }} style={styles.avatar} /&gt;
        &lt;Text&gt;{item.name}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
), (prev, next) => prev.item.id === next.item.id);</code></pre>

            <h4>FlashList: The Better Alternative</h4>
            <pre><code>// Shopify's FlashList - drop-in replacement, much faster
import { FlashList } from "@shopify/flash-list";

&lt;FlashList
    data={items}
    renderItem={renderItem}
    estimatedItemSize={80}  // Required: helps with scroll position
    keyExtractor={keyExtractor}
/&gt;

// FlashList advantages:
// - Consistent 60fps scrolling
// - Better memory management
// - Simpler API (fewer props to tune)
// - Works great out of the box</code></pre>

            <h4>Decision Guide</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────┐
│                    Which component?                      │
└─────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              │   How many items?      │
              └───────────┬───────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
      < 20 items    20-100 items     > 100 items
          │               │               │
          ▼               ▼               ▼
     ScrollView       FlatList      FlashList
          │               │               │
          │     ┌─────────┴─────────┐     │
          │     ▼                   ▼     │
          │  Grouped?          Dynamic    │
          │     │              height?    │
          │     ▼                   │     │
          │  SectionList           │     │
          │                        ▼     │
          │               FlatList with   │
          │               getItemLayout   │
          └───────────────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always mention <strong>getItemLayout</strong> for fixed-height items - it's the biggest perf win</li>
                <li>Discuss <strong>FlashList</strong> as the modern alternative to FlatList</li>
                <li>Explain <strong>removeClippedSubviews</strong> only works reliably on Android</li>
                <li>Know the difference between <strong>initialNumToRender</strong> and <strong>maxToRenderPerBatch</strong></li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Using ScrollView for lists with 100+ items</li>
                <li>Creating new function in renderItem (breaks memoization)</li>
                <li>Not implementing getItemLayout for fixed-height lists</li>
                <li>Using removeClippedSubviews on iOS (can cause rendering bugs)</li>
            </ul>
        `},{id:5,category:"Core React Native",icon:"⚛️",question:"How do you handle platform-specific code in React Native?",difficulty:"beginner",seniority:"junior",answer:`
            <h4>1. Platform Module</h4>
            <pre><code>import { Platform } from 'react-native';

// Platform.OS check
const styles = {
    container: {
        paddingTop: Platform.OS === 'ios' ? 44 : 0,
    }
};

// Platform.select
const component = Platform.select({
    ios: () => require('./ComponentIOS'),
    android: () => require('./ComponentAndroid'),
    default: () => require('./ComponentDefault'),
})();</code></pre>

            <h4>2. Platform-Specific File Extensions</h4>
            <pre><code>// File structure
Component.ios.js
Component.android.js
Component.js (fallback)

// Import automatically resolves
import Component from './Component';</code></pre>

            <h4>3. Platform Version Check</h4>
            <pre><code>if (Platform.Version >= 21) {
    // Android Lollipop+ specific code
}

if (parseInt(Platform.Version, 10) >= 14) {
    // iOS 14+ specific code
}</code></pre>
        `},{id:6,category:"Core React Native",icon:"⚛️",question:"Explain the purpose and usage of useCallback and useMemo hooks in React Native.",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>useMemo - Memoize Values</h4>
            <p>Caches computed values to avoid expensive recalculations:</p>
            <pre><code>const expensiveValue = useMemo(() => {
    return items.filter(item => item.active)
                .map(item => transform(item));
}, [items]); // Only recomputes when items change</code></pre>

            <h4>useCallback - Memoize Functions</h4>
            <p>Caches function references to maintain referential equality:</p>
            <pre><code>const handlePress = useCallback((id) => {
    setSelectedId(id);
    onItemSelect(id);
}, [onItemSelect]); // Stable reference unless onItemSelect changes

// Important for FlatList optimization
&lt;FlatList
    data={items}
    renderItem={({ item }) => (
        &lt;Item onPress={handlePress} data={item} /&gt;
    )}
/&gt;</code></pre>

            <h4>When to Use</h4>
            <ul>
                <li><strong>useMemo:</strong> Expensive computations, derived state</li>
                <li><strong>useCallback:</strong> Passing callbacks to optimized child components</li>
                <li><strong>Don't overuse:</strong> Premature optimization adds complexity</li>
            </ul>
        `},{id:7,category:"Navigation",icon:"🧭",question:"Compare different navigation solutions in React Native. Why is React Navigation the most popular?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Navigation Solutions</h4>
            <table>
                <tr><td><strong>React Navigation</strong></td><td>Most popular, JS-based, highly customizable</td></tr>
                <tr><td><strong>React Native Navigation</strong></td><td>Native implementation, better performance, complex setup</td></tr>
                <tr><td><strong>Expo Router</strong></td><td>File-based routing, built on React Navigation</td></tr>
            </table>

            <h4>React Navigation Advantages</h4>
            <ul>
                <li>Pure JavaScript - easier debugging</li>
                <li>Extensive documentation and community</li>
                <li>Works with Expo out of the box</li>
                <li>Highly customizable animations and gestures</li>
                <li>TypeScript support</li>
            </ul>

            <h4>Navigator Types</h4>
            <pre><code>// Stack Navigator - push/pop screens
&lt;Stack.Navigator&gt;
    &lt;Stack.Screen name="Home" component={Home} /&gt;
&lt;/Stack.Navigator&gt;

// Tab Navigator - bottom/top tabs
&lt;Tab.Navigator&gt;
    &lt;Tab.Screen name="Feed" component={Feed} /&gt;
&lt;/Tab.Navigator&gt;

// Drawer Navigator - side menu
&lt;Drawer.Navigator&gt;
    &lt;Drawer.Screen name="Settings" component={Settings} /&gt;
&lt;/Drawer.Navigator&gt;</code></pre>
        `},{id:8,category:"Navigation",icon:"🧭",question:"How do you pass parameters between screens and handle deep linking in React Navigation?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Passing Parameters</h4>
            <pre><code>// Sending params
navigation.navigate('Details', {
    itemId: 42,
    title: 'Product'
});

// Receiving params
function DetailsScreen({ route }) {
    const { itemId, title } = route.params;
}

// With TypeScript
type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number; title: string };
};

type Props = NativeStackScreenProps&lt;RootStackParamList, 'Details'&gt;;</code></pre>

            <h4>Deep Linking Configuration</h4>
            <pre><code>const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
        screens: {
            Home: '',
            Details: 'details/:itemId',
            Profile: {
                path: 'user/:id',
                parse: { id: Number }
            }
        }
    }
};

&lt;NavigationContainer linking={linking}&gt;
    {/* navigators */}
&lt;/NavigationContainer&gt;</code></pre>

            <h4>Universal Links Setup</h4>
            <ul>
                <li>iOS: apple-app-site-association file</li>
                <li>Android: intent filters in AndroidManifest.xml</li>
            </ul>
        `},{id:9,category:"Navigation",icon:"🧭",question:"How do you implement authentication flow with protected routes in React Navigation?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Authentication Flow Pattern</h4>
            <pre><code>function RootNavigator() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return &lt;SplashScreen /&gt;;
    }

    return (
        &lt;Stack.Navigator screenOptions={{ headerShown: false }}&gt;
            {user ? (
                // Authenticated screens
                &lt;Stack.Screen name="Main" component={MainNavigator} /&gt;
            ) : (
                // Auth screens
                &lt;Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ animationTypeForReplace: 'pop' }}
                /&gt;
            )}
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>Auth Context</h4>
            <pre><code>const AuthContext = createContext&lt;AuthContextType&gt;(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check stored token on mount
        checkAuthState();
    }, []);

    const signIn = async (credentials) => {
        const userData = await authService.login(credentials);
        await SecureStore.setItemAsync('token', userData.token);
        setUser(userData);
    };

    return (
        &lt;AuthContext.Provider value={{ user, signIn, signOut, isLoading }}&gt;
            {children}
        &lt;/AuthContext.Provider&gt;
    );
}</code></pre>
        `},{id:10,category:"State Management",icon:"🗃️",question:"Compare Redux, Context API, Zustand, and Jotai. When would you use each?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>State management choice significantly impacts app architecture, performance, and developer experience. Interviewers want to see that you can make informed decisions based on project needs, not just use whatever you've always used.</p>

            <h4>Comprehensive Comparison</h4>
            <table>
                <tr>
                    <td><strong>Aspect</strong></td>
                    <td><strong>Redux</strong></td>
                    <td><strong>Context</strong></td>
                    <td><strong>Zustand</strong></td>
                    <td><strong>Jotai</strong></td>
                </tr>
                <tr>
                    <td>Bundle size</td>
                    <td>~12kb</td>
                    <td>0 (built-in)</td>
                    <td>~1kb</td>
                    <td>~2kb</td>
                </tr>
                <tr>
                    <td>Boilerplate</td>
                    <td>Medium (RTK)</td>
                    <td>Low</td>
                    <td>Very Low</td>
                    <td>Very Low</td>
                </tr>
                <tr>
                    <td>DevTools</td>
                    <td>Excellent</td>
                    <td>Basic</td>
                    <td>Good</td>
                    <td>Good</td>
                </tr>
                <tr>
                    <td>Re-render control</td>
                    <td>Selectors</td>
                    <td>Poor</td>
                    <td>Selectors</td>
                    <td>Atomic</td>
                </tr>
                <tr>
                    <td>Learning curve</td>
                    <td>Steep</td>
                    <td>Easy</td>
                    <td>Easy</td>
                    <td>Medium</td>
                </tr>
                <tr>
                    <td>Middleware</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Limited</td>
                </tr>
            </table>

            <h4>When to Use Each</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────┐
│                   State Management Decision Tree             │
└─────────────────────────────────────────────────────────────┘
                              │
                  ┌───────────┴───────────┐
                  │ Is it server state?    │
                  │ (API data, cache)      │
                  └───────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
             YES             NO              BOTH
              │               │               │
              ▼               │               ▼
        TanStack Query        │         TanStack Query
        (React Query)         │         + client state lib
                              │
                  ┌───────────┴───────────┐
                  │  App size & complexity │
                  └───────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
       Small              Medium               Large
      (< 10 screens)   (10-30 screens)      (30+ screens)
          │                   │                   │
          ▼                   ▼                   ▼
   Context + useReducer   Zustand            Redux Toolkit
   or Zustand             or Jotai           or Zustand</code></pre>

            <h4>Redux Toolkit (Modern Redux)</h4>
            <pre><code>// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for API calls
export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.getUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null as User | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        // Immer allows "mutations" - actually creates new state
        setUser: (state, action: PayloadAction&lt;User&gt;) => {
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Usage with typed hooks
const user = useAppSelector((state) => state.user.data);
const dispatch = useAppDispatch();
dispatch(fetchUser('123'));</code></pre>

            <h4>Zustand (Simple & Powerful)</h4>
            <pre><code>// store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
    user: User | null;
    loading: boolean;
    setUser: (user: User) => void;
    fetchUser: (id: string) => Promise&lt;void&gt;;
    logout: () => void;
}

export const useUserStore = create&lt;UserStore&gt;()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,

            setUser: (user) => set({ user }),

            fetchUser: async (id) => {
                set({ loading: true });
                try {
                    const user = await api.getUser(id);
                    set({ user, loading: false });
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            logout: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ user: state.user }),  // Only persist user
        }
    )
);

// Usage - no Provider needed!
function Profile() {
    // Only re-renders when user changes
    const user = useUserStore((state) => state.user);
    const fetchUser = useUserStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser('123');
    }, []);

    return &lt;Text&gt;{user?.name}&lt;/Text&gt;;
}</code></pre>

            <h4>Context API (Built-in, Use Carefully)</h4>
            <pre><code>// ⚠️ Context re-renders ALL consumers when value changes
// Split contexts to minimize re-renders

// ✅ Good: Separate contexts for different concerns
const UserContext = createContext&lt;User | null&gt;(null);
const UserDispatchContext = createContext&lt;Dispatch&lt;UserAction&gt;&gt;(null);

function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, null);

    return (
        &lt;UserContext.Provider value={user}&gt;
            &lt;UserDispatchContext.Provider value={dispatch}&gt;
                {children}
            &lt;/UserDispatchContext.Provider&gt;
        &lt;/UserContext.Provider&gt;
    );
}

// Components only subscribe to what they need
function UserName() {
    const user = useContext(UserContext);  // Only re-renders on user change
    return &lt;Text&gt;{user?.name}&lt;/Text&gt;;
}

function LogoutButton() {
    const dispatch = useContext(UserDispatchContext);  // Never re-renders!
    return &lt;Button onPress={() => dispatch({ type: 'LOGOUT' })} /&gt;;
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Distinguish between <strong>client state</strong> (UI state) and <strong>server state</strong> (API data)</li>
                <li>Mention <strong>TanStack Query</strong> for server state - it handles caching, refetching, and syncing</li>
                <li>Explain Context's <strong>re-render problem</strong> and how to mitigate it</li>
                <li>Know that Zustand doesn't need a Provider wrapper</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Using Redux for everything when simpler solutions work</li>
                <li>Putting server state in Redux instead of using React Query</li>
                <li>Creating one giant Context that re-renders the entire app</li>
                <li>Not using selectors in Redux, causing unnecessary re-renders</li>
            </ul>
        `},{id:11,category:"State Management",icon:"🗃️",question:"What is React Query/TanStack Query and why is it important for React Native apps?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is TanStack Query?</h4>
            <p>A powerful data-fetching and caching library that handles server state separately from client state.</p>

            <h4>Key Features</h4>
            <ul>
                <li>Automatic caching and cache invalidation</li>
                <li>Background refetching</li>
                <li>Pagination and infinite scroll support</li>
                <li>Optimistic updates</li>
                <li>Offline support</li>
            </ul>

            <h4>Basic Usage</h4>
            <pre><code>// Query - fetching data
const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutation - modifying data
const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }
});

// Optimistic Update
const mutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
        await queryClient.cancelQueries(['todos']);
        const previous = queryClient.getQueryData(['todos']);
        queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
        return { previous };
    },
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context.previous);
    }
});</code></pre>
        `},{id:12,category:"State Management",icon:"🗃️",question:"How do you handle global state persistence in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>AsyncStorage Basics</h4>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('user', JSON.stringify(userData));

// Retrieve data
const jsonValue = await AsyncStorage.getItem('user');
const user = jsonValue != null ? JSON.parse(jsonValue) : null;

// Remove data
await AsyncStorage.removeItem('user');</code></pre>

            <h4>Redux Persist</h4>
            <pre><code>import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'settings'], // only persist these
    blacklist: ['ui'], // don't persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});</code></pre>

            <h4>Zustand Persist</h4>
            <pre><code>import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);</code></pre>
        `},{id:13,category:"Performance",icon:"⚡",question:"What are the main causes of performance issues in React Native and how do you diagnose them?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Performance is often the make-or-break factor for React Native apps. This question tests your ability to identify, diagnose, and fix the most common performance bottlenecks in production apps.</p>

            <h4>React Native's Threading Model</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────────┐
│                    React Native Architecture                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐
│    JS Thread         │      │    UI/Main Thread    │
│    (JavaScript)      │      │    (Native)          │
├──────────────────────┤      ├──────────────────────┤
│ • React reconciliation│      │ • Native view updates│
│ • Your business logic │ ←→   │ • Touch handling     │
│ • Event handlers      │Bridge│ • Animations (native)│
│ • API calls          │      │ • Platform APIs      │
│ • State management   │      │ • Rendering          │
└──────────────────────┘      └──────────────────────┘
         │                              │
         │     ┌──────────────────┐     │
         └────→│  Shadow Thread   │←────┘
               │  (Yoga Layout)   │
               └──────────────────┘

⚠️ If JS Thread is blocked → UI events queue up → janky feel
⚠️ If UI Thread is blocked → Frame drops → visible stuttering</code></pre>

            <h4>Top 10 Performance Issues & Solutions</h4>

            <h5>1. Too Many Re-renders</h5>
            <pre><code>// ❌ Problem: Function created every render
&lt;FlatList
    renderItem={({ item }) => &lt;Item data={item} onPress={() => handlePress(item.id)} /&gt;}
/&gt;

// ✅ Solution: Memoize callback + component
const handlePress = useCallback((id) => { ... }, []);
const renderItem = useCallback(({ item }) => (
    &lt;MemoizedItem data={item} onPress={handlePress} /&gt;
), [handlePress]);

const MemoizedItem = React.memo(Item);</code></pre>

            <h5>2. JS Thread Blocking</h5>
            <pre><code>// ❌ Problem: Heavy computation on JS thread
function SearchResults({ query }) {
    // This blocks the JS thread while computing!
    const results = items.filter(/* complex filter */).sort(/* complex sort */);
}

// ✅ Solution: Debounce + InteractionManager + Pagination
const debouncedSearch = useDebouncedCallback((query) => {
    InteractionManager.runAfterInteractions(() => {
        const results = search(query).slice(0, 20);  // Paginate
        setResults(results);
    });
}, 300);

// ✅ Better: Move heavy work off JS thread with WorkletJS or Native Module</code></pre>

            <h5>3. Large Images</h5>
            <pre><code>// ❌ Problem: Loading 4000x3000 image for 100x100 thumbnail
&lt;Image source={{ uri: largeImageUrl }} style={{ width: 100, height: 100 }} /&gt;

// ✅ Solution: Use appropriately sized images + FastImage
import FastImage from 'react-native-fast-image';

&lt;FastImage
    source={{
        uri: \`\${imageUrl}?w=\${100 * PixelRatio.get()}\`,  // Request right size
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
    }}
    style={{ width: 100, height: 100 }}
/&gt;</code></pre>

            <h5>4. Bridge Congestion</h5>
            <pre><code>// ❌ Problem: Sending large data across bridge frequently
onScroll={(event) => {
    // This fires 60 times/second, flooding the bridge
    setScrollPosition(event.nativeEvent.contentOffset.y);
}}

// ✅ Solution: Use native driver or throttle
// Option 1: Native animated scroll
&lt;Animated.ScrollView
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }  // Stays on native thread
    )}
/&gt;

// Option 2: Throttle events
const handleScroll = useThrottledCallback((y) => {
    setScrollPosition(y);
}, 100);</code></pre>

            <h4>Diagnostic Tools Deep Dive</h4>
            <pre><code>// 1. React DevTools Profiler
// - Install: React Native Debugger or Flipper
// - What to look for:
//   • Components rendering too often (high "Rendered at")
//   • Long render times (> 16ms = frame drop)
//   • "Cascading" renders (parent → many children)

// 2. Performance Monitor (Built-in)
// - Enable: Shake → "Show Perf Monitor"
// Metrics:
//   • JS FPS: Should be 60 (dips = JS thread busy)
//   • UI FPS: Should be 60 (dips = native thread busy)
//   • Views: Total native views (lower = better)
//   • RAM: Memory usage

// 3. Flipper Performance Plugin
// - Tracks: Network, Database, Startup time
// - Can create custom markers

// 4. Why Did You Render
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
});

// Add to component:
MyComponent.whyDidYouRender = true;</code></pre>

            <h4>Performance Checklist</h4>
            <pre><code>□ FlatList instead of ScrollView for long lists
□ React.memo() on list items and expensive components
□ useCallback/useMemo for callbacks and derived data
□ getItemLayout for fixed-height FlatList items
□ FastImage instead of Image for network images
□ useNativeDriver: true for Animated
□ Hermes enabled (faster startup, lower memory)
□ InteractionManager for deferred heavy work
□ Proper cleanup in useEffect (prevent memory leaks)
□ Avoid inline styles and objects in render</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>two-thread model</strong> (JS + Native) and how blocking either causes jank</li>
                <li>Know specific tools: <strong>React DevTools Profiler, Flipper, Performance Monitor</strong></li>
                <li>Discuss <strong>useNativeDriver</strong> and why it helps animations</li>
                <li>Mention the <strong>New Architecture</strong> reduces bridge congestion via JSI</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Optimizing before measuring (premature optimization)</li>
                <li>Adding memo/useCallback everywhere (adds overhead for simple cases)</li>
                <li>Not testing on low-end Android devices</li>
                <li>Ignoring memory usage until app crashes</li>
            </ul>
        `},{id:14,category:"Performance",icon:"⚡",question:"How do you optimize FlatList for rendering thousands of items?",difficulty:"advanced",seniority:"mid",answer:`
            <h4>Essential Optimizations</h4>
            <pre><code>&lt;FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}

    // Layout optimization - CRITICAL for performance
    getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })}

    // Virtualization tuning
    windowSize={5}              // Render 5 screens worth
    maxToRenderPerBatch={10}    // Items per batch
    updateCellsBatchingPeriod={50}
    initialNumToRender={10}

    // Memory optimization
    removeClippedSubviews={true}

    // Prevent re-renders
    extraData={selectedId}      // Only when needed
/&gt;</code></pre>

            <h4>Component Optimization</h4>
            <pre><code>// Memoize renderItem
const renderItem = useCallback(({ item }) => (
    &lt;MemoizedItem item={item} onPress={handlePress} /&gt;
), [handlePress]);

// Memoize list items
const MemoizedItem = React.memo(({ item, onPress }) => (
    &lt;TouchableOpacity onPress={() => onPress(item.id)}&gt;
        &lt;Text&gt;{item.title}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
), (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
});</code></pre>

            <h4>Advanced: FlashList</h4>
            <pre><code>// Shopify's FlashList - drop-in replacement
import { FlashList } from "@shopify/flash-list";

&lt;FlashList
    data={data}
    renderItem={renderItem}
    estimatedItemSize={80}  // Required
/&gt;</code></pre>
        `},{id:15,category:"Performance",icon:"⚡",question:"Explain Hermes and its benefits. How does it improve React Native performance?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Hermes?</h4>
            <p>Hermes is a JavaScript engine optimized specifically for React Native, developed by Meta.</p>

            <h4>Key Benefits</h4>
            <ul>
                <li><strong>Faster App Launch:</strong> Bytecode precompilation reduces startup time</li>
                <li><strong>Lower Memory Usage:</strong> Optimized garbage collection</li>
                <li><strong>Smaller App Size:</strong> Bytecode is smaller than minified JS</li>
                <li><strong>Better Performance:</strong> Optimized for mobile constraints</li>
            </ul>

            <h4>Enabling Hermes</h4>
            <pre><code>// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]

// iOS - Podfile
use_react_native!(
    :hermes_enabled => true
)

// Then run
cd ios && pod install</code></pre>

            <h4>Performance Comparison</h4>
            <ul>
                <li>TTI (Time to Interactive): ~30-40% faster</li>
                <li>Memory: ~20-30% reduction</li>
                <li>App Size: ~10-20% smaller</li>
            </ul>

            <h4>Debugging with Hermes</h4>
            <pre><code>// Use Flipper for debugging
// Chrome DevTools via Flipper plugin
// Direct debugging: chrome://inspect</code></pre>
        `},{id:16,category:"Performance",icon:"⚡",question:"How do you prevent unnecessary re-renders in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>1. React.memo for Functional Components</h4>
            <pre><code>const MyComponent = React.memo(({ data, onPress }) => {
    return &lt;View&gt;...&lt;/View&gt;;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.data.id === nextProps.data.id;
});</code></pre>

            <h4>2. useCallback for Event Handlers</h4>
            <pre><code>// ❌ Bad - new function every render
&lt;Button onPress={() => handlePress(id)} /&gt;

// ✅ Good - stable function reference
const handlePressCallback = useCallback(() => {
    handlePress(id);
}, [id, handlePress]);

&lt;Button onPress={handlePressCallback} /&gt;</code></pre>

            <h4>3. useMemo for Expensive Computations</h4>
            <pre><code>const filteredData = useMemo(() => {
    return data.filter(item => item.active)
               .sort((a, b) => a.name.localeCompare(b.name));
}, [data]);</code></pre>

            <h4>4. State Structure Optimization</h4>
            <pre><code>// ❌ Bad - entire component re-renders
const [state, setState] = useState({ user: null, posts: [], ui: {} });

// ✅ Good - separate concerns
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [ui, setUi] = useState({});</code></pre>

            <h4>5. Context Splitting</h4>
            <pre><code>// Split context to prevent cascading re-renders
const UserContext = createContext();
const UserDispatchContext = createContext();</code></pre>
        `},{id:17,category:"Native Modules",icon:"🔧",question:"Explain the React Native Bridge architecture. What are its limitations?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Bridge Architecture (Old Architecture)</h4>
            <p>The bridge is an asynchronous, serialized, batched communication layer between JavaScript and Native.</p>

            <h4>How It Works</h4>
            <ol>
                <li>JS code makes a native call</li>
                <li>Call is serialized to JSON</li>
                <li>JSON is sent across the bridge asynchronously</li>
                <li>Native side deserializes and executes</li>
                <li>Response follows the same path back</li>
            </ol>

            <h4>Bridge Limitations</h4>
            <ul>
                <li><strong>Asynchronous:</strong> No synchronous calls possible</li>
                <li><strong>Serialization Overhead:</strong> JSON encoding/decoding is costly</li>
                <li><strong>No Type Safety:</strong> All data is serialized as JSON</li>
                <li><strong>Single Threaded:</strong> Bridge operations are queued</li>
                <li><strong>Memory Copies:</strong> Data is copied between realms</li>
            </ul>

            <h4>Performance Impact</h4>
            <pre><code>// Heavy bridge traffic example
// Each frame sends layout data across bridge
// 60fps × multiple views = thousands of bridge calls/second

// Gestures are particularly affected
// Touch events must cross bridge for JS handling</code></pre>
        `},{id:18,category:"Native Modules",icon:"🔧",question:"How do you create a Native Module for iOS and Android?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>iOS Native Module (Objective-C)</h4>
            <pre><code>// CalendarModule.m
#import &lt;React/RCTBridgeModule.h&gt;

@interface CalendarModule : NSObject &lt;RCTBridgeModule&gt;
@end

@implementation CalendarModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createEvent:(NSString *)title
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    // Native implementation
    resolve(@{@"eventId": @"123"});
}

@end</code></pre>

            <h4>Android Native Module (Kotlin)</h4>
            <pre><code>// CalendarModule.kt
class CalendarModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createEvent(title: String, location: String, promise: Promise) {
        try {
            // Native implementation
            promise.resolve(mapOf("eventId" to "123"))
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
}</code></pre>

            <h4>JavaScript Usage</h4>
            <pre><code>import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

const result = await CalendarModule.createEvent(
    'Meeting',
    'Office'
);</code></pre>
        `},{id:19,category:"Native Modules",icon:"🔧",question:"What is JSI and how does it differ from the traditional bridge?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>JavaScript Interface (JSI)</h4>
            <p>JSI is a lightweight C++ layer that allows JavaScript to directly hold references to C++ objects and invoke methods on them.</p>

            <h4>Key Differences from Bridge</h4>
            <table>
                <tr><td><strong>Bridge</strong></td><td><strong>JSI</strong></td></tr>
                <tr><td>Asynchronous only</td><td>Synchronous + Async</td></tr>
                <tr><td>JSON serialization</td><td>Direct memory access</td></tr>
                <tr><td>Data copying</td><td>Shared ownership</td></tr>
                <tr><td>Batched calls</td><td>Immediate execution</td></tr>
            </table>

            <h4>JSI Benefits</h4>
            <ul>
                <li><strong>Zero-copy data sharing:</strong> ArrayBuffer shared between JS and native</li>
                <li><strong>Synchronous calls:</strong> Critical for animations and gestures</li>
                <li><strong>Type safety:</strong> Direct C++ bindings</li>
                <li><strong>Lazy loading:</strong> Load native modules on demand</li>
            </ul>

            <h4>JSI Example</h4>
            <pre><code>// JSI Host Object (C++)
class MyModule : public jsi::HostObject {
public:
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override {
        if (name.utf8(rt) == "multiply") {
            return jsi::Function::createFromHostFunction(rt, name, 2,
                [](jsi::Runtime& rt, const jsi::Value& thisVal,
                   const jsi::Value* args, size_t count) {
                    double a = args[0].asNumber();
                    double b = args[1].asNumber();
                    return jsi::Value(a * b);
                });
        }
        return jsi::Value::undefined();
    }
};</code></pre>
        `},{id:20,category:"New Architecture",icon:"🏗️",question:"Explain the React Native New Architecture: Fabric, TurboModules, and Codegen.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>The New Architecture is the biggest change to React Native since its inception. It's now enabled by default in RN 0.76+. Understanding it demonstrates you're up-to-date with the platform and can build high-performance apps.</p>

            <h4>Old vs New Architecture Overview</h4>
            <pre><code>
════════════════════════════════════════════════════════════════
                    OLD ARCHITECTURE
════════════════════════════════════════════════════════════════

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  JavaScript │   JSON  │   Bridge    │  JSON   │   Native    │
│   Thread    │ ──────→ │ (Async,     │ ──────→ │   Thread    │
│             │ ←────── │  Batched)   │ ←────── │             │
└─────────────┘         └─────────────┘         └─────────────┘

Problems:
• All communication is asynchronous
• JSON serialization overhead
• Data copying between threads
• No synchronous measurements possible
• Bridge is a bottleneck

════════════════════════════════════════════════════════════════
                    NEW ARCHITECTURE
════════════════════════════════════════════════════════════════

┌─────────────┐                                 ┌─────────────┐
│  JavaScript │ ◄──────── JSI ────────────────► │   Native    │
│   Thread    │   (Direct C++ bindings)         │   Thread    │
└─────────────┘                                 └─────────────┘
        │                                               │
        │           ┌───────────────────┐              │
        └──────────►│  Shared C++ Core  │◄─────────────┘
                    │  (Fabric, Yoga)   │
                    └───────────────────┘

Benefits:
• Synchronous method calls possible
• No serialization overhead
• Direct memory access
• Shared ownership of objects
• Concurrent rendering support</code></pre>

            <h4>The Three Pillars Explained</h4>

            <h4>1. JSI (JavaScript Interface)</h4>
            <p>The foundation - a C++ API that allows JavaScript to hold references to and call C++ objects directly.</p>
            <pre><code>// Old way: Bridge (async, serialized)
NativeModules.MyModule.calculate(1, 2, (result) => {
    console.log(result);  // Callback after bridge round-trip
});

// New way: JSI (sync possible, no serialization)
// JavaScript can call C++ directly
const result = global.MyModule.calculate(1, 2);  // Synchronous!
console.log(result);</code></pre>

            <h4>2. Fabric (New Rendering System)</h4>
            <p>Replaces the old UI Manager. Written in C++ for cross-platform consistency.</p>
            <pre><code>// Key Fabric improvements:

// 1. Synchronous layout measurement
// Old: Request measurement → wait for bridge → get result
// New: Measure immediately when needed
const { width, height } = view.measure();  // Sync!

// 2. Concurrent rendering support
// Can interrupt rendering to handle high-priority updates
// Enables React 18 features: Suspense, Transitions

// 3. Multiple render priorities
// Priority 1: User input (touch, keyboard)
// Priority 2: Animations
// Priority 3: Data loading

// 4. C++ Shadow Tree
// Layout calculated in C++, shared between platforms
// Same layout behavior on iOS and Android</code></pre>

            <h4>3. TurboModules</h4>
            <p>Replacement for Native Modules with lazy loading and type safety.</p>
            <pre><code>// TurboModule Definition (TypeScript spec)
// NativeCalculator.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    // Codegen generates native interfaces from this!
    add(a: number, b: number): number;  // Sync
    fetchData(url: string): Promise&lt;string&gt;;  // Async
    readonly PI: number;  // Constants
}

export default TurboModuleRegistry.getEnforcing&lt;Spec&gt;('Calculator');

// Key improvements over Native Modules:
// 1. Lazy loading: Module code loaded only when first accessed
// 2. Type safety: TypeScript spec → native code generation
// 3. Direct calls: No JSON serialization via JSI
// 4. Sync methods: Can return values synchronously</code></pre>

            <h4>4. Codegen</h4>
            <p>Automatically generates native code from TypeScript specifications.</p>
            <pre><code>// Your TypeScript spec
interface Spec extends TurboModule {
    multiply(a: number, b: number): number;
}

// Codegen generates:

// iOS (Objective-C++ header)
@protocol NativeCalculatorSpec &lt;RCTBridgeModule, RCTTurboModule&gt;
- (NSNumber *)multiply:(double)a b:(double)b;
@end

// Android (Java interface)
public interface NativeCalculatorSpec extends ReactModule {
    double multiply(double a, double b);
}

// Benefits:
// • Type mismatches caught at build time
// • No manual native interface writing
// • Consistent contracts between JS and native</code></pre>

            <h4>Enabling New Architecture</h4>
            <pre><code>// React Native 0.76+ has it enabled by default!

// For older versions:

// Android - android/gradle.properties
newArchEnabled=true

// iOS - Podfile (before 'use_react_native!')
ENV['RCT_NEW_ARCH_ENABLED'] = '1'

// Then install pods
cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

// Verify it's working
// In your app:
import { Platform } from 'react-native';
console.log('Fabric enabled:', global._IS_FABRIC);
console.log('TurboModules:', !!global.__turboModuleProxy);</code></pre>

            <h4>Performance Comparison</h4>
            <table>
                <tr><td><strong>Metric</strong></td><td><strong>Old Arch</strong></td><td><strong>New Arch</strong></td></tr>
                <tr><td>Module initialization</td><td>All at startup</td><td>Lazy (on first use)</td></tr>
                <tr><td>JS → Native call</td><td>~1-2ms (async)</td><td>~0.01ms (sync possible)</td></tr>
                <tr><td>Layout sync measurement</td><td>Not possible</td><td>Yes</td></tr>
                <tr><td>Memory for large data</td><td>Copied (2x)</td><td>Shared</td></tr>
                <tr><td>Concurrent rendering</td><td>No</td><td>Yes</td></tr>
            </table>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Know the <strong>three pillars</strong>: JSI, Fabric, TurboModules</li>
                <li>Explain <strong>why it's faster</strong>: no JSON serialization, sync calls, shared memory</li>
                <li>Mention <strong>Codegen</strong> for type safety</li>
                <li>Note that <strong>RN 0.76+</strong> has New Architecture enabled by default</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "New Architecture is optional" - It's now the default</li>
                <li><strong>Wrong:</strong> "All libraries need updating" - Most popular libraries already support it</li>
                <li><strong>Correct:</strong> "It enables synchronous communication when needed"</li>
            </ul>
        `},{id:21,category:"New Architecture",icon:"🏗️",question:"How do you migrate an existing app to the New Architecture?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Migration Steps</h4>

            <h4>1. Prerequisites</h4>
            <pre><code>// Ensure RN 0.71+ (recommended 0.73+)
// Update all dependencies
npx react-native upgrade

// Check library compatibility
npx react-native-new-arch-check</code></pre>

            <h4>2. Enable New Architecture</h4>
            <pre><code>// android/gradle.properties
newArchEnabled=true

// iOS Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '1'</code></pre>

            <h4>3. Update Native Modules to TurboModules</h4>
            <pre><code>// Create spec file: NativeCalendar.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    createEvent(title: string, location: string): Promise&lt;string&gt;;
}

export default TurboModuleRegistry.getEnforcing&lt;Spec&gt;(
    'Calendar'
);</code></pre>

            <h4>4. Update Native Components to Fabric</h4>
            <pre><code>// Create component spec
// MyComponentNativeComponent.ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface NativeProps extends ViewProps {
    color?: string;
    enabled?: boolean;
}

export default codegenNativeComponent&lt;NativeProps&gt;('MyComponent');</code></pre>

            <h4>Common Migration Issues</h4>
            <ul>
                <li>Third-party libraries not yet compatible</li>
                <li>Direct native code modifications needed</li>
                <li>Testing thoroughly on both platforms</li>
            </ul>
        `},{id:22,category:"Animations",icon:"✨",question:"Compare Animated API vs Reanimated. When should you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Animated API (Built-in)</h4>
            <ul>
                <li>Ships with React Native</li>
                <li>Uses bridge for JS-driven animations</li>
                <li>useNativeDriver for basic transforms</li>
                <li>Good for simple animations</li>
            </ul>

            <h4>Reanimated 2/3</h4>
            <ul>
                <li>Runs entirely on UI thread</li>
                <li>Worklets - JS functions running on native</li>
                <li>No bridge bottleneck</li>
                <li>Complex gesture-driven animations</li>
            </ul>

            <h4>Animated API Example</h4>
            <pre><code>const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, // Important!
    }).start();
}, []);

&lt;Animated.View style={{ opacity: fadeAnim }}&gt;
    &lt;Text&gt;Fade In&lt;/Text&gt;
&lt;/Animated.View&gt;</code></pre>

            <h4>Reanimated Example</h4>
            <pre><code>import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

const offset = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
}));

const handlePress = () => {
    offset.value = withSpring(offset.value + 50);
};

&lt;Animated.View style={[styles.box, animatedStyle]} /&gt;</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li><strong>Animated:</strong> Simple fades, basic transforms, progress bars</li>
                <li><strong>Reanimated:</strong> Gesture-driven, complex sequences, shared element transitions</li>
            </ul>
        `},{id:23,category:"Animations",icon:"✨",question:"How do you implement gesture-driven animations with Reanimated and Gesture Handler?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Setup</h4>
            <pre><code>npm install react-native-reanimated react-native-gesture-handler

// babel.config.js
plugins: ['react-native-reanimated/plugin']

// Wrap app with GestureHandlerRootView</code></pre>

            <h4>Pan Gesture with Animation</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

function DraggableBox() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ x: 0, y: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = {
                x: translateX.value,
                y: translateY.value
            };
        })
        .onUpdate((event) => {
            translateX.value = context.value.x + event.translationX;
            translateY.value = context.value.y + event.translationY;
        })
        .onEnd(() => {
            // Spring back to origin
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        &lt;GestureDetector gesture={gesture}&gt;
            &lt;Animated.View style={[styles.box, animatedStyle]} /&gt;
        &lt;/GestureDetector&gt;
    );
}</code></pre>
        `},{id:24,category:"Animations",icon:"✨",question:"What is LayoutAnimation and when should you use it?",difficulty:"beginner",seniority:"junior",answer:`
            <h4>What is LayoutAnimation?</h4>
            <p>LayoutAnimation automatically animates views to their new positions when the next layout change happens.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable on Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function MyComponent() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        &lt;View&gt;
            &lt;TouchableOpacity onPress={toggleExpand}&gt;
                &lt;Text&gt;Toggle&lt;/Text&gt;
            &lt;/TouchableOpacity&gt;
            &lt;View style={{ height: expanded ? 200 : 100 }} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Custom Configuration</h4>
            <pre><code>LayoutAnimation.configureNext({
    duration: 300,
    create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
    },
    delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity,
    },
});</code></pre>

            <h4>When to Use</h4>
            <ul>
                <li>List item additions/removals</li>
                <li>Expanding/collapsing sections</li>
                <li>Simple layout transitions</li>
                <li>Not for continuous or gesture-driven animations</li>
            </ul>
        `},{id:25,category:"Testing",icon:"🧪",question:"Explain the testing pyramid for React Native apps. What tools would you use at each level?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Testing Pyramid</h4>
            <pre><code>        /\\
       /E2E\\      ← Detox, Appium, Maestro
      /------\\
     / Integ  \\   ← React Native Testing Library
    /----------\\
   /    Unit    \\ ← Jest, React Test Renderer
  /--------------\\</code></pre>

            <h4>Unit Tests (Jest)</h4>
            <pre><code>// Testing utilities and hooks
describe('formatCurrency', () => {
    it('formats USD correctly', () => {
        expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });
});

// Testing custom hooks
import { renderHook, act } from '@testing-library/react-hooks';

test('useCounter increments', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
});</code></pre>

            <h4>Component Tests (RNTL)</h4>
            <pre><code>import { render, fireEvent } from '@testing-library/react-native';

test('button calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(&lt;Button onPress={onPress}&gt;Click&lt;/Button&gt;);

    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
});</code></pre>

            <h4>E2E Tests (Detox)</h4>
            <pre><code>describe('Login Flow', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should login successfully', async () => {
        await element(by.id('email')).typeText('user@test.com');
        await element(by.id('password')).typeText('password');
        await element(by.id('login-btn')).tap();
        await expect(element(by.id('home-screen'))).toBeVisible();
    });
});</code></pre>
        `},{id:26,category:"Testing",icon:"🧪",question:"How do you mock native modules and platform-specific code in tests?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Mocking Native Modules</h4>
            <pre><code>// __mocks__/react-native-camera.js
export default {
    takePictureAsync: jest.fn().mockResolvedValue({ uri: 'mock-uri' }),
};

// jest.setup.js
jest.mock('react-native-camera');

// Or inline mock
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);</code></pre>

            <h4>Mocking Platform</h4>
            <pre><code>// Test iOS-specific code
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    Version: '14.0',
    select: jest.fn((objs) => objs.ios),
}));

// Or use doMock for test-specific mocks
beforeEach(() => {
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
        Version: 30,
    }));
});</code></pre>

            <h4>Mocking NativeModules</h4>
            <pre><code>// jest.setup.js
import { NativeModules } from 'react-native';

NativeModules.CalendarModule = {
    createEvent: jest.fn().mockResolvedValue({ eventId: '123' }),
};

NativeModules.SettingsManager = {
    settings: { AppleLocale: 'en_US' },
};</code></pre>

            <h4>Testing Platform-Specific Components</h4>
            <pre><code>// Component.ios.test.js
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.Platform.OS = 'ios';
    return RN;
});

import Component from './Component'; // Loads Component.ios.js</code></pre>
        `},{id:27,category:"TypeScript",icon:"📘",question:"How do you properly type navigation props and route params in React Navigation with TypeScript?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Define Route Params</h4>
            <pre><code>// navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    Details: { itemId: string; title?: string };
    Profile: { userId: string };
    Settings: undefined;
};

export type RootTabParamList = {
    Feed: undefined;
    Search: { query?: string };
    Notifications: undefined;
};</code></pre>

            <h4>Typed Navigation Hook</h4>
            <pre><code>import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Create typed hooks
type DetailsScreenNavigationProp = NativeStackNavigationProp&lt;
    RootStackParamList,
    'Details'
&gt;;
type DetailsScreenRouteProp = RouteProp&lt;RootStackParamList, 'Details'&gt;;

function DetailsScreen() {
    const navigation = useNavigation&lt;DetailsScreenNavigationProp&gt;();
    const route = useRoute&lt;DetailsScreenRouteProp&gt;();

    const { itemId, title } = route.params; // Typed!

    navigation.navigate('Profile', { userId: '123' }); // Type-checked!
}</code></pre>

            <h4>Global Type Declaration</h4>
            <pre><code>// Enables autocomplete everywhere
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}</code></pre>
        `},{id:28,category:"TypeScript",icon:"📘",question:"How do you type custom hooks and Context in React Native with TypeScript?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Typed Custom Hook</h4>
            <pre><code>interface UseApiOptions&lt;T&gt; {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

interface UseApiResult&lt;T&gt; {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise&lt;void&gt;;
}

function useApi&lt;T&gt;(
    url: string,
    options?: UseApiOptions&lt;T&gt;
): UseApiResult&lt;T&gt; {
    const [data, setData] = useState&lt;T | null&gt;(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState&lt;Error | null&gt;(null);

    // ... implementation

    return { data, loading, error, refetch };
}</code></pre>

            <h4>Typed Context</h4>
            <pre><code>interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise&lt;void&gt;;
    signOut: () => Promise&lt;void&gt;;
}

const AuthContext = createContext&lt;AuthContextType | null&gt;(null);

// Type-safe hook
function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
    // ... implementation
    return (
        &lt;AuthContext.Provider value={{ user, isLoading, signIn, signOut }}&gt;
            {children}
        &lt;/AuthContext.Provider&gt;
    );
}</code></pre>
        `},{id:29,category:"Debugging",icon:"🐛",question:"What debugging tools are available for React Native and when would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Debugging Tools Overview</h4>

            <h4>1. Flipper (Recommended)</h4>
            <ul>
                <li>Network inspector</li>
                <li>Layout inspector</li>
                <li>React DevTools integration</li>
                <li>Native logs (iOS/Android)</li>
                <li>Hermes debugger</li>
                <li>Custom plugins</li>
            </ul>

            <h4>2. React Native Debugger</h4>
            <ul>
                <li>Redux DevTools built-in</li>
                <li>React DevTools</li>
                <li>Network inspection</li>
                <li>AsyncStorage viewer</li>
            </ul>

            <h4>3. Chrome DevTools</h4>
            <pre><code>// Enable remote debugging
// Shake device → Debug with Chrome
// Open chrome://inspect</code></pre>

            <h4>4. Console Methods</h4>
            <pre><code>console.log('Basic logging');
console.warn('Warning - shows yellow box');
console.error('Error - shows red box');
console.table(arrayOfObjects); // Tabular view
console.time('operation');
// ... code
console.timeEnd('operation'); // Shows duration</code></pre>

            <h4>5. Native Debugging</h4>
            <ul>
                <li><strong>iOS:</strong> Xcode debugger, Instruments</li>
                <li><strong>Android:</strong> Android Studio, Logcat</li>
            </ul>

            <h4>6. Performance Profiling</h4>
            <pre><code>// Enable Performance Monitor
// Shake → Show Perf Monitor
// Watch JS and UI frame rates</code></pre>
        `},{id:30,category:"Debugging",icon:"🐛",question:"How do you debug memory leaks in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Common Memory Leak Causes</h4>
            <ul>
                <li>Uncleared timers (setTimeout, setInterval)</li>
                <li>Event listeners not removed</li>
                <li>Subscriptions not unsubscribed</li>
                <li>Closures holding references</li>
                <li>Large images not released</li>
            </ul>

            <h4>Prevention Patterns</h4>
            <pre><code>useEffect(() => {
    // Timer
    const timer = setTimeout(() => {}, 1000);

    // Event listener
    const subscription = eventEmitter.addListener('event', handler);

    // API call with abort
    const controller = new AbortController();
    fetch(url, { signal: controller.signal });

    // Cleanup function
    return () => {
        clearTimeout(timer);
        subscription.remove();
        controller.abort();
    };
}, []);</code></pre>

            <h4>Detecting Leaks</h4>
            <pre><code>// 1. Flipper Memory Plugin
// Monitor JS heap size over time

// 2. Xcode Memory Graph
// Debug → Debug Workflow → View Memory Graph

// 3. Android Studio Profiler
// View → Tool Windows → Profiler

// 4. why-did-you-render library
import React from 'react';

if (__DEV__) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, { trackAllPureComponents: true });
}</code></pre>

            <h4>Memory Monitoring</h4>
            <pre><code>// Check memory periodically
if (__DEV__) {
    setInterval(() => {
        const used = performance.memory?.usedJSHeapSize;
        console.log('Memory:', Math.round(used / 1024 / 1024), 'MB');
    }, 5000);
}</code></pre>
        `},{id:31,category:"Build & Deployment",icon:"📦",question:"Explain the differences between Debug and Release builds. How do you optimize Release builds?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Debug vs Release Builds</h4>
            <table>
                <tr><td><strong>Debug</strong></td><td><strong>Release</strong></td></tr>
                <tr><td>Dev server enabled</td><td>Bundle embedded</td></tr>
                <tr><td>Debugging tools active</td><td>Debug code stripped</td></tr>
                <tr><td>No code optimization</td><td>Minified & optimized</td></tr>
                <tr><td>Source maps included</td><td>Source maps separate</td></tr>
                <tr><td>Slower performance</td><td>Full performance</td></tr>
            </table>

            <h4>Creating Release Builds</h4>
            <pre><code>// Android
cd android && ./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/

// iOS
xcodebuild -workspace ios/App.xcworkspace \\
    -scheme App \\
    -configuration Release \\
    -archivePath build/App.xcarchive \\
    archive</code></pre>

            <h4>Release Optimizations</h4>
            <pre><code>// 1. Enable Hermes
// android/app/build.gradle
project.ext.react = [enableHermes: true]

// 2. Enable ProGuard (Android)
// android/app/build.gradle
def enableProguardInReleaseBuilds = true

// 3. Code splitting with Re.Pack
// Dynamic imports for large features

// 4. Asset optimization
// Compress images, use WebP format

// 5. Remove console logs
// babel.config.js (with babel-plugin-transform-remove-console)
plugins: [
    ['transform-remove-console', { exclude: ['error', 'warn'] }]
]</code></pre>
        `},{id:32,category:"Build & Deployment",icon:"📦",question:"How do you set up CI/CD for React Native apps? What tools would you use?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Popular CI/CD Tools</h4>
            <ul>
                <li><strong>EAS Build (Expo):</strong> Managed build service</li>
                <li><strong>Fastlane:</strong> Automation for iOS/Android</li>
                <li><strong>GitHub Actions:</strong> CI/CD workflows</li>
                <li><strong>Bitrise:</strong> Mobile-focused CI</li>
                <li><strong>App Center:</strong> MS build & distribution</li>
            </ul>

            <h4>GitHub Actions Example</h4>
            <pre><code># .github/workflows/build.yml
name: Build & Test

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'
      - run: yarn install
      - run: yarn test
      - run: yarn lint

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: 17
      - run: yarn install
      - run: cd android && ./gradlew assembleRelease
      - uses: actions/upload-artifact@v3
        with:
          name: android-release
          path: android/app/build/outputs/apk/release/</code></pre>

            <h4>Fastlane Setup</h4>
            <pre><code># fastlane/Fastfile
platform :ios do
  lane :beta do
    build_app(scheme: "MyApp")
    upload_to_testflight
  end
end

platform :android do
  lane :beta do
    gradle(task: "assembleRelease")
    upload_to_play_store(track: "beta")
  end
end</code></pre>
        `},{id:33,category:"Build & Deployment",icon:"📦",question:"What is CodePush and how does it enable over-the-air updates?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is CodePush?</h4>
            <p>CodePush allows you to push JavaScript and asset updates directly to users without going through app store review.</p>

            <h4>How It Works</h4>
            <ol>
                <li>App checks CodePush server on launch</li>
                <li>If update available, downloads JS bundle</li>
                <li>Applies update (immediately or on next restart)</li>
                <li>Users get updates without store update</li>
            </ol>

            <h4>Setup</h4>
            <pre><code>// Install
npm install react-native-code-push

// Wrap App component
import codePush from 'react-native-code-push';

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

export default codePush(codePushOptions)(App);</code></pre>

            <h4>Deployment</h4>
            <pre><code># Release to staging
appcenter codepush release-react -a Owner/App-iOS -d Staging

# Promote to production
appcenter codepush promote -a Owner/App-iOS -s Staging -d Production

# Release with target version
appcenter codepush release-react -a Owner/App -t "1.2.x"</code></pre>

            <h4>Limitations</h4>
            <ul>
                <li>Cannot update native code</li>
                <li>Limited to JS/assets changes</li>
                <li>Store policies still apply for major changes</li>
                <li>Alternatives: Expo Updates, custom solution</li>
            </ul>
        `},{id:34,category:"Security",icon:"🔒",question:"What are the main security concerns in React Native apps and how do you address them?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Mobile security is critical for protecting user data and meeting compliance requirements (GDPR, HIPAA, PCI-DSS). This question tests your awareness of mobile-specific threats and your ability to implement defense-in-depth.</p>

            <h4>Mobile Security Threat Model</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────┐
│                    ATTACK SURFACE                            │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐         ┌──────────────┐
    │   Device     │         │   Network    │
    │   Attacks    │         │   Attacks    │
    ├──────────────┤         ├──────────────┤
    │ • Rooted/JB  │         │ • MITM       │
    │ • Malware    │         │ • Sniffing   │
    │ • Theft      │         │ • Replay     │
    │ • Keyloggers │         │ • Injection  │
    └──────────────┘         └──────────────┘

    ┌──────────────┐         ┌──────────────┐
    │   Binary     │         │   Backend    │
    │   Attacks    │         │   Attacks    │
    ├──────────────┤         ├──────────────┤
    │ • Reverse Eng│         │ • Auth bypass│
    │ • Tampering  │         │ • API abuse  │
    │ • Debugging  │         │ • Data leak  │
    │ • Cloning    │         │ • Injection  │
    └──────────────┘         └──────────────┘</code></pre>

            <h4>1. Secure Storage (Critical)</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// ❌ NEVER store sensitive data in AsyncStorage
// ═══════════════════════════════════════════════════
// AsyncStorage is NOT encrypted, easily readable on rooted devices

// ═══════════════════════════════════════════════════
// ✅ Use Platform Secure Storage
// ═══════════════════════════════════════════════════

// Option 1: react-native-keychain
import * as Keychain from 'react-native-keychain';

// Store credentials with hardware security
async function storeToken(token: string) {
    await Keychain.setGenericPassword('auth', token, {
        // iOS: Store in Secure Enclave when available
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        // Android: Use hardware-backed keystore
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        // Require biometric to access
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    });
}

// Option 2: expo-secure-store
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    requireAuthentication: true,
});

// ═══════════════════════════════════════════════════
// What goes where:
// ═══════════════════════════════════════════════════
// SecureStore/Keychain: Tokens, passwords, API keys, PII
// AsyncStorage: Preferences, non-sensitive cache
// MMKV (encrypted): Large non-sensitive data needing speed</code></pre>

            <h4>2. Network Security</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Certificate Pinning - Prevent MITM attacks
// ═══════════════════════════════════════════════════

// Using react-native-ssl-pinning
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.myapp.com/data', {
    method: 'GET',
    headers: { Authorization: \`Bearer \${token}\` },
    sslPinning: {
        certs: ['my_cert'],  // Certificate in app bundle
    },
    timeoutInterval: 10000,
});

// ═══════════════════════════════════════════════════
// For Axios users: react-native-ssl-public-key-pinning
// ═══════════════════════════════════════════════════
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';

await initializeSslPinning({
    'api.myapp.com': {
        includeSubdomains: true,
        publicKeyHashes: [
            'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
            'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',  // Backup
        ],
    },
});

// ═══════════════════════════════════════════════════
// Additional Network Security
// ═══════════════════════════════════════════════════
// 1. Always use HTTPS
// 2. Validate server certificates
// 3. Don't trust user-installed CAs in production
// 4. Implement request signing for sensitive APIs</code></pre>

            <h4>3. Runtime Security</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Detect compromised devices
// ═══════════════════════════════════════════════════
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';

async function checkSecurityStatus() {
    const checks = {
        isRooted: JailMonkey.isJailBroken(),
        isDebugged: JailMonkey.isDebuggedMode(),
        isEmulator: await DeviceInfo.isEmulator(),
        hasHooks: JailMonkey.hookDetected(),  // Frida, Xposed
        canMockLocation: JailMonkey.canMockLocation(),
    };

    // Risk scoring
    const riskLevel = Object.values(checks).filter(Boolean).length;

    if (riskLevel >= 2) {
        // High risk: Block sensitive features
        return { safe: false, reason: 'Device security compromised' };
    }

    if (checks.isRooted && !__DEV__) {
        // Rooted in production: Warn user
        Alert.alert(
            'Security Warning',
            'This device may be compromised. Some features are disabled.'
        );
    }

    return { safe: true };
}

// ═══════════════════════════════════════════════════
// Detect tampering (app integrity)
// ═══════════════════════════════════════════════════
// iOS: App Attest API
// Android: Play Integrity API
// Consider: freerasp library for comprehensive checks</code></pre>

            <h4>4. Code Protection</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Hermes provides baseline protection
// ═══════════════════════════════════════════════════
// JS is compiled to bytecode (not plain text)
// But can still be decompiled!

// ═══════════════════════════════════════════════════
// Android: Enable ProGuard/R8
// ═══════════════════════════════════════════════════
// android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                          'proguard-rules.pro'
        }
    }
}

// ═══════════════════════════════════════════════════
// What NOT to put in your code
// ═══════════════════════════════════════════════════
// ❌ API keys (use server-side proxy)
// ❌ Encryption keys (derive at runtime or use secure storage)
// ❌ Backend URLs for admin endpoints
// ❌ Feature flags that reveal unreleased features</code></pre>

            <h4>Security Checklist</h4>
            <pre><code>□ Sensitive data in Keychain/Keystore, NOT AsyncStorage
□ Certificate pinning enabled for API calls
□ No hardcoded secrets in JavaScript
□ Root/jailbreak detection with appropriate response
□ Biometric auth for sensitive operations
□ Input validation on all user inputs
□ Auto-logout on app background (for sensitive apps)
□ Secure WebView configuration (if used)
□ Hermes enabled (bytecode vs plaintext JS)
□ ProGuard/R8 enabled for Android release builds</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Emphasize <strong>defense in depth</strong> - multiple layers of security</li>
                <li>Know the difference between <strong>AsyncStorage and secure storage</strong></li>
                <li>Explain <strong>certificate pinning</strong> and why it prevents MITM</li>
                <li>Discuss <strong>compliance requirements</strong> (OWASP MASVS, GDPR)</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Storing tokens in AsyncStorage</li>
                <li>Hardcoding API keys in JavaScript</li>
                <li>Not validating input from deep links</li>
                <li>Trusting client-side validation alone</li>
            </ul>
        `},{id:35,category:"Security",icon:"🔒",question:"How do you securely handle authentication tokens in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Token Storage Best Practices</h4>
            <pre><code>// Use platform-specific secure storage
// iOS: Keychain
// Android: Keystore

import * as Keychain from 'react-native-keychain';

// Store token
async function storeToken(token: string) {
    await Keychain.setGenericPassword('auth', token, {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    });
}

// Retrieve token
async function getToken(): Promise&lt;string | null&gt; {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
}</code></pre>

            <h4>Token Refresh Pattern</h4>
            <pre><code>// Axios interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                await storeToken(newToken);

                originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                await logout();
                throw refreshError;
            }
        }

        throw error;
    }
);</code></pre>

            <h4>Additional Security Measures</h4>
            <ul>
                <li>Use short-lived access tokens</li>
                <li>Implement refresh token rotation</li>
                <li>Clear tokens on logout</li>
                <li>Validate tokens server-side</li>
            </ul>
        `},{id:36,category:"Offline & Storage",icon:"💾",question:"Compare different storage solutions in React Native. When would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Storage Solutions Comparison</h4>

            <h4>1. AsyncStorage</h4>
            <ul>
                <li>Simple key-value storage</li>
                <li>Unencrypted</li>
                <li>Good for: Settings, preferences, non-sensitive cache</li>
            </ul>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', JSON.stringify(data));</code></pre>

            <h4>2. MMKV</h4>
            <ul>
                <li>10x faster than AsyncStorage</li>
                <li>Supports encryption</li>
                <li>Good for: High-frequency access, performance-critical</li>
            </ul>
            <pre><code>import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'app', encryptionKey: 'key' });
storage.set('user', JSON.stringify(user));</code></pre>

            <h4>3. SQLite (via WatermelonDB or Realm)</h4>
            <ul>
                <li>Relational database</li>
                <li>Complex queries, large datasets</li>
                <li>Good for: Offline-first apps, sync scenarios</li>
            </ul>

            <h4>4. Secure Storage (Keychain/Keystore)</h4>
            <ul>
                <li>Hardware-backed encryption</li>
                <li>Good for: Tokens, passwords, sensitive data</li>
            </ul>

            <h4>Decision Matrix</h4>
            <table>
                <tr><td>Small, simple data</td><td>→ AsyncStorage/MMKV</td></tr>
                <tr><td>High performance needs</td><td>→ MMKV</td></tr>
                <tr><td>Complex queries</td><td>→ SQLite/WatermelonDB</td></tr>
                <tr><td>Sensitive data</td><td>→ Keychain/Keystore</td></tr>
            </table>
        `},{id:37,category:"Offline & Storage",icon:"💾",question:"How do you implement offline-first functionality in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Offline-First Architecture</h4>

            <h4>1. Network State Detection</h4>
            <pre><code>import NetInfo from '@react-native-community/netinfo';

function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected && state.isInternetReachable);
        });
        return unsubscribe;
    }, []);

    return isOnline;
}</code></pre>

            <h4>2. Request Queue for Offline Actions</h4>
            <pre><code>class OfflineQueue {
    private queue: QueuedRequest[] = [];

    async add(request: QueuedRequest) {
        this.queue.push(request);
        await this.persist();
    }

    async processQueue() {
        while (this.queue.length > 0) {
            const request = this.queue[0];
            try {
                await api.request(request);
                this.queue.shift();
                await this.persist();
            } catch (error) {
                if (!isNetworkError(error)) {
                    this.queue.shift(); // Remove failed request
                }
                break;
            }
        }
    }
}</code></pre>

            <h4>3. React Query Offline Support</h4>
            <pre><code>import { onlineManager, focusManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

// Sync online status
onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
    });
});

// Query with offline support
const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: Infinity,
    gcTime: Infinity, // Keep in cache
    networkMode: 'offlineFirst',
});</code></pre>
        `},{id:38,category:"Expo",icon:"📱",question:"Compare Expo managed workflow vs bare workflow. When would you choose each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Managed Workflow</h4>
            <ul>
                <li>No native code access</li>
                <li>Build with EAS Build cloud service</li>
                <li>Limited to Expo SDK modules</li>
                <li>Faster development setup</li>
                <li>OTA updates with Expo Updates</li>
            </ul>

            <h4>Bare Workflow</h4>
            <ul>
                <li>Full native code access</li>
                <li>Use any native library</li>
                <li>Local builds possible</li>
                <li>More setup complexity</li>
                <li>Still can use many Expo modules</li>
            </ul>

            <h4>When to Use Managed</h4>
            <ul>
                <li>Rapid prototyping</li>
                <li>Small team without native expertise</li>
                <li>Standard features (camera, location, etc.)</li>
                <li>Don't need custom native code</li>
            </ul>

            <h4>When to Use Bare (or Eject)</h4>
            <ul>
                <li>Custom native modules required</li>
                <li>Libraries not supported by Expo</li>
                <li>Need fine-grained native control</li>
                <li>Specific build configurations</li>
            </ul>

            <h4>Ejecting</h4>
            <pre><code># Convert managed to bare
npx expo prebuild

# This generates ios/ and android/ folders
# You can still use Expo modules!</code></pre>
        `},{id:39,category:"Expo",icon:"📱",question:"What is EAS (Expo Application Services) and how does it help with app development?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>EAS Services</h4>

            <h4>1. EAS Build</h4>
            <ul>
                <li>Cloud-based native builds</li>
                <li>No local Xcode/Android Studio needed</li>
                <li>Handles signing and credentials</li>
            </ul>
            <pre><code># Build for both platforms
eas build --platform all

# Build for specific profile
eas build --platform ios --profile production</code></pre>

            <h4>2. EAS Submit</h4>
            <ul>
                <li>Automated store submissions</li>
                <li>App Store and Play Store</li>
            </ul>
            <pre><code># Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>3. EAS Update (OTA)</h4>
            <ul>
                <li>Over-the-air JavaScript updates</li>
                <li>Instant updates without store review</li>
                <li>Branch-based deployment</li>
            </ul>
            <pre><code># Publish update
eas update --branch production --message "Bug fix"</code></pre>

            <h4>eas.json Configuration</h4>
            <pre><code>{
    "build": {
        "development": {
            "developmentClient": true,
            "distribution": "internal"
        },
        "preview": {
            "distribution": "internal"
        },
        "production": {}
    },
    "submit": {
        "production": {
            "ios": { "appleId": "..." },
            "android": { "track": "production" }
        }
    }
}</code></pre>
        `},{id:40,category:"Architecture",icon:"🏛️",question:"Describe different architectural patterns for React Native apps. What's your preferred approach?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Common Architecture Patterns</h4>

            <h4>1. Feature-Based Structure</h4>
            <pre><code>src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── screens/
│   │   ├── services/
│   │   └── store/
│   ├── products/
│   └── orders/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── navigation/</code></pre>

            <h4>2. Clean Architecture</h4>
            <pre><code>src/
├── domain/           # Business logic, entities
│   ├── entities/
│   └── usecases/
├── data/             # Data sources, repositories
│   ├── repositories/
│   └── datasources/
├── presentation/     # UI layer
│   ├── screens/
│   └── components/
└── infrastructure/   # External services</code></pre>

            <h4>3. Redux + Container Pattern</h4>
            <pre><code>// Container component (connects to store)
const UserListContainer = () => {
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    return &lt;UserList users={users} onRefresh={() => dispatch(fetchUsers())} /&gt;;
};

// Presentational component (pure UI)
const UserList = ({ users, onRefresh }) => (
    &lt;FlatList data={users} ... /&gt;
);</code></pre>

            <h4>Recommended Approach</h4>
            <ul>
                <li>Feature-based for most apps (scalable, maintainable)</li>
                <li>Separate business logic from UI</li>
                <li>Use custom hooks for reusable logic</li>
                <li>Keep components small and focused</li>
            </ul>
        `},{id:41,category:"Architecture",icon:"🏛️",question:"How do you structure and organize a large-scale React Native codebase?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Recommended Project Structure</h4>
            <pre><code>src/
├── app/                    # App entry, providers, navigation
│   ├── App.tsx
│   ├── navigation/
│   └── providers/
├── features/               # Feature modules
│   ├── auth/
│   │   ├── api/           # API calls
│   │   ├── components/    # Feature-specific components
│   │   ├── hooks/         # Feature hooks
│   │   ├── screens/       # Screen components
│   │   ├── store/         # Feature state (slice)
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Public exports
│   └── ...
├── shared/                 # Shared/common code
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Common hooks
│   ├── services/          # API client, analytics, etc.
│   ├── utils/             # Helper functions
│   └── constants/
├── assets/                # Images, fonts, etc.
└── types/                 # Global type definitions</code></pre>

            <h4>Key Principles</h4>
            <ul>
                <li><strong>Colocation:</strong> Keep related files together</li>
                <li><strong>Public API:</strong> Export only what's needed via index.ts</li>
                <li><strong>Dependency direction:</strong> Features can import shared, not vice versa</li>
                <li><strong>Single responsibility:</strong> One purpose per module</li>
            </ul>

            <h4>Naming Conventions</h4>
            <pre><code>// Components: PascalCase
UserProfile.tsx
UserProfile.styles.ts
UserProfile.test.tsx

// Hooks: camelCase with 'use' prefix
useAuth.ts
useUserProfile.ts

// Utils/Services: camelCase
api.ts
analytics.ts
formatters.ts</code></pre>
        `},{id:42,category:"Advanced Concepts",icon:"🎓",question:"Explain Error Boundaries in React Native. How do you implement global error handling?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Error Boundary Component</h4>
            <pre><code>class ErrorBoundary extends Component&lt;Props, State&gt; {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log to crash reporting service
        crashlytics().recordError(error);
        analytics.logEvent('error_boundary_caught', {
            error: error.message,
            componentStack: errorInfo.componentStack,
        });
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return &lt;ErrorFallback
                error={this.state.error}
                onRetry={this.resetError}
            /&gt;;
        }
        return this.props.children;
    }
}</code></pre>

            <h4>Global Error Handler</h4>
            <pre><code>// Handle unhandled JS errors
ErrorUtils.setGlobalHandler((error, isFatal) => {
    crashlytics().recordError(error);

    if (isFatal) {
        Alert.alert('Unexpected Error', 'The app needs to restart.');
    }
});

// Handle unhandled promise rejections
if (!__DEV__) {
    require('promise/setimmediate/rejection-tracking').enable({
        allRejections: true,
        onUnhandled: (id, error) => {
            crashlytics().recordError(error);
        },
    });
}</code></pre>

            <h4>Usage</h4>
            <pre><code>&lt;ErrorBoundary&gt;
    &lt;NavigationContainer&gt;
        &lt;RootNavigator /&gt;
    &lt;/NavigationContainer&gt;
&lt;/ErrorBoundary&gt;</code></pre>
        `},{id:43,category:"Advanced Concepts",icon:"🎓",question:"How do you implement push notifications in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Setup with Notifee + Firebase</h4>
            <pre><code>// Install dependencies
npm install @notifee/react-native @react-native-firebase/app @react-native-firebase/messaging</code></pre>

            <h4>Request Permissions</h4>
            <pre><code>import messaging from '@react-native-firebase/messaging';

async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const token = await messaging().getToken();
        // Send token to your server
        await api.registerDeviceToken(token);
    }
}</code></pre>

            <h4>Handle Messages</h4>
            <pre><code>import notifee from '@notifee/react-native';

// Foreground messages
useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Display notification using Notifee
        await notifee.displayNotification({
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            android: {
                channelId: 'default',
                pressAction: { id: 'default' },
            },
        });
    });

    return unsubscribe;
}, []);

// Background/Quit state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message:', remoteMessage);
});

// Handle notification press
notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
        // Navigate to relevant screen
        navigation.navigate('Details', { id: detail.notification?.data?.id });
    }
});</code></pre>
        `},{id:44,category:"Advanced Concepts",icon:"🎓",question:"What is Metro bundler and how does it work?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Metro?</h4>
            <p>Metro is the JavaScript bundler for React Native. It transforms and bundles your JS code and assets.</p>

            <h4>How It Works</h4>
            <ol>
                <li><strong>Resolution:</strong> Finds all required modules starting from entry point</li>
                <li><strong>Transformation:</strong> Transforms code (Babel, TypeScript, etc.)</li>
                <li><strong>Serialization:</strong> Combines modules into a bundle</li>
            </ol>

            <h4>metro.config.js</h4>
            <pre><code>const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Custom resolver
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

// Asset extensions
config.resolver.assetExts.push('db', 'mp3', 'ttf');

// Transform options
config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
);

// Watchman settings (file watching)
config.watchFolders = [path.resolve(__dirname, '../shared')];

module.exports = config;</code></pre>

            <h4>Common Commands</h4>
            <pre><code># Start with fresh cache
npx react-native start --reset-cache

# Create bundle manually
npx react-native bundle \\
    --entry-file index.js \\
    --bundle-output bundle.js \\
    --platform ios \\
    --dev false</code></pre>

            <h4>Performance Tips</h4>
            <ul>
                <li>Use <code>--reset-cache</code> when seeing stale code</li>
                <li>Configure <code>watchFolders</code> for monorepos</li>
                <li>Exclude large folders with <code>blockList</code></li>
            </ul>
        `},{id:45,category:"Advanced Concepts",icon:"🎓",question:"How do you handle app state management (foreground, background, inactive)?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>App State Values</h4>
            <ul>
                <li><strong>active:</strong> App is running in foreground</li>
                <li><strong>background:</strong> App is in background</li>
                <li><strong>inactive:</strong> Transitioning (iOS only, e.g., during calls)</li>
            </ul>

            <h4>Basic Usage</h4>
            <pre><code>import { AppState, AppStateStatus } from 'react-native';

function useAppState() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState: AppStateStatus) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    console.log('App came to foreground');
                    // Refresh data, check auth, etc.
                }

                if (nextAppState === 'background') {
                    console.log('App went to background');
                    // Save state, pause activities
                }

                appState.current = nextAppState;
                setAppStateVisible(nextAppState);
            }
        );

        return () => subscription.remove();
    }, []);

    return appStateVisible;
}</code></pre>

            <h4>Common Use Cases</h4>
            <pre><code>// Pause video when backgrounded
useEffect(() => {
    if (appState === 'background') {
        videoRef.current?.pause();
    }
}, [appState]);

// Refresh auth token on foreground
useEffect(() => {
    if (appState === 'active') {
        checkAndRefreshToken();
    }
}, [appState]);

// With React Query
import { focusManager } from '@tanstack/react-query';

focusManager.setEventListener((handleFocus) => {
    const subscription = AppState.addEventListener('change', (state) => {
        handleFocus(state === 'active');
    });
    return () => subscription.remove();
});</code></pre>
        `},{id:46,category:"Behavioral",icon:"💬",question:"Describe a challenging bug you encountered in React Native and how you solved it.",difficulty:"intermediate",seniority:"junior",answer:`
            <h4>Framework for Answering</h4>
            <ol>
                <li><strong>Context:</strong> Describe the app and feature</li>
                <li><strong>Problem:</strong> What was the bug and its impact?</li>
                <li><strong>Investigation:</strong> How did you diagnose it?</li>
                <li><strong>Solution:</strong> What fixed it?</li>
                <li><strong>Prevention:</strong> How did you prevent recurrence?</li>
            </ol>

            <h4>Example Answer Structure</h4>
            <p><strong>Context:</strong> "We had a FlatList showing real-time stock prices..."</p>
            <p><strong>Problem:</strong> "Users reported the app becoming unresponsive after viewing the list for a few minutes. Memory usage kept climbing."</p>
            <p><strong>Investigation:</strong> "Used Flipper's memory profiler to track allocations. Found that each price update was creating new objects without cleanup. The WebSocket listener wasn't being removed on unmount."</p>
            <p><strong>Solution:</strong> "Implemented proper cleanup in useEffect, used React.memo with custom comparison for list items, and throttled updates to 1/second instead of real-time."</p>
            <p><strong>Prevention:</strong> "Added memory profiling to our CI pipeline, created a custom hook for WebSocket subscriptions with automatic cleanup."</p>

            <h4>Key Points to Emphasize</h4>
            <ul>
                <li>Systematic debugging approach</li>
                <li>Use of profiling tools</li>
                <li>Root cause analysis</li>
                <li>Preventive measures implemented</li>
            </ul>
        `},{id:47,category:"Behavioral",icon:"💬",question:"How do you approach code reviews for React Native projects? What do you look for?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Code Review Checklist</h4>

            <h4>1. Performance</h4>
            <ul>
                <li>Unnecessary re-renders (missing memo/useCallback)</li>
                <li>Heavy computations in render</li>
                <li>FlatList optimizations present</li>
                <li>Image optimization</li>
            </ul>

            <h4>2. React Native Specific</h4>
            <ul>
                <li>Platform-specific code handled correctly</li>
                <li>Proper keyboard handling</li>
                <li>Safe area insets respected</li>
                <li>Accessibility labels present</li>
            </ul>

            <h4>3. Code Quality</h4>
            <ul>
                <li>TypeScript types properly defined</li>
                <li>No <code>any</code> types without justification</li>
                <li>Consistent naming conventions</li>
                <li>Proper error handling</li>
            </ul>

            <h4>4. Security</h4>
            <ul>
                <li>No sensitive data in AsyncStorage</li>
                <li>Input validation present</li>
                <li>No hardcoded secrets</li>
            </ul>

            <h4>5. Testing</h4>
            <ul>
                <li>New components have tests</li>
                <li>Edge cases covered</li>
                <li>Mocks are appropriate</li>
            </ul>

            <h4>Review Approach</h4>
            <ol>
                <li>Understand the context (PR description, linked ticket)</li>
                <li>Review architecture decisions first</li>
                <li>Check for patterns and consistency</li>
                <li>Provide actionable feedback with examples</li>
                <li>Distinguish between blockers and suggestions</li>
            </ol>
        `},{id:48,category:"Behavioral",icon:"💬",question:"How do you stay updated with React Native ecosystem changes?",difficulty:"beginner",seniority:"junior",answer:`
            <h4>Official Sources</h4>
            <ul>
                <li><strong>React Native Blog:</strong> Official announcements, release notes</li>
                <li><strong>GitHub Releases:</strong> Detailed changelogs</li>
                <li><strong>React Native Directory:</strong> Curated library list</li>
            </ul>

            <h4>Community Resources</h4>
            <ul>
                <li><strong>React Native Radio:</strong> Podcast with core team</li>
                <li><strong>Infinite Red:</strong> React Native Newsletter</li>
                <li><strong>Callstack Blog:</strong> Deep technical posts</li>
                <li><strong>William Candillon:</strong> Animation tutorials</li>
            </ul>

            <h4>Social/Discussion</h4>
            <ul>
                <li>Twitter/X: @reactnative, @expo</li>
                <li>Discord: Reactiflux, Expo</li>
                <li>Reddit: r/reactnative</li>
            </ul>

            <h4>Hands-On Learning</h4>
            <ul>
                <li>Try new features in side projects</li>
                <li>Contribute to open source libraries</li>
                <li>Attend React Native conferences (App.js, Chain React)</li>
                <li>Read source code of popular libraries</li>
            </ul>

            <h4>Key Areas to Monitor</h4>
            <ul>
                <li>New Architecture adoption</li>
                <li>Expo SDK updates</li>
                <li>Navigation library changes</li>
                <li>State management trends</li>
                <li>Build tooling improvements</li>
            </ul>
        `},{id:49,category:"Advanced Concepts",icon:"🎓",question:"How do you implement internationalization (i18n) in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Popular i18n Libraries</h4>
            <ul>
                <li><strong>react-i18next:</strong> Most popular, flexible</li>
                <li><strong>expo-localization:</strong> Device locale detection</li>
                <li><strong>react-intl:</strong> Format.js ecosystem</li>
            </ul>

            <h4>Setup with react-i18next</h4>
            <pre><code>// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});</code></pre>

            <h4>Translation Files</h4>
            <pre><code>// locales/en.json
{
    "welcome": "Welcome, {{name}}!",
    "items": {
        "one": "{{count}} item",
        "other": "{{count}} items"
    }
}</code></pre>

            <h4>Usage in Components</h4>
            <pre><code>import { useTranslation } from 'react-i18next';

function HomeScreen() {
    const { t, i18n } = useTranslation();

    return (
        &lt;View&gt;
            &lt;Text&gt;{t('welcome', { name: 'John' })}&lt;/Text&gt;
            &lt;Text&gt;{t('items', { count: 5 })}&lt;/Text&gt;

            &lt;Button
                title="Switch to Spanish"
                onPress={() => i18n.changeLanguage('es')}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>RTL Support</h4>
            <pre><code>import { I18nManager } from 'react-native';

// Enable RTL for Arabic, Hebrew, etc.
I18nManager.forceRTL(isRTL);
// Requires app restart</code></pre>
        `},{id:50,category:"Advanced Concepts",icon:"🎓",question:"What accessibility (a11y) features does React Native support and how do you implement them?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Core Accessibility Props</h4>
            <pre><code>&lt;TouchableOpacity
    accessible={true}
    accessibilityLabel="Submit order button"
    accessibilityHint="Double tap to submit your order"
    accessibilityRole="button"
    accessibilityState={{ disabled: isLoading }}
&gt;
    &lt;Text&gt;Submit Order&lt;/Text&gt;
&lt;/TouchableOpacity&gt;</code></pre>

            <h4>Accessibility Roles</h4>
            <ul>
                <li><code>button</code>, <code>link</code>, <code>header</code></li>
                <li><code>image</code>, <code>imagebutton</code></li>
                <li><code>text</code>, <code>adjustable</code> (slider)</li>
                <li><code>checkbox</code>, <code>radio</code>, <code>switch</code></li>
            </ul>

            <h4>Accessibility States</h4>
            <pre><code>accessibilityState={{
    disabled: false,
    selected: true,
    checked: 'mixed', // true | false | 'mixed'
    busy: false,
    expanded: true,
}}</code></pre>

            <h4>Screen Reader Announcements</h4>
            <pre><code>import { AccessibilityInfo } from 'react-native';

// Announce to screen reader
AccessibilityInfo.announceForAccessibility('Order submitted successfully');

// Check if screen reader is enabled
const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();</code></pre>

            <h4>Focus Management</h4>
            <pre><code>import { AccessibilityInfo, findNodeHandle } from 'react-native';

const buttonRef = useRef(null);

// Set focus programmatically
const focusOnButton = () => {
    const node = findNodeHandle(buttonRef.current);
    if (node) {
        AccessibilityInfo.setAccessibilityFocus(node);
    }
};</code></pre>

            <h4>Testing Accessibility</h4>
            <ul>
                <li>iOS: VoiceOver (Settings → Accessibility)</li>
                <li>Android: TalkBack (Settings → Accessibility)</li>
                <li>Use Accessibility Inspector in Xcode</li>
            </ul>
        `},{id:51,category:"Core React Native",icon:"⚛️",question:"Explain the difference between Controlled and Uncontrolled components in React Native. When would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Controlled Components</h4>
            <p>Form data is handled by React state. The component receives its value from props and notifies changes through callbacks.</p>
            <pre><code>function ControlledInput() {
    const [value, setValue] = useState('');

    return (
        &lt;TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Controlled input"
        /&gt;
    );
}

// Benefits:
// - Single source of truth
// - Easy to validate/transform input
// - Form state is predictable</code></pre>

            <h4>Uncontrolled Components</h4>
            <p>Form data is handled by the DOM/native component itself. Use refs to access values when needed.</p>
            <pre><code>function UncontrolledInput() {
    const inputRef = useRef&lt;TextInput&gt;(null);

    const handleSubmit = () => {
        // Access value imperatively
        // Note: Not recommended in RN
        console.log(inputRef.current);
    };

    return (
        &lt;TextInput
            ref={inputRef}
            defaultValue="Initial"
            placeholder="Uncontrolled input"
        /&gt;
    );
}</code></pre>

            <h4>When to Use Each</h4>
            <table>
                <tr><td><strong>Controlled</strong></td><td><strong>Uncontrolled</strong></td></tr>
                <tr><td>Form validation needed</td><td>Simple forms without validation</td></tr>
                <tr><td>Conditional input disabling</td><td>Integration with non-React code</td></tr>
                <tr><td>Enforcing input format</td><td>Performance-critical scenarios</td></tr>
                <tr><td>Dynamic input values</td><td>File inputs (always uncontrolled)</td></tr>
            </table>

            <h4>Recommendation</h4>
            <p>In React Native, <strong>always prefer controlled components</strong>. They provide better debugging, testing, and predictability.</p>
        `},{id:52,category:"Core React Native",icon:"⚛️",question:"What is the difference between useRef and useState? When should you use useRef?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Key Differences</h4>
            <table>
                <tr><td><strong>useState</strong></td><td><strong>useRef</strong></td></tr>
                <tr><td>Triggers re-render on change</td><td>Does NOT trigger re-render</td></tr>
                <tr><td>Returns [value, setter]</td><td>Returns { current: value }</td></tr>
                <tr><td>Value is immutable between renders</td><td>Value persists across renders</td></tr>
                <tr><td>For UI-related state</td><td>For mutable values, DOM refs</td></tr>
            </table>

            <h4>When to Use useRef</h4>
            <pre><code>// 1. Storing component references
const inputRef = useRef&lt;TextInput&gt;(null);
inputRef.current?.focus();

// 2. Storing previous values
const prevValueRef = useRef(value);
useEffect(() => {
    prevValueRef.current = value;
}, [value]);

// 3. Storing mutable values without re-render
const timerIdRef = useRef&lt;NodeJS.Timeout&gt;();
timerIdRef.current = setTimeout(() => {}, 1000);
// Cleanup: clearTimeout(timerIdRef.current)

// 4. Storing instance variables (like class this.x)
const renderCount = useRef(0);
renderCount.current += 1; // Won't cause re-render

// 5. Tracking mounted state
const isMounted = useRef(true);
useEffect(() => {
    return () => { isMounted.current = false; };
}, []);

// In async callback:
if (isMounted.current) {
    setState(data);
}</code></pre>

            <h4>Common Mistake</h4>
            <pre><code>// ❌ Wrong: Using ref for UI state
const [_, forceUpdate] = useState(0);
const countRef = useRef(0);
countRef.current += 1;
// UI won't update!

// ✅ Correct: Use state for UI
const [count, setCount] = useState(0);
setCount(c => c + 1);
// UI updates properly</code></pre>
        `},{id:53,category:"Core React Native",icon:"⚛️",question:"Explain the useReducer hook. When would you choose it over useState?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>useReducer Basics</h4>
            <p>useReducer is an alternative to useState for managing complex state logic.</p>
            <pre><code>// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: action.payload };
        default:
            throw new Error(\`Unknown action: \${action.type}\`);
    }
}

// Usage in component
function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        &lt;View&gt;
            &lt;Text&gt;Count: {state.count}&lt;/Text&gt;
            &lt;Button title="+" onPress={() => dispatch({ type: 'INCREMENT' })} /&gt;
            &lt;Button title="-" onPress={() => dispatch({ type: 'DECREMENT' })} /&gt;
            &lt;Button title="Reset" onPress={() => dispatch({ type: 'RESET', payload: 0 })} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>When to Use useReducer</h4>
            <ul>
                <li><strong>Complex state logic:</strong> Multiple sub-values or complex update logic</li>
                <li><strong>Next state depends on previous:</strong> state + action → new state</li>
                <li><strong>Multiple related updates:</strong> One action updates multiple fields</li>
                <li><strong>Testing:</strong> Reducer functions are easy to test in isolation</li>
            </ul>

            <h4>Practical Example: Form State</h4>
            <pre><code>const formReducer = (state, action) => {
    switch (action.type) {
        case 'FIELD_CHANGE':
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: null },
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'SET_SUBMITTING':
            return { ...state, isSubmitting: action.value };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const initialState = {
    values: { email: '', password: '' },
    errors: {},
    isSubmitting: false,
};

function LoginForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    // ... form implementation
}</code></pre>

            <h4>useState vs useReducer</h4>
            <table>
                <tr><td><strong>useState</strong></td><td>Simple, independent state values</td></tr>
                <tr><td><strong>useReducer</strong></td><td>Complex state objects, state machines</td></tr>
            </table>
        `},{id:54,category:"Core React Native",icon:"⚛️",question:"What are Portals in React and how do they work in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Portals in React</h4>
            <p>Portals provide a way to render children into a DOM node that exists outside the parent component's hierarchy.</p>

            <h4>React Native Equivalent</h4>
            <p>React Native doesn't have built-in portals like React DOM, but we can achieve similar results using:</p>

            <h4>1. Using Modal Component</h4>
            <pre><code>import { Modal, View, Text } from 'react-native';

function MyComponent() {
    const [visible, setVisible] = useState(false);

    return (
        &lt;View&gt;
            &lt;Button title="Open" onPress={() => setVisible(true)} /&gt;

            {/* Modal renders outside the component tree */}
            &lt;Modal
                visible={visible}
                transparent
                animationType="fade"
            &gt;
                &lt;View style={styles.overlay}&gt;
                    &lt;View style={styles.content}&gt;
                        &lt;Text&gt;I'm rendered at root level!&lt;/Text&gt;
                    &lt;/View&gt;
                &lt;/View&gt;
            &lt;/Modal&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>2. Custom Portal Implementation</h4>
            <pre><code>// PortalContext.tsx
const PortalContext = createContext&lt;{
    mount: (key: string, element: ReactNode) => void;
    unmount: (key: string) => void;
}&gt;(null);

export function PortalProvider({ children }) {
    const [portals, setPortals] = useState&lt;Map&lt;string, ReactNode&gt;&gt;(new Map());

    const mount = useCallback((key: string, element: ReactNode) => {
        setPortals(prev => new Map(prev).set(key, element));
    }, []);

    const unmount = useCallback((key: string) => {
        setPortals(prev => {
            const next = new Map(prev);
            next.delete(key);
            return next;
        });
    }, []);

    return (
        &lt;PortalContext.Provider value={{ mount, unmount }}&gt;
            {children}
            {/* Portal host - renders at root */}
            {Array.from(portals.entries()).map(([key, element]) => (
                &lt;View key={key}&gt;{element}&lt;/View&gt;
            ))}
        &lt;/PortalContext.Provider&gt;
    );
}

// Portal component
export function Portal({ children }) {
    const { mount, unmount } = useContext(PortalContext);
    const key = useId();

    useEffect(() => {
        mount(key, children);
        return () => unmount(key);
    }, [children, key, mount, unmount]);

    return null;
}</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li>Modals and dialogs</li>
                <li>Tooltips and popovers</li>
                <li>Toast notifications</li>
                <li>Dropdown menus that need to overflow parents</li>
            </ul>
        `},{id:55,category:"Core React Native",icon:"⚛️",question:"Explain the concept of Render Props pattern and how it compares to Hooks in React Native.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Render Props Pattern</h4>
            <p>A technique for sharing code between components using a prop whose value is a function.</p>
            <pre><code>// Render Props component
class MouseTracker extends Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (event) => {
        this.setState({ x: event.pageX, y: event.pageY });
    };

    render() {
        return (
            &lt;View onTouchMove={this.handleMouseMove}&gt;
                {this.props.render(this.state)}
            &lt;/View&gt;
        );
    }
}

// Usage
&lt;MouseTracker
    render={({ x, y }) => (
        &lt;Text&gt;Position: {x}, {y}&lt;/Text&gt;
    )}
/&gt;</code></pre>

            <h4>Modern Equivalent with Hooks</h4>
            <pre><code>// Custom Hook (preferred)
function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (event) => {
            setPosition({ x: event.pageX, y: event.pageY });
        };
        // Add listener...
        return () => {/* Remove listener */};
    }, []);

    return position;
}

// Usage - much cleaner!
function MyComponent() {
    const { x, y } = useMousePosition();
    return &lt;Text&gt;Position: {x}, {y}&lt;/Text&gt;;
}</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><td><strong>Render Props</strong></td><td><strong>Hooks</strong></td></tr>
                <tr><td>Works with class components</td><td>Only functional components</td></tr>
                <tr><td>Can cause "wrapper hell"</td><td>Flat component structure</td></tr>
                <tr><td>Explicit data flow</td><td>Implicit but cleaner</td></tr>
                <tr><td>Runtime composition</td><td>Static composition</td></tr>
            </table>

            <h4>When Render Props Still Useful</h4>
            <pre><code>// Dynamic children based on state
&lt;FlatList
    data={items}
    renderItem={({ item, index }) => (
        &lt;ItemComponent item={item} index={index} /&gt;
    )}
/&gt;

// Animation libraries
&lt;Animated.View&gt;
    {(animatedValue) => (
        &lt;View style={{ opacity: animatedValue }} /&gt;
    )}
&lt;/Animated.View&gt;</code></pre>

            <h4>Recommendation</h4>
            <p><strong>Use Hooks for most cases.</strong> Render Props are still valid for component libraries needing dynamic rendering flexibility.</p>
        `},{id:56,category:"Navigation",icon:"🧭",question:"How do you handle nested navigators and what are the common patterns?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Nested Navigator Structure</h4>
            <pre><code>function App() {
    return (
        &lt;NavigationContainer&gt;
            &lt;RootStack.Navigator&gt;
                {/* Tab Navigator nested in Stack */}
                &lt;RootStack.Screen
                    name="Main"
                    component={MainTabs}
                    options={{ headerShown: false }}
                /&gt;
                {/* Full-screen modals */}
                &lt;RootStack.Screen
                    name="Modal"
                    component={ModalScreen}
                    options={{ presentation: 'modal' }}
                /&gt;
            &lt;/RootStack.Navigator&gt;
        &lt;/NavigationContainer&gt;
    );
}

function MainTabs() {
    return (
        &lt;Tab.Navigator&gt;
            &lt;Tab.Screen name="Home" component={HomeStack} /&gt;
            &lt;Tab.Screen name="Profile" component={ProfileStack} /&gt;
        &lt;/Tab.Navigator&gt;
    );
}

function HomeStack() {
    return (
        &lt;Stack.Navigator&gt;
            &lt;Stack.Screen name="HomeScreen" component={HomeScreen} /&gt;
            &lt;Stack.Screen name="Details" component={DetailsScreen} /&gt;
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>Navigating Across Nested Navigators</h4>
            <pre><code>// Navigate to screen in different stack
navigation.navigate('Profile', {
    screen: 'Settings',
    params: { userId: 123 },
});

// Navigate to deeply nested screen
navigation.navigate('Main', {
    screen: 'Home',
    params: {
        screen: 'Details',
        params: { itemId: 456 },
    },
});

// Reset navigation state
navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }],
});</code></pre>

            <h4>Common Patterns</h4>
            <ul>
                <li><strong>Auth Flow:</strong> Stack with conditional screens based on auth state</li>
                <li><strong>Tab + Stack:</strong> Each tab has its own stack navigator</li>
                <li><strong>Drawer + Tabs:</strong> Drawer containing tab navigator</li>
                <li><strong>Modal Stack:</strong> Root stack with modal screens for overlays</li>
            </ul>

            <h4>Best Practices</h4>
            <ul>
                <li>Keep nesting to 2-3 levels max</li>
                <li>Use <code>headerShown: false</code> when child handles header</li>
                <li>Define types for all param lists</li>
                <li>Use <code>getParent()</code> to access parent navigator</li>
            </ul>
        `},{id:57,category:"Navigation",icon:"🧭",question:"How do you implement custom transitions and animations in React Navigation?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Built-in Animation Options</h4>
            <pre><code>&lt;Stack.Navigator
    screenOptions={{
        animation: 'slide_from_right', // iOS-like
        // Other options:
        // 'slide_from_bottom', 'fade', 'none',
        // 'flip', 'simple_push', 'slide_from_left'
    }}
&gt;</code></pre>

            <h4>Custom Transition Config</h4>
            <pre><code>import { TransitionPresets } from '@react-navigation/stack';

const customTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: {
            animation: 'spring',
            config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 200,
                easing: Easing.linear,
            },
        },
    },
    cardStyleInterpolator: ({ current, layouts }) => ({
        cardStyle: {
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
                {
                    scale: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                    }),
                },
            ],
            opacity: current.progress,
        },
    }),
};</code></pre>

            <h4>Shared Element Transitions</h4>
            <pre><code>// Using react-native-shared-element
import { SharedElement } from 'react-navigation-shared-element';

// Source screen
&lt;SharedElement id={\`item.\${item.id}.photo\`}&gt;
    &lt;Image source={item.image} style={styles.image} /&gt;
&lt;/SharedElement&gt;

// Detail screen
&lt;SharedElement id={\`item.\${item.id}.photo\`}&gt;
    &lt;Image source={item.image} style={styles.largeImage} /&gt;
&lt;/SharedElement&gt;

// Navigator config
&lt;Stack.Navigator
    screenOptions={{
        ...TransitionPresets.DefaultTransition,
    }}
&gt;
    &lt;Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route) => {
            const { item } = route.params;
            return [\`item.\${item.id}.photo\`];
        }}
    /&gt;
&lt;/Stack.Navigator&gt;</code></pre>

            <h4>Per-Screen Transitions</h4>
            <pre><code>&lt;Stack.Screen
    name="Modal"
    component={ModalScreen}
    options={{
        presentation: 'transparentModal',
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
                opacity: progress,
            },
            overlayStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        }),
    }}
/&gt;</code></pre>
        `},{id:58,category:"State Management",icon:"🗃️",question:"How do you implement optimistic updates and handle rollbacks in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What is Optimistic Update?</h4>
            <p>Updating the UI immediately before the server confirms the change, then rolling back if the request fails.</p>

            <h4>With TanStack Query</h4>
            <pre><code>const queryClient = useQueryClient();

const updateTodoMutation = useMutation({
    mutationFn: updateTodo,

    // When mutation starts
    onMutate: async (newTodo) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['todos'] });

        // Snapshot previous value
        const previousTodos = queryClient.getQueryData(['todos']);

        // Optimistically update
        queryClient.setQueryData(['todos'], (old) =>
            old.map(todo =>
                todo.id === newTodo.id ? newTodo : todo
            )
        );

        // Return context for rollback
        return { previousTodos };
    },

    // On error, roll back
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context.previousTodos);
        Toast.show({ type: 'error', text1: 'Update failed' });
    },

    // Always refetch after error or success
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
});</code></pre>

            <h4>With Redux Toolkit</h4>
            <pre><code>// Slice with optimistic update
const todosSlice = createSlice({
    name: 'todos',
    initialState: { items: [], pendingUpdates: {} },
    reducers: {
        optimisticUpdate: (state, action) => {
            const { id, changes } = action.payload;
            // Store original for rollback
            const original = state.items.find(t => t.id === id);
            state.pendingUpdates[id] = original;
            // Apply optimistic change
            const index = state.items.findIndex(t => t.id === id);
            state.items[index] = { ...original, ...changes };
        },
        confirmUpdate: (state, action) => {
            delete state.pendingUpdates[action.payload.id];
        },
        rollbackUpdate: (state, action) => {
            const { id } = action.payload;
            const original = state.pendingUpdates[id];
            if (original) {
                const index = state.items.findIndex(t => t.id === id);
                state.items[index] = original;
                delete state.pendingUpdates[id];
            }
        },
    },
});

// Thunk with rollback
export const updateTodoAsync = (id, changes) => async (dispatch) => {
    dispatch(optimisticUpdate({ id, changes }));
    try {
        await api.updateTodo(id, changes);
        dispatch(confirmUpdate({ id }));
    } catch (error) {
        dispatch(rollbackUpdate({ id }));
        throw error;
    }
};</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Always store original data for rollback</li>
                <li>Show loading indicator for critical actions</li>
                <li>Provide user feedback on failure</li>
                <li>Consider retry logic for transient failures</li>
            </ul>
        `},{id:59,category:"State Management",icon:"🗃️",question:"Explain the concept of Atomic State Management (Jotai/Recoil). How does it differ from Redux?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What is Atomic State?</h4>
            <p>State is split into independent atoms. Components subscribe only to atoms they use, enabling fine-grained re-renders.</p>

            <h4>Jotai Example</h4>
            <pre><code>import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Define atoms
const userAtom = atom(null);
const todosAtom = atom([]);

// Derived atom (computed value)
const completedTodosAtom = atom(
    (get) => get(todosAtom).filter(t => t.completed)
);

// Async atom
const userDataAtom = atom(async (get) => {
    const user = get(userAtom);
    if (!user) return null;
    const response = await fetch(\`/api/users/\${user.id}\`);
    return response.json();
});

// Write-only atom (action)
const addTodoAtom = atom(
    null, // read value (not used)
    (get, set, newTodo) => {
        const todos = get(todosAtom);
        set(todosAtom, [...todos, newTodo]);
    }
);

// Usage in components
function TodoList() {
    const todos = useAtomValue(todosAtom);
    const addTodo = useSetAtom(addTodoAtom);

    return (
        &lt;View&gt;
            {todos.map(todo => &lt;TodoItem key={todo.id} todo={todo} /&gt;)}
            &lt;Button onPress={() => addTodo({ id: Date.now(), text: 'New' })} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Comparison: Redux vs Atomic</h4>
            <table>
                <tr><td><strong>Redux</strong></td><td><strong>Jotai/Recoil</strong></td></tr>
                <tr><td>Single store</td><td>Multiple atoms</td></tr>
                <tr><td>Top-down data flow</td><td>Bottom-up composition</td></tr>
                <tr><td>Reducers + actions</td><td>Atoms + derived atoms</td></tr>
                <tr><td>Requires selectors for perf</td><td>Fine-grained by default</td></tr>
                <tr><td>More boilerplate</td><td>Minimal boilerplate</td></tr>
                <tr><td>Great DevTools</td><td>Limited debugging tools</td></tr>
            </table>

            <h4>When to Use Atomic State</h4>
            <ul>
                <li>Many independent pieces of state</li>
                <li>Frequent updates to small state portions</li>
                <li>Need fine-grained re-render control</li>
                <li>Prefer minimal boilerplate</li>
            </ul>

            <h4>Atom with Storage (Persistence)</h4>
            <pre><code>import { atomWithStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    getItem: async (key) => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    setItem: async (key, value) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key) => {
        await AsyncStorage.removeItem(key);
    },
};

const themeAtom = atomWithStorage('theme', 'light', storage);</code></pre>
        `},{id:60,category:"Performance",icon:"⚡",question:"What is the InteractionManager and when should you use it?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is InteractionManager?</h4>
            <p>InteractionManager allows scheduling long-running work after interactions/animations have completed, keeping the UI responsive.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { InteractionManager } from 'react-native';

function DetailScreen() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Wait for navigation animation to complete
        const interaction = InteractionManager.runAfterInteractions(() => {
            // Now safe to do heavy work
            loadHeavyData().then(setData);
        });

        return () => interaction.cancel();
    }, []);

    return data ? &lt;HeavyContent data={data} /&gt; : &lt;Placeholder /&gt;;
}</code></pre>

            <h4>Creating Custom Interactions</h4>
            <pre><code>// Create a handle when starting animation
const handle = InteractionManager.createInteractionHandle();

// Start your animation
Animated.timing(opacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
}).start(() => {
    // Clear handle when animation completes
    InteractionManager.clearInteractionHandle(handle);
});</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li><strong>Screen transitions:</strong> Defer data loading until animation completes</li>
                <li><strong>Heavy computations:</strong> Process large datasets after UI settles</li>
                <li><strong>Analytics:</strong> Track events without blocking UI</li>
                <li><strong>Image processing:</strong> Resize/compress after interaction</li>
            </ul>

            <h4>With Promises</h4>
            <pre><code>async function initializeScreen() {
    // Wait for all interactions
    await InteractionManager.runAfterInteractions();

    // Now perform heavy operations
    const data = await fetchData();
    const processed = await processData(data);

    return processed;
}</code></pre>

            <h4>Debugging Tip</h4>
            <pre><code>// Log all interactions
InteractionManager.setDeadline(100); // Warning if > 100ms

// In development
if (__DEV__) {
    const start = Date.now();
    InteractionManager.runAfterInteractions(() => {
        console.log(\`Interactions took: \${Date.now() - start}ms\`);
    });
}</code></pre>
        `},{id:61,category:"Performance",icon:"⚡",question:"How do you optimize images in React Native for better performance?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Image Optimization Strategies</h4>

            <h4>1. Use Correct Dimensions</h4>
            <pre><code>// ❌ Bad: Large image, small display
&lt;Image
    source={{ uri: 'https://example.com/photo-4000x3000.jpg' }}
    style={{ width: 100, height: 100 }}
/&gt;

// ✅ Good: Request appropriately sized image
&lt;Image
    source={{
        uri: \`https://example.com/photo.jpg?w=\${width * PixelRatio.get()}\`
    }}
    style={{ width: 100, height: 100 }}
/&gt;</code></pre>

            <h4>2. Use FastImage Library</h4>
            <pre><code>import FastImage from 'react-native-fast-image';

&lt;FastImage
    source={{
        uri: 'https://example.com/photo.jpg',
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
    }}
    style={{ width: 200, height: 200 }}
    resizeMode={FastImage.resizeMode.cover}
/&gt;

// Preload images
FastImage.preload([
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
]);</code></pre>

            <h4>3. Progressive Loading</h4>
            <pre><code>function ProgressiveImage({ thumbnailUri, uri, style }) {
    const [loaded, setLoaded] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    const onLoad = () => {
        setLoaded(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        &lt;View style={style}&gt;
            {/* Blurred thumbnail */}
            &lt;Image
                source={{ uri: thumbnailUri }}
                style={[StyleSheet.absoluteFill, style]}
                blurRadius={2}
            /&gt;
            {/* Full resolution image */}
            &lt;Animated.Image
                source={{ uri }}
                style={[style, { opacity }]}
                onLoad={onLoad}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>4. Format Optimization</h4>
            <ul>
                <li><strong>WebP:</strong> 25-35% smaller than JPEG, supports transparency</li>
                <li><strong>AVIF:</strong> Even better compression (newer devices)</li>
                <li><strong>SVG:</strong> For icons and simple graphics</li>
            </ul>

            <h4>5. Memory Management</h4>
            <pre><code>// In FlatList, images outside viewport are recycled
&lt;FlatList
    removeClippedSubviews={true}
    windowSize={3} // Smaller window = less memory
    maxToRenderPerBatch={5}
/&gt;

// Clear image cache when needed
FastImage.clearMemoryCache();
FastImage.clearDiskCache();</code></pre>
        `},{id:62,category:"Performance",icon:"⚡",question:"Explain React Native's bridge batching and how it affects performance.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Bridge Batching Concept</h4>
            <p>React Native batches multiple native calls together and sends them across the bridge in a single message to reduce overhead.</p>

            <h4>How Batching Works</h4>
            <pre><code>// Without batching (hypothetical):
// JS → Native: setBackgroundColor(red)
// JS → Native: setWidth(100)
// JS → Native: setHeight(200)
// = 3 bridge crossings

// With batching (actual):
// JS → Native: [
//   setBackgroundColor(red),
//   setWidth(100),
//   setHeight(200)
// ]
// = 1 bridge crossing</code></pre>

            <h4>When Batching Breaks Down</h4>
            <pre><code>// ❌ Problem: Synchronous native calls force flush
// Reading dimensions causes immediate bridge flush
const { width, height } = someNativeModule.getMeasurements();
// All pending batched calls are flushed

// ❌ Problem: Frequent small updates
items.forEach(item => {
    setState(prev => [...prev, item]); // Each triggers batch
});

// ✅ Solution: Batch updates manually
setState(prev => [...prev, ...items]); // Single update</code></pre>

            <h4>Avoiding Bridge Congestion</h4>
            <pre><code>// ❌ Bad: Sending large data across bridge
const hugeArray = new Array(10000).fill(data);
NativeModule.processData(hugeArray); // Serialization overhead

// ✅ Good: Process in chunks
const chunks = chunkArray(hugeArray, 100);
for (const chunk of chunks) {
    await NativeModule.processData(chunk);
    // Allow UI to breathe
    await new Promise(r => setTimeout(r, 0));
}

// ✅ Better: Use JSI for large data
// JSI allows direct memory sharing without serialization</code></pre>

            <h4>Monitoring Bridge Traffic</h4>
            <pre><code>// Enable bridge spy (development only)
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

if (__DEV__) {
    MessageQueue.spy((msg) => {
        if (msg.type === 0) { // Call from JS to Native
            console.log('JS→Native:', msg.module, msg.method);
        }
    });
}</code></pre>

            <h4>New Architecture Solution</h4>
            <p>The New Architecture (Fabric + TurboModules) eliminates many batching issues:</p>
            <ul>
                <li>JSI enables synchronous calls without serialization</li>
                <li>No more JSON encoding/decoding</li>
                <li>Direct memory sharing possible</li>
            </ul>
        `},{id:63,category:"Testing",icon:"🧪",question:"How do you test async operations and API calls in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Testing Async Components</h4>
            <pre><code>import { render, waitFor, screen } from '@testing-library/react-native';

// Component that fetches data
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);

    if (!user) return &lt;Text&gt;Loading...&lt;/Text&gt;;
    return &lt;Text testID="username"&gt;{user.name}&lt;/Text&gt;;
}

// Test
test('loads and displays user', async () => {
    // Mock the API
    jest.spyOn(api, 'fetchUser').mockResolvedValue({
        id: 1,
        name: 'John Doe'
    });

    render(&lt;UserProfile userId={1} /&gt;);

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeTruthy();

    // Wait for async update
    await waitFor(() => {
        expect(screen.getByTestId('username')).toHaveTextContent('John Doe');
    });
});</code></pre>

            <h4>Testing with MSW (Mock Service Worker)</h4>
            <pre><code>import { setupServer } from 'msw/native';
import { http, HttpResponse } from 'msw';

const server = setupServer(
    http.get('/api/users/:id', ({ params }) => {
        return HttpResponse.json({
            id: params.id,
            name: 'Test User',
        });
    }),

    http.post('/api/login', async ({ request }) => {
        const body = await request.json();
        if (body.password === 'correct') {
            return HttpResponse.json({ token: 'abc123' });
        }
        return HttpResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('handles login error', async () => {
    render(&lt;LoginScreen /&gt;);

    fireEvent.changeText(screen.getByTestId('email'), 'user@test.com');
    fireEvent.changeText(screen.getByTestId('password'), 'wrong');
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
});</code></pre>

            <h4>Testing Custom Hooks</h4>
            <pre><code>import { renderHook, waitFor } from '@testing-library/react-native';

test('useApi hook fetches data', async () => {
    const mockData = { items: [1, 2, 3] };
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useApi('/api/items'));

    // Initially loading
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
});</code></pre>

            <h4>Testing Error States</h4>
            <pre><code>test('displays error message on API failure', async () => {
    server.use(
        http.get('/api/users', () => {
            return HttpResponse.json(
                { message: 'Server error' },
                { status: 500 }
            );
        })
    );

    render(&lt;UserList /&gt;);

    await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeTruthy();
    });
});</code></pre>
        `},{id:64,category:"Testing",icon:"🧪",question:"How do you implement snapshot testing in React Native and when is it useful?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Snapshot Testing?</h4>
            <p>Snapshot tests capture the rendered output of a component and compare it against a stored reference file.</p>

            <h4>Basic Snapshot Test</h4>
            <pre><code>import { render } from '@testing-library/react-native';

test('Button renders correctly', () => {
    const tree = render(
        &lt;Button title="Press me" onPress={() => {}} /&gt;
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

// First run: Creates __snapshots__/Button.test.tsx.snap
// Subsequent runs: Compares against snapshot</code></pre>

            <h4>Inline Snapshots</h4>
            <pre><code>test('renders user card', () => {
    const tree = render(&lt;UserCard name="John" avatar="url" /&gt;);

    expect(tree.toJSON()).toMatchInlineSnapshot(\`
        &lt;View style={[Object]}&gt;
            &lt;Image source={[Object]} /&gt;
            &lt;Text&gt;John&lt;/Text&gt;
        &lt;/View&gt;
    \`);
});</code></pre>

            <h4>Snapshot with Dynamic Data</h4>
            <pre><code>test('renders with date', () => {
    const tree = render(&lt;Post createdAt={new Date('2024-01-01')} /&gt;);

    expect(tree.toJSON()).toMatchSnapshot({
        // Property matchers for dynamic values
        children: expect.arrayContaining([
            expect.objectContaining({
                type: 'Text',
                children: [expect.any(String)], // Date string
            }),
        ]),
    });
});</code></pre>

            <h4>When to Use Snapshots</h4>
            <ul>
                <li><strong>Good for:</strong> UI components, styled components, detecting unintended changes</li>
                <li><strong>Not good for:</strong> Complex logic, frequently changing components</li>
            </ul>

            <h4>Best Practices</h4>
            <pre><code>// 1. Keep snapshots small and focused
test('button label renders', () => {
    const { getByText } = render(&lt;Button title="Submit" /&gt;);
    expect(getByText('Submit')).toBeTruthy();
});

// 2. Use descriptive test names
test('disabled button has reduced opacity', () => { ... });

// 3. Review snapshot changes carefully
// Don't just update snapshots blindly!
// npm test -- -u  // Updates all snapshots

// 4. Commit snapshots to version control
// They serve as documentation</code></pre>

            <h4>Snapshot Testing Gotchas</h4>
            <ul>
                <li>Large snapshots are hard to review</li>
                <li>Brittle: Small changes trigger failures</li>
                <li>Can lead to "approval fatigue"</li>
                <li>Don't test implementation details</li>
            </ul>
        `},{id:65,category:"Testing",icon:"🧪",question:"Explain how to set up and write Detox E2E tests for React Native.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Detox Setup</h4>
            <pre><code>// Install
npm install detox --save-dev
npm install jest-circus --save-dev

// Initialize
npx detox init

// .detoxrc.js
module.exports = {
    testRunner: {
        args: {
            $0: 'jest',
            config: 'e2e/jest.config.js',
        },
        jest: {
            setupTimeout: 120000,
        },
    },
    apps: {
        'ios.debug': {
            type: 'ios.app',
            binaryPath: 'ios/build/MyApp.app',
            build: 'xcodebuild -workspace ios/MyApp.xcworkspace ...',
        },
        'android.debug': {
            type: 'android.apk',
            binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
            build: 'cd android && ./gradlew assembleDebug',
        },
    },
    devices: {
        simulator: {
            type: 'ios.simulator',
            device: { type: 'iPhone 14' },
        },
        emulator: {
            type: 'android.emulator',
            device: { avdName: 'Pixel_4_API_30' },
        },
    },
    configurations: {
        'ios.sim.debug': {
            device: 'simulator',
            app: 'ios.debug',
        },
    },
};</code></pre>

            <h4>Writing E2E Tests</h4>
            <pre><code>// e2e/login.test.js
describe('Login Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should show login screen', async () => {
        await expect(element(by.id('login-screen'))).toBeVisible();
    });

    it('should login with valid credentials', async () => {
        await element(by.id('email-input')).typeText('user@test.com');
        await element(by.id('password-input')).typeText('password123');
        await element(by.id('login-button')).tap();

        // Wait for navigation
        await waitFor(element(by.id('home-screen')))
            .toBeVisible()
            .withTimeout(5000);
    });

    it('should show error for invalid login', async () => {
        await element(by.id('email-input')).typeText('user@test.com');
        await element(by.id('password-input')).typeText('wrong');
        await element(by.id('login-button')).tap();

        await expect(element(by.text('Invalid credentials'))).toBeVisible();
    });
});</code></pre>

            <h4>Advanced Matchers & Actions</h4>
            <pre><code>// Scrolling
await element(by.id('scroll-view')).scroll(200, 'down');
await element(by.id('list')).scrollTo('bottom');

// Swiping
await element(by.id('card')).swipe('left', 'fast');

// Long press
await element(by.id('item')).longPress();

// Text matching
await element(by.text('Submit')).tap();
await element(by.label('Close button')).tap(); // Accessibility

// Multiple elements
await element(by.id('item').atIndex(2)).tap();

// Waiting
await waitFor(element(by.id('loader')))
    .not.toBeVisible()
    .withTimeout(10000);</code></pre>

            <h4>Running Tests</h4>
            <pre><code># Build app for testing
npx detox build --configuration ios.sim.debug

# Run tests
npx detox test --configuration ios.sim.debug

# Run specific test file
npx detox test e2e/login.test.js</code></pre>
        `},{id:66,category:"Styling & UI",icon:"🎨",question:"Compare different styling approaches in React Native: StyleSheet, Styled Components, and NativeWind.",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>1. StyleSheet (Built-in)</h4>
            <pre><code>import { StyleSheet, View, Text } from 'react-native';

function MyComponent() {
    return (
        &lt;View style={styles.container}&gt;
            &lt;Text style={[styles.text, styles.bold]}&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
});

// Pros: No dependencies, best performance, type safety
// Cons: Verbose, no dynamic themes without extra setup</code></pre>

            <h4>2. Styled Components</h4>
            <pre><code>import styled from 'styled-components/native';

const Container = styled.View\`
    flex: 1;
    padding: 16px;
    background-color: \${props => props.theme.background};
\`;

const Title = styled.Text&lt;{ primary?: boolean }&gt;\`
    font-size: 24px;
    color: \${props => props.primary ? '#007AFF' : '#333'};
    font-weight: \${props => props.primary ? 'bold' : 'normal'};
\`;

function MyComponent() {
    return (
        &lt;Container&gt;
            &lt;Title primary&gt;Hello World&lt;/Title&gt;
        &lt;/Container&gt;
    );
}

// Pros: Familiar CSS syntax, theming, dynamic styles
// Cons: Runtime overhead, larger bundle</code></pre>

            <h4>3. NativeWind (Tailwind for RN)</h4>
            <pre><code>import { View, Text } from 'react-native';
import { styled } from 'nativewind';

// Enable styling
const StyledView = styled(View);
const StyledText = styled(Text);

function MyComponent() {
    return (
        &lt;StyledView className="flex-1 p-4 bg-white dark:bg-gray-900"&gt;
            &lt;StyledText className="text-2xl font-bold text-gray-800 dark:text-white"&gt;
                Hello World
            &lt;/StyledText&gt;
        &lt;/StyledView&gt;
    );
}

// Or with v4 (no wrapper needed)
function MyComponent() {
    return (
        &lt;View className="flex-1 p-4 bg-white dark:bg-gray-900"&gt;
            &lt;Text className="text-2xl font-bold"&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

// Pros: Utility-first, consistent design system, dark mode
// Cons: Learning curve, className strings</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><td><strong>Approach</strong></td><td><strong>Performance</strong></td><td><strong>DX</strong></td></tr>
                <tr><td>StyleSheet</td><td>Best</td><td>Verbose</td></tr>
                <tr><td>Styled Components</td><td>Good</td><td>Excellent</td></tr>
                <tr><td>NativeWind</td><td>Very Good</td><td>Great (if familiar with Tailwind)</td></tr>
            </table>
        `},{id:67,category:"Styling & UI",icon:"🎨",question:"How do you implement dark mode and dynamic theming in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>1. Using React Native's useColorScheme</h4>
            <pre><code>import { useColorScheme, View, Text } from 'react-native';

function App() {
    const colorScheme = useColorScheme(); // 'light' | 'dark'

    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        &lt;View style={{ backgroundColor: theme.background }}&gt;
            &lt;Text style={{ color: theme.text }}&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
};

const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
};</code></pre>

            <h4>2. Theme Context with Manual Override</h4>
            <pre><code>type ThemeMode = 'light' | 'dark' | 'system';

const ThemeContext = createContext&lt;{
    theme: Theme;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}&gt;(null);

export function ThemeProvider({ children }) {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState&lt;ThemeMode&gt;('system');

    const theme = useMemo(() => {
        const activeScheme = mode === 'system' ? systemScheme : mode;
        return activeScheme === 'dark' ? darkTheme : lightTheme;
    }, [mode, systemScheme]);

    // Persist preference
    useEffect(() => {
        AsyncStorage.setItem('themeMode', mode);
    }, [mode]);

    return (
        &lt;ThemeContext.Provider value={{ theme, mode, setMode }}&gt;
            {children}
        &lt;/ThemeContext.Provider&gt;
    );
}

export const useTheme = () => useContext(ThemeContext);</code></pre>

            <h4>3. With NativeWind</h4>
            <pre><code>// tailwind.config.js
module.exports = {
    darkMode: 'class', // or 'media' for system preference
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#007AFF',
                    dark: '#0A84FF',
                },
            },
        },
    },
};

// Component
&lt;View className="bg-white dark:bg-black"&gt;
    &lt;Text className="text-gray-900 dark:text-white"&gt;
        Themed Text
    &lt;/Text&gt;
&lt;/View&gt;

// Toggle dark mode
import { useColorScheme } from 'nativewind';
const { colorScheme, setColorScheme } = useColorScheme();
setColorScheme('dark'); // 'light' | 'dark' | 'system'</code></pre>

            <h4>4. Navigation Theme Integration</h4>
            <pre><code>import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

function App() {
    const scheme = useColorScheme();

    return (
        &lt;NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}&gt;
            &lt;RootNavigator /&gt;
        &lt;/NavigationContainer&gt;
    );
}</code></pre>
        `},{id:68,category:"Styling & UI",icon:"🎨",question:"How do you handle responsive design and different screen sizes in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>1. Using Dimensions API</h4>
            <pre><code>import { Dimensions, useWindowDimensions } from 'react-native';

// Static (doesn't update on rotation)
const { width, height } = Dimensions.get('window');

// Hook (updates on dimension change)
function ResponsiveComponent() {
    const { width, height } = useWindowDimensions();

    const isTablet = width >= 768;
    const isLandscape = width > height;

    return (
        &lt;View style={{
            flexDirection: isLandscape ? 'row' : 'column',
            padding: isTablet ? 32 : 16,
        }}&gt;
            {/* content */}
        &lt;/View&gt;
    );
}</code></pre>

            <h4>2. Responsive Scaling</h4>
            <pre><code>import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375; // iPhone X width

// Scale based on screen width
export const scale = (size: number) =>
    (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale with max limit
export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

// Usage
const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(24),
        padding: scale(16),
    },
});</code></pre>

            <h4>3. Flexbox Responsive Layouts</h4>
            <pre><code>function ResponsiveGrid({ items }) {
    const { width } = useWindowDimensions();
    const numColumns = width >= 768 ? 3 : width >= 480 ? 2 : 1;
    const itemWidth = (width - 32 - (numColumns - 1) * 16) / numColumns;

    return (
        &lt;FlatList
            data={items}
            numColumns={numColumns}
            key={numColumns} // Force re-render on column change
            renderItem={({ item }) => (
                &lt;View style={{ width: itemWidth, margin: 8 }}&gt;
                    &lt;ItemCard item={item} /&gt;
                &lt;/View&gt;
            )}
        /&gt;
    );
}</code></pre>

            <h4>4. Safe Area Handling</h4>
            <pre><code>import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function Screen() {
    const insets = useSafeAreaInsets();

    return (
        &lt;View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}&gt;
            {/* Content */}
        &lt;/View&gt;
    );
}

// Or use SafeAreaView
&lt;SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}&gt;
    {/* Content */}
&lt;/SafeAreaView&gt;</code></pre>

            <h4>5. Platform-Specific Styling</h4>
            <pre><code>const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
            },
            android: {
                elevation: 4,
            },
        }),
    },
});</code></pre>
        `},{id:69,category:"System Design",icon:"📐",question:"How would you design a real-time chat application in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Architecture Overview</h4>
            <pre><code>┌─────────────────────────────────────────┐
│            React Native App              │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │   UI    │  │  State   │  │ Socket │ │
│  │ Layer   │  │ Manager  │  │ Client │ │
│  └────┬────┘  └────┬─────┘  └────┬───┘ │
│       │            │              │      │
│       └────────────┼──────────────┘      │
│                    │                     │
└────────────────────┼─────────────────────┘
                     │
          ┌──────────┴──────────┐
          │   WebSocket Server   │
          │   (Socket.io/WS)     │
          └──────────┬───────────┘
                     │
          ┌──────────┴──────────┐
          │    Backend APIs      │
          │  (REST + GraphQL)    │
          └──────────┬───────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
┌────┴────┐   ┌──────┴─────┐  ┌─────┴────┐
│ Database │   │   Cache    │  │  Storage │
│(MongoDB) │   │  (Redis)   │  │  (S3)    │
└──────────┘   └────────────┘  └──────────┘</code></pre>

            <h4>Key Components</h4>

            <h4>1. WebSocket Connection</h4>
            <pre><code>// hooks/useSocket.ts
function useSocket() {
    const socketRef = useRef&lt;Socket&gt;(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io(SOCKET_URL, {
            auth: { token: getAuthToken() },
            reconnection: true,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));

        socketRef.current = socket;
        return () => { socket.disconnect(); };
    }, []);

    return { socket: socketRef.current, connected };
}</code></pre>

            <h4>2. Message State Management</h4>
            <pre><code>// Optimistic updates + local-first
const sendMessage = async (content: string) => {
    const tempId = uuid();
    const message = {
        id: tempId,
        content,
        status: 'sending',
        createdAt: new Date(),
    };

    // Optimistic update
    dispatch(addMessage(message));

    try {
        const saved = await api.sendMessage(content);
        dispatch(updateMessage({ tempId, ...saved, status: 'sent' }));
    } catch (error) {
        dispatch(updateMessage({ id: tempId, status: 'failed' }));
    }
};</code></pre>

            <h4>3. Message List with Virtualization</h4>
            <pre><code>&lt;FlatList
    data={messages}
    inverted // Chat shows newest at bottom
    keyExtractor={(item) => item.id}
    renderItem={renderMessage}
    onEndReached={loadMoreMessages}
    onEndReachedThreshold={0.5}
    maintainVisibleContentPosition={{
        minIndexForVisible: 0,
    }}
/&gt;</code></pre>

            <h4>4. Offline Support</h4>
            <pre><code>// Queue messages when offline
const messageQueue = [];

NetInfo.addEventListener(state => {
    if (state.isConnected && messageQueue.length > 0) {
        messageQueue.forEach(msg => socket.emit('message', msg));
        messageQueue.length = 0;
    }
});</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li>Message pagination (cursor-based)</li>
                <li>Read receipts and typing indicators</li>
                <li>Push notifications for background</li>
                <li>Media upload with progress</li>
                <li>End-to-end encryption option</li>
            </ul>
        `},{id:70,category:"System Design",icon:"📐",question:"How would you implement infinite scroll with efficient data loading?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Cursor-Based Pagination</h4>
            <pre><code>// API Response structure
interface PaginatedResponse&lt;T&gt; {
    data: T[];
    nextCursor: string | null;
    hasMore: boolean;
}

// Custom hook for infinite scroll
function useInfiniteList&lt;T&gt;(fetchFn: (cursor?: string) => Promise&lt;PaginatedResponse&lt;T&gt;&gt;) {
    const [data, setData] = useState&lt;T[]&gt;([]);
    const [cursor, setCursor] = useState&lt;string | null&gt;(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await fetchFn(cursor);
            setData(prev => [...prev, ...response.data]);
            setCursor(response.nextCursor);
            setHasMore(response.hasMore);
        } finally {
            setLoading(false);
        }
    }, [cursor, hasMore, loading, fetchFn]);

    const refresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await fetchFn();
            setData(response.data);
            setCursor(response.nextCursor);
            setHasMore(response.hasMore);
        } finally {
            setRefreshing(false);
        }
    }, [fetchFn]);

    return { data, loading, refreshing, hasMore, loadMore, refresh };
}</code></pre>

            <h4>Implementation with FlatList</h4>
            <pre><code>function InfinitePostList() {
    const { data, loading, refreshing, loadMore, refresh } = useInfiniteList(
        (cursor) => api.getPosts({ cursor, limit: 20 })
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
            &lt;View style={styles.footer}&gt;
                &lt;ActivityIndicator size="small" /&gt;
            &lt;/View&gt;
        );
    };

    return (
        &lt;FlatList
            data={data}
            renderItem={({ item }) => &lt;PostCard post={item} /&gt;}
            keyExtractor={(item) => item.id}

            // Infinite scroll
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}

            // Pull to refresh
            refreshControl={
                &lt;RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                /&gt;
            }

            // Performance
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={5}
        /&gt;
    );
}</code></pre>

            <h4>With TanStack Query</h4>
            <pre><code>import { useInfiniteQuery } from '@tanstack/react-query';

function PostList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => api.getPosts({ cursor: pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: undefined,
    });

    const posts = data?.pages.flatMap(page => page.data) ?? [];

    return (
        &lt;FlatList
            data={posts}
            onEndReached={() => hasNextPage && fetchNextPage()}
            refreshing={isRefetching}
            onRefresh={refetch}
            // ... rest
        /&gt;
    );
}</code></pre>
        `},{id:71,category:"System Design",icon:"📐",question:"How would you implement a feature flag system in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Feature Flag Architecture</h4>
            <pre><code>// types/featureFlags.ts
export interface FeatureFlags {
    newOnboarding: boolean;
    darkModeEnabled: boolean;
    experimentalCheckout: boolean;
    maxUploadSize: number;
    apiVersion: 'v1' | 'v2';
}

const defaultFlags: FeatureFlags = {
    newOnboarding: false,
    darkModeEnabled: true,
    experimentalCheckout: false,
    maxUploadSize: 10,
    apiVersion: 'v1',
};</code></pre>

            <h4>Feature Flag Context</h4>
            <pre><code>const FeatureFlagContext = createContext&lt;{
    flags: FeatureFlags;
    isLoading: boolean;
    refresh: () => Promise&lt;void&gt;;
}&gt;(null);

export function FeatureFlagProvider({ children }) {
    const [flags, setFlags] = useState&lt;FeatureFlags&gt;(defaultFlags);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFlags = useCallback(async () => {
        try {
            // Fetch from remote config service
            const remoteFlags = await api.getFeatureFlags({
                userId: getCurrentUserId(),
                appVersion: getAppVersion(),
                platform: Platform.OS,
            });

            setFlags({ ...defaultFlags, ...remoteFlags });

            // Cache locally
            await AsyncStorage.setItem('featureFlags', JSON.stringify(remoteFlags));
        } catch (error) {
            // Fall back to cached flags
            const cached = await AsyncStorage.getItem('featureFlags');
            if (cached) {
                setFlags({ ...defaultFlags, ...JSON.parse(cached) });
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFlags();
    }, [fetchFlags]);

    return (
        &lt;FeatureFlagContext.Provider value={{ flags, isLoading, refresh: fetchFlags }}&gt;
            {children}
        &lt;/FeatureFlagContext.Provider&gt;
    );
}

export const useFeatureFlags = () => useContext(FeatureFlagContext);
export const useFeatureFlag = &lt;K extends keyof FeatureFlags&gt;(key: K) => {
    const { flags } = useFeatureFlags();
    return flags[key];
};</code></pre>

            <h4>Usage in Components</h4>
            <pre><code>// Simple boolean flag
function CheckoutButton() {
    const experimentalCheckout = useFeatureFlag('experimentalCheckout');

    if (experimentalCheckout) {
        return &lt;NewCheckoutButton /&gt;;
    }
    return &lt;LegacyCheckoutButton /&gt;;
}

// Feature gate component
function FeatureGate({
    flag,
    children,
    fallback = null,
}: {
    flag: keyof FeatureFlags;
    children: ReactNode;
    fallback?: ReactNode;
}) {
    const enabled = useFeatureFlag(flag);
    return enabled ? children : fallback;
}

// Usage
&lt;FeatureGate flag="newOnboarding" fallback={&lt;OldOnboarding /&gt;}&gt;
    &lt;NewOnboarding /&gt;
&lt;/FeatureGate&gt;</code></pre>

            <h4>A/B Testing Integration</h4>
            <pre><code>// flags include experiment variants
interface FeatureFlags {
    checkoutVariant: 'control' | 'variantA' | 'variantB';
}

function Checkout() {
    const variant = useFeatureFlag('checkoutVariant');

    // Track exposure for analytics
    useEffect(() => {
        analytics.track('experiment_exposure', {
            experiment: 'checkout_redesign',
            variant,
        });
    }, [variant]);

    switch (variant) {
        case 'variantA': return &lt;CheckoutA /&gt;;
        case 'variantB': return &lt;CheckoutB /&gt;;
        default: return &lt;CheckoutControl /&gt;;
    }
}</code></pre>

            <h4>Popular Services</h4>
            <ul>
                <li><strong>LaunchDarkly:</strong> Full-featured, expensive</li>
                <li><strong>Firebase Remote Config:</strong> Free, good for mobile</li>
                <li><strong>Statsig:</strong> A/B testing focused</li>
                <li><strong>Unleash:</strong> Open source option</li>
            </ul>
        `},{id:72,category:"System Design",icon:"📐",question:"How would you design an offline-first mobile application architecture?",difficulty:"advanced",seniority:"staff",answer:`
            <h4>Offline-First Principles</h4>
            <ul>
                <li>Local database is the source of truth</li>
                <li>Sync with server when connected</li>
                <li>Resolve conflicts automatically when possible</li>
                <li>Queue mutations for later sync</li>
            </ul>

            <h4>Architecture Layers</h4>
            <pre><code>┌─────────────────────────────────────────┐
│              UI Components               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│           Repository Layer               │
│  (Abstracts data source from UI)         │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
┌─────┴─────┐          ┌──────┴──────┐
│  Local DB  │          │  Remote API  │
│ (SQLite)   │◄────────►│  (REST/GQL)  │
└────────────┘   Sync   └─────────────┘</code></pre>

            <h4>Implementation with WatermelonDB</h4>
            <pre><code>// models/Post.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

class Post extends Model {
    static table = 'posts';

    @field('title') title!: string;
    @field('content') content!: string;
    @field('is_synced') isSynced!: boolean;
    @readonly @date('created_at') createdAt!: Date;
    @date('updated_at') updatedAt!: Date;
}

// Repository
class PostRepository {
    constructor(private database: Database) {}

    async create(data: PostInput): Promise&lt;Post&gt; {
        return await this.database.write(async () => {
            return await this.database.get&lt;Post&gt;('posts').create(post => {
                post.title = data.title;
                post.content = data.content;
                post.isSynced = false; // Mark for sync
            });
        });
    }

    async getAll(): Promise&lt;Post[]&gt; {
        return await this.database.get&lt;Post&gt;('posts').query().fetch();
    }

    async getUnsyncedPosts(): Promise&lt;Post[]&gt; {
        return await this.database
            .get&lt;Post&gt;('posts')
            .query(Q.where('is_synced', false))
            .fetch();
    }
}</code></pre>

            <h4>Sync Service</h4>
            <pre><code>class SyncService {
    async syncPosts() {
        const unsynced = await postRepo.getUnsyncedPosts();

        for (const post of unsynced) {
            try {
                const remote = await api.createPost({
                    title: post.title,
                    content: post.content,
                });

                await database.write(async () => {
                    await post.update(p => {
                        p.isSynced = true;
                        p.remoteId = remote.id;
                    });
                });
            } catch (error) {
                console.error('Sync failed for post:', post.id);
            }
        }
    }

    async pullRemoteChanges(lastSyncedAt: Date) {
        const changes = await api.getChanges({ since: lastSyncedAt });

        await database.write(async () => {
            for (const change of changes) {
                // Handle create/update/delete
                await this.applyChange(change);
            }
        });
    }
}

// Trigger sync on network restore
NetInfo.addEventListener(state => {
    if (state.isConnected) {
        syncService.syncPosts();
        syncService.pullRemoteChanges(lastSyncedAt);
    }
});</code></pre>

            <h4>Conflict Resolution Strategies</h4>
            <ul>
                <li><strong>Last-write-wins:</strong> Simple, may lose data</li>
                <li><strong>Server-wins:</strong> Server is authoritative</li>
                <li><strong>Client-wins:</strong> Local changes preserved</li>
                <li><strong>Merge:</strong> Combine changes intelligently</li>
                <li><strong>User-resolution:</strong> Let user choose</li>
            </ul>
        `},{id:73,category:"Advanced Concepts",icon:"🎓",question:"How do you implement biometric authentication (Face ID/Touch ID) in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Using expo-local-authentication</h4>
            <pre><code>import * as LocalAuthentication from 'expo-local-authentication';

async function authenticateWithBiometrics(): Promise&lt;boolean&gt; {
    // Check if hardware supports biometrics
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
        console.log('No biometric hardware available');
        return false;
    }

    // Check if biometrics are enrolled
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
        console.log('No biometrics enrolled');
        return false;
    }

    // Check available types
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // [1] = Fingerprint, [2] = Face Recognition, [3] = Iris

    // Authenticate
    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false, // Allow PIN fallback
        fallbackLabel: 'Use Passcode',
    });

    return result.success;
}</code></pre>

            <h4>Secure Token Storage with Biometrics</h4>
            <pre><code>import * as SecureStore from 'expo-secure-store';

// Store token with biometric protection
async function storeSecureToken(token: string) {
    await SecureStore.setItemAsync('authToken', token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        // Requires biometric auth on iOS
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to save credentials',
    });
}

// Retrieve token (will prompt for biometrics)
async function getSecureToken(): Promise&lt;string | null&gt; {
    try {
        return await SecureStore.getItemAsync('authToken', {
            requireAuthentication: true,
            authenticationPrompt: 'Authenticate to access your account',
        });
    } catch (error) {
        if (error.code === 'E_USER_CANCELLED') {
            // User cancelled authentication
            return null;
        }
        throw error;
    }
}</code></pre>

            <h4>React Native Keychain (Bare RN)</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';

// Store with biometric protection
await Keychain.setGenericPassword('user', token, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
});

// Retrieve (prompts biometrics)
const credentials = await Keychain.getGenericPassword({
    authenticationPrompt: {
        title: 'Authentication Required',
        subtitle: 'Please authenticate to continue',
        cancel: 'Cancel',
    },
});

if (credentials) {
    console.log('Token:', credentials.password);
}</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Always provide fallback (PIN/password)</li>
                <li>Handle cancellation gracefully</li>
                <li>Don't store sensitive data without encryption</li>
                <li>Re-authenticate for sensitive operations</li>
                <li>Check enrollment before prompting</li>
            </ul>
        `},{id:74,category:"Advanced Concepts",icon:"🎓",question:"How do you implement background tasks and scheduled jobs in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Background Fetch (iOS & Android)</h4>
            <pre><code>import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// Define the task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        // Fetch new data
        const newData = await api.checkForUpdates();

        if (newData.hasUpdates) {
            // Update local storage
            await AsyncStorage.setItem('lastData', JSON.stringify(newData));

            // Optionally show notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'New updates available!',
                    body: 'Tap to view new content',
                },
                trigger: null,
            });
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

// Register the task
async function registerBackgroundFetch() {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 15 * 60, // 15 minutes minimum
        stopOnTerminate: false,
        startOnBoot: true,
    });
}</code></pre>

            <h4>Background Location Tracking</h4>
            <pre><code>import * as Location from 'expo-location';

const LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }

    if (data) {
        const { locations } = data;
        // Process location updates
        await api.sendLocationUpdate(locations[0]);
    }
});

async function startLocationTracking() {
    const { status } = await Location.requestBackgroundPermissionsAsync();

    if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 60000, // 1 minute
            distanceInterval: 100, // 100 meters
            foregroundService: {
                notificationTitle: 'Tracking location',
                notificationBody: 'Running in background',
            },
        });
    }
}</code></pre>

            <h4>Headless JS (Android only)</h4>
            <pre><code>// index.js
import { AppRegistry } from 'react-native';

// Register headless task
AppRegistry.registerHeadlessTask('MyBackgroundTask', () => async (taskData) => {
    // Runs even when app is killed
    await performBackgroundWork(taskData);
});

// Start from native code (Java/Kotlin)
// Or use react-native-background-actions library</code></pre>

            <h4>react-native-background-actions</h4>
            <pre><code>import BackgroundService from 'react-native-background-actions';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const backgroundTask = async (taskData) => {
    const { delay } = taskData;

    while (BackgroundService.isRunning()) {
        await doWork();
        await sleep(delay);
    }
};

const options = {
    taskName: 'SyncTask',
    taskTitle: 'Syncing data...',
    taskDesc: 'Background sync in progress',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: { delay: 60000 },
};

// Start
await BackgroundService.start(backgroundTask, options);

// Stop
await BackgroundService.stop();</code></pre>
        `},{id:75,category:"Advanced Concepts",icon:"🎓",question:"How do you handle app updates and force update scenarios in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Version Check Architecture</h4>
            <pre><code>interface VersionInfo {
    currentVersion: string;
    minimumVersion: string;
    latestVersion: string;
    updateUrl: {
        ios: string;
        android: string;
    };
    forceUpdate: boolean;
    updateMessage: string;
}

async function checkForUpdates(): Promise&lt;void&gt; {
    const currentVersion = getAppVersion(); // From app.json or native
    const versionInfo = await api.getVersionInfo();

    const needsUpdate = compareVersions(currentVersion, versionInfo.minimumVersion) < 0;
    const hasOptionalUpdate = compareVersions(currentVersion, versionInfo.latestVersion) < 0;

    if (needsUpdate || versionInfo.forceUpdate) {
        showForceUpdateModal(versionInfo);
    } else if (hasOptionalUpdate) {
        showOptionalUpdateBanner(versionInfo);
    }
}</code></pre>

            <h4>Force Update Modal</h4>
            <pre><code>function ForceUpdateModal({ versionInfo, visible }) {
    const handleUpdate = () => {
        const url = Platform.select({
            ios: versionInfo.updateUrl.ios,
            android: versionInfo.updateUrl.android,
        });
        Linking.openURL(url);
    };

    return (
        &lt;Modal visible={visible} animationType="slide"&gt;
            &lt;View style={styles.container}&gt;
                &lt;Image source={require('./update-icon.png')} /&gt;
                &lt;Text style={styles.title}&gt;Update Required&lt;/Text&gt;
                &lt;Text style={styles.message}&gt;
                    {versionInfo.updateMessage}
                &lt;/Text&gt;
                &lt;Button title="Update Now" onPress={handleUpdate} /&gt;
                {/* No close button for force update */}
            &lt;/View&gt;
        &lt;/Modal&gt;
    );
}</code></pre>

            <h4>Version Comparison Utility</h4>
            <pre><code>function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const num1 = parts1[i] || 0;
        const num2 = parts2[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0; // Equal
}

// Usage
compareVersions('1.2.3', '1.2.4'); // -1 (needs update)
compareVersions('2.0.0', '1.9.9'); // 1 (newer)
compareVersions('1.0.0', '1.0.0'); // 0 (same)</code></pre>

            <h4>Using Libraries</h4>
            <pre><code>// react-native-version-check
import VersionCheck from 'react-native-version-check';

const checkVersion = async () => {
    const updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded.isNeeded) {
        Alert.alert(
            'Update Available',
            'A new version is available. Please update.',
            [
                { text: 'Update', onPress: () => Linking.openURL(updateNeeded.storeUrl) },
                { text: 'Later', style: 'cancel' },
            ]
        );
    }
};

// sp-react-native-in-app-updates (Android Play Store)
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates();
await inAppUpdates.checkNeedsUpdate().then((result) => {
    if (result.shouldUpdate) {
        inAppUpdates.startUpdate({
            updateType: IAUUpdateKind.IMMEDIATE, // or FLEXIBLE
        });
    }
});</code></pre>
        `},{id:76,category:"Behavioral",icon:"💬",question:"How do you handle technical debt in a React Native project?",difficulty:"intermediate",seniority:"senior",answer:`
            <h4>Identifying Technical Debt</h4>
            <ul>
                <li><strong>Code smells:</strong> Duplicated code, long functions, god components</li>
                <li><strong>Outdated dependencies:</strong> Security vulnerabilities, missing features</li>
                <li><strong>Missing tests:</strong> Low coverage, brittle tests</li>
                <li><strong>Performance issues:</strong> Slow screens, memory leaks</li>
                <li><strong>Documentation gaps:</strong> Undocumented APIs, missing READMEs</li>
            </ul>

            <h4>Tracking Technical Debt</h4>
            <pre><code>// Use TODO/FIXME comments with context
// TODO(john): Refactor to use new auth API - ticket: PROJ-123
// FIXME: Memory leak when navigating - priority: high
// HACK: Workaround for RN bug #12345 - remove when fixed

// Document in code
/**
 * @deprecated Use NewComponent instead
 * @see NewComponent
 * Technical debt: This component uses class lifecycle,
 * should be migrated to hooks. Ticket: PROJ-456
 */
class OldComponent extends Component { ... }</code></pre>

            <h4>Prioritization Framework</h4>
            <table>
                <tr><td><strong>Impact</strong></td><td><strong>Effort</strong></td><td><strong>Priority</strong></td></tr>
                <tr><td>High (bugs, security)</td><td>Low</td><td>Do immediately</td></tr>
                <tr><td>High</td><td>High</td><td>Plan for sprint</td></tr>
                <tr><td>Low</td><td>Low</td><td>Include with related work</td></tr>
                <tr><td>Low</td><td>High</td><td>Backlog / reconsider</td></tr>
            </table>

            <h4>Strategies for Managing Debt</h4>
            <ol>
                <li><strong>Boy Scout Rule:</strong> Leave code better than you found it</li>
                <li><strong>Dedicated time:</strong> 20% of sprint for tech debt</li>
                <li><strong>Refactor alongside features:</strong> Clean up as you work</li>
                <li><strong>Track metrics:</strong> Monitor test coverage, bundle size, dependencies</li>
            </ol>

            <h4>Communication with Stakeholders</h4>
            <ul>
                <li>Frame debt in business terms (risk, velocity impact)</li>
                <li>Show concrete benefits of addressing debt</li>
                <li>Propose incremental improvements</li>
                <li>Include debt reduction in regular planning</li>
            </ul>

            <h4>Prevention</h4>
            <ul>
                <li>Code reviews with quality focus</li>
                <li>Automated linting and formatting</li>
                <li>CI/CD quality gates</li>
                <li>Architecture decision records (ADRs)</li>
            </ul>
        `},{id:77,category:"Behavioral",icon:"💬",question:"Describe how you would onboard a new developer to an existing React Native codebase.",difficulty:"intermediate",seniority:"senior",answer:`
            <h4>Week 1: Environment & Fundamentals</h4>
            <ul>
                <li><strong>Day 1-2:</strong> Development environment setup
                    <ul>
                        <li>Clone repo, install dependencies</li>
                        <li>Run app on simulator/device</li>
                        <li>Access to all tools (Jira, Figma, Slack)</li>
                    </ul>
                </li>
                <li><strong>Day 3-4:</strong> Codebase walkthrough
                    <ul>
                        <li>Project structure explanation</li>
                        <li>Key architectural decisions</li>
                        <li>Navigation flow overview</li>
                    </ul>
                </li>
                <li><strong>Day 5:</strong> First small task (bug fix or minor UI change)</li>
            </ul>

            <h4>Documentation to Prepare</h4>
            <pre><code>README.md
├── Getting Started
│   ├── Prerequisites
│   ├── Installation
│   └── Running the app
├── Architecture
│   ├── Folder structure
│   ├── State management approach
│   └── Navigation setup
├── Development Workflow
│   ├── Git branching strategy
│   ├── PR process
│   └── CI/CD pipeline
├── Testing
│   ├── Running tests
│   └── Writing tests guide
└── Troubleshooting
    └── Common issues & solutions</code></pre>

            <h4>Pair Programming Sessions</h4>
            <ul>
                <li>Feature implementation walkthrough</li>
                <li>Debugging session</li>
                <li>Code review participation</li>
                <li>Deploy to TestFlight/Play Store</li>
            </ul>

            <h4>Onboarding Checklist</h4>
            <pre><code>□ Development environment working
□ Can run app on both platforms
□ Understands project structure
□ Completed first PR
□ Understands state management
□ Can write and run tests
□ Knows deployment process
□ Has submitted first feature
□ Participated in code review
□ Understands monitoring/analytics</code></pre>

            <h4>Resources to Share</h4>
            <ul>
                <li>Internal wiki/Notion documentation</li>
                <li>Design system in Figma</li>
                <li>API documentation (Swagger/Postman)</li>
                <li>Past architecture decision records</li>
                <li>Key Slack channels</li>
            </ul>

            <h4>Feedback Loop</h4>
            <ul>
                <li>Daily check-ins during first week</li>
                <li>Weekly 1:1s during first month</li>
                <li>30-day retrospective</li>
                <li>Document onboarding improvements</li>
            </ul>
        `},{id:78,category:"Behavioral",icon:"💬",question:"How do you balance delivering features quickly vs maintaining code quality?",difficulty:"intermediate",seniority:"senior",answer:`
            <h4>The Quality vs Speed Tradeoff</h4>
            <p>This isn't binary - it's about making informed tradeoffs and understanding consequences.</p>

            <h4>Framework for Decision Making</h4>
            <pre><code>Questions to ask:
1. What's the risk if this breaks in production?
   - User-facing payment flow → High quality required
   - Internal admin tool → More flexibility

2. How long will this code live?
   - Prototype/experiment → Speed over perfection
   - Core feature → Invest in quality

3. What's the blast radius of changes?
   - Isolated component → Easier to refactor later
   - Shared utility → Get it right first time

4. Do we have the expertise to fix it later?
   - Team knows the area well → Can iterate
   - Complex domain → Document decisions now</code></pre>

            <h4>Strategies That Enable Both</h4>
            <ol>
                <li><strong>Automated quality gates:</strong>
                    <ul>
                        <li>Linting and formatting (zero effort)</li>
                        <li>Type checking (catches bugs early)</li>
                        <li>Basic test coverage requirements</li>
                    </ul>
                </li>
                <li><strong>Progressive enhancement:</strong>
                    <ul>
                        <li>MVP first, polish later</li>
                        <li>Feature flags for gradual rollout</li>
                        <li>Planned refactoring sprints</li>
                    </ul>
                </li>
                <li><strong>Technical debt tracking:</strong>
                    <ul>
                        <li>Document shortcuts taken</li>
                        <li>Create tickets for follow-up</li>
                        <li>Allocate time for debt reduction</li>
                    </ul>
                </li>
            </ol>

            <h4>What I Won't Compromise On</h4>
            <ul>
                <li><strong>Security:</strong> No shortcuts on authentication, data handling</li>
                <li><strong>Accessibility:</strong> Basic a11y from the start</li>
                <li><strong>Core architecture:</strong> Foundation should be solid</li>
                <li><strong>Tests for critical paths:</strong> Payment, auth, data integrity</li>
            </ul>

            <h4>Communication</h4>
            <pre><code>"We can ship this in 2 days with manual testing,
 or 4 days with proper test coverage.

 Given this is our checkout flow, I recommend
 taking the extra time. Here's why..."

"For this experimental feature, I suggest we
 ship a simpler version first to validate the
 concept, then invest in polish if it works."</code></pre>
        `},{id:79,category:"Real-World Scenarios",icon:"🌍",question:"You notice the app is crashing for some users but you can't reproduce it. How do you debug this?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Step 1: Gather Information</h4>
            <pre><code>// Check crash reporting dashboard
- Crashlytics / Sentry / Bugsnag
- Look for:
  • Stack trace
  • Device info (model, OS version)
  • App version
  • User actions leading to crash
  • Frequency and affected user %

// Questions to answer:
1. Is it device-specific? (old phones, specific OS)
2. Is it version-specific? (recent release regression)
3. Is it feature-specific? (certain screen/action)
4. Is it data-specific? (certain user data triggers it)</code></pre>

            <h4>Step 2: Analyze Crash Reports</h4>
            <pre><code>// Common patterns to look for:

// 1. Null/undefined access
TypeError: Cannot read property 'x' of undefined
→ Check for optional chaining, null checks

// 2. Native module crash
Fatal Exception: java.lang.NullPointerException
→ Check native module initialization

// 3. Out of memory
Termination Reason: MEMORY PRESSURE
→ Check for memory leaks, large images

// 4. Main thread blocked
Watchdog timeout
→ Check for heavy computation on UI thread</code></pre>

            <h4>Step 3: Reproduce the Environment</h4>
            <pre><code>// Match the crash environment
1. Same device/OS version (use simulators/real devices)
2. Same app version
3. Same user data (if possible, anonymized)
4. Same network conditions

// Tools:
- Charles Proxy for network replay
- User session recordings (FullStory, LogRocket)
- Debug builds with verbose logging</code></pre>

            <h4>Step 4: Add Targeted Logging</h4>
            <pre><code>// Add breadcrumbs around suspected area
function SuspectedComponent() {
    useEffect(() => {
        crashlytics().log('SuspectedComponent mounted');
        crashlytics().setCustomKey('componentState', JSON.stringify(state));

        return () => {
            crashlytics().log('SuspectedComponent unmounted');
        };
    }, [state]);

    // Log at critical points
    const handleAction = () => {
        crashlytics().log('handleAction called');
        crashlytics().setCustomKey('actionData', JSON.stringify(data));
        // ...
    };
}</code></pre>

            <h4>Step 5: Gradual Rollout of Fix</h4>
            <pre><code>// 1. Deploy fix to beta testers
// 2. Monitor crash rates
// 3. Gradual rollout (10% → 50% → 100%)
// 4. Keep old code path with feature flag
// 5. Document root cause and prevention</code></pre>

            <h4>Prevention</h4>
            <ul>
                <li>Implement comprehensive error boundaries</li>
                <li>Add breadcrumb logging at key points</li>
                <li>Test on low-end devices</li>
                <li>Monitor crash-free sessions rate</li>
            </ul>
        `},{id:80,category:"Real-World Scenarios",icon:"🌍",question:"Users report the app is slow. How do you identify and fix performance issues?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Step 1: Define "Slow"</h4>
            <pre><code>// Quantify the problem
- Which screens are slow?
- What actions are slow? (loading, scrolling, tapping)
- How slow? (measure baseline)
- Which devices? (all or specific?)
- When did it start? (recent regression?)

// Key metrics to measure
- Time to Interactive (TTI)
- Frame rate (target: 60fps)
- JS thread responsiveness
- Memory usage</code></pre>

            <h4>Step 2: Profile the App</h4>
            <pre><code>// 1. React DevTools Profiler
- Enable in dev menu
- Record interaction
- Look for:
  • Components rendering too often
  • Slow render times (> 16ms)
  • Cascading re-renders

// 2. Performance Monitor (Dev Menu)
- Watch JS FPS (should be 60)
- Watch UI FPS (should be 60)
- Drops indicate bottlenecks

// 3. Flipper Performance Plugin
- Network request timing
- Layout inspector
- Database queries

// 4. Native Profilers
- Xcode Instruments (iOS)
- Android Studio Profiler</code></pre>

            <h4>Step 3: Common Issues & Fixes</h4>
            <pre><code>// Issue: FlatList janky scroll
// Fix:
&lt;FlatList
    removeClippedSubviews={true}
    maxToRenderPerBatch={5}
    windowSize={3}
    getItemLayout={...} // If fixed height
/&gt;

// Issue: Slow screen mount
// Fix: Defer heavy work
useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
        loadHeavyData();
    });
}, []);

// Issue: Unnecessary re-renders
// Fix: Memoization
const MemoizedItem = React.memo(Item);
const handlePress = useCallback(() => {...}, []);

// Issue: Large images
// Fix: Optimize images
&lt;FastImage
    source={{ uri, priority: 'high', cache: 'immutable' }}
    resizeMode="cover"
/&gt;

// Issue: Bridge congestion
// Fix: Batch updates
// Move to new architecture (JSI)</code></pre>

            <h4>Step 4: Measure Improvement</h4>
            <pre><code>// Before/after comparison
// Use consistent test conditions:
- Same device
- Same data set
- Cold start vs warm start

// Automate performance testing
describe('Performance', () => {
    it('renders list in under 100ms', async () => {
        const start = performance.now();
        render(&lt;HeavyList items={1000} /&gt;);
        const duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
    });
});</code></pre>

            <h4>Monitoring in Production</h4>
            <ul>
                <li>Custom performance marks/measures</li>
                <li>Real User Monitoring (RUM)</li>
                <li>Alerting on p95 latency regressions</li>
            </ul>
        `},{id:81,category:"New Architecture",icon:"🏗️",question:"What is Bridgeless Mode in React Native 0.74+ and why is it important?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What is Bridgeless Mode?</h4>
            <p>Bridgeless Mode removes the legacy Bridge entirely, making JSI the only communication layer between JavaScript and Native code.</p>

            <h4>Key Changes</h4>
            <pre><code>// Old Architecture (with Bridge)
JS Thread → Bridge (JSON serialization) → Native Thread
// Async, batched, slow for high-frequency calls

// New Architecture (Bridgeless)
JS Thread → JSI (C++ bindings) → Native Thread
// Synchronous, direct memory access, much faster</code></pre>

            <h4>Benefits</h4>
            <ul>
                <li><strong>Performance:</strong> No serialization overhead</li>
                <li><strong>Synchronous calls:</strong> Direct native method invocation</li>
                <li><strong>Type safety:</strong> Codegen ensures type correctness</li>
                <li><strong>Smaller bundle:</strong> No bridge code needed</li>
            </ul>

            <h4>Enabling Bridgeless Mode</h4>
            <pre><code>// react-native.config.js
module.exports = {
    project: {
        ios: { unstable_reactLegacyComponentNames: [] },
        android: { unstable_reactLegacyComponentNames: [] },
    },
};

// Android - MainApplication.kt
override fun isNewArchEnabled(): Boolean = true
override fun isBridgelessEnabled(): Boolean = true

// iOS - AppDelegate.mm
- (BOOL)bridgelessEnabled { return YES; }</code></pre>

            <h4>Migration Considerations</h4>
            <ul>
                <li>All native modules must be TurboModules</li>
                <li>All native components must use Fabric</li>
                <li>Third-party libraries must support New Architecture</li>
            </ul>
        `},{id:82,category:"New Architecture",icon:"🏗️",question:"How do you create a TurboModule from scratch?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Step 1: Define the Spec (TypeScript)</h4>
            <pre><code>// src/specs/NativeCalculator.ts
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    add(a: number, b: number): number;           // Sync
    multiply(a: number, b: number): Promise<number>; // Async
    getConstants(): { PI: number };
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeCalculator'
);</code></pre>

            <h4>Step 2: Run Codegen</h4>
            <pre><code>// package.json
"codegenConfig": {
    "name": "NativeCalculatorSpec",
    "type": "modules",
    "jsSrcsDir": "src/specs",
    "android": {
        "javaPackageName": "com.myapp.calculator"
    }
}

// Generate native code
npx react-native codegen</code></pre>

            <h4>Step 3: iOS Implementation (Objective-C++)</h4>
            <pre><code>// NativeCalculator.mm
#import "NativeCalculatorSpec.h"

@interface NativeCalculator : NSObject <NativeCalculatorSpec>
@end

@implementation NativeCalculator
RCT_EXPORT_MODULE()

- (NSNumber *)add:(double)a b:(double)b {
    return @(a + b);
}

- (void)multiply:(double)a b:(double)b
         resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject {
    resolve(@(a * b));
}

- (NSDictionary *)getConstants {
    return @{ @"PI": @3.14159 };
}

- (std::shared_ptr<facebook::react::TurboModule>)
    getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}
@end</code></pre>

            <h4>Step 4: Android Implementation (Kotlin)</h4>
            <pre><code>// NativeCalculatorModule.kt
class NativeCalculatorModule(context: ReactApplicationContext) :
    NativeCalculatorSpec(context) {

    override fun getName() = NAME

    override fun add(a: Double, b: Double): Double = a + b

    override fun multiply(a: Double, b: Double, promise: Promise) {
        promise.resolve(a * b)
    }

    override fun getTypedExportedConstants(): Map<String, Any> =
        mapOf("PI" to 3.14159)

    companion object {
        const val NAME = "NativeCalculator"
    }
}</code></pre>
        `},{id:83,category:"New Architecture",icon:"🏗️",question:"Explain how Fabric's Shadow Tree works and why it matters.",difficulty:"advanced",seniority:"staff",answer:`
            <h4>What is the Shadow Tree?</h4>
            <p>A C++ representation of the UI tree that enables synchronous layout calculations and efficient diffing.</p>

            <h4>Architecture Overview</h4>
            <pre><code>React Tree (JS)
     ↓
Shadow Tree (C++)  ←── Layout calculation (Yoga)
     ↓
View Tree (Native iOS/Android)</code></pre>

            <h4>Key Components</h4>
            <pre><code>// ShadowNode: Immutable node in the tree
class ShadowNode {
    ShadowNodeFamily family;      // Identity across updates
    Props props;                  // Component properties
    State state;                  // Component state
    vector<ShadowNode> children;  // Child nodes
    LayoutMetrics layoutMetrics;  // Calculated layout
}

// ShadowTree: Complete UI representation
class ShadowTree {
    ShadowNode rootShadowNode;

    // Commit a new tree version
    void commit(ShadowNode newRoot);

    // Calculate diff for mounting
    MountingTransaction diff(ShadowTree oldTree);
}</code></pre>

            <h4>Why Immutability Matters</h4>
            <ul>
                <li><strong>Thread safety:</strong> Trees can be read from any thread</li>
                <li><strong>Efficient diffing:</strong> Compare tree references, not content</li>
                <li><strong>Consistent snapshots:</strong> No partial updates visible</li>
                <li><strong>Background layout:</strong> Yoga runs off main thread</li>
            </ul>

            <h4>Mounting Process</h4>
            <pre><code>// 1. JS updates state
setState({ items: newItems });

// 2. New Shadow Tree created (background thread)
newShadowTree = clone(oldShadowTree, changes);

// 3. Layout calculated (Yoga, background thread)
calculateLayout(newShadowTree);

// 4. Diff computed
mutations = diff(oldShadowTree, newShadowTree);

// 5. Mutations applied (main thread)
applyMutations(mutations); // CREATE, DELETE, UPDATE, INSERT</code></pre>

            <h4>Performance Benefits</h4>
            <ul>
                <li>Layout happens in parallel with JS execution</li>
                <li>Only changed nodes are updated</li>
                <li>Reduced main thread work</li>
            </ul>
        `},{id:84,category:"New Architecture",icon:"🏗️",question:"What is JSI and how does it differ from the Bridge?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>JSI (JavaScript Interface)</h4>
            <p>A C++ API that allows JavaScript to hold references to C++ objects and invoke methods on them directly.</p>

            <h4>Bridge vs JSI Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Bridge</th><th>JSI</th></tr>
                <tr><td>Communication</td><td>Async, JSON messages</td><td>Sync, direct calls</td></tr>
                <tr><td>Data transfer</td><td>Serialization required</td><td>Shared memory</td></tr>
                <tr><td>Threading</td><td>Message queue</td><td>Any thread</td></tr>
                <tr><td>Performance</td><td>~5ms per call</td><td>~0.01ms per call</td></tr>
                <tr><td>Type safety</td><td>Runtime only</td><td>Compile-time (Codegen)</td></tr>
            </table>

            <h4>JSI Example</h4>
            <pre><code>// C++ side - Expose a function to JS
runtime.global().setProperty(
    runtime,
    "nativeAdd",
    jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "nativeAdd"),
        2, // argument count
        [](jsi::Runtime& rt,
           const jsi::Value& thisVal,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            double a = args[0].asNumber();
            double b = args[1].asNumber();
            return jsi::Value(a + b);
        }
    )
);

// JS side - Call directly
const result = global.nativeAdd(5, 3); // Synchronous!</code></pre>

            <h4>Host Objects</h4>
            <pre><code>// Expose complex objects to JS
class MyHostObject : public jsi::HostObject {
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override {
        if (name.utf8(rt) == "value") {
            return jsi::Value(42);
        }
        return jsi::Value::undefined();
    }
};

// JS can access like a regular object
console.log(myHostObject.value); // 42</code></pre>
        `},{id:85,category:"New Architecture",icon:"🏗️",question:"How do you migrate an existing app to the New Architecture?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Migration Checklist</h4>
            <pre><code>□ Update React Native to 0.71+
□ Update all dependencies to NA-compatible versions
□ Enable New Architecture in build config
□ Migrate custom native modules to TurboModules
□ Migrate custom native components to Fabric
□ Test thoroughly on both platforms</code></pre>

            <h4>Step 1: Check Library Compatibility</h4>
            <pre><code># Check which libraries support New Architecture
npx react-native-new-architecture-app-check

# Common libraries status:
✅ react-navigation
✅ react-native-reanimated (3.x)
✅ react-native-gesture-handler (2.x)
✅ react-native-screens
⚠️ Some libraries need updates</code></pre>

            <h4>Step 2: Enable New Architecture</h4>
            <pre><code>// Android - gradle.properties
newArchEnabled=true

// iOS - Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
pod install</code></pre>

            <h4>Step 3: Handle Interop Layer</h4>
            <pre><code>// For libraries not yet migrated, use interop
// react-native.config.js
module.exports = {
    project: {
        ios: {
            // Components that need legacy renderer
            unstable_reactLegacyComponentNames: [
                'LegacyViewManager',
            ],
        },
        android: {
            unstable_reactLegacyComponentNames: [
                'LegacyViewManager',
            ],
        },
    },
};</code></pre>

            <h4>Step 4: Migrate Custom Modules</h4>
            <pre><code>// Before: Bridge Native Module
@ReactMethod
public void doSomething(String arg, Promise promise) {
    promise.resolve(result);
}

// After: TurboModule with Codegen
// 1. Write TypeScript spec
// 2. Run codegen
// 3. Implement generated interface</code></pre>

            <h4>Gradual Migration Strategy</h4>
            <ol>
                <li>Enable NA on fresh branch</li>
                <li>Fix build errors</li>
                <li>Test core flows</li>
                <li>Use interop for problematic libraries</li>
                <li>Migrate custom code incrementally</li>
            </ol>
        `},{id:86,category:"New Architecture",icon:"🏗️",question:"What is Codegen in React Native and how does it ensure type safety?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Codegen?</h4>
            <p>Codegen generates native code (C++, Objective-C, Java/Kotlin) from TypeScript specs, ensuring type safety between JS and Native layers.</p>

            <h4>How It Works</h4>
            <pre><code>TypeScript Spec
      ↓
   Codegen
      ↓
┌─────────────────┐
│ C++ Interfaces  │ ← Shared types
├─────────────────┤
│ iOS (ObjC/C++)  │ ← Platform-specific
├─────────────────┤
│ Android (Java)  │ ← Platform-specific
└─────────────────┘</code></pre>

            <h4>Writing a Spec</h4>
            <pre><code>// NativeUserModule.ts
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    // Supported types:
    // Primitives: string, number, boolean
    // Objects: { key: Type }
    // Arrays: Array<Type>
    // Callbacks: (value: Type) => void
    // Promises: Promise<Type>

    getUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;

    updateUser(user: {
        id: string;
        name?: string;
    }): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('UserModule');</code></pre>

            <h4>Configuration</h4>
            <pre><code>// package.json
{
    "codegenConfig": {
        "name": "MyAppSpecs",
        "type": "all",
        "jsSrcsDir": "src/specs",
        "android": {
            "javaPackageName": "com.myapp.specs"
        }
    }
}</code></pre>

            <h4>Type Safety Benefits</h4>
            <ul>
                <li><strong>Compile-time errors:</strong> Catch type mismatches before runtime</li>
                <li><strong>IDE autocomplete:</strong> Native implementation guided by types</li>
                <li><strong>No serialization bugs:</strong> Types enforced at boundary</li>
                <li><strong>Documentation:</strong> Spec serves as contract</li>
            </ul>
        `},{id:87,category:"New Architecture",icon:"🏗️",question:"How do you create a Fabric Native Component?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Step 1: Define the Component Spec</h4>
            <pre><code>// src/specs/CustomViewNativeComponent.ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type {
    Float,
    Int32,
    WithDefault
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
    color?: string;
    radius?: WithDefault<Float, 0>;
    count?: Int32;
    enabled?: WithDefault<boolean, true>;
    onValueChange?: (event: { value: number }) => void;
}

export default codegenNativeComponent<NativeProps>('CustomView');</code></pre>

            <h4>Step 2: iOS Implementation</h4>
            <pre><code>// CustomView.h
#import <React/RCTViewComponentView.h>

@interface CustomView : RCTViewComponentView
@end

// CustomView.mm
#import "CustomView.h"
#import <react/renderer/components/MyAppSpecs/ComponentDescriptors.h>
#import <react/renderer/components/MyAppSpecs/Props.h>

using namespace facebook::react;

@implementation CustomView {
    UIView *_innerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<CustomViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const CustomViewProps>();
        _props = defaultProps;
        _innerView = [[UIView alloc] init];
        [self addSubview:_innerView];
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
    const auto &newProps = *std::static_pointer_cast<CustomViewProps const>(props);

    if (newProps.color != oldProps.color) {
        _innerView.backgroundColor = [UIColor colorWithHex:newProps.color];
    }

    [super updateProps:props oldProps:oldProps];
}
@end</code></pre>

            <h4>Step 3: Usage in JS</h4>
            <pre><code>import CustomView from './specs/CustomViewNativeComponent';

function App() {
    return (
        <CustomView
            color="#FF0000"
            radius={10}
            enabled={true}
            onValueChange={(e) => console.log(e.nativeEvent.value)}
            style={{ width: 100, height: 100 }}
        />
    );
}</code></pre>
        `},{id:88,category:"New Architecture",icon:"🏗️",question:"What are the performance improvements of the New Architecture?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Key Performance Improvements</h4>

            <h4>1. Synchronous Native Calls (JSI)</h4>
            <pre><code>// Old: Async bridge call (~5-10ms)
NativeModules.Calculator.add(1, 2).then(result => {});

// New: Sync JSI call (~0.01ms)
const result = global.nativeCalculator.add(1, 2);</code></pre>

            <h4>2. Reduced Serialization</h4>
            <pre><code>// Old: JSON serialization for every call
JS Object → JSON.stringify → Bridge → JSON.parse → Native

// New: Direct memory access
JS Object → JSI HostObject → Native (shared memory)</code></pre>

            <h4>3. Concurrent Rendering (Fabric)</h4>
            <pre><code>// Old: All rendering on main thread
Update → Layout → Paint (blocking)

// New: Background layout calculation
Update → Layout (background) → Paint (main thread)

// Benefits:
- Interruptible rendering
- Better responsiveness during heavy updates
- Priority-based updates</code></pre>

            <h4>4. Lazy Module Loading</h4>
            <pre><code>// Old: All modules loaded at startup
// Increased startup time

// New: TurboModules load on demand
const module = TurboModuleRegistry.get('HeavyModule');
// Only loaded when first accessed</code></pre>

            <h4>Benchmark Comparisons</h4>
            <table>
                <tr><th>Metric</th><th>Old Arch</th><th>New Arch</th></tr>
                <tr><td>Native call latency</td><td>~5ms</td><td>~0.01ms</td></tr>
                <tr><td>Startup time</td><td>Baseline</td><td>10-30% faster</td></tr>
                <tr><td>List scrolling FPS</td><td>45-55</td><td>58-60</td></tr>
                <tr><td>Memory overhead</td><td>Higher</td><td>Lower</td></tr>
            </table>

            <h4>Real-World Impact</h4>
            <ul>
                <li>Smoother animations during heavy JS work</li>
                <li>Faster gesture response</li>
                <li>Better performance on low-end devices</li>
                <li>Reduced jank during navigation</li>
            </ul>
        `},{id:89,category:"Modern Libraries",icon:"📚",question:"Compare data fetching with useEffect vs TanStack Query (React Query). When would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>useEffect Approach</h4>
            <pre><code>function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchUser(userId)
            .then(data => {
                if (!cancelled) setUser(data);
            })
            .catch(err => {
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [userId]);

    // Must handle: loading, error, caching, refetching, stale data...
}</code></pre>

            <h4>TanStack Query Approach</h4>
            <pre><code>import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        staleTime: 5 * 60 * 1000,     // 5 min before refetch
        cacheTime: 30 * 60 * 1000,    // 30 min in cache
        retry: 3,
    });

    // Automatic: caching, deduplication, background refetch,
    // error retry, window focus refetch, pagination support
}</code></pre>

            <h4>When to Use Each</h4>
            <table>
                <tr><th>Use useEffect</th><th>Use TanStack Query</th></tr>
                <tr><td>Simple one-time fetches</td><td>Complex data requirements</td></tr>
                <tr><td>No caching needed</td><td>Caching is important</td></tr>
                <tr><td>Learning/prototyping</td><td>Production apps</td></tr>
                <tr><td>Non-server data effects</td><td>Server state management</td></tr>
            </table>

            <h4>TanStack Query Features</h4>
            <ul>
                <li><strong>Automatic caching:</strong> Reduces network requests</li>
                <li><strong>Background refetching:</strong> Data stays fresh</li>
                <li><strong>Request deduplication:</strong> Multiple components, one request</li>
                <li><strong>Optimistic updates:</strong> Instant UI feedback</li>
                <li><strong>Infinite queries:</strong> Built-in pagination</li>
            </ul>
        `},{id:90,category:"Modern Libraries",icon:"📚",question:"Explain worklets in Reanimated 3 and how they enable smooth animations.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What are Worklets?</h4>
            <p>Worklets are small JavaScript functions that run on the UI thread, enabling 60fps animations without bridge communication.</p>

            <h4>Basic Worklet Example</h4>
            <pre><code>import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnUI
} from 'react-native-reanimated';

function AnimatedBox() {
    const offset = useSharedValue(0);

    // This runs on UI thread
    const animatedStyle = useAnimatedStyle(() => {
        'worklet';  // Marks function as worklet
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    const handlePress = () => {
        // Animate on UI thread
        offset.value = withSpring(offset.value + 50);
    };

    return <Animated.View style={animatedStyle} />;
}</code></pre>

            <h4>How Worklets Work</h4>
            <pre><code>// JS Thread                    UI Thread
// ─────────────                ─────────────
// 1. Define worklet
const myWorklet = () => {
    'worklet';
    return sharedValue.value * 2;
};

// 2. Babel transforms it → serializable form
// 3. Sent to UI thread via JSI
// 4. Executed directly on UI thread

// No bridge! No serialization during animation!</code></pre>

            <h4>Shared Values</h4>
            <pre><code>// Shared between JS and UI threads
const progress = useSharedValue(0);

// Read/write from JS thread
progress.value = 100;

// Read/write from UI thread (in worklet)
const style = useAnimatedStyle(() => {
    'worklet';
    return { opacity: progress.value / 100 };
});</code></pre>

            <h4>Gesture-Driven Animations</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const gesture = Gesture.Pan()
    .onUpdate((e) => {
        // Runs on UI thread as worklet
        translateX.value = e.translationX;
        translateY.value = e.translationY;
    })
    .onEnd(() => {
        // Spring back to origin
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
    });</code></pre>

            <h4>Why Worklets Matter</h4>
            <ul>
                <li>No JS-Native bridge during animations</li>
                <li>Consistent 60fps even with heavy JS work</li>
                <li>Gesture-driven animations without frame drops</li>
                <li>Complex physics-based animations</li>
            </ul>
        `},{id:91,category:"Modern Libraries",icon:"📚",question:"Why did Shopify create FlashList and when should you use it over FlatList?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Why FlashList Was Created</h4>
            <p>Shopify found FlatList performance insufficient for their complex product lists. FlashList uses cell recycling (like native UICollectionView/RecyclerView) for better performance.</p>

            <h4>Key Differences</h4>
            <table>
                <tr><th>Aspect</th><th>FlatList</th><th>FlashList</th></tr>
                <tr><td>Cell handling</td><td>Unmount/remount</td><td>Recycle cells</td></tr>
                <tr><td>Memory usage</td><td>Higher</td><td>Lower (reuses views)</td></tr>
                <tr><td>Scroll perf</td><td>Good</td><td>Excellent</td></tr>
                <tr><td>Blank cells</td><td>Common</td><td>Rare</td></tr>
                <tr><td>Setup</td><td>Simple</td><td>Needs estimatedItemSize</td></tr>
            </table>

            <h4>Basic FlashList Usage</h4>
            <pre><code>import { FlashList } from '@shopify/flash-list';

function ProductList({ products }) {
    return (
        <FlashList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            estimatedItemSize={120}  // Required! Estimate item height
            keyExtractor={(item) => item.id}
        />
    );
}</code></pre>

            <h4>When to Use FlashList</h4>
            <ul>
                <li><strong>Use FlashList:</strong>
                    <ul>
                        <li>Lists with 100+ items</li>
                        <li>Complex item components</li>
                        <li>Fast scrolling requirements</li>
                        <li>Memory-constrained apps</li>
                    </ul>
                </li>
                <li><strong>FlatList is fine for:</strong>
                    <ul>
                        <li>Small lists (&lt;50 items)</li>
                        <li>Simple item components</li>
                        <li>When migration cost isn't worth it</li>
                    </ul>
                </li>
            </ul>

            <h4>Performance Tips</h4>
            <pre><code><FlashList
    data={data}
    renderItem={renderItem}
    estimatedItemSize={100}
    // Optimize further:
    overrideItemLayout={(layout, item) => {
        layout.size = item.type === 'header' ? 50 : 100;
    }}
    getItemType={(item) => item.type}  // For heterogeneous lists
    drawDistance={250}  // Pre-render distance
/></code></pre>
        `},{id:92,category:"Modern Libraries",icon:"📚",question:"Compare Zustand vs Redux for state management in React Native.",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Zustand: Minimal Setup</h4>
            <pre><code>import { create } from 'zustand';

// Define store in one file
const useStore = create((set, get) => ({
    count: 0,
    user: null,

    increment: () => set((state) => ({ count: state.count + 1 })),
    setUser: (user) => set({ user }),
    reset: () => set({ count: 0, user: null }),
}));

// Use in component
function Counter() {
    const count = useStore((state) => state.count);
    const increment = useStore((state) => state.increment);

    return <Button onPress={increment} title={String(count)} />;
}</code></pre>

            <h4>Redux Toolkit: More Structure</h4>
            <pre><code>// slice.ts
const counterSlice = createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
        increment: (state) => { state.count += 1; },
    },
});

// store.ts
const store = configureStore({
    reducer: { counter: counterSlice.reducer },
});

// Component
function Counter() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return <Button onPress={() => dispatch(increment())} />;
}</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Zustand</th><th>Redux Toolkit</th></tr>
                <tr><td>Boilerplate</td><td>Minimal</td><td>More setup</td></tr>
                <tr><td>Bundle size</td><td>~2KB</td><td>~15KB</td></tr>
                <tr><td>DevTools</td><td>Basic</td><td>Excellent</td></tr>
                <tr><td>Middleware</td><td>Simple</td><td>Powerful</td></tr>
                <tr><td>Learning curve</td><td>Easy</td><td>Moderate</td></tr>
                <tr><td>TypeScript</td><td>Excellent</td><td>Good</td></tr>
            </table>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>Zustand:</strong> Small-medium apps, prototypes, simpler state needs</li>
                <li><strong>Redux:</strong> Large apps, complex async flows, need time-travel debugging, team familiarity</li>
            </ul>

            <h4>Zustand with Persistence</h4>
            <pre><code>import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        (set) => ({ user: null, setUser: (user) => set({ user }) }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);</code></pre>
        `},{id:93,category:"Modern Libraries",icon:"📚",question:"What is MMKV and why is it faster than AsyncStorage?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is MMKV?</h4>
            <p>MMKV is a key-value storage library developed by WeChat, offering 30x faster performance than AsyncStorage through memory mapping.</p>

            <h4>Performance Comparison</h4>
            <table>
                <tr><th>Operation</th><th>AsyncStorage</th><th>MMKV</th></tr>
                <tr><td>Read 1000 items</td><td>~550ms</td><td>~15ms</td></tr>
                <tr><td>Write 1000 items</td><td>~1200ms</td><td>~25ms</td></tr>
                <tr><td>API</td><td>Async only</td><td>Sync & Async</td></tr>
            </table>

            <h4>Basic Usage</h4>
            <pre><code>import { MMKV } from 'react-native-mmkv';

// Create instance
const storage = new MMKV();

// Synchronous operations!
storage.set('username', 'john');
storage.set('age', 25);
storage.set('settings', JSON.stringify({ theme: 'dark' }));

const username = storage.getString('username');
const age = storage.getNumber('age');
const exists = storage.contains('username');

storage.delete('age');
storage.clearAll();</code></pre>

            <h4>Why It's Faster</h4>
            <pre><code>// AsyncStorage
// 1. JS calls native module (async)
// 2. Native reads from SQLite
// 3. Data serialized back to JS
// Multiple async hops!

// MMKV
// 1. Memory-mapped file (mmap)
// 2. Direct memory access via JSI
// 3. No serialization overhead
// Synchronous, single operation!</code></pre>

            <h4>With Zustand Persist</h4>
            <pre><code>import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
    getItem: (name) => storage.getString(name) ?? null,
    setItem: (name, value) => storage.set(name, value),
    removeItem: (name) => storage.delete(name),
};

const useStore = create(
    persist(
        (set) => ({ ... }),
        { storage: createJSONStorage(() => mmkvStorage) }
    )
);</code></pre>

            <h4>When to Use MMKV</h4>
            <ul>
                <li>Frequent read/write operations</li>
                <li>Synchronous access needed</li>
                <li>Performance-critical storage</li>
                <li>Replacing AsyncStorage in existing apps</li>
            </ul>
        `},{id:94,category:"Modern Libraries",icon:"📚",question:"How do you implement complex gestures with React Native Gesture Handler 2?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>New Gesture API (v2)</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

function DraggableCard() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
        });

    // Combine gestures to run simultaneously
    const composed = Gesture.Simultaneous(panGesture, pinchGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        <GestureDetector gesture={composed}>
            <Animated.View style={[styles.card, animatedStyle]} />
        </GestureDetector>
    );
}</code></pre>

            <h4>Gesture Composition</h4>
            <pre><code>// Run in sequence
const sequence = Gesture.Sequence(longPress, pan);

// Run simultaneously
const simultaneous = Gesture.Simultaneous(pan, pinch, rotate);

// Exclusive (first wins)
const exclusive = Gesture.Exclusive(doubleTap, singleTap);

// Race (first to activate wins)
const race = Gesture.Race(swipeLeft, swipeRight);</code></pre>

            <h4>Swipe to Delete Example</h4>
            <pre><code>function SwipeableRow({ onDelete }) {
    const translateX = useSharedValue(0);
    const DELETE_THRESHOLD = -100;

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((e) => {
            translateX.value = Math.min(0, e.translationX);
        })
        .onEnd(() => {
            if (translateX.value < DELETE_THRESHOLD) {
                translateX.value = withTiming(-500, {}, () => {
                    runOnJS(onDelete)();
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={useAnimatedStyle(() => ({
                transform: [{ translateX: translateX.value }],
            }))} />
        </GestureDetector>
    );
}</code></pre>

            <h4>Benefits of Gesture Handler 2</h4>
            <ul>
                <li>Declarative gesture definition</li>
                <li>Better TypeScript support</li>
                <li>Worklet-powered (UI thread)</li>
                <li>Composable gestures</li>
            </ul>
        `},{id:95,category:"Modern Libraries",icon:"📚",question:"How do you implement type-safe navigation with React Navigation and TypeScript?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Define Navigation Types</h4>
            <pre><code>// navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    ProductDetail: { productId: string; title: string };
    Settings: { section?: 'profile' | 'notifications' };
};

// Tab Navigator
export type MainTabParamList = {
    Home: undefined;
    Search: { query?: string };
    Profile: undefined;
};

// Screen props helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

// Global type declaration
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}</code></pre>

            <h4>Create Typed Navigators</h4>
            <pre><code>import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
}</code></pre>

            <h4>Type-Safe Navigation in Screens</h4>
            <pre><code>// With screen props
function ProductDetailScreen({ route, navigation }: RootStackScreenProps<'ProductDetail'>) {
    const { productId, title } = route.params; // Typed!

    return (
        <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings', { section: 'profile' })}
        />
    );
}

// With useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function ProductCard({ product }) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', {
                productId: product.id,
                title: product.title,  // Required params enforced!
            })}
        />
    );
}</code></pre>

            <h4>Benefits</h4>
            <ul>
                <li>Autocomplete for screen names</li>
                <li>Required params enforced</li>
                <li>Refactoring safety</li>
                <li>Catch errors at compile time</li>
            </ul>
        `},{id:96,category:"Modern Libraries",icon:"📚",question:"What is Legend State and how does it compare to other state management solutions?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What is Legend State?</h4>
            <p>A fast, fine-grained reactive state library that uses Proxy for automatic tracking, enabling minimal re-renders.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

// Create observable state
const state$ = observable({
    user: { name: 'John', email: 'john@example.com' },
    todos: [],
    settings: { theme: 'dark' },
});

// Component auto-subscribes to accessed fields only
const UserName = observer(function UserName() {
    // Only re-renders when user.name changes
    return <Text>{state$.user.name.get()}</Text>;
});

// Update state
state$.user.name.set('Jane');
state$.todos.push({ id: 1, text: 'Learn Legend' });</code></pre>

            <h4>Comparison with Other Libraries</h4>
            <table>
                <tr><th>Feature</th><th>Legend</th><th>Zustand</th><th>Redux</th></tr>
                <tr><td>Fine-grained</td><td>✅ Auto</td><td>❌ Manual</td><td>❌ Manual</td></tr>
                <tr><td>Boilerplate</td><td>Minimal</td><td>Minimal</td><td>More</td></tr>
                <tr><td>Persistence</td><td>Built-in</td><td>Middleware</td><td>Middleware</td></tr>
                <tr><td>Sync</td><td>Built-in</td><td>❌</td><td>❌</td></tr>
                <tr><td>Bundle size</td><td>~4KB</td><td>~2KB</td><td>~15KB</td></tr>
            </table>

            <h4>Built-in Persistence</h4>
            <pre><code>import { configureSynced } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

const state$ = observable(
    synced({
        initial: { user: null, settings: {} },
        persist: {
            name: 'app-state',
            plugin: ObservablePersistMMKV,
        },
    })
);

// Automatically persists and rehydrates!</code></pre>

            <h4>Fine-Grained Reactivity Example</h4>
            <pre><code>// With Zustand/Redux: entire list re-renders
const todos = useSelector(state => state.todos);
return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);

// With Legend State: only changed item re-renders
const TodoList = observer(() => {
    return state$.todos.map((todo$) => (
        <TodoItem key={todo$.id.peek()} todo$={todo$} />
    ));
});

const TodoItem = observer(({ todo$ }) => {
    // Only this component re-renders when this todo changes
    return <Text>{todo$.text.get()}</Text>;
});</code></pre>

            <h4>When to Use Legend State</h4>
            <ul>
                <li>Performance-critical apps with complex state</li>
                <li>Need fine-grained reactivity without manual optimization</li>
                <li>Built-in persistence and sync requirements</li>
                <li>Real-time collaborative features</li>
            </ul>
        `},{id:97,category:"Hermes",icon:"⚡",question:"What is Hermes and what are its advantages over JavaScriptCore?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Hermes?</h4>
            <p>Hermes is a JavaScript engine optimized for React Native, developed by Meta. It compiles JS to bytecode at build time for faster startup.</p>

            <h4>Key Advantages</h4>
            <table>
                <tr><th>Metric</th><th>JavaScriptCore</th><th>Hermes</th></tr>
                <tr><td>Startup time (TTI)</td><td>Baseline</td><td>40-50% faster</td></tr>
                <tr><td>Memory usage</td><td>Higher</td><td>30% lower</td></tr>
                <tr><td>App size</td><td>Larger</td><td>Smaller bundle</td></tr>
                <tr><td>Bytecode</td><td>Compiled at runtime</td><td>Pre-compiled</td></tr>
            </table>

            <h4>How Hermes Works</h4>
            <pre><code>// Traditional JS Engine Flow
Source Code → Parse → AST → Bytecode → Execute
(All happens at app startup)

// Hermes Flow
Build Time: Source Code → Parse → AST → Bytecode (.hbc file)
Runtime:    Load Bytecode → Execute
(Parsing already done, faster startup!)</code></pre>

            <h4>Enabling Hermes</h4>
            <pre><code>// Android - android/gradle.properties
hermesEnabled=true

// iOS - ios/Podfile
:hermes_enabled => true

// Verify Hermes is running
const isHermes = () => !!global.HermesInternal;
console.log('Hermes enabled:', isHermes());</code></pre>

            <h4>Hermes Features</h4>
            <ul>
                <li><strong>Ahead-of-time compilation:</strong> Bytecode bundled with app</li>
                <li><strong>Optimized garbage collector:</strong> Lower memory pressure</li>
                <li><strong>ES6+ support:</strong> Most modern JS features</li>
                <li><strong>Source maps:</strong> Debugging with original source</li>
            </ul>

            <h4>Limitations</h4>
            <ul>
                <li>No JIT compilation (intentional for security)</li>
                <li>Some ES features may lag behind</li>
                <li>Proxy support added in newer versions</li>
            </ul>
        `},{id:98,category:"Hermes",icon:"⚡",question:"How do you debug a React Native app running Hermes?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Debugging Options</h4>

            <h4>1. Flipper (Recommended)</h4>
            <pre><code>// Flipper provides:
- Hermes Debugger integration
- Network inspector
- Layout inspector
- React DevTools
- Native logs

// Enable in your app
// Already enabled by default in RN 0.62+</code></pre>

            <h4>2. Chrome DevTools via Hermes</h4>
            <pre><code>// 1. Open dev menu (shake or Cmd+D)
// 2. Select "Open Debugger"
// 3. Opens Chrome with Hermes target

// Or connect directly:
// chrome://inspect → Configure → localhost:8081

// Note: Uses Hermes inspector protocol,
// NOT Chrome Remote Debugging (deprecated)</code></pre>

            <h4>3. Console Logging</h4>
            <pre><code>// Standard console methods work
console.log('Debug info');
console.warn('Warning');
console.error('Error');

// Performance timing
console.time('operation');
// ... code
console.timeEnd('operation');

// Group logs
console.group('User Action');
console.log('Step 1');
console.log('Step 2');
console.groupEnd();</code></pre>

            <h4>4. Source Maps</h4>
            <pre><code>// Ensure source maps are generated
// metro.config.js
module.exports = {
    transformer: {
        // Enable source maps for release builds
        minifierConfig: {
            sourceMap: {
                includeSources: true,
            },
        },
    },
};

// Upload to crash reporting service
// (Sentry, Crashlytics, etc.)</code></pre>

            <h4>Hermes-Specific Debugging</h4>
            <pre><code>// Check Hermes internals
if (global.HermesInternal) {
    // Get runtime stats
    const stats = global.HermesInternal.getRuntimeProperties();
    console.log('Hermes version:', stats['OSS Release Version']);

    // Trigger garbage collection (debug only)
    global.HermesInternal.getInstrumentedStats();
}</code></pre>

            <h4>Common Issues</h4>
            <ul>
                <li><strong>Debugger not connecting:</strong> Check Metro is running</li>
                <li><strong>Breakpoints not hitting:</strong> Ensure source maps enabled</li>
                <li><strong>Old Chrome DevTools:</strong> Use Flipper or new inspector</li>
            </ul>
        `},{id:99,category:"Hermes",icon:"⚡",question:"Explain Hermes bytecode compilation and its impact on app performance.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Bytecode Compilation Process</h4>
            <pre><code>// Build Pipeline
1. Metro bundles JavaScript
      ↓
2. Hermes compiler (hermesc) processes bundle
      ↓
3. Outputs .hbc (Hermes Bytecode) file
      ↓
4. Bytecode included in app binary

// Command line compilation
hermesc -emit-binary -out bundle.hbc bundle.js</code></pre>

            <h4>Bytecode File Structure</h4>
            <pre><code>// .hbc file contains:
┌─────────────────────┐
│ Header              │ Magic number, version
├─────────────────────┤
│ Function Table      │ Function metadata
├─────────────────────┤
│ String Table        │ All strings (deduped)
├─────────────────────┤
│ Bytecode            │ Compiled instructions
├─────────────────────┤
│ Debug Info          │ Source maps (optional)
└─────────────────────┘</code></pre>

            <h4>Performance Impact</h4>
            <table>
                <tr><th>Phase</th><th>Without Hermes</th><th>With Hermes</th></tr>
                <tr><td>Parse JS</td><td>~200ms</td><td>Skipped</td></tr>
                <tr><td>Compile to bytecode</td><td>~150ms</td><td>Pre-done</td></tr>
                <tr><td>Load bytecode</td><td>N/A</td><td>~20ms</td></tr>
                <tr><td>Total startup</td><td>~350ms</td><td>~20ms</td></tr>
            </table>

            <h4>Optimization Levels</h4>
            <pre><code>// Hermes compiler optimization flags
hermesc -O0  // No optimization (fastest compile)
hermesc -O   // Standard optimization (default)
hermesc -Og  // Optimize for debugging

// Production builds use -O by default
// Optimizations include:
// - Dead code elimination
// - Constant folding
// - Function inlining (limited)</code></pre>

            <h4>Memory Mapping</h4>
            <pre><code>// Bytecode is memory-mapped (mmap)
// Benefits:
1. Pages loaded on-demand
2. Shared between processes
3. Can be swapped to disk under memory pressure
4. Faster initial load (no copy needed)

// This is why Hermes apps use less RAM</code></pre>

            <h4>Verifying Bytecode</h4>
            <pre><code>// Check if using bytecode in release
adb shell run-as com.yourapp ls files/
// Should see: index.android.bundle (bytecode)

// Inspect bytecode
hermes -dump-bytecode bundle.hbc</code></pre>
        `},{id:100,category:"Hermes",icon:"⚡",question:"What JavaScript features are not supported in Hermes and how do you handle them?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Unsupported/Limited Features (as of Hermes 0.12)</h4>
            <pre><code>// ❌ Not Supported
- with statement (deprecated anyway)
- Local mode eval() (only global eval)
- Reflect.construct with newTarget

// ⚠️ Limited Support
- Proxy (supported since Hermes 0.7)
- Symbols (mostly supported)
- WeakRef (added recently)
- BigInt (limited support)</code></pre>

            <h4>Handling Unsupported Features</h4>

            <h4>1. Use Polyfills</h4>
            <pre><code>// Install core-js for missing features
npm install core-js

// babel.config.js
module.exports = {
    presets: [
        ['module:metro-react-native-babel-preset', {
            unstable_transformProfile: 'hermes-stable',
        }],
    ],
    plugins: [
        // Add specific polyfills
    ],
};</code></pre>

            <h4>2. Check Feature Availability</h4>
            <pre><code>// Runtime feature detection
const supportsProxy = typeof Proxy !== 'undefined';
const supportsBigInt = typeof BigInt !== 'undefined';

if (!supportsProxy) {
    // Use alternative implementation
    console.warn('Proxy not supported, using fallback');
}

// Check Hermes version
if (global.HermesInternal) {
    const version = global.HermesInternal
        .getRuntimeProperties()['OSS Release Version'];
    console.log('Hermes version:', version);
}</code></pre>

            <h4>3. Babel Transforms</h4>
            <pre><code>// babel.config.js - Transform unsupported syntax
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        // Transform optional chaining for older Hermes
        '@babel/plugin-proposal-optional-chaining',
        // Transform nullish coalescing
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};</code></pre>

            <h4>4. Library Compatibility</h4>
            <pre><code>// Some libraries may need Hermes-compatible versions
// Check library requirements:

// ✅ Works with Hermes
- react-native-reanimated (uses JSI)
- react-native-mmkv (uses JSI)

// ⚠️ May need configuration
- Libraries using eval()
- Libraries relying on Proxy (older Hermes)</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Keep Hermes updated for latest feature support</li>
                <li>Test on both iOS (JSC) and Android (Hermes) if supporting both</li>
                <li>Use feature detection rather than engine detection</li>
                <li>Check release notes for newly supported features</li>
            </ul>
        `},{id:101,category:"CI/CD",icon:"🔄",question:"How do you set up a CI/CD pipeline for a React Native app using GitHub Actions?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Basic Workflow Structure</h4>
            <pre><code># .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run linter
        run: yarn lint

      - name: Run type check
        run: yarn tsc --noEmit

      - name: Run tests
        run: yarn test --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3</code></pre>

            <h4>Android Build Job</h4>
            <pre><code>  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Cache Gradle
        uses: actions/cache@v4
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: gradle-\${{ hashFiles('**/*.gradle*') }}

      - name: Build Android
        run: |
          cd android
          ./gradlew assembleRelease

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/</code></pre>

            <h4>iOS Build Job</h4>
            <pre><code>  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Cache Pods
        uses: actions/cache@v4
        with:
          path: ios/Pods
          key: pods-\${{ hashFiles('ios/Podfile.lock') }}

      - name: Install Pods
        run: cd ios && pod install

      - name: Build iOS
        run: |
          xcodebuild -workspace ios/App.xcworkspace \\
            -scheme App \\
            -configuration Release \\
            -sdk iphonesimulator \\
            -derivedDataPath build</code></pre>
        `},{id:102,category:"CI/CD",icon:"🔄",question:"Explain how to manage iOS code signing in a CI environment.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Code Signing Components</h4>
            <pre><code>// Required for iOS distribution:
1. Signing Certificate (.p12)
   - Development or Distribution certificate
   - Private key included

2. Provisioning Profile (.mobileprovision)
   - Links app ID, certificate, and devices
   - App Store, Ad Hoc, or Development

3. Keychain
   - Stores certificates securely
   - CI creates temporary keychain</code></pre>

            <h4>Fastlane Match (Recommended)</h4>
            <pre><code># Matchfile
git_url("git@github.com:org/certificates.git")
storage_mode("git")
type("appstore")
app_identifier("com.company.app")

# CI workflow
- name: Setup certificates
  run: |
    bundle exec fastlane match appstore --readonly
  env:
    MATCH_PASSWORD: \${{ secrets.MATCH_PASSWORD }}
    MATCH_GIT_BASIC_AUTHORIZATION: \${{ secrets.GIT_AUTH }}</code></pre>

            <h4>Manual Setup (GitHub Actions)</h4>
            <pre><code># Store secrets in GitHub:
# - BUILD_CERTIFICATE_BASE64
# - P12_PASSWORD
# - BUILD_PROVISION_PROFILE_BASE64
# - KEYCHAIN_PASSWORD

- name: Install certificates
  env:
    CERTIFICATE: \${{ secrets.BUILD_CERTIFICATE_BASE64 }}
    P12_PASSWORD: \${{ secrets.P12_PASSWORD }}
    PROFILE: \${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
    KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
  run: |
    # Create keychain
    security create-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
    security default-keychain -s build.keychain
    security unlock-keychain -p "$KEYCHAIN_PASSWORD" build.keychain

    # Import certificate
    echo "$CERTIFICATE" | base64 --decode > certificate.p12
    security import certificate.p12 -k build.keychain \\
      -P "$P12_PASSWORD" -T /usr/bin/codesign

    # Install provisioning profile
    echo "$PROFILE" | base64 --decode > profile.mobileprovision
    mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles
    cp profile.mobileprovision ~/Library/MobileDevice/Provisioning\\ Profiles/

    # Allow codesign access
    security set-key-partition-list -S apple-tool:,apple: \\
      -s -k "$KEYCHAIN_PASSWORD" build.keychain</code></pre>

            <h4>EAS Build Alternative</h4>
            <pre><code># Expo's EAS handles signing automatically
eas build --platform ios --profile production

# Credentials stored in Expo's secure cloud
# Or use local credentials:
eas credentials</code></pre>
        `},{id:103,category:"CI/CD",icon:"🔄",question:"How do you implement automatic version bumping and changelog generation?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Semantic Versioning with standard-version</h4>
            <pre><code># Install
npm install --save-dev standard-version

# package.json scripts
{
    "scripts": {
        "release": "standard-version",
        "release:minor": "standard-version --release-as minor",
        "release:major": "standard-version --release-as major"
    }
}

# Creates:
# - Version bump in package.json
# - CHANGELOG.md update
# - Git tag</code></pre>

            <h4>Conventional Commits</h4>
            <pre><code>// Commit message format
type(scope): description

// Examples:
feat(auth): add biometric login
fix(payments): resolve card validation bug
chore(deps): update react-native to 0.73
docs(readme): add setup instructions

// Types that trigger version bumps:
feat: → minor version (1.0.0 → 1.1.0)
fix:  → patch version (1.0.0 → 1.0.1)
BREAKING CHANGE: → major version (1.0.0 → 2.0.0)</code></pre>

            <h4>React Native Version Sync</h4>
            <pre><code>// react-native-version package
npm install react-native-version --save-dev

// package.json
{
    "scripts": {
        "postversion": "react-native-version"
    }
}

// Syncs version to:
// - android/app/build.gradle (versionCode, versionName)
// - ios/App/Info.plist (CFBundleVersion, CFBundleShortVersionString)</code></pre>

            <h4>CI Automation</h4>
            <pre><code># .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4

      - name: Install dependencies
        run: yarn install

      - name: Create release
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          yarn release

      - name: Push changes
        run: |
          git push --follow-tags origin main</code></pre>

            <h4>Generated CHANGELOG.md</h4>
            <pre><code># Changelog

## [1.2.0] - 2024-01-15

### Features
* **auth:** add biometric login (#123)
* **profile:** implement avatar upload (#125)

### Bug Fixes
* **payments:** resolve card validation (#124)

### [1.1.0] - 2024-01-01
...</code></pre>
        `},{id:104,category:"CI/CD",icon:"🔄",question:"What is EAS Build and how does it compare to building locally or with Fastlane?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>EAS Build Overview</h4>
            <p>Expo Application Services (EAS) Build is a cloud build service that compiles React Native apps without local native toolchains.</p>

            <h4>Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Local/Fastlane</th><th>EAS Build</th></tr>
                <tr><td>Setup time</td><td>Hours</td><td>Minutes</td></tr>
                <tr><td>Machine requirements</td><td>Mac for iOS</td><td>None</td></tr>
                <tr><td>Code signing</td><td>Manual setup</td><td>Managed or manual</td></tr>
                <tr><td>Build speed</td><td>Depends on machine</td><td>Powerful cloud VMs</td></tr>
                <tr><td>Cost</td><td>Hardware + time</td><td>Free tier + paid</td></tr>
                <tr><td>Caching</td><td>Local only</td><td>Cloud cache</td></tr>
            </table>

            <h4>EAS Build Setup</h4>
            <pre><code># Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Initialize (creates eas.json)
eas build:configure

# eas.json
{
    "build": {
        "development": {
            "developmentClient": true,
            "distribution": "internal"
        },
        "preview": {
            "distribution": "internal"
        },
        "production": {
            "autoIncrement": true
        }
    }
}</code></pre>

            <h4>Running Builds</h4>
            <pre><code># Build for both platforms
eas build --platform all

# Build specific profile
eas build --platform ios --profile production

# Local build (uses cloud config, builds locally)
eas build --platform android --local

# Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>EAS Build:</strong>
                    <ul>
                        <li>Teams without Mac hardware</li>
                        <li>Quick setup needed</li>
                        <li>Managed signing preferred</li>
                        <li>Expo or bare RN projects</li>
                    </ul>
                </li>
                <li><strong>Local/Fastlane:</strong>
                    <ul>
                        <li>Full control needed</li>
                        <li>Complex custom build steps</li>
                        <li>Air-gapped environments</li>
                        <li>Cost optimization at scale</li>
                    </ul>
                </li>
            </ul>
        `},{id:105,category:"CI/CD",icon:"🔄",question:"How do you implement over-the-air (OTA) updates in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>OTA Update Options</h4>

            <h4>1. EAS Update (Expo)</h4>
            <pre><code># Setup
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"

# eas.json
{
    "build": {
        "production": {
            "channel": "production"
        }
    }
}

// app.json
{
    "expo": {
        "updates": {
            "url": "https://u.expo.dev/your-project-id"
        },
        "runtimeVersion": {
            "policy": "sdkVersion"
        }
    }
}</code></pre>

            <h4>2. CodePush (Microsoft)</h4>
            <pre><code>// Install
npm install react-native-code-push

// Wrap root component
import codePush from 'react-native-code-push';

const App = () => { ... };

export default codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);

// Release update
appcenter codepush release-react -a Owner/App-iOS -d Production
appcenter codepush release-react -a Owner/App-Android -d Production</code></pre>

            <h4>Update Strategies</h4>
            <pre><code>// Silent update (next restart)
codePush.sync({
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
});

// Immediate update (critical fix)
codePush.sync({
    installMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: {
        title: "Update Available",
        mandatoryUpdateMessage: "A critical update is required.",
        mandatoryContinueButtonLabel: "Update Now",
    },
});

// Background update with progress
codePush.sync(
    { installMode: codePush.InstallMode.ON_NEXT_RESUME },
    (status) => console.log('Status:', status),
    (progress) => console.log('Progress:', progress)
);</code></pre>

            <h4>What Can Be Updated OTA</h4>
            <table>
                <tr><th>✅ Can Update</th><th>❌ Cannot Update</th></tr>
                <tr><td>JavaScript code</td><td>Native code (Swift/Kotlin)</td></tr>
                <tr><td>Images (require())</td><td>New native modules</td></tr>
                <tr><td>JSON assets</td><td>App icons/splash</td></tr>
                <tr><td>Fonts</td><td>Permissions changes</td></tr>
            </table>

            <h4>Best Practices</h4>
            <ul>
                <li>Test updates on staging channel first</li>
                <li>Use rollback capability for critical bugs</li>
                <li>Monitor update adoption metrics</li>
                <li>Version runtime to prevent incompatible updates</li>
            </ul>
        `},{id:106,category:"CI/CD",icon:"🔄",question:"How do you set up Fastlane for automating React Native app releases?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Fastlane Setup</h4>
            <pre><code># Install
brew install fastlane

# Initialize in ios/ and android/ folders
cd ios && fastlane init
cd android && fastlane init</code></pre>

            <h4>iOS Fastfile</h4>
            <pre><code># ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Push to TestFlight"
  lane :beta do
    setup_ci if ENV['CI']

    match(type: "appstore", readonly: true)

    increment_build_number(
      xcodeproj: "App.xcodeproj",
      build_number: ENV['BUILD_NUMBER'] || latest_testflight_build_number + 1
    )

    build_app(
      workspace: "App.xcworkspace",
      scheme: "App",
      export_method: "app-store"
    )

    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )

    slack(message: "iOS beta deployed! 🚀")
  end

  desc "Deploy to App Store"
  lane :release do
    build_app(scheme: "App")
    upload_to_app_store(
      submit_for_review: true,
      automatic_release: true
    )
  end
end</code></pre>

            <h4>Android Fastfile</h4>
            <pre><code># android/fastlane/Fastfile
default_platform(:android)

platform :android do
  desc "Deploy to Play Store Internal"
  lane :beta do
    gradle(
      task: "bundle",
      build_type: "Release",
      properties: {
        "versionCode" => ENV['BUILD_NUMBER'],
      }
    )

    upload_to_play_store(
      track: "internal",
      aab: "app/build/outputs/bundle/release/app-release.aab"
    )
  end

  desc "Promote to Production"
  lane :release do
    upload_to_play_store(
      track: "internal",
      track_promote_to: "production",
      skip_upload_aab: true
    )
  end
end</code></pre>

            <h4>Shared Configuration</h4>
            <pre><code># fastlane/Appfile (iOS)
app_identifier("com.company.app")
apple_id("developer@company.com")
team_id("TEAM_ID")

# fastlane/Appfile (Android)
json_key_file("play-store-key.json")
package_name("com.company.app")</code></pre>

            <h4>CI Integration</h4>
            <pre><code># GitHub Actions
- name: Deploy iOS
  run: |
    cd ios
    bundle exec fastlane beta
  env:
    MATCH_PASSWORD: \${{ secrets.MATCH_PASSWORD }}
    FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD: \${{ secrets.ASP }}

- name: Deploy Android
  run: |
    cd android
    bundle exec fastlane beta
  env:
    PLAY_STORE_JSON_KEY: \${{ secrets.PLAY_STORE_KEY }}</code></pre>
        `},{id:107,category:"Expo",icon:"📱",question:"What is Expo Router and how does it compare to React Navigation?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Expo Router?</h4>
            <p>A file-based routing system for React Native (like Next.js for mobile), built on top of React Navigation.</p>

            <h4>File-Based Routing</h4>
            <pre><code>app/
├── _layout.tsx      // Root layout
├── index.tsx        // "/" - Home screen
├── about.tsx        // "/about"
├── settings/
│   ├── _layout.tsx  // Nested layout
│   ├── index.tsx    // "/settings"
│   └── profile.tsx  // "/settings/profile"
├── [id].tsx         // "/123" - Dynamic route
└── [...missing].tsx // Catch-all 404</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><th>Feature</th><th>React Navigation</th><th>Expo Router</th></tr>
                <tr><td>Route definition</td><td>Config objects</td><td>File system</td></tr>
                <tr><td>Deep linking</td><td>Manual config</td><td>Automatic</td></tr>
                <tr><td>Type safety</td><td>Manual setup</td><td>Auto-generated</td></tr>
                <tr><td>Web support</td><td>Separate config</td><td>Built-in</td></tr>
                <tr><td>Learning curve</td><td>Moderate</td><td>Lower (if know Next.js)</td></tr>
            </table>

            <h4>Basic Usage</h4>
            <pre><code>// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="[id]" options={{ title: 'Details' }} />
        </Stack>
    );
}

// app/index.tsx
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View>
            <Link href="/about">About</Link>
            <Link href="/product/123">Product 123</Link>
            <Link href={{ pathname: '/user/[id]', params: { id: '456' } }}>
                User Profile
            </Link>
        </View>
    );
}

// Navigation hooks
import { useRouter, useLocalSearchParams } from 'expo-router';

function ProductScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <Button onPress={() => router.push('/checkout')} />
    );
}</code></pre>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>Expo Router:</strong> New projects, web support needed, prefer convention</li>
                <li><strong>React Navigation:</strong> Existing apps, complex custom navigators, more control</li>
            </ul>
        `},{id:108,category:"Expo",icon:"📱",question:"What are Expo Config Plugins and when would you create one?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>What are Config Plugins?</h4>
            <p>Config Plugins let you customize native iOS/Android configuration without writing native code directly. They modify native files during prebuild.</p>

            <h4>When to Use</h4>
            <ul>
                <li>Add native SDK that requires Info.plist/AndroidManifest changes</li>
                <li>Modify build.gradle or Podfile settings</li>
                <li>Add custom entitlements or permissions</li>
                <li>Configure native libraries not yet supported by Expo</li>
            </ul>

            <h4>Using Existing Plugins</h4>
            <pre><code>// app.json
{
    "expo": {
        "plugins": [
            "expo-camera",
            ["expo-image-picker", { "cameraPermission": "Allow camera" }],
            ["expo-build-properties", {
                "android": { "compileSdkVersion": 34 },
                "ios": { "deploymentTarget": "14.0" }
            }]
        ]
    }
}</code></pre>

            <h4>Creating Custom Plugin</h4>
            <pre><code>// plugins/withCustomPermission.js
const { withInfoPlist, withAndroidManifest } = require('@expo/config-plugins');

function withCustomPermission(config, { permissionText }) {
    // Modify iOS Info.plist
    config = withInfoPlist(config, (config) => {
        config.modResults.NSCustomPermission = permissionText;
        return config;
    });

    // Modify Android Manifest
    config = withAndroidManifest(config, (config) => {
        const mainApp = config.modResults.manifest.application[0];
        mainApp.$['android:customAttribute'] = 'value';
        return config;
    });

    return config;
}

module.exports = withCustomPermission;

// Usage in app.json
{
    "plugins": [
        ["./plugins/withCustomPermission", { "permissionText": "We need this" }]
    ]
}</code></pre>

            <h4>Modifying Gradle</h4>
            <pre><code>const { withAppBuildGradle } = require('@expo/config-plugins');

function withCustomGradle(config) {
    return withAppBuildGradle(config, (config) => {
        config.modResults.contents = config.modResults.contents.replace(
            'dependencies {',
            \`dependencies {
    implementation 'com.custom:library:1.0.0'\`
        );
        return config;
    });
}

module.exports = withCustomGradle;</code></pre>

            <h4>Run Prebuild</h4>
            <pre><code># Generate native projects with plugins applied
npx expo prebuild

# Clean and regenerate
npx expo prebuild --clean</code></pre>
        `},{id:109,category:"Expo",icon:"📱",question:"Explain the difference between Expo Go, Development Builds, and Production builds.",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>Build Types Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Expo Go</th><th>Dev Build</th><th>Production</th></tr>
                <tr><td>Native code</td><td>Pre-bundled</td><td>Custom</td><td>Custom</td></tr>
                <tr><td>Custom modules</td><td>❌</td><td>✅</td><td>✅</td></tr>
                <tr><td>Setup time</td><td>Instant</td><td>Build needed</td><td>Build needed</td></tr>
                <tr><td>App Store</td><td>❌</td><td>❌ (internal)</td><td>✅</td></tr>
                <tr><td>Debug tools</td><td>Limited</td><td>Full</td><td>None</td></tr>
            </table>

            <h4>Expo Go</h4>
            <pre><code>// Quick prototyping, no native code changes
// Just scan QR code to run

// Limitations:
- Can't use libraries requiring native code
- Fixed set of Expo SDK modules
- Can't customize app icon, splash, etc.

// Usage
npx expo start
// Scan QR with Expo Go app</code></pre>

            <h4>Development Build</h4>
            <pre><code>// Custom native code + dev tools
// Like Expo Go but with your native modules

// Create development build
npx expo install expo-dev-client
eas build --profile development --platform ios

// Or build locally
npx expo run:ios

// Benefits:
- Use any native library
- Custom native code
- Dev menu and debugging
- Internal distribution for team</code></pre>

            <h4>Production Build</h4>
            <pre><code>// Optimized for App Store / Play Store

// Create production build
eas build --profile production --platform all

// Characteristics:
- No dev tools
- Optimized bundle (minified, tree-shaken)
- Proper code signing
- Can be submitted to stores

// Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>Workflow Recommendation</h4>
            <pre><code>Development Flow:
1. Start with Expo Go for rapid prototyping
2. Switch to Dev Build when you need:
   - Custom native modules
   - Libraries not in Expo Go
   - Testing production-like behavior

3. Use Production Build for:
   - Beta testing (TestFlight, Internal Track)
   - App Store releases</code></pre>
        `},{id:110,category:"Expo",icon:"📱",question:"How do you create a custom Expo Module with native code?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Expo Modules API</h4>
            <p>Modern way to write native modules for Expo using Swift and Kotlin (no Objective-C or Java).</p>

            <h4>Create Module</h4>
            <pre><code># Create new module
npx create-expo-module my-module

# Structure created:
my-module/
├── src/
│   └── MyModule.ts        # JS interface
├── ios/
│   └── MyModule.swift     # iOS implementation
├── android/
│   └── MyModule.kt        # Android implementation
└── expo-module.config.json</code></pre>

            <h4>TypeScript Definition</h4>
            <pre><code>// src/MyModule.ts
import { NativeModule, requireNativeModule } from 'expo-modules-core';

interface MyModuleType extends NativeModule {
    PI: number;
    hello(): string;
    addAsync(a: number, b: number): Promise<number>;
}

export default requireNativeModule<MyModuleType>('MyModule');</code></pre>

            <h4>iOS Implementation (Swift)</h4>
            <pre><code>// ios/MyModule.swift
import ExpoModulesCore

public class MyModule: Module {
    public func definition() -> ModuleDefinition {
        Name("MyModule")

        // Constants
        Constants([
            "PI": Double.pi
        ])

        // Sync function
        Function("hello") {
            return "Hello from Swift!"
        }

        // Async function
        AsyncFunction("addAsync") { (a: Double, b: Double) -> Double in
            return a + b
        }

        // View component
        View(MyNativeView.self) {
            Prop("color") { (view, color: UIColor) in
                view.backgroundColor = color
            }

            Events("onPress")
        }
    }
}</code></pre>

            <h4>Android Implementation (Kotlin)</h4>
            <pre><code>// android/MyModule.kt
package expo.modules.mymodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("MyModule")

        Constants(
            "PI" to Math.PI
        )

        Function("hello") {
            "Hello from Kotlin!"
        }

        AsyncFunction("addAsync") { a: Double, b: Double ->
            a + b
        }
    }
}</code></pre>

            <h4>Using the Module</h4>
            <pre><code>import MyModule from 'my-module';

console.log(MyModule.PI);         // 3.14159...
console.log(MyModule.hello());    // "Hello from Swift/Kotlin!"

const sum = await MyModule.addAsync(2, 3);  // 5</code></pre>
        `},{id:111,category:"Expo",icon:"📱",question:"What is Expo Prebuild and how does it enable bare workflow features in managed workflow?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>What is Prebuild?</h4>
            <p>Prebuild generates native iOS and Android projects from your app.json/app.config.js configuration, bridging managed and bare workflows.</p>

            <h4>How It Works</h4>
            <pre><code># Generate native projects
npx expo prebuild

# Result:
my-app/
├── app.json          # Configuration source
├── ios/              # Generated iOS project
│   ├── Podfile
│   └── MyApp.xcworkspace
├── android/          # Generated Android project
│   ├── build.gradle
│   └── app/
└── node_modules/</code></pre>

            <h4>Continuous Native Generation (CNG)</h4>
            <pre><code>// .gitignore - Don't commit native folders
/ios
/android

// Regenerate when needed
npx expo prebuild --clean

// Benefits:
- Native code is derived from config
- Upgrade RN by regenerating
- No merge conflicts in native code
- Consistent builds across team</code></pre>

            <h4>Configuration Flow</h4>
            <pre><code>// app.config.js → Config Plugins → Native Code

// app.config.js
export default {
    name: "My App",
    ios: {
        bundleIdentifier: "com.company.app",
        infoPlist: {
            NSCameraUsageDescription: "For photos"
        }
    },
    android: {
        package: "com.company.app",
        permissions: ["CAMERA"]
    },
    plugins: [
        "expo-camera",
        ["expo-build-properties", {
            ios: { deploymentTarget: "14.0" }
        }]
    ]
};

// Prebuild applies all config to native projects</code></pre>

            <h4>When to Use Prebuild</h4>
            <ul>
                <li><strong>Use Prebuild (regenerate):</strong>
                    <ul>
                        <li>Adding new native modules</li>
                        <li>Changing app.json config</li>
                        <li>Upgrading Expo SDK</li>
                        <li>CI/CD builds</li>
                    </ul>
                </li>
                <li><strong>Commit native folders (eject):</strong>
                    <ul>
                        <li>Heavy native customization</li>
                        <li>Manual native code changes</li>
                        <li>Legacy projects</li>
                    </ul>
                </li>
            </ul>

            <h4>Prebuild vs Eject</h4>
            <table>
                <tr><th>Prebuild (CNG)</th><th>Eject (Legacy)</th></tr>
                <tr><td>Regenerate native code</td><td>One-time generation</td></tr>
                <tr><td>Config-driven</td><td>Manual maintenance</td></tr>
                <tr><td>Easy upgrades</td><td>Manual upgrade work</td></tr>
                <tr><td>Modern approach</td><td>Deprecated pattern</td></tr>
            </table>
        `},{id:112,category:"System Design",icon:"🏛️",question:"Design a push notification system with deep linking for a React Native app.",difficulty:"advanced",seniority:"staff",answer:`
            <h4>System Architecture</h4>
            <pre><code>┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Backend   │───→│  FCM/APNs   │───→│   Mobile    │
│   Server    │    │   Gateway   │    │    App      │
└─────────────┘    └─────────────┘    └─────────────┘
       ↓                                     ↓
┌─────────────┐                      ┌─────────────┐
│   Message   │                      │ Deep Link   │
│    Queue    │                      │  Handler    │
└─────────────┘                      └─────────────┘</code></pre>

            <h4>Token Registration</h4>
            <pre><code>import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

function useNotificationSetup() {
    useEffect(() => {
        async function setup() {
            // Request permission
            const status = await messaging().requestPermission();
            if (status !== messaging.AuthorizationStatus.AUTHORIZED) return;

            // Get FCM token
            const token = await messaging().getToken();
            await registerTokenWithBackend(token);

            // Listen for token refresh
            return messaging().onTokenRefresh(registerTokenWithBackend);
        }
        setup();
    }, []);
}</code></pre>

            <h4>Deep Link Handling</h4>
            <pre><code>import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Notification payload structure
{
    "notification": {
        "title": "New Message",
        "body": "John sent you a message"
    },
    "data": {
        "type": "message",
        "deepLink": "myapp://chat/123",
        "messageId": "456"
    }
}

// Handle notification tap (app in background/quit)
messaging().onNotificationOpenedApp((message) => {
    handleDeepLink(message.data.deepLink);
});

// Handle notification when app was quit
messaging().getInitialNotification().then((message) => {
    if (message) handleDeepLink(message.data.deepLink);
});

// Deep link handler
function handleDeepLink(url) {
    const route = parseDeepLink(url);
    // Navigate using your navigation library
    navigationRef.navigate(route.screen, route.params);
}</code></pre>

            <h4>Backend Notification Service</h4>
            <pre><code>// Node.js example with Firebase Admin
const admin = require('firebase-admin');

async function sendNotification(userId, payload) {
    const tokens = await getUserTokens(userId);

    const message = {
        notification: {
            title: payload.title,
            body: payload.body,
        },
        data: {
            deepLink: payload.deepLink,
            ...payload.data,
        },
        tokens: tokens,
        // Platform-specific config
        android: {
            priority: 'high',
            notification: { channelId: 'default' },
        },
        apns: {
            payload: {
                aps: { sound: 'default', badge: 1 },
            },
        },
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    handleFailedTokens(response, tokens);
}</code></pre>

            <h4>Notification Channels (Android)</h4>
            <pre><code>import notifee from '@notifee/react-native';

async function createChannels() {
    await notifee.createChannel({
        id: 'messages',
        name: 'Messages',
        importance: AndroidImportance.HIGH,
        sound: 'notification',
    });

    await notifee.createChannel({
        id: 'promotions',
        name: 'Promotions',
        importance: AndroidImportance.LOW,
    });
}</code></pre>
        `},{id:113,category:"System Design",icon:"🏛️",question:"How would you architect an offline-first React Native application?",difficulty:"advanced",seniority:"staff",answer:`
            <h4>Offline-First Architecture</h4>
            <pre><code>┌────────────────────────────────────────┐
│              UI Layer                  │
└────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────┐
│         State Management               │
│   (Zustand/Redux + Persistence)        │
└────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────┐
│          Sync Engine                   │
│   (Queue + Conflict Resolution)        │
└────────────────────────────────────────┘
          ↓                    ↓
┌─────────────────┐   ┌─────────────────┐
│  Local Storage  │   │   Remote API    │
│  (MMKV/SQLite)  │   │                 │
└─────────────────┘   └─────────────────┘</code></pre>

            <h4>Local Database Setup</h4>
            <pre><code>// Using WatermelonDB for complex offline data
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    jsi: true,  // Use JSI for performance
});

const database = new Database({
    adapter,
    modelClasses: [Task, Project, User],
});

// Or MMKV for simpler key-value storage
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();</code></pre>

            <h4>Sync Queue Implementation</h4>
            <pre><code>// Optimistic updates with sync queue
class SyncQueue {
    private queue: Operation[] = [];

    async addOperation(op: Operation) {
        // 1. Apply locally immediately
        await this.applyLocally(op);

        // 2. Add to sync queue
        this.queue.push({
            ...op,
            id: uuid(),
            timestamp: Date.now(),
            retries: 0,
        });
        this.persistQueue();

        // 3. Attempt sync if online
        if (await NetInfo.fetch().then(s => s.isConnected)) {
            this.processQueue();
        }
    }

    async processQueue() {
        for (const op of this.queue) {
            try {
                await this.syncToServer(op);
                this.removeFromQueue(op.id);
            } catch (error) {
                if (op.retries >= MAX_RETRIES) {
                    this.handleFailedOperation(op);
                } else {
                    op.retries++;
                }
            }
        }
    }
}</code></pre>

            <h4>Conflict Resolution</h4>
            <pre><code>// Last-Write-Wins (simple)
function resolveConflict(local, remote) {
    return local.updatedAt > remote.updatedAt ? local : remote;
}

// Field-level merge (complex)
function mergeChanges(base, local, remote) {
    const merged = { ...base };

    for (const field of Object.keys(local)) {
        if (local[field] !== base[field] && remote[field] === base[field]) {
            merged[field] = local[field];  // Local change wins
        } else if (remote[field] !== base[field] && local[field] === base[field]) {
            merged[field] = remote[field]; // Remote change wins
        } else if (local[field] !== remote[field]) {
            // Both changed - need strategy
            merged[field] = resolveFieldConflict(field, local, remote);
        }
    }

    return merged;
}</code></pre>

            <h4>Network Status Handling</h4>
            <pre><code>import NetInfo from '@react-native-community/netinfo';

function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        return NetInfo.addEventListener((state) => {
            setIsOnline(state.isConnected && state.isInternetReachable);

            if (state.isConnected) {
                // Trigger sync when coming online
                syncQueue.processQueue();
            }
        });
    }, []);

    return isOnline;
}</code></pre>
        `},{id:114,category:"System Design",icon:"🏛️",question:"Design an analytics and crash reporting system for a React Native app.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Analytics Architecture</h4>
            <pre><code>┌─────────────────────────────────────────┐
│              App Events                 │
│  (User actions, Screen views, etc.)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Analytics Service              │
│   (Batching, Offline queue, Privacy)   │
└─────────────────────────────────────────┘
                    ↓
┌──────────────┬──────────────┬──────────────┐
│   Amplitude  │   Firebase   │   Custom     │
│              │   Analytics  │   Backend    │
└──────────────┴──────────────┴──────────────┘</code></pre>

            <h4>Analytics Service Implementation</h4>
            <pre><code>// services/analytics.ts
class AnalyticsService {
    private queue: Event[] = [];
    private providers: AnalyticsProvider[] = [];

    constructor() {
        this.providers = [
            new AmplitudeProvider(),
            new FirebaseProvider(),
        ];

        // Flush queue periodically
        setInterval(() => this.flush(), 30000);

        // Flush on app background
        AppState.addEventListener('change', (state) => {
            if (state === 'background') this.flush();
        });
    }

    track(event: string, properties?: Record<string, any>) {
        const enrichedEvent = {
            event,
            properties: {
                ...properties,
                timestamp: Date.now(),
                sessionId: this.sessionId,
                userId: this.userId,
                platform: Platform.OS,
                appVersion: DeviceInfo.getVersion(),
            },
        };

        this.queue.push(enrichedEvent);

        // Immediate flush for critical events
        if (this.isCriticalEvent(event)) {
            this.flush();
        }
    }

    async flush() {
        if (this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

        await Promise.all(
            this.providers.map(p => p.sendBatch(events))
        );
    }
}</code></pre>

            <h4>Crash Reporting Setup</h4>
            <pre><code>// Sentry configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
    dsn: 'YOUR_DSN',
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: 0.2,
    beforeSend(event) {
        // Scrub sensitive data
        if (event.user) {
            delete event.user.email;
        }
        return event;
    },
});

// Add user context
Sentry.setUser({ id: userId, segment: userTier });

// Add breadcrumbs
Sentry.addBreadcrumb({
    category: 'navigation',
    message: 'User navigated to Profile',
    level: 'info',
});

// Capture errors
try {
    await riskyOperation();
} catch (error) {
    Sentry.captureException(error, {
        extra: { orderId, userId },
        tags: { feature: 'checkout' },
    });
}</code></pre>

            <h4>Error Boundary Integration</h4>
            <pre><code>class ErrorBoundary extends Component {
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, {
            extra: {
                componentStack: errorInfo.componentStack,
            },
        });

        analytics.track('app_crash', {
            error: error.message,
            stack: error.stack,
        });
    }

    render() {
        if (this.state.hasError) {
            return <CrashScreen onRetry={this.retry} />;
        }
        return this.props.children;
    }
}</code></pre>

            <h4>Performance Monitoring</h4>
            <pre><code>// Track screen render time
function useScreenPerformance(screenName: string) {
    useEffect(() => {
        const startTime = performance.now();

        return () => {
            const duration = performance.now() - startTime;
            analytics.track('screen_time', {
                screen: screenName,
                duration,
            });
        };
    }, []);
}

// Track API latency
async function fetchWithMetrics(url: string) {
    const start = performance.now();
    try {
        const response = await fetch(url);
        analytics.track('api_call', {
            url,
            duration: performance.now() - start,
            status: response.status,
        });
        return response;
    } catch (error) {
        analytics.track('api_error', { url, error: error.message });
        throw error;
    }
}</code></pre>
        `},{id:115,category:"System Design",icon:"🏛️",question:"How would you design a media upload feature with progress tracking and retry logic?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Upload System Architecture</h4>
            <pre><code>┌─────────────────────────────────────────┐
│           Upload Manager                │
│  (Queue, Progress, Retry, Background)  │
└─────────────────────────────────────────┘
          ↓              ↓              ↓
┌────────────┐   ┌────────────┐   ┌────────────┐
│  Chunked   │   │  Direct    │   │  Presigned │
│  Upload    │   │  Upload    │   │  URL       │
└────────────┘   └────────────┘   └────────────┘</code></pre>

            <h4>Upload Manager Implementation</h4>
            <pre><code>class UploadManager {
    private queue: Map<string, UploadTask> = new Map();
    private maxConcurrent = 3;
    private activeUploads = 0;

    async addUpload(file: File, options: UploadOptions): Promise<string> {
        const taskId = uuid();

        const task: UploadTask = {
            id: taskId,
            file,
            status: 'pending',
            progress: 0,
            retries: 0,
            options,
        };

        this.queue.set(taskId, task);
        this.persistQueue();
        this.processQueue();

        return taskId;
    }

    private async processQueue() {
        const pending = [...this.queue.values()]
            .filter(t => t.status === 'pending');

        for (const task of pending) {
            if (this.activeUploads >= this.maxConcurrent) break;
            this.executeUpload(task);
        }
    }

    private async executeUpload(task: UploadTask) {
        this.activeUploads++;
        task.status = 'uploading';
        this.emit('statusChange', task);

        try {
            await this.uploadWithProgress(task);
            task.status = 'completed';
        } catch (error) {
            if (task.retries < 3) {
                task.retries++;
                task.status = 'pending';
                // Exponential backoff
                await delay(Math.pow(2, task.retries) * 1000);
            } else {
                task.status = 'failed';
                task.error = error.message;
            }
        } finally {
            this.activeUploads--;
            this.emit('statusChange', task);
            this.processQueue();
        }
    }
}</code></pre>

            <h4>Chunked Upload for Large Files</h4>
            <pre><code>async function uploadInChunks(file: File, taskId: string) {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    // Initialize multipart upload
    const { uploadId } = await api.initMultipartUpload(file.name);
    const parts: Part[] = [];

    for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        // Upload chunk
        const { etag } = await api.uploadPart({
            uploadId,
            partNumber: i + 1,
            body: chunk,
        });

        parts.push({ partNumber: i + 1, etag });

        // Update progress
        const progress = ((i + 1) / totalChunks) * 100;
        uploadManager.updateProgress(taskId, progress);
    }

    // Complete upload
    return await api.completeMultipartUpload({ uploadId, parts });
}</code></pre>

            <h4>Progress Tracking Hook</h4>
            <pre><code>function useUpload() {
    const [uploads, setUploads] = useState<UploadTask[]>([]);

    useEffect(() => {
        const unsubscribe = uploadManager.subscribe((tasks) => {
            setUploads([...tasks]);
        });
        return unsubscribe;
    }, []);

    const upload = async (files: File[]) => {
        const taskIds = await Promise.all(
            files.map(f => uploadManager.addUpload(f))
        );
        return taskIds;
    };

    const retry = (taskId: string) => uploadManager.retry(taskId);
    const cancel = (taskId: string) => uploadManager.cancel(taskId);

    return { uploads, upload, retry, cancel };
}

// Usage
function UploadScreen() {
    const { uploads, upload, retry } = useUpload();

    return (
        <View>
            {uploads.map(task => (
                <UploadItem
                    key={task.id}
                    progress={task.progress}
                    status={task.status}
                    onRetry={() => retry(task.id)}
                />
            ))}
        </View>
    );
}</code></pre>

            <h4>Background Upload (iOS)</h4>
            <pre><code>// react-native-background-upload
import Upload from 'react-native-background-upload';

const uploadId = await Upload.startUpload({
    url: 'https://api.example.com/upload',
    path: file.uri,
    method: 'POST',
    type: 'multipart',
    field: 'file',
    // Continues even when app is backgrounded
    notification: {
        enabled: true,
        title: 'Uploading...',
    },
});

Upload.addListener('progress', uploadId, (data) => {
    console.log(\`Progress: \${data.progress}%\`);
});</code></pre>
        `},{id:116,category:"System Design",icon:"🏛️",question:"Design a feature flag system for gradual rollout and A/B testing in React Native.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>Feature Flag Architecture</h4>
            <pre><code>┌─────────────────────────────────────────┐
│         Feature Flag Service            │
│   (LaunchDarkly / Firebase / Custom)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Local Flag Store                │
│   (Cached flags + Default values)       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│              App Code                   │
│   (Conditional features/UI)             │
└─────────────────────────────────────────┘</code></pre>

            <h4>Feature Flag Service</h4>
            <pre><code>// services/featureFlags.ts
class FeatureFlagService {
    private flags: Map<string, FlagValue> = new Map();
    private defaults: Map<string, FlagValue> = new Map();

    constructor() {
        this.loadDefaults();
        this.loadCachedFlags();
    }

    async initialize(userId: string, userAttributes: UserAttributes) {
        try {
            const response = await api.getFlags({
                userId,
                platform: Platform.OS,
                appVersion: DeviceInfo.getVersion(),
                ...userAttributes,
            });

            this.flags = new Map(Object.entries(response.flags));
            this.cacheFlags();
        } catch (error) {
            console.warn('Failed to fetch flags, using cached/defaults');
        }
    }

    isEnabled(flagKey: string): boolean {
        return this.flags.get(flagKey) ?? this.defaults.get(flagKey) ?? false;
    }

    getValue<T>(flagKey: string, defaultValue: T): T {
        return (this.flags.get(flagKey) as T) ?? defaultValue;
    }
}

export const featureFlags = new FeatureFlagService();</code></pre>

            <h4>React Hook</h4>
            <pre><code>// hooks/useFeatureFlag.ts
function useFeatureFlag(flagKey: string, defaultValue = false): boolean {
    const [enabled, setEnabled] = useState(
        () => featureFlags.isEnabled(flagKey) ?? defaultValue
    );

    useEffect(() => {
        return featureFlags.subscribe(flagKey, setEnabled);
    }, [flagKey]);

    return enabled;
}

function useFeatureValue<T>(flagKey: string, defaultValue: T): T {
    const [value, setValue] = useState(
        () => featureFlags.getValue(flagKey, defaultValue)
    );

    useEffect(() => {
        return featureFlags.subscribe(flagKey, setValue);
    }, [flagKey]);

    return value;
}

// Usage
function CheckoutScreen() {
    const newCheckoutEnabled = useFeatureFlag('new_checkout_flow');
    const checkoutVariant = useFeatureValue('checkout_variant', 'control');

    if (newCheckoutEnabled) {
        return <NewCheckout variant={checkoutVariant} />;
    }
    return <LegacyCheckout />;
}</code></pre>

            <h4>Gradual Rollout Configuration</h4>
            <pre><code>// Server-side flag configuration
{
    "new_checkout_flow": {
        "type": "boolean",
        "defaultValue": false,
        "rules": [
            {
                "condition": { "userTier": "beta" },
                "value": true
            },
            {
                "condition": { "percentage": 10 },
                "value": true
            }
        ]
    },
    "checkout_variant": {
        "type": "string",
        "defaultValue": "control",
        "rules": [
            {
                "condition": { "experiment": "checkout_ab_test" },
                "distribution": {
                    "control": 50,
                    "variant_a": 25,
                    "variant_b": 25
                }
            }
        ]
    }
}</code></pre>

            <h4>A/B Test Tracking</h4>
            <pre><code>// Track experiment exposure
function useExperiment(experimentKey: string) {
    const variant = useFeatureValue(experimentKey, 'control');

    useEffect(() => {
        analytics.track('experiment_exposure', {
            experiment: experimentKey,
            variant,
        });
    }, [experimentKey, variant]);

    return variant;
}

// Track conversion
function trackConversion(experimentKey: string, eventName: string) {
    const variant = featureFlags.getValue(experimentKey, 'control');
    analytics.track(eventName, {
        experiment: experimentKey,
        variant,
    });
}</code></pre>

            <h4>Kill Switch Pattern</h4>
            <pre><code>// Emergency disable for problematic features
function useKillSwitch(featureKey: string): boolean {
    const killed = useFeatureFlag(\`kill_\${featureKey}\`, false);
    const enabled = useFeatureFlag(featureKey, true);

    return !killed && enabled;
}

// Usage
const paymentEnabled = useKillSwitch('payments');
if (!paymentEnabled) {
    return <MaintenanceScreen />;
}</code></pre>
        `}],Lf=oe.createContext(),_f="rn-interview-completed",Ch=[...new Set(Ca.map(p=>p.category))],xh=["beginner","intermediate","advanced"],Th=["junior","mid","senior","staff"],zf={search:"",categories:[],difficulties:[],seniorities:[],status:"all",sortBy:"category"};function Eh({children:p}){const[T,E]=oe.useState(()=>{try{const O=localStorage.getItem(_f);return O?new Set(JSON.parse(O)):new Set}catch{return new Set}}),[c,N]=oe.useState(zf),[U,F]=oe.useState(null),[se,D]=oe.useState(!0);oe.useEffect(()=>{localStorage.setItem(_f,JSON.stringify([...T]))},[T]);const C=oe.useCallback(O=>{E(M=>{const ee=new Set(M);return ee.has(O)?ee.delete(O):ee.add(O),ee})},[]),Y=oe.useCallback(()=>{E(new Set)},[]),L=oe.useCallback((O,M)=>{N(ee=>({...ee,[O]:M}))},[]),ce=oe.useCallback((O,M)=>{N(ee=>{const Te=ee[O],Zt=Te.includes(M)?Te.filter(ut=>ut!==M):[...Te,M];return{...ee,[O]:Zt}})},[]),j=oe.useCallback(()=>{N(zf)},[]),je=oe.useMemo(()=>{let O=0;return c.search&&O++,O+=c.categories.length,O+=c.difficulties.length,O+=c.seniorities.length,c.status!=="all"&&O++,O},[c]),we=oe.useMemo(()=>{let O=Ca;if(c.search){const M=c.search.toLowerCase();O=O.filter(ee=>ee.question.toLowerCase().includes(M)||ee.category.toLowerCase().includes(M))}return c.categories.length>0&&(O=O.filter(M=>c.categories.includes(M.category))),c.difficulties.length>0&&(O=O.filter(M=>c.difficulties.includes(M.difficulty))),c.seniorities.length>0&&(O=O.filter(M=>c.seniorities.includes(M.seniority))),c.status==="completed"?O=O.filter(M=>T.has(M.id)):c.status==="pending"&&(O=O.filter(M=>!T.has(M.id))),O=[...O].sort((M,ee)=>{switch(c.sortBy){case"difficulty":{const Te={beginner:0,intermediate:1,advanced:2};return Te[M.difficulty]-Te[ee.difficulty]}case"seniority":{const Te={junior:0,mid:1,senior:2,staff:3};return Te[M.seniority]-Te[ee.seniority]}case"alphabetical":return M.question.localeCompare(ee.question);default:return M.category.localeCompare(ee.category)}}),O},[c,T]),wt=oe.useMemo(()=>{const O={};return we.forEach(M=>{O[M.category]||(O[M.category]={icon:M.icon,questions:[]}),O[M.category].questions.push(M)}),O},[we]),Ve=oe.useMemo(()=>({total:Ca.length,completed:T.size,filtered:we.length,percentage:Math.round(T.size/Ca.length*100)}),[T,we]),Nt=oe.useMemo(()=>{const O={};return Ca.forEach(M=>{O[M.category]=(O[M.category]||0)+1}),O},[]),De=oe.useMemo(()=>{const O={};return Ca.forEach(M=>{O[M.difficulty]=(O[M.difficulty]||0)+1}),O},[]),Ge=oe.useMemo(()=>{const O={};return Ca.forEach(M=>{O[M.seniority]=(O[M.seniority]||0)+1}),O},[]),ct={questionsData:Ca,filteredQuestions:we,groupedQuestions:wt,stats:Ve,completedIds:T,toggleComplete:C,resetProgress:Y,filters:c,updateFilter:L,toggleArrayFilter:ce,clearFilters:j,activeFilterCount:je,categoryCounts:Nt,difficultyCounts:De,seniorityCounts:Ge,selectedQuestion:U,setSelectedQuestion:F,sidebarOpen:se,setSidebarOpen:D};return y.jsx(Lf.Provider,{value:ct,children:p})}function Ja(){const p=oe.useContext(Lf);if(!p)throw new Error("useApp must be used within AppProvider");return p}const Nh=p=>p.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Mh=p=>p.replace(/^([A-Z])|[\s-_]+(\w)/g,(T,E,c)=>c?c.toUpperCase():E.toLowerCase()),Bf=p=>{const T=Mh(p);return T.charAt(0).toUpperCase()+T.slice(1)},jf=(...p)=>p.filter((T,E,c)=>!!T&&T.trim()!==""&&c.indexOf(T)===E).join(" ").trim(),Rh=p=>{for(const T in p)if(T.startsWith("aria-")||T==="role"||T==="title")return!0};var kh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Dh=oe.forwardRef(({color:p="currentColor",size:T=24,strokeWidth:E=2,absoluteStrokeWidth:c,className:N="",children:U,iconNode:F,...se},D)=>oe.createElement("svg",{ref:D,...kh,width:T,height:T,stroke:p,strokeWidth:c?Number(E)*24/Number(T):E,className:jf("lucide",N),...!U&&!Rh(se)&&{"aria-hidden":"true"},...se},[...F.map(([C,Y])=>oe.createElement(C,Y)),...Array.isArray(U)?U:[U]]));const xa=(p,T)=>{const E=oe.forwardRef(({className:c,...N},U)=>oe.createElement(Dh,{ref:U,iconNode:T,className:jf(`lucide-${Nh(Bf(p))}`,`lucide-${p}`,c),...N}));return E.displayName=Bf(p),E};const Uh=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],qf=xa("check",Uh);const Oh=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Vf=xa("chevron-down",Oh);const _h=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],ws=xa("chevron-right",_h);const zh=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Bh=xa("circle",zh);const Hh=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Lh=xa("menu",Hh);const jh=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],qh=xa("rotate-ccw",jh);const Vh=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Ih=xa("search",Vh);const Ph=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Qo=xa("x",Ph);function Gh(){const{stats:p,resetProgress:T,sidebarOpen:E,setSidebarOpen:c}=Ja(),N=()=>{window.confirm("Are you sure you want to reset all progress? This cannot be undone.")&&T()};return y.jsx("header",{className:"bg-surface border-b border-border sticky top-0 z-40",children:y.jsx("div",{className:"px-4 py-4 lg:px-6",children:y.jsxs("div",{className:"flex items-center justify-between gap-4",children:[y.jsx("button",{onClick:()=>c(!E),className:"lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors",children:y.jsx(Lh,{className:"w-5 h-5"})}),y.jsxs("div",{className:"flex-1 min-w-0",children:[y.jsx("h1",{className:"text-xl lg:text-2xl font-bold text-text-primary truncate",children:"React Native Interview Prep"}),y.jsx("p",{className:"text-sm text-text-secondary hidden sm:block",children:"Master your next interview"})]}),y.jsxs("div",{className:"flex items-center gap-4",children:[y.jsxs("div",{className:"hidden sm:flex flex-col items-end gap-1",children:[y.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[y.jsxs("span",{className:"text-text-secondary",children:[p.completed," / ",p.total," completed"]}),y.jsxs("span",{className:"text-primary font-semibold",children:[p.percentage,"%"]})]}),y.jsx("div",{className:"w-32 h-2 bg-border rounded-full overflow-hidden",children:y.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300",style:{width:`${p.percentage}%`}})})]}),y.jsxs("div",{className:"sm:hidden flex items-center gap-2",children:[y.jsxs("span",{className:"text-primary font-semibold text-sm",children:[p.percentage,"%"]}),y.jsx("div",{className:"w-16 h-2 bg-border rounded-full overflow-hidden",children:y.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300",style:{width:`${p.percentage}%`}})})]}),y.jsx("button",{onClick:N,className:"p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors",title:"Reset all progress",children:y.jsx(qh,{className:"w-5 h-5"})})]})]})})})}function If(p){var T,E,c="";if(typeof p=="string"||typeof p=="number")c+=p;else if(typeof p=="object")if(Array.isArray(p)){var N=p.length;for(T=0;T<N;T++)p[T]&&(E=If(p[T]))&&(c&&(c+=" "),c+=E)}else for(E in p)p[E]&&(c&&(c+=" "),c+=E);return c}function Et(){for(var p,T,E=0,c="",N=arguments.length;E<N;E++)(p=arguments[E])&&(T=If(p))&&(c&&(c+=" "),c+=T);return c}function Ni({title:p,children:T,defaultOpen:E=!0}){const[c,N]=oe.useState(E);return y.jsxs("div",{className:"border-b border-border last:border-b-0",children:[y.jsxs("button",{onClick:()=>N(!c),className:"w-full flex items-center justify-between p-3 hover:bg-surface-elevated transition-colors",children:[y.jsx("span",{className:"font-medium text-text-primary",children:p}),c?y.jsx(Vf,{className:"w-4 h-4 text-text-muted"}):y.jsx(ws,{className:"w-4 h-4 text-text-muted"})]}),c&&y.jsx("div",{className:"px-3 pb-3 space-y-1",children:T})]})}function bs({label:p,count:T,checked:E,onChange:c,color:N}){return y.jsxs("label",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors",children:[y.jsx("input",{type:"checkbox",checked:E,onChange:c,className:"w-4 h-4 rounded border-border bg-surface accent-primary"}),y.jsxs("span",{className:Et("flex-1 text-sm",E?"text-text-primary":"text-text-secondary"),children:[N&&y.jsx("span",{className:`inline-block w-2 h-2 rounded-full mr-2 ${N}`}),p]}),T!==void 0&&y.jsxs("span",{className:"text-xs text-text-muted",children:["(",T,")"]})]})}function Fa({label:p,value:T,currentValue:E,onChange:c}){return y.jsxs("label",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors",children:[y.jsx("input",{type:"radio",checked:E===T,onChange:()=>c(T),className:"w-4 h-4 border-border bg-surface accent-primary"}),y.jsx("span",{className:Et("text-sm",E===T?"text-text-primary":"text-text-secondary"),children:p})]})}function Fh(){const{filters:p,updateFilter:T,toggleArrayFilter:E,clearFilters:c,activeFilterCount:N,stats:U,categoryCounts:F,difficultyCounts:se,seniorityCounts:D,sidebarOpen:C,setSidebarOpen:Y}=Ja(),L={beginner:"bg-success",intermediate:"bg-warning",advanced:"bg-error"},ce={junior:"🌱 Junior",mid:"🌿 Mid",senior:"🌳 Senior",staff:"🏔️ Staff+"};return y.jsxs(y.Fragment,{children:[C&&y.jsx("div",{className:"lg:hidden fixed inset-0 bg-black/50 z-40",onClick:()=>Y(!1)}),y.jsxs("aside",{className:Et("fixed lg:sticky top-0 lg:top-[73px] left-0 h-full lg:h-[calc(100vh-73px)] w-72 bg-surface border-r border-border z-50 lg:z-30","transform transition-transform duration-200 ease-in-out","overflow-y-auto",C?"translate-x-0":"-translate-x-full lg:translate-x-0"),children:[y.jsxs("div",{className:"sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between",children:[y.jsxs("div",{children:[y.jsx("h2",{className:"font-semibold text-text-primary",children:"Filters"}),y.jsxs("p",{className:"text-sm text-text-muted",children:[U.filtered," of ",U.total," questions"]})]}),y.jsxs("div",{className:"flex items-center gap-2",children:[N>0&&y.jsx("button",{onClick:c,className:"text-xs text-primary hover:underline",children:"Clear all"}),y.jsx("button",{onClick:()=>Y(!1),className:"lg:hidden p-1 rounded hover:bg-surface-elevated",children:y.jsx(Qo,{className:"w-5 h-5 text-text-muted"})})]})]}),y.jsx("div",{className:"p-3 border-b border-border",children:y.jsxs("div",{className:"relative",children:[y.jsx(Ih,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"}),y.jsx("input",{type:"text",placeholder:"Search questions...",value:p.search,onChange:j=>T("search",j.target.value),className:"w-full pl-9 pr-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"}),p.search&&y.jsx("button",{onClick:()=>T("search",""),className:"absolute right-3 top-1/2 -translate-y-1/2",children:y.jsx(Qo,{className:"w-4 h-4 text-text-muted hover:text-text-primary"})})]})}),y.jsx(Ni,{title:"Category",defaultOpen:!1,children:Ch.map(j=>y.jsx(bs,{label:j,count:F[j],checked:p.categories.includes(j),onChange:()=>E("categories",j)},j))}),y.jsx(Ni,{title:"Difficulty",children:xh.map(j=>y.jsx(bs,{label:j.charAt(0).toUpperCase()+j.slice(1),count:se[j],checked:p.difficulties.includes(j),onChange:()=>E("difficulties",j),color:L[j]},j))}),y.jsx(Ni,{title:"Seniority Level",children:Th.map(j=>y.jsx(bs,{label:ce[j],count:D[j],checked:p.seniorities.includes(j),onChange:()=>E("seniorities",j)},j))}),y.jsxs(Ni,{title:"Status",children:[y.jsx(Fa,{label:"All Questions",value:"all",currentValue:p.status,onChange:j=>T("status",j)}),y.jsx(Fa,{label:"Pending",value:"pending",currentValue:p.status,onChange:j=>T("status",j)}),y.jsx(Fa,{label:"Completed",value:"completed",currentValue:p.status,onChange:j=>T("status",j)})]}),y.jsxs(Ni,{title:"Sort By",children:[y.jsx(Fa,{label:"Category",value:"category",currentValue:p.sortBy,onChange:j=>T("sortBy",j)}),y.jsx(Fa,{label:"Difficulty",value:"difficulty",currentValue:p.sortBy,onChange:j=>T("sortBy",j)}),y.jsx(Fa,{label:"Seniority",value:"seniority",currentValue:p.sortBy,onChange:j=>T("sortBy",j)}),y.jsx(Fa,{label:"Alphabetical",value:"alphabetical",currentValue:p.sortBy,onChange:j=>T("sortBy",j)})]})]})]})}function Pf({question:p}){const{completedIds:T,toggleComplete:E,setSelectedQuestion:c}=Ja(),N=T.has(p.id),U=C=>{C.target.closest(".checkbox-area")||c(p)},F=C=>{C.stopPropagation(),E(p.id)},se={beginner:"bg-success/20 text-success",intermediate:"bg-warning/20 text-warning",advanced:"bg-error/20 text-error"},D={junior:"bg-success/20 text-success",mid:"bg-primary/20 text-primary",senior:"bg-purple-500/20 text-purple-400",staff:"bg-warning/20 text-warning"};return y.jsx("div",{onClick:U,className:Et("group p-4 bg-surface-elevated rounded-xl border cursor-pointer","transition-all duration-200","hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5",N?"border-success/50 bg-gradient-to-r from-surface-elevated to-success/5":"border-border"),children:y.jsxs("div",{className:"flex gap-3",children:[y.jsx("div",{className:"checkbox-area flex-shrink-0 mt-0.5",onClick:F,children:y.jsx("div",{className:Et("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",N?"bg-success border-success":"border-border hover:border-primary"),children:N&&y.jsx(qf,{className:"w-3 h-3 text-background"})})}),y.jsxs("div",{className:"flex-1 min-w-0",children:[y.jsx("p",{className:Et("text-sm font-medium leading-relaxed mb-3",N?"text-text-secondary":"text-text-primary"),children:p.question}),y.jsxs("div",{className:"flex flex-wrap gap-2",children:[y.jsx("span",{className:Et("px-2 py-0.5 rounded text-xs font-medium",se[p.difficulty]),children:p.difficulty}),p.seniority&&y.jsx("span",{className:Et("px-2 py-0.5 rounded text-xs font-medium",D[p.seniority]),children:p.seniority}),y.jsx("span",{className:"px-2 py-0.5 rounded text-xs font-medium bg-surface text-text-muted",children:p.category})]})]}),y.jsx(ws,{className:"flex-shrink-0 w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"})]})})}function Hf(){const{filters:p,toggleArrayFilter:T,updateFilter:E,clearFilters:c,activeFilterCount:N}=Ja();return N===0?null:y.jsxs("div",{className:"flex flex-wrap gap-2 mb-4",children:[p.search&&y.jsx(Mi,{label:`Search: "${p.search}"`,onRemove:()=>E("search","")}),p.categories.map(U=>y.jsx(Mi,{label:U,onRemove:()=>T("categories",U)},U)),p.difficulties.map(U=>y.jsx(Mi,{label:U.charAt(0).toUpperCase()+U.slice(1),onRemove:()=>T("difficulties",U)},U)),p.seniorities.map(U=>y.jsx(Mi,{label:U.charAt(0).toUpperCase()+U.slice(1),onRemove:()=>T("seniorities",U)},U)),p.status!=="all"&&y.jsx(Mi,{label:`Status: ${p.status}`,onRemove:()=>E("status","all")}),N>1&&y.jsx("button",{onClick:c,className:"px-3 py-1 text-xs text-primary hover:text-primary-dark hover:underline transition-colors",children:"Clear all"})]})}function Mi({label:p,onRemove:T}){return y.jsxs("span",{className:"inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm",children:[p,y.jsx("button",{onClick:T,className:"p-0.5 rounded-full hover:bg-primary/20 transition-colors",children:y.jsx(Qo,{className:"w-3 h-3"})})]})}function Jh({category:p,icon:T,questions:E,defaultExpanded:c=!0}){const[N,U]=oe.useState(c),{completedIds:F}=Ja(),se=E.filter(D=>F.has(D.id)).length;return y.jsxs("div",{className:"mb-4",children:[y.jsxs("button",{onClick:()=>U(!N),className:"w-full flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors",children:[y.jsx("span",{className:"text-xl",children:T}),y.jsx("span",{className:"flex-1 text-left font-semibold text-text-primary",children:p}),y.jsxs("span",{className:"text-sm text-text-muted",children:[se,"/",E.length]}),N?y.jsx(Vf,{className:"w-5 h-5 text-text-muted"}):y.jsx(ws,{className:"w-5 h-5 text-text-muted"})]}),N&&y.jsx("div",{className:"mt-2 space-y-2 pl-2",children:E.map(D=>y.jsx(Pf,{question:D},D.id))})]})}function Yh(){const{groupedQuestions:p,filteredQuestions:T,stats:E,filters:c}=Ja(),N=Object.keys(p),U=c.sortBy!=="category";return T.length===0?y.jsxs("div",{className:"flex-1 p-6",children:[y.jsx(Hf,{}),y.jsxs("div",{className:"flex flex-col items-center justify-center py-16 text-center",children:[y.jsx("div",{className:"text-6xl mb-4",children:"🔍"}),y.jsx("h3",{className:"text-xl font-semibold text-text-primary mb-2",children:"No questions match your filters"}),y.jsx("p",{className:"text-text-secondary mb-4",children:"Try adjusting your filters or search term"})]})]}):y.jsxs("div",{className:"flex-1 p-4 lg:p-6 overflow-y-auto",children:[y.jsx(Hf,{}),y.jsxs("div",{className:"mb-4 text-sm text-text-muted",children:["Showing ",E.filtered," of ",E.total," questions"]}),U&&y.jsx("div",{className:"space-y-2",children:T.map(F=>y.jsx(Pf,{question:F},F.id))}),!U&&N.map(F=>y.jsx(Jh,{category:F,icon:p[F].icon,questions:p[F].questions},F))]})}function Qh(){const{selectedQuestion:p,setSelectedQuestion:T,completedIds:E,toggleComplete:c}=Ja(),N=oe.useCallback(()=>{T(null)},[T]);if(oe.useEffect(()=>{const D=C=>{C.key==="Escape"&&N()};return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[N]),oe.useEffect(()=>(p?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[p]),!p)return null;const U=E.has(p.id),F={beginner:"bg-success/20 text-success",intermediate:"bg-warning/20 text-warning",advanced:"bg-error/20 text-error"},se={junior:"bg-success/20 text-success",mid:"bg-primary/20 text-primary",senior:"bg-purple-500/20 text-purple-400",staff:"bg-warning/20 text-warning"};return y.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:N,children:[y.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm"}),y.jsxs("div",{onClick:D=>D.stopPropagation(),className:"relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden",children:[y.jsx("div",{className:"flex-shrink-0 p-6 border-b border-border",children:y.jsxs("div",{className:"flex items-start gap-4",children:[y.jsxs("div",{className:"flex-1",children:[y.jsx("h2",{className:"text-lg font-semibold text-text-primary leading-relaxed mb-3",children:p.question}),y.jsxs("div",{className:"flex flex-wrap gap-2",children:[y.jsx("span",{className:Et("px-2 py-0.5 rounded text-xs font-medium",F[p.difficulty]),children:p.difficulty}),p.seniority&&y.jsx("span",{className:Et("px-2 py-0.5 rounded text-xs font-medium",se[p.seniority]),children:p.seniority}),y.jsxs("span",{className:"px-2 py-0.5 rounded text-xs font-medium bg-surface-elevated text-text-muted",children:[p.icon," ",p.category]})]})]}),y.jsx("button",{onClick:N,className:"p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors",children:y.jsx(Qo,{className:"w-5 h-5"})})]})}),y.jsx("div",{className:"flex-1 overflow-y-auto p-6",children:y.jsx("div",{className:"answer-content",dangerouslySetInnerHTML:{__html:p.answer}})}),y.jsxs("div",{className:"flex-shrink-0 p-4 border-t border-border bg-surface-elevated flex items-center justify-between",children:[y.jsx("button",{onClick:N,className:"px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors",children:"Close"}),y.jsx("button",{onClick:()=>c(p.id),className:Et("flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",U?"bg-success/20 text-success hover:bg-success/30":"bg-primary text-background hover:bg-primary-dark"),children:U?y.jsxs(y.Fragment,{children:[y.jsx(qf,{className:"w-4 h-4"}),"Completed"]}):y.jsxs(y.Fragment,{children:[y.jsx(Bh,{className:"w-4 h-4"}),"Mark as Complete"]})})]})]})]})}function Kh(){return y.jsx(Eh,{children:y.jsxs("div",{className:"min-h-screen bg-background flex flex-col",children:[y.jsx(Gh,{}),y.jsxs("div",{className:"flex-1 flex",children:[y.jsx(Fh,{}),y.jsx("main",{className:"flex-1 flex flex-col overflow-hidden",children:y.jsx(Yh,{})})]}),y.jsx(Qh,{})]})})}Ah.createRoot(document.getElementById("root")).render(y.jsx(oe.StrictMode,{children:y.jsx(Kh,{})}));

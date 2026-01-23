(function(){const C=document.createElement("link").relList;if(C&&C.supports&&C.supports("modulepreload"))return;for(const R of document.querySelectorAll('link[rel="modulepreload"]'))u(R);new MutationObserver(R=>{for(const E of R)if(E.type==="childList")for(const H of E.addedNodes)H.tagName==="LINK"&&H.rel==="modulepreload"&&u(H)}).observe(document,{childList:!0,subtree:!0});function N(R){const E={};return R.integrity&&(E.integrity=R.integrity),R.referrerPolicy&&(E.referrerPolicy=R.referrerPolicy),R.crossOrigin==="use-credentials"?E.credentials="include":R.crossOrigin==="anonymous"?E.credentials="omit":E.credentials="same-origin",E}function u(R){if(R.ep)return;R.ep=!0;const E=N(R);fetch(R.href,E)}})();var fl={exports:{}},kn={};var Tp;function Ah(){if(Tp)return kn;Tp=1;var f=Symbol.for("react.transitional.element"),C=Symbol.for("react.fragment");function N(u,R,E){var H=null;if(E!==void 0&&(H=""+E),R.key!==void 0&&(H=""+R.key),"key"in R){E={};for(var M in R)M!=="key"&&(E[M]=R[M])}else E=R;return R=E.ref,{$$typeof:f,type:u,key:H,ref:R!==void 0?R:null,props:E}}return kn.Fragment=C,kn.jsx=N,kn.jsxs=N,kn}var kp;function Ch(){return kp||(kp=1,fl.exports=Ah()),fl.exports}var l=Ch(),ml={exports:{}},J={};var Np;function Th(){if(Np)return J;Np=1;var f=Symbol.for("react.transitional.element"),C=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),E=Symbol.for("react.consumer"),H=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),K=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),L=Symbol.iterator;function D(d){return d===null||typeof d!="object"?null:(d=L&&d[L]||d["@@iterator"],typeof d=="function"?d:null)}var pe={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Q=Object.assign,ue={};function le(d,T,j){this.props=d,this.context=T,this.refs=ue,this.updater=j||pe}le.prototype.isReactComponent={},le.prototype.setState=function(d,T){if(typeof d!="object"&&typeof d!="function"&&d!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,d,T,"setState")},le.prototype.forceUpdate=function(d){this.updater.enqueueForceUpdate(this,d,"forceUpdate")};function _e(){}_e.prototype=le.prototype;function be(d,T,j){this.props=d,this.context=T,this.refs=ue,this.updater=j||pe}var oe=be.prototype=new _e;oe.constructor=be,Q(oe,le.prototype),oe.isPureReactComponent=!0;var we=Array.isArray;function Te(){}var Z={H:null,A:null,T:null,S:null},Ge=Object.prototype.hasOwnProperty;function ht(d,T,j){var P=j.ref;return{$$typeof:f,type:d,key:T,ref:P!==void 0?P:null,props:j}}function ea(d,T){return ht(d.type,T,d.props)}function Ke(d){return typeof d=="object"&&d!==null&&d.$$typeof===f}function Qe(d){var T={"=":"=0",":":"=2"};return"$"+d.replace(/[=:]/g,function(j){return T[j]})}var jt=/\/+/g;function kt(d,T){return typeof d=="object"&&d!==null&&d.key!=null?Qe(""+d.key):T.toString(36)}function nt(d){switch(d.status){case"fulfilled":return d.value;case"rejected":throw d.reason;default:switch(typeof d.status=="string"?d.then(Te,Te):(d.status="pending",d.then(function(T){d.status==="pending"&&(d.status="fulfilled",d.value=T)},function(T){d.status==="pending"&&(d.status="rejected",d.reason=T)})),d.status){case"fulfilled":return d.value;case"rejected":throw d.reason}}throw d}function x(d,T,j,P,Y){var $=typeof d;($==="undefined"||$==="boolean")&&(d=null);var de=!1;if(d===null)de=!0;else switch($){case"bigint":case"string":case"number":de=!0;break;case"object":switch(d.$$typeof){case f:case C:de=!0;break;case K:return de=d._init,x(de(d._payload),T,j,P,Y)}}if(de)return Y=Y(d),de=P===""?"."+kt(d,0):P,we(Y)?(j="",de!=null&&(j=de.replace(jt,"$&/")+"/"),x(Y,T,j,"",function(Ui){return Ui})):Y!=null&&(Ke(Y)&&(Y=ea(Y,j+(Y.key==null||d&&d.key===Y.key?"":(""+Y.key).replace(jt,"$&/")+"/")+de)),T.push(Y)),1;de=0;var Ye=P===""?".":P+":";if(we(d))for(var Ee=0;Ee<d.length;Ee++)P=d[Ee],$=Ye+kt(P,Ee),de+=x(P,T,j,$,Y);else if(Ee=D(d),typeof Ee=="function")for(d=Ee.call(d),Ee=0;!(P=d.next()).done;)P=P.value,$=Ye+kt(P,Ee++),de+=x(P,T,j,$,Y);else if($==="object"){if(typeof d.then=="function")return x(nt(d),T,j,P,Y);throw T=String(d),Error("Objects are not valid as a React child (found: "+(T==="[object Object]"?"object with keys {"+Object.keys(d).join(", ")+"}":T)+"). If you meant to render a collection of children, use an array instead.")}return de}function B(d,T,j){if(d==null)return d;var P=[],Y=0;return x(d,P,"","",function($){return T.call(j,$,Y++)}),P}function w(d){if(d._status===-1){var T=d._result;T=T(),T.then(function(j){(d._status===0||d._status===-1)&&(d._status=1,d._result=j)},function(j){(d._status===0||d._status===-1)&&(d._status=2,d._result=j)}),d._status===-1&&(d._status=0,d._result=T)}if(d._status===1)return d._result.default;throw d._result}var O=typeof reportError=="function"?reportError:function(d){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var T=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d),error:d});if(!window.dispatchEvent(T))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",d);return}console.error(d)},q={map:B,forEach:function(d,T,j){B(d,function(){T.apply(this,arguments)},j)},count:function(d){var T=0;return B(d,function(){T++}),T},toArray:function(d){return B(d,function(T){return T})||[]},only:function(d){if(!Ke(d))throw Error("React.Children.only expected to receive a single React element child.");return d}};return J.Activity=_,J.Children=q,J.Component=le,J.Fragment=N,J.Profiler=R,J.PureComponent=be,J.StrictMode=u,J.Suspense=U,J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Z,J.__COMPILER_RUNTIME={__proto__:null,c:function(d){return Z.H.useMemoCache(d)}},J.cache=function(d){return function(){return d.apply(null,arguments)}},J.cacheSignal=function(){return null},J.cloneElement=function(d,T,j){if(d==null)throw Error("The argument must be a React element, but you passed "+d+".");var P=Q({},d.props),Y=d.key;if(T!=null)for($ in T.key!==void 0&&(Y=""+T.key),T)!Ge.call(T,$)||$==="key"||$==="__self"||$==="__source"||$==="ref"&&T.ref===void 0||(P[$]=T[$]);var $=arguments.length-2;if($===1)P.children=j;else if(1<$){for(var de=Array($),Ye=0;Ye<$;Ye++)de[Ye]=arguments[Ye+2];P.children=de}return ht(d.type,Y,P)},J.createContext=function(d){return d={$$typeof:H,_currentValue:d,_currentValue2:d,_threadCount:0,Provider:null,Consumer:null},d.Provider=d,d.Consumer={$$typeof:E,_context:d},d},J.createElement=function(d,T,j){var P,Y={},$=null;if(T!=null)for(P in T.key!==void 0&&($=""+T.key),T)Ge.call(T,P)&&P!=="key"&&P!=="__self"&&P!=="__source"&&(Y[P]=T[P]);var de=arguments.length-2;if(de===1)Y.children=j;else if(1<de){for(var Ye=Array(de),Ee=0;Ee<de;Ee++)Ye[Ee]=arguments[Ee+2];Y.children=Ye}if(d&&d.defaultProps)for(P in de=d.defaultProps,de)Y[P]===void 0&&(Y[P]=de[P]);return ht(d,$,Y)},J.createRef=function(){return{current:null}},J.forwardRef=function(d){return{$$typeof:M,render:d}},J.isValidElement=Ke,J.lazy=function(d){return{$$typeof:K,_payload:{_status:-1,_result:d},_init:w}},J.memo=function(d,T){return{$$typeof:b,type:d,compare:T===void 0?null:T}},J.startTransition=function(d){var T=Z.T,j={};Z.T=j;try{var P=d(),Y=Z.S;Y!==null&&Y(j,P),typeof P=="object"&&P!==null&&typeof P.then=="function"&&P.then(Te,O)}catch($){O($)}finally{T!==null&&j.types!==null&&(T.types=j.types),Z.T=T}},J.unstable_useCacheRefresh=function(){return Z.H.useCacheRefresh()},J.use=function(d){return Z.H.use(d)},J.useActionState=function(d,T,j){return Z.H.useActionState(d,T,j)},J.useCallback=function(d,T){return Z.H.useCallback(d,T)},J.useContext=function(d){return Z.H.useContext(d)},J.useDebugValue=function(){},J.useDeferredValue=function(d,T){return Z.H.useDeferredValue(d,T)},J.useEffect=function(d,T){return Z.H.useEffect(d,T)},J.useEffectEvent=function(d){return Z.H.useEffectEvent(d)},J.useId=function(){return Z.H.useId()},J.useImperativeHandle=function(d,T,j){return Z.H.useImperativeHandle(d,T,j)},J.useInsertionEffect=function(d,T){return Z.H.useInsertionEffect(d,T)},J.useLayoutEffect=function(d,T){return Z.H.useLayoutEffect(d,T)},J.useMemo=function(d,T){return Z.H.useMemo(d,T)},J.useOptimistic=function(d,T){return Z.H.useOptimistic(d,T)},J.useReducer=function(d,T,j){return Z.H.useReducer(d,T,j)},J.useRef=function(d){return Z.H.useRef(d)},J.useState=function(d){return Z.H.useState(d)},J.useSyncExternalStore=function(d,T,j){return Z.H.useSyncExternalStore(d,T,j)},J.useTransition=function(){return Z.H.useTransition()},J.version="19.2.3",J}var Ep;function xl(){return Ep||(Ep=1,ml.exports=Th()),ml.exports}var I=xl(),hl={exports:{}},Nn={},gl={exports:{}},yl={};var Rp;function kh(){return Rp||(Rp=1,(function(f){function C(x,B){var w=x.length;x.push(B);e:for(;0<w;){var O=w-1>>>1,q=x[O];if(0<R(q,B))x[O]=B,x[w]=q,w=O;else break e}}function N(x){return x.length===0?null:x[0]}function u(x){if(x.length===0)return null;var B=x[0],w=x.pop();if(w!==B){x[0]=w;e:for(var O=0,q=x.length,d=q>>>1;O<d;){var T=2*(O+1)-1,j=x[T],P=T+1,Y=x[P];if(0>R(j,w))P<q&&0>R(Y,j)?(x[O]=Y,x[P]=w,O=P):(x[O]=j,x[T]=w,O=T);else if(P<q&&0>R(Y,w))x[O]=Y,x[P]=w,O=P;else break e}}return B}function R(x,B){var w=x.sortIndex-B.sortIndex;return w!==0?w:x.id-B.id}if(f.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var E=performance;f.unstable_now=function(){return E.now()}}else{var H=Date,M=H.now();f.unstable_now=function(){return H.now()-M}}var U=[],b=[],K=1,_=null,L=3,D=!1,pe=!1,Q=!1,ue=!1,le=typeof setTimeout=="function"?setTimeout:null,_e=typeof clearTimeout=="function"?clearTimeout:null,be=typeof setImmediate<"u"?setImmediate:null;function oe(x){for(var B=N(b);B!==null;){if(B.callback===null)u(b);else if(B.startTime<=x)u(b),B.sortIndex=B.expirationTime,C(U,B);else break;B=N(b)}}function we(x){if(Q=!1,oe(x),!pe)if(N(U)!==null)pe=!0,Te||(Te=!0,Qe());else{var B=N(b);B!==null&&nt(we,B.startTime-x)}}var Te=!1,Z=-1,Ge=5,ht=-1;function ea(){return ue?!0:!(f.unstable_now()-ht<Ge)}function Ke(){if(ue=!1,Te){var x=f.unstable_now();ht=x;var B=!0;try{e:{pe=!1,Q&&(Q=!1,_e(Z),Z=-1),D=!0;var w=L;try{t:{for(oe(x),_=N(U);_!==null&&!(_.expirationTime>x&&ea());){var O=_.callback;if(typeof O=="function"){_.callback=null,L=_.priorityLevel;var q=O(_.expirationTime<=x);if(x=f.unstable_now(),typeof q=="function"){_.callback=q,oe(x),B=!0;break t}_===N(U)&&u(U),oe(x)}else u(U);_=N(U)}if(_!==null)B=!0;else{var d=N(b);d!==null&&nt(we,d.startTime-x),B=!1}}break e}finally{_=null,L=w,D=!1}B=void 0}}finally{B?Qe():Te=!1}}}var Qe;if(typeof be=="function")Qe=function(){be(Ke)};else if(typeof MessageChannel<"u"){var jt=new MessageChannel,kt=jt.port2;jt.port1.onmessage=Ke,Qe=function(){kt.postMessage(null)}}else Qe=function(){le(Ke,0)};function nt(x,B){Z=le(function(){x(f.unstable_now())},B)}f.unstable_IdlePriority=5,f.unstable_ImmediatePriority=1,f.unstable_LowPriority=4,f.unstable_NormalPriority=3,f.unstable_Profiling=null,f.unstable_UserBlockingPriority=2,f.unstable_cancelCallback=function(x){x.callback=null},f.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ge=0<x?Math.floor(1e3/x):5},f.unstable_getCurrentPriorityLevel=function(){return L},f.unstable_next=function(x){switch(L){case 1:case 2:case 3:var B=3;break;default:B=L}var w=L;L=B;try{return x()}finally{L=w}},f.unstable_requestPaint=function(){ue=!0},f.unstable_runWithPriority=function(x,B){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var w=L;L=x;try{return B()}finally{L=w}},f.unstable_scheduleCallback=function(x,B,w){var O=f.unstable_now();switch(typeof w=="object"&&w!==null?(w=w.delay,w=typeof w=="number"&&0<w?O+w:O):w=O,x){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=w+q,x={id:K++,callback:B,priorityLevel:x,startTime:w,expirationTime:q,sortIndex:-1},w>O?(x.sortIndex=w,C(b,x),N(U)===null&&x===N(b)&&(Q?(_e(Z),Z=-1):Q=!0,nt(we,w-O))):(x.sortIndex=q,C(U,x),pe||D||(pe=!0,Te||(Te=!0,Qe()))),x},f.unstable_shouldYield=ea,f.unstable_wrapCallback=function(x){var B=L;return function(){var w=L;L=B;try{return x.apply(this,arguments)}finally{L=w}}}})(yl)),yl}var Mp;function Nh(){return Mp||(Mp=1,gl.exports=kh()),gl.exports}var vl={exports:{}},Je={};var Dp;function Eh(){if(Dp)return Je;Dp=1;var f=xl();function C(U){var b="https://react.dev/errors/"+U;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var K=2;K<arguments.length;K++)b+="&args[]="+encodeURIComponent(arguments[K])}return"Minified React error #"+U+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function N(){}var u={d:{f:N,r:function(){throw Error(C(522))},D:N,C:N,L:N,m:N,X:N,S:N,M:N},p:0,findDOMNode:null},R=Symbol.for("react.portal");function E(U,b,K){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:R,key:_==null?null:""+_,children:U,containerInfo:b,implementation:K}}var H=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function M(U,b){if(U==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return Je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,Je.createPortal=function(U,b){var K=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(C(299));return E(U,b,null,K)},Je.flushSync=function(U){var b=H.T,K=u.p;try{if(H.T=null,u.p=2,U)return U()}finally{H.T=b,u.p=K,u.d.f()}},Je.preconnect=function(U,b){typeof U=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,u.d.C(U,b))},Je.prefetchDNS=function(U){typeof U=="string"&&u.d.D(U)},Je.preinit=function(U,b){if(typeof U=="string"&&b&&typeof b.as=="string"){var K=b.as,_=M(K,b.crossOrigin),L=typeof b.integrity=="string"?b.integrity:void 0,D=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;K==="style"?u.d.S(U,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:_,integrity:L,fetchPriority:D}):K==="script"&&u.d.X(U,{crossOrigin:_,integrity:L,fetchPriority:D,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},Je.preinitModule=function(U,b){if(typeof U=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var K=M(b.as,b.crossOrigin);u.d.M(U,{crossOrigin:K,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&u.d.M(U)},Je.preload=function(U,b){if(typeof U=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var K=b.as,_=M(K,b.crossOrigin);u.d.L(U,K,{crossOrigin:_,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},Je.preloadModule=function(U,b){if(typeof U=="string")if(b){var K=M(b.as,b.crossOrigin);u.d.m(U,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:K,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else u.d.m(U)},Je.requestFormReset=function(U){u.d.r(U)},Je.unstable_batchedUpdates=function(U,b){return U(b)},Je.useFormState=function(U,b,K){return H.H.useFormState(U,b,K)},Je.useFormStatus=function(){return H.H.useHostTransitionStatus()},Je.version="19.2.3",Je}var Up;function Rh(){if(Up)return vl.exports;Up=1;function f(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f)}catch(C){console.error(C)}}return f(),vl.exports=Eh(),vl.exports}var Op;function Mh(){if(Op)return Nn;Op=1;var f=Nh(),C=xl(),N=Rh();function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function R(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function E(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function H(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function M(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function U(e){if(E(e)!==e)throw Error(u(188))}function b(e){var t=e.alternate;if(!t){if(t=E(e),t===null)throw Error(u(188));return t!==e?null:e}for(var a=e,i=t;;){var n=a.return;if(n===null)break;var o=n.alternate;if(o===null){if(i=n.return,i!==null){a=i;continue}break}if(n.child===o.child){for(o=n.child;o;){if(o===a)return U(n),e;if(o===i)return U(n),t;o=o.sibling}throw Error(u(188))}if(a.return!==i.return)a=n,i=o;else{for(var r=!1,s=n.child;s;){if(s===a){r=!0,a=n,i=o;break}if(s===i){r=!0,i=n,a=o;break}s=s.sibling}if(!r){for(s=o.child;s;){if(s===a){r=!0,a=o,i=n;break}if(s===i){r=!0,i=o,a=n;break}s=s.sibling}if(!r)throw Error(u(189))}}if(a.alternate!==i)throw Error(u(190))}if(a.tag!==3)throw Error(u(188));return a.stateNode.current===a?e:t}function K(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=K(e),t!==null)return t;e=e.sibling}return null}var _=Object.assign,L=Symbol.for("react.element"),D=Symbol.for("react.transitional.element"),pe=Symbol.for("react.portal"),Q=Symbol.for("react.fragment"),ue=Symbol.for("react.strict_mode"),le=Symbol.for("react.profiler"),_e=Symbol.for("react.consumer"),be=Symbol.for("react.context"),oe=Symbol.for("react.forward_ref"),we=Symbol.for("react.suspense"),Te=Symbol.for("react.suspense_list"),Z=Symbol.for("react.memo"),Ge=Symbol.for("react.lazy"),ht=Symbol.for("react.activity"),ea=Symbol.for("react.memo_cache_sentinel"),Ke=Symbol.iterator;function Qe(e){return e===null||typeof e!="object"?null:(e=Ke&&e[Ke]||e["@@iterator"],typeof e=="function"?e:null)}var jt=Symbol.for("react.client.reference");function kt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===jt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Q:return"Fragment";case le:return"Profiler";case ue:return"StrictMode";case we:return"Suspense";case Te:return"SuspenseList";case ht:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case pe:return"Portal";case be:return e.displayName||"Context";case _e:return(e._context.displayName||"Context")+".Consumer";case oe:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Z:return t=e.displayName||null,t!==null?t:kt(e.type)||"Memo";case Ge:t=e._payload,e=e._init;try{return kt(e(t))}catch{}}return null}var nt=Array.isArray,x=C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=N.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,w={pending:!1,data:null,method:null,action:null},O=[],q=-1;function d(e){return{current:e}}function T(e){0>q||(e.current=O[q],O[q]=null,q--)}function j(e,t){q++,O[q]=e.current,e.current=t}var P=d(null),Y=d(null),$=d(null),de=d(null);function Ye(e,t){switch(j($,t),j(Y,e),j(P,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Jd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Jd(t),e=Yd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}T(P),j(P,e)}function Ee(){T(P),T(Y),T($)}function Ui(e){e.memoizedState!==null&&j(de,e);var t=P.current,a=Yd(t,e.type);t!==a&&(j(Y,e),j(P,a))}function Mn(e){Y.current===e&&(T(P),T(Y)),de.current===e&&(T(de),wn._currentValue=w)}var Yo,Cl;function Ra(e){if(Yo===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Yo=t&&t[1]||"",Cl=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yo+e+Cl}var Wo=!1;function Xo(e,t){if(!e||Wo)return"";Wo=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var k=function(){throw Error()};if(Object.defineProperty(k.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(k,[])}catch(v){var y=v}Reflect.construct(e,[],k)}else{try{k.call()}catch(v){y=v}e.call(k.prototype)}}else{try{throw Error()}catch(v){y=v}(k=e())&&typeof k.catch=="function"&&k.catch(function(){})}}catch(v){if(v&&y&&typeof v.stack=="string")return[v.stack,y.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=i.DetermineComponentFrameRoot(),r=o[0],s=o[1];if(r&&s){var c=r.split(`
`),g=s.split(`
`);for(n=i=0;i<c.length&&!c[i].includes("DetermineComponentFrameRoot");)i++;for(;n<g.length&&!g[n].includes("DetermineComponentFrameRoot");)n++;if(i===c.length||n===g.length)for(i=c.length-1,n=g.length-1;1<=i&&0<=n&&c[i]!==g[n];)n--;for(;1<=i&&0<=n;i--,n--)if(c[i]!==g[n]){if(i!==1||n!==1)do if(i--,n--,0>n||c[i]!==g[n]){var S=`
`+c[i].replace(" at new "," at ");return e.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",e.displayName)),S}while(1<=i&&0<=n);break}}}finally{Wo=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Ra(a):""}function $p(e,t){switch(e.tag){case 26:case 27:case 5:return Ra(e.type);case 16:return Ra("Lazy");case 13:return e.child!==t&&t!==null?Ra("Suspense Fallback"):Ra("Suspense");case 19:return Ra("SuspenseList");case 0:case 15:return Xo(e.type,!1);case 11:return Xo(e.type.render,!1);case 1:return Xo(e.type,!0);case 31:return Ra("Activity");default:return""}}function Tl(e){try{var t="",a=null;do t+=$p(e,a),a=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Zo=Object.prototype.hasOwnProperty,$o=f.unstable_scheduleCallback,er=f.unstable_cancelCallback,ef=f.unstable_shouldYield,tf=f.unstable_requestPaint,ot=f.unstable_now,af=f.unstable_getCurrentPriorityLevel,kl=f.unstable_ImmediatePriority,Nl=f.unstable_UserBlockingPriority,Dn=f.unstable_NormalPriority,nf=f.unstable_LowPriority,El=f.unstable_IdlePriority,of=f.log,rf=f.unstable_setDisableYieldValue,Oi=null,rt=null;function ta(e){if(typeof of=="function"&&rf(e),rt&&typeof rt.setStrictMode=="function")try{rt.setStrictMode(Oi,e)}catch{}}var st=Math.clz32?Math.clz32:cf,sf=Math.log,lf=Math.LN2;function cf(e){return e>>>=0,e===0?32:31-(sf(e)/lf|0)|0}var Un=256,On=262144,Bn=4194304;function Ma(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function jn(e,t,a){var i=e.pendingLanes;if(i===0)return 0;var n=0,o=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var s=i&134217727;return s!==0?(i=s&~o,i!==0?n=Ma(i):(r&=s,r!==0?n=Ma(r):a||(a=s&~e,a!==0&&(n=Ma(a))))):(s=i&~o,s!==0?n=Ma(s):r!==0?n=Ma(r):a||(a=i&~e,a!==0&&(n=Ma(a)))),n===0?0:t!==0&&t!==n&&(t&o)===0&&(o=n&-n,a=t&-t,o>=a||o===32&&(a&4194048)!==0)?t:n}function Bi(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function uf(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rl(){var e=Bn;return Bn<<=1,(Bn&62914560)===0&&(Bn=4194304),e}function tr(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function ji(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function df(e,t,a,i,n,o){var r=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,g=e.hiddenUpdates;for(a=r&~a;0<a;){var S=31-st(a),k=1<<S;s[S]=0,c[S]=-1;var y=g[S];if(y!==null)for(g[S]=null,S=0;S<y.length;S++){var v=y[S];v!==null&&(v.lane&=-536870913)}a&=~k}i!==0&&Ml(e,i,0),o!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=o&~(r&~t))}function Ml(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-st(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|a&261930}function Dl(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var i=31-st(a),n=1<<i;n&t|e[i]&t&&(e[i]|=t),a&=~n}}function Ul(e,t){var a=t&-t;return a=(a&42)!==0?1:ar(a),(a&(e.suspendedLanes|t))!==0?0:a}function ar(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ir(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ol(){var e=B.p;return e!==0?e:(e=window.event,e===void 0?32:vp(e.type))}function Bl(e,t){var a=B.p;try{return B.p=e,t()}finally{B.p=a}}var aa=Math.random().toString(36).slice(2),ze="__reactFiber$"+aa,Xe="__reactProps$"+aa,Ja="__reactContainer$"+aa,nr="__reactEvents$"+aa,pf="__reactListeners$"+aa,ff="__reactHandles$"+aa,jl="__reactResources$"+aa,Li="__reactMarker$"+aa;function or(e){delete e[ze],delete e[Xe],delete e[nr],delete e[pf],delete e[ff]}function Ya(e){var t=e[ze];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ja]||a[ze]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=ap(e);e!==null;){if(a=e[ze])return a;e=ap(e)}return t}e=a,a=e.parentNode}return null}function Wa(e){if(e=e[ze]||e[Ja]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ii(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(u(33))}function Xa(e){var t=e[jl];return t||(t=e[jl]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Le(e){e[Li]=!0}var Ll=new Set,Il={};function Da(e,t){Za(e,t),Za(e+"Capture",t)}function Za(e,t){for(Il[e]=t,e=0;e<t.length;e++)Ll.add(t[e])}var mf=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_l={},zl={};function hf(e){return Zo.call(zl,e)?!0:Zo.call(_l,e)?!1:mf.test(e)?zl[e]=!0:(_l[e]=!0,!1)}function Ln(e,t,a){if(hf(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function In(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Lt(e,t,a,i){if(i===null)e.removeAttribute(a);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+i)}}function gt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Hl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function gf(e,t,a){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var n=i.get,o=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(r){a=""+r,o.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return a},setValue:function(r){a=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function rr(e){if(!e._valueTracker){var t=Hl(e)?"checked":"value";e._valueTracker=gf(e,t,""+e[t])}}function Pl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),i="";return e&&(i=Hl(e)?e.checked?"true":"false":e.value),e=i,e!==a?(t.setValue(e),!0):!1}function _n(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var yf=/[\n"\\]/g;function yt(e){return e.replace(yf,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function sr(e,t,a,i,n,o,r,s){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+gt(t)):e.value!==""+gt(t)&&(e.value=""+gt(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?lr(e,r,gt(t)):a!=null?lr(e,r,gt(a)):i!=null&&e.removeAttribute("value"),n==null&&o!=null&&(e.defaultChecked=!!o),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.name=""+gt(s):e.removeAttribute("name")}function Fl(e,t,a,i,n,o,r,s){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.type=o),t!=null||a!=null){if(!(o!=="submit"&&o!=="reset"||t!=null)){rr(e);return}a=a!=null?""+gt(a):"",t=t!=null?""+gt(t):a,s||t===e.value||(e.value=t),e.defaultValue=t}i=i??n,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=s?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),rr(e)}function lr(e,t,a){t==="number"&&_n(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function $a(e,t,a,i){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&i&&(e[a].defaultSelected=!0)}else{for(a=""+gt(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,i&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function ql(e,t,a){if(t!=null&&(t=""+gt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+gt(a):""}function Vl(e,t,a,i){if(t==null){if(i!=null){if(a!=null)throw Error(u(92));if(nt(i)){if(1<i.length)throw Error(u(93));i=i[0]}a=i}a==null&&(a=""),t=a}a=gt(t),e.defaultValue=a,i=e.textContent,i===a&&i!==""&&i!==null&&(e.value=i),rr(e)}function ei(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var vf=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Gl(e,t,a){var i=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,a):typeof a!="number"||a===0||vf.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Kl(e,t,a){if(t!=null&&typeof t!="object")throw Error(u(62));if(e=e.style,a!=null){for(var i in a)!a.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var n in t)i=t[n],t.hasOwnProperty(n)&&a[n]!==i&&Gl(e,n,i)}else for(var o in t)t.hasOwnProperty(o)&&Gl(e,o,t[o])}function cr(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bf=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Sf=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function zn(e){return Sf.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function It(){}var ur=null;function dr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ti=null,ai=null;function Ql(e){var t=Wa(e);if(t&&(e=t.stateNode)){var a=e[Xe]||null;e:switch(e=t.stateNode,t.type){case"input":if(sr(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+yt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var i=a[t];if(i!==e&&i.form===e.form){var n=i[Xe]||null;if(!n)throw Error(u(90));sr(i,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)i=a[t],i.form===e.form&&Pl(i)}break e;case"textarea":ql(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&$a(e,!!a.multiple,t,!1)}}}var pr=!1;function Jl(e,t,a){if(pr)return e(t,a);pr=!0;try{var i=e(t);return i}finally{if(pr=!1,(ti!==null||ai!==null)&&(No(),ti&&(t=ti,e=ai,ai=ti=null,Ql(t),e)))for(t=0;t<e.length;t++)Ql(e[t])}}function _i(e,t){var a=e.stateNode;if(a===null)return null;var i=a[Xe]||null;if(i===null)return null;a=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(u(231,t,typeof a));return a}var _t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fr=!1;if(_t)try{var zi={};Object.defineProperty(zi,"passive",{get:function(){fr=!0}}),window.addEventListener("test",zi,zi),window.removeEventListener("test",zi,zi)}catch{fr=!1}var ia=null,mr=null,Hn=null;function Yl(){if(Hn)return Hn;var e,t=mr,a=t.length,i,n="value"in ia?ia.value:ia.textContent,o=n.length;for(e=0;e<a&&t[e]===n[e];e++);var r=a-e;for(i=1;i<=r&&t[a-i]===n[o-i];i++);return Hn=n.slice(e,1<i?1-i:void 0)}function Pn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fn(){return!0}function Wl(){return!1}function Ze(e){function t(a,i,n,o,r){this._reactName=a,this._targetInst=n,this.type=i,this.nativeEvent=o,this.target=r,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(a=e[s],this[s]=a?a(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Fn:Wl,this.isPropagationStopped=Wl,this}return _(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Fn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Fn)},persist:function(){},isPersistent:Fn}),t}var Ua={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qn=Ze(Ua),Hi=_({},Ua,{view:0,detail:0}),xf=Ze(Hi),hr,gr,Pi,Vn=_({},Hi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Pi&&(Pi&&e.type==="mousemove"?(hr=e.screenX-Pi.screenX,gr=e.screenY-Pi.screenY):gr=hr=0,Pi=e),hr)},movementY:function(e){return"movementY"in e?e.movementY:gr}}),Xl=Ze(Vn),wf=_({},Vn,{dataTransfer:0}),Af=Ze(wf),Cf=_({},Hi,{relatedTarget:0}),yr=Ze(Cf),Tf=_({},Ua,{animationName:0,elapsedTime:0,pseudoElement:0}),kf=Ze(Tf),Nf=_({},Ua,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ef=Ze(Nf),Rf=_({},Ua,{data:0}),Zl=Ze(Rf),Mf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Df={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Uf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Of(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Uf[e])?!!t[e]:!1}function vr(){return Of}var Bf=_({},Hi,{key:function(e){if(e.key){var t=Mf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Pn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Df[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vr,charCode:function(e){return e.type==="keypress"?Pn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jf=Ze(Bf),Lf=_({},Vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$l=Ze(Lf),If=_({},Hi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vr}),_f=Ze(If),zf=_({},Ua,{propertyName:0,elapsedTime:0,pseudoElement:0}),Hf=Ze(zf),Pf=_({},Vn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ff=Ze(Pf),qf=_({},Ua,{newState:0,oldState:0}),Vf=Ze(qf),Gf=[9,13,27,32],br=_t&&"CompositionEvent"in window,Fi=null;_t&&"documentMode"in document&&(Fi=document.documentMode);var Kf=_t&&"TextEvent"in window&&!Fi,ec=_t&&(!br||Fi&&8<Fi&&11>=Fi),tc=" ",ac=!1;function ic(e,t){switch(e){case"keyup":return Gf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function nc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ii=!1;function Qf(e,t){switch(e){case"compositionend":return nc(t);case"keypress":return t.which!==32?null:(ac=!0,tc);case"textInput":return e=t.data,e===tc&&ac?null:e;default:return null}}function Jf(e,t){if(ii)return e==="compositionend"||!br&&ic(e,t)?(e=Yl(),Hn=mr=ia=null,ii=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ec&&t.locale!=="ko"?null:t.data;default:return null}}var Yf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function oc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Yf[e.type]:t==="textarea"}function rc(e,t,a,i){ti?ai?ai.push(i):ai=[i]:ti=i,t=Bo(t,"onChange"),0<t.length&&(a=new qn("onChange","change",null,a,i),e.push({event:a,listeners:t}))}var qi=null,Vi=null;function Wf(e){Fd(e,0)}function Gn(e){var t=Ii(e);if(Pl(t))return e}function sc(e,t){if(e==="change")return t}var lc=!1;if(_t){var Sr;if(_t){var xr="oninput"in document;if(!xr){var cc=document.createElement("div");cc.setAttribute("oninput","return;"),xr=typeof cc.oninput=="function"}Sr=xr}else Sr=!1;lc=Sr&&(!document.documentMode||9<document.documentMode)}function uc(){qi&&(qi.detachEvent("onpropertychange",dc),Vi=qi=null)}function dc(e){if(e.propertyName==="value"&&Gn(Vi)){var t=[];rc(t,Vi,e,dr(e)),Jl(Wf,t)}}function Xf(e,t,a){e==="focusin"?(uc(),qi=t,Vi=a,qi.attachEvent("onpropertychange",dc)):e==="focusout"&&uc()}function Zf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gn(Vi)}function $f(e,t){if(e==="click")return Gn(t)}function em(e,t){if(e==="input"||e==="change")return Gn(t)}function tm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var lt=typeof Object.is=="function"?Object.is:tm;function Gi(e,t){if(lt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(i=0;i<a.length;i++){var n=a[i];if(!Zo.call(t,n)||!lt(e[n],t[n]))return!1}return!0}function pc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function fc(e,t){var a=pc(e);e=0;for(var i;a;){if(a.nodeType===3){if(i=e+a.textContent.length,e<=t&&i>=t)return{node:a,offset:t-e};e=i}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=pc(a)}}function mc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?mc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function hc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=_n(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=_n(e.document)}return t}function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var am=_t&&"documentMode"in document&&11>=document.documentMode,ni=null,Ar=null,Ki=null,Cr=!1;function gc(e,t,a){var i=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Cr||ni==null||ni!==_n(i)||(i=ni,"selectionStart"in i&&wr(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ki&&Gi(Ki,i)||(Ki=i,i=Bo(Ar,"onSelect"),0<i.length&&(t=new qn("onSelect","select",null,t,a),e.push({event:t,listeners:i}),t.target=ni)))}function Oa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var oi={animationend:Oa("Animation","AnimationEnd"),animationiteration:Oa("Animation","AnimationIteration"),animationstart:Oa("Animation","AnimationStart"),transitionrun:Oa("Transition","TransitionRun"),transitionstart:Oa("Transition","TransitionStart"),transitioncancel:Oa("Transition","TransitionCancel"),transitionend:Oa("Transition","TransitionEnd")},Tr={},yc={};_t&&(yc=document.createElement("div").style,"AnimationEvent"in window||(delete oi.animationend.animation,delete oi.animationiteration.animation,delete oi.animationstart.animation),"TransitionEvent"in window||delete oi.transitionend.transition);function Ba(e){if(Tr[e])return Tr[e];if(!oi[e])return e;var t=oi[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in yc)return Tr[e]=t[a];return e}var vc=Ba("animationend"),bc=Ba("animationiteration"),Sc=Ba("animationstart"),im=Ba("transitionrun"),nm=Ba("transitionstart"),om=Ba("transitioncancel"),xc=Ba("transitionend"),wc=new Map,kr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");kr.push("scrollEnd");function Nt(e,t){wc.set(e,t),Da(t,[e])}var Kn=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},vt=[],ri=0,Nr=0;function Qn(){for(var e=ri,t=Nr=ri=0;t<e;){var a=vt[t];vt[t++]=null;var i=vt[t];vt[t++]=null;var n=vt[t];vt[t++]=null;var o=vt[t];if(vt[t++]=null,i!==null&&n!==null){var r=i.pending;r===null?n.next=n:(n.next=r.next,r.next=n),i.pending=n}o!==0&&Ac(a,n,o)}}function Jn(e,t,a,i){vt[ri++]=e,vt[ri++]=t,vt[ri++]=a,vt[ri++]=i,Nr|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Er(e,t,a,i){return Jn(e,t,a,i),Yn(e)}function ja(e,t){return Jn(e,null,null,t),Yn(e)}function Ac(e,t,a){e.lanes|=a;var i=e.alternate;i!==null&&(i.lanes|=a);for(var n=!1,o=e.return;o!==null;)o.childLanes|=a,i=o.alternate,i!==null&&(i.childLanes|=a),o.tag===22&&(e=o.stateNode,e===null||e._visibility&1||(n=!0)),e=o,o=o.return;return e.tag===3?(o=e.stateNode,n&&t!==null&&(n=31-st(a),e=o.hiddenUpdates,i=e[n],i===null?e[n]=[t]:i.push(t),t.lane=a|536870912),o):null}function Yn(e){if(50<hn)throw hn=0,Is=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var si={};function rm(e,t,a,i){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ct(e,t,a,i){return new rm(e,t,a,i)}function Rr(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zt(e,t){var a=e.alternate;return a===null?(a=ct(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Cc(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Wn(e,t,a,i,n,o){var r=0;if(i=e,typeof e=="function")Rr(e)&&(r=1);else if(typeof e=="string")r=dh(e,a,P.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case ht:return e=ct(31,a,t,n),e.elementType=ht,e.lanes=o,e;case Q:return La(a.children,n,o,t);case ue:r=8,n|=24;break;case le:return e=ct(12,a,t,n|2),e.elementType=le,e.lanes=o,e;case we:return e=ct(13,a,t,n),e.elementType=we,e.lanes=o,e;case Te:return e=ct(19,a,t,n),e.elementType=Te,e.lanes=o,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case be:r=10;break e;case _e:r=9;break e;case oe:r=11;break e;case Z:r=14;break e;case Ge:r=16,i=null;break e}r=29,a=Error(u(130,e===null?"null":typeof e,"")),i=null}return t=ct(r,a,t,n),t.elementType=e,t.type=i,t.lanes=o,t}function La(e,t,a,i){return e=ct(7,e,i,t),e.lanes=a,e}function Mr(e,t,a){return e=ct(6,e,null,t),e.lanes=a,e}function Tc(e){var t=ct(18,null,null,0);return t.stateNode=e,t}function Dr(e,t,a){return t=ct(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var kc=new WeakMap;function bt(e,t){if(typeof e=="object"&&e!==null){var a=kc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Tl(t)},kc.set(e,t),t)}return{value:e,source:t,stack:Tl(t)}}var li=[],ci=0,Xn=null,Qi=0,St=[],xt=0,na=null,Dt=1,Ut="";function Ht(e,t){li[ci++]=Qi,li[ci++]=Xn,Xn=e,Qi=t}function Nc(e,t,a){St[xt++]=Dt,St[xt++]=Ut,St[xt++]=na,na=e;var i=Dt;e=Ut;var n=32-st(i)-1;i&=~(1<<n),a+=1;var o=32-st(t)+n;if(30<o){var r=n-n%5;o=(i&(1<<r)-1).toString(32),i>>=r,n-=r,Dt=1<<32-st(t)+n|a<<n|i,Ut=o+e}else Dt=1<<o|a<<n|i,Ut=e}function Ur(e){e.return!==null&&(Ht(e,1),Nc(e,1,0))}function Or(e){for(;e===Xn;)Xn=li[--ci],li[ci]=null,Qi=li[--ci],li[ci]=null;for(;e===na;)na=St[--xt],St[xt]=null,Ut=St[--xt],St[xt]=null,Dt=St[--xt],St[xt]=null}function Ec(e,t){St[xt++]=Dt,St[xt++]=Ut,St[xt++]=na,Dt=t.id,Ut=t.overflow,na=e}var He=null,Se=null,ne=!1,oa=null,wt=!1,Br=Error(u(519));function ra(e){var t=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ji(bt(t,e)),Br}function Rc(e){var t=e.stateNode,a=e.type,i=e.memoizedProps;switch(t[ze]=e,t[Xe]=i,a){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(a=0;a<yn.length;a++)te(yn[a],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),Fl(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),Vl(t,i.value,i.defaultValue,i.children)}a=i.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||i.suppressHydrationWarning===!0||Kd(t.textContent,a)?(i.popover!=null&&(te("beforetoggle",t),te("toggle",t)),i.onScroll!=null&&te("scroll",t),i.onScrollEnd!=null&&te("scrollend",t),i.onClick!=null&&(t.onclick=It),t=!0):t=!1,t||ra(e,!0)}function Mc(e){for(He=e.return;He;)switch(He.tag){case 5:case 31:case 13:wt=!1;return;case 27:case 3:wt=!0;return;default:He=He.return}}function ui(e){if(e!==He)return!1;if(!ne)return Mc(e),ne=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Zs(e.type,e.memoizedProps)),a=!a),a&&Se&&ra(e),Mc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Se=tp(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Se=tp(e)}else t===27?(t=Se,Sa(e.type)?(e=il,il=null,Se=e):Se=t):Se=He?Ct(e.stateNode.nextSibling):null;return!0}function Ia(){Se=He=null,ne=!1}function jr(){var e=oa;return e!==null&&(at===null?at=e:at.push.apply(at,e),oa=null),e}function Ji(e){oa===null?oa=[e]:oa.push(e)}var Lr=d(null),_a=null,Pt=null;function sa(e,t,a){j(Lr,t._currentValue),t._currentValue=a}function Ft(e){e._currentValue=Lr.current,T(Lr)}function Ir(e,t,a){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===a)break;e=e.return}}function _r(e,t,a,i){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var o=n.dependencies;if(o!==null){var r=n.child;o=o.firstContext;e:for(;o!==null;){var s=o;o=n;for(var c=0;c<t.length;c++)if(s.context===t[c]){o.lanes|=a,s=o.alternate,s!==null&&(s.lanes|=a),Ir(o.return,a,e),i||(r=null);break e}o=s.next}}else if(n.tag===18){if(r=n.return,r===null)throw Error(u(341));r.lanes|=a,o=r.alternate,o!==null&&(o.lanes|=a),Ir(r,a,e),r=null}else r=n.child;if(r!==null)r.return=n;else for(r=n;r!==null;){if(r===e){r=null;break}if(n=r.sibling,n!==null){n.return=r.return,r=n;break}r=r.return}n=r}}function di(e,t,a,i){e=null;for(var n=t,o=!1;n!==null;){if(!o){if((n.flags&524288)!==0)o=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var r=n.alternate;if(r===null)throw Error(u(387));if(r=r.memoizedProps,r!==null){var s=n.type;lt(n.pendingProps.value,r.value)||(e!==null?e.push(s):e=[s])}}else if(n===de.current){if(r=n.alternate,r===null)throw Error(u(387));r.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(wn):e=[wn])}n=n.return}e!==null&&_r(t,e,a,i),t.flags|=262144}function Zn(e){for(e=e.firstContext;e!==null;){if(!lt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function za(e){_a=e,Pt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pe(e){return Dc(_a,e)}function $n(e,t){return _a===null&&za(e),Dc(e,t)}function Dc(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Pt===null){if(e===null)throw Error(u(308));Pt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Pt=Pt.next=t;return a}var sm=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},lm=f.unstable_scheduleCallback,cm=f.unstable_NormalPriority,De={$$typeof:be,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function zr(){return{controller:new sm,data:new Map,refCount:0}}function Yi(e){e.refCount--,e.refCount===0&&lm(cm,function(){e.controller.abort()})}var Wi=null,Hr=0,pi=0,fi=null;function um(e,t){if(Wi===null){var a=Wi=[];Hr=0,pi=qs(),fi={status:"pending",value:void 0,then:function(i){a.push(i)}}}return Hr++,t.then(Uc,Uc),t}function Uc(){if(--Hr===0&&Wi!==null){fi!==null&&(fi.status="fulfilled");var e=Wi;Wi=null,pi=0,fi=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function dm(e,t){var a=[],i={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(i.status="rejected",i.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),i}var Oc=x.S;x.S=function(e,t){gd=ot(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&um(e,t),Oc!==null&&Oc(e,t)};var Ha=d(null);function Pr(){var e=Ha.current;return e!==null?e:ve.pooledCache}function eo(e,t){t===null?j(Ha,Ha.current):j(Ha,t.pool)}function Bc(){var e=Pr();return e===null?null:{parent:De._currentValue,pool:e}}var mi=Error(u(460)),Fr=Error(u(474)),to=Error(u(542)),ao={then:function(){}};function jc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Lc(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(It,It),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_c(e),e;default:if(typeof t.status=="string")t.then(It,It);else{if(e=ve,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=i}},function(i){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_c(e),e}throw Fa=t,mi}}function Pa(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Fa=a,mi):a}}var Fa=null;function Ic(){if(Fa===null)throw Error(u(459));var e=Fa;return Fa=null,e}function _c(e){if(e===mi||e===to)throw Error(u(483))}var hi=null,Xi=0;function io(e){var t=Xi;return Xi+=1,hi===null&&(hi=[]),Lc(hi,e,t)}function Zi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function no(e,t){throw t.$$typeof===L?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function zc(e){function t(m,p){if(e){var h=m.deletions;h===null?(m.deletions=[p],m.flags|=16):h.push(p)}}function a(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function i(m){for(var p=new Map;m!==null;)m.key!==null?p.set(m.key,m):p.set(m.index,m),m=m.sibling;return p}function n(m,p){return m=zt(m,p),m.index=0,m.sibling=null,m}function o(m,p,h){return m.index=h,e?(h=m.alternate,h!==null?(h=h.index,h<p?(m.flags|=67108866,p):h):(m.flags|=67108866,p)):(m.flags|=1048576,p)}function r(m){return e&&m.alternate===null&&(m.flags|=67108866),m}function s(m,p,h,A){return p===null||p.tag!==6?(p=Mr(h,m.mode,A),p.return=m,p):(p=n(p,h),p.return=m,p)}function c(m,p,h,A){var V=h.type;return V===Q?S(m,p,h.props.children,A,h.key):p!==null&&(p.elementType===V||typeof V=="object"&&V!==null&&V.$$typeof===Ge&&Pa(V)===p.type)?(p=n(p,h.props),Zi(p,h),p.return=m,p):(p=Wn(h.type,h.key,h.props,null,m.mode,A),Zi(p,h),p.return=m,p)}function g(m,p,h,A){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=Dr(h,m.mode,A),p.return=m,p):(p=n(p,h.children||[]),p.return=m,p)}function S(m,p,h,A,V){return p===null||p.tag!==7?(p=La(h,m.mode,A,V),p.return=m,p):(p=n(p,h),p.return=m,p)}function k(m,p,h){if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return p=Mr(""+p,m.mode,h),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case D:return h=Wn(p.type,p.key,p.props,null,m.mode,h),Zi(h,p),h.return=m,h;case pe:return p=Dr(p,m.mode,h),p.return=m,p;case Ge:return p=Pa(p),k(m,p,h)}if(nt(p)||Qe(p))return p=La(p,m.mode,h,null),p.return=m,p;if(typeof p.then=="function")return k(m,io(p),h);if(p.$$typeof===be)return k(m,$n(m,p),h);no(m,p)}return null}function y(m,p,h,A){var V=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return V!==null?null:s(m,p,""+h,A);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case D:return h.key===V?c(m,p,h,A):null;case pe:return h.key===V?g(m,p,h,A):null;case Ge:return h=Pa(h),y(m,p,h,A)}if(nt(h)||Qe(h))return V!==null?null:S(m,p,h,A,null);if(typeof h.then=="function")return y(m,p,io(h),A);if(h.$$typeof===be)return y(m,p,$n(m,h),A);no(m,h)}return null}function v(m,p,h,A,V){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return m=m.get(h)||null,s(p,m,""+A,V);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case D:return m=m.get(A.key===null?h:A.key)||null,c(p,m,A,V);case pe:return m=m.get(A.key===null?h:A.key)||null,g(p,m,A,V);case Ge:return A=Pa(A),v(m,p,h,A,V)}if(nt(A)||Qe(A))return m=m.get(h)||null,S(p,m,A,V,null);if(typeof A.then=="function")return v(m,p,h,io(A),V);if(A.$$typeof===be)return v(m,p,h,$n(p,A),V);no(p,A)}return null}function z(m,p,h,A){for(var V=null,re=null,F=p,X=p=0,ie=null;F!==null&&X<h.length;X++){F.index>X?(ie=F,F=null):ie=F.sibling;var se=y(m,F,h[X],A);if(se===null){F===null&&(F=ie);break}e&&F&&se.alternate===null&&t(m,F),p=o(se,p,X),re===null?V=se:re.sibling=se,re=se,F=ie}if(X===h.length)return a(m,F),ne&&Ht(m,X),V;if(F===null){for(;X<h.length;X++)F=k(m,h[X],A),F!==null&&(p=o(F,p,X),re===null?V=F:re.sibling=F,re=F);return ne&&Ht(m,X),V}for(F=i(F);X<h.length;X++)ie=v(F,m,X,h[X],A),ie!==null&&(e&&ie.alternate!==null&&F.delete(ie.key===null?X:ie.key),p=o(ie,p,X),re===null?V=ie:re.sibling=ie,re=ie);return e&&F.forEach(function(Ta){return t(m,Ta)}),ne&&Ht(m,X),V}function G(m,p,h,A){if(h==null)throw Error(u(151));for(var V=null,re=null,F=p,X=p=0,ie=null,se=h.next();F!==null&&!se.done;X++,se=h.next()){F.index>X?(ie=F,F=null):ie=F.sibling;var Ta=y(m,F,se.value,A);if(Ta===null){F===null&&(F=ie);break}e&&F&&Ta.alternate===null&&t(m,F),p=o(Ta,p,X),re===null?V=Ta:re.sibling=Ta,re=Ta,F=ie}if(se.done)return a(m,F),ne&&Ht(m,X),V;if(F===null){for(;!se.done;X++,se=h.next())se=k(m,se.value,A),se!==null&&(p=o(se,p,X),re===null?V=se:re.sibling=se,re=se);return ne&&Ht(m,X),V}for(F=i(F);!se.done;X++,se=h.next())se=v(F,m,X,se.value,A),se!==null&&(e&&se.alternate!==null&&F.delete(se.key===null?X:se.key),p=o(se,p,X),re===null?V=se:re.sibling=se,re=se);return e&&F.forEach(function(wh){return t(m,wh)}),ne&&Ht(m,X),V}function ye(m,p,h,A){if(typeof h=="object"&&h!==null&&h.type===Q&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case D:e:{for(var V=h.key;p!==null;){if(p.key===V){if(V=h.type,V===Q){if(p.tag===7){a(m,p.sibling),A=n(p,h.props.children),A.return=m,m=A;break e}}else if(p.elementType===V||typeof V=="object"&&V!==null&&V.$$typeof===Ge&&Pa(V)===p.type){a(m,p.sibling),A=n(p,h.props),Zi(A,h),A.return=m,m=A;break e}a(m,p);break}else t(m,p);p=p.sibling}h.type===Q?(A=La(h.props.children,m.mode,A,h.key),A.return=m,m=A):(A=Wn(h.type,h.key,h.props,null,m.mode,A),Zi(A,h),A.return=m,m=A)}return r(m);case pe:e:{for(V=h.key;p!==null;){if(p.key===V)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){a(m,p.sibling),A=n(p,h.children||[]),A.return=m,m=A;break e}else{a(m,p);break}else t(m,p);p=p.sibling}A=Dr(h,m.mode,A),A.return=m,m=A}return r(m);case Ge:return h=Pa(h),ye(m,p,h,A)}if(nt(h))return z(m,p,h,A);if(Qe(h)){if(V=Qe(h),typeof V!="function")throw Error(u(150));return h=V.call(h),G(m,p,h,A)}if(typeof h.then=="function")return ye(m,p,io(h),A);if(h.$$typeof===be)return ye(m,p,$n(m,h),A);no(m,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,p!==null&&p.tag===6?(a(m,p.sibling),A=n(p,h),A.return=m,m=A):(a(m,p),A=Mr(h,m.mode,A),A.return=m,m=A),r(m)):a(m,p)}return function(m,p,h,A){try{Xi=0;var V=ye(m,p,h,A);return hi=null,V}catch(F){if(F===mi||F===to)throw F;var re=ct(29,F,null,m.mode);return re.lanes=A,re.return=m,re}}}var qa=zc(!0),Hc=zc(!1),la=!1;function qr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vr(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ca(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ua(e,t,a){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ce&2)!==0){var n=i.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),i.pending=t,t=Yn(e),Ac(e,null,a),t}return Jn(e,i,t,a),Yn(e)}function $i(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,a|=i,t.lanes=a,Dl(e,a)}}function Gr(e,t){var a=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,a===i)){var n=null,o=null;if(a=a.firstBaseUpdate,a!==null){do{var r={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};o===null?n=o=r:o=o.next=r,a=a.next}while(a!==null);o===null?n=o=t:o=o.next=t}else n=o=t;a={baseState:i.baseState,firstBaseUpdate:n,lastBaseUpdate:o,shared:i.shared,callbacks:i.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Kr=!1;function en(){if(Kr){var e=fi;if(e!==null)throw e}}function tn(e,t,a,i){Kr=!1;var n=e.updateQueue;la=!1;var o=n.firstBaseUpdate,r=n.lastBaseUpdate,s=n.shared.pending;if(s!==null){n.shared.pending=null;var c=s,g=c.next;c.next=null,r===null?o=g:r.next=g,r=c;var S=e.alternate;S!==null&&(S=S.updateQueue,s=S.lastBaseUpdate,s!==r&&(s===null?S.firstBaseUpdate=g:s.next=g,S.lastBaseUpdate=c))}if(o!==null){var k=n.baseState;r=0,S=g=c=null,s=o;do{var y=s.lane&-536870913,v=y!==s.lane;if(v?(ae&y)===y:(i&y)===y){y!==0&&y===pi&&(Kr=!0),S!==null&&(S=S.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var z=e,G=s;y=t;var ye=a;switch(G.tag){case 1:if(z=G.payload,typeof z=="function"){k=z.call(ye,k,y);break e}k=z;break e;case 3:z.flags=z.flags&-65537|128;case 0:if(z=G.payload,y=typeof z=="function"?z.call(ye,k,y):z,y==null)break e;k=_({},k,y);break e;case 2:la=!0}}y=s.callback,y!==null&&(e.flags|=64,v&&(e.flags|=8192),v=n.callbacks,v===null?n.callbacks=[y]:v.push(y))}else v={lane:y,tag:s.tag,payload:s.payload,callback:s.callback,next:null},S===null?(g=S=v,c=k):S=S.next=v,r|=y;if(s=s.next,s===null){if(s=n.shared.pending,s===null)break;v=s,s=v.next,v.next=null,n.lastBaseUpdate=v,n.shared.pending=null}}while(!0);S===null&&(c=k),n.baseState=c,n.firstBaseUpdate=g,n.lastBaseUpdate=S,o===null&&(n.shared.lanes=0),ha|=r,e.lanes=r,e.memoizedState=k}}function Pc(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function Fc(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Pc(a[e],t)}var gi=d(null),oo=d(0);function qc(e,t){e=Xt,j(oo,e),j(gi,t),Xt=e|t.baseLanes}function Qr(){j(oo,Xt),j(gi,gi.current)}function Jr(){Xt=oo.current,T(gi),T(oo)}var ut=d(null),At=null;function da(e){var t=e.alternate;j(Re,Re.current&1),j(ut,e),At===null&&(t===null||gi.current!==null||t.memoizedState!==null)&&(At=e)}function Yr(e){j(Re,Re.current),j(ut,e),At===null&&(At=e)}function Vc(e){e.tag===22?(j(Re,Re.current),j(ut,e),At===null&&(At=e)):pa()}function pa(){j(Re,Re.current),j(ut,ut.current)}function dt(e){T(ut),At===e&&(At=null),T(Re)}var Re=d(0);function ro(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||tl(a)||al(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qt=0,W=null,he=null,Ue=null,so=!1,yi=!1,Va=!1,lo=0,an=0,vi=null,pm=0;function ke(){throw Error(u(321))}function Wr(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!lt(e[a],t[a]))return!1;return!0}function Xr(e,t,a,i,n,o){return qt=o,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,x.H=e===null||e.memoizedState===null?Nu:ps,Va=!1,o=a(i,n),Va=!1,yi&&(o=Kc(t,a,i,n)),Gc(e),o}function Gc(e){x.H=rn;var t=he!==null&&he.next!==null;if(qt=0,Ue=he=W=null,so=!1,an=0,vi=null,t)throw Error(u(300));e===null||Oe||(e=e.dependencies,e!==null&&Zn(e)&&(Oe=!0))}function Kc(e,t,a,i){W=e;var n=0;do{if(yi&&(vi=null),an=0,yi=!1,25<=n)throw Error(u(301));if(n+=1,Ue=he=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}x.H=Eu,o=t(a,i)}while(yi);return o}function fm(){var e=x.H,t=e.useState()[0];return t=typeof t.then=="function"?nn(t):t,e=e.useState()[0],(he!==null?he.memoizedState:null)!==e&&(W.flags|=1024),t}function Zr(){var e=lo!==0;return lo=0,e}function $r(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function es(e){if(so){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}so=!1}qt=0,Ue=he=W=null,yi=!1,an=lo=0,vi=null}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ue===null?W.memoizedState=Ue=e:Ue=Ue.next=e,Ue}function Me(){if(he===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=Ue===null?W.memoizedState:Ue.next;if(t!==null)Ue=t,he=e;else{if(e===null)throw W.alternate===null?Error(u(467)):Error(u(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},Ue===null?W.memoizedState=Ue=e:Ue=Ue.next=e}return Ue}function co(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function nn(e){var t=an;return an+=1,vi===null&&(vi=[]),e=Lc(vi,e,t),t=W,(Ue===null?t.memoizedState:Ue.next)===null&&(t=t.alternate,x.H=t===null||t.memoizedState===null?Nu:ps),e}function uo(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return nn(e);if(e.$$typeof===be)return Pe(e)}throw Error(u(438,String(e)))}function ts(e){var t=null,a=W.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var i=W.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=co(),W.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),i=0;i<e;i++)a[i]=ea;return t.index++,a}function Vt(e,t){return typeof t=="function"?t(e):t}function po(e){var t=Me();return as(t,he,e)}function as(e,t,a){var i=e.queue;if(i===null)throw Error(u(311));i.lastRenderedReducer=a;var n=e.baseQueue,o=i.pending;if(o!==null){if(n!==null){var r=n.next;n.next=o.next,o.next=r}t.baseQueue=n=o,i.pending=null}if(o=e.baseState,n===null)e.memoizedState=o;else{t=n.next;var s=r=null,c=null,g=t,S=!1;do{var k=g.lane&-536870913;if(k!==g.lane?(ae&k)===k:(qt&k)===k){var y=g.revertLane;if(y===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),k===pi&&(S=!0);else if((qt&y)===y){g=g.next,y===pi&&(S=!0);continue}else k={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(s=c=k,r=o):c=c.next=k,W.lanes|=y,ha|=y;k=g.action,Va&&a(o,k),o=g.hasEagerState?g.eagerState:a(o,k)}else y={lane:k,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(s=c=y,r=o):c=c.next=y,W.lanes|=k,ha|=k;g=g.next}while(g!==null&&g!==t);if(c===null?r=o:c.next=s,!lt(o,e.memoizedState)&&(Oe=!0,S&&(a=fi,a!==null)))throw a;e.memoizedState=o,e.baseState=r,e.baseQueue=c,i.lastRenderedState=o}return n===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function is(e){var t=Me(),a=t.queue;if(a===null)throw Error(u(311));a.lastRenderedReducer=e;var i=a.dispatch,n=a.pending,o=t.memoizedState;if(n!==null){a.pending=null;var r=n=n.next;do o=e(o,r.action),r=r.next;while(r!==n);lt(o,t.memoizedState)||(Oe=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),a.lastRenderedState=o}return[o,i]}function Qc(e,t,a){var i=W,n=Me(),o=ne;if(o){if(a===void 0)throw Error(u(407));a=a()}else a=t();var r=!lt((he||n).memoizedState,a);if(r&&(n.memoizedState=a,Oe=!0),n=n.queue,rs(Wc.bind(null,i,n,e),[e]),n.getSnapshot!==t||r||Ue!==null&&Ue.memoizedState.tag&1){if(i.flags|=2048,bi(9,{destroy:void 0},Yc.bind(null,i,n,a,t),null),ve===null)throw Error(u(349));o||(qt&127)!==0||Jc(i,t,a)}return a}function Jc(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=W.updateQueue,t===null?(t=co(),W.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Yc(e,t,a,i){t.value=a,t.getSnapshot=i,Xc(t)&&Zc(e)}function Wc(e,t,a){return a(function(){Xc(t)&&Zc(e)})}function Xc(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!lt(e,a)}catch{return!0}}function Zc(e){var t=ja(e,2);t!==null&&it(t,e,2)}function ns(e){var t=We();if(typeof e=="function"){var a=e;if(e=a(),Va){ta(!0);try{a()}finally{ta(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:e},t}function $c(e,t,a,i){return e.baseState=a,as(e,he,typeof i=="function"?i:Vt)}function mm(e,t,a,i,n){if(ho(e))throw Error(u(485));if(e=t.action,e!==null){var o={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){o.listeners.push(r)}};x.T!==null?a(!0):o.isTransition=!1,i(o),a=t.pending,a===null?(o.next=t.pending=o,eu(t,o)):(o.next=a.next,t.pending=a.next=o)}}function eu(e,t){var a=t.action,i=t.payload,n=e.state;if(t.isTransition){var o=x.T,r={};x.T=r;try{var s=a(n,i),c=x.S;c!==null&&c(r,s),tu(e,t,s)}catch(g){os(e,t,g)}finally{o!==null&&r.types!==null&&(o.types=r.types),x.T=o}}else try{o=a(n,i),tu(e,t,o)}catch(g){os(e,t,g)}}function tu(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(i){au(e,t,i)},function(i){return os(e,t,i)}):au(e,t,a)}function au(e,t,a){t.status="fulfilled",t.value=a,iu(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,eu(e,a)))}function os(e,t,a){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=a,iu(t),t=t.next;while(t!==i)}e.action=null}function iu(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function nu(e,t){return t}function ou(e,t){if(ne){var a=ve.formState;if(a!==null){e:{var i=W;if(ne){if(Se){t:{for(var n=Se,o=wt;n.nodeType!==8;){if(!o){n=null;break t}if(n=Ct(n.nextSibling),n===null){n=null;break t}}o=n.data,n=o==="F!"||o==="F"?n:null}if(n){Se=Ct(n.nextSibling),i=n.data==="F!";break e}}ra(i)}i=!1}i&&(t=a[0])}}return a=We(),a.memoizedState=a.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:nu,lastRenderedState:t},a.queue=i,a=Cu.bind(null,W,i),i.dispatch=a,i=ns(!1),o=ds.bind(null,W,!1,i.queue),i=We(),n={state:t,dispatch:null,action:e,pending:null},i.queue=n,a=mm.bind(null,W,n,o,a),n.dispatch=a,i.memoizedState=e,[t,a,!1]}function ru(e){var t=Me();return su(t,he,e)}function su(e,t,a){if(t=as(e,t,nu)[0],e=po(Vt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=nn(t)}catch(r){throw r===mi?to:r}else i=t;t=Me();var n=t.queue,o=n.dispatch;return a!==t.memoizedState&&(W.flags|=2048,bi(9,{destroy:void 0},hm.bind(null,n,a),null)),[i,o,e]}function hm(e,t){e.action=t}function lu(e){var t=Me(),a=he;if(a!==null)return su(t,a,e);Me(),t=t.memoizedState,a=Me();var i=a.queue.dispatch;return a.memoizedState=e,[t,i,!1]}function bi(e,t,a,i){return e={tag:e,create:a,deps:i,inst:t,next:null},t=W.updateQueue,t===null&&(t=co(),W.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(i=a.next,a.next=e,e.next=i,t.lastEffect=e),e}function cu(){return Me().memoizedState}function fo(e,t,a,i){var n=We();W.flags|=e,n.memoizedState=bi(1|t,{destroy:void 0},a,i===void 0?null:i)}function mo(e,t,a,i){var n=Me();i=i===void 0?null:i;var o=n.memoizedState.inst;he!==null&&i!==null&&Wr(i,he.memoizedState.deps)?n.memoizedState=bi(t,o,a,i):(W.flags|=e,n.memoizedState=bi(1|t,o,a,i))}function uu(e,t){fo(8390656,8,e,t)}function rs(e,t){mo(2048,8,e,t)}function gm(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=co(),W.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function du(e){var t=Me().memoizedState;return gm({ref:t,nextImpl:e}),function(){if((ce&2)!==0)throw Error(u(440));return t.impl.apply(void 0,arguments)}}function pu(e,t){return mo(4,2,e,t)}function fu(e,t){return mo(4,4,e,t)}function mu(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function hu(e,t,a){a=a!=null?a.concat([e]):null,mo(4,4,mu.bind(null,t,e),a)}function ss(){}function gu(e,t){var a=Me();t=t===void 0?null:t;var i=a.memoizedState;return t!==null&&Wr(t,i[1])?i[0]:(a.memoizedState=[e,t],e)}function yu(e,t){var a=Me();t=t===void 0?null:t;var i=a.memoizedState;if(t!==null&&Wr(t,i[1]))return i[0];if(i=e(),Va){ta(!0);try{e()}finally{ta(!1)}}return a.memoizedState=[i,t],i}function ls(e,t,a){return a===void 0||(qt&1073741824)!==0&&(ae&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=vd(),W.lanes|=e,ha|=e,a)}function vu(e,t,a,i){return lt(a,t)?a:gi.current!==null?(e=ls(e,a,i),lt(e,t)||(Oe=!0),e):(qt&42)===0||(qt&1073741824)!==0&&(ae&261930)===0?(Oe=!0,e.memoizedState=a):(e=vd(),W.lanes|=e,ha|=e,t)}function bu(e,t,a,i,n){var o=B.p;B.p=o!==0&&8>o?o:8;var r=x.T,s={};x.T=s,ds(e,!1,t,a);try{var c=n(),g=x.S;if(g!==null&&g(s,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var S=dm(c,i);on(e,t,S,mt(e))}else on(e,t,i,mt(e))}catch(k){on(e,t,{then:function(){},status:"rejected",reason:k},mt())}finally{B.p=o,r!==null&&s.types!==null&&(r.types=s.types),x.T=r}}function ym(){}function cs(e,t,a,i){if(e.tag!==5)throw Error(u(476));var n=Su(e).queue;bu(e,n,t,w,a===null?ym:function(){return xu(e),a(i)})}function Su(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:w,baseState:w,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:w},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function xu(e){var t=Su(e);t.next===null&&(t=e.alternate.memoizedState),on(e,t.next.queue,{},mt())}function us(){return Pe(wn)}function wu(){return Me().memoizedState}function Au(){return Me().memoizedState}function vm(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=mt();e=ca(a);var i=ua(t,e,a);i!==null&&(it(i,t,a),$i(i,t,a)),t={cache:zr()},e.payload=t;return}t=t.return}}function bm(e,t,a){var i=mt();a={lane:i,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ho(e)?Tu(t,a):(a=Er(e,t,a,i),a!==null&&(it(a,e,i),ku(a,t,i)))}function Cu(e,t,a){var i=mt();on(e,t,a,i)}function on(e,t,a,i){var n={lane:i,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(ho(e))Tu(t,n);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var r=t.lastRenderedState,s=o(r,a);if(n.hasEagerState=!0,n.eagerState=s,lt(s,r))return Jn(e,t,n,0),ve===null&&Qn(),!1}catch{}if(a=Er(e,t,n,i),a!==null)return it(a,e,i),ku(a,t,i),!0}return!1}function ds(e,t,a,i){if(i={lane:2,revertLane:qs(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ho(e)){if(t)throw Error(u(479))}else t=Er(e,a,i,2),t!==null&&it(t,e,2)}function ho(e){var t=e.alternate;return e===W||t!==null&&t===W}function Tu(e,t){yi=so=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function ku(e,t,a){if((a&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,a|=i,t.lanes=a,Dl(e,a)}}var rn={readContext:Pe,use:uo,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useLayoutEffect:ke,useInsertionEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useSyncExternalStore:ke,useId:ke,useHostTransitionStatus:ke,useFormState:ke,useActionState:ke,useOptimistic:ke,useMemoCache:ke,useCacheRefresh:ke};rn.useEffectEvent=ke;var Nu={readContext:Pe,use:uo,useCallback:function(e,t){return We().memoizedState=[e,t===void 0?null:t],e},useContext:Pe,useEffect:uu,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,fo(4194308,4,mu.bind(null,t,e),a)},useLayoutEffect:function(e,t){return fo(4194308,4,e,t)},useInsertionEffect:function(e,t){fo(4,2,e,t)},useMemo:function(e,t){var a=We();t=t===void 0?null:t;var i=e();if(Va){ta(!0);try{e()}finally{ta(!1)}}return a.memoizedState=[i,t],i},useReducer:function(e,t,a){var i=We();if(a!==void 0){var n=a(t);if(Va){ta(!0);try{a(t)}finally{ta(!1)}}}else n=t;return i.memoizedState=i.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},i.queue=e,e=e.dispatch=bm.bind(null,W,e),[i.memoizedState,e]},useRef:function(e){var t=We();return e={current:e},t.memoizedState=e},useState:function(e){e=ns(e);var t=e.queue,a=Cu.bind(null,W,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:ss,useDeferredValue:function(e,t){var a=We();return ls(a,e,t)},useTransition:function(){var e=ns(!1);return e=bu.bind(null,W,e.queue,!0,!1),We().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var i=W,n=We();if(ne){if(a===void 0)throw Error(u(407));a=a()}else{if(a=t(),ve===null)throw Error(u(349));(ae&127)!==0||Jc(i,t,a)}n.memoizedState=a;var o={value:a,getSnapshot:t};return n.queue=o,uu(Wc.bind(null,i,o,e),[e]),i.flags|=2048,bi(9,{destroy:void 0},Yc.bind(null,i,o,a,t),null),a},useId:function(){var e=We(),t=ve.identifierPrefix;if(ne){var a=Ut,i=Dt;a=(i&~(1<<32-st(i)-1)).toString(32)+a,t="_"+t+"R_"+a,a=lo++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=pm++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:us,useFormState:ou,useActionState:ou,useOptimistic:function(e){var t=We();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=ds.bind(null,W,!0,a),a.dispatch=t,[e,t]},useMemoCache:ts,useCacheRefresh:function(){return We().memoizedState=vm.bind(null,W)},useEffectEvent:function(e){var t=We(),a={impl:e};return t.memoizedState=a,function(){if((ce&2)!==0)throw Error(u(440));return a.impl.apply(void 0,arguments)}}},ps={readContext:Pe,use:uo,useCallback:gu,useContext:Pe,useEffect:rs,useImperativeHandle:hu,useInsertionEffect:pu,useLayoutEffect:fu,useMemo:yu,useReducer:po,useRef:cu,useState:function(){return po(Vt)},useDebugValue:ss,useDeferredValue:function(e,t){var a=Me();return vu(a,he.memoizedState,e,t)},useTransition:function(){var e=po(Vt)[0],t=Me().memoizedState;return[typeof e=="boolean"?e:nn(e),t]},useSyncExternalStore:Qc,useId:wu,useHostTransitionStatus:us,useFormState:ru,useActionState:ru,useOptimistic:function(e,t){var a=Me();return $c(a,he,e,t)},useMemoCache:ts,useCacheRefresh:Au};ps.useEffectEvent=du;var Eu={readContext:Pe,use:uo,useCallback:gu,useContext:Pe,useEffect:rs,useImperativeHandle:hu,useInsertionEffect:pu,useLayoutEffect:fu,useMemo:yu,useReducer:is,useRef:cu,useState:function(){return is(Vt)},useDebugValue:ss,useDeferredValue:function(e,t){var a=Me();return he===null?ls(a,e,t):vu(a,he.memoizedState,e,t)},useTransition:function(){var e=is(Vt)[0],t=Me().memoizedState;return[typeof e=="boolean"?e:nn(e),t]},useSyncExternalStore:Qc,useId:wu,useHostTransitionStatus:us,useFormState:lu,useActionState:lu,useOptimistic:function(e,t){var a=Me();return he!==null?$c(a,he,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:ts,useCacheRefresh:Au};Eu.useEffectEvent=du;function fs(e,t,a,i){t=e.memoizedState,a=a(i,t),a=a==null?t:_({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ms={enqueueSetState:function(e,t,a){e=e._reactInternals;var i=mt(),n=ca(i);n.payload=t,a!=null&&(n.callback=a),t=ua(e,n,i),t!==null&&(it(t,e,i),$i(t,e,i))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var i=mt(),n=ca(i);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=ua(e,n,i),t!==null&&(it(t,e,i),$i(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=mt(),i=ca(a);i.tag=2,t!=null&&(i.callback=t),t=ua(e,i,a),t!==null&&(it(t,e,a),$i(t,e,a))}};function Ru(e,t,a,i,n,o,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,o,r):t.prototype&&t.prototype.isPureReactComponent?!Gi(a,i)||!Gi(n,o):!0}function Mu(e,t,a,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,i),t.state!==e&&ms.enqueueReplaceState(t,t.state,null)}function Ga(e,t){var a=t;if("ref"in t){a={};for(var i in t)i!=="ref"&&(a[i]=t[i])}if(e=e.defaultProps){a===t&&(a=_({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}function Du(e){Kn(e)}function Uu(e){console.error(e)}function Ou(e){Kn(e)}function go(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Bu(e,t,a){try{var i=e.onCaughtError;i(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function hs(e,t,a){return a=ca(a),a.tag=3,a.payload={element:null},a.callback=function(){go(e,t)},a}function ju(e){return e=ca(e),e.tag=3,e}function Lu(e,t,a,i){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var o=i.value;e.payload=function(){return n(o)},e.callback=function(){Bu(t,a,i)}}var r=a.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Bu(t,a,i),typeof n!="function"&&(ga===null?ga=new Set([this]):ga.add(this));var s=i.stack;this.componentDidCatch(i.value,{componentStack:s!==null?s:""})})}function Sm(e,t,a,i,n){if(a.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=a.alternate,t!==null&&di(t,a,n,!0),a=ut.current,a!==null){switch(a.tag){case 31:case 13:return At===null?Eo():a.alternate===null&&Ne===0&&(Ne=3),a.flags&=-257,a.flags|=65536,a.lanes=n,i===ao?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([i]):t.add(i),Hs(e,i,n)),!1;case 22:return a.flags|=65536,i===ao?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([i]):a.add(i)),Hs(e,i,n)),!1}throw Error(u(435,a.tag))}return Hs(e,i,n),Eo(),!1}if(ne)return t=ut.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,i!==Br&&(e=Error(u(422),{cause:i}),Ji(bt(e,a)))):(i!==Br&&(t=Error(u(423),{cause:i}),Ji(bt(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,i=bt(i,a),n=hs(e.stateNode,i,n),Gr(e,n),Ne!==4&&(Ne=2)),!1;var o=Error(u(520),{cause:i});if(o=bt(o,a),mn===null?mn=[o]:mn.push(o),Ne!==4&&(Ne=2),t===null)return!0;i=bt(i,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=hs(a.stateNode,i,e),Gr(a,e),!1;case 1:if(t=a.type,o=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(ga===null||!ga.has(o))))return a.flags|=65536,n&=-n,a.lanes|=n,n=ju(n),Lu(n,e,a,i),Gr(a,n),!1}a=a.return}while(a!==null);return!1}var gs=Error(u(461)),Oe=!1;function Fe(e,t,a,i){t.child=e===null?Hc(t,null,a,i):qa(t,e.child,a,i)}function Iu(e,t,a,i,n){a=a.render;var o=t.ref;if("ref"in i){var r={};for(var s in i)s!=="ref"&&(r[s]=i[s])}else r=i;return za(t),i=Xr(e,t,a,r,o,n),s=Zr(),e!==null&&!Oe?($r(e,t,n),Gt(e,t,n)):(ne&&s&&Ur(t),t.flags|=1,Fe(e,t,i,n),t.child)}function _u(e,t,a,i,n){if(e===null){var o=a.type;return typeof o=="function"&&!Rr(o)&&o.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=o,zu(e,t,o,i,n)):(e=Wn(a.type,null,i,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!Cs(e,n)){var r=o.memoizedProps;if(a=a.compare,a=a!==null?a:Gi,a(r,i)&&e.ref===t.ref)return Gt(e,t,n)}return t.flags|=1,e=zt(o,i),e.ref=t.ref,e.return=t,t.child=e}function zu(e,t,a,i,n){if(e!==null){var o=e.memoizedProps;if(Gi(o,i)&&e.ref===t.ref)if(Oe=!1,t.pendingProps=i=o,Cs(e,n))(e.flags&131072)!==0&&(Oe=!0);else return t.lanes=e.lanes,Gt(e,t,n)}return ys(e,t,a,i,n)}function Hu(e,t,a,i){var n=i.children,o=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(o=o!==null?o.baseLanes|a:a,e!==null){for(i=t.child=e.child,n=0;i!==null;)n=n|i.lanes|i.childLanes,i=i.sibling;i=n&~o}else i=0,t.child=null;return Pu(e,t,o,a,i)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&eo(t,o!==null?o.cachePool:null),o!==null?qc(t,o):Qr(),Vc(t);else return i=t.lanes=536870912,Pu(e,t,o!==null?o.baseLanes|a:a,a,i)}else o!==null?(eo(t,o.cachePool),qc(t,o),pa(),t.memoizedState=null):(e!==null&&eo(t,null),Qr(),pa());return Fe(e,t,n,a),t.child}function sn(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Pu(e,t,a,i,n){var o=Pr();return o=o===null?null:{parent:De._currentValue,pool:o},t.memoizedState={baseLanes:a,cachePool:o},e!==null&&eo(t,null),Qr(),Vc(t),e!==null&&di(e,t,i,!0),t.childLanes=n,null}function yo(e,t){return t=bo({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Fu(e,t,a){return qa(t,e.child,null,a),e=yo(t,t.pendingProps),e.flags|=2,dt(t),t.memoizedState=null,e}function xm(e,t,a){var i=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ne){if(i.mode==="hidden")return e=yo(t,i),t.lanes=536870912,sn(null,e);if(Yr(t),(e=Se)?(e=ep(e,wt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:na!==null?{id:Dt,overflow:Ut}:null,retryLane:536870912,hydrationErrors:null},a=Tc(e),a.return=t,t.child=a,He=t,Se=null)):e=null,e===null)throw ra(t);return t.lanes=536870912,null}return yo(t,i)}var o=e.memoizedState;if(o!==null){var r=o.dehydrated;if(Yr(t),n)if(t.flags&256)t.flags&=-257,t=Fu(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(u(558));else if(Oe||di(e,t,a,!1),n=(a&e.childLanes)!==0,Oe||n){if(i=ve,i!==null&&(r=Ul(i,a),r!==0&&r!==o.retryLane))throw o.retryLane=r,ja(e,r),it(i,e,r),gs;Eo(),t=Fu(e,t,a)}else e=o.treeContext,Se=Ct(r.nextSibling),He=t,ne=!0,oa=null,wt=!1,e!==null&&Ec(t,e),t=yo(t,i),t.flags|=4096;return t}return e=zt(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function vo(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(u(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function ys(e,t,a,i,n){return za(t),a=Xr(e,t,a,i,void 0,n),i=Zr(),e!==null&&!Oe?($r(e,t,n),Gt(e,t,n)):(ne&&i&&Ur(t),t.flags|=1,Fe(e,t,a,n),t.child)}function qu(e,t,a,i,n,o){return za(t),t.updateQueue=null,a=Kc(t,i,a,n),Gc(e),i=Zr(),e!==null&&!Oe?($r(e,t,o),Gt(e,t,o)):(ne&&i&&Ur(t),t.flags|=1,Fe(e,t,a,o),t.child)}function Vu(e,t,a,i,n){if(za(t),t.stateNode===null){var o=si,r=a.contextType;typeof r=="object"&&r!==null&&(o=Pe(r)),o=new a(i,o),t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=ms,t.stateNode=o,o._reactInternals=t,o=t.stateNode,o.props=i,o.state=t.memoizedState,o.refs={},qr(t),r=a.contextType,o.context=typeof r=="object"&&r!==null?Pe(r):si,o.state=t.memoizedState,r=a.getDerivedStateFromProps,typeof r=="function"&&(fs(t,a,r,i),o.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(r=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),r!==o.state&&ms.enqueueReplaceState(o,o.state,null),tn(t,i,o,n),en(),o.state=t.memoizedState),typeof o.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){o=t.stateNode;var s=t.memoizedProps,c=Ga(a,s);o.props=c;var g=o.context,S=a.contextType;r=si,typeof S=="object"&&S!==null&&(r=Pe(S));var k=a.getDerivedStateFromProps;S=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function",s=t.pendingProps!==s,S||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s||g!==r)&&Mu(t,o,i,r),la=!1;var y=t.memoizedState;o.state=y,tn(t,i,o,n),en(),g=t.memoizedState,s||y!==g||la?(typeof k=="function"&&(fs(t,a,k,i),g=t.memoizedState),(c=la||Ru(t,a,c,i,y,g,r))?(S||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=g),o.props=i,o.state=g,o.context=r,i=c):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{o=t.stateNode,Vr(e,t),r=t.memoizedProps,S=Ga(a,r),o.props=S,k=t.pendingProps,y=o.context,g=a.contextType,c=si,typeof g=="object"&&g!==null&&(c=Pe(g)),s=a.getDerivedStateFromProps,(g=typeof s=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(r!==k||y!==c)&&Mu(t,o,i,c),la=!1,y=t.memoizedState,o.state=y,tn(t,i,o,n),en();var v=t.memoizedState;r!==k||y!==v||la||e!==null&&e.dependencies!==null&&Zn(e.dependencies)?(typeof s=="function"&&(fs(t,a,s,i),v=t.memoizedState),(S=la||Ru(t,a,S,i,y,v,c)||e!==null&&e.dependencies!==null&&Zn(e.dependencies))?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||r===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=v),o.props=i,o.state=v,o.context=c,i=S):(typeof o.componentDidUpdate!="function"||r===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),i=!1)}return o=i,vo(e,t),i=(t.flags&128)!==0,o||i?(o=t.stateNode,a=i&&typeof a.getDerivedStateFromError!="function"?null:o.render(),t.flags|=1,e!==null&&i?(t.child=qa(t,e.child,null,n),t.child=qa(t,null,a,n)):Fe(e,t,a,n),t.memoizedState=o.state,e=t.child):e=Gt(e,t,n),e}function Gu(e,t,a,i){return Ia(),t.flags|=256,Fe(e,t,a,i),t.child}var vs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bs(e){return{baseLanes:e,cachePool:Bc()}}function Ss(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=ft),e}function Ku(e,t,a){var i=t.pendingProps,n=!1,o=(t.flags&128)!==0,r;if((r=o)||(r=e!==null&&e.memoizedState===null?!1:(Re.current&2)!==0),r&&(n=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(ne){if(n?da(t):pa(),(e=Se)?(e=ep(e,wt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:na!==null?{id:Dt,overflow:Ut}:null,retryLane:536870912,hydrationErrors:null},a=Tc(e),a.return=t,t.child=a,He=t,Se=null)):e=null,e===null)throw ra(t);return al(e)?t.lanes=32:t.lanes=536870912,null}var s=i.children;return i=i.fallback,n?(pa(),n=t.mode,s=bo({mode:"hidden",children:s},n),i=La(i,n,a,null),s.return=t,i.return=t,s.sibling=i,t.child=s,i=t.child,i.memoizedState=bs(a),i.childLanes=Ss(e,r,a),t.memoizedState=vs,sn(null,i)):(da(t),xs(t,s))}var c=e.memoizedState;if(c!==null&&(s=c.dehydrated,s!==null)){if(o)t.flags&256?(da(t),t.flags&=-257,t=ws(e,t,a)):t.memoizedState!==null?(pa(),t.child=e.child,t.flags|=128,t=null):(pa(),s=i.fallback,n=t.mode,i=bo({mode:"visible",children:i.children},n),s=La(s,n,a,null),s.flags|=2,i.return=t,s.return=t,i.sibling=s,t.child=i,qa(t,e.child,null,a),i=t.child,i.memoizedState=bs(a),i.childLanes=Ss(e,r,a),t.memoizedState=vs,t=sn(null,i));else if(da(t),al(s)){if(r=s.nextSibling&&s.nextSibling.dataset,r)var g=r.dgst;r=g,i=Error(u(419)),i.stack="",i.digest=r,Ji({value:i,source:null,stack:null}),t=ws(e,t,a)}else if(Oe||di(e,t,a,!1),r=(a&e.childLanes)!==0,Oe||r){if(r=ve,r!==null&&(i=Ul(r,a),i!==0&&i!==c.retryLane))throw c.retryLane=i,ja(e,i),it(r,e,i),gs;tl(s)||Eo(),t=ws(e,t,a)}else tl(s)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,Se=Ct(s.nextSibling),He=t,ne=!0,oa=null,wt=!1,e!==null&&Ec(t,e),t=xs(t,i.children),t.flags|=4096);return t}return n?(pa(),s=i.fallback,n=t.mode,c=e.child,g=c.sibling,i=zt(c,{mode:"hidden",children:i.children}),i.subtreeFlags=c.subtreeFlags&65011712,g!==null?s=zt(g,s):(s=La(s,n,a,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,sn(null,i),i=t.child,s=e.child.memoizedState,s===null?s=bs(a):(n=s.cachePool,n!==null?(c=De._currentValue,n=n.parent!==c?{parent:c,pool:c}:n):n=Bc(),s={baseLanes:s.baseLanes|a,cachePool:n}),i.memoizedState=s,i.childLanes=Ss(e,r,a),t.memoizedState=vs,sn(e.child,i)):(da(t),a=e.child,e=a.sibling,a=zt(a,{mode:"visible",children:i.children}),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a)}function xs(e,t){return t=bo({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function bo(e,t){return e=ct(22,e,null,t),e.lanes=0,e}function ws(e,t,a){return qa(t,e.child,null,a),e=xs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qu(e,t,a){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Ir(e.return,t,a)}function As(e,t,a,i,n,o){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:a,tailMode:n,treeForkCount:o}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=a,r.tailMode=n,r.treeForkCount=o)}function Ju(e,t,a){var i=t.pendingProps,n=i.revealOrder,o=i.tail;i=i.children;var r=Re.current,s=(r&2)!==0;if(s?(r=r&1|2,t.flags|=128):r&=1,j(Re,r),Fe(e,t,i,a),i=ne?Qi:0,!s&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qu(e,a,t);else if(e.tag===19)Qu(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&ro(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),As(t,!1,n,a,o,i);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&ro(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}As(t,!0,a,null,o,i);break;case"together":As(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Gt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ha|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(di(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,a=zt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=zt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Cs(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Zn(e)))}function wm(e,t,a){switch(t.tag){case 3:Ye(t,t.stateNode.containerInfo),sa(t,De,e.memoizedState.cache),Ia();break;case 27:case 5:Ui(t);break;case 4:Ye(t,t.stateNode.containerInfo);break;case 10:sa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Yr(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(da(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Ku(e,t,a):(da(t),e=Gt(e,t,a),e!==null?e.sibling:null);da(t);break;case 19:var n=(e.flags&128)!==0;if(i=(a&t.childLanes)!==0,i||(di(e,t,a,!1),i=(a&t.childLanes)!==0),n){if(i)return Ju(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),j(Re,Re.current),i)break;return null;case 22:return t.lanes=0,Hu(e,t,a,t.pendingProps);case 24:sa(t,De,e.memoizedState.cache)}return Gt(e,t,a)}function Yu(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Oe=!0;else{if(!Cs(e,a)&&(t.flags&128)===0)return Oe=!1,wm(e,t,a);Oe=(e.flags&131072)!==0}else Oe=!1,ne&&(t.flags&1048576)!==0&&Nc(t,Qi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Pa(t.elementType),t.type=e,typeof e=="function")Rr(e)?(i=Ga(e,i),t.tag=1,t=Vu(null,t,e,i,a)):(t.tag=0,t=ys(null,t,e,i,a));else{if(e!=null){var n=e.$$typeof;if(n===oe){t.tag=11,t=Iu(null,t,e,i,a);break e}else if(n===Z){t.tag=14,t=_u(null,t,e,i,a);break e}}throw t=kt(e)||e,Error(u(306,t,""))}}return t;case 0:return ys(e,t,t.type,t.pendingProps,a);case 1:return i=t.type,n=Ga(i,t.pendingProps),Vu(e,t,i,n,a);case 3:e:{if(Ye(t,t.stateNode.containerInfo),e===null)throw Error(u(387));i=t.pendingProps;var o=t.memoizedState;n=o.element,Vr(e,t),tn(t,i,null,a);var r=t.memoizedState;if(i=r.cache,sa(t,De,i),i!==o.cache&&_r(t,[De],a,!0),en(),i=r.element,o.isDehydrated)if(o={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Gu(e,t,i,a);break e}else if(i!==n){n=bt(Error(u(424)),t),Ji(n),t=Gu(e,t,i,a);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Se=Ct(e.firstChild),He=t,ne=!0,oa=null,wt=!0,a=Hc(t,null,i,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ia(),i===n){t=Gt(e,t,a);break e}Fe(e,t,i,a)}t=t.child}return t;case 26:return vo(e,t),e===null?(a=rp(t.type,null,t.pendingProps,null))?t.memoizedState=a:ne||(a=t.type,e=t.pendingProps,i=jo($.current).createElement(a),i[ze]=t,i[Xe]=e,qe(i,a,e),Le(i),t.stateNode=i):t.memoizedState=rp(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ui(t),e===null&&ne&&(i=t.stateNode=ip(t.type,t.pendingProps,$.current),He=t,wt=!0,n=Se,Sa(t.type)?(il=n,Se=Ct(i.firstChild)):Se=n),Fe(e,t,t.pendingProps.children,a),vo(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ne&&((n=i=Se)&&(i=Zm(i,t.type,t.pendingProps,wt),i!==null?(t.stateNode=i,He=t,Se=Ct(i.firstChild),wt=!1,n=!0):n=!1),n||ra(t)),Ui(t),n=t.type,o=t.pendingProps,r=e!==null?e.memoizedProps:null,i=o.children,Zs(n,o)?i=null:r!==null&&Zs(n,r)&&(t.flags|=32),t.memoizedState!==null&&(n=Xr(e,t,fm,null,null,a),wn._currentValue=n),vo(e,t),Fe(e,t,i,a),t.child;case 6:return e===null&&ne&&((e=a=Se)&&(a=$m(a,t.pendingProps,wt),a!==null?(t.stateNode=a,He=t,Se=null,e=!0):e=!1),e||ra(t)),null;case 13:return Ku(e,t,a);case 4:return Ye(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=qa(t,null,i,a):Fe(e,t,i,a),t.child;case 11:return Iu(e,t,t.type,t.pendingProps,a);case 7:return Fe(e,t,t.pendingProps,a),t.child;case 8:return Fe(e,t,t.pendingProps.children,a),t.child;case 12:return Fe(e,t,t.pendingProps.children,a),t.child;case 10:return i=t.pendingProps,sa(t,t.type,i.value),Fe(e,t,i.children,a),t.child;case 9:return n=t.type._context,i=t.pendingProps.children,za(t),n=Pe(n),i=i(n),t.flags|=1,Fe(e,t,i,a),t.child;case 14:return _u(e,t,t.type,t.pendingProps,a);case 15:return zu(e,t,t.type,t.pendingProps,a);case 19:return Ju(e,t,a);case 31:return xm(e,t,a);case 22:return Hu(e,t,a,t.pendingProps);case 24:return za(t),i=Pe(De),e===null?(n=Pr(),n===null&&(n=ve,o=zr(),n.pooledCache=o,o.refCount++,o!==null&&(n.pooledCacheLanes|=a),n=o),t.memoizedState={parent:i,cache:n},qr(t),sa(t,De,n)):((e.lanes&a)!==0&&(Vr(e,t),tn(t,null,null,a),en()),n=e.memoizedState,o=t.memoizedState,n.parent!==i?(n={parent:i,cache:i},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),sa(t,De,i)):(i=o.cache,sa(t,De,i),i!==n.cache&&_r(t,[De],a,!0))),Fe(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function Kt(e){e.flags|=4}function Ts(e,t,a,i,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(wd())e.flags|=8192;else throw Fa=ao,Fr}else e.flags&=-16777217}function Wu(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!dp(t))if(wd())e.flags|=8192;else throw Fa=ao,Fr}function So(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Rl():536870912,e.lanes|=t,Ai|=t)}function ln(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var i=null;a!==null;)a.alternate!==null&&(i=a),a=a.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,i=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,i|=n.subtreeFlags&65011712,i|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,i|=n.subtreeFlags,i|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=i,e.childLanes=a,t}function Am(e,t,a){var i=t.pendingProps;switch(Or(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return xe(t),null;case 3:return a=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ft(De),Ee(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ui(t)?Kt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,jr())),xe(t),null;case 26:var n=t.type,o=t.memoizedState;return e===null?(Kt(t),o!==null?(xe(t),Wu(t,o)):(xe(t),Ts(t,n,null,i,a))):o?o!==e.memoizedState?(Kt(t),xe(t),Wu(t,o)):(xe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Kt(t),xe(t),Ts(t,n,e,i,a)),null;case 27:if(Mn(t),a=$.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Kt(t);else{if(!i){if(t.stateNode===null)throw Error(u(166));return xe(t),null}e=P.current,ui(t)?Rc(t):(e=ip(n,i,a),t.stateNode=e,Kt(t))}return xe(t),null;case 5:if(Mn(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Kt(t);else{if(!i){if(t.stateNode===null)throw Error(u(166));return xe(t),null}if(o=P.current,ui(t))Rc(t);else{var r=jo($.current);switch(o){case 1:o=r.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:o=r.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":o=r.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":o=r.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":o=r.createElement("div"),o.innerHTML="<script><\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?o.multiple=!0:i.size&&(o.size=i.size);break;default:o=typeof i.is=="string"?r.createElement(n,{is:i.is}):r.createElement(n)}}o[ze]=t,o[Xe]=i;e:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)o.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break e;for(;r.sibling===null;){if(r.return===null||r.return===t)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=o;e:switch(qe(o,n,i),n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Kt(t)}}return xe(t),Ts(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Kt(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(u(166));if(e=$.current,ui(t)){if(e=t.stateNode,a=t.memoizedProps,i=null,n=He,n!==null)switch(n.tag){case 27:case 5:i=n.memoizedProps}e[ze]=t,e=!!(e.nodeValue===a||i!==null&&i.suppressHydrationWarning===!0||Kd(e.nodeValue,a)),e||ra(t,!0)}else e=jo(e).createTextNode(i),e[ze]=t,t.stateNode=e}return xe(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(i=ui(t),a!==null){if(e===null){if(!i)throw Error(u(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));e[ze]=t}else Ia(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;xe(t),e=!1}else a=jr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(dt(t),t):(dt(t),null);if((t.flags&128)!==0)throw Error(u(558))}return xe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=ui(t),i!==null&&i.dehydrated!==null){if(e===null){if(!n)throw Error(u(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(u(317));n[ze]=t}else Ia(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;xe(t),n=!1}else n=jr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(dt(t),t):(dt(t),null)}return dt(t),(t.flags&128)!==0?(t.lanes=a,t):(a=i!==null,e=e!==null&&e.memoizedState!==null,a&&(i=t.child,n=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(n=i.alternate.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==n&&(i.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),So(t,t.updateQueue),xe(t),null);case 4:return Ee(),e===null&&Qs(t.stateNode.containerInfo),xe(t),null;case 10:return Ft(t.type),xe(t),null;case 19:if(T(Re),i=t.memoizedState,i===null)return xe(t),null;if(n=(t.flags&128)!==0,o=i.rendering,o===null)if(n)ln(i,!1);else{if(Ne!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=ro(e),o!==null){for(t.flags|=128,ln(i,!1),e=o.updateQueue,t.updateQueue=e,So(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Cc(a,e),a=a.sibling;return j(Re,Re.current&1|2),ne&&Ht(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&ot()>To&&(t.flags|=128,n=!0,ln(i,!1),t.lanes=4194304)}else{if(!n)if(e=ro(o),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,So(t,e),ln(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ne)return xe(t),null}else 2*ot()-i.renderingStartTime>To&&a!==536870912&&(t.flags|=128,n=!0,ln(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(e=i.last,e!==null?e.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=ot(),e.sibling=null,a=Re.current,j(Re,n?a&1|2:a&1),ne&&Ht(t,i.treeForkCount),e):(xe(t),null);case 22:case 23:return dt(t),Jr(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(a&536870912)!==0&&(t.flags&128)===0&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),a=t.updateQueue,a!==null&&So(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==a&&(t.flags|=2048),e!==null&&T(Ha),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ft(De),xe(t),null;case 25:return null;case 30:return null}throw Error(u(156,t.tag))}function Cm(e,t){switch(Or(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ft(De),Ee(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Mn(t),null;case 31:if(t.memoizedState!==null){if(dt(t),t.alternate===null)throw Error(u(340));Ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(dt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));Ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return T(Re),null;case 4:return Ee(),null;case 10:return Ft(t.type),null;case 22:case 23:return dt(t),Jr(),e!==null&&T(Ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ft(De),null;case 25:return null;default:return null}}function Xu(e,t){switch(Or(t),t.tag){case 3:Ft(De),Ee();break;case 26:case 27:case 5:Mn(t);break;case 4:Ee();break;case 31:t.memoizedState!==null&&dt(t);break;case 13:dt(t);break;case 19:T(Re);break;case 10:Ft(t.type);break;case 22:case 23:dt(t),Jr(),e!==null&&T(Ha);break;case 24:Ft(De)}}function cn(e,t){try{var a=t.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var n=i.next;a=n;do{if((a.tag&e)===e){i=void 0;var o=a.create,r=a.inst;i=o(),r.destroy=i}a=a.next}while(a!==n)}}catch(s){me(t,t.return,s)}}function fa(e,t,a){try{var i=t.updateQueue,n=i!==null?i.lastEffect:null;if(n!==null){var o=n.next;i=o;do{if((i.tag&e)===e){var r=i.inst,s=r.destroy;if(s!==void 0){r.destroy=void 0,n=t;var c=a,g=s;try{g()}catch(S){me(n,c,S)}}}i=i.next}while(i!==o)}}catch(S){me(t,t.return,S)}}function Zu(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Fc(t,a)}catch(i){me(e,e.return,i)}}}function $u(e,t,a){a.props=Ga(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(i){me(e,t,i)}}function un(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof a=="function"?e.refCleanup=a(i):a.current=i}}catch(n){me(e,t,n)}}function Ot(e,t){var a=e.ref,i=e.refCleanup;if(a!==null)if(typeof i=="function")try{i()}catch(n){me(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){me(e,t,n)}else a.current=null}function ed(e){var t=e.type,a=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&i.focus();break e;case"img":a.src?i.src=a.src:a.srcSet&&(i.srcset=a.srcSet)}}catch(n){me(e,e.return,n)}}function ks(e,t,a){try{var i=e.stateNode;Km(i,e.type,a,t),i[Xe]=t}catch(n){me(e,e.return,n)}}function td(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sa(e.type)||e.tag===4}function Ns(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||td(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Es(e,t,a){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=It));else if(i!==4&&(i===27&&Sa(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Es(e,t,a),e=e.sibling;e!==null;)Es(e,t,a),e=e.sibling}function xo(e,t,a){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(i!==4&&(i===27&&Sa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(xo(e,t,a),e=e.sibling;e!==null;)xo(e,t,a),e=e.sibling}function ad(e){var t=e.stateNode,a=e.memoizedProps;try{for(var i=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);qe(t,i,a),t[ze]=e,t[Xe]=a}catch(o){me(e,e.return,o)}}var Qt=!1,Be=!1,Rs=!1,id=typeof WeakSet=="function"?WeakSet:Set,Ie=null;function Tm(e,t){if(e=e.containerInfo,Ws=Fo,e=hc(e),wr(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var i=a.getSelection&&a.getSelection();if(i&&i.rangeCount!==0){a=i.anchorNode;var n=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{a.nodeType,o.nodeType}catch{a=null;break e}var r=0,s=-1,c=-1,g=0,S=0,k=e,y=null;t:for(;;){for(var v;k!==a||n!==0&&k.nodeType!==3||(s=r+n),k!==o||i!==0&&k.nodeType!==3||(c=r+i),k.nodeType===3&&(r+=k.nodeValue.length),(v=k.firstChild)!==null;)y=k,k=v;for(;;){if(k===e)break t;if(y===a&&++g===n&&(s=r),y===o&&++S===i&&(c=r),(v=k.nextSibling)!==null)break;k=y,y=k.parentNode}k=v}a=s===-1||c===-1?null:{start:s,end:c}}else a=null}a=a||{start:0,end:0}}else a=null;for(Xs={focusedElem:e,selectionRange:a},Fo=!1,Ie=t;Ie!==null;)if(t=Ie,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ie=e;else for(;Ie!==null;){switch(t=Ie,o=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)n=e[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&o!==null){e=void 0,a=t,n=o.memoizedProps,o=o.memoizedState,i=a.stateNode;try{var z=Ga(a.type,n);e=i.getSnapshotBeforeUpdate(z,o),i.__reactInternalSnapshotBeforeUpdate=e}catch(G){me(a,a.return,G)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)el(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":el(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=t.sibling,e!==null){e.return=t.return,Ie=e;break}Ie=t.return}}function nd(e,t,a){var i=a.flags;switch(a.tag){case 0:case 11:case 15:Yt(e,a),i&4&&cn(5,a);break;case 1:if(Yt(e,a),i&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(r){me(a,a.return,r)}else{var n=Ga(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){me(a,a.return,r)}}i&64&&Zu(a),i&512&&un(a,a.return);break;case 3:if(Yt(e,a),i&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Fc(e,t)}catch(r){me(a,a.return,r)}}break;case 27:t===null&&i&4&&ad(a);case 26:case 5:Yt(e,a),t===null&&i&4&&ed(a),i&512&&un(a,a.return);break;case 12:Yt(e,a);break;case 31:Yt(e,a),i&4&&sd(e,a);break;case 13:Yt(e,a),i&4&&ld(e,a),i&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Bm.bind(null,a),eh(e,a))));break;case 22:if(i=a.memoizedState!==null||Qt,!i){t=t!==null&&t.memoizedState!==null||Be,n=Qt;var o=Be;Qt=i,(Be=t)&&!o?Wt(e,a,(a.subtreeFlags&8772)!==0):Yt(e,a),Qt=n,Be=o}break;case 30:break;default:Yt(e,a)}}function od(e){var t=e.alternate;t!==null&&(e.alternate=null,od(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&or(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ae=null,$e=!1;function Jt(e,t,a){for(a=a.child;a!==null;)rd(e,t,a),a=a.sibling}function rd(e,t,a){if(rt&&typeof rt.onCommitFiberUnmount=="function")try{rt.onCommitFiberUnmount(Oi,a)}catch{}switch(a.tag){case 26:Be||Ot(a,t),Jt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Be||Ot(a,t);var i=Ae,n=$e;Sa(a.type)&&(Ae=a.stateNode,$e=!1),Jt(e,t,a),bn(a.stateNode),Ae=i,$e=n;break;case 5:Be||Ot(a,t);case 6:if(i=Ae,n=$e,Ae=null,Jt(e,t,a),Ae=i,$e=n,Ae!==null)if($e)try{(Ae.nodeType===9?Ae.body:Ae.nodeName==="HTML"?Ae.ownerDocument.body:Ae).removeChild(a.stateNode)}catch(o){me(a,t,o)}else try{Ae.removeChild(a.stateNode)}catch(o){me(a,t,o)}break;case 18:Ae!==null&&($e?(e=Ae,Zd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Di(e)):Zd(Ae,a.stateNode));break;case 4:i=Ae,n=$e,Ae=a.stateNode.containerInfo,$e=!0,Jt(e,t,a),Ae=i,$e=n;break;case 0:case 11:case 14:case 15:fa(2,a,t),Be||fa(4,a,t),Jt(e,t,a);break;case 1:Be||(Ot(a,t),i=a.stateNode,typeof i.componentWillUnmount=="function"&&$u(a,t,i)),Jt(e,t,a);break;case 21:Jt(e,t,a);break;case 22:Be=(i=Be)||a.memoizedState!==null,Jt(e,t,a),Be=i;break;default:Jt(e,t,a)}}function sd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Di(e)}catch(a){me(t,t.return,a)}}}function ld(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Di(e)}catch(a){me(t,t.return,a)}}function km(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new id),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new id),t;default:throw Error(u(435,e.tag))}}function wo(e,t){var a=km(e);t.forEach(function(i){if(!a.has(i)){a.add(i);var n=jm.bind(null,e,i);i.then(n,n)}})}function et(e,t){var a=t.deletions;if(a!==null)for(var i=0;i<a.length;i++){var n=a[i],o=e,r=t,s=r;e:for(;s!==null;){switch(s.tag){case 27:if(Sa(s.type)){Ae=s.stateNode,$e=!1;break e}break;case 5:Ae=s.stateNode,$e=!1;break e;case 3:case 4:Ae=s.stateNode.containerInfo,$e=!0;break e}s=s.return}if(Ae===null)throw Error(u(160));rd(o,r,n),Ae=null,$e=!1,o=n.alternate,o!==null&&(o.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)cd(t,e),t=t.sibling}var Et=null;function cd(e,t){var a=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:et(t,e),tt(e),i&4&&(fa(3,e,e.return),cn(3,e),fa(5,e,e.return));break;case 1:et(t,e),tt(e),i&512&&(Be||a===null||Ot(a,a.return)),i&64&&Qt&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?i:a.concat(i))));break;case 26:var n=Et;if(et(t,e),tt(e),i&512&&(Be||a===null||Ot(a,a.return)),i&4){var o=a!==null?a.memoizedState:null;if(i=e.memoizedState,a===null)if(i===null)if(e.stateNode===null){e:{i=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(i){case"title":o=n.getElementsByTagName("title")[0],(!o||o[Li]||o[ze]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=n.createElement(i),n.head.insertBefore(o,n.querySelector("head > title"))),qe(o,i,a),o[ze]=e,Le(o),i=o;break e;case"link":var r=cp("link","href",n).get(i+(a.href||""));if(r){for(var s=0;s<r.length;s++)if(o=r[s],o.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&o.getAttribute("rel")===(a.rel==null?null:a.rel)&&o.getAttribute("title")===(a.title==null?null:a.title)&&o.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){r.splice(s,1);break t}}o=n.createElement(i),qe(o,i,a),n.head.appendChild(o);break;case"meta":if(r=cp("meta","content",n).get(i+(a.content||""))){for(s=0;s<r.length;s++)if(o=r[s],o.getAttribute("content")===(a.content==null?null:""+a.content)&&o.getAttribute("name")===(a.name==null?null:a.name)&&o.getAttribute("property")===(a.property==null?null:a.property)&&o.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&o.getAttribute("charset")===(a.charSet==null?null:a.charSet)){r.splice(s,1);break t}}o=n.createElement(i),qe(o,i,a),n.head.appendChild(o);break;default:throw Error(u(468,i))}o[ze]=e,Le(o),i=o}e.stateNode=i}else up(n,e.type,e.stateNode);else e.stateNode=lp(n,i,e.memoizedProps);else o!==i?(o===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):o.count--,i===null?up(n,e.type,e.stateNode):lp(n,i,e.memoizedProps)):i===null&&e.stateNode!==null&&ks(e,e.memoizedProps,a.memoizedProps)}break;case 27:et(t,e),tt(e),i&512&&(Be||a===null||Ot(a,a.return)),a!==null&&i&4&&ks(e,e.memoizedProps,a.memoizedProps);break;case 5:if(et(t,e),tt(e),i&512&&(Be||a===null||Ot(a,a.return)),e.flags&32){n=e.stateNode;try{ei(n,"")}catch(z){me(e,e.return,z)}}i&4&&e.stateNode!=null&&(n=e.memoizedProps,ks(e,n,a!==null?a.memoizedProps:n)),i&1024&&(Rs=!0);break;case 6:if(et(t,e),tt(e),i&4){if(e.stateNode===null)throw Error(u(162));i=e.memoizedProps,a=e.stateNode;try{a.nodeValue=i}catch(z){me(e,e.return,z)}}break;case 3:if(_o=null,n=Et,Et=Lo(t.containerInfo),et(t,e),Et=n,tt(e),i&4&&a!==null&&a.memoizedState.isDehydrated)try{Di(t.containerInfo)}catch(z){me(e,e.return,z)}Rs&&(Rs=!1,ud(e));break;case 4:i=Et,Et=Lo(e.stateNode.containerInfo),et(t,e),tt(e),Et=i;break;case 12:et(t,e),tt(e);break;case 31:et(t,e),tt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wo(e,i)));break;case 13:et(t,e),tt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Co=ot()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wo(e,i)));break;case 22:n=e.memoizedState!==null;var c=a!==null&&a.memoizedState!==null,g=Qt,S=Be;if(Qt=g||n,Be=S||c,et(t,e),Be=S,Qt=g,tt(e),i&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||c||Qt||Be||Ka(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){c=a=t;try{if(o=c.stateNode,n)r=o.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{s=c.stateNode;var k=c.memoizedProps.style,y=k!=null&&k.hasOwnProperty("display")?k.display:null;s.style.display=y==null||typeof y=="boolean"?"":(""+y).trim()}}catch(z){me(c,c.return,z)}}}else if(t.tag===6){if(a===null){c=t;try{c.stateNode.nodeValue=n?"":c.memoizedProps}catch(z){me(c,c.return,z)}}}else if(t.tag===18){if(a===null){c=t;try{var v=c.stateNode;n?$d(v,!0):$d(c.stateNode,!1)}catch(z){me(c,c.return,z)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(a=i.retryQueue,a!==null&&(i.retryQueue=null,wo(e,a))));break;case 19:et(t,e),tt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wo(e,i)));break;case 30:break;case 21:break;default:et(t,e),tt(e)}}function tt(e){var t=e.flags;if(t&2){try{for(var a,i=e.return;i!==null;){if(td(i)){a=i;break}i=i.return}if(a==null)throw Error(u(160));switch(a.tag){case 27:var n=a.stateNode,o=Ns(e);xo(e,o,n);break;case 5:var r=a.stateNode;a.flags&32&&(ei(r,""),a.flags&=-33);var s=Ns(e);xo(e,s,r);break;case 3:case 4:var c=a.stateNode.containerInfo,g=Ns(e);Es(e,g,c);break;default:throw Error(u(161))}}catch(S){me(e,e.return,S)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ud(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ud(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Yt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)nd(e,t.alternate,t),t=t.sibling}function Ka(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:fa(4,t,t.return),Ka(t);break;case 1:Ot(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&$u(t,t.return,a),Ka(t);break;case 27:bn(t.stateNode);case 26:case 5:Ot(t,t.return),Ka(t);break;case 22:t.memoizedState===null&&Ka(t);break;case 30:Ka(t);break;default:Ka(t)}e=e.sibling}}function Wt(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,n=e,o=t,r=o.flags;switch(o.tag){case 0:case 11:case 15:Wt(n,o,a),cn(4,o);break;case 1:if(Wt(n,o,a),i=o,n=i.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(g){me(i,i.return,g)}if(i=o,n=i.updateQueue,n!==null){var s=i.stateNode;try{var c=n.shared.hiddenCallbacks;if(c!==null)for(n.shared.hiddenCallbacks=null,n=0;n<c.length;n++)Pc(c[n],s)}catch(g){me(i,i.return,g)}}a&&r&64&&Zu(o),un(o,o.return);break;case 27:ad(o);case 26:case 5:Wt(n,o,a),a&&i===null&&r&4&&ed(o),un(o,o.return);break;case 12:Wt(n,o,a);break;case 31:Wt(n,o,a),a&&r&4&&sd(n,o);break;case 13:Wt(n,o,a),a&&r&4&&ld(n,o);break;case 22:o.memoizedState===null&&Wt(n,o,a),un(o,o.return);break;case 30:break;default:Wt(n,o,a)}t=t.sibling}}function Ms(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Yi(a))}function Ds(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Yi(e))}function Rt(e,t,a,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)dd(e,t,a,i),t=t.sibling}function dd(e,t,a,i){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Rt(e,t,a,i),n&2048&&cn(9,t);break;case 1:Rt(e,t,a,i);break;case 3:Rt(e,t,a,i),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Yi(e)));break;case 12:if(n&2048){Rt(e,t,a,i),e=t.stateNode;try{var o=t.memoizedProps,r=o.id,s=o.onPostCommit;typeof s=="function"&&s(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){me(t,t.return,c)}}else Rt(e,t,a,i);break;case 31:Rt(e,t,a,i);break;case 13:Rt(e,t,a,i);break;case 23:break;case 22:o=t.stateNode,r=t.alternate,t.memoizedState!==null?o._visibility&2?Rt(e,t,a,i):dn(e,t):o._visibility&2?Rt(e,t,a,i):(o._visibility|=2,Si(e,t,a,i,(t.subtreeFlags&10256)!==0||!1)),n&2048&&Ms(r,t);break;case 24:Rt(e,t,a,i),n&2048&&Ds(t.alternate,t);break;default:Rt(e,t,a,i)}}function Si(e,t,a,i,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var o=e,r=t,s=a,c=i,g=r.flags;switch(r.tag){case 0:case 11:case 15:Si(o,r,s,c,n),cn(8,r);break;case 23:break;case 22:var S=r.stateNode;r.memoizedState!==null?S._visibility&2?Si(o,r,s,c,n):dn(o,r):(S._visibility|=2,Si(o,r,s,c,n)),n&&g&2048&&Ms(r.alternate,r);break;case 24:Si(o,r,s,c,n),n&&g&2048&&Ds(r.alternate,r);break;default:Si(o,r,s,c,n)}t=t.sibling}}function dn(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,i=t,n=i.flags;switch(i.tag){case 22:dn(a,i),n&2048&&Ms(i.alternate,i);break;case 24:dn(a,i),n&2048&&Ds(i.alternate,i);break;default:dn(a,i)}t=t.sibling}}var pn=8192;function xi(e,t,a){if(e.subtreeFlags&pn)for(e=e.child;e!==null;)pd(e,t,a),e=e.sibling}function pd(e,t,a){switch(e.tag){case 26:xi(e,t,a),e.flags&pn&&e.memoizedState!==null&&ph(a,Et,e.memoizedState,e.memoizedProps);break;case 5:xi(e,t,a);break;case 3:case 4:var i=Et;Et=Lo(e.stateNode.containerInfo),xi(e,t,a),Et=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=pn,pn=16777216,xi(e,t,a),pn=i):xi(e,t,a));break;default:xi(e,t,a)}}function fd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function fn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];Ie=i,hd(i,e)}fd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)md(e),e=e.sibling}function md(e){switch(e.tag){case 0:case 11:case 15:fn(e),e.flags&2048&&fa(9,e,e.return);break;case 3:fn(e);break;case 12:fn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ao(e)):fn(e);break;default:fn(e)}}function Ao(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];Ie=i,hd(i,e)}fd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:fa(8,t,t.return),Ao(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Ao(t));break;default:Ao(t)}e=e.sibling}}function hd(e,t){for(;Ie!==null;){var a=Ie;switch(a.tag){case 0:case 11:case 15:fa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var i=a.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Yi(a.memoizedState.cache)}if(i=a.child,i!==null)i.return=a,Ie=i;else e:for(a=e;Ie!==null;){i=Ie;var n=i.sibling,o=i.return;if(od(i),i===a){Ie=null;break e}if(n!==null){n.return=o,Ie=n;break e}Ie=o}}}var Nm={getCacheForType:function(e){var t=Pe(De),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return Pe(De).controller.signal}},Em=typeof WeakMap=="function"?WeakMap:Map,ce=0,ve=null,ee=null,ae=0,fe=0,pt=null,ma=!1,wi=!1,Us=!1,Xt=0,Ne=0,ha=0,Qa=0,Os=0,ft=0,Ai=0,mn=null,at=null,Bs=!1,Co=0,gd=0,To=1/0,ko=null,ga=null,je=0,ya=null,Ci=null,Zt=0,js=0,Ls=null,yd=null,hn=0,Is=null;function mt(){return(ce&2)!==0&&ae!==0?ae&-ae:x.T!==null?qs():Ol()}function vd(){if(ft===0)if((ae&536870912)===0||ne){var e=On;On<<=1,(On&3932160)===0&&(On=262144),ft=e}else ft=536870912;return e=ut.current,e!==null&&(e.flags|=32),ft}function it(e,t,a){(e===ve&&(fe===2||fe===9)||e.cancelPendingCommit!==null)&&(Ti(e,0),va(e,ae,ft,!1)),ji(e,a),((ce&2)===0||e!==ve)&&(e===ve&&((ce&2)===0&&(Qa|=a),Ne===4&&va(e,ae,ft,!1)),Bt(e))}function bd(e,t,a){if((ce&6)!==0)throw Error(u(327));var i=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Bi(e,t),n=i?Dm(e,t):zs(e,t,!0),o=i;do{if(n===0){wi&&!i&&va(e,t,0,!1);break}else{if(a=e.current.alternate,o&&!Rm(a)){n=zs(e,t,!1),o=!1;continue}if(n===2){if(o=t,e.errorRecoveryDisabledLanes&o)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;e:{var s=e;n=mn;var c=s.current.memoizedState.isDehydrated;if(c&&(Ti(s,r).flags|=256),r=zs(s,r,!1),r!==2){if(Us&&!c){s.errorRecoveryDisabledLanes|=o,Qa|=o,n=4;break e}o=at,at=n,o!==null&&(at===null?at=o:at.push.apply(at,o))}n=r}if(o=!1,n!==2)continue}}if(n===1){Ti(e,0),va(e,t,0,!0);break}e:{switch(i=e,o=n,o){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t)break;case 6:va(i,t,ft,!ma);break e;case 2:at=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(n=Co+300-ot(),10<n)){if(va(i,t,ft,!ma),jn(i,0,!0)!==0)break e;Zt=t,i.timeoutHandle=Wd(Sd.bind(null,i,a,at,ko,Bs,t,ft,Qa,Ai,ma,o,"Throttled",-0,0),n);break e}Sd(i,a,at,ko,Bs,t,ft,Qa,Ai,ma,o,null,-0,0)}}break}while(!0);Bt(e)}function Sd(e,t,a,i,n,o,r,s,c,g,S,k,y,v){if(e.timeoutHandle=-1,k=t.subtreeFlags,k&8192||(k&16785408)===16785408){k={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:It},pd(t,o,k);var z=(o&62914560)===o?Co-ot():(o&4194048)===o?gd-ot():0;if(z=fh(k,z),z!==null){Zt=o,e.cancelPendingCommit=z(Ed.bind(null,e,t,o,a,i,n,r,s,c,S,k,null,y,v)),va(e,o,r,!g);return}}Ed(e,t,o,a,i,n,r,s,c)}function Rm(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var i=0;i<a.length;i++){var n=a[i],o=n.getSnapshot;n=n.value;try{if(!lt(o(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function va(e,t,a,i){t&=~Os,t&=~Qa,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var n=t;0<n;){var o=31-st(n),r=1<<o;i[o]=-1,n&=~r}a!==0&&Ml(e,a,t)}function No(){return(ce&6)===0?(gn(0),!1):!0}function _s(){if(ee!==null){if(fe===0)var e=ee.return;else e=ee,Pt=_a=null,es(e),hi=null,Xi=0,e=ee;for(;e!==null;)Xu(e.alternate,e),e=e.return;ee=null}}function Ti(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Ym(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Zt=0,_s(),ve=e,ee=a=zt(e.current,null),ae=t,fe=0,pt=null,ma=!1,wi=Bi(e,t),Us=!1,Ai=ft=Os=Qa=ha=Ne=0,at=mn=null,Bs=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var n=31-st(i),o=1<<n;t|=e[n],i&=~o}return Xt=t,Qn(),a}function xd(e,t){W=null,x.H=rn,t===mi||t===to?(t=Ic(),fe=3):t===Fr?(t=Ic(),fe=4):fe=t===gs?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,pt=t,ee===null&&(Ne=1,go(e,bt(t,e.current)))}function wd(){var e=ut.current;return e===null?!0:(ae&4194048)===ae?At===null:(ae&62914560)===ae||(ae&536870912)!==0?e===At:!1}function Ad(){var e=x.H;return x.H=rn,e===null?rn:e}function Cd(){var e=x.A;return x.A=Nm,e}function Eo(){Ne=4,ma||(ae&4194048)!==ae&&ut.current!==null||(wi=!0),(ha&134217727)===0&&(Qa&134217727)===0||ve===null||va(ve,ae,ft,!1)}function zs(e,t,a){var i=ce;ce|=2;var n=Ad(),o=Cd();(ve!==e||ae!==t)&&(ko=null,Ti(e,t)),t=!1;var r=Ne;e:do try{if(fe!==0&&ee!==null){var s=ee,c=pt;switch(fe){case 8:_s(),r=6;break e;case 3:case 2:case 9:case 6:ut.current===null&&(t=!0);var g=fe;if(fe=0,pt=null,ki(e,s,c,g),a&&wi){r=0;break e}break;default:g=fe,fe=0,pt=null,ki(e,s,c,g)}}Mm(),r=Ne;break}catch(S){xd(e,S)}while(!0);return t&&e.shellSuspendCounter++,Pt=_a=null,ce=i,x.H=n,x.A=o,ee===null&&(ve=null,ae=0,Qn()),r}function Mm(){for(;ee!==null;)Td(ee)}function Dm(e,t){var a=ce;ce|=2;var i=Ad(),n=Cd();ve!==e||ae!==t?(ko=null,To=ot()+500,Ti(e,t)):wi=Bi(e,t);e:do try{if(fe!==0&&ee!==null){t=ee;var o=pt;t:switch(fe){case 1:fe=0,pt=null,ki(e,t,o,1);break;case 2:case 9:if(jc(o)){fe=0,pt=null,kd(t);break}t=function(){fe!==2&&fe!==9||ve!==e||(fe=7),Bt(e)},o.then(t,t);break e;case 3:fe=7;break e;case 4:fe=5;break e;case 7:jc(o)?(fe=0,pt=null,kd(t)):(fe=0,pt=null,ki(e,t,o,7));break;case 5:var r=null;switch(ee.tag){case 26:r=ee.memoizedState;case 5:case 27:var s=ee;if(r?dp(r):s.stateNode.complete){fe=0,pt=null;var c=s.sibling;if(c!==null)ee=c;else{var g=s.return;g!==null?(ee=g,Ro(g)):ee=null}break t}}fe=0,pt=null,ki(e,t,o,5);break;case 6:fe=0,pt=null,ki(e,t,o,6);break;case 8:_s(),Ne=6;break e;default:throw Error(u(462))}}Um();break}catch(S){xd(e,S)}while(!0);return Pt=_a=null,x.H=i,x.A=n,ce=a,ee!==null?0:(ve=null,ae=0,Qn(),Ne)}function Um(){for(;ee!==null&&!ef();)Td(ee)}function Td(e){var t=Yu(e.alternate,e,Xt);e.memoizedProps=e.pendingProps,t===null?Ro(e):ee=t}function kd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=qu(a,t,t.pendingProps,t.type,void 0,ae);break;case 11:t=qu(a,t,t.pendingProps,t.type.render,t.ref,ae);break;case 5:es(t);default:Xu(a,t),t=ee=Cc(t,Xt),t=Yu(a,t,Xt)}e.memoizedProps=e.pendingProps,t===null?Ro(e):ee=t}function ki(e,t,a,i){Pt=_a=null,es(t),hi=null,Xi=0;var n=t.return;try{if(Sm(e,n,t,a,ae)){Ne=1,go(e,bt(a,e.current)),ee=null;return}}catch(o){if(n!==null)throw ee=n,o;Ne=1,go(e,bt(a,e.current)),ee=null;return}t.flags&32768?(ne||i===1?e=!0:wi||(ae&536870912)!==0?e=!1:(ma=e=!0,(i===2||i===9||i===3||i===6)&&(i=ut.current,i!==null&&i.tag===13&&(i.flags|=16384))),Nd(t,e)):Ro(t)}function Ro(e){var t=e;do{if((t.flags&32768)!==0){Nd(t,ma);return}e=t.return;var a=Am(t.alternate,t,Xt);if(a!==null){ee=a;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);Ne===0&&(Ne=5)}function Nd(e,t){do{var a=Cm(e.alternate,e);if(a!==null){a.flags&=32767,ee=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=a}while(e!==null);Ne=6,ee=null}function Ed(e,t,a,i,n,o,r,s,c){e.cancelPendingCommit=null;do Mo();while(je!==0);if((ce&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));if(o=t.lanes|t.childLanes,o|=Nr,df(e,a,o,r,s,c),e===ve&&(ee=ve=null,ae=0),Ci=t,ya=e,Zt=a,js=o,Ls=n,yd=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Lm(Dn,function(){return Od(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=x.T,x.T=null,n=B.p,B.p=2,r=ce,ce|=4;try{Tm(e,t,a)}finally{ce=r,B.p=n,x.T=i}}je=1,Rd(),Md(),Dd()}}function Rd(){if(je===1){je=0;var e=ya,t=Ci,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=x.T,x.T=null;var i=B.p;B.p=2;var n=ce;ce|=4;try{cd(t,e);var o=Xs,r=hc(e.containerInfo),s=o.focusedElem,c=o.selectionRange;if(r!==s&&s&&s.ownerDocument&&mc(s.ownerDocument.documentElement,s)){if(c!==null&&wr(s)){var g=c.start,S=c.end;if(S===void 0&&(S=g),"selectionStart"in s)s.selectionStart=g,s.selectionEnd=Math.min(S,s.value.length);else{var k=s.ownerDocument||document,y=k&&k.defaultView||window;if(y.getSelection){var v=y.getSelection(),z=s.textContent.length,G=Math.min(c.start,z),ye=c.end===void 0?G:Math.min(c.end,z);!v.extend&&G>ye&&(r=ye,ye=G,G=r);var m=fc(s,G),p=fc(s,ye);if(m&&p&&(v.rangeCount!==1||v.anchorNode!==m.node||v.anchorOffset!==m.offset||v.focusNode!==p.node||v.focusOffset!==p.offset)){var h=k.createRange();h.setStart(m.node,m.offset),v.removeAllRanges(),G>ye?(v.addRange(h),v.extend(p.node,p.offset)):(h.setEnd(p.node,p.offset),v.addRange(h))}}}}for(k=[],v=s;v=v.parentNode;)v.nodeType===1&&k.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<k.length;s++){var A=k[s];A.element.scrollLeft=A.left,A.element.scrollTop=A.top}}Fo=!!Ws,Xs=Ws=null}finally{ce=n,B.p=i,x.T=a}}e.current=t,je=2}}function Md(){if(je===2){je=0;var e=ya,t=Ci,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=x.T,x.T=null;var i=B.p;B.p=2;var n=ce;ce|=4;try{nd(e,t.alternate,t)}finally{ce=n,B.p=i,x.T=a}}je=3}}function Dd(){if(je===4||je===3){je=0,tf();var e=ya,t=Ci,a=Zt,i=yd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?je=5:(je=0,Ci=ya=null,Ud(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ga=null),ir(a),t=t.stateNode,rt&&typeof rt.onCommitFiberRoot=="function")try{rt.onCommitFiberRoot(Oi,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=x.T,n=B.p,B.p=2,x.T=null;try{for(var o=e.onRecoverableError,r=0;r<i.length;r++){var s=i[r];o(s.value,{componentStack:s.stack})}}finally{x.T=t,B.p=n}}(Zt&3)!==0&&Mo(),Bt(e),n=e.pendingLanes,(a&261930)!==0&&(n&42)!==0?e===Is?hn++:(hn=0,Is=e):hn=0,gn(0)}}function Ud(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Yi(t)))}function Mo(){return Rd(),Md(),Dd(),Od()}function Od(){if(je!==5)return!1;var e=ya,t=js;js=0;var a=ir(Zt),i=x.T,n=B.p;try{B.p=32>a?32:a,x.T=null,a=Ls,Ls=null;var o=ya,r=Zt;if(je=0,Ci=ya=null,Zt=0,(ce&6)!==0)throw Error(u(331));var s=ce;if(ce|=4,md(o.current),dd(o,o.current,r,a),ce=s,gn(0,!1),rt&&typeof rt.onPostCommitFiberRoot=="function")try{rt.onPostCommitFiberRoot(Oi,o)}catch{}return!0}finally{B.p=n,x.T=i,Ud(e,t)}}function Bd(e,t,a){t=bt(a,t),t=hs(e.stateNode,t,2),e=ua(e,t,2),e!==null&&(ji(e,2),Bt(e))}function me(e,t,a){if(e.tag===3)Bd(e,e,a);else for(;t!==null;){if(t.tag===3){Bd(t,e,a);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ga===null||!ga.has(i))){e=bt(a,e),a=ju(2),i=ua(t,a,2),i!==null&&(Lu(a,i,t,e),ji(i,2),Bt(i));break}}t=t.return}}function Hs(e,t,a){var i=e.pingCache;if(i===null){i=e.pingCache=new Em;var n=new Set;i.set(t,n)}else n=i.get(t),n===void 0&&(n=new Set,i.set(t,n));n.has(a)||(Us=!0,n.add(a),e=Om.bind(null,e,t,a),t.then(e,e))}function Om(e,t,a){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,ve===e&&(ae&a)===a&&(Ne===4||Ne===3&&(ae&62914560)===ae&&300>ot()-Co?(ce&2)===0&&Ti(e,0):Os|=a,Ai===ae&&(Ai=0)),Bt(e)}function jd(e,t){t===0&&(t=Rl()),e=ja(e,t),e!==null&&(ji(e,t),Bt(e))}function Bm(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),jd(e,a)}function jm(e,t){var a=0;switch(e.tag){case 31:case 13:var i=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(u(314))}i!==null&&i.delete(t),jd(e,a)}function Lm(e,t){return $o(e,t)}var Do=null,Ni=null,Ps=!1,Uo=!1,Fs=!1,ba=0;function Bt(e){e!==Ni&&e.next===null&&(Ni===null?Do=Ni=e:Ni=Ni.next=e),Uo=!0,Ps||(Ps=!0,_m())}function gn(e,t){if(!Fs&&Uo){Fs=!0;do for(var a=!1,i=Do;i!==null;){if(e!==0){var n=i.pendingLanes;if(n===0)var o=0;else{var r=i.suspendedLanes,s=i.pingedLanes;o=(1<<31-st(42|e)+1)-1,o&=n&~(r&~s),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(a=!0,zd(i,o))}else o=ae,o=jn(i,i===ve?o:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(o&3)===0||Bi(i,o)||(a=!0,zd(i,o));i=i.next}while(a);Fs=!1}}function Im(){Ld()}function Ld(){Uo=Ps=!1;var e=0;ba!==0&&Jm()&&(e=ba);for(var t=ot(),a=null,i=Do;i!==null;){var n=i.next,o=Id(i,t);o===0?(i.next=null,a===null?Do=n:a.next=n,n===null&&(Ni=a)):(a=i,(e!==0||(o&3)!==0)&&(Uo=!0)),i=n}je!==0&&je!==5||gn(e),ba!==0&&(ba=0)}function Id(e,t){for(var a=e.suspendedLanes,i=e.pingedLanes,n=e.expirationTimes,o=e.pendingLanes&-62914561;0<o;){var r=31-st(o),s=1<<r,c=n[r];c===-1?((s&a)===0||(s&i)!==0)&&(n[r]=uf(s,t)):c<=t&&(e.expiredLanes|=s),o&=~s}if(t=ve,a=ae,a=jn(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,a===0||e===t&&(fe===2||fe===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&er(i),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Bi(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(i!==null&&er(i),ir(a)){case 2:case 8:a=Nl;break;case 32:a=Dn;break;case 268435456:a=El;break;default:a=Dn}return i=_d.bind(null,e),a=$o(a,i),e.callbackPriority=t,e.callbackNode=a,t}return i!==null&&i!==null&&er(i),e.callbackPriority=2,e.callbackNode=null,2}function _d(e,t){if(je!==0&&je!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Mo()&&e.callbackNode!==a)return null;var i=ae;return i=jn(e,e===ve?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(bd(e,i,t),Id(e,ot()),e.callbackNode!=null&&e.callbackNode===a?_d.bind(null,e):null)}function zd(e,t){if(Mo())return null;bd(e,t,!0)}function _m(){Wm(function(){(ce&6)!==0?$o(kl,Im):Ld()})}function qs(){if(ba===0){var e=pi;e===0&&(e=Un,Un<<=1,(Un&261888)===0&&(Un=256)),ba=e}return ba}function Hd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:zn(""+e)}function Pd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function zm(e,t,a,i,n){if(t==="submit"&&a&&a.stateNode===n){var o=Hd((n[Xe]||null).action),r=i.submitter;r&&(t=(t=r[Xe]||null)?Hd(t.formAction):r.getAttribute("formAction"),t!==null&&(o=t,r=null));var s=new qn("action","action",null,i,n);e.push({event:s,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ba!==0){var c=r?Pd(n,r):new FormData(n);cs(a,{pending:!0,data:c,method:n.method,action:o},null,c)}}else typeof o=="function"&&(s.preventDefault(),c=r?Pd(n,r):new FormData(n),cs(a,{pending:!0,data:c,method:n.method,action:o},o,c))},currentTarget:n}]})}}for(var Vs=0;Vs<kr.length;Vs++){var Gs=kr[Vs],Hm=Gs.toLowerCase(),Pm=Gs[0].toUpperCase()+Gs.slice(1);Nt(Hm,"on"+Pm)}Nt(vc,"onAnimationEnd"),Nt(bc,"onAnimationIteration"),Nt(Sc,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(im,"onTransitionRun"),Nt(nm,"onTransitionStart"),Nt(om,"onTransitionCancel"),Nt(xc,"onTransitionEnd"),Za("onMouseEnter",["mouseout","mouseover"]),Za("onMouseLeave",["mouseout","mouseover"]),Za("onPointerEnter",["pointerout","pointerover"]),Za("onPointerLeave",["pointerout","pointerover"]),Da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Da("onBeforeInput",["compositionend","keypress","textInput","paste"]),Da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fm=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yn));function Fd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var i=e[a],n=i.event;i=i.listeners;e:{var o=void 0;if(t)for(var r=i.length-1;0<=r;r--){var s=i[r],c=s.instance,g=s.currentTarget;if(s=s.listener,c!==o&&n.isPropagationStopped())break e;o=s,n.currentTarget=g;try{o(n)}catch(S){Kn(S)}n.currentTarget=null,o=c}else for(r=0;r<i.length;r++){if(s=i[r],c=s.instance,g=s.currentTarget,s=s.listener,c!==o&&n.isPropagationStopped())break e;o=s,n.currentTarget=g;try{o(n)}catch(S){Kn(S)}n.currentTarget=null,o=c}}}}function te(e,t){var a=t[nr];a===void 0&&(a=t[nr]=new Set);var i=e+"__bubble";a.has(i)||(qd(t,e,2,!1),a.add(i))}function Ks(e,t,a){var i=0;t&&(i|=4),qd(a,e,i,t)}var Oo="_reactListening"+Math.random().toString(36).slice(2);function Qs(e){if(!e[Oo]){e[Oo]=!0,Ll.forEach(function(a){a!=="selectionchange"&&(Fm.has(a)||Ks(a,!1,e),Ks(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Oo]||(t[Oo]=!0,Ks("selectionchange",!1,t))}}function qd(e,t,a,i){switch(vp(t)){case 2:var n=gh;break;case 8:n=yh;break;default:n=ll}a=n.bind(null,t,a,e),n=void 0,!fr||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),i?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function Js(e,t,a,i,n){var o=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var s=i.stateNode.containerInfo;if(s===n)break;if(r===4)for(r=i.return;r!==null;){var c=r.tag;if((c===3||c===4)&&r.stateNode.containerInfo===n)return;r=r.return}for(;s!==null;){if(r=Ya(s),r===null)return;if(c=r.tag,c===5||c===6||c===26||c===27){i=o=r;continue e}s=s.parentNode}}i=i.return}Jl(function(){var g=o,S=dr(a),k=[];e:{var y=wc.get(e);if(y!==void 0){var v=qn,z=e;switch(e){case"keypress":if(Pn(a)===0)break e;case"keydown":case"keyup":v=jf;break;case"focusin":z="focus",v=yr;break;case"focusout":z="blur",v=yr;break;case"beforeblur":case"afterblur":v=yr;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Xl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Af;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=_f;break;case vc:case bc:case Sc:v=kf;break;case xc:v=Hf;break;case"scroll":case"scrollend":v=xf;break;case"wheel":v=Ff;break;case"copy":case"cut":case"paste":v=Ef;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=$l;break;case"toggle":case"beforetoggle":v=Vf}var G=(t&4)!==0,ye=!G&&(e==="scroll"||e==="scrollend"),m=G?y!==null?y+"Capture":null:y;G=[];for(var p=g,h;p!==null;){var A=p;if(h=A.stateNode,A=A.tag,A!==5&&A!==26&&A!==27||h===null||m===null||(A=_i(p,m),A!=null&&G.push(vn(p,A,h))),ye)break;p=p.return}0<G.length&&(y=new v(y,z,null,a,S),k.push({event:y,listeners:G}))}}if((t&7)===0){e:{if(y=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",y&&a!==ur&&(z=a.relatedTarget||a.fromElement)&&(Ya(z)||z[Ja]))break e;if((v||y)&&(y=S.window===S?S:(y=S.ownerDocument)?y.defaultView||y.parentWindow:window,v?(z=a.relatedTarget||a.toElement,v=g,z=z?Ya(z):null,z!==null&&(ye=E(z),G=z.tag,z!==ye||G!==5&&G!==27&&G!==6)&&(z=null)):(v=null,z=g),v!==z)){if(G=Xl,A="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(G=$l,A="onPointerLeave",m="onPointerEnter",p="pointer"),ye=v==null?y:Ii(v),h=z==null?y:Ii(z),y=new G(A,p+"leave",v,a,S),y.target=ye,y.relatedTarget=h,A=null,Ya(S)===g&&(G=new G(m,p+"enter",z,a,S),G.target=h,G.relatedTarget=ye,A=G),ye=A,v&&z)t:{for(G=qm,m=v,p=z,h=0,A=m;A;A=G(A))h++;A=0;for(var V=p;V;V=G(V))A++;for(;0<h-A;)m=G(m),h--;for(;0<A-h;)p=G(p),A--;for(;h--;){if(m===p||p!==null&&m===p.alternate){G=m;break t}m=G(m),p=G(p)}G=null}else G=null;v!==null&&Vd(k,y,v,G,!1),z!==null&&ye!==null&&Vd(k,ye,z,G,!0)}}e:{if(y=g?Ii(g):window,v=y.nodeName&&y.nodeName.toLowerCase(),v==="select"||v==="input"&&y.type==="file")var re=sc;else if(oc(y))if(lc)re=em;else{re=Zf;var F=Xf}else v=y.nodeName,!v||v.toLowerCase()!=="input"||y.type!=="checkbox"&&y.type!=="radio"?g&&cr(g.elementType)&&(re=sc):re=$f;if(re&&(re=re(e,g))){rc(k,re,a,S);break e}F&&F(e,y,g),e==="focusout"&&g&&y.type==="number"&&g.memoizedProps.value!=null&&lr(y,"number",y.value)}switch(F=g?Ii(g):window,e){case"focusin":(oc(F)||F.contentEditable==="true")&&(ni=F,Ar=g,Ki=null);break;case"focusout":Ki=Ar=ni=null;break;case"mousedown":Cr=!0;break;case"contextmenu":case"mouseup":case"dragend":Cr=!1,gc(k,a,S);break;case"selectionchange":if(am)break;case"keydown":case"keyup":gc(k,a,S)}var X;if(br)e:{switch(e){case"compositionstart":var ie="onCompositionStart";break e;case"compositionend":ie="onCompositionEnd";break e;case"compositionupdate":ie="onCompositionUpdate";break e}ie=void 0}else ii?ic(e,a)&&(ie="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ie="onCompositionStart");ie&&(ec&&a.locale!=="ko"&&(ii||ie!=="onCompositionStart"?ie==="onCompositionEnd"&&ii&&(X=Yl()):(ia=S,mr="value"in ia?ia.value:ia.textContent,ii=!0)),F=Bo(g,ie),0<F.length&&(ie=new Zl(ie,e,null,a,S),k.push({event:ie,listeners:F}),X?ie.data=X:(X=nc(a),X!==null&&(ie.data=X)))),(X=Kf?Qf(e,a):Jf(e,a))&&(ie=Bo(g,"onBeforeInput"),0<ie.length&&(F=new Zl("onBeforeInput","beforeinput",null,a,S),k.push({event:F,listeners:ie}),F.data=X)),zm(k,e,g,a,S)}Fd(k,t)})}function vn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Bo(e,t){for(var a=t+"Capture",i=[];e!==null;){var n=e,o=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||o===null||(n=_i(e,a),n!=null&&i.unshift(vn(e,n,o)),n=_i(e,t),n!=null&&i.push(vn(e,n,o))),e.tag===3)return i;e=e.return}return[]}function qm(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Vd(e,t,a,i,n){for(var o=t._reactName,r=[];a!==null&&a!==i;){var s=a,c=s.alternate,g=s.stateNode;if(s=s.tag,c!==null&&c===i)break;s!==5&&s!==26&&s!==27||g===null||(c=g,n?(g=_i(a,o),g!=null&&r.unshift(vn(a,g,c))):n||(g=_i(a,o),g!=null&&r.push(vn(a,g,c)))),a=a.return}r.length!==0&&e.push({event:t,listeners:r})}var Vm=/\r\n?/g,Gm=/\u0000|\uFFFD/g;function Gd(e){return(typeof e=="string"?e:""+e).replace(Vm,`
`).replace(Gm,"")}function Kd(e,t){return t=Gd(t),Gd(e)===t}function ge(e,t,a,i,n,o){switch(a){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ei(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ei(e,""+i);break;case"className":In(e,"class",i);break;case"tabIndex":In(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":In(e,a,i);break;case"style":Kl(e,i,o);break;case"data":if(t!=="object"){In(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(a);break}i=zn(""+i),e.setAttribute(a,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof o=="function"&&(a==="formAction"?(t!=="input"&&ge(e,t,"name",n.name,n,null),ge(e,t,"formEncType",n.formEncType,n,null),ge(e,t,"formMethod",n.formMethod,n,null),ge(e,t,"formTarget",n.formTarget,n,null)):(ge(e,t,"encType",n.encType,n,null),ge(e,t,"method",n.method,n,null),ge(e,t,"target",n.target,n,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(a);break}i=zn(""+i),e.setAttribute(a,i);break;case"onClick":i!=null&&(e.onclick=It);break;case"onScroll":i!=null&&te("scroll",e);break;case"onScrollEnd":i!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(u(61));if(a=i.__html,a!=null){if(n.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}a=zn(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,""+i):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":i===!0?e.setAttribute(a,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,i):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(a,i):e.removeAttribute(a);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(a):e.setAttribute(a,i);break;case"popover":te("beforetoggle",e),te("toggle",e),Ln(e,"popover",i);break;case"xlinkActuate":Lt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Lt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Lt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Lt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Lt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Lt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Lt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Lt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Lt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ln(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=bf.get(a)||a,Ln(e,a,i))}}function Ys(e,t,a,i,n,o){switch(a){case"style":Kl(e,i,o);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(u(61));if(a=i.__html,a!=null){if(n.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"children":typeof i=="string"?ei(e,i):(typeof i=="number"||typeof i=="bigint")&&ei(e,""+i);break;case"onScroll":i!=null&&te("scroll",e);break;case"onScrollEnd":i!=null&&te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=It);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Il.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),o=e[Xe]||null,o=o!=null?o[a]:null,typeof o=="function"&&e.removeEventListener(t,o,n),typeof i=="function")){typeof o!="function"&&o!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,i,n);break e}a in e?e[a]=i:i===!0?e.setAttribute(a,""):Ln(e,a,i)}}}function qe(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var i=!1,n=!1,o;for(o in a)if(a.hasOwnProperty(o)){var r=a[o];if(r!=null)switch(o){case"src":i=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:ge(e,t,o,r,a,null)}}n&&ge(e,t,"srcSet",a.srcSet,a,null),i&&ge(e,t,"src",a.src,a,null);return;case"input":te("invalid",e);var s=o=r=n=null,c=null,g=null;for(i in a)if(a.hasOwnProperty(i)){var S=a[i];if(S!=null)switch(i){case"name":n=S;break;case"type":r=S;break;case"checked":c=S;break;case"defaultChecked":g=S;break;case"value":o=S;break;case"defaultValue":s=S;break;case"children":case"dangerouslySetInnerHTML":if(S!=null)throw Error(u(137,t));break;default:ge(e,t,i,S,a,null)}}Fl(e,o,s,c,g,r,n,!1);return;case"select":te("invalid",e),i=r=o=null;for(n in a)if(a.hasOwnProperty(n)&&(s=a[n],s!=null))switch(n){case"value":o=s;break;case"defaultValue":r=s;break;case"multiple":i=s;default:ge(e,t,n,s,a,null)}t=o,a=r,e.multiple=!!i,t!=null?$a(e,!!i,t,!1):a!=null&&$a(e,!!i,a,!0);return;case"textarea":te("invalid",e),o=n=i=null;for(r in a)if(a.hasOwnProperty(r)&&(s=a[r],s!=null))switch(r){case"value":i=s;break;case"defaultValue":n=s;break;case"children":o=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(u(91));break;default:ge(e,t,r,s,a,null)}Vl(e,i,n,o);return;case"option":for(c in a)a.hasOwnProperty(c)&&(i=a[c],i!=null)&&(c==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":ge(e,t,c,i,a,null));return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(i=0;i<yn.length;i++)te(yn[i],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in a)if(a.hasOwnProperty(g)&&(i=a[g],i!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:ge(e,t,g,i,a,null)}return;default:if(cr(t)){for(S in a)a.hasOwnProperty(S)&&(i=a[S],i!==void 0&&Ys(e,t,S,i,a,void 0));return}}for(s in a)a.hasOwnProperty(s)&&(i=a[s],i!=null&&ge(e,t,s,i,a,null))}function Km(e,t,a,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,o=null,r=null,s=null,c=null,g=null,S=null;for(v in a){var k=a[v];if(a.hasOwnProperty(v)&&k!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":c=k;default:i.hasOwnProperty(v)||ge(e,t,v,null,i,k)}}for(var y in i){var v=i[y];if(k=a[y],i.hasOwnProperty(y)&&(v!=null||k!=null))switch(y){case"type":o=v;break;case"name":n=v;break;case"checked":g=v;break;case"defaultChecked":S=v;break;case"value":r=v;break;case"defaultValue":s=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(u(137,t));break;default:v!==k&&ge(e,t,y,v,i,k)}}sr(e,r,s,c,g,S,o,n);return;case"select":v=r=s=y=null;for(o in a)if(c=a[o],a.hasOwnProperty(o)&&c!=null)switch(o){case"value":break;case"multiple":v=c;default:i.hasOwnProperty(o)||ge(e,t,o,null,i,c)}for(n in i)if(o=i[n],c=a[n],i.hasOwnProperty(n)&&(o!=null||c!=null))switch(n){case"value":y=o;break;case"defaultValue":s=o;break;case"multiple":r=o;default:o!==c&&ge(e,t,n,o,i,c)}t=s,a=r,i=v,y!=null?$a(e,!!a,y,!1):!!i!=!!a&&(t!=null?$a(e,!!a,t,!0):$a(e,!!a,a?[]:"",!1));return;case"textarea":v=y=null;for(s in a)if(n=a[s],a.hasOwnProperty(s)&&n!=null&&!i.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:ge(e,t,s,null,i,n)}for(r in i)if(n=i[r],o=a[r],i.hasOwnProperty(r)&&(n!=null||o!=null))switch(r){case"value":y=n;break;case"defaultValue":v=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(u(91));break;default:n!==o&&ge(e,t,r,n,i,o)}ql(e,y,v);return;case"option":for(var z in a)y=a[z],a.hasOwnProperty(z)&&y!=null&&!i.hasOwnProperty(z)&&(z==="selected"?e.selected=!1:ge(e,t,z,null,i,y));for(c in i)y=i[c],v=a[c],i.hasOwnProperty(c)&&y!==v&&(y!=null||v!=null)&&(c==="selected"?e.selected=y&&typeof y!="function"&&typeof y!="symbol":ge(e,t,c,y,i,v));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var G in a)y=a[G],a.hasOwnProperty(G)&&y!=null&&!i.hasOwnProperty(G)&&ge(e,t,G,null,i,y);for(g in i)if(y=i[g],v=a[g],i.hasOwnProperty(g)&&y!==v&&(y!=null||v!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(u(137,t));break;default:ge(e,t,g,y,i,v)}return;default:if(cr(t)){for(var ye in a)y=a[ye],a.hasOwnProperty(ye)&&y!==void 0&&!i.hasOwnProperty(ye)&&Ys(e,t,ye,void 0,i,y);for(S in i)y=i[S],v=a[S],!i.hasOwnProperty(S)||y===v||y===void 0&&v===void 0||Ys(e,t,S,y,i,v);return}}for(var m in a)y=a[m],a.hasOwnProperty(m)&&y!=null&&!i.hasOwnProperty(m)&&ge(e,t,m,null,i,y);for(k in i)y=i[k],v=a[k],!i.hasOwnProperty(k)||y===v||y==null&&v==null||ge(e,t,k,y,i,v)}function Qd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Qm(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),i=0;i<a.length;i++){var n=a[i],o=n.transferSize,r=n.initiatorType,s=n.duration;if(o&&s&&Qd(r)){for(r=0,s=n.responseEnd,i+=1;i<a.length;i++){var c=a[i],g=c.startTime;if(g>s)break;var S=c.transferSize,k=c.initiatorType;S&&Qd(k)&&(c=c.responseEnd,r+=S*(c<s?1:(s-g)/(c-g)))}if(--i,t+=8*(o+r)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ws=null,Xs=null;function jo(e){return e.nodeType===9?e:e.ownerDocument}function Jd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Zs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $s=null;function Jm(){var e=window.event;return e&&e.type==="popstate"?e===$s?!1:($s=e,!0):($s=null,!1)}var Wd=typeof setTimeout=="function"?setTimeout:void 0,Ym=typeof clearTimeout=="function"?clearTimeout:void 0,Xd=typeof Promise=="function"?Promise:void 0,Wm=typeof queueMicrotask=="function"?queueMicrotask:typeof Xd<"u"?function(e){return Xd.resolve(null).then(e).catch(Xm)}:Wd;function Xm(e){setTimeout(function(){throw e})}function Sa(e){return e==="head"}function Zd(e,t){var a=t,i=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(i===0){e.removeChild(n),Di(t);return}i--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")i++;else if(a==="html")bn(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,bn(a);for(var o=a.firstChild;o;){var r=o.nextSibling,s=o.nodeName;o[Li]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&o.rel.toLowerCase()==="stylesheet"||a.removeChild(o),o=r}}else a==="body"&&bn(e.ownerDocument.body);a=n}while(a);Di(t)}function $d(e,t){var a=e;e=0;do{var i=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),i&&i.nodeType===8)if(a=i.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=i}while(a)}function el(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":el(a),or(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Zm(e,t,a,i){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Li])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(o=e.getAttribute("rel"),o==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(o!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(o=e.getAttribute("src"),(o!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var o=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===o)return e}else return e;if(e=Ct(e.nextSibling),e===null)break}return null}function $m(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ct(e.nextSibling),e===null))return null;return e}function ep(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ct(e.nextSibling),e===null))return null;return e}function tl(e){return e.data==="$?"||e.data==="$~"}function al(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function eh(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var i=function(){t(),a.removeEventListener("DOMContentLoaded",i)};a.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ct(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var il=null;function tp(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Ct(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function ap(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function ip(e,t,a){switch(t=jo(a),e){case"html":if(e=t.documentElement,!e)throw Error(u(452));return e;case"head":if(e=t.head,!e)throw Error(u(453));return e;case"body":if(e=t.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function bn(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);or(e)}var Tt=new Map,np=new Set;function Lo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var $t=B.d;B.d={f:th,r:ah,D:ih,C:nh,L:oh,m:rh,X:lh,S:sh,M:ch};function th(){var e=$t.f(),t=No();return e||t}function ah(e){var t=Wa(e);t!==null&&t.tag===5&&t.type==="form"?xu(t):$t.r(e)}var Ei=typeof document>"u"?null:document;function op(e,t,a){var i=Ei;if(i&&typeof t=="string"&&t){var n=yt(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),np.has(n)||(np.add(n),e={rel:e,crossOrigin:a,href:t},i.querySelector(n)===null&&(t=i.createElement("link"),qe(t,"link",e),Le(t),i.head.appendChild(t)))}}function ih(e){$t.D(e),op("dns-prefetch",e,null)}function nh(e,t){$t.C(e,t),op("preconnect",e,t)}function oh(e,t,a){$t.L(e,t,a);var i=Ei;if(i&&e&&t){var n='link[rel="preload"][as="'+yt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+yt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+yt(a.imageSizes)+'"]')):n+='[href="'+yt(e)+'"]';var o=n;switch(t){case"style":o=Ri(e);break;case"script":o=Mi(e)}Tt.has(o)||(e=_({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Tt.set(o,e),i.querySelector(n)!==null||t==="style"&&i.querySelector(Sn(o))||t==="script"&&i.querySelector(xn(o))||(t=i.createElement("link"),qe(t,"link",e),Le(t),i.head.appendChild(t)))}}function rh(e,t){$t.m(e,t);var a=Ei;if(a&&e){var i=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+yt(i)+'"][href="'+yt(e)+'"]',o=n;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=Mi(e)}if(!Tt.has(o)&&(e=_({rel:"modulepreload",href:e},t),Tt.set(o,e),a.querySelector(n)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(xn(o)))return}i=a.createElement("link"),qe(i,"link",e),Le(i),a.head.appendChild(i)}}}function sh(e,t,a){$t.S(e,t,a);var i=Ei;if(i&&e){var n=Xa(i).hoistableStyles,o=Ri(e);t=t||"default";var r=n.get(o);if(!r){var s={loading:0,preload:null};if(r=i.querySelector(Sn(o)))s.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Tt.get(o))&&nl(e,a);var c=r=i.createElement("link");Le(c),qe(c,"link",e),c._p=new Promise(function(g,S){c.onload=g,c.onerror=S}),c.addEventListener("load",function(){s.loading|=1}),c.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Io(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:s},n.set(o,r)}}}function lh(e,t){$t.X(e,t);var a=Ei;if(a&&e){var i=Xa(a).hoistableScripts,n=Mi(e),o=i.get(n);o||(o=a.querySelector(xn(n)),o||(e=_({src:e,async:!0},t),(t=Tt.get(n))&&ol(e,t),o=a.createElement("script"),Le(o),qe(o,"link",e),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},i.set(n,o))}}function ch(e,t){$t.M(e,t);var a=Ei;if(a&&e){var i=Xa(a).hoistableScripts,n=Mi(e),o=i.get(n);o||(o=a.querySelector(xn(n)),o||(e=_({src:e,async:!0,type:"module"},t),(t=Tt.get(n))&&ol(e,t),o=a.createElement("script"),Le(o),qe(o,"link",e),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},i.set(n,o))}}function rp(e,t,a,i){var n=(n=$.current)?Lo(n):null;if(!n)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Ri(a.href),a=Xa(n).hoistableStyles,i=a.get(t),i||(i={type:"style",instance:null,count:0,state:null},a.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Ri(a.href);var o=Xa(n).hoistableStyles,r=o.get(e);if(r||(n=n.ownerDocument||n,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},o.set(e,r),(o=n.querySelector(Sn(e)))&&!o._p&&(r.instance=o,r.state.loading=5),Tt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Tt.set(e,a),o||uh(n,e,a,r.state))),t&&i===null)throw Error(u(528,""));return r}if(t&&i!==null)throw Error(u(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Mi(a),a=Xa(n).hoistableScripts,i=a.get(t),i||(i={type:"script",instance:null,count:0,state:null},a.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function Ri(e){return'href="'+yt(e)+'"'}function Sn(e){return'link[rel="stylesheet"]['+e+"]"}function sp(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function uh(e,t,a,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),qe(t,"link",a),Le(t),e.head.appendChild(t))}function Mi(e){return'[src="'+yt(e)+'"]'}function xn(e){return"script[async]"+e}function lp(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+yt(a.href)+'"]');if(i)return t.instance=i,Le(i),i;var n=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Le(i),qe(i,"style",n),Io(i,a.precedence,e),t.instance=i;case"stylesheet":n=Ri(a.href);var o=e.querySelector(Sn(n));if(o)return t.state.loading|=4,t.instance=o,Le(o),o;i=sp(a),(n=Tt.get(n))&&nl(i,n),o=(e.ownerDocument||e).createElement("link"),Le(o);var r=o;return r._p=new Promise(function(s,c){r.onload=s,r.onerror=c}),qe(o,"link",i),t.state.loading|=4,Io(o,a.precedence,e),t.instance=o;case"script":return o=Mi(a.src),(n=e.querySelector(xn(o)))?(t.instance=n,Le(n),n):(i=a,(n=Tt.get(o))&&(i=_({},a),ol(i,n)),e=e.ownerDocument||e,n=e.createElement("script"),Le(n),qe(n,"link",i),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(u(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Io(i,a.precedence,e));return t.instance}function Io(e,t,a){for(var i=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=i.length?i[i.length-1]:null,o=n,r=0;r<i.length;r++){var s=i[r];if(s.dataset.precedence===t)o=s;else if(o!==n)break}o?o.parentNode.insertBefore(e,o.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function nl(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ol(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var _o=null;function cp(e,t,a){if(_o===null){var i=new Map,n=_o=new Map;n.set(a,i)}else n=_o,i=n.get(a),i||(i=new Map,n.set(a,i));if(i.has(e))return i;for(i.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var o=a[n];if(!(o[Li]||o[ze]||e==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!=="http://www.w3.org/2000/svg"){var r=o.getAttribute(t)||"";r=e+r;var s=i.get(r);s?s.push(o):i.set(r,[o])}}return i}function up(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function dh(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function dp(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ph(e,t,a,i){if(a.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Ri(i.href),o=t.querySelector(Sn(n));if(o){t=o._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=zo.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=o,Le(o);return}o=t.ownerDocument||t,i=sp(i),(n=Tt.get(n))&&nl(i,n),o=o.createElement("link"),Le(o);var r=o;r._p=new Promise(function(s,c){r.onload=s,r.onerror=c}),qe(o,"link",i),a.instance=o}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=zo.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var rl=0;function fh(e,t){return e.stylesheets&&e.count===0&&Po(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var i=setTimeout(function(){if(e.stylesheets&&Po(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},6e4+t);0<e.imgBytes&&rl===0&&(rl=62500*Qm());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Po(e,e.stylesheets),e.unsuspend)){var o=e.unsuspend;e.unsuspend=null,o()}},(e.imgBytes>rl?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(n)}}:null}function zo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Po(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ho=null;function Po(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ho=new Map,t.forEach(mh,e),Ho=null,zo.call(e))}function mh(e,t){if(!(t.state.loading&4)){var a=Ho.get(e);if(a)var i=a.get(null);else{a=new Map,Ho.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<n.length;o++){var r=n[o];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(a.set(r.dataset.precedence,r),i=r)}i&&a.set(null,i)}n=t.instance,r=n.getAttribute("data-precedence"),o=a.get(r)||i,o===i&&a.set(null,n),a.set(r,n),this.count++,i=zo.bind(this),n.addEventListener("load",i),n.addEventListener("error",i),o?o.parentNode.insertBefore(n,o.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var wn={$$typeof:be,Provider:null,Consumer:null,_currentValue:w,_currentValue2:w,_threadCount:0};function hh(e,t,a,i,n,o,r,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tr(0),this.hiddenUpdates=tr(null),this.identifierPrefix=i,this.onUncaughtError=n,this.onCaughtError=o,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function pp(e,t,a,i,n,o,r,s,c,g,S,k){return e=new hh(e,t,a,r,c,g,S,k,s),t=1,o===!0&&(t|=24),o=ct(3,null,null,t),e.current=o,o.stateNode=e,t=zr(),t.refCount++,e.pooledCache=t,t.refCount++,o.memoizedState={element:i,isDehydrated:a,cache:t},qr(o),e}function fp(e){return e?(e=si,e):si}function mp(e,t,a,i,n,o){n=fp(n),i.context===null?i.context=n:i.pendingContext=n,i=ca(t),i.payload={element:a},o=o===void 0?null:o,o!==null&&(i.callback=o),a=ua(e,i,t),a!==null&&(it(a,e,t),$i(a,e,t))}function hp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function sl(e,t){hp(e,t),(e=e.alternate)&&hp(e,t)}function gp(e){if(e.tag===13||e.tag===31){var t=ja(e,67108864);t!==null&&it(t,e,67108864),sl(e,67108864)}}function yp(e){if(e.tag===13||e.tag===31){var t=mt();t=ar(t);var a=ja(e,t);a!==null&&it(a,e,t),sl(e,t)}}var Fo=!0;function gh(e,t,a,i){var n=x.T;x.T=null;var o=B.p;try{B.p=2,ll(e,t,a,i)}finally{B.p=o,x.T=n}}function yh(e,t,a,i){var n=x.T;x.T=null;var o=B.p;try{B.p=8,ll(e,t,a,i)}finally{B.p=o,x.T=n}}function ll(e,t,a,i){if(Fo){var n=cl(i);if(n===null)Js(e,t,i,qo,a),bp(e,i);else if(bh(n,e,t,a,i))i.stopPropagation();else if(bp(e,i),t&4&&-1<vh.indexOf(e)){for(;n!==null;){var o=Wa(n);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var r=Ma(o.pendingLanes);if(r!==0){var s=o;for(s.pendingLanes|=2,s.entangledLanes|=2;r;){var c=1<<31-st(r);s.entanglements[1]|=c,r&=~c}Bt(o),(ce&6)===0&&(To=ot()+500,gn(0))}}break;case 31:case 13:s=ja(o,2),s!==null&&it(s,o,2),No(),sl(o,2)}if(o=cl(i),o===null&&Js(e,t,i,qo,a),o===n)break;n=o}n!==null&&i.stopPropagation()}else Js(e,t,i,null,a)}}function cl(e){return e=dr(e),ul(e)}var qo=null;function ul(e){if(qo=null,e=Ya(e),e!==null){var t=E(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=H(t),e!==null)return e;e=null}else if(a===31){if(e=M(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return qo=e,null}function vp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(af()){case kl:return 2;case Nl:return 8;case Dn:case nf:return 32;case El:return 268435456;default:return 32}default:return 32}}var dl=!1,xa=null,wa=null,Aa=null,An=new Map,Cn=new Map,Ca=[],vh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function bp(e,t){switch(e){case"focusin":case"focusout":xa=null;break;case"dragenter":case"dragleave":wa=null;break;case"mouseover":case"mouseout":Aa=null;break;case"pointerover":case"pointerout":An.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cn.delete(t.pointerId)}}function Tn(e,t,a,i,n,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:a,eventSystemFlags:i,nativeEvent:o,targetContainers:[n]},t!==null&&(t=Wa(t),t!==null&&gp(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function bh(e,t,a,i,n){switch(t){case"focusin":return xa=Tn(xa,e,t,a,i,n),!0;case"dragenter":return wa=Tn(wa,e,t,a,i,n),!0;case"mouseover":return Aa=Tn(Aa,e,t,a,i,n),!0;case"pointerover":var o=n.pointerId;return An.set(o,Tn(An.get(o)||null,e,t,a,i,n)),!0;case"gotpointercapture":return o=n.pointerId,Cn.set(o,Tn(Cn.get(o)||null,e,t,a,i,n)),!0}return!1}function Sp(e){var t=Ya(e.target);if(t!==null){var a=E(t);if(a!==null){if(t=a.tag,t===13){if(t=H(a),t!==null){e.blockedOn=t,Bl(e.priority,function(){yp(a)});return}}else if(t===31){if(t=M(a),t!==null){e.blockedOn=t,Bl(e.priority,function(){yp(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=cl(e.nativeEvent);if(a===null){a=e.nativeEvent;var i=new a.constructor(a.type,a);ur=i,a.target.dispatchEvent(i),ur=null}else return t=Wa(a),t!==null&&gp(t),e.blockedOn=a,!1;t.shift()}return!0}function xp(e,t,a){Vo(e)&&a.delete(t)}function Sh(){dl=!1,xa!==null&&Vo(xa)&&(xa=null),wa!==null&&Vo(wa)&&(wa=null),Aa!==null&&Vo(Aa)&&(Aa=null),An.forEach(xp),Cn.forEach(xp)}function Go(e,t){e.blockedOn===t&&(e.blockedOn=null,dl||(dl=!0,f.unstable_scheduleCallback(f.unstable_NormalPriority,Sh)))}var Ko=null;function wp(e){Ko!==e&&(Ko=e,f.unstable_scheduleCallback(f.unstable_NormalPriority,function(){Ko===e&&(Ko=null);for(var t=0;t<e.length;t+=3){var a=e[t],i=e[t+1],n=e[t+2];if(typeof i!="function"){if(ul(i||a)===null)continue;break}var o=Wa(a);o!==null&&(e.splice(t,3),t-=3,cs(o,{pending:!0,data:n,method:a.method,action:i},i,n))}}))}function Di(e){function t(c){return Go(c,e)}xa!==null&&Go(xa,e),wa!==null&&Go(wa,e),Aa!==null&&Go(Aa,e),An.forEach(t),Cn.forEach(t);for(var a=0;a<Ca.length;a++){var i=Ca[a];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Ca.length&&(a=Ca[0],a.blockedOn===null);)Sp(a),a.blockedOn===null&&Ca.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(i=0;i<a.length;i+=3){var n=a[i],o=a[i+1],r=n[Xe]||null;if(typeof o=="function")r||wp(a);else if(r){var s=null;if(o&&o.hasAttribute("formAction")){if(n=o,r=o[Xe]||null)s=r.formAction;else if(ul(n)!==null)continue}else s=r.action;typeof s=="function"?a[i+1]=s:(a.splice(i,3),i-=3),wp(a)}}}function Ap(){function e(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(r){return n=r})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),i||setTimeout(a,20)}function a(){if(!i&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function pl(e){this._internalRoot=e}Qo.prototype.render=pl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));var a=t.current,i=mt();mp(a,i,e,t,null,null)},Qo.prototype.unmount=pl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mp(e.current,2,null,e,null,null),No(),t[Ja]=null}};function Qo(e){this._internalRoot=e}Qo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ol();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ca.length&&t!==0&&t<Ca[a].priority;a++);Ca.splice(a,0,e),a===0&&Sp(e)}};var Cp=C.version;if(Cp!=="19.2.3")throw Error(u(527,Cp,"19.2.3"));B.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=b(t),e=e!==null?K(e):null,e=e===null?null:e.stateNode,e};var xh={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:x,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Jo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jo.isDisabled&&Jo.supportsFiber)try{Oi=Jo.inject(xh),rt=Jo}catch{}}return Nn.createRoot=function(e,t){if(!R(e))throw Error(u(299));var a=!1,i="",n=Du,o=Uu,r=Ou;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(o=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=pp(e,1,!1,null,null,a,i,null,n,o,r,Ap),e[Ja]=t.current,Qs(e),new pl(t)},Nn.hydrateRoot=function(e,t,a){if(!R(e))throw Error(u(299));var i=!1,n="",o=Du,r=Uu,s=Ou,c=null;return a!=null&&(a.unstable_strictMode===!0&&(i=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(o=a.onUncaughtError),a.onCaughtError!==void 0&&(r=a.onCaughtError),a.onRecoverableError!==void 0&&(s=a.onRecoverableError),a.formState!==void 0&&(c=a.formState)),t=pp(e,1,!0,t,a??null,i,n,c,o,r,s,Ap),t.context=fp(null),a=t.current,i=mt(),i=ar(i),n=ca(i),n.callback=null,ua(a,n,i),a=i,t.current.lanes=a,ji(t,a),Bt(t),e[Ja]=t.current,Qs(e),new Qo(t)},Nn.version="19.2.3",Nn}var Bp;function Dh(){if(Bp)return hl.exports;Bp=1;function f(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f)}catch(C){console.error(C)}}return f(),hl.exports=Mh(),hl.exports}var Uh=Dh();const Na=[{id:1,category:"Core React Native",icon:"⚛️",question:"Explain the difference between React Native and React.js. How does React Native render components?",difficulty:"beginner",seniority:"junior",answer:`
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
                <li><strong>Fiber Architecture:</strong> Explain that Fiber is React's reimplementation of the reconciler (React 16+). It breaks rendering into units of work called "fibers" that can be paused, resumed, or aborted. This enables:
                    <ul>
                        <li><strong>Concurrent Mode:</strong> Multiple versions of UI can be prepared in memory simultaneously</li>
                        <li><strong>Suspense:</strong> Components can "suspend" rendering while waiting for async data</li>
                        <li><strong>Transitions:</strong> Mark updates as non-urgent so they don't block user input (useTransition, startTransition)</li>
                        <li><strong>Time Slicing:</strong> Long renders are split across multiple frames to keep UI responsive</li>
                    </ul>
                </li>
                <li><strong>Two-Phase Commit - Be prepared to explain in detail:</strong>
                    <ul>
                        <li><strong>Render Phase (interruptible):</strong> React traverses the component tree, calls render functions, and calculates changes. No side effects should happen here. Can be paused/restarted. This is where diffing occurs.</li>
                        <li><strong>Commit Phase (synchronous):</strong> React applies all changes to the DOM/native views in one go. Runs lifecycle methods (componentDidMount, useLayoutEffect, then useEffect). Cannot be interrupted to ensure UI consistency.</li>
                    </ul>
                </li>
                <li><strong>New Architecture (Fabric) - Key differences to highlight:</strong>
                    <ul>
                        <li><strong>Synchronous rendering:</strong> Fabric can render synchronously when needed (e.g., for gestures, keyboard input) via JSI direct calls</li>
                        <li><strong>No more bridge serialization:</strong> Direct C++ communication between JS and native eliminates JSON serialization overhead</li>
                        <li><strong>Concurrent renderer:</strong> Fabric supports React 18's concurrent features natively out of the box</li>
                        <li><strong>Multiple render priorities:</strong> Different updates can have different priorities (user input > background updates)</li>
                    </ul>
                </li>
                <li><strong>Practical Examples to Mention:</strong>
                    <ul>
                        <li>Why typing in a search box stays smooth even while filtering a large list (concurrent features prioritize input)</li>
                        <li>How Suspense boundaries work with React.lazy() for code splitting</li>
                        <li>Why keys are critical for list performance (helps reconciler identify moved items vs recreated)</li>
                    </ul>
                </li>
                <li><strong>Performance Questions Follow-up - Be ready to discuss:</strong>
                    <ul>
                        <li>When to use React.memo (components that receive same props often) vs useMemo (expensive calculations) vs useCallback (function props to memoized children)</li>
                        <li>How to profile renders with React DevTools Profiler - identify unnecessary re-renders</li>
                        <li>The cost of reconciliation and how to minimize unnecessary re-renders (component splitting, memoization)</li>
                    </ul>
                </li>
            </ul>

            <h4>🔑 Key Vocabulary to Use</h4>
            <p>Using these terms correctly shows deep understanding:</p>
            <ul>
                <li><strong>Reconciliation:</strong> The algorithm React uses to diff two trees and determine the minimal set of operations to transform one into the other</li>
                <li><strong>Fiber:</strong> A JavaScript object representing a unit of work; also the name of the reconciler architecture itself</li>
                <li><strong>Work-in-progress tree:</strong> The new fiber tree being built during the render phase</li>
                <li><strong>Current tree:</strong> The fiber tree that corresponds to what's currently rendered on screen</li>
                <li><strong>Double buffering:</strong> React maintains two trees (current and work-in-progress) and swaps them on commit</li>
                <li><strong>Effect list:</strong> A linked list of fibers that have side effects (DOM updates, lifecycle calls) to process in commit phase</li>
                <li><strong>Lanes:</strong> React 18's priority system for scheduling updates (replaced the older "expiration times" model)</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Using array index as key in dynamic lists:</strong> Causes incorrect component reuse when items are reordered, added, or removed. State gets attached to wrong items. Always use stable unique IDs.</li>
                <li><strong>Creating new objects/functions inline in render:</strong> Breaks memoization because new references are created every render. Bad: <code>&lt;Child style={{color: 'red'}} /&gt;</code> or <code>&lt;Button onPress={() => doSomething()} /&gt;</code>. Good: Define outside or use useMemo/useCallback.</li>
                <li><strong>Over-using useMemo/useCallback:</strong> These have memory overhead and add complexity. Only use when: passing callbacks to memoized children, expensive calculations (O(n²) or more), or referential equality matters (useEffect dependencies).</li>
                <li><strong>Mutating state directly:</strong> React relies on reference comparison for change detection. <code>state.items.push(newItem)</code> won't trigger re-render because the array reference didn't change. Always create new references.</li>
                <li><strong>Not understanding batching:</strong> In React 18+, all updates are automatically batched. But knowing this history shows depth: pre-React 18, only event handlers were batched, not setTimeout/promises.</li>
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
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding Expo workflows is crucial for project architecture decisions. This question tests whether you can make informed choices that balance development speed, app capabilities, and long-term maintenance based on project requirements.</p>

            <h4>Workflow Comparison Table</h4>
            <table>
                <tr><td><strong>Aspect</strong></td><td><strong>Managed Workflow</strong></td><td><strong>Bare Workflow</strong></td></tr>
                <tr><td>Native Code Access</td><td>No direct access</td><td>Full access (ios/, android/)</td></tr>
                <tr><td>Build Process</td><td>EAS Build (cloud)</td><td>Local or EAS Build</td></tr>
                <tr><td>Native Libraries</td><td>Expo SDK only</td><td>Any native library</td></tr>
                <tr><td>Setup Time</td><td>Minutes</td><td>Hours (native tooling)</td></tr>
                <tr><td>OTA Updates</td><td>Built-in (expo-updates)</td><td>Requires setup</td></tr>
                <tr><td>App Size</td><td>Larger (includes all Expo)</td><td>Optimized (only what you use)</td></tr>
                <tr><td>Debugging</td><td>Expo Go app</td><td>Native debuggers (Xcode, Android Studio)</td></tr>
                <tr><td>Team Skills Needed</td><td>JavaScript/React only</td><td>+ iOS/Android native</td></tr>
            </table>

            <h4>Architecture Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     MANAGED WORKFLOW                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐   │
│  │  Your JS    │ ──→ │  Expo SDK   │ ──→ │   EAS Build     │   │
│  │    Code     │     │  (bundled)  │     │   (cloud)       │   │
│  └─────────────┘     └─────────────┘     └─────────────────┘   │
│                              ↓                                   │
│                    Native code is hidden                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      BARE WORKFLOW                               │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐   │
│  │  Your JS    │ ──→ │  ios/ &     │ ──→ │  Local Build or │   │
│  │    Code     │     │  android/   │     │    EAS Build    │   │
│  └─────────────┘     └─────────────┘     └─────────────────┘   │
│                              ↓                                   │
│                    Full native access + Expo modules             │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>When to Use Managed Workflow</h4>
            <pre><code>✅ CHOOSE MANAGED WHEN:

1. Rapid Prototyping / MVP
   - Get to market fast
   - Test ideas without native overhead

2. Team Composition
   - No iOS/Android developers on team
   - JavaScript-focused developers

3. Standard Features Only
   - Camera, location, notifications
   - Social auth, payments (Stripe)
   - Push notifications

4. Simplified DevOps
   - Don't want to manage certificates
   - CI/CD through EAS

5. Instant Updates Critical
   - OTA updates without app store review
   - A/B testing, quick bug fixes</code></pre>

            <h4>When to Use Bare Workflow</h4>
            <pre><code>✅ CHOOSE BARE WHEN:

1. Custom Native Code Required
   - Proprietary SDK integration
   - Custom native modules
   - Platform-specific features

2. Performance Critical
   - Optimize app size (remove unused Expo)
   - Native-level performance tuning

3. Specific Library Needs
   - Libraries not supported by Expo
   - React Native Firebase (advanced features)
   - Custom video players, ML models

4. Enterprise Requirements
   - On-premise builds (security)
   - Custom signing configurations
   - White-labeling multiple apps

5. Full Control Needed
   - Specific Gradle/Podfile configurations
   - Native UI customizations
   - Background processing</code></pre>

            <h4>Migration: Managed to Bare (Prebuild)</h4>
            <pre><code># Modern approach: Continuous Native Generation (CNG)
# Generate native projects from config

npx expo prebuild

# Result:
my-app/
├── app.json              # Configuration source
├── ios/                  # Generated iOS project
│   ├── Podfile
│   └── MyApp.xcworkspace
├── android/              # Generated Android project
│   ├── build.gradle
│   └── app/
└── package.json

# Key benefit: You can STILL use Expo modules!
# Best of both worlds

# Regenerate when needed (clean rebuild)
npx expo prebuild --clean

# This is NOT the same as old "eject"
# You can regenerate native folders anytime</code></pre>

            <h4>Decision Flowchart</h4>
            <pre><code>                    ┌─────────────────────┐
                    │ Starting new project │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Need custom native  │──── Yes ──→ Bare Workflow
                    │ code or unsupported │              (or Dev Build)
                    │ libraries?          │
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │ Team has native     │──── Yes ──→ Consider Bare
                    │ iOS/Android skills? │              (more control)
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │ App size/perf       │──── Yes ──→ Bare Workflow
                    │ critical concern?   │
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │   Managed Workflow  │
                    │   (fastest start)   │
                    └─────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Mention <strong>Expo Dev Client</strong> as the middle ground - managed workflow with custom native modules</li>
                <li>Explain that <strong>prebuild</strong> replaced the old "eject" - it's now reversible and repeatable</li>
                <li>Discuss <strong>Continuous Native Generation (CNG)</strong> - native folders regenerated from config</li>
                <li>Note that most Expo modules work in bare workflow too</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "Ejecting from Expo means you can't use Expo anymore"</li>
                <li><strong>Wrong:</strong> "Managed workflow is only for simple apps"</li>
                <li><strong>Correct:</strong> "Bare workflow with Expo modules gives you best of both worlds"</li>
                <li><strong>Correct:</strong> "EAS Build works for both managed and bare workflows"</li>
            </ul>
        `},{id:39,category:"Expo",icon:"📱",question:"What is EAS (Expo Application Services) and how does it help with app development?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>EAS has become the standard for building, deploying, and updating React Native apps. Understanding EAS demonstrates knowledge of modern mobile DevOps practices and can significantly reduce time-to-production for teams.</p>

            <h4>EAS Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  Expo Application Services (EAS)                 │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   EAS Build     │   EAS Submit    │       EAS Update            │
│   (compile)     │   (distribute)  │       (patch)               │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ • Cloud builds  │ • App Store     │ • OTA JS updates            │
│ • Credentials   │ • Play Store    │ • No store review           │
│ • CI/CD ready   │ • TestFlight    │ • Branch deployments        │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                   ┌──────────▼──────────┐
                   │    eas.json         │
                   │  (configuration)    │
                   └─────────────────────┘</code></pre>

            <h4>1. EAS Build - Cloud Native Compilation</h4>
            <pre><code># Why EAS Build?
┌────────────────────────────────────────────────────────────┐
│  Traditional Build             vs    EAS Build             │
├────────────────────────────────────────────────────────────┤
│  • Need Mac for iOS builds     │  • Build iOS from any OS  │
│  • Install Xcode (50GB+)       │  • No local tools needed  │
│  • Manage certificates         │  • Auto credentials mgmt  │
│  • CI server maintenance       │  • Managed infrastructure │
│  • Codesigning headaches       │  • One command builds     │
└────────────────────────────────────────────────────────────┘

# Build Commands
eas build --platform ios           # iOS only
eas build --platform android       # Android only
eas build --platform all           # Both platforms

# Build for specific profile
eas build --platform ios --profile production
eas build --platform android --profile preview

# Local build (if you have native tools)
eas build --platform android --local

# Check build status
eas build:list</code></pre>

            <h4>2. EAS Submit - Automated Store Submission</h4>
            <pre><code># Automate the tedious submission process
# No more manual uploads through App Store Connect!

# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android

# Submit specific build
eas submit --platform ios --id BUILD_ID

# What EAS Submit handles:
┌─────────────────────────────────────────────────┐
│  iOS                    │  Android              │
├─────────────────────────┼───────────────────────┤
│  • App Store Connect    │  • Play Console API   │
│  • TestFlight upload    │  • Track selection    │
│  • Apple credentials    │  • Service account    │
│  • Version management   │  • Release notes      │
└─────────────────────────┴───────────────────────┘</code></pre>

            <h4>3. EAS Update - Over-The-Air Updates</h4>
            <pre><code># Push JavaScript/asset updates WITHOUT app store review
# Users get updates instantly on next app launch

# Publish update to production branch
eas update --branch production --message "Fix login bug"

# Publish to preview branch
eas update --branch preview --message "New feature testing"

# How OTA Updates Work:
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   App Launch  ──→  Check for Update  ──→  Download JS Bundle    │
│                         │                        │               │
│                         ▼                        ▼               │
│               ┌─────────────────┐    ┌──────────────────────┐  │
│               │  No update?     │    │  Apply on next       │  │
│               │  Use cached     │    │  launch (or instant) │  │
│               └─────────────────┘    └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

# Branch-based deployment
eas update --branch production    # Live users
eas update --branch staging       # QA testing
eas update --branch feature-x     # Feature testing

# IMPORTANT: What CAN'T be updated OTA:
# ❌ Native code changes
# ❌ New native modules
# ❌ iOS/Android permissions
# ❌ App icons, splash screens (baked into binary)

# ✅ What CAN be updated OTA:
# ✅ JavaScript code
# ✅ React components
# ✅ Images/assets in JS bundle
# ✅ Business logic</code></pre>

            <h4>Complete eas.json Configuration</h4>
            <pre><code>{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk"  // or "app-bundle" for Play Store
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"  // or "internal", "alpha", "beta"
      }
    }
  }
}</code></pre>

            <h4>EAS Workflow Example</h4>
            <pre><code># Complete CI/CD workflow

# 1. Development: Build dev client for testing
eas build --profile development --platform all

# 2. Preview: Internal testing build
eas build --profile preview --platform all

# 3. Production: App store build
eas build --profile production --platform all

# 4. Submit to stores
eas submit --platform all --profile production

# 5. Hot fix? Push OTA update
eas update --branch production --message "Critical fix v1.2.1"

# Typical Release Flow:
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Feature │ ─→ │ Preview │ ─→ │ Submit  │ ─→ │ OTA for │
│  Build  │    │  Test   │    │ to Store│    │ patches │
└─────────┘    └─────────┘    └─────────┘    └─────────┘</code></pre>

            <h4>EAS vs Alternatives</h4>
            <table>
                <tr><td><strong>Feature</strong></td><td><strong>EAS</strong></td><td><strong>Fastlane</strong></td><td><strong>App Center</strong></td></tr>
                <tr><td>Cloud Builds</td><td>✅ Native</td><td>❌ Need CI</td><td>✅ Yes</td></tr>
                <tr><td>iOS from Windows</td><td>✅ Yes</td><td>❌ No</td><td>✅ Yes</td></tr>
                <tr><td>Credentials Mgmt</td><td>✅ Auto</td><td>✅ Match</td><td>⚠️ Manual</td></tr>
                <tr><td>OTA Updates</td><td>✅ Native</td><td>❌ No</td><td>✅ Yes</td></tr>
                <tr><td>Expo Integration</td><td>✅ Perfect</td><td>⚠️ Config</td><td>⚠️ Config</td></tr>
                <tr><td>Pricing</td><td>Free tier + paid</td><td>Free (self-host)</td><td>Free tier + paid</td></tr>
            </table>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>three pillars</strong>: Build, Submit, Update - each solves a specific pain point</li>
                <li>Mention <strong>channels and branches</strong> for managing different deployment environments</li>
                <li>Know the <strong>limitations of OTA updates</strong> - native code changes require new builds</li>
                <li>Discuss <strong>cost considerations</strong> - free tier is generous but production may need paid</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Mistake:</strong> Trying to push native module changes via OTA update</li>
                <li><strong>Mistake:</strong> Not setting up proper channels for staging vs production</li>
                <li><strong>Mistake:</strong> Forgetting to configure credentials before first build</li>
                <li><strong>Best Practice:</strong> Always test OTA updates on preview channel before production</li>
            </ul>
        `},{id:40,category:"Architecture",icon:"🏛️",question:"Describe different architectural patterns for React Native apps. What's your preferred approach?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Architecture decisions made early in a project have long-lasting effects on scalability, testability, and team productivity. Senior engineers must understand trade-offs between different patterns and choose appropriately based on project needs, team size, and complexity.</p>

            <h4>Architecture Patterns Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE SPECTRUM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Simple ◄────────────────────────────────────────────► Complex  │
│                                                                  │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────────────┐ │
│  │ Flat    │   │ Feature │   │ Clean   │   │ Domain-Driven   │ │
│  │Structure│   │  Based  │   │ Arch    │   │ Design (DDD)    │ │
│  └─────────┘   └─────────┘   └─────────┘   └─────────────────┘ │
│                                                                  │
│  Small apps    Medium apps   Large apps   Enterprise/Complex    │
│  MVPs          Most teams    Testability  Microservices-like    │
│  Prototypes    Recommended   important    Multiple domains      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>1. Feature-Based Architecture (Recommended)</h4>
            <pre><code>// Best for: Most production apps, growing teams

src/
├── features/                    # Feature modules
│   ├── auth/                    # Authentication feature
│   │   ├── components/          # Feature-specific components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── hooks/               # Feature-specific hooks
│   │   │   └── useAuth.ts
│   │   ├── screens/             # Feature screens
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── services/            # API calls
│   │   │   └── authApi.ts
│   │   ├── store/               # State management
│   │   │   └── authSlice.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── auth.types.ts
│   │   ├── utils/               # Feature utilities
│   │   │   └── validation.ts
│   │   └── index.ts             # Public API (barrel export)
│   │
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── screens/
│   │   └── index.ts
│   │
│   └── checkout/
│       └── ...
│
├── shared/                      # Cross-feature code
│   ├── components/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── hooks/                   # Shared hooks
│   │   ├── useDebounce.ts
│   │   └── useNetworkStatus.ts
│   ├── services/                # Shared services
│   │   ├── api.ts               # API client
│   │   └── analytics.ts
│   ├── utils/                   # Utilities
│   │   └── formatters.ts
│   └── constants/
│       └── config.ts
│
├── navigation/                  # App navigation
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
│
└── App.tsx

// KEY RULES:
// ✅ Features can import from shared/
// ✅ Features can import public API from other features (via index.ts)
// ❌ Features CANNOT import internal files from other features
// ❌ Shared CANNOT import from features</code></pre>

            <h4>2. Clean Architecture</h4>
            <pre><code>// Best for: Complex apps, high testability requirements, large teams

// Core principle: Dependencies point INWARD
// Outer layers depend on inner layers, never the reverse

┌─────────────────────────────────────────────────────────────────┐
│                    CLEAN ARCHITECTURE LAYERS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌───────────────────────────────────────────────────────┐    │
│   │              PRESENTATION (UI Layer)                   │    │
│   │   Screens, Components, ViewModels                      │    │
│   │   ┌───────────────────────────────────────────────┐   │    │
│   │   │              APPLICATION (Use Cases)           │   │    │
│   │   │   Business logic, orchestration               │   │    │
│   │   │   ┌───────────────────────────────────────┐   │   │    │
│   │   │   │            DOMAIN (Entities)           │   │   │    │
│   │   │   │   Core business objects, interfaces   │   │   │    │
│   │   │   │   NO FRAMEWORK DEPENDENCIES           │   │   │    │
│   │   │   └───────────────────────────────────────┘   │   │    │
│   │   └───────────────────────────────────────────────┘   │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                  │
│   ┌───────────────────────────────────────────────────────┐    │
│   │              INFRASTRUCTURE (External)                 │    │
│   │   API clients, databases, native modules              │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

src/
├── domain/                      # Pure business logic (framework-agnostic)
│   ├── entities/
│   │   ├── User.ts              # Business objects
│   │   └── Product.ts
│   ├── repositories/            # Interfaces (abstractions)
│   │   ├── IUserRepository.ts
│   │   └── IProductRepository.ts
│   └── usecases/                # Business operations
│       ├── LoginUser.ts
│       └── GetProducts.ts
│
├── data/                        # Data layer (implements domain interfaces)
│   ├── repositories/            # Concrete implementations
│   │   ├── UserRepository.ts
│   │   └── ProductRepository.ts
│   └── datasources/             # API, database, etc.
│       ├── ApiDataSource.ts
│       └── LocalDataSource.ts
│
├── presentation/                # UI layer
│   ├── screens/
│   ├── components/
│   └── viewmodels/              # or hooks/
│
└── infrastructure/              # Framework-specific code
    ├── di/                      # Dependency injection
    │   └── container.ts
    └── navigation/</code></pre>

            <h4>Clean Architecture Code Example</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// DOMAIN LAYER - Pure TypeScript, no React dependencies
// ═══════════════════════════════════════════════════

// domain/entities/User.ts
export interface User {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
}

// domain/repositories/IUserRepository.ts
export interface IUserRepository {
    getUser(id: string): Promise<User>;
    updateUser(user: User): Promise<void>;
}

// domain/usecases/GetUserProfile.ts
export class GetUserProfile {
    constructor(private userRepo: IUserRepository) {}

    async execute(userId: string): Promise<User> {
        const user = await this.userRepo.getUser(userId);
        if (!user) throw new Error('User not found');
        return user;
    }
}

// ═══════════════════════════════════════════════════
// DATA LAYER - Implements domain interfaces
// ═══════════════════════════════════════════════════

// data/repositories/UserRepository.ts
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { ApiClient } from '../datasources/ApiClient';

export class UserRepository implements IUserRepository {
    constructor(private api: ApiClient) {}

    async getUser(id: string): Promise<User> {
        const dto = await this.api.get(\`/users/\${id}\`);
        return this.mapToEntity(dto);
    }

    private mapToEntity(dto: any): User {
        return {
            id: dto.id,
            email: dto.email,
            name: \`\${dto.first_name} \${dto.last_name}\`,
            isPremium: dto.subscription === 'premium',
        };
    }
}

// ═══════════════════════════════════════════════════
// PRESENTATION LAYER - React components
// ═══════════════════════════════════════════════════

// presentation/hooks/useUserProfile.ts
export function useUserProfile(userId: string) {
    const getUserProfile = useInjection(GetUserProfile);
    const [state, setState] = useState<{ user?: User; loading: boolean; error?: Error }>();

    useEffect(() => {
        setState({ loading: true });
        getUserProfile.execute(userId)
            .then(user => setState({ user, loading: false }))
            .catch(error => setState({ error, loading: false }));
    }, [userId]);

    return state;
}

// presentation/screens/ProfileScreen.tsx
function ProfileScreen({ userId }) {
    const { user, loading, error } = useUserProfile(userId);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;

    return <ProfileCard user={user} />;
}</code></pre>

            <h4>3. Redux + Container/Presentational Pattern</h4>
            <pre><code>// Best for: Apps heavily using Redux, clear separation of concerns

// CONTAINER: Connects to Redux, handles logic
// containers/UserListContainer.tsx
function UserListContainer() {
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleRefresh = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = useCallback((id: string) => {
        dispatch(deleteUser(id));
    }, [dispatch]);

    // Container handles all logic, passes pure props
    return (
        <UserList
            users={users}
            isLoading={isLoading}
            error={error}
            onRefresh={handleRefresh}
            onDelete={handleDelete}
        />
    );
}

// PRESENTATIONAL: Pure UI, receives everything via props
// components/UserList.tsx
interface UserListProps {
    users: User[];
    isLoading: boolean;
    error?: Error;
    onRefresh: () => void;
    onDelete: (id: string) => void;
}

const UserList = memo(({ users, isLoading, error, onRefresh, onDelete }: UserListProps) => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <UserCard user={item} onDelete={() => onDelete(item.id)} />
            )}
            refreshing={isLoading}
            onRefresh={onRefresh}
        />
    );
});

// Benefits:
// ✅ Presentational components are highly reusable
// ✅ Easy to test UI in isolation
// ✅ Clear separation of state and presentation
// ❌ Can lead to prop drilling
// ❌ More files/boilerplate</code></pre>

            <h4>Architecture Comparison Table</h4>
            <table>
                <tr><td><strong>Pattern</strong></td><td><strong>Best For</strong></td><td><strong>Pros</strong></td><td><strong>Cons</strong></td></tr>
                <tr><td>Feature-Based</td><td>Most apps, teams 3-15</td><td>Scalable, easy to navigate</td><td>Feature boundaries can blur</td></tr>
                <tr><td>Clean Architecture</td><td>Complex domain, high test needs</td><td>Very testable, decoupled</td><td>More boilerplate, learning curve</td></tr>
                <tr><td>Container/Presentational</td><td>Redux-heavy apps</td><td>Clear separation, reusable UI</td><td>Prop drilling, more files</td></tr>
                <tr><td>Flat Structure</td><td>Small apps, MVPs</td><td>Simple, fast to start</td><td>Doesn't scale</td></tr>
            </table>

            <h4>My Recommended Approach (Hybrid)</h4>
            <pre><code>// For most production apps: Feature-Based + Clean-ish

src/
├── features/
│   └── auth/
│       ├── api/              # Data fetching (Clean: data layer)
│       ├── hooks/            # Business logic (Clean: use cases)
│       ├── components/       # UI components
│       ├── screens/          # Screen components
│       ├── types/            # TypeScript types
│       └── index.ts          # Public API
├── shared/
│   ├── components/           # Design system
│   ├── hooks/                # Shared hooks
│   ├── services/             # API client, analytics
│   └── utils/
└── navigation/

// Key principles:
1. Colocate related code (feature modules)
2. Export only public API via index.ts
3. Business logic in custom hooks (not components)
4. Keep components focused on rendering
5. Use TypeScript for contracts between layers</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Don't just describe patterns—explain <strong>when you'd choose each</strong> and trade-offs</li>
                <li>Mention your <strong>experience</strong> with different architectures and lessons learned</li>
                <li>Discuss how architecture affects <strong>testing strategy</strong></li>
                <li>Talk about <strong>migration</strong>—how to evolve architecture as app grows</li>
            </ul>

            <h4>🚫 Architecture Anti-Patterns</h4>
            <ul>
                <li><strong>Over-engineering:</strong> Using Clean Architecture for a simple CRUD app</li>
                <li><strong>Under-engineering:</strong> Flat structure for a 50-screen app</li>
                <li><strong>Circular dependencies:</strong> Features importing from each other's internals</li>
                <li><strong>God components:</strong> 1000-line components mixing UI and business logic</li>
                <li><strong>Premature abstraction:</strong> Creating abstractions before understanding patterns</li>
            </ul>
        `},{id:41,category:"Architecture",icon:"🏛️",question:"How do you structure and organize a large-scale React Native codebase?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Large-scale codebases (100+ files, 5+ developers) require thoughtful organization to maintain productivity. Poor structure leads to confusion, merge conflicts, circular dependencies, and slow onboarding. This question tests your experience with real production apps.</p>

            <h4>Complete Production Project Structure</h4>
            <pre><code>my-app/
├── .github/                     # CI/CD workflows
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── .husky/                      # Git hooks (lint-staged)
├── __mocks__/                   # Jest mocks
├── android/                     # Native Android project
├── ios/                         # Native iOS project
├── src/
│   ├── app/                     # App entry and setup
│   │   ├── App.tsx              # Root component
│   │   ├── providers/           # Context providers wrapper
│   │   │   ├── index.tsx
│   │   │   ├── QueryProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── navigation/          # Navigation configuration
│   │       ├── RootNavigator.tsx
│   │       ├── AuthNavigator.tsx
│   │       ├── MainNavigator.tsx
│   │       ├── linking.ts       # Deep linking config
│   │       └── types.ts         # Navigation types
│   │
│   ├── features/                # Feature modules (CORE)
│   │   ├── auth/
│   │   │   ├── api/             # Feature API calls
│   │   │   │   ├── authApi.ts
│   │   │   │   └── authApi.test.ts
│   │   │   ├── components/      # Feature-specific components
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── BiometricPrompt.tsx
│   │   │   ├── hooks/           # Feature hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useAuth.test.ts
│   │   │   ├── screens/         # Feature screens
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── SignupScreen.tsx
│   │   │   │   └── ForgotPasswordScreen.tsx
│   │   │   ├── store/           # Feature state (Redux slice or Zustand)
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── authSelectors.ts
│   │   │   ├── types/           # Feature TypeScript types
│   │   │   │   └── auth.types.ts
│   │   │   ├── utils/           # Feature utilities
│   │   │   │   └── validation.ts
│   │   │   └── index.ts         # Public API exports
│   │   │
│   │   ├── products/
│   │   │   └── ... (same structure)
│   │   │
│   │   ├── checkout/
│   │   │   └── ...
│   │   │
│   │   └── profile/
│   │       └── ...
│   │
│   ├── shared/                  # Cross-feature shared code
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── index.ts         # Barrel export
│   │   │
│   │   ├── hooks/               # Shared hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useNetworkStatus.ts
│   │   │   └── useKeyboard.ts
│   │   │
│   │   ├── services/            # External services
│   │   │   ├── api/
│   │   │   │   ├── client.ts    # Axios/fetch instance
│   │   │   │   └── interceptors.ts
│   │   │   ├── analytics.ts
│   │   │   ├── crashReporting.ts
│   │   │   └── storage.ts       # AsyncStorage wrapper
│   │   │
│   │   ├── utils/               # Pure utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   └── constants/
│   │       ├── config.ts
│   │       └── routes.ts
│   │
│   ├── design-system/           # Design tokens & primitives
│   │   ├── tokens/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   └── spacing.ts
│   │   ├── primitives/
│   │   │   ├── Box.tsx
│   │   │   └── Text.tsx
│   │   └── theme.ts
│   │
│   ├── assets/                  # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── animations/          # Lottie files
│   │
│   └── types/                   # Global TypeScript types
│       ├── global.d.ts
│       ├── env.d.ts
│       └── navigation.d.ts
│
├── e2e/                         # E2E tests (Detox/Maestro)
│   ├── auth.test.ts
│   └── checkout.test.ts
│
├── scripts/                     # Build scripts
│   └── generate-icons.sh
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── app.json                     # Expo config
├── babel.config.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md</code></pre>

            <h4>Feature Module Pattern (Barrel Exports)</h4>
            <pre><code>// features/auth/index.ts - PUBLIC API ONLY
// This is the only file other features can import from

// Screens (for navigation)
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';

// Hooks (for cross-feature usage)
export { useAuth } from './hooks/useAuth';

// Types (for type sharing)
export type { User, AuthState, LoginCredentials } from './types/auth.types';

// Store (for root store setup)
export { authReducer } from './store/authSlice';
export { selectUser, selectIsAuthenticated } from './store/authSelectors';

// ❌ DO NOT export internal components
// export { LoginForm } from './components/LoginForm'; // WRONG!

// ═══════════════════════════════════════════════════
// USAGE FROM OTHER FEATURES:
// ═══════════════════════════════════════════════════

// ✅ CORRECT - import from barrel export
import { useAuth, User } from '@/features/auth';

// ❌ WRONG - importing internal implementation
import { LoginForm } from '@/features/auth/components/LoginForm'; // NO!
import { validateEmail } from '@/features/auth/utils/validation'; // NO!</code></pre>

            <h4>Path Aliases Configuration</h4>
            <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"],
      "@assets/*": ["src/assets/*"],
      "@design-system": ["src/design-system"]
    }
  }
}

// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@features': './src/features',
          '@shared': './src/shared',
          '@assets': './src/assets',
          '@design-system': './src/design-system',
        },
      },
    ],
  ],
};

// Now you can import:
import { Button } from '@shared/components';
import { useAuth } from '@features/auth';
import { colors } from '@design-system/tokens';</code></pre>

            <h4>Naming Conventions</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// FILE NAMING
// ═══════════════════════════════════════════════════

// Components: PascalCase
UserProfile.tsx
UserProfile.styles.ts
UserProfile.test.tsx
UserProfile.stories.tsx      // Storybook

// Hooks: camelCase with 'use' prefix
useAuth.ts
useUserProfile.ts
useDebounce.ts

// Services/Utils: camelCase
api.ts
analytics.ts
formatters.ts
validators.ts

// Types: camelCase with .types suffix
auth.types.ts
navigation.types.ts

// Constants: camelCase or SCREAMING_SNAKE_CASE
config.ts
routes.ts
API_ENDPOINTS.ts

// ═══════════════════════════════════════════════════
// COMPONENT NAMING PATTERNS
// ═══════════════════════════════════════════════════

// Screens: end with "Screen"
LoginScreen.tsx
ProductDetailScreen.tsx

// Container/Smart components: end with "Container" (optional)
UserListContainer.tsx

// List items: end with "Item" or "Card"
ProductItem.tsx
UserCard.tsx

// Forms: end with "Form"
LoginForm.tsx
CheckoutForm.tsx

// Modals: end with "Modal"
ConfirmationModal.tsx
FilterModal.tsx</code></pre>

            <h4>Dependency Rules (Import Boundaries)</h4>
            <pre><code>// Visual representation of allowed imports
┌─────────────────────────────────────────────────────────────────┐
│                         IMPORT RULES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   features/auth ──────────→ shared/          ✅ ALLOWED         │
│                                                                  │
│   features/auth ──────────→ features/products/index.ts           │
│                              (public API only) ✅ ALLOWED        │
│                                                                  │
│   features/auth ──────────→ features/products/components/        │
│                              (internal files)  ❌ FORBIDDEN      │
│                                                                  │
│   shared/ ────────────────→ features/*       ❌ FORBIDDEN        │
│                                                                  │
│   design-system ──────────→ nothing          ✅ STANDALONE       │
│                                                                  │
│   app/navigation ─────────→ features/*/screens ✅ ALLOWED        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

// Enforcing with ESLint (eslint-plugin-import)
// .eslintrc.js
module.exports = {
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [
        // shared cannot import from features
        {
          target: './src/shared',
          from: './src/features',
          message: 'Shared modules cannot import from features',
        },
        // features cannot import other features' internals
        {
          target: './src/features/auth',
          from: './src/features/!(auth)/*/**',
          message: 'Import from feature index.ts only',
        },
      ],
    }],
  },
};</code></pre>

            <h4>Scaling Guidelines</h4>
            <pre><code>// When to split a feature:
// ─────────────────────────────────────────────────────
// ✓ Feature folder has 20+ files
// ✓ Multiple developers working on same feature
// ✓ Clear sub-domain boundaries emerge
// ✓ Screens could logically be separate apps

// Example: Splitting a "shopping" feature
// BEFORE:
features/
└── shopping/
    ├── screens/
    │   ├── ProductListScreen.tsx
    │   ├── ProductDetailScreen.tsx
    │   ├── CartScreen.tsx
    │   ├── CheckoutScreen.tsx
    │   └── OrderConfirmationScreen.tsx
    └── ... (30+ files)

// AFTER:
features/
├── catalog/              # Product browsing
│   ├── screens/
│   │   ├── ProductListScreen.tsx
│   │   └── ProductDetailScreen.tsx
│   └── ...
├── cart/                 # Shopping cart
│   ├── screens/
│   │   └── CartScreen.tsx
│   └── ...
└── checkout/             # Purchase flow
    ├── screens/
    │   ├── CheckoutScreen.tsx
    │   └── OrderConfirmationScreen.tsx
    └── ...</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain <strong>why</strong> you organize this way, not just what the structure is</li>
                <li>Discuss <strong>barrel exports</strong> (index.ts) and how they enforce boundaries</li>
                <li>Mention <strong>tooling</strong>: ESLint import rules, path aliases, TypeScript</li>
                <li>Talk about <strong>when to refactor</strong>: signs a feature needs splitting</li>
                <li>Address <strong>team dynamics</strong>: how structure affects parallel work</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Too many shared components:</strong> If it's only used in one feature, keep it there</li>
                <li><strong>Deep nesting:</strong> Avoid more than 3-4 levels of directories</li>
                <li><strong>Inconsistent naming:</strong> Establish conventions early and enforce with linting</li>
                <li><strong>No barrel exports:</strong> Without index.ts, imports become messy and uncontrolled</li>
                <li><strong>Circular dependencies:</strong> Feature A imports from Feature B which imports from Feature A</li>
            </ul>
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
            <h4>🎯 Why This Question Matters</h4>
            <p>Metro is the heart of React Native development - every line of JavaScript you write passes through it. Understanding Metro helps you debug build issues, optimize bundle size, configure monorepos, and understand why hot reloading sometimes breaks.</p>

            <h4>What is Metro?</h4>
            <p>Metro is the JavaScript bundler specifically built for React Native by Meta. Unlike webpack (used in web), Metro is optimized for mobile development with features like fast incremental builds and instant Hot Module Replacement (HMR).</p>

            <h4>Metro Pipeline Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     METRO BUNDLING PIPELINE                      │
└─────────────────────────────────────────────────────────────────┘

         index.js (entry point)
              │
              ▼
┌─────────────────────────┐
│    1. RESOLUTION        │  ← Finds all required modules
│    ─────────────────    │
│  • Parse import/require │
│  • Resolve file paths   │
│  • Build dependency     │
│    graph                │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│    2. TRANSFORMATION    │  ← Converts code (Babel, TS, etc.)
│    ─────────────────    │
│  • Babel transpilation  │
│  • TypeScript → JS      │
│  • JSX → React.create   │
│  • Flow type stripping  │
│  • Minification (prod)  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│    3. SERIALIZATION     │  ← Combines into final bundle
│    ─────────────────    │
│  • Combine all modules  │
│  • Generate source maps │
│  • Create bundle file   │
│  • Asset handling       │
└───────────┬─────────────┘
            │
            ▼
       bundle.js + assets</code></pre>

            <h4>Resolution Phase Deep Dive</h4>
            <pre><code>// When Metro sees this import:
import { Button } from './components/Button';

// Resolution steps:
1. Check ./components/Button.tsx  ← matches sourceExts
2. Check ./components/Button.ts
3. Check ./components/Button.jsx
4. Check ./components/Button.js
5. Check ./components/Button/index.tsx
6. Check ./components/Button/index.js

// For node_modules:
import React from 'react';

// Metro looks in:
1. ./node_modules/react
2. ../node_modules/react
3. ../../node_modules/react  ← walks up directory tree

// The dependency graph might look like:
index.js
├── App.js
│   ├── ./screens/HomeScreen.js
│   │   └── ./components/Button.js
│   └── ./screens/ProfileScreen.js
├── react
│   └── react/index.js
└── react-native
    └── react-native/index.js</code></pre>

            <h4>Complete metro.config.js Configuration</h4>
            <pre><code>const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  // ═══════════════════════════════════════════════════
  // RESOLVER: How Metro finds and resolves modules
  // ═══════════════════════════════════════════════════
  resolver: {
    // File extensions to consider as source code
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'],

    // File extensions for assets (images, fonts, etc.)
    assetExts: [...defaultConfig.resolver.assetExts, 'db', 'mp3', 'ttf', 'otf'],

    // Folders to exclude from bundling (regex)
    blockList: [
      /node_modules\\/.*\\/node_modules\\/react-native\\/.*/,
      /\\.git\\/.*/,
    ],

    // For monorepos: extra folders to look for modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'), // monorepo root
    ],

    // Resolve platform-specific files
    // Button.ios.js vs Button.android.js
    platforms: ['ios', 'android', 'native', 'web'],

    // Custom module resolution
    resolveRequest: (context, moduleName, platform) => {
      // Custom resolution logic here
      return context.resolveRequest(context, moduleName, platform);
    },
  },

  // ═══════════════════════════════════════════════════
  // TRANSFORMER: How Metro transforms/compiles code
  // ═══════════════════════════════════════════════════
  transformer: {
    // Custom transformer for specific file types
    babelTransformerPath: require.resolve('react-native-svg-transformer'),

    // Babel configuration
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Improves startup time
      },
    }),

    // Minifier options for production
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },

  // ═══════════════════════════════════════════════════
  // WATCHER: File watching configuration (Watchman)
  // ═══════════════════════════════════════════════════
  watchFolders: [
    path.resolve(__dirname, '../shared'), // Shared packages in monorepo
    path.resolve(__dirname, '../../packages'), // Other packages
  ],

  // ═══════════════════════════════════════════════════
  // SERVER: Development server options
  // ═══════════════════════════════════════════════════
  server: {
    port: 8081, // Default Metro port
    enhanceMiddleware: (middleware) => {
      // Add custom middleware
      return middleware;
    },
  },

  // ═══════════════════════════════════════════════════
  // SERIALIZER: How the final bundle is created
  // ═══════════════════════════════════════════════════
  serializer: {
    // Modules to include regardless of imports
    getModulesRunBeforeMainModule: () => [
      require.resolve('./polyfills.js'),
    ],

    // Custom serializer for bundle output
    createModuleIdFactory: () => {
      // Custom module ID generation
      return (path) => path;
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);</code></pre>

            <h4>SVG Handling Example</h4>
            <pre><code>// To use SVGs as React components, you need a custom transformer

// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

// Now you can:
import Logo from './assets/logo.svg';

function Header() {
  return <Logo width={100} height={100} />;
}</code></pre>

            <h4>Common Metro Commands</h4>
            <pre><code># Start development server
npx react-native start

# Start with clean cache (fixes most weird issues!)
npx react-native start --reset-cache

# Create production bundle for iOS
npx react-native bundle \\
  --entry-file index.js \\
  --platform ios \\
  --dev false \\
  --bundle-output ios/main.jsbundle \\
  --assets-dest ios

# Create production bundle for Android
npx react-native bundle \\
  --entry-file index.js \\
  --platform android \\
  --dev false \\
  --bundle-output android/app/src/main/assets/index.android.bundle \\
  --assets-dest android/app/src/main/res

# Generate RAM bundle (for better startup performance)
npx react-native ram-bundle \\
  --entry-file index.js \\
  --platform android \\
  --dev false \\
  --bundle-output android/app/src/main/assets/index.android.bundle</code></pre>

            <h4>Hot Module Replacement (HMR)</h4>
            <pre><code>// Metro enables Fast Refresh (HMR) automatically in dev

// How it works:
┌─────────────────────────────────────────────────────────┐
│  1. You edit Button.js                                   │
│  2. Metro detects change via Watchman                    │
│  3. Only Button.js is re-transformed (not entire app)   │
│  4. HMR runtime patches the module in-place             │
│  5. React re-renders affected components                 │
│  6. State is preserved! 🎉                               │
└─────────────────────────────────────────────────────────┘

// HMR breaks when:
// ❌ Module has side effects at top level
// ❌ Export is not a component (plain functions)
// ❌ Anonymous default exports
// ❌ Class components (sometimes)

// Best practices for HMR:
// ✅ Named exports
// ✅ Function components with hooks
// ✅ Keep side effects in useEffect</code></pre>

            <h4>Monorepo Configuration</h4>
            <pre><code>// For monorepos (Yarn workspaces, npm workspaces, etc.)

// Project structure:
monorepo/
├── packages/
│   ├── shared/           # Shared code
│   │   └── package.json
│   └── mobile/           # React Native app
│       ├── metro.config.js
│       └── package.json
└── package.json

// metro.config.js in packages/mobile/
const path = require('path');

module.exports = {
  // Tell Metro to watch the shared package
  watchFolders: [
    path.resolve(__dirname, '../../packages/shared'),
    path.resolve(__dirname, '../../node_modules'),
  ],

  resolver: {
    // Help Metro find hoisted modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],

    // Prevent duplicate React
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>three phases</strong>: Resolution → Transformation → Serialization</li>
                <li>Know when to use <strong>--reset-cache</strong> (stale code, weird errors, after config changes)</li>
                <li>Understand <strong>inlineRequires</strong> and how it improves startup time</li>
                <li>Be ready to discuss <strong>monorepo setup</strong> with watchFolders and nodeModulesPaths</li>
            </ul>

            <h4>🚫 Common Issues & Fixes</h4>
            <ul>
                <li><strong>Error: "Unable to resolve module"</strong> - Check sourceExts, clear cache, check paths</li>
                <li><strong>Duplicate module "react"</strong> - Use extraNodeModules in monorepos</li>
                <li><strong>Slow bundling</strong> - Add large folders to blockList</li>
                <li><strong>HMR not working</strong> - Avoid side effects, use named exports</li>
                <li><strong>Old code showing</strong> - Always try --reset-cache first</li>
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
        `},{id:117,category:"TypeScript",icon:"📘",question:"How do you create type-safe generic components in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Generic components enable reusability while maintaining full type safety. Interviewers assess your ability to write flexible, maintainable TypeScript code.</p>

            <h4>Generic List Component</h4>
            <pre><code>interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  onItemPress?: (item: T) => void;
}

function GenericList<T>({ data, renderItem, keyExtractor, onItemPress }: ListProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onItemPress?.(item)}>
          {renderItem(item, index)}
        </TouchableOpacity>
      )}
    />
  );
}

// Usage with full type inference
interface User { id: string; name: string; }
<GenericList<User>
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <Text>{user.name}</Text>}
  onItemPress={(user) => console.log(user.name)}
/></code></pre>

            <h4>Generic Form Hook</h4>
            <pre><code>function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  return { values, errors, setValue, setErrors };
}

// Type-safe usage
const { values, setValue } = useForm({ email: '', password: '' });
setValue('email', 'test@example.com'); // ✓ Type-safe
setValue('email', 123); // ✗ Error: number not assignable to string</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use constraints (<code>extends</code>) to limit generic types</li>
                <li>Prefer inference over explicit type parameters when possible</li>
                <li>Generic components reduce code duplication significantly</li>
            </ul>
        `},{id:118,category:"TypeScript",icon:"📘",question:"How do you implement type-safe navigation with React Navigation in TypeScript?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Type-safe navigation prevents runtime crashes from incorrect params and enables autocomplete. This is essential for large apps with complex navigation.</p>

            <h4>Define Navigation Types</h4>
            <pre><code>// navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root stack params
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Profile: { userId: string };
  Settings: { section?: 'account' | 'privacy' };
};

// Tab params
export type MainTabParamList = {
  Home: undefined;
  Search: { query?: string };
  Notifications: undefined;
};

// Screen props helper
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Nested navigation props
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;</code></pre>

            <h4>Type-Safe Screen Components</h4>
            <pre><code>// screens/ProfileScreen.tsx
function ProfileScreen({ route, navigation }: RootStackScreenProps<'Profile'>) {
  const { userId } = route.params; // Type: string

  // Type-safe navigation
  navigation.navigate('Settings', { section: 'account' }); // ✓
  navigation.navigate('Settings', { section: 'invalid' }); // ✗ Error
}

// Typed useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProp>();
  navigation.navigate('Profile', { userId: '123' }); // ✓ Type-safe
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always define param lists as types, not interfaces (for compatibility)</li>
                <li>Use <code>undefined</code> for screens with no params</li>
                <li>CompositeScreenProps handles nested navigators</li>
            </ul>
        `},{id:119,category:"TypeScript",icon:"📘",question:"How do you type Redux or Zustand stores in React Native applications?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Properly typed state management prevents bugs and enables excellent developer experience with autocomplete and refactoring support.</p>

            <h4>Redux Toolkit Typing</h4>
            <pre><code>// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage
const user = useAppSelector(state => state.user); // Fully typed
const dispatch = useAppDispatch();
dispatch(setUser({ id: '1', name: 'John' })); // Type-checked</code></pre>

            <h4>Zustand Typing</h4>
            <pre><code>// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        const { user, token } = await authApi.login(email, password);
        set({ user, token, isLoading: false });
      },
      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Usage - fully typed
const { user, login } = useAuthStore();
await login('email@test.com', 'password');</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always infer RootState from store, don't manually define it</li>
                <li>Create typed hooks to avoid repetitive type annotations</li>
                <li>Zustand's middleware requires the curried <code>create<State>()()</code> syntax</li>
            </ul>
        `},{id:120,category:"TypeScript",icon:"📘",question:"How do you write declaration files for native modules in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>When using native modules without TypeScript support, you need declaration files for type safety. This shows deep TypeScript and RN integration knowledge.</p>

            <h4>Basic Native Module Declaration</h4>
            <pre><code>// types/react-native-custom-module.d.ts
declare module 'react-native-custom-module' {
  export interface CustomModuleOptions {
    timeout?: number;
    retryCount?: number;
  }

  export interface CustomModuleResult {
    success: boolean;
    data: string;
    timestamp: number;
  }

  export function initialize(apiKey: string): Promise<void>;
  export function performAction(
    action: string,
    options?: CustomModuleOptions
  ): Promise<CustomModuleResult>;
  export function cleanup(): void;

  const CustomModule: {
    initialize: typeof initialize;
    performAction: typeof performAction;
    cleanup: typeof cleanup;
  };

  export default CustomModule;
}</code></pre>

            <h4>NativeModules Extension</h4>
            <pre><code>// types/native-modules.d.ts
import { NativeModule } from 'react-native';

interface BiometricModule extends NativeModule {
  isSupported(): Promise<boolean>;
  authenticate(reason: string): Promise<{
    success: boolean;
    error?: string;
  }>;
  getBiometryType(): Promise<'FaceID' | 'TouchID' | 'Fingerprint' | null>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    BiometricModule: BiometricModule;
  }
}

// Usage
import { NativeModules } from 'react-native';
const { BiometricModule } = NativeModules;
const supported = await BiometricModule.isSupported(); // Typed!</code></pre>

            <h4>TurboModule Codegen Types</h4>
            <pre><code>// With New Architecture, use codegen spec
// specs/NativeBiometric.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isSupported(): Promise<boolean>;
  authenticate(reason: string): Promise<{ success: boolean }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Biometric');</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Place .d.ts files in a <code>types/</code> folder included in tsconfig</li>
                <li>Use module augmentation to extend existing types</li>
                <li>New Architecture codegen generates types automatically</li>
            </ul>
        `},{id:121,category:"TypeScript",icon:"📘",question:"What are TypeScript strict mode best practices for React Native projects?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Strict mode catches bugs at compile time. Interviewers want to see you can configure and work with strict TypeScript effectively.</p>

            <h4>Recommended tsconfig.json</h4>
            <pre><code>{
  "compilerOptions": {
    // Strict mode flags
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Additional safety
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // React Native specific
    "jsx": "react-native",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}</code></pre>

            <h4>Handling Strict Null Checks</h4>
            <pre><code>// Bad: Will error with strictNullChecks
function getUser(id: string) {
  const user = users.find(u => u.id === id);
  return user.name; // Error: user might be undefined
}

// Good: Handle null case
function getUser(id: string): string | undefined {
  const user = users.find(u => u.id === id);
  return user?.name;
}

// Or assert non-null when certain
function getRequiredUser(id: string): string {
  const user = users.find(u => u.id === id);
  if (!user) throw new Error(\`User \${id} not found\`);
  return user.name;
}</code></pre>

            <h4>Type Guards for Runtime Safety</h4>
            <pre><code>// API response validation
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is { data: T; error: undefined } {
  return response.data !== undefined && !response.error;
}

// Usage
const response = await fetchUser(id);
if (isSuccessResponse(response)) {
  console.log(response.data.name); // data is guaranteed
} else {
  console.error(response.error);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Enable strict mode from project start - retrofitting is painful</li>
                <li>Use type guards instead of type assertions when possible</li>
                <li><code>noUncheckedIndexedAccess</code> catches array access bugs</li>
            </ul>
        `},{id:122,category:"TypeScript",icon:"📘",question:"How do you use type guards and discriminated unions effectively in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Type guards and discriminated unions enable type-safe handling of complex state and API responses, reducing runtime errors significantly.</p>

            <h4>Discriminated Unions for State</h4>
            <pre><code>// Network request state
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function UserProfile() {
  const [state, setState] = useState<RequestState<User>>({ status: 'idle' });

  // TypeScript narrows type based on status
  switch (state.status) {
    case 'idle':
      return <Text>Ready to load</Text>;
    case 'loading':
      return <ActivityIndicator />;
    case 'success':
      return <Text>{state.data.name}</Text>; // data exists here
    case 'error':
      return <Text>{state.error.message}</Text>; // error exists here
  }
}</code></pre>

            <h4>Custom Type Guards</h4>
            <pre><code>// Check if value is a specific type
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    typeof (value as User).id === 'string'
  );
}

// API response validation
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Invalid user data');
  }
}

// Usage
const data = await api.getUser(id);
assertUser(data); // Throws if invalid
console.log(data.email); // TypeScript knows it's User</code></pre>

            <h4>Navigation Event Types</h4>
            <pre><code>type DeepLinkEvent =
  | { type: 'profile'; userId: string }
  | { type: 'product'; productId: string; variant?: string }
  | { type: 'settings'; section: 'account' | 'privacy' }
  | { type: 'unknown'; url: string };

function handleDeepLink(event: DeepLinkEvent) {
  switch (event.type) {
    case 'profile':
      navigation.navigate('Profile', { userId: event.userId });
      break;
    case 'product':
      navigation.navigate('Product', {
        id: event.productId,
        variant: event.variant // Optional, properly typed
      });
      break;
    case 'settings':
      navigation.navigate('Settings', { section: event.section });
      break;
    case 'unknown':
      console.warn('Unknown deep link:', event.url);
  }
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Discriminated unions use a common "tag" property (like <code>status</code> or <code>type</code>)</li>
                <li>Type guards return <code>value is Type</code> for narrowing</li>
                <li>Assertion functions use <code>asserts value is Type</code></li>
            </ul>
        `},{id:123,category:"Debugging",icon:"🐛",question:"How do you use React DevTools Profiler to identify performance issues in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>The Profiler is essential for finding unnecessary re-renders and slow components. Interviewers want to see practical debugging skills.</p>

            <h4>Setting Up React DevTools</h4>
            <pre><code>// Install standalone devtools
npm install -g react-devtools

// Run devtools
react-devtools

// In your app's index.js (dev only)
if (__DEV__) {
  require('react-devtools');
}</code></pre>

            <h4>Profiler Workflow</h4>
            <pre><code>1. Open React DevTools → Profiler tab
2. Click "Record" button
3. Perform the interaction you want to profile
4. Click "Stop" button
5. Analyze the flame graph

Key Metrics to Watch:
┌─────────────────────────────────────────┐
│ Commit Duration    │ Total render time  │
│ Render Count       │ How many re-renders│
│ Component Time     │ Per-component cost │
│ "Why did render?"  │ What prop changed  │
└─────────────────────────────────────────┘</code></pre>

            <h4>Finding Problematic Components</h4>
            <pre><code>// Enable "Highlight updates" in DevTools settings
// Components flash when they re-render

// Common issues to look for:
// 1. Components re-rendering on every parent render
// 2. Large lists re-rendering entirely
// 3. Context causing cascading re-renders

// Fix with React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  // Only re-renders when data changes
  return <ComplexVisualization data={data} />;
});

// Fix with useMemo for computed values
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Profile in release mode for accurate timings (dev mode is slower)</li>
                <li>Look for yellow/red components in the flame graph</li>
                <li>"Why did this render?" feature shows exact prop changes</li>
            </ul>
        `},{id:124,category:"Debugging",icon:"🐛",question:"How do you debug native crashes in React Native on iOS and Android?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Native crashes require different debugging approaches than JS errors. Senior developers must be able to diagnose issues at all levels of the stack.</p>

            <h4>iOS Native Crash Debugging</h4>
            <pre><code>// 1. Check Xcode console for crash logs
// Product → Scheme → Edit Scheme → Run → Diagnostics
// Enable: Address Sanitizer, Thread Sanitizer

// 2. Symbolicate crash logs
// Window → Devices and Simulators → View Device Logs

// 3. Common iOS crash causes:
┌─────────────────────────────────────────┐
│ EXC_BAD_ACCESS   │ Memory access error  │
│ SIGABRT          │ Assertion failure    │
│ SIGKILL          │ System killed app    │
│ EXC_CRASH        │ Unhandled exception  │
└─────────────────────────────────────────┘

// 4. Enable crash reporting
// Add to AppDelegate.m:
- (BOOL)application:(UIApplication *)application didFinishLaunching... {
  NSSetUncaughtExceptionHandler(&handleException);
  signal(SIGABRT, handleSignal);
  signal(SIGSEGV, handleSignal);
}</code></pre>

            <h4>Android Native Crash Debugging</h4>
            <pre><code>// 1. Check logcat for crash stack traces
adb logcat *:E | grep -E "(FATAL|AndroidRuntime|crash)"

// 2. Use Android Studio Profiler
// View → Tool Windows → Logcat
// Filter by your app's package name

// 3. Common Android crash causes:
┌─────────────────────────────────────────┐
│ NullPointerException  │ Null reference   │
│ OutOfMemoryError      │ Memory exhausted │
│ IllegalStateException │ Invalid state    │
│ SecurityException     │ Permission issue │
└─────────────────────────────────────────┘

// 4. Enable strict mode for development
// In MainApplication.java:
if (BuildConfig.DEBUG) {
  StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
    .detectAll()
    .penaltyLog()
    .build());
}</code></pre>

            <h4>Crash Reporting Services</h4>
            <pre><code>// Sentry setup
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
  enableNativeCrashHandling: true,
  attachStacktrace: true,
});

// Firebase Crashlytics
import crashlytics from '@react-native-firebase/crashlytics';
crashlytics().recordError(new Error('Test crash'));</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always check both JS and native logs for crashes</li>
                <li>Use symbolication to convert addresses to function names</li>
                <li>Implement crash reporting before production release</li>
            </ul>
        `},{id:125,category:"Debugging",icon:"🐛",question:"How do you detect and fix memory leaks in React Native applications?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Memory leaks cause app slowdowns and crashes. This tests your ability to diagnose complex issues that worsen over time.</p>

            <h4>Common Memory Leak Sources</h4>
            <pre><code>// 1. Uncleared subscriptions/listeners
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  // LEAK: No cleanup!
});

// Fixed:
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  return () => subscription.remove(); // Cleanup!
}, []);

// 2. Uncleared timers
useEffect(() => {
  setInterval(() => updateData(), 1000);
  // LEAK: Timer runs forever
});

// Fixed:
useEffect(() => {
  const timer = setInterval(() => updateData(), 1000);
  return () => clearInterval(timer);
}, []);

// 3. State updates on unmounted components
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(result => setData(result)); // LEAK if unmounted
});

// Fixed:
useEffect(() => {
  let mounted = true;
  fetchData().then(result => {
    if (mounted) setData(result);
  });
  return () => { mounted = false; };
}, []);</code></pre>

            <h4>Detection Tools</h4>
            <pre><code>// Flipper Memory Plugin
// 1. Open Flipper → Memory tab
// 2. Take heap snapshot before and after navigation
// 3. Compare retained objects

// Xcode Memory Graph Debugger
// Debug → Debug Workflow → View Memory Graph
// Look for unexpected retained objects

// Android Profiler
// View → Tool Windows → Profiler → Memory
// Record allocations during suspected leak

// why-did-you-render library
import React from 'react';
if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, { trackAllPureComponents: true });
}</code></pre>

            <h4>Automated Leak Detection</h4>
            <pre><code>// Custom hook for leak detection in dev
function useLeakDetection(componentName: string) {
  useEffect(() => {
    if (__DEV__) {
      console.log(\`[Mount] \${componentName}\`);
      return () => console.log(\`[Unmount] \${componentName}\`);
    }
  }, []);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always return cleanup functions from useEffect</li>
                <li>Use AbortController for fetch requests</li>
                <li>Profile memory before and after navigation flows</li>
            </ul>
        `},{id:126,category:"Debugging",icon:"🐛",question:"What is the difference between remote debugging and Hermes inspector? When should you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding debugging tools helps you choose the right approach for different issues. This shows practical debugging experience.</p>

            <h4>Comparison Table</h4>
            <pre><code>┌───────────────────┬─────────────────────┬─────────────────────┐
│ Feature           │ Remote Debugging    │ Hermes Inspector    │
├───────────────────┼─────────────────────┼─────────────────────┤
│ JS Engine         │ Chrome V8           │ Hermes              │
│ Performance       │ Slower (different   │ Accurate (same      │
│                   │ engine)             │ engine as prod)     │
│ Breakpoints       │ ✓ Full support      │ ✓ Full support      │
│ Network Tab       │ ✗ Not available     │ ✓ Via Flipper       │
│ Console           │ ✓ Full support      │ ✓ Full support      │
│ Profiling         │ ✗ Inaccurate        │ ✓ Accurate          │
│ Setup             │ Shake → Debug       │ Flipper/Chrome      │
└───────────────────┴─────────────────────┴─────────────────────┘</code></pre>

            <h4>Remote Debugging (Legacy)</h4>
            <pre><code>// Shake device → "Debug with Chrome"
// Opens chrome://inspect

// Pros:
// - Familiar Chrome DevTools interface
// - Good for quick debugging
// - Works without Hermes

// Cons:
// - JS runs in Chrome V8, not Hermes
// - Timing issues (async bridge communication)
// - Can hide/cause different bugs
// - Deprecated for Hermes apps</code></pre>

            <h4>Hermes Inspector (Recommended)</h4>
            <pre><code>// Option 1: Direct Chrome connection
// chrome://inspect → Configure → localhost:8081

// Option 2: Flipper (recommended)
// - Download Flipper from fbflipper.com
// - Connect device/emulator
// - Use Hermes Debugger plugin

// Enable Hermes in android/app/build.gradle:
project.ext.react = [
    enableHermes: true
]

// metro.config.js - ensure source maps
module.exports = {
  transformer: {
    minifierConfig: {
      sourceMap: { includeSources: true }
    }
  }
};</code></pre>

            <h4>When to Use Each</h4>
            <pre><code>Use Hermes Inspector when:
✓ Debugging performance issues
✓ Investigating timing-sensitive bugs
✓ Profiling JavaScript execution
✓ Production-like debugging

Use Remote Debugging when:
✓ Quick inspection of state/props
✓ Apps without Hermes enabled
✓ Rapid prototyping/learning</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Hermes is the default and recommended engine since RN 0.70</li>
                <li>Remote debugging runs code in a different engine - results may differ</li>
                <li>Flipper provides additional tools like network inspection</li>
            </ul>
        `},{id:127,category:"Security",icon:"🔒",question:"How do you implement secure storage using Keychain (iOS) and Keystore (Android)?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Storing sensitive data properly is critical for app security. This tests knowledge of platform-specific secure storage mechanisms.</p>

            <h4>react-native-keychain Usage</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';

// Store credentials securely
async function saveCredentials(username: string, password: string) {
  await Keychain.setGenericPassword(username, password, {
    service: 'com.myapp.auth',
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

// Retrieve credentials
async function getCredentials() {
  const credentials = await Keychain.getGenericPassword({
    service: 'com.myapp.auth',
  });
  if (credentials) {
    return { username: credentials.username, password: credentials.password };
  }
  return null;
}

// Delete credentials
async function clearCredentials() {
  await Keychain.resetGenericPassword({ service: 'com.myapp.auth' });
}</code></pre>

            <h4>Security Levels Comparison</h4>
            <pre><code>┌────────────────────────┬──────────────┬─────────────────────┐
│ Storage Method         │ Security     │ Use Case            │
├────────────────────────┼──────────────┼─────────────────────┤
│ AsyncStorage           │ ❌ None      │ Non-sensitive prefs │
│ Encrypted AsyncStorage │ ⚠️ Medium   │ Moderate sensitivity│
│ Keychain/Keystore      │ ✅ High      │ Tokens, passwords   │
│ Secure Enclave         │ ✅ Highest   │ Cryptographic keys  │
└────────────────────────┴──────────────┴─────────────────────┘</code></pre>

            <h4>Advanced: Store Encryption Keys</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';

// Generate and store encryption key
async function setupEncryption() {
  let credentials = await Keychain.getGenericPassword({
    service: 'encryption-key'
  });

  if (!credentials) {
    // Generate random key
    const key = CryptoJS.lib.WordArray.random(256/8).toString();
    await Keychain.setGenericPassword('key', key, {
      service: 'encryption-key',
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return key;
  }
  return credentials.password;
}

// Encrypt sensitive data
function encryptData(data: string, key: string): string {
  return CryptoJS.AES.encrypt(data, key).toString();
}

// Decrypt data
function decryptData(encrypted: string, key: string): string {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never store tokens in AsyncStorage - use Keychain/Keystore</li>
                <li>Use <code>WHEN_UNLOCKED_THIS_DEVICE_ONLY</code> for maximum security</li>
                <li>Keychain data persists across app reinstalls on iOS</li>
            </ul>
        `},{id:128,category:"Security",icon:"🔒",question:"How do you implement certificate pinning in React Native to prevent MITM attacks?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Certificate pinning prevents man-in-the-middle attacks even when device is compromised. Essential for apps handling sensitive data.</p>

            <h4>Using react-native-ssl-pinning</h4>
            <pre><code>import { fetch as sslFetch } from 'react-native-ssl-pinning';

// Option 1: Pin to certificate
const response = await sslFetch('https://api.myapp.com/data', {
  method: 'GET',
  sslPinning: {
    certs: ['cert1', 'cert2'], // Certificate file names (without extension)
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Option 2: Pin to public key hash (recommended)
const response = await sslFetch('https://api.myapp.com/data', {
  method: 'POST',
  sslPinning: {
    certs: ['sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='],
  },
  body: JSON.stringify(data),
});</code></pre>

            <h4>Getting Certificate Hash</h4>
            <pre><code># Get SHA256 hash for pinning
openssl s_client -servername api.myapp.com -connect api.myapp.com:443 | \\
  openssl x509 -pubkey -noout | \\
  openssl rsa -pubin -outform der | \\
  openssl dgst -sha256 -binary | \\
  openssl enc -base64

# Output: sha256/AAAA...= (use this for pinning)</code></pre>

            <h4>Native Implementation (iOS)</h4>
            <pre><code>// ios/MyApp/AppDelegate.m
#import &lt;TrustKit/TrustKit.h&gt;

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  NSDictionary *trustKitConfig = @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains: @{
      @"api.myapp.com": @{
        kTSKIncludeSubdomains: @YES,
        kTSKPublicKeyHashes: @[
          @"sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
          @"sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=", // Backup
        ],
      },
    },
  };
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
}</code></pre>

            <h4>Best Practices</h4>
            <pre><code>// 1. Always pin backup certificates
// 2. Handle pinning failures gracefully
try {
  const response = await sslFetch(url, options);
} catch (error) {
  if (error.message.includes('SSL')) {
    // Log security event
    analytics.track('ssl_pinning_failure', { url });
    // Show user-friendly error
    Alert.alert('Security Error', 'Unable to establish secure connection');
  }
}

// 3. Plan for certificate rotation
// Pin to multiple certs including upcoming ones</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Public key pinning survives certificate renewal</li>
                <li>Always have backup pins for certificate rotation</li>
                <li>Test pinning with proxy tools like Charles/mitmproxy</li>
            </ul>
        `},{id:129,category:"Security",icon:"🔒",question:"How do you implement biometric authentication (Face ID/Touch ID/Fingerprint) in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Biometric auth improves UX while maintaining security. This is increasingly expected in modern apps.</p>

            <h4>Using react-native-biometrics</h4>
            <pre><code>import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

// Check availability
async function checkBiometrics() {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();

  if (available) {
    switch (biometryType) {
      case BiometryTypes.TouchID:
        return 'Touch ID available';
      case BiometryTypes.FaceID:
        return 'Face ID available';
      case BiometryTypes.Biometrics:
        return 'Biometrics available (Android)';
    }
  }
  return 'Biometrics not available';
}

// Simple authentication
async function authenticate() {
  const { success, error } = await rnBiometrics.simplePrompt({
    promptMessage: 'Confirm your identity',
    cancelButtonText: 'Cancel',
  });

  if (success) {
    console.log('Authentication successful');
    return true;
  }
  console.log('Authentication failed:', error);
  return false;
}</code></pre>

            <h4>Cryptographic Biometric Auth</h4>
            <pre><code>// Generate keys protected by biometrics
async function setupBiometricKeys() {
  const { publicKey } = await rnBiometrics.createKeys();
  // Send publicKey to server for registration
  await api.registerBiometricKey(publicKey);
}

// Sign data with biometric-protected key
async function biometricLogin() {
  const payload = JSON.stringify({
    userId: 'user123',
    timestamp: Date.now(),
  });

  const { success, signature } = await rnBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload,
  });

  if (success) {
    // Server verifies signature with stored public key
    const { token } = await api.verifyBiometricSignature({
      payload,
      signature,
    });
    return token;
  }
  throw new Error('Biometric authentication failed');
}</code></pre>

            <h4>Fallback Strategy</h4>
            <pre><code>async function authenticateUser() {
  const { available } = await rnBiometrics.isSensorAvailable();

  if (available) {
    const biometricResult = await authenticate();
    if (biometricResult) return true;
  }

  // Fallback to PIN/password
  return showPinInput();
}

// iOS: Add to Info.plist
// &lt;key&gt;NSFaceIDUsageDescription&lt;/key&gt;
// &lt;string&gt;Authenticate to access your account&lt;/string&gt;</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always provide fallback authentication method</li>
                <li>Use cryptographic biometrics for high-security apps</li>
                <li>iOS requires NSFaceIDUsageDescription in Info.plist</li>
            </ul>
        `},{id:130,category:"Security",icon:"🔒",question:"How do you prevent sensitive data from appearing in logs and screenshots in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Data leakage through logs and screenshots is a common security oversight. This tests awareness of production security practices.</p>

            <h4>Preventing Logging in Production</h4>
            <pre><code>// babel.config.js - Remove console in production
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};

// Or selective logging wrapper
const logger = {
  log: (...args) => {
    if (__DEV__) console.log(...args);
  },
  error: (...args) => {
    // Always log errors but sanitize sensitive data
    const sanitized = args.map(arg => sanitize(arg));
    console.error(...sanitized);
  },
};

function sanitize(data) {
  if (typeof data === 'object') {
    const copy = { ...data };
    const sensitiveKeys = ['password', 'token', 'ssn', 'creditCard'];
    sensitiveKeys.forEach(key => {
      if (copy[key]) copy[key] = '[REDACTED]';
    });
    return copy;
  }
  return data;
}</code></pre>

            <h4>Preventing Screenshots</h4>
            <pre><code>// iOS: Blur when app goes to background
// AppDelegate.m
- (void)applicationWillResignActive:(UIApplication *)application {
  UIBlurEffect *blur = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  UIVisualEffectView *blurView = [[UIVisualEffectView alloc] initWithEffect:blur];
  blurView.frame = self.window.bounds;
  blurView.tag = 1234;
  [self.window addSubview:blurView];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [[self.window viewWithTag:1234] removeFromSuperview];
}

// Android: Prevent screenshots
// MainActivity.java
import android.view.WindowManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  getWindow().setFlags(
    WindowManager.LayoutParams.FLAG_SECURE,
    WindowManager.LayoutParams.FLAG_SECURE
  );
}</code></pre>

            <h4>React Native Implementation</h4>
            <pre><code>import { useEffect } from 'react';
import { AppState, Platform, NativeModules } from 'react-native';

function useScreenshotPrevention() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.PreventScreenshot?.enable();
      return () => NativeModules.PreventScreenshot?.disable();
    }
  }, []);
}

// Mask sensitive fields in app switcher
function SensitiveScreen() {
  const [isBackground, setIsBackground] = useState(false);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      setIsBackground(state !== 'active');
    });
    return () => sub.remove();
  }, []);

  if (isBackground) {
    return <View style={styles.masked}><Text>Content Hidden</Text></View>;
  }
  return <SensitiveContent />;
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Remove console.log in production builds</li>
                <li>Use FLAG_SECURE on Android for sensitive screens</li>
                <li>Blur/hide content when app enters background</li>
            </ul>
        `},{id:131,category:"Offline & Storage",icon:"💾",question:"What are the differences between AsyncStorage, MMKV, and SQLite? When would you use each?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Choosing the right storage solution affects app performance and capabilities. This tests practical decision-making skills.</p>

            <h4>Comparison Table</h4>
            <pre><code>┌─────────────────┬──────────────┬──────────────┬──────────────┐
│ Feature         │ AsyncStorage │ MMKV         │ SQLite       │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Speed           │ Slow         │ Very Fast    │ Fast         │
│ Data Type       │ String only  │ Multiple     │ Structured   │
│ Query Support   │ Key-value    │ Key-value    │ Full SQL     │
│ Size Limit      │ ~6MB Android │ No limit     │ No limit     │
│ Encryption      │ No           │ Yes          │ With ext     │
│ Sync API        │ No           │ Yes          │ No           │
│ Bundle Size     │ Small        │ Medium       │ Large        │
└─────────────────┴──────────────┴──────────────┴──────────────┘</code></pre>

            <h4>AsyncStorage (Simple Key-Value)</h4>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Store and retrieve
await AsyncStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(await AsyncStorage.getItem('user'));

// Best for:
// - Small amounts of data
// - Simple settings/preferences
// - When you need minimal dependencies</code></pre>

            <h4>MMKV (High Performance)</h4>
            <pre><code>import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'app-storage', encryptionKey: 'secret' });

// Synchronous API - much faster
storage.set('user', JSON.stringify(user));
const user = JSON.parse(storage.getString('user'));
storage.set('count', 42); // Supports numbers directly
storage.set('enabled', true); // Supports booleans

// Best for:
// - High-frequency reads/writes
// - Performance-critical apps
// - When you need encryption</code></pre>

            <h4>SQLite (Relational Data)</h4>
            <pre><code>import SQLite from 'react-native-sqlite-storage';

const db = await SQLite.openDatabase({ name: 'app.db' });

// Create tables and query
await db.executeSql(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE
  )
\`);

const [results] = await db.executeSql(
  'SELECT * FROM users WHERE name LIKE ?',
  ['%john%']
);

// Best for:
// - Complex data relationships
// - Large datasets with querying needs
// - Offline-first apps with sync requirements</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>MMKV is 30x faster than AsyncStorage</li>
                <li>Use SQLite when you need JOINs or complex queries</li>
                <li>Consider WatermelonDB for reactive SQLite with sync</li>
            </ul>
        `},{id:132,category:"Offline & Storage",icon:"💾",question:"How do you design an offline-first architecture in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Offline-first apps provide better UX in unreliable network conditions. This tests system design and data management skills.</p>

            <h4>Architecture Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│                    React Native App                  │
├─────────────────────────────────────────────────────┤
│  UI Layer                                           │
│  ├── Optimistic Updates                             │
│  └── Loading/Sync States                            │
├─────────────────────────────────────────────────────┤
│  Data Layer                                         │
│  ├── Local Database (SQLite/WatermelonDB)           │
│  ├── Sync Queue (Pending Changes)                   │
│  └── Conflict Resolution Logic                      │
├─────────────────────────────────────────────────────┤
│  Network Layer                                      │
│  ├── Online/Offline Detection                       │
│  ├── Background Sync                                │
│  └── Retry Logic                                    │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Sync Queue Implementation</h4>
            <pre><code>interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  data: any;
  timestamp: number;
  retries: number;
}

class SyncQueue {
  private queue: SyncOperation[] = [];
  private isOnline = true;

  async addOperation(op: Omit<SyncOperation, 'id' | 'timestamp' | 'retries'>) {
    const operation = {
      ...op,
      id: uuid(),
      timestamp: Date.now(),
      retries: 0,
    };
    this.queue.push(operation);
    await this.persistQueue();

    if (this.isOnline) {
      this.processQueue();
    }
  }

  async processQueue() {
    for (const op of this.queue) {
      try {
        await this.syncOperation(op);
        this.queue = this.queue.filter(o => o.id !== op.id);
      } catch (error) {
        op.retries++;
        if (op.retries > 3) {
          // Move to dead letter queue
          await this.handleFailedOperation(op);
        }
      }
    }
    await this.persistQueue();
  }
}</code></pre>

            <h4>Network State Management</h4>
            <pre><code>import NetInfo from '@react-native-community/netinfo';

function useOfflineFirst() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOffline = !isOnline;
      setIsOnline(state.isConnected);

      // Trigger sync when coming back online
      if (wasOffline && state.isConnected) {
        syncQueue.processQueue();
      }
    });
    return unsubscribe;
  }, [isOnline]);

  return { isOnline, pendingSync };
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always write to local DB first, then sync</li>
                <li>Use timestamps for conflict resolution</li>
                <li>Show sync status to users (pending changes count)</li>
            </ul>
        `},{id:133,category:"Offline & Storage",icon:"💾",question:"How do you handle data synchronization conflicts in React Native apps?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Sync conflicts are inevitable in offline-first apps. This tests your ability to design robust data consistency strategies.</p>

            <h4>Conflict Resolution Strategies</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Strategy          │ Use Case                        │
├───────────────────┼─────────────────────────────────┤
│ Last Write Wins   │ Simple data, low conflict risk  │
│ First Write Wins  │ Reservation systems             │
│ Manual Merge      │ Collaborative editing           │
│ Field-Level Merge │ Complex objects                 │
│ CRDT              │ Real-time collaboration         │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Last Write Wins Implementation</h4>
            <pre><code>interface SyncableEntity {
  id: string;
  updatedAt: number;
  version: number;
  data: any;
}

async function syncEntity(local: SyncableEntity, remote: SyncableEntity) {
  if (local.updatedAt > remote.updatedAt) {
    // Local is newer, push to server
    await api.update(local);
    return local;
  } else if (remote.updatedAt > local.updatedAt) {
    // Remote is newer, update local
    await db.update(remote);
    return remote;
  }
  // Same timestamp - use version number
  return local.version > remote.version ? local : remote;
}</code></pre>

            <h4>Field-Level Merge</h4>
            <pre><code>function mergeDocuments(local: Doc, remote: Doc, base: Doc): Doc {
  const merged = { ...base };

  for (const key of Object.keys(local)) {
    const localChanged = local[key] !== base[key];
    const remoteChanged = remote[key] !== base[key];

    if (localChanged && !remoteChanged) {
      merged[key] = local[key];
    } else if (!localChanged && remoteChanged) {
      merged[key] = remote[key];
    } else if (localChanged && remoteChanged) {
      // Both changed - need conflict resolution
      if (local[key] === remote[key]) {
        merged[key] = local[key]; // Same change
      } else {
        // Actual conflict - use timestamp or prompt user
        merged[key] = resolveConflict(key, local, remote);
      }
    }
  }
  return merged;
}</code></pre>

            <h4>User-Facing Conflict Resolution</h4>
            <pre><code>function ConflictResolver({ local, remote, onResolve }) {
  return (
    <View style={styles.conflictModal}>
      <Text>This item was modified on another device</Text>

      <TouchableOpacity onPress={() => onResolve(local)}>
        <Text>Keep my version</Text>
        <Text style={styles.preview}>{local.title}</Text>
        <Text>Modified: {formatDate(local.updatedAt)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onResolve(remote)}>
        <Text>Use server version</Text>
        <Text style={styles.preview}>{remote.title}</Text>
        <Text>Modified: {formatDate(remote.updatedAt)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onResolve(merge(local, remote))}>
        <Text>Merge both versions</Text>
      </TouchableOpacity>
    </View>
  );
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Track base version for three-way merge</li>
                <li>Use vector clocks for distributed conflict detection</li>
                <li>Always preserve conflicting data - never silently lose changes</li>
            </ul>
        `},{id:134,category:"Offline & Storage",icon:"💾",question:"How do you implement background data synchronization in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Background sync keeps data fresh without user intervention. This tests knowledge of platform-specific background task APIs.</p>

            <h4>iOS Background Fetch</h4>
            <pre><code>// ios/AppDelegate.m
- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Enable background fetch
  [application setMinimumBackgroundFetchInterval:
    UIApplicationBackgroundFetchIntervalMinimum];
  return YES;
}

- (void)application:(UIApplication *)application
    performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))handler {
  // Trigger JS sync
  [RNBackgroundSync performSyncWithCompletion:^(BOOL success) {
    handler(success ? UIBackgroundFetchResultNewData
                   : UIBackgroundFetchResultNoData);
  }];
}</code></pre>

            <h4>React Native Background Task</h4>
            <pre><code>import BackgroundFetch from 'react-native-background-fetch';

async function initBackgroundSync() {
  await BackgroundFetch.configure({
    minimumFetchInterval: 15, // minutes
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  }, async (taskId) => {
    console.log('[BackgroundFetch] Task:', taskId);

    try {
      // Perform sync operations
      await syncPendingChanges();
      await fetchNewData();

      BackgroundFetch.finish(taskId);
    } catch (error) {
      console.error('Background sync failed:', error);
      BackgroundFetch.finish(taskId);
    }
  }, (taskId) => {
    // Task timeout
    BackgroundFetch.finish(taskId);
  });
}

// Headless task for Android
BackgroundFetch.registerHeadlessTask(async ({ taskId }) => {
  await syncPendingChanges();
  BackgroundFetch.finish(taskId);
});</code></pre>

            <h4>WorkManager for Android</h4>
            <pre><code>// Using react-native-workmanager
import WorkManager from 'react-native-workmanager';

// Register periodic sync
await WorkManager.enqueuePeriodicWork(
  'data-sync',
  WorkManager.ExistingPeriodicWorkPolicy.KEEP,
  {
    repeatInterval: 15, // minutes
    constraints: {
      networkType: WorkManager.NetworkType.CONNECTED,
      requiresBatteryNotLow: true,
    },
  }
);

// Worker implementation
WorkManager.setWorker('data-sync', async () => {
  const pending = await db.getPendingChanges();
  for (const change of pending) {
    await api.sync(change);
    await db.markSynced(change.id);
  }
  return WorkManager.Result.SUCCESS;
});</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>iOS limits background fetch to ~30 seconds</li>
                <li>Android WorkManager survives app restarts</li>
                <li>Use constraints to sync only on WiFi/charging</li>
            </ul>
        `},{id:135,category:"Architecture",icon:"🏛️",question:"How do you set up a monorepo for React Native with shared code across platforms?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Monorepos enable code sharing across mobile, web, and backend. This tests your ability to architect scalable project structures.</p>

            <h4>Monorepo Structure with Turborepo</h4>
            <pre><code>my-monorepo/
├── apps/
│   ├── mobile/              # React Native app
│   │   ├── src/
│   │   ├── ios/
│   │   ├── android/
│   │   └── package.json
│   ├── web/                 # Next.js/React web app
│   │   └── package.json
│   └── admin/               # Admin dashboard
│       └── package.json
├── packages/
│   ├── ui/                  # Shared UI components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── utils/               # Shared utilities
│   ├── api-client/          # API client
│   ├── types/               # Shared TypeScript types
│   └── config/              # Shared configs (eslint, tsconfig)
├── turbo.json
├── package.json
└── pnpm-workspace.yaml</code></pre>

            <h4>Workspace Configuration</h4>
            <pre><code>// pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'

// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}

// Root package.json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "mobile": "turbo run dev --filter=mobile",
    "web": "turbo run dev --filter=web"
  }
}</code></pre>

            <h4>Cross-Platform UI Package</h4>
            <pre><code>// packages/ui/src/Button.tsx
import { Platform } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  // Works on both web and native
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, styles[variant]]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

// packages/ui/package.json
{
  "name": "@myapp/ui",
  "main": "src/index.ts",
  "react-native": "src/index.ts"
}</code></pre>

            <h4>Metro Config for Monorepo</h4>
            <pre><code>// apps/mobile/metro.config.js
const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use pnpm for better monorepo performance</li>
                <li>Turborepo caches builds for faster CI</li>
                <li>Keep platform-specific code in apps/, shared in packages/</li>
            </ul>
        `},{id:136,category:"Architecture",icon:"🏛️",question:"How do you implement Clean Architecture in a React Native application?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Clean Architecture separates concerns and makes code testable and maintainable. This tests advanced architectural thinking.</p>

            <h4>Layer Structure</h4>
            <pre><code>src/
├── domain/                    # Business logic (innermost)
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/          # Interfaces only
│   │   └── UserRepository.ts
│   └── usecases/
│       └── GetUserUseCase.ts
├── data/                      # Data layer
│   ├── repositories/          # Implementations
│   │   └── UserRepositoryImpl.ts
│   ├── datasources/
│   │   ├── remote/
│   │   └── local/
│   └── models/
│       └── UserDTO.ts
├── presentation/              # UI layer (outermost)
│   ├── screens/
│   ├── components/
│   ├── viewmodels/
│   └── navigation/
└── di/                        # Dependency injection
    └── container.ts</code></pre>

            <h4>Domain Layer (Pure Business Logic)</h4>
            <pre><code>// domain/entities/User.ts
export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

// domain/repositories/UserRepository.ts
export interface UserRepository {
  getUser(id: string): Promise<User>;
  updateUser(user: User): Promise<void>;
}

// domain/usecases/GetUserUseCase.ts
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.getUser(userId);
    // Business logic here
    return user;
  }
}</code></pre>

            <h4>Data Layer (External Dependencies)</h4>
            <pre><code>// data/repositories/UserRepositoryImpl.ts
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private api: ApiClient,
    private cache: CacheService
  ) {}

  async getUser(id: string): Promise<User> {
    // Check cache first
    const cached = await this.cache.get(\`user:\${id}\`);
    if (cached) return this.mapToEntity(cached);

    // Fetch from API
    const dto = await this.api.get<UserDTO>(\`/users/\${id}\`);
    await this.cache.set(\`user:\${id}\`, dto);
    return this.mapToEntity(dto);
  }

  private mapToEntity(dto: UserDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: \`\${dto.firstName} \${dto.lastName}\`,
      isPremium: dto.subscription === 'premium',
    };
  }
}</code></pre>

            <h4>Presentation Layer (UI + ViewModel)</h4>
            <pre><code>// presentation/viewmodels/useUserViewModel.ts
export function useUserViewModel(userId: string) {
  const getUserUseCase = useInjection(GetUserUseCase);
  const [state, setState] = useState<ViewState>({ status: 'idle' });

  const loadUser = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const user = await getUserUseCase.execute(userId);
      setState({ status: 'success', data: user });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }, [userId]);

  return { state, loadUser };
}

// presentation/screens/ProfileScreen.tsx
function ProfileScreen({ userId }) {
  const { state, loadUser } = useUserViewModel(userId);
  // UI only cares about state, not implementation
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Domain layer has zero dependencies on frameworks</li>
                <li>Use dependency injection for testability</li>
                <li>Data flows inward; dependencies point inward</li>
            </ul>
        `},{id:137,category:"Architecture",icon:"🏛️",question:"How do you structure a feature-based folder architecture in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Feature-based structure scales better than type-based organization. This shows practical experience with large codebases.</p>

            <h4>Feature-Based Structure</h4>
            <pre><code>src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   └── authSlice.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts            # Public exports
│   ├── profile/
│   │   ├── components/
│   │   ├── screens/
│   │   └── index.ts
│   └── checkout/
│       └── ...
├── shared/                     # Cross-feature code
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── hooks/
│   ├── utils/
│   └── services/
├── navigation/
│   └── RootNavigator.tsx
└── App.tsx</code></pre>

            <h4>Feature Module Pattern</h4>
            <pre><code>// features/auth/index.ts
// Only export public API of the feature
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';
export { useAuth } from './hooks/useAuth';
export { authReducer } from './store/authSlice';
export type { User, AuthState } from './types/auth.types';

// Internal components stay private
// Don't export: LoginForm, validation utils, etc.

// Usage from another feature
import { useAuth, User } from '@/features/auth';
// NOT: import { LoginForm } from '@/features/auth/components/LoginForm';</code></pre>

            <h4>Path Aliases Configuration</h4>
            <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}

// babel.config.js
module.exports = {
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': './src',
        '@features': './src/features',
        '@shared': './src/shared',
      },
    }],
  ],
};</code></pre>

            <h4>Feature Boundaries</h4>
            <pre><code>// Rules for feature boundaries:

// ✓ Feature can import from shared/
import { Button } from '@shared/components';

// ✓ Feature can import public exports from other features
import { useAuth } from '@features/auth';

// ✗ Never import internal files from other features
import { LoginForm } from '@features/auth/components/LoginForm';

// ✗ Never create circular dependencies between features
// If two features need to share, move to shared/</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Each feature should be deletable without breaking others</li>
                <li>Use barrel exports (index.ts) to define public API</li>
                <li>Shared folder contains truly generic, reusable code</li>
            </ul>
        `},{id:138,category:"Architecture",icon:"🏛️",question:"How do you build a design system architecture for React Native apps?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Design systems ensure UI consistency and speed up development. This tests your ability to create scalable, maintainable component libraries.</p>

            <h4>Design System Structure</h4>
            <pre><code>design-system/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── primitives/
│   ├── Box.tsx
│   ├── Text.tsx
│   └── Pressable.tsx
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   └── Card/
├── patterns/
│   ├── FormField/
│   └── ListItem/
└── theme/
    ├── ThemeProvider.tsx
    └── useTheme.ts</code></pre>

            <h4>Design Tokens</h4>
            <pre><code>// tokens/colors.ts
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',
    900: '#0D47A1',
  },
  neutral: {
    0: '#FFFFFF',
    100: '#F5F5F5',
    900: '#212121',
  },
  semantic: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
} as const;

// tokens/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// tokens/typography.ts
export const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
} as const;</code></pre>

            <h4>Primitive Components</h4>
            <pre><code>// primitives/Box.tsx
interface BoxProps extends ViewProps {
  p?: keyof typeof spacing;
  m?: keyof typeof spacing;
  bg?: string;
  flex?: number;
  row?: boolean;
}

export function Box({ p, m, bg, flex, row, style, ...props }: BoxProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        p && { padding: spacing[p] },
        m && { margin: spacing[m] },
        bg && { backgroundColor: bg },
        flex && { flex },
        row && { flexDirection: 'row' },
        style,
      ]}
      {...props}
    />
  );
}

// Usage
<Box p="md" bg={colors.neutral[100]} row>
  <Text variant="body">Hello</Text>
</Box></code></pre>

            <h4>Component Variants</h4>
            <pre><code>// components/Button/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onPress: () => void;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary[500] },
  secondary: { backgroundColor: colors.neutral[100] },
  ghost: { backgroundColor: 'transparent' },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  children,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[variantStyles[variant], sizeStyles[size]]}
    >
      {loading ? <ActivityIndicator /> : children}
    </Pressable>
  );
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Tokens are the foundation - components use tokens, never raw values</li>
                <li>Primitives handle layout; components handle specific UI patterns</li>
                <li>Use TypeScript for variant autocomplete and validation</li>
            </ul>
        `},{id:139,category:"Real-World Scenarios",icon:"🌍",question:"How would you migrate a large Expo app to bare React Native workflow?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Migration decisions impact development velocity and capabilities. This tests strategic thinking and practical experience.</p>

            <h4>Migration Decision Framework</h4>
            <pre><code>Consider migrating when:
✓ Need custom native modules not supported by Expo
✓ Require specific native SDK integrations
✓ App size optimization is critical
✓ Need full control over native build process

Stay with Expo when:
✓ Rapid iteration is priority
✓ Team lacks native development experience
✓ Using Expo's managed services (EAS, updates)
✓ Features are available in Expo SDK</code></pre>

            <h4>Step-by-Step Migration</h4>
            <pre><code>// Step 1: Eject from Expo
npx expo prebuild

// This generates:
// - ios/ folder with Xcode project
// - android/ folder with Gradle project
// - Updates package.json with native dependencies

// Step 2: Audit Expo dependencies
// Replace expo-* packages with community alternatives:
expo-camera → react-native-camera / vision-camera
expo-location → react-native-geolocation-service
expo-notifications → react-native-push-notification
expo-file-system → react-native-fs

// Step 3: Update imports
// Before:
import * as Location from 'expo-location';

// After:
import Geolocation from 'react-native-geolocation-service';</code></pre>

            <h4>Handling Expo-Specific Features</h4>
            <pre><code>// OTA Updates: expo-updates → CodePush
// Before (Expo):
import * as Updates from 'expo-updates';
await Updates.checkForUpdateAsync();

// After (CodePush):
import codePush from 'react-native-code-push';
codePush.sync({ updateDialog: true });

// Auth Session replacement
// expo-auth-session → react-native-app-auth
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'YOUR_CLIENT_ID',
  redirectUrl: 'com.myapp:/oauth2redirect',
  scopes: ['openid', 'profile'],
};

const result = await authorize(config);</code></pre>

            <h4>Migration Checklist</h4>
            <pre><code>□ Run 'expo prebuild' to generate native projects
□ Audit all expo-* dependencies
□ Replace with community alternatives
□ Update native project configurations
□ Set up native build pipeline (Fastlane/CI)
□ Configure code signing (iOS) and signing keys (Android)
□ Test all features on physical devices
□ Update deployment process
□ Document new native development setup</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Consider Expo Dev Client as middle ground</li>
                <li>Migrate incrementally - one module at a time</li>
                <li>Plan for increased maintenance burden</li>
            </ul>
        `},{id:140,category:"Real-World Scenarios",icon:"🌍",question:"How do you handle app store rejections in React Native apps?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>App store rejections delay releases and frustrate stakeholders. This tests your knowledge of platform guidelines and debugging skills.</p>

            <h4>Common iOS Rejection Reasons</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Rejection Type          │ Solution                  │
├─────────────────────────┼───────────────────────────┤
│ Guideline 2.1 - Crashes │ Test all flows, fix bugs  │
│ Guideline 2.3 - Metadata│ Accurate screenshots/desc │
│ Guideline 4.2 - Spam    │ Unique value proposition  │
│ Guideline 5.1 - Privacy │ Add privacy policy, IDFA  │
│ Guideline 3.1 - Payments│ Use StoreKit for digital  │
└─────────────────────────┴───────────────────────────┘</code></pre>

            <h4>Privacy & Permissions</h4>
            <pre><code>// ios/MyApp/Info.plist - Required usage descriptions
&lt;key&gt;NSCameraUsageDescription&lt;/key&gt;
&lt;string&gt;Take photos for your profile&lt;/string&gt;

&lt;key&gt;NSPhotoLibraryUsageDescription&lt;/key&gt;
&lt;string&gt;Select photos from your library&lt;/string&gt;

&lt;key&gt;NSLocationWhenInUseUsageDescription&lt;/key&gt;
&lt;string&gt;Find nearby stores&lt;/string&gt;

// App Tracking Transparency (iOS 14.5+)
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

async function requestTracking() {
  const { status } = await requestTrackingPermissionsAsync();
  if (status === 'granted') {
    // Enable analytics with IDFA
  }
}</code></pre>

            <h4>Android Rejection Handling</h4>
            <pre><code>// Common Google Play rejections:

// 1. Policy violation: Permissions
// Only request permissions you actually need
// Explain why in store listing

// 2. Target API level
// android/app/build.gradle
android {
  defaultConfig {
    targetSdkVersion 34  // Must meet current requirement
  }
}

// 3. Data Safety form
// Declare all data collection in Play Console
// Be specific: what data, why, shared with whom

// 4. App content rating
// Complete the content rating questionnaire accurately</code></pre>

            <h4>Rejection Response Strategy</h4>
            <pre><code>// 1. Read rejection carefully - understand specific issue

// 2. Check Resolution Center for details
// Apple often provides specific feedback

// 3. If unclear, reply requesting clarification:
"Thank you for your feedback. Could you please provide
more details about which specific feature or screen
triggered this rejection? We want to ensure we address
the correct issue."

// 4. Document changes made:
"We have addressed the issue by:
1. Removing X feature
2. Adding privacy disclosure for Y
3. Updating screenshots to reflect Z"

// 5. Keep records for future submissions</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test on physical devices before submission</li>
                <li>Read App Store Review Guidelines thoroughly</li>
                <li>Use TestFlight/Internal Testing before production</li>
            </ul>
        `},{id:141,category:"Real-World Scenarios",icon:"🌍",question:"How do you achieve a crash-free release in React Native?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Crash-free rates directly impact user retention and app store ranking. This tests quality assurance and release management skills.</p>

            <h4>Pre-Release Checklist</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Phase             │ Actions                         │
├───────────────────┼─────────────────────────────────┤
│ Development       │ TypeScript strict mode          │
│                   │ ESLint with strict rules        │
│                   │ Unit tests for business logic   │
├───────────────────┼─────────────────────────────────┤
│ Testing           │ Integration tests               │
│                   │ E2E tests (Detox)               │
│                   │ Manual QA on devices            │
├───────────────────┼─────────────────────────────────┤
│ Pre-Release       │ Beta testing (TestFlight)       │
│                   │ Staged rollout (1% → 100%)      │
│                   │ Crash monitoring active         │
├───────────────────┼─────────────────────────────────┤
│ Post-Release      │ Monitor crash-free rate         │
│                   │ Quick hotfix process ready      │
│                   │ Rollback plan prepared          │
└───────────────────┴─────────────────────────────────┘</code></pre>

            <h4>Error Boundaries for JS Crashes</h4>
            <pre><code>class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Report to crash service
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text>Something went wrong</Text>
          <Button
            title="Try Again"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }
    return this.props.children;
  }
}

// Wrap critical sections
<ErrorBoundary>
  <PaymentFlow />
</ErrorBoundary></code></pre>

            <h4>Staged Rollout Strategy</h4>
            <pre><code>// Google Play staged rollout
Day 1: 1% of users
Day 2: 5% if crash-free > 99%
Day 3: 20% if crash-free > 99%
Day 5: 50% if crash-free > 99%
Day 7: 100% if stable

// iOS: Use phased release
// App Store Connect → Phased Release
// Automatically rolls out over 7 days

// CodePush for JS-only fixes
codePush.sync({
  deploymentKey: PRODUCTION_KEY,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  rollbackRetryOptions: {
    delayInHours: 24,
    maxRetryAttempts: 3,
  },
});</code></pre>

            <h4>Crash Monitoring Setup</h4>
            <pre><code>// Sentry configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
  tracesSampleRate: 0.2,
  beforeSend(event) {
    // Sanitize sensitive data
    if (event.user) {
      delete event.user.email;
    }
    return event;
  },
});

// Set user context for better debugging
Sentry.setUser({ id: userId });
Sentry.setTag('app_version', appVersion);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Target 99.5%+ crash-free rate</li>
                <li>Have rollback/hotfix process ready before release</li>
                <li>Use feature flags to disable problematic features</li>
            </ul>
        `},{id:142,category:"Real-World Scenarios",icon:"🌍",question:"Describe how you would debug a production performance regression.",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Production issues require systematic debugging without access to user devices. This tests real-world problem-solving skills.</p>

            <h4>Investigation Workflow</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Step 1: Identify Scope                              │
├─────────────────────────────────────────────────────┤
│ - Which version introduced the regression?          │
│ - Which screens/features are affected?              │
│ - Which devices/OS versions?                        │
│ - What % of users are impacted?                     │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│ Step 2: Gather Data                                 │
├─────────────────────────────────────────────────────┤
│ - Performance monitoring (Firebase/Sentry)          │
│ - User feedback/support tickets                     │
│ - App store reviews mentioning slowness             │
│ - Compare metrics: before vs after release          │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Remote Performance Monitoring</h4>
            <pre><code>// Track custom performance metrics
import perf from '@react-native-firebase/perf';

async function measureScreenLoad(screenName: string) {
  const trace = await perf().newTrace(\`screen_\${screenName}\`);
  await trace.start();

  // Screen renders...

  await trace.stop();
}

// Track specific operations
const httpMetric = await perf().newHttpMetric(url, 'GET');
await httpMetric.start();
const response = await fetch(url);
httpMetric.setHttpResponseCode(response.status);
httpMetric.setResponseContentType(response.headers.get('Content-Type'));
await httpMetric.stop();</code></pre>

            <h4>Reproduce Locally</h4>
            <pre><code>// 1. Match production environment
// - Use release build, not debug
cd android && ./gradlew assembleRelease
cd ios && xcodebuild -configuration Release

// 2. Test on same device models reported
// Use Firebase Test Lab or BrowserStack

// 3. Profile with production-like data
// Import anonymized production data

// 4. Use Flipper/Profiler in release
// Add to metro.config.js for release profiling
module.exports = {
  transformer: {
    minifierConfig: {
      keep_fnames: true, // Keep function names for profiling
    },
  },
};</code></pre>

            <h4>Common Regression Causes</h4>
            <pre><code>// 1. New dependency with performance issues
// Check: package-lock.json diff between versions

// 2. Accidental debug code in production
if (__DEV__) { // Make sure this is correct
  enableScreens(); // Not: enableScreens(false)
}

// 3. Missing memoization after refactor
// Before (fast):
const MemoizedList = React.memo(ExpensiveList);

// After refactor (slow - memo removed accidentally):
const List = ExpensiveList;

// 4. Increased re-renders from context changes
// Use React DevTools Profiler "Highlight updates"</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always compare git diffs between working and broken versions</li>
                <li>Use feature flags to isolate suspect code</li>
                <li>Binary search through commits if cause unclear</li>
            </ul>
        `},{id:143,category:"Real-World Scenarios",icon:"🌍",question:"How do you handle breaking changes when upgrading React Native versions?",difficulty:"advanced",seniority:"senior",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>RN upgrades are notoriously challenging. This tests your experience with complex migration projects and risk management.</p>

            <h4>Upgrade Strategy</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Phase 1: Assessment                                 │
├─────────────────────────────────────────────────────┤
│ 1. Read release notes and changelog                 │
│ 2. Check react-native-community/upgrade-helper      │
│ 3. Audit third-party dependencies compatibility     │
│ 4. Estimate effort and create upgrade branch        │
└─────────────────────────────────────────────────────┘

// Use upgrade helper
npx react-native upgrade-helper 0.72.0 0.73.0
// Shows exact file diffs needed</code></pre>

            <h4>Dependency Audit</h4>
            <pre><code>// Check compatibility before upgrading
npx npm-check-updates --target minor

// Common breaking changes to check:
// - react-native-reanimated (often needs updates)
// - react-navigation (major version changes)
// - native-base, react-native-paper (UI libs)

// Create compatibility matrix
┌─────────────────────────┬───────────┬───────────┐
│ Package                 │ Current   │ RN 0.73   │
├─────────────────────────┼───────────┼───────────┤
│ react-native-reanimated │ 3.3.0     │ 3.6.0 ✓   │
│ react-navigation        │ 6.x       │ 6.x ✓     │
│ react-native-maps       │ 1.7.1     │ 1.8.0 ✓   │
│ some-old-lib            │ 2.0.0     │ ✗ No      │
└─────────────────────────┴───────────┴───────────┘</code></pre>

            <h4>Incremental Migration</h4>
            <pre><code>// Step 1: Upgrade React Native core
npm install react-native@0.73.0 react@18.2.0

// Step 2: Update native files
// Follow upgrade-helper diff for:
// - android/app/build.gradle
// - ios/Podfile
// - android/gradle.properties
// - ios/MyApp/AppDelegate.mm

// Step 3: Update dependencies one by one
npm install react-native-reanimated@latest
cd ios && pod install

// Step 4: Fix breaking changes
// New Architecture migration if needed
// Update deprecated APIs</code></pre>

            <h4>Common Breaking Changes</h4>
            <pre><code>// RN 0.73: Remove Flipper by default
// android/app/build.gradle - remove flipper deps

// RN 0.72: Kotlin required for Android
// android/build.gradle
buildscript {
  ext {
    kotlinVersion = "1.8.0"
  }
}

// RN 0.71: TypeScript by default
// Rename .js files to .tsx

// RN 0.70: Hermes default engine
// Remove JavaScriptCore references

// After upgrade, test thoroughly:
npx react-native run-android --variant=release
npx react-native run-ios --configuration Release</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never upgrade more than 2 minor versions at once</li>
                <li>Create a dedicated branch, don't upgrade in main</li>
                <li>Run full regression test suite after upgrade</li>
            </ul>
        `},{id:144,category:"Real-World Scenarios",icon:"🌍",question:"How would you implement a feature flag system for gradual feature rollout?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Feature flags enable safe releases and A/B testing. This tests your understanding of release strategies and risk mitigation.</p>

            <h4>Feature Flag Architecture</h4>
            <pre><code>// Simple local implementation
interface FeatureFlags {
  newCheckout: boolean;
  darkMode: boolean;
  experimentalSearch: boolean;
}

const defaultFlags: FeatureFlags = {
  newCheckout: false,
  darkMode: true,
  experimentalSearch: false,
};

// Context provider
const FeatureFlagContext = createContext<FeatureFlags>(defaultFlags);

function FeatureFlagProvider({ children }) {
  const [flags, setFlags] = useState(defaultFlags);

  useEffect(() => {
    // Fetch from remote config
    fetchFeatureFlags().then(setFlags);
  }, []);

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

// Hook for components
function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const flags = useContext(FeatureFlagContext);
  return flags[flag];
}</code></pre>

            <h4>Firebase Remote Config</h4>
            <pre><code>import remoteConfig from '@react-native-firebase/remote-config';

async function initializeFeatureFlags() {
  await remoteConfig().setDefaults({
    new_checkout: false,
    checkout_variant: 'control',
    feature_rollout_percentage: 0,
  });

  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 3600000, // 1 hour
  });

  await remoteConfig().fetchAndActivate();
}

function useRemoteFeature(key: string, defaultValue: boolean) {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    const value = remoteConfig().getValue(key);
    setEnabled(value.asBoolean());

    // Listen for updates
    const unsubscribe = remoteConfig().onConfigUpdated(() => {
      remoteConfig().activate().then(() => {
        setEnabled(remoteConfig().getValue(key).asBoolean());
      });
    });

    return unsubscribe;
  }, [key]);

  return enabled;
}</code></pre>

            <h4>Percentage-Based Rollout</h4>
            <pre><code>function isFeatureEnabledForUser(
  userId: string,
  rolloutPercentage: number
): boolean {
  // Deterministic hash based on userId
  // Same user always gets same result
  const hash = hashCode(userId);
  const bucket = Math.abs(hash) % 100;
  return bucket < rolloutPercentage;
}

// Usage
const rolloutPercentage = remoteConfig()
  .getValue('new_checkout_percentage')
  .asNumber();

const showNewCheckout = isFeatureEnabledForUser(userId, rolloutPercentage);

// Gradually increase: 1% → 5% → 20% → 50% → 100%</code></pre>

            <h4>Component Usage</h4>
            <pre><code>function CheckoutScreen() {
  const newCheckoutEnabled = useFeatureFlag('newCheckout');

  if (newCheckoutEnabled) {
    return <NewCheckoutFlow />;
  }
  return <LegacyCheckoutFlow />;
}

// Or with a Feature component
function Feature({ flag, children, fallback = null }) {
  const enabled = useFeatureFlag(flag);
  return enabled ? children : fallback;
}

<Feature flag="experimentalSearch" fallback={<OldSearch />}>
  <NewSearch />
</Feature></code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use deterministic hashing for consistent user experience</li>
                <li>Always have a kill switch for quick rollback</li>
                <li>Clean up old flags after full rollout</li>
            </ul>
        `},{id:145,category:"Accessibility",icon:"♿",question:"How do you implement VoiceOver (iOS) and TalkBack (Android) support in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Accessibility is both a legal requirement and ethical responsibility. Apps must be usable by people with visual impairments.</p>

            <h4>Core Accessibility Props</h4>
            <pre><code>// Basic accessible component
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add item to cart"
  accessibilityHint="Double tap to add this product to your shopping cart"
  accessibilityRole="button"
  accessibilityState={{ disabled: isLoading }}
  onPress={addToCart}
>
  <Text>Add to Cart</Text>
</TouchableOpacity>

// Image with description
<Image
  source={productImage}
  accessible={true}
  accessibilityLabel="Red Nike running shoes, size 10"
/>

// Group related elements
<View
  accessible={true}
  accessibilityLabel="Product: Nike Shoes. Price: $99.99. Rating: 4.5 stars"
>
  <Text>Nike Shoes</Text>
  <Text>$99.99</Text>
  <StarRating value={4.5} />
</View></code></pre>

            <h4>Accessibility Roles</h4>
            <pre><code>// Common roles
accessibilityRole="button"      // Clickable element
accessibilityRole="link"        // Navigation link
accessibilityRole="header"      // Section header
accessibilityRole="image"       // Decorative or informative image
accessibilityRole="text"        // Static text
accessibilityRole="search"      // Search field
accessibilityRole="adjustable"  // Slider or stepper
accessibilityRole="alert"       // Important message
accessibilityRole="checkbox"    // Toggle with checked state
accessibilityRole="switch"      // On/off toggle

// State announcements
<Switch
  accessibilityRole="switch"
  accessibilityState={{
    checked: isEnabled,
  }}
  accessibilityLabel="Enable notifications"
/></code></pre>

            <h4>Dynamic Announcements</h4>
            <pre><code>import { AccessibilityInfo } from 'react-native';

// Announce changes to screen reader
function announceCartUpdate(itemCount: number) {
  AccessibilityInfo.announceForAccessibility(
    \`Cart updated. You now have \${itemCount} items in your cart.\`
  );
}

// After form submission
async function submitForm() {
  try {
    await api.submit(formData);
    AccessibilityInfo.announceForAccessibility(
      'Form submitted successfully'
    );
  } catch (error) {
    AccessibilityInfo.announceForAccessibility(
      'Error submitting form. Please try again.'
    );
  }
}</code></pre>

            <h4>Testing Accessibility</h4>
            <pre><code>// iOS: Settings → Accessibility → VoiceOver
// Android: Settings → Accessibility → TalkBack

// Keyboard shortcuts for testing:
// iOS Simulator: Cmd + Ctrl + Z (toggle VoiceOver)
// Android: Hold volume keys

// Check if screen reader is active
const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

useEffect(() => {
  AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);
  const subscription = AccessibilityInfo.addEventListener(
    'screenReaderChanged',
    setScreenReaderEnabled
  );
  return () => subscription.remove();
}, []);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test with actual VoiceOver/TalkBack, not just visual inspection</li>
                <li>accessibilityLabel describes what element is</li>
                <li>accessibilityHint describes what happens when activated</li>
            </ul>
        `},{id:146,category:"Accessibility",icon:"♿",question:"How do you implement focus management and keyboard navigation in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Proper focus management is crucial for screen reader users and keyboard navigation. Poor focus handling creates confusing experiences.</p>

            <h4>Managing Focus Order</h4>
            <pre><code>// Control focus order with refs
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  return (
    <View>
      <TextInput
        ref={emailRef}
        accessibilityLabel="Email address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        ref={passwordRef}
        accessibilityLabel="Password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={() => submitRef.current?.focus()}
      />
      <TouchableOpacity
        ref={submitRef}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Sign in"
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}</code></pre>

            <h4>Focus on Screen Change</h4>
            <pre><code>import { findNodeHandle, AccessibilityInfo } from 'react-native';

function ProductScreen({ productId }) {
  const headerRef = useRef(null);

  useEffect(() => {
    // Move focus to header when screen loads
    const node = findNodeHandle(headerRef.current);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }, [productId]);

  return (
    <View>
      <Text
        ref={headerRef}
        accessibilityRole="header"
        accessible={true}
      >
        Product Details
      </Text>
      {/* Rest of screen */}
    </View>
  );
}</code></pre>

            <h4>Modal Focus Trapping</h4>
            <pre><code>function AccessibleModal({ visible, onClose, children }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Focus first element when modal opens
      setTimeout(() => {
        const node = findNodeHandle(closeButtonRef.current);
        if (node) {
          AccessibilityInfo.setAccessibilityFocus(node);
        }
      }, 100);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      accessibilityViewIsModal={true} // iOS: trap focus in modal
    >
      <View
        ref={modalRef}
        accessible={false}
        importantForAccessibility="yes"
      >
        <TouchableOpacity
          ref={closeButtonRef}
          onPress={onClose}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        >
          <Text>×</Text>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
}</code></pre>

            <h4>Hide Decorative Elements</h4>
            <pre><code>// Hide from screen readers
<View
  accessible={false}
  importantForAccessibility="no-hide-descendants"
>
  <Image source={decorativePattern} />
</View>

// Or for individual elements
<Image
  source={icon}
  accessibilityElementsHidden={true}  // iOS
  importantForAccessibility="no"       // Android
/></code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>accessibilityViewIsModal traps focus in modals (iOS)</li>
                <li>Set focus to meaningful content after navigation</li>
                <li>Hide purely decorative elements from screen readers</li>
            </ul>
        `},{id:147,category:"Accessibility",icon:"♿",question:"How do you support Dynamic Type and system font scaling in React Native?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Users with low vision rely on system font scaling. Apps that don't respect this setting are difficult or impossible to use.</p>

            <h4>Respecting System Font Size</h4>
            <pre><code>import { Text, PixelRatio, useWindowDimensions } from 'react-native';

// By default, RN Text respects system font scaling
// This is already accessible:
<Text style={{ fontSize: 16 }}>Hello World</Text>
// Will scale based on system accessibility settings

// Get current font scale
const fontScale = PixelRatio.getFontScale();
// 1.0 = default, 1.35 = larger, etc.

// Hook for responsive font
function useAccessibleFontSize(baseSize: number) {
  const { fontScale } = useWindowDimensions();
  return baseSize * fontScale;
}</code></pre>

            <h4>Preventing Text Scaling (When Necessary)</h4>
            <pre><code>// Sometimes scaling breaks layout (use sparingly!)
<Text
  style={{ fontSize: 16 }}
  allowFontScaling={false}  // Disables system scaling
  maxFontSizeMultiplier={1.5}  // Better: cap at 1.5x
>
  Tab Label
</Text>

// For entire app, set in Text defaultProps
// (Not recommended - breaks accessibility)
Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: 2.0,  // Cap at 2x instead of disabling
};</code></pre>

            <h4>Adaptive Layouts for Large Text</h4>
            <pre><code>function AdaptiveHeader() {
  const { fontScale } = useWindowDimensions();
  const isLargeText = fontScale > 1.2;

  return (
    <View style={[
      styles.header,
      // Stack vertically when text is large
      isLargeText && styles.headerStacked
    ]}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});</code></pre>

            <h4>Testing Font Scaling</h4>
            <pre><code>// iOS Simulator:
// Settings → Accessibility → Display & Text Size → Larger Text

// Android Emulator:
// Settings → Accessibility → Font size

// Test at these levels:
// - Default (1.0x)
// - Large (1.35x)
// - Extra Large (1.5x+)

// Common issues to check:
// ✓ Text not truncated unexpectedly
// ✓ Buttons still tappable (44pt minimum)
// ✓ Layout doesn't break
// ✓ Scrolling works when content overflows</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never disable font scaling entirely - use maxFontSizeMultiplier</li>
                <li>Test UI at 200% font scale</li>
                <li>Use flexible layouts that adapt to text size changes</li>
            </ul>
        `},{id:148,category:"Accessibility",icon:"♿",question:"How do you test and audit accessibility in React Native applications?",difficulty:"intermediate",seniority:"mid",answer:`
            <h4>🎯 Why This Question Matters</h4>
            <p>Accessibility must be tested systematically, not assumed. This shows you understand how to verify accessibility compliance.</p>

            <h4>Manual Testing Checklist</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Test                        │ How to Verify         │
├─────────────────────────────┼───────────────────────┤
│ Screen reader navigation    │ Use VoiceOver/TalkBack│
│ Focus order logical         │ Tab through elements  │
│ All interactive elements    │ Can be activated      │
│   labeled                   │                       │
│ Images have alt text        │ Check announcements   │
│ Color contrast sufficient   │ Use contrast checker  │
│ Font scaling works          │ Test at 200% scale    │
│ Touch targets ≥44pt         │ Measure tap areas     │
│ Error messages announced    │ Test form validation  │
└─────────────────────────────┴───────────────────────┘</code></pre>

            <h4>Automated Testing with Detox</h4>
            <pre><code>// e2e/accessibility.test.js
describe('Accessibility', () => {
  it('login button should be accessible', async () => {
    await expect(element(by.id('login-button'))).toHaveLabel('Sign in');
    await expect(element(by.id('login-button'))).toHaveValue('button');
  });

  it('form inputs should have labels', async () => {
    await expect(element(by.id('email-input')))
      .toHaveLabel('Email address');
    await expect(element(by.id('password-input')))
      .toHaveLabel('Password');
  });

  it('error state should be announced', async () => {
    await element(by.id('submit-button')).tap();
    await expect(element(by.id('error-message')))
      .toHaveLabel(/Please enter a valid email/);
  });
});</code></pre>

            <h4>React Native Testing Library</h4>
            <pre><code>import { render, screen } from '@testing-library/react-native';

describe('Button Accessibility', () => {
  it('should have correct accessibility props', () => {
    render(<AddToCartButton disabled={false} />);

    const button = screen.getByRole('button', { name: 'Add to cart' });
    expect(button).toBeTruthy();
    expect(button).not.toBeDisabled();
  });

  it('should announce loading state', () => {
    render(<AddToCartButton loading={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibilityState({ busy: true });
  });

  it('should be focusable', () => {
    render(<AddToCartButton />);
    const button = screen.getByRole('button');
    expect(button.props.accessible).toBe(true);
  });
});</code></pre>

            <h4>Accessibility Audit Tools</h4>
            <pre><code>// iOS: Accessibility Inspector
// Xcode → Open Developer Tool → Accessibility Inspector

// Android: Accessibility Scanner app
// Download from Play Store, run on your app

// Flipper Plugin
// Install flipper-plugin-accessibility
// Shows accessibility tree and issues

// ESLint plugin for React Native
// .eslintrc.js
module.exports = {
  plugins: ['react-native-a11y'],
  rules: {
    'react-native-a11y/has-accessibility-props': 'error',
    'react-native-a11y/has-valid-accessibility-role': 'error',
    'react-native-a11y/no-nested-touchables': 'error',
  },
};</code></pre>

            <h4>WCAG Compliance Levels</h4>
            <pre><code>// Target WCAG 2.1 Level AA minimum

// Level A (minimum):
// - All images have alt text
// - Form inputs have labels
// - Content is navigable with keyboard

// Level AA (recommended):
// - Color contrast 4.5:1 for normal text
// - Text resizable to 200%
// - Focus visible on all elements
// - Error suggestions provided

// Level AAA (enhanced):
// - Color contrast 7:1
// - Sign language for video
// - Extended audio descriptions</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test with real screen readers, not just automated tools</li>
                <li>Include users with disabilities in testing when possible</li>
                <li>Accessibility should be tested throughout development, not at the end</li>
            </ul>
        `}],Fp=I.createContext(),jp="rn-interview-completed",Lp="rn-interview-bookmarks",qp="rn-interview-filters",Ip="rn-interview-comments",Vp=[...new Set(Na.map(f=>f.category))],Gp=["beginner","intermediate","advanced"],Kp=["junior","mid","senior","staff"],Sl={search:"",categories:[],difficulties:[],seniorities:[],status:"all",sortBy:"category"},Oh=()=>{try{const f=localStorage.getItem(qp);if(f){const C=JSON.parse(f);return{...Sl,...C}}}catch{}return Sl};function Bh({children:f}){const[C,N]=I.useState(()=>{try{const w=localStorage.getItem(jp);return w?new Set(JSON.parse(w)):new Set}catch{return new Set}}),[u,R]=I.useState(()=>{try{const w=localStorage.getItem(Lp);return w?new Set(JSON.parse(w)):new Set}catch{return new Set}}),[E,H]=I.useState(Oh),[M,U]=I.useState(null),[b,K]=I.useState(!0),[_,L]=I.useState(!1),[D,pe]=I.useState(!1),[Q,ue]=I.useState(()=>{try{const w=localStorage.getItem(Ip);return w?JSON.parse(w):{}}catch{return{}}});I.useEffect(()=>{localStorage.setItem(jp,JSON.stringify([...C]))},[C]),I.useEffect(()=>{localStorage.setItem(Lp,JSON.stringify([...u]))},[u]),I.useEffect(()=>{localStorage.setItem(qp,JSON.stringify(E))},[E]),I.useEffect(()=>{localStorage.setItem(Ip,JSON.stringify(Q))},[Q]);const le=I.useCallback((w,O,q)=>{const d={id:Date.now().toString(),selectedText:O,comment:q,createdAt:new Date().toISOString()};ue(T=>({...T,[w]:[...T[w]||[],d]}))},[]),_e=I.useCallback((w,O)=>{ue(q=>({...q,[w]:(q[w]||[]).filter(d=>d.id!==O)}))},[]),be=I.useCallback(w=>Q[w]||[],[Q]),oe=I.useCallback(w=>{R(O=>{const q=new Set(O);return q.has(w)?q.delete(w):q.add(w),q})},[]),we=I.useCallback(w=>{N(O=>{const q=new Set(O);return q.has(w)?q.delete(w):q.add(w),q})},[]),Te=I.useCallback(()=>{N(new Set)},[]),Z=I.useCallback((w,O)=>{H(q=>({...q,[w]:O}))},[]),Ge=I.useCallback((w,O)=>{H(q=>{const d=q[w],T=d.includes(O)?d.filter(j=>j!==O):[...d,O];return{...q,[w]:T}})},[]),ht=I.useCallback(()=>{H(Sl)},[]),ea=I.useMemo(()=>{let w=0;return E.search&&w++,w+=E.categories.length,w+=E.difficulties.length,w+=E.seniorities.length,E.status!=="all"&&w++,w},[E]),Ke=I.useMemo(()=>{let w=Na;if(E.search){const O=E.search.toLowerCase();w=w.filter(q=>q.question.toLowerCase().includes(O)||q.category.toLowerCase().includes(O))}return E.categories.length>0&&(w=w.filter(O=>E.categories.includes(O.category))),E.difficulties.length>0&&(w=w.filter(O=>E.difficulties.includes(O.difficulty))),E.seniorities.length>0&&(w=w.filter(O=>E.seniorities.includes(O.seniority))),E.status==="completed"?w=w.filter(O=>C.has(O.id)):E.status==="pending"?w=w.filter(O=>!C.has(O.id)):E.status==="bookmarked"&&(w=w.filter(O=>u.has(O.id))),w=[...w].sort((O,q)=>{switch(E.sortBy){case"difficulty":{const d={beginner:0,intermediate:1,advanced:2};return d[O.difficulty]-d[q.difficulty]}case"seniority":{const d={junior:0,mid:1,senior:2,staff:3};return d[O.seniority]-d[q.seniority]}case"alphabetical":return O.question.localeCompare(q.question);default:return O.category.localeCompare(q.category)}}),w},[E,C,u]),Qe=I.useMemo(()=>{const w={};return Ke.forEach(O=>{w[O.category]||(w[O.category]={icon:O.icon,questions:[]}),w[O.category].questions.push(O)}),w},[Ke]),jt=I.useMemo(()=>({total:Na.length,completed:C.size,filtered:Ke.length,percentage:Math.round(C.size/Na.length*100)}),[C,Ke]),kt=I.useMemo(()=>{const w={};return Na.forEach(O=>{w[O.category]=(w[O.category]||0)+1}),w},[]),nt=I.useMemo(()=>{const w={};return Na.forEach(O=>{w[O.difficulty]=(w[O.difficulty]||0)+1}),w},[]),x=I.useMemo(()=>{const w={};return Na.forEach(O=>{w[O.seniority]=(w[O.seniority]||0)+1}),w},[]),B={questionsData:Na,filteredQuestions:Ke,groupedQuestions:Qe,stats:jt,completedIds:C,toggleComplete:we,resetProgress:Te,bookmarkedIds:u,toggleBookmark:oe,filters:E,updateFilter:Z,toggleArrayFilter:Ge,clearFilters:ht,activeFilterCount:ea,categoryCounts:kt,difficultyCounts:nt,seniorityCounts:x,selectedQuestion:M,setSelectedQuestion:U,sidebarOpen:b,setSidebarOpen:K,quizModeOpen:_,setQuizModeOpen:L,analyticsOpen:D,setAnalyticsOpen:pe,comments:Q,addComment:le,deleteComment:_e,getCommentsForQuestion:be};return l.jsx(Fp.Provider,{value:B,children:f})}function Mt(){const f=I.useContext(Fp);if(!f)throw new Error("useApp must be used within AppProvider");return f}const jh=f=>f.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Lh=f=>f.replace(/^([A-Z])|[\s-_]+(\w)/g,(C,N,u)=>u?u.toUpperCase():N.toLowerCase()),_p=f=>{const C=Lh(f);return C.charAt(0).toUpperCase()+C.slice(1)},Qp=(...f)=>f.filter((C,N,u)=>!!C&&C.trim()!==""&&u.indexOf(C)===N).join(" ").trim(),Ih=f=>{for(const C in f)if(C.startsWith("aria-")||C==="role"||C==="title")return!0};var _h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const zh=I.forwardRef(({color:f="currentColor",size:C=24,strokeWidth:N=2,absoluteStrokeWidth:u,className:R="",children:E,iconNode:H,...M},U)=>I.createElement("svg",{ref:U,..._h,width:C,height:C,stroke:f,strokeWidth:u?Number(N)*24/Number(C):N,className:Qp("lucide",R),...!E&&!Ih(M)&&{"aria-hidden":"true"},...M},[...H.map(([b,K])=>I.createElement(b,K)),...Array.isArray(E)?E:[E]]));const Ce=(f,C)=>{const N=I.forwardRef(({className:u,...R},E)=>I.createElement(zh,{ref:E,iconNode:C,className:Qp(`lucide-${jh(_p(f))}`,`lucide-${f}`,u),...R}));return N.displayName=_p(f),N};const Hh=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],Ph=Ce("award",Hh);const Fh=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],qh=Ce("book-open",Fh);const Vh=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Gh=Ce("chart-column",Vh);const Kh=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Jp=Ce("check",Kh);const Qh=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],wl=Ce("chevron-down",Qh);const Jh=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Al=Ce("chevron-right",Jh);const Yh=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Wh=Ce("chevron-up",Yh);const Xh=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Zh=Ce("circle",Xh);const $h=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],eg=Ce("clock",$h);const tg=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ag=Ce("eye",tg);const ig=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],ng=Ce("menu",ig);const og=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}],["path",{d:"M12 8v6",key:"1ib9pf"}],["path",{d:"M9 11h6",key:"1fldmi"}]],rg=Ce("message-square-plus",og);const sg=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Yp=Ce("message-square",sg);const lg=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],cg=Ce("play",lg);const ug=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Wp=Ce("rotate-ccw",ug);const dg=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],pg=Ce("search",dg);const fg=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],mg=Ce("send",fg);const hg=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],gg=Ce("star",hg);const yg=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],vg=Ce("target",yg);const bg=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Sg=Ce("trash-2",bg);const xg=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],zp=Ce("trending-up",xg);const wg=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],Hp=Ce("trophy",wg);const Ag=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ea=Ce("x",Ag);function Cg(){const{stats:f,resetProgress:C,sidebarOpen:N,setSidebarOpen:u,setQuizModeOpen:R,setAnalyticsOpen:E}=Mt(),H=()=>{window.confirm("Are you sure you want to reset all progress? This cannot be undone.")&&C()};return l.jsx("header",{className:"bg-surface border-b border-border sticky top-0 z-40",children:l.jsx("div",{className:"px-4 py-4 lg:px-6",children:l.jsxs("div",{className:"flex items-center justify-between gap-4",children:[l.jsx("button",{onClick:()=>u(!N),className:"lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors",children:l.jsx(ng,{className:"w-5 h-5"})}),l.jsxs("div",{className:"flex-1 min-w-0",children:[l.jsx("h1",{className:"text-xl lg:text-2xl font-bold text-text-primary truncate",children:"React Native Interview Prep"}),l.jsx("p",{className:"text-sm text-text-secondary hidden sm:block",children:"Master your next interview"})]}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsxs("div",{className:"hidden sm:flex flex-col items-end gap-1",children:[l.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[l.jsxs("span",{className:"text-text-secondary",children:[f.completed," / ",f.total," completed"]}),l.jsxs("span",{className:"text-primary font-semibold",children:[f.percentage,"%"]})]}),l.jsx("div",{className:"w-32 h-2 bg-border rounded-full overflow-hidden",children:l.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300",style:{width:`${f.percentage}%`}})})]}),l.jsxs("div",{className:"sm:hidden flex items-center gap-2",children:[l.jsxs("span",{className:"text-primary font-semibold text-sm",children:[f.percentage,"%"]}),l.jsx("div",{className:"w-16 h-2 bg-border rounded-full overflow-hidden",children:l.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300",style:{width:`${f.percentage}%`}})})]}),l.jsxs("button",{onClick:()=>R(!0),className:"hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors",title:"Start Quiz",children:[l.jsx(cg,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm font-medium",children:"Quiz"})]}),l.jsxs("button",{onClick:()=>E(!0),className:"hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-end/10 text-gradient-end hover:bg-gradient-end/20 transition-colors",title:"View Analytics",children:[l.jsx(Gh,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm font-medium",children:"Analytics"})]}),l.jsx("button",{onClick:H,className:"p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors",title:"Reset all progress",children:l.jsx(Wp,{className:"w-5 h-5"})})]})]})})})}function Xp(f){var C,N,u="";if(typeof f=="string"||typeof f=="number")u+=f;else if(typeof f=="object")if(Array.isArray(f)){var R=f.length;for(C=0;C<R;C++)f[C]&&(N=Xp(f[C]))&&(u&&(u+=" "),u+=N)}else for(N in f)f[N]&&(u&&(u+=" "),u+=N);return u}function Ve(){for(var f,C,N=0,u="",R=arguments.length;N<R;N++)(f=arguments[N])&&(C=Xp(f))&&(u&&(u+=" "),u+=C);return u}function En({title:f,children:C,defaultOpen:N=!0}){const[u,R]=I.useState(N);return l.jsxs("div",{className:"border-b border-border last:border-b-0",children:[l.jsxs("button",{onClick:()=>R(!u),className:"w-full flex items-center justify-between p-3 hover:bg-surface-elevated transition-colors",children:[l.jsx("span",{className:"font-medium text-text-primary",children:f}),u?l.jsx(wl,{className:"w-4 h-4 text-text-muted"}):l.jsx(Al,{className:"w-4 h-4 text-text-muted"})]}),u&&l.jsx("div",{className:"px-3 pb-3 space-y-1",children:C})]})}function bl({label:f,count:C,checked:N,onChange:u,color:R}){return l.jsxs("label",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors",children:[l.jsx("input",{type:"checkbox",checked:N,onChange:u,className:"w-4 h-4 rounded border-border bg-surface accent-primary"}),l.jsxs("span",{className:Ve("flex-1 text-sm",N?"text-text-primary":"text-text-secondary"),children:[R&&l.jsx("span",{className:`inline-block w-2 h-2 rounded-full mr-2 ${R}`}),f]}),C!==void 0&&l.jsxs("span",{className:"text-xs text-text-muted",children:["(",C,")"]})]})}function ka({label:f,value:C,currentValue:N,onChange:u}){return l.jsxs("label",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors",children:[l.jsx("input",{type:"radio",checked:N===C,onChange:()=>u(C),className:"w-4 h-4 border-border bg-surface accent-primary"}),l.jsx("span",{className:Ve("text-sm",N===C?"text-text-primary":"text-text-secondary"),children:f})]})}function Tg(){const{filters:f,updateFilter:C,toggleArrayFilter:N,clearFilters:u,activeFilterCount:R,stats:E,categoryCounts:H,difficultyCounts:M,seniorityCounts:U,sidebarOpen:b,setSidebarOpen:K}=Mt(),_={beginner:"bg-success",intermediate:"bg-warning",advanced:"bg-error"},L={junior:"🌱 Junior",mid:"🌿 Mid",senior:"🌳 Senior",staff:"🏔️ Staff+"};return l.jsxs(l.Fragment,{children:[b&&l.jsx("div",{className:"lg:hidden fixed inset-0 bg-black/50 z-40",onClick:()=>K(!1)}),l.jsxs("aside",{className:Ve("fixed lg:sticky top-0 lg:top-[73px] left-0 h-full lg:h-[calc(100vh-73px)] w-72 bg-surface border-r border-border z-50 lg:z-30","transform transition-transform duration-200 ease-in-out","overflow-y-auto",b?"translate-x-0":"-translate-x-full lg:translate-x-0"),children:[l.jsxs("div",{className:"sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between",children:[l.jsxs("div",{children:[l.jsx("h2",{className:"font-semibold text-text-primary",children:"Filters"}),l.jsxs("p",{className:"text-sm text-text-muted",children:[E.filtered," of ",E.total," questions"]})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[R>0&&l.jsx("button",{onClick:u,className:"text-xs text-primary hover:underline",children:"Clear all"}),l.jsx("button",{onClick:()=>K(!1),className:"lg:hidden p-1 rounded hover:bg-surface-elevated",children:l.jsx(Ea,{className:"w-5 h-5 text-text-muted"})})]})]}),l.jsx("div",{className:"p-3 border-b border-border",children:l.jsxs("div",{className:"relative",children:[l.jsx(pg,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"}),l.jsx("input",{type:"text",placeholder:"Search questions...",value:f.search,onChange:D=>C("search",D.target.value),className:"w-full pl-9 pr-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"}),f.search&&l.jsx("button",{onClick:()=>C("search",""),className:"absolute right-3 top-1/2 -translate-y-1/2",children:l.jsx(Ea,{className:"w-4 h-4 text-text-muted hover:text-text-primary"})})]})}),l.jsx(En,{title:"Category",defaultOpen:!1,children:Vp.map(D=>l.jsx(bl,{label:D,count:H[D],checked:f.categories.includes(D),onChange:()=>N("categories",D)},D))}),l.jsx(En,{title:"Difficulty",children:Gp.map(D=>l.jsx(bl,{label:D.charAt(0).toUpperCase()+D.slice(1),count:M[D],checked:f.difficulties.includes(D),onChange:()=>N("difficulties",D),color:_[D]},D))}),l.jsx(En,{title:"Seniority Level",children:Kp.map(D=>l.jsx(bl,{label:L[D],count:U[D],checked:f.seniorities.includes(D),onChange:()=>N("seniorities",D)},D))}),l.jsxs(En,{title:"Status",children:[l.jsx(ka,{label:"All Questions",value:"all",currentValue:f.status,onChange:D=>C("status",D)}),l.jsx(ka,{label:"⭐ Bookmarked",value:"bookmarked",currentValue:f.status,onChange:D=>C("status",D)}),l.jsx(ka,{label:"Pending",value:"pending",currentValue:f.status,onChange:D=>C("status",D)}),l.jsx(ka,{label:"Completed",value:"completed",currentValue:f.status,onChange:D=>C("status",D)})]}),l.jsxs(En,{title:"Sort By",children:[l.jsx(ka,{label:"Category",value:"category",currentValue:f.sortBy,onChange:D=>C("sortBy",D)}),l.jsx(ka,{label:"Difficulty",value:"difficulty",currentValue:f.sortBy,onChange:D=>C("sortBy",D)}),l.jsx(ka,{label:"Seniority",value:"seniority",currentValue:f.sortBy,onChange:D=>C("sortBy",D)}),l.jsx(ka,{label:"Alphabetical",value:"alphabetical",currentValue:f.sortBy,onChange:D=>C("sortBy",D)})]})]})]})}function Zp({question:f}){const{completedIds:C,toggleComplete:N,bookmarkedIds:u,toggleBookmark:R,setSelectedQuestion:E}=Mt(),H=C.has(f.id),M=u.has(f.id),U=D=>{D.target.closest(".checkbox-area")||D.target.closest(".bookmark-area")||E(f)},b=D=>{D.stopPropagation(),N(f.id)},K=D=>{D.stopPropagation(),R(f.id)},_={beginner:"bg-success/20 text-success",intermediate:"bg-warning/20 text-warning",advanced:"bg-error/20 text-error"},L={junior:"bg-success/20 text-success",mid:"bg-primary/20 text-primary",senior:"bg-purple-500/20 text-purple-400",staff:"bg-warning/20 text-warning"};return l.jsx("div",{onClick:U,className:Ve("group p-4 bg-surface-elevated rounded-xl border cursor-pointer","transition-all duration-200","hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5",H?"border-success/50 bg-gradient-to-r from-surface-elevated to-success/5":"border-border"),children:l.jsxs("div",{className:"flex gap-3",children:[l.jsx("div",{className:"checkbox-area flex-shrink-0 mt-0.5",onClick:b,children:l.jsx("div",{className:Ve("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",H?"bg-success border-success":"border-border hover:border-primary"),children:H&&l.jsx(Jp,{className:"w-3 h-3 text-background"})})}),l.jsxs("div",{className:"flex-1 min-w-0",children:[l.jsx("p",{className:Ve("text-sm font-medium leading-relaxed mb-3",H?"text-text-secondary":"text-text-primary"),children:f.question}),l.jsxs("div",{className:"flex flex-wrap gap-2",children:[l.jsx("span",{className:Ve("px-2 py-0.5 rounded text-xs font-medium",_[f.difficulty]),children:f.difficulty}),f.seniority&&l.jsx("span",{className:Ve("px-2 py-0.5 rounded text-xs font-medium",L[f.seniority]),children:f.seniority}),l.jsx("span",{className:"px-2 py-0.5 rounded text-xs font-medium bg-surface text-text-muted",children:f.category})]})]}),l.jsxs("div",{className:"flex items-center gap-1",children:[l.jsx("div",{className:"bookmark-area p-1 rounded-md hover:bg-surface transition-colors",onClick:K,children:l.jsx(gg,{className:Ve("w-4 h-4 transition-all",M?"fill-warning text-warning":"text-text-muted hover:text-warning")})}),l.jsx(Al,{className:"flex-shrink-0 w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"})]})]})})}function Pp(){const{filters:f,toggleArrayFilter:C,updateFilter:N,clearFilters:u,activeFilterCount:R}=Mt();return R===0?null:l.jsxs("div",{className:"flex flex-wrap gap-2 mb-4",children:[f.search&&l.jsx(Rn,{label:`Search: "${f.search}"`,onRemove:()=>N("search","")}),f.categories.map(E=>l.jsx(Rn,{label:E,onRemove:()=>C("categories",E)},E)),f.difficulties.map(E=>l.jsx(Rn,{label:E.charAt(0).toUpperCase()+E.slice(1),onRemove:()=>C("difficulties",E)},E)),f.seniorities.map(E=>l.jsx(Rn,{label:E.charAt(0).toUpperCase()+E.slice(1),onRemove:()=>C("seniorities",E)},E)),f.status!=="all"&&l.jsx(Rn,{label:`Status: ${f.status}`,onRemove:()=>N("status","all")}),R>1&&l.jsx("button",{onClick:u,className:"px-3 py-1 text-xs text-primary hover:text-primary-dark hover:underline transition-colors",children:"Clear all"})]})}function Rn({label:f,onRemove:C}){return l.jsxs("span",{className:"inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm",children:[f,l.jsx("button",{onClick:C,className:"p-0.5 rounded-full hover:bg-primary/20 transition-colors",children:l.jsx(Ea,{className:"w-3 h-3"})})]})}function kg({category:f,icon:C,questions:N,defaultExpanded:u=!0}){const[R,E]=I.useState(u),{completedIds:H}=Mt(),M=N.filter(U=>H.has(U.id)).length;return l.jsxs("div",{className:"mb-4",children:[l.jsxs("button",{onClick:()=>E(!R),className:"w-full flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors",children:[l.jsx("span",{className:"text-xl",children:C}),l.jsx("span",{className:"flex-1 text-left font-semibold text-text-primary",children:f}),l.jsxs("span",{className:"text-sm text-text-muted",children:[M,"/",N.length]}),R?l.jsx(wl,{className:"w-5 h-5 text-text-muted"}):l.jsx(Al,{className:"w-5 h-5 text-text-muted"})]}),R&&l.jsx("div",{className:"mt-2 space-y-2 pl-2",children:N.map(U=>l.jsx(Zp,{question:U},U.id))})]})}function Ng(){const{groupedQuestions:f,filteredQuestions:C,stats:N,filters:u}=Mt(),R=Object.keys(f),E=u.sortBy!=="category";return C.length===0?l.jsxs("div",{className:"flex-1 p-6",children:[l.jsx(Pp,{}),l.jsxs("div",{className:"flex flex-col items-center justify-center py-16 text-center",children:[l.jsx("div",{className:"text-6xl mb-4",children:"🔍"}),l.jsx("h3",{className:"text-xl font-semibold text-text-primary mb-2",children:"No questions match your filters"}),l.jsx("p",{className:"text-text-secondary mb-4",children:"Try adjusting your filters or search term"})]})]}):l.jsxs("div",{className:"flex-1 p-4 lg:p-6 overflow-y-auto",children:[l.jsx(Pp,{}),l.jsxs("div",{className:"mb-4 text-sm text-text-muted",children:["Showing ",N.filtered," of ",N.total," questions"]}),E&&l.jsx("div",{className:"space-y-2",children:C.map(H=>l.jsx(Zp,{question:H},H.id))}),!E&&R.map(H=>l.jsx(kg,{category:H,icon:f[H].icon,questions:f[H].questions},H))]})}function Eg({position:f,selectedText:C,onSubmit:N,onClose:u}){const[R,E]=I.useState(""),[H,M]=I.useState(!1),U=I.useRef(null),b=I.useRef(null);I.useEffect(()=>{H&&U.current&&U.current.focus()},[H]),I.useEffect(()=>{const L=D=>{b.current&&!b.current.contains(D.target)&&u()};return document.addEventListener("mousedown",L),()=>document.removeEventListener("mousedown",L)},[u]),I.useEffect(()=>{const L=D=>{D.key==="Escape"&&u()};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[u]);const K=L=>{L.preventDefault(),R.trim()&&(N(R.trim()),E(""),u())},_={position:"fixed",left:Math.min(f.x,window.innerWidth-320),top:Math.min(f.y+10,window.innerHeight-200),zIndex:100};return H?l.jsxs("div",{ref:b,style:_,className:"w-80 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden",children:[l.jsxs("div",{className:"px-4 py-3 border-b border-border bg-surface-elevated flex items-center justify-between",children:[l.jsx("span",{className:"text-sm font-medium text-text-primary",children:"Add Comment"}),l.jsx("button",{onClick:u,className:"p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary transition-colors",children:l.jsx(Ea,{className:"w-4 h-4"})})]}),l.jsxs("div",{className:"px-4 py-2 bg-primary/10 border-b border-border",children:[l.jsx("p",{className:"text-xs text-text-muted mb-1",children:"Selected text:"}),l.jsxs("p",{className:"text-sm text-text-secondary line-clamp-2 italic",children:['"',C.substring(0,100),C.length>100?"...":"",'"']})]}),l.jsxs("form",{onSubmit:K,className:"p-4",children:[l.jsx("textarea",{ref:U,value:R,onChange:L=>E(L.target.value),placeholder:"Write your comment or note...",className:"w-full px-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none",rows:3}),l.jsxs("div",{className:"flex justify-end gap-2 mt-3",children:[l.jsx("button",{type:"button",onClick:u,className:"px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors",children:"Cancel"}),l.jsxs("button",{type:"submit",disabled:!R.trim(),className:Ve("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",R.trim()?"bg-primary text-background hover:bg-primary-dark":"bg-surface-elevated text-text-muted cursor-not-allowed"),children:[l.jsx(mg,{className:"w-3.5 h-3.5"}),"Save"]})]})]})]}):l.jsx("div",{ref:b,style:_,children:l.jsxs("button",{onClick:()=>M(!0),className:"flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-lg shadow-lg hover:bg-primary-dark transition-colors text-sm font-medium",children:[l.jsx(rg,{className:"w-4 h-4"}),"Add Comment"]})})}function Rg({questionId:f}){const{getCommentsForQuestion:C,deleteComment:N}=Mt(),[u,R]=I.useState(!0),E=C(f);if(E.length===0)return null;const H=M=>new Date(M).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return l.jsxs("div",{className:"mt-6 border-t border-border pt-4",children:[l.jsxs("button",{onClick:()=>R(!u),className:"flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-3",children:[l.jsx(Yp,{className:"w-4 h-4"}),"Your Notes (",E.length,")",u?l.jsx(Wh,{className:"w-4 h-4"}):l.jsx(wl,{className:"w-4 h-4"})]}),u&&l.jsx("div",{className:"space-y-3",children:E.map(M=>l.jsxs("div",{className:"bg-surface-elevated border border-border rounded-lg p-3 group",children:[l.jsxs("div",{className:"mb-2 pb-2 border-b border-border/50",children:[l.jsx("p",{className:"text-xs text-text-muted mb-1",children:"Highlighted:"}),l.jsxs("p",{className:"text-sm text-primary/80 italic line-clamp-2",children:['"',M.selectedText,'"']})]}),l.jsx("p",{className:"text-sm text-text-primary whitespace-pre-wrap",children:M.comment}),l.jsxs("div",{className:"flex items-center justify-between mt-2 pt-2 border-t border-border/50",children:[l.jsx("span",{className:"text-xs text-text-muted",children:H(M.createdAt)}),l.jsx("button",{onClick:()=>N(f,M.id),className:"p-1 rounded text-text-muted hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all",title:"Delete comment",children:l.jsx(Sg,{className:"w-3.5 h-3.5"})})]})]},M.id))})]})}function Mg(){const{selectedQuestion:f,setSelectedQuestion:C,completedIds:N,toggleComplete:u,addComment:R,getCommentsForQuestion:E}=Mt(),H=I.useRef(null),[M,U]=I.useState(null),b=I.useCallback(()=>{C(null)},[C]);I.useEffect(()=>{const Q=ue=>{ue.key==="Escape"&&b()};return window.addEventListener("keydown",Q),()=>window.removeEventListener("keydown",Q)},[b]),I.useEffect(()=>(f?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[f]),I.useEffect(()=>{if(!H.current||!f)return;const Q=_e=>{setTimeout(()=>{const be=window.getSelection(),oe=be?.toString().trim();if(oe&&oe.length>0){const we=be.getRangeAt(0);if(H.current.contains(we.commonAncestorContainer)){const Te=we.getBoundingClientRect();U({x:Te.left+Te.width/2-60,y:Te.bottom,text:oe})}}},10)},ue=_e=>{_e.target.closest(".comment-popup-container")||U(null)},le=H.current;return le.addEventListener("mouseup",Q),document.addEventListener("mousedown",ue),()=>{le.removeEventListener("mouseup",Q),document.removeEventListener("mousedown",ue)}},[f]),I.useEffect(()=>{if(!H.current||!f)return;H.current.querySelectorAll("pre").forEach(ue=>{if(ue.querySelector(".copy-btn"))return;ue.style.position="relative";const le=document.createElement("button");le.className="copy-btn",le.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',le.title="Copy code",le.onclick=async()=>{const _e=ue.querySelector("code")?.textContent||ue.textContent||"";try{await navigator.clipboard.writeText(_e),le.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',le.classList.add("copied"),setTimeout(()=>{le.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',le.classList.remove("copied")},2e3)}catch(be){console.error("Failed to copy:",be)}},ue.appendChild(le)})},[f]);const K=I.useCallback(Q=>{M&&f&&(R(f.id,M.text,Q),U(null),window.getSelection()?.removeAllRanges())},[M,f,R]);if(!f)return null;const _=N.has(f.id),L=E(f.id).length,D={beginner:"bg-success/20 text-success",intermediate:"bg-warning/20 text-warning",advanced:"bg-error/20 text-error"},pe={junior:"bg-success/20 text-success",mid:"bg-primary/20 text-primary",senior:"bg-purple-500/20 text-purple-400",staff:"bg-warning/20 text-warning"};return l.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:b,children:[l.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm"}),l.jsxs("div",{onClick:Q=>Q.stopPropagation(),className:"relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden",children:[l.jsx("div",{className:"flex-shrink-0 p-6 border-b border-border",children:l.jsxs("div",{className:"flex items-start gap-4",children:[l.jsxs("div",{className:"flex-1",children:[l.jsx("h2",{className:"text-lg font-semibold text-text-primary leading-relaxed mb-3",children:f.question}),l.jsxs("div",{className:"flex flex-wrap gap-2",children:[l.jsx("span",{className:Ve("px-2 py-0.5 rounded text-xs font-medium",D[f.difficulty]),children:f.difficulty}),f.seniority&&l.jsx("span",{className:Ve("px-2 py-0.5 rounded text-xs font-medium",pe[f.seniority]),children:f.seniority}),l.jsxs("span",{className:"px-2 py-0.5 rounded text-xs font-medium bg-surface-elevated text-text-muted",children:[f.icon," ",f.category]})]})]}),l.jsx("button",{onClick:b,className:"p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors",children:l.jsx(Ea,{className:"w-5 h-5"})})]})}),l.jsxs("div",{className:"flex-1 overflow-y-auto p-6",children:[l.jsxs("div",{className:"mb-4 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary flex items-center gap-2",children:[l.jsx(Yp,{className:"w-4 h-4"}),l.jsx("span",{children:"Select any text to add a personal note or comment"}),L>0&&l.jsxs("span",{className:"ml-auto bg-primary/20 px-2 py-0.5 rounded-full",children:[L," note",L!==1?"s":""]})]}),l.jsx("div",{ref:H,className:"answer-content",dangerouslySetInnerHTML:{__html:f.answer}}),l.jsx(Rg,{questionId:f.id})]}),M&&l.jsx("div",{className:"comment-popup-container",children:l.jsx(Eg,{position:{x:M.x,y:M.y},selectedText:M.text,onSubmit:K,onClose:()=>U(null)})}),l.jsxs("div",{className:"flex-shrink-0 p-4 border-t border-border bg-surface-elevated flex items-center justify-between",children:[l.jsx("button",{onClick:b,className:"px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors",children:"Close"}),l.jsx("button",{onClick:()=>{u(f.id),_||b()},className:Ve("flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",_?"bg-success/20 text-success hover:bg-success/30":"bg-primary text-background hover:bg-primary-dark"),children:_?l.jsxs(l.Fragment,{children:[l.jsx(Jp,{className:"w-4 h-4"}),"Completed"]}):l.jsxs(l.Fragment,{children:[l.jsx(Zh,{className:"w-4 h-4"}),"Mark as Complete"]})})]})]})]})}function Dg({onClose:f}){const{filteredQuestions:C}=Mt(),[N,u]=I.useState([]),[R,E]=I.useState(0),[H,M]=I.useState(!1),[U,b]=I.useState({correct:0,incorrect:0}),[K,_]=I.useState(!1),[L]=I.useState(Date.now()),[D,pe]=I.useState(0);I.useEffect(()=>{const oe=[...C].sort(()=>Math.random()-.5).slice(0,Math.min(10,C.length));u(oe)},[]),I.useEffect(()=>{if(K)return;const oe=setInterval(()=>{pe(Math.floor((Date.now()-L)/1e3))},1e3);return()=>clearInterval(oe)},[L,K]);const Q=oe=>{const we=Math.floor(oe/60),Te=oe%60;return`${we}:${Te.toString().padStart(2,"0")}`},ue=N[R],le=oe=>{b(we=>({...we,[oe?"correct":"incorrect"]:we[oe?"correct":"incorrect"]+1})),R<N.length-1?(E(we=>we+1),M(!1)):_(!0)},_e=()=>{const oe=[...C].sort(()=>Math.random()-.5).slice(0,Math.min(10,C.length));u(oe),E(0),M(!1),b({correct:0,incorrect:0}),_(!1)};if(I.useEffect(()=>{const oe=we=>{we.key==="Escape"&&f()};return window.addEventListener("keydown",oe),()=>window.removeEventListener("keydown",oe)},[f]),I.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]),N.length===0)return l.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",children:l.jsxs("div",{className:"bg-surface rounded-2xl border border-border p-8 text-center max-w-md",children:[l.jsx("p",{className:"text-text-secondary mb-4",children:"No questions available for quiz."}),l.jsx("p",{className:"text-sm text-text-muted mb-6",children:"Adjust your filters to include more questions."}),l.jsx("button",{onClick:f,className:"px-4 py-2 bg-primary text-background rounded-lg font-medium",children:"Close"})]})});const be={beginner:"bg-success/20 text-success",intermediate:"bg-warning/20 text-warning",advanced:"bg-error/20 text-error"};return l.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",children:l.jsxs("div",{className:"w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden",children:[l.jsxs("div",{className:"flex-shrink-0 p-4 border-b border-border flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("h2",{className:"text-lg font-semibold text-text-primary",children:"Quiz Mode"}),l.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[l.jsx(eg,{className:"w-4 h-4"}),Q(D)]})]}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[l.jsxs("span",{className:"text-success",children:[U.correct," correct"]}),l.jsx("span",{className:"text-text-muted",children:"|"}),l.jsxs("span",{className:"text-error",children:[U.incorrect," incorrect"]})]}),l.jsx("button",{onClick:f,className:"p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors",children:l.jsx(Ea,{className:"w-5 h-5"})})]})]}),K?l.jsxs("div",{className:"flex-1 p-8 flex flex-col items-center justify-center text-center",children:[l.jsx(Hp,{className:"w-16 h-16 text-warning mb-4"}),l.jsx("h3",{className:"text-2xl font-bold text-text-primary mb-2",children:"Quiz Complete!"}),l.jsxs("p",{className:"text-text-secondary mb-6",children:["You got ",U.correct," out of ",N.length," questions correct"]}),l.jsx("div",{className:"text-4xl font-bold mb-6",children:l.jsxs("span",{className:Ve(U.correct/N.length>=.8?"text-success":U.correct/N.length>=.6?"text-warning":"text-error"),children:[Math.round(U.correct/N.length*100),"%"]})}),l.jsxs("p",{className:"text-sm text-text-muted mb-6",children:["Time: ",Q(D)]}),l.jsxs("div",{className:"flex gap-3",children:[l.jsxs("button",{onClick:_e,className:"flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg font-medium",children:[l.jsx(Wp,{className:"w-4 h-4"}),"Try Again"]}),l.jsx("button",{onClick:f,className:"px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors",children:"Close"})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"flex-shrink-0 px-4 pt-4",children:[l.jsxs("div",{className:"flex items-center justify-between text-sm text-text-muted mb-2",children:[l.jsxs("span",{children:["Question ",R+1," of ",N.length]}),l.jsx("span",{className:Ve("px-2 py-0.5 rounded text-xs font-medium",be[ue.difficulty]),children:ue.difficulty})]}),l.jsx("div",{className:"w-full h-1 bg-border rounded-full overflow-hidden",children:l.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300",style:{width:`${(R+1)/N.length*100}%`}})})]}),l.jsxs("div",{className:"flex-1 overflow-y-auto p-6",children:[l.jsx("div",{className:"mb-4",children:l.jsxs("span",{className:"text-xs text-text-muted bg-surface-elevated px-2 py-1 rounded",children:[ue.icon," ",ue.category]})}),l.jsx("h3",{className:"text-xl font-semibold text-text-primary mb-6",children:ue.question}),H?l.jsx("div",{className:"border-t border-border pt-6",children:l.jsx("div",{className:"answer-content",dangerouslySetInnerHTML:{__html:ue.answer}})}):l.jsx("div",{className:"flex justify-center",children:l.jsxs("button",{onClick:()=>M(!0),className:"flex items-center gap-2 px-6 py-3 bg-surface-elevated border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-all",children:[l.jsx(ag,{className:"w-5 h-5"}),"Reveal Answer"]})})]}),H&&l.jsxs("div",{className:"flex-shrink-0 p-4 border-t border-border bg-surface-elevated",children:[l.jsx("p",{className:"text-sm text-text-muted text-center mb-3",children:"How did you do?"}),l.jsxs("div",{className:"flex justify-center gap-3",children:[l.jsxs("button",{onClick:()=>le(!1),className:"flex items-center gap-2 px-6 py-2 bg-error/20 text-error rounded-lg font-medium hover:bg-error/30 transition-colors",children:[l.jsx(Ea,{className:"w-4 h-4"}),"Incorrect"]}),l.jsxs("button",{onClick:()=>le(!0),className:"flex items-center gap-2 px-6 py-2 bg-success/20 text-success rounded-lg font-medium hover:bg-success/30 transition-colors",children:[l.jsx(Hp,{className:"w-4 h-4"}),"Got it!"]})]})]})]})]})})}function Ug({onClose:f}){const{questionsData:C,completedIds:N,bookmarkedIds:u}=Mt(),R=I.useMemo(()=>{const M=Vp.map(L=>{const D=C.filter(Q=>Q.category===L),pe=D.filter(Q=>N.has(Q.id)).length;return{name:L,total:D.length,completed:pe,percentage:Math.round(pe/D.length*100)||0,icon:D[0]?.icon||"📚"}}).sort((L,D)=>D.total-L.total),U=Gp.map(L=>{const D=C.filter(Q=>Q.difficulty===L),pe=D.filter(Q=>N.has(Q.id)).length;return{name:L,total:D.length,completed:pe,percentage:Math.round(pe/D.length*100)||0}}),b=Kp.map(L=>{const D=C.filter(Q=>Q.seniority===L),pe=D.filter(Q=>N.has(Q.id)).length;return{name:L,total:D.length,completed:pe,percentage:Math.round(pe/D.length*100)||0}}),K=M.filter(L=>L.total>=2&&L.percentage<50).sort((L,D)=>L.percentage-D.percentage).slice(0,5),_=M.filter(L=>L.total>=2&&L.percentage>=50).sort((L,D)=>D.percentage-L.percentage).slice(0,5);return{total:C.length,completed:N.size,bookmarked:u.size,percentage:Math.round(N.size/C.length*100),categoryStats:M,difficultyStats:U,seniorityStats:b,weakAreas:K,strongAreas:_}},[C,N,u]);I.useEffect(()=>{const M=U=>{U.key==="Escape"&&f()};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[f]),I.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]);const E={beginner:"bg-success",intermediate:"bg-warning",advanced:"bg-error"},H={junior:"🌱 Junior",mid:"🌿 Mid",senior:"🌳 Senior",staff:"🏔️ Staff+"};return l.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",children:l.jsxs("div",{className:"w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden",children:[l.jsxs("div",{className:"flex-shrink-0 p-4 border-b border-border flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"p-2 bg-gradient-end/20 rounded-lg",children:l.jsx(zp,{className:"w-5 h-5 text-gradient-end"})}),l.jsx("h2",{className:"text-lg font-semibold text-text-primary",children:"Progress Analytics"})]}),l.jsx("button",{onClick:f,className:"p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors",children:l.jsx(Ea,{className:"w-5 h-5"})})]}),l.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-6",children:[l.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsxs("div",{className:"flex items-center gap-2 text-text-muted mb-2",children:[l.jsx(qh,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm",children:"Total"})]}),l.jsx("p",{className:"text-2xl font-bold text-text-primary",children:R.total})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsxs("div",{className:"flex items-center gap-2 text-success mb-2",children:[l.jsx(vg,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm",children:"Completed"})]}),l.jsx("p",{className:"text-2xl font-bold text-success",children:R.completed})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsxs("div",{className:"flex items-center gap-2 text-warning mb-2",children:[l.jsx(Ph,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm",children:"Bookmarked"})]}),l.jsx("p",{className:"text-2xl font-bold text-warning",children:R.bookmarked})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsxs("div",{className:"flex items-center gap-2 text-primary mb-2",children:[l.jsx(zp,{className:"w-4 h-4"}),l.jsx("span",{className:"text-sm",children:"Progress"})]}),l.jsxs("p",{className:"text-2xl font-bold text-primary",children:[R.percentage,"%"]})]})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsx("h3",{className:"font-semibold text-text-primary mb-4",children:"By Difficulty"}),l.jsx("div",{className:"space-y-3",children:R.difficultyStats.map(M=>l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("span",{className:"w-28 text-sm text-text-secondary capitalize",children:M.name}),l.jsx("div",{className:"flex-1 h-4 bg-surface rounded-full overflow-hidden",children:l.jsx("div",{className:Ve("h-full transition-all",E[M.name]),style:{width:`${M.percentage}%`}})}),l.jsxs("span",{className:"w-20 text-sm text-text-muted text-right",children:[M.completed,"/",M.total]})]},M.name))})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsx("h3",{className:"font-semibold text-text-primary mb-4",children:"By Seniority Level"}),l.jsx("div",{className:"space-y-3",children:R.seniorityStats.map(M=>l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("span",{className:"w-28 text-sm text-text-secondary",children:H[M.name]}),l.jsx("div",{className:"flex-1 h-4 bg-surface rounded-full overflow-hidden",children:l.jsx("div",{className:"h-full bg-gradient-to-r from-primary to-gradient-end transition-all",style:{width:`${M.percentage}%`}})}),l.jsxs("span",{className:"w-20 text-sm text-text-muted text-right",children:[M.completed,"/",M.total]})]},M.name))})]}),l.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[R.weakAreas.length>0&&l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-error/30",children:[l.jsx("h3",{className:"font-semibold text-error mb-3",children:"Needs Work"}),l.jsx("div",{className:"space-y-2",children:R.weakAreas.map(M=>l.jsxs("div",{className:"flex items-center justify-between text-sm",children:[l.jsxs("span",{className:"text-text-secondary",children:[M.icon," ",M.name]}),l.jsxs("span",{className:"text-error",children:[M.percentage,"%"]})]},M.name))})]}),R.strongAreas.length>0&&l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-success/30",children:[l.jsx("h3",{className:"font-semibold text-success mb-3",children:"Strong Areas"}),l.jsx("div",{className:"space-y-2",children:R.strongAreas.map(M=>l.jsxs("div",{className:"flex items-center justify-between text-sm",children:[l.jsxs("span",{className:"text-text-secondary",children:[M.icon," ",M.name]}),l.jsxs("span",{className:"text-success",children:[M.percentage,"%"]})]},M.name))})]})]}),l.jsxs("div",{className:"bg-surface-elevated rounded-xl p-4 border border-border",children:[l.jsx("h3",{className:"font-semibold text-text-primary mb-4",children:"All Categories"}),l.jsx("div",{className:"grid gap-2 max-h-64 overflow-y-auto",children:R.categoryStats.map(M=>l.jsxs("div",{className:"flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors",children:[l.jsx("span",{className:"text-lg",children:M.icon}),l.jsx("span",{className:"flex-1 text-sm text-text-secondary truncate",children:M.name}),l.jsx("div",{className:"w-24 h-2 bg-surface rounded-full overflow-hidden",children:l.jsx("div",{className:Ve("h-full transition-all",M.percentage>=80?"bg-success":M.percentage>=50?"bg-primary":M.percentage>=25?"bg-warning":"bg-error"),style:{width:`${M.percentage}%`}})}),l.jsxs("span",{className:"w-16 text-xs text-text-muted text-right",children:[M.completed,"/",M.total]})]},M.name))})]})]}),l.jsx("div",{className:"flex-shrink-0 p-4 border-t border-border bg-surface-elevated",children:l.jsx("button",{onClick:f,className:"w-full py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors",children:"Close"})})]})})}function Og(){const{quizModeOpen:f,setQuizModeOpen:C,analyticsOpen:N,setAnalyticsOpen:u}=Mt();return l.jsxs("div",{className:"min-h-screen bg-background flex flex-col",children:[l.jsx(Cg,{}),l.jsxs("div",{className:"flex-1 flex",children:[l.jsx(Tg,{}),l.jsx("main",{className:"flex-1 flex flex-col overflow-hidden",children:l.jsx(Ng,{})})]}),l.jsx(Mg,{}),f&&l.jsx(Dg,{onClose:()=>C(!1)}),N&&l.jsx(Ug,{onClose:()=>u(!1)})]})}function Bg(){return l.jsx(Bh,{children:l.jsx(Og,{})})}Uh.createRoot(document.getElementById("root")).render(l.jsx(I.StrictMode,{children:l.jsx(Bg,{})}));

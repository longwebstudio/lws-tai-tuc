import{r as y,N as ze,D as U,c as Te,o as X,n as De,E as ve,b as T,g as ne,R as be,i as Oe,e as ee,a as m,ab as we,F as je,a8 as Ne,u as he,a9 as We,ac as Fe,a6 as G,O as He,ad as Qe,ae as Ve,af as te,A as ge,w as K,J as Ke,ag as Ue,ah as Xe,H as Ge}from"./index.346a40eb.js";import{r as Je}from"./rtl.b385ae51.js";function Ye(){const e=y(!ze.value);return e.value===!1&&U(()=>{e.value=!0}),{isHydrated:e}}const ye=typeof ResizeObserver!="undefined",me=ye===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var Ze=Te({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:i}){let c=null,u,r={width:-1,height:-1};function I(v){v===!0||e.debounce===0||e.debounce==="0"?_():c===null&&(c=setTimeout(_,e.debounce))}function _(){if(c!==null&&(clearTimeout(c),c=null),u){const{offsetWidth:v,offsetHeight:b}=u;(v!==r.width||b!==r.height)&&(r={width:v,height:b},i("resize",r))}}const{proxy:A}=ne();if(A.trigger=I,ye===!0){let v;const b=R=>{u=A.$el.parentNode,u?(v=new ResizeObserver(I),v.observe(u),_()):R!==!0&&ve(()=>{b(!0)})};return U(()=>{b()}),X(()=>{c!==null&&clearTimeout(c),v!==void 0&&(v.disconnect!==void 0?v.disconnect():u&&v.unobserve(u))}),De}else{let R=function(){c!==null&&(clearTimeout(c),c=null),b!==void 0&&(b.removeEventListener!==void 0&&b.removeEventListener("resize",I,be.passive),b=void 0)},z=function(){R(),u&&u.contentDocument&&(b=u.contentDocument.defaultView,b.addEventListener("resize",I,be.passive),_())};const{isHydrated:v}=Ye();let b;return U(()=>{ve(()=>{u=A.$el,u&&z()})}),X(R),()=>{if(v.value===!0)return T("object",{class:"q--avoid-card-border",style:me.style,tabindex:-1,type:"text/html",data:me.url,"aria-hidden":"true",onLoad:z})}}}});const ae={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},pe=Object.keys(ae);ae.all=!0;function lt(e){const i={};for(const c of pe)e[c]===!0&&(i[c]=!0);return Object.keys(i).length===0?ae:(i.horizontal===!0?i.left=i.right=!0:i.left===!0&&i.right===!0&&(i.horizontal=!0),i.vertical===!0?i.up=i.down=!0:i.up===!0&&i.down===!0&&(i.vertical=!0),i.horizontal===!0&&i.vertical===!0&&(i.all=!0),i)}const et=["INPUT","TEXTAREA"];function it(e,i){return i.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof i.handler=="function"&&et.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(i.uid)===-1)}let tt=0;const ut=["click","keydown"],st={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${tt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function ct(e,i,c,u){const r=Oe(we,ee);if(r===ee)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ee;const{proxy:I}=ne(),_=y(null),A=y(null),v=y(null),b=m(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),R=m(()=>r.currentModel.value===e.name),z=m(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(R.value===!0?" q-tab--active"+(r.tabProps.value.activeClass?" "+r.tabProps.value.activeClass:"")+(r.tabProps.value.activeColor?` text-${r.tabProps.value.activeColor}`:"")+(r.tabProps.value.activeBgColor?` bg-${r.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&r.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||r.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(u!==void 0?u.linkClass.value:"")),E=m(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(r.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),C=m(()=>e.disable===!0||r.hasFocus.value===!0||R.value===!1&&r.hasActiveTab.value===!0?-1:e.tabindex||0);function k(o,w){if(w!==!0&&_.value!==null&&_.value.focus(),e.disable===!0){u!==void 0&&u.hasRouterLink.value===!0&&he(o);return}if(u===void 0){r.updateModel({name:e.name}),c("click",o);return}if(u.hasRouterLink.value===!0){const q=(h={})=>{let L;const S=h.to===void 0||Qe(h.to,e.to)===!0?r.avoidRouteWatcher=Ve():null;return u.navigateToRouterLink(o,{...h,returnRouterError:!0}).catch(B=>{L=B}).then(B=>{if(S===r.avoidRouteWatcher&&(r.avoidRouteWatcher=!1,L===void 0&&(B===void 0||B.message!==void 0&&B.message.startsWith("Avoided redundant navigation")===!0)&&r.updateModel({name:e.name})),h.returnRouterError===!0)return L!==void 0?Promise.reject(L):B})};c("click",o,q),o.defaultPrevented!==!0&&q();return}c("click",o)}function x(o){We(o,[13,32])?k(o,!0):Fe(o)!==!0&&o.keyCode>=35&&o.keyCode<=40&&o.altKey!==!0&&o.metaKey!==!0&&r.onKbdNavigate(o.keyCode,I.$el)===!0&&he(o),c("keydown",o)}function N(){const o=r.tabProps.value.narrowIndicator,w=[],q=T("div",{ref:v,class:["q-tab__indicator",r.tabProps.value.indicatorClass]});e.icon!==void 0&&w.push(T(G,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&w.push(T("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&w.push(e.alertIcon!==void 0?T(G,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):T("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),o===!0&&w.push(q);const h=[T("div",{class:"q-focus-helper",tabindex:-1,ref:_}),T("div",{class:E.value},He(i.default,w))];return o===!1&&h.push(q),h}const D={name:m(()=>e.name),rootRef:A,tabIndicatorRef:v,routeData:u};X(()=>{r.unregisterTab(D)}),U(()=>{r.registerTab(D)});function W(o,w){const q={ref:A,class:z.value,tabindex:C.value,role:"tab","aria-selected":R.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:k,onKeydown:x,...w};return je(T(o,q,N()),[[Ne,b.value]])}return{renderTab:W,$tabs:r}}function nt(e,i,c){const u=c===!0?["left","right"]:["top","bottom"];return`absolute-${i===!0?u[0]:u[1]}${e?` text-${e}`:""}`}const at=["left","center","right","justify"];var dt=Te({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>at.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:i,emit:c}){const{proxy:u}=ne(),{$q:r}=u,{registerTick:I}=te(),{registerTick:_}=te(),{registerTick:A}=te(),{registerTimeout:v,removeTimeout:b}=ge(),{registerTimeout:R,removeTimeout:z}=ge(),E=y(null),C=y(null),k=y(e.modelValue),x=y(!1),N=y(!0),D=y(!1),W=y(!1),o=[],w=y(0),q=y(!1);let h=null,L=null,S;const B=m(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:nt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Ce=m(()=>{const t=w.value,n=k.value;for(let a=0;a<t;a++)if(o[a].name.value===n)return!0;return!1}),qe=m(()=>`q-tabs__content--align-${x.value===!0?"left":W.value===!0?"justify":e.align}`),Re=m(()=>`q-tabs row no-wrap items-center q-tabs--${x.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),Le=m(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),F=m(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),H=m(()=>e.vertical!==!0&&r.lang.rtl===!0),J=m(()=>Je===!1&&H.value===!0);K(H,j),K(()=>e.modelValue,t=>{Y({name:t,setCurrent:!0,skipEmit:!0})}),K(()=>e.outsideArrows,Q);function Y({name:t,setCurrent:n,skipEmit:a}){k.value!==t&&(a!==!0&&e["onUpdate:modelValue"]!==void 0&&c("update:modelValue",t),(n===!0||e["onUpdate:modelValue"]===void 0)&&(_e(k.value,t),k.value=t))}function Q(){I(()=>{re({width:E.value.offsetWidth,height:E.value.offsetHeight})})}function re(t){if(F.value===void 0||C.value===null)return;const n=t[F.value.container],a=Math.min(C.value[F.value.scroll],Array.prototype.reduce.call(C.value.children,(f,s)=>f+(s[F.value.content]||0),0)),d=n>0&&a>n;x.value=d,d===!0&&_(j),W.value=n<parseInt(e.breakpoint,10)}function _e(t,n){const a=t!=null&&t!==""?o.find(f=>f.name.value===t):null,d=n!=null&&n!==""?o.find(f=>f.name.value===n):null;if(a&&d){const f=a.tabIndicatorRef.value,s=d.tabIndicatorRef.value;h!==null&&(clearTimeout(h),h=null),f.style.transition="none",f.style.transform="none",s.style.transition="none",s.style.transform="none";const l=f.getBoundingClientRect(),g=s.getBoundingClientRect();s.style.transform=e.vertical===!0?`translate3d(0,${l.top-g.top}px,0) scale3d(1,${g.height?l.height/g.height:1},1)`:`translate3d(${l.left-g.left}px,0,0) scale3d(${g.width?l.width/g.width:1},1,1)`,A(()=>{h=setTimeout(()=>{h=null,s.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",s.style.transform="none"},70)})}d&&x.value===!0&&O(d.rootRef.value)}function O(t){const{left:n,width:a,top:d,height:f}=C.value.getBoundingClientRect(),s=t.getBoundingClientRect();let l=e.vertical===!0?s.top-d:s.left-n;if(l<0){C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(l),j();return}l+=e.vertical===!0?s.height-f:s.width-a,l>0&&(C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(l),j())}function j(){const t=C.value;if(t===null)return;const n=t.getBoundingClientRect(),a=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);H.value===!0?(N.value=Math.ceil(a+n.width)<t.scrollWidth-1,D.value=a>0):(N.value=a>0,D.value=e.vertical===!0?Math.ceil(a+n.height)<t.scrollHeight:Math.ceil(a+n.width)<t.scrollWidth)}function oe(t){L!==null&&clearInterval(L),L=setInterval(()=>{Pe(t)===!0&&$()},5)}function le(){oe(J.value===!0?Number.MAX_SAFE_INTEGER:0)}function ie(){oe(J.value===!0?0:Number.MAX_SAFE_INTEGER)}function $(){L!==null&&(clearInterval(L),L=null)}function ke(t,n){const a=Array.prototype.filter.call(C.value.children,g=>g===n||g.matches&&g.matches(".q-tab.q-focusable")===!0),d=a.length;if(d===0)return;if(t===36)return O(a[0]),a[0].focus(),!0;if(t===35)return O(a[d-1]),a[d-1].focus(),!0;const f=t===(e.vertical===!0?38:37),s=t===(e.vertical===!0?40:39),l=f===!0?-1:s===!0?1:void 0;if(l!==void 0){const g=H.value===!0?-1:1,P=a.indexOf(n)+l*g;return P>=0&&P<d&&(O(a[P]),a[P].focus({preventScroll:!0})),!0}}const Se=m(()=>J.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,n)=>{t.scrollLeft=-n}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,n)=>{t.scrollTop=n}}:{get:t=>t.scrollLeft,set:(t,n)=>{t.scrollLeft=n}});function Pe(t){const n=C.value,{get:a,set:d}=Se.value;let f=!1,s=a(n);const l=t<s?-1:1;return s+=l*5,s<0?(f=!0,s=0):(l===-1&&s<=t||l===1&&s>=t)&&(f=!0,s=t),d(n,s),j(),f}function ue(t,n){for(const a in t)if(t[a]!==n[a])return!1;return!0}function Ie(){let t=null,n={matchedLen:0,queryDiff:9999,hrefLen:0};const a=o.filter(l=>l.routeData!==void 0&&l.routeData.hasRouterLink.value===!0),{hash:d,query:f}=u.$route,s=Object.keys(f).length;for(const l of a){const g=l.routeData.exact.value===!0;if(l.routeData[g===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:P,query:Z,matched:Me,href:Ee}=l.routeData.resolvedLink.value,p=Object.keys(Z).length;if(g===!0){if(P!==d||p!==s||ue(f,Z)===!1)continue;t=l.name.value;break}if(P!==""&&P!==d||p!==0&&ue(Z,f)===!1)continue;const M={matchedLen:Me.length,queryDiff:s-p,hrefLen:Ee.length-P.length};if(M.matchedLen>n.matchedLen){t=l.name.value,n=M;continue}else if(M.matchedLen!==n.matchedLen)continue;if(M.queryDiff<n.queryDiff)t=l.name.value,n=M;else if(M.queryDiff!==n.queryDiff)continue;M.hrefLen>n.hrefLen&&(t=l.name.value,n=M)}t===null&&o.some(l=>l.routeData===void 0&&l.name.value===k.value)===!0||Y({name:t,setCurrent:!0})}function Ae(t){if(b(),q.value!==!0&&E.value!==null&&t.target&&typeof t.target.closest=="function"){const n=t.target.closest(".q-tab");n&&E.value.contains(n)===!0&&(q.value=!0,x.value===!0&&O(n))}}function xe(){v(()=>{q.value=!1},30)}function V(){ce.avoidRouteWatcher===!1?R(Ie):z()}function se(){if(S===void 0){const t=K(()=>u.$route.fullPath,V);S=()=>{t(),S=void 0}}}function Be(t){o.push(t),w.value++,Q(),t.routeData===void 0||u.$route===void 0?R(()=>{if(x.value===!0){const n=k.value,a=n!=null&&n!==""?o.find(d=>d.name.value===n):null;a&&O(a.rootRef.value)}}):(se(),t.routeData.hasRouterLink.value===!0&&V())}function $e(t){o.splice(o.indexOf(t),1),w.value--,Q(),S!==void 0&&t.routeData!==void 0&&(o.every(n=>n.routeData===void 0)===!0&&S(),V())}const ce={currentModel:k,tabProps:B,hasFocus:q,hasActiveTab:Ce,registerTab:Be,unregisterTab:$e,verifyRouteModel:V,updateModel:Y,onKbdNavigate:ke,avoidRouteWatcher:!1};Ke(we,ce);function de(){h!==null&&clearTimeout(h),$(),S!==void 0&&S()}let fe;return X(de),Ue(()=>{fe=S!==void 0,de()}),Xe(()=>{fe===!0&&se(),Q()}),()=>T("div",{ref:E,class:Re.value,role:"tablist",onFocusin:Ae,onFocusout:xe},[T(Ze,{onResize:re}),T("div",{ref:C,class:Le.value,onScroll:j},Ge(i.default)),T(G,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(N.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||r.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:le,onTouchstartPassive:le,onMouseupPassive:$,onMouseleavePassive:$,onTouchendPassive:$}),T(G,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(D.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||r.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ie,onTouchstartPassive:ie,onMouseupPassive:$,onMouseleavePassive:$,onTouchendPassive:$})])}});export{Ze as Q,ut as a,ct as b,dt as c,lt as g,it as s,st as u};

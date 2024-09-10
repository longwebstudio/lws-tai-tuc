import{Q as S,a as v,d as X}from"./QItem.2974e7f9.js";import{f as Q,j as x,a as m,g as q,m as N,b as K,h as V,c as P,p as I,ac as U,ad as w,ab as O,ae as E,af as F,ag as M,V as D,W as B,X as l,a3 as h,Y as i,a4 as z,a5 as j,a6 as $,$ as A,_ as Y,a2 as y,ah as G,ai as k,a0 as f,aj as b,I as R,ak as W}from"./index.42507856.js";import{Q as J}from"./QList.bdbef175.js";import{_ as Z,Q as ee,a as te,b as oe}from"./plugin-vue_export-helper.c89000a7.js";const ae={position:{type:String,default:"bottom-right",validator:t=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(t)},offset:{type:Array,validator:t=>t.length===2},expand:Boolean};function ie(){const{props:t,proxy:{$q:o}}=q(),n=Q(N,x);if(n===x)return console.error("QPageSticky needs to be child of QLayout"),x;const r=m(()=>{const s=t.position;return{top:s.indexOf("top")!==-1,right:s.indexOf("right")!==-1,bottom:s.indexOf("bottom")!==-1,left:s.indexOf("left")!==-1,vertical:s==="top"||s==="bottom",horizontal:s==="left"||s==="right"}}),a=m(()=>n.header.offset),u=m(()=>n.right.offset),e=m(()=>n.footer.offset),d=m(()=>n.left.offset),_=m(()=>{let s=0,p=0;const c=r.value,H=o.lang.rtl===!0?-1:1;c.top===!0&&a.value!==0?p=`${a.value}px`:c.bottom===!0&&e.value!==0&&(p=`${-e.value}px`),c.left===!0&&d.value!==0?s=`${H*d.value}px`:c.right===!0&&u.value!==0&&(s=`${-H*u.value}px`);const g={transform:`translate(${s}, ${p})`};return t.offset&&(g.margin=`${t.offset[1]}px ${t.offset[0]}px`),c.vertical===!0?(d.value!==0&&(g[o.lang.rtl===!0?"right":"left"]=`${d.value}px`),u.value!==0&&(g[o.lang.rtl===!0?"left":"right"]=`${u.value}px`)):c.horizontal===!0&&(a.value!==0&&(g.top=`${a.value}px`),e.value!==0&&(g.bottom=`${e.value}px`)),g}),T=m(()=>`q-page-sticky row flex-center fixed-${t.position} q-page-sticky--${t.expand===!0?"expand":"shrink"}`);function C(s){const p=K(s.default);return V("div",{class:T.value,style:_.value},t.expand===!0?p:[V("div",p)])}return{$layout:n,getStickyContent:C}}var ne=P({name:"QPageSticky",props:ae,setup(t,{slots:o}){const{getStickyContent:n}=ie();return()=>n(o)}});function L(t){if(t===!1)return 0;if(t===!0||t===void 0)return 1;const o=parseInt(t,10);return isNaN(o)?0:o}var le=I({name:"close-popup",beforeMount(t,{value:o}){const n={depth:L(o),handler(r){n.depth!==0&&setTimeout(()=>{const a=U(t);a!==void 0&&w(a,r,n.depth)})},handlerKey(r){O(r,13)===!0&&n.handler(r)}};t.__qclosepopup=n,t.addEventListener("click",n.handler),t.addEventListener("keyup",n.handlerKey)},updated(t,{value:o,oldValue:n}){o!==n&&(t.__qclosepopup.depth=L(o))},beforeUnmount(t){const o=t.__qclosepopup;t.removeEventListener("click",o.handler),t.removeEventListener("keyup",o.handlerKey),delete t.__qclosepopup}});const se={data(){return{baoHiemXoaId:null,hienThiDialog:!1,cheDoDialog:null,baoHiemDangXuLy:{},loaiBaoHiemOptions:["TNDS b\u1EAFt bu\u1ED9c","B\u1EA3o hi\u1EC3m th\xE2n v\u1ECF"]}},computed:{...E("baohiem",["isLoading"]),...F("baohiem",["danhSachBaoHiemSapXep"])},methods:{...M("baohiem",["layDanhSachBaoHiem","xoaBaoHiem","themBaoHiem","capNhatBaoHiem"]),moDialogThemMoi(){this.cheDoDialog="them",this.baoHiemDangXuLy={},this.hienThiDialog=!0},moDialogChinhSua(t){this.cheDoDialog="chinh-sua",this.baoHiemDangXuLy={...t,ngayBatDau:t.ngayBatDau.slice(0,10),ngayKetThuc:t.ngayKetThuc.slice(0,10)},this.hienThiDialog=!0},submitForm(){this.$refs.form.validate().then(t=>{t&&(this.cheDoDialog==="them"?this.themBaoHiem(this.baoHiemDangXuLy):this.capNhatBaoHiem(this.baoHiemDangXuLy),this.hienThiDialog=!1)})},hienThiXacNhanXoa(t){this.$q.dialog({title:"X\xE1c nh\u1EADn x\xF3a",message:"B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a b\u1EA3o hi\u1EC3m n\xE0y?",cancel:!0,persistent:!0}).onOk(()=>{this.xoaBaoHiem(t)})}},mounted(){this.layDanhSachBaoHiem()}},ue={class:"text-weight-bold"},re={class:"text-caption text-grey"},me={class:"text-caption text-grey"},he={class:"q-gutter-sm"},de={class:"text-h6"},pe={class:"text-right q-mt-md"};function ce(t,o,n,r,a,u){return D(),B(ee,{class:"q-pa-md"},{default:l(()=>[o[8]||(o[8]=h("div",{class:"text-h5 q-mb-md"},"Danh s\xE1ch B\u1EA3o hi\u1EC3m Xe m\xE1y",-1)),i(J,{bordered:"",separator:""},{default:l(()=>[(D(!0),z($,null,j(t.danhSachBaoHiemSapXep,e=>(D(),B(S,{key:e.id},{default:l(()=>[i(v,null,{default:l(()=>[i(X,null,{default:l(()=>[h("div",ue,f(e.bienSoXe),1),h("div",re,f(e.hangBaoHiem)+" - "+f(e.loaiBaoHiem),1),h("div",me," T\u1EEB "+f(e.ngayBatDau)+" \u0111\u1EBFn "+f(e.ngayKetThuc),1)]),_:2},1024)]),_:2},1024),i(v,{side:""},{default:l(()=>[h("div",he,[i(y,{icon:"edit",color:"primary",size:"sm",round:"",dense:"",onClick:d=>u.moDialogChinhSua(e)},null,8,["onClick"]),i(y,{icon:"delete",color:"negative",size:"sm",round:"",dense:"",onClick:d=>u.hienThiXacNhanXoa(e.id)},null,8,["onClick"])])]),_:2},1024)]),_:2},1024))),128)),t.danhSachBaoHiemSapXep.length?Y("",!0):(D(),B(S,{key:0},{default:l(()=>[i(v,null,{default:l(()=>[i(X,{class:"text-center text-grey"},{default:l(()=>o[7]||(o[7]=[A(" Kh\xF4ng c\xF3 b\u1EA3o hi\u1EC3m n\xE0o. ")])),_:1})]),_:1})]),_:1}))]),_:1}),i(ne,{position:"bottom-right",offset:[18,18]},{default:l(()=>[i(y,{fab:"",icon:"add",color:"primary",onClick:u.moDialogThemMoi},null,8,["onClick"])]),_:1}),i(W,{modelValue:a.hienThiDialog,"onUpdate:modelValue":o[6]||(o[6]=e=>a.hienThiDialog=e),persistent:""},{default:l(()=>[i(G,{style:{"min-width":"350px"}},{default:l(()=>[i(k,null,{default:l(()=>[h("div",de,f(a.cheDoDialog==="them"?"Th\xEAm B\u1EA3o hi\u1EC3m M\u1EDBi":"Ch\u1EC9nh s\u1EEDa B\u1EA3o hi\u1EC3m"),1)]),_:1}),i(k,{class:"q-pt-none"},{default:l(()=>[i(te,{onSubmit:u.submitForm,ref:"form"},{default:l(()=>[i(b,{modelValue:a.baoHiemDangXuLy.bienSoXe,"onUpdate:modelValue":o[0]||(o[0]=e=>a.baoHiemDangXuLy.bienSoXe=e),label:"Bi\u1EC3n s\u1ED1 xe",outlined:"",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp bi\u1EC3n s\u1ED1 xe"]},null,8,["modelValue","rules"]),i(b,{modelValue:a.baoHiemDangXuLy.hangBaoHiem,"onUpdate:modelValue":o[1]||(o[1]=e=>a.baoHiemDangXuLy.hangBaoHiem=e),label:"H\xE3ng b\u1EA3o hi\u1EC3m",outlined:"",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp h\xE3ng b\u1EA3o hi\u1EC3m"]},null,8,["modelValue","rules"]),i(oe,{modelValue:a.baoHiemDangXuLy.loaiBaoHiem,"onUpdate:modelValue":o[2]||(o[2]=e=>a.baoHiemDangXuLy.loaiBaoHiem=e),label:"Lo\u1EA1i b\u1EA3o hi\u1EC3m",options:a.loaiBaoHiemOptions,outlined:"",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn lo\u1EA1i b\u1EA3o hi\u1EC3m"]},null,8,["modelValue","options","rules"]),i(b,{modelValue:a.baoHiemDangXuLy.ngayBatDau,"onUpdate:modelValue":o[3]||(o[3]=e=>a.baoHiemDangXuLy.ngayBatDau=e),label:"Ng\xE0y b\u1EAFt \u0111\u1EA7u",outlined:"",type:"date",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn ng\xE0y b\u1EAFt \u0111\u1EA7u"]},null,8,["modelValue","rules"]),i(b,{modelValue:a.baoHiemDangXuLy.ngayKetThuc,"onUpdate:modelValue":o[4]||(o[4]=e=>a.baoHiemDangXuLy.ngayKetThuc=e),label:"Ng\xE0y k\u1EBFt th\xFAc",outlined:"",type:"date",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn ng\xE0y k\u1EBFt th\xFAc",e=>new Date(e)>new Date(a.baoHiemDangXuLy.ngayBatDau)||"Ng\xE0y k\u1EBFt th\xFAc ph\u1EA3i sau ng\xE0y b\u1EAFt \u0111\u1EA7u"]},null,8,["modelValue","rules"]),i(b,{modelValue:a.baoHiemDangXuLy.soTienBaoHiem,"onUpdate:modelValue":o[5]||(o[5]=e=>a.baoHiemDangXuLy.soTienBaoHiem=e),modelModifiers:{number:!0},label:"S\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m",outlined:"",type:"number",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp s\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m",e=>e>0||"S\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m ph\u1EA3i l\u1EDBn h\u01A1n 0"]},null,8,["modelValue","rules"]),h("div",pe,[i(y,{label:a.cheDoDialog==="them"?"Th\xEAm":"L\u01B0u",type:"submit",color:"primary"},null,8,["label"]),R(i(y,{label:"H\u1EE7y",color:"grey",flat:"",class:"q-ml-sm"},null,512),[[le]])])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var De=Z(se,[["render",ce]]);export{De as default};

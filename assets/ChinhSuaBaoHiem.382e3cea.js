import{ae as b,ag as r,V as d,W as h,X as t,a3 as u,Y as o,aj as m,a2 as n}from"./index.42507856.js";import{_ as H,Q as g,b as V,a as p}from"./plugin-vue_export-helper.c89000a7.js";import"./QItem.2974e7f9.js";const B={data(){return{loaiBaoHiemOptions:["TNDS b\u1EAFt bu\u1ED9c","B\u1EA3o hi\u1EC3m th\xE2n v\u1ECF"]}},computed:{...b("baohiem",["baoHiemDangChon"]),baoHiem:{get(){return this.baoHiemDangChon?{...this.baoHiemDangChon}:{}},set(i){}}},methods:{...r("baohiem",["capNhatBaoHiem"]),submitForm(){this.$refs.form.validate().then(i=>{i&&(this.capNhatBaoHiem(this.baoHiem),this.$router.push({name:"danh-sach-bao-hiem"}))})}},mounted(){this.baoHiemDangChon||this.$router.push({name:"danh-sach-bao-hiem"})}},y={class:"text-right"};function f(i,a,c,D,s,l){return d(),h(g,{class:"q-pa-md"},{default:t(()=>[a[6]||(a[6]=u("div",{class:"text-h5 q-mb-md"},"Ch\u1EC9nh s\u1EEDa B\u1EA3o hi\u1EC3m",-1)),o(p,{onSubmit:l.submitForm,class:"q-gutter-md",ref:"form"},{default:t(()=>[o(m,{modelValue:l.baoHiem.bienSoXe,"onUpdate:modelValue":a[0]||(a[0]=e=>l.baoHiem.bienSoXe=e),label:"Bi\u1EC3n s\u1ED1 xe",outlined:"",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp bi\u1EC3n s\u1ED1 xe"]},null,8,["modelValue","rules"]),o(m,{modelValue:l.baoHiem.hangBaoHiem,"onUpdate:modelValue":a[1]||(a[1]=e=>l.baoHiem.hangBaoHiem=e),label:"H\xE3ng b\u1EA3o hi\u1EC3m",outlined:"",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp h\xE3ng b\u1EA3o hi\u1EC3m"]},null,8,["modelValue","rules"]),o(V,{modelValue:l.baoHiem.loaiBaoHiem,"onUpdate:modelValue":a[2]||(a[2]=e=>l.baoHiem.loaiBaoHiem=e),label:"Lo\u1EA1i b\u1EA3o hi\u1EC3m",options:s.loaiBaoHiemOptions,outlined:"",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn lo\u1EA1i b\u1EA3o hi\u1EC3m"]},null,8,["modelValue","options","rules"]),o(m,{modelValue:l.baoHiem.ngayBatDau,"onUpdate:modelValue":a[3]||(a[3]=e=>l.baoHiem.ngayBatDau=e),label:"Ng\xE0y b\u1EAFt \u0111\u1EA7u",outlined:"",type:"date",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn ng\xE0y b\u1EAFt \u0111\u1EA7u"]},null,8,["modelValue","rules"]),o(m,{modelValue:l.baoHiem.ngayKetThuc,"onUpdate:modelValue":a[4]||(a[4]=e=>l.baoHiem.ngayKetThuc=e),label:"Ng\xE0y k\u1EBFt th\xFAc",outlined:"",type:"date",rules:[e=>!!e||"Vui l\xF2ng ch\u1ECDn ng\xE0y k\u1EBFt th\xFAc",e=>new Date(e)>new Date(l.baoHiem.ngayBatDau)||"Ng\xE0y k\u1EBFt th\xFAc ph\u1EA3i sau ng\xE0y b\u1EAFt \u0111\u1EA7u"]},null,8,["modelValue","rules"]),o(m,{modelValue:l.baoHiem.soTienBaoHiem,"onUpdate:modelValue":a[5]||(a[5]=e=>l.baoHiem.soTienBaoHiem=e),modelModifiers:{number:!0},label:"S\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m",outlined:"",type:"number",rules:[e=>!!e||"Vui l\xF2ng nh\u1EADp s\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m",e=>e>0||"S\u1ED1 ti\u1EC1n b\u1EA3o hi\u1EC3m ph\u1EA3i l\u1EDBn h\u01A1n 0"]},null,8,["modelValue","rules"]),u("div",y,[o(n,{label:"L\u01B0u",type:"submit",color:"primary"}),o(n,{label:"H\u1EE7y",color:"grey",flat:"",class:"q-ml-sm",to:{name:"danh-sach-bao-hiem"}})])]),_:1},8,["onSubmit"])]),_:1})}var C=H(B,[["render",f]]);export{C as default};

"use strict";(self.webpackChunkweb_qr_scanner=self.webpackChunkweb_qr_scanner||[]).push([[823],{7823:function(e,n,t){t.r(n);var r=t(5861),s=t(9439),c=t(7757),i=t.n(c),a=t(2791),l=t(7063),d=t(1358),o=t(6871),u=t(184);n.default=function(){var e=(0,a.useState)({lastName:"",gender:"",qrId:"",id:""}),n=(0,s.Z)(e,2),t=n[0],c=n[1],h=(0,o.s0)();(0,a.useEffect)((function(){}),[]);var p=function(){var e=(0,r.Z)(i().mark((function e(n){var t,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://localhost:5001/api/qrscanner/check-qr",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({qrId:n})});case 2:return t=e.sent,e.next=5,t.json();case 5:r=e.sent,c(r),alert("Scanned!");case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,u.jsxs)("div",{className:"container",children:[(0,u.jsx)("h1",{style:{textAlign:"center"},children:"QR Scanner"}),(0,u.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,u.jsx)("div",{style:{height:500,width:500},children:(0,u.jsx)(l.T,{onResult:function(e,n){e&&p(null===e||void 0===e?void 0:e.text,t)},style:{width:"100%"}})})}),(0,u.jsxs)("p",{style:{textAlign:"center"},children:["Name: ",t.lastName]}),(0,u.jsx)("div",{className:"cs-inline jc-center p-15",children:(0,u.jsx)(d.Z,{type:"primary",children:"Scan"})}),(0,u.jsx)("div",{className:"cs-inline jc-center",children:(0,u.jsx)(d.Z,{type:"primary",onClick:function(){h("register-student")},children:"Register Qr"})})]})}}}]);
//# sourceMappingURL=823.90c18b73.chunk.js.map
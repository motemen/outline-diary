(this["webpackJsonpoutline-diary"]=this["webpackJsonpoutline-diary"]||[]).push([[0],{118:function(e,t,n){},119:function(e,t,n){},145:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(34),i=n.n(a),u=(n(118),n(12)),l=n(21),o=(n(119),n(98)),s=n(199),j=n(94),d=n(97),b=n(198),f=n(95),h=n(15),O=n(196),p=n(197),x=n(96),v=n(201),m=n(83),g=n(84),y=n(200),F=n(67),S=n(3),I=Object(x.a)({palette:{mode:"dark"}}),C=function(e){return function(t){return e?Object(l.a)(Object(l.a)({},t),{},{children:t.children.flatMap((function(t){if("list"!==t.type)return[t];var n=function t(n){if(!("children"in n))return!1;var c=!1;return n.children=n.children.flatMap((function(n){return"text"===n.type&&n.value.includes(e)?(c=!0,n.value.split(e).map((function(e){return Object(h.a)("text",e)})).flatMap((function(t,n){return 0===n?[t]:[Object(h.a)("strong",[Object(h.a)("text",e)]),t]}))):(t(n)&&(c=!0),[n])})),c};return t.children=t.children.flatMap((function(e){return n(e)?[e]:[]})),[t]}))}):t}};function M(){var e="./outer_wilds.md",t=Object(y.a)(),n=Object(u.a)(t,2),a=n[0],i=n[1],h=Object(F.c)("u",F.b),x=Object(u.a)(h,2),M=x[0],k=x[1];M||(k(e,"replaceIn"),M=e);var w=Object(c.useState)(decodeURIComponent(a.replace(/^#/,""))),E=Object(u.a)(w,2),B=E[0],J=E[1],L=Object(o.a)(M,(function(e){return fetch(e).then((function(e){return e.text()}))})),N=L.data,P=L.error;if(P)return Object(S.jsxs)("div",{className:"error",children:["\u274c Failed to fetch ",M,": ","".concat(P)]});if(!N||!M)return Object(S.jsx)("div",{className:"loading"});var T=[],D="",R=Object(s.a)().use(j.a).use(d.a).use((function(){return function(e){if(e.children.length>1&&"yaml"===e.children[0].type)try{var t=Object(m.a)(e.children[0].value);T=t.keywords,D=t.title}catch(n){console.error(n)}}})).use(C,B).use(b.a).use(f.a,{createElement:r.a.createElement}).processSync(N).result;return Object(S.jsxs)(v.a,{theme:I,children:[Object(S.jsx)(g.a,{children:Object(S.jsx)("title",{children:D})}),Object(S.jsxs)("nav",{children:[Object(S.jsx)(O.a,{options:T,blurOnSelect:!0,selectOnFocus:!0,onInputChange:function(e,t){!function(e){J(e),i(e)}(t)},defaultValue:B,freeSolo:!0,renderInput:function(e){return Object(S.jsx)(p.a,Object(l.a)(Object(l.a)({placeholder:"Filter\u2026"},e),{},{variant:"standard"}))}}),Object(S.jsxs)("small",{children:["Source: ",Object(S.jsx)("a",{href:M,children:M})]})]}),Object(S.jsx)("main",{children:Object(S.jsx)("div",{children:R})})]})}var k=function(){return Object(S.jsx)(F.a,{children:Object(S.jsx)(M,{})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,203)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)(k,{})}),document.getElementById("root")),w()}},[[145,1,2]]]);
//# sourceMappingURL=main.7d544923.chunk.js.map
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{1237:function(e,t,a){"use strict";var r=a(17),n=a(5),i=a(2),o=a(0),c=a(8),s=a(51),l=a(7),d=a(12),b=a(40),u=a(1),p=Object(b.a)(Object(u.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),j=a(28),m=a(32);function f(e){return Object(j.a)("MuiAvatar",e)}Object(m.a)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var h=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],g=Object(l.a)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],a.colorDefault&&t.colorDefault]}})((function(e){var t=e.theme,a=e.ownerState;return Object(i.a)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===a.variant&&{borderRadius:t.shape.borderRadius},"square"===a.variant&&{borderRadius:0},a.colorDefault&&{color:t.palette.background.default,backgroundColor:"light"===t.palette.mode?t.palette.grey[400]:t.palette.grey[600]})})),x=Object(l.a)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,t){return t.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),O=Object(l.a)(p,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,t){return t.fallback}})({width:"75%",height:"75%"});var v=o.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiAvatar"}),l=a.alt,b=a.children,p=a.className,j=a.component,m=void 0===j?"div":j,v=a.imgProps,y=a.sizes,S=a.src,w=a.srcSet,k=a.variant,M=void 0===k?"circular":k,I=Object(n.a)(a,h),R=null,C=function(e){var t=e.crossOrigin,a=e.referrerPolicy,n=e.src,i=e.srcSet,c=o.useState(!1),s=Object(r.a)(c,2),l=s[0],d=s[1];return o.useEffect((function(){if(n||i){d(!1);var e=!0,r=new Image;return r.onload=function(){e&&d("loaded")},r.onerror=function(){e&&d("error")},r.crossOrigin=t,r.referrerPolicy=a,r.src=n,i&&(r.srcset=i),function(){e=!1}}}),[t,a,n,i]),l}(Object(i.a)({},v,{src:S,srcSet:w})),z=S||w,T=z&&"error"!==C,F=Object(i.a)({},a,{colorDefault:!T,component:m,variant:M}),N=function(e){var t=e.classes,a={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return Object(s.a)(a,f,t)}(F);return R=T?Object(u.jsx)(x,Object(i.a)({alt:l,src:S,srcSet:w,sizes:y,ownerState:F,className:N.img},v)):null!=b?b:z&&l?l[0]:Object(u.jsx)(O,{className:N.fallback}),Object(u.jsx)(g,Object(i.a)({as:m,ownerState:F,className:Object(c.default)(N.root,p),ref:t},I,{children:R}))}));t.a=v},1275:function(e,t,a){"use strict";a.r(t);var r=a(6),n=a(0),i=a(662),o=a(30),c=a(72),s=a(93),l=a(248),d=a(651),b=a(704),u=a(661),p=a(755),j=a(655),m=a(656),f=a(657),h=a(658),g=a(1237),x=a(659),O=a(702),v=a(1),y=Object(c.a)("div")((function(){return{paddingLeft:"24px",paddingRight:"24px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between"}})),S=Object(c.a)("span")((function(){return{fontSize:"1rem",fontWeight:"500",textTransform:"capitalize"}})),w=Object(c.a)(d.a)((function(){return{minWidth:400,whiteSpace:"pre","& small":{height:15,width:50,borderRadius:500,boxShadow:"0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"},"& td":{borderBottom:"none"},"& td:first-of-type":{paddingLeft:"16px !important"}}})),k=Object(c.a)("small")((function(e){return{height:15,width:50,color:"#fff",padding:"2px 8px",borderRadius:"4px",overflow:"hidden",background:e.bgcolor,boxShadow:"0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"}})),M=[{imgUrl:"/assets/images/products/headphone-2.jpg",name:"earphone",price:100,available:15},{imgUrl:"/assets/images/products/headphone-3.jpg",name:"earphone",price:1500,available:30},{imgUrl:"/assets/images/products/iphone-2.jpg",name:"iPhone x",price:1900,available:35},{imgUrl:"/assets/images/products/iphone-1.jpg",name:"iPhone x",price:100,available:0},{imgUrl:"/assets/images/products/headphone-3.jpg",name:"Head phone",price:1190,available:5}],I=function(){var e=Object(s.a)().palette,t=e.error.main,a=e.primary.main,r=e.secondary.main;return Object(v.jsxs)(b.a,{elevation:3,sx:{pt:"20px",mb:3},children:[Object(v.jsxs)(y,{children:[Object(v.jsx)(S,{children:"top selling products"}),Object(v.jsxs)(u.a,{size:"small",defaultValue:"this_month",children:[Object(v.jsx)(p.a,{value:"this_month",children:"This Month"}),Object(v.jsx)(p.a,{value:"last_month",children:"Last Month"})]})]}),Object(v.jsx)(l.a,{overflow:"auto",children:Object(v.jsxs)(w,{children:[Object(v.jsx)(j.a,{children:Object(v.jsxs)(m.a,{children:[Object(v.jsx)(f.a,{sx:{px:3},colSpan:4,children:"Name"}),Object(v.jsx)(f.a,{sx:{px:0},colSpan:2,children:"Revenue"}),Object(v.jsx)(f.a,{sx:{px:0},colSpan:2,children:"Stock Status"}),Object(v.jsx)(f.a,{sx:{px:0},colSpan:1,children:"Action"})]})}),Object(v.jsx)(h.a,{children:M.map((function(e,n){return Object(v.jsxs)(m.a,{hover:!0,children:[Object(v.jsx)(f.a,{colSpan:4,align:"left",sx:{px:0,textTransform:"capitalize"},children:Object(v.jsxs)(l.a,{display:"flex",alignItems:"center",children:[Object(v.jsx)(g.a,{src:e.imgUrl}),Object(v.jsx)(o.d,{sx:{m:0,ml:4},children:e.name})]})}),Object(v.jsxs)(f.a,{align:"left",colSpan:2,sx:{px:0,textTransform:"capitalize"},children:["$",e.price>999?(e.price/1e3).toFixed(1)+"k":e.price]}),Object(v.jsx)(f.a,{sx:{px:0},align:"left",colSpan:2,children:e.available?e.available<20?Object(v.jsxs)(k,{bgcolor:r,children:[e.available," available"]}):Object(v.jsx)(k,{bgcolor:a,children:"in stock"}):Object(v.jsx)(k,{bgcolor:t,children:"out of stock"})}),Object(v.jsx)(f.a,{sx:{px:0},colSpan:1,children:Object(v.jsx)(x.a,{children:Object(v.jsx)(O.a,{color:"primary",children:"edit"})})})]},n)}))})]})})]})},R=Object(c.a)("div")((function(e){var t=e.theme;return Object(r.a)({margin:"30px",marginTop:"-72px"},t.breakpoints.down("sm"),{margin:"16px"})}));t.default=function(){return Object(v.jsx)(n.Fragment,{children:Object(v.jsx)(R,{className:"analytics",children:Object(v.jsx)(i.a,{container:!0,spacing:3,children:Object(v.jsx)(i.a,{item:!0,lg:8,md:8,sm:12,xs:12,children:Object(v.jsx)(I,{})})})})})}},722:function(e,t,a){"use strict";a.d(t,"b",(function(){return i}));var r=a(28),n=a(32);function i(e){return Object(r.a)("MuiMenuItem",e)}var o=Object(n.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.a=o},730:function(e,t,a){"use strict";a.d(t,"b",(function(){return i}));var r=a(28),n=a(32);function i(e){return Object(r.a)("MuiListItemText",e)}var o=Object(n.a)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.a=o},755:function(e,t,a){"use strict";var r=a(6),n=a(5),i=a(2),o=a(0),c=a(8),s=a(51),l=a(65),d=a(7),b=a(12),u=a(251),p=a(636),j=a(66),m=a(24),f=a(354),h=(a(28),a(32));var g=Object(h.a)("MuiListItemIcon",["root","alignItemsFlexStart"]),x=a(730),O=a(722),v=a(1),y=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],S=Object(d.a)(p.a,{shouldForwardProp:function(e){return Object(d.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,n=e.ownerState;return Object(i.a)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!n.disableGutters&&{paddingLeft:16,paddingRight:16},n.divider&&{borderBottom:"1px solid ".concat(a.palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:a.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(r.a)(t,"&.".concat(O.a.selected),Object(r.a)({backgroundColor:Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(O.a.focusVisible),{backgroundColor:Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),Object(r.a)(t,"&.".concat(O.a.selected,":hover"),{backgroundColor:Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),Object(r.a)(t,"&.".concat(O.a.focusVisible),{backgroundColor:a.palette.action.focus}),Object(r.a)(t,"&.".concat(O.a.disabled),{opacity:a.palette.action.disabledOpacity}),Object(r.a)(t,"& + .".concat(f.a.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),Object(r.a)(t,"& + .".concat(f.a.inset),{marginLeft:52}),Object(r.a)(t,"& .".concat(x.a.root),{marginTop:0,marginBottom:0}),Object(r.a)(t,"& .".concat(x.a.inset),{paddingLeft:36}),Object(r.a)(t,"& .".concat(g.root),{minWidth:36}),t),!n.dense&&Object(r.a)({},a.breakpoints.up("sm"),{minHeight:"auto"}),n.dense&&Object(i.a)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,Object(r.a)({},"& .".concat(g.root," svg"),{fontSize:"1.25rem"})))})),w=o.forwardRef((function(e,t){var a=Object(b.a)({props:e,name:"MuiMenuItem"}),r=a.autoFocus,l=void 0!==r&&r,d=a.component,p=void 0===d?"li":d,f=a.dense,h=void 0!==f&&f,g=a.divider,x=void 0!==g&&g,w=a.disableGutters,k=void 0!==w&&w,M=a.focusVisibleClassName,I=a.role,R=void 0===I?"menuitem":I,C=a.tabIndex,z=Object(n.a)(a,y),T=o.useContext(u.a),F={dense:h||T.dense||!1,disableGutters:k},N=o.useRef(null);Object(j.a)((function(){l&&N.current&&N.current.focus()}),[l]);var D,L=Object(i.a)({},a,{dense:F.dense,divider:x,disableGutters:k}),P=function(e){var t=e.disabled,a=e.dense,r=e.divider,n=e.disableGutters,o=e.selected,c=e.classes,l={root:["root",a&&"dense",t&&"disabled",!n&&"gutters",r&&"divider",o&&"selected"]},d=Object(s.a)(l,O.b,c);return Object(i.a)({},c,d)}(a),A=Object(m.a)(N,t);return a.disabled||(D=void 0!==C?C:-1),Object(v.jsx)(u.a.Provider,{value:F,children:Object(v.jsx)(S,Object(i.a)({ref:A,role:R,tabIndex:D,component:p,focusVisibleClassName:Object(c.default)(P.focusVisible,M)},z,{ownerState:L,classes:P}))})}));t.a=w}}]);
//# sourceMappingURL=11.130475de.chunk.js.map
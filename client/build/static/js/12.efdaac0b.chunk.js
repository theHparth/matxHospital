(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[12],{1274:function(e,t,a){"use strict";a.r(t);var n=a(16),i=a(17),o=a(704),c=a(349),r=a(156),s=a(0),d=a.n(s),l=a(125),u=a(6),b=a(4),j=a(702),m=a(654),O=a(755),p=a(653),x=a(661),f=a(249),h=a(346),v=a(1),g=function(e){var t=e.stockOut,a=e.stockOutData,i=e.setStockOutData,r=e.index,d=e.stockData,l=(e.updateStockInDetail,function(e){var t=e.target,o=t.name,c=t.value;i([].concat(Object(n.a)(a.slice(0,r)),[Object(b.a)(Object(b.a)({},a[r]),{},Object(u.a)({},o,c))],Object(n.a)(a.slice(r+1,a.length)))),console.log(a)});Object(s.useEffect)((function(){}),[]);return Object(v.jsx)(f.ValidatorForm,{onError:function(){return null},onSubmit:function(){},children:Object(v.jsx)(o.a,{sx:{minWidth:275,display:"flex",flexDirection:"column",padding:"0px 30px 30px 30px"},children:Object(v.jsxs)("div",{style:{display:"flex"},children:[Object(v.jsxs)(p.a,{variant:"standard",sx:{m:1,minWidth:120,width:200},children:[Object(v.jsx)(m.a,{id:"demo-simple-select-standard-label",children:"Stock Name"}),Object(v.jsxs)(x.a,{labelId:"demo-simple-select-standard-label",id:"demo-simple-select-standard",onChange:function(e){l(e)},label:"Stock Name",name:"stock_name",value:t.stock_name,children:[Object(v.jsx)(O.a,{value:"",children:Object(v.jsx)("em",{children:"None"})}),d.map((function(e,t){return Object(v.jsx)(O.a,{value:e.stock_name,children:e.stock_name},t)}))]})]}),Object(v.jsx)(f.TextValidator,{type:"number",id:"standard-basic",label:"Box",variant:"standard",sx:{m:1,minWidth:120,width:200},name:"totalBox",value:t.totalBox,onChange:l,validators:["required","minNumber:1"],errormessages:["this field is required"]}),Object(v.jsx)(h.a,{type:"number",id:"standard-basic",label:"Quantity Per Box",variant:"standard",sx:{m:1,minWidth:120,width:200},name:"totalQtyInOneBox",value:t.totalQtyInOneBox,onChange:l,validators:["required","minNumber:1"],errormessages:["this field is required"]}),Object(v.jsx)(c.a,{variant:"outlined",sx:{width:"50px",height:"40px",margin:"1px 20px 0px 480px"},onClick:function(){i([].concat(Object(n.a)(a.slice(0,r)),[{stock_name:"",totalBox:"",totalQtyInOneBox:""}],Object(n.a)(a.slice(r+1,a.length))))},children:Object(v.jsx)(j.a,{children:"clear"})}),Object(v.jsx)(c.a,{variant:"outlined",color:"error",sx:{width:"50px",height:"40px",marginLeft:"auto"},onClick:function(){i([].concat(Object(n.a)(a.slice(0,r)),Object(n.a)(a.slice(r+1,a.length))))},children:Object(v.jsx)(j.a,{children:"delete"})})]})})})},y=a(70),k=a(63);t.default=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.stockInUserList})).presentStockUserData,a=void 0===t?[]:t,u=Object(l.c)((function(e){return e.todaySellingUserList})),b=u.isLoading,j=u.showAlert,m=u.clearValues,O=u.alertType,p=u.alertText,x=u.isEditing,f=u._id,h=u.todaySellingDataArr,S=u.stockInDetail;Object(s.useEffect)((function(){h&&h.length&&B(h)}),[]),Object(s.useEffect)((function(){e(Object(y.m)({}))}),[e]);var I=d.a.useState([{stock_name:"",totalQtyInOneBox:"",totalBox:""}]),C=Object(i.a)(I,2),w=C[0],B=C[1],D={stock_name:"",totalQtyInOneBox:"",totalBox:""};return Object(s.useEffect)((function(){m&&(e(Object(k.l)()),B([D]))}),[m]),console.log("alertType alertText",O,p),Object(v.jsxs)(r.c,{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)(r.a,{routeSegments:[{name:"Werehouse Stock Details",path:"/wereHouseStock"},{name:"Table"}]}),b&&Object(v.jsx)(r.k,{})]}),Object(v.jsxs)(o.a,{sx:{minWidth:275,display:"flex",flexDirection:"column",padding:"30px"},children:[w.map((function(e,t){return Object(v.jsx)(g,{stockOut:e,stockOutData:w,setStockOutData:B,index:t,stockData:a,updateStockInDetail:S},t)})),Object(v.jsxs)("div",{style:{display:"flex",marginLeft:"auto"},children:[Object(v.jsx)(c.a,{variant:"outlined",color:"success",sx:{m:1,minWidth:120,width:120,marginLeft:"auto"},onClick:function(){return B([].concat(Object(n.a)(w),[D]))},children:"Add More"}),Object(v.jsx)(c.a,{variant:"contained",color:"success",sx:{m:1,minWidth:120,width:120,marginLeft:"auto"},onClick:function(){return function(){var t={id:f,todaySellingData:w};console.log("stock out data",t),e(x?Object(k.n)(t):Object(k.k)(t))}()},children:"Submit"})]})]}),j?Object(v.jsx)(r.o,{isOpen:j,typeSeverity:O,alrtTextToShow:p}):null]})}},722:function(e,t,a){"use strict";a.d(t,"b",(function(){return o}));var n=a(28),i=a(32);function o(e){return Object(n.a)("MuiMenuItem",e)}var c=Object(i.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.a=c},730:function(e,t,a){"use strict";a.d(t,"b",(function(){return o}));var n=a(28),i=a(32);function o(e){return Object(n.a)("MuiListItemText",e)}var c=Object(i.a)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.a=c},755:function(e,t,a){"use strict";var n=a(6),i=a(5),o=a(2),c=a(0),r=a(8),s=a(51),d=a(65),l=a(7),u=a(12),b=a(251),j=a(636),m=a(66),O=a(24),p=a(354),x=(a(28),a(32));var f=Object(x.a)("MuiListItemIcon",["root","alignItemsFlexStart"]),h=a(730),v=a(722),g=a(1),y=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],k=Object(l.a)(j.a,{shouldForwardProp:function(e){return Object(l.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,i=e.ownerState;return Object(o.a)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!i.disableGutters&&{paddingLeft:16,paddingRight:16},i.divider&&{borderBottom:"1px solid ".concat(a.palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:a.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(n.a)(t,"&.".concat(v.a.selected),Object(n.a)({backgroundColor:Object(d.a)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(v.a.focusVisible),{backgroundColor:Object(d.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),Object(n.a)(t,"&.".concat(v.a.selected,":hover"),{backgroundColor:Object(d.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Object(d.a)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),Object(n.a)(t,"&.".concat(v.a.focusVisible),{backgroundColor:a.palette.action.focus}),Object(n.a)(t,"&.".concat(v.a.disabled),{opacity:a.palette.action.disabledOpacity}),Object(n.a)(t,"& + .".concat(p.a.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),Object(n.a)(t,"& + .".concat(p.a.inset),{marginLeft:52}),Object(n.a)(t,"& .".concat(h.a.root),{marginTop:0,marginBottom:0}),Object(n.a)(t,"& .".concat(h.a.inset),{paddingLeft:36}),Object(n.a)(t,"& .".concat(f.root),{minWidth:36}),t),!i.dense&&Object(n.a)({},a.breakpoints.up("sm"),{minHeight:"auto"}),i.dense&&Object(o.a)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,Object(n.a)({},"& .".concat(f.root," svg"),{fontSize:"1.25rem"})))})),S=c.forwardRef((function(e,t){var a=Object(u.a)({props:e,name:"MuiMenuItem"}),n=a.autoFocus,d=void 0!==n&&n,l=a.component,j=void 0===l?"li":l,p=a.dense,x=void 0!==p&&p,f=a.divider,h=void 0!==f&&f,S=a.disableGutters,I=void 0!==S&&S,C=a.focusVisibleClassName,w=a.role,B=void 0===w?"menuitem":w,D=a.tabIndex,T=Object(i.a)(a,y),L=c.useContext(b.a),M={dense:x||L.dense||!1,disableGutters:I},V=c.useRef(null);Object(m.a)((function(){d&&V.current&&V.current.focus()}),[d]);var W,N=Object(o.a)({},a,{dense:M.dense,divider:h,disableGutters:I}),_=function(e){var t=e.disabled,a=e.dense,n=e.divider,i=e.disableGutters,c=e.selected,r=e.classes,d={root:["root",a&&"dense",t&&"disabled",!i&&"gutters",n&&"divider",c&&"selected"]},l=Object(s.a)(d,v.b,r);return Object(o.a)({},r,l)}(a),G=Object(O.a)(V,t);return a.disabled||(W=void 0!==D?D:-1),Object(g.jsx)(b.a.Provider,{value:M,children:Object(g.jsx)(k,Object(o.a)({ref:G,role:B,tabIndex:W,component:j,focusVisibleClassName:Object(r.default)(_.focusVisible,C)},T,{ownerState:N,classes:_}))})}));t.a=S}}]);
//# sourceMappingURL=12.efdaac0b.chunk.js.map
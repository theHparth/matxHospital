(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{1252:function(e,t,a){"use strict";a.r(t);var n=a(19),r=a(4),c=a(17),o=a(14),i=a.n(o),l=a(641),s=a(704),d=a(662),b=a(775),u=a(794),m=a(349),p=a(0),j=a(252),f=a(21),h=a(72),O=a(248),v=a(93),x=a(249),g=a(30),k=a(1),y=Object(h.a)(O.a)((function(){return{display:"flex",alignItems:"center"}})),w=Object(h.a)(y)((function(){return{justifyContent:"center"}})),C=Object(h.a)(O.a)((function(){return{height:"100%",padding:"32px",position:"relative",background:"rgba(0, 0, 0, 0.01)"}})),P=Object(h.a)("img")((function(){return{width:"100%"}})),z=Object(h.a)(w)((function(){return{background:"#1A2038",minHeight:"100% !important","& .card":{maxWidth:800,borderRadius:12,margin:"1rem"}}})),S=Object(h.a)(l.a)((function(){return{position:"absolute",top:"6px",left:"25px"}}));t.default=function(){var e=Object(f.f)(),t=Object(p.useState)(!1),a=Object(c.a)(t,2),o=a[0],l=a[1],h=Object(p.useState)({email:"user@gmail.com",password:"zzzzzz"}),R=Object(c.a)(h,2),F=R[0],I=R[1],B=Object(p.useState)(""),M=Object(c.a)(B,2),L=M[0],N=M[1],E=Object(j.a)().loginUser,q=function(e){var t=e.target,a=t.name,n=t.value,c=Object(r.a)({},F);c[a]=n,I(c)},H=Object(v.a)().palette,T=H.error.main,V=H.primary.main,W=function(){var t=Object(n.a)(i.a.mark((function t(a){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),t.prev=1,t.next=4,E(F.email,F.password);case 4:e("/"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),N(t.t0.message,"aaaa"),l(!1);case 11:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}();return Object(k.jsx)(z,{children:Object(k.jsx)(s.a,{className:"card",children:Object(k.jsxs)(d.a,{container:!0,children:[Object(k.jsx)(d.a,{item:!0,lg:5,md:5,sm:5,xs:12,children:Object(k.jsx)(w,{p:4,height:"100%",children:Object(k.jsx)(P,{src:"/assets/images/illustrations/dreamer.svg",alt:""})})}),Object(k.jsx)(d.a,{item:!0,lg:7,md:7,sm:7,xs:12,children:Object(k.jsx)(C,{children:Object(k.jsxs)(x.ValidatorForm,{onSubmit:W,children:[Object(k.jsx)(x.TextValidator,{sx:{mb:3,width:"100%"},variant:"outlined",size:"small",label:"Email",onChange:q,type:"email",name:"email",value:F.email,validators:["required","isEmail"],errorMessages:["this field is required","email is not valid"]}),Object(k.jsx)(x.TextValidator,{sx:{mb:"12px",width:"100%"},label:"Password",variant:"outlined",size:"small",onChange:q,name:"password",type:"password",value:F.password,validators:["required"],errorMessages:["this field is required"]}),Object(k.jsx)(b.a,{sx:{mb:"12px",maxWidth:288},name:"agreement",onChange:q,control:Object(k.jsx)(u.a,{size:"small",onChange:function(e){var t=e.target.checked;return q({target:{name:"agreement",value:t}})},checked:F.agreement||!0}),label:"Remeber me"}),L&&Object(k.jsx)(g.d,{sx:{color:T},children:L}),Object(k.jsxs)(y,{mb:2,flexWrap:"wrap",children:[Object(k.jsxs)(O.a,{position:"relative",children:[Object(k.jsx)(m.a,{variant:"contained",color:"primary",disabled:o,type:"submit",children:"Sign in"}),o&&Object(k.jsx)(S,{size:24,className:"buttonProgress"})]}),Object(k.jsx)(g.f,{sx:{mr:1,ml:"20px"},children:"or"}),Object(k.jsx)(m.a,{sx:{textTransform:"capitalize"},onClick:function(){return e("/session/signup")},children:"Sign up"})]}),Object(k.jsx)(m.a,{sx:{color:V},onClick:function(){return e("/session/forgot-password")},children:"Forgot password?"})]})})})]})})})}},731:function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));var n=a(28),r=a(32);function c(e){return Object(n.a)("MuiFormControlLabel",e)}var o=Object(r.a)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]);t.a=o},732:function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));var n=a(28),r=a(32);function c(e){return Object(n.a)("MuiCheckbox",e)}var o=Object(r.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]);t.a=o},756:function(e,t,a){"use strict";var n=a(17),r=a(5),c=a(2),o=a(0),i=a(8),l=a(51),s=a(11),d=a(7),b=a(89),u=a(54),m=a(636),p=a(28),j=a(32);function f(e){return Object(p.a)("PrivateSwitchBase",e)}Object(j.a)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var h=a(1),O=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],v=Object(d.a)(m.a)((function(e){var t=e.ownerState;return Object(c.a)({padding:9,borderRadius:"50%"},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})})),x=Object(d.a)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),g=o.forwardRef((function(e,t){var a=e.autoFocus,o=e.checked,d=e.checkedIcon,m=e.className,p=e.defaultChecked,j=e.disabled,g=e.disableFocusRipple,k=void 0!==g&&g,y=e.edge,w=void 0!==y&&y,C=e.icon,P=e.id,z=e.inputProps,S=e.inputRef,R=e.name,F=e.onBlur,I=e.onChange,B=e.onFocus,M=e.readOnly,L=e.required,N=e.tabIndex,E=e.type,q=e.value,H=Object(r.a)(e,O),T=Object(b.a)({controlled:o,default:Boolean(p),name:"SwitchBase",state:"checked"}),V=Object(n.a)(T,2),W=V[0],D=V[1],A=Object(u.a)(),J=j;A&&"undefined"===typeof J&&(J=A.disabled);var U="checkbox"===E||"radio"===E,G=Object(c.a)({},e,{checked:W,disabled:J,disableFocusRipple:k,edge:w}),K=function(e){var t=e.classes,a=e.checked,n=e.disabled,r=e.edge,c={root:["root",a&&"checked",n&&"disabled",r&&"edge".concat(Object(s.a)(r))],input:["input"]};return Object(l.a)(c,f,t)}(G);return Object(h.jsxs)(v,Object(c.a)({component:"span",className:Object(i.default)(K.root,m),centerRipple:!0,focusRipple:!k,disabled:J,tabIndex:null,role:void 0,onFocus:function(e){B&&B(e),A&&A.onFocus&&A.onFocus(e)},onBlur:function(e){F&&F(e),A&&A.onBlur&&A.onBlur(e)},ownerState:G,ref:t},H,{children:[Object(h.jsx)(x,Object(c.a)({autoFocus:a,checked:o,defaultChecked:p,className:K.input,disabled:J,id:U&&P,name:R,onChange:function(e){if(!e.nativeEvent.defaultPrevented){var t=e.target.checked;D(t),I&&I(e,t)}},readOnly:M,ref:S,required:L,ownerState:G,tabIndex:N,type:E},"checkbox"===E&&void 0===q?{}:{value:q},z)),W?d:C]}))}));t.a=g},775:function(e,t,a){"use strict";var n=a(6),r=a(5),c=a(2),o=a(0),i=a(8),l=a(51),s=a(54),d=a(649),b=a(11),u=a(7),m=a(12),p=a(731),j=a(56),f=a(1),h=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],O=Object(u.a)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[Object(n.a)({},"& .".concat(p.a.label),t.label),t.root,t["labelPlacement".concat(Object(b.a)(a.labelPlacement))]]}})((function(e){var t=e.theme,a=e.ownerState;return Object(c.a)(Object(n.a)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16},"&.".concat(p.a.disabled),{cursor:"default"}),"start"===a.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===a.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===a.labelPlacement&&{flexDirection:"column",marginLeft:16},Object(n.a)({},"& .".concat(p.a.label),Object(n.a)({},"&.".concat(p.a.disabled),{color:t.palette.text.disabled})))})),v=o.forwardRef((function(e,t){var a=Object(m.a)({props:e,name:"MuiFormControlLabel"}),n=a.className,u=a.componentsProps,v=void 0===u?{}:u,x=a.control,g=a.disabled,k=a.disableTypography,y=a.label,w=a.labelPlacement,C=void 0===w?"end":w,P=Object(r.a)(a,h),z=Object(s.a)(),S=g;"undefined"===typeof S&&"undefined"!==typeof x.props.disabled&&(S=x.props.disabled),"undefined"===typeof S&&z&&(S=z.disabled);var R={disabled:S};["checked","name","onChange","value","inputRef"].forEach((function(e){"undefined"===typeof x.props[e]&&"undefined"!==typeof a[e]&&(R[e]=a[e])}));var F=Object(j.a)({props:a,muiFormControl:z,states:["error"]}),I=Object(c.a)({},a,{disabled:S,labelPlacement:C,error:F.error}),B=function(e){var t=e.classes,a=e.disabled,n=e.labelPlacement,r=e.error,c={root:["root",a&&"disabled","labelPlacement".concat(Object(b.a)(n)),r&&"error"],label:["label",a&&"disabled"]};return Object(l.a)(c,p.b,t)}(I),M=y;return null==M||M.type===d.a||k||(M=Object(f.jsx)(d.a,Object(c.a)({component:"span",className:B.label},v.typography,{children:M}))),Object(f.jsxs)(O,Object(c.a)({className:Object(i.default)(B.root,n),ownerState:I,ref:t},P,{children:[o.cloneElement(x,R),M]}))}));t.a=v},794:function(e,t,a){"use strict";var n=a(6),r=a(5),c=a(2),o=a(0),i=a(51),l=a(65),s=a(756),d=a(40),b=a(1),u=Object(d.a)(Object(b.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=Object(d.a)(Object(b.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),p=Object(d.a)(Object(b.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),j=a(11),f=a(12),h=a(7),O=a(732),v=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],x=Object(h.a)(s.a,{shouldForwardProp:function(e){return Object(h.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.indeterminate&&t.indeterminate,"default"!==a.color&&t["color".concat(Object(j.a)(a.color))]]}})((function(e){var t,a=e.theme,r=e.ownerState;return Object(c.a)({color:a.palette.text.secondary},!r.disableRipple&&{"&:hover":{backgroundColor:Object(l.a)("default"===r.color?a.palette.action.active:a.palette[r.color].main,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(t={},Object(n.a)(t,"&.".concat(O.a.checked,", &.").concat(O.a.indeterminate),{color:a.palette[r.color].main}),Object(n.a)(t,"&.".concat(O.a.disabled),{color:a.palette.action.disabled}),t))})),g=Object(b.jsx)(m,{}),k=Object(b.jsx)(u,{}),y=Object(b.jsx)(p,{}),w=o.forwardRef((function(e,t){var a,n,l=Object(f.a)({props:e,name:"MuiCheckbox"}),s=l.checkedIcon,d=void 0===s?g:s,u=l.color,m=void 0===u?"primary":u,p=l.icon,h=void 0===p?k:p,w=l.indeterminate,C=void 0!==w&&w,P=l.indeterminateIcon,z=void 0===P?y:P,S=l.inputProps,R=l.size,F=void 0===R?"medium":R,I=Object(r.a)(l,v),B=C?z:h,M=C?z:d,L=Object(c.a)({},l,{color:m,indeterminate:C,size:F}),N=function(e){var t=e.classes,a=e.indeterminate,n=e.color,r={root:["root",a&&"indeterminate","color".concat(Object(j.a)(n))]},o=Object(i.a)(r,O.b,t);return Object(c.a)({},t,o)}(L);return Object(b.jsx)(x,Object(c.a)({type:"checkbox",inputProps:Object(c.a)({"data-indeterminate":C},S),icon:o.cloneElement(B,{fontSize:null!=(a=B.props.fontSize)?a:F}),checkedIcon:o.cloneElement(M,{fontSize:null!=(n=M.props.fontSize)?n:F}),ownerState:L,ref:t},I,{classes:N}))}));t.a=w}}]);
//# sourceMappingURL=9.bb567416.chunk.js.map
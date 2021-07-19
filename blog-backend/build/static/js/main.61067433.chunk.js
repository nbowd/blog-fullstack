(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{51:function(e,t,n){"use strict";n.r(t);var r,a,c,o,s,i=n(1),u=n(23),l=n.n(u),d=n(2),b=n.n(d),j=n(5),p=n(7),f=n(4),h=n(13),x=n(8),g=n.n(x),O="/api/blogs",m=null,y={setToken:function(e){m="bearer ".concat(e)},getAll:function(){var e=Object(j.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get(O);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:m}},e.next=3,g.a.post(O,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updateBlog:function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.put("".concat(O,"/").concat(t.id),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(j.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:m}},e.next=3,g.a.delete("".concat(O,"/").concat(t),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},v=n(3),w=n(0),k=v.d.button(r||(r=Object(f.a)(["\n  cursor: pointer;\n  border-radius: 12px;\n  margin: 5px 0;\n  padding: 5px;\n  background: ",";\n  font-size: 20px;\n  color: white;\n  transition: all 0.2s ease 0s;\n  &:hover{\n    background: white;\n    color: ",";\n  } \n  ","\n\n \n"])),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.colors.primary}),(function(e){var t=e.secondary,n=e.danger,r=e.details,i=e.deleteBtn;return t?Object(v.c)(a||(a=Object(f.a)(["\n        background: ",";\n        font-size: 13px;\n      "])),(function(e){return e.theme.colors.secondary})):n?Object(v.c)(c||(c=Object(f.a)(["\n          background: ",";\n        "])),(function(e){return e.theme.colors.blog})):r?Object(v.c)(o||(o=Object(f.a)(["\n          background: ",";\n          font-size: 13px;\n        "])),(function(e){return e.theme.colors.primary})):i?Object(v.c)(s||(s=Object(f.a)(["\n          background: white;\n          color: ",";\n          border-color: ",";\n          font-size: 10px;\n          font-weight:bold;\n          &:hover {\n            background: ",";\n            color:white;\n          }\n        "])),(function(e){return e.theme.colors.delete}),(function(e){return e.theme.colors.delete}),(function(e){return e.theme.colors.delete})):void 0}));var C,B,S=function(e){var t=e.onClick,n=e.dataCy,r=e.text,a=e.type,c=e.secondary,o=e.danger,s=e.details,i=e.deleteBtn;return Object(w.jsx)(k,{onClick:t,"data-cy":n,type:a,secondary:c,danger:o,details:s,deleteBtn:i,children:r})},A=v.d.div(C||(C=Object(f.a)(["\n  padding: 20px;\n  border: solid 1px ",";\n  border-radius: 6px;\n  margin-bottom: 5px;\n  background-color: ",";\n  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n  font-size:18px;\n"])),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.colors.blog})),z=function(e){var t=e.blog,n=e.user,r=e.blogs,a=e.setBlogs,c=Object(i.useState)(!1),o=Object(p.a)(c,2),s=o[0],u=o[1],l=s?{display:"none",width:"50%"}:{display:"",width:"100%"},d=s?{display:"",width:"100%"}:{display:"none",width:"50%"},f=function(){var e=Object(j.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(h.a)(Object(h.a)({},t),{},{likes:t.likes+1}),e.next=3,y.updateBlog(n);case 3:return e.next=5,y.getAll();case 5:r=e.sent,a(r.sort((function(e,t){return t.likes-e.likes})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(j.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Remove ".concat(t.title," by ").concat(t.author,"?"))){e.next=5;break}return e.next=3,y.deleteBlog(t.id);case 3:n=r.filter((function(e){return e.id!==t.id})),a(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)(A,{"data-cy":"blog-body",children:[Object(w.jsxs)("div",{style:l,children:[t.title," ",t.author," ",Object(w.jsx)(S,{onClick:function(){return u(!0)},dataCy:"details-button",type:"button",text:"Details",details:!0})]}),Object(w.jsxs)("div",{style:d,children:[Object(w.jsxs)("div",{children:[t.title," ",Object(w.jsx)(S,{onClick:function(){return u(!1)},dataCy:"hide-button",type:"button",text:"Hide",secondary:!0})]}),Object(w.jsx)("div",{children:t.url}),Object(w.jsxs)("div",{"data-cy":"like-div",children:[t.likes," ",Object(w.jsx)(S,{onClick:function(){return f(t)},dataCy:"like-button",type:"button",text:"Like",secondary:!0})]}),Object(w.jsx)("div",{children:t.author}),Object(w.jsx)("div",{children:n.username===t.user[0].username?Object(w.jsx)(S,{onClick:x,dataCy:"delete-button",type:"button",text:"Delete",deleteBtn:!0}):null})]})]})},E=v.d.div(B||(B=Object(f.a)(["\n  display:flex;\n  flex-direction:column;\n  width: 12rem;\n  font-size:18px;\n  & input {\n    background-color: ",";\n    border-radius: 6px;\n    padding: 3px;\n  }\n"])),(function(e){return e.theme.colors.blog})),T=function(e){var t=e.setBlogs,n=e.setCreateVisible,r=e.setErrorMessage,a=Object(i.useState)(""),c=Object(p.a)(a,2),o=c[0],s=c[1],u=Object(i.useState)(""),l=Object(p.a)(u,2),d=l[0],f=l[1],h=Object(i.useState)(""),x=Object(p.a)(h,2),g=x[0],O=x[1],m=function(){var e=Object(j.a)(b.a.mark((function e(a){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.prev=1,e.next=4,y.create({title:o,author:d,url:g});case 4:return e.next=6,y.getAll();case 6:c=e.sent,t(c),s(""),f(""),O(""),n(!1),r("A new blog: ".concat(o," by ").concat(d," added")),setTimeout((function(){r(null)}),5e3),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),r("Invalid blog data"),setTimeout((function(){r(null)}),5e3);case 20:console.log(o,d,g);case 21:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)(E,{children:Object(w.jsxs)("form",{onSubmit:m,children:[Object(w.jsxs)(E,{children:["Title:",Object(w.jsx)("input",{type:"text",value:o,name:"title",onChange:function(e){var t=e.target;return s(t.value)},"data-cy":"title-input"})]}),Object(w.jsxs)(E,{children:["Author:",Object(w.jsx)("input",{type:"text",value:d,name:"author",onChange:function(e){var t=e.target;return f(t.value)},"data-cy":"author-input"})]}),Object(w.jsxs)(E,{children:["URL:",Object(w.jsx)("input",{type:"text",value:g,name:"url",onChange:function(e){var t=e.target;return O(t.value)},"data-cy":"url-input"})]}),Object(w.jsx)(S,{dataCy:"create-button",type:"submit",text:"Create",primary:!0})]})})};var U,L,D,F,I,M=function(e){var t=e.username,n=e.password,r=e.handleLogin,a=e.handleUsernameChange,c=e.handlePasswordChange;return Object(w.jsxs)("form",{onSubmit:r,children:[Object(w.jsxs)(E,{children:["Username:",Object(w.jsx)("input",{"data-cy":"username",type:"text",value:t,name:"Username",onChange:a})]}),Object(w.jsxs)(E,{children:["Password:",Object(w.jsx)("input",{"data-cy":"password",type:"password",value:n,name:"Password",onChange:c})]}),Object(w.jsx)(S,{dataCy:"login-button",type:"submit",text:"Login",primary:!0})]})},J=v.d.p(U||(U=Object(f.a)(["\n  width:50%;\n  font-size:1.2rem;\n  font-weight:bold;\n  color: ",";\n"])),(function(e){return e.theme.colors.primary})),P=function(e){var t=e.message;return null===t?null:Object(w.jsx)(J,{children:t})},N={login:function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},R=v.d.div(L||(L=Object(f.a)(["\n  color: ",";\n  align-items:center;\n  justify-content: center;\n"])),(function(e){return e.theme.colors.primary})),V=v.d.div(D||(D=Object(f.a)(["\n  display:flex;\n  justify-content:space-between;\n  margin: 0 auto;\n  align-items: center;\n"]))),W=v.d.div(F||(F=Object(f.a)(["\n  justify-content:center;\n  font-size:22px;\n  font-weight: bold;\n  text-align:center;\n  align-items:center;\n"]))),H=function(){var e=Object(i.useState)([]),t=Object(p.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)(null),c=Object(p.a)(a,2),o=c[0],s=c[1],u=Object(i.useState)(""),l=Object(p.a)(u,2),d=l[0],f=l[1],h=Object(i.useState)(""),x=Object(p.a)(h,2),g=x[0],O=x[1],m=Object(i.useState)(null),v=Object(p.a)(m,2),k=v[0],C=v[1],B=Object(i.useState)(!1),A=Object(p.a)(B,2),E=A[0],U=A[1];Object(i.useEffect)((function(){y.getAll().then((function(e){return r(e)}))}),[]),Object(i.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogappUser");if(e){var t=JSON.parse(e);C(t),y.setToken(t.token)}}),[]);var L=function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,N.login({username:d,password:g});case 4:n=e.sent,window.localStorage.setItem("loggedBlogappUser",JSON.stringify(n)),C(n),y.setToken(n.token),f(""),O(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),s("Wrong credentials"),setTimeout((function(){s(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),D={display:E?"none":""},F={display:E?"":"none"};return Object(w.jsx)("div",{children:k?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)(V,{children:[Object(w.jsx)(R,{children:Object(w.jsx)("h1",{children:"Blogs"})}),Object(w.jsxs)(W,{children:["Welcome, ",k.name," ",Object(w.jsx)(S,{onClick:function(){return window.localStorage.removeItem("loggedBlogappUser"),C(null),void y.setToken(null)},dataCy:"logout-button",text:"Logout",type:"button",secondary:!0})]})]}),Object(w.jsx)("br",{}),Object(w.jsx)(P,{message:o}),Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{style:D,children:Object(w.jsx)(S,{onClick:function(){return U(!0)},dataCy:"new-button",text:"New Blog",type:"button",primary:!0})}),Object(w.jsxs)("div",{style:F,children:[Object(w.jsx)(R,{children:Object(w.jsx)("h2",{children:"Create new:"})}),Object(w.jsx)(T,{setBlogs:r,setCreateVisible:U,setErrorMessage:s}),Object(w.jsx)(S,{onClick:function(){return U(!1)},dataCy:"cancel-button",text:"Cancel",type:"button",secondary:!0})]})]}),n.map((function(e){return Object(w.jsx)(z,{blog:e,user:k,blogs:n,setBlogs:r},e.id)}))]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(R,{children:Object(w.jsx)("h1",{children:"Log in to the application"})}),Object(w.jsx)("br",{}),Object(w.jsx)(P,{message:o}),Object(w.jsx)("br",{}),Object(w.jsx)(M,{handleLogin:L,username:d,password:g,handleUsernameChange:function(e){var t=e.target;return f(t.value)},handlePasswordChange:function(e){var t=e.target;return O(t.value)}})]})})},q=n.p+"static/media/Montserrat-Regular.3cd78665.ttf",G=Object(v.b)(I||(I=Object(f.a)(["\n\n  @font-face {\n    font-family: Montserrat;\n    src: url(",") format('truetype');\n    font-weight: normal;\n    font-style: normal;\n  }\n\n  html {\n    height:100%;\n  }\n\n  * {\n    padding: 0;\n    margin: 0;\n    font-family: Montserrat;\n  }\n"])),q);document.body.style="background-color: #F7F5E6; margin:1rem 25%; color: ".concat((function(e){return e.theme.colors.primary}),";"),l.a.render(Object(w.jsxs)(v.a,{theme:{colors:{primary:"#333A56",secondary:"#52658F",blog:"#E8E8E8",delete:"#D11A2A"}},children:[Object(w.jsx)(G,{}),Object(w.jsx)(H,{})]}),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.61067433.chunk.js.map
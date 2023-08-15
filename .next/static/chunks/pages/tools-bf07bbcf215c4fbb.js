(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[289],{8642:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tools",function(){return a(1069)}])},5819:function(e,t,a){"use strict";a.d(t,{LB:function(){return r}});let r="http://127.0.0.1:8000"},1069:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var r=a(5893),c=a(7294),l=a(1524),s=a(4529),n=a(5819);let o=(0,s.Ue)(e=>({cartData:null,fetchCart:async()=>{try{let t=await fetch("".concat(n.LB,"/api/sessions/cart/"),{credentials:"include"}),a=await t.json();e({cartData:a})}catch(e){console.error("Error fetching cart data:",e)}}}));var i=a(5675),d=a.n(i),h=e=>{let{item:t}=e;return(0,r.jsxs)("div",{className:"flex flex-col p-4 border border-gray-300 shadow-md rounded-md",children:[(0,r.jsx)(d(),{src:"".concat(n.LB,"/static").concat(t.image),alt:t.title,className:"mb-4 w-full h-auto"}),(0,r.jsx)("p",{className:"text-lg font-semibold mb-2",children:t.title}),(0,r.jsxs)("p",{children:["Size: ",t.size]}),(0,r.jsxs)("p",{children:["Name: ",t.name]}),(0,r.jsxs)("p",{children:["Color: ",t.color]}),(0,r.jsxs)("p",{children:["Quantity: ",t.quantity]})]})};async function x(e,t){try{let a=await fetch("".concat(n.LB,"/api/sessions/cart/create-cart/"),{method:"POST",credentials:"include",headers:{"Content-Type":"application/json",Authorization:"Token ".concat(t)},body:JSON.stringify(e)});if(!a.ok)throw Error("Failed to post cart data");return a}catch(e){throw console.error("Error posting cart data:",e),e}}var u=e=>{let{children:t}=e;return(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,r.jsx)("div",{className:"flex flex-col gap-4 bg-white p-16 rounded-lg shadow-lg",children:t})})},p=()=>{let{userSession:e}=(0,l.t)(),{cartData:t,fetchCart:a}=o(),[s,i]=(0,c.useState)(!1),[d,p]=(0,c.useState)(!1),[m,b]=(0,c.useState)(""),[f,j]=(0,c.useState)(!1),[g,y]=(0,c.useState)(!1),[N,v]=(0,c.useState)(!1),[w,k]=(0,c.useState)([]),[C,E]=(0,c.useState)(null);(0,c.useEffect)(()=>{a()},[]);let S=async e=>{try{let t=encodeURIComponent(e),a=await fetch("".concat(n.LB,"/api/sessions/cart/cart-name-available/").concat(t,"/"),{method:"GET",headers:{"Content-Type":"application/json"}});a.ok?(await a.json(),v(!1)):v(!0)}catch(e){v(!1),console.error("Error checking cart name availability:",e)}},T=async()=>{try{let e=await fetch("".concat(n.LB,"/api/sessions/cart/all-carts/"),{method:"GET",headers:{"Content-Type":"application/json"}});if(e.ok){let t=await e.json();k(t)}}catch(e){v(!1),console.error("Error checking carts:",e)}},_=async t=>{try{let a=await fetch("".concat(n.LB,"/api/sessions/cart/delete-cart/").concat(t,"/"),{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Token ".concat(e.token)}});a.ok&&z()}catch(e){v(!1),console.error("Error checking carts:",e)}},B=e=>{b(e),S(e)},L=e=>{"create"===e?(S(e),i(!0)):"delete"===e&&(p(!0),T())},z=()=>{i(!1),p(!1)},O=async()=>{try{let t=await x({name:m,public:f,clear:g},e.token);t.ok&&window.location.reload()}catch(e){}z()};return(0,r.jsxs)("div",{className:"min-h-screen flex flex-col justify-center",children:[(s||d)&&(0,r.jsx)("div",{className:"fixed inset-0 bg-gray-600 opacity-50 z-10"}),e.admin?(0,r.jsxs)("div",{className:"container mx-auto px-4 flex flex-col items-center gap-4",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,r.jsx)("div",{children:(0,r.jsx)("h1",{className:"text-5xl font-bold",children:"Crear o modificar carritos publicos"})}),(0,r.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,r.jsx)("button",{onClick:()=>L("create"),className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4",children:"Crear carrito"}),s&&(0,r.jsxs)(u,{closeModal:z,children:[(0,r.jsx)("h1",{className:"text-2xl font-bold",children:"Elija nombre y visibilidad del carrito"}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)("label",{htmlFor:"name",children:"Nombre:"}),(0,r.jsx)("input",{type:"text",id:"name",value:m,onChange:e=>B(e.target.value),onBlur:()=>S(m),className:"border ".concat(N?"border-red-500":"border-gray-800"," w-60")})]}),N?(0,r.jsx)("p",{className:"text-red-500",children:"El carrito ya existe"}):(0,r.jsx)("p",{className:"text-green-700",children:"El carrito est\xe1 disponible"}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)("label",{htmlFor:"public",children:"Public:"}),(0,r.jsx)("input",{type:"checkbox",id:"public",checked:f,onChange:e=>j(e.target.checked)})]}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)("label",{htmlFor:"clear",children:"Limpiar carrito al terminar:"}),(0,r.jsx)("input",{type:"checkbox",id:"clear",checked:g,onChange:e=>y(e.target.checked)})]}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)("button",{onClick:O,disabled:N,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ".concat(N?"opacity-50 cursor-not-allowed":""),children:"Crear carrito"}),(0,r.jsx)("button",{className:"mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",onClick:z,children:"Cerrar"})]})]}),(0,r.jsx)("button",{onClick:()=>L("delete"),className:"bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4",children:"Borrar carrito"}),d&&(0,r.jsxs)(u,{closeModal:z,children:[(0,r.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold",children:"Selecciona el carrito para borrar"}),(0,r.jsxs)("select",{value:C||"",onChange:e=>E(Number(e.target.value)||null),children:[(0,r.jsx)("option",{value:"",children:"Elegir"}),w.map(e=>(0,r.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)("button",{className:"mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",onClick:()=>_(C),children:"Borrar carrito seleccionado"}),(0,r.jsx)("button",{className:"mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",onClick:z,children:"Cerrar"})]})]})]})]}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-6 gap-4",children:t?Object.keys(t).map(e=>{let a=t[e];return(0,r.jsx)(h,{item:a},e)}):(0,r.jsx)("p",{children:"Cargado..."})})]}):(0,r.jsx)("div",{children:(0,r.jsx)("h1",{children:"Usuario no autorizado"})})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8642)}),_N_E=e.O()}]);
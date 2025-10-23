import{a as x,r as t,j as e}from"./app-BKRFhvxP.js";import{u,N as w,M as y,C as v,F as b}from"./message-circle-CaLY-1MG.js";function M({header:j,children:d}){console.log("✅ AuthenticatedLayout rendered");const a=x().props;a.auth.user;const n=u(200),r=u(0),m=()=>{window.scrollTo({top:0,behavior:"smooth"})},[N,p]=t.useState(!1);t.useEffect(()=>{const s=setTimeout(()=>p(!0),1e3);return()=>clearTimeout(s)},[]);const[i,l]=t.useState([]),c=t.useRef({}),[S,T]=t.useState(!1);t.useEffect(()=>{if(a.success&&a.success.message){const s={...a.success,id:a.success.time??Date.now()};l(o=>[s,...o]);const f=setTimeout(()=>{l(o=>o.filter(g=>g.id!==s.id)),delete c.current[s.id]},5e3);c.current[s.id]=f}},[a.success]);const[z,h]=t.useState(!1);return t.useEffect(()=>{const s=setTimeout(()=>h(!0),300);return()=>clearTimeout(s)},[]),e.jsxs("div",{className:"relative min-h-screen bg-gray-100 isolate mt-16",children:[e.jsx(w,{}),e.jsx("div",{className:` md:hidden
          fixed bottom-0 left-0 w-full z-[10] transition-all duration-500 ease-in
          transform bg-white shadow-md
          ${r?"opacity-100 translate-y-0":"opacity-0 translate-y-5 pointer-events-none"}
        `}),i.length>0&&e.jsx("div",{className:"toast toast-top toast-end z-[1000] mt-16",children:i.map(s=>e.jsx("div",{className:"alert laert-success",children:e.jsx("span",{children:s.message})},s.id))}),e.jsx("div",{className:`
          fixed top-0 left-0 w-full z-[40] transition-all duration-500 ease-in
          transform bg-white shadow-md
          ${r?"opacity-100 -translate-y-0":"opacity-0 -translate-y-5 pointer-events-none"}
        `}),e.jsx("main",{children:d}),e.jsxs("a",{href:"https://www.messenger.com/e2ee/t/9170076859759048/S",target:"_blank",rel:"noopener noreferrer",className:` xs:mb-7 lg:right
        fixed bottom-16  md:translate-y-12  xs:left-6 z-[9999] flex items-center gap-2
         bg-yellow-400 text-green-950 px-4 py-2 rounded-full shadow-lg
       hover:bg-yellow-700 transition-all
          transform duration-500 ease-in-out
          ${n?"opacity-100 scale-100":"opacity-0 scale-0 pointer-events-none"}
      `,children:[e.jsx(y,{className:"w-5 h-5"}),e.jsx("span",{className:"font-medium text-sm",children:"Let’s Chat"})]}),e.jsx("button",{onClick:m,"aria-label":"Go to top",className:` xs:mb-16
          fixed bottom-8 right-6 z-[9999]
          bg-yellow-400 text-green-950 p-3 rounded-full shadow-lg
          hover:bg-yellow-400 transition
          transform duration-500 ease-in-out
          ${n?"opacity-100 scale-100":"opacity-0 scale-0 pointer-events-none"}
        `,children:e.jsx(v,{className:"w-5 h-5"})}),e.jsx(b,{})]})}export{M as A};

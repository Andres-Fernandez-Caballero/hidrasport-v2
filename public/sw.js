if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>a(e,n),o={module:{uri:n},exports:c,require:r};s[n]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/static/Pu2Bxs_ieGev5dDM7dV6a/_buildManifest.js",revision:"343b0726772a3b77b19d7cb70f267f3e"},{url:"/_next/static/Pu2Bxs_ieGev5dDM7dV6a/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/113-1a4be156cd966600.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/132-6d9bc54742bf7dc2.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/315-a7133cc5bc8655fd.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/332-18b34bbb89a3a42a.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/529-cbadaad495a9b5ab.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/582-aaba1aa6257470fe.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/652-b82573a62b890634.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/758-97ddb2f4b3dda5a6.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/fd9d1056-cc48c28d170fddc2.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/framework-765825bc171511d3.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/main-app-60d4180cd4ba8218.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/main-df0c5c0bca618607.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/_app-8e49aeea9bb01cf4.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/carrito-ca60162b635444c2.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout-329cf227e46177c0.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/contracts-341f6f53026c3ce7.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/PaymentFormDataStepComponent-ad19c77d8e11a3ca.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/PaymentFormDataStepComponent/Forms/CreditCardForm-daea19ce8a11ae53.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/PaymentFormDataStepComponent/MpFormDataStepComponentt-639615bb14283585.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/ShimpentFormDataStepComponent-c98b977303f43b1a.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/ShimpentFormDataStepComponent/forms/BranchDeliveryForm-c98cc876e7732aa5.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/ShimpentFormDataStepComponent/forms/HomeDeliveryForm-5577858f3112a85c.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/ShimpentFormDataStepComponent/forms/PickupPointForm-eab5abd023f49a97.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/components/formSteps/UserFormDataStepComponent-92e518daf9ce458e.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/checkout/resumen-64779bdb98da8fd7.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/index-95499cfe112ba35b.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos-655b8884edfe52a2.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/categoria/%5Bcategoria%5D-ecd247614a1df81e.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/detalle/%5Bid%5D-7f5fccc00936670d.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/detalle/%5Bid%5D/imageContainer/ImageContainer-f4e2f5f71b2c9240.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/detalle/%5Bid%5D/imageContainer/carousseImage-c8f91f263170071d.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/detalle/%5Bid%5D/selectorVariante/SelectorVariante-e5cd39527aabe15c.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/productos/hidralife-e74aab3ca5779f18.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/profile-fd04f18ad9fba908.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/public-carts-51eb4c789fe5cb3c.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/tools-019107623dd41f40.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/pages/tools/orders-bf41080d1de6137b.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f64bfed0362d7147.js",revision:"Pu2Bxs_ieGev5dDM7dV6a"},{url:"/_next/static/css/1f7025885a442757.css",revision:"1f7025885a442757"},{url:"/_next/static/css/5d95994938bd25e4.css",revision:"5d95994938bd25e4"},{url:"/_next/static/css/aeca3708f4a3aa49.css",revision:"aeca3708f4a3aa49"},{url:"/_next/static/css/b0e6696797e9cb56.css",revision:"b0e6696797e9cb56"},{url:"/_next/static/css/bda3e5cc12b27972.css",revision:"bda3e5cc12b27972"},{url:"/_next/static/css/c639c85f39ac8767.css",revision:"c639c85f39ac8767"},{url:"/_next/static/css/cbff116a97bd2d4b.css",revision:"cbff116a97bd2d4b"},{url:"/_next/static/media/InterVariable-Italic.ef0ecaff.woff2",revision:"ef0ecaff"},{url:"/_next/static/media/InterVariable.ff710c09.woff2",revision:"ff710c09"},{url:"/_next/static/media/primeicons.19e14e48.svg",revision:"19e14e48"},{url:"/_next/static/media/primeicons.310a7310.ttf",revision:"310a7310"},{url:"/_next/static/media/primeicons.7f772274.woff",revision:"7f772274"},{url:"/_next/static/media/primeicons.8ca441e1.eot",revision:"8ca441e1"},{url:"/_next/static/media/primeicons.e1a53edb.woff2",revision:"e1a53edb"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/favicon.png",revision:"d8e7038333460a22b1568fb9c59022b1"},{url:"/icon512_maskable.png",revision:"c937cbcb6b70012238d449fcf50dbe7c"},{url:"/icon512_rounded.png",revision:"1d4bbbacd4a8ce469df8fbafe104e62c"},{url:"/images/6075889.png",revision:"02cf4dfa2c1a1a7804c19545d04dc43f"},{url:"/images/TORTUGATRAZONEGRO.png",revision:"d8e7038333460a22b1568fb9c59022b1"},{url:"/images/avatar.jpg",revision:"cdb9c2eff23213f2a288145fe3c13f6b"},{url:"/images/hidraLogo.png",revision:"c9fd3521ca0e0aaed76ebcebcf1d1c40"},{url:"/images/hidraLogo.svg",revision:"bdf0837daf1526431aa181f0e91b5c9b"},{url:"/images/hidralife.png",revision:"8c0291b0c755b596042d30080922b14b"},{url:"/images/remera_frente.png",revision:"53444a73f1c3e9761f6778e91a0fa2c4"},{url:"/images/tortuga_logo.png",revision:"943e2750879a3c589a449d0d7f9430ef"},{url:"/images/whatsapp.svg",revision:"a688deedd0dc5c64d396b16be65d0f78"},{url:"/landing.json",revision:"a97e3d84dcc86338cdb7ca36b150febf"},{url:"/manifest.webmanifest",revision:"0c5ad288703239ec82ec8af8834b069b"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

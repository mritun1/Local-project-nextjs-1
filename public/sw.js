if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let u={};const c=e=>a(e,i),o={module:{uri:i},exports:u,require:c};s[i]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(n(...e),u)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e53062cbc7b5a6d39455a849da424aec"},{url:"/_next/static/0ud9619N8FuUGZWotD4G8/_buildManifest.js",revision:"7b36459b5abfc254317e0aeebfd2317a"},{url:"/_next/static/0ud9619N8FuUGZWotD4G8/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2472-b6121e4a0bed77bb.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/4569-d597a757c11b9066.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/6544-708326136461a4c0.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/6557-cdd95179b23decd9.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/7174-492b0af2b1fae981.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/8717-6b53d98e4023197d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/9785-161dc507038f7400.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/9924-ae30614df0fa91c4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/_not-found-553b27c2c14f183a.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/delivery-boy/loading-95da5c4f7ee2124b.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/delivery-boy/page-b2fb7164ea630f74.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/layout-1453e89330a72559.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-business-cat/loading-f6ac372faf1d4e5f.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-business-cat/page-6176dbe0ddd7819a.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-business/loading-ddff8387213198e2.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-business/page-d2bef96f72cba931.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-events/loading-f24952aae35cb676.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-events/page-d97f2eec5f78b024.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-groups/%5Bslug%5D/loading-ce62235375c29802.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-groups/%5Bslug%5D/page-b44fd8d0dc69ef99.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-groups/loading-1fa0dd8a66a0cfb8.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-groups/page-d18131225145ae05.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-market/loading-4d4c1a0733b319c4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-market/page-e7393da2e533a4b6.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-news/loading-23e19f6919b5a7e2.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-news/page-697049e7f2247c48.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-offers/loading-886a3b13e896a687.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-offers/page-8c7c0f8d5e83b482.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-people-cat/%5Bslug%5D/loading-2aa18fbc6ebac7b4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-people-cat/%5Bslug%5D/page-7f18b964cc1d84ea.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-people/loading-2afa74a16c304e84.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-people/page-ecde07d848aa39c4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-secondhand-cat/%5Bslug%5D/loading-4c9c1835b3ad74dd.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-secondhand-cat/%5Bslug%5D/page-2b41d5890b4da54c.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-secondhand/loading-f5620f855b651150.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/local-secondhand/page-82991d1c9f2d2961.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/message/%5Bslug%5D/loading-9cc3032a76f9e4c4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/message/%5Bslug%5D/page-203808ce4d85d024.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/message/loading-22fe26a36ff2eab7.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/message/page-bfa8bcdc9eea1947.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-advertisement/loading-36535cfaac94554d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-advertisement/page-c0ea49d0f9a8fd30.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-contacts/loading-1d00bceb8ae90d8f.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-contacts/page-fa04fb27bbb223d0.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-market/loading-266530a1f43fc3b4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-market/page-85ad55a6d1845a36.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-posts/loading-dfc0a6a7e26f5fe4.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-posts/page-710bc86a8c79a8dc.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-referral/loading-f93eb7db0688593d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-referral/page-2e915d9437311a0d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-saved/loading-b56911a4065ea70a.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-saved/page-879896fcace7c9b7.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-secondhand/loading-496257cc6534aafb.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-secondhand/page-cda8dfdc497ba5b3.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-stores/loading-e08b54593794df42.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-stores/page-647c7e7f4e79bbb3.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-wallet/loading-60f7eb5d7bb56b4b.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/my-wallet/page-c052b8fded8bab94.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/notification/loading-8682df8930da344d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/notification/page-a9e9fbc50fade145.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/pin-code-map/loading-900400580523fa13.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/pin-code-map/page-873197776d6018b9.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/profile/loading-fa08e4e69c76de87.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/profile/page-a3cd34b1913c08ac.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/settings/loading-b6b3454e6b1dff20.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/app/settings/page-8aee226111ae2f19.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/guides/layout-a8b4668ba371c998.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/guides/loading-83e03c25c829e353.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/guides/page-e574c75711da79f3.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/about-us/layout-a298547d3cf80615.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/about-us/loading-aa859aeee54c2d64.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/about-us/page-376a5b727298191b.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/return-policy/layout-20ec817ec2e14300.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/return-policy/loading-c02ead4d6f5682ce.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/return-policy/page-5d753d022b26e05f.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/terms-condition/layout-a6a5a98d9fe62a57.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/terms-condition/loading-5cfd78943b79bb78.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/blogs/others/terms-condition/page-21ad84533d62bb7e.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/layout-77c8a106e82a0b80.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/loading-26f8456cb0210eb7.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page-972d0b92b5cefd60.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/Events/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/layout-6ac55883cc3b02d9.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/Events/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/loading-598c957663bc2977.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/Events/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/page-741a498ae25c7779.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/News/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/layout-c348e5f5e540cca7.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/News/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/loading-ee0d230b8f8b44fa.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/News/%5Bid%5D/%5Btitle%5D/%5Bdes%5D/%5Bimg%5D/page-38e0c709801253f6.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/register/%5BrefID%5D/layout-de89add28980ec86.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/register/%5BrefID%5D/loading-8766a12a360d578d.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/app/page/register/%5BrefID%5D/page-ab1db5db82e9eb58.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/fd9d1056-bf3b5b010fbe2694.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/framework-964c2d6016b0d731.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/main-3617a3406d951b90.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/main-app-a3d1a6b0994040bd.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/pages/_app-c5876d3c9d2aa56e.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/pages/_error-54652fda7e85f1f9.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b09433b44bf5f602.js",revision:"0ud9619N8FuUGZWotD4G8"},{url:"/_next/static/css/2b89bb52d34daa9a.css",revision:"2b89bb52d34daa9a"},{url:"/_next/static/css/603e987f1c934066.css",revision:"603e987f1c934066"},{url:"/icon-192x192.png",revision:"ea7896c2bc10060aa5a06a377bdb6e18"},{url:"/icon-256x256.png",revision:"ef20b0bc77a9d7f8a160cff32dd93546"},{url:"/icon-384x384.png",revision:"1464ab6be95dbcca101c7a729f30e1ba"},{url:"/icon-512x512.png",revision:"37603f6b139e85987b363dabebed0282"},{url:"/icons/logo/logo1.png",revision:"5bb4ba0ae73c63191b8db160a1d2b11a"},{url:"/icons/others/home.webp",revision:"1ea7e2aa130e49c0f5217b55bd0b8ae0"},{url:"/icons/others/loading.webp",revision:"a17571b4ea94bd151cba29a3d93a9f70"},{url:"/icons/others/profile.webp",revision:"a5369809569edc4e18ad64c495326f6e"},{url:"/icons/others/success.png",revision:"bc0ccae8e6858aea654b3935f483968e"},{url:"/manifest.webmanifest",revision:"4a3a1f9c74eb93cfb32ac2733b47364e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

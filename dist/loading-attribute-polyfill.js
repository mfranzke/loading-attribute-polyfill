var e,t,r={rootMargin:"0px 0px 256px 0px",threshold:.01,lazyImage:'img[loading="lazy"]',lazyIframe:'iframe[loading="lazy"]'},a="loading"in HTMLImageElement.prototype&&"loading"in HTMLIFrameElement.prototype,o="onscroll"in window;function n(e){var t,r,a=[];"picture"===e.parentNode.tagName.toLowerCase()&&((r=(t=e.parentNode).querySelector("source[data-lazy-remove]"))&&t.removeChild(r),a=Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))),a.push(e),a.forEach(function(e){e.hasAttribute("data-lazy-srcset")&&(e.setAttribute("srcset",e.getAttribute("data-lazy-srcset")),e.removeAttribute("data-lazy-srcset"))}),e.setAttribute("src",e.getAttribute("data-lazy-src")),e.removeAttribute("data-lazy-src")}function i(t){var r=document.createElement("div");for(r.innerHTML=function(t){var r=t.textContent||t.innerHTML,n="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 "+((r.match(/width=['"](\d+)['"]/)||!1)[1]||1)+" "+((r.match(/height=['"](\d+)['"]/)||!1)[1]||1)+"%27%3E%3C/svg%3E";return!a&&o&&(void 0===e?r=r.replace(/(?:\r\n|\r|\n|\t| )src=/g,' lazyload="1" src='):("picture"===t.parentNode.tagName.toLowerCase()&&(r='<source srcset="'+n+'" data-lazy-remove="true"></source>'+r),r=r.replace(/(?:\r\n|\r|\n|\t| )srcset=/g," data-lazy-srcset=").replace(/(?:\r\n|\r|\n|\t| )src=/g,' src="'+n+'" data-lazy-src='))),r}(t);r.firstChild;)a||!o||void 0===e||!r.firstChild.tagName||"img"!==r.firstChild.tagName.toLowerCase()&&"iframe"!==r.firstChild.tagName.toLowerCase()||e.observe(r.firstChild),t.parentNode.insertBefore(r.firstChild,t);t.parentNode.removeChild(t)}"undefined"!=typeof NodeList&&NodeList.prototype&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"IntersectionObserver"in window&&(e=new IntersectionObserver(function(e,t){e.forEach(function(e){if(0!==e.intersectionRatio){var r=e.target;t.unobserve(r),n(r)}})},r)),t="requestAnimationFrame"in window?window.requestAnimationFrame:function(e){e()};var c=function(){document.querySelectorAll("noscript.loading-lazy").forEach(i),void 0!==window.matchMedia&&window.matchMedia("print").addListener(function(e){e.matches&&document.querySelectorAll(r.lazyImage+"[data-lazy-src],"+r.lazyIframe+"[data-lazy-src]").forEach(function(e){n(e)})})};/comp|inter/.test(document.readyState)?t(c):"addEventListener"in document?document.addEventListener("DOMContentLoaded",function(){t(c)}):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),module.exports=i;
//# sourceMappingURL=loading-attribute-polyfill.js.map

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).loadingAttributePolyfill=t()}(this,function(){var e,t={rootMargin:"0px 0px 256px 0px",threshold:.01,lazyImage:'img[loading="lazy"]',lazyIframe:'iframe[loading="lazy"]'},r="loading"in HTMLImageElement.prototype,a="loading"in HTMLIFrameElement.prototype,o="onscroll"in window;window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"IntersectionObserver"in window&&(e=new IntersectionObserver(function(e,t){e.forEach(function(e){if(0!==e.intersectionRatio){var r=e.target;t.unobserve(r),i(r)}})},t));var n="requestAnimationFrame"in window?window.requestAnimationFrame:function(e){e()};function i(e){var t,r,a=[];"picture"===e.parentNode.tagName.toLowerCase()&&((r=(t=e.parentNode).querySelector("source[data-lazy-remove]"))&&t.removeChild(r),a=Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))),a.push(e),a.forEach(function(e){e.hasAttribute("data-lazy-srcset")&&(e.setAttribute("srcset",e.getAttribute("data-lazy-srcset")),e.removeAttribute("data-lazy-srcset"))}),e.setAttribute("src",e.getAttribute("data-lazy-src")),e.removeAttribute("data-lazy-src")}function c(t){var n=document.createElement("div");for(n.innerHTML=function(t){var n=t.textContent||t.innerHTML,i="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 "+((n.match(/width=['"](\d+)['"]/)||!1)[1]||1)+" "+((n.match(/height=['"](\d+)['"]/)||!1)[1]||1)+"%27%3E%3C/svg%3E";return(/<img/gim.test(n)&&!r||/<iframe/gim.test(n)&&!a)&&o&&(n=void 0===e?n.replace(/(?:\r\n|\r|\n|\t| )src=/g,' lazyload="1" src='):(n=n.replace("<source",'<source srcset="'+i+'" data-lazy-remove="true"></source>\n<source')).replace(/(?:\r\n|\r|\n|\t| )srcset=/g," data-lazy-srcset=").replace(/(?:\r\n|\r|\n|\t| )src=/g,' src="'+i+'" data-lazy-src=')),n}(t);n.firstChild;){var i=n.firstChild;if(o&&void 0!==e&&i.tagName&&(("img"===i.tagName.toLowerCase()||"picture"===i.tagName.toLowerCase())&&!r||"iframe"===i.tagName.toLowerCase()&&!a)){var c="picture"===i.tagName.toLowerCase()?n.querySelector("img"):i;e.observe(c)}t.parentNode.insertBefore(i,t)}t.parentNode.removeChild(t)}var d=function(){document.querySelectorAll("noscript.loading-lazy").forEach(function(e){return c(e)}),void 0!==window.matchMedia&&window.matchMedia("print").addListener(function(e){e.matches&&document.querySelectorAll(t.lazyImage+"[data-lazy-src],"+t.lazyIframe+"[data-lazy-src]").forEach(function(e){i(e)})})};return/comp|inter/.test(document.readyState)?n(d):"addEventListener"in document?document.addEventListener("DOMContentLoaded",function(){n(d)}):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&d()}),{prepareElement:c}});
//# sourceMappingURL=loading-attribute-polyfill.umd.js.map

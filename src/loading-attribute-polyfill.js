/*
 * Loading attribute polyfill - https://github.com/mfranzke/loading-attribute-polyfill
 * @license Copyright(c) 2019 by Maximilian Franzke
 * Credits for the initial kickstarter / script to @Sora2455, and supported by @cbirdsong, @eklingen, @DaPo, @nextgenthemes, @diogoterremoto, @dracos, @Flimm, @TomS-, @vinyfc93, @JordanDysart and @denyshutsal - many thanks for that !
 */
/*
 * A minimal and dependency-free vanilla JavaScript loading attribute polyfill.
 * Supports standard's functionality and tests for native support upfront.
 * Elsewhere the functionality gets emulated with the support of noscript wrapper tags.
 * Use an IntersectionObserver polyfill in case of IE11 support necessary.
 */

import './loading-attribute-polyfill.css';

const config = {
	intersectionObserver: {
		// Start download if the item gets within 256px in the Y axis
		rootMargin: '0px 0px 256px 0px',
		threshold: 0.01,
	},
	lazyImage: 'img[loading="lazy"]',
	lazyIframe: 'iframe[loading="lazy"]',
};

// Device/browser capabilities object
const capabilities = {
	loading: {
		image: 'loading' in HTMLImageElement.prototype,
		iframe: 'loading' in HTMLIFrameElement.prototype,
	},
	scrolling: 'onscroll' in window,
};

// Nodelist foreach polyfill / source: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Define according to browsers support of the IntersectionObserver feature (missing e.g. on IE11 or Safari 11)
let intersectionObserver;

if ('IntersectionObserver' in window) {
	intersectionObserver = new IntersectionObserver(
		onIntersection,
		config.intersectionObserver
	);
}

/**
 * Put the source and srcset back where it belongs - now that the elements content is attached to the document, it will load now
 * @param {Object} lazyItem Current item to be restored after lazy loading.
 */
function restoreSource(lazyItem) {
	let srcsetItems = [];

	// Just in case the img is the decendent of a picture element, check for source tags
	if (lazyItem.parentNode.tagName.toLowerCase() === 'picture') {
		removePlaceholderSource(lazyItem.parentNode);

		srcsetItems = Array.prototype.slice.call(
			lazyItem.parentNode.querySelectorAll('source')
		);
	}

	srcsetItems.push(lazyItem);

	// Not using .dataset within those upfollowing lines of code for polyfill independent compatibility down to IE9
	srcsetItems.forEach((item) => {
		if (item.hasAttribute('data-lazy-srcset')) {
			item.setAttribute('srcset', item.getAttribute('data-lazy-srcset'));
			item.removeAttribute('data-lazy-srcset'); // Not using delete .dataset here for compatibility down to IE9
		}
	});

	lazyItem.setAttribute('src', lazyItem.getAttribute('data-lazy-src'));
	lazyItem.removeAttribute('data-lazy-src'); // Not using delete .dataset here for compatibility down to IE9
}

/**
 * Remove the source tag preventing the loading of picture assets
 * @param {Object} lazyItemPicture Current <picture> item to be restored after lazy loading.
 */
function removePlaceholderSource(lazyItemPicture) {
	const placeholderSource = lazyItemPicture.querySelector(
		'source[data-lazy-remove]'
	);

	if (placeholderSource) {
		// Preferred .removeChild over .remove here for IE
		lazyItemPicture.removeChild(placeholderSource);
	}
}

/**
 * Handle IntersectionObservers callback
 * @param {Object} entries Target elements Intersection observed changes
 * @param {Object} observer IntersectionObserver instance reference
 */
function onIntersection(entries, observer) {
	entries.forEach((entry) => {
		// Mitigation for EDGE lacking support of .isIntersecting until v15, compare to e.g. https://github.com/w3c/IntersectionObserver/issues/211#issuecomment-309144669
		if (entry.intersectionRatio === 0) {
			return;
		}

		// If the item is visible now, load it and stop watching it
		const lazyItem = entry.target;

		observer.unobserve(lazyItem);

		restoreSource(lazyItem);
	});
}

/**
 * Handle printing the page
 */
function onPrinting() {
	if (typeof window.matchMedia === 'undefined') {
		return;
	}

	const mediaQueryList = window.matchMedia('print');

	mediaQueryList.addListener((mql) => {
		if (mql.matches) {
			document
				.querySelectorAll(
					config.lazyImage +
						'[data-lazy-src],' +
						config.lazyIframe +
						'[data-lazy-src]'
				)
				.forEach((lazyItem) => {
					restoreSource(lazyItem);
				});
		}
	});
}

/**
 * Get and prepare the HTML code depending on feature detection for both image as well as iframe,
 * and if not scrolling supported, because it's a Google or Bing Bot
 * @param {String} lazyAreaHtml Noscript inner HTML code that src-urls need to get rewritten
 */
function getAndPrepareHTMLCode(noScriptTag) {
	// The contents of a <noscript> tag are treated as text to JavaScript
	let lazyAreaHtml = noScriptTag.textContent || noScriptTag.innerHTML;

	const getImageWidth = lazyAreaHtml.match(/width=['"](\d+)['"]/) || false;
	const temporaryImageWidth = getImageWidth[1] || 1;
	const getImageHeight = lazyAreaHtml.match(/height=['"](\d+)['"]/) || false;
	const temporaryImageHeight = getImageHeight[1] || 1;

	const temporaryImage =
		'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 ' +
		temporaryImageWidth +
		' ' +
		temporaryImageHeight +
		'%27%3E%3C/svg%3E';

	// Test for whether it's image or iframe content, their support by the browser and regarding the scrolling capability
	if (
		((/<img/gim.test(lazyAreaHtml) && !capabilities.loading.image) ||
			(/<iframe/gim.test(lazyAreaHtml) && !capabilities.loading.iframe)) &&
		capabilities.scrolling
	) {
		// Check for IntersectionObserver support
		if (typeof intersectionObserver === 'undefined') {
			// Attach abandonned attribute 'lazyload' to the HTML tags on browsers w/o IntersectionObserver being available
			lazyAreaHtml = lazyAreaHtml.replace(
				/(?:\r\n|\r|\n|\t| )src=/g,
				' lazyload="1" src='
			);
		} else {
			// Temporarily prevent expensive resource loading by inserting a <source> tag pointing to a simple one (data URI)
			lazyAreaHtml = lazyAreaHtml.replace(
				'<source',
				'<source srcset="' +
					temporaryImage +
					'" data-lazy-remove="true"></source>\n<source'
			);

			// Temporarily replace a expensive resource load with a simple one by storing the actual source and srcset for later and point src to a temporary replacement (data URI)
			lazyAreaHtml = lazyAreaHtml
				.replace(/(?:\r\n|\r|\n|\t| )srcset=/g, ' data-lazy-srcset=')
				.replace(
					/(?:\r\n|\r|\n|\t| )src=/g,
					' src="' + temporaryImage + '" data-lazy-src='
				);
		}
	}

	return lazyAreaHtml;
}

/**
 * Retrieve the elements from the 'lazy load' <noscript> tag and prepare them for display
 * @param {Object} noScriptTag noscript HTML tag that should get initially transformed
 */
function prepareElement(noScriptTag) {
	// Sticking the noscript HTML code in the innerHTML of a new <div> tag to 'load' it after creating that <div>
	const lazyArea = document.createElement('div');

	lazyArea.innerHTML = getAndPrepareHTMLCode(noScriptTag);

	// Move all children out of the element
	while (lazyArea.firstChild) {
		const actualChild = lazyArea.firstChild;

		if (
			capabilities.scrolling &&
			typeof intersectionObserver !== 'undefined' &&
			actualChild.tagName &&
			(((actualChild.tagName.toLowerCase() === 'img' ||
				actualChild.tagName.toLowerCase() === 'picture') &&
				!capabilities.loading.image) ||
				(actualChild.tagName.toLowerCase() === 'iframe' &&
					!capabilities.loading.iframe))
		) {
			const observedElement =
				actualChild.tagName.toLowerCase() === 'picture'
					? lazyArea.querySelector('img')
					: actualChild;
			// Observe the item so that loading could start when it gets close to the viewport
			intersectionObserver.observe(observedElement);
		}

		noScriptTag.parentNode.insertBefore(actualChild, noScriptTag);
	}

	// Remove the empty element - not using .remove() here for IE11 compatibility
	noScriptTag.parentNode.removeChild(noScriptTag);
}

/**
 * Get all the <noscript> tags on the page, prepare each and any one of them and setup the printing
 */
const prepareElements = () => {
	const lazyLoadAreas = document.querySelectorAll('noscript.loading-lazy');

	lazyLoadAreas.forEach((element) => prepareElement(element));

	// Bind for someone printing the page
	onPrinting();
};

// If the page has loaded already, run setup - if it hasn't, run as soon as it has.
// document.readyState values: https://www.w3schools.com/jsref/prop_doc_readystate.asp
if (/comp|inter/.test(document.readyState)) {
	prepareElements();
} else if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', () => {
		prepareElements();
	});
} else {
	document.attachEvent('onreadystatechange', () => {
		if (document.readyState === 'complete') {
			prepareElements();
		}
	});
}

const loadingAttributePolyfill = {
	prepareElement,
};

export default loadingAttributePolyfill;

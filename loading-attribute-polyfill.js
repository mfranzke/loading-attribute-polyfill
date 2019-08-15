/*
 * Loading attribute polyfill - https://github.com/mfranzke/loading-attribute-polyfill
 * @license Copyright(c) 2019 by Maximilian Franzke
 */
/*
 * A minimal and dependency-free vanilla JavaScript loading attribute polyfill.
 * Supports standard's functionality and tests for native support upfront.
 * Elsewhere the functionality gets emulated with the support of noscript wrapper tags.
 * Use an IntersectionObserver polyfill in case of IE11 support necessary.
 */

(function(noscriptClass, rootMargin) {
	'use strict';

	var config = {
		// Start download if the item gets within 256px in the Y axis
		rootMargin: rootMargin || '0px 0px 256px 0px',
		threshold: 0.01,
		lazyImage: 'img[loading="lazy"]',
		lazyIframe: 'iframe[loading="lazy"]',
		loadingSupported:
			'loading' in HTMLImageElement.prototype &&
			'loading' in HTMLIFrameElement.prototype
	};

	// Nodelist foreach polyfill / source: https://stackoverflow.com/a/46929259
	if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
		// Yes, there's really no need for `Object.defineProperty` here
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// Define according to browsers support of the IntersectionObserver feature (missing e.g. on IE11 or Safari 11)
	var intersectionObserver;

	if ('IntersectionObserver' in window) {
		intersectionObserver = new IntersectionObserver(onIntersection, config);
	}

	// On using a browser w/o requestAnimationFrame support (IE9, Opera Mini), just run the passed function
	var rAFWrapper;

	if ('requestAnimationFrame' in window) {
		rAFWrapper = window.requestAnimationFrame;
	} else {
		rAFWrapper = function(func) {
			func();
		};
	}

	var temporaryImage =
		'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

	/**
	 * Temporarily replace a expensive resource load with a simple one
	 * @param {String} lazyItem Current item to be transformed for lazy loading.
	 */
	function rewriteSourceForLater(lazyItem) {
		// Store the actual source and srcset for later and point src to a temporary replacement (data URI)
		return lazyItem
			.replace(/(?:\r\n|\r|\n|\t| )srcset=/g, ' data-lazy-srcset=')
			.replace(
				/(?:\r\n|\r|\n|\t| )src=/g,
				' src="' + temporaryImage + '" data-lazy-src='
			);
	}

	/**
	 * Temporarily prevent expensive resource loading by inserting a <source> tag pointing to a simple one (data URI)
	 * @param {String} lazyItem Current item to be transformed for lazy loading.
	 */
	function placeholderSourceLoading(lazyItem) {
		// Adding this <source> tag at the start of the picture tag means the browser will load it first
		return (
			'<source srcset="' +
			temporaryImage +
			'" data-lazy-remove="true"></source>' +
			lazyItem
		);
	}

	/**
	 * Attach abandonned attribute 'lazyload' to the HTML tags on browsers w/o IntersectionObserver being available
	 * @param {String} lazyItem Current item to be transformed for lazy loading.
	 */
	function addLazyloadAttribute(lazyItem) {
		return lazyItem.replace(/(?:\r\n|\r|\n|\t| )src=/g, ' lazyload="1" src=');
	}

	/**
	 * Put the source and srcset back where it belongs - now that the elements content is attached to the document, it will load now
	 * @param {Object} lazyItem Current item to be restored after lazy loading.
	 */
	function restoreSource(lazyItem) {
		var srcsetItems = [];

		// Just in case the img is the decendent of a picture element, check for source tags
		if (lazyItem.parentNode.tagName.toLowerCase() === 'picture') {
			removePlaceholderSource(lazyItem.parentNode);

			srcsetItems = Array.prototype.slice.call(lazyItem.parentNode.querySelectorAll('source'));
		}

		srcsetItems.push(lazyItem);

		srcsetItems.forEach(function(item) {
			if (item.dataset.lazySrcset) {
				item.setAttribute('srcset', item.dataset.lazySrcset);
				delete item.dataset.lazySrcset;
			}
		});

		lazyItem.setAttribute('src', lazyItem.dataset.lazySrc);
		delete lazyItem.dataset.lazySrc;
	}

	/**
	 * Remove the source tag preventing the loading of picture assets
	 * @param {Object} lazyItemPicture Current <picture> item to be restored after lazy loading.
	 */
	function removePlaceholderSource(lazyItemPicture) {
		var placeholderSource = lazyItemPicture.querySelector(
			'source[data-lazy-remove]'
		);

		if (placeholderSource) {
			lazyItemPicture.removeChild(placeholderSource);
		}
	}

	/**
	 * Handle IntersectionObservers callback
	 * @param {Object} entries Target elements Intersection observed changes
	 * @param {Object} observer IntersectionObserver instance reference
	 */
	function onIntersection(entries, observer) {
		entries.forEach(function(entry) {
			// Mitigation for EDGE lacking support of .isIntersecting until v15, compare to e.g. https://github.com/w3c/IntersectionObserver/issues/211#issuecomment-309144669
			if (entry.intersectionRatio === 0) {
				return;
			}

			// If the item is visible now, load it and stop watching it
			var lazyItem = entry.target;

			observer.unobserve(lazyItem);

			restoreSource(lazyItem);
		});
	}

	/**
	 * Handle printing the page
	 */
	function onPrinting() {
		var mediaQueryList = window.matchMedia('print');

		mediaQueryList.addListener(function(mql) {
			if (mql.matches) {
				document
					.querySelectorAll(
						config.lazyImage +
							'[data-lazy-src],' +
							config.lazyIframe +
							'[data-lazy-src]'
					)
					.forEach(function(lazyItem) {
						restoreSource(lazyItem);
					});
			}
		});
	}

	/**
	 * Retrieve the elements from the 'lazy load' <noscript> tags and prepare them for display
	 */
	function prepareElements() {
		// Get all the <noscript> tags on the page
		var lazyLoadAreas = document.querySelectorAll('noscript.' + noscriptClass);

		lazyLoadAreas.forEach(function(noScriptTag) {
			// The contents of a <noscript> tag are treated as text to JavaScript
			var lazyAreaHtml = noScriptTag.textContent || noScriptTag.innerHTML;

			// Feature detection for both image as well as iframe
			if (!config.loadingSupported) {
				// Check for IntersectionObserver support
				if (typeof intersectionObserver !== 'undefined') {
					if (noScriptTag.parentNode.tagName.toLowerCase() === 'picture') {
						lazyAreaHtml = placeholderSourceLoading(lazyAreaHtml);
					}

					lazyAreaHtml = rewriteSourceForLater(lazyAreaHtml);
				} else {
					lazyAreaHtml = addLazyloadAttribute(lazyAreaHtml);
				}
			}

			// Sticking them in the innerHTML of a new <div> tag to 'load' them
			var lazyArea = document.createElement('div');

			lazyArea.innerHTML = lazyAreaHtml;

			// move all children out of the element
			while (lazyArea.firstChild) {
				if (
					!config.loadingSupported &&
					typeof intersectionObserver !== 'undefined' &&
					lazyArea.firstChild.tagName &&
					(lazyArea.firstChild.tagName.toLowerCase() === 'img' ||
						lazyArea.firstChild.tagName.toLowerCase() === 'iframe')
				) {
					// Observe the item so that loading could start when it gets close to the viewport
					intersectionObserver.observe(lazyArea.firstChild);
				}

				noScriptTag.parentNode.insertBefore(lazyArea.firstChild, noScriptTag);
			}

			// remove the empty element
			noScriptTag.parentNode.removeChild(noScriptTag);
		});

		// Bind for someone priting the page
		onPrinting();
	}

	// If the page has loaded already, run setup - if it hasn't, run as soon as it has.
	// Use requestAnimationFrame as this will propably cause repaints
	if (/comp|inter/.test(document.readyState)) {
		rAFWrapper(prepareElements);
	} else if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			rAFWrapper(prepareElements);
		});
	} else {
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState === 'complete') {
				prepareElements();
			}
		});
	}
})('loading-lazy', '256px 0px');

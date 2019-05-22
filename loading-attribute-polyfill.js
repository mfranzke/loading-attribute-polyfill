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
		lazyIframe: 'iframe[loading="lazy"]'
	};

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
	 * @param {Object} lazyItem Current item to be transformed for lazy loading.
	 * @param {string} tempData Temporary data to be inserted as a 'placeholder'.
	 */
	function storeSourceForLater(lazyItem, tempData) {
		// Store the actual source and srcset for later
		lazyItem.dataset.lazySrc = lazyItem.getAttribute('src');
		if (lazyItem.getAttribute('srcset')) {
			lazyItem.dataset.lazySrcset = lazyItem.getAttribute('srcset');
		}

		// Set the item to point to a temporary replacement (data URI) and remove srcset
		lazyItem.setAttribute('src', tempData);
		lazyItem.removeAttribute('srcset');

		// Now observe the item so that loading could start when it gets close to the viewport
		intersectionObserver.observe(lazyItem);
	}

	/**
	 * Temporarily prevent expensive resource loading by inserting a <source> tag pointing to a simple one (data URI)
	 * @param {Object} lazyItem Current item to be transformed for lazy loading.
	 * @param {string} tempData Temporary data to be inserted as a 'placeholder'.
	 */
	function placeholderSourceLoading(lazyItem, tempData) {
		var placeholderSource = document.createElement('source');

		placeholderSource.setAttribute('srcset', tempData);
		placeholderSource.dataset.lazyRemove = true;

		// Adding this <source> tag at the start of the picture tag means the browser will load it first
		lazyItem.insertBefore(placeholderSource, lazyItem.firstChild);

		var baseImage = lazyItem.querySelector('img');

		if (baseImage) {
			// On <picture> tags image needs to get observed (as the picture tag is smaller than the image most likely)
			intersectionObserver.observe(baseImage);
		}
	}

	/**
	 * Set up the lazy items so that they won't try to load after adding them to the document
	 * @param {Object} lazyArea Temporary created element for handling the <noscript> content
	 * @param {Object} noScriptTagParentNode Parent node of <noscript> HTML tag
	 */
	function prepareLazyContents(lazyArea, noScriptTagParentNode) {
		var lazyItem = lazyArea.querySelector(
			config.lazyImage + ',' + config.lazyIframe
		);

		// Check for IntersectionObserver support to not delay loading of the items content
		if (typeof intersectionObserver === 'undefined') {
			// Attach abandonned attribute 'lazyload' to the HTML tags on browsers w/o IntersectionObserver being available
			lazyItem.setAttribute('lazyload', 1);

			return;
		}

		storeSourceForLater(lazyItem, temporaryImage);

		if (noScriptTagParentNode.tagName.toLowerCase() === 'picture') {
			placeholderSourceLoading(noScriptTagParentNode, temporaryImage);
		}
	}

	/**
	 * Put the source and srcset back where it belongs - now that the elements content is attached to the document, it will load now
	 * @param {Object} lazyItem Current item to be restored after lazy loading.
	 */
	function restoreSource(lazyItem) {
		// Just in case the img is the decendent of a picture element, check for source tags
		if (lazyItem.parentNode.tagName.toLowerCase() === 'picture') {
			removePlaceholderSource(lazyItem.parentNode);
		}

		if (lazyItem.dataset.lazySrcset) {
			lazyItem.setAttribute('srcset', lazyItem.dataset.lazySrcset);
			delete lazyItem.dataset.lazySrcset;
		}

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
				var lazyItems = document.querySelectorAll(
					config.lazyImage +
						'[data-lazy-src],' +
						config.lazyIframe +
						'[data-lazy-src]'
				);

				lazyItems.forEach(function(lazyItem) {
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

			// Sticking them in the innerHTML of a new <div> tag to 'load' them
			var lazyArea = document.createElement('div');

			lazyArea.innerHTML = lazyAreaHtml;

			var noScriptTagParentNode = noScriptTag.parentNode;

			// Feature detection for both image as well as iframe
			if (
				!(
					'loading' in HTMLImageElement.prototype &&
					'loading' in HTMLIFrameElement.prototype
				)
			) {
				prepareLazyContents(lazyArea, noScriptTagParentNode);
			}

			noScriptTagParentNode.replaceChild(
				lazyArea.firstElementChild,
				noScriptTag
			);
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

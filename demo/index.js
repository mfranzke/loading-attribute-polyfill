import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// Test for dynamically inserted images
window.setTimeout(() => {
	let child = document.createElement('div');
	child.innerHTML = '<noscript class="loading-lazy"></noscript>';
	child = child.firstChild;

	let imageElement = document.createElement('img');
	imageElement.setAttribute('src', 'https://via.placeholder.com/250x150');
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');
	child.appendChild(imageElement);
	document
		.getElementsByTagName('main')[0]
		.insertBefore(child, document.getElementsByTagName('main')[0].firstChild);

	loadingAttributePolyfill.prepareElement(
		document.querySelector('main noscript.loading-lazy')
	);
}, 5000);

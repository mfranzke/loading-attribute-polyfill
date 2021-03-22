import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// Test for dynamically inserted images
let addImage = (event) => {
	let noscriptElement = document.createElement('noscript'),
		imageElement = document.createElement('img');

	noscriptElement.classList.add('loading-lazy');

	imageElement.setAttribute('src', 'https://via.placeholder.com/250x150');
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');

	noscriptElement.appendChild(imageElement);

	document
		.querySelector('main')
		.insertAdjacentElement('beforeend', noscriptElement);

	loadingAttributePolyfill.prepareElement(
		document.querySelector('main noscript.loading-lazy')
	);

	event.preventDefault();
};

document.querySelector('button.add-image').addEventListener('click', addImage);

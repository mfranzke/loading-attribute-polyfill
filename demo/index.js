import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// Test for dynamically inserted images
const addImage = (event) => {
	const divElement = document.createElement('div');
	const noscriptElement = document.createElement('noscript');
	const imageElement = document.createElement('img');

	noscriptElement.classList.add('loading-lazy');

	imageElement.setAttribute('src', 'https://via.placeholder.com/250x150');
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');

	noscriptElement.append(imageElement);

	divElement.append(noscriptElement);

	document.querySelector('main').insertAdjacentElement('beforeend', divElement);

	// Call for preparing the sample image element included the latest
	loadingAttributePolyfill.prepareElement(
		document.querySelector('main noscript.loading-lazy')
	);

	event.preventDefault();
};

document.querySelector('button.add-image').addEventListener('click', addImage);

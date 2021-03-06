/* global browser $ $$ */
/* eslint-env mocha */

const assert = require('assert');

describe('demo page - img', () => {
	beforeEach(() => {
		browser.url('index.html');
	});
	it('should not get loaded if below the fold (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForExist();

		assert.strictEqual(
			element.getAttribute('src').substr(0, 8),
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
	it('should not get loaded if below the fold (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForExist();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.strictEqual(
			// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
			(element.getProperty('currentSrc') || element.getAttribute('src')).substr(
				0,
				8
			),
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
	it('should not get loaded if below the fold (with srcset attribute)', () => {
		const element = $('main img[sizes][loading="lazy"]');

		element.waitForExist();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.strictEqual(
			// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
			(element.getProperty('currentSrc') || element.getAttribute('src')).substr(
				0,
				8
			),
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
});
describe('demo page - iframe', () => {
	beforeEach(() => {
		browser.url('index.html');
	});
	it('should not get loaded if below the fold', () => {
		const element = $('main iframe[loading="lazy"]');

		element.waitForExist();

		assert.strictEqual(
			element.getAttribute('src').substr(0, 8),
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
});

describe('demo page - scrolled - img', () => {
	beforeEach(() => {
		browser.url('index.html');
	});

	it('should be loaded if scrolled below the fold (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForExist();

		element.scrollIntoView();

		assert.strictEqual(element.getAttribute('src').substr(0, 8), 'https://');
	});
	it('should be loaded if scrolled below the fold (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForExist();

		element.scrollIntoView();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.strictEqual(
			// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
			(element.getProperty('currentSrc') || element.getAttribute('src')).substr(
				0,
				8
			),
			'https://'
		);
	});
	it('should be loaded if scrolled below the fold (with srcset attribute)', () => {
		const element = $('main img[sizes][loading="lazy"]');

		element.waitForExist();

		element.scrollIntoView();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.strictEqual(
			// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
			(element.getProperty('currentSrc') || element.getAttribute('src')).substr(
				0,
				8
			),
			'https://'
		);
	});
});
describe('demo page - scrolled - iframe', () => {
	it('should be loaded if scrolled below the fold', () => {
		browser.url('index.html');

		const element = $('main iframe[loading="lazy"]');

		element.waitForExist();

		element.scrollIntoView();

		assert.strictEqual(element.getAttribute('src').substr(0, 8), 'https://');
	});
});

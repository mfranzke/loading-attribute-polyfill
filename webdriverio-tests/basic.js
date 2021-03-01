/* global browser $ $$ */
/* eslint-env mocha */

const assert = require('assert');

browser.url('index.html');

describe('demo page - img', () => {
	it('should not get loaded if below the fold (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src'),
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		);
	});
	it('should not get loaded if below the fold (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(
			element.getAttribute('src'),
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		);
	});
	it('should not get loaded if below the fold (with srcset attribute)', () => {
		const element = $('main img[data-lazy-srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src'),
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		);
	});
});
describe('demo page - iframe', () => {
	it('should not get loaded if below the fold', () => {
		const element = $('main iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src'),
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		);
	});
});

describe('demo page - scrolled - img', () => {
	beforeEach(() => {
		// Scroll the main areas first image into view
		$('main').scrollIntoView();
		$('main img').scrollIntoView();
	});

	it('should still be loaded if below the fold (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src').slice(0, 26),
			'https://mfranzke.github.io'
		);
	});
	it('should still be loaded if below the fold (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(
			element.getAttribute('src').slice(0, 26),
			'https://mfranzke.github.io'
		);
	});
	it('should still be loaded if below the fold (with srcset attribute)', () => {
		const element = $('main img[srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src').slice(0, 26),
			'https://mfranzke.github.io'
		);
	});
});
describe('demo page - scrolled - iframe', () => {
	beforeEach(() => {
		// Scroll the main areas iframe into view
		$('main').scrollIntoView();
		$('main iframe').scrollIntoView();
	});
	it('should still be loaded if below the fold', () => {
		const element = $('main iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(
			element.getAttribute('src'),
			'https://player.vimeo.com/video/20997150'
		);
	});
});

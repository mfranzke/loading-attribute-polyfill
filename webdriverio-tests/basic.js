/* global browser $ $$ */
/* eslint-env mocha */

const assert = require('assert');

browser.url('index.html');

describe('demo page - img', () => {
	it('should get loaded if in header (simple)', () => {
		const element = $('header img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should get loaded if in header (nested in picture)', () => {
		const element = $('header picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should get loaded if in header (with srcset attribute)', () => {
		const element = $('header img[srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});

	it('should not get loaded if in main (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
	});
	it('should not get loaded if in main (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(element.getAttribute('src'), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
	});
	it('should not get loaded if in main (with srcset attribute)', () => {
		const element = $('main img[data-lazy-srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
	});
});
describe('demo page - iframe', () => {
	it('should get loaded if in header', () => {
		const element = $('header iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "https://player.vimeo.com/video/87110435");
	});
	it('should not get loaded if in main', () => {
		const element = $('main iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
	});
});


describe('demo page - scrolled - img', () => {
	beforeEach(() => {
		// scroll the main areas first image into view
		$('main').scrollIntoView();
		$('main img').scrollIntoView();
	});
	it('should still be loaded if in header (simple)', () => {
		const element = $('header img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should still be loaded if in header (nested in picture)', () => {
		const element = $('header picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should still be loaded if in header (with srcset attribute)', () => {
		const element = $('header img[srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});

	it('should still be loaded if in main (simple)', () => {
		const element = $('main img[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should still be loaded if in main (nested in picture)', () => {
		const element = $('main picture img[loading="lazy"]');

		element.waitForDisplayed(5000);

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
	it('should still be loaded if in main (with srcset attribute)', () => {
		const element = $('main img[srcset][loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src').substr(0, 4), "img/");
	});
});
describe('demo page - scrolled - iframe', () => {
	beforeEach(() => {
		// scroll the main areas iframe into view
		$('main').scrollIntoView();
		$('main iframe').scrollIntoView();
	});
	it('should still be loaded if in header', () => {
		const element = $('header iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "https://player.vimeo.com/video/87110435");
	});
	it('should still be loaded if in main', () => {
		const element = $('main iframe[loading="lazy"]');

		element.waitForDisplayed(5000);

		assert.equal(element.getAttribute('src'), "https://player.vimeo.com/video/20997150");
	});
});

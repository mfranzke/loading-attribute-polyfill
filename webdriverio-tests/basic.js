/* global browser $ $$ */
/* eslint-env mocha */

describe('demo page - img', () => {
	beforeEach(async () => {
		await browser.url('index.html');
	});
	it('should not get loaded if below the fold (simple)', async () => {
		const element = await $('main img[loading="lazy"]');
		const src = await element.getAttribute('src');

		expect(src.slice(0, 8)).toEqual(
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
	it('should not get loaded if below the fold (nested in picture)', async () => {
		const element = await $('main picture img[loading="lazy"]');
		// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
		const src =
			(await element.getProperty('currentSrc')) ||
			(await element.getAttribute('src'));

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		expect(src.slice(0, 8)).toEqual(
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
	/* jscpd:ignore-start */
	it('should not get loaded if below the fold (with srcset attribute)', async () => {
		const element = await $('main img[sizes][loading="lazy"]');
		// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
		const src =
			(await element.getProperty('currentSrc')) ||
			(await element.getAttribute('src'));

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		expect(src.slice(0, 8)).toEqual(
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
	/* jscpd:ignore-end */
});
describe('demo page - iframe', () => {
	beforeEach(async () => {
		await browser.url('index.html');
	});
	it('should not get loaded if below the fold', async () => {
		const element = await $('main iframe[loading="lazy"]');
		const src = await element.getAttribute('src');

		expect(src.slice(0, 8)).toEqual(
			// Differentiate by feature detection / the loading capability in between the two different expected values
			element.getProperty('loading') ? 'https://' : 'data:ima'
		);
	});
});

describe('demo page - scrolled - img', () => {
	beforeEach(async () => {
		await browser.url('index.html');
	});

	it('should be loaded if scrolled below the fold (simple)', async () => {
		const element = await $('main img[loading="lazy"]');
		const src = await element.getAttribute('src');

		await element.scrollIntoView();

		expect(src.slice(0, 8)).toEqual('https://');
	});
	it('should be loaded if scrolled below the fold (nested in picture)', async () => {
		const element = await $('main picture img[loading="lazy"]');
		// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
		const src =
			(await element.getProperty('currentSrc')) ||
			(await element.getAttribute('src'));

		await element.scrollIntoView();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		expect(src.slice(0, 8)).toEqual('https://');
	});
	/* jscpd:ignore-start */
	it('should be loaded if scrolled below the fold (with srcset attribute)', async () => {
		const element = await $('main img[sizes][loading="lazy"]');
		// We'd like to use the currentSrc property preferably, as it shows the correct image source usage
		const src =
			(await element.getProperty('currentSrc')) ||
			(await element.getAttribute('src'));

		await element.scrollIntoView();

		// Let's use .getProperty('currentSrc') as soon as this feature is implemented
		expect(src.slice(0, 8)).toEqual('https://');
	});
	/* jscpd:ignore-end */
});
describe('demo page - scrolled - iframe', () => {
	it('should be loaded if scrolled below the fold', async () => {
		await browser.url('index.html');

		const element = await $('main iframe[loading="lazy"]');
		const src = await element.getAttribute('src');

		await element.scrollIntoView();

		expect(src.slice(0, 8)).toEqual('https://');
	});
});

# loading="lazy" attribute polyfill

[![Financial Contributors on Open Collective](https://opencollective.com/loading-attribute-polyfill/all/badge.svg?label=financial+contributors)](https://opencollective.com/loading-attribute-polyfill) [![MIT license](https://img.shields.io/npm/l/loading-attribute-polyfill.svg "license badge")](https://opensource.org/licenses/mit-license.php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/loading-attribute-polyfill)](https://bundlephobia.com/result?p=loading-attribute-polyfill)
[![Total downloads ~ Npmjs](https://img.shields.io/npm/dt/loading-attribute-polyfill.svg "Count of total downloads – NPM")](https://npmjs.com/package/loading-attribute-polyfill 'loading="lazy"-attribute polyfill – on NPM')
[![jsDelivr CDN downloads](https://data.jsdelivr.com/v1/package/npm/loading-attribute-polyfill/badge "Count of total downloads – jsDelivr")](https://www.jsdelivr.com/package/npm/loading-attribute-polyfill "loading-attribute polyfill – on jsDelivr")
[![loading-attribute-polyfill on Npmjs](https://img.shields.io/npm/v/loading-attribute-polyfill.svg?color=rgb%28237%2C%2028%2C%2036%29 "npm version")](https://npmjs.com/package/loading-attribute-polyfill 'loading="lazy"-attribute polyfill – on NPM')
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/16c763924903400ca82cfed618a82a6e)](https://app.codacy.com/app/mfranzke_2/loading-attribute-polyfill?utm_source=github.com&utm_medium=referral&utm_content=mfranzke/loading-attribute-polyfill&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/mfranzke/loading-attribute-polyfill/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mfranzke/loading-attribute-polyfill?targetFile=package.json)
[![dependencies Status](https://david-dm.org/mfranzke/loading-attribute-polyfill/status.svg "Count of dependencies")](https://david-dm.org/mfranzke/loading-attribute-polyfill "loading-attribute polyfill – on david-dm")
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Fast and lightweight vanilla JavaScript polyfill for native lazy loading, meaning the behaviour to load elements right before they enter the viewport. Provides graceful degradation, and is - not just thatfor - SEO friendly. Handles images with `srcset` and within `picture`, as well as `iframe` elements. `loading="lazy"` will be a huge improvement for todays web performance challenges, so use and polyfill it today!

- Released under the MIT license
- Made in Germany. And supported by so many great people from all over this planet - see "Credits" accordingly.
- Compatible down to Microsoft Internet Explorer 9

## Features

- Lightweight (see the badge above)
- Web standards: supports the standard `loading="lazy"` attribute on `image` and `iframe` elements
- Performance: it's based on highly efficient, best practice code.
- SEO & crawlers: the image and iframe contents aren't being hidden from crawlers that aren't capable of scrolling.

## Core concepts

The polyfill was designed with the following concepts kept in mind:

- dependency-free
- using JavaScript with graceful degradation

## Installation

First you'll need to integrate the JavaScript file into your code.

You may optionally load via NPM or Bower:

    $ npm install loading-attribute-polyfill
    $ bower install loading-attribute-polyfill

You could even load the polyfill asynchronously: <https://output.jsbin.com/codelib/1>

Afterwards you have need to wrap all of your `<img>` (and in case of `<picture>` usage the complementary `<source>` HTML tags as well) and `<iframe>` HTML tags that you'd like to lazy load (and thatfor added a `loading="lazy"` attribute as well) by an `<noscript>` HTML tag.

Please keep in mind that it's beneficial to even also include `width` and `height` attributes on `<img>` HTML tags, as the browser could determine the aspect ratio via those two attributes values being set (even if you overwrite them via CSS), compare to the great work by Jen Simmons on this topic, e.g. within these articles <https://css-tricks.com/do-this-to-improve-image-loading-on-your-website/> (with video) or <https://css-tricks.com/what-if-we-got-aspect-ratio-sized-images-by-doing-almost-nothing/>

### Simple image

```html
<noscript class="loading-lazy">
	<img src="simpleimage.jpg" loading="lazy" alt=".." width="250" height="150" />
</noscript>
```

### Image wrapped in a picture tag

```html
<picture>
	<noscript class="loading-lazy">
		<source
			media="(min-width: 40em)"
			srcset="simpleimage.huge.jpg 1x, simpleimage.huge.2x.jpg 2x"
		/>
		<source srcset="simpleimage.jpg 1x, simpleimage.2x.jpg 2x" />
		<img
			src="simpleimage.jpg"
			loading="lazy"
			alt=".."
			width="250"
			height="150"
		/>
	</noscript>
</picture>
```

### Image with `srcset`

```html
<noscript class="loading-lazy">
	<img
		src="simpleimage.jpg"
		srcset="
			simpleimage.1024.jpg 1024w,
			simpleimage.640.jpg   640w,
			simpleimage.320.jpg   320w
		"
		sizes="(min-width: 36em) 33.3vw, 100vw"
		alt="A rad wolf"
		loading="lazy"
	/>
</noscript>
```

### Iframe

```html
<noscript class="loading-lazy">
	<iframe
		src="https://player.vimeo.com/video/87110435"
		width="320"
		height="180"
		loading="lazy"
	></iframe>
</noscript>
```

## Optional additional dependencies

In case you'd like to support [older versions of Microsoft Edge, Microsoft Internet Explorer 11 or Apple Safari up to 12.0](https://caniuse.com/#feat=intersectionobserver), you could (conditionally) load an IntersectionObserver polyfill:

<https://www.npmjs.com/package/intersection-observer>

Nevertheless this polyfill would still work in those browsers without that other polyfill included, but [this small amount of users](<(https://caniuse.com/#feat=intersectionobserver)>) wouldn't totally benefit from the lazy loading functionality - we've at least got you partly covered by using the [Microsoft proprietary lazy loading resource hints](https://caniuse.com/#feat=lazyload).

### Internet Explorer 9 & Internet Explorer 10

> Internet Explorer 9 and 10 have bugs where the 'interactive' state can be fired too early before the document has finished parsing.

Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState

That for you would need to include the polyfill the latest within the HTML code, like the nearest to the closing `body` HTML tag, as including it e.g. within the `head` section might lead to an unexpected state, so that in worst case the images might not get loaded.

### Internet Explorer 9

The polyfill has been enhanced to even also provide it's functionality on IE9. But please keep in mind to even also include a `matchMedia` polyfill.

And the images are still displaying an error in the demo on IE9, as most likely (from my understanding) this browser doesn't work with the HTTPS protocol any more, but the src-attributes values are correctly rewritten after all.

## API

Nothing really, just integrate it as shown within the "installation" section, and it ~~will~~ should work out of the box.

## Demo

See the polyfill in action either by downloading / forking this repo and have a look at `demo/index.html`, or at the hosted demo: <https://mfranzke.github.io/loading-attribute-polyfill/demo/>

## Further implementations - Kudos for that

### WordPress

Nico23 has developed a WordPress plugin: <https://wordpress.org/plugins/native-lazyload-polyfill/> (which is much better than the one by Google !)

### PHP Twig Extension

@tim-thaler has developed a PHP Twig Extension: <https://github.com/tim-thaler/twig-loading-lazy>

### Craft Twig Loading Lazy plugin

@tim-thaler has even also developed a Craft Twig Loading Lazy plugin: <https://github.com/tim-thaler/craft-twig-loading-lazy>

## Credits

Credits for the initial kickstarter / script to @Sora2455 for better expressing my ideas & concepts and support by @cbirdsong, @eklingen, @DaPo, @nextgenthemes, @diogoterremoto, @dracos, @Flimm, @TomS- and @vinyfc93. Thank you very much for that, highly appreciated !

## Tested with

- Mac

  - macOS 10.14, Mozilla Firefox 68.0.1 (manually, localhost)
  - macOS 10.14, Safari 12 (via CrossBrowserTesting)
  - macOS 10.13, Safari 11 (via CrossBrowserTesting)

- iOS
  - iPad 6th Generation Simulator, Mobile Safari 12.0 (via CrossBrowserTesting)
- Windows
  - Windows 10, Google Chrome / versions latest & latest-1 (via CrossBrowserTesting)
  - Windows 10, Microsoft Edge / versions 17, 18 (via CrossBrowserTesting)
  - Windows 10, Microsoft Internet Explorer / version 11 (via CrossBrowserTesting) - Windows 7 SP1, Internet Explorer 9.0.8112.16421 (manually, localhost)

### Big Thanks

Cross-browser testing platform provided by [CrossBrowserTesting](https://crossbrowsertesting.com)

[![CrossBrowserTesting](https://crossbrowsertesting.com/blog/wp-content/uploads/2017/09/cbt-wp-logo.png "CrossBrowserTesting")](https://crossbrowsertesting.com) [![Join the chat at https://gitter.im/loading-attribute-polyfill/community](https://badges.gitter.im/loading-attribute-polyfill/community.svg)](https://gitter.im/loading-attribute-polyfill/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Things to keep in mind

- The HTML demo code is meant to be simple
- This polyfill doesn't (so far) provide any functionality for the `loading="eager"` value, as this was released even already, but still seems to be in the measure, learn and improvements phase.

## More information on the standard

- [Specification](https://github.com/whatwg/html/pull/3752)
- [LazyLoad Explainer](https://github.com/scott-little/lazyload)

## Outro

If you're trying out and using my work, feel free to contact me and give me any feedback. I'm curious about how it's gonna be used.

And if you do like this polyfill, please consider even also having a look at the other polyfill we've developed: <https://github.com/mfranzke/datalist-polyfill/>

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/mfranzke/loading-attribute-polyfill/graphs/contributors"><img src="https://opencollective.com/loading-attribute-polyfill/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/loading-attribute-polyfill/contribute)]

#### Individuals

<a href="https://opencollective.com/loading-attribute-polyfill"><img src="https://opencollective.com/loading-attribute-polyfill/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/loading-attribute-polyfill/contribute)]

<a href="https://opencollective.com/loading-attribute-polyfill/organization/0/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/1/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/2/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/3/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/4/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/5/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/6/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/7/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/8/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/loading-attribute-polyfill/organization/9/website"><img src="https://opencollective.com/loading-attribute-polyfill/organization/9/avatar.svg"></a>

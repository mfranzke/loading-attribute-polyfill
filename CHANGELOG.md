# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
And the commit messages from [Conventional Commits](https://conventionalcommits.org) are being used.

## [2.0.0-rc.0] - 2021-03-22

### Added

- GitHub's static analysis engine CodeQL to check against our repository's source code to find security vulnerabilities
- Dependabot to ensure devDependencies are up to date ([!106](https://github.com/mfranzke/loading-attribute-polyfill/pull/106))

### Changed

- devDependency: bump husky from 5.1.2 to version 5.1.3
- devDependency: bump html-validate from 4.6.0 to 4.7.1 (commit [801b314](https://github.com/mfranzke/loading-attribute-polyfill/commit/801b314), [!105](https://github.com/mfranzke/loading-attribute-polyfill/pull/105) and [!109](https://github.com/mfranzke/loading-attribute-polyfill/pull/109))

### Fixed

- testing: updated the tools and removed some old code to make crossbrowsertesting.com work again ([!100](https://github.com/mfranzke/loading-attribute-polyfill/pull/100))
- browsers capabilities: we need to differentiate in between image and iframe capability, as Firefox only supports images for now, but not iframes

## [2.0.0-beta.1] - 2021-03-04

### Changed

- BREAKING CHANGE: Even also generate JS modules from now on supported by [microbundle](https://npmjs.com/microbundle), added the relevant property entries within the `package.json` directing to those files, that are now stored within the `dist/` folder (see [migration guide](MIGRATION.md) [#19](https://github.com/mfranzke/loading-attribute-polyfill/issues/19), [#87](https://github.com/mfranzke/loading-attribute-polyfill/pull/87), [#39](https://github.com/mfranzke/loading-attribute-polyfill/pull/39))

## [2.0.0-beta.0] - 2021-03-04

### Fixed

- BREAKING CHANGE: wrapping the `<picture>` HTML tag instead of its content with `<noscript>` to prevent W3C HTML validator errors (see [migration guide](MIGRATION.md) [#90](https://github.com/mfranzke/loading-attribute-polyfill/issues/90))

## [1.5.4] - 2020-05-23

### Changed

- Updated webdriverio, husky, prettier and xo dependencies
- Replaced Greenkeeper by Snyk for vulnerabilities scanning
- Formatted code by prettier
- husky: moved the hook to the dedicated config file
- README: reordered the badges

### Fixed

- README: Position of Gitter badge
- npmignore: added necessary folder

## [1.5.3] - 2020-03-22

### Changed

- Updated `webdriverio` and `prettier` dependencies

### Fixed

- build: `*.min.js` files should't get prettified

## [1.5.2] - 2020-03-19

### Added

- improvement(prettier): run `prettier` when committing files
- a minzipped size badge

### Changed

- Formatting and code & content optimizations
- `xo`: added further rules for IE9 compatibility

## [1.5.1] - 2020-03-15

### Fix

- Corrected some metadata regarding the packages

## [1.5.0] - 2020-03-15

### Changed

- Updated `webdriverio`, `commitlint` and `xo` dependencies
- docs: further clarifications
- IE9 & IE10: removed `.dataset` reliance

### Fixed

- IE9 & IE10: not deleting `dataset` items for IE9 compatibility [#66](https://github.com/mfranzke/loading-attribute-polyfill/issues/66)
- IE9 & IE10: added section within the docs on including the polyfill JS file at the end of the body

## [1.4.1] - 2020-02-26

### Changed

- Updated `webdriverio`, `husky` and `xo` dependencies
- Optimized the `.npmignore` file

## [1.4.0] - 2020-01-25

### Added

- `Commitlint` & `husky` for CI

### Changed

- Update placeholder to SVG to prevent reflow on lazyloaded images [#48](https://github.com/mfranzke/loading-attribute-polyfill/issues/48)
- Updated `webdriverio` and `xo` dependencies

### Fixed

- `README` needed better wording to avoid confusion on installation/integration process [#46](https://github.com/mfranzke/loading-attribute-polyfill/issues/46)

## [1.3.1] - 2019-11-10

### Fixed

- Added another file to the `.npmignore`, nevermind ...

## [1.3.0] - 2019-11-10

### Added

- Gitter badge
- Graceful degradation and functionality for IE9 [#41](https://github.com/mfranzke/loading-attribute-polyfill/issues/41)
- Updated with some more supporters

### Changed

- Updated `prettier` and `webdriverio` dependencies
- Further enhanced the documentation, like e.g. for [#33](https://github.com/mfranzke/loading-attribute-polyfill/issues/33)

### Fixed

- Reduced the weight of the NPM package by adding a `.npmignore` file
- Typos in the docs

## [1.2.0] - 2019-10-15

### Added

- Crawler/"SEO" capabilities
- Testing: Further browsers and activated the video-recording
- Lots of further information and documentation
- Codacy, dependency and Greenkeeper ([#18](https://github.com/mfranzke/loading-attribute-polyfill/issues/18)) integrations and badges, yeah !
- Comment within the demo page clarifying the images content [#8](https://github.com/mfranzke/loading-attribute-polyfill/issues/8)
- Links to further implementations / plugins & extensions

### Changed

- Made changes regarding to `xo`/`prettier` tools and `codacys` ([#12](https://github.com/mfranzke/loading-attribute-polyfill/issues/12)) remarks
- Some even smaller base64 image as an image replacement
- Loading the sample images locally
- Update `xo` to version 0.25
- Updated `webdriver.io`'s packages to version 5.13.2
- Code simplifications

### Fixed

- Outdated `JSBin` link
- Markdown regarding some readers/interpreters malfunctions

## [1.1.0] - 2019-08-15

### Changed

- Added IE, EDGE < version 16 and Safari < version 12 support

## [1.0.1] - 2019-08-10

### Changed

- Corrected both the demo-page as well as the documentation on the aspect of wrapping the `<source>` HTML tags as well

## [1.0.0] - 2019-08-10

### Added

- Comment regarding asynchronous loading
- `Webdriver.io` testing

### Changed

- BREAKING CHANGE: You'll need to also wrap the `<source>` HTML tags within the `<picture>` tags with `<noscript>`

### Fix

- Documents markup regarding codacy suggestions
- Corrected sample image measurements
- The images didn't load lazily in Safari, but directly, as reported with [#3](https://github.com/mfranzke/loading-attribute-polyfill/issues/3)
- Displaying the images on smaller viewports on the sample page

## [0.2.0] - 2019-05-22

### Added

- Changelog
- `Codacy` integration and badge
- Code examples
- Optional additional dependencies section within the `README`
- Optional polyfill for the demo page
- "Conventional Commits" support as well as their badge - yeah !

### Changed

- Docs formatting
- Some docs content enhancements
- Internal namings within the JS file

## [0.1.2] - 2019-05-04

### Added

- Documentation

## [0.1.1] - 2019-05-01

### Added

- `CHANGELOG.md` file

## [0.1.0] - 2019-05-01

### Added

- Initial files
- `npm` and `bower` support
- code formatting and linting

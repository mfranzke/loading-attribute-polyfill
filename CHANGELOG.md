# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
And the commit messages from [Conventional Commits](https://conventionalcommits.org) are being used.

## [Unreleased]

- Ongoing: Further documentation

## [1.0.1] - 2019-08-10

### Changed

- Corrected both the demo-page as well as the documentation on the aspect of wrapping the `<source>` HTML tags as well

## [1.0.0] - 2019-08-10

### Added

- Comment regarding asynchronous loading
- Webdriver.io testing

### Changed

- BREAKING CHANGE: You#ll need to also wrap the `<source>` HTML tags within the `<picture>` tags with `<noscript>`

### Fix

- Documents markup regarding codacy suggestions
- Corrected sample image measurements
- The images didn't load lazily in Safari, but directly, as reported with #GH-3
- Displaying the images on smaller viewports on the sample page

## [0.2.0] - 2019-05-22

### Added

- Changelog
- Codacy integration and badge
- Code examples
- Optional additional dependencies section within the README
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

- CHANGELOG.md file

## [0.1.0] - 2019-05-01

### Added

- Initial files
- npm and bower support
- code formatting and linting

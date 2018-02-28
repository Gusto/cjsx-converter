# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2017-11-16
### Updated
- Upgraded decaffeinate from 3.0.0 to 4.0.1
- Upgraded prettier from 1.5.3 to 1.11.0

## [0.2.1] - 2017-11-20
### Fixed
- Some JSX text gets converted to template literals

## [0.2.0] - 2017-11-16
### Added
- Convert React components to ES6 classes or functional components (when possible)
- Convert plain Coffee files to plain JS files
### Updated
- Upgraded decaffeinate
- Upgraded prettier

## [0.1.4] - 2017-09-25
### Updated
- Updated README

## [0.1.3] - 2017-09-25
### Added
- Publish to npm

## [0.1.2] - 2017-09-25
### Added
- Add CI build
- Add correct "bin" entry to `package.json`

### Fixed
- Fix the case when the target project does not include ESLint

## [0.1.1] - 2017-09-25
### Changed
- Project now linted by Gusto's ESLint config, not Airbnb

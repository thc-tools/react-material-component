# react-material-component

Implementation of Material Components Web for React

[![Build Status](https://travis-ci.org/thc-tools/react-material-component.svg?branch=master)](https://travis-ci.org/thc-tools/react-material-component)

## Documentation :

Available at : https://thc-tools.github.io/react-material-component

## Rules :

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...

## Simplified releases :

#### Prerequisites :

-   Set up token for Github releaser : [Guide](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser#setup-token-for-cli)
-   Have an account on npm and be logged in

#### Steps

-   `npm run pre-release` or `npm run pre-release-alpha|beta`
-   Check if everything is fine (tags, version, changelog, ...)
-   `npm run release`
-   Release is done (on npm, git and Github) !

## Useful links

-   https://conventionalcommits.org/
-   https://github.com/conventional-changelog/standard-version
-   https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser

Idea : Maybe we could do something alike [webpack-defaults](https://github.com/webpack-contrib/webpack-defaults)

# Digi Alt-HR App

[![Build Status](https://travis-ci.org/aajiwani/digi-hr-app.svg?branch=master)](https://travis-ci.org/aajiwani/digi-hr-app)
[![Dependency status](https://david-dm.org/aajiwani/digi-hr-app.svg)](https://david-dm.org/aajiwani/digi-hr-app)

This app facilitates Digi's HR with several flows, that were previously taken care of in a bit boring way.

The flows supported by the app would be Expenses, Travel and OnBoarding as the app reveals itself.

## Tech Stack

The app is targetted mostly towards mobile usage, and hence the selection of technology to make sense would be react-native. On top of react-native, we would add more libraries as we require.

The app has a CI/CD integrated within this repository, we used Travis to help us out in this case.

## Practices

Each feature we build for the app goes through a different branch and a pull request to finally be merged to master.

On the master branch, we can issue tags to let travis know on when to release the app, this way it could be even done via operational team, no developer influence is required for CI/CD.

---

## Promise

Everyone working on this app is a consenting adult, and if any one wants to help us out in the progress, we assume would be consenting adult and we pressume them to behave accordingly. Being reasonable is the key, technology could be taught, but value remains.

---

## Usage Etiquettes

* Please use tags with release-X.X.X to make a release to crashlytics as well as slack channel
* Always use master branch for making a release
* For making a push to appetize, please use `--upload-to-appetize` as a part of your commit message
* Push to appetize could be made from any branch you are working on
* Please behave responsibly while consuming Appetize, we are indie devs and can't afford paid account for appetize (90min/month)
* Tags could be created with commands
  ```
      git tag release-0.0.2 -m "Message for release"
      git push --tags
  ```
* Tags could be destroyed with commands
  ```
      git tag -d release-0.0.2
      git push origin :refs/tags/release-0.0.2
  ```

---

Note: Environment could be set via adding --env=([a-zA-Z0-9]+) to the commit message. E.g git commit -m "Build for development --env=DEVELOPMENT"

The above example for now will push a build with API_URL to be pointed to development environment

### Available Environments:

* DEVELOPMENT
* STAGING
* PRODUCTION

---

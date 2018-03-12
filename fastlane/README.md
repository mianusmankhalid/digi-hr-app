fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android local_dev
```
fastlane android local_dev
```
It performs cleans, build, package and code analysis

It cleans node_modules, sonarqube and as well as build directories.

It also Installs node_modules, build, run unit tests and assemble the release.
### android dev
```
fastlane android dev
```
It performs cleans, build, package and code analysis

It cleans node_modules, sonarqube and as well as build directories.

It also Installs node_modules, build, run unit tests and assemble the release.
### android appetizer
```
fastlane android appetizer
```
It performs cleans, build, package and code analysis

It cleans node_modules, sonarqube and as well as build directories.

It also Installs node_modules, build, run unit tests and assemble the release.

This lane is dedicated to push the current commit to appetize
### android push
```
fastlane android push
```
It runs dev tasks (clean, build etc.)

It tags the build before submitting to beta release.)

Deploys a beta version to the Crashlytics for the test flight.
### android deploy
```
fastlane android deploy
```
Deploys a new version to the Google Play

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

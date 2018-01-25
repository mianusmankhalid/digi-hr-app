#!/bin/sh
export CRASHLYTICS_API_KEY=""
export CRASHLYTICS_BUILD_SECRET=""

export TRAVIS_BRANCH=master
export TRAVIS_PULL_REQUEST=false

fastlane android local_dev
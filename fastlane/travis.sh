#!/bin/sh

# if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
#   fastlane test
#   exit $?
# fi

# if [[ "$TRAVIS_BRANCH" != "master" ]]; then
# #  git fetch --unshallow
#   fastlane android dev
#   exit $?
# fi

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  git fetch --unshallow
  fastlane android dev
  exit $?
elif [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  git fetch --unshallow
  # fastlane android push distribution:"RC"
  fastlane android dev
  exit $?
else
  # Run for any other commit
  fastlane android dev
  exit $?
fi

# Prepare a release and post it to crashlytics if its a tagged build
if [[ "$TRAVIS_TAG" =~ ^release\([0-9\.]*\)$ ]] && [[ "$TRAVIS_BRANCH" = "master" ]];
then
  fastlane android push distribution:"RC"
fi
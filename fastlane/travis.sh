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
  fastlane android push distribution:"RC"
  exit $?
else
  # Run for any other commit
  fastlane android dev
  exit $?
fi
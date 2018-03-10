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

# Allows to modify build process according to environment
# Default ENV: Development
SEL_ENV="DEVELOPMENT"
if [[ "$TRAVIS_COMMIT_MESSAGE" =~ --env=([a-zA-Z0-9]+) ]];
then
  # If the environment is present
  # override it
  SEL_ENV=${BASH_REMATCH[1]}
fi

bash fastlane/load_environment.sh ${SEL_ENV}

# Prepare a release and post it to crashlytics if its a tagged build
if [[ "$TRAVIS_TAG" =~ ^release-[0-9\.]*$ ]];
then
  fastlane android push distribution:"RC"
  exit $?
elif [[ "$TRAVIS_COMMIT_MESSAGE" =~ \-\-upload\-to\-appetize ]];
then
  fastlane android appetizer
  exit $?
elif [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]
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

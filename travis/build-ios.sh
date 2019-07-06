#!/bin/bash -v

set -e
set -x
echo "current path $(pwd)"
ls
# Build Ionic App for iOS
ionic cordova platform add ios --nofetch

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build ios
else
    ionic cordova build ios --prod --release
fi

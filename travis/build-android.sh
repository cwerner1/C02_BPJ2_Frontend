#!/bin/bash -v

set -e
set -x
echo "current path $(pwd)"

# Build Ionic App for Android
cordova platform add android --nofetch

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build android
else
    ionic cordova build android --prod --release
fi

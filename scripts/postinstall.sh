#!/bin/bash -e

if [ "$(uname)" == "Darwin" ]; then
  pwd
  cd detox/test/ios
  pod install
fi

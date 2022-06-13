#!/bin/bash

git diff HEAD^ HEAD --quiet ./
CLIENT=$?

git diff HEAD^ HEAD --quiet ../shared
SHARED=$?

if [ $CLIENT == 1 ]  || [ $SHARED == 1 ]; then
	exit 1 # do build
fi

exit 0 # skip build


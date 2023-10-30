#!/bin/sh
# Build script for Isomer websites

echo "Build started..."

#######################################################################
# Download package.json and package-lock.json files from central repo #
#######################################################################

curl https://raw.githubusercontent.com/isomerpages/isomer-template/master/build/package.json -o package.json
curl https://raw.githubusercontent.com/isomerpages/isomer-template/master/build/package-lock.json -o package-lock.json

#######################
# Install NPM modules #
#######################

npm install

#####################
# Build the website #
#####################

npm run build

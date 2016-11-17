#!/usr/bin/env bash
set -e

echo Removing ./tmp
rm -rf tmp

echo Removing logs
rm -f log/development.log
rm -f log/test.log


echo Building Container
docker build -t bizmerkback/bizmerk-front .

echo Removing compiled assets
rm -rf compiled

echo Removing ./tmp
rm -rf tmp

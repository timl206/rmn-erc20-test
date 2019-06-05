#!/usr/bin/env bash

rm -rf flats/*
./node_modules/.bin/truffle-flattener contracts/RamenToken.sol > flats/RamenToken_flats.sol

./node_modules/.bin/truffle-flattener contracts/RamenCrowdsale.sol > flats/RamenCrowdsale_flats.sol

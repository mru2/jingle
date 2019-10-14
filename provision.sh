#! /usr/bin/env bash

# Install dependencies
apt-get update
apt-get install git nodejs npm omxplayer

# Fetch code
git clone https://github.com/mru2/jingle.git /opt/jingle

# Install node dependencies
cd /opt/jingle
npm install


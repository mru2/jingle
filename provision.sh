#! /usr/bin/env bash

# Install dependencies
apt-get update
apt-get install git nodejs npm ffmpeg

# Fetch code
git clone https://github.com/mru2/jingle.git /opt/jingle

# Install node dependencies
cd /opt/jingle
npm install

# Setup autostart
ln -s /opt/jingle/jingle.service /etc/systemd/system/jingle.service
systemctl daemon-reload
systemctl enable jingle
systemctl start jingle

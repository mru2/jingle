#! /usr/bin/env bash
echo "Running script"

TMPDIR=/tmp/jingle

mkdir -p $TMPDIR

IMAGE=$1
TIME=$2

echo "Image $1"
echo "Time $2"

omxplayer --no-keys --loop --no-osd --blank $IMAGE &

sleep $TIME

killall omxplayer.bin

#! /usr/bin/env bash
echo "Running script"

TMPDIR=/tmp/jingle

mkdir -p $TMPDIR

IMAGE=$1
SOUND=$2
TIME=$3

echo "Image $1"
echo "Sound $2"
echo "Time $3"

# Play the sound in one shot
cvlc --no-video $SOUND &
SOUND_PID=$!

sleep 3

ffplay -fs -loop 0 $IMAGE &
IMAGE_PID=$!

sleep $TIME

kill $SOUND_PID
kill $IMAGE_PID

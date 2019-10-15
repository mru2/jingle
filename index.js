#!/usr/bin/env node

const Pusher = require('pusher-js/node');
const execFile = require('child_process').execFile;

function buildQueue(handler) {
  let running = false;
  let queue = [];

  function popQueue() {
    const e = queue.shift();
    if (e) {
      running = true;
      handler(e, function() {
        running = false;
        popQueue();
      });
    }
  }

  return function(e) {
    queue.push(e);
    if (!running) {
      popQueue();
    }
  };
}

function runJingle(data, cb) {
  const child = execFile(
    '/opt/jingle/play-jingle.sh',
    [data.gif, data.time],
    (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
      cb();
    },
  );
}

const enqueue = buildQueue(runJingle);

const pusher = new Pusher('c4de1cc2f3f02653b55c', {
  cluster: 'eu',
  encrypted: true,
});

const channel = pusher.subscribe('tv');

channel.bind('notify', enqueue);

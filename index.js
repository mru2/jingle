const Pusher = require("pusher-js/node");
const execFile = require("child_process").execFile;

console.log("Hello world!");

function handleNotify(data) {
  console.log("Got notification", data);
  const child = execFile("./play-jingle.sh", [data.gif, data.sound, data.time], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

const pusher = new Pusher(process.env.PUSHER_KEY, {
  cluster: "eu",
  encrypted: true
});

const channel = pusher.subscribe("tv");

channel.bind("notify", handleNotify);

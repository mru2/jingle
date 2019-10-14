const Pusher = require("pusher-js/node");
const execFile = require("child_process").execFile;

console.log("Hello world!");

function handleNotify(data) {
  console.log("Got notification", data);
  const child = execFile("./play-jingle.sh", [data.gif, data.time], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

const pusher = new Pusher("c4de1cc2f3f02653b55c", {
  cluster: "eu",
  encrypted: true
});

const channel = pusher.subscribe("tv");

channel.bind("notify", handleNotify);

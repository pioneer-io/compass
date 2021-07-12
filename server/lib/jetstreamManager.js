const { connect } = require("nats");

async function createStreams() {
  console.log("create streams executing")
  const nc = await connect({ servers: "localhost:4222" });

  // create a jetstream manager - manages stream configs
  const jsm = await nc.jetstreamManager();

  // create a stream with the name 'FLAG',
  // which streams all messages with a subject name that starts with 'FLAG'
  // and the messages are stored in memory (not disk)
  jsm.streams.add({name: "FLAG", subjects: ["FLAG.*"], storage: "memory"})
  jsm.streams.add({name: "DATA", subjects: ["DATA.*"], storage: "memory"})
  
  
  // retrieve info about the stream
  const flagStreamInfo = await jsm.streams.info("FLAG")
  const dataStreamInfo = await jsm.streams.info("DATA")

  console.log("FLAG stream info", flagStreamInfo)
  console.log("DATA stream info", dataStreamInfo)
}

async function streamsCreated() {
  const nc = await connect({ servers: "localhost:4222" });
  const jsm = await nc.jetstreamManager();

  let flag;
  let data;

  try {
    data = await jsm.streams.info("DATA")
    flag = await jsm.streams.info("FLAG")

    return flag.config.name === "FLAG" && data.config.name === "DATA";
  } catch(err) {
    console.log("stream not created.", err);
    return false;
  }
}



exports.createStreams = createStreams;
exports.streamsCreated= streamsCreated;

const { connect } = require("nats");

async function createStreams() {
  const nc = await connect({ servers: "localhost:4222" });
  const jsm = await nc.jetstreamManager();

  jsm.streams.add({name: "DATA", subjects: ["DATA.*"], storage: "memory"})
  
  
  const dataStreamInfo = await jsm.streams.info("DATA")

  console.log("DATA stream info", dataStreamInfo)
}

async function streamsCreated() {
  const nc = await connect({ servers: "localhost:4222" });
  const jsm = await nc.jetstreamManager();

  let data;

  try {
    data = await jsm.streams.info("DATA")

    return data.config.name === "DATA";
  } catch(err) {
    console.log("stream not created.", err);
    return false;
  }
}



exports.createStreams = createStreams;
exports.streamsCreated= streamsCreated;

const { connect, AckPolicy } = require("nats");
let nc;
let js;

async function createJetStreamConnect() {
  nc = await connect({ servers: "localhost:4222" });
  js = nc.jetstream();
}

async function createStreams() {
  await createJetStreamConnect();
  const jsm = await nc.jetstreamManager();

  jsm.streams.add({name: "DATA", subjects: ["DATA.*"], storage: "memory"})
  
  
  const dataStreamInfo = await jsm.streams.info("DATA")

  await addConsumers(jsm);
  console.log("DATA stream info", dataStreamInfo)
}

async function addConsumers(jsm) {
  await jsm.consumers.add('DATA', {
    durable_name: "dataStream",
    ack_policy: AckPolicy.Explicit,
  });
}

async function streamsCreated() {
  await createJetStreamConnect();
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

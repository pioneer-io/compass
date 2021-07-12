const {connect, StringCodec, JSONCodec} = require("nats");
const sc = StringCodec();
const jc = JSONCodec();
const   {createStreams, streamsCreated} = require("./jetstreamManager")

// publishing to jetstream
async function publish(stream, msg) {
  const nc = await connect({ servers: "localhost:4222" });

  // create jetstream client
  const js = nc.jetstream();
  
  // if streams have not already been created, then create them
  if (! await streamsCreated()) {
    await createStreams();
  }

  console.log(`Publishing this msg: ${msg} to this stream: ${stream}`)

  const pubMsg = await js.publish(stream, sc.encode(msg))

  // should capture the stream that captured the message
  // and sequence assigned to msg
  const capStream = pubMsg.stream;
  const msgSeq = pubMsg.seq;

  console.log(`Msg was captured by stream "${capStream}" and is seq num: ${msgSeq}`)

  await nc.drain();
}

async function publishInit(data) {
  const nc = await connect({ servers: "localhost:4222" });
  const js = nc.jetstream();
  
  
  // if streams have not already been created, then create them
  if (! await streamsCreated()) {
    await createStreams();
  }

  await js.publish("DATA.init", jc.encode(data));
  console.log("DATA.init msg sent");
}

exports.publish = publish;
exports.publishInit = publishInit;
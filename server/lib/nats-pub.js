const {connect, StringCodec, JSONCodec} = require("nats");
const sc = StringCodec();
const jc = JSONCodec();
const   {createStreams, streamsCreated} = require("./jetstreamManager")
const {fetchAllFlags} = require("./postgres-flags")

// publishing to jetstream
async function publishUpdatedRules() {
  const nc = await connect({ servers: "localhost:4222" });
  const js = nc.jetstream();
  
  
  if (! await streamsCreated()) {
    await createStreams();
  }

  let flagData = await fetchAllFlags();
  flagData = JSON.stringify(flagData);
  console.log(`Publishing this msg: ${(flagData)} to this stream: 'DATA.FullRuleSet'`)

  const pubMsg = await js.publish('DATA.FullRuleSet', sc.encode(flagData))

  // should capture the stream that captured the message
  // and sequence assigned to msg
  const capStream = pubMsg.stream;
  const msgSeq = pubMsg.seq;

  console.log(`Msg was captured by stream "${capStream}" and is seq num: ${msgSeq}`)

  await nc.drain();
}


exports.publishUpdatedRules = publishUpdatedRules;
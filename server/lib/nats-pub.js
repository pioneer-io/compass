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

  await nc.drain();
}


exports.publishUpdatedRules = publishUpdatedRules;
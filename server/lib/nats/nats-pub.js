const {connect, StringCodec, consumerOpts, createInbox} = require("nats");
const {createStreams, streamsCreated} = require("./jetstreamManager")
const {fetchAllFlags} = require("../db/postgres-flags")
let nc;
let js;

const sc = StringCodec();

async function createJetStreamConnect() {
  nc = await connect({ servers: "localhost:4222" });
  js = nc.jetstream();
}

// publishing to jetstream
async function publishUpdatedRules() {
    await createJetStreamConnect();

  if (! await streamsCreated()) {
    await createStreams();
  }

  let flagData = await fetchAllFlags();
  flagData = JSON.stringify(flagData);
  console.log(`Publishing this msg: ${(flagData)} to this stream: 'DATA.FullRuleSet'`)

  const pubMsg = await js.publish('DATA.FullRuleSet', sc.encode(flagData))

  await nc.drain();
}

async function subscribeToRuleSetRequests() {
  await createJetStreamConnect();

  if (! await streamsCreated()) {
    await createStreams();
  }

  const sub = await js.subscribe('DATA.FullRuleSetRequest', config('FullRuleSetRequest'));

  (async (sub) => {
    for await (const m of sub) {
      publishUpdatedRules();
      m.ack();
    };
  })(sub);
}

function config(subject) {
  const opts = consumerOpts();
  opts.durable(subject);
  opts.manualAck();
  opts.ackExplicit();
  opts.deliverTo(createInbox());

  return opts
}

exports.publishUpdatedRules = publishUpdatedRules;
exports.subscribeToRuleSetRequests = subscribeToRuleSetRequests;
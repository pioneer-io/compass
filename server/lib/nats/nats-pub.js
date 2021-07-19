const {connect, StringCodec, consumerOpts, createInbox} = require("nats");
const {createStreams, streamsCreated} = require("./jetstreamManager")
const {fetchAllFlags} = require("../db/flags")
const {fetchUsersSdkKey} = require("../db/sdkKeys")

let nc;
let js;

const sc = StringCodec();

async function createJetStreamConnect() {
  nc = await connect({ servers: "localhost:4222" });
  js = nc.jetstream();
}

// publishing to jetstream
async function publishUpdatedRules() {
    await createJetStreamConnect().catch(err => {
      throw new Error(err, "JetStream connect failed");
    });

  if (! await streamsCreated()) {
    await createStreams();
  }

  let flagData = await fetchAllFlags();
  flagData = JSON.stringify(flagData);
  console.log(`Publishing this msg: ${(flagData)} to this stream: 'DATA.FullRuleSet'`)

  const pubMsg = await js.publish('DATA.FullRuleSet', sc.encode(flagData))

}

async function publishSdkKey() {
  await createJetStreamConnect();

  if (! await streamsCreated()) {
    await createStreams();
  }

  let sdkKey = await fetchUsersSdkKey();
  sdkKey = JSON.stringify(sdkKey);
  console.log(`Publishing this msg: ${sdkKey} to this stream: 'KEY.sdkKey'`);

  const pubMsg = await js.publish('KEY.sdkKey', sc.encode(sdkKey));
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

async function subscribeToSdkKeyRequests() {
  await createJetStreamConnect();

  if (! await streamsCreated()) {
    await createStreams();
  }

  const sub = await js.subscribe('KEY.sdkKeyRequest', config('sdkKeyRequest'));

  (async (sub) => {
    for await (const m of sub) {
      publishSdkKey();
      m.ack();
    };
  })(sub);
}

async function initSubscriptions() {
  await subscribeToRuleSetRequests();
  await subscribeToSdkKeyRequests();
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
exports.initSubscriptions = initSubscriptions;
exports.publishSdkKey = publishSdkKey;
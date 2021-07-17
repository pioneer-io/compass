// refactored into an oop (nats singleton)

const { connect, AckPolicy, StringCodec, consumerOpts, createInbox } = require('nats');
const {fetchAllFlags} = require("../db/flags")
const {fetchUsersSdkKey} = require("../db/sdkKeys")

// extract (if await checkstreams created) create stream

class JetstreamManager {
  
  constructor() {
    this.sc = StringCodec();
  }

  async init() {
    // this.nc = await connect({ servers: "localhost:4222" });
    // this.js = this.nc.jetstream();
    await this._createJetStreamConnect();
    // if (!await this._checkStreamsCreated()) {
      await this._createStreams();
    // }
    await this.publishUpdatedRules();
	  await this._initSubscriptions();
  }

  async _initSubscriptions() {
    const self = this;
    const subscriptionsInfo = [
      {
        streamName: 'DATA',
        subsetName: 'FullRuleSetRequest',
        handler: self.publishUpdatedRules
      },
      {
        streamName: 'KEY',
        subsetName: 'sdkKeyRequest',
        handler: self.publishSdkKey
      }
    ];
    for (const info of subscriptionsInfo) {
      await this._subscribeToRequests(info);
    }
    // await this._subscribeToRuleSetRequests();
    // await this._subscribeToSdkKeyRequests();
  }

  async _subscribeToRequests({streamName, subsetName, handler}) {
    const sub = await this.js.subscribe(`${streamName}.${subsetName}`, this._config(subsetName));

    (async (sub) => {
      for await (const m of sub) {
        handler.call(this);
        m.ack();
      };
    })(sub);
  }
  
  _config(subject) {
    const opts = consumerOpts();
    opts.durable(subject);
    opts.manualAck();
    opts.ackExplicit();
    opts.deliverTo(createInbox());

    return opts
  }

  async _createJetStreamConnect() {
    this.nc = await connect({ servers: "localhost:4222" });
    this.js = this.nc.jetstream();
  }

  async _publish({ data, streamName }) {
    const json = JSON.stringify(data);
    const encodedData = this.sc.encode(json);
    console.log(`Publishing this msg: ${json} to this stream: '${streamName}'`)
    const pubMsg = await this.js.publish(streamName, encodedData)
  }

  async publishUpdatedRules() {
    let flagData = await fetchAllFlags();
    await this._publish({data: flagData, streamName: 'DATA.FullRuleSet'});
  }

  async publishSdkKey() {
    let sdkKey = await fetchUsersSdkKey();
    await this._publish({ data: sdkKey, streamName: 'KEY.sdkKey' });
  }

  // everything below was refactored from jetstreamManager.js

  async _createStreams() {
    // await this._createJetStreamConnect();
    const jsm = await this.nc.jetstreamManager();

    jsm.streams.add({ name: 'DATA', subjects: [ 'DATA.*' ], storage: 'memory', max_msgs: 1 }); //max_age: 300000000})
    jsm.streams.add({ name: 'KEY', subjects: [ 'KEY.*' ], storage: 'memory', max_msgs: 1 });

    const dataStreamInfo = await jsm.streams.info('DATA');
    const keyStreamInfo = await jsm.streams.info('KEY')

    await this.addConsumers(jsm);
  }

  // create streams, create consumers, create subscriptions

  async addConsumers(jsm) {
    await jsm.consumers.add('DATA', {
      durable_name : 'dataStream',
      ack_policy   : AckPolicy.Explicit
    });

    await jsm.consumers.add('KEY', {
      durable_name : 'keyStream',
      ack_policy   : AckPolicy.Explicit
    });
  }

  async _checkStreamsCreated() {
    await this._createJetStreamConnect();
    const jsm = await this.nc.jetstreamManager();

    let data;
    let key;

    try {
      data = await jsm.streams.info('DATA');
      key = await jsm.streams.info('KEY');

      return data.config.name === 'DATA' && key.config.name === 'KEY';
    } catch (err) {
      console.log('stream not created.', err);
      return false;
    }
  }
}


const jsm = new JetstreamManager();
module.exports = jsm;

// exports.createStreams = createStreams;
// exports.streamsCreated = streamsCreated;

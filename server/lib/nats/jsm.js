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
    await this._subscribeToRuleSetRequests();
    await this._subscribeToSdkKeyRequests();
  }

  async _subscribeToRuleSetRequests() {
    // await this._createJetStreamConnect();
  
    // if (! await this._checkStreamsCreated()) {
    //   await this._createStreams();
    // }
  
    const sub = await this.js.subscribe('DATA.FullRuleSetRequest', this._config('FullRuleSetRequest'));
  
    (async (sub) => {
      for await (const m of sub) {
        this.publishUpdatedRules();
        m.ack();
      };
    })(sub);
  }
  
  async _subscribeToSdkKeyRequests() {
    // await this._createJetStreamConnect();
  
    // if (! await this._checkStreamsCreated()) {
    //   await this._createStreams();
    // }
  
    const sub = await this.js.subscribe('KEY.sdkKeyRequest', this._config('sdkKeyRequest'));
  
    (async (sub) => {
      for await (const m of sub) {
        this.publishSdkKey();
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

  async publishUpdatedRules() {
    // await this._createJetStreamConnect();

    // if (! await this._checkStreamsCreated()) {
    //   await this._createStreams();
    // }

    let flagData = await fetchAllFlags();
    flagData = JSON.stringify(flagData);
    console.log(`Publishing this msg: ${(flagData)} to this stream: 'DATA.FullRuleSet'`)

    const pubMsg = await this.js.publish('DATA.FullRuleSet', this.sc.encode(flagData))

  }

  async publishSdkKey() {
    // await this._createJetStreamConnect();

    // if (! await this._checkStreamsCreated()) {
    //   await this._createStreams();
    // }
    
    let sdkKey = await fetchUsersSdkKey();
    sdkKey = JSON.stringify(sdkKey);
    console.log(`Publishing this msg: ${sdkKey} to this stream: 'KEY.sdkKey'`);

    const pubMsg = await this.js.publish('KEY.sdkKey', this.sc.encode(sdkKey));
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

// refactored into an oop (nats singleton)

const { connect, AckPolicy, StringCodec, consumerOpts, createInbox } = require('nats');
const { fetchAllFlags } = require('../db/flags');
const { fetchUsersSdkKey } = require('../db/sdkKeys');
const { ruleset, sdkKey } = require('./constants');

class JetstreamWrapper {
	constructor() {
		this.sc = StringCodec();
	}

	// create streams, create consumers, create subscriptions
	async init() {
		await this._createJetStreamConnect();

		if (!await this._checkStreamsCreated()) {
			await this._createStreams();
			await this._addConsumers();
		}

		await this.publishUpdatedRules();
		await this._initSubscriptions();
	}

	async _initSubscriptions() {
		const self = this;
		const subscriptionsInfo = [
			{
				// streamName : 'DATA',
				// subsetName : 'FullRuleSetRequest',
				streamName : ruleset.streamName,
				subsetName : ruleset.subsetNameRequest,
				handler    : self.publishUpdatedRules
			},
			{
				// streamName : 'KEY',
				// subsetName : 'sdkKeyRequest',
				streamName : sdkKey.streamName,
				subsetName : sdkKey.subsetNameRequest,
				handler    : self.publishSdkKey
			}
		];
		for (const info of subscriptionsInfo) {
			await this._subscribeToRequests(info);
		}
	}

	async _subscribeToRequests({ streamName, subsetName, handler }) {
		const sub = await this.js.subscribe(`${streamName}.${subsetName}`, this._config(subsetName));

		(async (sub) => {
			for await (const m of sub) {
				handler.call(this);
				m.ack();
			}
		})(sub);
	}

	_config(subject) {
		const opts = consumerOpts();
		opts.durable(subject);
		opts.manualAck();
		opts.ackExplicit();
		opts.deliverTo(createInbox());

		return opts;
	}

	async _createJetStreamConnect() {
		this.nc = await connect({ servers: 'localhost:4222' }); // put the server address and port in an env variable?
		this.js = await this.nc.jetstream();
		this.jsm = await this.nc.jetstreamManager();
	}

	async _publish({ data, streamName }) {
		const json = JSON.stringify(data);
		const encodedData = this.sc.encode(json);
		console.log(`Publishing this msg: ${json} to this stream: '${streamName}'`);
		const pubMsg = await this.js.publish(streamName, encodedData);
	}

	async publishUpdatedRules() {
		let flagData = await fetchAllFlags();
		// await this._publish({ data: flagData, streamName: 'DATA.FullRuleSet' });
		await this._publish({ data: flagData, streamName: ruleset.fullSubject });
	}

	async publishSdkKey() {
		let fetchedSdkKey = await fetchUsersSdkKey();
		// await this._publish({ data: sdkKey, streamName: 'KEY.sdkKey' });
		await this._publish({ data: fetchedSdkKey, streamName: sdkKey.fullSubject });
	}

	// everything below was refactored from jetstreamManager.js

	async _createStreams() {
		// this.jsm.streams.add({ name: 'DATA', subjects: [ 'DATA.*' ], storage: 'memory', max_msgs: 1 }); //max_age: 300000000})
		// this.jsm.streams.add({ name: 'KEY', subjects: [ 'KEY.*' ], storage: 'memory', max_msgs: 1 });
		this.jsm.streams.add({
			name     : ruleset.streamName,
			// subjects : [ 'DATA.*' ],
			subjects : [ `${ruleset.streamName}.*` ],
			storage  : 'memory',
			max_msgs : 1
		}); //max_age: 300000000})
		this.jsm.streams.add({
			name     : sdkKey.streamName,
			// subjects : [ 'KEY.*' ],
			subjects : [ `${sdkKey.streamName}.*` ],
			storage  : 'memory',
			max_msgs : 1
		});

		// const dataStreamInfo = await this.jsm.streams.info('DATA');
		// const keyStreamInfo = await this.jsm.streams.info('KEY');
		const dataStreamInfo = await this.jsm.streams.info(ruleset.streamName);
		const keyStreamInfo = await this.jsm.streams.info(sdkKey.streamName);
	}

	async _addConsumers(jsm) {
		// await this.jsm.consumers.add('DATA', {
		await this.jsm.consumers.add(ruleset.streamName, {
			durable_name : 'dataStream',
			ack_policy   : AckPolicy.Explicit
		});

		// await this.jsm.consumers.add('KEY', {
		await this.jsm.consumers.add(sdkKey.streamName, {
			durable_name : 'keyStream',
			ack_policy   : AckPolicy.Explicit
		});
	}

	async _checkStreamsCreated() {
		try {
			// let data = await this.jsm.streams.info('DATA');
			// let key = await this.jsm.streams.info('KEY');
			let data = await this.jsm.streams.info(ruleset.streamName);
			let key = await this.jsm.streams.info(sdkKey.streamName);

			// return data.config.name === 'DATA' && key.config.name === 'KEY';
			return data.config.name === ruleset.streamName && key.config.name === sdkKey.streamName;
		} catch (err) {
			//console.log('stream not created.', err);
			return false;
		}
	}
}

const jsw = new JetstreamWrapper();
module.exports = jsw;

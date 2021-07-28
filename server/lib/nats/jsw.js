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
				streamName : ruleset.streamName,
				subsetName : ruleset.subsetNameRequest,
				handler    : self.publishUpdatedRules
			},
			{
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
		this.nc = await connect({ servers: process.env.NATS_SERVER }).catch(err => {
			throw Error(err, "Error connecting to NATS")
		});
		// put the server address and port in an env variable?

		this.js = this.nc.jetstream()
		this.jsm = await this.nc.jetstreamManager().catch(err => console.error(err));
	}

	async _publish({ data, streamName }) {
		const json = JSON.stringify(data);
		const encodedData = this.sc.encode(json);
		console.log(`Publishing this msg: ${json} to this stream: '${streamName}'`);
		const pubMsg = await this.js.publish(streamName, encodedData).catch(err => {
			throw Error(err, "Publish message failed. There is no connected stream.");
		});
	}

	async publishUpdatedRules() {
		let flagData = await fetchAllFlags();
		await this._publish({ data: flagData, streamName: ruleset.fullSubject }).catch(err => {
			throw Error(err, "Cannot publish; there is no stream connected.");
		});
	}

	async publishSdkKey() {
		let fetchedSdkKey = await fetchUsersSdkKey();
		await this._publish({ data: fetchedSdkKey, streamName: sdkKey.fullSubject }).catch(err => {
			throw Error(err, "Cannot publish; there is no stream connected.");
		});
	}

	async _createStreams() {
		this.jsm.streams.add({
			name     : ruleset.streamName,
			subjects : [ `${ruleset.streamName}.*` ],
			storage  : 'memory',
			max_msgs : 1
		});
		this.jsm.streams.add({
			name     : sdkKey.streamName,
			subjects : [ `${sdkKey.streamName}.*` ],
			storage  : 'memory',
			max_msgs : 1
		});

		const dataStreamInfo = await this.jsm.streams.info(ruleset.streamName);
		const keyStreamInfo = await this.jsm.streams.info(sdkKey.streamName);
	}

	async _addConsumers(jsm) {
		await this.jsm.consumers.add(ruleset.streamName, {
			durable_name : 'dataStream',
			ack_policy   : AckPolicy.Explicit
		});

		await this.jsm.consumers.add(sdkKey.streamName, {
			durable_name : 'keyStream',
			ack_policy   : AckPolicy.Explicit
		});
	}

	async _checkStreamsCreated() {
		try {
			let data = await this.jsm.streams.info(ruleset.streamName);
			let key = await this.jsm.streams.info(sdkKey.streamName);

			return data.config.name === ruleset.streamName && key.config.name === sdkKey.streamName;
		} catch (err) {
			return false;
		}
	}
}

const jsw = new JetstreamWrapper();
module.exports = jsw;

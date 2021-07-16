const { connect, AckPolicy } = require('nats');
let nc;
let js;

async function createJetStreamConnect() {
	nc = await connect({ servers: 'localhost:4222' });
	js = nc.jetstream();
}

async function createStreams() {
	await createJetStreamConnect();
	const jsm = await nc.jetstreamManager();

	jsm.streams.add({ name: 'DATA', subjects: [ 'DATA.*' ], storage: 'memory', max_msgs: 1 }); //max_age: 300000000})
	Jsm.streams.add({ name: 'KEY', subjects: [ 'KEY.*' ], storage: 'memory', max_msgs: 1 });

	const dataStreamInfo = await jsm.streams.info('DATA');
	const keyStreamInfo = await jsm.streams.info('KEY')

	await addConsumers(jsm);
}

async function addConsumers(jsm) {
	await jsm.consumers.add('DATA', {
		durable_name : 'dataStream',
		ack_policy   : AckPolicy.Explicit
	});

	await jsm.consumers.add('KEY', {
		durable_name : 'keyStream',
		ack_policy   : AckPolicy.Explicit
	});
}

async function streamsCreated() {
	await createJetStreamConnect();
	const jsm = await nc.jetstreamManager();

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

exports.createStreams = createStreams;
exports.streamsCreated = streamsCreated;

'use strict';
const { CompositionManager } = require('app-compositor');

const modules = [
	require('./Modules/sink'),
	require('./Modules/streamer'),
	require('./Modules/subscriber'),
	require('./Modules/repository'),
	require('./Modules/publisher'),
	require('./Modules/services'),
	require('./Modules/projectionBuilder'),
	require('./Modules/projectionDB')
];

const app = new CompositionManager();
app.runModules(modules).done(async function({ streamer, subscriber, services }) {
	streamer.start();
	subscriber.queue('eventLogger').bind('*.*').listen(function({ event, commit }) {
		console.log('* %s.%s: %j', commit.aggregateType, event.eventType, event.eventPayload);
	})
	const registerUser = services.service('registerUser');
	registerUser({ userID: '15231-zvKGJZOzjfn', name: 'Karol', password: 'test' });
});
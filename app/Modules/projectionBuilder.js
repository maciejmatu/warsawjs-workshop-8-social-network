'use strict';

const esdf = require('esdf');

const eventHandlers = {
	'User.Registered': function(db, event, commit) {
		return Promise.all([
			db.ref(`/profiles/${commit.sequenceID}`).update({
				ID: commit.sequenceID,
				name: event.eventPayload.name,
				posts: []
			})
		])
	}
}

module.exports = function() {
	this.requires('subscriber');
	this.requires('projectionDB');
	this.provides('projectionBuilder', function({ subscriber, projectionDB }) {
		subscriber.queue('projectionBuilder').bind('*.*').listen(function({ event, commit }) {
			const eventName = `${commit.aggregateType}.${event.eventType}`;

			if (eventHandlers[eventName]) {
				return eventHandlers[eventName](projectionDB, event, commit);
			}
		})
	})
}
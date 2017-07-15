'use strict';

const esdf = require('esdf');
const bcrypt = require('bcrypt');

class User extends esdf.core.EventSourcedAggregate {
	constructor() {
		super();

		this._isRegistered = false;
		this._userName = null;
		this._email = null;
		this._password = null;
	}

	 async register({ name, email, password }) {
		if (this._isRegistered) return;

		this._stageEvent(new esdf.core.Event('Registered', { name, email, password: await bcrypt.hash(password, 10) }));
	}

	onRegistered(event) {
		this._isRegistered = true;
		const { name, email, password } = event.eventPayload;

		this._userName = name;
		this._email = email;
		this._password = password;
	}

	getName() {
		return this._userName;
	}

	isRegistered() {
		return this._isRegistered;
	}
}

module.exports = User;
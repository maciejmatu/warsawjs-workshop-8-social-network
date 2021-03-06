'use strict';

const firebase = require('firebase');
const esdf = require('esdf');

const handleDBError = (err) => {
	console.log('\x1b[31m', err);
	process.exit();
}

module.exports = function() {
	this.provides('projectionDB', function() {
		const firebaseConfig = {
			apiKey: "AIzaSyApVF-KjclfUFTKohxlF2aGTQxqH3L8WAI",
			authDomain: "workshop-social-network.firebaseapp.com",
			databaseURL: "https://workshop-social-network.firebaseio.com",
			projectId: "workshop-social-network",
			storageBucket: "workshop-social-network.appspot.com",
			messagingSenderId: "882117164594"
		};
		const app = firebase.initializeApp(firebaseConfig);
		const db = app.database();

		if (!process.env.EMAIL || !process.env.PASSWORD) handleDBError('No db password and login provided');

		return app.auth().signInWithEmailAndPassword(process.env.EMAIL, process.env.PASSWORD)
			.then(() => db)
			.catch((err) => handleDBError(err.message));
	});
}

'use strict';

const User = require('../Entities/User');
const assert = require('assert');

describe('User', function() {

	describe('#constructor', function() {
		it('should not register the user right away', function() {
			const user = new User();
			assert.equal(user.isRegistered(), false);
		})
	});

	describe('#registered', function() {
		it('should make the user registered', async function() {
			const user = new User();
			await user.register({ name: 'Maciej', email: 'maciek@matu.com', password: 'testsaet' });
			assert.equal(user.isRegistered(), true);
			assert.equal(user.getName(), 'Maciej');
		})
		it('should be idempotent', async function() {
			const user = new User();
			await user.register({ name: 'Maciej', email: 'maciek@matu.com', password: 'testsaet' });
			const beforeCount = user.getStagedEvents().length;
			await user.register({ name: 'Maciej', email: 'maciek@matu.com', password: 'testsaet' });
			const afterCount = user.getStagedEvents().length;
			assert.equal(beforeCount, afterCount);
		});
	});
})
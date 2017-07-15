'use strict';

const esdf = require('esdf');
const serviceFunctions = require('../DomainServices');

module.exports = function() {
	this.requires('repository');
	this.provides('services', function({ repository }) {
		const serviceContainer = new esdf.services.ServiceContainer();
		serviceContainer.addResource('repository', repository);

		Object.keys(serviceFunctions).forEach(function(serviceName) {
			serviceContainer.addService(serviceName, serviceFunctions[serviceName]);
		});
		return serviceContainer;
  });
};
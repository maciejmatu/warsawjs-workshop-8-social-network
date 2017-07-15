const User = require('../Entities/User');

module.exports = async function registerUser({ repository, config }, params) {
	return await repository.invoke(User, params.userID, function(userInstance) {
		return userInstance.register(params, { config });
	});
};
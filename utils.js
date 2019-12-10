const jwt = require('jsonwebtoken');
const env = require('./config/env');

function requestAuth(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Token ', '');
    const {userId} = jwt.verify(token, env.APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated.');
};

module.exports = {
  requestAuth,
};

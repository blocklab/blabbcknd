var ethereumGateway = require('./../boundaries/ethereum_gateway');

module.exports = {
  moveTokens: function(from, to, amount) {
    ethereumGateway.moveTokens(from, to, amount);
  }
};
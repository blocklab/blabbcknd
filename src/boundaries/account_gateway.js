var Account = require('../model/account');

var accounts = [
  new Account(1, 'mail1@test.com', 'pw1', '0xf19f24526c0f804b9ddb7d9d80521f9e7e638819'),
  new Account(2, 'mail2@test.com', 'pw2', '0x7e3098562ba4e34a904c5b412197763d418966bb'),
  new Account(3, 'mail3@test.com', 'pw3', '0x957fcd52e975bde95b61e5f6057eab44d916a211')
];

module.exports = {
  fetchAllEtherAddresses: function() {
    return accounts.map(function(account) {
      return account.getEtherAddress();
    });
  },
  fetchEthereumAddressFor: function(accountId) {
    return accounts.filter(function(account) {
      return account.getId() === accountId;
    })[0].getEtherAddress();
  },
  fetchAccountByEmail: function(email) {
    return accounts.filter(function(account) {
      return account.getEmail() === email;
    })[0];
  }
};
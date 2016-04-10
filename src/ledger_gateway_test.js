var expect = require('chai').expect;
var td = require('testdouble');
var ethereumGatewayTd = td.replace('./boundaries/ethereum_gateway');
var ledger_gateway = require('./ledger_gateway');

describe('ledger gateway', function() {
  it('provides balance for an account id', function() {
    td.when(ethereumGatewayTd.balanceOf('accountId')).thenReturn(1000);

    var ledgerEntry = ledger_gateway.balanceOf('accountId');

    expect(ledgerEntry.getAccountId()).to.equal('accountId');
    expect(ledgerEntry.getTokenAmount()).to.equal(1000);
  });

  it('provides list of balances for provided accountids', function() {
    td.when(ethereumGatewayTd.balanceOf('firstAccountId')).thenReturn(10);
    td.when(ethereumGatewayTd.balanceOf('secondAccountId')).thenReturn(11);

    var ledgerEntries = ledger_gateway.balancesForAllIn(['firstAccountId', 'secondAccountId']);

    expect(ledgerEntries.length).to.equal(2);
    expect(ledgerEntries[0].getTokenAmount()).to.equal(10);
    expect(ledgerEntries[1].getTokenAmount()).to.equal(11);
  });
});

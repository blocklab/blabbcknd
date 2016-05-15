var express = require('express');
var jwt = require('express-jwt');
var tokenSecret = require('./../security/tokensecret');
var SwaggerExpress = require('swagger-express-mw');

var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var process = require('process');

module.exports = {
  start: function() {
    var web3setup = require('./../blockchain/web3_setup');
    web3setup.setup();

    var useTokenInAuthorizationHeader = function fromHeader (req) {
      var authorizationHeader = req.get('Authorization');
      return authorizationHeader ? authorizationHeader : null;
    };

    var AUTHORIZATION_PATH = '/auth';
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/docs', express.static('swagger-ui'));
    app.use(jwt(
      {
        secret: tokenSecret.get(),
        getToken: useTokenInAuthorizationHeader
      }
    ).unless({path: [AUTHORIZATION_PATH, '/swagger', '/docs']}));

    var config = {
      appRoot: process.cwd() + '/src'
    };

    SwaggerExpress.create(config, function(err, swaggerExpress) {
      if (err) { throw err; }

      swaggerExpress.register(app);
      app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
    });
  }
};
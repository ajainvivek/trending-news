'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

var _natural = require('./natural');

var _natural2 = _interopRequireDefault(_natural);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

	// mount natural
	api.use('/natural', (0, _natural2.default)());

	// perhaps expose some API metadata at the root
	api.get('/trending', function (req, res) {
		var Twit = require('twit');

		var twit = new Twit({
			consumer_key: 'w7jh87GEfzuy3kMC2rFR4vaYy',
			consumer_secret: 'ZMQgtVKvWJWszLP8dvXdfHMcaBxYiJwiajfemEqKtD2ABxvrcp',
			app_only_auth: true
		});

		twit.get('trends/place', { id: 1105779 }, function (err, data, response) {
			// let message = data[0].trends[0].query;
			twit.get('search/tweets.json', { q: '%22Shaun+Marsh%22' }, function (err, data) {
				console.log(data);
			});
			// console.log(message);
			// data[0].trends.map((t) => {  });


			res.json({ data: data });
		});
	});

	return api;
};
//# sourceMappingURL=index.js.map
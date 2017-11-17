'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _facets = require('../models/facets');

var _facets2 = _interopRequireDefault(_facets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;
	return (0, _resourceRouterMiddleware2.default)({

		/** Property name to store preloaded entity on `request`. */
		id: 'facet',

		fetchTrendData: function fetchTrendData(_ref2, res) {
			_objectDestructuringEmpty(_ref2);

			var Twit = require('twit');

			var twit = new Twit({
				consumer_key: 'w7jh87GEfzuy3kMC2rFR4vaYy',
				consumer_secret: 'ZMQgtVKvWJWszLP8dvXdfHMcaBxYiJwiajfemEqKtD2ABxvrcp',
				app_only_auth: true
				// access_token:         '...',
				// access_token_secret:  '...'
			});

			twit.get('trends/place', { id: 1105779 }, function (err, data, response) {

				console.log(data.data[0].trends[0].query);
				res.json(data.data[0].trends[0].query);
			});
		},


		/** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
		load: function load(req, id, callback) {
			var facet = _facets2.default.find(function (facet) {
				return facet.id === id;
			}),
			    err = facet ? null : 'Not found';
			callback(err, facet);
		},


		/** GET / - List all entities */
		index: function index(_ref3, res) {
			var params = _ref3.params;

			res.json(_facets2.default);
		},


		/** POST / - Create a new entity */
		create: function create(_ref4, res) {
			var body = _ref4.body;

			body.id = _facets2.default.length.toString(36);
			_facets2.default.push(body);
			res.json(body);
		},


		/** GET /:id - Return a given entity */
		read: function read(_ref5, res) {
			var facet = _ref5.facet;

			res.json(facet);
		},


		/** PUT /:id - Update a given entity */
		update: function update(_ref6, res) {
			var facet = _ref6.facet,
			    body = _ref6.body;

			for (var key in body) {
				if (key !== 'id') {
					facet[key] = body[key];
				}
			}
			res.sendStatus(204);
		},


		/** DELETE /:id - Delete a given entity */
		delete: function _delete(_ref7, res) {
			var facet = _ref7.facet;

			_facets2.default.splice(_facets2.default.indexOf(facet), 1);
			res.sendStatus(204);
		}
	});
};
//# sourceMappingURL=facets.js.map
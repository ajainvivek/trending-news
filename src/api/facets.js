import resource from 'resource-router-middleware';
import facets from '../models/facets';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'facet',

	fetchTrendData({}, res){
		var Twit = require('twit');

		var twit = new Twit({
			consumer_key:         'w7jh87GEfzuy3kMC2rFR4vaYy',
			consumer_secret:      'ZMQgtVKvWJWszLP8dvXdfHMcaBxYiJwiajfemEqKtD2ABxvrcp',
			app_only_auth:        true,
			// access_token:         '...',
			// access_token_secret:  '...'
		});

		twit.get('trends/place', { id: 1105779}, function(err, data, response) {

			console.log(data.data[0].trends[0].query);
			res.json(data.data[0].trends[0].query);
		})
	},

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let facet = facets.find( facet => facet.id===id ),
			err = facet ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(facets);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = facets.length.toString(36);
		facets.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});

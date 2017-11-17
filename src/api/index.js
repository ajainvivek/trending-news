import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import natural from './natural';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// mount natural
	api.use('/natural', natural());

	api.get('/trending', (req, res) => {
		var Twit = require('twit');

		var twit = new Twit({
			consumer_key:         'w7jh87GEfzuy3kMC2rFR4vaYy',
			consumer_secret:      'ZMQgtVKvWJWszLP8dvXdfHMcaBxYiJwiajfemEqKtD2ABxvrcp',
			app_only_auth:        true,
		});

		twit.get('trends/place', { id: 1105779}, (err, data) => {
			let trends = data[0].trends.slice(0, 5);
			var queries = trends.map((t) => {
				return twit.get('search/tweets', {q: t.query});
			});
			Promise.all(queries).then((results) =>{
				var all = results.map((r, index) => {
					var tweets = r.data.statuses.slice(0, 3);
					var name = tweets[0].entities.hashtags[0] && tweets[0].entities.hashtags[0].text || trends[index].name.replace('#', '');

					var texts = tweets.map((tweet) => {
						let allTexts = tweet.text.split(' ');
						let filtered = allTexts.slice(1, allTexts.length -1);
						if(filtered[0].startsWith('@')){
							filtered = filtered.slice(1, filtered.length)
						}
						var filteredText = filtered.join(' ');
						return filteredText.replace(trends[index].name, name);
					});
					var id = tweets[0].id;
					return {id, name, texts, tweets};
				});

				res.json(all)
			});
		})
	});

	return api;
}

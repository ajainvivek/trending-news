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

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}

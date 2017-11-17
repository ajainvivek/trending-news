import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import trending from './trending';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// mount natural
	api.use('/trending', trending());

	return api;
}

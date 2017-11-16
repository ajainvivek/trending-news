import resource from 'resource-router-middleware';

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'natural',

	index({ query }, res) {
		res.json({hello: 'world'});
	}
});

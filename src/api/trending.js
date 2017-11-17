import resource from 'resource-router-middleware';
import nlp from './../services/nlp';

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'natural',

	index({ query }, res) {
		nlp.groupedSimilarity().then((response) => {
			res.json(response);
		});
	}
});

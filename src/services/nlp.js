import jaccard from './../factory/jaccard';
import collection from './collection';
import twitter from './twitter';
import lodash from 'lodash';

const groupByTweet = function (collections, tweets, key, index = 0.1) {
	const result = {};
	debugger;
	// group by tweet name
	for (let i = 0; i < tweets.length; i++) {
		result[tweets[i].name] = [];
		for (let j = 0; j < collections.length; j++) {
			let text = typeof tweets[i][key] === 'string' ? tweets[i][key] : tweets[i][key].join(',');
			let abstract = (collections[j].abstract || collections[j].links[0].abstract || '').replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")
			let scoreIndexSEO = jaccard.similarity(text, collections[j].seo_headline);
			let scoreIndexAbstract = jaccard.similarity(text, abstract);
			if (scoreIndexSEO > index || scoreIndexAbstract > index) {
				let trending = {};
				trending.id = collections[j].id;
				trending.rank = i + 1;
				trending.collection = collections[j];
				trending.social = tweets[i];
				result[tweets[i].name].push(trending);
			}
		}
	}
	return result;
}


exports.groupedSimilarity = function () {
	return new Promise((resolve, reject) => {
		Promise.all([collection.getLatestArticles(), twitter.trendingTweets()]).then((result) => {
			const groupByTweetName = groupByTweet(result[0], result[1], 'name', 0.1);
			resolve(groupByTweetName);
		});
	});
}


exports.ranked = function () {

}
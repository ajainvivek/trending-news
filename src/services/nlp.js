import jaccard from './../factory/jaccard';
import collection from './collection';
// import twitter from './twitter';
import twitter from './mockedTwitter';
import lodash from 'lodash';

const groupByTweet = function (collections, tweets, key, index = 0.1) {
	const result = {};
	// group by tweet name
	for (let i = 0; i < tweets.length; i++) {
		result[tweets[i].name] = [];
		for (let j = 0; j < collections.length; j++) {
			let text = Array.isArray(tweets[i][key]) ? tweets[i][key][0] : tweets[i][key];
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
			const articles = [];
			const groupByTweetName = groupByTweet(result[0], result[1], 'name', 0.1);
			const filteredArticles = lodash.forOwn(groupByTweetName, (value, key) => {
				let trend = {};
				if (value.length > 0) {
					trend.name = key;
					trend.data = value;
					articles.push(trend);
				}
			});
			//const groupByTweetText = groupByTweet(result[0], result[1], 'texts', 0.2);
			resolve(articles);
		});
	});
}


exports.ranked = function () {

}
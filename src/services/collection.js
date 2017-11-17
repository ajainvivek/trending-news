import http from 'http';

exports.getLatestArticles = function () {
	return new Promise((resolve, reject) => {
		http.get('http://y7mobile.query.yahoo.com/v1/alCollection?bucketId=&collection=%2Faunews%2Funiversal%2Fhome-stream&limit=100&offset=0&profile=everest-collection', (res) => {
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					resolve(parsedData.assets.result[0].assets);
				} catch (e) {
					console.error(e.message);
				}
			});
		});
	});
}
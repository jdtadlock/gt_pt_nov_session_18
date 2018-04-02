// const Nightmare = require('nightmare');
// const nightmare = Nightmare({ show: true });

const cheerio = require('cheerio');
const request = require('request');

module.exports = function(app) {
	app.post('/scrape', (req, res) => {
		let url = `https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=${req.body.search}&ignorear=0&N=-1&isNodeId=1`;

		request(url, (err, response, body) => {
			let $ = cheerio.load(body);

			let results = Array.from($('.items-view .item-container a.item-img img').map((i, image) => {
				return $(image).attr('src');
			}));
			
			res.send(results);
		});
	});
}















// module.exports = function(app) {
// 	app.post('/scrape', (req, res) => {
// 		// nightmare.end();
// 		nightmare
// 			.goto('https://www.newegg.com/')
// 			.type('#haQuickSearchBox', req.body.search)
// 			.click('.search-bar-btn')
// 			.wait('.items-view .item-container a.item-img img')
// 			.evaluate(() => {
// 				console.log('inside doc')
// 				return Array.from(
// 				document.querySelectorAll('.items-view .item-container a.item-img img'))
// 					.map(img => img.src)
// 			})
// 			.end()
// 		  .then((result) => {
// 		  	console.log('fired');
// 		  	res.send(result);
// 		  })
// 		  .catch(error => {
// 		    console.error('Search failed:', error)
// 		  });
// 	});
// }
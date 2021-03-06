var Twit  = require('twit');
var Cred = require('./credentials.js');
var Tabletop = require('tabletop');

// be sure to npm install or yarn install tabletop

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
});

// to get the URL go to the google spreadsheet page with the file tab then click publish on web and then grab that URL
var spreadsheetUrl = 'URL FROM GOOGLE SPREADSHEETS';

// Grabs the data from the sheets and then post it on twitter
Tabletop.init({
  key: spreadsheetUrl,
  callback: function(data, tabletop){
    console.log(data);
    data.forEach(function(d) {
      var status = d.URL + ' data from the google Sheet';

      // post on twitter
      bot.post('statuses/update', {status: status}, function(err, data, response){
      	if (err) {
      		console.log(err);
      	} else {
      		console.log('Posted!');
      	}
      });
    });
  }
});

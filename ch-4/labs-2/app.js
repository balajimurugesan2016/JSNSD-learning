const express = require('express');
const { finished } = require('stream');

const streamdata = require('./stream');
const app = express();

app.get('/data', (req, res, next) => {
	const stream = require('./stream')();
	stream.pipe(res, { end: false });

	finished(stream, (err) => {
		if (err) {
			next(err);
			return;
		}
		res.end();
	});
});

app.listen(3000, () => {
	console.log(`App listening to port ${3000}`);
});

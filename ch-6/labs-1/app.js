const express = require('express');
const app = express();
const model = require('./model');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3004;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, resp, next) => {


    if(!req.path.includes('/boat')) //req.get('content-Type') !== 'application/json'){
     {
        resp.status(400).end();
     }   
    next();

});

app.get('/boat/:id', (req, resp, next) => {
	const id = req.params.id;

	model.boat.read(id, (err, data) => {
		if (data) {
            resp.set('content-Type','application/json');
			resp.status(200).send(data);
		}
	});
});

app.post('/boat', (req, resp, next) => {
	const id = model.boat.uid();

	model.boat.create(id, req.body.data, (err, data) => {
		if (err) {
			if (err.code === 'E_RESOURCE_EXISTS') {
				resp.status(401).end();
			} else {
				resp.status(500).end();
			}
		}

		if (data) {
            resp.set('content-Type','application/json');
			resp.status(201).send({ id });
		}
	});
});


app.listen(port,() => {

    console.log(`App listening to port:${port}`)
})
'use strict';
const express = require('express');
const router = express.Router();
const app = express();
const model = require('./model');
const port = process.env.PORT || 3004;
const path = require('path');
const AutoLoad = require('fastify-autoload');
const sensible = require('fastify-sensible');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-

function validatebody(o) {
	let valid = o !== null && typeof o === 'object';
	valid = valid && o.hasOwnProperty('brand') && o.hasOwnProperty('color');

	valid = valid && typeof o.brand === 'string';
	valid = valid && typeof o.color === 'string';

	return (
		valid && {
			brand: o.brand,
			color: o.color,
		}
	);
}

app.use(function (req, res, next) {
	// .. some logic here .. like any other middleware
	next();
});

app.use(router);

	router.get('/boat/:id', (req, resp, next) => {
		const id = req.params.id;
	
		model.boat.read(id, (err, data) => {
			if (data) {
				resp.set('content-Type', 'application/json');
				resp.status(200).send(data);
			}
	
			if (err) {
				if (err.code === 'E_NOT_FOUND') {
					resp.status(404).end();
				} else {
					resp.status(500).end();
				}
			}
		});
	});
	
	router.post('/boat', (req, resp, next) => {
		const boatdata = req.body.data;
		//console.log(boatdata.brand);
	
		let sanitizedinp = validatebody(boatdata);
		
		if (!sanitizedinp) {
			console.log('status code 400');
			resp.status(400).end();
			
		} else {
			const uid = model.boat.uid();
	
			model.boat.create(uid, sanitizedinp, function (err) {
			
				if (err) {
					resp.status(500).send(err).end();
					
				} else {
					resp.set('content-Type', 'application/json');
					resp.status(201).send({ id: uid }).end();
					
				}
				
			});
		}
	});
	
	router.delete('/boat/:id', (req, resp, next) => {
		model.boat.del(id, (err) => {
			if (err) {
				if (err.code == 'E_NOT_FOUND') {
					resp.status(404).end();
				} else {
					resp.status(500).end();
				}
			} else {
				resp.status(204).end();
			}
		});
	});





app.listen(`${port}`, () => {
	console.log(`server running on port:${port}`);
});

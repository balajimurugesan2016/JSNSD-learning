const express = require('express');
const axios = require('axios');
const fastify = require('fastify');
const Autoload =  require('fastify-autoload')
const sensible =  require('fastify-sensible')
const got = require('got');
const { boat } = require('../../ch-5/labs-1/model');
const app = express();

const { PORT=3006, BOAT_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 4001 } = process.env;

const boatsrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

const { httpErrors } = fastify
app.get('/:id', async (req, resp, next) => {
	const id = req.params.id;

	try{
		const [ boat, brand ] = await Promise.all([
			got(`${boatsrv}/${id}`).json(),
			got(`${brandSrv}/${id}`).json()
		  ])
		  resp.send({
			  id: boat.id,
			  color:boat.color,
			  brand:brand.name
		  });
		 
	}
	catch(err){
		if (!err.response) resp.status(500).end();
		if (err.response["statusCode"] === 404) {
			resp.status(404).end()
		}

		if (err.response["statusCode"] === 400) {
			resp.status(400).end()
		  }
		resp.status(500).end()



	}
		




});

app.listen(`${PORT}`, () => {
	console.log(`App listening on port ${PORT}`);
});






/*	try {
		const boat = await new Promise(async (resolve, reject) => {
			const uri = `http://localhos:${BOAT_SERVICE_PORT}`;
			const endpoint = `${id}`;
            
            try{

			
			  const boatresp = await got(`${uri}/${endpoint}`);
			  if(boatresp.statusCode === 200){
				console.log(boatresp.body)
				resolve(boatresp);
			}
			}
			catch(err){

				reject(err);

			}


		
			
			  
              	
            
		});

		if (boat.statusCode === 200) {
			const brand = await new Promise(async (resolve, reject) => {
				const boatdata = JSON.parse(boat.body);
				const uri = `http://localhost:${BRAND_SERVICE_PORT}`;
				const endpoint = `${boatdata.id}`;
 
				try{
				const brandresp = await got(`${uri}/${endpoint}`);
				if(brandresp.statusCode === 200){
				  console.log(brandresp.body)
				  resolve(brandresp);
			  }
			}
			catch{
				reject(brandresp);
			}
				  
				
			  
			

			});

			const branddata = JSON.parse(brand.body);
			const boatdata = JSON.parse(boat.body);
			if (branddata.id) {
				boatdata.brand = branddata.name;
                console.log(branddata);
				resp.set('Content-Type', 'application/json');
                resp.send(boatdata);
			
			}
		}
	} catch (err) {
		console.log(err)
		if (!err.response) resp.status(500).end();
		if (err.statusCode === 404) {
			//throw httpErrors.notFound();
			resp.status(404).end();
		}
		if (err.statusCode === 400) {
			//throw httpErrors.badRequest();
			resp.status(404).end();
		}
		resp.status(500).end();
	} */
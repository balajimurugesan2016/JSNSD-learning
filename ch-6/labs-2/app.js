const express = require('express');
const app = express();
const model = require('./model');
const port = process.env.PORT || 3004;

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

        if(err){
			if(err.code === "E_NOT_FOUND") {
				resp.status(404).end();
			}
			else{
                resp.status(500).end();
			}
			
		}
	});

});

app.delete('/boat/:id', (req, resp, next) => {
	const id = req.params.id;

	model.boat.del(id, (err) => {
		if (err) {
			if (err.code == 'E_NOT_FOUND') {
				resp.status(404).end();
			} else {
				resp.status(500).end();
			}
		}
        else{
            resp.status(204).end();
        }

	
	});
});


app.listen(port,() => {

    console.log(`App listening to port:${port}`)
})
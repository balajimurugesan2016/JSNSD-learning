const express = require('express');
const app = express();
const port =  process.env.PORT || 3001;
const model = require('./model');



app.use((req, res, next)=> {

	if(!req.path.startsWith('/boat')){

		res.status(400);

	}

	next();

})

app.get('/boat/:id',function(req,res,next) {

	const id = req.params.id;

	model.boat.read(id, (err,data) => {
		if (data) {
			res.set('Content-Type', 'application/json');
			res.status(200).send(data);
		}

		if(err){
			if(err.code === "E_NOT_FOUND") {
				res.status(404).send(err).end();
			}
			else{
                res.status(500).send(err).end();
			}
			
		}
})
});


/*app.use((req, res, next) => {

    if(req.path.startsWith('/boat')){
      
	const id = req.path.split('/')[2];

	try{

	
	model.boat.read(id, (err,data) => {
		if (data) {
			res.set('Content-Type', 'application/json');
			res.status(200).send(data);
		}

		if(err){
			if(err.code === "E_NOT_FOUND") {
				res.status(404).send(err).end();
			}
			else{
                res.status(500).send(err).end();
			}
			
		}
    

	});
}
catch(e){
	res.status(500).end;
}
}
else
{
    res.status(400);
}
	next();
}); */

app.listen(port,()=>{
  console.log(`server is running on port: ${port}`)

})

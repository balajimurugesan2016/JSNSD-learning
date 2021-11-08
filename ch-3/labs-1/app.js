let express = require('express');
let file = require('./data');
let app = express();

app.use( async function(req,resp,next){

    if(req.path == '/'){
        resp.send(await file());
    }
    else
    {
      
       resp.status(404);
       next();

    }

   // next();

})

app.listen(3000);
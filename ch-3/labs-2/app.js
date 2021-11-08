const express = require('express');
//const createError = require('http-errors');
const app = express();


app.use((req,res,next)=>{

    if(req.method === 'GET'){
      
        res.send('');
       

    }

    if(req.method === 'POST'){
    
        res.status(405).send('Method not allowed')
      

    }
})

app.listen(3000);






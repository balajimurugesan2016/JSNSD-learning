'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  setTimeout(() => {

      const inp  = req.query.un;
      let out = "";
      if(Array.isArray(inp)){
           out = (inp[0] || '').toUpperCase()  + (inp[1] || '').toUpperCase();
      }
      else
      {
              out = (req.query.un || '').toUpperCase()
      }

    res.send(out);
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})
const express = require('express')
const { response } = require('express');
const Twitter=require('./api/helpers/twitter');
const twitter= new Twitter();
const app = express()
const port = 3000
require('dotenv').config()

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  next();
})

app.get('/tweets', (req, res) => {
    //console.log(req.query)
    const query=req.query.q;
    const count=req.query.count;
    const maxId=req.query.max_id;
  //  const url="https://api.twitter.com/1.1/search/tweets.json"
    twitter.get(query,count,maxId).then((response)=>{
       // console.log(response.data);
       res.status(200).send(response.data);
    }).catch((error)=>{
        // console.log(error);
        res.status(400).send(error);
    })


  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Twittern app listening at http://localhost:${port}`)
})
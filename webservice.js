const express = require('express');
const url = require('url');
const app = express();
const port = 8080;

app.get('/ping', (req, res) => {
    res.send("pong");
});

/*
app.get('/add/:a/:b', (req, res) => {
    console.log(new Number(req.params.a));
    console.log(new Number(req.params.b));
    let a = new Number(req.params.a);
    let b = new Number(req.params.b);
    let sum = (a + b);
    console.log(sum);
    res.send(sum.toString());
});
*/

app.get('/add', (req, res)=>{
    let parsedUrl = url.parse(req.url, true);
    let a = new Number(parsedUrl.query.a);
    let b = new Number(parsedUrl.query.b);
    let sum = (a + b);
    console.log(sum);
    res.send(sum.toString());
});

app.use('/static-files/%7Bfilename.ext%7D', express.static('static'));


app.listen(port, () => {
    
    console.log('The server started on: 8080 port.');
});


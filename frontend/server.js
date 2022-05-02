const express = require ('express')
//const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

 
const PORT = process.env.PORT || 4200
//const api = require('./routes/api')
const server = express()

//server.use(bodyParser.json())  // I think bodyParser not needed at some point with nodejs & express. 
server.use(express.json({extended: false})); // use querystring library
server.use(cors())
 
//app.use(express.static(__dirname + '/dist/intro-shop-fe'));
// Point static path to dist
server.use(express.static(path.join(__dirname, 'build')));
 
//app.use('/api', api)
server.get('/hello', function(req, res){
    res.send('Hello from NodeJS Server on Heroku with Angular')
})
 
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));           // works
    //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));           // example
    //res.sendFile(path.join(__dirname, 'dist/bike-ui/index.html')); // does not work
    //res.sendFile('index.html', {root: './dist/bike-ui'});          // does not work
  });
 
server.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})
 

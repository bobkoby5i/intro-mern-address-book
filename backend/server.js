const express = require('express');
const PORT = process.env.PORT || 3000
const server = express();

server.get('/',(req, res) => res.json({msg: 'Welcome to address book API'}));

server.get('/hello', function(req, res){
    console.log('GET /hello');    
    res.send('Hello from Server')
})


server.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
// server.listen(PORT, console.log(`server started on port ${PORT}`))  <- co za roznica ? !
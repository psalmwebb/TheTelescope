const express = require('express');
const app = express();
const cors = require('cors')
const {json,urlencoded} = require("express")
const port = process.env.PORT || 5000; 

app.use(cors())
app.use(json());
app.use(urlencoded({extended : true}));

app.use(express.static(__dirname + '/dist'));

app.get("*",(req,res)=>{
    res.sendFile(__dirname + '/dist/index.html');
})


const server = app.listen(port, ()=> console.log(`app is running on port ${port}`));

require("./wss")(server)  // Websocket implementation





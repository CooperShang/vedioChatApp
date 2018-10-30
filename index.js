const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();

//Body parser middleware
app.use(bodyParser.json());
//Session middleware
app.use(bodyParser.urlencoded({extended:true}));

//Create an instance of pusher
const pusher = new Pusher({
  appId:'635843',
  key:'d90f791321b6f53229af',
  secret:'ac468a71d89337bd7e74',
  cluster:'us2',
  encrypted:true
});

app.get('/',(req,res) => {
  return res.sendFile(__dirname + '/index.html');
});

//Listen on the app
app.listen(6688,() => {
  return console.log("Server is up on 6688")
});

//get authentictation for the channel
app.post("/pusher/auth",(req,res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
    user_id:
      Math.random().toString(36).slice(2) + Date.now()
  };
  const auth = pusher.authenticate(socketId,channel,presenceData);
  res.send(auth);
});

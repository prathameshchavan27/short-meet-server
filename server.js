const express = require('express');
const mongoose = require('mongoose');
const Room = require('./model/roomModal');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect("mongodb+srv://prathamesh27:patu2772j@cluster0.uwbqak1.mongodb.net/rooms")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDb");
  });

app.post("/createRoom",async(req,res)=>{
    const {roomId, password} = req.body;
    console.log(req.body);
    const roomData = {
        roomId: roomId,
        password: password
    }
    const response = await Room.findOne({roomId: roomId});
    console.log("RSS",response)
    if(response && (response.roomId===roomId && response.password===password)){
        return;
    }
    console.log(roomData);
    const room = new Room(roomData)
    try {
        const saveRoom = await room.save();
        console.log(saveRoom);
        res.status(200).json(saveRoom);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get("/room",async(req,res)=>{
    const roomId = req.query.roomId;
    const password = req.query.password;
    console.log("Params:",req.query);
    try {
        const room = await Room.findOne({roomId: roomId,password: password});
        console.log("R",room);
        if(room && room.roomId===roomId && room.password===password){
            res.status(200).json(room);
        }else{
            return;
        }
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("/room/:roomId",async(req,res)=>{
  try{
    const room = await Room.findOne({roomId: req.params.roomId});
    room.deleteOne();
    res.status(200).json("delete successfully");
  }catch (err){
    res.status(400).json(err);
  }
}

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

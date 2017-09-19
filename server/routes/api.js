const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const video = require('../models/video');
const db = "mongodb://teja:helloworld@ds135514.mlab.com:35514/myplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
  if(err){
    console.log("Error! " + err);
  }else {
    console.log("connection established");
  }
});

router.get('/videos', function (req,res) {
  console.log('Get all videos');
  video.find({})
    .exec(function (err, videos) {
  if(err) {
      console.log("error retrieving videos ");
  } else {
    res.json(videos);
  }
    })
});

router.get('/videos/:id', function (req,res) {
  console.log('Get single videos');
  video.findById(req.params.id)
    .exec(function (err, video) {
      if(err) {
        console.log("error retrieving video ");
      } else {
        res.json(video);
      }
    });
});

router.post('/video', function (req, res) {
  console.log('post a  video');
  var newVideo = new video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err, insertedVideo) {
    if(err){
      console.log("error saving video");
    } else {
      res.json(insertedVideo);
    }
  });

});

router.put('/video/:id',function (req,res) {
  console.log("update a video");
  video.findByIdAndUpdate(req.params.id,
    {
      $set: {title:req.body.title, url:req.body.url, description:req.body.description}
    },
    {
      new:true
    },
    function (err, updatedVideo) {
      if(err){
        res.send("error updating video");
      }else{
        res.json(updatedVideo);
      }
    });
});

router.delete('/video/:id',function (req, res) {
  console.log("deleting a video");
  video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if(err){
      res.send("error deleting video");
    }else{
      res.send(deletedVideo);
    }
  });
});

module.exports  = router;

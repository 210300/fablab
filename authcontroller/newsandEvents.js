const express = require('express');
const news  = require('../model/newsandEvents');
const multer = require('multer');
const event = express.Router()
const team = require('../model/team')

function checkAuth(req, res,next){
    if (req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
        next();
    }else{
        req.flash('error_message', "Please login to continue !");
        res.redirect('/team-login');
    }
  }

event.get('/Events', function(req, res){
    if(req.isAuthenticated()){
      team.findOne({}, function(err, result){
        res.render('admindashboard/news',{logged:true} );
      })
    }else{
      res.render('admindashboard/team/updateteam', {logged: false})
    }
   
      
  })
//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, 'public/NewsandEvents');
    },
  
    //add back the extension
    
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
   
  });
//   upload parameters for multer
  const upload = multer({storage: storage});
  
  event.post('/addnews', upload.single('image'), async (request, response) => {

    let events = new news({
      title: request.body.title,
      description: request.body.description,
      image: request.file.filename
    });
  
    try {
      events = await events.save();
  
      response.redirect(`/viewnews`);
    } catch (error) {
      console.log(error);
    }
});
event.get('/viewnews', function(req, res){
    if(req.isAuthenticated()){
      team.findOne({}, function(err, result){
        news.find({}, function(err, data){
          if(err) throw err;
          res.render('admindashboard/createNews', {data, logged:true});
        })
      })
    }else{
      res.render("admindashboard/team/updateteam", {logged:false});
    }
    
    
  })

event.get('/undo/:id', (req, res) => {
    news.findByIdAndRemove(req.params.id, (err, doc) => {
        // console.log(req.params.id);
        if (!err) {
            res.redirect('/viewnews');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = event;

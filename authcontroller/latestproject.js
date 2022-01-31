const express = require('express')
const latest = require('../model/latestpro')
const team = require('../model/team')
const latestpro = express.Router()
const multer = require('multer');


function checkAuth(req, res,next){
  if (req.isAuthenticated()){
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
      next();
  }else{
      req.flash('error_message', "Please login to continue !");
      res.redirect('/team-login');
  }
}
//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, 'public/images');
  },

  //add back the extension
  
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
 
});

//upload parameters for multer
const upload = multer({storage: storage});


latestpro.get('/latestproject', function(req, res){
  if(req.isAuthenticated()){
    team.findOne({}, function(err, result){
      res.render('admindashboard/latestpro',{logged:true} );
    })
  }else{
    res.render('admindashboard/team/updateteam', {logged: false})
  }
 
    
})


//route that handles new post
latestpro.post('/upload', upload.single('image'), async (request, response) => {

    let blog = new latest({
      title: request.body.title,
      description: request.body.description,
      image: request.file.filename
    });
  
    try {
      blog = await blog.save();
  
      response.redirect(`/latest`);
    } catch (error) {
      console.log(error);
    }
  });
  
  latestpro.get('/latest', function(req, res){
    if(req.isAuthenticated()){
      team.findOne({}, function(err, result){
        latest.find({}, function(err, data){
          if(err) throw err;
          res.render('admindashboard/createproject', {data, logged:true});
        })
      })
    }else{
      res.render("admindashboard/team/updateteam", {logged:false});
    }
    
    
  })

  latestpro.get('/takeout/:id', (req, res) => {
    latest.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/latest');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = latestpro;
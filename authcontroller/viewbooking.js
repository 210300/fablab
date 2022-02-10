const express = require('express')
const baking = require('../model/booking')
const team = require('../model/team');
const equipment = require('../model/equipment');
const userBook = require('../model/userBooking');
const multer = require('multer');
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/auth');

const booking = express.Router()
//multer
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, 'public/imageEquipments');
    },
  
    //add back the extension
    
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
   
  });
  
  //upload parameters for multer
  const upload = multer({storage: storage});

function checkAuth(req, res,next){
    if (req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
        next();
    }else{
        req.flash('error_message', "Please login to continue !");
        res.redirect('/team-login');
    }
  }
 

booking.get('/viewbooking', ensureAuthenticated,function(req,res){
    if (req.isAuthenticated()) {
        team.findById({}, function(err, results){
            baking.find({}).sort({'date':'asc'}).exec((err, result)=>{
                res.render('./admindashboard/booking/viewbooking', {
                    result,
                    logged: true,
                    
                });
        
            })
        })
      } else {
          res.render("team-login", { logged: false });
      }
});
booking.get('/delete/:id', (req, res) => {
    baking.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/viewbooking');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

// for viewing equipment booked by user
booking.get('/EquipmentBook', function(req,res){
    if(req.isAuthenticated()){
        userBook.find({}).sort({'Date':'asc'}).exec((err, result)=>{
            res.render('admindashboard/booking/viewUserBooked', {logged: true, result})
        });
    
    }else{
        res.render('admindashboard/team/updateteam',{logged:false});
    }
})

booking.get('/remove/:id', (req, res) => {
    userBook.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/EquipmentBook');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

//for adding electronic lab
booking.get('/addEquipemnt', function(req,res){
    if(req.isAuthenticated()){
        res.render('admindashboard/booking/uploadEqu', {logged: true});
    }else{
        res.render('admindashboard/team/updateteam', {logged:false});
    }
    
})

// for adding Carpentary lab
booking.get('/addCarpentary', function(req,res){
    if(req.isAuthenticated()){
        res.render('admindashboard/booking/uploadCarpentary', {logged: true});
    }else{
        res.render('admindashboard/team/updateteam', {logged:false});
    }
    
})
// for adding Heavy machines
booking.get('/addHeavy', function(req,res){
    if(req.isAuthenticated()){
        res.render('admindashboard/booking/uploadHeavy', {logged: true});
    }else{
        res.render('admindashboard/team/updateteam', {logged:false});
    }
    
})
// for adding Metals lab
booking.get('/addMetal', function(req,res){
    if(req.isAuthenticated()){
        res.render('admindashboard/booking/uploadMetal', {logged: true});
    }else{
        res.render('admindashboard/team/updateteam', {logged:false});
    }
    
})

//for posting Electronic lab
booking.post('/uploadequip',upload.single('image'), async (request, response) => {
    let ment = new equipment({
        equipmentName: request.body.equipName,
        image: request.file.filename,
        description: request.body.description,
        type: 'electronic',
      });
    
      try {
        blog = await ment.save();
    
        response.redirect(`/viewequipment`);
      } catch (error) {
        console.log(error);
      }
})




// for posting Carpentary lab
booking.post('/uploadCar',upload.single('image'), async (request, response) => {
    let ment = new equipment({
        equipmentName: request.body.equipName,
        image: request.file.filename,
        description: request.body.description,
        type: 'carpentary',
      });
    
      try {
        blog = await ment.save();
    
        response.redirect(`/viewcarpentary`);
      } catch (error) {
        console.log(error);
      }
})

//for posting heavy machines lab
booking.post('/uploadHeav',upload.single('image'), async (request, response) => {
    let ment = new equipment({
        description: request.body.description,
        equipmentName: request.body.equipName,
        image: request.file.filename,
        type: 'heavyMachine',
      });
    
      try {
        blog = await ment.save();
    
        response.redirect(`/viewheavy`);
      } catch (error) {
        console.log(error);
      }
})
// for posting metal lab
booking.post('/uploadMetal',upload.single('image'), async (request, response) => {
    let ment = new equipment({
        equipmentName: request.body.equipName,
        description: request.body.description,
        image: request.file.filename,
        type: 'metal',
      });
    
      try {
        blog = await ment.save();
    
        response.redirect(`/viewmetal`);
      } catch (error) {
        console.log(error);
      }
});
// for viewing electronic lab 
booking.get('/viewequipment', ensureAuthenticated, function(req,res){
    if (req.isAuthenticated()){
        equipment.find({'type': 'electronic'}, function(err, data){
            if(err) throw err;
            res.render('admindashboard/booking/viewEquipment', {logged:true, data});
        
        })
        
    }else{
        res.render('team-login', {logged:false});
    }
    
});
// for viewing carpentary lab 
booking.get('/viewcarpentary', ensureAuthenticated, function(req,res){
    if (req.isAuthenticated()){
        equipment.find({"type": "carpentary"}, function(err, data){
            if(err) throw err;
            res.render('admindashboard/booking/viewCarpentary', {logged:true, data});
        
        })
        
    }else{
        res.render('team-login', {logged:false});
    }
    
});
// for viewing heavy machinery lab 
booking.get('/viewheavy', ensureAuthenticated, function(req,res){
    if (req.isAuthenticated()){
        equipment.find({'type': 'heavyMachine'}, function(err, data){
            if(err) throw err;
            res.render('admindashboard/booking/viewHeavy', {logged:true, data});
        
        })
        
    }else{
        res.render('team-login', {logged:false});
    }
    
});
// for viewing metal  lab 
booking.get('/viewmetal', ensureAuthenticated, function(req,res){
    if (req.isAuthenticated()){
        equipment.find({'type':'metal'}, function(err, data){
            if(err) throw err;
            res.render('admindashboard/booking/viewMetal', {logged:true, data});
        
        })
        
    }else{
        res.render('team-login', {logged:false});
    }
    
});
module.exports = booking;
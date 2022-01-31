const { Router } = require("express");
const express = require("express");
const router = express.Router();
const booking = require('../model/booking');
const auth = require('../controller/booking/auth');
const user = require('../model/users');
const equipment = require('../model/equipment');



function checkAuth(req, res,next){
    if (req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
        next();
    }else{
        req.flash('error_message', "Please login to continue !");
        res.redirect('login');
    }
}

router.get('/search', function(req,res){
    try{
        user.find({}, function(err, resl){
            equipment.find({$or:[{equipmentName: {'$regex':req.query.dsearch}}]}, (err, data)=>{
                if(err){
                    console.log('err');
                }else{
                    res.render('./booking/index', {data:data, username:req.user.username});
                }
            })
        })
        
    }catch(error){
        console.log(error);
    }
})


router.get('/carpentary', function(req, res){
    user.findById({}, function(err, result){
    if(req.isAuthenticated()){
        equipment.find({'type':'carpentary'}, function(err, resl){
            res.render('booking/carpentary', {logged:true, resl, username: req.user.username,});
        })
    }else{
        res.render('login', {logged: false });
    }
});
});

router.get('/booking', function(req, res){
    user.findById({}, function(err, result){
        
        if(req.isAuthenticated()){
            equipment.find({'type': 'electronic'}, function(err, data){
            res.render('./booking/index', {logged: true, username: req.user.username, data});
        });
        }else{
            res.render('login', {logged: false });
        }
    
})
});
router.get('/heavy', function(req, res){
    user.findById({}, function(err, result){
        
        if(req.isAuthenticated()){
            equipment.find({'type': 'heavyMachine'}, function(err, resl){
            res.render('./booking/heavy', {logged: true, username: req.user.username, resl});
        });
        }else{
            res.render('login', {logged: false });
        }
    
})
});
router.get('/metalinfo', function(req, res){
    user.findById({}, function(err, result){
        
        if(req.isAuthenticated()){
            equipment.find({'type': 'metal'}, function(err, data){
            res.render('./booking/metal', {logged: true, username: req.user.username, data});
        });
        }else{
            res.render('login', {logged: false });
        }
    
})
});

router.get('/yourBooking', function(req, res){
    if(req.isAuthenticated()){  
        const email = req.user.email;
        user.findById({email}, function(err, result){
            
            booking.find({user:email}).sort({'date':'asc'}).exec(function(err, data){
                res.render('bookingPersonal', {data, logged:true, username:req.user.username});
            })
        });
    }else{
        res.render('login', {logged:false})
    }
    
    
})
router.get('/:date', function(req, res){
   const date = req.params.date;
   
    booking.find({date:date}, (err, result)=>{
        // console.log(result);
        res.json(result);
     
        
    });
});


module.exports = router

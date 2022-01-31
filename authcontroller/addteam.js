const express = require('express')
const team = require('../model/team')
const bcrypt = require('bcryptjs')
const passport = require('passport');
require('../controller/passportLocal')(passport);
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/auth');
const member  = express.Router()
const jwt = require('jsonwebtoken');

function checkAuth(req, res,next){
  if (req.isAuthenticated()){
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
      next();
  }else{
      req.flash('error_message', "Please login to continue !");
      res.redirect('/team-login');
  }
}
member.get('/admindashboard',ensureAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    team.findOne({}, (err, result)=>{
      console.log(result)
      res.status(200).render("admindashboard/index", { logged: true});
    });
  } else {
      res.render("team-login", { logged: false });
  }
});

      
member.get('/add-member',ensureAuthenticated, function(req, res){
  if(req.isAuthenticated()){
    team.findOne({}, function(err, result){
      res.render('admindashboard/team/addteam', {logged:true, name:result.name});
    });
  }else{
    res.redirect("team-login", {logged:false});
  }
  
   
  
})
member.post("/create-member", async (req, res) => {
  try {
    // Get user input
    const { name, machine, email, password, token } = req.body;

    // Validate user input
    if (!(email && password && name && machine)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const Oldteam = await team.findOne({ email });

    if (Oldteam) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = new  team({
      name,
      machine,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      token
    });

    // Create token
    const toke = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = toke;
    await user.save();

    // return new user
    res.status(201).redirect("view-member");
  } catch (err) {
    console.log(err);
  }
});
member.get('/view-member', function(req, res){
  if (req.isAuthenticated()) {
    team.find({}, function(err, result){
      res.render('admindashboard/team/viewteam', {result,logged:true, name: result.name});
    })
  } else {
      res.render("admindashboard/team/updateteam", { logged: false });
  }
    
  
});
member.get('/team-login',forwardAuthenticated, function(req, res){
    res.render('admindashboard/team/updateteam')
      
})



member.post('/update-login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admindashboard',
    failureRedirect: '/team-login',
    failureFlash: true
  })(req, res, next);
});
member.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = member
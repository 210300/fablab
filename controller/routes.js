const express = require('express');
const router = express.Router();
const user = require('../model/users');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);
// require('./googleAuth')(passport);
const userRoutes = require('./userRoutes');
const logger = require('../config/logger');
const equipment = require('../model/equipment');
const newsandevents = require('../model/newsandEvents')
router.use(express.json());

//for logger 
// router.use((req, res, next) => {
//     logger.info(req.body);
//     let oldSend = res.render;
//     res.render = function (data) {
//       logger.info(data);
//       oldSend.apply(res, arguments);
//     }
//     next();
//   })

function checkAuth(req, res,next){
    if (req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check= 0, pre-check=0');
        next();
    }else{
        req.flash('error_message', "Please login to continue !");
        res.redirect('/login');
    }
}

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { logged: true });
        logger.customerLogger.log('info','successfully');
    } else {
        res.render("index", { logged: false });
        logger.customerLogger.log('error', 'not login')
    }
});
router.get('/register', (req, res) => {
    res.render("register");
});


router.get('/signup', (req, res) => {
    res.render("signup");
});
router.get('/community', (req, res) => {
    res.render("community");
});
router.get('/startup', (req, res) => {
    res.render("startup");
});
router.get('/company', (req, res) => {
    res.render("company");
});
router.get('/login', (req, res) => {
    res.render("login");
});



//signup for student
router.post('/signup', (req, res) => {
    // get all the values 
    const { email, username, phoneNumber, schoolName, gender, files, password, confirmpassword, } = req.body;
    // check if the are empty 
    if (!email || !username  || !password || !confirmpassword ) {
        res.render("signup", { err: "All Fields Required !"});
        logger.customerLogger.log('error', 'All the Fields are required')
    } else if (password != confirmpassword) {
        res.send("signup", { err: "Password Don't Match !", data:"password didn't match"});
        logger.customerLogger.log('error', "password didn't match")

    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("signup", { err: "User Exists, Try Logging In !" });
                logger.customerLogger.log('error', " User Exists, Try Logging In  ")

            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            username: username,
                            email: email,
                            password: hash,
                            phoneNumber: phoneNumber,
                            schoolName: schoolName,
                            gender:gender,
                            files:files,
                            googleId: null,
                            provider: 'email',
                            userType:'student'
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            
                            res.redirect('/profile');
                            logger.customerLogger.log('info', 'sugnup successfully')
                        });
                    })
                });
            }
        });
    }
});
//registration for community
router.post('/community', (req, res) => {
    // get all the values 
    const { organizationName, Location, phoneNumber, email, password, confirmpassword, } = req.body;
    // check if the are empty 
    if (!email || !organizationName  || !password || !confirmpassword ) {
        res.render("community", { err: "All Fields Required !"});
    } else if (password != confirmpassword) {
        res.render("community", { err: "Password Don't Match !" });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: organizationName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("community", { err: "User Exists, Try Logging In !"});
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            username: organizationName,
                            email: email,
                            password: hash,
                            phoneNumber: phoneNumber,
                            schoolName: Location,
                            googleId: null,
                            provider: 'email',
                            userType:'community'
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            
                            res.redirect('/profile');
                        });
                    })
                });
            }
        });
    }
});

//sigup for startup
router.post('/startup', (req, res) => {
    // get all the values 
    const { firmName, Location, phoneNumber, email, password, confirmpassword, } = req.body;
    // check if the are empty 
    if (!email || !firmName  || !password || !confirmpassword ) {
        res.render("startup", { err: "All Fields Required !"});
    } else if (password != confirmpassword) {
        res.render("startup", { err: "Password Don't Match !"});
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: firmName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("startup", { err: "User Exists, Try Logging In !"});
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            username: firmName,
                            email: email,
                            password: hash,
                            phoneNumber: phoneNumber,
                            schoolName: Location,
                            googleId: null,
                            provider: 'email',
                            userType:'startup',
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                           
                            res.redirect('/profile');
                        });
                    })
                });
            }
        });
    }
});
//for bussiness
router.post('/company', (req, res) => {
    // get all the values 
    const { email, companyName, phoneNumber,Location, gender, password, confirmpassword, } = req.body;
    // check if the are empty 
    if (!email || !companyName  || !password || !confirmpassword ) {
        res.render("company", { err: "All Fields Required !"});
    } else if (password != confirmpassword) {
        res.render("company", { err: "Password Don't Match !" });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: companyName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("company", { err: "User Exists, Try Logging In !" });
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            username: companyName,
                            email: email,
                            password: hash,
                            phoneNumber: phoneNumber,
                            schoolName: Location,
                            gender:gender,
                            googleId: null,
                            provider: 'email',
                            userType: 'company',
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            
                            res.redirect('/profile');
                        });
                    })
                });
            }
        });
    }
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/profile', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('profile', { username: req.user.username, verified : req.user.isVerified, email:req.user.email,
    schoolName: req.user.schoolName, phoneNumber: req.user.phoneNumber });

});
router.get('/about',(req,res) =>{
    if (req.isAuthenticated()) {
        res.render("about", { logged: true });
    } else {
        res.render("about", { logged: false });
    }
})
router.get('/electronic', (req,res) =>{
    equipment.find({"type": "electronic"}, function(err, data){
        if (req.isAuthenticated()){
            if(err) throw err;
            res.render('electronic', {data, logged:true});
        }else{
            res.render('electronic', {data, logged:false});
        }
    })  
})
router.get('/heaveymachine', (req,res) =>{
    equipment.find({"type": "heavyMachine"}, function(err, data){
        if (req.isAuthenticated()){
            if(err) throw err;
            res.render("heavymachine", {data, logged:true});
        }else{
            res.render("heavymachine", {data, logged:false});
        }
    })
})
router.get('/metal', (req,res) =>{
    equipment.find({"type": "metal"}, function(err, data){
        if (req.isAuthenticated()){
            if(err) throw err;
            res.render('metal', {data, logged:true});
        }else{
            res.render('metal', {data, logged:false});
        }
    })  
})
router.get('/machine', (req,res) =>{
    equipment.find({"type": "carpentary"}, function(err, data){
    if (req.isAuthenticated()){
        if(err) throw err;
        res.render('machine', {data, logged:true});
    }else{
        res.render('machine', {data, logged:false});
    }
})  
});
router.get('/equipment/(:id)', (req,res) =>{
    equipment.findById(req.params.id, function(err, data){
        // console.log(data);
        if (req.isAuthenticated()){
            if(err) throw err;
            res.render('book', {data, logged:true});
        }else{
            res.render('book', {data, logged:false});
        }
    })  
    
})



router.get('/program', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("program", { logged: true });
    } else {
        res.render("program", { logged: false });
    }
})
router.get('/trainingprogram', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("trainingprogram", { logged: true });
    } else {
        res.render("trainingprogram", { logged: false });
    }
})
router.get('/research', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("research", { logged: true });
    } else {
        res.render("research", { logged: false });
    }
})
router.get('/announ', (req,res) =>{
    newsandevents.find({}, function(err, data){
        // console.log(data);
        if (req.isAuthenticated()){
            if(err) throw err;
            res.render('newsandevents', {data, logged:true});
        }else{
            res.render('newsandevents', {data, logged:false});
        }
    })  
})
router.get('/resource', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("resource", { logged: true });
    } else {
        res.render("resource", { logged: false });
    }
})
router.get('/gallery', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("gallery", { logged: true });
    } else {
        res.render("gallery", { logged: false });
    }
})
router.get('/service', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("service", { logged: true });
    } else {
        res.render("service", { logged: false });
    }
})
router.get('/frontbooking', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("frontendBooking", { logged: true });
    } else {
        res.render("frontendBooking", { logged: false });
    }
})

router.get('/stemfile', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("stemfile", { logged: true });
    } else {
        res.render("stemfile", { logged: false });
    }
})
router.get('/fabacademy', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("fabacademy", { logged: true });
    } else {
        res.render("fabacademy", { logged: false });
    }
})
router.get('/induction', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("induction", { logged: true });
    } else {
        res.render("induction", { logged: false });
    }
})
router.get('/operate', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("operate", { logged: true });
    } else {
        res.render("operate", { logged: false });
    }
})
router.get('/inventure', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("inventure", { logged: true });
    } else {
        res.render("inventure", { logged: false });
    }
})

router.get('/resourceinside', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("resourceinside", { logged: true });
    } else {
        res.render("resourceinside", { logged: false });
    }
})
router.get('/trainingresource', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("trainingresource", { logged: true });
    } else {
        res.render("trainingresource", { logged: false });
    }
})
router.get('/machinemanual', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("machinemanual", { logged: true });
    } else {
        res.render("machinemanual", { logged: false });
    }
})
router.get('/video', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("vidoe", { logged: true });
    } else {
        res.render("vidoe", { logged: false });
    }
})
router.get('/team', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("team", { logged: true });
    } else {
        res.render("team", { logged: false });
    }
})

router.get('/inventure1', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("inventure2", { logged: true });
    } else {
        res.render("inventure2", { logged: false });
    }
})
router.get('/operate1', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("operator1", { logged: true });
    } else {
        res.render("operator1", { logged: false });
    }
})

router.use(userRoutes);
module.exports = router;
const express = require('express');
const router = express.Router();
const user = require('../model/users');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);
// require('./googleAuth')(passport);
const userRoutes = require('./userRoutes');


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
    } else {
        res.render("index", { logged: false });
    }
});
router.get('/register', (req, res) => {
    res.render("register");
});


router.get('/signup', (req, res) => {
    res.render("signup",{ csrfToken: req.csrfToken() });
});
router.get('/community', (req, res) => {
    res.render("community",{ csrfToken: req.csrfToken() });
});
router.get('/startup', (req, res) => {
    res.render("startup",{ csrfToken: req.csrfToken() });
});
router.get('/company', (req, res) => {
    res.render("company",{ csrfToken: req.csrfToken() });
});
router.get('/login', (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
});



//signup for student
router.post('/signup', (req, res) => {
    // get all the values 
    const { email, username, phoneNumber, schoolName, gender, files, password, confirmpassword, } = req.body;
    // check if the are empty 
    if (!email || !username  || !password || !confirmpassword ) {
        res.render("signup", { err: "All Fields Required !", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("signup", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("signup", { err: "User Exists, Try Logging In !", csrfToken: req.csrfToken() });
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
                            console.log(data);
                            res.redirect('/profile');
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
        res.render("community", { err: "All Fields Required !", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("community", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: organizationName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("community", { err: "User Exists, Try Logging In !", csrfToken: req.csrfToken() });
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
                            console.log(data);
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
        res.render("startup", { err: "All Fields Required !", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("startup", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: firmName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("startup", { err: "User Exists, Try Logging In !", csrfToken: req.csrfToken() });
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
                            console.log(data);
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
        res.render("company", { err: "All Fields Required !", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("company", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: companyName }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("company", { err: "User Exists, Try Logging In !", csrfToken: req.csrfToken() });
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
                            console.log(data);
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
    res.render('profile', { username: req.user.username, verified : req.user.isVerified });

});
router.get('/about',(req,res) =>{
    if (req.isAuthenticated()) {
        res.render("about", { logged: true });
    } else {
        res.render("about", { logged: false });
    }
})
router.get('/electronic', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("electronic", { logged: true });
    } else {
        res.render("electronic", { logged: false });
    }
})
router.get('/heaveymachine', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("heavymachine", { logged: true });
    } else {
        res.render("heavymachine", { logged: false });
    }
})
router.get('/machine', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("machine", { logged: true });
    } else {
        res.render("machine", { logged: false });
    }
})

router.get('/membership', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("membership", { logged: true });
    } else {
        res.render("membership", { logged: false });
    }
})
router.get('/metal', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("metal", { logged: true });
    } else {
        res.render("metal", { logged: false });
    }
})
router.get('/program', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("program", { logged: true });
    } else {
        res.render("program", { logged: false });
    }
})
router.get('/readmore', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("readmore", { logged: true });
    } else {
        res.render("readmore", { logged: false });
    }
})
router.get('/resource', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("resource", { logged: true });
    } else {
        res.render("resource", { logged: false });
    }
})
router.get('/service', (req,res) =>{
    if (req.isAuthenticated()) {
        res.render("service", { logged: true });
    } else {
        res.render("service", { logged: false });
    }
})



router.use(userRoutes);
module.exports = router;
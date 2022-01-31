const express = require('express')
const startup = express.Router()
const user = require('../model/users')

startup.get('/startupinformation', function(req, res) {
    user.find({$and: [{'isVerified': "false"}, {'userType': 'startup'}] }, (err, result)=>{
        if(!err){
            res.render('admindashboard/startup/startupinfo', {result,logged:true})
        }else{
            console.log(err);
        }
        // console.log('the data from the user table: \n', {result,logged:false});
    })
})
startup.get('/start/(:id)', function(req, res, next){
    user.findById(req.params.id, (err, result) =>{
        if(!err){
            res.render('admindashboard/startup/editstartup',{result, logged:true});
        }else{
           
            res.redirect('/startupinformation');
        }
    })
});
startup.post('/startup/(:id)', function(req,res){
    let id = req.params.id;
    
    var data = {
        username: req.body.username,
        schoolName: req.body.schoolName,
        email: req.body.email,
        phoneNumber : req.body.phoneNumber,
      
    }
    //save the modle
    user.findByIdAndUpdate(id, data, function(err, result){
        if(err) throw err;
        res.redirect('/startupinformation');
    })
 })
 startup.get('/delete/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/startupinformation');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = startup
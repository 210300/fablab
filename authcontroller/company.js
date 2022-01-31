const express = require('express')
const company = express.Router()
const user = require('../model/users')

company.get('/bussinessinformation', function(req, res) {
    user.find({$and: [{'isVerified': "false"}, {'userType': 'company'}] }, (err, result)=>{
        if(!err){
            res.render('admindashboard/bussiness/bussinessinfo', {result, logged:true})
        }else{
            console.log(err);
        }
        // console.log('the data from the user table: \n', {result, logged:false});
    })
})
company.get('/(:id)', function(req, res){
    user.findById(req.params.id, (err, result) =>{
        if(!err){
            res.render('admindashboard/bussiness/editbussiness',{result});
        }else{
           
            res.redirect('/bussinessinformation');
        }
    })
});
company.post('/(:id)', function(req,res){
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
        res.redirect('/bussinessinformation');
    })
 })
 
 company.get('/delete/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/bussinessinformation');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = company
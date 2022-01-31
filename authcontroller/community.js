const express = require('express')
const community = express.Router()
const user = require('../model/users')

community.get('/communityinformation', function(req, res) {
    user.find({$and: [{'isVerified': "false"}, {'userType': 'community'}] }, (err, data)=>{
        if(!err){
            res.render('admindashboard/community/communityinfo', {data, logged:true})
        }else{
            console.log(err);
        }
        // console.log('the data from the user table: \n', {data, logged:false});
    })
})

community.get('/(:id)', function(req, res, next){
    user.findById(req.params.id, (err, data) =>{
        if(!err){
            res.render('admindashboard/community/editcommunity',{data, logged:true});
        }else{
           
            res.render('admindashboard/community/communityinfo', {logged:false});
        }
    })
});
community.post('/community/(:id)', function(req,res){
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
        res.redirect('/communityinformation');
    })
 })
 

community.get('/delet/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/communityinformation');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = community;
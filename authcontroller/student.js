const express = require('express')
const router = express.Router()
const user = require('../model/users')
const team = require('../model/team');
const ObjectId = require('mongodb').ObjectId

router.get('/studentinfo', function(req, res) {
  
        user.find({$and: [{'isVerified': "false"}, {'userType': 'student'}] }, (err, result)=>{
            if(!err){
                res.render('admindashboard/student/studentinfo', {result, logged:true})
            }else{
                console.log(err);
            }
            // console.log('the data from the user table: \n', {result, logged:true});
        })

    
})


router.get('/student/(:id)', function(req, res, next){
    user.findById(req.params.id, (err, result) =>{
        if(!err){
            res.render('admindashboard/student/edituser',{result, username:result.username, logged:true, message:'success'});
        }else{
           
            res.redirect('admindashboard/student/studentinfo', {logged:false});
        }
    })
});

router.post('/(:id)', function(req,res){
   let id = req.params.id;
   
   var data = {
       username: req.body.username,
       schoolName: req.body.schoolName,
       email: req.body.email,
       phoneNumber : req.body.phoneNumber,
       files: req.body.files,
       gender: req.body.gender,
       isChecked : 'true',
   }
   //save the modle
   user.findByIdAndUpdate(id, data, function(err, result){
       if(err) throw err;
       console.log(result);
       res.redirect('studentinfo');
   })
})
router.get('/delete/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(req.params.id);
        if (!err) {
            res.redirect('/studentinfo');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;
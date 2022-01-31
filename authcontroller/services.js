const express = require('express');
const service = require('../model/service');
const team = require('../model/team');
const app = express.Router()

app.get('/addservice', function(req, res){
    if(req.isAuthenticated()){
        team.findOne({}, function(err, result){
            res.render('admindashboard/ser/service', {logged:true});
        })
    }else{
        res.render('admindashboard/team/updateteam', {logged:false})
    }
    
    
})


app.post('/services', function(req, res){
    let karma  = new service({
        title : req.body.title,
        description: req.body.description
    })
    try{
        karma.save();
        res.redirect('viewservices');
    }catch(err){
        console.log(err);
    }
})

app.get('/viewservices', function(req, res){
    if(req.isAuthenticated()){
        team.findOne({}, function(err, results){
            service.find({}, function(err, result){
                if(err) throw err;
                res.render('admindashboard/ser/viewservices', {result, logged:true});
            });
        })
    }else{
        res.render('admindashboard/team/update/team', {logged:fasle})
    }
    
    
})
module.exports = app
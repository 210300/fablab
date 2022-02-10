const { json, response } = require("express");
const booking = require('../../model/booking')
const router = require("../../routes/pages");
const user = require('../../model/users');
const equipment = require("../../model/equipment");
const userBooking = require('../../model/userBooking')

exports.DayBooking = async(req, res)=>{
  const bookingobj = JSON.parse(JSON.stringify(req.body));
  const obj3 = (JSON.parse(bookingobj.day));
  const Day = obj3.Dayval;
  const Date = obj3.Dateval;
  const email = req.user.email;
  // console.log(Date);
  try{

  
    userBooking.find({Date:Date}).count({Date}, function(err, data){
      // console.log(data);
        if(data <= 3){
            userBooking({
                Day : Day,
                Date : Date,
                user:email,
                
            }).save((err, result)=>{
                 res.send('You have successfully booked the induction training');    
            })
        }else{
             res.send('OPP!\n Seat is not available. \n Try another Date');
        }
    });
  }catch(err){
    console.log(err);
  }
}

exports.data = async (req, res) =>{
  const obj = JSON.parse(JSON.stringify(req.body));
    const obj2 = (JSON.parse(obj.date));
    
    const equipment_num = obj2.equipmentnum;
    const time = obj2.time;
    const date = obj2.date;
    const row = obj2.row;
    const col = obj2.col;
    const email = req.user.email;
    try{
      const a =  booking.find({$and: [{date:date},{row:row}, {col,col}]}, function(err, ddata){
      const b = booking.find({$and: [{user:email},{date:date}, {col:col}]}, function(err, datas){
        if(err){
          console.log(err);
        }else if(!ddata.length && !datas.length){
          user.findOne({$and: [{email}, {'isChecked':'true'}]}, function(err, resl){
            if(!resl){
               res.send('You cannot book! Please enroll for Induction Training');
            }else{
              booking.findOne({$and: [{date:date}, {col:col}, {user:email}]}, function(err, data){
                if(data){
                  res.send('You Cannot Book This! Try Booking Another');
                }else {
        
                  booking({
                    equipment:equipment_num,
                    times:time,
                    date:date,
                    row:row,
                    col:col,
                    user:email,
                  }).save((err, data) =>{
                    if(err) throw err;
                    // console.log(data);
                    res.send('successfully Booked');
                  })
                }       
              })
            }
            })  
        }else if(!ddata.length){
           res.send('OOP!!! \n You cannot select multiple machine at the same period. Try another time.');
        }else{
           res.send('OOP! \n You cannot book this machine because other person have already booked')
        }
      })
      })
        
  }
  catch(error){
    console.error(error);
  }
} 
  
exports.delete = function (req, res){
try{
    const obj = JSON.parse(JSON.stringify(req.body));
    const obj2 = (JSON.parse(obj.date));
    const equipment_num = obj2.equipmentnum;
    const time = obj2.time;
    const date = obj2.date;
    const row = obj2.row;
    const col = obj2.col; 
    const email = req.user.email; 
    booking.find({$and: [{date:date},{user:email}, {col:col}]},function(err,ddata){
      if(err){
        console.log(err);
      }else if(ddata.length){
        // console.log(ddata);
         booking.deleteOne({$and: [{date:date},{col:col}, {user:email}, {row:row}]},(err,result)=>{
          if(err){
            console.log(err);
          }else{
          console.log(result)
          return res.send("You have successfully cancel the booking");
          }
        });
      }else{
        return res.send('OPPS! \n you cannot cancel other booking')
      }
    })
    

             

}
catch(error){
  console.error(error);
  }
}





































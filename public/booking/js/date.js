//joinus modal 

function thusDayss() {
    var checkBoox = document.getElementById("thusday");
    var text = document.getElementById("selectThusday");
    if (checkBoox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
    }
    function friDayss() {
    var checkBoox = document.getElementById("friday");
    var text = document.getElementById("selectFriday");
    if (checkBoox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
    }




























// $(document).ready(function(){
//     var dtToday = new Date();
//     var day = ("0" + dtToday.getDate()).slice(-2);
//     var month = ("0" + (dtToday.getMonth() + 1)).slice(-2);

//     if(month > 12)
//     month = '0' + month.toString();
//     if(day < 10)
//     day =  day.toString();
//     var maxDate = dtToday.getFullYear()+"-"+(month)+"-"+(day) ;

//     document.getElementById('dateControl').value = maxDate;

//     $('#dateControl').attr('min',maxDate);


//     const date = $("#dateControl").val();
    
//         $.get('/'+ date, function(data, status) {
//             var row = "";
//             for(var i = 0; i < data.length; i++) {
//                 row = row + "<tr><td>" + data[i].equipment +"</td>" + "<td>" + data[i].times +"</td>" + "<td>" + data[i].date +"</td>" + "<td>" + data[i].UserMail + "<td>" + data[i].row+ "<td>" + data[i].col+"</td></tr>"; 
//             }
//             $("#booked-items").append(row);
//         });
//         $("#dateControl").change(() => {
//         const date = $("#dateControl").val();
    
//         $.get('/'+ date, function(data, status) {
//             console.log(data);
//             $("#booked-items").empty();
//             var row = "";
//             for(var i = 0; i < data.length; i++) {
//                 row = row + "<tr><td>" + data[i].equipment +"</td>" + "<td>" + data[i].times +"</td>" + "<td>" + data[i].date + "<td>" + data[i].UserMail + "<td>" + data[i].row+ "<td>" + data[i].col+ "</td></tr>"; 
//             }
//             $("#booked-items").append(row);
//         });
//     });
// })


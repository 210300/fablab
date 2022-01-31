// let node, parent;
// $(()=>{

//     $('td').on('click', (event) => {
//         node = event.target;
//         var res = $(node).parent()[0].id;
//         var col = $('th')[parseInt(node.className)+1].innerText;
//         document.querySelector("input[name='equipmentName']").value = $($(node).parent()[0]).children()[0].innerText;
//         document.querySelector("input[name='timeValue']").value = col;
//         var tddate = document.getElementById("dateControl").value;
//         document.getElementById("dateValue").innerHTML = tddate ;
//         $('.modal').toggleClass("show-modal");
       

//     });

//     var table = document.getElementById("table"),rIndex,cIndex;

//     for(var i = 1; i < table.rows.length; i++){
//         for(var j = 0; j < table.rows[i].cells.length; j++){
//             table.rows[i].cells[j].onclick = function()
//             {
//             rIndex = this.parentElement.rowIndex;
//             cIndex = this.cellIndex+1;
            
//             };
//         }
//     }

//     $('#btn-yes').on('click', (event) => {
//         $('.modal').toggleClass("show-modal");
//         $(node).addClass("btn-red");

//         console.log("Ordered Equipment " + $(node).parent()[0].id + " on " + $('th')[parseInt(node.className)+1].innerText);
//         var rowval= $($(node).parent()[0]).children()[0].innerText;
//         var colval = $('th')[parseInt(node.className)+1].innerText;
//         var dateval = document.getElementById("dateControl").value;
     
//         console.log("Row : "+rIndex+" , Cell : "+cIndex);
//         var f = JSON.stringify({equipmentnum: rowval, time: colval, date:dateval,  row: rIndex, col:cIndex});

//         $.post("/auth/data",
//             {
//                 date: f
//             },
//             function(data){
//                 alert( data);
//             });
            
//         $('#test').attr('class'); 

//     });

//     $('#btn-no').on('click', () => {
//         $('.modal').toggleClass("show-modal");
//         $(node).removeClass("btn-red");

//         console.log("Cancled Equipment " + $(node).parent()[0].id + " on " + $('th')[parseInt(node.className)+1].innerText);

//         var equipmentnum = $($(node).parent()[0]).children()[0].innerText;
//         var time = ($('th')[parseInt(node.className)+1].innerText);
//         var dateval = document.getElementById("dateControl").value;
        

//         var f = JSON.stringify({equipmentnum: equipmentnum, time: time, date:dateval, row: rIndex, col:cIndex});

//         $.post("/auth/delete",
//             {
//                 date: f
//             },
//             function(data){
//                 alert( data);
//             });
//     });

//     $(document).ready(function(){
//         var dtToday = new Date();
//         var day = ("0" + dtToday.getDate()).slice(-2);
//         var month = ("0" + (dtToday.getMonth() + 1)).slice(-2);
        
//         if(month > 12)
//         month = '0' + month.toString();
//         if(day < 10)
//         day =  day.toString();
//         var maxDate = dtToday.getFullYear()+"-"+(month)+"-"+(day) ;
        
//         document.getElementById('dateControl').value = maxDate;
        
//         $('#dateControl').attr('min',maxDate);
    
    
//         const date = $("#dateControl").val();
    
//             $.get('/'+ date, function(data, status) {

//                 for(var i =0 ; i < data.length; i++){
//                     var rowId = data[i].row;
//                     var colNum = data[i].col-1; 
                    
//                     // table.row[rowId].col[colNum].node.addClass("btn-red")
//                     var table = document.getElementById("table");
//                     table.rows[rowId].cells[colNum].bgColor = 'red';
//                 }
//             });
            
//             $("#dateControl").change(() => {
//             const date = $("#dateControl").val();
//             $.get('/'+ date, function(data, status) {
                
//                 $(node).removeClass("btn-red");

//                 for(var i = 1; i < table.rows.length; i++){
//                     for(var j = 0; j < table.rows[i].cells.length; j++){
//                         var tables = document.getElementById("table");
//                         tables.rows[i].cells[j].bgColor = 'white';
//                     }
//                 }

//                 for(var i =0 ; i <= data.length; i++){
//                     var rowId = data[i].row;
//                     var colNum = data[i].col-1;
//                     var tabl = document.getElementById("table");
//                     tabl.rows[rowId].cells[colNum].bgColor = 'red';
//                 }

//             });
//         });
//     })
    
//     $(document).ready(function(){
//         document.getElementById('navControl').innerHTML = navchg;
//         const navchg = $("#navControl").val();
//         $("#navControl").change(() => {
//             const navchg = $("#navControl").val();
//             $.get('/'+ navchg, function(dat, status) {
                
//                 $(node).removeClass("btn-red");

//                 for(var i = 1; i < table.rows.length; i++){
//                     for(var j = 0; j < table.rows[i].cells.length; j++){
//                         var tables = document.getElementById("table");
//                         tables.rows[i].cells[j].bgColor = 'white';
//                     }
//                 }

//                 for(var i =0 ; i <= data.length; i++){
//                     var rowId = dat[i].row;
//                     var colNum = dat[i].col-1;
//                     var tabl = document.getElementById("table");
//                     tabl.rows[rowId].cells[colNum].bgColor = 'red';
//                 }

//             });
//         });

//     })
//     // for booking day form for friday
//     $('#daysubmits').on('click', (event) => {
//         var Day = document.getElementById('friday').value;
//         var Date = document.getElementById("datepickers").value;
        
//         console.log(  " on "+Day+" ( " + Date + ") booked");
//         var b = JSON.stringify({ Dayval: Day, Dateval:Date});
        
//         $.post("/auth/DayBooking",
//             {
//                 day: b
//             },
//             function(result){
//                 alert(result)//popup messege from auth.js controller
//             })
//             // console.log(day)
            
//         // $('#test').attr('class'); 

//     });

//      // for booking day form for thursday
//      $('#daysubmit').on('click', (event) => {
//         var Day = document.getElementById('thusday').value;
//         var Date = document.getElementById("datepicker").value;
        
//         console.log(  " on "+Day+" ( " + Date + ") booked");
//         var b = JSON.stringify({ Dayval: Day, Dateval:Date});
        
//         $.post("/auth/DayBooking",
//             {
//                 day: b
//             },
//             function(result){
//                 alert(result)//popup messege from auth.js controller
//             })
//             // console.log(day)
            
//         // $('#test').attr('class'); 

//     });
// });	




































let node, parent;
$(()=>{

    $('td').on('click', (event) => {
        node = event.target;
        var res = $(node).parent()[0].id;
        var col = $('th')[parseInt(node.className)+1].innerText;
        document.querySelector("input[name='equipmentName']").value = $($(node).parent()[0]).children()[0].innerText;
        document.querySelector("input[name='timeValue']").value = col;
        var tddate = document.getElementById("dateControl").value;
        document.getElementById("dateValue").innerHTML = tddate ;
        $('.modal').toggleClass("show-modal");
       

    });

    var table = document.getElementById("table"),rIndex,cIndex;

    for(var i = 1; i < table.rows.length; i++){
        for(var j = 0; j < table.rows[i].cells.length; j++){
            table.rows[i].cells[j].onclick = function()
            {
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex+1;
            
            };
        }
    }

    $('#btn-yes').on('click', (event) => {
        $('.modal').toggleClass("show-modal");
        $(node).addClass("btn-red");

        console.log("Ordered Equipment " + $(node).parent()[0].id + " on " + $('th')[parseInt(node.className)+1].innerText);
        var rowval= $($(node).parent()[0]).children()[0].innerText;
        var colval = $('th')[parseInt(node.className)+1].innerText;
        var dateval = document.getElementById("dateControl").value;
     
        console.log("Row : "+rIndex+" , Cell : "+cIndex);
        var f = JSON.stringify({equipmentnum: rowval, time: colval, date:dateval,  row: rIndex, col:cIndex});

        $.post("/auth/data",
            {
                date: f
            },
            function(data){
                alert( data);
            });
            
        $('#test').attr('class'); 

    });

    $('#btn-no').on('click', () => {
        $('.modal').toggleClass("show-modal");
        $(node).removeClass("btn-red");

        console.log("Cancled Equipment " + $(node).parent()[0].id + " on " + $('th')[parseInt(node.className)+1].innerText);

        var equipmentnum = $($(node).parent()[0]).children()[0].innerText;
        var time = ($('th')[parseInt(node.className)+1].innerText);
        var dateval = document.getElementById("dateControl").value;
        

        var f = JSON.stringify({equipmentnum: equipmentnum, time: time, date:dateval, row: rIndex, col:cIndex});

        $.post("/auth/delete",
            {
                date: f
            },
            function(data){
                alert( data);
            });
    });

    $(document).ready(function(){
        var dtToday = new Date();
        var day = ("0" + dtToday.getDate()).slice(-2);
        var month = ("0" + (dtToday.getMonth() + 1)).slice(-2);
        
        if(month > 12)
        month = '0' + month.toString();
        if(day < 10)
        day =  day.toString();
        var maxDate = dtToday.getFullYear()+"-"+(month)+"-"+(day) ;
        
        document.getElementById('dateControl').value = maxDate;
        
        $('#dateControl').attr('min',maxDate);
    
    
        const date = $("#dateControl").val();
    
            $.get('/'+ date, function(data, status) {

                for(var i =0 ; i < data.length; i++){
                    var rowId = data[i].row;
                    var colNum = data[i].col-1; 
                    
                    // table.row[rowId].col[colNum].node.addClass("btn-red")
                    var table = document.getElementById("table");
                    table.rows[rowId].cells[colNum].bgColor = 'red';
                }
            });
            
            $("#dateControl").change(() => {
            const date = $("#dateControl").val();
            $.get('/'+ date, function(data, status) {
                
                $(node).removeClass("btn-red");
               
                // for(var i = 1; i <=table.rows.length; i ++){
                //     for(var j = 1; j <=table.rows[i].cells.length - 1; j++){
                //         // var tables = document.getElementById("table");
                //         // tables.rows[i].cells[j].bgColor = 'white';
                        
                //     }
                // }

                for(var i = 1; i < table.rows.length; i++){
                    for(var j = 0; j < table.rows[i].cells.length; j++){
                        var tables = document.getElementById("table");
                        tables.rows[i].cells[j].bgColor = 'white';
                    }
                }

                for(var i =0 ; i <= data.length; i++){
                    var rowId = data[i].row;
                    var colNum = data[i].col-1;
                    var tabl = document.getElementById("table");
                    tabl.rows[rowId].cells[colNum].bgColor = 'red';
                }

            });
        });
    })
    // for booking day form for friday
    $('#daysubmits').on('click', (event) => {
        var Day = document.getElementById('friday').value;
        var Date = document.getElementById("datepickers").value;
        
        console.log(  " on "+Day+" ( " + Date + ") booked");
        var b = JSON.stringify({ Dayval: Day, Dateval:Date});
        
        $.post("/auth/DayBooking",
            {
                day: b
            },
            function(result){
                alert(result)//popup messege from auth.js controller
            })
            // console.log(day)
            
        // $('#test').attr('class'); 

    });

     // for booking day form for thursday
     $('#daysubmit').on('click', (event) => {
        var Day = document.getElementById('thusday').value;
        var Date = document.getElementById("datepicker").value;
        
        console.log(  " on "+Day+" ( " + Date + ") booked");
        var b = JSON.stringify({ Dayval: Day, Dateval:Date});
        
        $.post("/auth/DayBooking",
            {
                day: b
            },
            function(result){
                alert(result)//popup messege from auth.js controller
            })
            // console.log(day)
            
        // $('#test').attr('class'); 

    });
});	



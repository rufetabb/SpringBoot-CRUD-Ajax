$(document).ready(function (){
    $("#update").hide();
    $("#cancel").hide();
    var count=0;
    var id2;
    showTable();
    $("table").on('click','button[id="delete"]',function (value) {
        var id1 =$(this).closest('tr').children('td:first').text();
        jQuery('html,body').animate({scrollTop:0},  'slow');
        $.ajax({
            type:'DELETE',
            url:"http://localhost:8088/employees/delete/"+id1,
            success:function (data){
                alertUsing("Deleted..",true);
                showTable();
            },
            error:function (data){
                console.log(data);
                alert(data);
            }

        });
    })

    //Edit button
    $('table').on('click','button[id="edit"]',function (value) {
        var id =$(this).closest('tr').children('td:first').text();
        let name=$(this).closest('tr').children('td:nth-child(2)').text();
        let surname=$(this).closest('tr').children('td:nth-child(3)').text();
        let age=$(this).closest('tr').children('td:nth-child(4)').text();

        $('#name').val(name);
        $('#surname').val(surname);
        $('#age').val(age);

        $('#update').show();
        $('#save').hide();
        $('#cancel').show();
        jQuery('html,body').animate({scrollTop:0},  0);

       id2=id;

    })
    //update button
    $('#update').click(function (){
        let result=inputValidation ();
        if (!result){
            return result;
        }
        console.log(id2);
        console.log(++count);

        let ageVal=parseInt($("#age").val());
        var jsonVar={
            name:$("#name").val(),
            surname:$("#surname").val(),
            age:ageVal
        }

        $.ajax({
            type:'PUT',
            data:JSON.stringify(jsonVar),
            url:"http://localhost:8088/employees/update/"+id2,
            contentType: "application/json",
            success:function (data) {
                alertUsing("Update..",true);
                $('#update').hide();
                $('#cancel').hide();
                $('#save').show();
                $('#name').val("");
                $('#surname').val("");
                $('#age').val("");
                showTable();

            },

            error:function (err){
                console.log(err);
                alert(err);
            }


        })


    })
//save button
    $('#save').click(function () {

       var result= inputValidation();
       if (!result){
           return result;
       }


        var jsonSave= {
           name: $('#name').val(),
           surname:$('#surname').val(),
           age:$('#age').val()

    }
             jQuery('html,body').animate({scrollTop:$(document).height()},  'slow');
       $.ajax({
           type:'POST',
           contentType:"application/json",
           data:JSON.stringify(jsonSave),
           url:"http://localhost:8088/employees/creat",
           success:function (data){
               alertUsing("Saved..",true)
               $('#name').val("");
               $('#surname').val("");
               $('#age').val("");
               showTable();



           },
           error:function (err){
               console.log(err);
               alert(err);
           }
       })
    })//save button end

    //cancel button
    $('#cancel').click(function () {
        $('#name').val("");
        $('#surname').val("");
        $('#age').val("");
        $("#update").hide();
        $("#save").show();
        $('#cancel').hide();


    })//cancel button end

    function  inputValidation(){
        var k=true;
        if ($('#name').val().length>50){
            alertUsing("Sorry,Name limit exceeded",false)
            k=false;
        } else if ($('#surname').val().length > 50) {
            alertUsing("Sorry,Surname limit exceeded", false);
            k = false;
        } else if ($('#age').val() > 150) {
            alertUsing("Sorry,Enter correct age", false);
            k = false;
        }
        if($('#name').val()=="" ){
            alertUsing("Pleas enter name",false)
            k=false;

        }
        else
        if($('#surname').val()=="" ){
            alertUsing("Pleas enter surname",false)
            k=false;

        } else
        if($('#age').val()=="" ){
            alertUsing("Pleas enter age",false)
            k=false;

        }

        return k;
    }




    function showTable() {
        // $('#myTable').html('');
        $('tbody').empty();
        $.ajax({
            type: 'GET',
            contentType: "application/json",
            url: "http://localhost:8088/employees/all",
            success:function (employees){
                for(let i in employees){
                    $('tbody').append("<tr >\
                    <td>"+employees[i].id+"</td>\
                    <td>"+employees[i].name+"</td>\
                    <td>"+employees[i].surname+"</td>\
                    <td>"+employees[i].age+"</td>\
                    <td>\
                    <button id='delete' class='btn btn-danger btn-hover'>Delete</button>\
                    <button id='edit' class='btn btn-primary btn-hover'>Edit</button>\
                    </td>\
                    </tr>");

                }
            },
            error:function (data){
                console.log(data);
            }


        });


    }

    function alertUsing(text, flag) {

        var alert = $(".alert");

        if(flag){
            alert.removeClass("alert-danger").addClass("alert-success");
        }else{
            alert.removeClass("alert-success").addClass("alert-danger");

        }

        alert.fadeIn(400);
        alert.css("display", "block");
        alert.text(text);
        setTimeout(function() {alert.fadeOut();}, 2000);

    }



    });
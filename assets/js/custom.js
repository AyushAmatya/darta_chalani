$(document).ready(function(){

  $('#per_province').change(function(){
    var province_id = $('#per_province').val();
    // console.log(province_id);
    var base_url = $('#base').val();
    
    // var base_url = window.location;
   
    if(province_id != '')
    {
        $.ajax({
            url:base_url + "vacancy/fetch_district",
            method: "POST",
            data:{province_id:province_id},
            success:function(data) 
            {
                $('#per_district').html(data);
            }
        });
    }
    else
    {
        $('#per_district').html('<option value=""> Select District</option>');
    }
});

$('#mail_province').change(function(){
    var province_id = $('#mail_province').val();
    var base_url = $('#base').val();
    
    // var base_url = window.location;
   
    if(province_id != '')
    {
        $.ajax({
            url:base_url + "vacancy/fetch_district",
            method: "POST",
            data:{province_id:province_id},
            success:function(data) 
            {
                $('#mail_district').html(data);
            }
        });
    }
    else
    {
        $('#per_district').html('<option value=""> Select District</option>');
    }
});
// D. Address District Section Script  END-------------------------------------xxxxxxxxxxxxx-----------------------

// D. Address vdc Section Script  START-------------------------------------xxxxxxxxxxxxx-----------------------
$('#per_district').change(function(){
    var district_id = $('#per_district').val();
    var base_url = $('#base').val();
    
    // var base_url = window.location;
   
    if(district_id != '')
    {
        $.ajax({
            url:base_url + "vacancy/fetch_vdc",
            method: "POST",
            data:{district_id:district_id},
            success:function(data) 
            {
                $('#per_vdc').html(data);
            }
        });
    }
    else
    {
        $('#per_vdc').html('<option value=""> Select Municipality</option>');
    }
});

$('#mail_district').change(function(){
    var district_id = $('#mail_district').val();
    var base_url = $('#base').val();
    
    // var base_url = window.location;
   
    if(district_id != '')
    {
        $.ajax({
            url:base_url + "vacancy/fetch_vdc",
            method: "POST",
            data:{district_id:district_id},
            success:function(data) 
            {
                $('#mail_vdc').html(data);
            }
        });
    }
    else
    {
        $('#mail_vdc').html('<option value=""> Select Municipality</option>');
    }
});

// D. Address vdc Section Script  END-------------------------------------xxxxxxxxxxxxx-----------------------

});


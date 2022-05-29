$(document).ready(function(){

    // District & VDC Selected for edit page START --------------
    $(window).on("load",function(){
        var province_id = $('#per_province_selected').val();
        var district_id = $('#per_district_id_selected').val();
        var vdc_id = $('#per_vdc_id_selected').val();
        var mail_province_id = $('#mail_province_selected').val();
        var mail_district_id = $('#mail_district_id_selected').val();
        var mail_vdc_id = $('#mail_vdc_id_selected').val();
        // console.log(mail_province_id);
        // alert(mail_province_id);
        var base_url = $('#base').val(); 
        if(province_id != '')
        {
            $.ajax({
                url:base_url + "users/fetch_district",
                method: "POST",
                data:{province_id:province_id,district_id:district_id},
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
        if(district_id != '')
        {
            $.ajax({
                url:base_url + "users/fetch_vdc",
                method: "POST",
                data:{district_id:district_id,vdc_id:vdc_id},
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
        if(mail_province_id != '')
        {
            $.ajax({
                url:base_url + "users/fetch_district",
                method: "POST",
                data:{mail_province_id:mail_province_id,mail_district_id:mail_district_id},
                success:function(data) 
                {
                    $('#mail_district').html(data);
                }
            });
        }
        else
        {
            $('#mail_district').html('<option value=""> Select District</option>');
        }
        if(mail_district_id != '')
        {
            $.ajax({
                url:base_url + "users/fetch_vdc",
                method: "POST",
                data:{mail_district_id:mail_district_id,mail_vdc_id:mail_vdc_id},
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
    // District & VDC Selected for edit page END ------------------------------
    // Input Age after dob changed
	// $('input[id=age]').click(function(){
	// 	var dob = $('#dob').val();
	// 	var d = new Date(dob).getFullYear();
	// 	var today = new Date().getFullYear();
	// 	var age = today+56-d;
	// 	$('#age').val(age);		
	// 	// console.log(today.getFullYear());
	// });
    // Validation
    jQuery.validator.addMethod("exactlength", function (value, element, param) {
		return this.optional(element) || value.length == param;
	}, $.validator.format("Please enter exactly {0} characters."));
   
    $("form[id='profileEdit']").validate({
        rules: {
            first_name: {
                required: true,
            },
            // middle_name: {
            //     required: true,
            // },
            last_name: {
                required: true,
            },
            religion: {
                required: true,
            },
            ethnicity: {
                required: true,
            },
            region: {
                required: true,
            },
            mother_tongue: {
                required: true,
            },
            dob: {
                required: true,
            },
            citizenship_no: {
                required: true,
            },
            ctz_issue_date: {
                required: true,
                // exactlength:10,
            },
            // ctz_issue_district_id: {
            //     required: true,
            // },
            father_name: {
                required: true,
            },
            father_qualification: {
                required: true,
            },
            fm_occupation: {
                required: true,
            },
            mother_name: {
                required: true,
            },
            mother_qualification: {
                required: true,
            },
            grandfather_name: {
                required: true,
            },
            grandfather_nationality: {
                required: true,
            },
            per_ward_no: {
                required: true,
            },
            per_tole: {
                required: true,
            },
            mail_ward_no: {
                required: true,
            },
            mail_tole: {
                required: true,
            },
            mobile_no: {
                required: true,
                exactlength: 10,
                digits: true
            },
            email_id : {
                email: true,
                required: true
            }
        },
        messages: {
            first_name              : "First Name is required",
            middle_name             : "Middle Name is required",
            last_name               : "Last Name is required",
            religion                : "Religion Name is required",
            mother_tongue           : "Mother tongue is required",
            ethnicity               : "Ethnicity is required",
            region                  : "Region is required",
            dob                     : "Date of Birth is required",
            citizenship_no          : "Citizenship Number is required",
            ctz_issue_date          : {
                         required   :    "Issue Date is required",
                         exactlength:    "Please enter full date"

                                        },
            ctz_issue_district_id   : "District is required",
            father_name             : "Father Name is required",
            father_qualification    : "Father qualification is required",
            fm_occupation           : "Occupation is required",
            mother_name             : "First Name is required",
            mother_qualification    : "Mother qualification is required",
            grandfather_name        : "Grandfather Name is required",
            grandfather_nationality : "Grandfather Nationality is required",
            per_ward_no             : "Ward Number is required",
            per_tole                : "Tole Name is required",
            mail_ward_no            : "Ward Number is required",
            mail_tole               : "Tole Name is required",
            mobile_no               : {
                        required    : "Mobile number is required",
                        exactlength : "Please enter 10 digit number",
                        digits      : "Please enter number only."
            },
            email_id : {
                email: "Please enter valid email",
                required: "Email field is required"
            }
        }           

    });

    $('#ethnicity').on('click',function(){
		
		var a = $('#ethnicity').find(":selected").text();
        console.log(a);
		if(a == 'Aadibasi/Janajati' || a == 'Dalit' || a == 'Vaishya' || a == 'Madhesi'){
			$('#ethnicity_file').css('display','block');
			$('#ethnicity_file').prop('required',true);
		}else{
			$('#ethnicity_file').css('display','none');
			$('#ethnicity_file').prop('required',false);
		}
	});

    $('#dob').on('change',function(){
		var dob = $('#dob').val();
        console.log(dob);
		var d = new Date(dob);
		var today = new Date();
		var Difference_In_Time = today.getTime() - d.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		var age = Math.floor((Math.floor(Difference_In_Days)) / 365)
		$('#age').val(age);	
	});

    $('#in_service').on('change',function(){
        var option = $('#in_service').val();
        if(option == 'N'){
            $('#inservice_view').css('display','none');
            $('#inservice_file').css('display','none');
            $('#inservice_file').prop('required',false);
        }else if(option == 'Y'){
            $('#inservice_file').css('display','block');
            $('#inservice_file').prop('required',true);
        }else{
            $('#inservice_view').css('display','none');
            $('#inservice_file').css('display','none');
            $('#inservice_file').prop('required',false);
        }
    })
});
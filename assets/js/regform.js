$(document).ready(function () {
	$("input").bind("keydown", function (event) {

		if (event.which === 13 && this.type !== 'submit') {
			event.preventDefault();
			$(this).next("input").focus();
		}
	});
	$.validator.addMethod('username', function (value, element, param) {
		var nameRegex = /^[a-zA-Z0-9]+$/;
		return value.match(nameRegex);
	}, 'Only a-z, A-Z, 0-9 characters are allowed');
	jQuery.validator.addMethod("exactlength", function (value, element, param) {
		return this.optional(element) || value.length == param;
	}, $.validator.format("Please enter exactly {0} characters."));
	var base_url = $('#base').val();
	$.validator.addMethod("pwcheck", function (value) {
		return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
			&& /[a-z]/.test(value) // has a lowercase letter
			&& /\d/.test(value) // has a digit
	});
	var val = {
		// Specify validation rules
		rules: {
			marital: "required",
			disability: "required",
			employment: "required",
			father_name: "required",
			mother_name: "required",
			gender: "required",
			last_name: "required",
			Issued_date: "required",
			Issuedistrict: "required",
			dateOfBirth: "required",
			per_province: "required",
			per_district: "required",
			per_vdc: "required",
			per_ward: "required",
			per_tole: "required",
			mail_province: "required",
			mail_district: "required",
			mail_vdc: "required",
			ethnicity: "required",
			region: "required",
			religion: "required",
			mother_tongue: "required",
			religion: "required",
			mail_ward: "required",
			mail_tole: "required",
			grandfather_name: "required",
			fatherEdu: "required",
			motherEdu: "required",
			fmoccupation: "required",
			grandfather_nationality: "required",
			blood_group : "required",
			in_service		: "required",
			Citizenship_no: {
				required: true,
				minlength: 3,
				maxlength: 32
			},
			phone_no: {
				minlength: 6,
				maxlength: 9,
				digits: true
			},
			// age : "required",
			age: {
				required: true,
				min: 16,
				max: 60,
				digits: true
		},	 
	},
		// Specify validation error messages
		messages: {
			
			father_name: "Father name is required",
			mother_name: "Mother name is required",
			gender: "Gender Field is required",
			Issued_date: "Issue Date is required",
			Issuedistrict: "Issue District is required",
			dateOfBirth: "Date of Birth is required",
			age: {
				required: "Age is required",
				min: "Age must be greater than 16",
				max: "Age must be less than 60",
				digits: "Please enter number only."
			},
			dateOfBirth: "Date of Birth is required",
			per_province: "province is required",
			per_district: "District is required",
			per_vdc: "Muicipality/VDC is required",
			per_ward: "Ward is required",
			per_tole: "Tole is required",
			mail_province: "province is required",
			mail_district: "District is required",
			mail_vdc: "Muicipality/VDC is required",
			mail_ward: "Ward is required",
			mail_tole: "Tole is required",
			region: "Region is required",
			religion: "Religion is required",
			ethnicity: "Ethnicity is required",
			mother_tongue: "Mother Tongue is required",
			grandfather_name: "Grandfather full name is required",
			fatherEdu: "Father Qualification is required",
			motherEdu: "Mother Qualification is required",
			fmoccupation: "Occupation is required",
			grandfather_nationality: "Nationality is required",
			email_id: {
				required: "Email is required",
				email: "Please enter a valid e-mail",
				remote: "This Email is already registered! Try another.",
			},
			phone: {
				required: "Phone number is requied",
				minlength: "Please enter 10 digit phone number",
				maxlength: "Please enter 10 digit phone number",
				digits: "Only numbers are allowed in this field"
			},
			Citizenship_no: {
				required: "Citizenship number is requied",
				minlength: "Please enter atleast 4 digit Citizenship number",
				maxlength: "Please enter up to 32 digit Citizenship number",
			},
		}

	}
	$("#myForm").multiStepForm(
		{
			defaultStep: 0,
			beforeSubmit: function (form, submit) {
				console.log("called before submiting the form");
				console.log(form);
				console.log(submit);
			},
			validations: val,
		}
	).navigateTo(0);

	// Input Age after dob selected
	$('#dateOfBirth_ad').on('change',function(){
		var dob = $('#dateOfBirth_ad').val();
		var d = new Date(dob);
		var today = new Date();
		var Difference_In_Time = today.getTime() - d.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		var age = Math.floor((Math.floor(Difference_In_Days)) / 365)
		$('#age').val(age);	
	});

	$('#disability_yes').on('click',function(){
		// console.log('Yes selected');
		$('#disability_file').css('display','block');
		$('#disability_file').prop('required',true);
		$('#disability_input').prop('required',true);
	});
	$('#disability_no').on('click',function(){
		// console.log('Yes selected');
		$('#disability_file').css('display','none');
		$('#disability_file').prop('required',false);
		$('#disability_input').prop('required',false);
	});
	$('#ethnicity').on('click',function(){
		
		var a = $('input[name=ethnicity]:checked', '#myForm').val();
		if(a == 'Aadibasi/Janajati' || a == 'Dalit' || a == 'Vaishya' || a == 'Madhesi'){
			$('#ethnicity_file').css('display','block');
			$('#ethnicity_file').prop('required',true);
		}else{
			$('#ethnicity_file').css('display','none');
			$('#ethnicity_file').prop('required',false);
		}
	});
	// In Service
	$('#in_service').on('change',function(){		
		var selected = $('#in_service').val();		
		if(selected === 'Y'){
			// console.log(selected);
			$('#inservice_file').css('display','block');
			$('#inservice_file').prop('required' , true);
		}else{
			$('#inservice_file').css('display','none');
			$('#inservice_file').prop('required' , false);
		}
	});

});
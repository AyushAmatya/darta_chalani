$(document).ready(function () {

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


// Validation
  $("#signupform").validate({
    rules: {
      first_name: {
        required: true,
      },
      last_name: {
        required: true,
      },
      email_id: {
        required: true,
        email: true,
        remote: {
					url: base_url + 'users/register_email_exists',
					type: "post",
					data:
					{
						email: function () { return $("#email_id").val(); }
						// ,csrf_test_name : csrf_token
					}
				}
      },
      mobile_no: {
        required: true,
        number: true,
        exactlength: 10,
        remote: {
					url: base_url + 'users/register_mobile_exists',
					type: "post",
					data:
					{
						email: function () { return $("#mobile_no").val(); }
						// ,csrf_test_name : csrf_token
					}
				}
      },
      username: {
        username: true,
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 20,
        pwcheck: true
      },
      conf_password: {
        minlength: 8,
        equalTo: "#password"
      }

    },
    messages: {
      first_name: "First Name is required",
      last_name: "Last Name is Required",
      email_id: {
        required: "Email Id is Required",
        email: "Please enter valid email as: example@domain.com",
        remote: "This Email is already registered! Try another.",
      },
      mobile_no: {
        required: "Mobile Number is required",
        number: "Please Enter 10 digit numbers from 0-9",
        minlength: "Min. length is 10 digits.",
        remote: "This Mobile Number is already registered! Try another.",
      },
      username: {
        required: "Username is required",
        minlength: "Username should be minimum 5 characters",
        maxlength: "Username should be maximum 20 characters",
      },
      password: {
        required: "Password is required",
        minlength: "Password should be minimum 8 characters",
        maxlength: "Password should be maximum 20 characters",
        pwcheck: "The password does not meet the criteria! (Atleast one digit,one lower case, Allowed Characters: A-Z a-z 0-9 @ * _ - . !)"
      }
    }
  });
  
});
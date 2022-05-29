$(document).ready(function () {

  // console.log(baseUrl);

  $('.inclusion').on('change', function () {
    // alert('Hello');
    var val = [];
    $(':checkbox:checked').each(function (i) {
      val[i] = $(this).val();
    });
    var level_id = $('#functional_level_id').val();
    var baseurl = $('#baseurl').val();
    if (val != '') {
      if (val.length == 1) {
        $.ajax({
          type: "POST",
          url: baseurl + "vacancy/inclusionamount/" + level_id,
          data: { val: val },
          success: function (response) {
            var normal_amount = jQuery.parseJSON(response);
            $('#inclusion_amount').val(normal_amount.NORMAL_AMOUNT);
          }
        });
      } else {
        $.ajax({
          type: "POST",
          url: baseurl + "vacancy/inclusionamount/" + level_id,
          data: { val: val },
          success: function (response) {
            var amount = jQuery.parseJSON(response);
            var total = parseInt(amount.NORMAL_AMOUNT) + parseInt(amount.INCLUSION_AMOUNT) * (val.length - 1);
            $('#inclusion_amount').val(total);
          }
        });
      }
    } else {
      $('#inclusion_amount').val('');
    }

  });


  var data = {
    // Specify validation rules
    rules: {
      marital: "required",
      disability: "required",
      employment: "required",
      'inclusion[]': "required",
      'inclusion_id[]': "required",
      'org_name[]': "required",
      'post_name[]': "required",
      'service_name[]': "required",
      'org_level[]': "required",
      'employee_type[]': "required",
      'from_date[]': "required",
      'to_date[]': "required",
      'edu_institute[]': "required",
      'level_id[]': 'required',
      'facalty[]': "required",
      'rank_type[]': "required",
      'rank_value[]': {
        required: true,
        digits: true,
      },
      'university_board[]': "required",
      'major_subject[]': "required",
      'passed_year[]': {
        required: true,
        digits: true,
        // exactlength: 4,
      },
      // Training
      'training_name[]': "required",
      'certificate[]': "required",
      'tr_from_date[]': "required",
      'tr_to_date[]': "required",
      'period[]': "required",
      'description[]': "required",
      // Files
      nagrita_front: "required",
      nagrita_back: "required",
      recent_photo: "required",
      signature: "required",
      right_finger_scan: "required",
      left_finger_scan: "required",



    },
    // Specify validation error messages
    messages: {
      marital: "Matial name is required",
      employment: "employment is required",
      disability: "Disability is required",
      mother_tongue: "mother_tongue is required",
      fatherEdu: "Father Education is required.",

      grandfather_name: "Grandfather Name is required",
      grandfather_nationality: "Grandfather Nationality is required",
      spouse_name: "Spouse Name is required",
      spouse_nationality: "Spouse Nationality is required",
      fatherEdu: "Father Qualification is required",
      motherEdu: "Mother Qualification is required",
      fmoccupation: "Occupation is required",
      'org_name[]': "Organisation Name is required",
      'passed_year[]': {
        required: "Passed Year is required",
        digits: "Please enter Number only",
        exactlength: "Please enter year only (4 digits)"

      },
      'rank_value[]': {
        required: "Rank type is Required",
        digits: "Please enter Number only",
      }
    },

  }

  $("#EditapplyForm").multiStepFormapply({
    defaultStep: 0,
    beforeSubmit: function (form, submit) {
      console.log("called before submiting the form");
      console.log(form);
      console.log(submit);
    },
    validations: data,
    errorPlacement: function (error, element) {
      error.insertBefore(element.closest('td'));
    }
  }).navigateTo(0);
  var t_education = $('#educationalbody');
  $(t_education).on("click", ".btn-edu-remove", function (e) {
    e.preventDefault();
    var tr = this;
    var conf = confirm("Are you sure?");
    var edid = $('.btn-remove-edu').val();
    var baseurl = $('#baseurl').val();
    console.log(baseurl);
    if (conf == true) {
      $.ajax({
        type: 'POST',
        url: baseurl + 'vacancy/DeleteEdu',
        data: { edid: edid },
        success: function (response) {
          if (response == true) {
            $(tr).closest('tr').remove();
          }else{
            $(tr).closest('tr').remove();
          }
        }
      });

    }
    // $(this).closest('tr').remove();
  });

});


$(document).ready(function(){

	// Disable Future Dates
    $('.selectNepaliDate').nepaliDatePicker({
        // endDate: new Date()
    });

    //END
    // Total Days in training tab
	$('.period').on('click',function(){
       
        let fromdate = new Date($('.tr_from_date').val());
        let todate = new Date($('.tr_to_date').val());
        var Difference_In_Time = todate.getTime() - fromdate.getTime();  
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        // console.log(Difference_In_Days);
        $('.period').val(Difference_In_Days);
    });
    jQuery.validator.addMethod("exactlength", function (value, element, param) {
		return this.optional(element) || value.length == param;
	}, $.validator.format("Please enter exactly {0} characters."));

    var data	=	{
        // Specify validation rules
        rules: {
            marital          :  "required",
            disability       : "required",
            employment       : "required",
            'inclusion[]'    : "required",
            'inclusion_id[]'    : "required",
            'org_name[]'     : "required",
            'post_name[]'    : "required",
            'service_name[]' : "required",
            'org_level[]'    : "required",
            'employee_type[]': "required",
            'from_date[]'   : "required",
            'to_date[]'     : "required",
            'edu_institute[]':  "required",
            'level_id[]'    : 'required',
            'facalty[]'     :  "required",
            'rank_type[]'     : "required",
            'rank_value[]'  :  {
                    required: true,
                    digits: true,
            },
            'major_subject[]': "required",
            'passed_year[]'  : {
                required: true,
                digits: true,
                exactlength: 4,
            },
            // Training
            'training_name[]': "required",
            'certificate[]'  : "required",
            'tr_from_date[]' : "required",
            'tr_to_date[]'   : "required",
            'period[]'       : "required",
            'description[]'  : "required",
            // Files
            nagrita_front     : "required",
            nagrita_back      : "required",
            recent_photo      : "required",
            signature         : "required",
            right_finger_scan : "required",
            left_finger_scan  : "required",
            'School[]'           : "required",
            'SLC[]'              : "required",
            'higher Secondary School[]' : "required",
            'Bachlor[]'          : "required",
            'Master[]'           : "required",
            'M.Phil[]'           : "required",
            // 'skills[]'           : "required",


            
        },
        // Specify validation error messages
        messages: {
            marital: 		            "Matial name is required",
            employment:                 "employment is required",
            disability:                 "Disability is required",
            mother_tongue:              "mother_tongue is required",
            fatherEdu:                  "Father Education is required.",

            grandfather_name:           "Grandfather Name is required",
            grandfather_nationality:    "Grandfather Nationality is required",
            spouse_name:                "Spouse Name is required",
            spouse_nationality:         "Spouse Nationality is required",
            fatherEdu:                  "Father Qualification is required",
            motherEdu:                  "Mother Qualification is required",
            fmoccupation:               "Occupation is required",
            'org_name[]':               "Organisation Name is required",
            'passed_year[]' : {
                required: "Passed Year is required",
                digits: "Please enter Number only",
                exactlength: "Please enter year only (4 digits)"

            },
            'rank_value[]' : {
                required: "Rank type is Required",
                digits: "Please enter Number only",
            }
        },
        
    }
    // $(document).on("multiStepFormapply", "#applyForm");
    $("#applyForm").multiStepFormapply(
    {
        defaultStep:0,
        beforeSubmit : function(form, submit){
            console.log("called before submiting the form");
            console.log(form);
            console.log(submit);
        },
        validations:data,
        errorPlacement: function (error, element) {               
            error.insertBefore(element.closest('td'));               
        }
    }
    ).navigateTo(0);

    // Educational Qualification Section START-------------------------------xxxxxxxxxxxxx-----------------------
    var max_fields_edu = 5; // Maximum input fields
    var t_education = $('#educationalbody');
    var btn_edu_remove = $('.btn-edu-remove');
    var btn_add_edu = $('.btn-add-edu');
    var appendDataedu = 
                        `<tr>
                                    <td>
										<div for="edu_institute" class="form-group">
											<input type="text" name="edu_institute[]" class="form-control form-control-sm">
										</div>
									</td>
									<td>
										<div for="level_id" class="form-group">
                                        <select name="level_id[]" class="form-control form-control-sm">
                                            <option value="">-- Select -- </option>
                                            <option value="3">Master</option>
                                            <option value="4">School</option>
                                            <option value="5">Bachlor</option>
                                            <option value="6">higher Secondary School</option>
                                            <option value="7">SLC</option>
                                            <option value="8">M.Phil</option>
                                </select>
										</div>
									</td>
									<td>
										<div for="facalty" class="form-group">
											<input type="text" name="facalty[]" class="form-control form-control-sm">
										</div>
									</td>
									<td>
                                        <div class="form-group">
                                            <select class="form-control form-control-sm" id="" name="rank_type[]">
                                                <option value="">---</option>
                                                <option value="GPA">GPA</option>
                                                <option value="Percentage">Percentage</option>
                                            </select>
                                        </div>
								    </td>
                                    <td>
                                        <div for="rank_value" class="form-group">
                                            <input type="text" name="rank_value[]" class="form-control form-control-sm">
                                        </div>
                                    </td>
									<td>
										<div for="major_subject" class="form-group">
											<input type="text" name="major_subject[]" class="form-control form-control-sm">
										</div>
                                    </td>
                                    <td>
										<div for="passed_year" class="form-group">
											<input type="number" name="passed_year[]" class="form-control form-control-sm">
										</div>
									</td>
									<td>
										<i class="fa fa-minus-circle btn-edu-remove" aria-hidden="true" style="color: red; cursor: pointer"></i>
									</td>
						</tr>`;

    var x = 1; // initial row value

    $(btn_add_edu).click(function(e){
        e.preventDefault();
        if(x < max_fields_edu){
            // alert(x);
            $(t_education).append(appendDataedu);
            x++;
        }
    });

    $(t_education).on("click", ".btn-edu-remove", function(e){
        e.preventDefault();
        var tr = this;
        var conf = confirm("Are you sure?");
        // console.log('btn-edu-remove');  
        var edid = $('.btn-remove-edu').val();
        var baseurl = $('#baseurl').val();
        console.log(baseurl);
        if(conf == true){
        $.ajax({
          type: 'POST',
          url: baseurl+'vacancy/DeleteEdu',
          data:{edid:edid},
          success: function(response){
            if(response == true){
              $(tr).closest('tr').remove();
            }
          }
        });

      }
        // $(this).closest('tr').remove();
        x--;
    });
    // Educational Qualification Section END-------------------------------xxxxxxxxxxxxx-----------------------
    // H. Experience Detail START ------------------------------------------xxxxxxxxxxxxx-----------------------
    function myFunction() {
        var trDateInput = document.getElementsByClassName("selectNepaliDate");               
        trDateInput.nepaliDatePicker({
          dateFormat:"YYYY-MM-DD",
          disableDaysAfter: "2077-12-10",
          ndpYear: true,
          ndpMonth: true
        });
    };
    var max_fields_exp = 5; // Maximum input fields
    var t_experiance = $('#experiancebody');
    var btn_exp_remove = $('.btn-exp-remove');
    var btn_add_exp = $('.btn-add-exp');
    var appendDataexp = 
                        `<tr>
                                <td>
                                    <div for="org_name" class="form-group">
                                        <input type="text" name="org_name[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="post_name" class="form-group">
                                        <input type="text" name="post_name[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="service_name" class="form-group">
                                        <input type="text" name="service_name[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="org_level" class="form-group">
                                        <input type="number" name="org_level[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="employee_type" class="form-group">
                                        <select name="employee_type[]" class="form-control form-control-sm">
                                            <option></option>
                                            <option value="1">Permanent</option>
                                            <option value="2">Temporary</option>
                                            <option value="3">Contract</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div for="from_date" class="form-group">
                                        <input type="text" class="date-picker form-control selectNepaliDate" name="from_date[]" data-single="true" placeholder="Select Date(s)">
                                    </div>
                                </td>
                                <td>
                                    <div for="to_date" class="form-group">
                                        <input type="text" class="date-picker form-control selectNepaliDate" name="to_date[]" data-single="true" placeholder="Select Date(s)">
                                    </div>
                                </td>
                                <td>
                                    <i class="fa fa-minus-circle btn-exp-remove" aria-hidden="true" style="color: red; cursor: pointer"></i>
                                </td>
                        </tr>`;
    
    var y = 1; // initial row value
    $(btn_add_exp).click(function(e){
        e.preventDefault();
        if(y < max_fields_exp){
            // alert(x);
            $(t_experiance).append(appendDataexp);
            y++;
        }
        myFunction();
    });
    $(t_experiance).on("click", ".btn-exp-remove", function(e){
        e.preventDefault();
        $(this).closest('tr').remove();
        y--;
    });
    // H. Experience Detail END ------------------------------------------xxxxxxxxxxxxx-----------------------

    // I. Training Detail START ------------------------------------------xxxxxxxxxxxxx-----------------------
    var max_fields_trn = 5; // Maximum input fields
    var t_training = $('#trainingbody');
    var btn_tr_remove = $('.btn-tr-remove');
    var btn_add_tr = $('.btn-add-tr');
    var appendDatatr = 
                        `<tr>
                            <td>
                            <div for="training_name" class="form-group">
                                <input type="text" name="training_name[]" class="form-control form-control-sm">
                            </div>
                            </td>
                            <td>
                                <div for="certificate" class="form-group">
                                    <input type="text" name="certificate[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <div for="tr_from_date" class="form-group">
                                    <input type="text" name="tr_from_date[]" class="form-control form-control-sm selectNepaliDate tr_from_date" placeholder="Select Date(s)" >
                                </div>
                            </td>
                            <td>
                                <div for="tr_to_date" class="form-group">
                                    <input type="text" name="tr_to_date[]" class="form-control form-control-sm selectNepaliDate tr_to_date" placeholder="Select Date(s)">
                                </div>
                            </td>
                            <td>
                                <div for="period" class="form-group">
                                    <input type="number" name="period[]" class="form-control form-control-sm period">
                                </div>
                            </td>
                            <td>
                                <div for="description" class="form-group">
                                    <input type="text" name="description[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <i class="fa fa-minus-circle btn-tr-remove" aria-hidden="true" style="color: red; cursor: pointer"></i>
                            </td>
                        </tr>`;
    var z = 1; // initial row value                       
    $(btn_add_tr).click(function(e){
        e.preventDefault();
        if(z < max_fields_trn){
            // alert(x);
            $(t_training).append(appendDatatr);
            z++;
        }
        myFunction();
    });
    $(t_training).on("click", ".btn-tr-remove", function(e){
        e.preventDefault();
        $(this).closest('tr').remove();
        z--;
    });
    // I. Training Detail END ------------------------------------------xxxxxxxxxxxxx-----------------------

    // Document Upload Section code
    function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#photograph').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      function readURLSign(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#recent_sign').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      function readURLright(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#right_finger').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      function readURLleft(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#left_finger').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      //Nagrita
      function readnagritafront(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#nagrita_front').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      
      function readnagritaBack(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#nagrita_back').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      
      
      $("#recent_photo").change(function() {
        readURL(this);
      });
      $("#signature").change(function() {
        readURLSign(this);
      });
      $("#right_finger_scan").change(function() {
        readURLright(this);
      });
      $("#left_finger_scan").change(function() {
        readURLleft(this);
      });

    //   Nagrita upload
    $("#nagrita_frontimg").change(function() {
        readnagritafront(this);
      });
      $("#nagrita_backimg").change(function() {
        readnagritaBack(this);
      });

    //   Others -> input Fields required
    $('input[type=radio][name=employment]').on('change', function() 
    {
      // alert ('dHello');
      if(this.value == 'others')
      {
        $("input[name='employment_input']").prop('required',true);
      }
      else
      {
        $("input[name='employment_input']").removeAttr('required');
      }
    });

    $('input[type=radio][name=disability]').on('change', function() 
    {
      // alert ('dHello');
      if(this.value == 'Yes')
      {
        $("input[name='disability_input']").prop('required',true);
      }
      else
      {
        $("input[name='disability_input']").removeAttr('required');
      }
    });

    // $('.inclusion').on('change', function(){
    //   console.log('here');
    //   var val = [];
    //     $(':checkbox:checked').each(function(i){
    //       val[i] = $(this).val();
    //     });
    //     var level_id = $('#functional_level_id').val();
    //     var position_id = $('#position_id').val();
    //   var baseurl = $('#baseurl').val();
    //   if(val != '')
    //   {
    //       $.ajax({
    //         type: "POST",
    //         url: baseurl+"vacancy/inclusionamount/",
    //         data: {level_id:level_id,position_id:position_id},
    //         success: function (response) {
    //           var normal_amount = jQuery.parseJSON(response);
    //           var now = new Date();
    //           var year = now.getFullYear();
    //           var month = now.getMonth()+1;
    //           var day  = now.getDate();
    //           month = (month < 10) ? (month = "-0"+month) : month;
    //           day = (day < 10) ? (day = "-0"+day) : day;              
    //           var today = year+month+day;
    //           // console.log(today);
    //             if(val.length == 1)
    //           {
    //             // console.log(normal_amount.END_DATE >= today);
    //             if(normal_amount.END_DATE >= today){
    //               $('#inclusion_amount').val(normal_amount.NORMAL_AMOUNT);
    //               // alert('Normal');
    //             }else
    //             {
    //               // alert(parseInt(normal_amount.EXTENDED_AMOUNT));
    //               $('#inclusion_amount').val(normal_amount.LATE_AMOUNT);
    //               // alert('Extended');
    //             }
                
    //           }else
    //           {
    //             if(normal_amount.END_DATE >= today)
    //             {
    //               let total = parseInt(normal_amount.NORMAL_AMOUNT)+parseInt(normal_amount.INCLUSION_AMOUNT)*(val.length-1);
    //               $('#inclusion_amount').val(total);
    //             }else
    //             {
    //               let total = parseInt(normal_amount.LATE_AMOUNT)+parseInt(normal_amount.INCLUSION_AMOUNT)*(val.length-1);
    //               $('#inclusion_amount').val(total);
    //             }
    //           }
    //         }
    //       });     
    //   }else
    //   {
    //     // alert('No value');
    //     $('#inclusion_amount').val('');
    //   }
      
    // });

    
    
    $("#expcalculate").on('click', function(){
      var fromDate = new Date($('.fromDate').val());
      let fDateYear = fromDate.getFullYear();
      let fDateMonth = fromDate.getMonth();
      let fDateDay = fromDate.getDay();

      var toDate = new Date($('.toDate').val());
      let tDateYear = toDate.getFullYear();
      let tDateMonth = toDate.getMonth();
      let tDateDay = toDate.getDay();

      // var diff = toDate - fromDate;
      var totalDays = parseInt((toDate-fromDate)/(24*3600*1000));
      var Days,Months,years;
      if(totalDays <= 365){
        years = 0;
        Months = parseInt(totalDays/30);
        if(Months == 12){
          Months = 0;
        }
        Days = parseInt((totalDays*12)/365);
      }else{
        years = (tDateYear - fDateYear);
        Months = parseInt(totalDays/30.417)  ; //parseInt((toDate-fromDate)/(24*3600*1000*30*12));
        if(totalDays <= 359){
          Months = 0;
        }
        Days = parseInt((totalDays*12)/365);
        
      }
     
      $('.years').val(years);
      $('.months').val(Months);
      $('.days').val(Days);

      console.log(totalDays);
      console.log((tDateMonth+12*tDateYear)-(fDateMonth+12*fDateYear));


      // console.log(years);
      // console.log(Months);
      // console.log(Days);
      // console.log(checkClass());
    });

function checkClass(originalName,newName){
  elems = document.getElementsByClassName(originalName);
  console.log(elems.length)
}
$('.certUpload').on('click',addUpload);

function addUpload(){
  var InputName = $(this).closest('tr').find('td:eq(2) input').attr('name');
  // console.log(InputName);
  var uploadRow = `
  <div><input type="file" class="form-control-file" name="`+InputName+`" required ="required"/>
  <i class="fa fa-minus-circle btn-cert-remove"  role="button" aria-hidden="true" style="color: red; cursor: pointer"></i></div>`;
  // var delButton = `<div><i class="fa fa-minus-circle btn-cert-remove" aria-hidden="true" style="color: red; cursor: pointer"></i></div>`;
$(this).closest('tr').find('td:eq(2)').append(uploadRow);
// $(this).closest('td').append(delButton);
}
  $(document).on("click", ".btn-cert-remove", delUpload);
  function delUpload(){
    var selector = $(this).closest('div');
    var conf = confirm('Are you sure want to delete?');
    if(conf){
      selector.detach();
    }
  }
// Add required if skill checkbox selected
  $('.skills').on('click', function(){  
    if($(this).closest(".skills").is(":checked")) {
      var Input = $(this).val();
      // console.log("Checkbox is checked.");
      $('input[name="'+Input+'"]').attr("required", true);
    } else {
      var Input = $(this).val();
      // console.log("Checkbox is unchecked.");
      $('input[name="'+Input+'"]').removeAttr("required");
    }
  });
});


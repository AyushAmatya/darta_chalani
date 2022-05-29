$(document).ready(function() {

    // $("#districtSelect2").select2({
    //     theme: "classic",
    //     style:"position: inherit"
    // });
    
  
    // D. Address District Section Script  START-------------------------------------xxxxxxxxxxxxx-----------------------
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
        // Mailling vdc
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

    // Educational Qualification Section START-------------------------------xxxxxxxxxxxxx-----------------------
    var max_fields_edu = 5; // Maximum input fields
    var t_education = $('#educationalbody');
    var btn_edu_remove = $('.btn-edu-remove');
    var btn_add_edu = $('.btn-add-edu');
    var appendDataedu = 
                        `<tr>
                                    <td>
										<div for="EDUCATION_INSTITUTE" class="form-group">
											<input type="text" name="EDUCATION_INSTITUTE[]" class="form-control form-control-sm">
										</div>
									</td>
									<td>
										<div for="LEVEL_ID" class="form-group">
                                        <select name="LEVEL_ID[]" class="form-control form-control-sm">
                                            <option value="0">-- Select -- </option>
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
										<div for="FACALTY" class="form-group">
											<input type="text" name="FACALTY" class="form-control form-control-sm">
										</div>
									</td>
									<td>
										<div for="DIVISION_ID" class="form-group">
                                        <select name="DIVISION_ID[]" class="form-control form-control-sm">
                                            <option value="0">-- Select -- </option>
                                            <option value="1">1st Division</option>
                                            <option value="2">2nd Division</option>
                                            <option value="3">3rd Division</option>
                                            <option value="4">Distinction</option>
                                        </select>
										</div>
									</td>
									<td>
										<div for="MAJOR_SUBJECT" class="form-group">
											<input type="text" name="MAJOR_SUBJECT[]" class="form-control form-control-sm">
										</div>
                                    </td>
                                    <td>
										<div for="PASSED_YEAR" class="form-group">
											<input type="number" name="PASSED_YEAR[]" class="form-control form-control-sm">
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
        $(this).closest('tr').remove();
        x--;
    });
    // Educational Qualification Section END-------------------------------xxxxxxxxxxxxx-----------------------

    // H. Experience Detail START ------------------------------------------xxxxxxxxxxxxx-----------------------
    var max_fields_exp = 5; // Maximum input fields
    var t_experiance = $('#experiancebody');
    var btn_exp_remove = $('.btn-exp-remove');
    var btn_add_exp = $('.btn-add-exp');
    var appendDataexp = 
                        `<tr>
                                <td>
                                    <div for="ORGANISATION_NAME" class="form-group">
                                        <input type="text" name="ORGANISATION_NAME[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="POST_NAME" class="form-group">
                                        <input type="text" name="POST_NAME[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="SERVICE_NAME" class="form-group">
                                        <input type="text" name="SERVICE_NAME[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="LEVEL_ID" class="form-group">
                                        <input type="text" name="LEVEL_ID[]" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="EMPLOYEE_TYPE_ID" class="form-group">
                                        <select name="EMPLOYEE_TYPE_ID[]" class="form-control form-control-sm">
                                            <option></option>
                                            <option value="1">Permanent</option>
                                            <option value="2">Temporary</option>
                                            <option value="3">Contract</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div for="FROM_DATE" class="form-group">
                                        <input name="FROM_DATE[]" type="date" class="form-control form-control-sm">
                                    </div>
                                </td>
                                <td>
                                    <div for="TO_DATE" class="form-group">
                                        <input name="TO_DATE[]" type="date" class="form-control form-control-sm">
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
                            <div for="TRAINING_NAME" class="form-group">
                                <input type="text" name="TRAINING_NAME[]" class="form-control form-control-sm">
                            </div>
                            </td>
                            <td>
                                <div for="CERTIFICATE_NAME" class="form-group">
                                    <input type="text" name="CERTIFICATE_NAME[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <div for="FROM_DATE" class="form-group">
                                    <input type="date" name="TR_FROM_DATE[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <div for="TO_DATE" class="form-group">
                                    <input type="date" name="TR_TO_DATE[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <div for="PERIOD" class="form-group">
                                    <input type="number" name="PERIOD[]" class="form-control form-control-sm">
                                </div>
                            </td>
                            <td>
                                <div for="DESCRIPTION" class="form-group">
                                    <input type="text" name="DESCRIPTION[]" class="form-control form-control-sm">
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
    });
    $(t_training).on("click", ".btn-tr-remove", function(e){
        e.preventDefault();
        $(this).closest('tr').remove();
        z--;
    });
    // I. Training Detail END ------------------------------------------xxxxxxxxxxxxx-----------------------


    // Image preview   
    

});
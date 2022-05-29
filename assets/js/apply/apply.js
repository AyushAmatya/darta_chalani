$(document).ready(function () {

  var t_education = $('#educationalbody');
    $(t_education).on("click", ".btn-edu-remove", function (e) {
        e.preventDefault();
        var tr = this;
        var conf = confirm("Are you sure?");
        // console.log('btn-edu-remove');  
        var edid = $('.btn-remove-edu').val();
        if (conf == true) {
          $(tr).closest('tr').remove();
        }
      });
      $('#rank_value').on('change', function(){
          var rank_type = $('#rank_type').val();
          if(rank_type == 'Percentage'){
            var value = $('#rank_value').val();
            if(value < 32){
              // $('#rank_value').append('<label id="rank_value-error" class="error" for="rank_value">Please enter above 32.</label>');
              // $('#rank_value_error').html('<label id="rank_value-error" class="error" for="rank_value">Please enter above 32.</label>');
              $('#rank_value_error').css('display','block');
            }
            
          }else{
            // console.log(rank_type);
          }
          
      });
});


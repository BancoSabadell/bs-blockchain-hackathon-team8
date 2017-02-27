$(document).ready(function() {
  get_live();
  function get_live(){
      $.ajax({
          url: 'http://localhost:3000/live',
          type: 'GET',
          crossDomain: true,
          success: success,
          error: error
      });
  }
  function success(result, textStatus, jqXHR) {
      console.log(result.data);
      print_live(result);
  }
  function error(jqXHR, textStatus, errorThrown) {
      $('#Assistance').text = 'On';
      $('#Liability').text = 'On';
      $('#Robbery').text = 'On';
      $('#AllRisk').text = 'On';
  }
  function print_live(data){
    if (data.status == 'On'){
      $('#Assistance').html = 'On';
      $('#Liability').html = 'On';
      $('#Robbery').html = 'Off';
      $('#AllRisk').html = 'On';
    } else if (data.status == 'Off'){
      $('#Assistance').html = 'Off';
      $('#Liability').html = 'On';
      $('#Robbery').html = 'On';
      $('#AllRisk').html = 'Off';
    }
  }
});
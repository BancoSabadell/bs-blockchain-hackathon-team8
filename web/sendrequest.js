$(document).ready(function() {

  function send_request(datanow){
      console.log(datanow);
      $.ajax({
          url: 'http://localhost:3000/estimate',
          type: 'POST',
          data: datanow,
          crossDomain: true,
          success: success,
          error: error
      });
  }
  function success(result, textStatus, jqXHR) {
    var amount = result.price;
    console.log(result);
    var txt = '<h1>The booking will cost: '+amount.toPrecision(2)+' ETH</h1>';
    var details = '';
    details += "<br><br>Owner: "+result.renter.name;
    details += "<br>Car: "+result.car.name;
    details += "<br>From: "+result.from.replace('T',' ').substring(0,16);
    details += "<br>To: "+result.to.replace('T',' ').substring(0,16);
    txt += details + '<br>';
    txt += '<button id="Accept">Accept</button>';
    $('#MainRent').html('<div class="col-lg-2"></div><div class="col-lg-8">'+txt+'</div><div class="col-lg-2"></div><br>');     
    $('#Accept').click(function(){
      accept_request(result);
    });    
  }
  function error(jqXHR, textStatus, errorThrown) {
    var txt = '<h1>Ops! Something went wrong...</h1>';
    $('#MainRent').html('<div class="col-lg-2"></div><div class="col-lg-8">'+txt+'</div><div class="col-lg-2"></div>');     
  }

  function accept_request(result){
    console.log(result);
    var parsed = {};
    parsed.car = result.car.id;
    parsed.user = result.renter.id;
    parsed.price = result.price;
    $.ajax({
        url: 'http://localhost:3000/reservation',
        type: 'POST',
        data: parsed,
        crossDomain: true,
        success: success2,
        error: error2
    });
  }
  function success2(result, textStatus, jqXHR) {
    $('#MainRent').html('<div class="col-lg-2"></div><div class="col-lg-8"><h1>Your request has been sent, start driving now!</h1></div><div class="col-lg-2"></div>');     
  }

  function error2(jqXHR, textStatus, errorThrown) {
    var txt = '<h1>Ops! Something went wrong...</h1>';
    $('#MainRent').html('<div class="col-lg-2"></div><div class="col-lg-8">'+txt+'</div><div class="col-lg-2"></div>');     
  
  }

  $('#FormDeploy').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    /* Validations go here */
      var dataParsed = {};
      dataParsed.user = "maria";
      dataParsed.car = $('#selectcar').val();
      dataParsed.from = $('#dp1').val();
      dataParsed.to = $('#dp2').val();
      send_request(dataParsed);
  });
});
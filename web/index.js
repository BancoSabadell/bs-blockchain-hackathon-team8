$(document).ready(function() {
  get_active_contracts();
  function get_active_contracts(){
      $.ajax({
          url: 'http://localhost:3000/pending',
          type: 'GET',
          crossDomain: true,
          success: success,
          error: error
      });
  }
  function success(result, textStatus, jqXHR) {
      console.log(result.data);
      print_live_contracts_info(result);
  }
  function error(jqXHR, textStatus, errorThrown) {
      alert('Error: '+errorThrown);
  }
  function print_live_contracts_info(data){
    var $table_head = $('#rep_live_contracts thead');
    var $table_body = $('#rep_live_contracts tbody');

      $table_head.empty();
      $table_body.empty();

      // Keys in table head
      $table_head.append($('<th class="Id">Car type</th>'));
      $table_head.append($('<th class="Owner">'+'Lender'+'</th>'));
      $table_head.append($('<th class="From">'+'From'+'</th>'));
      $table_head.append($('<th class="To">'+'To'+'</th>'));

    var i = 0;
      data.forEach(function(item){
        console.log(item);
        console.log(item.car);
        console.log(item.car.attributes);
          $table_body.append($('<tr class="contract_'+(i+1)+'"></tr>'));
          $('tr.contract_'+(i+1)).append($('<td class="Id">'+item.car.name+'</td>'));            
          $('tr.contract_'+(i+1)).append($('<td class="Owner">'+item.lender.name+'</td>'));
          $('tr.contract_'+(i+1)).append($('<td class="Entity">'+item.from.replace('T',' ').substring(0,16)+'</td>'));
          $('tr.contract_'+(i+1)).append($('<td class="Entity">'+item.to.replace('T',' ').substring(0,16)+'</td>'));
          //var a = new Date(item.from);
          //alert(a.getTime());
          i++;
      });
  }
});
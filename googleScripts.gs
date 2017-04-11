// This constant is written in column C for rows for which an email
// has been sent successfully.
var Pushed_SENT = "Pushed";

function pushToGA() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 8;  // First row of data to process
  var trueRange = sheet.getRange(startRow,1,500,10);
  var GaID = 'UA-82206515-1';
  var data = trueRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var pushSent = row[1]; 
    var cid = row[2];
    var paid = row[4];   //сумму привести к виду
    var tid = row[5];    //идентификатор заказа
    var value = row[6];  //сумма
    var pr1nm = encodeURIComponent(row[7]); //название товара
    var pr1id = row[8];
    var pr1qt = row[9];
    
    
    $.get(
    "somepage.php",
    {paramOne : 1, paramX : 'abc'},
    function(data) {
       alert('page content: ' + data);
    }
);
    
    
  //  Logger.log(pr1nm + " " + row[7]);
    
    var urlGA = "http://www.google-analytics.com/collect?v=1&tid=" + GaID + "&cid=";
     
   
    if (paid == 'да') {     //проверяем наличие оплатил
      if (value != ''){     //проверяем наличие суммы
        if (pr1nm != ''){     //проверяем наличие название услуги
      
       if (pushSent != Pushed_SENT) {                      //проверяем отправку
         
       // Logger.log(urlGA + cid + "&t=pageview&dh=rentaprint.com.ua&dp=/pay_success&dt=pay_success&ti="+ tid +"&ta=Store%20-%20Online&tr=" + value
       // + "&pa=purchase&pr1id=" + pr1id + "&pr1nm=" + pr1nm + "&pr1qt=" + pr1qt + "&pr1pr=" + value);
         //event
        UrlFetchApp.fetch(urlGA + cid + "&t=pageview&dh=rentaprint.com.ua&dp=/pay_success&dt=pay_success&ti="+ tid +"&ta=Store%20-%20Online&tr=" + value
        + "&pa=purchase&pr1id=" + pr1id + "&pr1nm=" + pr1nm + "&pr1qt=" + pr1qt + "&pr1pr=" + value);

         //устанавливаем статус
         sheet.getRange(startRow + i, 2).setValue(Pushed_SENT); 
       }
        }}
      
    }
  }
  

}

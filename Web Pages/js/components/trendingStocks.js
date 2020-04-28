/* 
 * burger.dan4@gmail.com
 */

var object;

function trendingStocks(id) {
    var content = `
<style>
* {
  box-sizing: border-box;
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  height: 600px;
  background-color: skyblue;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
</head>
<body>

<h2>Three Equal Columns</h2>

<div class="row">
  <div class="column" style="background-color:#aaa;">
    <h2>Day Gainers</h2>
    <p> Stocks ordered in descending order by price percent change greater than 3% with respect to the previous close </p>
    <table id = "tbGainers">
        <tr> <td> <button id="gainer0" onclick="buttonClickG(id)">1.</button> </td> </tr>
        <tr> <td> <button id="gainer1" onclick="buttonClickG(id)">2.</button> </td> </tr>
        <tr> <td> <button id="gainer2" onclick="buttonClickG(id)">3.</button> </td> </tr>
        <tr> <td> <button id="gainer3" onclick="buttonClickG(id)">4.</button> </td> </tr>
        <tr> <td> <button id="gainer4" onclick="buttonClickG(id)">5.</button> </td> </tr>
        <tr> <td> <button id="gainer5" onclick="buttonClickG(id)">6.</button> </td> </tr>
        <tr> <td> <button id="gainer6" onclick="buttonClickG(id)">7.</button> </td> </tr>
        <tr> <td> <button id="gainer7" onclick="buttonClickG(id)">8.</button> </td> </tr>
        <tr> <td> <button id="gainer8" onclick="buttonClickG(id)">9.</button> </td> </tr>
    </table>    
  </div>
  <div class="column" style="background-color:#bbb;">
    <h2>Day Losers</h2>
    <p> Stocks ordered in ascending order by price percent change with respect to the previous close </p>
        <table id = "tbLosers">
        <tr> <td> <button id="loser0" onclick="buttonClickL(id)">1.</button> </td> </tr>
        <tr> <td> <button id="loser1" onclick="buttonClickL(id)">2.</button> </td> </tr>
        <tr> <td> <button id="loser2" onclick="buttonClickL(id)">3.</button> </td> </tr>
        <tr> <td> <button id="loser3" onclick="buttonClickL(id)">4.</button> </td> </tr>
        <tr> <td> <button id="loser4" onclick="buttonClickL(id)">5.</button> </td> </tr>
        <tr> <td> <button id="loser5" onclick="buttonClickL(id)">6.</button> </td> </tr>
        <tr> <td> <button id="loser6" onclick="buttonClickL(id)">7.</button> </td> </tr>
        <tr> <td> <button id="loser7" onclick="buttonClickL(id)">8.</button> </td> </tr>
        <tr> <td> <button id="loser8" onclick="buttonClickL(id)">9.</button> </td> </tr>
        <tr> <td> <button id="loser9" onclick="buttonClickL(id)">10.</button> </td> </tr>
    </table>   
    </br>
    <p> All stock info pulled from Morningstar.com </br> Click on the buttons to see more stock information </p>
  </div>
  <div class="column" style="background-color:#ccc;">
    <h2>Most Actives</h2>
    <p> Stocks ordered in descending order by intraday trade volume </p>
    </br>
    <table id = "tbActives">
        <tr> <td> <button id="active0" onclick="buttonClickA(id)">1.</button> </td> </tr>
        <tr> <td> <button id="active1" onclick="buttonClickA(id)">2.</button> </td> </tr>
        <tr> <td> <button id="active2" onclick="buttonClickA(id)">3.</button> </td> </tr>
        <tr> <td> <button id="active3" onclick="buttonClickA(id)">4.</button> </td> </tr>
        <tr> <td> <button id="active4" onclick="buttonClickA(id)">5.</button> </td> </tr>
        <tr> <td> <button id="active5" onclick="buttonClickA(id)">6.</button> </td> </tr>
        <tr> <td> <button id="active6" onclick="buttonClickA(id)">7.</button> </td> </tr>
        <tr> <td> <button id="active7" onclick="buttonClickA(id)">8.</button> </td> </tr>
        <tr> <td> <button id="active8" onclick="buttonClickA(id)">9.</button> </td> </tr>
        <tr> <td> <button id="active9" onclick="buttonClickA(id)">10.</button> </td> </tr>
    </table>   
  </div>
</div>

</body>
    `;

    ajax3({

            url: "https://morning-star.p.rapidapi.com/market/get-movers?PerformanceId=0P00001GJH",
            successFn: success,
            errorId: id
        });
        
    function success(obj) {
        console.log(obj);
        object = obj;
      
        
        //get gainers
        for(var i = 0; i<9; i++){
            tbGainers.rows[i].innerHTML += obj.Top10.Gainers.Securities[i].Security.RegionAndTicker.substring(4) + "  ||| Price Change: $" + obj.Top10.Gainers.Securities[i].Quote.PriceChange + "  ||| Percent Change: " + parseFloat(obj.Top10.Gainers.Securities[i].Quote.PercentChange) + "%";
      
        
        }
        
        //get losers
        for(var j = 0; j<10; j++){
            tbLosers.rows[j].innerHTML += obj.Top10.Losers.Securities[j].Security.RegionAndTicker.substring(4)  + "  ||| Price Change: $" + obj.Top10.Losers.Securities[j].Quote.PriceChange + "  ||| Percent Change: " + parseFloat(obj.Top10.Losers.Securities[j].Quote.PercentChange) + "%";
        }
        
        //get actives
        for(var k = 0; k<10; k++){
            tbActives.rows[k].innerHTML += obj.Top10.Actives.Securities[k].Security.RegionAndTicker.substring(4) + "  ||| Price Change: $" + obj.Top10.Actives.Securities[k].Quote.PriceChange + "  ||| Percent Change: " + parseFloat(obj.Top10.Actives.Securities[k].Quote.PercentChange) + "%";;
        }
                        
    }
    
    
    
    
    
    document.getElementById(id).innerHTML = content;

}

function buttonClickG(id){
           var i;
           if(id.toString() == "gainer0"){
               i = 0;
           }else if(id.toString() == "gainer1"){
               i = 1;
           }else if(id.toString() == "gainer2"){
               i = 2;
           }else if(id.toString() == "gainer3"){
               i = 3;
           }else if(id.toString() == "gainer4"){
               i = 4;
           }else if(id.toString() == "gainer5"){
               i = 5;
           }else if(id.toString() == "gainer6"){
               i = 6;
           }else if(id.toString() == "gainer7"){
               i = 7;
           }else{
               i = 8;
           }
           
           var alertString;
           alertString = object.Top10.Gainers.Securities[i].Security.Name;
           alertString += "\nPrice: "+ object.Top10.Gainers.Securities[i].Quote.Price;
           alertString += "\nYesterday Price: "+ object.Top10.Gainers.Securities[i].Quote.YesterdayPrice;
           alertString += "\nDay High: "+ object.Top10.Gainers.Securities[i].Quote.DayHigh;
           alertString += "\nDay Low: "+ object.Top10.Gainers.Securities[i].Quote.DayLow;
           alertString += "\n52 week High: "+ object.Top10.Gainers.Securities[i].Quote.FiftyTwoWeekHigh;
           alertString += "\n52 week Low: "+ object.Top10.Gainers.Securities[i].Quote.FiftyTwoWeekLow;
           alert(alertString);
           
           
    }
    
function buttonClickL(id){
           var i;
           if(id.toString() == "loser0"){
               i = 0;
           }else if(id.toString() == "loser1"){
               i = 1;
           }else if(id.toString() == "loser2"){
               i = 2;
           }else if(id.toString() == "loser3"){
               i = 3;
           }else if(id.toString() == "loser4"){
               i = 4;
           }else if(id.toString() == "loser5"){
               i = 5;
           }else if(id.toString() == "loser6"){
               i = 6;
           }else if(id.toString() == "loser7"){
               i = 7;
           }else if(id.toString() == "loser8"){
               i = 8;
           }else{
               i = 9;
           }
           
           var alertString;
           alertString = object.Top10.Losers.Securities[i].Security.Name;
           alertString += "\nPrice: "+ object.Top10.Losers.Securities[i].Quote.Price;
           alertString += "\nYesterday Price: "+ object.Top10.Losers.Securities[i].Quote.YesterdayPrice;
           alertString += "\nDay High: "+ object.Top10.Losers.Securities[i].Quote.DayHigh;
           alertString += "\nDay Low: "+ object.Top10.Losers.Securities[i].Quote.DayLow;
           alertString += "\n52 week High: "+ object.Top10.Losers.Securities[i].Quote.FiftyTwoWeekHigh;
           alertString += "\n52 week Low: "+ object.Top10.Losers.Securities[i].Quote.FiftyTwoWeekLow;
           alert(alertString);
           
           
    }
    
 function buttonClickA(id){
           var i;
           if(id.toString() == "active0"){
               i = 0;
           }else if(id.toString() == "active1"){
               i = 1;
           }else if(id.toString() == "active2"){
               i = 2;
           }else if(id.toString() == "active3"){
               i = 3;
           }else if(id.toString() == "active4"){
               i = 4;
           }else if(id.toString() == "active5"){
               i = 5;
           }else if(id.toString() == "active6"){
               i = 6;
           }else if(id.toString() == "active7"){
               i = 7;
           }else if(id.toString() == "active8"){
               i = 8;
           }else{
               i = 9;
           }
           
           var alertString;
           alertString = object.Top10.Actives.Securities[i].Security.Name;
           alertString += "\nPrice: "+ object.Top10.Actives.Securities[i].Quote.Price;
           alertString += "\nYesterday Price: "+ object.Top10.Actives.Securities[i].Quote.YesterdayPrice;
           alertString += "\nDay High: "+ object.Top10.Actives.Securities[i].Quote.DayHigh;
           alertString += "\nDay Low: "+ object.Top10.Actives.Securities[i].Quote.DayLow;
           alertString += "\n52 week High: "+ object.Top10.Actives.Securities[i].Quote.FiftyTwoWeekHigh;
           alertString += "\n52 week Low: "+ object.Top10.Actives.Securities[i].Quote.FiftyTwoWeekLow;
           alert(alertString);
           
           
    }
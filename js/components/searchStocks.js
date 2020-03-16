function searchStocks(id){
    
    var content = `
<div id="searchContainer">
<input type="text" id="myInput" onkeyup="myFunction()">

<ul id="AllStocks">
  <li><img src="./Images/Graphs/AAPL.png"><a href="#" class="listOfStocks">AAPL</a></li>
  <li><img src="./Images/Graphs/FB.png"><a href="#" class="listOfStocks">FB</a></li>
  <li><img src="./Images/Graphs/MSFT.png"><a href="#" class="listOfStocks">MSFT</a></li>
</ul>
</div>
    `;
    document.getElementById(id).innerHTML = content;



}

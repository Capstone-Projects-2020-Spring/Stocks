function searchStocks(id){

    var content = `
<div id="searchContainer">
    <div id="searchParagraph">
        Welcome to the stock search page, here you can look up a stock by its ticker symbol. (Example: for Apple Inc. use AAPL)
    </div>
    <div id="searchContent">
    <label>Stock Symbol:</label><br> 
    <input type="text" id="searchTicker"/><br>     
    <input class="buttons" type="button" value="Submit" onclick="searchStocks.search('searchTicker','stockPage')"/>
    <div id="stockPage"></div> 
    </div>
    
    
</div>
    `;
    document.getElementById(id).innerHTML = content;



}



searchStocks.search = function (ticker, targetId) {
    var contentDOM = document.getElementById(targetId);
    console.log(document.getElementById(ticker).value);
    if (document.getElementById(ticker).value === ("AAPL")){
        contentDOM.innerHTML = "<img src='./Images/AAPL.png' width='500' height='400'>";
    }else if(document.getElementById(ticker).value === ("FB")){
        contentDOM.innerHTML = "<img src='./Images/FB.png' width='500' height='400'>"
    }else if(document.getElementById(ticker).value === ("MSFT")){
        contentDOM.innerHTML = "<img src='./Images/MSFT.png' width='500' height='400'>"
    }else{
        contentDOM.innerHTML = "There is currently no information on that stock."
    }
    ;
};
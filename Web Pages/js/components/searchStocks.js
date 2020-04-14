function searchStocks(id){
    var content = `
<div id="searchContainer">
    <div id="searchParagraph">
        Welcome to the stock search page, here you can look up a stock by its ticker symbol. (Example: for Apple Inc. use AAPL)
    </div>
    <form id="searchContent">
    <label>Stock Symbol:</label><br> 
    <input type="text" id="searchTicker"/><br>     
<!--    <input class="buttons" type="button" value="Submit" onclick="searchStocks.search('searchTicker','stockPage')/>-->
    <button class="buttons" id="searchButton">Search</button>
    
  
    <div id="stockPage"></div> 
	<div id="searchPrice"></div>
    <img style="padding-bottom: 10px" id="1DaySearchedStock" src="">
    <img style="padding-bottom: 10px" id="nDaySearchedStock" src="">
    <img style="padding-bottom: 10px" id="searchedStockMA" src=""><br>
    <div id="howManyShares" style="display: none">How many shares?<input id="numShares" type="text"></div><br>
<!--    <div id="howManySharesSell" style="display: none">How many shares would you like to sell?<input id="numSharesSell" type="number"></input></div><br>-->
    <button class="buttons" id="buyButton" style="display: none">Buy</button>
    <button class="buttons" id="sellButton" style="display: none">Sell</button>
    </form>
    
    
</div>
    `;
    document.getElementById(id).innerHTML = content;

    var storageRef = storage.ref();
    var imagesRef = storageRef.child('stocks');
    var imageMvAvg = storageRef.child('movingAverageStocks');
    var imageOneDay = storageRef.child('1DayPredictions');
    var imageNDays = storageRef.child('nDays');


    const searchForm = document.querySelector('#searchContent');
    // var BuyStocks = document.querySelector("#numShares");



    var numSellStocks = document.querySelector("#numSharesSell");
    var sharesQuestion = document.querySelector("#howManyShares");
    var sharesQuestion2 = document.querySelector("#howManySharesSell");

    const searchBtn = document.getElementById('searchButton');



    searchBtn.addEventListener('click', (e) =>{
        const stockTicker = searchForm['searchTicker'].value;
        const searchBtn = document.getElementById('searchButton');




        //Buying Stocks
        //Add sub collection to each user profile
        //the name of each doc in the subcolletion will be the stock name
        //one field in doc --> the number of shares



        var buyButton = document.getElementById('buyButton');
        var sellButton = document.getElementById('sellButton');
        auth.onAuthStateChanged(user => {
            if (user) {
                buyButton.style.display = "inline";
                sellButton.style.display = "inline";
                sharesQuestion.style.display = "inline";


                buyButton.addEventListener('click', (e) => {
                    var nBuyStocks = searchForm['numShares'].value;
                    const numBuyStocks = parseInt(nBuyStocks);
                    e.preventDefault();
                    console.log(nBuyStocks);
                    const strNumBuyStocks = numBuyStocks.toString();


                    var stockListRef = tikrDatabase.collection("users").doc(user.uid);
                    const stockName = searchForm['searchTicker'].value;
                    // const stockTicker = searchForm['searchTicker'].value + " " + strNumBuyStocks;

                    /*
                    return tikrDatabase.collection("stocksList").doc(user.uid).set({
                        stockName:  numBuyStocks.value,
                    });
                    */
                    //Adding to an array in DB

                    const stockTickerDBstore = stockTicker + " " + strNumBuyStocks;
                    // return tikrDatabase.collection('users').doc(user.uid).collection('stocks').doc(stockName).update({
                    //     shares: numBuyStocks,
                    // });

                    return tikrDatabase.collection('users').doc(user.uid).update({
                        stockList: firebase.firestore.FieldValue.arrayUnion(stockName),
                    });


                                        /*
                    return tikrDatabase.collection('stockList').doc(user.uid).set({
                        
                    });
                     */

                });



            }
        });

        auth.onAuthStateChanged(user => {
            if (user) {
                buyButton.style.display = "inline";
                sellButton.style.display = "inline";
                sharesQuestion.style.display = "inline";


                sellButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const strNumBuyStocks = numBuyStocks.value.toString();

                    var stockListRef = tikrDatabase.collection("users").doc(user.uid);
                    const stockName = searchForm['searchTicker'].value;
                    const stockTicker = searchForm['searchTicker'].value + " " + strNumBuyStocks;

                    /*
                    return tikrDatabase.collection("stocksList").doc(user.uid).set({
                        stockName:  numBuyStocks.value,
                    });
                    */
                    //Adding to an array in DB
                    const stockTickerDBstore = stockTicker + " " + strNumBuyStocks;
                    return tikrDatabase.collection('users').doc(user.uid).update({
                        stockList: firebase.firestore.FieldValue.arrayRemove(stockName),
                    });





                                        /*
                    return tikrDatabase.collection('stockList').doc(user.uid).set({

                    });
                     */

                });



            }
        });
        //End Buying Stocks

        //prevents page from refreshing when info is submitted
        e.preventDefault();
        // const stockTicker = searchForm['searchTicker'].value;

        /*
        const url = new URL(
            "https://api.worldtradingdata.com/api/v1/stock"
        );

        let params = {
            "symbol": stockTicker,
            "api_token": "YSYgTzBtwiZyve09eYTrJJKbxqsNazQuBbsIh1F7rYcDjVx4hDKea8hXIm3T",
        };
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));

        fetch(url, {
            method: "GET",
        })
            .then(response => response.json())
            .then(json => console.log(json));
        */

        const searchText = stockTicker + '.png';
        imageOneDay.child(searchText).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            var img = document.getElementById('1DaySearchedStock');
                img.src = url;

        }).catch(function (error){
            switch (error.code) {
                case 'storage/object-not-found':
                    var img = document.getElementById('1DaySearchedStock');
                    img.src = "";
          }
        });

        imageMvAvg.child(searchText).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            // if
            var img2 = document.getElementById('searchedStockMA');
                img2.src = url;
        }).catch(function (error){
            switch (error.code) {
                case 'storage/object-not-found':
                    var img2 = document.getElementById('searchedStockMA');
                    img2.src = "";
            }
        });

        imageNDays.child(searchText).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            // if
            var img3 = document.getElementById('nDaySearchedStock');
                img3.src = url;
        }).catch(function (error){
            switch (error.code) {
                case 'storage/object-not-found':
                    var img3 = document.getElementById('nDaySearchedStock');
                    img3.src = "";
            }
        });



        ajax2({
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stockTicker+"&apikey=ZLFF9H8CUUTVT9R9",
            successFn: success,
            errorId: id
        });

        function success(obj) {
            console.log(obj["Global Quote"]);

            if (!obj) {
                document.getElementById(id).innerHTML = "Http Request (from AJAX call) did not parse to an object.";
                return;
            } else {
                var price = obj["Global Quote"];
                price = price["05. price"];
                console.log(price);
                price = price.toString();
                price = parseFloat(price);
                var msg = "</br>The price of " + stockTicker + " is currently $" + price;
                searchPrice.innerHTML += msg;
            }
        }








    });




}

/*
searchStocks.search = function (ticker, targetId) {
var contentDOM = document.getElementById(targetId);
        console.log(document.getElementById(ticker).value);
        if (document.getElementById(ticker).value === ("AAPL")){
contentDOM.innerHTML = "<img src='./Images/AAPL.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("ABBV")){
contentDOM.innerHTML = "<img src='./Images/ABBV.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("ABT")){
contentDOM.innerHTML = "<img src='./Images/ABT.png' width='500' height='400'>";
        } else if (document.getElementById(ticker).value === ("ACN")){
contentDOM.innerHTML = "<img src='./Images/ACN.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("AGN")){
contentDOM.innerHTML = "<img src='./Images/AGN.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("AIG")){
contentDOM.innerHTML = "<img src='./Images/AIG.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("ALL")){
contentDOM.innerHTML = "<img src='./Images/ALL.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("AMGN")){
contentDOM.innerHTML = "<img src='./Images/AMGN.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("AMZN")){
contentDOM.innerHTML = "<img src='./Images/AMZN.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BA")){
contentDOM.innerHTML = "<img src='./Images/BA.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BAC")){
contentDOM.innerHTML = "<img src='./Images/BAC.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BIIB")){
contentDOM.innerHTML = "<img src='./Images/BIIB.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BK")){
contentDOM.innerHTML = "<img src='./Images/BK.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BKNG")){
contentDOM.innerHTML = "<img src='./Images/BKNG.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BMY")){
contentDOM.innerHTML = "<img src='./Images/BMY.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("BRK.B")){
contentDOM.innerHTML = "<img src='./Images/BRK.B.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("C")){
contentDOM.innerHTML = "<img src='./Images/C.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("CAT")){
contentDOM.innerHTML = "<img src='./Images/CAT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("CHTR")){
contentDOM.innerHTML = "<img src='./Images/CHTR.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("CMCSA")){
contentDOM.innerHTML = "<img src='./Images/CMCSA.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("COF")){
contentDOM.innerHTML = "<img src='./Images/COF.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("COST")){
contentDOM.innerHTML = "<img src='./Images/COST.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("CSCO")){
contentDOM.innerHTML = "<img src='./Images/CSCO.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("CVS")){
contentDOM.innerHTML = "<img src='./Images/CVS.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("DD")){
contentDOM.innerHTML = "<img src='./Images/DD.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("DHR")){
contentDOM.innerHTML = "<img src='./Images/DHR.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("DIS")){
contentDOM.innerHTML = "<img src='./Images/DIS.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("DOW")){
contentDOM.innerHTML = "<img src='./Images/DOW.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("DUK")){
contentDOM.innerHTML = "<img src='./Images/DUK.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("EXC")){
contentDOM.innerHTML = "<img src='./Images/EXC.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("FB")){
contentDOM.innerHTML = "<img src='./Images/FB.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("FDX")){
contentDOM.innerHTML = "<img src='./Images/FDX.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GD")){
contentDOM.innerHTML = "<img src='./Images/GD.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GILD")){
contentDOM.innerHTML = "<img src='./Images/GILD.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GM")){
contentDOM.innerHTML = "<img src='./Images/GM.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GOOG")){
contentDOM.innerHTML = "<img src='./Images/GOOG.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GOOGL")){
contentDOM.innerHTML = "<img src='./Images/GOOGL.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("GS")){
contentDOM.innerHTML = "<img src='./Images/GS.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("HON")){
contentDOM.innerHTML = "<img src='./Images/HON.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("IBM")){
contentDOM.innerHTML = "<img src='./Images/IBM.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("INTC")){
contentDOM.innerHTML = "<img src='./Images/INTC.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("JNJ")){
contentDOM.innerHTML = "<img src='./Images/JNJ.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("JPM")){
contentDOM.innerHTML = "<img src='./Images/JPM.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("KMI")){
contentDOM.innerHTML = "<img src='./Images/KMI.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("KO")){
contentDOM.innerHTML = "<img src='./Images/KO.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("LLY")){
contentDOM.innerHTML = "<img src='./Images/LLY.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("LMT")){
contentDOM.innerHTML = "<img src='./Images/LMT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("LOW")){
contentDOM.innerHTML = "<img src='./Images/LOW.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MCD")){
contentDOM.innerHTML = "<img src='./Images/MCD.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MDLZ")){
contentDOM.innerHTML = "<img src='./Images/MDLZ.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MDT")){
contentDOM.innerHTML = "<img src='./Images/MDT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MET")){
contentDOM.innerHTML = "<img src='./Images/MET.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MMM")){
contentDOM.innerHTML = "<img src='./Images/MMM.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MRK")){
contentDOM.innerHTML = "<img src='./Images/MRK.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MS")){
contentDOM.innerHTML = "<img src='./Images/MS.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("MSFT")){
contentDOM.innerHTML = "<img src='./Images/MSFT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("NEE")){
contentDOM.innerHTML = "<img src='./Images/NEE.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("NFLX")){
contentDOM.innerHTML = "<img src='./Images/NFLX.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("NVDA")){
contentDOM.innerHTML = "<img src='./Images/NVDA.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("ORCL")){
contentDOM.innerHTML = "<img src='./Images/ORCL.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("OXY")){
contentDOM.innerHTML = "<img src='./Images/OXY.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("PEP")){
contentDOM.innerHTML = "<img src='./Images/PEP.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("PFE")){
contentDOM.innerHTML = "<img src='./Images/PFE.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("QCOM")){
contentDOM.innerHTML = "<img src='./Images/QCOM.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("RTN")){
contentDOM.innerHTML = "<img src='./Images/RTN.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("SBUX")){
contentDOM.innerHTML = "<img src='./Images/SBUX.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("SO")){
contentDOM.innerHTML = "<img src='./Images/SO.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("SPG")){
contentDOM.innerHTML = "<img src='./Images/SPG.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("T")){
contentDOM.innerHTML = "<img src='./Images/T.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("TGT")){
contentDOM.innerHTML = "<img src='./Images/TGT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("TMO")){
contentDOM.innerHTML = "<img src='./Images/TMO.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("UNH")){
contentDOM.innerHTML = "<img src='./Images/UNH.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("UPS")){
contentDOM.innerHTML = "<img src='./Images/UPS.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("USB")){
contentDOM.innerHTML = "<img src='./Images/USB.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("UTX")){
contentDOM.innerHTML = "<img src='./Images/UTX.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("VZ")){
contentDOM.innerHTML = "<img src='./Images/VZ.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("WBA")){
contentDOM.innerHTML = "<img src='./Images/WBA.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("WFC")){
contentDOM.innerHTML = "<img src='./Images/WFC.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("WMT")){
contentDOM.innerHTML = "<img src='./Images/WMT.png' width='500' height='400'>";
} else if (document.getElementById(ticker).value === ("XOM")){
contentDOM.innerHTML = "<img src='./Images/XOM.png' width='500' height='400'>";
} else{
contentDOM.innerHTML = "There is currently no information on that stock.";
};

};
*/
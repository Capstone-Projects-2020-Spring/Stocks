//Current issue: when user has 0 shares, it displays 0 shares in the profile
                //round numbers in database
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
    var imageMvAvg = storageRef.child('movingAverageStocks');
    var imageOneDay = storageRef.child('1DayPredictions');
    var imageNDays = storageRef.child('nDays');


    const searchForm = document.querySelector('#searchContent');
    var BuyStocks = document.getElementById("numShares");


    var sharesQuestion = document.querySelector("#howManyShares");

    const searchBtn = document.getElementById('searchButton');



    searchBtn.addEventListener('click', (e) =>{
        searchPrice.innerHTML = "";
        const stockTicker = searchForm['searchTicker'].value;
        price = 0;
        console.log("This is the price after clicking search: " + price);
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
                price = obj["Global Quote"];
                price = price["05. price"];
                console.log(price);
                price = price.toString();
                price = parseFloat(price);
                var msg = "</br>The price of " + stockTicker + " is currently $" + price;
                searchPrice.innerHTML += msg;
            }



        }

        var buyButton = document.getElementById('buyButton');
        var sellButton = document.getElementById('sellButton');


        auth.onAuthStateChanged(user => {

            var userAccountRef = tikrDatabase.collection('users').doc(user.uid);
            if (user) {
                buyButton.style.display = "inline";
                sellButton.style.display = "inline";
                sharesQuestion.style.display = "inline";


                buyButton.addEventListener('click', (e) => {
                    var nBuyStocks = searchForm['numShares'].value;
                    const numBuyStocks = parseInt(nBuyStocks);
                    e.preventDefault();
                    console.log("Number of shares to buy: " + nBuyStocks);


                    var stockListRef = tikrDatabase.collection("users").doc(user.uid);
                    const stockName = searchForm['searchTicker'].value;

                    /*Adding to an array in DB
                    return tikrDatabase.collection('users').doc(user.uid).update({
                        stockList: firebase.firestore.FieldValue.arrayUnion(stockName),
                    });
                    */
                    //reference to stock's document
                    const stockSharesRef = tikrDatabase.collection('users').doc(user.uid).collection('stocks').doc(stockName);
                    stockSharesRef.get().then(function (doc){
                        if(doc.exists){
                            console.log("The stock exists in this portfolio.");
                            var stockDB = doc.data();
                            var updateNumShares = stockDB.shares + numBuyStocks;
                            userAccountRef.get().then(function (account){
                                var accountData = account.data();
                                var purchasingPower = accountData.purchasePower;
                                console.log("Purchasing Power: " + purchasingPower);
                                var investing = accountData.investing;
                                console.log("Total Investing Amount: " + investing);
                                var cost = numBuyStocks * price;
                                console.log("The cost for this purchase: " + cost);
                                var newPurchasingPower;
                                var newInvesting;
                                if(purchasingPower < cost) {
                                    alert("This purchase can not be processed. The cost of this transaction is $" + cost.toFixed(2) + " for " + numBuyStocks + " shares of " + stockName + ". You only have $" + purchasingPower.toFixed(2));
                                    console.log("message 1");
                                } else{
                                    alert("You have purchased " + numBuyStocks + " shares of " + stockTicker);
                                    BuyStocks.value = "";
                                    newPurchasingPower = purchasingPower - cost;
                                    console.log("New Purchasing Power Amount: "+ newPurchasingPower);
                                    newInvesting = investing + cost;
                                    console.log("New Total Investing Amount: "+ newInvesting);
                                    newPurchasingPower.toFixed(2);
                                    newInvesting.toFixed(2);
                                    userAccountRef.update({
                                        purchasePower: newPurchasingPower,
                                        investing: newInvesting,
                                    });
                                    stockSharesRef.update({
                                        shares: updateNumShares,
                                    });
                                }

                            });
                        }else{
                            userAccountRef.get().then(function (account){
                                console.log("This stock does not exist in this portfolio");
                                var accountData = account.data();
                                console.log("The price of this stock: " + price);
                                var purchasingPower = accountData.purchasePower;
                                console.log("Purchasing Power: " + purchasingPower);
                                var investing = accountData.investing;
                                console.log("Total Investing Amount: " + investing);
                                var cost = numBuyStocks * price;
                                console.log("The cost for this purchase: " + cost);
                                var newPurchasingPower;
                                console.log("New Purchasing Power Amount: "+ newPurchasingPower);
                                var newInvesting;
                                console.log("New Total Investing Amount: "+ newInvesting);
                                if(purchasingPower < cost) {
                                    alert("This purchase can not be processed. The cost of this transaction is $" + cost.toFixed(2) + " for " + numBuyStocks + " shares of " + stockName + ". You only have $" + purchasingPower.toFixed(2));
                                    console.log("message 2");
                                } else{
                                    alert("You have purchased " + numBuyStocks + " shares of " + stockTicker);
                                    BuyStocks.value = "";
                                    newPurchasingPower = purchasingPower - cost;
                                    console.log("New Purchasing Power Amount: "+ newPurchasingPower);
                                    newInvesting = investing + cost;
                                    newInvesting.toFixed(2);
                                    newPurchasingPower.toFixed(2);
                                    console.log("New Total Investing Amount: "+ newInvesting);
                                    userAccountRef.update({
                                        purchasePower: newPurchasingPower,
                                        investing: newInvesting,
                                    });
                                    stockSharesRef.set({
                                        shares: numBuyStocks,
                                    });
                                }

                            });


                        }
                    });
                });


                var userAccountRef = tikrDatabase.collection('users').doc(user.uid);

                sellButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    var nSellStocks = searchForm['numShares'].value;
                    const numSellStocks = parseInt(nSellStocks);

                    const stockName = searchForm['searchTicker'].value;

                    const stockSharesRef = tikrDatabase.collection('users').doc(user.uid).collection('stocks').doc(stockName);
                    stockSharesRef.get().then(function (doc){
                        if(doc.exists){
                            var stockDB = doc.data();
                            var updateNumShares = stockDB.shares = stockDB.shares - numSellStocks;
                            if(stockDB.shares < 0){
                                alert("You do not have " + numSellStocks + " share(s) of " + stockTicker + " in your portfolio.");
                            //else if stmt (shares == 0) --> delete the stock form db

                            } else{


                                userAccountRef.get().then(function (account){
                                    var accountData = account.data();
                                    console.log(accountData);
                                    //multiply current stock price by amount of shares in portfolio
                                    //add that to the purchasing power
                                    var purchasingPower = accountData.purchasePower;
                                    var investing = accountData.investing;

                                    var cost = numSellStocks * price;

                                    var newPurchasingPower = purchasingPower + cost;
                                    var newInvesting = investing - cost;
                                    if(investing <= 0){
                                        alert("You have no assets to sell");
                                    }else if(stockDB.shares == 0){

                                        stockSharesRef.delete().then(function () {
                                            alert("You have sold all shares of " + stockTicker + " Successfully.");
                                        });
                                        newPurchasingPower.toFixed(2);
                                        newInvesting.toFixed(2);
                                        userAccountRef.update({
                                            investing: newInvesting,
                                            purchasePower: newPurchasingPower,
                                        });
                                        BuyStocks.value = "";
                                    }else{
                                        newPurchasingPower.toFixed(2);
                                        newInvesting.toFixed(2);
                                        userAccountRef.update({
                                            investing: newInvesting,
                                            purchasePower: newPurchasingPower,
                                        });
                                        alert("You have sold " + numSellStocks + " share(s) of " + stockTicker);
                                        BuyStocks.value = "";
                                        stockSharesRef.update({
                                            shares: updateNumShares,
                                        });
                                    }
                                });
                                //multiply current price by numSellStocks
                                //subtract that result from investing and add it to purchasing power
                                console.log(stockDB);
                            }
                        }else{
                            alert("You do not have any shares of " + stockName + " in your portfolio.")
                        }
                    });

                    /*
                    return tikrDatabase.collection('users').doc(user.uid).update({
                        stockList: firebase.firestore.FieldValue.arrayRemove(stockName),
                    });
                    */

                });


            }
        });


        //prevents page from refreshing when info is submitted
        e.preventDefault();
        // const stockTicker = searchForm['searchTicker'].value;


        const searchText = stockTicker + '.png';
        imageOneDay.child(searchText).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            var img = document.getElementById('1DaySearchedStock');
                img.style.display = "inline";
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
                img2.style.display = "inline";
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
            img3.style.display = "inline";
                img3.src = url;
        }).catch(function (error){
            switch (error.code) {
                case 'storage/object-not-found':
                    var img3 = document.getElementById('nDaySearchedStock');
                    img3.src = "";
            }
        });

    });

}
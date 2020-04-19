//profit displayed on profile
/*
Approach 1
    each time the user sells,
    multiply # shares by new price
    subtract from (#shares times old price)
    add to profit

Approach 2
    put refresh button next to investing
    call ajax on each stock and get price
    multiply price by number of shares
    add together and store and update investing

Approach 3
    have a profit category
    total - 5000 = gain/loss
    press refresh


{
    "Note": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency."
}
*/

function profile(id) {
    auth.onAuthStateChanged(user => {
        //user is signed in


        if(user) {
            console.log(user)
            tikrDatabase.collection('users').doc(user.uid).get().then(doc => {
                const content = `
                    <div id="profileContent" >
                            <div id="Welcome">
                              <h1>Welcome,</h1>
                                  ${doc.data().displayName} <br>
                                  Purchasing Power: $
                                  ${doc.data().purchasePower.toFixed(2)}<br>
                                  Amount Invested: $
                                  ${doc.data().investing.toFixed(2)}<button class="buttons" id="refButton" style="margin-left: 10px">Refresh</button><br>
                                  Gains/Loss:
                                  <div>$ <div id="profit" style="display: inline"></div></div><br>
                                  Portfolio:<br>
                                  <div id="stockListAndNumShares">
                                  
                                  </div>
                                  
                            </div>
                            <br><br>
                            Update Profile info: <br>
                            <form id="profileForm" style="display: none; position: relative;">
                                <label for="username">Username</label><br>
                                <input type="text" name="username" id="regUsername"><br>
                                <label for="email">Email</label><br>
                                <input type="text" name="email" id="regEmail"><br>
                                <label for="password">Password</label><br>
                                <input type="password" name="password" id="regPassword"><br>
                                <button class="buttons" id="saveButton" style="margin-bottom: 10px;">Save</button>
                                <div id="err"></div>
                            </form>
                            <button class="buttons" id="showFormButton" style="margin-bottom: 10px;">Update Profile</button>
                    </div>            
                `;
                document.getElementById(id).innerHTML = content;

                //**refreshing Investing to show profits

                const refreshButton = document.getElementById('refButton');
                const stockSharesRef2 = tikrDatabase.collection('users').doc(user.uid).collection('stocks');
                const purchasePowerRef = tikrDatabase.collection('users').doc(user.uid);
                const profitRef = document.getElementById('profit');
                var newInvesting = 0;
                var sharesAndPrice = 0;
                var price2 = 0;
                refreshButton.addEventListener('click', (e) => {
                    // refreshButton.innerHTML = "Changed";

                    stockSharesRef2.get().then(function (listData){
                        listData.forEach(function(doc){
                            var stockName = document.createElement('div');
                            var stockDB = doc.data();
                            var stockNameStr = doc.id.toString();
                            // stockName.innerHTML = stockDB.shares + " share(s) of " + doc.id;
                            //ajax call
                            console.log("This is the price after clicking search: " + price2);
                            ajax2({

                                url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stockNameStr+"&apikey=ZLFF9H8CUUTVT9R9",
                                successFn: success,
                                async: false,
                                errorId: id
                            });


                            function success(obj) {
                                console.log(obj["Global Quote"]);
                                if (!obj) {
                                    document.getElementById(id).innerHTML = "Http Request (from AJAX call) did not parse to an object.";
                                    return;
                                } else {
                                    price2 = obj["Global Quote"];
                                    price2 = price2["05. price"];
                                    console.log(price2);
                                    console.log(price2);
                                    console.log(price2);
                                    console.log(price2);
                                    price2 = price2.toString();
                                    price2 = parseFloat(price2);


                                        //ajax call end
                                        console.log("price = " + price2);
                                        sharesAndPrice = stockDB.shares * price2;
                                        console.log("shares * price2 = " + sharesAndPrice);

                                        newInvesting = sharesAndPrice + newInvesting;
                                        console.log("newInvesting = " + newInvesting);
                                        return tikrDatabase.collection('users').doc(user.uid).update({
                                            investing: newInvesting,
                                        });
                                }





                            }

                        });

                        purchasePowerRef.get().then(function (doc) {
                            var accountData = doc.data();
                            var totalAssets = (accountData.purchasePower + accountData.investing).toFixed(2);
                            console.log("Total Assets: " + totalAssets);
                            var profit = totalAssets - 5000;

                            profitRef.innerHTML = profit.toString();

                        });


                    });

                });


                //user is not signed in
                //**end refreshing

                //Get Stocks and Amount Shares
                var tableDisplay = document.getElementById('stockListAndNumShares');
                const stockSharesRef = tikrDatabase.collection('users').doc(user.uid).collection('stocks');

                stockSharesRef.get().then(function (listData){
                    listData.forEach(function(doc){
                        var stockName = document.createElement('div');
                        var stockDB = doc.data();
                        stockName.innerHTML = stockDB.shares + " share(s) of " + doc.id;
                        tableDisplay.appendChild(stockName);
                    });
                });
                //End Get Stocks and Amount Shares

                var showForm = document.getElementById('profileForm');
                var showFormButton = document.getElementById('showFormButton');
                showFormButton.addEventListener('click', (e) =>{
                   showFormButton.style.display = 'none';
                   showForm.style.display = 'inline';
                });

                profileForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    //update username, email and password
                    if (profileForm['regUsername'].value != "" && profileForm['regEmail'].value != ""
                        && profileForm['password'].value != "") {
                        tikrDatabase.collection('users').doc(user.uid).update({
                            displayName: profileForm['regUsername'].value,
                        })
                        user.updateEmail(profileForm['regEmail'].value);
                        user.updatePassword(profileForm['regPassword'].value);
                        profileForm.reset();
                    //update username and password
                    } else if (profileForm['regUsername'].value != "" && profileForm['regEmail'].value != ""
                        && profileForm['password'].value == ""){
                        tikrDatabase.collection('users').doc(user.uid).update({
                            displayName: profileForm['regUsername'].value,
                        });
                        user.updateEmail(profileForm['regEmail'].value);
                        profileForm.reset();
                    //update username and password
                    } else if (profileForm['regUsername'].value != "" && profileForm['regEmail'].value == ""
                        && profileForm['password'].value != ""){
                        tikrDatabase.collection('users').doc(user.uid).update({
                            displayName: profileForm['regUsername'].value,
                        });
                        user.updatePassword(profileForm['regPassword'].value);
                        profileForm.reset();
                    //update email and password
                    } else if (profileForm['regUsername'].value == "" && profileForm['regEmail'].value != ""
                        && profileForm['password'].value != ""){
                        user.updateEmail(profileForm['regEmail'].value);
                        user.updatePassword(profileForm['regPassword'].value);
                        profileForm.reset();
                    }
                    //update username
                   else if (profileForm['regUsername'].value != "" && profileForm['regEmail'].value == ""
                        && profileForm['password'].value == ""){
                        return tikrDatabase.collection('users').doc(user.uid).update({
                            displayName: profileForm['regUsername'].value
                        }).then(() => {
                            profileForm.reset();
                        });
                    }
                   //update email
                    else if (profileForm['regUsername'].value == "" && profileForm['regEmail'].value != ""
                        && profileForm['password'].value == ""){
                        user.updateEmail(profileForm['regEmail'].value);
                        profileForm.reset();
                    }
                    //update password
                    else if (profileForm['regUsername'].value == "" && profileForm['regEmail'].value == ""
                        && profileForm['password'].value != ""){
                        user.updatePassword(profileForm['regPassword'].value);
                        profileForm.reset();
                    }
                    //no fields entered
                    else {
                        document.getElementById("err").innerText = "Please enter a field."
                    }
                });
            });


        }else{
            console.log('user logged out');
            const content = `
            <div id="registerForm">
                <h1 style="text-align: center;">Please login to view your profile. </h1>
            </div>           
                `;
            document.getElementById(id).innerHTML = content;
        }
    });
}

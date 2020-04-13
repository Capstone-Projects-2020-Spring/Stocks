function profile(id) {
    auth.onAuthStateChanged(user => {
        //user is signed in
        if(user) {
            console.log(user)
            tikrDatabase.collection('users').doc(user.uid).get().then(doc => {
                const content = `
                    <div id="profileContent">
                            <div id="Welcome">
                              <h1>Welcome,</h1>
                                  ${doc.data().displayName} <br>
                                  Purchasing Power: $
                                  ${doc.data().purchasePower}<br>
                                  Amount Invested: $
                                  ${doc.data().investing}<br>
                                  Stocks you bought:<br>
                                  ${doc.data().stockList} <br>
                                  
                            </div>
                            <br><br>
                            Update Profile info: <br>
                            <form id="profileForm">
                                <label for="username">Username</label><br>
                                <input type="text" name="username" id="regUsername"><br>
                                <label for="email">Email</label><br>
                                <input type="text" name="email" id="regEmail"><br>
                                <label for="password">Password</label><br>
                                <input type="password" name="password" id="regPassword"><br>
                                <button class="buttons" id="saveButton">Save</button>
                                <div id="err"></div>
                            </form>
                    </div>            
                `;
                document.getElementById(id).innerHTML = content;

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
            })

            //user is not signed in
        }else{
            console.log('user logged out');
            document.getElementById(id).innerHTML = "You're not logged in!";
        }


    });


}

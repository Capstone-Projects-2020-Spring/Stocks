//learned user registration from https://www.youtube.com/watch?v=wkdCpktUfGg --> will modify to fit webstie
function register(id) {

    var content = `
    <div id="registerForm">
        <h1 style="text-align: center;" id="regHeading">Create New Account!</h1>
        <form id="formContent">
            <label for="email">Email</label><br>
            <input type="text" name="email" id="regEmail"><br>
            <label for="password">Password</label><br>
            <input type="password" name="password" id="regPassword"><br>
            
            <div class=""input-Field">
                <label for="signup-Display">Display Name:</label><br>
                <input type="text" id="signup-Display" required/>
            </div>
            
            
            <button class="buttons" id="regButton">Register</button>
        </form>
    
    </div>
    <div id="foot2">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </div>
    `;
    document.getElementById(id).innerHTML = content;

    const registerForm = document.querySelector('#formContent');
    const formContentRef = document.getElementById('formContent');
    const heading = document.getElementById('regHeading');
    registerForm.addEventListener('submit', (e) => {
        //prevents page from refreshing when info is submitted
        e.preventDefault();
        const email = registerForm['regEmail'].value;
        const password = registerForm['regPassword'].value;

        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            formContentRef.style.display = 'none';
            heading.innerHTML = "Thank you for registering an account with TIKR. Please visit our FAQ page to get started.";
            return tikrDatabase.collection('users').doc(cred.user.uid).set({
                displayName: registerForm['signup-Display'].value,
                purchasePower: 5000,
                investing: 0,
            });
        }, function(error) {
            var errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                alert("Account with this email has already been created. Please login or use a different email.");
                registerForm.reset();
                console.log(errorCode);
            }
            /*.then(() => {
                formContentRef.style.display = 'none';
                heading.innerHTML = "Thank you for registering an account with TIKR. Please visit our FAQ page to get started.";
            });*/

        });

        // const userId = document.getElementById('userId');
        // const firstName = document.getElementById('firstName');
        // const lastName = document.getElementById('lastName');
        // const email = document.getElementById('email');
        // const addBtn = document.getElementById('addBtn');
        // const updateBtn = document.getElementById('updateBtn');
        // const removeBtn = document.getElementById('removeBtn');
        //
        // const database = firebase.database();
        //
        //
        // addBtn.addEventListener('click', (e)=>{
        //     e.preventDefault();
        //     database.ref('/users/' + userId.value).set({
        //         first_name: firstName.value,
        //         last_name: lastName.value,
        //         email: email.value
        //     });
        // });

    });
}



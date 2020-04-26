function login(id) {

    var content = `
    <div id="loginForm">
        <h1 style="text-align: center;">Login!</h1>
        <form id="loginFormContent">
            <label for="email">Email</label><br>
            <input type="text" name="email" id="loginEmail"><br>
            <label for="password">Password</label><br>
            <input type="password" name="password" id="loginPassword"><br>
            <button class="buttons" id="loginButton">Login</button>
        </form>
        <form id="forgot">        
        <button class="buttons" id="forgotButton">Forgot Password?</button>
        </form>    
        
        <div id="resetForm" style="display: none; position: relative;">
            <h2>Forgot password?</h2>
            <form id ="resetFormContent">
            <h3>Reset your password here:</h3>
                <label for="yourEmail">Enter email: </label><br>
                <input type="text" name="yourEmail" id="currentUN"><br>
                <button class="buttons" id="resetButton">Reset</button>
            </form>
        </div>
        
    </div>
    `;

    document.getElementById(id).innerHTML = content;

    const login = document.querySelector('#loginFormContent');
    login.addEventListener('submit', (e) =>{
        //prevents page from refreshing when info is submitted
        e.preventDefault();
        const email = login['loginEmail'].value;
        const password = login['loginPassword'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred=>{
            console.log(cred.user);
            profile(id);
        });

    });

    var showForm = document.getElementById('resetForm');
    var forgot = document.getElementById('forgotButton');
    forgot.addEventListener('click', (e) => {
        forgot.style.display = 'none';
        showForm.style.display = 'inline';
        const reset = document.querySelector('#resetFormContent');
        reset.addEventListener('submit', (e) => {
            e.preventDefault();
            var some = reset['currentUN'].value;
            auth.sendPasswordResetEmail(some).then(function(){
            });
        });
    });

}
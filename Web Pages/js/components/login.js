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
            login.reset();
        });

    });

}


/*
function onResponse(response) {
    var u = document.getElementById("errMessage");
    if (response.status === 204) {
        // open page, will later take to loginSuccess page then auto redirect to profile page
        window.open("#/loginSuccess", "_self");
        //display login success page briefly then redirect to profile page
        setTimeout("window.location.replace('#/profile')", 1500);
    } else {
        // display error
        u.innerHTML = "Invalid username or password.";
    }
}

login.reset = function() {
    window.open("#/resetPassword", "_self");
}

login.loginSubmit = function(){
    //var username = document.getElementById('username').value;
    //var password = document.getElementById('password').value;
    //auth.signInWithEmailAndPassword(username, password).then(cred => {
    //    console.log(cred.user);

    //    const modal = document.querySelector('#modal-login');
    //    M.Modal.getInstance(modal).close();
    //});



    if (document.getElementById('username').value === 'admin' && document.getElementById('password').value === 'admin') {
        console.log("success login");
        onResponse({ status: 204 });
    } else {
        console.log("unsuccessful login");
        onResponse({ status: 401 });
    }
}
// Use for when we have a server to call to/from
// function loginSubmit(){
//     var username = document.getElementById('username');
//     var password = document.getElementById('password');
//     fetch("login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password
//         })
//     }).then(onResponse)
// }

function clickOnEnter(ev) {
    if (ev.key === 'Enter') {
        login.loginSubmit();
    }
}

// Feature to be added later
function resetUsernamePassword(){
    fetch({
        method: 'GET'
        //Get link to password reset page
    }).then(function(response){
        if (response.status === 204){
            window.open("/ResetPassword");
        } else {
            //display error
        }
    });
}

document.getElementById('username').addEventListener('keydown', clickOnEnter );
document.getElementById('password').addEventListener('keydown', clickOnEnter );
document.getElementById('login').addEventListener('click', login);

*/
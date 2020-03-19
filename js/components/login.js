function login(id) {

    var content = `
    <div id="loginContainer">
        <div id="loginPrompt">
            Login
        
       </br> Username <input type="text" id="username"/>
       </br> Password <input type="text" id="password"/></br>
               <input type="button" value="Login" onclick="login.loginSubmit()"/>
        <div id="errMessage"></div>
               <div id="loginPage"></div> 
    </div>
    
    `;
    document.getElementById(id).innerHTML = content;
}

function onResponse(response) {
    console.log("We've entered on response function");
    var u = document.getElementById("errMessage");
    if (response.status === 204) {
        // open page, will later take to loginSuccess page then auto redirect to profile page
        window.open("#/loginSuccess", "_self");
        //display login success page briefly then redirect to profile page
        setTimeout("window.location.replace('#/profile')", 5000);
    } else {
        console.log("should display error message");
        // display error
        u.innerHTML = "Invalid username or password.";
    }
}

login.loginSubmit = function(){
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    console.log("enter loginSubmit function " + document.getElementById('username').value + document.getElementById('password').value);
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
        loginSubmit();
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

//document.getElementById('username').addEventListener('keydown', clickOnEnter );
//document.getElementById('password').addEventListener('keydown', clickOnEnter );
//document.getElementById('login').addEventListener('click', login);
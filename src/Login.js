function submitLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    var u = document.getElementById("errMessage");

    fetch("login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(function(response) {
        if (response.status === 204) {
            // open page, will later take to loginSuccess page then auto redirect to profile page
            window.open("/profile", "_self");
        } else {
            // display error
            u.innerText;
        }
    })
}

function clickOnEnter(ev) {
    if (ev.key === 'Enter') {
        submitLogin();
    }
}

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
document.getElementById('login').addEventListener('click', submitLogin);
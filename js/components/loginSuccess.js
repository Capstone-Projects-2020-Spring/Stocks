function loginSuccess(id) {

    var content = `
    <div id="loginContainer">
        <div id="loginPrompt">
            Welcome back!
               <div id="loginSuccessPage"></div> 
    </div>
    
    `;
    document.getElementById(id).innerHTML = content;
}
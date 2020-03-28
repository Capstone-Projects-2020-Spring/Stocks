function loginSuccess(id) {

    var content = `
    <div id="successContainer">
        <div id="successMessage">
            Welcome back!
               <div id="loginSuccessPage"></div> 
    </div>
    
    `;
    document.getElementById(id).innerHTML = content;
}
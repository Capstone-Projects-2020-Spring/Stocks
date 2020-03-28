function reset(id) {

    var content = `
    <div id="resetForm">
        <h1 style="text-align: center;">Reset Password</h1>
       <div id="formContent">
       <label>Enter Password</label><br>
       <input type="password" id="password1"/><br> 
       <label>Re-enter Password</label><br>
       <input type="password" id="password2"/><br>
       <input class="buttons" type="button" value="Reset" onclick="reset.resetSubmit()"/>
       <div id="errMessage"></div>
        </div>
    </div>
    `;

    document.getElementById(id).innerHTML = content;
}

reset.resetSubmit = function(){
    if (document.getElementById('password1').value === document.getElementById('password2').value){
        // open page, will later take to loginSuccess page then auto redirect to profile page
        window.open("#/resetSuccess", "_self");
        //display login success page briefly then redirect to profile page
        setTimeout("window.location.replace('#/login')", 1500);
    }
}
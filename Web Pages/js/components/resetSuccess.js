function resetSuccess(id) {

    var content = `
    <div id="resetSuccessContainer">
        <div id="resetSuccessMessage">
            Your password has been reset.
               <div id="resetSuccessPage"></div> 
    </div>
    
    `;
    document.getElementById(id).innerHTML = content;
}
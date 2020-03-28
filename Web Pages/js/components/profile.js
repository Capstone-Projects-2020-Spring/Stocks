function myProfile(id) {

    var content = `
    <div id="profileContainer">
        <div id="Profile">
            This is your account.
               <div id="profilePage"></div> 
    </div>
    
    `;
    document.getElementById(id).innerHTML = content;
}
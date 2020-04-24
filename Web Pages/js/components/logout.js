//learned user logout from https://www.youtube.com/watch?v=eS-yU_6aKEE --> will modify to fit webstie
function logout(id) {

    var content = `
    <div id="registerForm">
        <h1 style="text-align: center;">Are you sure you want to logout?</h1>
            <button class="buttons" id="logoutBtn" style="position: relative; left: 35%;" >Logout</button>
    </div>
    <div id="foot2">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </div>
    `;


    document.getElementById(id).innerHTML = content;

    const logout = document.querySelector('#logoutBtn');
    logout.addEventListener('click', (e) => {
        //prevents page from refreshing when info is submitted
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            console.log('signed out');
            var logoutContent = `
             <div id="registerForm">
            <h1 style="text-align: center;">Logout Successful!</h1>
            </div>
            `;
            document.getElementById(id).innerHTML = logoutContent;
        });
    });

}


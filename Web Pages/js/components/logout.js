//learned user logout from https://www.youtube.com/watch?v=eS-yU_6aKEE --> will modify to fit webstie
function logout(id) {

    var content = `
    <div id="registerForm">
        <h1 style="text-align: center;">Are you sure you want to logout?</h1>
            <button class="buttons" id="logoutBtn" style="position: relative; left: 35%;" >Logout</button>
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


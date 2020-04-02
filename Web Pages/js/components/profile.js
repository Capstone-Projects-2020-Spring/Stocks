function profile(id) {

    auth.onAuthStateChanged(user => {
        const loginLink = document.getElementById('login');
        const regLink = document.getElementById('register');


        if(user){
            loginLink.style.display = 'none';
            regLink.style.display = 'none';
            var content = `
    <div class="profileContainer">
        <div class="Profile">
            Welcome user, Admin.             
            
            Your total funds for this session are: 
            <div class="funds">10000</div>
    </div>
    </div>
    `;
            document.getElementById(id).innerHTML = content;
        } else{
            loginLink.style.display = 'inline-block';
            regLink.style.display = 'inline-block';
            var content = `
    <div class="profileContainer">
        <div class="Profile"> You are logged out!</div>
    </div>

    `;
            document.getElementById(id).innerHTML = content;
        }
    })

    // document.getElementById(id).innerHTML = content;



}

function profile(id) {

    auth.onAuthStateChanged(user => {


        if(user){
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

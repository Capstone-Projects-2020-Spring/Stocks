function myProfile(id) {

    var content = `
    <div class="profileContainer">
        <div class="Profile">
            Welcome user, Admin.             
            
            Your total funds for this session are: 
            <div class="funds">10000</div>
    </div>

    `;
    document.getElementById(id).innerHTML = content;
}

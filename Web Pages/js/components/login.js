function login(id) {

    var content = `
    <div id="loginForm">
        <h1 style="text-align: center;">Login!</h1>
        <form id="loginFormContent">
            <label for="email">Email</label><br>
            <input type="text" name="email" id="loginEmail"><br>
            <label for="password">Password</label><br>
            <input type="password" name="password" id="loginPassword"><br>
            <button class="buttons" id="loginButton">Login</button>
        </form>
    
    </div>
    `;
    document.getElementById(id).innerHTML = content;

    const login = document.querySelector('#loginFormContent');
    login.addEventListener('submit', (e) =>{
        //prevents page from refreshing when info is submitted
        e.preventDefault();
        const email = login['loginEmail'].value;
        const password = login['loginPassword'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred=>{
            console.log(cred.user);
            login.reset();
        });

    });

}

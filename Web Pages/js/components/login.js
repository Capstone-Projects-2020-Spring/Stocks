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
    
     <div id="foot2">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
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
            profile(id);
        });

    });

}

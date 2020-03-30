//learned user registration from https://www.youtube.com/watch?v=wkdCpktUfGg --> will modify to fit webstie
function register(id) {

    var content = `
    <div id="registerForm">
        <h1 style="text-align: center;">Create New Account!</h1>
        <form id="formContent">
            <label for="email">Email</label><br>
            <input type="text" name="email" id="regEmail"><br>
            <label for="password">Password</label><br>
            <input type="password" name="password" id="regPassword"><br>
            <button class="buttons" id="regButton">Register</button>
        </form>
    
    </div>
    `;
    document.getElementById(id).innerHTML = content;

    const registerForm = document.querySelector('#formContent');
    registerForm.addEventListener('submit', (e) =>{
        //prevents page from refreshing when info is submitted
        e.preventDefault();
        const email = registerForm['regEmail'].value;
        const password = registerForm['regPassword'].value;

        auth.createUserWithEmailAndPassword(email, password).then(cred=>{
            console.log(cred)
            registerForm.reset();
        })

    })

    // const userId = document.getElementById('userId');
    // const firstName = document.getElementById('firstName');
    // const lastName = document.getElementById('lastName');
    // const email = document.getElementById('email');
    // const addBtn = document.getElementById('addBtn');
    // const updateBtn = document.getElementById('updateBtn');
    // const removeBtn = document.getElementById('removeBtn');
    //
    // const database = firebase.database();
    //
    //
    // addBtn.addEventListener('click', (e)=>{
    //     e.preventDefault();
    //     database.ref('/users/' + userId.value).set({
    //         first_name: firstName.value,
    //         last_name: lastName.value,
    //         email: email.value
    //     });
    // });

}



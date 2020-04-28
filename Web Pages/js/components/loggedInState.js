<!--Appearance of drop down menu items when user is logged in or logged out. -->
auth.onAuthStateChanged(user => {
    const loginLink = document.getElementById('login');
    const regLink = document.getElementById('register');
    const logoutLink = document.getElementById('logout');

    if (user) {
        loginLink.style.display = 'none';
        regLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        regLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
})

function togglePasswordVisibility() {
    const passwordInput = document.querySelector('#password');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

document.querySelector('#toggle').addEventListener('click', togglePasswordVisibility);
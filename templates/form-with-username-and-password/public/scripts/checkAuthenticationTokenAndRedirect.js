function checkAuthenticationTokenAndRedirect() {
    const target = "<TARGET_URL>";
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = `${target}`;
    }
}

window.addEventListener('load', checkAuthenticationTokenAndRedirect);
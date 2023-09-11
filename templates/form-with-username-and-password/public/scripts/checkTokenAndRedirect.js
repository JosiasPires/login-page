function checkTokenAndRedirect() {
    const target = "<TARGET_URL>";
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = `${target}?code=${token}`;
    }
}

window.addEventListener('load', checkTokenAndRedirect);
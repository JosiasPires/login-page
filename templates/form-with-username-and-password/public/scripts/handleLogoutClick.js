function handleLogoutClick() {
    const target = "<TARGET_URL>";
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.clear('token');
        window.location.href = `${target}?code=${token}`;
    }
}

document.querySelector('#button_logout').addEventListener('click', handleLogoutClick);
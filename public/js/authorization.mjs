export async function registerUser(username, password) {
    const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        alert("New user created");
        return true;
    } else {
        alert("Registration failed");
        return false;
    }
}

export async function loginUser(username, password) {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);

        let userId = data.id;
        return userId;
    } else {
        alert('Login failed. Please check your credentials.');
        return null;
    }
}

export function logoutUser() {
    sessionStorage.removeItem('userId');
}
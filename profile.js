// Registration Page Logic
if (window.location.pathname.endsWith('index.html')) {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate password and confirm password
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const user = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    });
}

// Login Page Logic
if (window.location.pathname.endsWith('login.html')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login successful!');
            window.location.href = 'profile.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Profile Page Logic
if (window.location.pathname.endsWith('profile.html')) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    document.getElementById('displayUsername').textContent = storedUser.username;
    document.getElementById('displayEmail').textContent = storedUser.email;

    document.getElementById('editProfileBtn').addEventListener('click', function() {
        document.getElementById('profileInfo').style.display = 'none';
        document.getElementById('updateProfileForm').style.display = 'block';
    });

    document.getElementById('updateProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const updatedUser = {
            username: newUsername || storedUser.username,
            email: newEmail || storedUser.email,
            password: newPassword || storedUser.password
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
        window.location.reload();
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
}
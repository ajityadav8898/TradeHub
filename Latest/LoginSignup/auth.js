let container = document.getElementById('container');

setTimeout(() => {
    container.classList.add('sign-in');
}, 200);

console.log("Script loaded"); // Debug: Confirm script is loading

// Debounce function to prevent multiple triggers
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// LOGIN FUNCTION
document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login Successful');
            localStorage.setItem("token", data.token);
            const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            const userRole = tokenPayload.role;

            if (userRole === "admin") {
                window.location.href = "http://localhost:5000/admin.html";
            } else {
                window.location.href = "http://localhost:5000/index.html";
            }
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        alert("Error logging in. Please try again.");
    }
});

// SIGNUP FUNCTION
document.getElementById('signup-btn').addEventListener('click', async () => {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup Successful. Please log in.");
            toggle();
        } else {
            alert(data.message || "Signup failed");
        }
    } catch (error) {
        alert("Error signing up. Please try again.");
    }
});

const toggle = () => {
    const container = document.getElementById("container");

    if (container.classList.contains("sign-in")) {
        container.classList.remove("sign-in");
        container.classList.add("sign-up");
        window.location.hash = "#signup";
    } else {
        container.classList.remove("sign-up");
        container.classList.add("sign-in");
        window.location.hash = "#signin";
    }
};

function checkHash() {
    const container = document.getElementById("container");

    if (window.location.hash === "#signup") {
        container.classList.remove("sign-in");
        container.classList.add("sign-up");
    } else {
        container.classList.remove("sign-up");
        container.classList.add("sign-in");
    }
}

document.addEventListener("DOMContentLoaded", checkHash);
window.addEventListener("hashchange", checkHash);

// LOGOUT FUNCTION
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5000/landing.html";
});

// Forgot Password Functions
const showForgotPassword = debounce(() => {
    console.log("Show modal triggered (debounced)");
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.remove('hidden');
        console.log("Modal should be visible now");
    } else {
        console.log("Modal element not found - check ID in HTML");
    }
}, 300);

function hideForgotPassword() {
    console.log("Hide modal triggered");
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.add('hidden');
        console.log("Modal should be hidden now");
    } else {
        console.log("Modal element not found - check ID in HTML");
    }
}

document.getElementById('reset-password-btn').addEventListener('click', async () => {
    console.log("Reset button clicked");
    const email = document.getElementById('forgot-email').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }
    try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`A password reset link has been sent to ${email}. Check your inbox!`);
            hideForgotPassword();
        } else {
            alert(data.message || 'Failed to send reset link.');
        }
    } catch (error) {
        alert('Error sending reset link. Please try again.');
    }
});
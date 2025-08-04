
const urlParams = new URLSearchParams(window.location.search);
const isAddAccount = urlParams.get('add'); // check for add flag

const alreadyLoggedIn = JSON.parse(localStorage.getItem('login'));

if (alreadyLoggedIn && !isAddAccount) {
    window.location.href = 'Gemini.html'; // redirect ONLY if not adding account
}


document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    // Reset error visibility
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');

    // Email validation
    if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
        emailError.textContent = 'Please enter a valid email.';
        emailError.classList.remove('hidden');
        isValid = false;
    }

    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Please enter a valid password.'
        passwordError.classList.remove('hidden');
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) return;

    try {
        const response = await fetch('http://localhost:8080/signinData');
        const data = await response.json();

        const user = data.find(v => v.email === email.value && v.password === password.value);

        if (user) {
            let existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

            // Add only if email not exists already
            if (!existingAccounts.some(acc => acc.email === user.email)) {
                existingAccounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(existingAccounts));
            }

            localStorage.setItem('login', JSON.stringify(user));
            window.location.href = 'Gemini.html';
        }else {
            alert('Invalid email or password');
        }



    } catch (error) {
        console.log('Login Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});

function switchAccount(email) {
    const allAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = allAccounts.find(acc => acc.email === email);
    if (user) {
        localStorage.setItem('login', JSON.stringify(user));
        window.location.href = 'Gemini.html';
    }
}


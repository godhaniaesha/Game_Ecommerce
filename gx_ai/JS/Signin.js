document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPassword = document.getElementById('confirmPassword');
    const type = confirmPassword.type === 'password' ? 'text' : 'password';
    confirmPassword.type = type;
    this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
});

document.getElementById('signInForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');

    // Reset error messages
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');
    confirmError.classList.add('hidden');

    let isValid = true;

    // Name validation
    if (!name.value) {
        nameError.textContent = 'Please enter a valid name.';
        nameError.classList.remove('hidden');
        isValid = false;
    } else if (name.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters.';
        nameError.classList.remove('hidden');
        isValid = false;
    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email.';
        emailError.classList.remove('hidden');
        isValid = false;
    }

    // Password validation
    if (!password.value) {
        passwordError.textContent = 'Please enter a password.';
        passwordError.classList.remove('hidden');
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.classList.remove('hidden');
        isValid = false;
    }



    // Confirm password match
    if (password.value !== confirmPassword.value) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) return;

    // Submit if all valid
    fetch('http://localhost:8080/signinData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })
    })
        .then(() => {
            const newUser = {
                name: name.value,
                email: email.value,
                password: password.value // Include this so it works with login.js
            };

            localStorage.setItem('login', JSON.stringify(newUser));

            let existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

            // Add only if email doesn't already exist
            if (!existingAccounts.some(acc => acc.email === newUser.email)) {
                existingAccounts.push(newUser);
                localStorage.setItem('accounts', JSON.stringify(existingAccounts));
            }

            window.location.href = 'gemini.html';



            

        })

        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save. Try again.');
        });
});

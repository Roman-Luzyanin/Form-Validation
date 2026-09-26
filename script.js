const form = document.querySelector('form');

const email = document.querySelector('.email input');
const emailWarning = document.querySelector('.email p');
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const password = document.querySelector('.password input');
const passwordWarning = document.querySelector('.password p');
const togglePassword = document.querySelector('.togglePassword');
const requirements = document.querySelector('.requirements');

const length = document.querySelector('.requirements .length');
const lowercase = document.querySelector('.requirements .lowercase');
const uppercase = document.querySelector('.requirements .uppercase');
const number = document.querySelector('.requirements .number');
const specChar = document.querySelector('.requirements .specChar');

const confirmation = document.querySelector('.confirmation input');
const confirmationWarning = document.querySelector('.confirmation p');
const toggleConfirmation= document.querySelector('.toggleConfirmation');

form.addEventListener('submit', (e) => {
	if (!form.checkValidity()) {
		e.preventDefault();
		if (email.validity.valueMissing) {
			emailWarning.style.display = 'block';
			email.classList.add('invalid');
		}
		
		if (password.validity.valueMissing) {
			passwordWarning.style.display = 'block';
			password.classList.add('invalid');
		}
		
		if (confirmation.validity.valueMissing) {
			confirmationWarning.style.display = 'block';
			confirmation.classList.add('invalid');
		}
	} else alert('Well done! High five!');
});

email.addEventListener('input', () => {
	emailWarning.style.display = 'none';
	email.value = email.value.trim();
	
	if (!emailRegExp.test(email.value)) {
		email.setCustomValidity('Please enter valid email');
		email.className = '';
		
	} else {
		email.setCustomValidity('');
		email.className = 'valid';
	}
});

email.addEventListener('blur', () => {
	if (!emailRegExp.test(email.value)) {
		emailWarning.style.display = 'block';
		emailWarning.textContent = email.value === '' ?
						'Required field' : 'Please enter valid email';
		email.classList.add('invalid');
	}
});

password.addEventListener('input', () => {
	password.value = password.value.trim();
	const value = password.value;
	
	const validation = {
		length: value.length >= 8,
		lowercase: /[a-z]/.test(value),
		uppercase: /[A-Z]/.test(value),
		number: /\d/.test(value),
		specChar: /[!@$%&*?]/.test(value),
	};

	checkValidity(length, validation.length);
	checkValidity(lowercase, validation.lowercase);
	checkValidity(uppercase, validation.uppercase);
	checkValidity(number, validation.number);
	checkValidity(specChar, validation.specChar);
	
	const isValid = Object.values(validation).every(Boolean);
	
	if (isValid) {
		password.setCustomValidity('');
		password.className = 'valid';
		requirements.style.display = 'none';
	} else {
		password.setCustomValidity('invalid');
		password.className = '';
		passwordWarning.style.display = 'none'
	}
	
	confirmationWarning.style.display = 'none';
	confirmation.className = '';
});

password.addEventListener('blur', () => {
	if (password.validationMessage !== '' && password.value !== '') {
		requirements.style.display = 'block';
		password.classList.add('invalid');
	} else if (password.value === '') {
		requirements.style.display = 'none';
		passwordWarning.style.display = 'block';
		password.classList.add('invalid');
	}
	
	if (confirmation.value !== '' && confirmation.value !== password.value) {
		confirmation.setCustomValidity('invalid');
		confirmation.className = 'invalid';
		confirmationWarning.style.display = 'block';
		confirmationWarning.textContent = 'Password does not match!';
	} else if (confirmation.value !== '' && confirmation.value === password.value) {
		confirmation.setCustomValidity('');
		confirmation.className = 'valid';
		confirmationWarning.style.display = 'none';
	}
});

confirmation.addEventListener('input', () => {
	confirmation.value = confirmation.value.trim();
	
	if (confirmation.value === password.value && confirmation.value !== '') {
		confirmation.setCustomValidity('');
		confirmation.className = 'valid';
		confirmationWarning.style.display = 'none';
	} else {
		confirmation.setCustomValidity('invalid');
		confirmation.className = '';
		confirmationWarning.style.display = 'none';
	}
});

confirmation.addEventListener('blur', () => {
	if (confirmation.validationMessage !== '') {
		confirmationWarning.style.display = 'block';
		confirmationWarning.textContent = confirmation.value === '' ?
												'Required field' : 'Password does not match!';
		confirmation.classList.add('invalid');
	}
});

[togglePassword, toggleConfirmation].forEach(btn => btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
}));

togglePassword.addEventListener('click', () => toggleVisibility(password, togglePassword));
toggleConfirmation.addEventListener('click', () => toggleVisibility(confirmation, toggleConfirmation));

function toggleVisibility(element, button) {
	element.type = element.type === 'password' ? 'text' : 'password';
    button.classList.toggle('crossed');														 
}

function checkValidity(element, isValid) {
	isValid ? element.className = 'green' : element.className = 'red';
}



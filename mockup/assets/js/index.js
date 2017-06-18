window.onload = function() {

	scrollTop(window.scrollY, 6);

	//I could be using jQuery, but I'm just having fun here with vanilla javascript.
	//To use jQuery instead, add jQuery script to html file, then...
		//replace document.querySelector with $, use removeClass and addClass functions
		// or better than using a class, use the .show() and .hide() functions, finally
		//use .click() instead of addEventListener, .animate() instead of custom scroll functions
		//and instead of handling for form data with an email address, use $.ajax().done().fail()

	//buttons
	const formOpenBtn = document.querySelector('.main-description__button');
	// const formSubmitBtn = document.querySelector('.tribute-form__form--button');
	const formCloseBtn = document.querySelectorAll('.form-hide__button');

	//DOM elements
	const tributeFormPanel = document.querySelector('.tribute-form');
	const tributeForm = document.querySelector('.tribute-form__form');
	const tributeFormTitle = document.querySelector('.tribute-form__title');
	const thankYou = document.querySelector('.tribute-form__thanks');
	const formCloseCtrl = document.querySelector('.form-hide');
	const nameInput = document.querySelector('input[name="name"]');
	const nameValidation = document.querySelector('.validation--name');
	const namePlaceholder = document.querySelector('.placeholder-text--name');
	const emailPlaceholder = document.querySelector('.placeholder-text--email');
	const emailValidation = document.querySelector('.validation--email');
	const emailInput = document.querySelector('input[name="email"]');

	//function called by click on add tribute button
	function openForm() {
		tributeFormPanel.classList.remove('hidden');
		tributeFormPanel.classList.remove('closed');
		formCloseCtrl.classList.remove('hidden');
		scrollToForm(1, 6);
	}

	//animation to scroll from top of page to top of form
	//recursive function, the higher the number of speed the faster the scroll 
	function scrollToForm(x, speed) {
		if( x >= 512) {
			return;
		}
		window.scroll(0, x);
		x+=speed;
		setTimeout(function(){scrollToForm(x, speed)}, 1);
	}

	//animation to scroll back to top of page after user clicks on close button
	function scrollTop(x, speed) {
		if( x <= 0) {
			return window.scroll(0, 0);
		}
		window.scroll(0, x);
		x-=speed;
		setTimeout(function(){scrollTop(x, speed)}, 1);
	}

	//hides form after submitted entries validated
	function hideForm() {
		tributeForm.classList.add('hidden');
		tributeFormTitle.classList.add('hidden');
	}

	//hides form and shows thankyou message
	function showThanks() {
		hideForm();
		thankYou.classList.remove('hidden');
	}

	//resets form and DOM after user clicks on close button
	function domReset() {
		formCloseCtrl.classList.add('hidden');
		tributeFormPanel.classList.add('hidden');
		thankYou.classList.add('hidden');
		tributeForm.classList.remove('hidden');
		tributeFormTitle.classList.remove('hidden');
		tributeFormPanel.classList.add('closed');
		setTimeout(function(){scrollTop(window.scrollY, 6)}, 50);
	}

	//validates and submits form information
	function handleSubmit(e) {
		e.preventDefault(); //prevent page reload
		let name = e.target.name.value.trim();
		let email = e.target.email.value.trim();

		//returns true or false if valid
		let validName = validate("name", name);
		let validEmail = validate("email", email);

		//update DOM for validation if absent
		updateValidation('name', validName);
		updateValidation('email', validEmail);

		if (validEmail && validName) {

			showThanks();
			tributeForm.reset();
			//send FORM DATA via AJAX here !!!!! or perhaps through node/express server???
		}
	}

	function updateValidation(element, validation) {
		const input = element === 'email' ? emailInput : nameInput;
		const inputValidation = element === 'email' ? emailValidation : nameValidation;
		if (validation) {
			input.classList.remove('invalid');
			input.classList.add('valid');
			inputValidation.classList.add('hidden');
		} else {
			input.classList.add('invalid');
			input.classList.remove('valid');
			inputValidation.classList.remove('hidden');
		}
	}

	function validateInput(e) {
		updateValidation(e.target.name, validate(e.target.name, e.target.value))
	}


	function validate(element, value) {
		//check for value entered into name field and check email against regex for email
		if(element === 'name') {
			return !value.trim() ? false : true;
		} else {
			let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
			return value.match(regex);
		}
	}

	function showPlaceholder(e) {
		e.target.name === 'email' ? 
			emailPlaceholder.classList.remove('hidden') 
			: namePlaceholder.classList.remove('hidden');
	}

	function hidePlaceholder(e) {
		e.target.name === 'email' ? 
			emailPlaceholder.classList.add('hidden') 
			: namePlaceholder.classList.add('hidden');
	}

	formOpenBtn.addEventListener('click', openForm);
	formCloseBtn.forEach(button=>button.addEventListener('click', domReset));

	tributeForm.addEventListener('submit', handleSubmit);

	nameInput.addEventListener('input', validateInput);
	nameInput.addEventListener('focus', showPlaceholder);
	nameInput.addEventListener('blur', hidePlaceholder);

	emailInput.addEventListener('input', validateInput);
	emailInput.addEventListener('focus', showPlaceholder);
	emailInput.addEventListener('blur', hidePlaceholder);
	
}
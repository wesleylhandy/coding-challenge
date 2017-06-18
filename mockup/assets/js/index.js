window.onload = function() {

	scrollTop(window.scrollY);

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

	let validInput = false; //initialize assuming empty 

	function openForm() {
		tributeFormPanel.classList.remove('hidden');
		formCloseCtrl.classList.remove('hidden');
		scrollToForm(1);
	}

	function scrollToForm(x) {
		if( x >= 512) {
			return;
		}
		window.scroll(0, x);
		x+=6;
		setTimeout(function(){scrollToForm(x)}, 1);
	}

	function scrollTop(x) {
		if( x <= 0) {
			return window.scroll(0, 0);
		}
		window.scroll(0, x);
		x-=6;
		setTimeout(function(){scrollTop(x)}, 1);
	}

	function hideForm() {
		tributeForm.classList.add('hidden');
		tributeFormTitle.classList.add('hidden');
	}

	function showThanks() {
		hideForm();
		thankYou.style.display = 'inherit';
	}

	function reset() {
		formCloseCtrl.classList.add('hidden');
		tributeFormPanel.classList.add('hidden');
		thankYou.classList.add('hidden');
		tributeForm.classList.remove('hidden');
		tributeFormTitle.classList.remove('hidden');
		tributeFormPanel.classList.add('hidden');
		scrollTop(window.scrollY);
	}

	function closeForm() {
		tributeFormPanel.style.display = 'none';
		formCloseCtrl.style.display = 'none';
	}

	function handleSubmit(e) {
		e.preventDefault(); //prevent page reload
		let name = e.target.name.value.trim();
		let email = e.target.email.value.trim();

		let validName = validate("name", name);
		let validEmail = validate("email", email);

		if (validEmail && validName) {

			nameInput.classList.remove('invalid');
			nameValidation.classList.add('hidden');

			showThanks();
			tributeForm.reset();
			//send FORM DATA via AJAX here !!!!! or perhaps through node/express server???
		}
	}

	function validateInput(e) {
		if(validate(e.target.name, e.target.value)) {
			e.target.classList.remove('invalid');
			e.target.name === 'email' ? 
				emailValidation.classList.add('hidden') 
				: nameValidation.classList.add('hidden');
		} else {
			e.target.classList.add('invalid');
			e.target.name === 'email' ? 
				emailValidation.classList.remove('hidden') 
				: nameValidation.classList.remove('hidden');
		}
		//since this is called on a blur event, will hide placeholder text
		e.target.name === 'email' ? 
			emailPlaceholder.classList.add('hidden') 
			: namePlaceholder.classList.add('hidden');
	}

	function validate(element, value) {
		if(element === 'name') {
			return !value ? false : true;
		} else {
			let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
			return value.match(regex);
		}
	}

	function updatePlaceholder(e) {
		e.target.name === 'email' ? 
			emailPlaceholder.classList.remove('hidden') 
			: namePlaceholder.classList.remove('hidden');
	}

	formOpenBtn.addEventListener('click', openForm);
	// formSubmitBtn.addEventListener('click', showThanks);
	formCloseBtn.forEach(button=>button.addEventListener('click', reset));

	tributeForm.addEventListener('submit', handleSubmit);

	nameInput.addEventListener('blur', validateInput);
	nameInput.addEventListener('focus', updatePlaceholder);
	emailInput.addEventListener('focus', updatePlaceholder);
	emailInput.addEventListener('blur', validateInput);

}
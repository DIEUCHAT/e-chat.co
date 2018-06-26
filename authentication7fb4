function init()
{
	var streamOpened = true;
	var reloading = false;

	var guestUrl = '/authentication/guest';
	var loginUrl = '/authentication/login';
	var registerUrl = '/authentication/registration/new';

	var $formTitleGuest = $('.form-title.guest');
	var $formTitleLogin = $('.form-title.login');
	var $formTitleRegister = $('.form-title.register');
	
	var $guestFormSwitch = $('.form-switch.guest');
	var $loginFormSwitch = $('.form-switch.login');
	var $registerFormSwitch = $('.form-switch.register');
	
	var $formWrapPass = $('#wrap-pass-1');
	var $formWrapPass2 = $('#wrap-pass-2');

	var $inputUsername = $('#wrap-username > input[type=text]');
	var $inputPassword = $('#wrap-pass-1 > input[type=password]');
	var $inputPassword2 = $('#wrap-pass-2 > input[type=password]');
	
	var $rememberAccountLabel = $('#remember-account > label');
	var $rememberBox = $rememberAccountLabel.find('input[type=checkbox]');
	
	var $guestSubmit = $('.form-submit.guest');
	var $loginSubmit = $('.form-submit.login');
	var $registerSubmit = $('.form-submit.register');

	var $formSubmitResult = $('#form-submit-result');
	
	$guestFormSwitch.add($loginFormSwitch).add($registerFormSwitch).on('click', hideForms);
	$guestFormSwitch.on('click', showGuestForm);
	$loginFormSwitch.on('click', showLoginForm);
	$registerFormSwitch.on('click', showRegisterForm);
	
	$guestSubmit.on('click', doGuest);
	$loginSubmit.on('click', doLogin);
	$registerSubmit.on('click', doRegister);

	function hideForms()
	{
		$formTitleGuest
			.add($formTitleLogin)
			.add($formTitleRegister)
		
			.add($guestFormSwitch)
			.add($loginFormSwitch)
			.add($registerFormSwitch)
			
			.add($formWrapPass)
			.add($formWrapPass2)

			.add($rememberAccountLabel)
			
			.add($guestSubmit)
			.add($loginSubmit)
			.add($registerSubmit)
			.addClass('display-none');
		
		$formWrapPass
			.add($formWrapPass2)
			.find('input').val('');
		
		$formSubmitResult.val('');
		$rememberBox.prop('checked', false);
	}

	function showGuestForm()
	{
		$formTitleGuest
			.add($loginFormSwitch)
			.add($registerFormSwitch)
			.add($guestSubmit)
			.removeClass('display-none');
	}

	function showLoginForm()
	{
		$formTitleLogin
			.add($guestFormSwitch)
			.add($registerFormSwitch)
			.add($formWrapPass)
			.add($rememberAccountLabel)
			.add($loginSubmit)
			.removeClass('display-none');
	}

	function showRegisterForm()
	{
		$formTitleRegister
			.add($guestFormSwitch)
			.add($loginFormSwitch)
			.add($formWrapPass)
			.add($formWrapPass2)
			.add($rememberAccountLabel)
			.add($registerSubmit)
			.removeClass('display-none');
	}

	function sendAuthRequest(url, params)
	{
		if (!streamOpened)
		{
			return;			
		}
		
		$formSubmitResult.text('');
		
		streamOpened = false;
		$.ajax(
		{
			url: url,
			method: 'POST',
			data: params,
			success: function(jsonReply)
			{
				var reply = JSON.parse(jsonReply);
				if (reply.success)
				{
					reloading = true;
					location.reload();
				}
				else
				{
					displayServerReply(reply.msg);
				}
			},
			complete: function()
			{
				streamOpened = true;
				if (!reloading)
				{
					grecaptcha.reset();
				}
			},
			error: displayGenericError
		});
	}
	
	function doGuest()
	{
		var name = $.trim($inputUsername.val());
		var captcha = grecaptcha.getResponse();
		if(name.length < 1)
		{
			displayEmptyForm();
		}
		else if (!captcha)
		{
			displayEmptyCaptcha();
		}
		else
		{
			var params = 
			{
				u: name,
				g: captcha 
			};
			
			sendAuthRequest(guestUrl, params);
		}
	}

	function doLogin()
	{
		var name = $.trim($inputUsername.val());
		var pass = $inputPassword.val();
		var captcha = grecaptcha.getResponse();
		var remember = $rememberBox.prop('checked');
		
		if(name.length < 1 || pass.length < 1)
		{
			displayEmptyForm();
		}
		else if (!captcha)
		{
			displayEmptyCaptcha();
		}
		else
		{
			var params =
			{
				u: name,
				p: pass,
				r: remember,
				g: captcha
			};
				
			sendAuthRequest(loginUrl, params);
		}
	}

	function doRegister()
	{
		var name = $.trim($inputUsername.val());
		var pass = $inputPassword.val();
		var pass2 = $inputPassword2.val();
		var captcha = grecaptcha.getResponse();
		var remember = $rememberBox.prop('checked');
		
		if(name.length < 1 || pass.length < 1 || pass2.length < 1)
		{
			displayEmptyForm();
		}
		else if (pass != pass2)
		{
			displayPasswordMismatch();
		}
		else if (!captcha)
		{
			displayEmptyCaptcha();
		}
		else
		{
			var params = 
			{
				u: name,
				p: pass,
				r: remember,
				g: captcha
			};
			sendAuthRequest(registerUrl, params);
		}
	}
	
	function displayEmptyForm()
	{
		$formSubmitResult.text('Please fill in all the fields.');
	}
	
	function displayPasswordMismatch()
	{
		$formSubmitResult.text('Passwords must match.');
	}
	
	function displayEmptyCaptcha()
	{
		$formSubmitResult.text('Please fill in the re-captcha field.');
	}
	
	function displayGenericError()
	{
		$formSubmitResult.text('An unknown error occurred. Please try again later.');
	}
	
	function displayServerReply(reply)
	{
		$formSubmitResult.text(reply);
	}
	
	$guestFormSwitch.click();
	$inputUsername.focus();
};

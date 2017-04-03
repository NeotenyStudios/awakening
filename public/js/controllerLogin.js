/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllerLogin.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 17:25:22 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 15:23:43 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

jQuery('document').ready(() => {
	const signupErrorDiv = $('#upError');

	$('.logChoice').bind('mouseenter', (e)	=> {$(e.currentTarget).css({'border-bottom' : '5px solid #121212'})});
	$('.logChoice').bind('mouseleave', (e)	=> {$(e.currentTarget).css({'border-bottom' : ''})});
	$('.logChoice').bind('click', (e)		=> {swapLogType(e)});
	$('#valSignup').bind('click', ()		=> {handleSignUp()});
	$('#valSignin').bind('click', ()		=> {handleSignIn()});

	function swapLogType(e) {
		let signUpForm	= $('.signUpForm');
		let signInForm	= $('.signInForm');
		let toHide		= $(e.currentTarget).attr('id') !== 'signinChoiceWrap' ?  signInForm : signUpForm;
		let toShow		= toHide === signUpForm ? signInForm : signUpForm;

		if (toShow.css('display') === 'block')
			return (0);
		toShow.css({'opacity' : '0'});
		toHide.animate({'opacity' : '0'}, 300, () => {
			toHide.css({'display' : 'none'})
			toShow.css({'display' : 'block'});
			toShow.animate({'opacity' : '1'}, 300);
		});
	}

	function swapErrorMessage(div, message) {
		div.stop(true, false).animate({'color' : '#fff'}, 50, () => {
			div.text(message);
			div.stop(true, false).animate({'color' : '#EF5350'}, 250);
		});
	}

	function handleSignUp() {
		const inputArray = [
			$('#emailUp'),
			$('#gametagUp'),
			$('#pswUp'),
			$('#r_pswUp'),
		];
		const validity = verifInputArray(inputArray);

		if ($('#r_pswUp').val() !== $('#pswUp').val())
		{
			inputBlink(false, $('#r_pswUp'));
			inputBlink(false, $('#pswUp'));
			swapErrorMessage(signupErrorDiv, 'Your passwords do not match');
		}
		else if (validity.globalStatus === true)
		{
			const ajaxData = {
				'email' 	: $('#emailUp').val(),
				'gametag'	: $('#gametagUp').val(),
				'password'	: $('#pswUp').val(),
			};

			$.ajax({
				'url'		: '/handleSignup',
				'method'	: 'POST',
				'data'		: JSON.stringify(ajaxData),
				'success'	: (data) => {
					const ajaxRet = JSON.parse(data);

					if (ajaxRet.code === 0)
					{
						$('#emailIn').val(ajaxData.email);
						$('#pswIn').val(ajaxData.password);
						$('#signinChoiceWrap').click();
					}
					else if (ajaxRet.code === 3)
					{
						inputBlink(false, $('#emailUp'));
						swapErrorMessage(signupErrorDiv, 'Email is already taken !');
					}
				}
			})
		}
		else
		{
			console.log('errors');
		}
	}

	function handleSignIn() {
		const ajaxData = {
			'email' 	: $('#emailIn').val(),
			'password'	: $('#pswIn').val(),
		};
		$.ajax({
			'url'		: '/handleSignin',
			'method'	: 'POST',
			'data'		: JSON.stringify(ajaxData),
			'success'	: (data) => {
				const ajaxRet = JSON.parse(data);

				console.log(data);
				if (ajaxRet.code === 0)
				{
					document.cookie = "awakeningUniqueSessionId=" + ajaxRet.sessionId;
					self.location.href = self.location.origin + '/awakening.html'
				}
			}
		});
	}
});
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllerLogin.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 17:25:22 by mgras             #+#    #+#             */
/*   Updated: 2017/03/28 18:09:48 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

jQuery('document').ready(() => {
	$('.logChoice').bind('mouseenter', (e)	=> {$(e.currentTarget).css({'border-bottom' : '5px solid #121212'})});
	$('.logChoice').bind('mouseleave', (e)	=> {$(e.currentTarget).css({'border-bottom' : ''})});
	$('.logChoice').bind('click', (e)		=> {swapLogType(e)});

	function swapLogType(e) {
		let signUpForm	= $('.signUpForm');
		let signInForm	= $('.signInForm');
		let toHide		= $(e.currentTarget).attr('id') === 'signinChoiceWrap' ?  signInForm : signUpForm;
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

	function handleSignUp() {
		const email			= $('.signUpForm > #email');
		const gametag		= $('.signUpForm > #gametag');
		const yearOfBirth	= $('.signUpForm > #yearOfBirth');
		const psw			= $('.signUpForm > #psw');
		const r_psw			= $('.signUpForm > #r_psw');

	}
});
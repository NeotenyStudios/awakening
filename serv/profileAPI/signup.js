/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signup.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/01 14:25:56 by mgras             #+#    #+#             */
/*   Updated: 2017/04/01 16:50:49 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

const	userManipulation	= require('./userManipulation');
let		ex					= {};

function handleSignupRequest(req, res, cb) {
	let body = '';

	res.writeHead(200, {'Content-Type' : 'text/plain'});
	req.on('data', (data) => {body += data.toString()});
	req.on('end', () => {
		const form = JSON.parse(body);

		verifSignupInputs(form, (err, resp) => {
			if (err != null)
				res.end(JSON.stringify({'code' : err.code, 'message' : err.errorMsg}));
			else
			{
				console.log('in else');
				userManipulation.addUser(form, (err, resp) => {
					console.log('err :' + err, 'resp :' +  resp);
					if (err !== null)
						res.end(JSON.stringify({'code' : 3, 'message' : err}));
					else
						res.end(JSON.stringify({'code' : 0, 'message' : 'You just Signed Up !'}))
				});
			}
		});
	});
}

function verifSignupInputs(form, cb) {
	const verifEmail = function (string) {
		const reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'gi');

		return (reg.test(string));
	}
	const verifStringAlphaNumLength = function (string, minLength, maxLength) {
		const reg = new RegExp(/^[a-zA-Z0-9_]*$/, 'g');

		if (maxLength !== undefined && string.length > maxLength)
			return (false);
		if (minLength !== undefined && string.length < minLength)
			return (false);
		return(reg.test(string));
	}
	const verifStringLength = function (string, minLength, maxLength){
		if (maxLength !== undefined && string.length > maxLength)
			return (false);
		if (minLength !== undefined && string.length < minLength)
			return (false);
		return (true);
	}
	let retObj = {};

	if (form.email === undefined || form.password === undefined || form.gametag === undefined)
		retObj = {errorMsg : 'A mandatory field is missing', code : 1};
	else
	{
		let retValue = true;

		retValue = retValue === false ? false : verifEmail(form.email);
		retValue = retValue === false ? false : verifStringAlphaNumLength(form.gametag, 6, 14);
		retValue = retValue === false ? false : verifStringLength(form.password, 6, undefined);
		if (retValue === false)
			retObj = {errorMsg : 'Field verification test did not pass', code : 2};
		else
			retObj = null;
	}
	cb(retObj, retObj === null);
}

ex.handleSignupRequest = handleSignupRequest;
ex.verifSignupInputs = verifSignupInputs;
module.exports = ex;
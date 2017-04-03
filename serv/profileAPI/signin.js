/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signin.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 12:54:19 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 15:05:00 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strinct";

const	userManipulation	= require('./userManipulation');
let		ex					= {};

function handleSigninRequest(req, res, cb){
	let body = '';

	res.writeHead(200, {'Content-Type' : 'text/plain'});
	req.on('data', (data) => {body += data.toString()})
	req.on('end', () => {
		const form = JSON.parse(body);

		userManipulation.findUser({'email' : form.email}, {}, (err, user) => {
			const inputHash = userManipulation.hashString(form.password)

			if (err !== null)
				res.end(JSON.stringify({'code' : 1, 'message' : 'There was a problem', 'err' : err}));
			else if (user.length !== 1)
				res.end(JSON.stringify({'code' : 2, 'message' : 'There was a problem', 'err' : 'We have a duplicate email somewhere ?'}));
			else if (inputHash === user[0].password)
				cb(user[0].userId);
			else
				res.end(JSON.stringify({'code' : 3, 'message' : 'wrong password or wrong email'}));
		});
	});
}

ex.handleSigninRequest = handleSigninRequest;
module.exports = ex;
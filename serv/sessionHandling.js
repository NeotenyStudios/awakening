/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sessionHandling.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 16:40:27 by mgras             #+#    #+#             */
/*   Updated: 2017/03/27 17:08:42 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

let ex = {};

ex.getCookie = function(req, cb) {
	let		cookieList = req.headers.cookie;

	if (cookieList === undefined)
		cb(null);
	else
	{
		let id = null;
		cookieList = cookieList.split(';');
		for (let i = 0; i < cookieList.length; i++) {
			let cookie = cookieList.split('=');

			if (cookie.length == 2 && cookie[0] === 'awakeningUniqueSessionId')
			{
				id = cookie[1];
				break ;
			}
		}
		cb(id);
	}
}

module.exports = ex;
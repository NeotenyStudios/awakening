/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sessionHandling.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 16:40:27 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 15:14:38 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

let		ex = {};

ex.getCookie = function(req, cb) {
	let		cookieList = req.headers.cookie

	if (cookieList === undefined)
		cb(null);
	else
	{
		let id = null;

		cookieList = cookieList.split(';');
		for (let i = 0; i < cookieList.length; i++) {
			let cookie = cookieList[i].split('=');

			if (cookie.length == 2 && cookie[0] === 'awakeningUniqueSessionId')
			{
				id = cookie[1];
				break ;
			}
		}
		cb(id);
	}
}

ex.getSessionFromSessionId = function(liveSessionsArray, sessionId) {
	return (liveSessionsArray.indexOf(sessionId));
}

ex.getSessionIdFromUserId = function(liveSessionsArray, userId) {
	for (let session in liveSessionsArray) {
		if (liveSessionsArray[session].userId === userId)
			return (session);
	}
	return (undefined);
}

module.exports = ex;
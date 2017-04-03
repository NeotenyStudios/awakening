/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   theCatalyst.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 14:55:41 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 14:37:24 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

const	MongoClient		= require('mongodb').MongoClient;
const	awakeningDb		= 'mongodb://localhost:27018/AWAKENING';
const	fs				= require('fs');
const	path			= require('path');
const	http			= require('http');
const	mainPort		= '8080'
const	fileHandling	= require('./serv/fileHandling');
const	guidGen			= require('./serv/guidGen');
const	sessionHandling	= require('./serv/sessionHandling');
const	signup			= require('./serv/profileAPI/signup');
const	signin			= require('./serv/profileAPI/signin');
const	noLogFiles		= ['controllerLogin.js', 'design.css', 'formVerif.js'];
let		liveSessions	= [];

const server			= http.createServer((req, res) => {
	sessionHandling.getCookie(req, (sessionId) => {
		if (req.url === '/handleSignup')
			signup.handleSignupRequest(req, res);
		else if (req.url === '/handleSignin')
		{
			signin.handleSigninRequest(req, res, (userId) => {
				const newSessionId = guidGen();

				liveSessions[newSessionId] = {
					'userId'	: userId,
					'loginTime'	: new Date()
				}
				res.end(JSON.stringify({'code' : 0, 'sessionId' : newSessionId}));
			});
		}
		else if ((sessionId == null || liveSessions[sessionId] === undefined) && noLogFiles.indexOf(path.basename(req.url)) === -1)
			fileHandling.sendFile(req, res, './public/html/login.html', 'text/html');
		else if (fileHandling[path.extname(req.url)] !== undefined)
			fileHandling[path.extname(req.url)](req, res);
	});
}).listen(mainPort);

console.log('theCatalyst is up and Running on port ' + mainPort);
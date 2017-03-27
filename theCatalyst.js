/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   theCatalyst.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 14:55:41 by mgras             #+#    #+#             */
/*   Updated: 2017/03/27 17:42:13 by mgras            ###   ########.fr       */
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
const	noLogFiles		= ['controllerLogin.js', 'design.css'];
let		liveSessions	= [];

const server			= http.createServer((req, res) => {
	sessionHandling.getCookie(req, (sessionId) => {
		console.log(sessionId == null || liveSessions[sessionId] === undefined);
		console.log(noLogFiles.indexOf(path.basename(req.url)), path.basename(req.url));
		if ((sessionId == null || liveSessions[sessionId] === undefined) && noLogFiles.indexOf(path.basename(req.url)) === -1)
			fileHandling.sendFile(req, res, './public/html/login.html', 'text/html');
		else if (fileHandling[path.extname(req.url)] !== undefined)
			fileHandling[path.extname(req.url)](req, res);
	});
}).listen(mainPort);
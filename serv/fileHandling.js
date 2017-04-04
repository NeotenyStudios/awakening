/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fileHandling.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 15:06:41 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 18:56:57 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

const	path	= require('path');
const	fs		= require('fs');
let		ex		= {};

ex['.js'] = function(req, res){
	fs.readFile('./public/js' + path.dirname(req.url) + '/' + path.basename(req.url), 'utf-8', (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : 'text/js'});
			res.end(content);
		}
	});
}

ex['.jpg'] = function(req, res){
	fs.readFile('./public/medias/jpg/' + path.basename(req.url), (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : 'image/jpg'});
			res.end(content, 'binary');
		}
	});
}

ex['.png'] = function(req, res){
	fs.readFile('./public/medias/png/' + path.basename(req.url), (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : 'image/png'});
			res.end(content, 'binary');
		}
	});
}

ex['.css'] = function(req, res){
	fs.readFile('./public/css/' + path.basename(req.url), 'utf-8', (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : 'text/css'});
			res.end(content);
		}
	});
}

ex['.html'] = function(req, res){
	fs.readFile('./public/html' + path.dirname(req.url) + '/' + path.basename(req.url), 'utf-8', (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : 'text/html'});
			res.end(content);
		}
	});
}

ex.sendFile = function(req, res, localPath, contentType){
	fs.readFile(localPath, 'utf-8', (err, content) => {
		if (err !== null)
			res.end('Your file was not found or an error occured');
		else
		{
			res.writeHeader(200, {'Content-Type' : contentType});
			res.end(content);
		}
	});
}

module.exports = ex;
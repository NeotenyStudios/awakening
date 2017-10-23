/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fileHandling.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/03/27 15:06:41 by mgras             #+#    #+#             */
/*   Updated: 2017/05/22 22:59:30 by anonymous        ###   ########.fr       */
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
	fs.readFile('./public/medias/png' + path.dirname(req.url) + '/' + path.basename(req.url), (err, content) => {
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

/*
ex['.mp4'] = function(req, res){
	const file = path.resolve('./public/medias/mp4' + path.dirname(req.url) + '/' + path.basename(req.url));
	let range;
	let position;
	let start;
	let total;
	let end;
	let chunksize;
	let stream;

	fs.stat(file, function(err, stats){
		if (err)
			res.end('Your file was not found or an error occured');
		start = 0;
		total = stats.size;
		end = total  - 1;
		chunksize = (end - start) + 1;
		res.writeHead(206, {
			"Content-Range": "bytes " + start + "-" + end + "/" + total,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		});
		stream = fs.createReadStream(file, {start : start, end : end}).on("open", function(){
			stream.pipe(res);
		}).on("eror", function(err) {
			res.end(err);
		});
	});
}
*/

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

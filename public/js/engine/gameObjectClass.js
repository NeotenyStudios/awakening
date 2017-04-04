/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gameObjectClass.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 13:45:46 by mgras             #+#    #+#             */
/*   Updated: 2017/04/04 19:06:32 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let gameObject = function (config) {
	this.position		= {
		x : 0,
		y : 0
	}
	this.speed			= {
		x : 0,
		y : 0
	}
	this.acceleration	= {
		x : 0,
		y : 0
	}
	this.rotation		= 0;
	this.image			= {
		'files'				: [],
		'onFrame'			: 0,
		'frames'			: -1,
		'isLoading'			: 0,
		'isAnime'			: false,
		'speedRatio'		: 1 * 1000
	}
	this.currentSate = 'default';
	this.states = {'default' : new AnimationState()};
	this.image.isReady	= false;
	this.size			= {
		'x'	: 0,
		'y'	: 0
	}
	this.layer = 0;
}

gameObject.prototype.loadImage = function(url) {
	let		downloadingImage	= new Image();
	const	position			= this.image.files.length;

	this.image.files[position] = new Image();
	this.image.isLoading += 1;
	downloadingImage.onload = function(_this) {
		_this.image.files[position].src = url;
		_this.image.files[position].isReady = true;
		_this.image.isLoading -= 1;
		_this.image.frames++;
	}(this);
	downloadingImage.src = url;
}

gameObject.prototype.loadImageArray = function(urlArray) {
	for (image in urlArray) {
		this.loadImage(urlArray[image]);
		this.image.isAnime = true;
		this.image.frames = urlArray.length;
	}
}

gameObject.prototype.draw = function (awakening, progress) {
	const	canvas = awakening.canvas;
	const	elapsedTime = awakening.elapsedTime;
	let		image;

	if (this.image.isAnime === true) {
		this.image.onFrame = this.getFramePlacement(elapsedTime);
		image = this.image.files[this.image.onFrame];
	}
	else
		image = this.image.files[0];
	if (image !== undefined)
		canvas.drawImage(image, this.position.x, this.position.y);
}

gameObject.prototype.getFramePlacement = function(elapsedTime) {
	const	percentElapsed	= ((elapsedTime / this.image.speedRatio) * 100);
	const	aproxFramePos	= (this.image.frames * percentElapsed) / 100;
	let 	roundedFramePos;

	roundedFramePos = Math.round(aproxFramePos * 10) / 10;
	roundedFramePos = Math.floor(roundedFramePos);
	if (roundedFramePos >= this.image.frames)
		return (this.image.frames - 1);
	else
		return (roundedFramePos);
}

gameObject.prototype.move = function(x, y) {
	this.position.x = x;
	this.position.y = y;
}

gameObject.prototype.addAnimationState = function(name, state){
	this.states[name] = new AnimationState(name, {});
}
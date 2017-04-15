/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gameObjectClass.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 13:45:46 by mgras             #+#    #+#             */
/*   Updated: 2017/04/07 19:21:55 by mgras            ###   ########.fr       */
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
	this.currentSate	= 'default';
	this.states			= {};
	this.size			= {
		'x'	: 0,
		'y'	: 0
	}
	this.layer			= 0;
	this.weight			= 1;
	this.isGravityBound = false;
	this.collisionBoxes = {};
	this.name			= config.name;
	this.debug			= {
		'collisionBox' : true,
	}
}

gameObject.prototype.setSize = function(width, height) {
	this.size.x = width;
	this.size.y = height;
}

gameObject.prototype.calculateGravity = function() {
	this.acceleration.y -= this.weight;
	this.acceleration.y = this.acceleration.y >= 10 ? 10 : this.acceleration.y;
	this.acceleration.y = this.acceleration.y <= -10 ? -10 : this.acceleration.y
}

gameObject.prototype.modulateSpeed = function() {
	this.speed.y += this.acceleration.y;
	this.speed.y = this.speed.y > 50 ? 50 : this.speed.y;
	this.speed.y = this.speed.y < -50 ? -50 : this.speed.y;
}

gameObject.prototype.resolvePosition = function() {
	this.position.y -= this.speed.y;
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

gameObject.prototype.calculateCollisions = function (awakening) {
	for (let collisionBox in this.collisionBoxes) {
		this.collisionBoxes[collisionBox].checkForCollision();
		if (this.debug === true)
			this.collisionBoxes[collisionBox].drawDebugLines(awakening.canvas);
	}
}

gameObject.prototype.draw = function (awakening, progress) {
	const stateToDraw = this.states[this.currentSate];

	if (stateToDraw !== undefined)
		stateToDraw.draw(this, awakening.canvas);
	else
		console.warn('Unexisting state', this);
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

gameObject.prototype.addAnimationState = function(stateName, urlArray) {
	this.states[stateName] = new AnimationState();
	this.states[stateName].loadImageUrl(urlArray);
}

gameObject.prototype.addCollisionBox = function(name, config) {
	let holder;

	config = config === undefined ? {} : config;
	if (config.name)
		name = config.name;
	holder = new CollisionBox(this, config)
	this.collisionBoxes[holder.name] = holder;
}
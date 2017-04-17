/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gameObjectClass.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 13:45:46 by mgras             #+#    #+#             */
/*   Updated: 2017/04/17 17:40:49 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let gameObject = function (config) {
	this.oldPosition	= {
		x : 0,
		y : 0		
	}
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
	this.currentSate	= 'default';
	this.states			= {};
	this.size			= {
		'x'	: 0,
		'y'	: 0
	}
	this.layer			= 0;
	this.weight			= 2;
	this.friction		= 0.2;
	this.frictionTreshold = {
		x : 1,
		y : 0.2
	}
	this.isGravityBound = false;
	this.collisionBoxes = {};
	this.name			= config.name;
	this.debug			= {
		'collisionBox' : false,
	}
	this.engine			= null;
}

gameObject.prototype.setSize = function(width, height) {
	this.size.x = width;
	this.size.y = height;
}

gameObject.prototype.setSpeed = function(x, y) {
	this.speed.x = x;
	this.speed.y = y;
}

gameObject.prototype.calculateGravity = function() {
	this.acceleration.y -= this.weight / 100;
	this.acceleration.y = this.acceleration.y >= 20 ? 20 : this.acceleration.y;
	this.acceleration.y = this.acceleration.y <= -20 ? -20 : this.acceleration.y
}

gameObject.prototype.calculateFrictionBrake = function () {
	if (this.speed.x > 0)
	{
		this.speed.x -= this.speed.x * (this.friction / 100)
		if (this.speed.x < this.frictionTreshold.x)
			this.speed.x = 0;
	}
	else if (this.speed.x < 0)
	{
		this.speed.x += this.speed.x * (-this.friction / 100)
		if (this.speed.x > -this.frictionTreshold.x)
			this.speed.x = 0;
	}
	if (this.speed.y > 0)
	{
		this.speed.y -= this.speed.y * (this.friction / 100)
		if (this.speed.y < this.frictionTreshold.y)
			this.speed.y = 0;
	}
	else if (this.speed.y < 0)
	{
		this.speed.y += this.speed.y * (-this.friction / 100)
		if (this.speed.y > -this.frictionTreshold.y)
			this.speed.y = 0;
	}
}

gameObject.prototype.modulateSpeed = function() {
	this.speed.y += this.acceleration.y;
	this.speed.y = this.speed.y > 50 ? 50 : this.speed.y;
	this.speed.y = this.speed.y < -50 ? -50 : this.speed.y;

	this.speed.x += this.acceleration.x;
	this.speed.x = this.speed.x > 50 ? 50 : this.speed.x;
	this.speed.x = this.speed.x < -50 ? -50 : this.speed.x;
}

gameObject.prototype.resolvePosition = function() {
	this.oldPosition.x = this.position.x;
	this.oldPosition.y = this.position.y;
	this.position.y -= this.speed.y;
	this.position.x += this.speed.x;
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
		this.collisionBoxes[collisionBox].checkForCollision();
		if (this.debug.collisionBox === true)
			this.collisionBoxes[collisionBox].drawDebugLines(awakening.canvas);
	}
}

gameObject.prototype.dumpCurrentTickCollisionScans = function () {
	for (let collisionBox in this.collisionBoxes)
		this.collisionBoxes[collisionBox].currentTickScan = [];
}

gameObject.prototype.draw = function (awakening, progress) {
	const stateToDraw = this.states[this.currentSate];

	if (stateToDraw !== undefined)
		stateToDraw.draw(this, awakening.canvas);
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
	this.oldPosition.x = this.position.x;
	this.oldPosition.y = this.position.y;
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
	if (config.name === undefined)
		config.name = name;
	holder = new CollisionBox(this, config)
	this.collisionBoxes[holder.name] = holder;
}
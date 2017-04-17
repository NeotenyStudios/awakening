/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   awakeningClass.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 13:09:03 by mgras             #+#    #+#             */
/*   Updated: 2017/04/17 17:28:11 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let Awakening = function(config) {
	console.log(config);
	this.canvasDOM			= initCanvas(config.width, config.height);
	this.canvas				= this.canvasDOM.getContext('2d');
	this.lastRender			= 0;
	this.objects			= {};
	this.renderedFrames		= 0;
	this.lastRenderedFrames	= this.renderedFrames;
	this.elapsedTime		= 0;
	this.displayFrameRate	= true;
	this.globalCollisionBox	= {};
	this.globalHitBox		= {};
}

Awakening.prototype.calculateLogic = function(progress) {
	for (let object in this.objects) {
		if (this.objects[object].isGravityBound === true){
			this.objects[object].calculateGravity();
			this.objects[object].modulateSpeed();
			this.objects[object].resolvePosition();
		}
		this.objects[object].calculateCollisions(this);
		this.objects[object].calculateFrictionBrake();
	}
};

Awakening.prototype.draw = function(progress) {
	this.forwardAnimationStates(progress);
	for (let object in this.objects) {
		this.objects[object].draw(this, progress);
	}
	if (this.displayFrameRate == true) {
		this.canvas.font = '10px Arial';
		this.canvas.fillText(this.lastRenderedFrames, 10 , 10);
	}
};

Awakening.prototype.loop = function(timestamp) {
	const progress = timestamp - this.lastRender;

	this.elapsedTime += progress;
	this.clearCanvas();
	this.calculateLogic();
	this.draw(progress);
	this.lastRender = timestamp;
	this.renderedFrames++;
	window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
};

Awakening.prototype.clearCanvas = function() {
	this.canvas.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height);
}

Awakening.prototype.buildObject = function(name){
	this.objects[name] = new gameObject({'name' : name});
	this.objects[name].engine = this;
}

Awakening.prototype.forwardAnimationStates = function(progress) {
	for (let object in this.objects) {
		for (let state in this.objects[object].states) {
			this.objects[object].states[state].elapsedTime += progress;
		}
	}
}
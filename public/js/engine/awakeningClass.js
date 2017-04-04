/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   awakeningClass.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 13:09:03 by mgras             #+#    #+#             */
/*   Updated: 2017/04/04 18:20:01 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let Awakening = function(config) {
	this.canvasDOM			= initCanvas(config.width, config.height);
	this.canvas				= this.canvasDOM.getContext('2d');
	this.lastRender			= 0;
	this.objects			= {};
	this.renderedFrames		= 0;
	this.lastRenderedFrames	= this.renderedFrames;
	this.elapsedTime		= 0;
}

Awakening.prototype.calculateLogic = function(progress) {

};

Awakening.prototype.draw = function(progress) {
	this.clearCanvas();

	for (let object in this.objects) {
		this.objects[object].draw(this, progress);
	}
	this.canvas.font = '10px Arial';
	this.canvas.fillText(this.lastRenderedFrames, 10 , 10);
};

Awakening.prototype.loop = function(timestamp) {
	const progress = timestamp - this.lastRender;

	this.elapsedTime += progress;
	this.calculateLogic();
	this.draw();
	this.lastRender = timestamp;
	this.renderedFrames++;
	window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
};

Awakening.prototype.clearCanvas = function() {
	this.canvas.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height);
}

Awakening.prototype.addObject = function(name, config){
	this.objects[name] = new gameObject();
	if (config.imageArray)
		this.objects[name].loadImageArray(config.imageArray);
	if (config.image)
		this.objects[name].loadImage(config.image);
}

Awakening.prototype.buildObject = function(name, config){
	config = config | {};
	this.objects[name] = new gameObject();
	if (config.states !== undefined && typeof config.states === 'object') {
		for (var state in config.states)
			this.objects[name].addAnimationState(state, config.states[state]);
	}
}
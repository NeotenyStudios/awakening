/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   collisionBox.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/07 17:41:02 by mgras             #+#    #+#             */
/*   Updated: 2017/04/07 19:24:01 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let globalCollisionBoxList = {}

let CollisionBox = function(parentGameObject, config) {
	if (!parentGameObject) {
		console.error('noParentGameObject bounded to the CollisionBox module');
		return (null);
	}
	config = config !== undefined ? config : {};
	this.position = {
			x : parentGameObject.position.x,
			y : parentGameObject.position.y,
	}
	this.offset = {
		x : config.offsetX | 0,
		y : config.offsetY | 0
	}
	this.width = parentGameObject.size.x;
	this.height = parentGameObject.size.y;
	this.name = config.name + '__' + parentGameObject.name;
	this.currentTickScanned = [];
	globalCollisionBoxList[config.name + '__' + parentGameObject.name] = this;
	console.log(parentGameObject, this);
	this.parentGameObject = parentGameObject;
}

CollisionBox.prototype.setHeight = function(height) {
	this.height = height;
}

CollisionBox.prototype.setWeight = function(width) {
	this.width = width;
}

CollisionBox.prototype.setPosition = function(x, y) {
	this.position.x = x | this.position.x;
	this.position.y = y | this.position.y;
}

CollisionBox.prototype.checkForCollision = function() {
	this.position.x = this.parentGameObject.position.x + this.offset.x;
	this.position.y = this.parentGameObject.position.y + this.offset.y;
	for (collisionBox in globalCollisionBoxList) {
		let scannedBox	= globalCollisionBoxList[collisionBox];
		let sharedX		= false;
		let sharedY		= false;

		if (this.currentTickScanned.indexOf(scannedBox.name) === -1)
		{
			if (scannedBox.position.x >= this.position.x && scannedBox.position.x <= this.position.x + this.width)
				sharedX = true;
			else if (scannedBox.position.x + scannedBox.width >= this.position.x && scannedBox.position.x + scannedBox.width <= this.position.x + this.width)
				sharedX = true;
			if (scannedBox.position.y >= this.position.y && scannedBox.position.y <= this.position.y + this.height)
				sharedY = true;
			else if (scannedBox.position.y + scannedBox.height >= this.position.y && scannedBox.position.y + scannedBox.height <= this.position.y + this.height)
				sharedY = true;
			if (sharedX == true && sharedY == true)
				console.log(sharedX, sharedY);
			else
				console.log(sharedX, sharedY);
		}
	}
}

CollisionBox.prototype.drawDebugLines = function(canvas) {
	canvas.beginPath();
	canvas.moveTo(this.position.x + 1, this.position.y + 1);
	canvas.lineTo(this.position.x + this.width + 1, this.position.y + this.height + 1);
	canvas.stroke();

	canvas.beginPath();
	canvas.moveTo(this.position.x + 1, this.position.y + this.height + 1);
	canvas.lineTo(this.position.x + this.width + 1, this.position.y + 1);
	canvas.stroke();
}
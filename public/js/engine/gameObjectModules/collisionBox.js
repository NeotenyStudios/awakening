/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   collisionBox.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/07 17:41:02 by mgras             #+#    #+#             */
/*   Updated: 2017/04/16 14:11:54 by mgras            ###   ########.fr       */
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
	this.parentGameObject = parentGameObject;
	this.bounce = 0;
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

		if (this.currentTickScanned.indexOf(scannedBox.name) === -1 && this.name != scannedBox.name && this.parentGameObject.isGravityBound !== false)
		{
			if (this.position.x < scannedBox.position.x + scannedBox.width &&
				this.position.x + this.width > scannedBox.position.x &&
				this.position.y < scannedBox.position.y + scannedBox.height &&
				this.height + this.position.y > scannedBox.position.y) {
					const		oldXL	= this.position.x -= this.parentGameObject.speed.x;
					const		oldXR	= oldXL + this.width;
					const		oldYT	= this.position.y -= this.parentGameObject.speed.y;
					const		oldYB	= oldYT + this.height;	
					let			bottom	= oldYT < scannedBox.position.y && this.position.y + this.height >= scannedBox.position.y;
					let			top		= oldYT >= scannedBox.position.y + scannedBox.height && this.position.y < scannedBox.position.y + scannedBox.height;
					let			left	= oldXR < scannedBox.position.left && this.position.x + this.width >= scannedBox.position.Left;
					let			right	= oldXL >= scannedBox.position.x + scannedBox.width && this.position.x < scannedBox.position.x + scannedBox.width;

					console.log('hit', top, right, bottom, left);
					if (bottom || top)
					{
						this.parentGameObject.speed.y = this.parentGameObject.speed.y * (-this.bounce);
						this.parentGameObject.acceleration.y = 0;
						this.parentGameObject.position.y = scannedBox.position.y - this.height;
					}
					if (left || right)
					{
						this.parentGameObject.speed.x = this.parentGameObject.speed.x * (-this.bounce);
						this.parentGameObject.acceleration.x = 0;
						this.parentGameObject.position.x = scannedBox.position.x - this.width;
					}
				}
		}
	}
}

CollisionBox.prototype.drawDebugLines = function(canvas) {
	canvas.strokeStyle="#76FF03";
	canvas.lineWidth = 3;
	canvas.beginPath();

	//left	
	canvas.moveTo(this.position.x - 1, this.position.y - 1);
	canvas.lineTo(this.position.x - 1, this.position.y + this.height + 1);

	//right
	canvas.moveTo(this.position.x + this.width + 1, this.position.y - 1);
	canvas.lineTo(this.position.x + this.width + 1, this.position.y + this.height + 1);

	//top
	canvas.moveTo(this.position.x + 1 + this.width, this.position.y - 1);
	canvas.lineTo(this.position.x - 1, this.position.y - 1);

	//bottom
	canvas.moveTo(this.position.x - 1, this.position.y + this.height + 1);
	canvas.lineTo(this.position.x + 1 + this.width, this.position.y + this.height + 1);

	canvas.stroke();
}
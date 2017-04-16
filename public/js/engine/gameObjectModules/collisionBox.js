/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   collisionBox.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/07 17:41:02 by mgras             #+#    #+#             */
/*   Updated: 2017/04/16 18:57:03 by mgras            ###   ########.fr       */
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
	globalCollisionBoxList[config.name + '__' + parentGameObject.name] = this;
	this.parentGameObject = parentGameObject;
	this.resistance = {
		x : 0,
		y : 0
	}
	this.resistanceTreshold = {
		x : 1,
		y : 1
	}
	this.bounce = {
		x : 0.1,
		y : 0.1
	};
}

CollisionBox.prototype.setHeight = function(height) {
	this.height = height;
}

CollisionBox.prototype.setBounce = function(x, y) {
	this.bounce.x = x;
	this.bounce.y = y;
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

		if (this.name !== scannedBox.name && this.parentGameObject.isGravityBound !== false)
		{
			if (this.position.x < scannedBox.position.x + scannedBox.width &&
				this.position.x + this.width > scannedBox.position.x &&
				this.position.y < scannedBox.position.y + scannedBox.height &&
				this.height + this.position.y > scannedBox.position.y) {
					const boxLeft	= this.position.x;
					const boxRight	= this.position.x + this.width;
					const boxTop	= this.position.y;
					const boxBottom	= this.position.y + this.height;

					const oldBoxLeft	= boxLeft - this.parentGameObject.speed.x;
					const oldBoxRight	= oldBoxLeft + this.width;
					const oldBoxTop		= boxTop + this.parentGameObject.speed.y;
					const oldBoxBottom	= oldBoxTop + this.height;

					const right			= oldBoxRight <= scannedBox.position.x && boxRight >= scannedBox.position.x;
					const left			= oldBoxLeft >= scannedBox.position.x + scannedBox.width && boxLeft < scannedBox.position.x + scannedBox.width;
					const top			= oldBoxTop >= scannedBox.position.y + scannedBox.height && boxTop < scannedBox.position.y + scannedBox.height;
					const bottom		= oldBoxBottom <= scannedBox.position.y && boxBottom > scannedBox.position.y;

					if (bottom)
					{
						this.parentGameObject.acceleration.y = 0;
						this.parentGameObject.speed.y = this.parentGameObject.speed.y * (-this.bounce.y);
						this.parentGameObject.position.y = scannedBox.position.y - this.height;
						if (this.parentGameObject.speed.x > 0)
						{
							this.parentGameObject.speed.x -= this.parentGameObject.speed.x * (this.resistance.x / 10)
							if (this.parentGameObject.speed.x < this.resistanceTreshold.x && this.resistance.x !== 0)
								this.parentGameObject.speed.x = 0;
						}
						else
						{
							this.parentGameObject.speed.x -= this.parentGameObject.speed.x * (this.resistance.x / 10)
							if (this.parentGameObject.speed.x > -this.resistanceTreshold.x && this.resistance.x !== 0)
								this.parentGameObject.speed.x = 0;
						}
					}
					if (top)
					{
						this.parentGameObject.acceleration.y = 0;
						this.parentGameObject.speed.y = this.parentGameObject.speed.y * (-this.bounce.y);
						this.parentGameObject.position.y = scannedBox.position.y + scannedBox.height + 1;
						if (this.parentGameObject.speed.x > 0)
						{
							this.parentGameObject.speed.x -= this.parentGameObject.speed.x * (this.resistance.x / 10)
							if (this.parentGameObject.speed.x < this.resistanceTreshold.x && this.resistance.x !== 0)
								this.parentGameObject.speed.x = 0;
						}
						else
						{
							this.parentGameObject.speed.x -= this.parentGameObject.speed.x * (this.resistance.x / 10)
							if (this.parentGameObject.speed.x > -this.resistanceTreshold.x && this.resistance.x !== 0)
								this.parentGameObject.speed.x = 0;
						}
					}
					if (left)
					{
						if (scannedBox.parentGameObject.isGravityBound == true)
						{
							scannedBox.parentGameObject.speed.x -= (this.parentGameObject.speed.x * 2);
							scannedBox.parentGameObject.speed.x *= scannedBox.bounce.x;
							scannedBox.parentGameObject.speed.x *= -1;
							if (scannedBox.parentGameObject.speed.x > 0)
								scannedBox.parentGameObject.position.x--;
							else
								scannedBox.parentGameObject.position.x++;
						}
						this.parentGameObject.acceleration.x = 0;
						this.parentGameObject.speed.x *= this.bounce.x;
						this.parentGameObject.speed.x *= -1;
						this.parentGameObject.position.x = scannedBox.position.x + scannedBox.width + 1;
					}
					if (right)
					{
						if (scannedBox.parentGameObject.isGravityBound == true)
						{
							scannedBox.parentGameObject.speed.x -= (this.parentGameObject.speed.x * 2);
							scannedBox.parentGameObject.speed.x *= scannedBox.bounce.x;
							scannedBox.parentGameObject.speed.x *= -1;
							if (scannedBox.parentGameObject.speed.x > 0)
								scannedBox.parentGameObject.position.x--;
							else
								scannedBox.parentGameObject.position.x++;
						}
						this.parentGameObject.acceleration.x = 0;
						this.parentGameObject.speed.x *= this.bounce.x;
						this.parentGameObject.speed.x *= -1;
						this.parentGameObject.position.x = scannedBox.position.x - this.width + 1;
					}
				}
		}
	}
}

CollisionBox.prototype.drawDebugLines = function(canvas) {
	canvas.strokeStyle="#000";
	canvas.lineWidth = 1;
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
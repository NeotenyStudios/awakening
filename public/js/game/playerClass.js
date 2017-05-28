/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   playerClass.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/04 16:01:42 by mgras             #+#    #+#             */
/*   Updated: 2017/05/22 22:41:36 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let PlayableCharacter = function(engine) {
	if (engine === undefined)
		return (null);
	this.engine			= engine;
	this.boundControler	= this.findControler();
	this.boundObjects	= {};
	this.boundHitboxes	= {};
}

PlayableCharacter.prototype.findControler = function() {
	let gamepad = null;

	if (this.engine.controlers.length === 0)
		this.engine.notifyNoControler();
	else
	{
		gamepad = this.engine.getAvailableGamePad();
		if (gamepad === null)
			console.info('No available gamepads');
	}
	return (gamepad);
}

PlayableCharacter.prototype.bindNewObject = function(name, config) {
	if (config === undefined)
		config = {'name' : 'undefined'};
	this.boundObject[config.name] = engine.buildObject(config);
	return (this.boundObject[config.name]);
}

PlayableCharacter.prototype.addHitbox = function(targetObject, config) {
	let holder;

	if (targetObject === undefined)
		return (null)
	if (config === undefined)
		config.name = 'undefined';
	boundHitboxes[config.name] = new HitBox(this, config);
	return (boundHitboxes[config.name]);
}
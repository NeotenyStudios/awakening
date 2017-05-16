/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   playerClass.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/04 16:01:42 by mgras             #+#    #+#             */
/*   Updated: 2017/05/04 17:34:06 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let PlayableCharacter = function(engine) {
	if (engine === undefined)
		return (null)
	this.engine = engine
	this.boundControler = this.findControler();
	this.hp = 0;
	this.verticalSpeed = 0;
	this.horrizontalSpeed = 0;
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
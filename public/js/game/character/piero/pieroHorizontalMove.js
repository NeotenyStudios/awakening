/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroHorizontalMove.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:36:49 by anonymous         #+#    #+#             */
/*   Updated: 2017/08/31 11:05:45 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

function pieroXAxisMovement(piero, gamepad) {
	if (Math.abs(gamepad.moveStick.xAxis) > gamepad.moveStick.deadZone && piero.config.canInputDirection === true)
	{
		piero.swapAnimationState('run', 'body');
		piero.boundObjects.body.setSpeed(gamepad.moveStick.xAxis * 10, piero.boundObjects.body.rigidBody.velocity.y);
		piero.clearAnimationQueue('body');
		if (gamepad.moveStick.xAxis > 0)
		{
			piero.config.orientation = 1;
			piero.boundObjects.body.states.run.reverse.x = false;
		}
		else
		{
			piero.config.orientation = -1;
			piero.boundObjects.body.states.run.reverse.x = true;
		}
	}
	else
	{
		piero.boundObjects.body.setSpeed(
			Math.abs(piero.boundObjects.body.rigidBody.velocity.x) > 3 ? piero.boundObjects.body.rigidBody.velocity.x * 0.9 : 0,
			piero.boundObjects.body.rigidBody.velocity.y
		);
		if (piero.config.orientation === 1)
			piero.boundObjects.body.states.idle.reverse.x = false;
		else
			piero.boundObjects.body.states.idle.reverse.x = true;
		piero.swapAnimationState('idle', 'body');
	}
}

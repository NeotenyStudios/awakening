/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroHorizontalMove.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:36:49 by anonymous         #+#    #+#             */
/*   Updated: 2017/06/16 16:16:28 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroCrouch(piero, gamepad) {
}

function pieroXAxisMovement(piero, gamepad) {
	if (Math.abs(gamepad.moveStick.xAxis) > gamepad.moveStick.deadZone)
	{
		piero.swapAnimationState('run', 'body');
		piero.boundObjects.body.setSpeed(gamepad.moveStick.xAxis * 10, piero.boundObjects.body.rigidBody.velocity.y);
		if (gamepad.moveStick.xAxis > 0)
			piero.boundObjects.body.states.run.reverse.x = false;
		else
			piero.boundObjects.body.states.run.reverse.x = true;
	}
	else
	{
		piero.boundObjects.body.setSpeed(
			Math.abs(piero.boundObjects.body.rigidBody.velocity.x) > 3 ? piero.boundObjects.body.rigidBody.velocity.x * 0.9 : 0,
			piero.boundObjects.body.rigidBody.velocity.y
		);
		//IDLE CONFLICTS WITH OTHER ANIMATIONS SINCE IT GOES BACK TO DEFAULT ONCE ALL INPUTS ARE RELEASED
		//piero.swapAnimationState('idle', 'body');
	}
}

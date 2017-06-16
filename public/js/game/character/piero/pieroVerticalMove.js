/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroVerticalMove.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:37:04 by anonymous         #+#    #+#             */
/*   Updated: 2017/06/16 16:16:04 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroFirstJump(piero, gamepad) {
	if (gamepad.x.pressed === true && piero.config.ticksSinceGroundJump < 30 && piero.config.falling === false && piero.config.finishedFirstJump === false)
	{
		piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, piero.config.fJumpTable[piero.config.ticksSinceGroundJump] * -5);
		piero.config.ticksSinceGroundJump++;
	}
	if (piero.boundObjects.body.rigidBody.collide.bot === true)
	{
		piero.config.ticksSinceGroundJump = 0;
		piero.config.finishedFirstJump = false;
		piero.config.canSecondJump = true;
	}
	else if (piero.config.ticksSinceGroundJump >= 30)
		piero.config.finishedFirstJump = true;
	if (piero.config.finishedFirstJump === false && gamepad.x.pressed === false && piero.boundObjects.body.rigidBody.collide.bot === false && piero.boundObjects.body.rigidBody.velocity.y < 0.5)
	{
		piero.config.finishedFirstJump = true;
		//piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, 0.5);
	}
}

function pieroSecondJump(piero, gamepad) {
	if (gamepad.x.pressed === true && piero.boundObjects.body.rigidBody.collide.bot === false && piero.config.canSecondJump === true && piero.config.finishedFirstJump === true)
	{
		piero.config.canSecondJump = false;
		piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, -15);
	}
}
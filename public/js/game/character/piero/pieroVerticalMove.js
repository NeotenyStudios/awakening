/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroVerticalMove.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:37:04 by anonymous         #+#    #+#             */
/*   Updated: 2017/10/13 15:09:27 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

function pieroFastFall(piero, gamepad) {
	if (piero.config.isFastFalling === true)
		piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, 15);
	if (gamepad.moveStick.yAxis < -gamepad.moveStick.deadZone &&
		piero.boundObjects.body.rigidBody.collide.bot === false &&
		piero.boundObjects.body.rigidBody.velocity.y > 0)
	{
		piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, 15);
		piero.boundObjects.isFastFalling = true;
	}
	if (piero.boundObjects.body.rigidBody.collide.bot === true)
		piero.config.isFastFalling = false;
}

function pieroCrouch(piero, gamepad) {
	if (gamepad.moveStick.yAxis < -gamepad.moveStick.deadZone && piero.boundObjects.body.rigidBody.collide.bot === true)
	{
		if (piero.config.isCrouching === true && piero.config.canInputAttacks === true)
			piero.swapAnimationState('crouchIdle', 'body');
		else if (piero.config.isCrouching === false && piero.config.canInputAttacks === true)
		{
			piero.config.canInputAttacks = false;
			piero.config.canInputDirection = false;
			piero.config.canInputJump = false;
			piero.clearAnimationQueue('body');
			if (piero.config.orientation === 1)
			{
				piero.boundObjects.body.states.crouchDown.reverse.x	= false;
				piero.boundObjects.body.states.crouchUp.reverse.x	= false;
				piero.boundObjects.body.states.crouchIdle.reverse.x	= false;
				piero.boundObjects.body.states.idle.reverse.x		= false;
			}
			else
			{
				piero.boundObjects.body.states.crouchDown.reverse.x	= true;
				piero.boundObjects.body.states.crouchUp.reverse.x	= true;
				piero.boundObjects.body.states.crouchIdle.reverse.x	= true;
				piero.boundObjects.body.states.idle.reverse.x		= true;
			}
			piero.appendAnimationToObjectQueue('body', 'crouchDown', function(contextedObject) {
				console.log('crouchDown END');
				piero.swapAnimationState('crouchIdle', 'body');
				piero.config.canInputAttacks = true;
			});
		}
		piero.config.isCrouching = true;
	}
	else
	{
		if (piero.config.isCrouching === true)
		{
			piero.config.canInputDirection = true;
			piero.clearAnimationQueue('body');
			piero.appendAnimationToObjectQueue('body', 'crouchUp', function(contextedObject) {
				console.log('crouchUp END');
				piero.config.canInputAttacks = true;
				piero.config.canInputDirection = true;
				piero.config.canInputJump = true;
			});
			piero.swapAnimationState('idle', 'body');
		}
		piero.config.isCrouching = false;
	}
}

function pieroFirstJump(piero, gamepad) {
	if (!piero.config.jumpButtonReleased)
		piero.config.jumpButtonReleased = !gamepad.x.pressed;
	if (gamepad.x.pressed === true)
	{
		if (piero.config.ticksSinceGroundJump < 15 && piero.config.falling === false && piero.config.finishedFirstJump === false)
		{
			piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, piero.config.fJumpTable[piero.config.ticksSinceGroundJump] * (-piero.config.firstJumpScaling));
			piero.config.ticksSinceGroundJump++;
			piero.config.jumpButtonReleased = false;
		}
	}
	if (piero.boundObjects.body.rigidBody.collide.bot === true)
	{
		piero.config.ticksSinceGroundJump = 0;
		piero.config.finishedFirstJump = false;
		piero.config.canSecondJump = true;
		piero.config.jumpButtonReleased = true;
	}
	else if (piero.config.ticksSinceGroundJump >= 15 && gamepad.x.pressed === true)
		piero.config.finishedFirstJump = true;
	if (piero.config.finishedFirstJump === false && gamepad.x.pressed === false && piero.boundObjects.body.rigidBody.collide.bot === false && piero.boundObjects.body.rigidBody.velocity.y < 0.5)
	{
		piero.config.finishedFirstJump = true;
		//piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, 0.5); //Speed Cancelation
	}
}

function pieroSecondJump(piero, gamepad) {
	if (gamepad.x.pressed && !piero.boundObjects.body.rigidBody.collide.bot && piero.config.canSecondJump && piero.config.finishedFirstJump && piero.config.jumpButtonReleased)
	{
		piero.config.canSecondJump = false;
		piero.boundObjects.body.setSpeed(piero.boundObjects.body.rigidBody.velocity.x, -piero.config.secondJumpVelocity * piero.config.secondJumpScaling);
	}
}
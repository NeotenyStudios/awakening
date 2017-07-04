/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroVerticalMove.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:37:04 by anonymous         #+#    #+#             */
/*   Updated: 2017/07/04 20:06:35 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroCrouch(piero, gamepad) {
	if (gamepad.moveStick.yAxis < -gamepad.moveStick.deadZone)
	{
		piero.config.canInputDirection = false;
		if (piero.config.isCrouching === false)
		{
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
			piero.appendAnimationToObjectQueue('body', 'crouchDown', function(contextedObject) {console.log('crouchDown END')});
		}
		else
			piero.swapAnimationState('crouchIdle', 'body');
		piero.config.isCrouching = true;
	}
	else
	{
		if (piero.config.isCrouching === true)
		{
			piero.config.canInputDirection = true;
			piero.clearAnimationQueue('body');
			piero.appendAnimationToObjectQueue('body', 'crouchUp', function(contextedObject) {console.log('crouchUp END')});
			piero.swapAnimationState('idle', 'body');
		}
		piero.config.isCrouching = false;
	}
}

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
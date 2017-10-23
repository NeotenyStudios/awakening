/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroForwardSmash.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:21:52 by anonymous         #+#    #+#             */
/*   Updated: 2017/10/13 15:08:23 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

function pieroReleaseForwardSmash(piero, gamepad) {
	if (piero.config.holdingForwardSmash === true)
		piero.config.forwardSmashDmgRelease = true;
	piero.config.holdingForwardSmash = false;
	piero.appendAnimationToObjectQueue('body', 'forwardSmash1', function(contextedObject) {
		console.log('forwardSmash1 END');
		piero.config.forwardSmashDmgRelease = false;
		piero.removeHitbox('forwardSmashHitTicks' + (piero.config.forwardSmashHitTicks - 1));
	});
	piero.appendAnimationToObjectQueue('body', 'forwardSmash2', function(contextedObject) {
		console.log('forwardSmash2 END');
		piero.config.forwardSmashHitTicks = 0;
		piero.config.canInputAttacks = true;
		piero.config.isForwardSmashing = false;
		piero.config.forwardSmash0 = false;
		piero.config.forwardSmash1 = false;
		piero.config.forwardSmash2 = false;
		piero.config.forwardSmashEnd = false;
		piero.config.forwardSmashDmgRelease = false;
		piero.config.canCrouch = true;
		if (piero.config.forwardSmashStateNeedsXFlip === true)
		{
			piero.config.forwardSmashStateNeedsXFlip = false;
			piero.boundObjects.body.states.forwardSmash0.flipX();
			piero.boundObjects.body.states.forwardSmash1.flipX();
			piero.boundObjects.body.states.forwardSmash2.flipX();
			piero.boundObjects.body.states.forwardSmashHold.flipX();
		}
		piero.config.canInputDirection = true;
		piero.config.canInputJump = true;
		piero.config.forwardSmashHitMarkerTable = [];
	});
}

function pieroForwardSmashHitBoxHanler(objectA, objectB, collider, collided) {
	let piero = collider.logicMarkers.parentBundle;
	let target;
	let targetRb;

	if (collided.logicMarkers.type === undefined)
		return (false);
	if (collided.logicMarkers.type === 'playableCharacter')
	{
		target = collided.logicMarkers.parentBundle
		targetRb = objectB.rigidBody;
		if (!target)
			return (false);
		else if (piero.config.forwardSmashHitMarkerTable.indexOf(objectB.name) === -1)
		{
			if (target.config.canBeDisplaced === true && targetRb)
			{
				console.log(piero.config.forwardSmashCharge * piero.config.forwardSmashKnockBackScaling);
				console.log(piero.config.forwardSmashBaseKnockBack + target.config.damageTaken)
				targetRb.addSpeed(((piero.config.forwardSmashCharge * piero.config.forwardSmashKnockBackScaling) + (piero.config.forwardSmashBaseKnockBack + (target.config.damageTaken / 100))) * piero.config.orientation, 0);
				targetRb.setVelocity(targetRb.velocity.x, -5);
			}
			if (target.config.canGetDamaged === true && targetRb)
				target.config.damageTaken += (piero.config.forwardSmashCharge * piero.config.forwardSmashDmgScaling) + piero.config.forwardSmashBaseDmg;
			piero.config.forwardSmashHitMarkerTable.push(objectB.name);
		}
	}
}

function pieroForwardSmash(piero, gamepad) {
	if (Math.abs(gamepad.cStick.xAxis) > gamepad.cStick.deadZone && piero.config.forwardSmashEnd === false)
	{
		piero.config.canInputDirection = false;
		piero.config.canInputJump = false;
		if (piero.config.holdingForwardSmash === true)
		{
			piero.swapAnimationState('forwardSmashHold', 'body');
			piero.config.forwardSmashCharge = new Date().getTime() - piero.config.forwardSmashTimeStart;
			if (piero.config.forwardSmashCharge >= 1500)
			{
				piero.config.forwardSmashEnd = true;
				piero.config.forwardSmash0 = false;
				pieroReleaseForwardSmash(piero, gamepad);
			}
		}
		if (piero.config.forwardSmash0 === true && piero.config.forwardSmash1 === true && piero.config.holdingForwardSmash === false)
		{
			piero.clearAnimationQueue('body');
			piero.swapAnimationState('forwardSmashHold', 'body');
			piero.config.holdingForwardSmash = true;
			piero.config.forwardSmashTimeStart = new Date().getTime();
		}
		if (piero.config.canInputAttacks === true)
		{
			if (piero.config.isForwardSmashing === false)
				piero.config.forwardSmash0 = true;
			if (gamepad.cStick.xAxis < 0)
			{
				piero.boundObjects.body.states.forwardSmash0.flipX();
				piero.boundObjects.body.states.forwardSmash1.flipX();
				piero.boundObjects.body.states.forwardSmash2.flipX();
				piero.boundObjects.body.states.forwardSmashHold.flipX();
				piero.config.forwardSmashStateNeedsXFlip = true;
				piero.config.orientation = -1;
			}
			else
				piero.config.orientation = 1;
			piero.config.canInputAttacks = false;
			piero.config.canCrouch = false;
			piero.config.isForwardSmashing = true;
			piero.appendAnimationToObjectQueue('body', 'forwardSmash0', function(contextedObject) {
				console.log('forwardSmash0 END');
				piero.config.forwardSmashDmgRelease = true;
				piero.config.forwardSmash1 = true;
			});
			pieroReleaseForwardSmash(piero, gamepad);
		}
	}
	else if (piero.config.holdingForwardSmash === true && piero.config.forwardSmashEnd === false)
	{
		piero.config.forwardSmashEnd = true;
		pieroReleaseForwardSmash(piero, gamepad);
	}
	else if (piero.config.forwardSmashDmgRelease === true)
	{
		let tick = piero.config.forwardSmashHitTicks >= piero.config.forwardSmashHitBoxConfig.length ? piero.config.forwardSmashHitBoxConfig.length -1 : piero.config.forwardSmashHitTicks;
		let hitboxConfig = {
			'name'				: 'forwardSmashHitTicks' + piero.config.forwardSmashHitTicks,
			'logicMarkers'		: {'type' : 'dmg', 'parentBundle' : piero},
			'offX'				: piero.config.forwardSmashStateNeedsXFlip === true ? piero.config.forwardSmashHitBoxConfig[tick].x * -1 : piero.config.forwardSmashHitBoxConfig[tick].x,
			'offY'				: piero.config.forwardSmashHitBoxConfig[tick].y,
			'width'				: piero.config.forwardSmashHitBoxConfig[tick].size.x,
			'height'			: piero.config.forwardSmashHitBoxConfig[tick].size.y,
			'handler'			: pieroForwardSmashHitBoxHanler
		};

		if (piero.config.forwardSmashStateNeedsXFlip === false)
			hitboxConfig.offX += piero.boundObjects.body.size.x;
		else
			hitboxConfig.offX -= hitboxConfig.width;
		piero.removeHitbox('forwardSmashHitTicks' + (piero.config.forwardSmashHitTicks - 1));
		piero.addHitbox('body', hitboxConfig);
		piero.config.forwardSmashHitTicks++;
	}
}
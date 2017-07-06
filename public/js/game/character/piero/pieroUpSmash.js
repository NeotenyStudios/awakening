/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroUpSmash.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:22:21 by anonymous         #+#    #+#             */
/*   Updated: 2017/07/06 18:15:10 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroUpSmashHitBoxHanler(objectA, objectB, collider, collided) {
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
		else if (piero.config.upSmashHitMarkerTable.indexOf(objectB.name) === -1)
		{
			if (target.config.canBeDisplaced === true && targetRb)
			{
				targetRb.addSpeed(0, ((piero.config.upSmashCharge * piero.config.upSmashKnockBackScaling) + piero.config.upSmashBaseKnockBack) * ((target.config.damageTaken + 10) / 100));
				targetRb.setVelocity(0, targetRb.velocity.y);
			}
			if (target.config.canGetDamaged === true && targetRb)
				target.config.damageTaken += (piero.config.upSmashCharge * piero.config.upSmashDmgScaling) + piero.config.upSmashBaseDmg;
			piero.config.upSmashHitMarkerTable.push(objectB.name);
		}
	}
}

function pieroReleaseUpSmash(piero, gamepad) {
	if (piero.config.holdingUpSmash === true)
		piero.config.upSmashDmgRelease = true;
	piero.config.holdingUpSmash = false;
	console.log(piero);
	piero.appendAnimationToObjectQueue('body', 'upSmash1', function(contextedObject) {
		console.log('upSmash1 END');
		piero.config.upSmashEnd = true;
		piero.config.upSmashDmgRelease = false;
		piero.removeHitbox('upSmashHitTicks' + (piero.config.upSmashHitTicks - 1));
	});
	piero.appendAnimationToObjectQueue('body', 'upSmash2', function(contextedObject) {
		console.log('upSmash2 END');
		piero.config.canInputAttacks		= true;
		piero.config.upSmashEnd				= false;
		piero.config.isUpSmashing			= false;
		piero.config.upSmash0				= false;
		piero.config.upSmash1				= false;
		piero.config.upSmash2				= false;
		piero.config.upSmashTimeStart		= 0;
		piero.config.upSmashCharge			= 0;
		piero.config.upSmashHitTicks		= 0;
		piero.config.holdingUpSmash			= false;
		piero.config.canInputDirection		= true;
		piero.config.canInputJump			= true;
		piero.config.upSmashHitMarkerTable	= [];
	});
}

function pieroUpSmash(piero, gamepad)
{
	if (gamepad.cStick.yAxis < -gamepad.cStick.deadZone && piero.config.upSmashEnd === false)
	{
		piero.config.canInputDirection = false;
		piero.config.canInputJump = false;
		if (piero.config.holdingUpSmash === true)
		{
			piero.config.upSmashCharge = new Date().getTime() - piero.config.upSmashTimeStart;
			piero.swapAnimationState('upSmashHold', 'body');
			if (piero.config.upSmashCharge >= 1500)
			{
				piero.config.upSmashEnd = true;
				piero.config.upSmash0 = false;
				pieroReleaseUpSmash(piero, gamepad);
			}
		}
		if (piero.config.upSmash0 === true && piero.config.holdingUpSmash === false)
		{
			piero.config.holdingUpSmash = true;
			piero.clearAnimationQueue('body');
			piero.swapAnimationState('upSmashHold', 'body');
			piero.config.upSmashTimeStart = new Date().getTime();
		}
		if (piero.config.canInputAttacks === true)
		{
			piero.config.canInputAttacks = false;
			piero.config.isUpSmashing = true;
			piero.appendAnimationToObjectQueue('body', 'upSmash0', function(contextedObject) {
				piero.config.upSmash0 = true;
				piero.config.upSmashDmgRelease = true;
			});
			pieroReleaseUpSmash(piero, gamepad);
		}
	}
	else if (piero.config.holdingUpSmash === true && piero.config.upSmashEnd === false)
	{
		piero.config.upSmashEnd = true;
		pieroReleaseUpSmash(piero, gamepad);
	}
	else if (piero.config.upSmashDmgRelease === true)
	{
		let tick = piero.config.upSmashHitTicks >= piero.config.upSmashHitBoxConfig.length ? piero.config.upSmashHitBoxConfig.length -1 : piero.config.upSmashHitTicks;
		let hitboxConfig = {
			'name'				: 'upSmashHitTicks' + piero.config.upSmashHitTicks,
			'logicMarkers'		: {'type' : 'dmg', 'parentBundle' : piero},
			'offX'				: piero.config.upSmashHitBoxConfig[tick].x,
			'offY'				: piero.config.upSmashHitBoxConfig[tick].y,
			'width'				: piero.config.upSmashHitBoxConfig[tick].size.x,
			'height'			: piero.config.upSmashHitBoxConfig[tick].size.y
		};

		piero.removeHitbox('upSmashHitTicks' + (piero.config.upSmashHitTicks - 1));
		piero.addHitbox('body', hitboxConfig);
		piero.config.upSmashHitTicks++;
	}
}

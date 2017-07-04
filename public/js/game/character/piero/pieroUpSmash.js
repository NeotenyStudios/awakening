/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroUpSmash.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:22:21 by anonymous         #+#    #+#             */
/*   Updated: 2017/07/04 21:48:26 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroReleaseUpSmash(piero, gamepad) {
	if (piero.config.holdingUpSmash === true)
		piero.config.upSmashDmgRelease = true;
	piero.config.holdingUpSmash = false;
	piero.appendAnimationToObjectQueue('body', 'upSmash1', function(contextedObject) {
		console.log('upSmash1 END');
		piero.config.upSmashEnd = true;
		piero.config.upSmashDmgRelease = false;
		piero.removeHitbox('upSmashHitTicks' + (piero.config.upSmashHitTicks - 1));
	});
	piero.appendAnimationToObjectQueue('body', 'upSmash2', function(contextedObject) {
		console.log('upSmash2 END');
		piero.config.canInputAttacks	= true;
		piero.config.upSmashEnd			= false;
		piero.config.isUpSmashing		= false;
		piero.config.upSmash0			= false;
		piero.config.upSmash1			= false;
		piero.config.upSmash2			= false;
		piero.config.upSmashTimeStart	= 0;
		piero.config.upSmashCharge		= 0;
		piero.config.upSmashHitTicks	= 0;
		piero.config.holdingUpSmash		= false;
		piero.config.canInputDirection	= true;
		piero.config.canInputJump		= true;
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
			if (piero.config.upSmashCharge > 2500)
			{
				piero.config.holdingUpSmash = false;
				piero.config.upSmashCharge = 0;
				piero.config.upSmashTimeStart = 0;
				piero.config.upSmashEnd = true;
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
				console.log('upSmash0 END');
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
			'logicMarkers'		: {'type' : 'dmg'},
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

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroUpSmash.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:22:21 by anonymous         #+#    #+#             */
/*   Updated: 2017/06/16 16:59:45 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroReleaseUpSmash(piero, gamepad) {
	piero.config.holdingUpSmash = false;
	piero.appendAnimationToObjectQueue('body', 'upSmash1', function(contextedObject) {
		console.log('upSmash1 END');
		piero.config.upSmashEnd = true;
	});
	piero.appendAnimationToObjectQueue('body', 'upSmash2', function(contextedObject) {
		console.log('upSmash2 END');
		piero.config.canInputAttacks = true;
		piero.config.upSmashEnd = false;
		piero.config.isUpSmashing = false;
	});
}

function pieroUpSmash(piero, gamepad) 
{
	if (gamepad.cStick.yAxis < -gamepad.cStick.deadZone && piero.config.upSmashEnd === false)
	{
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
			});
			pieroReleaseUpSmash(piero, gamepad);
		}
	}
	else if (piero.config.holdingUpSmash === true && piero.config.upSmashEnd === false)
	{
		piero.config.upSmashEnd = true;
		pieroReleaseUpSmash(piero, gamepad);
	}
}
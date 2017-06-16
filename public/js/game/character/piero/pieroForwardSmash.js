/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroForwardSmash.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:21:52 by anonymous         #+#    #+#             */
/*   Updated: 2017/06/16 16:59:55 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroReleaseForwardSmash(piero, gamepad) {
	piero.config.holdingForwardSmash = false;
	piero.appendAnimationToObjectQueue('body', 'forwardSmash1', function(contextedObject) {
		console.log('forwardSmash1 END');
	});
	piero.appendAnimationToObjectQueue('body', 'forwardSmash2', function(contextedObject) {
		console.log('forwardSmash2 END');
		piero.config.canInputAttacks = true;
		piero.config.isForwardSmashing = false;
		piero.config.forwardSmash0 = false;
		piero.config.forwardSmash1 = false;
		piero.config.forwardSmash2 = false;
		piero.config.forwardSmashEnd = false;
		if (piero.config.forwardSmashStateNeedsXFlip === true)
		{
			piero.config.forwardSmashStateNeedsXFlip = false;
			piero.boundObjects.body.states.forwardSmash0.flipX();
			piero.boundObjects.body.states.forwardSmash1.flipX();
			piero.boundObjects.body.states.forwardSmash2.flipX();
			piero.boundObjects.body.states.forwardSmashHold.flipX();
		}
	});
}

function pieroForwardSmash(piero, gamepad) 
{
	if (Math.abs(gamepad.cStick.xAxis) > gamepad.cStick.deadZone && piero.config.forwardSmashEnd === false)
	{
		if (piero.config.holdingForwardSmash === true)
		{
			piero.swapAnimationState('forwardSmashHold', 'body');
			piero.config.forwardSmashCharge = new Date().getTime() - piero.config.forwardSmashTimeStart;
			if (piero.config.forwardSmashCharge >= 2500)
			{
				piero.config.forwardSmashEnd = true;
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
			}
			piero.config.canInputAttacks = false;
			piero.config.isForwardSmashing = true;
			piero.appendAnimationToObjectQueue('body', 'forwardSmash0', function(contextedObject) {
				console.log('forwardSmash0 END');
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
}
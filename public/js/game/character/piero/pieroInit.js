/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroInit.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:17:36 by anonymous         #+#    #+#             */
/*   Updated: 2017/06/16 19:18:00 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function initPiero(engine, gamepad) {
	let piero = new PlayableCharacter(engine);

	piero.config.ticksSinceGroundJump = 0;
	piero.config.fJumpTable = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,
		0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2,
	];
	//JUMPING
	piero.config.falling						= false;
	piero.config.finishedFirstJump				= false;
	piero.config.canSecondJump					= true;

	//GENERAL RESTRICTION
	piero.config.canInputAttacks				= true;
	
	//UP SMASH
	piero.config.isUpSmashing					= false;
	piero.config.upSmash0						= false;
	piero.config.upSmash1						= false;
	piero.config.upSmash2						= false;
	piero.config.holdingUpSmash					= false;
	piero.config.upSmashEnd						= false;
	piero.config.upSmashTimeStart				= 0;
	piero.config.upSmashCharge					= 0;

	//FORWARD SMASH
	piero.config.isForwardSmashing				= false;
	piero.config.forwardSmash0					= false;
	piero.config.forwardSmash1					= false;
	piero.config.forwardSmash2					= false;
	piero.config.holdingForwardSmash			= false;
	piero.config.forwardSmashEnd				= false;
	piero.config.forwardSmashTimeStart			= 0;
	piero.config.forwardSmashCharge				= 0;
	piero.config.forwardSmashStateNeedsXFlip	= false;

	//DOWNSMASH
	piero.config.isDownSmashing = false;

	piero.bindNewObject('body', {
		'name'		: 'pieroBody' + new Date().getTime(),
		'posX'		: (1920 - 1000) / 2,
		'posY'		: 0,
		'width'		: 90,
		'height'	: 90,
		'engine'	: engine
	});
	piero.boundObjects.body.addAnimationState('walk',
		[
			'/chars/piero/walk/1.png',
			'/chars/piero/walk/2.png',
			'/chars/piero/walk/3.png',
			'/chars/piero/walk/4.png',
			'/chars/piero/walk/5.png',
		], undefined
	);
	piero.boundObjects.body.addAnimationState('run',
		[
			'/chars/piero/run/1.png',
			'/chars/piero/run/2.png',
			'/chars/piero/run/3.png',
			'/chars/piero/run/4.png',
			'/chars/piero/run/5.png',
			'/chars/piero/run/6.png',
		], undefined
	);
	piero.boundObjects.body.addAnimationState('idle',
		[
			'/chars/piero/idle/1.png',
			'/chars/piero/idle/2.png',
			'/chars/piero/idle/3.png',
			'/chars/piero/idle/4.png',
		], undefined
	);
	piero.boundObjects.body.addAnimationState('startup',
		[
			'/chars/piero/startup/1.png',
			'/chars/piero/startup/2.png',
			'/chars/piero/startup/3.png',
			'/chars/piero/startup/4.png',
			'/chars/piero/startup/5.png',
			'/chars/piero/startup/6.png',
			'/chars/piero/startup/7.png',
			'/chars/piero/startup/8.png',
			'/chars/piero/startup/9.png',
			'/chars/piero/startup/10.png',
			'/chars/piero/startup/11.png',
			'/chars/piero/startup/12.png',
		], undefined
	);
	piero.boundObjects.body.addAnimationState('upSmash0',
		[
			'/chars/piero/upSmash/0.png',
			'/chars/piero/upSmash/1.png',
			'/chars/piero/upSmash/2.png',
			'/chars/piero/upSmash/3.png',
		],
		[
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
		]
	);
	piero.boundObjects.body.addAnimationState('upSmash1',
		[
			'/chars/piero/upSmash/4.png',
			'/chars/piero/upSmash/5.png',
			'/chars/piero/upSmash/6.png',
			'/chars/piero/upSmash/7.png',
			'/chars/piero/upSmash/8.png',
			'/chars/piero/upSmash/9.png',
		],
		[
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
		]
	);
	piero.boundObjects.body.addAnimationState('upSmash2',
		[
			'/chars/piero/upSmash/10.png',
			'/chars/piero/upSmash/11.png',
			'/chars/piero/upSmash/12.png',
			'/chars/piero/upSmash/13.png',
			'/chars/piero/upSmash/14.png',
			'/chars/piero/upSmash/15.png',
			'/chars/piero/upSmash/16.png',
			'/chars/piero/upSmash/17.png',
			'/chars/piero/upSmash/18.png',
		],
		[
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
			{x : -08, y : -23},
		],
	);
	piero.boundObjects.body.addAnimationState('upSmashHold', ['/chars/piero/upSmash/4.5.png'], [{x : -08, y : -23}]);
	piero.boundObjects.body.addAnimationState('forwardSmash0',
		[
			'/chars/piero/forwardSmash/0.png',
			'/chars/piero/forwardSmash/1.png',
			'/chars/piero/forwardSmash/2.png',
			'/chars/piero/forwardSmash/3.png',
		],
		[
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
		]
	);
	piero.boundObjects.body.addAnimationState('forwardSmash1',
		[
			'/chars/piero/forwardSmash/4.png',
			'/chars/piero/forwardSmash/5.png',
			'/chars/piero/forwardSmash/6.png',
			'/chars/piero/forwardSmash/7.png',
			'/chars/piero/forwardSmash/8.png',
			'/chars/piero/forwardSmash/9.png',
		],
		[
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
		]
	);
	piero.boundObjects.body.addAnimationState('forwardSmash2',
		[
			'/chars/piero/forwardSmash/10.png',
			'/chars/piero/forwardSmash/11.png',
			'/chars/piero/forwardSmash/12.png',
			'/chars/piero/forwardSmash/13.png',
			'/chars/piero/forwardSmash/14.png',
			'/chars/piero/forwardSmash/15.png',
			'/chars/piero/forwardSmash/16.png',
			'/chars/piero/forwardSmash/17.png',
			'/chars/piero/forwardSmash/18.png',
		],
		[
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
		],
	);
	piero.boundObjects.body.addAnimationState('forwardSmashHold', ['/chars/piero/forwardSmash/4.5.png'], [{x : 0, y : 0}]);
	piero.boundObjects.body.addAnimationState('crouch',
		[
			'/chars/piero/crouching/0.png',
			'/chars/piero/crouching/1.png',
			'/chars/piero/crouching/2.png',
		],
		[
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
		]
	);
	piero.boundObjects.body.states.walk.setFrameDuration(100);
	piero.boundObjects.body.states.run.setFrameDuration(100);
	piero.boundObjects.body.states.upSmash0.setDuration(300);
	piero.boundObjects.body.states.upSmash1.setDuration(400);
	piero.boundObjects.body.states.upSmash2.setDuration(500);
	piero.boundObjects.body.states.forwardSmash0.setFrameDuration(75);
	piero.boundObjects.body.states.forwardSmash1.setFrameDuration(75);
	piero.boundObjects.body.states.forwardSmash2.setDuration(500);
	piero.boundObjects.body.states.crouch.setDuration(250);
	piero.boundObjects.body.addRigidBody({'gravity' : true});
	piero.swapAnimationState('idle', 'body');
	piero.bindGamepad(piero.findGamepad());
	piero.config.lastTickGamepad = piero.boundGamepad;
	if (piero.boundGamepad !== null && piero.boundGamepad !== undefined)
		piero.boundGamepad.setHandler(pieroControls, piero);
	return (piero);
}

function pieroControls(gamepad, piero) {
	//cameraControls(gamepad);
	pieroXAxisMovement(piero, gamepad);
	pieroFirstJump(piero, gamepad);
	pieroSecondJump(piero, gamepad);
	pieroUpSmash(piero, gamepad);
	pieroForwardSmash(piero, gamepad);
	pieroCrouch();
	piero.config.lastTickGamepad = piero.boundGamepad;
}
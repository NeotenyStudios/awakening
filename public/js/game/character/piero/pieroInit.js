/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pieroInit.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/06/16 15:17:36 by anonymous         #+#    #+#             */
/*   Updated: 2017/07/06 17:27:20 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function pieroConfig(engine, gamepad, piero) {
	//JUMPING
	piero.config.ticksSinceGroundJump			= 0;
	piero.config.fJumpTable						= [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,
		0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2,
	];
	piero.config.falling						= false;
	piero.config.isFastFalling					= false;
	piero.config.finishedFirstJump				= false;
	piero.config.canSecondJump					= true;
	piero.config.isCrouching					= false;
	piero.config.orientation					= 1;
	piero.config.canInputDirection				= true
	piero.config.canInputJump					= true;

	//GENERAL RESTRICTION
	piero.config.canInputAttacks				= true;
	
	//UP SMASH
	piero.config.upSmashHitMarkerTable			= [];
	piero.config.upSmashBaseDmg					= 20;
	piero.config.upSmashDmgScaling				= 0.03;
	piero.config.upSmashBaseKnockBack			= 10;
	piero.config.upSmashKnockBackScaling		= 0.3;
	piero.config.isUpSmashing					= false;
	piero.config.upSmash0						= false;
	piero.config.upSmash1						= false;
	piero.config.upSmash2						= false;
	piero.config.holdingUpSmash					= false;
	piero.config.upSmashEnd						= false;
	piero.config.upSmashTimeStart				= 0;
	piero.config.upSmashCharge					= 0;
	piero.config.upSmashHitTicks				= 0;
	piero.config.upSmashDmgRelease				= false;

	//FORWARD SMASH
	piero.config.forwardSmashHitMarkerTable		= [];
	piero.config.forwardSmashBaseDmg			= 20;
	piero.config.forwardSmashDmgScaling			= 0.03;
	piero.config.forwardSmashBaseKnockBack		= 10;
	piero.config.forwardSmashKnockBackScaling	= 0.3;
	piero.config.forwardSmashDmgRelease			= false;
	piero.config.isForwardSmashing				= false;
	piero.config.forwardSmash0					= false;
	piero.config.forwardSmash1					= false;
	piero.config.forwardSmash2					= false;
	piero.config.holdingForwardSmash			= false;
	piero.config.forwardSmashEnd				= false;
	piero.config.forwardSmashTimeStart			= 0;
	piero.config.forwardSmashCharge				= 0;
	piero.config.forwardSmashStateNeedsXFlip	= false;
	piero.config.forwardSmashHitTicks			= 0;
	piero.config.forwardSmashHitBoxConfig		= [
		{x : -60, y : 10, size : {x : 20, y : 20}},
		{x : -55, y : 10, size : {x : 20, y : 25}},
		{x : -50, y : 10, size : {x : 25, y : 25}},
		{x : -45, y : 10, size : {x : 25, y : 30}},
		{x : -40, y : 10, size : {x : 30, y : 30}},
		{x : -35, y : 10, size : {x : 35, y : 30}},
		{x : -30, y : 10, size : {x : 35, y : 35}},
		{x : -20, y : 10, size : {x : 35, y : 40}},
		{x : -18, y : 10, size : {x : 40, y : 40}},
		{x : -15, y : 10, size : {x : 45, y : 40}},
		{x : -13, y : 10, size : {x : 45, y : 45}},
		{x : -12, y : 10, size : {x : 50, y : 50}},
	];
	piero.config.upSmashHitBoxConfig			= [
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : 000, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -10, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -15, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -20, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -25, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -30, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -35, size : {x : 50, y : 50}},
		{x : (piero.boundObjects.body.size.x / 2) - 25, y : -40, size : {x : 50, y : 50}},
	];

	//DOWNSMASH
	piero.config.isDownSmashing					= false;

	//OUTSIDE LOGIC MARKERS
	piero.config.canBeDisplaced 				= true;
	piero.config.canGetDamaged					= true;
	piero.config.canGetImpared					= true;
	piero.config.canBeDisplacedTimer			= 0;
	piero.config.canGetImparedTimer				= 0;
	piero.config.canGetDamagedTimer				= 0;

	//GUI values
	piero.config.damageTaken					= 0;
}

function initPiero(engine, gamepad) {
	let piero = new PlayableCharacter(engine);

	//RIGIDBODY INITIALISATION
	piero.bindNewObject('body', {
		'name'		: 'pieroBody' + new Date().getTime(),
		'posX'		: (1920 - 1000) / 2 + 500,
		'posY'		: 0,
		'width'		: 90,
		'height'	: 90,
		'engine'	: engine
	});

	//ANIMATION INITIALISATION
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
	piero.boundObjects.body.addAnimationState('crouchUp',
		[
			'/chars/piero/crouching/2.png',
			'/chars/piero/crouching/1.png',
			'/chars/piero/crouching/0.png',
		],
		[
			{x : 0, y : 0},
			{x : 0, y : 0},
			{x : 0, y : 0},
		]
	);
	piero.boundObjects.body.addAnimationState('crouchIdle', ['/chars/piero/crouching/2.png'], [{x : 0, y : 0}]);
	piero.boundObjects.body.addAnimationState('crouchDown',
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

	//ANIMATION SPEED CONFIGURATIONS
	piero.boundObjects.body.states.walk.setFrameDuration(100);
	piero.boundObjects.body.states.run.setFrameDuration(100);
	piero.boundObjects.body.states.upSmash0.setDuration(300);
	piero.boundObjects.body.states.upSmash1.setDuration(400);
	piero.boundObjects.body.states.upSmash2.setDuration(500);
	piero.boundObjects.body.states.forwardSmash0.setFrameDuration(75);
	piero.boundObjects.body.states.forwardSmash1.setFrameDuration(75);
	piero.boundObjects.body.states.forwardSmash2.setDuration(500);
	piero.boundObjects.body.states.crouchDown.setFrameDuration(100);
	piero.boundObjects.body.states.crouchUp.setFrameDuration(100);

	//RIGIDBODY & HITBOX FOR BODY OBJECT
	piero.boundObjects.body.addRigidBody({'gravity' : true});
	piero.addHitbox('body', {
		'name'			: 'body',
		'logicMarkers'	: {'type' : 'playableCharacter', 'parentBundle' : piero}
	});

	//MISC
	piero.swapAnimationState('idle', 'body');
	piero.bindGamepad(piero.findGamepad());
	piero.config.lastTickGamepad = piero.boundGamepad;
	if (piero.boundGamepad !== null && piero.boundGamepad !== undefined)
		piero.boundGamepad.setHandler(pieroControls, piero);
	pieroConfig(engine, gamepad, piero);
	return (piero);
}

function pieroControls(gamepad, piero) {
	/*cameraControls(gamepad);*/
	pieroXAxisMovement(piero, gamepad);
	if (piero.config.canInputJump === true)
	{
		pieroFirstJump(piero, gamepad);
		pieroSecondJump(piero, gamepad);
	}
	pieroUpSmash(piero, gamepad);
	pieroForwardSmash(piero, gamepad);
	pieroCrouch(piero, gamepad);
	pieroFastFall(piero, gamepad);
	piero.config.lastTickGamepad = piero.boundGamepad;
}
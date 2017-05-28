/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   inGame.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/16 07:39:25 by mgras             #+#    #+#             */
/*   Updated: 2017/05/29 00:59:33 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let piero;
let engine;

$(document).ready((players) => {
	engine = new Awakening({'width' : 1920, 'height': 1080});
	engine.searchForGamePads();
	createDefaultStage(engine);
	piero = initPiero(engine);
	engine.setZoom(1.4);
});

function initPiero(engine, gamepad) {
	let piero = new PlayableCharacter(engine);

	piero.config.ticksSinceGroundJump = 0;
	piero.config.fJumpTable = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,
		0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2,
	];
	piero.config.falling = false;
	piero.config.finishedFirstJump = false;
	piero.config.canSecondJump = true;
	piero.bindNewObject('body', {
		'name'		: 'pieroBody',
		'posX'		: (1920 - 1000) / 2,
		'posY'		: 150,
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
			'/chars/piero/startup/10.png',
			'/chars/piero/startup/11.png',
			'/chars/piero/startup/12.png',
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
	piero.boundObjects.body.states.walk.setFrameDuration(100);
	piero.boundObjects.body.states.run.setFrameDuration(100);
	piero.boundObjects.body.addRigidBody({'gravity' : true});
	piero.swapAnimationState('idle', 'body');
	piero.bindGamepad(piero.findGamepad());
	piero.config.lastTickGamepad = piero.boundGamepad;
	piero.boundGamepad.setHandler(pieroControls, piero);
	return (piero);
}

function pieroControls(gamepad, piero) {
	cameraControls(gamepad);

	pieroXAxisMovement(piero, gamepad);
	pieroFirstJump(piero, gamepad);
	pieroSecondJump(piero, gamepad);
	piero.config.lastTickGamepad = piero.boundGamepad;
}

function pieroXAxisMovement(piero, gamepad) {
	if (Math.abs(gamepad.moveStick.xAxis) > gamepad.moveStick.deadZone)
	{
		piero.swapAnimationState('run', 'body');
		piero.boundObjects.body.setSpeed(gamepad.moveStick.xAxis * 10, piero.boundObjects.body.rigidBody.velocity.y);
		if (gamepad.moveStick.xAxis > 0)
			piero.boundObjects.body.states.run.reverse.x = false;
		else
			piero.boundObjects.body.states.run.reverse.x = true;
	}
	else
	{
		piero.boundObjects.body.setSpeed(
			Math.abs(piero.boundObjects.body.rigidBody.velocity.x) > 3 ? piero.boundObjects.body.rigidBody.velocity.x * 0.9 : 0,
			piero.boundObjects.body.rigidBody.velocity.y
		);
		piero.swapAnimationState('idle', 'body');
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

function cameraControls(gamepad) {
	if (gamepad.triggers.topLeft.pressed === true)
		gamepad.engine.setZoom(gamepad.engine.camera.z - 0.01);
	if (gamepad.triggers.topRight.pressed === true)
		gamepad.engine.setZoom(gamepad.engine.camera.z + 0.01);
	if (Math.abs(gamepad.cStick.xAxis) > gamepad.cStick.deadZone)
		gamepad.engine.camera.x -= gamepad.cStick.xAxis * 10;
	if (Math.abs(gamepad.cStick.yAxis) > gamepad.cStick.deadZone)
		gamepad.engine.camera.y -= gamepad.cStick.yAxis * 10;
	if (gamepad.cStick.click.pressed === true)
		gamepad.engine.camera = {x : 0, y : 0, z : 1.4};
}

function createDefaultStage(engine) {
	let topKillBox	= engine.buildObject({'name' : 'topKillBox', 'engine' : engine, 'posX' : 0, 'posY' : -50});
	topKillBox.setSize(engine.width, 75);
	topKillBox.addHitBox({'name' : 'topKillBox'});

	let bottomKillBox	= engine.buildObject({'name' : 'bottomKillBox', 'engine' : engine, 'posX' : 0, 'posY' : engine.height - 25});
	bottomKillBox.setSize(engine.width, 75);
	bottomKillBox.addHitBox({'name' : 'bottomKillBox'});

	let leftKillBox	= engine.buildObject({'name' : 'leftKillBox', 'engine' : engine, 'posX' : -50, 'posY' : 25});
	leftKillBox.setSize(75, engine.height - 50);
	leftKillBox.addHitBox({'name' : 'leftKillBox'});

	let rightKillBox	= engine.buildObject({'name' : 'rightKillBox', 'engine' : engine, 'posX' : engine.width - 25, 'posY' : 25});
	rightKillBox.setSize(75, engine.height - 50);
	rightKillBox.addHitBox({'name' : 'rightKillBox'});

	let stage		= engine.buildObject({
		'name'		: 'stage',
		'engine'	: engine,
		'posX'		: (1920 - 1000) / 2,
		'posY'		: 650
	});
	stage.setSize(1000, 50);
	stage.addRigidBody({});
	stage.addHitBox({
		'name'		: 'leftLedgeHook',
		'offX'		: -50,
		'offY'		: -20,
		'width'		: 50,
		'height'	: 80
	});
	stage.addHitBox({
		'name'		: 'rightLedgeHook',
		'offX'		: stage.size.x,
		'offY'		: -20,
		'width'		: 50,
		'height'	: 80
	});
	stage.setMass(0);
}

function gMM(min, max) {
	return (Math.floor(Math.random() * max) + min)
}
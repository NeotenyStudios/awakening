/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   inGame.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/16 07:39:25 by mgras             #+#    #+#             */
/*   Updated: 2017/05/16 09:36:55 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let engine;

$(document).ready((players) => {
	engine = new Awakening({'width' : 1920, 'height': 1080});
	createStage(engine);
	engine.setZoom(1.4);
	window.addEventListener('gamepadReady', (e) => {
		let gamepad = e.detail;

		gamepad.setHandler(cameraControls, 'meme');
	});
	engine.searchForGamePads();
});

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

function regularPlayerControls(gamepad, playerBundle) {
	
}

function createStage(engine) {
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
}

function gMM(min, max) {
	return (Math.floor(Math.random() * max) + min)
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/17 17:54:15 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let awakening;

$(document).ready(() => {
	awakening = new Awakening({
		'width' : 1920,
		'heightheight': 1080,
	});

	setInterval(() => {
		awakening.lastRenderedFrames = awakening.renderedFrames;
		awakening.renderedFrames = 0;
		awakening.elapsedTime = 0;
		awakening.canvas.fillText(awakening.renderedFrames, 10 , 10);
	}, 1000);

	
	let playerNb = 0;

	setInterval(() => {
		let player;

		if (playerNb < 150)
		{
			awakening.buildObject('player' + playerNb);
			player = awakening.objects['player' + playerNb];
			playerNb++;
			player.setSize(Math.floor(Math.random() * 10) + 5, Math.floor(Math.random() * 10) + 5);
			//player.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
			player.move(1600, 50);
			player.isGravityBound = true;
			player.setSpeed(Math.floor(Math.random() * -50) + -10, Math.floor(Math.random() * -30) + -20);
			player.debug.collisionBox = true;
			player.addCollisionBox('body');
		}
	}, 100)

	setInterval(() => {
		let player;

		if (playerNb < 150)
		{
			awakening.buildObject('player' + playerNb);
			player = awakening.objects['player' + playerNb];
			playerNb++;
			player.setSize(Math.floor(Math.random() * 10) + 5, Math.floor(Math.random() * 10) + 5);
			//player.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
			player.move(300, 50);
			player.isGravityBound = true;
			player.setSpeed(Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * -30) + -20);
			player.debug.collisionBox = true;
			player.addCollisionBox('body');
		}
	}, 100)

	awakening.buildObject('playerX');
	playerX = awakening.objects['playerX'];
	playerX.setSize(150, 50);
	playerX.move(900, 600);
	playerX.isGravityBound = true;
	playerX.debug.collisionBox = true;
	playerX.addCollisionBox('body');

	awakening.buildObject('playerY');
	playerY = awakening.objects['playerY'];
	playerY.setSize(50, 50);
	playerY.move(1500, 450);
	playerY.isGravityBound = true;
	playerY.setSpeed(-50 , 5);
	playerY.debug.collisionBox = true;
	playerY.addCollisionBox('body');

	awakening.buildObject('block');
	rest = awakening.objects.block;
	rest.move(10, 650);
	rest.isGravityBound = false;
	rest.setSize(1900, 50);
	rest.debug.collisionBox = true;
	rest.addCollisionBox('body');
	awakening.objects.block.weight = 0.1;

	awakening.buildObject('block2');
	rest = awakening.objects.block2;
	rest.move(50, 0);
	rest.isGravityBound = false;
	rest.setSize(150, 999999);
	rest.debug.collisionBox = true;
	rest.addCollisionBox('body');
	awakening.objects.block2.weight = 0.1;

	awakening.buildObject('block3');
	rest = awakening.objects.block3;
	rest.move(1800, 0);
	rest.isGravityBound = false;
	rest.setSize(150, 999999);
	rest.debug.collisionBox = true;
	rest.addCollisionBox('body');
	awakening.objects.block3.weight = 0.1;

	window.requestAnimationFrame((timestamp) => {awakening.loop(timestamp)});
});
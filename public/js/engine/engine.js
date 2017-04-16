/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/16 18:35:23 by mgras            ###   ########.fr       */
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

		if (playerNb < 5)
		{
			awakening.buildObject('player' + playerNb);
			player = awakening.objects['player' + playerNb];
			playerNb++;
			player.setSize(Math.floor(Math.random() * 80) + 50, Math.floor(Math.random() * 80) + 50);
			//player.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
			player.move(1200, 450);
			player.isGravityBound = true;
			player.setSpeed(Math.floor(Math.random() * -20) + -10 , Math.floor(Math.random() * 5) + 1);
			player.debug.collisionBox = true;
			player.addCollisionBox('body');
		}
	}, 500)

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
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/07 19:16:00 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let awakening;

$(document).ready(() => {
	awakening = new Awakening({});

	setInterval(() => {
		awakening.lastRenderedFrames = awakening.renderedFrames;
		awakening.renderedFrames = 0;
		awakening.elapsedTime = 0;
		awakening.canvas.fillText(awakening.renderedFrames, 10 , 10);
	}, 1000);

	let player;
	let rest;

	awakening.buildObject('player');
	player = awakening.objects.player;
	player.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
	player.move(300, 0);
	player.isGravityBound = false;
	player.setSize(150, 300);
	player.addCollisionBox('body');
	
	awakening.buildObject('block');
	rest = awakening.objects.block;
	rest.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
	rest.move(250, 350);
	rest.isGravityBound = false;
	rest.setSize(150, 300);
	rest.addCollisionBox('body');
	window.requestAnimationFrame((timestamp) => {awakening.loop(timestamp)});
});
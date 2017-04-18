/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/18 19:40:56 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//player.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);

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

	let blockL = 0;
	let blockR = 0;

	setInterval(() => {
		awakening.buildObject('blockL' + blockL, {'engine' : this});
		rest = awakening.objects['blockL' + blockL];
		blockL++;
		rest.move(1500, 450);
		rest.setSize(gMM(20, 25), gMM(20, 25));
		rest.addRigidBody();
		rest.setSpeed(gMM(-10, 5), gMM(0.2, 0.5));
	}, 150)

	setInterval(() => {
		awakening.buildObject('blockR' + blockR, {'engine' : this});
		rest = awakening.objects['blockR' + blockR];
		blockR++;
		rest.move(50, 450);
		rest.setSize(gMM(20, 25), gMM(20, 25));
		rest.addRigidBody();
		rest.setSpeed(gMM(10, 5), gMM(0.2, 0.5));
	}, 150)

	window.requestAnimationFrame((timestamp) => {awakening.loop(timestamp)});
});

function gMM(min, max) {
	return (Math.floor(Math.random() * max) + min)
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/04 19:09:19 by mgras            ###   ########.fr       */
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

	awakening.addObject('player', {
		'imageArray' : ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png']
	});
	awakening.addObject('player2', {
		'imageArray' : ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png']
	});
	awakening.addObject('player3', {
		'imageArray' : ['/0.png', '/1.png', '/2.png', '/3.png']
	});
	awakening.addObject('player4', {
		'imageArray' : ['/0.png', '/1.png', '/2.png']
	});
	awakening.addObject('player5', {
		'imageArray' : ['/0.png', '/1.png']
	});
	awakening.objects.player.move(0, 0);
	awakening.objects.player2.move(155, 0);
	awakening.objects.player3.move(310, 0);
	awakening.objects.player4.move(465, 0);
	awakening.objects.player5.move(620, 0);
	window.requestAnimationFrame((timestamp) => {awakening.loop(timestamp)});
});
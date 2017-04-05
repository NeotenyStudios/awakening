/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   engine.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/03 15:30:32 by mgras             #+#    #+#             */
/*   Updated: 2017/04/05 19:12:18 by mgras            ###   ########.fr       */
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

	awakening.buildObject('player');
	awakening.objects.player.addAnimationState('default', ['/0.png', '/1.png']);
	awakening.objects.player.move(0, 0);

	awakening.buildObject('player2');
	awakening.objects.player2.addAnimationState('default', ['/0.png', '/1.png', '/2.png']);
	awakening.objects.player2.move(155, 0);

	awakening.buildObject('player3');
	awakening.objects.player3.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png']);
	awakening.objects.player3.move(155 + 155, 0);

	awakening.buildObject('player4');
	awakening.objects.player4.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png']);
	awakening.objects.player4.move(155 + 155 + 155, 0);

	awakening.buildObject('player5');
	awakening.objects.player5.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png']);
	awakening.objects.player5.move(155 + 155 + 155, 0);

	awakening.buildObject('player6');
	awakening.objects.player6.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png']);
	awakening.objects.player6.move(155 + 155 + 155 + 155, 0);

	awakening.buildObject('player7');
	awakening.objects.player7.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png']);
	awakening.objects.player7.move(155 + 155 + 155 + 155 + 155, 0);

	awakening.buildObject('player8');
	awakening.objects.player8.addAnimationState('default', ['/0.png', '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png']);
	awakening.objects.player8.move(155 + 155 + 155 + 155 + 155 + 155, 0);
	
	window.requestAnimationFrame((timestamp) => {awakening.loop(timestamp)});
});
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   canvas.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/20 15:41:57 by mgras             #+#    #+#             */
/*   Updated: 2017/04/20 15:42:06 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let initCanvas = function (w, h) {
	let canvasDOM;

	canvasDOM			= document.getElementById('mainFrame');
	canvasDOM.width		= w || 1280;
	canvasDOM.height	= h || 720;
	return (canvasDOM);
}
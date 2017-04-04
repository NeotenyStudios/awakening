/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   animationState.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 18:05:05 by mgras             #+#    #+#             */
/*   Updated: 2017/04/04 19:03:45 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let AnimationState = function (config) {
	config = config | {};
	this.files = [];
	this.duration = config.duration | 1000;
	this.elapsed = 0;
	this.name = config.name | 'default';
}
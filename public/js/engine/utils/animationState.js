/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   animationState.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/04 18:05:05 by mgras             #+#    #+#             */
/*   Updated: 2017/04/04 18:11:44 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let AnimationState = function (config) {
	this.files = [];
	this.name = config.name | 'default';
}
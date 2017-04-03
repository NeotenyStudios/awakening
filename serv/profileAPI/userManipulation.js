/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userManipulation.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/04/01 14:31:28 by mgras             #+#    #+#             */
/*   Updated: 2017/04/03 15:01:31 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

const	MongoClient		= require('mongodb').MongoClient;
const	sha512			= require('sha512');
const	awakeningDb		= 'mongodb://localhost:27018/AWAKENING';
let 	ex				= {};

function addUser(form, cb){
	MongoClient.connect(awakeningDb, (err, db) => {
		db.collection('users').find({'email' : form.email}, {'_id' : 1}).limit(1).toArray((err, emailCheck) => {
			if (err !== null)
			{
				db.close();
				cb(err, null);
			}
			else if (emailCheck.length !== 0)
			{
				db.close();
				cb('This email is already taken', null);
			}
			else
			{
				db.collection('users').find({}, {'userId' : 1}).limit(1).sort({'userId' : -1}).toArray((err, lastUserId) => {
					if (err !== null)
					{
						db.close();
						cb(err, null);
					}
					else
					{
						if (lastUserId.length === 0)
							form.userId = 0;
						else
							form.userId = lastUserId[0].userId + 1;
						form.password = sha512(form.password).toString('hex');
						db.collection('users').insert(form, (err, resp) => {
							if (err !== null)
							{
								db.close();
								cb(err, null);
							}
							else
							{
								console.log('Successfully created new account with userId : ' + form.userId);
								db.close();
								cb(null, resp);
							}
						});
					}
				});
			}
		});
	});
}

function updateUser(form, cb){

}

function removeUser(form, cb){

}

function findUser(query, limit, cb) {
	MongoClient.connect(awakeningDb, (err, db) => {
		if (limit === undefined)
			limit = {};
		db.collection('users').find(query, limit).toArray((err, resp) => {
			cb(err, resp);
		});
	});
}

function hashString(str) {
	let hash = sha512(str).toString('hex');

	return (hash);
}

ex.addUser = addUser;
ex.updateUser = updateUser;
ex.removeUser = removeUser;
ex.findUser = findUser;
ex.hashString = hashString;
module.exports = ex;
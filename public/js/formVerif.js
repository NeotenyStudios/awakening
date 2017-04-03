function verifEmail(string) {
	const reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'gi');

	return (reg.test(string));
}

function verifStringAlphaNumLength(string, minLength, maxLength) {
	const reg = new RegExp(/^[a-zA-Z0-9_]*$/, 'g');

	if (maxLength !== undefined && string.length > maxLength)
		return (false);
	if (minLength !== undefined && string.length < minLength)
		return (false);
	return(reg.test(string));
}

function verifStringLength(string, minLength, maxLength) {
	if (maxLength !== undefined && string.length > maxLength)
		return (false);
	if (minLength !== undefined && string.length < minLength)
		return (false);
	return (true);
}

function inputBlink(returnValue, input){
	if (returnValue === false)
	{
		input.stop(true, false).animate({'background-color' : '#EF5350'}, 200, () => {
			input.stop(true, false).animate({'background-color' : ''}, 850);
		});
	}
	else
	{
		input.stop(true, false).animate({'background-color' : '#81C784'}, 200, () => {
			input.stop(true, false).animate({'background-color' : ''}, 850);
		});
	}
}

function verifInputArray(inputArray, config) {
	let retObj = {};
	const conf = config !== undefined ? config : {
		'email'	: {
			'cmp'	: (string) => {return (verifEmail(string))},
			'cb'	: inputBlink
		},
		'gametag'	: {
			'cmp'	: (string) => {return (verifStringAlphaNumLength(string, 4, 14))},
			'cb'	: inputBlink	
		},
		'psw'		: {
			'cmp'	: (string) => {return (verifStringLength(string, 6, undefined))},
			'cb'	: inputBlink
		}
	}

	retObj.globalStatus = true;
	retObj.erroredInputs = [];
	for (let input in inputArray){
		((input) => {
			for (let patern in conf) {
				if (input.hasClass(patern))
				{
					let inputValue = input.val();
					let paternValue = conf[patern].cmp(inputValue);

					conf[patern].cb(paternValue, input);
					if (paternValue === false)
					{
						retObj.globalStatus = false;
						retObj.erroredInputs.push(input);
					}
				}
			}
		})(inputArray[input]);
	}
	return (retObj);
}
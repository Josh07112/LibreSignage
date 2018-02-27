/*
*  A universal input validator system for LibreSignage.
*/

class ValidatorSelector {
	/*
	*  A class used for selecting the inputs to
	*  validate with validator objects.
	*/
	constructor(query, style, validators, callbacks) {
		/*
		*  Construct the ValidatorSelector object.
		*
		*  * 'query' is a jQuery object or a query string that
		*    selects the input elements to validate.
		*  * 'style' is a jQuery object or a query string that
		*    selects the elements to apply the styling on.
		*  * 'validators' is a list of validator objects to add
		*    to the selector. 'validators' can be left null if
		*    it isn't needed. Validators can also be added with
		*    ValidatorSelector.add().
		*  * 'callbacks' is an array of callback functions to
		*    call every time the validation state changes. The
		*    ValidatorSelector object is passed as the first
		*    argument to the callback functions.
		*/
		this.validators = [];
		this.callbacks = [];
		this.enabled = true;
		this.valid = true;
		this.query = $(query);
		this.style = $(style);

		if (!this.query.length) {
			throw new Error('No input elements selected.');
		}
		if (!this.style.length) {
			throw new Error('No style elements selected.');
		}
		this.query.on(
			'input',
			() => { this.validate(); }
		);
		for (var i in validators) {
			this.add(validators[i]);
		}
	}

	add(validator) {
		/*
		*  Add a validator to the ValidatorSelector object.
		*/
		if (!validator || validator != Object(validator)) {
			throw new Error('Invalid validator object.');
		}
		this.validators.push(validator);
		this.validate();
	}

	state() {
		return this.valid;
	}

	set_dom_msg(msg) {
		if (msg != null) {
			this.msg = msg;
			this.style.find('.invalid-feedback').html(msg);
		}
	}

	set_state(valid) {
		var change = false;
		if (!valid && this.valid) {
			this.valid = false;
			this.query.addClass('is-invalid');
			change = true;
		} else if (valid && !this.valid) {
			this.valid = true;
			this.query.removeClass('is-invalid');
			change = true;
		}

		if (change) {
			for (var i in this.callbacks) {
				this.callbacks[i](this);
			}
		}
	}

	add_callback(callback) {
		this.callbacks.push(callback);
	}

	disable() {
		this.enabled = false;
		this.set_state(true);
	}

	enable () {
		this.enabled = true;
		this.validate();
	}

	validate() {
		var m = null;
		var s = true;
		if (!this.enabled) { return; }
		for (var i in this.validators) {
			if (!this.validators[i].validate(this)) {
				m = this.validators[i].get_msg();
				this.set_dom_msg(m);
				s = false;
			}
		}
		this.set_state(s);
	}
}

class ValidatorTrigger {
	/*
	*  This class creates a trigger for calling functions based
	*  on whether all of the specified ValidatorSelectors are
	*  valid or not.
	*/
	constructor(selectors, callback) {
		/*
		*  Construct the ValidatorTrigger object.
		*
		*  * 'selectors' is an array of selectors to user for
		*    this trigger.
		*  * 'callback' is the callback function to call when
		*    a change occurs.
		*/
		this.callback = callback;
		this.selectors = selectors;
		for (var i in this.selectors) {
			this.selectors[i].add_callback((sel) => {
				this.trigger();
			});
		}
	}

	trigger() {
		/*
		*  Check the validation state of the ValidatorSelectors
		*  and call the callback function if needed.
		*/
		var s = this.selectors;
		for (var i in s) {
			if (this.valid && !s[i].state()) {
				this.valid = false;
				if (this.callback) {
					this.callback(false);
				}
				break;
			} else if (!this.valid && s[i].state()) {
				this.valid = true;
				if (this.callback) {
					this.callback(true);
				}
				break;
			}
		}
	}
}

class Validator {
	constructor(settings, msg) {
		/*
		*  Construct the Validator object. Classes
		*  extending this class should always call the
		*  original constructor with eg. 'super(...args);'
		*  if they redefine the constructor. See the
		*  predefined validators for examples.
		*/
		if (settings && settings != Object(settings)) {
			throw new Error('Invalid validator settings.');
		}
		this.settings = settings;
		this.msg = msg;
	}

	get_msg() {
		return this.msg;
	}

	chk_settings(proto) {
		/*
		*  Check the current this.settings associative array
		*  against the 'proto' array. If settings that exist
		*  in 'proto' are missing from this.settings, errors
		*  are thrown.
		*/
		for (var i in proto) {
			var keys = Object.keys(this.settings);
			if (keys.indexOf(proto[i]) == -1) {
				throw new Error(
					'Invalid Validator settings. ("' +
					proto[i] + '" missing).'
				);
			}
		}
	}
}

class NumValidator extends Validator {
	/*
	*  Validate numeric inputs.
	*
	*  Settings:
	*    * min = The minimum value.    (integer)
	*    * max = The maximum value.    (integer)
	*    * nan = Allow NaN values.     (boolean)
	*    * float = Allow float values. (boolean)
	*/
	constructor(...args) {
		super(...args);
		this.chk_settings(['min', 'max', 'nan']);
	}

	validate(elem) {
		var val = null;
		var min = this.settings.min;
		var max = this.settings.max;
		var nan = this.settings.nan;
		var float = this.settings.float;
		var a, b;
		var ret = null;
		elem.query.each(function() {
			if (float) {
				val = parseFloat($(this).val());
			} else {
				if ($(this).val().indexOf('.') != -1) {
					ret = false;
					return false;
				}
				val = parseInt($(this).val(), 10);
			}
			if (isNaN(val) && !nan) {
				ret = false;
				return false;
			} else if (isNaN(val) && nan) {
				ret = true;
				return false;
			}
			a = (min == null || val >= min);
			b = (max == null || val <= max);
			ret = a && b;
		});
		return ret;
	}
}

class StrValidator extends Validator {
	/*
	*  Validate string inputs.
	*
	*  Settings:
	*    * min = The minimum length.    (integer)
	*    * max = The maximum length.    (integer)
	*    * regex = A "whitelist" regex. (regex)
	*/
	constructor(...args) {
		super(...args);
		this.chk_settings(['min', 'max', 'regex']);
	}

	validate(elem) {
		var val = null;
		var min = this.settings.min;
		var max = this.settings.max;
		var regex = this.settings.regex;
		var a, b, c;
		var ret = false;
		var tmp = null;

		elem.query.each(function() {
			val = $(this).val();
			a = (min == null || val.length >= min);
			b = (max == null || val.length <= max);
			if (regex == null) {
				c = true;
			} else {
				tmp = val.match(regex);
				c = (tmp && tmp[0].length == val.length);
			}
			ret = a && b && c;
			if (!ret) {
				return false;
			}
		});
		return ret;
	}
}

class EqValidator extends Validator {
	/*
	*  Validate all the selected inputs to have the same value.
	*  This validator doesn't need any settings.
	*/
	validate(elem) {
		var ret = true;
		var v = null;
		elem.query.each(function() {
			if (v == null) {
				v = $(this).val();
			} else if (v != $(this).val()) {
				ret = false;
				return false;
			}
		});
		return ret;
	}
}

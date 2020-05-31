var $ = require('jquery');
var bootstrap = require('bootstrap');

var BaseView = require('ls-baseview').BaseView;
var UIController = require('ls-uicontrol').UIController;
var UIButton = require('ls-uicontrol').UIButton;
var UIInput = require('ls-uicontrol').UIInput;

var StrValidator = require('ls-validator').StrValidator;
var dialog = require('ls-dialog');
var APIUI = require('ls-api-ui');

var UserManagerController = require('./usermanagercontroller.js').UserManagerController;
var UserList = require('./components/userlist.js').UserList;

class UserManagerView extends BaseView {
	constructor(api) {
		super();
		this.api = api;
		this.controller = new UserManagerController(api);

		this.init_state({
			ready: false,
			loading: false
		});
	}

	async init() {
		this.buttons = new UIController({
			create: new UIButton({
				elem: $('#btn-create-user'),
				cond: () => true,
				enabler: null,
				attach: { click: () => this.create_user() },
				defer: () => !this.state('ready') || this.state('loading')
			})
		});

		this.inputs = new UIController({
			userlist: new UIInput({
				elem: $('#users-table'),
				cond: () => true,
				enabler: null,
				attach: {
					'component.userlist.save': async (event, data) => {
						this.state('loading', true);
						await this.save_user(
							data.get('username'),
							data.get('groups')
						);
						this.state('loading', false);
					},
					'component.userlist.remove': async (event, data) => {
						this.state('loading', true);
						await this.remove_user(
							data.get('username')
						);
						this.state('loading', false);
					}
				},
				defer: () => !this.state('ready') || this.state('loading'),
				mod: null,
				getter: null,
				setter: null,
				clearer: null
			})
		});

		this.userlist = new UserList(
			this.api,
			$('#users-table')[0]
		);

		await this.fetch();
		this.populate();
		this.state('ready', true);
	}

	create_user() {
		/*
		*  Prompt for a username and create a new user.
		*/
		dialog.dialog(
			dialog.TYPE.PROMPT,
			'Neuen Benutzer erstellen',
			'Geben Sie den Namen für den neuen Benutzer ein.',
			async (status, val) => {
				let user = null;

				if (!status) { return; }
				try {
					user = await this.controller.create_user(val);
				} catch (e) {
					APIUI.handle_error(e);
					return;
				}

				/*
				*  Manually add the new user to the UserList to make
				*  the generated initial password visible in the UI.
				*  This is done because the API doesn't return (or
				*  even know) the password on subsequent calls.
				*/
				this.userlist.add_user(user);
				this.populate();
			},
			[
				new StrValidator({
					min: 1,
					max: null,
					regex: null
				}, '', true),
				new StrValidator({
					min: null,
					max: this.api.limits.USERNAME_MAX_LEN,
					regex: null
				}, 'The username is too long.'),
				new StrValidator({
					min: null,
					max: null,
					regex: /^[A-Za-z0-9_]*$/
				}, 'The username contains invalid characters.')
			]
		)
	}

	async fetch() {
		/*
		*  Fetch userdata for the UI.
		*/
		try {
			this.userlist.set_user_data(
				await this.controller.get_users()
			);
		} catch (e) {
			APIUI.handle_error(e);
			return;
		}
	}

	populate() {
		/*
		*  Populate the UI from the current userdata.
		*/
		this.userlist.render();
	}

	async save_user(username, groups) {
		/*
		*  Save the user 'username' with the new groups 'groups'.
		*/
		try {
			await this.controller.save_user(username, groups);
		} catch (e) {
			APIUI.handle_error(e);
			return;
		}
	}

	async remove_user(username) {
		/*
		*  Remove the user 'username'.
		*/
		try {
			await this.controller.remove_user(username);
		} catch (e) {
			APIUI.handle_error(e);
			return;
		}
		await this.fetch();
		this.populate()
	}
}
exports.UserManagerView = UserManagerView;

import md5 from 'md5';
import db from '../src/models';

import General from '../helpers/General';

import { Lang } from '../src/enum';
import { Roles } from '../src/enum/roles';

class Auth {

	static async login(req, res) {
		try {
			const { lang } = req.headers;
			const { email, password, isRememberMe } = req.body;

			const user = await db.Users.findOne({
				where: {
					email: email,
					password: md5(md5(password) + process.env.PASSWORD_SALT),
					is_removed: false,
				},
			});

			if (!user) {
				return { type: false, message: Lang[lang].Auth.userNotFound };
			}

			// TODO: remove refresh token and set longer session
			if (isRememberMe) {
				const refresh_token = await General.createToken(user);
				await db.Users.update({ refresh_token: refresh_token }, { where: { id: user.id } });
				res.cookie('user_id', user.id, { maxAge: 1000 * 60 * 60 * 24 * 180 });
			}

			req.session.user = {
				id: user.id,
				username: user.username,
				email: user.email,
			};

			return { type: true, message: Lang[lang].Auth.loginSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async register(req) {
		try {
			const { lang } = req.headers;
			const body = req.body;

			const userNameCheck = await db.Users.findOne({
				where: {
					username: body.username,
				},
			});
			if (userNameCheck) {
				return { type: false, message: Lang[lang].Auth.usernameAlreadyExists };
			}
			const emailCheck = await db.Users.findOne({
				where: {
					email: body.email,
				},
			});
			if (emailCheck) {
				return { type: false, message: Lang[lang].Auth.emailAlreadyExists };
			}

			// TODO: make this stronger
			body.password = md5(md5(body.password) + process.env.PASSWORD_SALT);
			const user = await db.Users.create(body);

			if (user) {
				// TODO: make this in create user
				await db.UserRoles.create({
					user_id: user.id,
					role_id: Roles.USER,
				});
				return { type: true, message: Lang[lang].Auth.registerSuccess };
			}
			return { type: false, message: Lang[lang].Auth.userNotFound };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async logout(req, res) {
		try {
			const { lang } = req.headers;
			// TODO: remove refresh token
			await db.Users.update({ refresh_token: null }, { where: { id: req.session.user.id } });
			req.session.destroy();
			res.clearCookie('user_id');

			return { type: true, message: Lang[lang].Auth.logoutSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Auth;

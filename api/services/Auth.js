import md5 from 'md5';
import db from '../src/models';
import General from '@helpers/General';
import { RoleTypes } from '@src/enum';

class Auth {

	static async login(req, res) {
		try {
			const { email, password, isRememberMe } = req.body;

			const user = await db.Users.findOne({
				where: {
					email: email,
					password: md5(md5(password) + process.env.PASSWORD_SALT),
					is_removed: false
				}
			});

			// TODO: Add localization
			if (!user) {
				return { type: false, message: 'User not found' };
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
				email: user.email
			};

			// TODO: Add localization
			return { user: user, type: true, message: 'Login successful', session: req.session };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async register(req) {
		try {
			const body = req.body;

			const userNameCheck = await db.Users.findOne({
				where: {
					username: body.username
				}
			});
			// TODO: Add localization
			if (userNameCheck) {
				return { type: false, message: 'Username already exists' };
			}
			const emailCheck = await db.Users.findOne({
				where: {
					email: body.email
				}
			});
			// TODO: Add localization
			if (emailCheck) {
				return { type: false, message: 'Email already exists' };
			}

			// TODO: make this stronger
			body.password = md5(md5(body.password) + process.env.PASSWORD_SALT);
			const user = await db.Users.create(body);

			if (user) {
				// TODO: make this in create user
				await db.UserRoles.create({
					user_id: user.id,
					role_id: RoleTypes.USER
				});
				// TODO: Add localization
				return { type: true, message: 'User created successfully' };
			}
			else {
				return { type: false, message: 'User not created' };
			}
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async logout(req, res) {
		try {
			await db.Users.update({ refresh_token: null }, { where: { id: req.session.user.id } });
			req.session.destroy();
			res.clearCookie('user_id');
			// TODO: Add localization
			return { type: true, message: 'Logout successful' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Auth;
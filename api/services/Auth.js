import bcrypt from 'bcrypt';
import db from '../src/models';

import { Lang } from '../src/enum';
import { Roles } from '../src/enum/roles';

class Auth {

	static async login(req) {
		try {
			const { lang } = req.headers;
			const { email, password, isRememberMe } = req.body;

			const user = await db.Users.findOne({
				where: {
					email: email,
					is_removed: false,
				},
			});

			const isPasswordValid = bcrypt.compareSync(password, user?.password);
			if (!user || !isPasswordValid) {
				return { type: false, message: Lang[lang].Auth.userNotFound };
			}

			if (isRememberMe) {
				req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
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

			body.password = bcrypt.hashSync(body.password, Number(process.env.BCRYPT_ROUNDS));
			body.UserRolesHasMany = [ { role_id: Roles.USER } ];

			const user = await db.Users.create(body, {
				include: [
					{
						model: db.UserRoles,
						as: 'UserRolesHasMany',
					},
				],
			});

			if (user) {
				return { type: true, message: Lang[lang].Auth.registerSuccess };
			}
			return { type: false, message: Lang[lang].Auth.userNotFound };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async logout(req) {
		try {
			const { lang } = req.headers;
			req.session.destroy();

			return { type: true, message: Lang[lang].Auth.logoutSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Auth;

import md5 from 'md5';
import Utils from '../../utils/util';
import db from '../../src/models';

class AuthService {

	static async login(req, res) {
		try {
			const { email, password, isRememberMe } = req.body;

			const user = await db.Users.findOne({
				where: { email: email, password: md5(password) },
				attributes: { exclude: [ 'password', 'refreshToken' ] } });

			if (isRememberMe) {
				const refreshToken = await Utils.createToken(user);
				await db.Users.update({ refreshToken: refreshToken }, { where: { id: user.id } });
				res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60 * 24 * 180 });
			}

			if (user) {
				req.session.user = {
					id: user.id,
					username: user.username,
					email: user.email
				};
				res.status(200);
				return { user: user, type: true, message: 'Login successful', session: req.session };
			}
			else {
				res.status(401);
				return { type: false, message: 'Invalid credentials' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async loginWithUsername(req, res) {
		try {
			const { username } = req.body;

			const user = await db.Users.findOne({
				where: { username: username },
				attributes: { exclude: [ 'password' ] } });

			if (user && user.refreshToken && Number(req.cookies.userId) === user.id) {
				const user_ = await Utils.resolveToken(user.refreshToken);

				if (user_) {
					req.session.user = {
						id: user_.id,
						username: user_.username,
						email: user_.email
					};
					res.status(200);
					return { user: user_, type: true, message: 'Login successful' };
				}
				else {
					res.status(401);
					return { type: false, message: 'Invalid credentials' };
				}
			}
			else {
				res.status(401);
				return { type: false, message: 'Invalid credentials' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async register(req, res) {
		try {
			const { username, email, password } = req.body;
			const data = {
				username,
				email,
				password: md5(password),
				createdAt: new Date(),
				updatedAt: new Date()
			};

			if (
				await db.Users.findOne({ where: { email: email } }) ||
				await db.Users.findOne({ where: { username: username } })
			) {
				return { type: false, message: 'username or email already exists' };
			}

			const user = await db.Users.create(data);

			if (user) {
				await db.User_Roles.create({
					userId: user.id,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				res.status(201);
				return { type: true, message: 'Registration successful' };
			}
			else {
				res.status(400);
				return { type: false, message: 'Registration failed' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async logout(req, res) {
		try {
			req.session.destroy();
			res.status(200);
			return { type: true, message: 'Logout successful' };
		}
		catch (error) {
			throw error;
		}
	}

}

export default AuthService;
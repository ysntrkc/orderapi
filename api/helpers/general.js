import jwt from 'jsonwebtoken';
import db from '../src/models';
import { Lang } from '../src/enum';

class General {

	static async createToken(user) {
		const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, {
			expiresIn: '180d'
		});

		return token;
	}

	static async decodeToken(token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await db.Users.findOne({
				where: { id: decoded.id },
				attributes: { exclude: [ 'password' ] }
			});

			if (user) {
				return user;
			}
			else {
				return null;
			}
		}
		catch (error) {
			return null;
		}
	}

	static authorizeUser(perm_id) {
		return async (req, res, next) => {
			try {
				const user = await db.Users.findOne({
					where: { id: req.session.user.id },
					include: {
						model: db.Roles,
						include: {
							model: db.Permissions,
							where: { id: perm_id },
							through: []
						},
						through: []
					}
				});

				const userInfo = JSON.parse(JSON.stringify(user));

				if (userInfo.Roles.length > 0 && userInfo.Roles[0].Permissions[0].id === perm_id) {
					next();
				}
				else {
					return res.status(401).json({ type: false, message: Lang[req.headers.lang].Global.unauthorized });
				}
			}
			catch (error) {
				return res.status(500).json({ type: false, message: error.message });
			}
		};
	}

	static async authorizeBySession(req, res, next) {
		try {
			if (req.session.user && req.cookies['connect.sid']) {
				next();
			}
			else {
				const token = await db.Users.findOne({
					where: { id: req.cookies.user_id},
					attributes: [ 'refresh_token' ]
				});

				if (token.refresh_token) {
					const user = await General.decodeToken(token.refresh_token);
					req.session.user = {
						id: user.id,
						email: user.email,
						username: user.username
					};
					next();
				}
				else {
					res.status(401);
					return res.json({ type: false, message: Lang[req.headers.lang].Global.unauthorized });
				}
			}
		}
		catch (error) {
			res.status(500);
			return res.json({ type: false, message: error.message });
		}
	}

	static async authorizeSysAdmin(req, res, next) {
		try {
			const user = await db.Users.findOne({
				where: { id: req.session.user.id },
				include: {
					model: db.Roles,
					where: { id: 1 },
					through: []
				}
			});

			const userInfo = JSON.parse(JSON.stringify(user));

			if (user && userInfo.Roles.length > 0 && userInfo.Roles[0].id === 1) {
				next();
			}
			else {
				res.status(401);
				return res.json({ type: false, message: Lang[req.headers.lang].Global.unauthorized });
			}
		}
		catch (error) {
			res.status(500);
			return res.json({ type: false, message: error.message });
		}
	}

	static getFileRoute(filename) {
		const string = filename.split('.')[ 0 ].split('Route')[ 0 ].toLowerCase();
		return string;
	}

}

export default General;
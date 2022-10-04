import jwt from 'jsonwebtoken';
import db from '../src/models';

class Utils {
    static async authorizeToken(req, res, next) {
        const token = req.headers.auth;

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ type: false, message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ type: false, message: "Unauthorized" });
            }
            req.userId = decoded.id;
            next();
        });
    }

    static authorizeUser(permId) {
        return async (req, res, next) => {
            try {
                const user = await db.Users.findOne({
                    where: { id: req.session.user.id },
                    include: {
                        model: db.Roles,
                        include: {
                            model: db.Permissions,
                            where: { id: permId },
                            through: []
                        },
                        through: []
                    }
                });

                const userInfo = JSON.parse(JSON.stringify(user));

                if (userInfo.Roles.length > 0 && userInfo.Roles[0].Permissions[0].id === permId) {
                    next();
                } else {
                    return res.status(401).json({ type: false, message: "Unauthorized" });
                }
            } catch (error) {
                return res.status(500).json({ type: false, message: error.message });
            }
        }
    }

    static async authorizeBySession(req, res, next) {
        if (req.session.user && req.cookies["connect.sid"]) {
            next();
        } else {
            return res.status(401).json({ type: false, message: "Unauthorized" });
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
            } else {
                return res.status(401).json({ type: false, message: "Unauthorized" });
            }
        } catch (error) {
            return res.status(500).json({ type: false, message: error.message });
        }
    }
}

export default Utils;
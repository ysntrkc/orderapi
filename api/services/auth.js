import md5 from 'md5';
import jwt from 'jsonwebtoken';
import db from '../../src/models';

class AuthService {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await db.Users.findOne({ where: { email: email, password: md5(password) }, attributes: { exclude: ['password'] } });

            if (user) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return { user: user, type: "true", message: "Login successful", token };
            } else {
                return { type: "false", message: "Invalid credentials" };
            }
        } catch (error) {
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
            }

            if (await db.Users.findOne({ where: { email: email } }) || await db.Users.findOne({ where: { username: username } })) {
                return { type: "false", message: "username or email already exists" };
            }

            const user = await db.Users.create(data);

            if (user) {
                return { type: "true", message: "Registration successful" };
            } else {
                return { type: "false", message: "Registration failed" };
            }
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
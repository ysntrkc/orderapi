import jwt from 'jsonwebtoken';

class Authorize {
    static async authorizeUser(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ type: "false", message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ type: "false", message: "Unauthorized" });
            }
            req.userId = decoded.id;
            next();
        });
    }
}

export default Authorize;
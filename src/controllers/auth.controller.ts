import {User} from "../models/schemas/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
    static async register(req, res) {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);
                let userData = {
                    username: req.body.username,
                    password: passwordHash,
                    role: req.body.role
                }
                const newUser = await User.create(userData);
                res.json({user: newUser, code: 200});
            } else {
                res.json({err: "User existed!"});
            }
        } catch (err) {
            res.json({err: err});
        }
    }

    static async login(req, res) {
        try {
            const user = await User.findOne({username: req.body.username});
            if (user) {
                const comparePass = await bcrypt.compare(req.body.password, user.password);
                if (!comparePass) {
                    return Promise.reject({
                        code: 404,
                        message: 'PASSWORD_NOT_VALID'
                    });
                }
                let payload = {
                    user_id: user['id'],
                    username: user['username'],
                    role: user['role']
                }
                const token = jwt.sign(payload, '123456789', {
                    expiresIn: 36000
                });
                res.render('home', {token});
            } else {
                return res.json({err: 'Sai tài khoản hặc mật khẩu.'});
            }
        } catch (err) {
            return res.json({err: err});
        }
    }
}
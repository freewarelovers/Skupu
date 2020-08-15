const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports = class UserController {
    static async login(req, res) {
        const body = req.body;

        try {
            const user = await User.findOne({email: body.email})
            if (user) {
                const validPassword = bcrypt.compare(body.password, user.password)
                if (validPassword) {
                    return res.status(200).json({
                        message: 'success',
                        status: true,
                        data: {
                            user: {
                                email: user.email,
                                username: user.userName,
                                imageURL: user.coverPicture
                            }
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: 'invalid password',
                        status: false,
                        data: []
                    })
                }
            } else {
                return res.status(400).json({
                    message: 'invalid email',
                    status: false,
                    data: []
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Internal server error',
                status: false,
                data: {
                    message: e.toString()
                }
            })
        }
    }

    static async register(req, res) {

    }
}
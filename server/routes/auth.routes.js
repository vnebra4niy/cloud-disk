const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt=require('jsonwebtoken')
const config=require('config')
const {check, validationResult} = require("express-validator")
const router = new Router()


router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 6 and shorter than 15').isLength({min:6, max:15})
    ],
    async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = new User({email, password: hashPassword})
        await user.save()
        return res.json({message: "User was created"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/login',async (req,res)=>{
    try {
        const {email, password} = req.body
        const user=await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "Invalid login or password"})
        }
        const isPassValid=bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid login or password"})
        }

        const token=jwt.sign({id: user.id},  config.get('secretKey'), {expiresIn: "1h"})

        return res.json({
            token,
            user: user.id,
            email: user.email,
            dickSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar
        })
    } catch(e) {
        console.log(e)
        return res.send({message:"Server error"})
    }
})


module.exports = router
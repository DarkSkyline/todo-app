const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/Users')

module.exports = {
    Mutation: {
        async register(_, { registerInput : { username, password, confirmPassword }}, context, info){
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user doesn't already exists
            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                username,
                password,
                createdAt: new Date().toISOString()
            })
            
            const res = await newUser.save()

            const token = jwt.sign({
                id: res.id,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h' })
            
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
const zod = require('zod')

const signUpBodyZodSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})

const signInBodyZodSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

const updateBodyZodSchema = zod.object({
    password:zod.string().min(6).max(30),
    firstName:zod.string(), 
    lastName:zod.string()
})
module.exports = {
    signUpBodyZodSchema,
    signInBodyZodSchema,
    updateBodyZodSchema
}
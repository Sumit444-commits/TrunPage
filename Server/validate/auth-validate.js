import {z} from "zod"

const loginSchema = z.object({
    email : z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "Invalied email address"})
    .min(3, {message: "Email must be atleast 3 characters"})
    .max(255, {message: "Email should be no longer than 255 characters"}),

    password : z
    .string({required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password must be atleast 7 characters"})
    .max(1024, {message: "Password should be no longer than 1024 characters"})
    
})

const signupSchema = loginSchema.extend({
    username : z
    .string({required_error: "username is required"})
    .trim()
    .min(3, {message: "Username must be atleast 3 characters"})
    .max(255, {message: "Username should be no longer than 255 characters"}),

    phone : z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must be atleast 10 characters"})
    .max(20, {message: "Phone should be no longer than 20 characters"})
    
})

export {loginSchema,signupSchema}
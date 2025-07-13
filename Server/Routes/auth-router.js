import express from "express"
import { home, login, register, user ,updateUserData} from "../controllers/auth-controller.js"
import { loginSchema, signupSchema } from "../validate/auth-validate.js"
import validate from "../middleware/validate-middleware.js"
import authMiddleware from "../middleware/auth-middleware.js"

const router = express.Router()

// home route
router.route("/").get(home)

// Auth Route
router.route("/login").post(validate(loginSchema),login)
router.route("/register").post(validate(signupSchema), register)

router.route("/user").get(authMiddleware, user)
router.route("/user/update").patch(authMiddleware, updateUserData)


export default router
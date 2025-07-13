import express from "express"
import { fetchingServices, service, getServiceById } from "../controllers/service-controller.js"
import authMiddleware from "../middleware/auth-middleware.js"

const router = express.Router()

router.route("/services/add").post(authMiddleware,service)
router.route("/services/get/:id").get(authMiddleware,getServiceById)

router.route("/services").get(fetchingServices)

export default router
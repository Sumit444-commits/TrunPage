import express from "express"
import authMiddleware from "../middleware/auth-middleware.js"
import { buyService, getSalesById,updateSaleById } from "../controllers/sales-controller.js"

const router = express.Router()

router.route("/buy/:userId/:serviceId").post(authMiddleware,buyService)

router.route("/get/:id").get(authMiddleware,getSalesById)

router.route("/update/:id").patch(authMiddleware,updateSaleById)

export default router;
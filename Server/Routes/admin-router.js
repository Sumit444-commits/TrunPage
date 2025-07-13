import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserDataById,
  getAllContacts,
  deleteContactById,
  deleteAllContacts,
  deleteServiceById,
  getAllServices,
  updateServiceById,
  getAllSales,
} from "../controllers/admin-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";
import { service } from "../controllers/service-controller.js";


const router = express.Router();

// for users
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, updateUserDataById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);

// contacts
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

// delete operations
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);
router
  .route("/contacts/delete/all")
  .delete(authMiddleware, adminMiddleware, deleteAllContacts);

// Services
//get
router.route("/services").get(authMiddleware, adminMiddleware, getAllServices);

// Post operations
router.route("/services/add").post(authMiddleware, adminMiddleware, service);

// delete operations
router
  .route("/services/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteServiceById);

// router
//   .route("/contacts/delete/all")
//   .delete(authMiddleware, adminMiddleware, deleteAllContacts);

// Update/Patch operations
router
  .route("/services/update/:id")
  .patch(authMiddleware, adminMiddleware, updateServiceById);

// Sales
//get
router.route("/sales").get(authMiddleware, adminMiddleware, getAllSales);

export default router;

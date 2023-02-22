import express from "express";
import {
  getUsers,
  createUser,
  getUserByid,
  UpdateUser,
  deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserByid);
router.post("/users", createUser);
router.patch("/users/:id", UpdateUser);
router.delete("/users/:id", deleteUser);

export default router;

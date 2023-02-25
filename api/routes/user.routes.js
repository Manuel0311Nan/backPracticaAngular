import express from "express";
import { check } from "express-validator";

import { deleteUser, editUser, getUserById, getUsers, loginUser, registerUser } from "../controllers/userController.js";
const userRoutes = express.Router();

userRoutes.post(
  "/", [
    (check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }))
  ],registerUser
);

userRoutes.post("/login", loginUser);

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);

userRoutes.put("/editUser/:id", editUser);
userRoutes.delete("/deleteUser/:id", deleteUser);

export {userRoutes}

import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

import {
  UserRegisterValidator,
  UserLoginValidator,
} from "../validators/index.js";

const router = Router();

router.route("/register").post(UserRegisterValidator(), validate, registerUser);
router.route("/login").post(UserLoginValidator(), validate, loginUser);
router.route("/logout").post(verifyJwt, logoutUser);

export default router;

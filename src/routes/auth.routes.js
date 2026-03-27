import { Router } from "express";

import { registerUser, loginUser } from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import {
  UserRegisterValidator,
  UserLoginValidator,
} from "../validators/index.js";

const router = Router();

router.route("/register").post(UserRegisterValidator(), validate, registerUser);
router.route("/login").post(UserLoginValidator(), validate, loginUser);

export default router;

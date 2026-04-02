import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetForgotPassword,
  changeCurrentPassword,
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

import {
  UserRegisterValidator,
  UserLoginValidator,
  UserForgotPasswordValidator,
  resetForgotPasswordValidator,
  changeCurrentPasswordValidator,
} from "../validators/index.js";

const router = Router();

//unsecure routes
router.route("/register").post(UserRegisterValidator(), validate, registerUser);
router.route("/login").post(UserLoginValidator(), validate, loginUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(UserForgotPasswordValidator(), validate, forgotPassword);
router
  .route("/reset-password/:resetToken")
  .post(resetForgotPasswordValidator(), validate, resetForgotPassword);

//secure routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJwt,
    changeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );
router
  .route("/resend-email-verification")
  .post(verifyJwt, resendEmailVerification);

export default router;

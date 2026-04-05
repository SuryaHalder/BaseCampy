import { body } from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";

const UserRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 character long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 character long"),
    body("fullname").optional().trim(),
  ];
};

const UserLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const UserForgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const resetForgotPasswordValidator = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};

const changeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old Password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};

const createProjectValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMembersToProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid"),
  ];
};

export {
  UserRegisterValidator,
  UserLoginValidator,
  UserForgotPasswordValidator,
  resetForgotPasswordValidator,
  changeCurrentPasswordValidator,
  createProjectValidator,
  addMembersToProjectValidator,
};

import { Router } from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMembersToProject,
  getProjectMembers,
  updateMemberRole,
  deleteMember,
} from "../controllers/project.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

import { verifyPermission } from "../middlewares/permission.middleware.js";

import {
  createProjectValidator,
  addMembersToProjectValidator,
} from "../validators/index.js";

import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJwt);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(verifyPermission(AvailableUserRole), getProjectById)
  .put(
    verifyPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject
  )
  .delete(verifyPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(verifyPermission(AvailableUserRole), getProjectMembers)
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    addMembersToProjectValidator(),
    validate,
    addMembersToProject
  );

router
  .route("/:projectId/members/:userId")
  .put(verifyPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(verifyPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ProjectMember } from "../models/projectMember.model.js";
import mongoose from "mongoose";

export const verifyPermission = (allowedRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project id is required");
    }

    const projectMember = await ProjectMember.findOne({
      user: new mongoose.Types.ObjectId(req.user._id),
      project: new mongoose.Types.ObjectId(projectId),
    });

    if (!projectMember) {
      throw new ApiError(403, "You are not member of this project");
    }

    const givenRoles = projectMember.role;

    if (!allowedRoles.includes(givenRoles)) {
      throw new ApiError(
        403,
        `Permission denied. Allowed roles: ${allowedRoles.join(", ")}`
      );
    }

    req.projectMember = projectMember;

    next();
  });
};

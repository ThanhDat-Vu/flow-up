import express from "express";
import * as UserController from "../controllers/user-controller";

const UserRoute = express.Router();

UserRoute.get("/get-auth-user", UserController.getAuthUser);
UserRoute.post("/get-user-by-slug", UserController.getUserBySlug);
UserRoute.post(
  "/get-presigned-url-for-upload",
  UserController.getPresignedUrlToUpload
);
UserRoute.post("/delete-old-avatar", UserController.deleteOldAvatar);
UserRoute.post("/update-profile", UserController.updateUserProfile);

export default UserRoute;

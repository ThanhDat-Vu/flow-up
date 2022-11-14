import express from "express";
import * as UserController from "../controllers/user-controller";
import multer from "multer";

const UserRoute = express.Router();
const upload = multer({ dest: "uploads/" });

UserRoute.get("/get-auth-user", UserController.getAuthUser);
UserRoute.post("/get-user-by-slug", UserController.getUserBySlug);
UserRoute.post(
  "/upload-avatar",
  upload.single("avatar"),
  UserController.uploadUserAvatar
);
UserRoute.post("/update-profile", UserController.updateUserProfile);

export default UserRoute;

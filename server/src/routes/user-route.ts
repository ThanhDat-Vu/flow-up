import express from "express";
import * as UserController from "../controllers/user-controller";

const UserRoute = express.Router();

UserRoute.get("/get-auth-user", UserController.getAuthUser);
UserRoute.post("/get-user-by-slug", UserController.getUserBySlug);
UserRoute.post("/update-profile", UserController.updateUserProfile);

export default UserRoute;

import { Request, Response } from "express";
import User from "../models/user-model";
import * as statusMessage from "../utils/status-message";

export function getAuthUser(req: Request, res: Response) {
  statusMessage.inProgress("get auth user");
  try {
    res.json(req.user || null);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function getUserBySlug(req: Request, res: Response) {
  statusMessage.inProgress("get user by slug");
  try {
    const { slug } = req.body;
    const user = await User.getBySlug(slug);
    res.json(user);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function uploadUserAvatar(req: Request, res: Response) {
  statusMessage.inProgress("upload user avatar");
  try {
    const avatar = req.file;
    console.log(avatar);
    res.json("hi");
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  statusMessage.inProgress("update user profile");
  try {
    const { _id, displayName, avatarUrl } = req.body;
    const updatedUser = await User.updateById({
      id: _id,
      displayName,
      avatarUrl,
    });
    res.json(updatedUser);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

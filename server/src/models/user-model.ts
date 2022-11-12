import { Model, Schema, model } from "mongoose";
import generateSlug from "../utils/slugify";
import _ from "lodash";

export const PUBLIC_FIELDS = [
  "_id",
  "slug",
  "email",
  "displayName",
  "avatarUrl",
];

export interface IUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  slug: string;
  createdAt: Date;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface UserModel extends Model<IUser> {
  getBySlug(slug: string): IUser;
  updateById({
    id,
    displayName,
    avatarUrl,
  }: {
    id: string;
    displayName: string;
    avatarUrl: string;
  }): IUser;
}

const UserSchema = new Schema(
  {
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    displayName: String,
    avatarUrl: String,
  },
  {
    statics: {
      async getBySlug(slug) {
        return await this.findOne({ slug }).select(PUBLIC_FIELDS).lean();
      },

      async updateById({ id, displayName, avatarUrl }) {
        const user = await this.findById(id).lean();

        if (displayName === user?.displayName)
          return _.pick(user, PUBLIC_FIELDS);

        const newSlug = await generateSlug(this, displayName);
        return await this.findByIdAndUpdate(
          id,
          {
            ...user,
            slug: newSlug,
            displayName,
            avatarUrl,
          },
          { returnDocument: "after" }
        )
          .select(PUBLIC_FIELDS)
          .lean();
      },
    },
  }
);

const User = model<IUser, UserModel>("User", UserSchema);

export default User;

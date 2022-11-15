import { Model, Schema, model } from "mongoose";
import generateSlug from "../utils/slugify";
import _ from "lodash";
import {
  createSendTemplatedEmailCommand,
  runSesCommand,
} from "../libs/ses-client";

export const PUBLIC_FIELDS = [
  "_id",
  "slug",
  "email",
  "displayName",
  "avatarUrl",
  "isLinkWithGoogle",
];

export interface IUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  slug: string;
  createdAt: Date;
  email: string;
  displayName: string;
  avatarUrl: string;
  googleId: string;
  googleToken: {
    accessToken: string;
    refreshToken: string;
  };
  isLinkWithGoogle: string;
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
  authWithGoogle({
    email,
    displayName,
    avatarUrl,
    googleId,
    googleToken,
  }: {
    email: string;
    displayName: string;
    avatarUrl: string;
    googleId: string;
    googleToken: {
      accessToken: string;
      refreshToken: string;
    };
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
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleToken: {
      accessToken: String,
      refreshToken: String,
    },
    isLinkWithGoogle: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    statics: {
      async getBySlug(slug) {
        return await this.findOne({ slug }).select(PUBLIC_FIELDS).lean();
      },

      async updateById({ id, displayName, avatarUrl }) {
        const user: IUser = await this.findById(id).lean();

        let newSlug = user.slug;

        if (avatarUrl === user.avatarUrl && displayName === user.displayName) {
          return _.pick(user, PUBLIC_FIELDS);
        } else {
          newSlug = await generateSlug(this, displayName);
        }

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

      async authWithGoogle({
        email,
        displayName,
        avatarUrl,
        googleId,
        googleToken,
      }) {
        const user = await this.findOne({ email }).lean();

        if (user) {
          if (_.isEmpty(googleToken) && user.googleId)
            return _.pick(user, PUBLIC_FIELDS);

          return await this.findByIdAndUpdate(user._id, {
            ...user,
            avatarUrl: user.avatarUrl || avatarUrl,
            googleId,
            googleToken,
          })
            .select(PUBLIC_FIELDS)
            .lean();
        }

        const slug = await generateSlug(this, displayName);

        const newUser = await this.create({
          slug,
          createdAt: new Date(),
          email,
          displayName,
          avatarUrl,
          googleId,
          googleToken,
          isLinkWithGoogle: true,
        });

        runSesCommand(
          createSendTemplatedEmailCommand({
            userEmail: email,
            templateName: "welcome",
            templateData: {
              name: displayName,
            },
          })
        );

        return _.pick(newUser, PUBLIC_FIELDS);
      },
    },
  }
);

const User = model<IUser, UserModel>("User", UserSchema);

export default User;

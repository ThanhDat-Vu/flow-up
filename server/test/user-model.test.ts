import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/user-model";

dotenv.config();

describe("User Controller test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_URI || "");

    const mockUsers = [
      {
        slug: "anonymous",
        createdAt: new Date(),
        email: "anonymous@gmail.com",
        displayName: "Anonymous",
        avatarUrl: "",
      },
      {
        slug: "unknown",
        createdAt: new Date(),
        email: "unknown@gmail.com",
        displayName: "Unknown",
        avatarUrl: "",
      },
    ];

    await User.create(mockUsers);
  });

  afterAll(async () => {
    await User.deleteMany({ displayName: ["Anonymous"] });
    mongoose.disconnect();
  });

  it("should not update user with same display name", async () => {
    const insertedUser = await User.getBySlug("anonymous");

    const updatedUser = await User.updateById({
      id: insertedUser?._id,
      displayName: "Anonymous",
      avatarUrl: "",
    });

    expect(updatedUser).toEqual(insertedUser);
  });

  it("should generate different slug for same displayName", async () => {
    const insertedUser = await User.getBySlug("unknown");

    const updatedUser = await User.updateById({
      id: insertedUser?._id,
      displayName: "Anonymous",
      avatarUrl: ".",
    });

    const modifiedUser = await User.getBySlug("anonymous-1");

    expect(modifiedUser).toMatchObject(updatedUser);
  });

  it("should generate unused smaller-count slug for same displayName", async () => {
    await User.deleteOne({ slug: "anonymous" });
    const mockUsers = [
      {
        slug: "anonymous",
        createdAt: new Date(),
        email: "anonymous1@gmail.com",
        displayName: "Anonymous",
        avatarUrl: "",
      },
    ];
    await User.create(mockUsers);
    const insertedUser = await User.getBySlug("anonymous");
    expect(insertedUser).toMatchObject({
      slug: "anonymous",
      email: "anonymous1@gmail.com",
      displayName: "Anonymous",
    });
  });
});

import _ from "lodash";
import { Model } from "mongoose";

const slugify = (text: string) => _.kebabCase(text);

export default async function generateSlug(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model: Model<any>,
  displayName: string,
  count = 0
): Promise<string> {
  const slug = slugify(count === 0 ? displayName : displayName + "-" + count);
  const duplicate = await Model.findOne({ slug }, "_id").lean();
  return duplicate ? generateSlug(Model, displayName, count + 1) : slug;
}

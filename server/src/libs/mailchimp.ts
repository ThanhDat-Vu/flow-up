import dotenv from "dotenv";
import mailchimp from "@mailchimp/mailchimp_marketing";
import * as statusMessage from "../utils/status-message";

dotenv.config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function addNewEmailSubscriber(userEmail: string) {
  statusMessage.inProgress("add new email subscriber");
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID || "", {
      email_address: userEmail,
      status: "pending",
    });
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

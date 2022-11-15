import dotenv from "dotenv";
import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import * as statusMessage from "../utils/status-message";

dotenv.config();
const REGION = process.env.REGION;

export const sesClient = new SESClient({ region: REGION });

export const createSendTemplatedEmailCommand = ({
  userEmail,
  templateName,
  templateData,
}: {
  userEmail: string;
  templateName: string;
  templateData: unknown;
}) => {
  return new SendTemplatedEmailCommand({
    Destination: { ToAddresses: [userEmail] },
    Template: templateName,
    TemplateData: JSON.stringify(templateData),
    Source: process.env.AWS_SES_VERIFIED_EMAIL,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runSesCommand(command: any) {
  statusMessage.inProgress("run ses command");
  try {
    await sesClient.send(command);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

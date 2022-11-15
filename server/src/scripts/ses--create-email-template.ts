import { CreateTemplateCommand } from "@aws-sdk/client-ses";
import { welcomeEmailTemplate } from "../libs/emails/welcome";
import { runSesCommand } from "../libs/ses-client";

runSesCommand(new CreateTemplateCommand(welcomeEmailTemplate));

// npx ts-node src\scripts\ses--create-email-template.ts

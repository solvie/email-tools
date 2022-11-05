import { Command } from "commander";
import { COMMANDS, PARAMS, generateProgram } from "./commander";
import { EmailTool } from "./email-tool";
import { authorize } from "./auth";
import { google } from "googleapis";
import { GmailHandler } from "./gmail-handler";

const initGoogle = async () => {
  const auth = await authorize();
  return google.gmail({ version: "v1", auth });
};

const buildEmailTool = async () => {
  const gmail = await initGoogle();
  const gmailHandler = new GmailHandler(gmail);
  return new EmailTool(gmailHandler);
};

const runTool = async (program: Command) => {
  try {
    program.parse();
    const cmdsAndOpts = program.opts();
    const listCmd = cmdsAndOpts[COMMANDS.LIST];
    const readCmd = cmdsAndOpts[COMMANDS.READ];

    const query = cmdsAndOpts[PARAMS.QUERY];

    const emailTool = await buildEmailTool();

    if (listCmd === "email") {
      await emailTool.listEmails({ q: query, labelIds: [] });
    } else if (listCmd === "label") {
      await emailTool.listLabels();
    } else if (readCmd) {
      await emailTool.readEmailSnippet(readCmd);
    }
  } catch (e) {
    console.log(e);
  }
};

async function main() {
  const program = generateProgram();
  await runTool(program);
}

main().then(() => {
  console.log("done");
});

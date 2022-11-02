import { Command } from "commander";
import { generateProgram, OPTIONS } from "./commander";
import { GmailHandler } from "./google-apis";
import { authorize } from "./auth";
import { google } from "googleapis";

const initGoogle = async() => {
  const auth = await authorize();
  return google.gmail({ version: "v1", auth });
}

const runTool = async(program: Command) => {
  try {
    program.parse();
    const options = program.opts();
    const query = options[OPTIONS.QUERY];
    const message = options[OPTIONS.MESSAGE];
    const gmail = await initGoogle();
    const gmailHandler = new GmailHandler(gmail);
    if (options[OPTIONS.LABELS]) {
      await gmailHandler.listLabels();
    }
    if (options[OPTIONS.EMAILS]) {
      await gmailHandler.listEmails(query);
    }
    if (options[OPTIONS.MESSAGE]) {
      await gmailHandler.readEmailSnippet(message);
    }
  } catch (e) {
    console.log(e);
  }
}

async function main () {
  const program = generateProgram();
  await runTool(program);
}

main().then(() => { console.log('done')});

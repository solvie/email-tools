import { Command } from "commander";
import { COMMANDS, PARAMS, generateProgram } from "./commander";
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
    const cmdsAndOpts = program.opts();
    const listCmd = cmdsAndOpts[COMMANDS.LIST];
    const readCmd = cmdsAndOpts[COMMANDS.READ];

    const query = cmdsAndOpts[PARAMS.QUERY];
    
    const gmail = await initGoogle();
    const gmailHandler = new GmailHandler(gmail);

    if (listCmd ===  'email') {
      await gmailHandler.listEmails({q: query, labelIds: []});
    } else if (listCmd === 'label') {
      await gmailHandler.listLabels();
    } else if (readCmd) {
      await gmailHandler.readEmailSnippet(readCmd);
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

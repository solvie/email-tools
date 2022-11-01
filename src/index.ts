import { Command } from "commander";
import { GmailHandler } from "./google-apis";
import { authorize } from "./auth";
import { google } from "googleapis";

const program = new Command();

program
  .name('email-tools')
  .description('CLI for interacting with gmail api ');
program
  .option('-l, --labels', 'list labels')
  .option('-u, --unreads', 'list unread emails')
  .option('-m, --message <type>', 'get message with id');

program.parse();

const options = program.opts();

const initGoogle = async() => {
  const auth = await authorize();
  return google.gmail({ version: "v1", auth });
}

async function main () {
  try {
    const gmail = await initGoogle();
    const gmailHandler = new GmailHandler(gmail);
    if (options.labels) {
      await gmailHandler.listLabels();
    }
    if (options.unreads) {
      await gmailHandler.listUnreads();
    }
    if (options.message) {
      await gmailHandler.readEmailSnippet(options.message);
    }
  } catch (e) {
    console.log(e);
  }
}

main().then(() => { console.log('done')});

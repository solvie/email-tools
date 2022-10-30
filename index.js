import { Command } from "commander";
import { listLabels, listUnreads } from "./google-apis.js";
import { authorize } from "./auth.js";
import { google } from "googleapis";

const program = new Command();

program
  .name('email-tools')
  .description('CLI for interacting with gmail api ');
program
  .option('-l, --labels', 'list labels')
  .option('-u, --unreads', 'list unread emails');

program.parse();

const options = program.opts();

const initGoogle = async() => {
  const auth = await authorize();
  return google.gmail({ version: "v1", auth });
}

try {
  const gmail = await initGoogle();
  if (options.labels) {
    await listLabels(gmail);
  }
  if (options.unreads) {
    await listUnreads(gmail);
  }
} catch (e) {
  console.log(e);
}


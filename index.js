import { Command } from "commander";
import { listLabels, listUnreads } from "./google-apis.js";
import { authorize } from "./auth.js";

const program = new Command();

program
  .name('email-tools')
  .description('CLI for interacting with gmail api ');
program
  .option('-l, --labels', 'list labels')
  .option('-u, --unreads', 'list unread emails');

program.parse();

const options = program.opts();
try {
  if (options.labels) {
    await listLabels(await authorize());
  }
  if (options.unreads) {
    await listUnreads(await authorize());
  }
} catch (e) {
  console.log(e);
}


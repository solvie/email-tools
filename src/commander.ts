import { Command } from "commander";

export const OPTIONS = {
  LABELS: 'labels',
  EMAILS: 'emails',
  QUERY: 'query',
  MESSAGE: 'message',
}

export const generateProgram = () => {
  const program = new Command();
  program
    .name('email-tools')
    .description('CLI for interacting with gmail api ');
  program
    .option(`-l, --${OPTIONS.LABELS}`, 'list labels')
    .option(`-e, --${OPTIONS.EMAILS}`, 'list emails')
    .option(`-q, --${OPTIONS.QUERY} <type>`, 'pass query string for emails')
    .option(`-m, --${OPTIONS.MESSAGE} <type>`, 'get message with id');
  return program;
}
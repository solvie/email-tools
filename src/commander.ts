import { Command, Option } from "commander";

export const COMMANDS = {
  LIST: 'list',
  READ: 'read',
}

export const PARAMS = {
  QUERY: 'query'
}

export const generateProgram = () => {
  const program = new Command();
  program
    .name('email-tools')
    .description('CLI for interacting with gmail api ');
  program
    .addOption(new Option(`--${COMMANDS.LIST} <type>`, 'list').choices(['email', 'label']))
    .option(`--${PARAMS.QUERY} <string>`, 'pass query string for emails list')
    .option(`--${COMMANDS.READ} <id>`, 'read message snippet with id');
  return program;
}
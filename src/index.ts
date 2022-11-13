import { TOOL_COMMANDS } from "./commands/commands";
import { buildEmailTool } from "./email/tool-builder";
import { Program } from "./program";

async function main() {
  const program = new Program({
    name: "email-tools",
    description: "CLI for interacting with gmail api",
  });
  program.build(TOOL_COMMANDS);
  await program.execute(await buildEmailTool());
}

main().then(() => {});

import { TOOL_COMMANDS } from "./commands/commands";
import { Program } from "./program";

async function main() {
  const program = new Program();
  program.build(TOOL_COMMANDS);
  await program.execute();
}

main().then(() => {
  console.log("done");
});

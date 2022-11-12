import { COMMANDS } from "./commands/commands";
import { Program } from "./program";

async function main() {
  const program = new Program();
  program.build(COMMANDS);
  await program.execute();
}

main().then(() => {
  console.log("done");
});

import { generateProgram, executeProgram } from "./commander";
import { COMMANDS } from "./commands";

async function main() {
  const program = generateProgram(COMMANDS);
  await executeProgram(program, COMMANDS);
}

main().then(() => {
  console.log("done");
});

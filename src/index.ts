import { generateProgram, executeProgram } from "./commander";

async function main() {
  const program = generateProgram();
  await executeProgram(program);
}

main().then(() => {
  console.log("done");
});

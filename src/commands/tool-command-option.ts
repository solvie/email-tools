import { ToolCommandOption } from "../types/tool-command";
import { Option } from "commander";
import { EmailTool } from "../email-tool";

export const buildToolCommandOption = (
  command: ToolCommandOption
): Option[] => {
  let opts: Option[] = [];
  const options = command.options;
  const commandString = `--${command.name} <option>`;
  const choices = options.map((o) => o.name);
  const mainOption = new Option(commandString, command.description).choices(
    choices
  );
  opts.push(mainOption);
  const optionsWithParams = options.filter((o) => o.params);
  optionsWithParams.forEach((op) => {
    const params = op.params!;
    const paramsAsOpts = params.map(
      (p) => new Option(`--${p.name} <${p.type}>`, p.description)
    );
    opts.push(...paramsAsOpts);
  });
  return opts;
};

export const executeToolCommandOption = async (
  emailTool: EmailTool,
  command: ToolCommandOption,
  cmdsAndOpts: Record<string, string>
) => {
  const name = command.name;
  // one of the options must be checked.
  const found = command.options!.find((o) => o.name === cmdsAndOpts[name]);
  if (!found) {
    console.log("not found");
  } else if (!found.params) {
    await found.execute(emailTool);
  } else if (found.params) {
    const params = found.params;
    const paramObj: any = {};
    params.forEach((p) => {
      if (cmdsAndOpts[p.name]) {
        paramObj[p.inputName] = cmdsAndOpts[p.name];
      }
    });
    found.execute(emailTool, paramObj);
  }
};

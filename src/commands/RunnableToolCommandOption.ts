import { Runnable, ToolCommandOption, ToolOption } from "../types/tool-command";
import { EmailTool } from "../email/email-tool";

export class RunnableToolCommandOption implements Runnable {
  private command: ToolCommandOption;
  private emailTool: EmailTool;

  constructor(toolCommand: ToolCommandOption, emailTool: EmailTool) {
    this.command = toolCommand;
    this.emailTool = emailTool;
  }

  private constructInputParam(
    toolOption: ToolOption,
    cmdsAndOpts: Record<string, string>
  ) {
    if (!toolOption.params) return;
    return toolOption.params.reduce(
      (previous, p) =>
        !!cmdsAndOpts[p.name]
          ? { ...previous, [p.inputName]: cmdsAndOpts[p.name] }
          : previous,
      {}
    );
  }

  public async run(cmdsAndOpts: Record<string, string>) {
    const found = this.command.options!.find(
      (o) => o.name === cmdsAndOpts[this.command.name]
    );
    if (!found) {
      console.log("Unreachable");
    } else {
      const inputParam = this.constructInputParam(found, cmdsAndOpts);
      await found.execute(this.emailTool, inputParam);
    }
  }
}

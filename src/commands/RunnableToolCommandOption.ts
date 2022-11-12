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
    this.command.options!.forEach(async (o) => {
      if (o.name === cmdsAndOpts[this.command.name]) {
        const inputParam = this.constructInputParam(o, cmdsAndOpts);
        await this.emailTool.run(o.emailCommand, inputParam);
      }
    });
  }
}

import { Runnable, ToolCommandType } from "../types/tool-command";
import { EmailTool } from "../email/email-tool";

export class RunnableToolCommandType implements Runnable {
  private command: ToolCommandType;
  private emailTool: EmailTool;

  constructor(toolCommand: ToolCommandType, emailTool: EmailTool) {
    this.command = toolCommand;
    this.emailTool = emailTool;
  }

  public async run(cmdsAndOpts: Record<string, string>) {
    const name = this.command.name;
    const required = cmdsAndOpts[name];
    return await this.emailTool.run(this.command.emailCommand, required);
  }
}

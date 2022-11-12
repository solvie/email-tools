import {
  Runnable,
  ToolCommandOption,
} from "../types/tool-command";
import { EmailTool } from "../email/email-tool";

export class RunnableToolCommandOption implements Runnable {
  private command: ToolCommandOption;
  private emailTool: EmailTool;

  constructor(toolCommand: ToolCommandOption, emailTool: EmailTool) {
    this.command = toolCommand;
    this.emailTool = emailTool;
  }

  public async run(cmdsAndOpts: Record<string, string>) {
    const name = this.command.name;
    // one of the options must be checked.
    const found = this.command.options!.find(
      (o) => o.name === cmdsAndOpts[name]
    );
    if (!found) {
      console.log("not found");
    } else if (!found.params) {
      await found.execute(this.emailTool);
    } else if (found.params) {
      const params = found.params;
      const paramObj: any = {};
      params.forEach((p) => {
        if (cmdsAndOpts[p.name]) {
          paramObj[p.inputName] = cmdsAndOpts[p.name];
        }
      });
      found.execute(this.emailTool, paramObj);
    }
  }
}

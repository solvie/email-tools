import {
  Executable,
  ToolCommand,
  ToolCommandEnum,
} from "../types/tool-command";
import { ExecutableToolCommandOption } from "./ExecutableToolCommandOption";
import { ExecutableToolCommandType } from "./ExecutableToolCommandType";

export class ExecutableToolCommandFactory {
  public static make(command: ToolCommand): Executable {
    switch (command.kind) {
      case ToolCommandEnum.option:
        return new ExecutableToolCommandOption(command);
      case ToolCommandEnum.type:
        return new ExecutableToolCommandType(command);
    }
  }
}

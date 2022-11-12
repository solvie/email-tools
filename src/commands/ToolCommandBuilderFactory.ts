import { Buildable, ToolCommand, ToolCommandEnum } from "../types/tool-command";
import { BuildableToolCommandOption } from "./BuildableToolCommandOption";
import { BuildableToolCommandType } from "./BuildableToolCommandType";

export class ToolCommandBuilderFactory {
  public static createBuildable(command: ToolCommand): Buildable {
    switch (command.kind) {
      case ToolCommandEnum.option:
        return new BuildableToolCommandOption(command);
      case ToolCommandEnum.type:
        return new BuildableToolCommandType(command);
    }
  }
}

import {
  ConvertableToCommanderEnum,
  ToolCommandEnum,
  ToolCommandFactoryType,
  ToolCommandOption,
  ToolCommandOptionInput,
  ToolCommandType,
  ToolCommandTypeInput,
  ToolParam,
  ToolParamInput,
} from "../types/tool-command";
const { toolCommandOption, toolParam, toolCommandType } =
  ToolCommandFactoryType;

export class ToolCommandOptionFactory {
  public static make(
    tcft: ToolCommandFactoryType,
    input: any
  ): ToolCommandOption | ToolParam | ToolCommandType {
    switch (tcft) {
      case toolCommandOption:
        return this.makeTCO(input as ToolCommandOptionInput);
      case toolParam:
        return this.makeTP(input as ToolParamInput);
      case toolCommandType:
        return this.makeTCT(input as ToolCommandTypeInput);
    }
  }

  private static makeTCO(tcoi: ToolCommandOptionInput): ToolCommandOption {
    return {
      ...tcoi,
      kind: ToolCommandEnum.option,
      convertable: ConvertableToCommanderEnum.optionWithChoices,
    };
  }

  private static makeTP(tpi: ToolParamInput): ToolParam {
    return {
      ...tpi,
      convertable: ConvertableToCommanderEnum.baseOption,
    };
  }

  private static makeTCT(tcti: ToolCommandTypeInput): ToolCommandType {
    return {
      ...tcti,
      kind: ToolCommandEnum.type,
      convertable: ConvertableToCommanderEnum.baseOption,
    };
  }
}

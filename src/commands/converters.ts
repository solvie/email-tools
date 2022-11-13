import {
  ConvertableToCommanderEnum,
  ToolCommandEnum,
  ToolCommandOption,
  ToolCommandOptionInput,
  ToolCommandType,
  ToolCommandTypeInput,
  ToolParam,
  ToolParamInput,
} from "../types/tool-command";

export function toolCommandOptionMaker(
  tcoi: ToolCommandOptionInput
): ToolCommandOption {
  return {
    ...tcoi,
    kind: ToolCommandEnum.option,
    convertable: ConvertableToCommanderEnum.optionWithChoices,
  };
}

export function toolParamMaker(tpi: ToolParamInput): ToolParam {
  return {
    ...tpi,
    convertable: ConvertableToCommanderEnum.baseOption,
  };
}

export function toolCommandTypeMaker(
  tcti: ToolCommandTypeInput
): ToolCommandType {
  return {
    ...tcti,
    kind: ToolCommandEnum.type,
    convertable: ConvertableToCommanderEnum.baseOption,
  };
}

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
  const parseParam = (cmdsAndOpts: Record<string, string>) => {
    if (tpi.type === "string") return cmdsAndOpts[tpi.name];
    if (tpi.type === "string[]") return JSON.parse(cmdsAndOpts[tpi.name]);
    if (tpi.type === "number") return Number.parseInt(cmdsAndOpts[tpi.name]);
  };
  return {
    ...tpi,
    convertable: ConvertableToCommanderEnum.baseOption,
    parse: parseParam,
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

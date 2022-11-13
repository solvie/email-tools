import { Option } from "commander";
import {
  BaseOptionable,
  ConvertableToCommanderEnum,
  ConvertableToCommanderOption,
  ToolCommandOption,
} from "../types/tool-command";

export class OptionFactory {
  static option(ctco: ConvertableToCommanderOption): Option {
    switch (ctco.convertable) {
      case ConvertableToCommanderEnum.optionWithChoices:
        return this.commandOptionWithChoices(ctco as ToolCommandOption);
      case ConvertableToCommanderEnum.baseOption:
        return this.baseOption(ctco as BaseOptionable);
    }
  }

  private static commandOptionWithChoices(tco: ToolCommandOption): Option {
    const commandString = `--${tco.name} <option>`;
    const choices = tco.options.map((o) => o.name);
    return new Option(commandString, tco.description).choices(choices);
  }

  private static baseOption(tp: BaseOptionable): Option {
    return new Option(`--${tp.name} <${tp.type}>`, tp.description);
  }
}

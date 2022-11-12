import { Option } from "commander";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export enum ToolCommandEnum {
  option = "Option",
  type = "Type",
}

export interface Tool {
  run: (command: COMMANDS, params: any) => Promise<void>;
}

export interface Buildable {
  build: () => Option[];
}

export interface Runnable {
  run: (cmdsAndOpts: Record<string, string>, tool: Tool) => Promise<void>;
}

export interface Executable extends Buildable, Runnable {
  name: string;
}

export enum ConvertableToCommanderEnum {
  optionWithChoices = "ToolCommandOption",
  baseOption = "BaseOption",
}

export interface ConvertableToCommanderOption {
  convertable: ConvertableToCommanderEnum;
}

export interface Named {
  name: string;
  description: string;
}

export enum COMMANDS {
  listLabels = "LIST_LABELS",
  listEmails = "LIST_EMAILS",
  readEmail = "READ_EMAIL",
}

export interface ToolCommandExecutable extends Named {
  runCommand: COMMANDS
}

export interface ToolCommandOption
  extends Named,
    ConvertableToCommanderOption {
  kind: ToolCommandEnum.option;
  convertable: ConvertableToCommanderEnum.optionWithChoices;
  options: ToolOption[];
}

export interface ToolCommandType
  extends ToolCommandExecutable,
    ConvertableToCommanderOption {
  kind: ToolCommandEnum.type;
  convertable: ConvertableToCommanderEnum.baseOption;
  type: string;
}

export interface ToolOption extends ToolCommandExecutable {
  params?: ToolParam[];
}

export interface ToolParam extends Named, ConvertableToCommanderOption {
  inputName: string;
  convertable: ConvertableToCommanderEnum.baseOption;
  type: string;
}

export type BaseOptionable = ToolParam | ToolCommandType;

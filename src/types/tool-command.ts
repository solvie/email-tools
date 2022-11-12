import { Option } from "commander";
import { EmailTool } from "../email/email-tool";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export enum ToolCommandEnum {
  option = "Option",
  type = "Type",
}

export interface Buildable {
  build: () => Option[];
}

export interface Runnable {
  run: (cmdsAndOpts: Record<string, string>) => Promise<void>;
}

export interface Named {
  name: string;
  description: string;
}

export interface ToolCommandBase extends Named {}

export interface ToolCommandOption extends ToolCommandBase {
  kind: ToolCommandEnum.option;
  options: ToolOption[];
}

export interface ToolCommandType extends ToolCommandBase {
  kind: ToolCommandEnum.type;
  type: string;
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

export interface ToolOption extends Named {
  params?: ToolParam[];
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

export interface ToolParam extends Named {
  inputName: string;
  type: string;
}

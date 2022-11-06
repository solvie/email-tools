import { EmailTool } from "../email-tool";

export interface ToolCommand {
  name: string;
  description: string;
  type?: string;
  execute?: (emailTools: EmailTool, params?: any) => Promise<void>;
  options?: ToolOption[];
}

interface ToolOption {
  name: string;
  params?: ToolParam[];
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

interface ToolParam {
  name: string;
  inputName: string;
  type: string;
  description: string;
}

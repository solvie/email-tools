import { COMMANDS, ToolParam, ToolParamInput } from "../../../types/tool-command";
import { toolParamMaker } from "../../converters";
import { ToolCommandMaker } from "../../ToolCommandMaker";
import { ModifyParams } from "./param/params";

export const ModifyEmailOption = {
  name: "email",
  description: "",
  params: ModifyParams.map((input) => ToolCommandMaker.make<ToolParamInput, ToolParam>(toolParamMaker, input)),
  runCommand: COMMANDS.modifyEmails,
};

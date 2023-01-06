import { LIST_PARAMS } from "./param/params";
import { ToolCommandMaker } from "../../ToolCommandMaker";
import { toolParamMaker } from "../../converters";
import { COMMANDS, ToolParam, ToolParamInput } from "../../../types/tool-command";

export const ListEmailOption = {
  name: "email",
  description: "",
  params: LIST_PARAMS.map((input) => ToolCommandMaker.make<ToolParamInput, ToolParam>(toolParamMaker, input)),
  runCommand: COMMANDS.listEmails,
};
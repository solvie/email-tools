export const ModifyParams = [
  {
    name: "addLabels",
    inputName: "addLabelIds",
    type: "string[]",
    description: "label ids to add to emails",
    required: false,
  },
  {
    name: "removeLabels",
    inputName: "removeLabelIds",
    type: "string[]",
    description: "label ids to remove from emails",
    required: false,
  },
  {
    name: "messages",
    inputName: "ids",
    type: "string[]",
    description: "email ids to modify",
    required: true,
  }
];
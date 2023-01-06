export const LIST_PARAMS = [
  {
    name: "query",
    inputName: "q",
    type: "string",
    description: "query string to search emails by",
    required: false,
  },
  {
    name: "labelIds",
    inputName: "labelIds",
    type: "string[]",
    description: "label ids to find emails by",
    required: false,
  },
  {
    name: "maxResults",
    inputName: "maxResults",
    type: "number",
    description: "max number of results",
    required: false,
  }
]
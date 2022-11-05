export interface Label {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  threadId: string;
  snippet?: string;
}

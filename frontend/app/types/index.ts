// In app/types/index.ts
export interface BaseMessage {
  content: string;
  role: 'user' | 'bot';
  conversation_id: number;
  created_at: string;
}

export interface Message extends BaseMessage {
  id: number;
}

export interface TempMessage extends BaseMessage {
  id: string; // Use string for temporary IDs
  isOptimistic?: boolean;
}

// Union type for all message types
export type AnyMessage = Message | TempMessage;

export interface ApiMessage {
  id: string;
  type: string;
  attributes: Message;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export function isTempMessage(message: AnyMessage): message is TempMessage {
  return typeof message.id === 'string';
}
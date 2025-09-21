export interface Message {
  id: number;
  content: string;
  role: 'user' | 'bot';
  conversation_id: number;
  created_at: string;
}

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
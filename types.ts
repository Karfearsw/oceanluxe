export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  specs: string;
  description: string;
  imagePrompt: string;
  type: 'Residential' | 'Commercial' | 'Investment';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
}
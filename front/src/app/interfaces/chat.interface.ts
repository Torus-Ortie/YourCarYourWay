export interface ChatMessage {
    chatId?: string;
    reservationId: string;
    content: string;
    createdAt?: Date;
  }
export interface ChatMessage {
    chatId?: string;
    userId: string;
    reservationId: string;
    content: string;
    createdat?: Date;
  }
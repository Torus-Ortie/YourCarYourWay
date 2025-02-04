export interface ChatMessage {
    messageid?: string;
    userid: string;
    reservationid: string;
    content: string;
    createdat?: Date;
  }
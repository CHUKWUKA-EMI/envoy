export interface IChat {
  chatId: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  message: string;
  viewed: boolean;
  imageUrl: string | null;
  imagekit_id: string | null;
  createdAt: string;
}

export interface IChatRequest {
  chatId: string;
  receiverId: string;
  conversationId: string;
  message: string;
  imageUrl: string | null;
  imagekit_id: string | null;
  viewed: boolean;
}

export interface IChatUser {
  userId: string;
  socketId: string;
  isOnline: boolean;
}

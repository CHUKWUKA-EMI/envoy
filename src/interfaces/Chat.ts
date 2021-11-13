export interface IChat {
  chatId: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  message: string;
  viewed: boolean;
  imageUrl: string | null;
  createdAt: string;
}

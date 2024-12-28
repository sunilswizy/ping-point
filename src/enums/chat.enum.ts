
export interface IChatList {
    _id: string;
    chatType: string;
    chatName: string;
    chatImage: string;
    lastMessage: {
        content: string;
        messageType: string;
        senderId: string;
        senderName: string;
        timestamp: string;
    };
    unreadCount: number;
    updatedAt: string;
    isOnline: boolean;
}

export interface IMessage {
    _id: string;
    content: string;
    messageType: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    chatImage: string;
    mediaUrl?: string;
}


export interface IChatData {
    _id: string;
    chatType: string;
    chatName: string;
    chatImage: string;
    members: string[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string;
    lastSeen: string;
    isOnline: boolean;
}

export enum ChatTypes {
    private = 'private',
    group = 'group'
}
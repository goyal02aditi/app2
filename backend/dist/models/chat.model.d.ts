import { Document, Types } from "mongoose";
export interface IMessage {
    _id?: Types.ObjectId;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
export interface IChat extends Document {
    userId: Types.ObjectId;
    messages: IMessage[];
    title?: string;
    totalMessages: number;
    isActive: boolean;
    archivedAt?: Date;
    archiveReason?: string;
    flagged?: boolean;
    flagReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Chat: import("mongoose").Model<IChat, {}, {}, {}, Document<unknown, {}, IChat, {}, {}> & IChat & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Chat;
//# sourceMappingURL=chat.model.d.ts.map
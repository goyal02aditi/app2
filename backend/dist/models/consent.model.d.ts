import { Document, Types } from "mongoose";
export interface IConsent extends Document {
    userId: Types.ObjectId;
    conversationLogs: boolean;
    appUsage: boolean;
    audio: boolean;
    consentGivenAt: Date;
}
export declare const Consent: import("mongoose").Model<IConsent, {}, {}, {}, Document<unknown, {}, IConsent, {}, {}> & IConsent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=consent.model.d.ts.map
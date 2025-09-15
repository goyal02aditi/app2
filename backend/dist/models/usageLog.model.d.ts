import { Schema, Document } from "mongoose";
export interface IUsageLog extends Document {
    userId: Schema.Types.ObjectId;
    package: string;
    timeUsed: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
}
export declare const UsageLog: import("mongoose").Model<IUsageLog, {}, {}, {}, Document<unknown, {}, IUsageLog, {}, {}> & IUsageLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=usageLog.model.d.ts.map
import { Document } from "mongoose";
export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    generateAccessToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
}
declare const Admin: import("mongoose").Model<IAdmin, {}, {}, {}, Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Admin;
//# sourceMappingURL=admin.model.d.ts.map
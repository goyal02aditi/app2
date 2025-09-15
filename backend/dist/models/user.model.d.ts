import { Document } from "mongoose";
export interface IUser extends Document {
    name?: string;
    enrollment: string;
    batch: string;
    course: string;
    country?: string;
    email: string;
    password: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
    generateAccessToken(): string;
    generateRefreshToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map
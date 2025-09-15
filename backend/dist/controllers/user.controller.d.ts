import { Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const Signin: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const logoutUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=user.controller.d.ts.map
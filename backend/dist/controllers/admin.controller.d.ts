import { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}
export declare const adminLogin: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const adminSignup: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const adminLogout: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getAdminProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getDashboardStats: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getAllStudents: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getAllChats: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const exportData: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getFlaggedContent: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const toggleChatFlag: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map
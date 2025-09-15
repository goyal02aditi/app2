import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}
declare const adminAuthMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default adminAuthMiddleware;
//# sourceMappingURL=adminAuthMiddleware.d.ts.map
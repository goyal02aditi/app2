import { Request, Response, NextFunction } from "express";
declare const jwtVerification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default jwtVerification;
//# sourceMappingURL=authMiddleware.d.ts.map
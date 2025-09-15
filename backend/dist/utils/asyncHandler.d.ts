import { Request, Response, NextFunction } from 'express';
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const asyncHandler: (func: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validateRequest: (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateAdminSignup: (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateAdminLogin: (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateUserSignup: (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateUserLogin: (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validationMiddleware.d.ts.map
import { z } from 'zod';
export declare const adminSignupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const userSignupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    enrollment: z.ZodString;
    batch: z.ZodString;
    course: z.ZodString;
    country: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    enrollment: string;
    batch: string;
    course: string;
    name?: string | undefined;
    country?: string | undefined;
}, {
    email: string;
    password: string;
    enrollment: string;
    batch: string;
    course: string;
    name?: string | undefined;
    country?: string | undefined;
}>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AdminSignupInput = z.infer<typeof adminSignupSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type UserSignupInput = z.infer<typeof userSignupSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
//# sourceMappingURL=authSchema.d.ts.map
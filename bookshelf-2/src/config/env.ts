import * as z from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object(
    {
        MONGO_CONNECTION: z.string().min(1, 'MONGO_CONNECTION is required'),
        NODE_ENV        : z.enum(['development', 'production', 'test']).optional(),
        PORT            : z.coerce.number().default(3000),
    },
);

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('❌ Invalid environment variables:', z.prettifyError(result.error));
    throw new Error('Environment validation failed');
}

export const env = result.data;

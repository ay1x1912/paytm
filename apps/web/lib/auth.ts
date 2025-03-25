import {
    betterAuth
} from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma }from '@repo/db/prisma'
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 20,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    },

    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});

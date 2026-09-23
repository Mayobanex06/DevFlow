import "dotenv/config"
import { createAuthServer } from "@neondatabase/auth/server";
import { createNeonRequestContext } from "./neon-request-context.js";
import { baseUrl, cookieSecret } from "./auth-config.js";

export const neonServer = createAuthServer({
    baseUrl: baseUrl,
    context: createNeonRequestContext,
    cookieSecret: cookieSecret
})


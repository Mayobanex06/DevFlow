import "dotenv/config"

const envBaseUrl = process.env.NEON_AUTH_URL 

if (envBaseUrl === undefined){
    throw new Error("BaseURL don't exists")
}

const envCookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

if (envCookieSecret === undefined){
    throw new Error("CookieSecret don't exists")
}

export const baseUrl = envBaseUrl
export const cookieSecret = envCookieSecret
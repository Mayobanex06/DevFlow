import type { RequestContext } from "@neondatabase/auth/server";
import { storage } from "./auth-context.js";

export function createNeonRequestContext(): RequestContext {

    const context = storage.getStore()

    if (!context){
        throw new Error("...")
    }

    return {
        getCookies(){
            const cookie = context.request.headers.cookie
            return cookie ?? ""
        },

        getHeader(name) {
            let header = context.request.headers[name.toLowerCase()]

            if(Array.isArray(header)){
                header = header.join(", ")
            }

            if(header === undefined){
                return null
            }

            return header
        },
        
        getOrigin() {
            const origin = context.request.headers.origin

            if(origin !== undefined) return origin

            const referer = context.request.headers.referer

            if(referer === undefined){
                return ""
            }

            const url = new URL(referer)
            return url.origin
        },
        
        getFramework() {
            return 'fastify'
        },

        setCookie(name, value, options) {

            context.reply.setCookie(name, value, options)
            
        },
    }
}
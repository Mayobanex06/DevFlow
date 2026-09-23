import type { FastifyInstance } from "fastify";
import { handleAuthProxyRequest } from "@neondatabase/auth/server";
import { baseUrl, cookieSecret } from "./auth-config.js";

const allowedPaths =  [
        "sign-in/email",
        "sign-out",
        "get-session"
    ]

export async function authRoutes(
    fastify: FastifyInstance
): Promise<void> {

    fastify.route<{
        Params: {
            "*": string
        }}>({
    method: ["GET", "POST"],
    url: "/*",

    async handler(request, reply) {

            const path = request.params["*"]
            
            if (!allowedPaths.includes(path)){
                reply.code(404).send({
                    data: {
                        success: false,
                        message: "Auth endpoint not found"
                    },
                    meta: {
                        requestId: request.id
                    }
                })
                return
            }
    
            const url = `${request.protocol}://${request.hostname}${request.url}`

            const headers = new Headers();

            for (let [name, value] of Object.entries(request.headers)){

                if(value === undefined){
                    continue
                }

                if(Array.isArray(value)){
                    value = value.join(", ")
                }

                headers.set(name, value)
            }

            let body: string | undefined

            if (
                request.method.toUpperCase() !== "GET" && 
                request.method.toUpperCase() !==  "HEAD" && 
                request.body !== undefined){

                body = JSON.stringify(request.body)
            }

            const webRequest = new Request(url, {
                method: request.method,
                headers,
                body
            })

            const response = await handleAuthProxyRequest({
                request: webRequest,
                path,
                baseUrl,
                cookieSecret
            })

            reply.code(response.status)

            for (let [name, value] of response.headers){
                if (name === "set-cookie") {
                    continue
                }

                reply.header(name, value)
            }

            const cookies = response.headers.getSetCookie()
            
            if(cookies.length > 0) {
                reply.header('set-cookie', cookies)
            }
            
            const responseBody = await response.text()

            return reply.send(responseBody)
        }
    })
}
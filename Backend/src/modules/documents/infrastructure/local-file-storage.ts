import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { FileStorage } from "../domain/file_storage.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";

export class LocalFileStorage implements FileStorage{

    constructor(
        private readonly baseDirectory: string
    ) {}

    private resolveStoragePath(key: string): string {

        if (key.length === 0 || key.includes("\\") || key.includes("\0")){
            throw new Error("///")
        }

        const segments = key.split("/")

        const invalidSegments = segments.some(
            segment => segment === "" || 
            segment === "." || 
            segment === ".."
        )


        if (invalidSegments){
            throw new Error("///")
        }

        const basePath = resolve(this.baseDirectory)
        const absolutePath = resolve(basePath, ...segments)

        const relativePath = relative(basePath, absolutePath)
        const prefix = `..${sep}`

        if (
            relativePath.startsWith(prefix) || 
            relativePath === "" || 
            relativePath === ".." ||
            isAbsolute(relativePath)
        ){
            throw new Error("///")
        }
        
        return absolutePath
    }

    
    async save(path: string, content: Buffer): Promise<void> {
        
        const resolvedPath = this.resolveStoragePath(path)

        await mkdir(dirname(resolvedPath), {
            recursive: true
        })

        writeFile(
            resolvedPath,
            content,
            { flag: "wx"}
        )
    }

    async read(path: string): Promise<Buffer> {
        
        const resolvedPath = this.resolveStoragePath(path)

        const content = readFile(
            resolvedPath
        )

        return content
    }

}
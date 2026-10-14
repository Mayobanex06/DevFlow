import { LocalFileStorage } from "./modules/documents/infrastructure/local-file-storage.js"
import { Buffer } from "node:buffer"

const path = "documents/test.txt"

const content = Buffer.from("Mi primer archivo en DevFlow")

const storage = new LocalFileStorage("./storage")

// storage.save(path, content)
const archiveContent = await storage.read(path)

console.log(archiveContent.toString("utf8"))
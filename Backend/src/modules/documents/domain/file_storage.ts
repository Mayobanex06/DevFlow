export interface FileStorage {
    save (
        path: string,
        content: Buffer
    ): Promise<void> 

    read(path: string): Promise<Buffer>
    delete(path: string): Promise<void> 
}
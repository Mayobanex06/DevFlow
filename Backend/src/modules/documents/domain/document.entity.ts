interface DocumentProps {
    id?: number,
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    createdAt?: Date,
    projectId: number,
    taskId: number | null
}

interface CreateDocumentProps {
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    projectId: number,
    taskId: number | null
}

interface RestoreDocumentProps {
    id: number,
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    createdAt: Date,
    projectId: number,
    taskId: number | null
}

export class Document {
    private constructor(private props: DocumentProps){}

    static create(props: CreateDocumentProps): Document {
        return new Document({
            name: props.name,
            original_name: props.original_name,
            storage_path: props.storage_path,
            mime_type: props.mime_type,
            size: props.size,
            projectId: props.projectId,
            taskId: props.taskId
        })
    }

    static restore(props: RestoreDocumentProps): Document {
        return new Document({
            id: props.id,
            name: props.name,
            original_name: props.original_name,
            storage_path: props.storage_path,
            mime_type: props.mime_type,
            size: props.size,
            createdAt: props.createdAt,
            projectId: props.projectId,
            taskId: props.taskId
        })
    }

    get id(){
        if(this.props.id === undefined){
            throw new Error("Document has not been persisted    ")
        }

        return this.props.id
    }

    get name(){
        return this.props.name
    }

    get original_name(){
        return this.props.original_name
    }

    get storage_path(){
        return this.props.original_name
    }

    get mime_type(){
        return this.props.mime_type
    }

    get size(){
        return this.props.size
    }

    get projectId(){
        return this.props.projectId
    }

    get taskId(){
        return this.props.taskId
    }
}
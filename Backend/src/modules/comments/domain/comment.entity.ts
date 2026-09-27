interface CommentProps {
    id?: number,
    content: string,
    createdAt?: Date,
    updatedAt?: Date,
    taskId: number,
    userId: number
}

interface CreateCommentProps {
    content: string,
    taskId: number,
    userId: number
}

interface RestoreCommentProps {
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    taskId: number,
    userId: number
}

export class Comment {
    private constructor(private props: CommentProps) {}

    static create(props: CreateCommentProps){
        return new Comment({
            ...props
        })
    }

    static restore(props: RestoreCommentProps){
        return new Comment({
            ...props
        })
    }

    get id(){
        if(this.props.id === undefined){
            throw new Error("Comment has not been persisted")
        }
        return this.props.id
    }

    get content(){
        return this.props.content
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    get taskId(){
        return this.props.taskId
    }

    get userId(){
        return this.props.userId
    }
}
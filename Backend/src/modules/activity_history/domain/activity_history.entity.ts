interface ActivityProps {
    id?: number,
    action: string,
    description: string | null,
    createdAt?: Date,
    userId?: number,
    projectId?: number,
    taskId?: number | null
    
}

interface CreateActivityProps {
    action: string,
    description: string | null,
    userId: number,
    taskId: number | null,
    projectId: number 

}

interface RestoreActivityProps {
    id: number,
    action: string,
    description: string | null,
    createdAt: Date,
    userId: number,
    projectId: number,
    taskId: number | null
    
}

export class Activity {
   private constructor(private props: ActivityProps) {}

   static restore(props: RestoreActivityProps): Activity {
    return new Activity({
        id: props.id,
        action: props.action,
        description: props.description,
        createdAt: props.createdAt,
        userId: props.userId,
        projectId: props.projectId,
        taskId: props.taskId

    })
   }
   static create (props: CreateActivityProps): Activity {
    return new Activity ({
        action: props.action,
        description: props.description,
        userId: props.userId,
        taskId: props.taskId,
        projectId: props.projectId

    })
   }

   get id(){
    if(this.props.id === undefined){
        throw new Error ("Activity not has been persisted")
     }
     return this.props.id
   }
    get action() {
        return this.props.action
    }

    get description () {
        return this.props.description
    }
    
}

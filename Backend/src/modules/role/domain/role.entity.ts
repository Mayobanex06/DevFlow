export type CodeRole = 'ADMIN' | 'DEVELOPER' | 'QA' | 'PROJECT_MANAGER' | 'CLIENT' | 'MANAGER' | 'DESIGNER'

interface RoleProps {
    id?: number,
    name: string,
    code: CodeRole
}

interface CreateRoleProps {
    name: string,
    code: CodeRole
}

interface RestoreRoleProps {
    id: number,
    name: string,
    code: CodeRole
}

export class Role {
    private constructor(private props: RoleProps) {}

    static create(props: CreateRoleProps){
        return new Role({
            name: props.name,
            code: props.code
        })
    }

    static restore(props: RestoreRoleProps){
        return new Role({
            id: props.id,
            name: props.name,
            code: props.code
        })
    }

    get id(){

        if (this.props.id === undefined){
            throw new Error("Role not has been persisted")
        }

        return this.props.id
    }

    get name(){
        return this.props.name
    }

    get code(){
        return this.props.code
    }
}
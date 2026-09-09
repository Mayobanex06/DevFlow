import { AuthUser } from "../domain/auth-user.entity.js";
import { AuthUserRepository } from "../domain/auth-user.repository.js";


interface GetAuthInput {
    id: string
}

export class GetAuthUseCase {
    constructor(
        private authUserRepository: AuthUserRepository
    ) {}

    async execute(input: GetAuthInput): Promise<AuthUser | null> {

        return this.authUserRepository.findByid(input.id)
    }
}
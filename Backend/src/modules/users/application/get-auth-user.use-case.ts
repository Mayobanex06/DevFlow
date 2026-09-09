import { User } from "../domain/user.entity.js";
import { UserRepository } from "../domain/user.repository.js";

interface GetUserByAuthUserIdInput {
    authUserId: string
}

export class GetUserByAuthUserIdUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(input: GetUserByAuthUserIdInput): Promise<User | null> {

        return this.userRepository.findByAuthUserId(input.authUserId)
    }
}


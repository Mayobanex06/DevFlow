import { User } from "../domain/user.entity.js";
import { UserRepository } from "../domain/user.repository.js";

export class ListUsersUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(): Promise<User[]> {

        return this.userRepository.findAll()
    }
}
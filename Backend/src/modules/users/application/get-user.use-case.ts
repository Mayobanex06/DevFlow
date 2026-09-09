import { GetterSetter } from "fastify/types/instance.js";
import { UserRepository } from "../domain/user.repository.js";
import { User } from "../domain/user.entity.js";

interface GetUserInput {
    id: number
}

export class GetUserUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(input: GetUserInput): Promise<User | null> {

        return this.userRepository.findById(input.id)
    }
}
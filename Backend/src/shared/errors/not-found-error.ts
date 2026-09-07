export class NotFoundError extends Error{
    constructor(
        public code: string,
        message: string
    ) {
        super(message)
    }
}
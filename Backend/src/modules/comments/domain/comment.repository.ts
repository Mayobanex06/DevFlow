import { Comment } from "./comment.entity.js";

export interface CommentRepository {
    findById(id: number): Promise<Comment | null>
    create(comment: Comment): Promise<Comment> 
    update(comment: Comment): Promise<Comment> 
}
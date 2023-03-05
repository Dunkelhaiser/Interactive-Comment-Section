export default interface CommentType {
    id: string;
    content: string;
    createdAt: Date;
    score: number;
    user: {
        image: {
            png?: string;
            webp: string;
        };
        username: string;
    };
    replies: CommentType[];
}

export default interface CommentType {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png?: string;
            webp: string;
        };
        username: string;
    };
    replies?: {
        id: string;
        content: string;
        createdAt: string;
        score: number;
        replyingTo: string;
        user: {
            image: {
                png: string;
                webp: string;
            };
            username: string;
        };
    }[];
}

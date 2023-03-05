import { useState } from "react";
import Comment from "./components/Comment/Comment";
import CommentInput from "./components/CommentInput/CommentInput";
import CommentSection from "./components/CommentSection/CommentSection";
import comments from "./data.json";
import "./scss/styles.scss";
import CommentType from "./Types/Comment";

function App() {
    const [commentsList, setCommentsList] = useState<CommentType[]>(comments.comments);

    const handleCommentSubmit = (comment: CommentType) => {
        setCommentsList((prevComments) => [comment, ...prevComments]);
    };

    const handleCommentDelete = (id: string) => {
        setCommentsList((prevComments) => prevComments.filter((obj) => obj.id !== id));
    };

    const handleCommentEdit = (id: string, editedComment: string) => {
        const updatedComments = commentsList.map((comment) => {
            if (comment.id === id) {
                return {
                    ...comment,
                    content: editedComment,
                };
            }
            return comment;
        });
        setCommentsList(updatedComments);
    };

    return (
        <main className="center">
            <CommentSection>
                {commentsList.map((comment) => (
                    <Comment
                        key={comment.id}
                        avatar={comment.user.image.webp}
                        name={comment.user.username}
                        date={comment.createdAt}
                        count={comment.score}
                        text={comment.content}
                        id={comment.id}
                        removeComment={handleCommentDelete}
                        editComment={handleCommentEdit}
                    />
                ))}

                <CommentInput onCommentSubmit={handleCommentSubmit} />
            </CommentSection>
        </main>
    );
}

export default App;

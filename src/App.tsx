import { useEffect, useState } from "react";
import Comment from "./components/Comment/Comment";
import CommentInput from "./components/CommentInput/CommentInput";
import CommentSection from "./components/CommentSection/CommentSection";
import data from "./data.json";
import "./scss/styles.scss";
import CommentType from "./Types/Comment";

function App() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [commentsList, setCommentsList] = useState<CommentType[]>(JSON.parse(localStorage.getItem("comments")!) || data.comments);

    const handleCommentSubmit = (comment: CommentType) => {
        setCommentsList((prev) => [comment, ...prev]);
    };

    const handleCommentDelete = (id: string) => {
        setCommentsList((prev) => prev.filter((comment) => comment.id !== id));
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

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(commentsList));
    }, [commentsList]);

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
                        replies={comment.replies}
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

import Comment from "./components/Comment/Comment";
import CommentInput from "./components/CommentInput/CommentInput";
import CommentSection from "./components/CommentSection/CommentSection";
import comments from "./data.json";
import "./scss/styles.scss";

function App() {
    const commentsArr = comments.comments;
    return (
        <main className="center">
            <CommentSection>
                {commentsArr.map((comment) => (
                    <Comment
                        key={comment.id}
                        avatar={comment.user.image.webp}
                        name={comment.user.username}
                        date={comment.createdAt}
                        count={comment.score}
                        text={comment.content}
                    />
                ))}

                <CommentInput />
            </CommentSection>
        </main>
    );
}

export default App;

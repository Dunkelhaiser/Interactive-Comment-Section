import CommentInput from "./components/CommentInput/CommentInput";
import CommentSection from "./components/CommentSection/CommentSection";
import "./scss/styles.scss";

function App() {
    return (
        <main className="center">
            <CommentSection>
                <CommentInput />
            </CommentSection>
        </main>
    );
}

export default App;

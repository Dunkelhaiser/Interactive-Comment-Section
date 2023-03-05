import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import CommentCard from "../CommentCard/CommentCard";
import InputStyles from "./CommentInput.module.scss";
import Button from "../Button/Button";
import { UserContext } from "../../store/UserContext";
import CommentType from "../../Types/Comment";

interface Props {
    onCommentSubmit: (comment: CommentType) => void;
    type?: "Reply" | "Send";
}

const CommentInput: React.FC<Props> = ({ onCommentSubmit, type = "Send" }) => {
    const { user } = useContext(UserContext);
    const [text, setText] = useState("");

    const createComment = () => {
        const comment: CommentType = {
            id: uuid(),
            content: text,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            user: { username: user!.name, image: { webp: user!.avatar } },
            createdAt: "Now",
            score: 0,
            replies: [],
        };
        onCommentSubmit(comment);
        setText("");
    };

    return (
        <CommentCard className={InputStyles.layout}>
            <img src={user?.avatar} alt="Avatar" className={InputStyles.avatar} />
            <textarea placeholder="Add a comment..." rows={3} value={text} onChange={(e) => setText(e.target.value)} />
            <Button title={type} onClick={createComment} />
        </CommentCard>
    );
};
export default CommentInput;

import { useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import InputStyles from "./CommentInput.module.scss";
import Avatar from "../../../public/images/avatars/image-juliusomo.webp";
import Button from "../Button/Button";

interface Props {
    onComment?: () => void;
}

const CommentInput: React.FC<Props> = ({ onComment }) => {
    const [text, setText] = useState("");

    return (
        <CommentCard className={InputStyles.layout}>
            <img src={Avatar} alt="Avatar" className={InputStyles.avatar} />
            <textarea placeholder="Add a comment..." rows={3} value={text} onChange={(e) => setText(e.target.value)} />
            <Button title="Send" onClick={onComment} />
        </CommentCard>
    );
};
export default CommentInput;

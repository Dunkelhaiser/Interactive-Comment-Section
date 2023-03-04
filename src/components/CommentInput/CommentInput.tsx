import CommentCard from "../CommentCard/CommentCard";
import InputStyles from "./CommentInput.module.scss";
import Avatar from "../../images/avatars/image-juliusomo.webp";
import Button from "../Button/Button";

const CommentInput: React.FC = () => {
    return (
        <CommentCard className={InputStyles.layout}>
            <img src={Avatar} alt="Avatar" className={InputStyles.logo} />
            <textarea placeholder="Add a comment..." rows={3} />
            <Button title="Send" />
        </CommentCard>
    );
};
export default CommentInput;

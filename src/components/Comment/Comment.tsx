import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faArrowLeft, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import CommentCard from "../CommentCard/CommentCard";
import CommentStyles from "./Comment.module.scss";
import Button from "../Button/Button";
import { UserContext } from "../../store/UserContext";

interface Props {
    id: string;
    avatar: string;
    name: string;
    date: string;
    count: number;
    text: string;
    removeComment: (id: string) => void;
}

const Comment: React.FC<Props> = ({ avatar, name, date, count, text, id, removeComment }) => {
    const { user } = useContext(UserContext);
    const [counter, setCounter] = useState(count);
    const [decision, setDecision] = useState<"upvote" | "downvote" | "">("");

    const deleteComment = () => {
        removeComment(id);
    };

    return (
        <CommentCard className={CommentStyles.comment}>
            <aside>
                <div className={CommentStyles.counter}>
                    <span
                        role="button"
                        tabIndex={0}
                        className={decision === "upvote" ? CommentStyles.operator_selected : CommentStyles.operator}
                        onClick={() => {
                            if (decision === "upvote") {
                                setCounter((prev) => prev - 1);
                                setDecision("");
                            } else if (decision === "downvote") {
                                setCounter((prev) => prev + 2);
                                setDecision("upvote");
                            } else {
                                setCounter((prev) => prev + 1);
                                setDecision("upvote");
                            }
                        }}
                    >
                        +
                    </span>
                    <span>{counter}</span>
                    <span
                        role="button"
                        tabIndex={0}
                        className={decision === "downvote" ? CommentStyles.operator_selected : CommentStyles.operator}
                        onClick={() => {
                            if (decision === "downvote") {
                                setCounter((prev) => prev + 1);
                                setDecision("");
                            } else if (decision === "upvote") {
                                setCounter((prev) => prev - 2);
                                setDecision("downvote");
                            } else {
                                setCounter((prev) => prev - 1);
                                setDecision("downvote");
                            }
                        }}
                    >
                        -
                    </span>
                </div>
                <div className={CommentStyles.buttons_phone}>
                    {user?.name === name ? (
                        <>
                            <Button title="Edit" look="text" icon={<FontAwesomeIcon icon={faPen} />} />
                            <Button
                                title="Delete"
                                look="text"
                                color="warning"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                                onClick={deleteComment}
                            />
                        </>
                    ) : (
                        <Button title="Reply" look="text" icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                    )}
                </div>
            </aside>
            <div className={CommentStyles.content}>
                <div className={CommentStyles.header}>
                    <div className={CommentStyles.info}>
                        <img src={avatar} alt="avatar" className={CommentStyles.avatar} />
                        <span className={CommentStyles.name}>{name}</span>
                        <span className={CommentStyles.date}>{date}</span>
                    </div>
                    <div className={CommentStyles.buttons}>
                        {user?.name === name ? (
                            <>
                                <Button title="Edit" look="text" icon={<FontAwesomeIcon icon={faPen} />} />
                                <Button
                                    title="Delete"
                                    look="text"
                                    color="warning"
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                    onClick={deleteComment}
                                />
                            </>
                        ) : (
                            <Button title="Reply" look="text" icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                        )}
                    </div>
                </div>
                <p>{text}</p>
            </div>
        </CommentCard>
    );
};
export default Comment;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faArrowLeft, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import CommentCard from "../CommentCard/CommentCard";
import CommentStyles from "./Comment.module.scss";
import Button from "../Button/Button";
import { UserContext } from "../../store/UserContext";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

interface Props {
    id: string;
    avatar: string;
    name: string;
    date: string;
    count: number;
    text: string;
    removeComment: (id: string) => void;
    editComment: (id: string, editComment: string) => void;
}

const Comment: React.FC<Props> = ({ avatar, name, date, count, text, id, removeComment, editComment }) => {
    const { user } = useContext(UserContext);
    const [counter, setCounter] = useState(count);
    const [decision, setDecision] = useState<"upvote" | "downvote" | "">("");
    const [isEditting, setIsEditting] = useState(false);
    const [editContent, setEditContent] = useState(text);
    const { isShowing, showModal, hideModal } = useModal();

    const deleteComment = () => {
        removeComment(id);
    };

    const updateComment = () => {
        editComment(id, editContent);
        setIsEditting(false);
    };

    return (
        <>
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
                                <Button
                                    title="Edit"
                                    look="text"
                                    icon={<FontAwesomeIcon icon={faPen} />}
                                    onClick={() => setIsEditting((prev) => !prev)}
                                />
                                <Button
                                    title="Delete"
                                    look="text"
                                    color="warning"
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                    onClick={showModal}
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
                                    <Button
                                        title="Edit"
                                        look="text"
                                        icon={<FontAwesomeIcon icon={faPen} />}
                                        onClick={() => setIsEditting((prev) => !prev)}
                                    />
                                    <Button
                                        title="Delete"
                                        look="text"
                                        color="warning"
                                        icon={<FontAwesomeIcon icon={faTrash} />}
                                        onClick={showModal}
                                    />
                                </>
                            ) : (
                                <Button title="Reply" look="text" icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                            )}
                        </div>
                    </div>
                    {isEditting ? (
                        <div>
                            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={3} />
                            <Button title="Update" onClick={updateComment} />
                        </div>
                    ) : (
                        <p>{text}</p>
                    )}
                </div>
            </CommentCard>
            <Modal show={isShowing} onClose={hideModal} onClickBtn={deleteComment} />
        </>
    );
};
export default Comment;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faArrowLeft, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import CommentCard from "../CommentCard/CommentCard";
import CommentStyles from "./Comment.module.scss";
import Button from "../Button/Button";
import { UserContext } from "../../store/UserContext";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";
import CommentType from "../../Types/Comment";
import CommentInput from "../CommentInput/CommentInput";

interface Props {
    id: string;
    avatar: string;
    name: string;
    date: string;
    count: number;
    text: string;
    replies: CommentType[];
    removeComment: (id: string) => void;
    editComment: (id: string, editComment: string) => void;
}

const Comment: React.FC<Props> = ({ avatar, name, date, count, text, id, replies, removeComment, editComment }) => {
    const { user } = useContext(UserContext);
    const [counter, setCounter] = useState(count);
    const [decision, setDecision] = useState<"upvote" | "downvote" | "">("");
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingComment, setEditingComment] = useState(text);
    const { isShowing, showModal, hideModal } = useModal();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [repliesList, setRepliesList] = useState<CommentType[]>(replies);

    const deleteComment = () => {
        removeComment(id);
    };

    const updateComment = () => {
        editComment(id, editingComment);
        setIsEditing(false);
    };

    const handleCommentSubmit = (comment: CommentType) => {
        setIsReplying(false);
        setRepliesList((prev) => [comment, ...prev]);
    };

    const handleCommentDelete = (replyId: string) => {
        setRepliesList((prev) => prev.filter((comment) => comment.id !== replyId));
    };

    const handleCommentEdit = (replyId: string, editedComment: string) => {
        const updatedComments = repliesList.map((comment) => {
            if (comment.id === replyId) {
                return {
                    ...comment,
                    content: editedComment,
                };
            }
            return comment;
        });
        setRepliesList(updatedComments);
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
                                    onClick={() => setIsEditing((prev) => !prev)}
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
                            <Button
                                title="Reply"
                                look="text"
                                icon={<FontAwesomeIcon icon={faArrowLeft} />}
                                onClick={() => setIsReplying((prev) => !prev)}
                            />
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
                                        onClick={() => setIsEditing((prev) => !prev)}
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
                                <Button
                                    title="Reply"
                                    look="text"
                                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                                    onClick={() => setIsReplying((prev) => !prev)}
                                />
                            )}
                        </div>
                    </div>
                    {isEditing ? (
                        <div>
                            <textarea value={editingComment} onChange={(e) => setEditingComment(e.target.value)} rows={3} />
                            <Button title="Update" onClick={updateComment} />
                        </div>
                    ) : (
                        <p>{text}</p>
                    )}
                </div>
            </CommentCard>
            {isReplying && <CommentInput onCommentSubmit={handleCommentSubmit} type="Reply" />}
            <section className={CommentStyles.replies}>
                {repliesList?.map((comment) => (
                    <Comment
                        key={comment.id}
                        avatar={comment.user.image.webp}
                        name={comment.user.username}
                        date={comment.createdAt}
                        count={comment.score}
                        text={comment.content}
                        id={comment.id}
                        replies={comment?.replies}
                        removeComment={handleCommentDelete}
                        editComment={handleCommentEdit}
                    />
                ))}
            </section>
            <Modal show={isShowing} onClose={hideModal} onClickBtn={deleteComment} />
        </>
    );
};
export default Comment;

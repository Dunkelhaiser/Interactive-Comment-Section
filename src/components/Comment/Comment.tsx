import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faArrowLeft, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import CommentCard from "../CommentCard/CommentCard";
import CommentStyles from "./Comment.module.scss";
import Button from "../Button/Button";

interface Props {
    avatar: string;
    name: string;
    date: string;
    count: number;
    text: string;
}

const Comment: React.FC<Props> = ({ avatar, name, date, count, text }) => {
    const [counter, setCounter] = useState(count);
    return (
        <CommentCard className={CommentStyles.comment}>
            <aside>
                <div className={CommentStyles.counter}>
                    <span
                        role="button"
                        tabIndex={0}
                        className={CommentStyles.operator}
                        onClick={() => {
                            setCounter((prev) => prev + 1);
                        }}
                    >
                        +
                    </span>
                    <span>{counter}</span>
                    <span
                        role="button"
                        tabIndex={0}
                        className={CommentStyles.operator}
                        onClick={() => {
                            setCounter((prev) => prev - 1);
                        }}
                    >
                        -
                    </span>
                </div>
                <div className={CommentStyles.buttons_phone}>
                    {/* <Button title="Edit" look="text" icon={<FontAwesomeIcon icon={faPen} />} /> */}
                    {/* <Button title="Delete" look="text" color="warning" icon={<FontAwesomeIcon icon={faTrash} />} /> */}
                    <Button title="Reply" look="text" icon={<FontAwesomeIcon icon={faArrowLeft} />} />
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
                        {/* <Button title="Edit" look="text" icon={<FontAwesomeIcon icon={faPen} />} />
                        <Button title="Delete" look="text" color="warning" icon={<FontAwesomeIcon icon={faTrash} />} /> */}
                        <Button title="Reply" look="text" icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                    </div>
                </div>
                <p>{text}</p>
            </div>
        </CommentCard>
    );
};
export default Comment;

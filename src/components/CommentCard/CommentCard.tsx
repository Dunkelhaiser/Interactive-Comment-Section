import { ReactElement } from "react";
import CardStyles from "./CommentCard.module.scss";

interface Props {
    children: ReactElement | ReactElement[];
    className?: string;
}

const CommentCard: React.FC<Props> = ({ children, className }) => {
    return <div className={`${CardStyles.card} ${className}`}>{children}</div>;
};
export default CommentCard;

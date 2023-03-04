import { ReactElement } from "react";
import SectionStyles from "./CommentSection.module.scss";

interface Props {
    children: ReactElement | ReactElement[];
}

const CommentSection: React.FC<Props> = ({ children }) => {
    return <section className={SectionStyles.section}>{children}</section>;
};
export default CommentSection;

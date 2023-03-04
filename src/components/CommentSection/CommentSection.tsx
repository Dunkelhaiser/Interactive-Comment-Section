import SectionStyles from "./CommentSection.module.scss";

interface Props {
    children: React.ReactNode;
}

const CommentSection: React.FC<Props> = ({ children }) => {
    return <section className={SectionStyles.section}>{children}</section>;
};
export default CommentSection;

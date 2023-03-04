import ButtonStyles from "./Button.module.scss";

interface Props {
    title: string;
}

const Button: React.FC<Props> = ({ title }) => {
    return (
        <button type="button" className={ButtonStyles.button}>
            {title}
        </button>
    );
};
export default Button;

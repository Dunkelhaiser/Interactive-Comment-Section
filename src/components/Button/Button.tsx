import ButtonStyles from "./Button.module.scss";

interface Props {
    title: string;
    look?: string;
    icon?: JSX.Element;
    color?: "primary" | "warning";
    onClick: () => void;
}

const Button: React.FC<Props> = ({ title, look = "solid", color = "primary", icon, onClick }) => {
    return (
        <button type="button" className={`${ButtonStyles[look]} ${ButtonStyles[color]}`} onClick={onClick}>
            {icon}
            {title}
        </button>
    );
};
export default Button;

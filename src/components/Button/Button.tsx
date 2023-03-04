import ButtonStyles from "./Button.module.scss";

interface Props {
    title: string;
    look?: string;
    icon?: JSX.Element;
    color?: "primary" | "warning";
}

const Button: React.FC<Props> = ({ title, look = "solid", color = "primary", icon }) => {
    return (
        <button type="button" className={`${ButtonStyles[look]} ${ButtonStyles[color]}`}>
            {icon}
            {title}
        </button>
    );
};
export default Button;

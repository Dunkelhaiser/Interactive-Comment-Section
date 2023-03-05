import ButtonStyles from "./Button.module.scss";

interface Props {
    title: string;
    look?: string;
    icon?: JSX.Element;
    disabled?: boolean;
    color?: "primary" | "warning";
    onClick: () => void;
}

const Button: React.FC<Props> = ({ title, look = "solid", color = "primary", icon, onClick, disabled = false }) => {
    return (
        <button type="button" className={`${ButtonStyles[look]} ${ButtonStyles[color]}`} onClick={onClick} disabled={disabled}>
            {icon}
            {title}
        </button>
    );
};
export default Button;

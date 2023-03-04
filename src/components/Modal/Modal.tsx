import ReactDOM from "react-dom";
import Button from "../Button/Button";
import ModalStyles from "./Modal.module.scss";

interface Props {
    show: boolean;
    onClose: () => void;
    onClickBtn: () => void;
}

const Modal: React.FC<Props> = ({ show, onClose, onClickBtn }) => {
    return ReactDOM.createPortal(
        show && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className={ModalStyles.overlay}>
                <div className={ModalStyles.modal}>
                    <h2>Delete comment</h2>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone</p>
                    <div>
                        <Button title="No, cancel" onClick={onClose} />
                        <Button title="Yes, delete" color="warning" onClick={onClickBtn} />
                    </div>
                </div>
            </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector("#overlays")!
    );
};
export default Modal;

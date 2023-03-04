import { useState, useEffect } from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const showModal = () => setIsShowing(true);
    const hideModal = () => setIsShowing(false);
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                hideModal();
            }
        };

        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    return {
        isShowing,
        showModal,
        hideModal,
    };
};

export default useModal;

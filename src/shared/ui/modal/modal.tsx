import { type ReactElement } from "react";
import styles from "./modal.module.css";

type ModalProps = {
    children: ReactElement;
    visibility: boolean;
    setVisibility: (visibility: boolean) => void;
};

export const Modal = ({children, visibility, setVisibility} : ModalProps) => {

    const rootStyles: string[] = [styles.modal];

    if (visibility) {
        rootStyles.push(styles.active);
    };

    return (
        <div
            className={rootStyles.join(' ')}
            onClick={() => setVisibility(false)}
        >
            <div
                className={styles.modalContent}
                onClick={(event: React.MouseEvent) => event.stopPropagation()}
            >
                {children}
                <button
                    className={styles.buttonExit}
                    onClick={() => setVisibility(false)}
                >
                    Закрыть окно
                </button>
            </div>
        </div>
    );
};
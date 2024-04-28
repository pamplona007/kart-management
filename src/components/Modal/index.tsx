import React from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

type ModalProps = {
    title?: string;
    content: React.ReactNode | JSX.Element | JSX.Element[] | string;
    buttons?: React.ReactNode | JSX.Element | JSX.Element[] | string;
    onClose?: () => void;
    open: boolean;
};

const Modal = (props: ModalProps) => {
    const {
        title,
        content,
        open,
        buttons,
        onClose,
    } = props;

    return (
        <div
            className={classNames(
                styles['modal-wrapper'],
                { [styles.open]: open },
            )}
        >
            <div
                className={styles.overlay}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose?.();
                    }
                }}
                onKeyUp={(event) => {
                    if ('Escape' === event.key) {
                        onClose?.();
                    }
                }}
            >
            </div>
            <div className={styles.modal}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <div className={styles.content}>
                    {content}
                </div>
                <div className={styles['button-container']}>
                    {buttons}
                </div>
            </div>
        </div>
    );
};

export default Modal;

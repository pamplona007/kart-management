import React, { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    dark?: boolean;
};


const Button = (props: Props) => {
    const buttonClassNames = classNames(
        styles.button,
        props.className,
        {
            [styles.dark]: props.dark,
        },
    );

    return (
        <button
            {...props}
            className={buttonClassNames}
        >
            <div className={styles.before}></div>
            {props.children}
            <div className={styles.after}></div>
        </button>
    );
};

export default Button;

import React, { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    dark?: boolean;
    block?: boolean;
};

const Button = (props: Props) => {
    const { className, dark, block, children, ...rest } = props;

    const buttonClassNames = classNames(
        styles.button,
        className,
        {
            [styles.dark]: dark,
            [styles.block]: block,
        },
    );

    return (
        <button
            {...rest}
            className={buttonClassNames}
        >
            <div className={styles.before}></div>
            {children}
            <div className={styles.after}></div>
        </button>
    );
};

export default Button;

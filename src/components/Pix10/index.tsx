'use client';

import React, { useState } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

const Pix10 = () => {
    const [copied, setCopied] = useState(false);

    const key = 'a82de048-05ad-4d3b-80b2-52d74a7b298a';

    const onCopy = () => {
        navigator.clipboard.writeText(key);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <p>
                {'Valor: R$ 10,00'}
            </p>
            <button
                className={styles.key}
                onClick={onCopy}
            >
                <div
                    className={classNames(
                        styles.copied,
                        { [styles.visible]: copied },
                    )}
                >
                    {'Copiado!'}
                </div>
                {'Chave: '}
                <br />
                {key}
            </button>
        </div>
    );
};

export default Pix10;

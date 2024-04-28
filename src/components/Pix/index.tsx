'use client';

import React, { useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';

const Pix = () => {
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
            <Image
                src={'/images/qr-pix.svg'}
                alt={'Pix'}
                width={200}
                height={200}
            />
            <p>
                {'Valor: R$ 100,00'}
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

export default Pix;

'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';

import classNames from 'classnames';

import styles from './styles.module.scss';

const Pix110 = () => {
    const [copied, setCopied] = useState(false);

    const key = 'a82de048-05ad-4d3b-80b2-52d74a7b298a';
    const qrcodeValue = '00020101021126850014br.gov.bcb.pix0136a82de048-05ad-4d3b-80b2-52d74a7b298a0223Registro do kart e cota5204000053039865406110.005802BR5918LUCAS P DE S PINTO6009FORTALEZA62070503***63040AB9';

    const onCopy = () => {
        navigator.clipboard.writeText(key);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <QRCode value={qrcodeValue} fgColor={'#fff'} bgColor={'transparent'} />
            <p>
                {'Valor: R$ 110,00'}
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

export default Pix110;

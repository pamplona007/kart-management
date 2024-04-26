'use client';

import { useMemo, useState } from 'react';

import Button from '@/components/Button';
import ImportantInformationSteps from '@/components/ImportantInformationSteps';
import classNames from 'classnames';
import Image from 'next/image';

import styles from './page.module.scss';

const racerImageQuantity = 7;

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [isImportantInformationOpen, setIsImportantInformationOpen] = useState(false);

    const randomRacerImage = useMemo(() => {
        return Math.floor(Math.random() * racerImageQuantity) + 1;
    }, []);

    const imageContainerClassNames = classNames(
        styles['image-container'],
        styles['image-container--' + randomRacerImage],
    );

    const imageClassNames = classNames(
        styles.image,
        { [styles.loaded]: loaded },
    );

    return (
        <>
            <div className={styles.container}>
                <div className={styles['logo-container']}>
                    <div
                        className={imageContainerClassNames}
                    >
                        <Image
                            src={`/images/racers/racer-${randomRacerImage}.png`}
                            alt="Racer"
                            layout="fill"
                            quality={100}
                            className={imageClassNames}
                            onLoad={() => setLoaded(true)}
                        />
                    </div>
                </div>

                <div className={styles['button-container']}>
                    <Button>
                    Corridas
                    </Button>
                    <Button>
                    Registrar
                    </Button>
                    <Button onClick={() => setIsImportantInformationOpen(true)}>
                    Informações importantes
                    </Button>
                </div>
            </div>
            <ImportantInformationSteps
                isOpen={isImportantInformationOpen}
                setIsOpen={setIsImportantInformationOpen}
            />
        </>
    );
}

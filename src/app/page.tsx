'use client';

import { useMemo, useState } from 'react';

import Button from '@/components/Button';
import ImportantInformationSteps from '@/components/ImportantInformationSteps';
import RegistrationSteps from '@/components/RegistrationSteps';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.scss';

const racerImageQuantity = 7;

const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [isImportantInformationOpen, setIsImportantInformationOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const randomRacerImage = useMemo(() => {
        return Math.floor(Math.random() * racerImageQuantity) + 1;
    }, []);

    const imageContainerClassNames = classNames(
        styles['image-container'],
        styles[`image-container--${randomRacerImage}`],
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
                            alt={'Racer'}
                            layout={'fill'}
                            quality={100}
                            className={imageClassNames}
                            onLoad={() => setLoaded(true)}
                        />
                    </div>
                </div>

                <div className={styles['button-container']}>
                    <Link href={'/corridas'} className={styles['button-link']}>
                        <Button role={'link'} block>
                            {'Corridas'}
                        </Button>
                    </Link>
                    <Button onClick={() => setIsRegistrationOpen(true)}>
                        {'Registrar'}
                    </Button>
                    <Button onClick={() => setIsImportantInformationOpen(true)}>
                        {'Informações importantes'}
                    </Button>
                </div>
            </div>
            <ImportantInformationSteps
                isOpen={isImportantInformationOpen}
                setIsOpen={setIsImportantInformationOpen}
            />
            <RegistrationSteps
                isOpen={isRegistrationOpen}
                setIsOpen={setIsRegistrationOpen}
            />
        </>
    );
};

export default Home;

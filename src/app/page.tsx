'use client';

import { useState } from 'react';

import Button from '@/components/Button';
import ImportantInformationSteps from '@/components/ImportantInformationSteps';
import Modal from '@/components/Modal';
import Pix110 from '@/components/Pix110';
import RandomImage from '@/components/RandomImage';
import RegistrationSteps from '@/components/RegistrationSteps';
import Link from 'next/link';

import styles from './page.module.scss';

const Home = () => {
    const [isImportantInformationOpen, setIsImportantInformationOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isPixModalOpen, setIsPixModalOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles['logo-container']}>
                    <RandomImage />
                    <h1 className={styles.title}>
                        {'Niver Pamplona'}
                    </h1>
                    <h2 className={styles.subtitle}>
                        {'Sábado dia 15 de junho'}
                    </h2>
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

                    <button
                        className={styles['button-pix']}
                        onClick={() => setIsPixModalOpen(true)}
                    >
                        {'pix para registro'}
                    </button>
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
            <Modal
                title={'Pix para registro'}
                open={isPixModalOpen}
                content={<Pix110 />}
                onClose={() => setIsPixModalOpen(false)}
            />
        </>
    );
};

export default Home;

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

export const dynamic = 'force-dynamic';

const Home = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const [isImportantInformationOpen, setIsImportantInformationOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isPixModalOpen, setIsPixModalOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { admin } = searchParams;

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
                        <br />
                        <a href={'https://maps.app.goo.gl/5XLW3j9bCb1CUkHR6'} target={'_blank'} rel={'noreferrer'}>
                            {'No Kart Mônaco'}
                        </a>
                        <br />
                        {'Corridas começando as 17h (não pode atrasar)'}
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

                    <a
                        href={'https://maps.app.goo.gl/5XLW3j9bCb1CUkHR6'}
                        target={'_blank'}
                        className={styles['button-pix']}
                        rel={'noreferrer'}
                    >
                        {'Localização'}
                    </a>
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

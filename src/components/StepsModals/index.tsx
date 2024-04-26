'use client';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

import Button from '../Button';
import styles from './styles.module.scss';

export type Step = {
    title: string;
    content: ReactNode | JSX.Element | JSX.Element[] | string;
};

type StepsModalsProps = {
    steps: Step[];
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    isModalVisible: boolean;
    onFinish?: () => void;
    canAdvance?: boolean;
};

const StepsModals = (props: StepsModalsProps) => {
    const { steps, activeStep, setActiveStep, isModalVisible, onFinish, canAdvance = true } = props;

    const wrapperClassNames = classNames(
        styles.wrapper,
        {
            [styles.visible]: isModalVisible,
        },
    );

    const handleNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
            return;
        }

        onFinish?.();
    };

    const handlePrevStep = () => {
        if (0 < activeStep) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <div className={wrapperClassNames}>
            {isModalVisible && (
                steps.map((step, index) => (
                    <div
                        key={step.title}
                        className={classNames(
                            styles.step,
                            {
                                [styles.active]: index === activeStep,
                            },
                        )}
                    >
                        <h2 className={styles.title}>
                            {step.title}
                        </h2>
                        <div className={styles.content}>
                            {step.content}
                        </div>
                        <div className={styles['button-container']}>
                            <Button
                                onClick={handlePrevStep}
                                disabled={0 === activeStep}
                                dark
                            >
                                Voltar
                            </Button>
                            <Button
                                onClick={handleNextStep}
                                disabled={!canAdvance}
                                dark
                            >
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StepsModals;

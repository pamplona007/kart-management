'use client';

import React, { ReactNode, createContext } from 'react';

import classNames from 'classnames';

import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.scss';

export type Step = {
    title: string;
    content: ReactNode | JSX.Element | JSX.Element[] | string;
    showNext?: boolean;
    showPrevious?: boolean;
};

type StepsModalsProps = {
    steps: Step[];
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    isModalVisible: boolean;
    onClose?: () => void;
    onFinish?: () => void;
    canAdvance?: boolean;
};

type StepsContextProps = StepsModalsProps & {
    handleNextStep: () => void;
    handlePrevStep: () => void;
};

export const StepsContext = createContext<StepsContextProps>({
    steps: [],
    activeStep: 0,
    setActiveStep: () => {},
    isModalVisible: false,
    handleNextStep: () => {},
    handlePrevStep: () => {},
});

const StepsModals = (props: StepsModalsProps) => {
    const {
        steps,
        activeStep,
        setActiveStep,
        isModalVisible,
        onFinish,
        onClose,
        canAdvance = true,
    } = props;

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
            return;
        }

        onClose?.();
    };

    return (
        <StepsContext.Provider
            value={{
                ...props,
                handleNextStep,
                handlePrevStep,
            }}
        >
            <div
                className={wrapperClassNames}
            >
                {isModalVisible && (
                    steps.map(({ title, content, showNext = true, showPrevious = true }, index) => (
                        <Modal
                            key={index}
                            open={activeStep === index}
                            title={title}
                            content={content}
                            onClose={onClose}
                            buttons={(
                                <>
                                    {showPrevious && (
                                        <Button
                                            onClick={handlePrevStep}
                                            disabled={0 === activeStep && !onClose}
                                        >
                                            {0 === activeStep && !!onClose ? 'Fechar' : 'Anterior'}
                                        </Button>
                                    )}
                                    {showNext && (
                                        <Button
                                            onClick={handleNextStep}
                                            disabled={!canAdvance}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                        </Button>
                                    )}
                                </>
                            )}
                        />
                    ))
                )}
            </div>
        </StepsContext.Provider>
    );
};

export default StepsModals;

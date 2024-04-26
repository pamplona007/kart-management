'use client';

import React, { useEffect, useState } from 'react';

import StepsModals, { Step } from '../StepsModals';

type ImportantInformationStepsProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ImportantInformationSteps = (props: ImportantInformationStepsProps) => {
    const { isOpen, setIsOpen } = props;

    const [activeStep, setActiveStep] = useState(0);

    const importantInformationSteps: Step[] = [
        {
            title: 'Informações importantes',
            content: (
                <div>
                    <p>
                        A corrida de kart é um esporte de competição de velocidade, onde os pilotos competem em karts, veículos motorizados de quatro rodas.
                    </p>
                </div>
            ),
        },
        {
            title: 'Informações importantes',
            content: (
                <div>
                    <p>
                        O kart é um veículo de competição, com chassi tubular e carenagem de plástico ou fibra de vidro.
                    </p>
                </div>
            ),
        },
        {
            title: 'Informações importantes',
            content: (
                <div>
                    <p>
                        Para participar de uma corrida de kart, é necessário ter mais de 18 anos e possuir carteira de habilitação.
                    </p>
                </div>
            ),
        }
    ];

    useEffect(() => {
        if (isOpen) {
            setActiveStep(0);
        }
    }, [isOpen]);

    return (
        <StepsModals
            steps={importantInformationSteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isModalVisible={isOpen}
            onFinish={() => setIsOpen(false)}
        />
    );
};

export default ImportantInformationSteps;

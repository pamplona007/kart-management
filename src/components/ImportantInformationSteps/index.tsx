'use client';

import React, { useEffect, useState } from 'react';

import StepsModals, { Step } from '../StepsModals';

type ImportantInformationStepsProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const importantInformationSteps: Step[] = [
    {
        title: 'Informações importantes',
        content: (
            <div>
                {'Para correr, é necessário seguir algumas regras de segurança. Vamos ver algumas delas?'}
            </div>
        ),
    },
    {
        title: 'O que é obrigatório?',
        content: (
            <div>
                {'Primeiramente, é necessário usar o capacete durante toda a corrida. Ele é essencial para a sua segurança.'}
            </div>
        ),
    },
    {
        title: 'O que é obrigatório?',
        content: (
            <div>
                {'Caso decida levar seu capacete, é obrigatório que seja um capacete totalmente fechado. Capacetes abertos não são permitidos.'}
            </div>
        ),
    },
    {
        title: 'O que é obrigatório?',
        content: (
            <div>
                {'Também é necessário usar calçados fechados. Tênis e botas são os mais recomendados.'}
            </div>
        ),
    },
    {
        title: 'O que é obrigatório?',
        content: (
            <div>
                {'Além disso, para pessoas de cabelo grande, é obrigatório prender o cabelo e utilizar balaclava. Você pode levar a sua ou alugar uma no local.'}
            </div>
        ),
    },
    {
        title: 'O que é opcional?',
        content: (
            <div>
                {'Luvas e calças são opcionais, mas recomendados para garantir a sua segurança e conforto.'}
            </div>
        ),
    },
    {
        title: 'O que é proibido?',
        content: (
            <div>
                {'É proibido correr com chinelos, sandálias ou qualquer outro calçado aberto.'}
            </div>
        ),
    },
    {
        title: 'O que é proibido?',
        content: (
            <div>
                {'Além disso, é proibido correr com roupas que possam prender em partes do kart, como saias e vestidos. Prefira calças e bermudas não muito largas.'}
            </div>
        ),
    },
    {
        title: 'Pronto para correr?',
        content: (
            <div>
                {'Agora que você já sabe o que é necessário e o que é proibido, está pronto para correr! Boa sorte!'}
            </div>
        ),
    },
];

const ImportantInformationSteps = (props: ImportantInformationStepsProps) => {
    const { isOpen, setIsOpen } = props;

    const [activeStep, setActiveStep] = useState(0);

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
            onClose={() => setIsOpen(false)}
        />
    );
};

export default ImportantInformationSteps;

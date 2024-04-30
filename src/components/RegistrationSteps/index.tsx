'use client';

import { useEffect, useMemo, useState } from 'react';

import RegistrationContext, { FormValues } from '@/contexts/RegistrationContext';
import { useFormik } from 'formik';

import { importantInformationSteps } from '../ImportantInformationSteps';
import Pix10 from '../Pix10';
import Pix110 from '../Pix110';
import StepsModals, { Step } from '../StepsModals';
import AgeStep from './components/AgeStep';
import FormStep from './components/FormStep';
import RatingStep from './components/RatingStep';

type RegistrationProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const RegistrationSteps = (props: RegistrationProps) => {
    const { isOpen, setIsOpen } = props;

    const [activeStep, setActiveStep] = useState(0);

    const formik = useFormik<FormValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            birthday: 0,
            rating: 0,
            confirmed: false,
        },
        onSubmit: async (values) => {
            await fetch('/api/pilots', {
                method: 'POST',
                body: JSON.stringify({
                    ...values,
                    age: Math.floor((Number(new Date()) - Number(new Date(values.birthday))) / 31536000000),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
    });

    const steps: Step[] = useMemo(() => {
        const baseSteps = [
            {
                title: 'Dificuldade',
                content: <RatingStep />,
                showNext: false,
            },
            {
                title: 'Registro',
                content: <FormStep />,
            },
        ];

        if (0 === formik.values.rating) {
            return [
                ...baseSteps,
                {
                    title: 'Não vai correr?',
                    content: (
                        <div>
                            <p>
                                {'Que pena que não vai correr com a gente! Mas se mudar de opinião, basta avisar que botamos seu nome junto com o restante dos pilotos!'}
                            </p>
                        </div>
                    ),
                },
                {
                    title: 'Valores',
                    content: (
                        <div>
                            <p>
                                {'A festa não acaba para quem não vai correr. Ainda vamos ter comida, bebida e muita diversão! Estamos pedindo 10 reais como uma cota simbólica para comprar tudo isso. Se puder, envie o valor para garantir sua cota!'}
                            </p>
                            <Pix10 />
                        </div>
                    ),
                },
            ];
        }

        return [
            ...baseSteps,
            {
                title: 'Sua idade',
                content: <AgeStep />,
            },
            {
                title: 'Valores',
                content: (
                    <div>
                        <small>
                            {'O valor cobrado pelo kart é de 100 reais e estamos pedindo mais 10 reais para ajudar a comprar comidas, bebidas e talvez até o equipamento de segurança que seria alugado. Mas fique a vontade para enviar só uma parte e enviar o restante depois, sua vaga estará garantida!'}
                        </small>
                    </div>
                ),
            },
            {
                title: 'Valores',
                content: (
                    <div>
                        <small>
                            {'Seu nome só vai aparecer na lista de corredores após feita a transferência, mesmo que parcial, do valor da inscrição. Se você não puder pagar agora, não tem problema, só avise que a gente dá um jeito!'}
                        </small>
                    </div>
                ),
            },
            {
                title: 'Valores',
                content: (
                    <div>
                        <small>
                            {'Caso precise cancelar, pedimos que avise pelo menos uma semana antes do evento para que possamos devolver o valor da inscrição.'}
                        </small>
                    </div>
                ),
            },
            ...importantInformationSteps,
            {
                title: 'Para finalizar',
                content: (
                    <div>
                        <p>
                            {'Você já está registrado(a)! Mas ainda precisa realizar o pagamento da inscrição. Novamente, fique a vontade para enviar só uma parte e enviar o restante depois, vamos garantir sua vaga!'}
                        </p>
                        <Pix110 />
                    </div>
                ),
            },
        ];
    }, [formik.values.rating]);

    const canAdvance = () => {
        if (1 === activeStep) {
            return Boolean(formik.values.firstName && formik.values.lastName && formik.values.nickName);
        }

        if (2 === activeStep && 0 !== formik.values.rating) {
            return Boolean(formik.values.birthday);
        }

        return true;
    };

    const onFinish = async () => {
        await formik.submitForm();

        setIsOpen(false);
        formik.resetForm();
    };

    useEffect(() => {
        if (isOpen) {
            setActiveStep(0);
        }
    }, [isOpen]);

    return (
        <RegistrationContext.Provider value={{ formik }}>
            <StepsModals
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                isModalVisible={isOpen}
                onFinish={onFinish}
                canAdvance={canAdvance()}
                onClose={() => {
                    setIsOpen(false);
                    formik.resetForm();
                }}
            />
        </RegistrationContext.Provider>
    );
};

export default RegistrationSteps;

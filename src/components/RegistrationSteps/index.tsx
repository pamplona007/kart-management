'use client';

import { useEffect, useMemo, useState } from 'react';

import RegistrationContext, { FormValues } from '@/contexts/RegistrationContext';
import { useFormik } from 'formik';

import { importantInformationSteps } from '../ImportantInformationSteps';
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
            return baseSteps;
        }

        return [
            ...baseSteps,
            {
                title: 'Sua idade',
                content: <AgeStep />,
            },
            ...importantInformationSteps,
        ];
    }, [formik.values.rating]);

    const canAdvance = () => {
        if (1 === activeStep) {
            return Boolean(formik.values.firstName && formik.values.lastName && formik.values.nickName);
        }

        if (2 === activeStep) {
            return Boolean(formik.values.birthday);
        }

        return true;
    };

    const onFinish = async () => {
        await formik.submitForm();

        setIsOpen(false);
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
            />
        </RegistrationContext.Provider>
    );
};

export default RegistrationSteps;

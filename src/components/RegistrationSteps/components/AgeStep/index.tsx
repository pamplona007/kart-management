import { useContext } from 'react';

import Input from '@/components/Input';
import { StepsContext } from '@/components/StepsModals';
import RegistrationContext from '@/contexts/RegistrationContext';

const AgeStep = () => {
    const context = useContext(RegistrationContext);
    const { handleNextStep } = useContext(StepsContext);

    const { formik } = context || {};
    const { getFieldProps } = formik || {};

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleNextStep();
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type={'submit'} style={{ display: 'none' }} />
            <Input
                label={'Data de nascimento'}
                type={'date'}
                {...getFieldProps?.('birthday')}
            />
            <p>
                {'Menores de idade ainda podem correr, mas em uma bateria separada'}
            </p>
        </form>
    );
};

export default AgeStep;

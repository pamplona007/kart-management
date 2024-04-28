import { useContext } from 'react';

import { Col, Row } from '@/components/Grid';
import Input from '@/components/Input';
import { StepsContext } from '@/components/StepsModals';
import RegistrationContext from '@/contexts/RegistrationContext';

const FormStep = () => {
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
            <Row>
                <Col>
                    <Input
                        label={'Nome'}
                        {...getFieldProps?.('firstName')}
                        required
                    />
                </Col>
                <Col>
                    <Input
                        label={'Sobrenome'}
                        {...getFieldProps?.('lastName')}
                        required
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label={'Apelido'}
                        {...getFieldProps?.('nickName')}
                        required
                    />
                </Col>
            </Row>
        </form>
    );
};

export default FormStep;

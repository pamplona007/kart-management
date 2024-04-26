import { createContext } from 'react';

interface RegistrationContextType {
    formValues: {
        firstName: string;
        lastName: string;
        nickname: string;
        age: number;
        rating: number;
    };
    setFormValues: (formValues: {
        firstName: string;
        lastName: string;
        nickname: string;
        age: number;
        rating: number;
    }) => void;
    formErrors: {
        firstName: string;
        lastName: string;
        nickname: string;
        age: string;
        rating: string;
    };
    setFormErrors: (formErrors: {
        firstName: string;
        lastName: string;
        nickname: string;
        age: string;
        rating: string;
    }) => void;
    formValid: boolean;
    setFormValid: (formValid: boolean) => void;
    submitForm: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export default RegistrationContext;

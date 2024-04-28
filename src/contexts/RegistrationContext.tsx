import { createContext } from 'react';

import { useFormik } from 'formik';

export type FormValues = {
    firstName: string;
    lastName: string;
    nickName: string;
    birthday: number;
    rating: number;
    confirmed: boolean;
}

interface RegistrationContextType {
    formik: ReturnType<typeof useFormik<FormValues>>;
}

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export default RegistrationContext;

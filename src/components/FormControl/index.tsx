import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLLabelElement> & {
  label?: string;
};

const FormControl = (props: PropsWithChildren<Props>) => {
    const { label, children, ...rest } = props;

    return (
        <label {...rest} className={styles['widget-form-control']} >
            <span className={styles['label']}>
                {label}
            </span>
            {children}
        </label>
    );
};

export default FormControl;

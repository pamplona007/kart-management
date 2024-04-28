import { InputHTMLAttributes } from 'react';

import FormControl from '@/components/FormControl';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  label?: string;
  highlight?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
    const { label, highlight, ...rest } = props;

    const classes = classNames(
        styles['widget-input'],
        {
            [styles['-highlight']]: highlight,
        },
    );

    return (
        <FormControl label={label}>
            <input
                {...rest}
                className={classes}
            />
        </FormControl>
    );
};

export default Input;

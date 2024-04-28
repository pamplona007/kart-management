import React, { PropsWithChildren } from 'react';

import { RowSizeProp, sizes } from '@/shared/constants';
import classNames from 'classnames';

type RowProps = {
    justify?: 'start' | 'end' | 'center' | 'between' | 'around';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    className?: string;
    xs?: RowSizeProp;
    sm?: RowSizeProp;
    md?: RowSizeProp;
    lg?: RowSizeProp;
    xl?: RowSizeProp;
    xxl?: RowSizeProp;
};

const Row: React.FC<PropsWithChildren<RowProps>> = (props) => {
    const {
        justify,
        align,
        className,
        children,
        ...others
    } = props;

    let sizeClassObj = {};
    sizes.forEach((size) => {
        let sizeProps: {
            justify?: 'start' | 'end' | 'center' | 'between' | 'around',
            align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
        } = {};
        // eslint-disable-next-line react/destructuring-assignment
        const sizeProp = props[size] as RowSizeProp;

        if ('object' === typeof sizeProp) {
            sizeProps = sizeProp || {};
        }

        delete others[size];

        sizeClassObj = {
            ...sizeClassObj,
            [`justify-content-${size}-${sizeProps.justify}`]: sizeProps.justify || 0 === sizeProps.justify,
            [`align-items-${size}-${sizeProps.align}`]: sizeProps.align || 0 === sizeProps.align,
        };
    });

    const classes = classNames(
        'row',
        {
            [`justify-content-${justify}`]: justify,
            [`align-items-${align}`]: align,
        },
        className,
        sizeClassObj,
    );

    return (
        <div {...others} className={classes}>
            {children}
        </div>
    );
};

export default Row;

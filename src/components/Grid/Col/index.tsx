import { ColSizeProp, sizes } from '@/shared/constants';
import classNames from 'classnames';

type ColProps = {
    span?: number | string;
    order?: number;
    offset?: number;
    className?: string;
    children?: React.ReactNode;
    xs?: ColSizeProp;
    sm?: ColSizeProp;
    md?: ColSizeProp;
    lg?: ColSizeProp;
    xl?: ColSizeProp;
    xxl?: ColSizeProp;
};

const Col: React.FC<ColProps> = (props) => {
    const {
        span,
        order,
        offset,
        className,
        children,
        ...others
    } = props;

    let sizeClassObj = {};

    sizes.forEach((size) => {
        let sizeProps: { span?: number; order?: number; offset?: number } = {};
        // eslint-disable-next-line react/destructuring-assignment
        const sizeProp = props[size] as ColSizeProp;

        if ('number' === typeof sizeProp) {
            sizeProps.span = sizeProp;
        } else if ('object' === typeof sizeProp) {
            sizeProps = sizeProp || {};
        }

        delete others[size];

        sizeClassObj = {
            ...sizeClassObj,
            [`col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
            [`order-${size}-${sizeProps.order}`]: sizeProps.order || 0 === sizeProps.order,
            [`offset-${size}-${sizeProps.offset}`]: sizeProps.offset || 0 === sizeProps.offset,
        };
    });

    const classes = classNames(
        'col',
        {
            [`col-${span}`]: span !== undefined,
            [`order-${order}`]: order,
            [`offset-${offset}`]: offset,
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

export default Col;

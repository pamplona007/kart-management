import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

type ContainerProps = {
    sectionClassName?: string;
    className?: string;
};

const Container: React.FC<PropsWithChildren<ContainerProps>> = (props) => {
    const { children, sectionClassName, className } = props;

    const classname = classNames(
        'container',
        className,
    );

    return (
        <div className={sectionClassName}>
            <div className={classname}>
                {children}
            </div>
        </div>
    );
};

export default Container;

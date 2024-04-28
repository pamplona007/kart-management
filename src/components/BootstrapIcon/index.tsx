import React from 'react';

import classNames from 'classnames';

type Props = {
    iconLabel: string;
    className?: string;
};

const BootstrapIcon: React.FC<Props> = (props) => {
    const {
        iconLabel,
        className,
    } = props;

    const classname = classNames(
        'bi',
        {
            [`bi-${iconLabel}`]: iconLabel,
        },
        className,
    );

    return (
        <i className={classname} />
    );
};

export default BootstrapIcon;

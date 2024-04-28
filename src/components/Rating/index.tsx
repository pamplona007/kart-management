'use client';

import { useState } from 'react';

import BootstrapIcon from '@/components/BootstrapIcon';
import classNames from 'classnames';

import classes from './styles.module.scss';

type Props = {
    rating: number;
    readOnly?: boolean;
    onClick?: (rating: number) => void;
    responsive?: boolean;
};

const StarRating: React.FC<Props> = ({ rating, readOnly, onClick, responsive }) => {
    const [hover, setHover] = useState(0);

    const starMouseEnter = (index: number) => {
        if (readOnly) {
            return;
        }
        setHover(index);
    };

    const classname = classNames(
        classes['star-rating'],
        {
            [classes['read-only']]: readOnly,
            [classes.responsive]: responsive,
        },
    );

    return (
        <div className={classname}>
            {[...Array(5)].map((star, index) => {
                const classname = classNames(
                    classes.star,
                    {
                        [classes.on]: index + 1 <= (hover || rating),
                        [classes.off]: index + 1 > (hover || rating),
                    },
                );

                return (
                    <button
                        type={'button'}
                        key={index}
                        className={classname}
                        onClick={() => !readOnly && onClick && onClick(index + 1)}
                        onMouseEnter={() => starMouseEnter(index + 1)}
                        onMouseLeave={() => starMouseEnter(rating)}
                    >
                        {index + 1 <= (hover || rating)
                            ? <BootstrapIcon iconLabel={'star-fill'} />
                            : <BootstrapIcon iconLabel={'star'} />
                        }
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;

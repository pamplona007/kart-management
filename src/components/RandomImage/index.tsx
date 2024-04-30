import React, { useMemo, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';

const racerImageQuantity = 8;

const RandomImage = () => {
    const [loaded, setLoaded] = useState(false);

    const randomRacerImage = useMemo(() => {
        return Math.floor(Math.random() * racerImageQuantity) + 1;
    }, []);

    const imageContainerClassNames = classNames(
        styles['image-container'],
        styles[`image-container--${randomRacerImage}`],
    );

    const imageClassNames = classNames(
        styles.image,
        { [styles.loaded]: loaded },
    );

    return (
        <div
            className={imageContainerClassNames}
        >
            <Image
                src={`/images/racers/racer-${randomRacerImage}.webp`}
                alt={'Racer'}
                width={450}
                height={450}
                quality={100}
                className={imageClassNames}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default RandomImage;

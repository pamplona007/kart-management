import { useContext } from 'react';

import Button from '@/components/Button';
import { StepsContext } from '@/components/StepsModals';
import RegistrationContext from '@/contexts/RegistrationContext';

import styles from './styles.module.scss';

const RATINGS = 4;
const RATING_LABEL_INCREMENT = 50;

const RatingStep = () => {
    const context = useContext(RegistrationContext);
    const { handleNextStep } = useContext(StepsContext);

    const { formik } = context || {};
    const { setFieldValue } = formik || {};

    const onRatingClick = (rating: number) => {
        setFieldValue?.('rating', rating);
        handleNextStep();
    };

    return (
        <div className={styles.container}>
            <p>
                {'Vamos tentar lhe por em corridas com pessoas de habilidades similares.'}
            </p>
            <Button
                onClick={() => onRatingClick(0)}
            >
                {'Não vou correr'}
            </Button>
            {Array.from({ length: RATINGS }, (_, index) => {
                const rating = index + 1;

                return (
                    <Button
                        key={rating}
                        onClick={() => onRatingClick(rating)}
                    >
                        {rating * RATING_LABEL_INCREMENT}
                        {'cc'}
                        {rating === RATINGS && (
                            <small><i>{' (O Pamplona vai aqui)'}</i></small>
                        )}
                    </Button>
                );
            })}
        </div>
    );
};

export default RatingStep;

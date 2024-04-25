'use client';

import { useMemo } from 'react';

import { IPilot } from '@/models/Pilot';
import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';

const MAX_PILOTS_PER_RACE = 10;
const MAX_PILOTS_PER_RACE_MINOR = 6;

interface IRace {
    pilots: IPilot[];
    isMinor: boolean;
}

const Pilots = () => {
    const { data: pilots } = useQuery<IPilot[]>({
        queryKey: ['pilots'],
        queryFn: async () => {
            const response = await fetch('/api/pilots');
            return response.json();
        },
    });

    const races: IRace[] = useMemo(() => {
        if (!pilots) {
            return [];
        }

        const minors = pilots.filter((pilot) => 18 > pilot.age);
        const majors = pilots.filter((pilot) => 18 <= pilot.age);

        const minorsRacesQuantity = Math.ceil(minors.length / MAX_PILOTS_PER_RACE_MINOR);
        const majorsRacesQuantity = Math.ceil(majors.length / MAX_PILOTS_PER_RACE);

        const minorsPilotsPerRace = Math.ceil(minors.length / minorsRacesQuantity);
        const majorsPilotsPerRace = Math.ceil(majors.length / majorsRacesQuantity);

        const minorsOrganizedByRating = minors.sort((a, b) => a.rating - b.rating);
        const majorsOrganizedByRating = majors.sort((a, b) => a.rating - b.rating);

        const minorsRaces = Array.from({ length: minorsRacesQuantity }, (_, index) => {
            const start = index * minorsPilotsPerRace;
            const end = start + minorsPilotsPerRace;
            return minorsOrganizedByRating.slice(start, end);
        });

        const majorsRaces = Array.from({ length: majorsRacesQuantity }, (_, index) => {
            const start = index * majorsPilotsPerRace;
            const end = start + majorsPilotsPerRace;
            return majorsOrganizedByRating.slice(start, end);
        });

        return [
            ...majorsRaces.map((pilots) => ({ pilots, isMinor: false })),
            ...minorsRaces.map((pilots) => ({ pilots, isMinor: true })),
        ];
    }, [pilots]);

    return (
        <div className={styles.pilots}>
            {races.map(({ pilots }, index) => (
                <table key={index}>
                    <summary>
                        Corrida {index + 1}
                    </summary>
                    <tbody>
                        {pilots.map((pilot) => (
                            <tr key={pilot._id}>
                                <td>{pilot.firstName} "{pilot.nickName}" {pilot.lastName}</td>
                                <td>{pilot.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
};

export default Pilots;

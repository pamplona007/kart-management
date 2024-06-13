'use client';

import { useMemo } from 'react';

import { IPilot } from '@/models/Pilot';
import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';

const MAX_PILOTS_PER_RACE = 10;

type IRace = IPilot[];

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

        const majorsRacesQuantity = Math.ceil(pilots.length / MAX_PILOTS_PER_RACE);

        const majorsPilotsPerRace = Math.ceil(pilots.length / majorsRacesQuantity);

        const majorsOrganizedByRating = pilots.sort((a, b) => b.rating - a.rating);

        return Array.from({ length: majorsRacesQuantity }, (_, index) => {
            const start = index * majorsPilotsPerRace;
            const end = start + majorsPilotsPerRace;
            return majorsOrganizedByRating.slice(start, end);
        });
    }, [pilots]);

    return (
        <div className={styles.pilots}>
            {races.map((pilots, index) => (
                <table key={index}>
                    <summary>
                        {'Corrida '}
                        {index + 1}
                    </summary>
                    <tbody>
                        {pilots.map((pilot) => (
                            <tr key={pilot._id}>
                                <td>
                                    {[pilot.firstName, pilot.nickName && `"${pilot.nickName}"`].filter(Boolean).join(' ')}
                                </td>
                                <td>
                                    {pilot.rating * 50}
                                    {'cc'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
};

export default Pilots;

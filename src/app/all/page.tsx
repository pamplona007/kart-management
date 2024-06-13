'use client';

import { useMemo } from 'react';

import { IPilot } from '@/models/Pilot';
import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';

const MAX_PILOTS_PER_RACE = 10;
const MAX_PILOTS_PER_RACE_MINOR = 6;

type IRace = IPilot[];

const Pilots = () => {
    const { data: pilots } = useQuery<IPilot[]>({
        queryKey: ['pilots'],
        queryFn: async () => {
            const response = await fetch('/api/pilots/all');
            return response.json();
        },
    });

    const confirmedRaces: IRace[] = useMemo(() => {
        if (!pilots) {
            return [];
        }

        const racingPilots = pilots.filter((pilot) => pilot.confirmed && pilot.rating > 0);

        const majorsRacesQuantity = Math.ceil(racingPilots.length / MAX_PILOTS_PER_RACE);

        const majorsPilotsPerRace = Math.ceil(racingPilots.length / majorsRacesQuantity);

        const majorsOrganizedByRating = racingPilots.sort((a, b) => b.rating - a.rating);

        return Array.from({ length: majorsRacesQuantity }, (_, index) => {
            const start = index * majorsPilotsPerRace;
            const end = start + majorsPilotsPerRace;
            return majorsOrganizedByRating.slice(start, end);
        });
    }, [pilots]);

    const unconfimedPilots = (pilots || []).filter((pilot) => !pilot.confirmed && pilot.rating > 0);
    const notRacingPilots = (pilots || []).filter((pilot) => pilot.rating === 0);

    return (
        <div className={styles.pilots}>
            {confirmedRaces.map((pilots, index) => (
                <table key={index}>
                    <summary>
                        {'Corrida '}
                        {index + 1}
                        {' - '}
                        {pilots.length}
                        {' pilotos'}
                    </summary>
                    <tbody>
                        {pilots.map((pilot) => (
                            <tr key={pilot._id}>
                                <td>
                                    {pilot.firstName}
                                    {' '}
                                    {'"'}
                                    {pilot.nickName}
                                    {'"'}
                                </td>
                                <td>
                                    {0 !== pilot.rating
                                        ? (
                                            <>
                                                {pilot.age}
                                                {' anos'}
                                            </>
                                        )
                                        : 'Não informado'}
                                </td>
                                <td>
                                    {pilot.confirmed ? 'Confirmado' : 'Não confirmado'}
                                </td>
                                <td>
                                    {pilot.paidAmount.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </td>
                                <td>
                                    {0 !== pilot.rating
                                        ? (
                                            <>
                                                {pilot.rating * 50}
                                                {'cc'}
                                            </>
                                        )
                                        : 'Não vai correr'
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}

            <table>
                <summary>
                    {'Pilotos não confirmados'}
                </summary>
                <tbody>
                    {unconfimedPilots.map((pilot) => (
                        <tr key={pilot._id}>
                            <td>
                                {pilot.firstName}
                                {' '}
                                {'"'}
                                {pilot.nickName}
                                {'"'}
                            </td>
                            <td>
                                {0 !== pilot.rating
                                    ? (
                                        <>
                                            {pilot.age}
                                            {' anos'}
                                        </>
                                    )
                                    : 'Não informado'}
                            </td>
                            <td>
                                {pilot.confirmed ? 'Confirmado' : 'Não confirmado'}
                            </td>
                            <td>
                                {pilot.paidAmount.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </td>
                            <td>
                                {0 !== pilot.rating
                                    ? (
                                        <>
                                            {pilot.rating * 50}
                                            {'cc'}
                                        </>
                                    )
                                    : 'Não vai correr'
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <summary>
                    {'Pilotos que não vão correr'}
                </summary>
                <tbody>
                    {notRacingPilots.map((pilot) => (
                        <tr key={pilot._id}>
                            <td>
                                {pilot.firstName}
                                {' '}
                                {'"'}
                                {pilot.nickName}
                                {'"'}
                            </td>
                            <td>
                                {0 !== pilot.rating
                                    ? (
                                        <>
                                            {pilot.age}
                                            {' anos'}
                                        </>
                                    )
                                    : 'Não informado'}
                            </td>
                            <td>
                                {pilot.confirmed ? 'Confirmado' : 'Não confirmado'}
                            </td>
                            <td>
                                {pilot.paidAmount.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </td>
                            <td>
                                {0 !== pilot.rating
                                    ? (
                                        <>
                                            {pilot.rating * 50}
                                            {'cc'}
                                        </>
                                    )
                                    : 'Não vai correr'
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Page = () => {
    return (
        <Pilots />
    );
};

export default Page;

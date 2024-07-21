'use client';

import Game from './game';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './styles.css'

const totalStartedGamesCookie = 'started-games';
const totalFinishedGamesCookie = 'finished-games';

export default function HomePage() {

    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies([totalFinishedGamesCookie, totalStartedGamesCookie]);

    useEffect(() => {
        const totalStartedGamesValue = cookies[totalStartedGamesCookie];
        console.log(totalStartedGamesValue);
        if (totalStartedGamesValue != null) setStartedGames(totalStartedGamesValue);

        const totalFinishedGamesValue = cookies[totalFinishedGamesCookie] ?? 0;
        if (totalFinishedGamesValue != null) setFinishedGames(totalFinishedGamesValue);

        setTimeout(() => setLoading(false), 1000);
        
    }, []);

    const [startedGames, setStartedGames] = useState(1);
    const [finishedGames, setFinishedGames] = useState(0);

    const onRestartGameClicked = () => {
        incrementStartedGamesCount();
    }

    const onGameCompleted = () => {
        incrementFinishedGamesCount();
    }

    const incrementFinishedGamesCount = () => {
        const newTotal = finishedGames + 1;
        setFinishedGames(newTotal);
        setCookie(totalFinishedGamesCookie, newTotal);
    }

    const incrementStartedGamesCount = () => {
        const newTotal = startedGames + 1;
        setStartedGames(newTotal);
        setCookie(totalStartedGamesCookie, newTotal);
    }

    const displayLoadingText = (text, value) => {
        const loader = (<div className="loader"></div>);
        return (<h3>{text}{loading ? loader : value}</h3>);
    }

    return (
        <>
            <h1>Have fun playing Tic-Tac-Toe</h1>
            <div>
            </div>
            {displayLoadingText('Total games played to completion: ', finishedGames)}
            {displayLoadingText('Total games started: ', startedGames)}

            <Game key={startedGames} gameCompleted={onGameCompleted} />
            <button style={{ margin: 5, fontSize: '20px' }} onClick={onRestartGameClicked}>Restart Game</button>
        </>
    );
}
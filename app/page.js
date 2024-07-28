'use client';

import Game from './game';
import useGameState from './useGameState';
import './styles.css'

export default function HomePage() {

    const gameState = useGameState();

    const onRestartGameClicked = () => {
        gameState.incrementStartedGamesCount();
    }

    const onGameCompleted = () => {
        gameState.incrementFinishedGamesCount();
    }

    const displayLoadingText = (text, value) => {
        const loader = (<div className="loader"></div>);
        return (<div className='game-text'>{text}{gameState.loading ? loader : value}</div>);
    }

    const currentGameState = gameState.get();

    return (
        <div className='page'>
            <h1>Have fun playing Tic-Tac-Toe</h1>
            <div className='game-text-grid'>
                <div className='game-text-container'>
                    {displayLoadingText('Total games played: ', currentGameState.finishedGames)}
                    {displayLoadingText('Total games started: ', currentGameState.startedGames)}
                </div>

                <div className='game-tally-container'>
                    {displayLoadingText('X wins: ', currentGameState.xWins)}
                    {displayLoadingText('O wins: ', currentGameState.oWins)}
                    {displayLoadingText('Draws: ', currentGameState.draws)}
                </div>

            </div>

            <Game key={currentGameState.startedGames} gameCompleted={onGameCompleted} />
            <button className="restartButton" onClick={onRestartGameClicked}>Restart Game</button>
        </div>
    );
}
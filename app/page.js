'use client';

import Game from './game';
import useGameState from './useGameState';
import { useState, useEffect } from 'react';
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

    return (
        <div className='page'>
            <h1>Have fun playing Tic-Tac-Toe</h1>
            <div className='game-text-grid'>
                <div className='game-text-container'>
                    {displayLoadingText('Total games played: ', gameState.getFinishedGames())}
                    {displayLoadingText('Total games started: ', gameState.getStartedGames())}
                </div>

                <div className='game-tally-container'>
                    {displayLoadingText('X wins: ', 37)}
                    {displayLoadingText('O wins: ', 43)}
                    {displayLoadingText('Draws: ', 65)}
                </div>

            </div>

            <Game key={gameState.getStartedGames()} gameCompleted={onGameCompleted} />
            <button className="restartButton" onClick={onRestartGameClicked}>Restart Game</button>
        </div>
    );
}
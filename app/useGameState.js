

import { useState } from 'react';
import useCookieStorage from './useCookieStorage';

const startedGamesKey = 'startedGames';
const finishedGamesKey = 'finishedGames';

const useGameState = () => {
    const storage = useCookieStorage();
    const [gameState, setGameState] = useState({});


    const incrementStartedGamesCount = () => increment(startedGamesKey);
    const incrementFinishedGamesCount = () => increment(finishedGamesKey);

    const getStartedGames = () => getValue(startedGamesKey, 1);
    const getFinishedGames = () => getValue(finishedGamesKey, 0);

    const getValue = (key, defaultValue) => {
        const value = storage.retrieve()[key]; 
        if (value == null)
            return defaultValue;

        return value;
    }

    const increment = (key) => {
        const currentValue = getValue(key, 0);
        updateState(key, currentValue + 1);
    }

    const updateState = (key, value) => {
        const newState = storage.retrieve();
        newState[key] = value;
        setGameState(newState);

        storage.save(newState);
    }

    const loading = storage.loading;

    return {
        loading,
        getStartedGames,
        getFinishedGames,
        incrementStartedGamesCount,
        incrementFinishedGamesCount
    };
}

export default useGameState;
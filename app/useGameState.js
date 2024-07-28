

import useCookieStorage from './useCookieStorage';

const defaultKeys = {
    startedGames: 1,
    finishedGames: 0,
    xWins: 0,
    oWins: 0,
    draws: 0
}

const useGameState = () => {
    const storage = useCookieStorage();

    const incrementStartedGamesCount = () => increment('startedGames');
    const incrementFinishedGamesCount = () => increment('finishedGames');

    const get = () => {
        const gameState = storage.retrieve();

        for (let key in defaultKeys) {
            if (gameState[key] == null)
                gameState[key] = defaultKeys[key]
        }

        return gameState;
    }

    const increment = (key) => {
        const gameState = get();
        gameState[key] += 1;
        storage.save(gameState);
    }

    const loading = storage.loading;


    return {
        loading,
        get,
        incrementStartedGamesCount,
        incrementFinishedGamesCount
    };
}

export default useGameState;
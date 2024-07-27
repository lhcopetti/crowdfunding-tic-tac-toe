
'use client';
import { useState } from 'react';


const useTictactoe = () => {
    const initialBoard = Array(3).fill([...Array(3).fill('')]);
    const [board, setBoard] = useState(initialBoard);

    const players = ['X', 'O'];
    const [playerIndex, setPlayerIndex] = useState(0);

    const [winner, setWinner] = useState(null);

    const getCurrentPlayer = () => players[playerIndex];

    const updateCurrentPlayer = () => {
        setPlayerIndex((playerIndex + 1) % players.length);
    }

    const copyBoard = () => board.map(x => [...x]);

    const updateBoard = (x, y, player) => {
        const newBoard = copyBoard();
        newBoard[x][y] = player;
        setBoard(newBoard);
        return newBoard;
    }

    const findWinner = (board) => {

        for (let i = 0; i < 3; ++i) {
            checkWinCondition(board, i, 0, [0, +1]);
            checkWinCondition(board, 0, i, [+1, 0]);
        }
        checkWinCondition(board, 2, 0, [-1, +1]);
        checkWinCondition(board, 0, 0, [+1, +1]);
    }

    const checkWinCondition = (board, x, y, direction) => {
        const steps = 3;
        const winningCells = [];

        const initialValue = board[x][y];
        if (initialValue == '')
            return null;

        var position = [x, y];
        winningCells.push(position);
        for (let i = 0; i < steps - 1; i++) {

            const [newX, newY] = [position[0] + direction[0], position[1] + direction[1]];
            if (initialValue != board[newX][newY]) {
                return null;
            }

            position = [newX, newY];
            winningCells.push(position);
        }

        console.log(`Found winner with (${x}, ${y}) and direction: ${direction}, player: ${getCurrentPlayer()}`);
        setWinner({ player: initialValue, cells: winningCells });
    }


    const playMove = (x, y) => {

        if (getGameEnded()) {
            console.log(`The game has already ended.`);
            return;
        }

        if (board[x][y] != '') {
            console.log(`The cell at position (${x}, ${y}) is not empty`);
            return;
        }

        const newBoard = updateBoard(x, y, getCurrentPlayer());
        findWinner(newBoard);
        updateCurrentPlayer();
    }

    const getCells = copyBoard

    const getGameEnded = () => winner != null || board.flat().every(x => x);

    const getWinnerData = () => winner

    return {
        playMove,
        getCells,
        getCurrentPlayer,
        getGameEnded,
        getWinnerData
    };

}

export default useTictactoe;
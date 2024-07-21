
'use client';
import next from 'next';
import { useState } from 'react';


const useTictactoe = () => {
    const initialBoard = [];
    for (let i = 0; i < 9; i++) initialBoard[i] = '';

    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const [winner, setWinner] = useState(null);

    const players = ['O', 'X'];
    const getCurrentPlayer = () => players[(players.indexOf(currentPlayer) + 1) % players.length];

    const updateCurrentPlayer = () => {
        setCurrentPlayer(getCurrentPlayer());
    }

    const updateBoard = (index, player) => {
        const newBoard = board.map((v, i) => i == index ? player : v);
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

        const initialValue = board[x * 3 + y];
        if (initialValue == '')
            return null;

        var position = [x, y];
        winningCells.push(position);
        for (let i = 0; i < steps - 1; i++) {

            const [newX, newY] = [position[0] + direction[0], position[1] + direction[1]];
            const newIndex = newX * 3 + newY;
            if (initialValue != board[newIndex]) {
                return null;
            }

            position = [newX, newY];
            winningCells.push(position);
        }

        console.log(`Found winner with (${x}, ${y}) and direction: ${direction}, player: ${currentPlayer}`);
        setWinner({ player: initialValue, cells: winningCells });
    }


    const playMove = (x, y) => {

        if (getGameEnded()) {
            console.log(`The game has already ended.`);
            return;
        }

        const cellIndex = x * 3 + y;

        if (board[cellIndex] != '') {
            console.log(`The cell at position (${x}, ${y}) is not empty`);
            return;
        }

        const newBoard = updateBoard(cellIndex, currentPlayer);
        findWinner(newBoard);
        updateCurrentPlayer();
    }

    const getCellAt = (x, y) => board[x * 3 + y];

    const getGameEnded = () => winner != null || board.every(x => x);

    const getWinnerData = () => winner

    return {
        playMove,
        getCellAt,
        getCurrentPlayer,
        getGameEnded,
        getWinnerData
    };

}

export default useTictactoe;
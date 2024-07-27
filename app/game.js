'use client';
import Square from './square';
import useTictactoe from './useTictactoe';
import { useEffect } from 'react';


export default function Game(props) {
    const tictactoe = useTictactoe();

    const onCellClicked = (x, y) => {
        console.log(`Cell clicked at position: (${x}, ${y})`);
        tictactoe.playMove(x, y);
    }

    useEffect(() => {

        if (tictactoe.getGameEnded())
            props.gameCompleted();

    }, [tictactoe.getGameEnded()]);

    const isWinnerCell = (x, y) => {
        if (tictactoe.getWinnerData() == null)
            return false;

        return tictactoe.getWinnerData().cells.some(element => element[0] == x && element[1] == y);
    }

    const squares = [];
    const cells = tictactoe.getCells();
    for (let i = 0; i < 9; i++) {
        const x = Math.floor(i / 3);
        const y = i % 3;
        const square = <Square key={i} x={x} y={y} cellClicked={onCellClicked} currentPlayer={tictactoe.getCurrentPlayer()} value={cells[x][y]} isWinner={isWinnerCell(x, y)} />;
        squares.push(square);
    }

    const renderGameResult = () => {

        if (tictactoe.getWinnerData() != null) {
            return `${tictactoe.getWinnerData().player} won!`;
        }

        if (tictactoe.getGameEnded()) {
            return "A draw!";
        }

        return "-";
    };


    return (
        <>
            <div className="currentPlayer">Player: {tictactoe.getCurrentPlayer()}</div>
            <div style={{ margin: 5 }}></div>
            <div className="board">
                {squares}
            </div>
            <div style={{ margin: 5 }}></div>
            <div style={{ height: '35px', fontSize: '30px'}}> 
                The result is: { renderGameResult() }
            </div>
            <div style={{ margin: 5 }}></div>
        </>
    );
}
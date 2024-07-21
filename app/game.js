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

        if (tictactoe.hasGameEnded)
            props.gameCompleted();

    }, [tictactoe.hasGameEnded]);

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
            return (`Winner is: ${tictactoe.getWinnerData().player}`);
        }

        if (tictactoe.getGameEnded()) {
            return ("Game resulted in a draw");
        }

        return "";
    };


    return (
        <>
            <div className="currentPlayer">Player: {tictactoe.getCurrentPlayer()}</div>
            <div style={{ margin: 5 }}></div>
            <div className="board">
                {squares}
            </div>
            <div style={{ margin: 5 }}></div>
            <div style={{ height: '35px', fontSize: '30px'}}> {
                renderGameResult()
            }
            </div>
            <div style={{ margin: 5 }}></div>
        </>
    );
}
'use client';
import Square from './square';
import useTictactoe from './useTictactoe';
import { useEffect } from 'react';


//end the game if there's no winners
//add point class
//use cookies?
//
//
//add bootstrap or similar for button?
//make the rest of the text responsive and center everything

export default function Game(props) {
    const tictactoe = useTictactoe();

    const onCellClicked = (x, y) => {
        console.log(`Cell clicked at position: (${x}, ${y})`);
        tictactoe.playMove(x, y);
    }

    useEffect(() => {

        if (tictactoe.getWinner() != null)
            props.gameCompleted();

    }, [tictactoe.getWinner()]);

    const isWinnerCell = (x, y) => {
        return tictactoe.getWinningCells().some(element => element[0] == x && element[1] == y);
    }

    const cells = [];
    for (let i = 0; i < 9; i++) {
        const x = Math.floor(i / 3);
        const y = i % 3;
        const square = <Square key={i} x={x} y={y} cellClicked={onCellClicked} currentPlayer={tictactoe.getCurrentPlayer()} value={tictactoe.getCellAt(x, y)} isWinner={isWinnerCell(x, y)} />;
        cells.push(square);
    }


    return (
        <>
            <div className="currentPlayer">Player: {tictactoe.getCurrentPlayer()}</div>
            <div style={{ margin: 5 }}></div>
            <div className="board">
                {cells}
            </div>
            <div style={{ margin: 5 }}></div>
            <div style={{ height: '35px', fontSize: '30px'}}> {
                tictactoe.getWinner() && `Winner is: ${tictactoe.getWinner()}`
            }
            </div>
            <div style={{ margin: 5 }}></div>
        </>
    );
}
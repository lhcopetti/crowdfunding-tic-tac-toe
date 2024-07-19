
export default function Square(props) {
    const x = props.x;
    const y = props.y;
    const isWinner = props.isWinner;

    const handleCellClick = () => {
        props.cellClicked(x, y);
    }

    const classes = `square ${isWinner ? "square-winner" : ""}`;
    return (<div onClick={handleCellClick} className={classes}>{props.value}</div>);
}
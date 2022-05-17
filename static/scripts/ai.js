function ai(board, allowedTinyGame) {
	let allowedBoard = board[allowedTinyGame];
	let possibleTinySquares = allowedBoard.filter(num => num == 0);
	console.log(possibleTinySquares)
	return [allowedTinyGame, Math.floor(Math.random()*possibleTinySquares.length)];
}

export default ai;
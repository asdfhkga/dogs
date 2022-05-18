const player1color = '#ff0000';

const player2color = '#0000ff';

var currentPlayer = 1;

var allowedTinyGame = "all"

var matrix = [ // 9x9 matrix where each list is a tiny game
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]
]; // 0 is unplayed, -1 is tied, 1 and 2 are players.

var tinyGameMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function winner(matrix) { // returns winner of 2x2 matrix, or null if there is no winner
	if (matrix[0] === matrix[1] && matrix[0] === matrix[2] && matrix[0] !== 0) {
		return matrix[0];
	}
	if (matrix[3] === matrix[4] && matrix[3] === matrix[5] && matrix[3] !== 0) {
		return matrix[3];
	}
	if (matrix[6] === matrix[7] && matrix[6] === matrix[8] && matrix[6] !== 0) {
		return matrix[6];
	}
	if (matrix[0] === matrix[3] && matrix[0] === matrix[6] && matrix[0] !== 0) {
		return matrix[0];
	}
	if (matrix[1] === matrix[4] && matrix[1] === matrix[7] && matrix[1] !== 0) {
		return matrix[1];
	}
	if (matrix[2] === matrix[5] && matrix[2] === matrix[8] && matrix[2] !== 0) {
		return matrix[2];
	}
	if (matrix[0] === matrix[4] && matrix[0] === matrix[8] && matrix[0] !== 0) {
		return matrix[0];
	}
	if (matrix[2] === matrix[4] && matrix[2] === matrix[6] && matrix[2] !== 0) {
		return matrix[2];
	}
	return null
}

function move(player, pos) {
	matrix[pos[0]][pos[1]] = player;

	// get jquery object of clicked element
	let clickedSquare = $(".bigGame").children().eq(pos[0]).children().eq(pos[1]);

	clickedSquare.css("background-color", currentPlayer == 1 ? player1color : player2color);

	// check for winner for each tiny game
	for (const i in matrix) {
		if (winner(matrix[i]) && !tinyGameMatrix[i]) { // if new winner of tiny game is found

			// change all entries in tiny game to winner's number
			for (const j in matrix[i]) {
				matrix[i][j] = player;
			}

			tinyGameMatrix[i] = player;

			clickedSquare.parent().children()
				.css("background-color", currentPlayer == 1 ? player1color : player2color);
		}

		else if (matrix[i].every(x => x !== 0) && !tinyGameMatrix[i]) { // if tie in tiny game (all squares are used)
			
			for (const j in matrix[i]) {
				matrix[i][j] = -1;
			}

			tinyGameMatrix[i] = -1;
		}
	}

	// checks for winner of big game
	if (winner(tinyGameMatrix)) {
		alert("winner is " + player);
	}

	else if (tinyGameMatrix.every(x => x !== 0)) {
		alert("tie")
	}

	// finding allowedTinyGame for next move
	if (!tinyGameMatrix[pos[1]]) {
		allowedTinyGame = pos[1];
	}
	else {
		allowedTinyGame = "all";
	}

	// resets highlighting of tiny games
	$(".tinyGame").css("border", "2px solid white");

	// highlight color of next allowed tiny game
	if (allowedTinyGame !== "all") {
		$(".bigGame").children().eq(allowedTinyGame).css("border", "10px solid white");
	}
	else {
		for (const i in tinyGameMatrix) {
			if (!tinyGameMatrix[i]) {
				$(".bigGame").children().eq(i).css("border", "10px solid white");
			}
		}
	}

	currentPlayer = currentPlayer == 1 ? 2 : 1; // switch next player
	return allowedTinyGame;
}

$(".tinySquare").click(function() {
	let tinySquareIndex = $(this).index();
	let tinyGameIndex = $(this).parent().index();
	if (!matrix[tinyGameIndex][tinySquareIndex] && (allowedTinyGame == tinyGameIndex || allowedTinyGame == 'all')) {
		move(currentPlayer, [tinyGameIndex, tinySquareIndex]);
	}
});

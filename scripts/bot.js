function copyMatrix(matrix) {
	copied = [];
	for (const i of matrix) {
		copied.push([...i]);
	}
	return copied;
}

function isAvailable(matrix) {
	// detects if tiny game can be the allowedTinyGame
	return matrix.includes(0);
}

function Board(matrix, allowedTinyGame) {
	this.matrix = matrix;
	this.allowedTinyGame = allowedTinyGame;

	this.generatePossibleBoards = function(player) {
		possibleBoards = [];
		if (allowedTinyGame == 'all') {
			// for i in matrix that is 0, make a new Board object where i is 2 with correct allowedTinyGame
			for (const tinyGame in this.matrix) {
				for (const tinySquare in tinyGame) {
					if (this.matrix[tinyGame][tinySquare] == 0) {
						let matrix_clone = copyMatrix(matrix);
						matrix_clone[tinyGame][tinySquare] = player;
						if (isAvailable(matrix_clone[tinyGame][tinySquare])) {
							possibleBoards.push(new Board(matrix_clone, tinySquare));
						}

						else {
							possibleBoards.push(new Board(matrix_clone, 'all'));
						}
					}
				}
			}
		}

		else {
			// for i in this.matrix[allowedTinyGame] that is 0, make a new Board object where i is 2 with correct allowedTinyGame
			for (const tinySquare in this.matrix[allowedTinyGame]) {
				if (this.matrix[allowedTinyGame][tinySquare] == 0) {
					let matrix_clone = copyMatrix(matrix); // creates clone because arrays are passed by refrence
					matrix_clone[allowedTinyGame][tinySquare] = player;
					if (isAvailable(matrix_clone[tinySquare])) {
						possibleBoards.push(new Board(matrix_clone, tinySquare));
					}

					else {
						possibleBoards.push(new Board(matrix_clone, 'all'));
					}
				}
			}
		}
		return possibleBoards
	}

	this.evaluateBoard = function() {

	}
}

function prune(BoardArray) { // alpha beta pruning

}

function bot(matrix, allowedTinyGame) {
	const maxBoards = 50;
	const maxDepth = 5;
	var boards = [new board(matrix, allowedTinyGame)];
	for (int i = 0; i < maxDepth; ++i) {
		let generatedBoards = [];
		for (const board of boards) {
			let possibleBoards = generatePossibleBoards(board);
			generatedBoards = generatedBoards.concat(possibleBoards);
		}
	}
}

var exampleMatrix = [
	[0, 0, 0, 2, 1, 0, 0, 0, 0],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1],
	[1, 2, 1, 0, 1, 2, 2, 1, 0],
	[2, 2, 2, 2, 2, 2, 2, 2, 2],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 1, 1, 2, 1, 2, 1, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1]
];

bot(exampleMatrix, 1);
function copyMatrix(matrix) {
	copied = [];
	for (const i of matrix) {
		copied.push([...i]);
	}
	return copied;
}

function isAvailable(arr) {
	// detects if tiny game can be the allowedTinyGame
	return arr.includes(0);
}

function Board(matrix, allowedTinyGame, depth, isMaximizing) {
	this.matrix = matrix;
	this.allowedTinyGame = allowedTinyGame;
	this.depth = depth
	this.isMaximizing = true;

	this.generatePossibleBoards = function() {
		possibleBoards = [];
		if (allowedTinyGame == 'all') {
			// for i in matrix that is 0, make a new Board object where i is player number with correct allowedTinyGame
			for (const tinyGameIndex in this.matrix) {
				for (const tinySquareIndex in tinyGameIndex) {
					if (this.matrix[tinyGameIndex][tinySquareIndex] == 0) {
						let matrix_clone = copyMatrix(matrix);
						matrix_clone[tinyGameIndex][tinySquareIndex] = this.isMaximizing ? 2 : 1;
						if (isAvailable(matrix_clone[tinySquareIndex])) {
							possibleBoards.push(new Board(matrix_clone, tinySquareIndex, this.depth - 1, !this.isMaximizing));
						}

						else {
							possibleBoards.push(new Board(matrix_clone, 'all', this.depth - 1, !this.isMaximizing));
						}
					}
				}
			}
		}

		else {
			// for i in this.matrix[allowedTinyGame] that is 0, make a new Board object where i is player number with correct allowedTinyGame
			for (const tinySquareIndex in this.matrix[allowedTinyGame]) {
				if (this.matrix[allowedTinyGame][tinySquareIndex] == 0) {
					let matrix_clone = copyMatrix(matrix); // creates clone because arrays are passed by refrence
					matrix_clone[allowedTinyGame][tinySquareIndex] = this.isMaximizing ? 2 : 1;
					if (isAvailable(matrix_clone[tinySquareIndex])) {
						possibleBoards.push(new Board(matrix_clone, tinySquareIndex, this.depth - 1, !this.isMaximizing));
					}

					else {
						console.log(!this.isMaximizing, this.depth - 1)
						possibleBoards.push(new Board(matrix_clone, 'all', this.depth - 1, !this.isMaximizing));
					}
				}
			}
		}
		return possibleBoards
	}

	this.children = this.depth != 0 ? this.generatePossibleBoards() : [];

	this.evaluateBoard = function() {

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

var board = new Board(exampleMatrix, 7, 1, true);
console.log(board)
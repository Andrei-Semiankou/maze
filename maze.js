let maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];


const mazeLength = maze.length;
const columnLength = maze[0].length;


let startPosition = {};
let exitPositions = [];

let isExitExist = false;

let newMaze = maze.map((row, rowIndex) => {
	let newRow = row.map((column, columnIndex) => {

  	//find startPosition
		if (column === '0') {
			startPosition  = {y: rowIndex, x: columnIndex}
		}

		//find '+' elem in border
		if(
			( rowIndex === 0 ||
       	rowIndex === mazeLength - 1 ||
				columnIndex === 0 ||
				columnIndex === columnLength -1
			) && column === '+') {
    	return 'exit'
    }
		return column
	});
  return newRow
});

newMaze.forEach((row, rowIndex) =>
	row.forEach((column, columnIndex) => {
  	if(column === 'exit')	{
			isExitExist = true;
			exitPositions.push({y: rowIndex, x: columnIndex})
		}
  	}
	)
)

if(!isExitExist) {
	console.log('no error from maze');
}


function getValidSib(coord){
	let {x,y} = coord;

	let coords = [];
	
	if(newMaze[y-1] !== undefined) {
		coords.push({x: x, y: y-1, val: newMaze[y-1][x]})
	}
	if(newMaze[y+1] !== undefined) {
		coords.push({x: x, y: y+1, val: newMaze[y+1][x]})
	}
	if(newMaze[y][x-1] !== undefined) {
		coords.push({x: x-1, y: y, val: newMaze[y][x-1]})
	}
	if(newMaze[y][x+1] !== undefined) { 
		coords.push({x: x+1, y: y, val: newMaze[y][x+1]})
	}
	return coords.filter(el => el.val === '+')
}


let sublings = getValidSib(startPosition);

if (sublings.length) {
	sublings.forEach((current, index) => {
		let isSolved = current.x === exitPositions[0].x && current.y === exitPositions[0].y;
    let notVisited = newMaze[current.y][current.x] !== '9';
    
    if(isSolved) {
			return true;
		}
	})

}



console.log();

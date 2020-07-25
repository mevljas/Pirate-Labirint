// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
var cols, rows;
var cellSize = 80; //velikost kvadrata - celice
var cells = []; //array of cells

var currentCell; // current cells - cell which is currently visited

var stack = []; //array, stacking things into it with push
//pop() taking the lates thing out of stack
//last thing in is the first thing out




function setupLab() {
    cols = floor(width / cellSize); //stolpci =  velikost zaslona / velikost kvadratka - celice
    rows = floor(height / cellSize); // vrstice , floor - zaokrozimo da ne pride do napak

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j); //za vsako celico nrdimo object
            cells.push(cell); //celico damo v array

        }
    }

    currentCell = cells[0]; //we are starting at cell 0
}

function drawLab() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].show(); //narisemo celice
    }

    currentCell.visited = true; //mark cell as visited, so we wont visit it again
    currentCell.highlight();
    // STEP 1
    var nextCell = currentCell.checkNeighbors(); //pick random neighbor
    if (nextCell) { //if neighbor is not undefined
        nextCell.visited = true; //mark it as visited

        // STEP 2
        stack.push(currentCell); //add curretn cell to the stack

        // STEP 3
        removeWalls(currentCell, nextCell); //remove the wall(2 walls) between current and next cell

        // STEP 4
        currentCell = nextCell; //choose enighbour for current cell - next one
    } else if (stack.length > 0) { //if there is no neighbours -> pop - go abck and find different path
        currentCell = stack.pop(); //make it a current cell
        //pop() method removes the last element of an array, and returns that element.
    } else {
        currentCell.show(); //narise orignalno odzadnje - da ne kaze hilghit
        drawingLab = false;
        savedLabirint = get(0, 0, 800, 800); //save background
        oceanSound.stop();
        pause = false;
        startTime = floor(millis() / 1000);
        PirateSound.setLoop(true);
        PirateSound.play(0, 1, 0.3); //  time (0 = now), and rate (1 = normal playback) in addition to the amplitude


    }
}




function index(i, j) { //returns position of the cell in arry 
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) { //checks if index is invalid
        return -1; //undifined
    }
    return i + j * cols; 
}


function removeWalls(a, b) { //takes 2 cells and removes the walls between them
    var x = a.i - b.i; //difference between cells
    if (x == 1) { //a > b - moving left
        a.walls[3] = false; //remove a- left wall
        b.walls[1] = false; //remove b- right wall
    } else if (x == -1) { // a < b - moving right
        a.walls[1] = false; //remove a- right wall
        b.walls[3] = false; //remove b- left wall
    }
    var y = a.j - b.j;
    if (y == 1) { //a > b - moving up
        a.walls[0] = false; //remove a- top wall
        b.walls[2] = false; //remove b- bottom wall
    } else if (y == -1) { // a < b - moving down
        a.walls[2] = false; //remove a- bottom wall
        b.walls[0] = false; //remove b- top wall
    }
}
//cell object
//i - column
//j - row
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; //currenlty active walls - top, right, bottom, left
    this.visited = false; //if cell was already visited - cell should be visited only once

    this.checkNeighbors = function() { //check near cells
        var neighbors = [];

         // index returns position of the cell in arry 

        var top = cells[index(i, j - 1)]; //top neighbor
        var right = cells[index(i + 1, j)]; //right neighbor
        var bottom = cells[index(i, j + 1)]; //bottom neighbor
        var left = cells[index(i - 1, j)]; //left neighbor


        if (top && !top.visited) { //checks if top is not null/undifined and if it hasnt been visited
            neighbors.push(top); //if top hasnt been visited -  add it 2 the array neighbors
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) { //if aray is not empty
            var r = floor(random(0, neighbors.length)); //pick a random neighbor between 0 and a array's length
            return neighbors[r];
        } else {
            return undefined; //array is empty
            //undefined = A variable that has not been assigned a value is of type undefined.
        }


    }

    //pogleda ce je beiu enigbhor ze visited in ce nima zida
    this.checkNeighborsWalls = function() {
        var neighbors = [];

        var top = cells[index(i, j - 1)];
        var right = cells[index(i + 1, j)];
        var bottom = cells[index(i, j + 1)];
        var left = cells[index(i - 1, j)];

        if (top && !top.visited && !top.walls[2]) {
            neighbors.push(top);
        }
        if (right && !right.visited && !right.walls[3]) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited && !bottom.walls[0]) {
            neighbors.push(bottom);
        }
        if (left && !left.visited && !left.walls[1]) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            //array se zacen z 1, azto ni treba dat -1
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }

    }


    this.highlight = function() { //kvadratek ki ozancuje trenutno pozicijo
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        noStroke(); //ne rise roba
        fill(30,144,255); 
        rect(x, y, cellSize, cellSize);


    }



    //vrne pozicjo playerja glede na grid
    this.getNewPlayerPosition = function() {
    

        newPlayerX = this.i * cellSize + 20; //ker player je na sredini celice oz ni na robu
        newPlayerY = this.j * cellSize + 20;
    }

    this.show = function() {

        var x = this.i * cellSize; //celica 0 * width = 0, celica 1 * width = width
        var y = this.j * cellSize;

        if (this.visited) { //if the is visited - color it
            noStroke(); //ne rise roba
            fill("#01b2d4");
            rect(x, y, cellSize, cellSize);
        }

        stroke(239, 221, 111); //lines - sand
        strokeWeight(4); //debelina crte
        if (this.walls[0]) { //top wall
            line(x, y, x + cellSize, y); //draw top border of the cell
        }
        if (this.walls[1]) { //right wall
            line(x + cellSize, y, x + cellSize, y + cellSize); //draw right border of the cell
        }
        if (this.walls[2]) { //bottom wall
            line(x + cellSize, y + cellSize, x, y + cellSize); //draw bottom border of the cell
        }
        if (this.walls[3]) { //left wall
            line(x, y + cellSize, x, y); //draw left border of the cell
        }


    }
}
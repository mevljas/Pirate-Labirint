var stackSolve = []; //pod od chesta do zacetka (0,0)
var solve = false;
var drawSolved = false;

// damo use na not visited kader koncamo generirat albiritn in prede zacenmo resavat
function setAllToNotVisited() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].visited = false;
    }
}


function solveMaze() {
    var solveTheMaze = true;
    while (solveTheMaze) {

        currentCell.visited = true; // so we dotn come here again

        var nextCell = currentCell.checkNeighborsWalls(); //vrne katero celico nej obisce naslednjo ( ki ni bila se visited in me njimi ni zida)

        //ce nekaj vrne
        if (nextCell) {
            nextCell.visited = true;

            stack.push(currentCell);
            currentCell = nextCell;

            //pogleda ce smo ze na lokaciji chesta
            if (currentCell.i == goldChestCell.i && currentCell.j == goldChestCell.j) {
                stack.push(currentCell); //se enkrat push ker se drugace ne izvede za current cell

                //naredo kopijo stacka (za izris)
                for (var i = 0; i < stack.length; i++) {
                    stackSolve[i] = stack[i];
                }
            }

            //ce se zabije v zid gremo nzaj in provmao senkrt
            //ce en vrene nic pomeni da nima kam it - treba it nazaj
        } else if (stack.length > 0) {
            currentCell = stack.pop(); //odstrani zadnjo

            //smo prsli na zacetek in smo koncali
        } else if (stack.length == 0) {
            solve = false;
            drawSolved = true;
            break;
        }


    }
}
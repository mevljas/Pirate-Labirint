var collisionColors = new Image();
var canvasWidth = 800;
var canvasHeight = 800;
var savedLabirint = new Image();
var collisionColorsLength;
var goldChestImg = new Image();
var goldChestX = 100;
var goldChestY = 500;
var goldChestWidth = 50;
var goldChestHeight = 50;
var goldChestStatus = true;
var drawingLab = true; //drawing lab right now
var shipsSunken = 0;
var goldenChestsFound = 0;
var timePassed = 0;
var oceanSound;
var PirateSound;
var canonSound;
var shipHit;
var goldenChestsSound;
var waterImg = new Image();
var explosionImg = new Image();
var explosionTime;  //for timing explosions
var pause = true; //game paused
var playerName;
var startTime; //čas od začetka igranja playerya, ne od začetka izvajanja programa! - za racunanje currentTIme
var scoreBoard = []; //aray for scores

//lokacijo zakalda - finish
var goldChestCell; // locaton on grid

var drawSolvedStackPointer = 0; //curretn drawing cell - stevec

var playing = true; //allowed to play?







function setup() {
    var myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent('canvas');
    frameRate(30); //select framerate
    setupLab();
    enemy1 = new enemy(340, 500);
    enemy2 = new enemy(500, 200);
    enemy3 = new enemy(650, 750);
    enemy4 = new enemy(10, 500);
    enemy5 = new enemy(10, 10);
    enemy5 = new enemy(410, 350);
    enemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
    document.getElementById("ships").innerHTML = "Ships sunken: " + shipsSunken + "/" + enemies.length;
    document.getElementById("treasures").innerHTML = "Treasures found: " + goldenChestsFound + "/1";

}




function draw() {

    //loop
    
    if (drawingLab) {
        document.getElementById("time").innerHTML = "Time: 0 s";
        drawLab(); //draw labirint
    } else {
        set(0, 0, savedLabirint); //set labrint as bacground
        image(playerImg, playerX, playerY, playerWidth, playerHeight); //draw player
        document.getElementById("time").innerHTML = "Time passed: " + (floor(millis() / 1000) - startTime) + " s";
        
        //draw goldchest
        if (goldChestStatus == true) {
            image(goldChestImg, goldChestX, goldChestY, goldChestWidth, goldChestHeight);
        }
        if (playing) {
            playGame(); //all the things game needs to be looped
        } else if (solve) {
            getGoldenChestCell(); //gold chest cell location
            solveMaze(); 
            currentCell = goldChestCell; //trenutno pozicijo da na pozicjo kjer je chest - zaradi poznejsega risanja
        } else if (drawSolved) {
            drawSolvedGame();
            //move boat to the chest
        }

    }


}

function drawSolvedGame() {
    var tempPlayerSpeed = AvtomaticPlayerSpeed;
    //preverimo tud ce newplayerx ni undenified in ce nismo se na cilju
    if (playerX != newPlayerX && newPlayerX || playerY != newPlayerY && newPlayerX) {
        //vedno preverimo tudi ce nebomo sli cez cilj
        if (playerX < newPlayerX) {
            if (playerX + AvtomaticPlayerSpeed > newPlayerX)
                tempPlayerSpeed = newPlayerX - playerX;
            playerX += tempPlayerSpeed;
            playerImg = playerImgRight;
        } else if (playerX > newPlayerX) {
            tempPlayerSpeed = AvtomaticPlayerSpeed;
            if (playerX - AvtomaticPlayerSpeed < newPlayerX)
                tempPlayerSpeed = playerX - newPlayerX;
            playerX -= tempPlayerSpeed;
            playerImg = playerImgLeft;
        } else if (playerY < newPlayerY) {
            tempPlayerSpeed = AvtomaticPlayerSpeed;
            if (playerY + AvtomaticPlayerSpeed > newPlayerY)
                tempPlayerSpeed = newPlayerY - playerY;
            playerY += tempPlayerSpeed;
            playerImg = playerImgDown;
        } else if (playerY > newPlayerY) {
            tempPlayerSpeed = AvtomaticPlayerSpeed;
            if (playerY - AvtomaticPlayerSpeed < newPlayerY)
                tempPlayerSpeed = playerY - newPlayerY;
            playerY -= tempPlayerSpeed;
            playerImg = playerImgUp;
        }
        //preverimo ce smo nasli chest
        playerGoldChestColllision();
        
        
        

        if(goldenChestsFound == 1 && shipsSunken == enemies.length){
            showWin();
        }

        //preverimo ce nismo se prisli se do konca stacka
    } else if (drawSolvedStackPointer < stackSolve.length) {

        //dobimo cell
        currentCell = stackSolve[drawSolvedStackPointer]; //zadnji cell

        currentCell.getNewPlayerPosition(); //nova pozicija playerya - new cell
        drawSolvedStackPointer++; //stevec
    } else {
        drawSolved = false; // smo prsi do konca - koncamo risat
        frameRate(60);
    }
}


function playGame() {
    
    //show player lives - hearts
    switch(playerLives){
        case 2: playerLives3.style.visibility = 'hidden';
            break;
        case 1: playerLives2.style.visibility = 'hidden';
            break;
        case 0: playerLives1.style.visibility = 'hidden';
            break;
            
    }
    
    if (goldenChestsFound == 1 && shipsSunken == enemies.length) {
        showWin();
        getLocalStorage();
        setLocalStorage(floor(millis() / 1000));
    } else if (playerLives <= 0) {
        showLose();
        getLocalStorage();
        setLocalStorage(floor(millis() / 1000));
    }

    if (playerBullet != null && playerBullet.status) { //check if bullet is not null anf if its active
        moveBullet(playerBullet);
        image(canonBall, playerBullet.x, playerBullet.y, playerBullet.width, playerBullet.height);
    }
    //loopa skozie vse enmije
    for (var i = 0; i < enemies.length; i++) {

        if (enemies[i].status) {
            image(enemyImg, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        } else if (enemies[i].explosion && ((floor(millis() / 1000)) - explosionTime) < 3) { //ce enemy explodira in to ne traja vec kot 3 s
            image(explosionImg, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        } else {
            enemies[i].explosion = false;
        }

        //preveri ce ima bullet in ce je active
        if (enemies[i].bullet != null && enemies[i].bullet.status != false) {
            enemies[i].willShoot = false;
            moveBullet(enemies[i].bullet);
            image(canonBall, enemies[i].bullet.x, enemies[i].bullet.y, enemies[i].bullet.width, enemies[i].bullet.height);
        } else if (!enemies[i].willShoot && enemies[i].status) { //ce nima namena streljat in je enemy active
            enemies[i].willShoot = true; //bo streljal
            enemies[i].bulletTimeout = setTimeout(makeBullet, 3000, enemies[i]); //prirpavi bullet cez 3 s
        } else if (!enemies[i].status && enemies[i].bulletTimeout != null) { //ko je enemy unicen, bullet neha leteti
            clearTimeout(enemies[i].bulletTimeout);
        }
    }
}

function findGoldChest() {
    if(!drawingLab){
        document.getElementById("najdiZaklad").disabled = true;
        //gremo na zacetek
        playerCell(); //doloc kje je player v gridu
        setAllToNotVisited(); //all cells to not visited, zaradi pozenjsega resevanja
        solve = true;
        playing = false;
        shipsSunken = enemies.length; //potopimo vse ladje
    }
    


}
//dobi celico v kateri je player
function playerCell() {
    for (var i = 0; i < cells.length; i++) {
        if (playerX >= cells[i].i * cellSize && playerX <= cells[i].i * cellSize + cellSize && playerY >= cells[i].j * cellSize && playerY <= cells[i].j * cellSize + cellSize) {
            currentCell = cells[i]; //v tej celiic je player, od tu se zacnemo premikati
            break;
        }

    }
}

//dobi celico v kateri je goldchest
function getGoldenChestCell() {
    for (var i = 0; i < cells.length; i++) {
        if (goldChestX >= cells[i].i * cellSize && goldChestX <= cells[i].i * cellSize + cellSize && goldChestY >= cells[i].j * cellSize && goldChestY <= cells[i].j * cellSize + cellSize) {
            goldChestCell = cells[i];
            break;
        }

    }
}

function getLocalStorage() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Retrieve
        var retrievedData = localStorage.getItem("scoreBoard");
        if (retrievedData != null) {
            scoreBoard = JSON.parse(retrievedData); //convert to array
        }

    }
}


function setLocalStorage(time) {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        scoreBoard.push(playerName + " " + time); //save
        // Store
        // converts to string and save
        localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
    }
}




function keyPressed() {
    if (!pause) {
        collisionColorsLength = 4 * (playerWidth * playerHeight); //obomcje ki ga bomo pregledovali

        switch (keyCode) {

            // Left arrow.
            case 37:
                playerImg = playerImgLeft;
                playerX = playerX - playerSpeed;
                collisionColors = get(playerX, playerY, playerWidth, playerHeight); //dobi sliko obomcja
                collisionColors.loadPixels(); //Loads the pixel data for the display window into the pixels[] array

                if (playerX < 0 || LabCollision() || playerEnemyCollision() || playerGoldChestColllision()) {
                    playerX = playerX + playerSpeed;
                }
                break;

                // Right arrow.
            case 39:
                playerImg = playerImgRight;
                playerX = playerX + playerSpeed;
                collisionColors = get(playerX, playerY, playerWidth, playerHeight);
                collisionColors.loadPixels();
                if (playerX + playerWidth > canvasWidth || LabCollision() || playerEnemyCollision() || playerGoldChestColllision()) {
                    playerX = playerX - playerSpeed;
                }
                break;

                // Down arrow
            case 40:
                playerImg = playerImgDown;
                playerY = playerY + playerSpeed;
                collisionColors = get(playerX, playerY, playerWidth, playerHeight);
                collisionColors.loadPixels();
                if (playerY + playerHeight > canvasHeight || LabCollision() || playerEnemyCollision() || playerGoldChestColllision()) {
                    playerY = playerY - playerSpeed;
                }
                break;

                // Up arrow
            case 38:
                playerImg = playerImgUp;
                playerY = playerY - playerSpeed;
                collisionColors = get(playerX, playerY, playerWidth, playerHeight);
                collisionColors.loadPixels();
                if (playerY < 0 || LabCollision() || playerEnemyCollision() || playerGoldChestColllision()) {
                    playerY = playerY + playerSpeed;
                }
                break;

        }


    }

}

function mouseClicked() {
    if (!pause) {
        if (playerBullet == null || !playerBullet.status) {
            if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
                canonSound.play();
                playerBullet = new Bullet(playerX + playerWidth / 2, playerY + playerHeight / 2);
                playerBullet.status = true;
                var bulletTargetX = mouseX; //ciljni x
                var bulletTargetY = mouseY;

                var tx = bulletTargetX - playerBullet.x; //razlika
                var ty = bulletTargetY - playerBullet.y; 

                var distance = Math.sqrt(tx * tx + ty * ty); //distance
                var velX = (tx / distance) * playerBullet.speed; //nova hitrost
                var velY = (ty / distance) * playerBullet.speed;



                //move
                if (playerBullet.x < bulletTargetX) {
                    playerBullet.velX = velX;
                }
                if (playerBullet.x > bulletTargetX) {
                    playerBullet.velX = -Math.abs(velX); //vel je -  
                }
                if (playerBullet.y < bulletTargetY) {
                    playerBullet.velY = velY;
                }
                if (playerBullet.y > bulletTargetY) {
                    playerBullet.velY = -Math.abs(velY); //vel je -
                }
            }
        }
    }


}

function LabCollision() {

    var sandColor = color(239, 221, 111); //color lab lines

    // Loop through the clip and look for color
    for (var i = 0; i < collisionColorsLength; i += 4) {

        if (collisionColors.pixels[i] == red(sandColor) && collisionColors.pixels[i + 1] == green(sandColor) && collisionColors.pixels[i + 2] == blue(sandColor)) {

            //ce najde barvo vrne true
            return true;

        }
    }
    return false;
}
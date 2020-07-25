var playerX = 340; // current player X
var playerY = 20; // current player Y
var playerWidth = 55;
var playerHeight = 35;
var playerSpeed = 8;
var playerImg;
var playerImgRight = new Image();
var playerImgLeft = new Image();
var playerImgUp = new Image();
var playerImgDown = new Image();
var playerBullet;
var playerLives = 3;
var livesImage = new Image();
var newPlayerX;
var newPlayerY;
var AvtomaticPlayerSpeed = 4; //playerspeed when boat is solving the maze

var playerLives1 = document.getElementById('lives1');
var playerLives2 = document.getElementById('lives2');
var playerLives3 = document.getElementById('lives3');
    



function playerEnemyCollision() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].status && playerX + playerWidth >= enemies[i].x && playerX < enemies[i].x + enemies[i].width && playerY >= enemies[i].y && playerY <= enemies[i].y + enemies[i].height) {
            return true;
        } else if (enemies[i].status && playerX + playerWidth >= enemies[i].x && playerX < enemies[i].x + enemies[i].width && playerY + playerHeight >= enemies[i].y && playerY + playerHeight <= enemies[i].y + enemies[i].height) {
            return true;
        }
    }
}

function playerGoldChestColllision() {
    if (goldChestStatus && playerX + playerWidth >= goldChestX && playerX < goldChestX + goldChestWidth && playerY >= goldChestY && playerY <= goldChestY + goldChestHeight) {
        goldChestStatus = false;
        goldenChestsSound.setVolume(1);
        goldenChestsSound.play();
        goldenChestsFound++;
        document.getElementById("treasures").innerHTML = "Treasures found: " + goldenChestsFound + "/1";
    } else if (goldChestStatus && playerX + playerWidth >= goldChestX && playerX < goldChestX + goldChestWidth && playerY + playerHeight >= goldChestY && playerY + playerHeight <= goldChestY + goldChestHeight) {
        goldChestStatus = false;
        goldenChestsSound.setVolume(1);
        goldenChestsSound.play();
        goldenChestsFound++;
        document.getElementById("treasures").innerHTML = "Treasures found: " + goldenChestsFound + "/1";
    }



}

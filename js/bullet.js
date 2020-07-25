var canonBall = new Image();

function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.status = false;
    this.velX;
    this.velY;
    this.speed = 4;


}

function moveBullet(b) {

    b.x += b.velX;

    b.y += b.velY;

    collisionBullet(b);

}

function collisionBullet(b) {
    if (b.x + b.width > canvasWidth) {
        b.status = false;
    } else if (b.x < 0) {
        b.status = false;
    } else if (b.y + b.height > canvasHeight) {
        b.status = false;
    } else if (b.y < 0) {
        b.status = false;
    }
    collisionColors = get(b.x, b.y, b.width, b.height); //shrani sliko
    collisionColors.loadPixels();  //Loads the pixel data for the display window into the pixels[] array
    collisionColorsLength = 4 * (b.width * b.height);
    if (LabCollision()) {
        b.status = false; //bullet rata false
    } else {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].status && b != enemy1.bullet && b != enemy2.bullet && b != enemy3.bullet && b != enemy4.bullet && b != enemy5.bullet) {
                hitEnemy(b, enemies[i]); //preverimo ce smo zadeli enemy

            }
        }

        if (b == enemy1.bullet || b == enemy2.bullet || b == enemy3.bullet || b == enemy4.bullet || b == enemy5.bullet) {
            hitPlayer(b); //preverimo ce smo zadeli player
        }

    }



}

function hitEnemy(first, second) {

    if (second.status == true && first.x < second.x + second.width && first.x + first.width > second.x &&
        first.y < second.y + second.height && first.height + first.y > second.y) {
        first.status = false;
        second.status = false;
        shipsSunken++;
        document.getElementById("ships").innerHTML = "Ships sunken: " + shipsSunken + "/" + enemies.length;
        shipHit.play();
        explosionTime = (floor(millis() / 1000));
        second.explosion = true;
    }

}

function hitPlayer(second) {

    if (playerX < second.x + second.width && playerX + playerWidth > second.x &&
        playerY < second.y + second.height && playerHeight + playerY > second.y) {
        shipHit.play();
        second.status = false;
        playerLives--;
    }

}
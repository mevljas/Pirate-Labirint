var enemies; // array
var enemyImg = new Image();

function enemy(x, y) {
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 35;
    this.status = true;
    this.bullet = null;
    this.willShoot = false;
    this.bulletTimeout;
    this.explosion = false;
}

function makeBullet(enem) {

    enem.bullet = new Bullet(enem.x + enem.width / 2, enem.y + enem.height / 2);
    enem.willShoot = false;
    enem.bullet.status = true;
    var bulletTargetX = playerX;
    var bulletTargetY = playerY;

    var tx = bulletTargetX - enem.bullet.x; //new target x
    var ty = bulletTargetY - enem.bullet.y; //new target y

    var distance = Math.sqrt(tx * tx + ty * ty); //distance
    var velX = (tx / distance) * enem.bullet.speed; //new speed
    var velY = (ty / distance) * enem.bullet.speed;



    //move
    if (enem.bullet.x < bulletTargetX) {
        enem.bullet.velX = velX;
    }
    if (enem.bullet.x > bulletTargetX) {
        enem.bullet.velX = -Math.abs(velX); //vel je -
    }
    if (enem.bullet.y < bulletTargetY) {
        enem.bullet.velY = velY;
    }
    if (enem.bullet.y > bulletTargetY) {
        enem.bullet.velY = -Math.abs(velY); //vel je -
    }
}
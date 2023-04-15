
const Chars = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ'];

class Matri {

    constructor(follower = false, x, y, speed, alpha, size) {
        this.pos = createVector(x, y);
        this.followers = [];
        this.follower = follower;
        this.followerC = floor(random(1, 50));
        this.textDist = 20;
        this.text = random(Chars);
        this.ded = false;
        if (this.follower == true) {
            this.speed = speed;
        } else {
            this.speed = random(1, 5);
        }
        this.setup();
        this.alpha = alpha;
        this.size = size;
    }

    setup() {
        if (this.follower == false) {
            for (let i = 1; i < this.followerC; i++)
                this.followers.push(new Matri(true, this.pos.x, this.pos.y - (i * this.textDist), this.speed, 200 - (i * 13), this.size));
        }
    }
    update() {
        if (this.follower == false) {
            for (let i = 0; i < this.followers.length; i++) {
                this.followers[i].update();
            }
        }
        this.move();
        this.draw();
        this.dead();
        if (frameCount % 4 == 0) {
            this.random();
        }
        //mouse functionality 
        let disto = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        this.pos.y += disto / 200;

        if (mouseX > 0 && mouseX < width) {
            if (disto < 30) {
                this.pos.x += random(-1, 1) * (disto / 2);
            }
        }
    }

    move() {
        this.pos.y += this.speed;
    }

    random() {
        if (this.follower == true) {
            this.text = random(Chars);
        }
    }

    draw() {
        fill(0, 255, 0, this.alpha);
        textSize(this.size);
        text(this.text, this.pos.x, this.pos.y);
    }

    dead() {
        if (this.pos.y > width + 10 * this.textDist) {
            this.ded = true;
        }
    }
    reset(x) {
        this.followers = [];
        this.followerC = floor(random(1, 30));
        this.pos.x = x;
        this.pos.y = 0;
        this.size = random(1, 24);
        if (this.follower == false) {
            for (let i = 1; i < this.followerC; i++) {
                this.followers.push(new Matri(true, this.pos.x, this.pos.y - (i * this.textDist), this.speed, 200 - (i * 10), this.size));
            }
        }
        this.ded = false;
    }
}

let Matrix = [];
let Linespacing = 10;
function setup() {
    var canvas = createCanvas(900, 800);
    background(2, 2, 2);
    for (let i = 0; i < width; i += Linespacing) {
        Matrix.push(new Matri(false, i, random(0, -Linespacing * 20), null, 9000, 12));
    }
}


function draw() {
    background(2, 2, 2, 170);
    for (let i = 0; i < Matrix.length; i++) {
        Matrix[i].update();
        if (Matrix[i].ded == true) {
            let thisX = Matrix[i].pos.x;
            Matrix[i].reset(thisX);
        }
    }
}

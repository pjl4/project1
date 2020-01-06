//some sprites taken from phaser.io
//some sprites from https://github.com/ansimuz/getting-started-with-phaser

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};
var game = new Phaser.Game(config);
var player;
var enimies = [];
var randomY = Phaser.Math.Between(0, config.height);
var scoreField;
var score = 0;
var activeWords = [];
function preload() {
    this.load.image('background', 'images/Backgrounds/farback.gif');
    this.load.spritesheet('player', 'images/Ship/Spritesheet_64x29.png', {
        frameWidth: 64,
        frameHeight: 29
    });
    this.load.spritesheet('enemy', 'images/Enemy/eSpritesheet_40x30.png', {
        frameWidth: 40,
        frameHeight: 30
    });
    this.load.spritesheet('fancyEnemy', 'images/Enemy/ship.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    this.load.spritesheet('fancyEnemy2', 'images/Enemy/ship2.png', {
        frameWidth: 16,
        frameHeight: 32
    });
    this.load.spritesheet('fancyEnemy3', 'images/Enemy/ship3.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}
function create() {
    this.add.image(0, 0, 'background');
    randomY = Phaser.Math.Between(0, config.height - 150);
    ufoShip = this.add.sprite(800, randomY, 'enemy');
    fancyEnemy = this.add.sprite(800, randomY + 50, 'fancyEnemy');
    fancyEnemy2 = this.add.sprite(800, randomY + 20, 'fancyEnemy2');
    fancyEnemy3 = this.add.sprite(800, randomY - 40, 'fancyEnemy3');
    // this.add.image(25, 150, 'player');
    player = this.add.sprite(25, 150, 'player');
    scoreField = this.add.text(10, 10, '', {
        font: '24px Arial',
        fill: '#FFFFFF'
    });
    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'flyEnemy',
        frames: this.anims.generateFrameNumbers('enemy'),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'flyFancy',
        frames: this.anims.generateFrameNumbers('fancyEnemy'),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'flyFancy2',
        frames: this.anims.generateFrameNumbers('fancyEnemy2'),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'flyFancy3',
        frames: this.anims.generateFrameNumbers('fancyEnemy3'),
        frameRate: 20,
        repeat: -1
    });
    player.anims.play('fly');
    ufoShip.anims.play('flyEnemy');
    fancyEnemy.anims.play('flyFancy');
    fancyEnemy2.anims.play('flyFancy2');
    fancyEnemy3.anims.play('flyFancy3');
    assignWord(ufoShip);
    console.log(ufoShip);
    // var text = game.add.text(0, 0, ufoShip.word, {
    //     font: '12px Arial',
    //     fill: '#FFFFF'
    // });
    // console.log(text);
    // this.ufoShip.addChild(text);
    console.log('assignword 1');
    assignWord(fancyEnemy);
    console.log('assignword 2');
    assignWord(fancyEnemy2);
    console.log('assignword 3');
    assignWord(fancyEnemy3);
    console.log('assignword 4');
    console.log(ufoShip);
    console.log(fancyEnemy);
    console.log(fancyEnemy2);
    console.log(fancyEnemy3);
}
function update() {
    randomY = Phaser.Math.Between(0, config.height);
    moveShips(ufoShip, 0.5);
    moveShips(fancyEnemy, 0.7);
    moveShips(fancyEnemy2, 0.9);
    moveShips(fancyEnemy3, 0.4);
    scoreField.setText('Score : ' + score);
}
function moveShips(ship, speed) {
    if (ship.x > -40) {
        ship.x -= speed;
    } else {
        ship.x = 800;
        ship.y = randomY;
    }
}
function assignWord(ship) {
    randomWordIndex = Math.floor(Math.random() * words.length - 1);
    if (activeWords.length === 0) {
        ship.word = words[randomWordIndex];
        activeWords.push(words[randomWordIndex]);
    } else {
        for (word in activeWords) {
            while (activeWords[word][0] === words[randomWordIndex][0]) {
                randomWordIndex += 5;
            }
        }
        ship.word = words[randomWordIndex];
        activeWords.push(words[randomWordIndex]);
    }
}

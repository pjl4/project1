//some sprites taken from https://gamedevelopment.tutsplus.com/articles/enjoy-these-totally-free-space-based-shoot-em-up-sprites--gamedev-2368
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
var randomY = Phaser.Math.Between(0, config.height);
var scoreField;
var score = 0;
var activeWords = [];
var typedWord = '';
var newText;
var group;
var group1;
var group2;
var group3;
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
    //add all sprites
    this.add.image(0, 0, 'background');
    randomY = Phaser.Math.Between(50, config.height - 150);
    ufoShip = this.add.sprite(800, randomY, 'enemy');
    fancyEnemy = this.add.sprite(800, randomY + 60, 'fancyEnemy');
    fancyEnemy2 = this.add.sprite(800, randomY + 30, 'fancyEnemy2');
    fancyEnemy3 = this.add.sprite(800, randomY - 40, 'fancyEnemy3');
    player = this.add.sprite(25, 150, 'player');

    //initialize groups as Groups
    group = this.add.group();
    group1 = this.add.group();
    group2 = this.add.group();
    group3 = this.add.group();
    //add score
    scoreField = this.add.text(10, 10, '', {
        font: '24px Arial',
        fill: '#FFFFFF'
    });
    //create animations for ships
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
    //play animations
    player.anims.play('fly');
    ufoShip.anims.play('flyEnemy');
    fancyEnemy.anims.play('flyFancy');
    fancyEnemy2.anims.play('flyFancy2');
    fancyEnemy3.anims.play('flyFancy3');
    //Ship 1 assign word
    assignWord(ufoShip);
    //ship 1 get word text
    let text = this.add.text(ufoShip.x - 30, ufoShip.y - 10, ufoShip.word, {
        font: '18px Arial',
        fill: '#ff0000'
    });
    //ship 1 make group
    makeGroup(group, ufoShip, text);
    //ship 2 assign word
    assignWord(fancyEnemy);
    //ship 2 get word text
    text = this.add.text(
        fancyEnemy.x - 30,
        fancyEnemy.y - 10,
        fancyEnemy.word,
        {
            font: '18px Arial',
            fill: '#ff0000'
        }
    );
    //ship 2 make group
    makeGroup(group1, fancyEnemy, text);
    //ship 3 assign word
    assignWord(fancyEnemy2);
    //ship 3 get word text
    text = this.add.text(
        fancyEnemy2.x - 30,
        fancyEnemy2.y - 10,
        fancyEnemy2.word,
        {
            font: '18px Arial',
            fill: '#ff0000'
        }
    );
    //ship 3 make group
    makeGroup(group2, fancyEnemy2, text);
    //ship 4 assign word
    assignWord(fancyEnemy3);
    //ship 4 get word text
    text = this.add.text(
        fancyEnemy3.x - 30,
        fancyEnemy3.y - 10,
        fancyEnemy3.word,
        {
            font: '18px Arial',
            fill: '#ff0000'
        }
    );
    //ship 4 make group
    makeGroup(group3, fancyEnemy3, text);
    this.input.keyboard.on('keydown', keyDown);
}
function update() {
    if (group.getChildren().length > 0) {
        moveGroup(group, 0.8);
    } else {
        ufoShip = this.add.sprite(800, randomY, 'enemy');
        //assign word
        assignWord(ufoShip);
        //get text
        text = this.add.text(ufoShip.x - 30, ufoShip.y - 10, ufoShip.word, {
            font: '18px Arial',
            fill: '#ff0000'
        });
        //repopulate group
        makeGroup(group, ufoShip, text);
    }
    if (group1.getChildren().length > 0) {
        moveGroup(group1, 1.1);
    } else {
        fancyEnemy = this.add.sprite(800, randomY, 'fancyEnemy');
        //assign word
        assignWord(fancyEnemy);
        //get text
        text = this.add.text(
            fancyEnemy.x - 30,
            fancyEnemy.y - 10,
            fancyEnemy.word,
            {
                font: '18px Arial',
                fill: '#ff0000'
            }
        );
        //repopulate group
        makeGroup(group1, fancyEnemy, text);
    }
    if (group2.getChildren().length > 0) {
        moveGroup(group2, 1);
    } else {
        fancyEnemy2 = this.add.sprite(800, randomY, 'fancyEnemy2');
        //assign word
        assignWord(fancyEnemy2);
        //get text
        text = this.add.text(
            fancyEnemy2.x - 30,
            fancyEnemy2.y - 10,
            fancyEnemy2.word,
            {
                font: '18px Arial',
                fill: '#ff0000'
            }
        );
        //repopulate group
        makeGroup(group2, fancyEnemy2, text);
    }
    if (group3.getChildren().length > 0) {
        moveGroup(group3, 1.3);
    } else {
        fancyEnemy3 = this.add.sprite(800, randomY, 'fancyEnemy3');
        //assign word
        assignWord(fancyEnemy3);
        //get text
        text = this.add.text(
            fancyEnemy3.x - 30,
            fancyEnemy3.y - 10,
            fancyEnemy3.word,
            {
                font: '18px Arial',
                fill: '#ff0000'
            }
        );
        //repopulate group
        makeGroup(group3, fancyEnemy3, text);
    }
    scoreField.setText('Score : ' + score);
    if (newText) {
        if (typedWord) {
            switch (typedWord) {
                case group.children.entries[0].word:
                    if (newText.length === 0) {
                        group.children.entries[1].setText();
                    } else {
                        group.children.entries[1].setText(newText);
                    }
                    break;
                case group1.children.entries[0].word:
                    if (newText.length === 0) {
                        group1.children.entries[1].setText();
                    } else {
                        group1.children.entries[1].setText(newText);
                    }
                    break;
                case group2.children.entries[0].word:
                    if (newText.length === 0) {
                        group2.children.entries[1].setText();
                    } else {
                        group2.children.entries[1].setText(newText);
                    }
                    break;
                case group3.children.entries[0].word:
                    if (newText.length === 0) {
                        group3.children.entries[1].setText();
                    } else {
                        group3.children.entries[1].setText(newText);
                    }
                    break;
            }
        }
    }
}
// function moveShips(ship, speed) {
//     randomY = Phaser.Math.Between(0, config.height);
//     if (ship.x > -40) {
//         ship.x -= speed;
//     } else {
//         ship.x = 800;
//         ship.y = randomY;
//     }
// }
function keyDown(evt) {
    let key = evt.key.toUpperCase();
    if (typedWord === '') {
        switch (key) {
            case group.children.entries[1]._text[0]:
                //call function to handle
                handleKeyPress(group);
                typedWord = group.children.entries[0].word;
                break;
            case group1.children.entries[1]._text[0]:
                //call function to handle
                handleKeyPress(group1);
                typedWord = group1.children.entries[0].word;
                break;
            case group2.children.entries[1]._text[0]:
                //call function to handle
                handleKeyPress(group2);
                typedWord = group2.children.entries[0].word;
                break;
            case group3.children.entries[1]._text[0]:
                //call function to handle
                handleKeyPress(group3);
                typedWord = group3.children.entries[0].word;
                break;
        }
    } else {
        //handle word
        switch (typedWord) {
            case group.children.entries[0].word:
                if (key === group.children.entries[1]._text[0]) {
                    handleKeyPress(group);
                }
                break;
            case group1.children.entries[0].word:
                if (key === group1.children.entries[1]._text[0]) {
                    handleKeyPress(group1);
                }
                break;
            case group2.children.entries[0].word:
                if (key === group2.children.entries[1]._text[0]) {
                    handleKeyPress(group2);
                }
                break;
            case group3.children.entries[0].word:
                if (key === group3.children.entries[1]._text[0]) {
                    handleKeyPress(group3);
                }
                break;
        }
    }
}
function handleKeyPress(passedGroup) {
    if (typeof newText === 'undefined' || newText === '') {
        newText = passedGroup.children.entries[0].word;
    }
    if (newText.length > 1) {
        newText = newText.substr(1);
    } else {
        activeWords.splice(activeWords.indexOf(typedWord), 1);
        typedWord = '';
        newText = '';
        //empty group
        passedGroup.clear(true);
        score += 5;
    }
}
function makeGroup(passedGroup, ship, text) {
    passedGroup.add(ship);
    passedGroup.add(text);
}
function moveGroup(group, speed) {
    randomY = Phaser.Math.Between(0, config.height);
    if (group.children.entries[0].x > -40) {
        group.children.entries[0].x -= speed;
        group.children.entries[1].x -= speed;
    } else {
        group.children.entries[0].x = 800;
        group.children.entries[0].y = randomY;
        group.children.entries[1].x = 790;
        group.children.entries[1].y = randomY - 10;
        score -= 1;
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
                if (randomWordIndex === words.length - 1) {
                    randomWordIndex = 0;
                } else {
                    randomWordIndex += 1;
                }
            }
        }
        ship.word = words[randomWordIndex];
        activeWords.push(words[randomWordIndex]);
    }
}

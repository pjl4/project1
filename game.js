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
var player;
var enimies = [];
var randomY = Phaser.Math.Between(0, config.height);
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
}
function create() {
	this.add.image(0, 0, 'background');
	randomY = Phaser.Math.Between(0, config.height);
	enemies = this.add.sprite(800, randomY, 'enemy');
	fancyEnemy = this.add.sprite(800, randomY + 50, 'fancyEnemy');
	// this.add.image(25, 150, 'player');
	player = this.add.sprite(25, 150, 'player');
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
	player.anims.play('fly');
	enemies.anims.play('flyEnemy');
	fancyEnemy.anims.play('flyFancy');
}
function update() {
	randomY = Phaser.Math.Between(0, config.height);
	moveShips(enemies, 0.5);
	moveShips(fancyEnemy, 0.7);
}
function moveShips(ship, speed) {
	if (ship.x > -40) {
		ship.x -= speed;
	} else {
		ship.x = 800;
		ship.y = randomY;
	}
}
var game = new Phaser.Game(config);

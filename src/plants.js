//PLANTS.JS
var bgm;

var starting_line;

var plant_01;
var plant_01_icon;
var plant_01_time;
var plant_01_weapon;
var plant_01_enemybullet;
var plant_01_plant_time = 0;
var plant_01_weapon_time = 0;
var plant_01_wait_text;
var plant_01_alive = [];
var plant_01_cooldown = 0;
//var plant_01_health = new Array(50);

var Mowers = Array(9);

var wallnut;
var wallnut_icon;
var wallnut_wait_text;
var wallnut_cooldown = 0;

var plant_02;
var plant_02_icon;
var plant_02_time;
var plant_02_weapon;
var plant_02_enemybullet;
var plant_02_plant_time = 0;
var plant_02_weapon_time = 0;
var plant_02_wait_text;
var plant_02_alive = [];
var plant_02_cooldown = 0;

var shovel;
var shovel_icon;
var shovel_cheating_cooldown = 0;
var money_p = 0;

var emitter;
var explosions;
var sprite_d1;
var sprite_d2;
var sprite_d3;
var sprite_d4;
var sprite_d5;

var zombie_attack_1;
var zombie_attack_2;
var zombie_attack_3;
var zombie_attack_4;
var zombie_attack_5;
//sun declaration
var livingsun2 = [];
var suntime0_p;
var icon_p7;
var plant_cost_0 = 0;
var plant_cost_1 = 0;
var plant_cost_2 = 10;
var plant_cost_3 = 150;
var plant_cost_4 = 75;
var plant_cost_5 = 0;
var sunflower_cost = 0;
var natural_sun1;
var sun_break1;
var skillText_p7;
var moneyText2;

var plant_03;
var plant_03_icon;
var plant_03_wait_text;
var plant_03_cooldown = 0;

var potato_mine;
var potato_mine_icon;
var potato_mine_wait_text;
var potato_mine_cooldown = 0;

var chomper;
var chomper_icon;
var chomper_wait_text;
var chomper_cooldown = 0;
var chomper_eating_cooldown = 0;
var anim_chomper;
var eating = 0;

var coffin_idx;

var zombie_h;
var zombie_h2;
var zombie_h3;
var zombie_h4;
var zombie_h5;
var zombie_1_attacking = 0;
var zombie_2_attacking = 0;
var zombie_3_attacking = 0;
var zombie_4_attacking = 0;
var zombie_5_attacking = 0;
//audio
var z_death;
var e_death;

var count;
function plants_preload() {
    game.load.audio('game_bgm', '/assets/game bgm.mp3');
    //game.load.audio('fire!', '/assets/')

    //load peashooter
    game.load.spritesheet('plant_1', 'assets/peashooter.png', 26.87, 32, 10);
    game.load.image('plant_1_icon', 'assets/peashooter_icon.png');
    game.load.spritesheet('plant_1_weapon', 'assets/peashooter_weapon.png', 12, 31);

    //lawnmower
    game.load.image('lawnmower', '/assets/lawnmower.png');

    //wallnut
    game.load.image('wallnut_icon', '/assets/wallnut_icon.png');
    game.load.spritesheet('wallnut_full', '/assets/wallnut_full.png', 27, 32, 5);
    game.load.spritesheet('wallnut_damaged', '/assets/wallnut_damaged.png', 27, 32, 5);
    game.load.spritesheet('wallnut_broken', '/assets/wallnut_broken.png', 27, 32, 5);

    //icepeashooter
    game.load.spritesheet('plant_2', '/assets/ice_peashooter.png', 30, 31, 11);
    game.load.image('plant_2_icon', 'assets/ice_peashooter_icon.png');
    game.load.spritesheet('plant_2_weapon', 'assets/ice_peashooter_bullet.png', 18, 21);

    //Shovel
    game.load.image('shovel', '/assets/Shovel.png');

    //starting_line
    game.load.image('starting_line', '/assets/starting_line.png');

    //hypno shroom
    game.load.spritesheet('hypno_shroom', '/assets/hypno-shroom.png', 25, 36, 3);
    game.load.image('hypno_shroom_icon', '/assets/hypno_shroom_icon.png');

    //potato mine
    game.load.spritesheet('potato_mine', '/assets/potato_mine.png', 28.1, 26, 7);
    game.load.image('potato_mine_icon', '/assets/potato_mine_icon.png');

    //chomper
    game.load.spritesheet('chomper', '/assets/chomper.png', 66.4, 64, 68);
    game.load.image('chomper_icon', '/assets/chomper_icon.png');


    game.load.image('diamond', 'assets/diamond.png');
    //
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    //
    game.load.spritesheet('zombie_attack_1', 'assets/zombie_0_attack.png', 68, 40);
    game.load.spritesheet('zombie_attack_2', 'assets/zombie_1_attack.png', 44.5, 59);
    game.load.spritesheet('zombie_attack_3', 'assets/zombie_2_attack.png', 57.5, 55);
    game.load.spritesheet('zombie_attack_4', 'assets/zombie_3_attack.png', 57.5, 55);
    game.load.spritesheet('zombie_attack_5', 'assets/zombie_5_attack.png', 75, 67);

    game.load.spritesheet('zombie_death_1', 'assets/zombie_0_death.png', 85, 35);
    game.load.spritesheet('zombie_death_2', 'assets/zombie_1_death.png', 44.8, 55);
    game.load.spritesheet('zombie_death_3', 'assets/zombie_2_death.png', 59.5, 60);
    game.load.spritesheet('zombie_death_4', 'assets/zombie_3_death.png', 57.75, 57.5);
    game.load.spritesheet('zombie_death_5', 'assets/zombie_5_death.png', 75, 72);

    //////sunflower spritesheet loading
    game.load.spritesheet('sunflower', 'assets/sunflower.png', 59, 70, 9);
    game.load.spritesheet('coin_dead', 'assets/coin_dead.png', 16, 16, 12);
    game.load.image('sun1', 'assets/sun.png');
    game.load.image('icon_7', 'assets/sun_icon.png');
    ///audio
    game.load.audio('e_death', 'assets/explosion_e.mp3');
    game.load.audio('sound_death', 'assets/sound_death.mp3');
}

function plants_create() {
    //time initialized
    suntime0_p = 0;
    natural_sun1 = 0;
    sun_break1 = 0;
    count = 0;
    ///audio
    e_death = game.add.audio('e_death');
    z_death = game.add.audio('sound_death');
    //peashooter
    plant_01 = game.add.group();
    plant_01.enableBody = true;
    plant_01.physicsBodyType = Phaser.Physics.ARCADE;
    plant_01.createMultiple(50, 'plant_1', 0, false);
    plant_01.setAll('health', 5);
    plant_01.setAll('outOfBoundsKill', true);
    plant_01.setAll('checkWorldBounds', true);
    plant_01.inputEnabled = true;

    /*plant_01.forEach(function(plant){
        console.log(plant.health);
    })*/
    //testing
    /*for(var j = 0; j <50; j++){
        plant_01[j].health = 5;
    }*/

    //peashooter_bullet
    this.enemyBullets = game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(200, 'plant_1_weapon');
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
    var set_flag2 = 0;
    //peashooter_icon
    if (plant_tag[0] == 1) {
        plant_01_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'plant_1_icon');
        plant_01_icon.alpha = 0.5;
        plant_01_icon.inputEnabled = true;
        plant_01_icon.anchor.set(0.5);

        //peashooter waiting text
        plant_01_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });
    }

    //wallnut
    wallnut = game.add.group();
    wallnut.enableBody = true;
    wallnut.physicsBodyType = Phaser.Physics.ARCADE;
    wallnut.createMultiple(50, 'wallnut_full');
    wallnut.setAll('outOfBoundsKill', true);
    wallnut.setAll('checkWorldBounds', true);
    wallnut.setAll('health', 20);
    wallnut.inputEnabled = true;

    //wallnut icon
    if (plant_tag[1] == 1) {
        wallnut_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'wallnut_icon');
        wallnut_icon.alpha = 0.5;
        wallnut_icon.inputEnabled = true;
        wallnut_icon.anchor.set(0.5);
        //wallnut text
        wallnut_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });
    }

    //ice_peashooter
    plant_02 = game.add.group();
    plant_02.enableBody = true;
    plant_02.physicsBodyType = Phaser.Physics.ARCADE;
    plant_02.createMultiple(50, 'plant_2');
    plant_02.setAll('outOfBoundsKill', true);
    plant_02.setAll('checkWorldBounds', true);
    plant_02.setAll('health', 5);
    plant_02.inputEnabled = true;

    //ice_peashooter icon
    if (plant_tag[2] == 1) {
        plant_02_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'plant_2_icon');
        plant_02_icon.alpha = 0.5;
        plant_02_icon.inputEnabled = true;
        plant_02_icon.anchor.set(0.5);
        //ice_peashooter waiting text
        plant_02_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });

    }

    //ice_peashooter bullet
    this.enemyBullets2 = game.add.group();
    this.enemyBullets2.enableBody = true;
    this.enemyBullets2.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets2.createMultiple(200, 'plant_2_weapon');
    this.enemyBullets2.setAll('outOfBoundsKill', true);
    this.enemyBullets2.setAll('checkWorldBounds', true);

    if (plant_tag[3] == 1) {
        //chomper icon
        chomper_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'chomper_icon');
        chomper_icon.alpha = 0.5;
        chomper_icon.inputEnabled = true;
        chomper_icon.anchor.set(0.5);
        //chomper waiting text
        chomper_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });

    }

    //shovel
    shovel_icon = game.add.sprite(game.world.centerX - 7 * 64 + 360, game.world.centerY - 4.5 * 64 - 128, 'shovel');
    shovel_icon.scale.x = 0.45;
    shovel_icon.scale.y = 0.45;
    shovel_icon.alpha = 0.5;
    shovel_icon.inputEnabled = true;

    //shovel.v2
    shovel = game.add.group();
    shovel.enableBody = true;
    shovel.physicsBodyType = Phaser.Physics.ARCADE;
    shovel.createMultiple(50, 'plant_2');

    //hypno shroom
    plant_03 = game.add.group();
    plant_03.enableBody = true;
    plant_03.physicsBodyType = Phaser.Physics.ARCADE;
    plant_03.createMultiple(50, 'hypno_shroom');
    plant_03.setAll('outOfBoundsKill', true);
    plant_03.setAll('checkWorldBounds', true);
    plant_03.inputEnabled = true;

    if (plant_tag[4] == 1) {
        plant_03_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'hypno_shroom_icon');
        plant_03_icon.alpha = 0.5;
        plant_03_icon.inputEnabled = true;
        plant_03_icon.anchor.set(0.5);
        //hypno_shroom waiting text
        plant_03_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });
    }
    //potato mine
    potato_mine = game.add.group();
    potato_mine.enableBody = true;
    potato_mine.physicsBodyType = Phaser.Physics.ARCADE;
    potato_mine.createMultiple(50, 'potato_mine');
    potato_mine.setAll('outOfBoundsKill', true);
    potato_mine.setAll('checkWorldBounds', true);
    potato_mine.setAll('health', 10);


    if (plant_tag[5] == 1) {
        potato_mine_icon = game.add.sprite(game.world.centerX - 7 * 64 + (set_flag2) * 64, game.world.centerY - 6.1 * 64, 'potato_mine_icon');
        potato_mine_icon.alpha = 0.5;
        potato_mine_icon.inputEnabled = true;
        potato_mine_icon.anchor.set(0.5);
        //potato mine waiting text
        potato_mine_wait_text = game.add.text(64 * (0.15 + set_flag2++), 48, 'Ready!', { font: '13px Arial', fill: '#FFF' });
    }

    //chomper
    chomper = game.add.group();
    chomper.enableBody = true;
    chomper.physicsBodyType = Phaser.Physics.ARCADE;
    chomper.createMultiple(50, 'chomper');
    chomper.setAll('outOfBoundsKill', true);
    chomper.setAll('checkWorldBounds', true);
    chomper.setAll('health', 5);
    chomper.setAll('eating_cooldown', 0);

    //anim_chomper = chomper.animations.add('eating', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], 45, false);


    zombie_attack_1 = game.add.group();
    zombie_attack_1.enableBody = true;
    zombie_attack_1.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_attack_1.createMultiple(50, 'zombie_attack_1');
    zombie_attack_1.setAll('anchor.x', 0.5);
    zombie_attack_1.setAll('anchor.y', 1);
    zombie_attack_1.setAll('outOfBoundsKill', true);
    zombie_attack_1.setAll('checkWorldBounds', true);

    zombie_attack_2 = game.add.group();
    zombie_attack_2.enableBody = true;
    zombie_attack_2.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_attack_2.createMultiple(50, 'zombie_attack_2');
    zombie_attack_2.setAll('anchor.x', 0.5);
    zombie_attack_2.setAll('anchor.y', 1);
    zombie_attack_2.setAll('outOfBoundsKill', true);
    zombie_attack_2.setAll('checkWorldBounds', true);

    zombie_attack_3 = game.add.group();
    zombie_attack_3.enableBody = true;
    zombie_attack_3.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_attack_3.createMultiple(50, 'zombie_attack_3');
    zombie_attack_3.setAll('anchor.x', 0.5);
    zombie_attack_3.setAll('anchor.y', 1);
    zombie_attack_3.setAll('outOfBoundsKill', true);
    zombie_attack_3.setAll('checkWorldBounds', true);

    zombie_attack_4 = game.add.group();
    zombie_attack_4.enableBody = true;
    zombie_attack_4.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_attack_4.createMultiple(50, 'zombie_attack_4');
    zombie_attack_4.setAll('anchor.x', 0.5);
    zombie_attack_4.setAll('anchor.y', 1);
    zombie_attack_4.setAll('outOfBoundsKill', true);
    zombie_attack_4.setAll('checkWorldBounds', true);

    zombie_attack_5 = game.add.group();
    zombie_attack_5.enableBody = true;
    zombie_attack_5.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_attack_5.createMultiple(50, 'zombie_attack_5');
    zombie_attack_5.setAll('anchor.x', 0.5);
    zombie_attack_5.setAll('anchor.y', 1);
    zombie_attack_5.setAll('outOfBoundsKill', true);
    zombie_attack_5.setAll('checkWorldBounds', true);


    //lawnmowers
    for (var i = 0; i < 9; i++) {
        Mowers[i] = game.add.group();
        Mowers[i].enableBody = true;
        Mowers[i].physicsBodyType = Phaser.Physics.ARCADE;
    }
    var mowers_i = new Array(9);
    for (var i = 0; i < 9; i++) {

        mowers_i[i] = Mowers[i].create(32, (i + 1.5) * 64, 'lawnmower');
        mowers_i[i].anchor.setTo(0.5, 0.5);
        mowers_i[i].scale.y = 0.2;
        mowers_i[i].scale.x = 0.2;
        // use idx to indentify each mower
        mowers_i[i]._idx = i;
    }

    //startingline
    starting_line = game.add.sprite(game.world.centerX + 160, game.world.centerY - 356, 'starting_line');
    starting_line.scale.y = 3.7;

    //bgm
    bgm = game.add.audio('game_bgm');
    bgm.volume = 0.1;
    bgm.loopFull();

    //explosion
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);
    //sprite death
    sprite_d1 = game.add.group();
    sprite_d1.createMultiple(30, 'zombie_death_1');
    sprite_d1.forEach(setupD1, this);

    sprite_d2 = game.add.group();
    sprite_d2.createMultiple(30, 'zombie_death_2');
    sprite_d2.forEach(setupD2, this);

    sprite_d3 = game.add.group();
    sprite_d3.createMultiple(30, 'zombie_death_3');
    sprite_d3.forEach(setupD3, this);

    sprite_d4 = game.add.group();
    sprite_d4.createMultiple(30, 'zombie_death_4');
    sprite_d4.forEach(setupD4, this);

    sprite_d5 = game.add.group();
    sprite_d5.createMultiple(30, 'zombie_death_5');
    sprite_d5.forEach(setupD5, this);
    //
    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('diamond');
    emitter.gravity = 1000;
    //////sun icon
    icon_p7 = game.add.sprite(game.world.centerX, game.world.centerY - 6.1 * 64, 'icon_7');
    icon_p7.alpha = 0.5;
    icon_p7.anchor.set(0.5);
    icon_p7.inputEnabled = true;
    //money declaration
    //game.global.money=0;

    sun_1 = game.add.group();
    sun_1.enableBody = true;
    sun_1.physicsBodyType = Phaser.Physics.ARCADE;
    sun_1.createMultiple(50, 'sunflower');
    sun_1.setAll('anchorx', 0.5);
    sun_1.setAll('anchory', 1);
    sun_1.setAll('outOfBoundsKill', true);
    sun_1.setAll('checkWorldBounds', true);
    sun_1.setAll('health', 5);


    suns1 = game.add.group();
    suns1.enableBody = true;
    suns1.physicsBodyType = Phaser.Physics.ARCADE;
    suns1.inputEnableChildren = true;
    suns1.createMultiple(30, 'sun1');
    suns1.setAll('anchor.x', 0.5);
    suns1.setAll('anchor.y', 1);
    suns1.setAll('outOfBoundsKill', true);
    suns1.setAll('checkWorldBounds', true);
    suns1.onChildInputUp.add(smile, this, true);

    //current money
    skillText_p7 = game.add.text(64 * 7.15, 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    moneyText2 = game.add.text(64 * 1.15, 64 * 11, 'current money= ' + money_p, { font: '20px Arial', fill: '#FFF' });
    if (client.teamName === 'zombies') moneyText2.visible = false;


    ///////////////////////////////////////////////////////////////

    client.on('addPlant', (pointer, type) => {
        // do something, ex:
        console.log(type, pointer);
        switch (type) {
            case 0: placesun_1(pointer); break;
            case 1: place_Plants_1(pointer); break;
            case 2: place_Plants_2(pointer); break;
            case 3: place_Plants_3(pointer); break;
            case 4: place_wallnut(pointer); break;
            case 5: place_potato_mine(pointer); break;
            case 6: place_chomper(pointer); break;
        }
    });

    client.on('moveMower', (idx, zbi_type) => {
        console.log(idx, zbi_type);
        switch(zbi_type){
            case 0: move_mower(Mowers[idx], zombie_0); break;
            case 1: move_mower(Mowers[idx], zombie_1); break;
            case 2: move_mower(Mowers[idx], zombie_2); break;
            case 3: move_mower(Mowers[idx], zombie_3); break;
            case 4: move_mower(Mowers[idx], zombie_4); break;
            case 5: move_mower(Mowers[idx], zombie_5); break;
        }

    });

}
function setupInvader(invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}
function setupD1(zombie) {

    zombie.anchor.x = 0.5;
    zombie.anchor.y = 0.5;
    zombie.animations.add('zombie_death_1');
}
function setupD2(zombie) {

    zombie.anchor.x = 0.5;
    zombie.anchor.y = 0.5;
    zombie.animations.add('zombie_death_2');
}
function setupD3(zombie) {

    zombie.anchor.x = 0.5;
    zombie.anchor.y = 0.5;
    zombie.animations.add('zombie_death_3');
}
function setupD4(zombie) {

    zombie.anchor.x = 0.5;
    zombie.anchor.y = 0.5;
    zombie.animations.add('zombie_death_4');
}
function setupD5(zombie) {

    zombie.anchor.x = 0.5;
    zombie.anchor.y = 0.5;
    zombie.animations.add('zombie_death_5');
}
//
function plants_update() {

    /*enemyBullets.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Plants Win!!!\n";
            stateText.visible = true;

            system.gameResult('plants');
        }
    });
    enemyBullets2.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Plants Win!!!\n";
            stateText.visible = true;

            system.gameResult('plants');
        }
    });*/
    /*count = 0;
    for(var i = 0; i < 9; i++){

        if(!coffin_lives[i]){

            count++;
        }
        if(count == 9){

            stateText.text=" Plants Win!!!\n";
            stateText.visible = true;
        }
    }*/
    moneyText2.text = 'current money= ' + money_p;
    //click icon
    if (plant_tag[0] == 1 && plant_01_icon.input.pointerOver()) {
        if (game.input.mousePointer.isDown && plant_01_icon.alpha == 0.5) {
            plant_01_icon.alpha = 1;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
            icon_p7.alpha = 0.5;
        }
        /* else if(game.input.mousePointer.isDown &&  plant_01_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
        }*/
    }
    if (plant_tag[1] == 1 && wallnut_icon.input.pointerOver()) {
        if (game.input.mousePointer.isDown && wallnut_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 1;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
            icon_p7.alpha = 0.5;
        }
        /* else if(game.input.mousePointer.isDown && wallnut_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
        }*/
    }
    if (plant_tag[2] == 1 && plant_02_icon.input.pointerOver()) {
        if (game.input.mousePointer.isDown && plant_02_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 1;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
            icon_p7.alpha = 0.5;
        }
        /*if(game.input.mousePointer.isDown && plant_02_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
        }*/
    }
    if (client.teamName == 'plants' && shovel_icon.input.pointerOver()) {
        if (game.input.mousePointer.isDown && shovel_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 1;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
            icon_p7.alpha = 0.5;
        }
    }
    if (plant_tag[4] == 1 && plant_03_icon.input.pointerOver()) {
        if (game.input.mousePointer.isDown && plant_03_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            plant_03_icon.alpha = 1;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
        }
        /*if(game.input.mousePointer.isDown && shovel_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 1;
        }*/
    }
    if (plant_tag[5] == 1 && potato_mine_icon.input.pointerOver()) {
        //console.log('g');
        if (game.input.mousePointer.isDown && potato_mine_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            potato_mine_icon.alpha = 1;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;
        }
        /*if(game.input.mousePointer.isDown && shovel_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 1;
        }*/
    }
    if (plant_tag[3] == 1 && chomper_icon.input.pointerOver()) {
        //console.log('g');
        if (game.input.mousePointer.isDown && chomper_icon.alpha == 0.5) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            chomper_icon.alpha = 1;
        }
        /*if(game.input.mousePointer.isDown && shovel_icon.alpha == 1){
            plant_01_icon.alpha = 0.5;
            wallnut_icon.alpha = 0.5;
            plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 1;
        }*/
    }
    /////////////////////////sun
    if (client.teamName == 'plants' && icon_p7.input.pointerOver()) {
        if (game.input.mousePointer.isDown) {
            if (plant_tag[0] == 1) plant_01_icon.alpha = 0.5;
            icon_p7.alpha = 1;
            if (plant_tag[1] == 1) wallnut_icon.alpha = 0.5;
            if (plant_tag[2] == 1) plant_02_icon.alpha = 0.5;
            shovel_icon.alpha = 0.5;
            if (plant_tag[4] == 1) plant_03_icon.alpha = 0.5;
            if (plant_tag[5] == 1) potato_mine_icon.alpha = 0.5;
            if (plant_tag[3] == 1) chomper_icon.alpha = 0.5;

        }
    }
    ///////////////////////////////////

    if (game.input.mousePointer.isDown) {
        if (plant_tag[0] == 1 && plant_01_icon.alpha == 1) place_Plants_1(game.input);
        else if (plant_tag[1] == 1 && wallnut_icon.alpha == 1) place_wallnut(game.input);
        else if (plant_tag[2] == 1 && plant_02_icon.alpha == 1) place_Plants_2(game.input);
        else if (shovel_icon.alpha == 1) remove_plant(game.input);
        else if (plant_tag[4] == 1 && plant_03_icon.alpha == 1) place_Plants_3(game.input);
        else if (plant_tag[5] == 1 && potato_mine_icon.alpha == 1) place_potato_mine(game.input);
        else if (plant_tag[3] == 1 && chomper_icon.alpha == 1) place_chomper(game.input);
        else if (icon_p7.alpha == 1) placesun_1(game.input);/////hide here
    }



    ///plant and sun text
    if (plant_tag[0] == 1) {
        if (money_p >= plant_cost_0) {
            plant_01_wait_text.text = 'Ready!';
        }
        else
            plant_01_wait_text.text = 'Wait...';
    }
    if (plant_tag[1] == 1) {
        if (money_p >= plant_cost_1) {
            wallnut_wait_text.text = 'Ready!';
        }
        else
            wallnut_wait_text.text = 'Wait...';
    }
    if (plant_tag[2] == 1) {
        if (money_p >= plant_cost_2) {
            plant_02_wait_text.text = 'Ready!';
        }
        else
            plant_02_wait_text.text = 'Wait...';
    }
    if (plant_tag[3] == 1) {
        if (money_p >= plant_cost_3) {
            chomper_wait_text.text = 'Ready!';
        }
        else
            chomper_wait_text.text = 'Wait...';
    }
    if (plant_tag[4] == 1) {
        if (money_p >= plant_cost_4) {
            plant_03_wait_text.text = 'Ready!';
        }
        else
            plant_03_wait_text.text = 'Wait...';
    }
    if (plant_tag[5] == 1) {
        if (money_p >= plant_cost_5) {
            potato_mine_wait_text.text = 'Ready!';
        }
        else
            potato_mine_wait_text.text = 'Wait...';
    }
    if (money_p >= sunflower_cost) {
        skillText_p7.text = 'Ready!';
    }
    else
        skillText_p7.text = 'Wait...';
    /////////sun appearing
    livingsun2.length = 0;
    sun_1.forEachAlive(function (sun) {
        livingsun2.push(sun);
    });

    if (game.time.now > suntime0) {
        if (livingsun2.length > 0) {
            var i = 1;
            livingsun2.forEach(shooter => {
                setTimeout(function () {
                    let sun_shot = suns1.getFirstExists(false);
                    sun_shot.reset(shooter.body.x + 50, shooter.body.y + 100);
                    sun_shot.body.velocity.y = 100;
                }, 1000 * i);
                i++;
            });
            suntime0 = game.time.now + 12000;
        }
    }
    if (game.time.now > natural_sun1) {
        let sun_shot = suns1.getFirstExists(false);
        sun_shot.reset(3 * 64, 0);
        sun_shot.body.velocity.y = 100;
        natural_sun1 = game.time.now + 14000;
    }




    //pea_shooter bullet
    plant_01_alive.length = 0;
    plant_01.forEachAlive(function (plant01) {
        plant_01_alive.push(plant01)
    })

    plant_02_alive.length = 0;
    plant_02.forEachAlive(function (plant02) {
        plant_02_alive.push(plant02)
    })

    if (game.time.now > plant_01_weapon_time) {
        if (plant_01_alive.length > 0) {
            var i = 1;
            plant_01_alive.forEach(shooter => {
                setTimeout(function () {
                    let plant_01_enemybullet = this.enemyBullets.getFirstExists(false);
                    if (plant_01_enemybullet) {
                        plant_01_enemybullet.reset(shooter.body.x + 15, shooter.body.y - 5);
                        plant_01_enemybullet.body.velocity.x = 250;
                    }
                }, 250 * i);
                i++;
            });
            plant_01_weapon_time = game.time.now + 1000;
        }
    }

    if (game.time.now > plant_02_weapon_time) {
        if (plant_02_alive.length > 0) {
            var i = 1;
            plant_02_alive.forEach(shooter => {
                setTimeout(function () {
                    let plant_02_enemybullet = this.enemyBullets2.getFirstExists(false);
                    if (plant_02_enemybullet) {
                        plant_02_enemybullet.reset(shooter.body.x + 15, shooter.body.y - 5);
                        plant_02_enemybullet.body.velocity.x = 250;
                    }
                }, 250 * i);
                i++;
            });
            plant_02_weapon_time = game.time.now + 1000;
        }
    }
    //bullets
    game.physics.arcade.overlap(this.enemyBullets, zombie_0, this.bullet_destory, null, this);
    game.physics.arcade.overlap(this.enemyBullets, zombie_1, this.bullet_destory, null, this);
    game.physics.arcade.overlap(this.enemyBullets, zombie_2, this.bullet_destory, null, this);
    game.physics.arcade.overlap(this.enemyBullets, zombie_3, this.bullet_destory, null, this);
    game.physics.arcade.overlap(this.enemyBullets, zombie_4, this.bullet_destory, null, this);
    game.physics.arcade.overlap(this.enemyBullets, zombie_5, this.bullet_destory, null, this);
    //game.physics.arcade.overlap(this.enemyBullets, coffin, this.coffin_hit, null, this);
    ///count = 0;
    for (var i = 0; i < 9; i++) {
        coffin_idx = i;
        game.physics.arcade.overlap(this.enemyBullets, coffin[i], this.coffin_hit, null, this);


    }
    if (count == 9) {

        stateText.text = " Plants Win!!!\n";
        stateText.visible = true;

        system.gameResult('plants');
    }
    //plant02_bullet
    game.physics.arcade.overlap(this.enemyBullets2, zombie_0, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, zombie_1, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, zombie_2, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, zombie_3, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, zombie_4, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, zombie_5, this.snow_bullet_destroy, null, this);
    game.physics.arcade.overlap(this.enemyBullets2, coffin, this.coffin_hit, null, this);

    //shovel
    game.physics.arcade.overlap(shovel, this.plant_01, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant01killed'); });
    game.physics.arcade.overlap(shovel, this.plant_02, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant02killed'); });
    game.physics.arcade.overlap(shovel, this.plant_03, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant03killed'); });
    game.physics.arcade.overlap(shovel, this.chomper, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant04killed'); });
    game.physics.arcade.overlap(shovel, this.wallnut, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant05killed'); });
    game.physics.arcade.overlap(shovel, this.potato_mine, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant06killed'); });
    game.physics.arcade.overlap(shovel, this.sun_1, function (shovel, plant) { shovel.kill(); plant.kill(); console.log('plant07killed'); });

    //plants02 vs zombie
    game.physics.arcade.overlap(this.plant_02, zombie_0, this.plants_lose, null, this);
    game.physics.arcade.overlap(this.plant_02, zombie_1, this.plants_lose, null, this);
    game.physics.arcade.overlap(this.plant_02, zombie_2, this.plants_lose, null, this);
    game.physics.arcade.overlap(this.plant_02, zombie_3, this.plants_lose, null, this);
    game.physics.arcade.overlap(this.plant_02, zombie_4, this.plants_lose, null, this);
    game.physics.arcade.overlap(this.plant_02, zombie_5, this.plants_lose, null, this);
    //zombie vs mowerss
    for (var i = 0; i < 9; i++) {
        game.physics.arcade.overlap(Mowers[i], zombie_0, this.move_mower, null, this);
        game.physics.arcade.overlap(Mowers[i], zombie_1, this.move_mower, null, this);
        game.physics.arcade.overlap(Mowers[i], zombie_2, this.move_mower, null, this);
        game.physics.arcade.overlap(Mowers[i], zombie_3, this.move_mower, null, this);
        game.physics.arcade.overlap(Mowers[i], zombie_4, this.move_mower, null, this);
        game.physics.arcade.overlap(Mowers[i], zombie_5, this.move_mower, null, this);
    }

    //chomper
    //console.log(eating);
    game.physics.arcade.overlap(chomper, zombie_0, this.chomper_KILL, null, this);
    game.physics.arcade.overlap(chomper, zombie_1, this.chomper_KILL, null, this);
    game.physics.arcade.overlap(chomper, zombie_2, this.chomper_KILL, null, this);
    game.physics.arcade.overlap(chomper, zombie_3, this.chomper_KILL, null, this);
    game.physics.arcade.overlap(chomper, zombie_4, this.chomper_KILL, null, this);
    game.physics.arcade.overlap(chomper, zombie_5, this.chomper_KILL, null, this);
    if (eating > 0) {
        anim_chomper.onLoop.add(this.chomper_eating_counter, this);
        anim_chomper.onComplete.add(this.chomper_available, this);
    }
    //wallnut
    //game.physics.arcade.overlap(wallnut, zombie_0, this.wallnut_block, null, this);
    //game.physics.arcade.overlap(wallnut, zombie_1, this.wallnut_block, null, this);
    //game.physics.arcade.overlap(wallnut, zombie_2, this.wallnut_block, null, this);

    //hypno shroom
    game.physics.arcade.overlap(plant_03, zombie_0, this.hypnotise, null, this);
    game.physics.arcade.overlap(plant_03, zombie_1, this.hypnotise, null, this);
    game.physics.arcade.overlap(plant_03, zombie_2, this.hypnotise, null, this);
    game.physics.arcade.overlap(plant_03, zombie_3, this.hypnotise, null, this);
    game.physics.arcade.overlap(plant_03, zombie_4, this.hypnotise, null, this);
    game.physics.arcade.overlap(plant_03, zombie_5, this.hypnotise, null, this);

    //potato mine
    game.physics.arcade.overlap(potato_mine, zombie_0, this.potato_EXPOSION, null, this);
    game.physics.arcade.overlap(potato_mine, zombie_1, this.potato_EXPOSION, null, this);
    game.physics.arcade.overlap(potato_mine, zombie_2, this.potato_EXPOSION, null, this);
    game.physics.arcade.overlap(potato_mine, zombie_3, this.potato_EXPOSION, null, this);
    game.physics.arcade.overlap(potato_mine, zombie_4, this.potato_EXPOSION, null, this);
    game.physics.arcade.overlap(potato_mine, zombie_5, this.potato_EXPOSION, null, this);

    ///
    game.physics.arcade.overlap(plant_01, zombie_0, zombie0_at, null, this);
    game.physics.arcade.overlap(plant_02, zombie_0, zombie0_at, null, this);
    game.physics.arcade.overlap(wallnut, zombie_0, zombie0_at, null, this);

    game.physics.arcade.overlap(plant_01, zombie_1, zombie1_at_p, null, this);
    game.physics.arcade.overlap(plant_02, zombie_1, zombie1_at_p, null, this);
    game.physics.arcade.overlap(wallnut, zombie_1, zombie1_at_p, null, this);

    if (zombie_1_attacking > 0) game.physics.arcade.overlap(enemyBullets, zombie_h, zombie_1_Sutando_attack, null, this);
    if (zombie_2_attacking > 0) game.physics.arcade.overlap(enemyBullets, zombie_h2, zombie_1_Sutando_attack, null, this);
    if (zombie_3_attacking > 0) game.physics.arcade.overlap(enemyBullets, zombie_h3, zombie_1_Sutando_attack, null, this);
    if (zombie_4_attacking > 0) game.physics.arcade.overlap(enemyBullets, zombie_h4, zombie_1_Sutando_attack, null, this);
    if (zombie_5_attacking > 0) game.physics.arcade.overlap(enemyBullets, zombie_h5, zombie_1_Sutando_attack, null, this);

    game.physics.arcade.overlap(plant_01, zombie_2, zombie2_at_p, null, this);
    game.physics.arcade.overlap(plant_02, zombie_2, zombie2_at_p, null, this);
    game.physics.arcade.overlap(wallnut, zombie_2, zombie2_at_p, null, this);

    game.physics.arcade.overlap(plant_01, zombie_3, zombie3_at_p, null, this);
    game.physics.arcade.overlap(plant_02, zombie_3, zombie3_at_p, null, this);
    game.physics.arcade.overlap(wallnut, zombie_3, zombie3_at_p, null, this);

    game.physics.arcade.overlap(plant_01, zombie_4, zombie4_at_p, null, this);
    game.physics.arcade.overlap(plant_02, zombie_4, zombie4_at_p, null, this);
    game.physics.arcade.overlap(wallnut, zombie_4, zombie4_at_p, null, this);

    game.physics.arcade.overlap(plant_01, zombie_5, zombie5_at_p, null, this);
    game.physics.arcade.overlap(plant_02, zombie_5, zombie5_at_p, null, this);
    game.physics.arcade.overlap(wallnut, zombie_5, zombie5_at_p, null, this);
}
function zombie0_at(plant, zombie) {

    e_death.play();
    zombie.kill();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(plant.body.x + 16, plant.body.y + 16);
    explosion.play('kaboom', 30, false, true);
    plant.kill();
}
var zombie_1_survived = 0;
function zombie1_at_p(plant, zombie) {

    zombie_1_attacking++;

    if (zombie_1_attacking < 2) zombie_h = zombie_attack_1.getFirstExists(false);
    var zombie_m = zombie_1.getFirstExists(false);

    ///zombie.kill();
    zombie_h.reset(plant.body.x + 42, plant.body.y + 32);
    zombie.kill();
    zombie_h.animations.add('eat');
    zombie_h.animations.play('eat', 10, true);
    zombie_h.scale.x = -1;
    zombie_h.body.velocity.x = 0;
    /*if(plant.health == 0){

        emitter.x = plant.body.x;
        emitter.y = plant.body.y;
        emitter.start(true, 2000, null, 10);
        zombie_h.kill();
        zombie_m.reset(plant.body.x + 42, plant.body.y + 32);
        plant.kill();
        zombie_m.animations.add('walk');
        zombie_m.animations.play('walk', 5, true);
        zombie_m.scale.x = -1;
        zombie_m.body.velocity.x = -20;
    }*/
    ///emitter.x = plant.body.x;
    ///emitter.y = plant.body.y;
    ///emitter.start(true, 2000, null, 10);
    //setTimeout(zombie1_at_pp(plant, zombie_h), 5000);
    var myvar = setInterval(function () {

        if (plant.health > 0) {
            plant.health--;
            zombie.health--;
            //console.log(zombie.health +',' +plant.health);
        } else {
            zombie_1_survived = 1;
            emitter.x = plant.body.x;
            emitter.y = plant.body.y;
            emitter.start(true, 2000, null, 10);
        }

        if (zombie_1_survived) {
            //console.log('survived');
            zombie_h.kill();
            zombie_m.reset(plant.body.x + 42, plant.body.y + 32);
            plant.kill();
            zombie_m.animations.add('walk');
            zombie_m.animations.play('walk', 5, true);
            zombie_m.scale.x = -1;
            zombie_m.body.velocity.x = -20;
            zombie_1_survived = 0;
            zombie_1_attacking--;
            clearInterval(myvar);
        }
        if (zombie.health == 0) {
            clearInterval(myvar);
            zombie_1_attacking--;
            if (zombie_1_attacking == 0) zombie_h.kill();
        }

    }, 1000);
    /*zombie_m.reset(plant.body.x + 42, plant.body.y + 32);
    plant.kill();
    zombie_m.animations.add('walk');
    zombie_m.animations.play('walk', 5, true);
    zombie_m.scale.x = -1;
    zombie_m.body.velocity.x = -20;*/
}

var zombie_2_survived = 0;
function zombie2_at_p(plant, zombie) {
    zombie_2_attacking++;

    if (zombie_2_attacking < 2) zombie_h2 = zombie_attack_2.getFirstExists(false);
    var zombie_m = zombie_2.getFirstExists(false);
    ///zombie.kill();
    zombie_h2.reset(plant.body.x + 42, plant.body.y + 42);
    zombie.kill();
    zombie_h2.animations.add('eat');
    zombie_h2.animations.play('eat', 4, true);
    //zombie_h.scale.x = -1;
    zombie_h2.body.velocity.x = 0;

    var myvar = setInterval(function () {

        if (plant.health > 0) {
            zombie.health--;
            plant.health--;
            console.log(plant.health, '+', zombie.health);
        } else {
            zombie_2_survived = 1;
            emitter.x = plant.body.x;
            emitter.y = plant.body.y;
            emitter.start(true, 2000, null, 10);
        }

        if (zombie_2_survived) {
            console.log('survived!!');
            zombie_h2.kill();
            zombie_m.reset(plant.body.x + 42, plant.body.y + 42);
            plant.kill();
            zombie_m.animations.add('walk');
            zombie_m.animations.play('walk', 5, true);
            //zombie_m.scale.x = -1;
            zombie_m.body.velocity.x = -20;
            zombie_2_survived = 0;
            zombie_2_attacking--;
            clearInterval(myvar);
        }
        if (zombie.health == 0) {
            clearInterval(myvar);
            zombie_2_attacking--;
            if (zombie_2_attacking == 0) zombie_h2.kill();
        }

    }, 1000);

    ///emitter.x = plant.body.x;
    ///emitter.y = plant.body.y;
    ///emitter.start(true, 2000, null, 10);
    //setTimeout(zombie1_at_pp(plant, zombie_h), 5000);
    /*setTimeout(function(){

        emitter.x = plant.body.x;
        emitter.y = plant.body.y;
        emitter.start(true, 2000, null, 10);
        zombie_h.kill();
        zombie_m.reset(plant.body.x + 42, plant.body.y + 42);
        plant.kill();
        zombie_m.animations.add('walk');
        zombie_m.animations.play('walk', 5, true);
        //zombie_m.scale.x = -1;
        zombie_m.body.velocity.x = -20;
    }, 5000);*/

}
var zombie_3_survived = 0;
function zombie3_at_p(plant, zombie) {

    zombie_3_attacking++;

    zombie_h3 = zombie_attack_3.getFirstExists(false);
    var zombie_m = zombie_3.getFirstExists(false);
    ///zombie.kill();
    zombie_h3.reset(plant.body.x + 42, plant.body.y + 40);
    zombie.kill();
    zombie_h3.animations.add('eat');
    zombie_h3.animations.play('eat', 3, true);
    //zombie_h.scale.x = -1;
    zombie_h3.body.velocity.x = 0;

    var myvar = setInterval(function () {

        if (plant.health > 0) {
            zombie.health--;
            plant.health = 0;
            console.log(zombie.health + '+' + plant.health);
        } else {
            zombie_3_survived = 1;
            emitter.x = plant.body.x;
            emitter.y = plant.body.y;
            emitter.start(true, 2000, null, 10);
        }

        if (zombie_3_survived) {
            zombie_h3.kill();
            zombie_m.reset(plant.body.x + 42, plant.body.y + 40);
            plant.kill();
            zombie_m.animations.add('walk');
            zombie_m.animations.play('walk', 5, true);
            //zombie_m.scale.x = -1;
            zombie_m.body.velocity.x = -20;
            zombie_3_survived = 0;
            zombie_3_attacking--;
            clearInterval(myvar);
        }
        if (zombie.health == 0) {
            clearInterval(myvar);
            zombie_3_attacking--;
            if (zombie_3_attacking == 0) zombie_h3.kill();
        }

    }, 1000);
    ///emitter.x = plant.body.x;
    ///emitter.y = plant.body.y;
    ///emitter.start(true, 2000, null, 10);
    //setTimeout(zombie1_at_pp(plant, zombie_h), 5000);
    /*setTimeout(function(){

        emitter.x = plant.body.x;
        emitter.y = plant.body.y;
        emitter.start(true, 2000, null, 10);
        zombie_h.kill();
        zombie_m.reset(plant.body.x + 42, plant.body.y + 40);
        plant.kill();
        zombie_m.animations.add('walk');
        zombie_m.animations.play('walk', 5, true);
        //zombie_m.scale.x = -1;
        zombie_m.body.velocity.x = -20;
    }, 5000);*/

}
var zombie_4_survived = 0;
function zombie4_at_p(plant, zombie) {

    zombie_4_attacking++;

    zombie_h4 = zombie_attack_4.getFirstExists(false);
    var zombie_m = zombie_4.getFirstExists(false);
    ///zombie.kill();
    zombie_h4.reset(plant.body.x + 48, plant.body.y + 32);
    zombie.kill();
    zombie_h4.animations.add('eat');
    zombie_h4.animations.play('eat', 5, true);
    //zombie_h.scale.x = -1;
    zombie_h4.body.velocity.x = 0;

    var myvar = setInterval(function () {

        if (plant.health > 0) {
            plant.health--;
            zombie.health--;
            console.log(zombie.health + ',' + plant.health);
        } else {
            zombie_4_survived = 1;
            emitter.x = plant.body.x;
            emitter.y = plant.body.y;
            emitter.start(true, 2000, null, 10);
        }

        if (zombie_4_survived) {
            console.log('survived!!');
            zombie_m.reset(plant.body.x + 48, plant.body.y + 32);
            plant.kill();
            zombie_h4.kill();
            zombie_m.animations.add('walk');
            zombie_m.animations.play('walk', 5, true);
            //zombie_m.scale.x = -1;
            zombie_m.body.velocity.x = -20;
            zombie_4_survived = 0;
            zombie_4_attacking--;
            clearInterval(myvar);
        }
        if (zombie.health == 0) {
            clearInterval(myvar);
            zombie_4_attacking--;
            if (zombie_4_attacking == 0) zombie_h4.kill();
        }

    }, 1000);

}

var zombie_5_survived = 0;
function zombie5_at_p(plant, zombie) {

    var zombie_h5 = zombie_attack_5.getFirstExists(false);
    var zombie_m = zombie_5.getFirstExists(false);
    ///zombie.kill();
    zombie_h5.reset(plant.body.x + 48, plant.body.y + 42);
    zombie.kill();
    zombie_h5.animations.add('eat');
    zombie_h5.animations.play('eat', 5, true);
    //zombie_h.scale.x = -1;
    zombie_h5.body.velocity.x = 0;

    var myvar = setInterval(function () {

        if (plant.health > 0) {
            plant.health--;
            zombie.health--;
            //console.log(zombie.health +',' +plant.health);
        } else {
            zombie_5_survived = 1;
            emitter.x = plant.body.x;
            emitter.y = plant.body.y;
            emitter.start(true, 2000, null, 10);
        }

        if (zombie_5_survived) {
            //console.log('survived');
            zombie_h5.kill();
            zombie_m.reset(plant.body.x + 48, plant.body.y + 46);
            plant.kill();
            zombie_m.animations.add('walk');
            zombie_m.animations.play('walk', 5, true);
            zombie_m.body.velocity.x = -20;
            zombie_5_survived = 0;
            zombie_5_attacking--;
            clearInterval(myvar);
        }
        if (zombie.health == 0) {
            clearInterval(myvar);
            zombie_5_attacking--;
            if (zombie_5_attacking == 0) zombie_h5.kill();
        }

    }, 5000);

    ///emitter.x = plant.body.x;
    ///emitter.y = plant.body.y;
    ///emitter.start(true, 2000, null, 10);
    //setTimeout(zombie1_at_pp(plant, zombie_h), 5000);
    /*setTimeout(function(){

        emitter.x = plant.body.x;
        emitter.y = plant.body.y;
        emitter.start(true, 2000, null, 10);
        zombie_h.kill();
        zombie_m.reset(plant.body.x + 48, plant.body.y + 46);
        plant.kill();
        zombie_m.animations.add('walk');
        zombie_m.animations.play('walk', 5, true);
        //zombie_m.scale.x = -1;
        zombie_m.body.velocity.x = -20;
    }, 5000);*/

}

///
function remove_plant(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (map[i][j] == 1 && i != 0 && game.time.now >= shovel_cheating_cooldown) {
        //map[i][j].plant.kill();
        var Shovel = shovel.getFirstExists(false);
        if (Shovel) {
            map[i][j] = 0;
            Shovel.reset((j * 64), i * 64);
            shovel_cheating_cooldown = game.time.now + 150;
        }
    }
}

function place_Plants_1(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplacePlant(i, j) && game.time.now >= plant_01_cooldown && money_p >= plant_cost_0) {
        money_p -= plant_cost_0;

        client.setMoney(client.teamName, money_p);

        var plant = plant_01.getFirstExists(false);
        if (plant) {
            map[i][j] = 1;

            client.addPlant({
                x: (j * 64) + 15,
                y: (i * 64) + 15
            }, 1);

            plant.reset((j * 64) + 15, (i * 64) + 15);
            
            plant.health = 5;
            plant.animations.add('wave', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, true);
            plant.animations.play('wave', 11, true);
            plant_01_cooldown = game.time.now + 1000;
        }
    }
}

function place_wallnut(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplacePlant(i, j) && game.time.now >= wallnut_cooldown && money_p >= plant_cost_1) {
        money_p -= plant_cost_1;

        client.setMoney(client.teamName, money_p);

        var Wallnut = wallnut.getFirstExists(false);
        if (Wallnut) {
            map[i][j] = 1;

            client.addPlant({
                x: (j * 64) + 15,
                y: (i * 64) + 15
            }, 4);
            
            Wallnut.reset((j * 64) + 15, (i * 64) + 15);
            Wallnut.health = 20;
            Wallnut.animations.add('wave', [0, 1, 2, 3, 4], 5, true);
            Wallnut.animations.play('wave', 5, true);
            wallnut_cooldown = game.time.now + 1000;
        }
    }
}

function place_Plants_2(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplacePlant(i, j) && game.time.now >= plant_02_cooldown && money_p >= plant_cost_2) {
        money_p -= plant_cost_2;

        client.setMoney(client.teamName, money_p);

        var plant2 = plant_02.getFirstExists(false);
        if (plant2) {
            map[i][j] = 1;

            client.addPlant({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 2);
            
            plant2.reset((j * 64) + 15, (i * 64) + 15);
            //map[i][j] == 1;
            plant2.health = 5;
            plant2.animations.add('wave', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, true);
            plant2.animations.play('wave', 11, true);
            plant_02_cooldown = game.time.now + 1000;
        }
    }
}

function place_Plants_3(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplacePlant(i, j) && game.time.now >= plant_03_cooldown && money_p >=plant_cost_4) {
        money_p -= plant_cost_4;
        client.setMoney(client.teamName, money_p);

        var Hypno_shroom = plant_03.getFirstExists(false);
        if (Hypno_shroom) {
            map[i][j] = 1;

            client.addPlant({
                x: (j * 64) + 15,
                y: (i * 64) + 15
            }, 3);
            
            Hypno_shroom.reset((j * 64) + 15, (i * 64) + 15);
            Hypno_shroom.animations.add('wave', [0, 1, 2], 3, true);
            Hypno_shroom.animations.play('wave', 3, true);
            plant_03_cooldown = game.time.now + 1000;
        }
    }
}

function place_potato_mine(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);

    if (canplacePlant(i, j) && game.time.now >= potato_mine_cooldown && money_p >= plant_cost_5) {
        var Potato_mine = potato_mine.getFirstExists(false);
        money_p -= plant_cost_5;
        client.setMoney(client.teamName, money_p);

        if (Potato_mine) {
            map[i][j] = 1;

            client.addPlant({
                x: (j * 64) + 15,
                y: (i * 64) + 15
            }, 5);
            
            Potato_mine.reset((j * 64) + 15, (i * 64) + 15);
            Potato_mine.animations.add('came above ground', [0], 1, false);
            Potato_mine.animations.play('came above ground', 2, false);
            potato_mine_cooldown = game.time.now + 1000;
            setTimeout(function () {
                console.log('time to rise');
                var potato_anim = Potato_mine.animations.add('rise', [1, 2, 3, 4, 5], 5, false);
                Potato_mine.play('rise', 5, false);
                potato_anim.onComplete.add(function (potato) { potato.animations.add('loop', [3, 4], 2, true); potato.play('loop', 2, true); }, this);
                Potato_mine.health = 5;
            }, 10000)
        }
    }
}

function place_chomper(pointer) {
    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplacePlant(i, j) && game.time.now >= chomper_cooldown && money_p >= plant_cost_3) {
        money_p -= plant_cost_3;
        client.setMoney(client.teamName, money_p);

        var Chomper = chomper.getFirstExists(false);
        if (Chomper) {
            Chomper.eating_cooldown = 0;
            //console.log(Chomper.eating_cooldown);
            //Chomper.reset((j * 64 + 80 + 60 * (j - 1)), (i * 64 + 65 + 65 * (i - 1)));
            map[i][j] = 1;
            Chomper.reset((j * 64), (i * 64));
            Chomper.health = 5;

            client.addPlant({
                x: (j * 64),
                y: (i * 64)
            }, 6);
            
            Chomper.animations.add('rest', [0, 1, 2, 3, 4], 5, true);
            Chomper.animations.play('rest', 5, true);
            chomper_cooldown = game.time.now + 1000;
        }
    }
}

function placesun_1(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceSun(i, j) && money_p >= sunflower_cost && game.time.now > sun_break) {
        //skillText_1.text = 'Wait...';
        money_p -= sunflower_cost;
        map[i][j] = 1;

        client.setMoney(client.teamName, money_p);

        var sun = sun_1.getFirstExists(false);
        if (sun) {

            client.addPlant({
                x: (j * 64),
                y: (i * 64)
            }, 0);

            sun.reset((j * 64), (i * 64));
            sun.health = 5;
            sun.animations.add('sunflower', [0, 1, 2, 3, 4, 5, 6, 7]);
            sun.animations.play('sunflower', 5, true);
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            sun_break = game.time.now + 500;
        }
    }
}
function canplacePlant(i, j) {
    //console.log(i + ',' + j);
    if (i >= 10) return 0;
    if (j < 1) return 0;
    if (j > 9) return 0;
    if (map[i][j] == 1) console.log('planted');
    if (map[i][j] == 0) {
        console.log(i + ',' + j);
        return 1;
    }
    else return 0;
}

function plant_01_weapon_update(time, delta) {
    if (time > plant_01_weapon_time) {
        this.fire();
        plant_01_weapon_time = time + 1000;
    }
}

function bullet_destory(bullet, enemy) {
    bullet.kill();
    enemy.health--;
    console.log(enemy.health);
    if (enemy.health == 0) {

        enemy.kill();
        z_death.play();
    }
}

function snow_bullet_destroy(bullet, enemy) {
    bullet.kill();
    enemy.body.velocity.x = -10;
    enemy.health--;
    if (enemy.health == 0) {

        enemy.kill();
        z_death.play();
    }
}

function move_mower(mower, zombie) {
    client.moveMower(mower._idx, zombie.key);

    mower.body.velocity.x = 500;
    zombie.kill();
    z_death.play();
}

function chomper_KILL(chomper, zombie) {
    if (chomper.eating_cooldown == 0) {
        chomper.eating_cooldown = 1;
        zombie.kill();
        z_death.play();
        chomper.animations.stop(null, this);
        var anim = chomper.animations.add('EAT', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, false);
        chomper.play('EAT', 15, false);
        anim.onComplete.add(this.play_chomper_eating, this);
    }
}

function play_chomper_eating(chomper) {
    anim_chomper = chomper.animations.add('eating', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], 45, true);
    chomper.animations.play('eating', 30, true);
    eating++;
    chomper_eating_cooldown = game.time.now + 1000;
}

function chomper_eating_counter(chomper, animation) {
    if (animation.loopCount == 5) animation.loop = false;
}

function chomper_available(chomper) {
    chomper.animations.add('rest', [0, 1, 2, 3, 4], 5, true);
    chomper.animations.play('rest', 5, true);
    chomper.eating_cooldown = 0;
    eating--;
}

function potato_EXPOSION(potato, zombie) {
    console.log(potato.health);
    if (potato.health == 5) {
        potato.kill();
        zombie.kill();
        e_death.play();
        var explosion = explosions.getFirstExists(false);
        explosion.reset(potato.body.x + 16, potato.body.y + 16);
        explosion.play('kaboom', 30, false, true);
    }
}

function wallnut_block(wallnut, zombie) {
    zombie.body.velocity.x = 0;
}

function hypnotise(hypnoShroom, zombie) {
    zombie.body.velocity.x = 20;
    zombie.scale.x *= -1;
    hypnoShroom.kill();
}

function plants_lose(plant, zombie) {
    console.log('game over');
}

function coffin_hit(bullet, coffin) {
    bullet.kill();
    coffin.health--;
    //console.log(coffin_idx);
    var life = coffin_lives[coffin_idx].getFirstAlive();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(coffin.body.x + 16, coffin.body.y + 16);
    explosion.play('kaboom', 30, false, true);
    ///var count = 0;
    if (life) life.kill();
    if (coffin.health == 0) {

        coffin.kill();
        system.msg('plants', '正在大殺特殺!');
        count++;
    }
}

function zombie_1_Sutando_attack(bullet, zombie) {
    console.log('zombie_h');
    zombie.kill();
}

function canplaceSun(i, j) {
    if (i > 9) {
        return 0;
    }
    if (map[i][j] == 0) {

        return 1;
    }
    else {

        return 0;
    }
}
function smile(sun) {
    if (client.teamName === 'plants') {
        console.log('click');
        sun.kill();
        money_p += 25;

        client.setMoney(client.teamName, money_p);
    }
}
/*var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        this.dx = 0;
        this.dy = 0;
        this.lifespan = 0;

        client.setMoney(client.teamName, money_p);
    }
}*/

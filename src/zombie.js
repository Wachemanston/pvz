var game = new Phaser.Game(960, 840, Phaser.AUTO, 'phaser-example');
game.state.add('main', { preload: preload, create: create, update: update });
game.state.add('init', { preload: () => { }, create: () => { }, update: () => { } });

var sprite;
var money = 0;

function preload() {

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    game.load.spritesheet('zombie_0', 'assets/mummy.png', 37, 45, 18);
    game.load.spritesheet('zombie_1', 'assets/zombie_0_walk.png', 56, 46);
    game.load.spritesheet('zombie_2', 'assets/zombie_1_walk.png', 42, 56);
    game.load.spritesheet('zombie_3', 'assets/zombie_2_walk.png', 57.5, 62);
    game.load.spritesheet('zombie_4', 'assets/zombie_3_walk.png', 57.5, 57);
    game.load.spritesheet('zombie_5', 'assets/zombie_5_walk.png', 74, 73);

    game.load.image('icon_0', 'assets/mummy_icon_1.png');
    game.load.image('icon_1', 'assets/zombie_icon_0.png');
    game.load.image('icon_2', 'assets/zombie_icon_1.png');
    game.load.image('icon_3', 'assets/zombie_icon_2.png');
    game.load.image('icon_4', 'assets/zombie_icon_3.png');
    game.load.image('icon_5', 'assets/zombie_icon_5.png');

    game.load.image('background', 'assets/bg_0.jpg');
    game.load.image('coffin', 'assets/coffin.png');
    game.load.image('coffin_hp', 'assets/red_bar.png');
    //////sunflower spritesheet loading
    game.load.spritesheet('sunflower0', 'assets/skeleton.png', 64.3, 57, 9);
    game.load.spritesheet('coin_dead', 'assets/coin_dead.png', 16, 16, 12);
    game.load.image('sun0', 'assets/bone.png');
    game.load.image('icon_77', 'assets/skeicon.png');
    ////
    
    // load notifycation img
    system.preload(game);
    //audio
    
    game.load.audio('sound_pl_0', 'assets/sound_pl_0.mp3');
    game.load.audio('sound_pl_1', 'assets/sound_pl_1.mp3');
    game.load.audio('sound_pl_2', 'assets/sound_pl_2.mp3');
    game.load.audio('sound_pl_3', 'assets/sound_pl_3.mp3');
    game.load.audio('sound_pl_4', 'assets/sound_pl_4.mp3');
    game.load.audio('sound_pl_5', 'assets/sound_pl_5.mp3');
    ////
    //plant.js
    plants_preload();
}
///map is for checking , if it is 1 means not allowed to place zombie(or plants), otherwise means allow to place
var map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

var pl_0;
var pl_1;
var pl_2;
var pl_3;
var pl_4;
var pl_5;

var zombie_0;
var zombie_1;
var zombie_2;
var zombie_3;
var zombie_4;
var zombie_5;

var zombie_time_0;
var zombie_time_1;
var zombie_time_2;
var zombie_time_3;
var zombie_time_4;
var zombie_time_5;

var click_0;
var icon_0;
var icon_1;
var icon_2;
var icon_3;
var icon_4;
var icon_5;

var skillText_0;
var skillText_1;
var skillText_2;
var skillText_3;
var skillText_4;
var skillText_5;

var stateText;
var background;
var coffin = new Array(9);
var coffin_lives = new Array(9);
//sun declaration
var livingsun1 = [];
var suntime0;
var icon_7;
var zombie_cost_0 = 50;
var zombie_cost_1 = 50;
var zombie_cost_2 = 50;
var zombie_cost_3 =50;
var zombie_cost_4 = 50;
var zombie_cost_5 = 50;

var sunflower_cost = 0;
var natural_sun;
var sun_break;
var skillText_7;
var moneyText;

function create() {

    background = game.add.tileSprite(0, 64, 960, 840, 'background');
    ///need to wait 10sec before placing zombie when game start
    
    pl_0 = game.add.audio('sound_pl_0');
    pl_1 = game.add.audio('sound_pl_1');
    pl_2 = game.add.audio('sound_pl_2');
    pl_3 = game.add.audio('sound_pl_3');
    pl_4 = game.add.audio('sound_pl_4');
    pl_5 = game.add.audio('sound_pl_5');

    zombie_time_0 = 0000;
    zombie_time_1 = 0000;
    zombie_time_2 = 0000;
    zombie_time_3 = 0000;
    zombie_time_4 = 0000;
    zombie_time_5 = 0000;

    suntime0 = 0;
    natural_sun = 0;
    sun_break = 0;
    ///load chessboard
    var graphics = game.add.graphics();
    drawGrid(graphics);
    ///load zombie 0 ~ 2
    zombie_0 = game.add.group();
    zombie_0.enableBody = true;
    zombie_0.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_0.createMultiple(50, 'zombie_0');
    zombie_0.setAll('anchor.x', 0.5);
    zombie_0.setAll('anchor.y', 1);
    zombie_0.setAll('outOfBoundsKill', true);
    zombie_0.setAll('checkWorldBounds', true);
    zombie_0.setAll('health', 5);

    zombie_1 = game.add.group();
    zombie_1.enableBody = true;
    zombie_1.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_1.createMultiple(50, 'zombie_1');
    zombie_1.setAll('anchor.x', 0.5);
    zombie_1.setAll('anchor.y', 1);
    zombie_1.setAll('outOfBoundsKill', true);
    zombie_1.setAll('checkWorldBounds', true);
    zombie_1.setAll('health', 10);

    zombie_2 = game.add.group();
    zombie_2.enableBody = true;
    zombie_2.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_2.createMultiple(50, 'zombie_2');
    zombie_2.setAll('anchor.x', 0.5);
    zombie_2.setAll('anchor.y', 1);
    zombie_2.setAll('outOfBoundsKill', true);
    zombie_2.setAll('checkWorldBounds', true);
    zombie_2.setAll('health', 10);

    zombie_3 = game.add.group();
    zombie_3.enableBody = true;
    zombie_3.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_3.createMultiple(50, 'zombie_3');
    zombie_3.setAll('anchor.x', 0.5);
    zombie_3.setAll('anchor.y', 1);
    zombie_3.setAll('outOfBoundsKill', true);
    zombie_3.setAll('checkWorldBounds', true);
    zombie_3.setAll('health', 10);

    zombie_4 = game.add.group();
    zombie_4.enableBody = true;
    zombie_4.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_4.createMultiple(50, 'zombie_4');
    zombie_4.setAll('anchor.x', 0.5);
    zombie_4.setAll('anchor.y', 1);
    zombie_4.setAll('outOfBoundsKill', true);
    zombie_4.setAll('checkWorldBounds', true);
    zombie_1.setAll('health', 10);

    zombie_5 = game.add.group();
    zombie_5.enableBody = true;
    zombie_5.physicsBodyType = Phaser.Physics.ARCADE;
    zombie_5.createMultiple(50, 'zombie_5');
    zombie_5.setAll('anchor.x', 0.5);
    zombie_5.setAll('anchor.y', 1);
    zombie_5.setAll('outOfBoundsKill', true);
    zombie_5.setAll('checkWorldBounds', true);
    zombie_1.setAll('health', 10);
    //load coffin
    for (var i = 0; i < 9; i++) {

        coffin[i] = game.add.group();
        coffin[i].enableBody = true;
        coffin[i].physicsBodyType = Phaser.Physics.ARCADE;
        coffin[i].setAll('health', 9);
    }
    //load coffin lives
    for (var i = 0; i < 9; i++) {

        coffin_lives[i] = game.add.group();
    }

    //load zombie icon 0 ~ 2
    var set_flag = 0;

    if (zombie_tag[0] == 1) {
        icon_0 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_0');
        icon_0.alpha = 0.5;
        icon_0.scale.x = -1;
        icon_0.anchor.set(0.5);
        icon_0.inputEnabled = true;
        skillText_0 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    if (zombie_tag[1] == 1) {
        console.log('in');
        icon_1 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_1');
        icon_1.alpha = 0.5;
        icon_1.scale.x = -1;
        icon_1.anchor.set(0.5);
        icon_1.inputEnabled = true;
        skillText_1 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    if (zombie_tag[2] == 1) {
        icon_2 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_2');
        icon_2.alpha = 0.5;
        icon_2.anchor.set(0.5);
        icon_2.inputEnabled = true;
        skillText_2 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    if (zombie_tag[3] == 1) {
        icon_3 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_3');
        icon_3.alpha = 0.5;
        icon_3.anchor.set(0.5);
        icon_3.inputEnabled = true;
        skillText_3 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    if (zombie_tag[4] == 1) {
        icon_4 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_4');
        icon_4.alpha = 0.5;
        icon_4.anchor.set(0.5);
        icon_4.inputEnabled = true;
        skillText_4 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    if(zombie_tag[5]==1){
        icon_5 = game.add.sprite(game.world.centerX + (7 - set_flag) * 64, game.world.centerY - 6.1 * 64, 'icon_5');
        icon_5.alpha = 0.5;
        icon_5.anchor.set(0.5);
        icon_5.inputEnabled = true;
        skillText_5 = game.add.text(64 * (14.15 - set_flag++), 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    }
    //console.log(zombie_tag[2]);
    //////sun icon
    icon_7 = game.add.sprite(game.world.centerX + 1 * 64, game.world.centerY - 6.1 * 64, 'icon_77');
    icon_7.alpha = 0.5;
    icon_7.anchor.set(0.5);
    icon_7.inputEnabled = true;

    /////
    create_Coffin();
    game.input.addMoveCallback(p, this);///for debuging
    //money declaration
    //game.global.money=0;

    sun_0 = game.add.group();
    sun_0.enableBody = true;
    sun_0.physicsBodyType = Phaser.Physics.ARCADE;
    sun_0.createMultiple(50, 'sunflower0');
    sun_0.setAll('anchorx', 0.5);
    sun_0.setAll('anchory', 1);
    sun_0.setAll('outOfBoundsKill', true);
    sun_0.setAll('checkWorldBounds', true);

    suns = game.add.group();
    suns.enableBody = true;
    suns.physicsBodyType = Phaser.Physics.ARCADE;
    suns.inputEnableChildren = true;
    suns.createMultiple(30, 'sun0');
    suns.setAll('anchor.x', 0.5);
    suns.setAll('anchor.y', 1);
    suns.setAll('outOfBoundsKill', true);
    suns.setAll('checkWorldBounds', true);
    suns.onChildInputUp.add(onDown, this, true);


    ///////////////////////////////////////////////////////////////

    ///let player know if their zombie cd time is over or not



    //current money
    skillText_7 = game.add.text(64 * 8.15, 48, 'Wait...', { font: '13px Arial', fill: '#FFF' });
    moneyText = game.add.text(64 * 6.15, 64 * 11, 'current money= ' + money, { font: '20px Arial', fill: '#FFF' });
    if (client.teamName === 'plants') moneyText.visible = false;

    ///show 'PAUSE' in center when game pause, otherwise don't show
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '84px Arial', fill: '#FFF' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    //load coffin hp
    
    for (var j = 0; j < 9; j++) {

        for (var i = 0; i < 9; i++) {

            var insect = coffin_lives[j].create(680 + (13 * i), 650 + j * 17.5, 'coffin_hp');
            insect.anchor.setTo(0.5, 0.5);
            insect.alpha = 1;
        }
    }

    //game pause function
    window.onkeydown = function (event) {

        if (event.keyCode == 80) {
            game.paused = !game.paused;
        }
        if (game.paused === false) {

            stateText.visible = false;
        }
        else {

            stateText.text = " PAUSE \n Press P To Resume";
            stateText.visible = true;
        }
    }

    // create 3 types frame
    system.create(game);

    client.on('setZombie', (type, children) => {

        var updatePos = (child, i) => {
            child.x = children[i];
        }
        console.log(type, children)
        switch (type) {
            case 0:
                //for (let i = 0; i < 50; i++) { zombie_0.set(zombie_0.children[0]) = children; }
                zombie_0.forEachAlive((child, idx) => {
                    updatePos(child, idx);
                });
                break;
            /*case 1: placeZombie_1(pointer); break;
            case 2: placeZombie_2(pointer); break;
            case 3: placeZombie_3(pointer); break;
            case 4: placeZombie_4(pointer); break;
            case 5: placeZombie_5(pointer); break;*/
        }
    });

    client.on('addZombie', (pointer, type, children) => {

        // do something, ex:
        console.log(type, pointer, children)
        switch (type) {
            case 0: placeZombie_0(pointer); break;
            case 1: placeZombie_1(pointer); break;
            case 2: placeZombie_2(pointer); break;
            case 3: placeZombie_3(pointer); break;
            case 4: placeZombie_4(pointer); break;
            case 5: placeZombie_5(pointer); break;
            case 6: placesun_0(pointer); break;
        }
    });

    client.on('setMoney', (team, update_money) => {
        // do something, ex:
        console.log(team, update_money)
        if (team === 'plants') {
            money_p =  update_money;
        } else {
            money =  update_money;
        }
    });

    client.on('gameResult', (winner) => {
        system.gameResult(winner);
    });
    //plants.js
    plants_create();
}
//create coffin function
function create_Coffin() {

    var coffin_i = new Array(9);
    for (var i = 0; i < 9; i++) {

        coffin_i[i] = coffin[i].create(14.5 * 64, (i + 1.5) * 64, 'coffin');
        coffin_i[i].anchor.setTo(0.5, 0.5);
        coffin_i[i].health = 9;
        //coffin_i[i].body.moves = false;

    }

}
//  update isn't called until 'create' has completed. If you need to process stuff before that point (i.e. while the preload is still happening)
//  then create a function called loadUpdate() and use that
function update() {

    zombie_0.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });
    zombie_1.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });
    zombie_2.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });
    zombie_3.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });
    zombie_4.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });
    zombie_5.forEach(sprite => {

        if(!sprite.inWorld){

            stateText.text=" Zombie Win!!!\n";
            stateText.visible = true;

            system.gameResult('zombies');
        }
    });

    if (client.teamName === 'zombies') {
        client.setZombie(0, zombie_0.children.map(child => { return child.position.x }));
    }

    /*if (sprite.x >= 300)
    {
        sprite.scale.x += 0.01;
        sprite.scale.y += 0.01;
    }*/
    //showing current money
    moneyText.text = 'current money= ' + money;

    ///select zombie you want to use now 

    if (zombie_tag[0] == 1 && icon_0.input.pointerOver()) {

        if (game.input.mousePointer.isDown) {

            icon_0.alpha = 1;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[2] == 1) icon_2.alpha = 0.5;
            if (zombie_tag[3] == 1)icon_3.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[5] == 1)icon_5.alpha = 0.5;
            icon_7.alpha = 0.5;//
           
        }
    }
    if (zombie_tag[1] == 1 && icon_1.input.pointerOver()) {

        if (game.input.mousePointer.isDown) {

            icon_1.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[2] == 1) icon_2.alpha = 0.5;
            if (zombie_tag[3] == 1)icon_3.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[5] == 1)icon_5.alpha = 0.5;
            icon_7.alpha = 0.5;//
        }
    }

    if (zombie_tag[2] == 1 && icon_2.input.pointerOver()) {
        if (game.input.mousePointer.isDown) {

            icon_2.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[3] == 1)icon_3.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[5] == 1)icon_5.alpha = 0.5;

            icon_7.alpha = 0.5;//
        }
    }

    if (zombie_tag[3] == 1 && icon_3.input.pointerOver()) {
        if (game.input.mousePointer.isDown) {

            icon_3.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[2] == 1)icon_2.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[5] == 1)icon_5.alpha = 0.5;

            icon_7.alpha = 0.5;//
        }
    }

    if (zombie_tag[4] == 1 && icon_4.input.pointerOver()) {
        if (game.input.mousePointer.isDown) {

            icon_4.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[3] == 1) icon_3.alpha = 0.5;
            if (zombie_tag[2] == 1) icon_2.alpha = 0.5;
            if (zombie_tag[5] == 1) icon_5.alpha = 0.5;

            icon_7.alpha = 0.5;//
        }
    }

    if (zombie_tag[5] == 1 && icon_5.input.pointerOver()) {
        if (game.input.mousePointer.isDown) {

            icon_5.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[3] == 1)icon_3.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[2] == 1)icon_2.alpha = 0.5;

            icon_7.alpha = 0.5;//
        }
    }

    ///sun_icon clicked
    if (client.teamName=='zombies'&&icon_7.input.pointerOver()) {

        if (game.input.mousePointer.isDown) {

            icon_7.alpha = 1;
            if (zombie_tag[0] == 1) icon_0.alpha = 0.5;
            if (zombie_tag[1] == 1) icon_1.alpha = 0.5;
            if (zombie_tag[2] == 1) icon_2.alpha = 0.5;
            if (zombie_tag[3] == 1)icon_3.alpha = 0.5;
            if (zombie_tag[4] == 1)icon_4.alpha = 0.5;
            if (zombie_tag[5] == 1)icon_5.alpha = 0.5;
        }
    }
    ///place zombie and check which zombie you are using now
    if (game.input.mousePointer.isDown) {

        //console.log('123');
        if (zombie_tag[0] == 1 && icon_0.alpha == 1) {

            placeZombie_0(game.input);
        }
        else if (zombie_tag[1] == 1 && icon_1.alpha == 1) {

            placeZombie_1(game.input);
        }
        else if (zombie_tag[2] == 1 && icon_2.alpha == 1) {

            placeZombie_2(game.input);
        }
        else if (zombie_tag[3] == 1 &&icon_3.alpha == 1) {

            placeZombie_3(game.input);
        }
        else if (zombie_tag[4] == 1 &&icon_4.alpha == 1) {

            placeZombie_4(game.input);
        }
        else if (zombie_tag[5] == 1 &&icon_5.alpha == 1) {

            placeZombie_5(game.input);
        }
        //
        else if (icon_7.alpha == 1) {
            placesun_0(game.input);/////hide here
        }

    }
    ///for zombie cd time
    if (zombie_tag[0] == 1) {
        if (money >= zombie_cost_0) {
            skillText_0.text = 'Ready!';
        }
        else
            skillText_0.text = 'Wait...';
    }
    if (zombie_tag[1] == 1) {
        if (money >= zombie_cost_1) {
            skillText_1.text = 'Ready!';
        }
        else
            skillText_1.text = 'Wait...';
    }
    if (zombie_tag[2] == 1) {
        if (money >= zombie_cost_2) {
            skillText_2.text = 'Ready!';
        }
        else
            skillText_2.text = 'Wait...';
    }
    if (zombie_tag[3] == 1) {
        if (money >= zombie_cost_3) {
            skillText_3.text = 'Ready!';
        }
        else
            skillText_3.text = 'Wait...';
    }
    if (zombie_tag[4] == 1) {
        if (money >= zombie_cost_4) {
            skillText_4.text = 'Ready!';
        }
        else
            skillText_4.text = 'Wait...';
    }
    if (zombie_tag[5] == 1) {
        if (money >= zombie_cost_5) {
            skillText_5.text = 'Ready!';
        }
        else
            skillText_5.text = 'Wait...';
    }

    if (money >= sunflower_cost) {
        skillText_7.text = 'Ready!';
    }
    else
        skillText_7.text = 'Wait...';

    /*for(var i = 0; i < 9; i++){

        game.physics.arcade.overlap(bullet_0, coffin[i], bullet_hit_coffin, null, this);
    }*/
    /////////sun appearing
    livingsun1.length = 0;
    sun_0.forEachAlive(function (sun) {
        livingsun1.push(sun);
    });

    if (game.time.now > suntime0) {
        if (livingsun1.length > 0) {
            //var random = this.rnd.integerInRange(0, livingsun1.length - 1);
            //var shooter = livingsun1[random];
            var i = 1;
            //console.log('in');
            livingsun1.forEach(shooter => {
                setTimeout(function () {
                    let sun_shot = suns.getFirstExists(false);
                    sun_shot.reset(shooter.body.x + 50, shooter.body.y + 100);
                    //console.log('in',i);
                    //suntime0 = game.time.now + 7000;
                    sun_shot.body.velocity.y = 100;
                }, 1000 * i);
                i++;

            });
            suntime0 = game.time.now + 12000;
        }
    }
    if (game.time.now > natural_sun) {
        let sun_shot = suns.getFirstExists(false);
        sun_shot.reset(10 * 64, 0);
        sun_shot.body.velocity.y = 100;
        natural_sun = game.time.now + 14000;
    }

    //plants.js
    plants_update();
}

function p(pointer) {/// for debuging

    // console.log(pointer.);
    //console.log(pointer.event);

}
///draw chessboard function
function drawGrid(graphics) {
    graphics.lineStyle(1, 0xffffff, 0.8);
    for (var i = 0; i < 11; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(960, i * 64);
    }
    for (var j = 0; j < 15; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 640);
    }

}
///place zombie function
function placeZombie_0(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);

    if (canplaceZombie_0(i, j) && money >= zombie_cost_0 && game.time.now >= zombie_time_0) {

        pl_0.play();
        money -= zombie_cost_0;
        console.log(money);

        client.setMoney(client.teamName, money);
        /* if(money<zombie_cost_0){
             skillText_0.text = 'Wait...';
         }    */
        var zombie = zombie_0.getFirstExists(false);
        if (zombie) {
            console.log('add');
            console.log(zombie_0.children)
            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 0);//, zombie_0.children.map(child => { return child.position.x}));*/

            zombie.reset((j * 64) + 32, (i * 64) + 48);
            zombie.health = 5;
            //console.log(zombie.health);
            zombie.animations.add('walk');
            zombie.animations.play('walk', 5, true);
            zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_0 = game.time.now + 500;
        }
    }
}
function placeZombie_1(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceZombie_0(i, j) && money >= zombie_cost_1 && game.time.now >= zombie_time_1) {
        
        pl_1.play();
        money -= zombie_cost_1;
        console.log(money);

        client.setMoney(client.teamName, money);
        /*if(money<zombie_cost_1){
            skillText_1.text = 'Wait...';
        }    */
        var zombie = zombie_1.getFirstExists(false);
        if (zombie) {

            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 1);

            zombie.reset((j * 64) + 32, (i * 64) + 48);
            zombie.health = 12;
            zombie.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7]);
            zombie.animations.play('walk', 5, true);
            zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_1 = game.time.now + 500;
        }
    }
}
function placeZombie_2(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceZombie_0(i, j) && money >= zombie_cost_2 && game.time.now >= zombie_time_2) {
        
        pl_2.play();
        money -= zombie_cost_2;
        console.log(money);

        client.setMoney(client.teamName, money);
        /*if(money<zombie_cost_2){
            skillText_2.text = 'Wait...';
        }        */
        var zombie = zombie_2.getFirstExists(false);
        if (zombie) {

            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 2);

            zombie.reset((j * 64) + 32, (i * 64) + 56);
            zombie.health = 10;
            zombie.animations.add('walk');
            zombie.animations.play('walk', 5, true);
            //zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_2 = game.time.now + 500;
        }
    }
}
function placeZombie_3(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceZombie_0(i, j) && money >= zombie_cost_3 && game.time.now >= zombie_time_3) {
        
        pl_3.play();
        money -= zombie_cost_3;
        console.log(money);

        client.setMoney(client.teamName, money);
        /*if(money<zombie_cost_2){
            skillText_2.text = 'Wait...';
        }        */
        var zombie = zombie_3.getFirstExists(false);
        if (zombie) {

            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 3);

            zombie.reset((j * 64) + 32, (i * 64) + 56);
            zombie.health = 10;
            zombie.animations.add('walk');
            zombie.animations.play('walk', 5, true);
            //zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_3 = game.time.now + 500;
        }
    }
}
function placeZombie_4(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceZombie_0(i, j) && money >= zombie_cost_4 && game.time.now >= zombie_time_4) {
        
        pl_4.play();
        money -= zombie_cost_4;
        console.log(money);

        client.setMoney(client.teamName, money);
        /*if(money<zombie_cost_2){
            skillText_2.text = 'Wait...';
        }        */
        var zombie = zombie_4.getFirstExists(false);
        if (zombie) {

            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 4);

            zombie.reset((j * 64) + 32, (i * 64) + 48);
            zombie.health = 10;
            zombie.animations.add('walk');
            zombie.animations.play('walk', 5, true);
            //zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_4 = game.time.now + 500;
        }
    }
}
function placeZombie_5(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceZombie_0(i, j) && money >= zombie_cost_5 && game.time.now >= zombie_time_5) {
        
        pl_5.play();
        money -= zombie_cost_5;
        console.log(money);

        client.setMoney(client.teamName, money);
        /*if(money<zombie_cost_2){
            skillText_2.text = 'Wait...';
        }        */
        var zombie = zombie_5.getFirstExists(false);
        if (zombie) {

            client.addZombie({
                x: (j * 64) + 32,
                y: (i * 64) + 48
            }, 5);

            zombie.reset((j * 64) + 32, (i * 64) + 64);
            zombie.health = 10;
            zombie.animations.add('walk');
            zombie.animations.play('walk', 5, true);
            //zombie.scale.x = -1;
            zombie.body.velocity.x = -20;
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            zombie_time_5 = game.time.now + 500;
        }
    }
}
function placesun_0(pointer) {

    var i = Math.floor(pointer.y / 64);
    var j = Math.floor(pointer.x / 64);
    if (canplaceSun(i, j) && money_p >= sunflower_cost && game.time.now > sun_break) {
        //skillText_1.text = 'Wait...';
        money -= sunflower_cost;
        map[i][j] = 1;

        client.setMoney(client.teamName, money);

        var sun = sun_0.getFirstExists(false);
        if (sun) {

            client.addZombie({
                x: (j * 64),
                y: (i * 64)
            }, 6);

            sun.reset((j * 64), (i * 64));
            sun.animations.add('sunflower', [ 0,1, 2, 3, 4, 5]);
            sun.animations.play('sunflower', 5, true);
            //game.add.tween(zombie).to({ x: 0}, 100000, Phaser.Easing.Linear.None, true);
            sun_break = game.time.now + 500;
        }
    }
}
///
/*function bullet_hit_coffin(bullet, coffin){

    bullet.kill();
}*/
///determine whether we can place zombie in that place
function canplaceZombie_0(i, j) {
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

function onDown(sun) {
    //console.log(sun);
    //sun.body.velocity.y=0
    //sun.tint = 0x00ff00;
    //console.log(sun);
    if (client.teamName === 'zombies') {
        console.log('cllick');
        sun.kill();
        money += 50;

        client.setMoney(client.teamName, money);
    }
}

//coin particle
var CoinParticle = (function () {
    var CoinParticle = function (game, x, y) {
        Phaser.Particle.call(this, game, x, y, 'coin_dead');
        this.animations.add("rotate");
    };
    CoinParticle.prototype = Object.create(Phaser.Particle.prototype);
    CoinParticle.prototype.constructor = CoinParticle;
    CoinParticle.prototype.onEmit = function () {
        this.animations.stop("rotate", true);
        this.animations.play("rotate", 60, true);
        this.animations.getAnimation('rotate').frame = Math.floor(Math.random() * this.animations.getAnimation('rotate').frameTotal);
    }
    return CoinParticle;
}());

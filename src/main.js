var client = new Client();
var system = null;
// 使用者玩太久
var pornBlock = false;
var zombie_tag=[0,0,0,0,0,0];///
var plant_tag=[0,0,0,0,0,0];
var tag_length=0;
var ptag_length=0;
var enter_allowed=false;
var penter_allowed=false;
var enter_allowed=false;
var surprise = window.setTimeout(() => {
    window.location.replace('https://www.pornhub.com/view_video.php?viewkey=ph5be7dad4a0163');//歡迎各位推薦網址
}, 540000);
window.setTimeout(() => {
    if (!window.confirm('u get last 1 minutes to finish this game...') || pornBlock ) window.clearTimeout(surprise);
}, 480000);

function getPoiterPosition(e) {
    var rect = e.target.getBoundingClientRect();
    var gx = Math.floor((e.clientX - rect.x) / 64);
    var gy = Math.min(9, Math.floor((e.clientY - rect.y) / 64));

    return {
        x: 64 * gx,
        y: 64 * gy,
        gx: gx,
        gy: gy
    }
}

function _select(e,seq){
    //e.target.alpha=e.target.alpha==0.5?1:0.5;=
    e[0].target.style.opacity=e[0].target.style.opacity==0.5?1:0.5;
    if(e[0].target.style.opacity==0.5){
        if(client.teamName=='zombies'){
            zombie_tag[seq]=1;
            tag_length++;
        }
        else if(client.teamName=='plants'){
            plant_tag[seq]=1;
            ptag_length++;
        }
    }
    else {
        if(client.teamName=='zombies'){
            zombie_tag[seq]=0;
            tag_length--;
        }
        else if(client.teamName=='plants'){
            plant_tag[seq]=0;
            ptag_length--;
        }
        
    }

    if(client.teamName=='zombies'&&tag_length==5){
        //lalert('go!');
        enter_allowed=true;
    }
    else if(client.teamName=='plants'&& ptag_length==5){
        
        penter_allowed=true;
    }
    else if(client.teamName=='zombies'&& tag_length!=5){
        enter_allowed=false;
    }
    else if(client.teamName=='plants' && ptag_length!=5){
        penter_allowed=false;
    }
}
class System {
    constructor() {
        this.notifyIssue = '';
        this.frameZbi = null;
        this.framePlt = null;
        this.frameNtfy = null;
        this.px = 0;
        this.py = 0;
        this.init_process = 'username';
        this.next_process = {
            'username': 'matching',
            'matching': 'join',
            'join': 'character',
            'character': 'username'
        }

        // work function
        this.notifyFrame = this.notifyFrame.bind(this);

        client.on('frameNotify', (type, x, y) => {
            this.addFrame(type, x, y);
        });
    }
    get initProcess() { return this.init_process; }
    set setInitProcess(pcs) { this.init_process = pcs; }

    preload(gm) {
        gm.load.image('frameZombie', 'assets/frameZombie.png');
        gm.load.image('framePlant', 'assets/framePlant.png');
        gm.load.image('frameNotify', 'assets/frameNormal.png');
    }

    create(gm) {
        this.framePlt = gm.add.sprite(0, 0, 'framePlant');
        this.framePlt.alpha = 0;
        this.frameZbi = gm.add.sprite(0, 0, 'frameZombie');
        this.frameZbi.alpha = 0;
        this.frameNtfy = gm.add.sprite(0, 0, 'frameNotify');
        this.frameNtfy.alpha = 0;
    }

    nextProcess() {
        this.init_process = this.next_process[this.init_process];
    }

    switchToGame(force=false) {
        if (force) {
            client.initialize('user01', () => {
                client.teamSwitch();
                this.init_process = 'join';
            });
        }
        document.getElementById('start-scene').style.display = 'none';
        document.getElementById('init').style.display = 'none';
        console.log(system)
        // game start
        game.state.start('main');
    }

    createNotify(_opt) {
        let blkEle = document.querySelector('#gaming-notify .block');
        if (!blkEle.parentNode.classList.contains('active')) blkEle.parentNode.classList.add('active');
        blkEle.querySelector('button.btn-check').innerHTML = `OK !`;

        game.paused = true;

        for (let opt in _opt) {
            switch (opt) {
                case 'issue': this.notifyIssue = _opt[opt]; break;
                case 'title': blkEle.querySelector('h3').textContent = _opt[opt]; break;
                case 'msg': blkEle.querySelector('div').innerHTML = _opt[opt]; break;
                case 'btnCheckStyle': blkEle.querySelector('button.btn-gn').style.display = _opt[opt]; break;
            }
        }
    }
    msg(team, _msg) {
        var bar = document.querySelector('#msg-notify');
        bar.innerHTML = `<i class='${team === 'plants' ? 'fas fa-biohazard' : 'fas fa-seedling'}'></i><span data-msg='${_msg}'>${_msg}</span>`;
        bar.style.display = 'table';
        window.setTimeout(() => {
            bar.style.display = 'none';
        }, 3500);
    }

    notifyFrame(e) {
        const { gy, gx, x, y } = getPoiterPosition(e);
        
        if (this.px !== gx || this.py !== gy) {
            var type = 'notify';
            if (gy == 0) {
                if (gx < 8) {
                    type = 'plant';
                } else {
                    type = 'zombie';
                }
            }

            this.addFrame(type, x, y);
            client.frameNotify(type, x, y);
            this.px = gx;
            this.py = gy;
        }
    }

    addFrame(type = 'notify', x = 0, y = 0) {
        this.framePlt.alpha = 0;
        this.frameZbi.alpha = 0;
        this.frameNtfy.alpha = 0;

        switch (type) {
            case 'notify':
                this.frameNtfy.x = x;
                this.frameNtfy.y = y;
                this.frameNtfy.alpha = 1;
                break;
            case 'plant':
                this.framePlt.x = x;
                this.framePlt.y = y;
                this.framePlt.alpha = 1;
                break;
            case 'zombie':
                this.frameZbi.x = x;
                this.frameZbi.y = y;
                this.frameZbi.alpha = 1;
                break;
            default: console.log(type); break;
        }
    }

    gameResult(winner) {

        let html = `<div>${client.teamName === winner ? '<i class="fas fa-trophy mb-2" style="font-size: 5rem;"></i>' : '<i class="fas fa-tired mb-2" style="font-size: 5rem;"></i>'}</div>
                                <div style='66%' class='row mb-2'>
                                    <button class="btn btn-deny pd-23">leave !</button>
                                    <button class="btn btn-check pd-23">new round!</button>
                                </div>`;
        this.createNotify({
            title: `${client.teamName === winner ? 'You Win!' : 'Loser !'}`,
            issue: 'round finished',
            msg: html,
            btnCheckStyle: 'none'
        });
        game.state.start('init');
        // message to the other
        client.gameResult(winner);
    }
}

window.onload = () => {
    // 處理聊天
    client.on('chat', msg => {

        var li = document.createElement('li');
        li.classList.add('matePost');
        li.textContent = msg;
        document.querySelector('#board ul').appendChild(li);
    });
    // handle start play
    document.querySelector('#start-menu button').addEventListener('click', () => {
        document.getElementById('init').style.display = 'flex';
        system.setInitProcess = 'username';
    });
    // handle init process
    document.querySelector('#init').addEventListener('click', e => {
        var target = e.target;
        if (target.nodeName !== 'BUTTON') {
            return false;
        }

        if (system.initProcess == 'username') {
            let iptEle = target.parentNode.querySelector('input[type=text]');
            let username = (typeof iptEle.value !== 'undefined') ? iptEle.value.toString().replace(/ /g, '') : '';
            if (username) {
                if (iptEle.classList.contains('error')) {
                    iptEle.classList.remove('error');
                    target.parentNode.querySelector('.msg-error').classList.add('collapse');
                }
                //  connect to socket
                client.initialize(username);

                // scroll
                var blkEle = document.querySelector('.block');
                blkEle.parentNode.style.top = blkEle.parentNode.style.top - blkEle.clientHeight + 'px';

                // continue process
                system.nextProcess();
            } else {
                //alert user
                iptEle.classList.add('error');
                target.parentNode.querySelector('.msg-error').classList.remove('collapse');
            }
            return;
        } else if (system.initProcess == 'matching') {
            //... ? if matching, roll down

        } else if (system.initProcess == 'join') {

            if (target.classList.contains('btn-deny')) {
                window.location.reload();
                return;
            } else if (target.classList.contains('btn-check')) {
                client.teamSwitch();
                document.getElementById('init').style.display = 'none';
                // continue process
                system.nextProcess();
                return;
            }
        }
    });
    // handle gaming notify
    document.querySelector('#gaming-notify').addEventListener('click', e => {
        var target = e.target;
        if (target.classList.contains('btn-check')) {
            if (system.notifyIssue === 'switch team') {
                document.getElementById('start-scene').style.display = 'none';
                document.querySelector('#gaming-notify button.btn-check').innerHTML = `<i class="fas fa-spinner"></i>&nbsp; wait for another player...`;
                client.handshake(function(){
                    var html = `<div style="background-color:black;">
                    <input type="image" src="assets/${client.teamName=='zombies'?'mummy_icon_1.png':'peashooter_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,0)" />
                    <input type="image" src="assets/${client.teamName=='zombies'?'zombie_icon_0.png':'wallnut_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,1)" />
                    <input type="image" src="assets/${client.teamName=='zombies'?'zombie_icon_1.png':'ice_peashooter_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,2)" />
                    <input type="image" src="assets/${client.teamName=='zombies'?'zombie_icon_2.png':'chomper_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,3)" />
                    <input type="image" src="assets/${client.teamName=='zombies'?'zombie_icon_3.png':'hypno_shroom_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,4)" />
                    <input type="image" src="assets/${client.teamName=='zombies'?'zombie_icon_5.png':'potato_mine_icon.png'}"  alt="send" name="Test" id="Test"
                    onclick="_select(arguments,5)" />
                    </div>`;
                    
                    system.createNotify({
                        issue: 'ban character',
                        title: 'Choose Character',
                        msg: html,
                        btnCheckStyle: 'initial'
                    });
                });
                //system.switchToGame();
            } else if (system.notifyIssue === 'ban character') {
                if ((client.teamName === 'plants' && penter_allowed) || (client.teamName === 'zombies' && enter_allowed)) {
                    document.querySelector('#gaming-notify button.btn-check').innerHTML = `<i class="fas fa-spinner"></i>&nbsp; wait for another player...`;
                    
                    client.handshake(function () {
                        document.querySelector('#gaming-notify').classList.remove('active');
                        
                        system.switchToGame();
                        // continue process
                        system.nextProcess();
                    });
                } 
            } else if (system.notifyIssue === 'round finished') {
                if (target.classList.contains('btn-check')) {
                    document.querySelector('#gaming-notify').classList.remove('active');
                    document.querySelector('.block').top = 0+'px';
                    document.getElementById('init').style.display = 'flex';
                    system.setInitProcess = 'username';
                } else {
                    window.location.reload();
                }
            } else if (system.notifyIssue === 'player leave') {
                window.location.reload();
            }
            //
            game.paused = false;
        }
    });
    // handle chat room btn
    document.querySelector('#content button').addEventListener('click', e => {
        var msg = e.target.parentNode.querySelector('input[type=text]').value;
        var chatBoard = document.querySelector('#board ul');
        if (msg !== '') {
            var li = document.createElement('li');
            li.classList.add('myPost');
            li.textContent = msg;
            chatBoard.appendChild(li);

            // assign to socket
            client.chat(msg);
        }
        return false;
    });

    // declare system
    system = new System();
    //system.switchToGame(true); // u can directly test game by use this method

    document.querySelector('canvas').addEventListener('mousemove', system.notifyFrame);
}
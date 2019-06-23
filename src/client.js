class Client {
    constructor(username,  address){
        this._socketAddress = address || 'http://localhost:8080/';
        this._socket = io.connect(this._socketAddress);
        /*this._socket = {
            eventPair = {},
            on: (funcName, func) => {
                //this.eventPair[funcName] = func;
                firebase.database().ref(`test`).on('value', snapshot => {//${this._roomid}/${funcName}
                    var val = snapshot.val();
                    func(...val);
                });
            },
            emit: (func, roomId, ...argv) => {
                //this.eventPair[func](...argv);
                firebase.database().ref(`test`).set({
                    ...argv
                });
            }
        }*/
        this._username = '',
        this._memberId = '';
        this._roomId = '';
        this._teamName = '';
        this._handshakeFunc = null;

        this._socket.on('room_join', (member, obj) => {
            
            if (system.initProcess === 'matching') {
                // basic infomation
                var spanEle = document.querySelectorAll('#join span'), i =1;

                spanEle[0].textContent = this._roomId;
                for (let mbrId in member) {
                    console.log('user ' + member[mbrId] + ' join room ' + this._roomId);
                    spanEle[i].textContent = member[mbrId];
                    spanEle[i+1].textContent = mbrId;
                    i += 2;
                }

                // scroll down
                var blkEle = document.querySelector('.block');
                blkEle.parentNode.style.top = parseInt(blkEle.parentNode.style.top.replace('px', '')) - blkEle.clientHeight + 'px';

                // continue process
                system.nextProcess();
            }
        });

        this._socket.on('room_broadcast', (member, obj) => {
            console.log(obj);
            if (obj.event === 'add zombie 0') {
                var cfm = window.confirm('add in this game.');
                if(cfm != null && cfm) this.teamSwitch();
            }
        });

        this._socket.on('finish_switch_team', res => {
            let html = `<div style='90%' class='row mb-2'>
                                    <div class='centerlize'><i class='${res[0].team === 'zombies' ? 'fas fa-biohazard' : 'fas fa-seedling'} mb-2'></i><p>${res[0].team}</p><p>${res[0].username}</p><p>${res[0].id === this._memberId ? "it's u" : ""}</p></div>vs
                                    <div class='centerlize'><i class='${res[1].team === 'zombies' ? 'fas fa-biohazard' : 'fas fa-seedling'} mb-2'></i><p>${res[1].team}</p><p>${res[1].username}</p><p>${res[1].id === this._memberId ? "it's u" : ""}</p></div>`;
            system.createNotify({
                issue: 'switch team',
                title: 'New Round',
                msg: html,
                btnCheckStyle: 'initial'
            });
            // hide begin scene
            if (document.getElementById('init').style.display!=='none') document.getElementById('init').style.display = 'none';
            // console log result
            res.forEach(member => {
                console.log('user ' + member.id + ' at team ' + member.team);
                if (member.id === this._memberId) {
                    this._teamName = member.team;
                }
            });
        });

        // if handshake finished
        this._socket.on('finish_handshake', () => {
            this._handshakeFunc();
        });

        this._socket.on('army_set', armyArr => {
            console.log(armyArr);
        });

        /*this._socket.on('team_broadcast', (member, obj) => {
            console.log('user ' + member.username + ' at room' + member.roomId + ', team ' + member.teamName + ', said : ' + obj.msg);
            return this;
        });*/

        this._socket.on('room_change', data => {
            this.roomId = data.roomId;
        }); 

        this._socket.on('room_leave', member => {
            console.log('user ' + member.username+' leave.');
        });

        this._socket.on('member_response', memberArr => {
            
            if (memberArr) {
                var str = memberArr.map(member => {
                    return JSON.stringify(member);
                }).toString();
                console.log('user request data' + str + '.');
            }
        });
        
    }
    get socket() { return this._socket };
    get memberId() { return this._memberId; };
    get socketAddress() { return this._socketAddress; };
    get teamName() { return this._teamName; };
    get roomId() { return this._roomId; };

    // connect to server
    initialize(username, clbk) {
        this._socket.emit('client_initialize', { name: username }, data => {
            this._username = data.username,
            this._memberId = data.memberId;
            this._roomId = data.roomId;
            this._teamName = data.teamName;
            //this._teamMate = data.teamMate;
            console.log(this);
            if (typeof clbk === 'function') clbk(data);
        });
    }

    // room broadcast
    roomBrocast(obj) {
        this.emit('room_broadcast', this._memberId, this._roomId, obj);
    }

    // team broadcast
    /*teamBrocast(obj) {
        this.emit('team_broadcast', this._memberId, this._roomId, obj, this._teamName);
    }*/

    // 分隊開始遊戲
    teamSwitch() {
        console.log('team switch...');
        this._socket.emit('switch_team', this._roomId);
    }

    // 雙向交握
    handshake(clbk) {
        this._handshakeFunc = clbk;
        this._socket.emit('room_handshake', this._roomId);
    }

    // 換遊戲間
    roomChange() {
        this._socket.emit('room_change', this._memberId, this._roomId);
    }

    // 離開遊戲
    roomLeave() {
        this._socket.emit('room_leave', this._memberId, this._roomId);
    }

    // 用戶設定
    set(obj) {
        var opt = {
            roomId: this._roomId
        }
        this._socket.emit('member_set', opt, obj);
    }

    // 取得房間所有成員資料
    query(obj) {
        if (!obj || typeof obj !== 'object') {
            err('object type error.');
            return;
        }
        var response = null;
        var opt = {
            roomId: this._roomId
        }
        /*console.log(target, target === 'teammates');
        if (target === 'roommates') this._socket.emit('member_request', opt, obj);
        else if (target === 'enemies') this._socket.emit('member_request', { ...opt, teamName: this._teamName }, obj); // obj == arr*/
        this._socket.emit('member_request', opt, obj);
        //else err('No such target.');
       
    }

    // 增加士兵
    armyAdd(obj, num) {
        this._socket.emit('army_add', obj, num);
    }

    // 設定旗下兵源
    armySet(func) {
        if (func && typeof func === 'function') {
            this._socket.emit('army_set', this._roomId, func);
        }
    }

    // 過濾士兵
    armyFilter(cdn) {
        this._socket.emit('army_filter', cdn);
    }

    // 開發者自訂 function
    on(funcName, event, forceUpdate = false) {
        if (this[funcName] && !forceUpdate) {
            this.err('exist ' + funcName + 'already !');
        } else {
            if (typeof funcName !== 'string') err('function name type error.');
            if (typeof event !== 'function') err('event type error.');

            this._socket.on(funcName, event);

            this[funcName] = (...argv) => {
                this._socket.emit('add_emitter', this._roomId, funcName, ...argv);
            };
        }
    }

    // error notify
    err(msg) {
        console.error('[CLIENT] ' + msg);
        return;
    }
}
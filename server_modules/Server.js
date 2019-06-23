var uuid = require('uuid/v4');
var Room = require('./Room.js');
var Member = require('./Member.js');

class Server {
    constructor() {
        this._room = {};
        this._member = {};
        this._member_len = 0;
    }

    get totalOnline() { return this._member_len; };

    //判斷此房間是否存在
    isExistRoom(id) {
        return this._room[id] && true;
    };
    // 取得玩家(依房號)
    getRoomMember(roomId) {
        return this._room[roomId].memberInfo;
    }

    // 取得玩家
    getMember(memberId) { return this._member[memberId]; };

    // 增加玩家
    addMember(member, socket, clbk) {
        if (!socket) err('socket undefined.');
        var newId = socket.id;
        var newMember = {
            id: newId,
            username: member.name
        }
        // 創造新玩家資訊
        this._member[newId] = new Member(newMember);
        this._member_len++;
        // 將其加入房間
        var roomInfo = this.addToRoom(this._member[newId]);
        socket.join(roomInfo.roomId, () => {
            if (roomInfo.canStart) clbk(roomInfo.roomId);
        });

        console.log(`user ${roomInfo.username} join room [${roomInfo.roomId}], ${roomInfo.canStart}`);
        return {
            ...roomInfo,
            memberId: newId
        };
    };

    // 移除玩家
    removeMember(member_id, room_id) {
        if (this._member[member_id]) {
            delete this._member[member_id];
            this._room[room_id].removeMember(member_id);
            this._member_len--;
            return true;
        } else {
            this.err('delete request is not defined.');
            return false;
        }
    };

    // 新增至遊戲間
    addToRoom(member) {
        var room;
        for (room in this._room) {
            if (!this._room[room].isFull) {
                return this._room[room].addMember(member);
            }
        }
        return this.addRoom().addMember(member);
    }

    // 新增遊戲間
    addRoom() {
        var newId = uuid();
        this._room[newId] = new Room({ id: newId });
        return this._room[newId];
    }

    // 移除遊戲間
    removeRoom(room_id) {
        if (!this._room[target_id]) return;
        else delete this._room[room_id];
        return;
    }

    // 分隊
    teamSwitch(roomId, clbk) {
        if (this._room[roomId]) {
            clbk(this._room[roomId].chooseTeam());
        } else { this.err('No such room [' + roomId + '] exists. Stop switching teams.' ) }
    }

    //處理雙向交握
    bindHandshake(memberId, roomId) {
        var room = this._room[roomId];
        if (this._member[memberId] && room.isExistMember(memberId)) {
            this._member[memberId].handshake = true;
            if (room.handshaked) {
                for (let mbr in room.roomMember) {
                    room.roomMember[mbr].handshake = false;
                }
                return true;
            } else return false;
        } else {
            if (!this._member[memberId]) err("doesn' exist member" + memberId);
            if (!this._room[roomId]) err("doesn' exist room" + roomId);
            if (!room.isExistMember(memberId)) err("room doesn' exist member " + memberId);
            return false;
        }
    }

    // 玩家屬性設定
    memberSet(_socketId, opt, obj, clbk) {

        this._member[_socketId].setAttr(obj);

        /*var room = this._room[opt.roomId];
        if (room) room.memberSet(_socketId, obj);
        else { this.err('No such room [' + opt.roomId + '] exists.') }*/
        if (clbk) clbk(this.memberRequest(opt));
    }

    // 用戶取得其他成員資料
    memberRequest(opt, arr) {
        var room = this._room[opt.roomId];

        if (room) {
            var memberIdArr = room.roomMemberId, arr = [];
            
            for (let i = 0; i < room.room_size; i++) {
                var member = this._member[memberIdArr[i]];
                // 回傳username和id是基本
                var obj = {
                    username: member.userName,
                    id: member.id
                };

                if (typeof arr === 'object' && arr.length > 0) {
                    // 取得request 陣列中所求的屬性
                    arr.forEach(item => {
                        if (item !== 'username' || item !== 'id') obj[item] = member.getAttr(item);
                    });
                } else {
                    // 否則視為取得所有屬性
                    obj = { ...obj, ...member.getAttr() };
                }
                arr.push(obj);
            }
            return arr;//room.memberRequest(arr);
        } else { this.err('No such room [' + opt.roomId + '] exists.') }
    }

    // 設定玩家士兵
    memberArmySet(memberId, func) {
        return this._member[memberId].setArmy(func);
    }

    // 增加玩家士兵
    memberArmyAdd(memberId, obj, num) {
        this._member[memberId].addArmy(obj, num);
    }

    // 篩選玩家士兵
    memberArmyFilter(memberId, cdn) {
        this._member[memberId].filterArmy(cdn);
    }

    // 錯誤處理
    err(msg) {
        console.error('[SERVER] ' + msg);
        return;
    }
}
module.exports = new Server();
// ============== //
class _Server {
    constructor() {
        //this._socket = 0;
        this._room = {
            'room2': {}
        };
        this._member = {};
        this._member_len = 0;
        this._currentRoom = null;
    }

    get totalOnline() { return this._member_len; };

    // 取得玩家
    getMember(memberId) { return this._member[memberId]; };

    // 增加玩家
    addMember(member, roomSize = 2, socket, clbk) {
        if (!socket) err('socket undefined.');
        var newId = socket.id;
        var newMember = {
            id: newId,
            username: member.name,
            character: (member.character)? member.character : null
        }

        this._member[newId] = new Member(newMember);
        this._member_len++;

        var roomInfo = this.addToRoom(this._member[newId], roomSize);
        socket.join(roomInfo.roomId).join(`${roomInfo.roomId}/${roomInfo.teamName}`, clbk);

        console.log(`user ${roomInfo.username} join room [${roomInfo.roomId}], team ${roomInfo.teamName}`);
        return {
            ...roomInfo,
            memberId: newId
        };
    };

    // 移除玩家
    removeMember(member_id) {
        if (this._member[member_id]) {
            delete this._member[member_id];
            this._member_len--;
            return true;
        } else {
            this.err('delete request is not defined.');
            return false;
        }
    };

    // 新增至遊戲間
    addToRoom(member, roomSize) {
        var room;
        for (room in this._room[`room${roomSize}`]) {
            if (!this._room[`room${roomSize}`][room].isFull) {
                return this._room[`room${roomSize}`][room].addMember(member);
            }
        }
        return this.addRoom(roomSize).addMember(member);
    }

    // 新增遊戲間
    addRoom(size) {
        var newId = uuid();
        if (!this._room[`room${size}`]) this._room[`room${size}`] = {};
        this._room[`room${size}`][newId] = new Room({ size: size, id: newId });
        return this._room[`room${size}`][newId];
    }

    // 移除遊戲間
    removeRoom(size, target_id) {
        if (this._room[`room${size}`][target_id]) return;
        else delete this._room[`room${size}`][target_id];
        return;
    }

    // 玩家屬性設定
    memberSet(_socketId, opt, obj) {
        
        var room = this._room[`room${opt.roomSize}`][opt.roomId];
        if (room) room.memberSet(_socketId, obj);
        else { this.err('No such member [' + _socketId + '] exists.') }
    }

    // 用戶取得其他成員資料:敵人、隊友、全房間
    memberRequest(opt, arr) {
        var room = this._room[`room${opt.roomSize}`][opt.roomId];
        
        if (room) {
            if (opt.target === 'roommates') {
                return room.memberRequest(arr);
            } else if (opt.target === 'enemies') {
                return room.enemiesRequest(arr, opt.teamName);
            } else {
                return room.teammatesRequest(arr, opt.teamName);
            }
        }else{ this.err('No such room ['+opt.roomId+'] exists.')}
    }

    // 錯誤處理
    err(msg) {
        console.error('[SERVER] ' + msg);
        return;
    }
}
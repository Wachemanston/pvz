module.exports = class Room {
    constructor(prop) {
        this._roomId = prop.id || 0;
        this._roomMember = {};
        this._roomMember_len = 0;
        //this._team_plant = null;
        //this._team_zombie = null;
        this._chatRecord = [];
        this._size = 2;
        this._handShake = {};
    }

    get room_id() { return this._roomId; };
    get isFull() { return this._size <= this._roomMember_len; };
    get isEmpty() { return !this._roomMember_len; };
    get room_size() { return this._roomMember_len; }
    get memberInfo() {
        let obj = {};
        for (let _mbr in this._roomMember) {
            var mbr = this._roomMember[_mbr]
            obj[mbr.id] = mbr.userName;
        }
        return obj;
    }
    get roomMemberId() {
        var arr = [];
        for (var member in this._roomMember) {
            arr.push(member);
        }
        return arr;
    };
    get roomMember() { return this._roomMember; }
    get handshaked() {
        var res = 0;
        for (let mbr in this._roomMember) {
            if (this._roomMember[mbr].handShake) res++;
        }
        return res >= this._size;
    }

    //尋找玩家是否在此房間
    isExistMember(id) {
        return this._roomMember[id] && true;
    };

    // 增加玩家
    addMember(member) {
        if (this.isFull) return false;
        this._roomMember[member.id] = member;
        this._handShake[member.id] = false;
        this._roomMember_len++;
        
        member.room = this._roomId;

        member.username = (typeof member.userName === 'string' && member.userName !== 'NA') ? member.userName : `User${(this._roomMember.length > 9) ? this._roomMember.length : '0' + this._roomMember.length}`

        return {
            roomId: this._roomId,
            username: member.userName,
            canStart: this._roomMember_len === 2
            //teamName: (this._roomMember_len===2)? 'zombie' : 'plant'
        };
    }

    // 移除玩家
    removeMember(member_id, team) {
        if (this.isEmpty) return;
        delete this._roomMember[member_id];
        this._roomMember_len--;
        //if (team === 'plants') delete this._team_plant;
        //else if (team === 'zombie') delete this._team_zombie;
    }

    // 均分入隊伍
    chooseTeam() {
        var teams = ['plants', 'zombies'];
        var rdm = Math.round(Math.random()), i = 0;
        var info = [];

        for (var _mid in this._roomMember) {
            var member = this._roomMember[_mid];
            member.team = teams[(rdm + i + 2) % 2];
            info.push({ id: member.id, username: member.userName, team: member.teamName });
            i++;
        }
        return info;
    }

    // 設定member資訊
    memberSet(memberId, obj) {
        if (this._roomMember[memberId]) {
            this._roomMember[memberId].setAttr(obj);
        } else { this.err('No such member [ ' + memberId + ' ] exists.') }
        return;
    }

    // request 所有人資訊
    memberRequest(arr) {
        var resArr = [], member = null, _member_id = null;
        for (_member_id in this._roomMember) {
            var member = this._roomMember[_member_id];
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

            resArr.push(obj);
        }
        return resArr;
    }

    // 新增聊天訊息
    postChat(member, txt) {
        this._chatRecord.push({
            member: member.userName,
            message: txt
        });
    }

    // 取得聊天紀錄
    getChatRecord(num) {
        return this._chatRecord.slice((typeof num === 'number') ? -num : 0);
    }

    // 錯誤處理
    err(msg) {
        console.error('[ROOM] ' + msg);
        return;
    }
}
// ============== //
class Room {
    constructor(prop) {
        this._roomId = prop.id || 0;
        this._roomMember = [];
        this._chatRecord = [];
        this._team = {};
        this._team_len = 0;
        this._team_len_max = (typeof prop.teamMax ==='number' && prop.teamMax > 1) ? prop.teamMax : 2;
        this._size = prop.size || 2;
    }

    get room_id() { return this._roomId; };
    get isFull() { return this._size <= this._roomMember.length; };
    get isEmpty() { return !this._roomMember.length; };

    //尋找玩家是否在此房間
    isExistMember(id) {
        for (let i = 0; i < this._roomMember.length; i++) {
            if (this._roomMember[i].id === id) return true;
        }
        return false;
    };

    // 增加玩家
    addMember(member, team) {
        if (this.isFull) return false;
        this._roomMember.push(member);
        
        var teamName = (typeof team === 'string')? team :  'team' + this._team_len;
        if (!this._team[teamName] && this._team_len >= this._team_len_max - 1){
            teamName = this.chooseTeam();
        } 
        if (!this._team[teamName]) {
            this._team[teamName] = new Array();
            this._team_len++;
        }
        this._team[teamName].push(member);
        member.team = teamName;
        member.room = this._roomId;
        
        member.username = (typeof member.userName === 'string' && member.userName !== 'NA') ? member.userName : `User${(this._roomMember.length > 9) ? this._roomMember.length : '0' + this._roomMember.length}`
        
        return {
            roomId: this._roomId,
            teamMate: this._team[teamName].slice(0, Math.max(this._team[teamName].length - 2, 0)),
            teamName: teamName,
            username: member.userName
        };
    }

    // 移除玩家
    removeMember(member) {
        if (this.isEmpty) return;
        this._roomMember = this._roomMember.filter(mbr => {
            return member.id !== mbr.id;
        });
    }

    // 均分入隊伍
    chooseTeam() {
        var lastestMember = Infinity, team, tm;
        if (this._team) {
            for (team in this._team) {
                if (lastestMember > this._team[team].length) {
                    lastestMember = this._team[team].length;
                    tm = team;
                }
            }
        } else {
            return 'team1';
        }
        return tm;
    }

    // 設定member資訊
    memberSet(memberId, obj) {
        for (let i = 0; i < this._roomMember.length; i++) {
            if (memberId === this._roomMember[i].id) {
                this._roomMember[i].setAttr(obj);
                return;
            }
        }
        return;
    }

    // request 所有人資訊
    memberRequest(arr) {
        var resArr = [];
        if (this._roomMember.length) {
            for (let i = 0; i < this._roomMember.length; i++) {
                var member = this._roomMember[i];
                // 回傳username和id是基本
                var obj = {
                    username: member.userName,
                    id: member.id
                };
                // 取得request 陣列中所求的屬性
                arr.forEach(item => {
                    if (item !== 'username' || item !== 'id') obj[item] = member.getAttr(item);
                });

                resArr.push(obj);
            }
        }
        return resArr;
    }

    // request 敵人資訊
    enemiesRequest(arr, teamName) {
        var resArr = [];

        this._roomMember
            // 濾出敵對member
            .filter((member) => { return teamName !== member.teamName })
            .forEach(member => {
                // 回傳username和id是基本
                var obj = {
                    username: member.userName,
                    id: member.id
                };
                // 取得request 陣列中所求的屬性
                arr.forEach(item => {
                    if (item !== 'username' || item !== 'id') obj[item] = member.getAttr(item);
                });

                resArr.push(obj);
            });

        return resArr;
    }

    // request 隊員資訊
    teammatesRequest(arr, teamName) {
        var resArr = [];
        
        if (this._roomMember.length) {
            for (let i = 0; i < this._roomMember.length; i++) {
                // 濾出己隊member
                if (teamName === this._roomMember[i].teamName) {
                    var member = this._roomMember[i];
                // 回傳username和id是基本
                    var obj = {
                        username: member.userName,
                        id: member.id
                    };
                    // 取得request 陣列中所求的屬性
                    arr.forEach(item => {
                        if (item !== 'username' || item !== 'id') obj[item] = member.getAttr(item);
                    });

                    resArr.push(obj);
                }
            }
        }
        return resArr;
    }

    // 新增聊天訊息
    postChat(member, txt) {
        this._chatRecord.push({
            member: member.userName,
            message: txt
        });
    }

    // 取得聊天紀錄
    getChatRecord(num) {
        return this._chatRecord.slice((typeof num === 'number') ? -num : 0);
    }
}
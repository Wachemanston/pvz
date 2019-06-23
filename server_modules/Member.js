module.exports = class Member {
    constructor(prop) {
        this._userId = prop.id || 0;
        this._userName = prop.username || 'NA';
        this._character = prop.character || null;
        this._team = prop.team || 0;
        this._room = 0;
        this._handshake = false;
        this._army = [];
        this._attr = {};
    }

    get id() { return this._userId; };
    get userName() { return this._userName; };
    get character() { return this._character; };
    get roomId() { return this._room; };
    get teamName() { return this._team; };
    get army() { return this._army; }
    get handShake() { return this._handshake; }

    set room(val) { this._room = val; };
    set team(val) { this._team = val; };
    set username(val) { this._userName = val; };
    set handshake(val) { this._handshake = val; }

    // 取得成員資訊
    getAttr(key) {
        if (key && typeof key === 'string') {
            console.log(`request data of user ${this._userName} ${this._attr[key]}`);
            return this._attr[key];
        } else {
            console.log(`request data of user ${this._userName} all attribute.`);
            return this._attr;
        }
    }

    // 設定成員資訊
    setAttr(obj) {
        if (obj) {
            for (var item in obj) {
                this._attr[item] = obj[item];
                console.log(`user ${this._userName} set attr ${item} = ${this._attr[item]}`);
            }
        }
        return this._attr;
    }

    // 增加士兵
    addArmy() {
        if (typeof arguments[0] === 'object') {

            if (typeof arguments[1] === 'number' && arguments[1] > 1) {
                for (let i = 0; i < arguments[1]; i++) {
                    this._army.push(argument[0]);
                }
            } else {
                this._army.push(argument[0]);
            }
        } else {
            err('addArmy parameters type error.')
        }
    }

    // 過濾士兵
    filterArmy(cdn) {
        if (typeof cdn === 'function') {
            this._army = this._army.filter(solider => {
                return cdn(solider);
            });
        } else {
            err('filter condition type error.')
        }
    }

    // 設定旗下兵源
    setArmy(func) {
        if (func && typeof func === 'function') {
            this._army = this._army.map(solider => {
                let update = func(solider);
                if (typeof update === 'object') return update;
                else return null;
            });
            return this._army;
        } else {
            this.err('army setting function type error. ')
        }
    }

    // 錯誤處理
    err(msg) {
        console.error('[MEMBER] ' + msg);
        return;
    }
}
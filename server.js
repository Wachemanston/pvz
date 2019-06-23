const functions = require('firebase-functions');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Server = require(__dirname + '/server_modules/Server.js');
var socket = null;

// 更改檔案路徑使server能使用
app.use('/css', express.static(__dirname + '/css'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/assets', express.static(__dirname + '/assets'));

// 重新導向至 index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    //functions.database().ref('test')
});

// client要從port8080連入
server.listen(process.env.PORT || 8080, function () {
    console.log('Listening on ' + server.address().port);
});

// initialize...
io.on('connection', (_socket) => {

    _socket.on('client_initialize', (memberInIt, clbk) => {
        var newPlayer = Server.addMember(memberInIt, _socket, roomId => {
            io.to(roomId).emit('room_join', Server.getRoomMember(roomId));
        });
        clbk(newPlayer);
    });

    // add emitter
    _socket.on('add_emitter', (roomId, funcName, ...argv) => {
        _socket.broadcast.to(roomId).emit(funcName, ...argv);
    });

    // room broadcast
    _socket.on('room_broadcast', (memberId, roomId, obj) => {
        io.to(roomId).broadcast.emit('room_broadcast', Server.getMember(memberId), obj);
    });

    // team broadcast
    /*_socket.on('team_broadcast', (memberId, roomId, obj, teamName) => {
        
        io.to(`${roomId}/${teamName}`).broadcast.emit('team_broadcast', myServer.getMember(memberId), obj);
    });*/

    // 分隊開始遊戲
    _socket.on('switch_team', (roomId) => {
        Server.teamSwitch(roomId, (res) => {
            io.to(roomId).emit('finish_switch_team', res);
        });
    });
    
    // 處理雙向交握
    _socket.on('room_handshake', (roomId) => {
        if(Server.bindHandshake(_socket.id, roomId)){
            io.to(roomId).emit('finish_handshake');
        } else {
            io.to(roomId).emit('unfinish_handshake');
        }
    });

    // 換遊戲間
    _socket.on('room_change', (memberId, roomId, teamName) => {
        //myServer.roomChange(member)
       //io.to(roomId).emit('room_broadcast', myServer.getMember(memberId), obj);
    });

    // 離開遊戲
    _socket.on('room_leave', (memberId, roomId) => {
        Server.removeMember(memberId, roomId);
        io.to(roomId).emit('room_leave', Server.getMember(memberId));
        _socket.leave(roomId);
    });

    // 用戶設定
    _socket.on('member_set', (opt, obj) => {
        
        Server.memberSet(_socket.id, opt, obj, update => {
            if (Server.isExistRoom(opt.roomId)) {
                io.to(opt.roomId).emit('member_response', update);
            }
        });
    });

    // 取得用戶資料
    _socket.on('member_request', (opt, arr) => {
        
        _socket.emit('member_response', Server.memberRequest(opt, arr));
    });

    // 增加士兵
    _socket.on('army_add', (obj, num) => {
        Server.memberArmyAdd(_socket.id, obj, num);
    });

    // 設定士兵
    _socket.on('army_set', (roomId, func) => {
        io.to(roomId).emit('army_set', Server.memberArmySet(_socket.id, func));
    });

    // 過篩士兵
    _socket.on('army_filter', cdn => {
        Server.memberArmyFilter(_socket.id, cdn);
    });

    _socket.on('test', (str, str2) => {
        var d = new Date();
        _socket.emit('test', str + str2 + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
    });

    _socket.on('chat', str => {
        _socket.broadcast.emit('chat', str);
    });

    _socket.on('disconnect', () => {
        var leaver = Server.getMember(_socket.id) || null;
        if (leaver) {
            Server.removeMember(_socket.id, leaver.roomId);

            io.to(leaver.roomId).emit('room_leave', { ...leaver, username: leaver.userName });
            _socket.leave(leaver.roomId);
        }
    });
});
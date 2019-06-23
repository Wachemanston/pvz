# SS-Final-Group27

## 5/24 李諭樹
* workflow: (第一次)git clone ...(第二次後 git pull --rebase) -> npm install -> 改code, add, commit, push
* js檔請丟src folder裡
* 測試請連至 http://localhost:8080/
* 建立socket.io完成，未來繼續擴充功能；需要什麼功能儘管開ㄏㄏ
* 已經可放置三種殭屍，右上角選擇放置，冷卻時間已經寫出，每一隻先預設5秒冷卻，開場10秒冷卻
* 遊戲暫停功能已經完成，按下p鍵暫停

## 6/5 李諭樹
* 若有需額外開資料夾跟我說，file的讀取牽涉到server的設定
* 目前可同步放殭屍(僅zombie0)，加法已經寫在zombie.js裡
* var client已經宣告為全域變數，別的.js要用時應可直接呼叫
* 和server溝通的方式目前有一種: client.on(<event name>, <function>)。解釋可參考zombie.js裡的範例。
* 加入背景和殭屍護盾(棺材)，下方顯示棺材血量，先預設每一個棺材30滴血
* client好像怪怪的，開firefox會有bug

## 6/9 李諭樹
* firebox問題推斷是檔案沒有read到，已修改但仍待測試。提醒先別用ie跑localhost(ie, edge都不支援
* 我以後要加額外功能會在main.js內加，歡迎有空的人來擴充功能。若以後在code中看到'system'開頭的八成是我寫的
* 可至main.js第三行，或程式內其他地方將變數pornBlock設成false，這樣閒置10分鐘後就會轉到pornhub.com；第9分鐘會提醒你閒置
* 新增聊天室功能，將持續更新
* 鼠標移至遊戲畫面可看到已可看到聚焦框
* 目前我們include .js檔是直接在.html中<head>宣告，因此有先後順序問題，以後看到'XXX is undefined'可以往這方面改

## 6/14 林承禹
* 三種植物 peashooter, wallnut, ice_peashooter可以放置，但現在沒辦法取消 要做改動可以直接先把plants.js的142~162行先碼掉再改
* 第一排加入lawnmower，植物不能在那裏放置
* 植物的ready只是好看的，一定時間內只能放置一種植物

## 6/14 李諭樹
* 流程完成一半，提示文字還沒加
* 想要從開始介面開始的話將main.js第200行註解掉(或將參數改成false)即可

## 6/20 李諭樹
* 流程完成80%，開始架在網路
* 提示文字樣式完成，等寫js的呼叫函式(看不到是因為我把它display=none，改成table就可看到)
* 想要從開始介面開始的話在main.js搜尋'new System();'的下一行註解掉(或將參數改成false)即可(現在於第237行)
* 

## 6/20 林承禹
* 某種意義上研究出如何pull + push
* 除草機會動了!
* 子彈會打殭屍了 但暫時沒血可以扣
* 增加了bgm file，音效請全丟裡面

## 6/21 簡維成
* 有多加殭屍請把zombie_tag 陣列改成1 
* enter_allowed 為true 表示已選3個  false 表超過3個或小於三個
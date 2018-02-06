"use strict";
var MultiplayerGame = /** @class */ (function () {
    function MultiplayerGame() {
        this.game = new Phaser.Game(700, 450, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    MultiplayerGame.prototype.preload = function () {
    };
    MultiplayerGame.prototype.create = function () {
    };
    MultiplayerGame.prototype.update = function () {
    };
    return MultiplayerGame;
}());
/*

window.localStorage.setItem("name", document.getElementById("avatarName").value);
window.localStorage.setItem("avatarClothed_right", document.getElementById("rightBlinkless").innerHTML);
window.localStorage.setItem("avatarClothed_left", document.getElementById("leftBlinkless").innerHTML);
window.localStorage.setItem("avatarClothed_rightBlink", document.getElementById("rightBlink").innerHTML);
window.localStorage.setItem("avatarClothed_leftBlink", document.getElementById("leftBlink").innerHTML);

*/ 

// ==UserScript==
// @name         Fake verification
// @namespace    https://github.com/hitthemoney/krunker-plugins
// @version      0.1
// @description  fake krunker verification on profiles
// @author       hitthemoney
// @match        https://krunker.io/social.html*
// @grant        none
// ==/UserScript==

const ign = "lostnoob69"; // your ign

Object.defineProperty(Object.prototype, "player_featured", {
    enumerable: true,
    get () {
        if (this.player_name === ign) return true
        return this._player_featured || false;
    },
    set (v) {
        this._player_featured = v;
    }
})

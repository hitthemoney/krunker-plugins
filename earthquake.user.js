// ==UserScript==
// @name         Krunker Earthquake
// @namespace    https://github.com/hitthemoney/krunker-plugins
// @description  Krunker earthquake thing
// @author       hitthemoney
// @match        *://krunker.io/*
// @exclude      *://krunker.io/social.html*
// @grant        none
// ==/UserScript==

var intensity = 0.01;

["sin", "cos", "tan"].map(x => Math[x]).map(x => {Math[x.name] = a => x(a) + ((Math.random() - 0.5) * intensity)})

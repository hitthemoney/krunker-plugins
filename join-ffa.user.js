// ==UserScript==
// @name         Join FFA
// @namespace    https://github.com/hitthemoney/krunker-plugins
// @version      1.0.0
// @description  Join a new FFA game on your region with the highest player count that is not full when you press a certain key
// @author       hitthemoney
// @match        *://krunker.io/*
// @grant        none
// ==/UserScript==

const joinKey = "F4"; // Join new FFA game shortcut key, case sensitive

const getTopFFA = async () => {
    const region = window.localStorage.pingRegion7 || (await fetch(`https://matchmaker.krunker.io/game-info?game=${encodeURIComponent(window.getGameActivity().id)}`).then(res => res.json()))[1]; // get region from localStorage, if null or undefined then fetch current game data and get the region
    const gameData = (await fetch(`https://matchmaker.krunker.io/game-list?hostname=${window.location.hostname}`).then(res => res.json())).games; // fetch game list data
    // filter and sort game data
    const filData = gameData.filter(game =>
        game[1] === region && // region check
        game[4].g === 0 && // game mode check (0 == FFA)
        game[4].c === 0 && // custom check (make sure you dont join a custom)
        game[2] < game[3] // makes sure the game is not full (game[2] == player count, game[3] == max player count)
    ).sort((x, y) => y[2] - x[2]); // sort data by player count
    return filData[0];
}

const joinTopFFA = async () => {
    const targetGame = await getTopFFA();
    window.location.href = `/?game=${targetGame[0]}`;
}

window.addEventListener("keydown", async (event) => {
    switch (event.key) {
        case joinKey: {
            await joinTopFFA();
            break;
        }
    }
});

// ==UserScript==
// @name         Auto FFA
// @namespace    https://github.com/hitthemoney/krunker-plugins
// @version      1.0.0
// @description  Automatically join an FFA game!
// @author       hitthemoney
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// proxy the fetch function
window.fetch = (targetFn => {
    const proxyFn = async (...args) => {
        // match and check url (make sure its fetching seek-game and match the region)
        const urlMatch = /matchmaker\.krunker\.io\/seek-game.+?&region=([-\w]+)/.exec(args[0]);
        if (urlMatch) {
            const region = urlMatch[1] || window.localStorage.pingRegion7 || "us-ca-sv"; // get region
            const gameList = (await fetch(`https://matchmaker.krunker.io/game-list?hostname=${window.location.hostname}`).then(res => res.json())).games; // fetch game list data
            // filter and sort game data
            const filData = gameList.filter(game =>
                game[1] === region && // region check
                game[4].g === 0 && // game mode check (0 == FFA)
                game[4].c === 0 && // custom check (make sure you dont join a custom)
                game[2] < game[3] // makes sure the game is not full (game[2] == player count, game[3] == max player count)
            ).sort((x, y) => y[2] - x[2]); // sort data by player count
            const targetGame = filData[0];
            args[0] = `${args[0].replace(/&game=\w+(?:%3A|\:)\w+/, "")}&game=${targetGame[0]}` // modify the url to fetch
            window.fetch = targetFn; // restore original function
        }
        return targetFn.apply(null, args);
    }
    return proxyFn;
})(window.fetch);

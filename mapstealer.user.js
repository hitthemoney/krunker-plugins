// ==UserScript==
// @name         custom map stealer >:)
// @namespace    https://github.com/hitthemoney/krunker-plugins
// @version      1.0.0
// @description  steal others maps
// @author       hitthemoney
// @match        https://krunker.io/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// ==/UserScript==

window.WebSocket = new Proxy(WebSocket, {
    construct (target, args) {
        const ws = new target(args);
        ws.addEventListener("message", (event) => {
            const packet = msgpack.decode(new Uint8Array(event.data));
            if (packet[0] === "init" && !!packet[9]) {
                const map = JSON.parse(packet[9].data);
                const mapDownloadBtn = document.createElement("div");
                mapDownloadBtn.className = "terms";
                mapDownloadBtn.innerHTML = "Download Map JSON";
                mapDownloadBtn.style = "margin: 0px 11px";
                mapDownloadBtn.onclick = () => {
                    const a = document.createElement("a");
                    document.body.appendChild(a);
                    a.download = map.name + ".json";
                    a.href = URL.createObjectURL(new Blob([JSON.stringify(map)], {type : "application/json"}));
                    a.click();
                    a.remove();
                }
                const termsInfo = document.getElementById("termsInfo");
                termsInfo.insertBefore(document.createElement("div"), termsInfo.children[1]).className = "verticalSeparatorInline";
                termsInfo.insertBefore(mapDownloadBtn, termsInfo.children[2])
            }
        })
        return ws;
    }
})

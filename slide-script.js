window.onload = function() {
    console.log("Loaded!");

    window.onkeydown = function(e) {
        keyDown(e.code);
    }
    console.log(window.parent);
}

function keyDown(key) {
    window.parent.postMessage({"payload": key}, "*");
}


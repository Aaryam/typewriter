
/* ELEMENTS */

var textArea = document.getElementById('words-input');
var wordCounter = document.getElementById('word-count');
var charCounter = document.getElementById('char-count');
var instanceCounter = document.getElementById('instance-count');
var contentBox = document.getElementById('contentbox');

/* ELEMENTS */

var lastAudioElement = null;
var selectedText = "";
var isShifting = false;

/* UTILITY FUNCTIONS */

function getWordCount(string) {
    let res = [];
    let str = string.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    str.map((s) => {
        let trimStr = s.trim();
        if (trimStr.length > 0) {
            res.push(trimStr);
        }
    });

    let wordCount = res.length;

    if (string == "") {
        wordCount = 0;
    }

    return wordCount;
}

function getInstanceCount(string, word) {
    let res = [];
    let str = string.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    str.map((s) => {
        let trimStr = s.trim();
        if (trimStr.length > 0 && trimStr.toLowerCase() == word.toLowerCase()) {
            res.push(trimStr);
        }
    });

    let wordCount = res.length;

    if (string == "") {
        wordCount = 0;
    }

    return wordCount;
}

function getCharCount(string) {
    let charCount = string.length;

    if (string == "") {
        charCount = 0;
    }

    return charCount;
}

function saveText(txt) {
    localStorage.setItem("textContent", txt);
}

function renderText() {
    textArea.innerText = localStorage.getItem("textContent");
}

function playSound(audioSrc, volume) {
    let audio = document.createElement('audio');
    audio.src = audioSrc;
    audio.autoplay = true;
    if (volume != null) {
        audio.volume = volume;
    }
    else {
        audio.volume = 0.2;
    }
    document.body.appendChild(audio);
    setTimeout(function () { audio.remove() }, 300);
}

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

/* UTILITY FUNCTIONS */

/* OTHER FUNCTIONS */

function setText(variableName, str, value) {
    variableName.innerText = str + value.toString();
}

function updateCounts(txt) {
    setText(wordCounter, "Words: ", getWordCount(txt));
    setText(charCounter, "Characters: ", getCharCount(txt));
    setText(instanceCounter, "Instances: ", getInstanceCount(textArea.innerText, getSelectedText()));
}

/* OTHER FUNCTIONS */

/* EVENT LISTENERS */

document.body.onload = function () {
    renderText();
    updateCounts(textArea.innerText);
};

textArea.addEventListener('input', function (e) {
    updateCounts(textArea.innerText);
    saveText(textArea.innerText);
    
    if (e.data != null) {
        playSound('assets/audio/sound.wav');
    }
});

textArea.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        playSound('assets/audio/enter-sound.wav');
    }
    else if (e.keyCode == 8 || e.keyCode == 46) {
        playSound('assets/audio/delete-sound.wav');
        instanceCounter.innerText = "Instances: " + "None";
    }
});

document.addEventListener('selectionchange', function (e) {
    selectedText = getSelectedText();

    if (selectedText != "" && selectedText != null && selectedText != undefined) {
        let res = [];
        let str = selectedText.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
        str.map((s) => {
            let trimStr = s.trim();
            if (trimStr.length > 0) {
                res.push(trimStr);
            }
        });

        wordCounter.innerText = "Words: " + res.length;
        charCounter.innerText = "Characters: " + selectedText.toString().length;

        updateCounts(getSelectedText());
    }
});

// git push -u origin main

var textAreaString = document.getElementById('words-input');
var wordCounter = document.getElementById('word-count');
var charCounter = document.getElementById('char-count');
var mathResult = document.getElementById('math-result');
var contentBox = document.getElementById('contentbox');

var isDrawn = true;

var lastAudioElement = null;

var selectedText = "";

document.body.onload = function () {
    renderText();
    getCharCount();
    getWordCount();
};

function getWordCount () {
    let res = [];
    let str = textAreaString.innerText.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    str.map((s) => {
      let trimStr = s.trim();
      if (trimStr.length > 0) {
        res.push(trimStr);
      }
    });

    let wordCount = res.length;

    if (textAreaString.innerText == "") {
        wordCount = 0;
    }

    wordCounter.innerText = "Word Count: " + wordCount.toString();
}

function setMathSelected () {
    if (!(typeof eval(selectedText) === "undefined")) {
        mathResult.innerText = "Math: " + eval(selectedText);
    }
    else {
        mathResult.innerText = "Math: " + "None selected";
    }
}

function getCharCount () {
    let charCount = textAreaString.innerText.length;

    if (textAreaString.innerText == "") {
        charCount = 0;
    }

    charCounter.innerText = "Character Count: " + charCount.toString();
}

function saveText (txt) {
    localStorage.setItem("textContent", txt);
}

function renderText () {
    textAreaString.innerText = localStorage.getItem("textContent");
}

function createAudio (isOther) {
    let rand = Math.round(Math.random() * 3);

    if (isOther == null || isOther == false) {
        if (rand == 0) {
            playSound('assets/audio/sound.wav');
        }
        else if (rand == 1) {
            playSound('assets/audio/sound.wav');
        }
        else if (rand == 2) {
            playSound('assets/audio/sound.wav');
        }
        else {
            playSound('assets/audio/sound.wav');
        }
    }
}

function playSound (audioSrc, rand) {
    let audio = document.createElement('audio');
    audio.src = audioSrc;
    audio.autoplay = true;
    audio.volume = 0.2;
    if (rand != null) {
        audio.volume = Math.fround(Math.random(5));
        audio.playbackRate = rand;
    }
    document.body.appendChild(audio);
    setTimeout(function() { audio.remove() }, 300);
}

function getWordStats (word) {
    
}

function toggleDrawer () {
    if (isDrawn) {
        textAreaString.style.minWidth = "calc(40vw - 80px)";
        contentBox.style.minWidth = "calc(60vw - 80px)";
    }
    else {
        textAreaString.style.minWidth = "calc(70vw - 80px)";
        contentBox.style.minWidth = "calc(30vw - 80px)";
    }
    isDrawn = !isDrawn;
}

textAreaString.addEventListener('input', function (e) {
    getWordCount();
    createAudio();
    getCharCount();
    saveText(textAreaString.innerText);
});

textAreaString.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        playSound('assets/audio/enter-sound.wav');
    }
    else if (e.keyCode == 8 || e.keyCode == 46) {
        playSound('assets/audio/delete-sound.wav');
    }
});

document.addEventListener('selectionchange', function (e) {
    selectedText = window.getSelection().toString();;
    setMathSelected();

    if (selectedText != "") {
        let res = [];
        let str = selectedText.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
        str.map((s) => {
          let trimStr = s.trim();
          if (trimStr.length > 0) {
            res.push(trimStr);
          }
        });
    
        let wordCount = res.length;
        wordCounter.innerText = "Word Count: " + res.length;
        charCounter.innerText = "Character Count: " + selectedText.toString().length;
    }
});

contentBox.addEventListener('dblclick', function (e) {
    toggleDrawer();
})

// git push -u origin main

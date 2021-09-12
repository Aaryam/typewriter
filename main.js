var textAreaString = document.getElementById('words-input');
var wordCounter = document.getElementById('word-count');
var charCounter = document.getElementById('char-count');
var mathResult = document.getElementById('math-result');

var selectedText = "";

document.body.onload = function () {
    renderText();
    getCharCount();
    getWordCount();
};

function getWordCount () {
    let res = [];
    let str = textAreaString.value.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    str.map((s) => {
      let trimStr = s.trim();
      if (trimStr.length > 0) {
        res.push(trimStr);
      }
    });

    let wordCount = res.length;

    if (textAreaString.value == "") {
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
    let charCount = textAreaString.value.length;

    if (textAreaString.value == "") {
        charCount = 0;
    }

    charCounter.innerText = "Character Count: " + charCount.toString();
}

function saveText (txt) {
    localStorage.setItem("textContent", txt);
}

function renderText () {
    textAreaString.value = localStorage.getItem("textContent");
}

function createAudio () {
    let rand = Math.round(Math.random() * 3);

    if (rand == 0) {
        playSound('assets/audio/sound.wav');
    }
    else if (rand == 1) {
        playSound('assets/audio/sound.wav');
    }
    else if (rand == 2) {
        playSound('assets/audio/sound.wav');
    }
}

function playSound (audioSrc) {
    let audio = document.createElement('audio');
    audio.src = audioSrc;
    audio.autoplay = true;
    audio.volume = 0.2;

    document.body.appendChild(audio);
    setTimeout(function() { audio.remove() }, 500);
}   

textAreaString.addEventListener('input', function (e) {
    getWordCount();
    createAudio();
    getCharCount();
    saveText(textAreaString.value);
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

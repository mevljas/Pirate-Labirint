// Get the modal
var navodilaModal = document.getElementById('navodilaModal');
var vpisModal = document.getElementById('vpisModal');
var WinModal = document.getElementById('winModal');
var loseModal = document.getElementById('loseModal');
var scoreModal = document.getElementById('scoreModal');



// Get the <span> element that closes the modal
var closeNavodilaSpan = document.getElementById("closeNavodila");
var closeWinSpan = document.getElementById("closeWin");
var closeLoseSpan = document.getElementById("closeLose");
var closescoreSpan = document.getElementById("closeScore");


//navodila
///
//

function openNavodila() {
    navodilaModal.style.display = "block";
    noLoop();
    pause = true;
}


function closeNavodila() {
    navodilaModal.style.display = "none";
    loop();
    setTimeout(function() {
        pause = false;
    }, 500);
}




///vpis
///
//
//



// When the user clicks the button, open the modal 
function showInput() {
    vpisModal.style.display = "block";
    noLoop();
    pause = true;
}



function vpisOk() {
    playerName = document.getElementById('vpis').value;
    if (playerName.length > 1) {
        vpisModal.style.display = "none";
        loop();
        setTimeout(function() {
            pause = false;
        }, 500);
        oceanSound.play(0, 1, 0.5); //time (0 = now), and rate (1 = normal playback) in addition to the amplitude

        document.getElementById("name").innerHTML = "Name: " + playerName;
    }


}


///win screen
///
///


// When the user clicks the button, open the modal 
function showWin() {
    WinModal.style.display = "block";
    noLoop();
    pause = true;
    document.getElementById("winText").innerHTML = playerName + ", You won the game in " + (floor(millis() / 1000) - startTime) + " seconds.";
}


///lose screen
///
///


// When the user clicks the button, open the modal 
function showLose() {
    loseModal.style.display = "block";
    noLoop();
    pause = true;
    document.getElementById("loseText").innerHTML = playerName + ", You lost the game in " + (floor(millis() / 1000) - startTime) + " seconds.";
}




///score



// When the user clicks the button, open the modal 
function showScore() {
    document.getElementById("scoreText").innerHTML = "";
    document.getElementById("scoreText").innerHTML += "Name     /    Time <br>";
    document.getElementById("scoreText").innerHTML += "<br>";
    scoreModal.style.display = "block";
    noLoop();
    pause = true;
    getLocalStorage();
    for (var i = 0; i < scoreBoard.length; i++) {
        document.getElementById("scoreText").innerHTML += scoreBoard[i] + "s <br>";
    }

}


function closeScore() {
    scoreModal.style.display = "none";
    loop();
    setTimeout(function() {
        pause = false;
    }, 500);
}
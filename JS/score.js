function printHighscores() {
  //  get scores from localstorage 
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscores.forEach(function(score) {
    // create list tag 
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // displays the high scores
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run when loading
printHighscores();
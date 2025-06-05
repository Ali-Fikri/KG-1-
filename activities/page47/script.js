const svg = document.getElementById("svg");
let isCorrect,
  choiceImage = null;

// Handle choice selection
document.querySelectorAll(".choice").forEach((choice) => {
  choice.addEventListener("click", () => {
    isCorrect = choice.getAttribute("data-answer") === "correct";
    choiceImage = choice.children[0];
    console.log(isCorrect);
    if (isCorrect) {
      choice.classList.add("correct");
      playClapSound();
    } else {
      choice.classList.add("incorrect");
      playIncorrectSound();
      setTimeout(() => {
        choice.classList.remove("incorrect");
      }, 400);
    }
  });
});

function playClapSound() {
  const sound = document.getElementById("clapSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function playIncorrectSound() {
  const sound = document.getElementById("inCorrectSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

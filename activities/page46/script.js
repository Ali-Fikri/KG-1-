const svg = document.getElementById("svg");
let selectedLetter,
  selectedLetterDot = null;

document.querySelectorAll(".letter").forEach((letter) => {
  letter.addEventListener("click", () => {
    document
      .querySelectorAll(".letter")
      .forEach((w) => w.classList.remove("selected-letter"));
    letter.classList.add("selected-letter");
    selectedLetter = letter;
    selectedLetterDot = letter.children[1]; // Get the inner span element
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

document.querySelectorAll(".img-item").forEach((img) => {
  img.addEventListener("click", () => {
    if (!selectedLetter) return;

    const letterDotRect = selectedLetterDot.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const containerRect = document
      .querySelector(".letters-box")
      .getBoundingClientRect();

    const x1 =
      letterDotRect.right - containerRect.left - letterDotRect.width / 2;
    const y1 = letterDotRect.top + letterDotRect.height / 2 - containerRect.top;
    const x2 = imgRect.left - containerRect.left;
    const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

    const matchCorrect = selectedLetter.dataset.match === img.dataset.id;

    if (matchCorrect) {
      playClapSound();

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke-width", 3);
      line.setAttribute("stroke", "#ec008d");
      line.setAttribute("class", "line-animation");
      svg.appendChild(line);

      setTimeout(() => {
        line.style.transition = "stroke-dashoffset 2s linear";
        line.style.strokeDashoffset = "0"; // Reveal the line
      }, 2000);
    } else {
      playIncorrectSound();
      selectedLetter.classList.add("shake");
      img.classList.add("shake");

      setTimeout(() => {
        selectedLetter.classList.remove("shake");
        img.classList.remove("shake");
      }, 400);
    }

    selectedLetter.classList.remove("selected-letter");
    selectedLetter = null;
  });
});

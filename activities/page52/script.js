const svg = document.getElementById("svg");
const vLetter = document.getElementById("v-letter");
let isCorrect = null;
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

document.querySelectorAll(".image").forEach((img) => {
  img.addEventListener("click", () => {
    isCorrect = img.getAttribute("isCorrect") === "true";
    if (!isCorrect) {
      playIncorrectSound();
      img.classList.add("shake");

      setTimeout(() => {
        img.classList.remove("shake");
      }, 400);
    } else {
      playClapSound();

      const vLetterRect = vLetter.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const containerRect = document
        .querySelector(".images-container")
        .getBoundingClientRect();

      const x1 = vLetterRect.right - containerRect.left - vLetterRect.width / 2;
      const y1 = vLetterRect.top + vLetterRect.height / 2 - containerRect.top;
      const x2 = imgRect.left - containerRect.left;
      const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

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
    }
  });
});

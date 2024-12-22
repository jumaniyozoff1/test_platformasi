const quizbox = document.getElementById("quizbox");
const cardbody = document.getElementById("cardbody");
const quizheader = document.getElementById("quizheader");
const quiztex = document.getElementById("quiztex");

let currentQuestionIndex = 0;
let quiz = [];
let countResult = 0;
let timer;
let timeLeft = 15;

function startTimer() {
  timeLeft = 15;
  document.getElementById(
    "timer"
  ).innerText = `Qolgan vaqt: ${timeLeft} soniya`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "timer"
    ).innerText = `Qolgan vaqt: ${timeLeft} soniya`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(null, quiz[currentQuestionIndex].correct_answer);
    }
  }, 1000);
}

function showQuestion(index) {
  clearInterval(timer);
  const question = quiz[index];

  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  quiztex.innerText = `Savollarning qiyinlig darajasi: ${question.difficulty}`;
  cardbody.innerHTML = `
    <div class="quiz-item mb-5">
      <p class="question mb-4">${index + 1}. ${question.question}</p>
      <div class="answer-options">
        ${answers
          .map(
            (ans, i) => `
            <button type="button" class="answer-option" onclick="nextQuestion('${ans}', '${
              question.correct_answer
            }')">
                ${String.fromCharCode(65 + i)}) ${ans}
            </button>`
          )
          .join("")}
      </div>
      <p id="timer" class="text-danger mt-3">Qolgan vaqt: 15 soniya</p>
    </div>`;
  startTimer();
}

function nextQuestion(selectedAnswer, correctAnswer) {
  clearInterval(timer);
  if (selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
      countResult += 1;
    } else {
      alert("Noto'g'ri javob. To'g'ri javob: " + correctAnswer);
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quiz.length) {
    showQuestion(currentQuestionIndex);
  } else {
    if (countResult >= 7) {
      cardbody.innerHTML = `<p class='text-success'>Test yakunlandi! Sizning natijangiz: ${countResult} ball. Siz yuqori natijani ko'rsatdingiz</p>`;
    } else if (countResult <= 7 && countResult >= 5) {
      cardbody.innerHTML = `<p class='text-success'>Test yakunlandi! Sizning natijangiz: ${countResult} ball. Siz o'rtacha natija ko'rsatdingiz</p>`;
    } else {
      cardbody.innerHTML = `<p class='text-success'>Test yakunlandi! Sizning natijangiz: ${countResult} ball. Siz past natija ko'rsatdingiz</p>`;
    }

    // cardbody.innerHTML = `<p class='text-success'>Test yakunlandi! Sizning natijangiz: ${countResult} ball</p>`;
  }
  sessionStorage.setItem("countBall", JSON.stringify(countResult));
}

axios
  .get(
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
  )
  .then((res) => {
    quiz = res.data.results;
    showQuestion(currentQuestionIndex);
  })
  .catch((err) => {
    console.error("Xatolik:", err);
    cardbody.innerHTML =
      "<p class='text-danger'>Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>";
  });

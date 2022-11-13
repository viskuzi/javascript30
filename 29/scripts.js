let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
  
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${remainderSeconds < 10 ? `0${remainderSeconds}` : `${remainderSeconds}`}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log(minutes, remainderSeconds)
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
  console.log(seconds)
}

timer(1200);

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) { // если форма имеет name = customForm, то ее можно полуить вот так
    // а input можно получить тоже по его имени как document.customForm.minutes
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  console.log(mins)
  this.reset();
});
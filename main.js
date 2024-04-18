// Select DOM elements
const gameContainer = document.querySelector('.container');
const messageBox = document.querySelector('.message-box');
const correctNumberBox = document.querySelector('.number-box');
const inputField = document.querySelector('input');
const checkBtn = document.querySelector('#check-btn');
const currScoreEl = document.querySelector('#score');
const highScoreEl = document.querySelector('#highscore');
const playAgainBtn = document.querySelector('#play-again-btn');

// Get the stored highScore value from localStorage, or set it to 0 if none
let highScore = localStorage.getItem('highScore') || 0;
highScoreEl.textContent = highScore;

let score = 20; // Initial score
let randomNumber = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 20

console.log(randomNumber); // Log the random number for debugging

// Function to display a message in the message box
const message = (msg) => {
  messageBox.textContent = msg;
  messageBox.classList.add('show');
};

// Function to add a class to the message box based on win or lose
const winOrLose = (msg) => {
  messageBox.classList.add(msg);
  inputField.disabled = true;
};

// Function to remove the message box after 2 seconds
function removeBox() {
  setTimeout(() => {
    messageBox.classList.remove('show');
  }, 2000);
}

// Function to check the user's input against the random number
function checkNumber() {
  if (inputField.value === '') return; // If the input field is empty, do nothing (Guard clause)

  if (Number(inputField.value) === randomNumber) { // If the user guessed the correct number
    message('💥Correct 🥳');
    winOrLose('correct');
    gameContainer.classList.remove('bg-norm');
    gameContainer.classList.add('bg-win');
    if (score > highScore) { // If the current score is higher than the high score
      highScore = score;
      highScoreEl.textContent = highScore;
      // Save the high score in localStorage
      localStorage.setItem('highScore', highScore);
    }
    correctNumberBox.textContent = randomNumber; // Display the correct number
    removeBox();
  }

  if (Number(inputField.value) !== randomNumber) { // If the user didn't guess the correct number
    if (score > 1) { // If the user still has remaining guesses
      score--; // Decrement the score
      currScoreEl.textContent = score;
      // Display a message based on whether the guess was too high or too low
      Number(inputField.value) > randomNumber ? message('Too high 📈') : message('Too low 📉');
      removeBox();
    } else { // If the user has no remaining guesses
      message('You lost, try again 😔');
      winOrLose('incorrect');
      currScoreEl.textContent = 0; // Set the score to 0
    }
  }
}

// Function to reset the game
function reset() {
  randomNumber = Math.floor(Math.random() * 20) + 1; // Generate a new random number
  console.log(randomNumber); // Log the new random number for debugging
  gameContainer.classList.remove('bg-win'); // Remove the win background
  inputField.value = ''; // Clear the input field
  score = 20; // Reset the score
  currScoreEl.textContent = 20;
  messageBox.classList.remove('show'); // Hide the message box
  inputField.disabled = false; // Enable the input field
  correctNumberBox.textContent = '?'; // Reset the correct number display
}

// Event listeners
checkBtn.addEventListener('click', checkNumber);
playAgainBtn.addEventListener('click', reset);
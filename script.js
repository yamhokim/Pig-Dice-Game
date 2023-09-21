'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // Selecting the score0 DOM element
const score1El = document.getElementById('score--1'); // Selecting the score1 DOM element
const current0El = document.getElementById('current--0'); // Selecting the current--0 DOM element
const current1El = document.getElementById('current--1'); // Selecting the current--1 DOM element
const diceEl = document.querySelector('.dice'); // Selecting the dice element
const btnNeW = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0; // Check what the current active player is, and change active player accordingly
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice functionality
const rollDice = function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdDice = function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } 🏆`;

      diceEl.classList.add('hidden');
    } else {
      // Or switch to the other player
      switchPlayer();
    }
  }
};

const resetGame = function () {
  // If the new game was pressed after someone has won, remove the player--winner id from activePlayer
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains('player--winner')
  )
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');

  // Reset the initial conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Check if the dice is still shown, if it is remove it
  if (!diceEl.classList.contains('hidden')) diceEl.classList.add('hidden');

  // Highlight player 1 (0) again
  // Add player--active back to player 0 element
  if (!player0El.classList.contains('player--active'))
    player0El.classList.add('player--active');
  // Ensure that player 1 element doesn't have the player--active id
  if (player1El.classList.contains('player--active'))
    player1El.classList.remove('player--active');

  // Reset all name titles
  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';

  // Reset all the displayed scores to zero
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  // Make the buttons reaccessible
  playing = true;
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdDice);
btnNeW.addEventListener('click', resetGame);
